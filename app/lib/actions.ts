"use server";
import { SignJWT, jwtVerify } from "jose";
import { auth } from "@/firebase/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { IFormDataLogin } from "../interfaces/forms";
import { IAuthResponse } from "../interfaces/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

const secretKey = process.env.NEXT_PUBLIC_SECRET_KEY;
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("2h")
    .sign(key);
}

export async function decrypt(input: string): Promise<any> {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  });
  return payload;
}

export async function getSession() {
  const session = cookies().get("session")?.value;
  if (!session) return null;
  return await decrypt(session);
}

export async function updateSession(request: NextRequest) {
  const session = request.cookies.get("session")?.value;
  if (!session) return null;

  // refresh the session so it doesn't expire
  const parsed = await decrypt(session);
  parsed.expires = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7);
  const res = NextResponse.next();
  res.cookies.set({
    name: "session",
    value: await encrypt(parsed),
    httpOnly: true,
    expires: parsed.expires,
  });
  return res;
}

export async function logout() {
  cookies().set("session", "", { expires: new Date(0) });
  return redirect("/");
}

export async function login({
  email,
  password,
}: IFormDataLogin): Promise<IAuthResponse> {
  const errorMessages: { [key: string]: string } = {
    "auth/invalid-email": "Email o contraseña incorrectos.",
    "auth/invalid-credential": "Email o contraseña incorrectos.",
    "auth/missing-password": "Ingrese la contraseña.",
  };
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const token = await userCredential.user.getIdToken();
    const user = {
      email: userCredential.user.email,
      name: userCredential.user.displayName,
    };
    const expires = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7);
    const session = await encrypt({ token, user, expires });

    cookies().set("session", session, { httpOnly: true, expires });

    return {
      message: "Inicio de sesión exitoso",
      status: "success",
    };
  } catch (error: any) {
    if (error) {
      return {
        message:
          errorMessages[error.code] ||
          "Upss algo salió mal. Intente nuevamente.",
        status: "error",
      };
    }
    throw error;
  }
}
