import { db } from "@/firebase/firebaseConfig";
import { collection, query, getDocs, where } from "firebase/firestore";

export const checkIfEmailExists = async (email?: string) => {
  const usersRef = collection(db, "users");
  const q = query(usersRef, where("email", "==", email));
  const querySnapshot = await getDocs(q);

  return !querySnapshot.empty;
};
