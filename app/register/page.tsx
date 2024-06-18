import { FormSignUp } from "@/ui/components/FormSignUp";
import Header from "@/ui/components/Header";

export default function Login() {
  return (
    <>
      <Header />
      <main className="px-4">
        <h1 className="text-xl">Registrarse</h1>
        <FormSignUp />
      </main>
    </>
  );
}
