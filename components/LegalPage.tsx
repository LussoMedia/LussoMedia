interface LegalPageProps {
  title: string;
  updated: string;
  children: React.ReactNode;
}

export default function LegalPage({ title, updated, children }: LegalPageProps) {
  return (
    <div className="max-w-3xl mx-auto px-6">
      <h1 className="text-4xl font-bold mb-2">{title}</h1>
      <p className="text-sm text-[#888888] mb-12">Last updated: {updated}</p>
      <div className="space-y-6 text-[#C5C6C7] leading-relaxed [&_h2]:text-white [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:mt-10 [&_h2]:mb-3 [&_a]:text-[#00a8a8] [&_a]:underline">
        {children}
      </div>
    </div>
  );
}
