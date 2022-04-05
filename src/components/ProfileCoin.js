import { useEffect, useState } from "react";
import axios from "axios";

const ProfileCoin = (coin) => {
	let [coinData, setCoinData] = useState({});
	let url = "https://api.coingecko.com/api/v3/coins/" + coin.coin;

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

	return (
		
		<div
			className="font-ubuntu flex justify-between w-full items-center font-semibold bg-navyblue
      shadow-md shadow-lightblue border-r-8 border-4 border-lightblue rounded-xl m-0 my-4 p-6 hover:scale-[1.03]
       duration-75 ease-in-out cursor-pointer">

			<p className=" text-xl">Rank #{coinData.market_cap_rank}</p>
			<div className="flex">
				{coinData.image ? <img className="h-10 -ml-7" src={coinData.image.small} alt="" /> : null}
				{coinData.symbol ? <p className="flex items-center ml-2">{coinData.symbol.toUpperCase()}</p> : null}
			</div>

			{coinData.market_data?.current_price ? <p className="pr-3">${coinData.market_data.current_price.usd	.toLocaleString()}</p> : null}
			{coinData.market_data?.price_change_percentage_1h_in_currency ? <p>{coinData.market_data.price_change_percentage_1h_in_currency.usd.toFixed(2)}%</p> : null}
			{coinData.market_data?.total_volume ? <p className="hidden md:block">${coinData.market_data.total_volume.usd.toLocaleString()}</p> : null}
			{coinData.market_data?.market_cap ? <p className="hidden md:block">${coinData.market_data.market_cap.usd.toLocaleString()}</p> : null}
			
		</div>
	);
};

export default ProfileCoin;

/*
<p>{coin.market_cap_rank}</p>
        <div className="flex">
          <img className="h-10 -ml-7" src={coin.image} alt="" />
          .<p className="flex items-center ml-2">{coin.symbol.toUpperCase()}</p>
        </div>
        <p className="pr-3">${coin.current_price.toLocaleString()}</p>
        <p >{coin.price_change_percentage_24h.toFixed(2)}%</p>
        <p className="hidden md:block">${coin.total_volume.toLocaleString()}</p>
        <p className="hidden md:block">${coin.market_cap.toLocaleString()}</p>
  */
