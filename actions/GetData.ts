import { toast } from "sonner";
import { app } from "../firebase";
import { getFirestore, collection, getDocs } from "firebase/firestore";

export default async function GetData() {
  const db = getFirestore(app);
  try {
    const querySnapshot = await getDocs(collection(db, "data"));
    const documents = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return Promise.resolve(documents);
  } catch (err) {
    toast.error("Could not fetch Data");
    return Promise.reject(err);
  }
}
