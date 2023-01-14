import React from "react";
import "./Coin.css";

function Coin(props) {
  let flipClass = props.flip ? "flip" : "";
  let hidden = props.first ? "hidden" : "";
  let imgSrc = props.flip
    ? "https://www.pngkit.com/png/full/925-9258654_blank-coin-clip-art-at-clker-blank-silver.png"
    : props.imgSrc;
  return (
    <div className="Coin">
      <img
        className={`${flipClass} ${hidden}`}
        src={imgSrc}
        alt={props.side}
        data-testid="coin"
      />
    </div>
  );
}

export default Coin;
