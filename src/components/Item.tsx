import { firestore } from "firebase";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import * as itemActions from "../redux/actions/itemActions";

import Button from "./Button";

import "./Item.css";

interface Props {
  itemRef?: firestore.DocumentReference;
  detailed?: boolean;
  placeholder?: string;
  buttons?: any;
  itemBuy: (
    itemRef: firestore.DocumentReference,
    currency: string,
    amount: number
  ) => any;
  itemEquip: (itemRef: firestore.DocumentReference) => any;
  itemSell: (itemRef: firestore.DocumentReference, amount: number) => any;
}

export const Item: React.FC<Props> = (props) => {
  const {
    itemRef,
    detailed,
    placeholder,
    buttons,
    itemBuy,
    itemEquip,
    itemSell,
  } = props;

  const [itemData, setItemData] = useState<firestore.DocumentData>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (itemRef) {
      itemRef
        .get()
        .then((itemSnap) => {
          setItemData(itemSnap.data());
        })
        .then(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [itemRef]);

  if (loading) {
    return <div>Loading</div>;
  }

  return (
    <div className={detailed ? "card__container" : "item__container"}>
      <div className="item__image">
        {itemData ? (
          <img src={itemData.image} alt={itemData.type} />
        ) : (
          <img
            src={require(`../assets/${placeholder}-placeholder.png`)}
            alt={placeholder}
          />
        )}
      </div>

      {detailed && itemData && itemRef ? (
        <div className="item__details">
          <div className="item__name">{itemData.name}</div>
          <div className="item__stats">
            {Object.entries(itemData.stats).map(([key, value]) => (
              <span className="item__stat" key={key}>
                +{value} {key}{" "}
                <img
                  src={require(`../assets/${key}.png`)}
                  height="13"
                  width="13"
                  alt=""
                />
              </span>
            ))}
          </div>
          <div className="item__buttons">
            {buttons.buy ? (
              <>
                <Button
                  icon={require("../assets/icons/gold.png")}
                  small
                  onClick={() => itemBuy(itemRef, "gold", itemData.price.gold)}
                >
                  Buy for {itemData.price.gold}
                </Button>
                <Button
                  icon={require("../assets/icons/silver.png")}
                  small
                  onClick={() =>
                    itemBuy(itemRef, "silver", itemData.price.silver)
                  }
                >
                  Buy for {itemData.price.silver}
                </Button>
              </>
            ) : null}
            {buttons.sell ? (
              <Button
                icon={require("../assets/icons/silver.png")}
                small
                onClick={() => itemSell(itemRef, itemData.price.silver / 2)}
              >
                Sell for {itemData.price.silver / 2}
              </Button>
            ) : null}
            {buttons.equip ? (
              <Button
                icon={require("../assets/icons/helmet.png")}
                small
                onClick={() => itemEquip(itemRef)}
              >
                Equip
              </Button>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
};

const mapDispatch = {
  itemEquip: itemActions.itemEquip,
  itemBuy: itemActions.itemBuy,
  itemSell: itemActions.itemSell,
};

export default connect(null, mapDispatch)(Item);
