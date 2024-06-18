// validations.ts
import { checkIfEmailExists } from "@/api/get";

export const validateName = (name?: string): string | null => {
  if (!name) {
    return "El nombre es requerido";
  }
  if (name.length < 2) {
    return "El nombre debe tener al menos 2 caracteres";
  }
  return null;
};

export const validateLastName = (lastName?: string): string | null => {
  if (!lastName) {
    return "El apellido es requerido";
  }
  if (lastName.length < 2) {
    return "El apellido debe tener al menos 2 caracteres";
  }
  return null;
};

export const validateEmail = async (email?: string): Promise<string | null> => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) {
    return "El email es requerido";
  }
  if (!emailRegex.test(email)) {
    return "El formato del email es inválido";
  }
  const existEmail = await checkIfEmailExists(email);
  if (existEmail) {
    return "El email ya está registrado";
  }
  return null;
};

export const validatePassword = (password?: string): string | null => {
  if (!password) {
    return "La contraseña es requerida";
  }
  if (password.length < 6) {
    return "La contraseña debe tener al menos 6 caracteres";
  }
  if (!/[A-Z]/.test(password)) {
    return "La contraseña debe contener al menos una letra mayúscula";
  }
  if (!/[a-z]/.test(password)) {
    return "La contraseña debe contener al menos una letra minúscula";
  }
  if (!/[0-9]/.test(password)) {
    return "La contraseña debe contener al menos un número";
  }
  return null;
};

export const validateConfirmPassword = (
  password?: string,
  confirmPassword?: string
): string | null => {
  if (!confirmPassword) {
    return "La confirmación de la contraseña es requerida";
  }
  if (password !== confirmPassword) {
    return "Las contraseñas no coinciden";
  }
  return null;
};
