import { getSession } from "../lib/actions";
import Header from "@/ui/components/Header";

export default async function Dashboard() {
  const { user } = await getSession();
  return (
    <main>
      <Header />
      <h1>HI {user.name}</h1>
    </main>
  );
}
