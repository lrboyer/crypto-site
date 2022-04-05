import { getDoc, updateDoc, doc, setDoc } from "firebase/firestore";
import { NavBar } from "./NavBar";
import Footer from "./Footer";
import { useState, useEffect } from "react";
import { useUserAuth } from "./userAuthContext";
import { db } from "../firebase-config";
import ProfileCoin from "./ProfileCoin";

export let Profile = () => {
	let { user } = useUserAuth();
	let [userSpent, setUserSpent] = useState(0);
	let [userCoins, setUserCoins] = useState([]);
	let [coinData, setCoinData] = useState([]);

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
	}, [user.uid]);

	return (
		<div className="h-full w-full bg-navyblue">
			<NavBar />
			<div className="flex flex-col m-auto items-center bg-white w-1/4 align-middle">
				<h1>Profile</h1>
				<img className="h-20 w-20" src={user.photoURL} alt="" />
				<p>{user.displayName}</p>
				<p>{user.email}</p>
			</div>
			<div className="flex flex-col mt-5 m-auto items-center bg-white w-3/4 align-middle">
				<h1>Assets</h1>

				<div className="font-ubuntu text-white max-w-6xl m-auto mt-20 bg-navyblue w-full rounded-xl">
					{" "}
					{/*Container*/}
					<div className="flex justify-between items-center bg-navyblue w-auto border-r-8 m-0 p-6 font-bold border-4 rounded-xl border-lightblue">
						{" "}
						{/*Header*/}
						<p>#</p>
						<p className="-ml-16">Coin</p>
						<p>Price</p>
						<p>24h</p>
						<p className="hidden md:block">Volume</p>
						<p className="hidden md:block">Market Cap</p>
					</div>
					
				

				{Object.entries(userCoins).map(([coin, number], i) => (
					<div className="bg-blue-500 m-2 flex w-full" key={i}>
						<ProfileCoin coin={coin} />
					</div>
				))}
				</div>
				<p>Money Invested: ${userSpent.toLocaleString()}</p>
			</div>
			<Footer />
		</div>
	);
};
