import Link from "next/link";

export default function NotFound() {
  return (
    <main className="nf">
      <div className="grid-paper" aria-hidden />
      <svg className="nf__arch" viewBox="0 0 64 64" aria-hidden>
        <path d="M12 56 V33 A27 27 0 0 1 32 6.92 A27 27 0 0 1 52 33 V56" />
        <path d="M7 56 H57" />
        <path className="nf__gap" d="M24 56 V44 H40 V56" />
      </svg>
      <p className="nf__code">Sheet 404</p>
      <h1 className="nf__title">This room was never built.</h1>
      <p className="nf__mr">ही खोली कधी बांधलीच नाही.</p>
      <Link href="/" className="btn btn--brass">Back to the studio</Link>
    </main>
  );
}
