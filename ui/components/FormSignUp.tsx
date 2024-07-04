"use client";
import React, { useState } from "react";
import useFormValidation from "../../utils/hooks/useFormSignUp";
import { FormEvent } from "react";
import getFormData from "@/utils/getFormData";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { Divider } from "@nextui-org/divider";
import { registerUser } from "@/app/lib/authSignUpPassword";

export function FormSignUp() {
  const [loading, setLoading] = useState<boolean>(false);
  const { errors, validateFields, clearError } = useFormValidation();

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const { name, lastName, email, password, confirmPassword } = getFormData(
      e.currentTarget
    );
    const isValid = await validateFields(
      name,
      lastName,
      email,
      password,
      confirmPassword
    );
    setLoading(false);
    if (!isValid) return;

    try {
      registerUser(name, lastName, email, password);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error registering user:", error);
    }
  };

  return (
    <div className="w-full flex justify-center">
      <form
        className="w-full flex flex-col gap-4 p-4"
        onSubmit={handleRegister}
      >
        <Input
          type="text"
          label="Nombre"
          size="sm"
          isRequired
          name="name"
          isClearable
          onFocus={() => clearError("name")}
          isInvalid={!!errors.name}
          errorMessage={errors?.name}
        />
        <Input
          type="text"
          label="Apellido"
          size="sm"
          isRequired
          name="lastName"
          onFocus={() => clearError("lastName")}
          isClearable
          isInvalid={!!errors.lastName}
          errorMessage={errors?.lastName}
        />
        <Input
          type="email"
          label="Email"
          size="sm"
          isRequired
          name="email"
          onFocus={() => clearError("email")}
          isClearable
          isInvalid={!!errors.email}
          errorMessage={errors?.email}
        />
        <Input
          type="password"
          label="Contraseña"
          size="sm"
          isRequired
          name="password"
          onFocus={() => clearError("password")}
          isClearable
          isInvalid={!!errors.password}
          errorMessage={errors?.password}
        />
        <Input
          type="password"
          label="Repite la contraseña"
          size="sm"
          isRequired
          name="confirmPassword"
          onFocus={() => clearError("confirmPassword")}
          isClearable
          isInvalid={!!errors.confirmPassword}
          errorMessage={errors?.confirmPassword}
        />
        <Divider />
        <Button type="submit" isLoading={loading}>
          Registrarse
        </Button>
      </form>
    </div>
  );
}
