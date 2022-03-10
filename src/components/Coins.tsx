import CoinItem from "./CoinItem";


const Coins = (props) => {
  return (
    <div className="font-ubuntu text-white max-w-6xl m-auto mt-20 bg-navyblue"> {/*Container*/}
      
        <div className="flex justify-between items-center bg-navyblue w-auto border-r-8 m-2 p-2 font-bold border-4 rounded-xl border-lightblue"> {/*Header*/}
          <p>#</p>
          <p className="-ml-16">Coin</p>
          <p>Price</p>
          <p>24h</p>
          <p className="hidden md:block">Volume</p>
          <p className="hidden md:block">Mkt Cap</p>
        </div>

        {props.coins.map((coins) => {
          return <CoinItem coins={coins} key={coins.id} />;
        })}
      
    </div>
  );
};

export default Coins;
