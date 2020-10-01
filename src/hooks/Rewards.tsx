import { firestore } from "firebase";
import Toast from "../components/Toast";
import { firebaseApp, firestoreApp } from "../utils/firebase";


export const handleRewards = (result: string) => {
    const userRef = firestoreApp
      .collection("users")
      .doc(firebaseApp.auth().currentUser?.uid);
    if (result === 'win') {
      userRef.update({
        energy: firestore.FieldValue.increment(-1),
        xp: firestore.FieldValue.increment(10),
        guild_xp: firestore.FieldValue.increment(10),
      });
      Toast.success('Won')
    } else {
      userRef.update({
        energy: firestore.FieldValue.increment(-1),
        xp: firestore.FieldValue.increment(5),
        guild_xp: firestore.FieldValue.increment(5),
      });
      Toast.error("Lost");
    }
}