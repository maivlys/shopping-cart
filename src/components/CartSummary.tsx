import { useShoppingCart } from "../context/ShoppingCartContext";
import styles from "./CartSummary.module.css";
import data from "../data/data.json";
import { CartItem } from "./CartItem";
import { formatCurrency } from "../utilities/formatCurrency";
import { useNavigate } from "react-router-dom";

type Props = {
  variant?: "big" | "mini";
  setStep: React.Dispatch<React.SetStateAction<string>>;
};

export function CartSummary({ variant = "big", setStep }: Props) {
  const { cartItems, freeDeliveryPrice } = useShoppingCart();
  const navigate = useNavigate();

  let totalPrice = cartItems.reduce((total, cartItem) => {
    const product = data.find((item) => item.id === cartItem.id);
    return total + (product?.price || 0) * cartItem.quantity;
  }, 0);

  const percentage = (totalPrice / freeDeliveryPrice) * 100;

  // console.log(typeof totalPrice);

  // const navigate = useNavigate();

  return (
    <>
      {cartItems.length !== 0 ? (
        <>
          <div
            className={`${styles.container} ${
              variant === "big" ? styles.big : styles.mini
            }`}
          >
            <p className={styles.p}>Zhrnutie objednávky</p>
            {/* <p>summary</p> */}
            <section
              className={`${styles.cart_items_section} ${
                variant === "big" ? styles.big : styles.mini
              }`}
            >
              {/* {cartItems.length === 0 ? (
                <div>empty cart</div>
              ) : ( */}
              {cartItems.map((item) => {
                return (
                  <CartItem
                    key={item.id}
                    {...item}
                    variant={variant === "big" ? "big" : "mini"}
                  />
                );
              })}
              {/* )} */}
            </section>
            <div
              className={`${styles.total_price_container} ${
                variant === "big" ? styles.big : styles.mini
              }`}
            >
              <p className={`${styles.secondary_text} `}>Celkom s DPH </p>
              <p className={styles.total_price}>
                {formatCurrency(
                  cartItems.reduce((total, cartItem) => {
                    const product = data.find(
                      (item) => item.id === cartItem.id,
                    );
                    return total + (product?.price || 0) * cartItem.quantity;
                  }, 0),
                )}
              </p>
            </div>

            {variant === "mini" ? (
              <div className={styles.mini_version_delivery_limit}>
                {Number(totalPrice.toFixed(2)) >= freeDeliveryPrice ? (
                  <p className={styles.secondary_text}>Dopravu máš zdarma</p>
                ) : (
                  <p className={styles.secondary_text}>
                    Nakúp ešte za{" "}
                    <span className={styles.price}>
                      {formatCurrency(
                        freeDeliveryPrice - Number(totalPrice.toFixed(2)),
                      )}
                    </span>{" "}
                    a využi dopravu zdarma{" "}
                  </p>
                )}

                <div
                  className={styles.slider}
                  style={{
                    background: `linear-gradient(
                                    to right,
                                    rgb(228, 159, 197) 0%,
                                    rgb(228, 159, 197) ${percentage}%,
                                    #ffffff ${percentage}%,
                                    #ffffff 100%
                                  )`,
                  }}
                >
                  <img
                    className={styles.truck}
                    style={{
                      left: `${percentage > 100 ? "95" : percentage - 5}%`,
                    }}
                    src="/public/truck-icon.svg"
                    alt=""
                  />
                  {/* <svg
                    className={styles.truck}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M7 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
                    <path d="M17 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
                    <path d="M13 6h5l3 5v6h-2" />
                    <path d="M5 17H3V6a1 1 0 0 1 1-1h9v12" />
                    <path d="M9 17h6" />
                    <path d="M21 11h-8" />
                  </svg> */}
                </div>

                {/* <input
                  className={styles.slider}
                  type="range"
                  min={0}
                  max={freeDeliveryPrice}
                  value={totalPrice.toFixed(2)}
                  style={{
                    // width: "300px",
                    height: "6px",
                    borderRadius: "5px",
                    // appearance: "none",
                    // outline: "none",
                    background: `linear-gradient(
          to right,
          rgb(228, 159, 197) 0%,
          rgb(228, 159, 197) ${totalPrice.toFixed(2)}%,
          #ffffff ${totalPrice.toFixed(2)}%,
          #ffffff 100%
        )`,
                  }}
                /> */}
                <button
                  className={`${styles.step_controls__next} ${styles.mini}`}
                  onClick={() => navigate(`/checkout`)}
                >
                  Prejsť do košíka
                </button>
              </div>
            ) : null}
          </div>
          {variant === "big" ? (
            <section className={styles.step_controls}>
              <button
                className={styles.step_controls__prev}
                onClick={() => navigate("/")}
              >
                Späť k nákupu
              </button>
              <button
                className={styles.step_controls__next}
                onClick={() => setStep("billing")}
              >
                Pokračovať v objednávke
              </button>
            </section>
          ) : null}
        </>
      ) : (
        <div className={`${styles.empty_cart_container}`}>
          <img src="/public/empty_cart.png" alt="empty-cart-illustration" />
          <p className={styles.message}>Tvoj košík je zatiaľ prázdny</p>
        </div>
      )}
    </>
  );
}
