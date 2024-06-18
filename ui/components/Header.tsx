import Link from "next/link";

export default function Header() {
  return (
    <header className="flex justify-between items-center p-4">
      <h1 className="text-xl">INVEST IQ</h1>
      <nav>
        <ul className="flex gap-4">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/login">Iniciar sesion</Link>
          </li>
          <li>
            <Link href="/dashboard">Dashboard</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
