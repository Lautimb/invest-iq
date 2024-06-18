import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { auth, db } from "@/firebase/firebaseConfig";

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

    await setDoc(doc(db, "users", userCredential.user.uid), {
      name,
      lastName,
      email,
    });

    return userCredential.user;
  } catch (error) {
    throw error;
  }
};
