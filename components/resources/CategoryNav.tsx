import { fieldGuideCategories, type FieldGuideCategorySlug } from '@/lib/config/fieldGuides';

// Part 6: "acceptable — anchor navigation... preferred goal: fast,
// crawlable, simple." Plain server-rendered <a href="#..."> links — no
// client-side filter app, nothing hidden from crawlers.
export default function CategoryNav({ activeCategories }: { activeCategories: Set<FieldGuideCategorySlug> }) {
  const visible = fieldGuideCategories.filter((c) => activeCategories.has(c.slug));
  if (visible.length === 0) return null;

  return (
    <nav aria-label="Field Guide categories" className="overflow-x-auto">
      <ul className="flex gap-6 whitespace-nowrap pb-2">
        {visible.map((c) => (
          <li key={c.slug}>
            <a
              href={`#${c.slug}`}
              className="text-sm text-[#C5C6C7] hover:text-[#008080] transition-colors font-medium"
            >
              {c.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
