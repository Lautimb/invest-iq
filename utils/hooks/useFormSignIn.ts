import { useState } from "react";

const useFormSignIn = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  return {
    values,
    handleChange,
  };
};

export default useFormSignIn;
