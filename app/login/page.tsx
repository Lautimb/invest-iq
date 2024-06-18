import { FormSignIn } from "@/ui/components/FormSignIn";
import Header from "@/ui/components/Header";

export default function Login() {
  return (
    <>
      <Header />
      <main className="px-4">
        <h1 className="text-xl">Iniciar sesion</h1>
        <FormSignIn />
      </main>
    </>
  );
}
