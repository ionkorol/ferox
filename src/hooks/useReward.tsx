import { firestore } from "firebase";
import Toast from "../components/Toast";
import { firebaseApp, firestoreApp } from "../utils/firebase";

const useReward = (result: string) => {
  const userRef = firestoreApp
    .collection("users")
    .doc(firebaseApp.auth().currentUser?.uid);
  if (result === "win") {
    userRef.update({
      "energy.current": firestore.FieldValue.increment(-1),
      "energy.timestamp": firestore.Timestamp.fromMillis(
        new Date().getTime() + 2 * 60000
      ),
      xp: firestore.FieldValue.increment(10),
      guild_xp: firestore.FieldValue.increment(10),
    });
    Toast.success("Won \n xp: 10");
  } else {
    userRef.update({
      "energy.current": firestore.FieldValue.increment(-1),
      "energy.timestamp": firestore.Timestamp.fromMillis(
        new Date().getTime() + 2 * 60000
      ),
      xp: firestore.FieldValue.increment(5),
      guild_xp: firestore.FieldValue.increment(5),
    });
    Toast.error("Lost \n xp: 5");
  }
};

export default useReward;
