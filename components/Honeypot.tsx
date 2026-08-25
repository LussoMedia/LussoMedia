// Invisible-to-humans field for basic bot filtering. Real visitors never
// see or focus it; bots that fill every input on a form trip it. Paired
// with server-side checks in the /api/leads/* routes (field name
// "companyFax" there too — keep them in sync).
interface HoneypotProps {
  value: string;
  onChange: (value: string) => void;
}

export default function Honeypot({ value, onChange }: HoneypotProps) {
  return (
    <div
      aria-hidden="true"
      style={{ position: 'absolute', left: '-9999px', top: '-9999px', width: 1, height: 1, overflow: 'hidden' }}
    >
      <label htmlFor="companyFax">Leave this field blank</label>
      <input
        id="companyFax"
        name="companyFax"
        type="text"
        tabIndex={-1}
        autoComplete="off"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
