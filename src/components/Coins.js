import { Link } from "react-router-dom";
import Coin from "./Coin";
import CoinItem from "./CoinItem";
import ProtectedRoute from "./ProtectedRoute";


const Coins = (props) => {


  return (
    <div className="font-ubuntu text-white max-w-6xl m-auto mt-20 bg-navyblue w-full"> {/*Container*/}
      <div className="flex justify-between items-center bg-navyblue w-auto border-r-8 m-0 p-6 font-bold border-4 rounded-xl border-lightblue"> {/*Header*/}
        <p>#</p>
        <p className="-ml-16">Coin</p>
        <p>Price</p>
        <p>24h</p>
        <p className="hidden md:block">Volume</p>
        <p className="hidden md:block">Market Cap</p>
      </div>
      {props.coins.map(coins => {
        return ( 
          
          <Link to={`/coin/${coins.id}`} element={<ProtectedRoute><Coin /> </ProtectedRoute>} key={coins.id} exact>
            <CoinItem coins={coins} />
          </Link>
        );
      })}
    </div>
  );
};

export default Coins;
