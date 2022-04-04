import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import DOMPurify from "dompurify";
import { NavBar } from "./NavBar";
import Footer from "./Footer";
import {
	doc,
	setDoc,
	getDoc,
} from "firebase/firestore";
import { db } from "../firebase-config";
import { useUserAuth } from "./userAuthContext";

const Coin = () => {
	const [coin, setCoin] = useState({});
	const {coinId} = useParams();
	const url = `https://api.coingecko.com/api/v3/coins/${coinId}`;
	const [price, setPrice] = useState(0.0);
	const [amount, setAmount] = useState(0);
	const { user } = useUserAuth();

	const calAmount = (event) => {
		setAmount(event.target.value);
		setPrice(event.target.value * coin.market_data.current_price.usd);
	};

	const getCurrCoins = async () => {
		const userDoc = doc(db, "users", user.uid);
		const docSnap = await getDoc(userDoc).then((response) => {return response}).catch((err) => {console.log(err)});
		let numCoins = 0;
		if (docSnap.exists()) {
			if (docSnap.data().coins[coinId]) 
				numCoins = docSnap.data().coins[coinId];
		} 
		return numCoins;
	}

	const getSpent = async () => {
		const userDoc = doc(db, "users", user.uid);
		const docSnap = await getDoc(userDoc).then((response) => {return response}).catch((err) => {console.log(err)});
		let money = 0;
		if (docSnap.exists()) {
			if (docSnap.data().spent) 
				money = docSnap.data().spent;
		} 
		return money;
	}

	const handleBuy = async () => {
		const userDoc = doc(db, "users", user.uid);
		const val = {};
		let add1 = await getCurrCoins();
		let add2 = await getSpent();
		val[coinId] = Number(amount) + Number(add1);
		const coinMap = {
			spent: price + add2, 
			coins: val
		};
		
		await setDoc(userDoc, coinMap, {merge: true});
	}

	useEffect(() => {
		axios
			.get(url)
			.then((res) => {
				setCoin(res.data);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	return (
		<div className="bg-[url('../public/images/bitcoin-inverted.png')] bg-cover bg-no-repeat w-full h-full text-white font-ubuntu items-center text-center">
			<NavBar />
			<div className="max-w-4xl my-8 m-auto p-2 flex flex-col bg-navyblue rounded-xl"> {/*coin container*/}
				<div> {/*content*/}
					<h1 className="text-7xl text-bold underline">{coin.name}</h1>
				</div>
				<div className="p-2 mt-6 px-4 bg-lightblue m-2"> {/*content*/}
					<div className="flex flex-row justify-between align-middle items-center"> {/*buy and prices*/}
						<div className="py-8 w-full flex"> {/*info*/}
							<p className="m-auto text-xl">Rank #{coin.market_cap_rank}</p>
							{coin.image ? <img className="m-auto" src={coin.image.small} alt="" /> : null}
							{coin.symbol ? <p className="m-auto text-xl">{coin.symbol.toUpperCase()}</p> : null}
						</div>
						<div className=" w-full h-full flex flex-col m-auto bg-navyblue"> {/*Buy*/}
							<div className="flex flex-row items-center justify-center">
								<p className="mx-2 text-xl font-semibold">Amount</p>
								<input
									onChange={calAmount}
									className="text-black text-xl font-semibold my-4 w-1/2 m-2 h-8 shadow appearance-none
									 border rounded leading-tight focus:outline-none focus:shadow-outline"
									placeholder="1.5"
								/>
							</div>
							<div className=" flex flex-col gap-4">
								<p className="my-4 text-xl font-semibold">Price: ${price.toLocaleString()}</p>
								<button onClick={handleBuy} className="w-36 h-16 mb-4 rounded-xl bg-lightblue m-auto 
								hover:bg-green-600 text-white font-bold text-2xl" type="button"
								>Buy</button>
							</div>
						</div>
						<div className="py-8 w-full flex flex-col"> {/*price*/}
							<h1 className="text-3xl text-bold">Current Price</h1>
							{coin.market_data?.current_price ? (
								<h1 className="text-4xl text-bold underline">
									${coin.market_data.current_price.usd.toLocaleString()}
								</h1>
							) : null}
						</div>
					</div>
				</div>
				<div className="m-2"> {/*table*/}
					<table className="m-auto w-full my-8">
						<thead>
							<tr className="bg-lightblue">
								<th className="p-2 border-2">1h</th>
								<th className="p-2 border-2">24h</th>
								<th className="p-2 border-2">7d</th>
								<th className="p-2 border-2">14d</th>
								<th className="p-2 border-2">30d</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td className="border-2">
									{coin.market_data?.price_change_percentage_1h_in_currency ? (
										<p>
											{coin.market_data.price_change_percentage_1h_in_currency.usd.toFixed(
												2
											)}
											%
										</p>
									) : null}{" "}
								</td>
								<td className="border-2">
									{coin.market_data?.price_change_percentage_24h_in_currency ? (
										<p>
											{coin.market_data.price_change_percentage_24h_in_currency.usd.toFixed(
												2
											)}
											%
										</p>
									) : null}{" "}
								</td>
								<td className="border-2">
									{coin.market_data?.price_change_percentage_7d_in_currency ? (
										<p>{coin.market_data.price_change_percentage_7d_in_currency.usd.toFixed(2)}%</p>
									) : null}{" "}
								</td>
								<td className="border-2">
									{coin.market_data?.price_change_percentage_14d_in_currency ? (
										<p>
											{coin.market_data.price_change_percentage_14d_in_currency.usd.toFixed(
												2
											)}
											%
										</p>
									) : null}{" "}
								</td>
								<td className="border-2">
									{coin.market_data?.price_change_percentage_30d_in_currency ? (
										<p>
											{coin.market_data.price_change_percentage_30d_in_currency.usd.toFixed(
												2
											)}
											%
										</p>
									) : null}{" "}
								</td>
							</tr>
						</tbody>
					</table>
				</div>
				<div className="m-2">
					{" "}
					{/*Content*/}
					<div className="grid grid-cols-2 gap-6 w-full">
						{" "}
						{/*stats*/}
						<div className="bg-lightblue">
							{" "}
							{/*left*/}
							<div className="flex justify-between border-b-2 m-2 pb-2">
								<h4>24 Hour Low</h4>
								{coin.market_data?.low_24h ? (
									<p>${coin.market_data.low_24h.usd.toLocaleString()}</p>
								) : null}
							</div>
							<div className="flex justify-between border-b-2 m-2 pb-2">
								<h4 className="flex justify-between">24 Hour High</h4>
								{coin.market_data?.high_24h ? (
									<p>${coin.market_data.high_24h.usd.toLocaleString()}</p>
								) : null}
							</div>
						</div>
						<div className="bg-lightblue">
							{" "}
							{/*right*/}
							<div className="flex justify-between border-b-2 m-2 pb-2">
								<h4>Market Cap</h4>
								{coin.market_data?.market_cap ? (
									<p>${coin.market_data.market_cap.usd.toLocaleString()}</p>
								) : null}
							</div>
							<div className="flex justify-between border-b-2 m-2 pb-2">
								<h4 className="flex justify-between">Circulating Supply</h4>
								{coin.market_data ? (
									<p>{coin.market_data.circulating_supply.toLocaleString()}</p>
								) : null}
							</div>
						</div>
					</div>
					<div className="mt-4 bg-lightblue p-2">
						{" "}
						{/*about coin*/}
						<h3 className="text-xl underline">About</h3>
						<p
							dangerouslySetInnerHTML={{
								__html: DOMPurify.sanitize(coin.description ? coin.description.en : ""),
							}}/>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default Coin;
