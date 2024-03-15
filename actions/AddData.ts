"use client";
import { app } from "../firebase";
import { getFirestore, collection, addDoc } from "firebase/firestore";

export default async function AddData(data: any) {
  const db = getFirestore(app);
  const docRef = collection(db, "data");
  try {
    await addDoc(docRef, data);
    Promise.resolve();
  } catch (err) {
    Promise.reject(err);
  }
}
