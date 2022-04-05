import { getDoc, updateDoc, doc, setDoc } from "firebase/firestore";
import { NavBar } from "./NavBar";
import Footer from "./Footer";
import { useState, useEffect } from "react";
import { useUserAuth } from "./userAuthContext";
import { db } from "../firebase-config";
import CoinItem from "./CoinItem";

export let Profile = () => {
	let { user } = useUserAuth();
	let [userSpent, setUserSpent] = useState(0);
	let [userCoins, setUserCoins] = useState([]);

	useEffect(() => {
		const getUserInfo = async () => {
			try {
				const userDoc = doc(db, "users", user.uid);
				const docSnap = await getDoc(userDoc)
					.then((response) => {
						return response;
					})
					.catch((err) => {
						console.log(err);
					});
				if (docSnap.exists()) {
					console.log(docSnap.data());
					setUserSpent(docSnap.data().spent);
					setUserCoins(docSnap.data().coins);
				}
			} catch (err) {
				console.log(err);
			}
		};
		getUserInfo().catch((error) => {
			console.log(error);
		});
	}, []);

	return (
		<div className="h-full w-full bg-navyblue">
			<NavBar />
			<div className="flex flex-col m-auto items-center bg-white w-1/4 align-middle">
				<h1>Profile</h1>
				<img className="h-20 w-20" src={user.photoURL} alt="" />
				<p>{user.displayName}</p>
				<p>{user.email}</p>
			</div>
			<div className="flex flex-col mt-5 m-auto items-center bg-white w-1/2 align-middle">
				<h1>Assets</h1>
				{Object.entries(userCoins).map(([coin, number], i) => (
					<div className="bg-blue-500 m-2" key={i}>
						<span>
							{coin}: {number}
						</span>
						<span>
							
						</span>
					</div>
				))}
				<p>Money Invested: ${userSpent.toLocaleString()}</p>
			</div>
			<Footer />
		</div>
	);
};
