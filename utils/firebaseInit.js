import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseInit = () => {
	const config = {
		apiKey: "AIzaSyD3QB5gY6Rgqy1ZPD8Q3KaLUpAjQd21FIo",
		authDomain: "fir-plus-next.firebaseapp.com",
		projectId: "fir-plus-next",
		storageBucket: "fir-plus-next.appspot.com",
		messagingSenderId: "966496162224",
		appId: "1:966496162224:web:e2705fe279050f72c20675",
		measurementId: "G-78D5V650FL",
	};

	if (!firebase.apps.length) {
		firebase.initializeApp(config);
	} else {
		firebase.app();
	}
};
export default firebaseInit;

// const firestore = firebase.firestore();
// const auth = firebase.auth();
// const provider = new firebase.auth.GoogleAuthProvider();

// export { auth, firestore, provider };
