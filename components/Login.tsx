import React, { ReactElement } from "react";
import { auth } from "../firebase/firebaseClient";
import { GoogleAuthProvider, signInWithPopup, User } from "firebase/auth";
import { db } from "../firebase/firebaseClient";
import { doc, setDoc } from "firebase/firestore";

interface Props {}

export default function Login(): ReactElement {
	function signInWithGoogle() {
		const provider = new GoogleAuthProvider();
		return signInWithPopup(auth, provider).then(async function (result) {
			const user: User = result.user;
			if (user) {
				const userRef = doc(db, `users/${user.uid}`);
				await setDoc(userRef, {
					displayName: user.displayName,
					email: user.email,
					photoURL: user.photoURL,
					uid: user.uid,
				});
			}
		});
	}

	return (
		<div>
			<button onClick={() => signInWithGoogle()}>
				Sign in with Google
			</button>
		</div>
	);
}
