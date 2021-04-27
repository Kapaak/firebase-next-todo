import { useEffect, useState } from "react";
import PopulateData from "../components/PopulateData";
import Form from "../components/Form";
//util
import firebaseInit from "../utils/firebaseInit";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

export default function Home() {
	// firebaseInit();
	if (!firebase.apps.length) {
		firebase.initializeApp({
			apiKey: "AIzaSyC4TDoJuZBfcwJzBAKbmZTmfinQczDlIg8",
			authDomain: "fir-nextjs-todo.firebaseapp.com",
			projectId: "fir-nextjs-todo",
			storageBucket: "fir-nextjs-todo.appspot.com",
			messagingSenderId: "372167901298",
			appId: "1:372167901298:web:a987b3e552e24d4a2842eb",
			measurementId: "G-EE7HHDDDGS",
		});
	} else {
		firebase.app(); // if already initialized, use that one
	}

	const auth = firebase.auth();
	const provider = new firebase.auth.GoogleAuthProvider();
	const { serverTimestamp } = firebase.firestore.FieldValue;
	const db = firebase.firestore();
	const [user, setUser] = useState(() => auth.currentUser);

	useEffect(() => {
		auth.onAuthStateChanged(user => {
			if (user) {
				setUser(user);
			} else {
				setUser(null);
			}
		});
	}, []);

	const signInWithGoogle = async () => {
		// const provider = new firebase.auth.GoogleAuthProvider();
		auth.useDeviceLanguage();

		try {
			await auth.signInWithPopup(provider);
		} catch (error) {
			console.log(error);
		}
	};

	const signOut = async () => {
		try {
			await firebase.auth().signOut();
		} catch (error) {
			console.log(error.message);
		}
	};

	const submitData = inputText => {
		db.collection("things").add({
			...inputText,
		});
	};

	function viewData(setData) {
		const thingsRef = db.collection("things");
		const unsubscribe = thingsRef
			.where("uid", "==", user.uid)
			.onSnapshot(querySnapshot => {
				const handleArr = [];
				const items = querySnapshot.docs.map(doc => {
					handleArr.push(doc.data());
				});
				setData(handleArr);
			});
	}

	return (
		<div>
			<h1>firebase</h1>

			{user ? (
				<section>
					<button onClick={signOut}>Sign out with Google</button>
					<p>The user logged in is: {user.displayName}</p>
					<p>id: {user.uid}</p>
				</section>
			) : (
				<section>
					<button onClick={signInWithGoogle}>Sign in with Google</button>
				</section>
			)}
			<section>
				{user ? <Form user={user} submitData={submitData} /> : null}
			</section>
			<section>
				<h3>Data</h3>
				{user ? <PopulateData user={user} viewData={viewData} /> : null}
			</section>
		</div>
	);
}
