import { useState } from "react";
import { validateEmail, validatePassword } from "../validationsForm";

interface ErrorsSignIn {
  email: string | Promise<string | null>;
  password: string;
}

const useFormSignIn = () => {
  const [errors, setErrors] = useState<ErrorsSignIn>({
    email: "",
    password: "",
  });

  const validateFields = (email?: string, password?: string): boolean => {
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    const hasErrors = !!(emailError || passwordError);

    setErrors({
      email: emailError || "",
      password: passwordError || "",
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

export default useFormSignIn;
