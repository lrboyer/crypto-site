import { getDoc, updateDoc, doc, setDoc } from "firebase/firestore";
import { NavBar } from "./NavBar";
import Footer from "./Footer";
import { useState, useEffect } from "react";
import { useUserAuth } from "./userAuthContext";
import { db } from "../firebase-config";

export const Profile = () => {
	const { user } = useUserAuth();
	const [userInfo, setUserInfo] = useState({});

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
				let data;
				if (docSnap.exists()) data = docSnap.data();
				setUserInfo(data);
			} catch (err) {
				console.log(err);
			}
		};
		getUserInfo();
		console.log(userInfo);
	}, []);

	return (
		<div className="h-auto bg-navyblue">
			<NavBar />
			<div className="flex flex-col">
				<h1>Profile</h1>

				<p>{user.displayName}</p>
				<p>{user.email}</p>
				<img className="h-20 w-20" src={user.photoURL} alt="" />
			</div>
			<Footer />
		</div>
	);
};
