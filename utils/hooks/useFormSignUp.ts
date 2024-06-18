import { useState } from "react";
import {
  validateName,
  validateLastName,
  validateEmail,
  validatePassword,
  validateConfirmPassword,
} from "../validationsForm";

interface ErrorsRegister {
  name: string;
  lastName: string;
  email: string | Promise<string | null>;
  password: string;
  confirmPassword: string;
}

const useFormSignUp = () => {
  const [errors, setErrors] = useState<ErrorsRegister>({
    name: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const validateFields = (
    name?: string,
    lastName?: string,
    email?: string,
    password?: string,
    confirmPassword?: string
  ): boolean => {
    const nameError = validateName(name);
    const lastNameError = validateLastName(lastName);
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    const confirmPasswordError = validateConfirmPassword(
      password,
      confirmPassword
    );

    const hasErrors = !!(
      nameError ||
      lastNameError ||
      emailError ||
      passwordError ||
      confirmPasswordError
    );

    setErrors({
      name: nameError || "",
      lastName: lastNameError || "",
      email: emailError || "",
      password: passwordError || "",
      confirmPassword: confirmPasswordError || "",
    });

    return !hasErrors;
  };

  const clearError = (fieldName: string) => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: "",
    }));
  };

  return { errors, validateFields, clearError };
};

export default useFormSignUp;
