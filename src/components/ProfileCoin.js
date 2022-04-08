import { useEffect, useState } from "react";
import axios from "axios";

const ProfileCoin = (props) => {
	let [coinData, setCoinData] = useState({});
	let [sellAmount, setSellAmount] = useState(0);
	let url = "https://api.coingecko.com/api/v3/coins/" + props.coin;
	let [showModal, setShowModal] = useState(false);

	useEffect(() => {
		axios
			.get(url)
			.then((res) => {
				setCoinData(res.data);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	let getWorth = () => {
		if (coinData.market_data?.current_price) {
			return coinData.market_data.current_price.usd * props.amount;
		}
		return 0;
	}

	let handleSell = () => {

	}

	return (

		<div className="font-ubuntu flex justify-between w-full items-center font-semibold bg-navyblue
      shadow-md shadow-lightblue border-r-8 border-4 border-lightblue rounded-xl m-0 my-4 p-6 hover:scale-[1.03]
       duration-75 ease-in-out cursor-pointer">

			<div className="flex ml-4 ">
				{coinData.image ? <img className="h-10 -ml-7" src={coinData.image.small} alt="" /> : null}
				{coinData.symbol ? <p className="flex items-center ml-2">{coinData.symbol.toUpperCase()}</p> : null}
			</div>

			<p>{props.amount}</p>
			<p>${getWorth().toLocaleString()}</p>
			{coinData.market_data?.current_price ? <p className="pr-3">${coinData.market_data.current_price.usd.toLocaleString()}</p> : null}
			{coinData.market_data?.price_change_percentage_24h_in_currency ? <p>{coinData.market_data.price_change_percentage_24h_in_currency.usd.toFixed(2)}%</p> : null}

			<button onClick={handleSell} className="w-12 h-12 rounded-xl bg-lightblue
					hover:bg-green-600 text-white font-bold" type="button"
			>Sell</button>

		</div>
	);
};

export default ProfileCoin;