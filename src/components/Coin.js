import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import DOMPurify from "dompurify";
import { NavBar } from "./NavBar";
import Footer from "./Footer";

const Coin = () => {
  const [coin, setCoin] = useState({});
  const params = useParams();
  const url = `https://api.coingecko.com/api/v3/coins/${params.coinId}`;

  useEffect(() => {
    axios
      .get(url)
      .then((res) => {
        setCoin(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="bg-[url('../public/images/bitcoin-inverted.png')] bg-cover bg-no-repeat w-full h-full text-white font-ubuntu items-center text-center">
      <NavBar />
      <div className="max-w-4xl my-8 m-auto p-2 flex flex-col bg-navyblue rounded-xl"> {/*coin container*/}
        <div>  {/*content*/}
          <h1 className="text-7xl text-bold underline">{coin.name}</h1>
        </div>
        <div className="p-2 mt-6 px-4 bg-lightblue border-2"> {/*content*/}
          <div className="flex flex-row w-full m-auto justify-between align-middle items-center border-2"> {/*buy and prices*/}
            
            <div className="py-8 w-full flex border-2"> {/*info*/}
              <p className="">Rank #{coin.market_cap_rank}</p> 
              {coin.image ? <img src={coin.image.small} alt="" /> : null}
              {coin.symbol ? <p>{coin.symbol.toUpperCase()}</p> : null}
            </div>

            <div className="py-8 w-full flex flex-col border-2"> {/*buy*/}
              <input className="text-black text-bold w-1/2" placeholder=".005"/>
              <button className="w-4 h-2 bg-">Buy</button>
            </div>

            <div className="py-8 w-full flex  border-2"> {/*price*/}
              {coin.market_data?.current_price ? (
                <h1 className="text-4xl text-bold">
                  ${coin.market_data.current_price.usd.toLocaleString()}
                </h1>
              ) : null}
            </div>

          </div>
        </div>
        <div> {/*table*/}
          <table className="m-auto w-full my-8 border-2">
            <thead>
              <tr className="bg-lightblue">
                <th className="p-2 border-2">1h</th>
                <th className="p-2 border-2">24h</th>
                <th className="p-2 border-2">7d</th>
                <th className="p-2 border-2">14d</th>
                <th className="p-2 border-2">30d</th>
                <th className="p-2 border-2">1yr</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border-2">
                  {coin.market_data?.price_change_percentage_1h_in_currency ? (
                    <p>
                      {coin.market_data.price_change_percentage_1h_in_currency.usd.toFixed(
                        1
                      )}
                      %
                    </p>
                  ) : null}{" "}
                </td>
                <td className="border-2">
                  {coin.market_data?.price_change_percentage_24h_in_currency ? (
                    <p>
                      {coin.market_data.price_change_percentage_24h_in_currency.usd.toFixed(
                        1
                      )}
                      %
                    </p>
                  ) : null}{" "}
                </td>
                <td className="border-2">
                  {coin.market_data?.price_change_percentage_7d_in_currency ? (
                    <p>
                      {coin.market_data.price_change_percentage_7d_in_currency.usd.toFixed(
                        1
                      )}
                      %
                    </p>
                  ) : null}{" "}
                </td>
                <td className="border-2">
                  {coin.market_data?.price_change_percentage_14d_in_currency ? (
                    <p>
                      {coin.market_data.price_change_percentage_14d_in_currency.usd.toFixed(
                        1
                      )}
                      %
                    </p>
                  ) : null}{" "}
                </td>
                <td className="border-2">
                  {coin.market_data?.price_change_percentage_30d_in_currency ? (
                    <p>
                      {coin.market_data.price_change_percentage_30d_in_currency.usd.toFixed(
                        1
                      )}
                      %
                    </p>
                  ) : null}{" "}
                </td>
                <td className="border-2">
                  {coin.market_data?.price_change_percentage_1y_in_currency ? (
                    <p>
                      {coin.market_data.price_change_percentage_1y_in_currency.usd.toFixed(
                        1
                      )}
                      %
                    </p>
                  ) : null}{" "}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div> {/*Content*/}
          <div className="grid grid-cols-2 gap-6 w-full"> {/*stats*/}
            <div className="bg-lightblue"> {/*left*/}
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
            <div className="bg-lightblue"> {/*right*/}
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
          <div className="p-5"> {/*about coin*/}
            <h3>About</h3>
            <p
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(
                  coin.description ? coin.description.en : ""
                ),
              }}
            ></p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Coin;
