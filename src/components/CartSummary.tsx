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
  const { cartItems } = useShoppingCart();
  const navigate = useNavigate();

  let totalPrice = cartItems.reduce((total, cartItem) => {
    const product = data.find((item) => item.id === cartItem.id);
    return total + (product?.price || 0) * cartItem.quantity;
  }, 0);

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
            {/* <p>summary</p> */}
            <section
              className={`${styles.cart_items_section} ${
                variant === "big" ? styles.big : styles.mini
              }`}
            >
              {cartItems.length === 0 ? (
                <div>empty cart</div>
              ) : (
                cartItems.map((item) => {
                  return (
                    <CartItem
                      key={item.id}
                      {...item}
                      variant={variant === "big" ? "big" : "mini"}
                    />
                  );
                })
              )}
            </section>
            <p>
              Celkom s DPH{" "}
              {formatCurrency(
                cartItems.reduce((total, cartItem) => {
                  const product = data.find((item) => item.id === cartItem.id);
                  return total + (product?.price || 0) * cartItem.quantity;
                }, 0),
              )}
            </p>
            {variant === "big" ? (
              <section className={styles.step_controls}>
                <button
                  className={styles.step_controls__prev}
                  onClick={() => navigate("/")}
                >
                  Späť
                </button>
                <button
                  className={styles.step_controls__next}
                  onClick={() => setStep("billing")}
                >
                  Pokračovať v objednávke
                </button>
              </section>
            ) : null}

            {variant === "mini" ? (
              <>
                {Number(totalPrice.toFixed(2)) >= 49 ? (
                  <p>Dopravu máš zdarma</p>
                ) : (
                  <p>
                    Nakúp ešte za{" "}
                    <span>
                      {formatCurrency(49 - Number(totalPrice.toFixed(2)))}
                    </span>{" "}
                    a využi dopravu zdarma{" "}
                  </p>
                )}

                <input
                  type="range"
                  min={0}
                  max={49}
                  value={totalPrice.toFixed(2)}
                />
                <button onClick={() => navigate(`/checkout`)}>
                  Prejsť do košíka
                </button>
              </>
            ) : null}
          </div>
        </>
      ) : (
        <div style={{ margin: 40 }}>
          <p style={{ fontSize: 28 }}>empty 💔</p>
        </div>
      )}
    </>
  );
}
