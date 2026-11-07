import { NextRequest, NextResponse } from 'next/server';
import { sendContactMessage } from '@/lib/email';

export async function POST(req: NextRequest) {
  try {
    const { nafn, netfang, skilabod, vefsida } = await req.json();

    // Falinn reitur sem aðeins róbótar fylla út — látum sem allt hafi gengið upp.
    if (vefsida) return NextResponse.json({ ok: true });

    const name = String(nafn ?? '').trim().slice(0, 100);
    const email = String(netfang ?? '').trim().slice(0, 200);
    const message = String(skilabod ?? '').trim().slice(0, 5000);

    if (!name || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Vantar upplýsingar' }, { status: 400 });
    }

    const { error } = await sendContactMessage({ name, email, message });
    if (error) {
      console.error('Contact email villa:', error);
      return NextResponse.json({ error: 'Ekki tókst að senda' }, { status: 500 });
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Contact villa:', err);
    return NextResponse.json({ error: 'Villa' }, { status: 500 });
  }
}
