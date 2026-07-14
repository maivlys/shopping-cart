// import { useShoppingCart } from "../context/ShoppingCartContext";
import styles from "./CartSummary.module.css";
import { CartItem } from "./CartItem";
import { formatCurrency } from "../utilities/formatCurrency";
import { useNavigate } from "react-router-dom";
import { FREE_DELIVERY_PRICE } from "../config/constants";
import { useProducts } from "../hooks/useProducts";
import { useCartStore } from "../store/useCartStore";

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
  // const { cartItems, freeDeliveryPrice, data } = useShoppingCart();
  // const { items: cartItems } = useCartStore();
  const cartItems = useCartStore((s) => s.items);
  const { data: products = [] } = useProducts();
  const navigate = useNavigate();

  let totalPrice = cartItems.reduce((total, cartItem) => {
    const product = products.find((item) => item.id === cartItem.id);
    return total + (product?.price || 0) * cartItem.quantity;
  }, 0);

  const percentage = (totalPrice / FREE_DELIVERY_PRICE) * 100;

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
                    const product = products.find(
                      (item) => item.id === cartItem.id,
                    );
                    return total + (product?.price || 0) * cartItem.quantity;
                  }, 0),
                )}
              </p>
            </div>

            {props.variant === "mini" ? (
              <div className={styles.mini_version_delivery_limit}>
                {Number(totalPrice.toFixed(2)) >= FREE_DELIVERY_PRICE ? (
                  <p className={styles.secondary_text}>
                    Dopravu máš{" "}
                    <span style={{ fontWeight: "bold" }}>zdarma</span>
                  </p>
                ) : (
                  <p className={styles.secondary_text}>
                    Nakúp ešte za{" "}
                    <span className={styles.price}>
                      {formatCurrency(
                        FREE_DELIVERY_PRICE - Number(totalPrice.toFixed(2)),
                      )}
                    </span>{" "}
                    a využi dopravu{" "}
                    <span style={{ fontWeight: "bold" }}>zdarma</span>{" "}
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
                    src="/truck-icon.svg"
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
          <img src="/empty_cart.png" alt="empty-cart-illustration" />
          <p className={styles.message}>Tvoj košík je zatiaľ prázdny</p>
        </div>
      )}
    </>
  );
}
