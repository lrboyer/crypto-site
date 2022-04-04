import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signOut, signInWithPopup } from "firebase/auth";
import { auth, db, gProvider } from "../firebase-config";
import { collection, doc, setDoc, getDoc } from "firebase/firestore";

const userAuthContext = createContext(undefined);
const usersCollectionRef = collection(db, "users");

export function UserAuthContextProvider({ children }) {
	const [user, setUser] = useState({});

	let boughtCoins = async (uid) => {
		let userDoc = doc(db, "users", uid);
		let userSnap = await getDoc(userDoc).then((response) => {return response}).catch((err) => {console.log(err)});

		if (userSnap.exists()) return userSnap.data().coins;
		else return {};
	};

	function logOut() {
		return signOut(auth);
	}

	let googleSignIn = () => {
		return signInWithPopup(auth, gProvider).then(
			async (result) => {

				let coins = await boughtCoins(result.user.uid);
				console.log(coins);

				setDoc(doc(usersCollectionRef, result.user.uid), {
					name: result.user.displayName,
					email: result.user.email,
					coins: coins,
				}).catch((err) => {
					console.log(err);
				});
			},
			{ merge: true }
		);
	};

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
			setUser(currentuser);
		});

		return () => {
			unsubscribe();
		};
	}, []);

	return (
		<userAuthContext.Provider value={{ user, logOut, googleSignIn }}>
			{children}
		</userAuthContext.Provider>
	);
}

export function useUserAuth() {
	return useContext(userAuthContext);
}
