import { useShoppingCart } from "../context/ShoppingCartContext";
import styles from "./CartSummary.module.css";
import data from "../data/data.json";
import { CartItem } from "./CartItem";
import { formatCurrency } from "../utilities/formatCurrency";
import { useNavigate } from "react-router-dom";

type Props =
  | {
      variant: "mini";
      setStep?: never;
    }
  | {
      variant?: "big";
      setStep: React.Dispatch<React.SetStateAction<string>>;
    };

export function CartSummary(props: Props) {
  const { cartItems, freeDeliveryPrice } = useShoppingCart();
  const navigate = useNavigate();

  let totalPrice = cartItems.reduce((total, cartItem) => {
    const product = data.find((item) => item.id === cartItem.id);
    return total + (product?.price || 0) * cartItem.quantity;
  }, 0);

  const percentage = (totalPrice / freeDeliveryPrice) * 100;

  return (
    <>
      {cartItems.length !== 0 ? (
        <>
          <div
            className={`${styles.container} ${
              props.variant === "big" ? styles.big : styles.mini
            }`}
          >
            <p className={styles.p}>Zhrnutie objednávky</p>
            <section
              className={`${styles.cart_items_section} ${
                props.variant === "big" ? styles.big : styles.mini
              }`}
            >
              {cartItems.map((item) => {
                return (
                  <CartItem
                    key={item.id}
                    {...item}
                    variant={props.variant === "big" ? "big" : "mini"}
                  />
                );
              })}
            </section>
            <div
              className={`${styles.total_price_container} ${
                props.variant === "big" ? styles.big : styles.mini
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

            {props.variant === "mini" ? (
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
                </div>

                <button
                  className={`${styles.step_controls__next} ${styles.mini}`}
                  onClick={() => navigate(`/checkout`)}
                >
                  Prejsť do košíka
                </button>
              </div>
            ) : null}
          </div>
          {props.variant === "big" ? (
            <section className={styles.step_controls}>
              <button
                className={styles.step_controls__prev}
                onClick={() => navigate("/")}
              >
                Späť k nákupu
              </button>
              <button
                className={styles.step_controls__next}
                onClick={() => props.setStep("billing")}
              >
                Pokračovať v objednávke
              </button>
            </section>
          ) : null}
        </>
      ) : (
        <div
          className={`${styles.empty_cart_container} ${
            props.variant === "mini" ? styles.mini : ""
          }`}
        >
          <img src="/public/empty_cart.png" alt="empty-cart-illustration" />
          <p className={styles.message}>Tvoj košík je zatiaľ prázdny</p>
        </div>
      )}
    </>
  );
}
