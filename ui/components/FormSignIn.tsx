"use client";
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import getFormData from "@/utils/getFormData";
import { Button } from "@nextui-org/react";
import { Input } from "@nextui-org/input";
import Link from "next/link";
import { login } from "@/app/lib/actions";

export function FormSignIn() {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<
    Promise<string | undefined> | string
  >("");
  const router = useRouter();

  const handleSignIn = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const { email, password } = getFormData(e.currentTarget);

    const responseAuth = await login({ email, password });
    if (responseAuth.status === "success") {
      setLoading(false);
      router.push("/dashboard");
    }

    if (responseAuth.status === "error") {
      setErrorMessage(responseAuth.message);
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex justify-center">
      <form className="w-full flex flex-col gap-4 p-4" onSubmit={handleSignIn}>
        <Input
          type="email"
          label="Email"
          size="sm"
          isRequired
          name="email"
          onClick={() => setErrorMessage("")}
          isClearable
          isInvalid={!!errorMessage}
          errorMessage={errorMessage}
        />
        <Input
          type="password"
          label="Contraseña"
          size="sm"
          isRequired
          isClearable
          onClick={() => setErrorMessage("")}
          name="password"
          isInvalid={!!errorMessage}
        />
        <Button type="submit" isLoading={loading}>
          Ingresar
        </Button>
        <p>
          Si no tenes cuenta{" "}
          <span className="text-blue-500">
            <Link href="/register">Registrate aqui</Link>
          </span>
        </p>
      </form>
    </div>
  );
}
