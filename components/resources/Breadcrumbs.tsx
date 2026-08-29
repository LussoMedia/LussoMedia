import Link from 'next/link';

// Restrained, understated breadcrumb trail (Part 23). Visual chrome only —
// the matching BreadcrumbList JSON-LD is emitted separately by the page so
// this component stays server-renderable with zero client JS.
export default function Breadcrumbs({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center gap-1.5 text-xs text-[#666]">
        {items.map((item, i) => (
          <li key={item.label} className="flex items-center gap-1.5">
            {item.href ? (
              <Link href={item.href} className="hover:text-[#888] transition-colors">
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className="text-[#888]">{item.label}</span>
            )}
            {i < items.length - 1 && <span aria-hidden="true">/</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
