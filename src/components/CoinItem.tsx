const CoinItem = (props) => {
  return (
    <div className="font-ubuntu flex justify-between items-center font-semibold bg-navyblue
    shadow-md shadow-lightblue border-r-8 border-4 border-lightblue rounded-xl m-8 p-4 hover:scale-[1.03]
     duration-75 ease-in-out cursor-pointer"> {/*Coin Row*/}
      <p>{props.coins.market_cap_rank}</p>
      <div className="flex">
        <img className="h-10 m-auto mr-3 w-auto" src={props.coins.image} alt="" />
        <p className="flex items-center">{props.coins.symbol.toUpperCase()}</p>
      </div>
      <p>{props.coins.current_price.toLocaleString()}</p>
      <p>{props.coins.price_change_percentage_24h.toFixed(2)}%</p>
      <p className="hidden md:block">${props.coins.total_volume.toLocaleString()}</p>
      <p className="hidden md:block">${props.coins.market_cap.toLocaleString()}</p>
    </div>
  );
};

export default CoinItem;
