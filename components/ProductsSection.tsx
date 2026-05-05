import ProductCard from './ProductCard';
import { type Product } from '@/lib/sanity';

export default function ProductsSection({ products }: { products: Product[] }) {
  return (
    <section id="vorur" style={{ maxWidth: 1280, margin: '0 auto', padding: '80px 24px' }}>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 48 }}>
        <div>
          <p style={{ color: 'var(--brand)', fontSize: '0.8125rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 10 }}>Vörur</p>
          <h2 className="font-display" style={{ fontSize: 'clamp(1.5rem,2.5vw,2.2rem)', fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 0.95, color: '#fff' }}>Vinsælar vörur</h2>
        </div>
      </div>
      <div className="products-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14 }}>
        {products.map(p => <ProductCard key={p._id} product={p} />)}
      </div>
    </section>
  );
}
