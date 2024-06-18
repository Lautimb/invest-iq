"use client";
import { FormEvent } from "react";
import getFormData from "@/utils/getFormData";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import useFormSignUp from "@/utils/hooks/useFormSignIn";

export function FormSignIn() {
  const { errors, validateFields, clearError } = useFormSignUp();

  const handleSignIn = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password } = getFormData(e.currentTarget);
    const isValid = validateFields(email, password);
    if (!isValid) return;
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
          onClick={() => clearError("email")}
          isInvalid={!!errors.email}
          errorMessage={errors?.email}
        />
        <Input
          type="password"
          label="Contraseña"
          size="sm"
          isRequired
          name="password"
          onClick={() => clearError("password")}
          isInvalid={!!errors.password}
          errorMessage={errors?.password}
        />
        <Button type="submit">Ingresar</Button>
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
