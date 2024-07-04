"use server";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "@/firebase/firebaseConfig";
import { login } from "./actions";
import { redirect } from "next/navigation";

export const registerUser = async (
  name: string,
  lastName: string,
  email: string,
  password: string
) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    await updateProfile(userCredential.user, {
      displayName: `${name} ${lastName}`,
    });

    await login({ email, password });

    return redirect("/dashboard");
  } catch (error) {
    throw error;
  }
};
