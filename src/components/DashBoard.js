import { useEffect, useState } from "react";
import { useUserAuth } from "./userAuthContext";
import { collection } from "firebase/firestore";
import { db } from "../firebase-config";
import { NavBar } from "./NavBar";
import axios from "axios";
import Coins from "./Coins";
import Footer from "./Footer";

export const DashBoard = () => {
  const { user } = useUserAuth();
  const [coins, setCoins] = useState([]);
  const url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false";

  useEffect(() => {
    axios.get(url).then((response) => {
      setCoins(response.data);
    }).catch((err) => {
      console.log(err);
    })
  }, []);

  return (
    <div className="h-auto bg-[url('../public/images/bitcoin-inverted.png')]">
      <NavBar />
      <Coins coins={coins}/>
      <Footer />
    </div>
  );
};
