import React, { useState } from "react";
import Coin from "./Coin";

function CoinToss(props) {
  const [coin, setCoin] = useState(props.coins[0]);
  const [headsCount, setHeadsCount] = useState(0);
  const [tailsCount, setTailsCount] = useState(0);
  const [flipping, setFlipping] = useState(false);

  const animateFlip = () => {
    setFlipping(true);
    setTimeout(() => {
      setFlipping(false);
    }, 400);
  };

  const handleClick = () => {
    const randIdx = Math.floor(Math.random() * 2);
    const newCoin = props.coins[randIdx];
    setCoin(newCoin);
    if (newCoin.side === "heads") {
      setHeadsCount(headsCount + 1);
    } else {
      setTailsCount(tailsCount + 1);
    }
    if (!props.testing) {
      animateFlip();
    }
  };
  let firstFlip = (headsCount + tailsCount) === 0 ? true : false
  return (
    <>
      <h1 className="mb-3">Let's flip a coin!</h1>
      <Coin side={coin.side} imgSrc={coin.imgSrc} flip={flipping} first={firstFlip}/>
      <button
        className="btn btn-secondary my-3"
        onClick={handleClick}
        disabled={flipping}
      >
        FLIP MEEEE
      </button>
      <p>
        Out of {headsCount + tailsCount} flips, there have been {headsCount}{" "}
        heads and {tailsCount} tails.
      </p>
    </>
  );
}

CoinToss.defaultProps = {
  coins: [
    {
      side: "heads",
      imgSrc:
        "https://fortunetellingplus.com/assets/img/coins/Half-Dollar-2016-head.png?quality=50",
    },
    {
      side: "tails",
      imgSrc:
        "https://fortunetellingplus.com/assets/img/coins/Half-Dollar-2016-tail.png?quality=50",
    },
  ],
  testing: false,
};

export default CoinToss;
