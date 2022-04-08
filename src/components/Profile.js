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
		<div className="h-full w-full bg-[url('../public/images/bitcoin-inverted.png')] bg-cover bg-no-repeat">
			<NavBar />
			<div className="flex flex-col m-auto items-center bg-navyblue text-white rounded-xl mt-5 w-1/4 align-middle">
				<h1>Profile</h1>
				<img className="h-20 w-20" src={user.photoURL} alt="" />
				<p>User: {user.displayName}</p>
				<p>Email: {user.email}</p>
			</div>

			<div className="flex flex-col mt-5 m-auto items-center bg-navyblue w-3/4 align-middle">
				<div className="font-ubuntu text-white max-w-6xl m-auto bg-navyblue w-full rounded-xl">
					{" "}
					{/*Container*/}
					<div className="flex justify-between items-center bg-navyblue w-auto border-r-8 m-0 p-6 font-bold border-4 rounded-xl border-lightblue">
						<p>Coin</p>
						<p className="ml-6"># Held</p>
						<p>Worth</p>
						<p className="hidden md:block">Coin Price</p>
						<p className="hidden md:block">24h</p>
						<p>Sell</p>
					</div>
					{/*Sorts by most held in coin to least number of coins prob need to call function here to  */}
					{Object.entries(userCoins)
						.sort((a, b) => (a.number > b.number ? -1 : 1))
						.map(([coin, number], i) => ( 
							<div className="m-2 flex w-full" key={i}>								
								<ProfileCoin amount={number} coin={coin}/>
							</div>
						))}
				</div>
			</div>
			<Footer />
		</div>
	);
};
