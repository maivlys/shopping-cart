import data from "../data/data.json";
import styles from "./CartItem.module.css";
import { formatCurrency } from "../utilities/formatCurrency";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

type CartItemProps = {
  id: number;
  quantity: number;
  variant?: "big" | "mini";
};

export function CartItem({ id, quantity, variant }: CartItemProps) {
  const { increaseQnt, decreaseQnt, removeFromCart } = useShoppingCart();
  const navigate = useNavigate();

  const product = data.find((item) => item.id === id);
  if (!product) return null; //in case of undefined

  const selectedColor = () => {
    if (product.colorOptions.length > 1) {
      // const color = product.colorOptions.find((item) => item.id === product.id);
      // console.log("TOTO->", color?.color);
      return product.colorOptions.find((item) => item.id === product.id)?.color;
    }
  };

  // console.log(product.description);

  // selectedColor();

  return (
    <div
      className={`${styles.container} ${
        variant === "big" ? styles.big : styles.mini
      }`}
    >
      <div className={styles.product_review}>
        <img
          src={product.imgUrl[0]}
          alt="product-image"
          className={`${styles.cart_product_img} ${
            variant === "big" ? styles.big : styles.mini
          }`}
          onClick={() => {
            variant === "big" ? navigate(`/product/${product.id}`) : null;
          }}
        />
        <div
          className={`${styles.info} ${
            variant === "big" ? styles.big : styles.mini
          }`}
        >
          <p className={styles.product_name}>
            {product.name}
            {variant === "big"
              ? `- ${product.description}`
              : product.description.includes("-")
                ? `- ${selectedColor()}`
                : null}
            {/* {product.description.includes("-") ? `- ${selectedColor()}` : ""} */}
          </p>
          <p className={styles.unit_price}>
            {formatCurrency(product.price)} /ks
          </p>
          <div
            className={`${styles.qnt_section} ${
              variant === "big" ? styles.big : styles.mini
            }`}
          >
            <button
              className={styles.qnt_control}
              onClick={() => decreaseQnt(id)}
            >
              -
            </button>
            <input
              readOnly
              type="text"
              value={quantity}
              className={`${styles.input} ${
                variant === "big" ? styles.big : styles.mini
              }`}
            />
            <button
              className={styles.qnt_control}
              onClick={() => increaseQnt(id)}
            >
              +
            </button>
          </div>

          <button
            className={styles.remove_button}
            onClick={() => removeFromCart(id)}
          >
            <svg
              className={styles.svg_bin}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M3 6h18" />
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
              <path d="M10 11v6" />
              <path d="M14 11v6" />
            </svg>
          </button>
        </div>
      </div>
      <div>
        <p className={styles.price}>
          {formatCurrency(product.price * quantity)}
        </p>{" "}
      </div>
    </div>
  );
}
