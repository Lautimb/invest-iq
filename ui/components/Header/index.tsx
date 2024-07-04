import Link from "next/link";
import { getSession } from "@/app/lib/actions";
import NavBar from "./NavBar";

export default async function Header() {
  const user = await getSession();
  return (
    <header className="flex justify-between items-center p-4">
      <NavBar user={!!user} />
      {/* <h1 className="text-xl">INVEST IQ</h1> */}
      {/* <nav>
        <ul className="flex gap-4">
          <li>
            <Link href="/">Home</Link>
          </li>
          {!user && (
            <li>
              <Link href="/login">Iniciar sesion</Link>
            </li>
          )}
          <li>
            <Link href="/dashboard">Dashboard</Link>
          </li>
        </ul>
      </nav> */}
    </header>
  );
}
