import { useShoppingCart } from "../context/ShoppingCartContext";
import styles from "./Review.module.css";
import { formatCurrency } from "../utilities/formatCurrency";
import data from "../data/data.json";

type Props = {
  giftPackaging?: boolean;
  page: string;
  deliveryPrice?: () => { value: number; label: string };
  selectedDelivery?: string;
  selectedPayment?: string;
};

export function Review({
  giftPackaging,
  page,
  deliveryPrice,
  selectedDelivery,
  selectedPayment,
}: Props) {
  const { cartItems, giftPackagingPrice } = useShoppingCart();
  // console.log(typeof formatCurrency(4));

  return (
    <div className={styles.review}>
      <section className={styles.cart_summary}>
        {cartItems.map((p) => {
          const product = data.find((item) => item.id === p.id);
          if (!product) return null;
          const selectedColor = () => {
            if (product.colorOptions.length > 1) {
              // const color = product.colorOptions.find((item) => item.id === product.id);
              // console.log("TOTO->", color?.color);
              return product.colorOptions.find((item) => item.id === product.id)
                ?.color;
            }
          };

          return (
            <div className={styles.product_review}>
              <img
                className={styles.img}
                src={product.imgUrl[0]}
                alt="product-image"
              />
              <p className={styles.product_name}>
                <span className={styles.qnt}> {p.quantity} x </span>
                {product.name} - {product.description}
              </p>

              <p className={styles.price_review}>
                {formatCurrency(p.quantity * product.price)}
              </p>
            </div>
          );
        })}
      </section>
      {page === "delivery" ? (
        <section className={styles.summary_section}>
          <div className={styles.row}>
            <p className={styles.supporting_text}>Doprava:</p>

            {selectedDelivery === "packeta-box" && (
              <>
                <p>Packeta - Z-BOX</p>
                <p className={styles.summary_section_price}>
                  {deliveryPrice?.().label}
                </p>
              </>
            )}
            {selectedDelivery === "packeta-home" && (
              <>
                <p>Packeta - kuriér</p>
                <p className={styles.summary_section_price}>
                  {deliveryPrice?.().label}
                </p>
              </>
            )}
            {selectedDelivery === "ppl-box" && (
              <>
                <p>PPL - Parcelbox</p>
                <p className={styles.summary_section_price}>
                  {deliveryPrice?.().label}
                </p>
              </>
            )}
            {selectedDelivery === "ppl-home" && (
              <>
                <p>PPL - kuriér</p>
                <p className={styles.summary_section_price}>
                  {deliveryPrice?.().label}
                </p>
              </>
            )}
          </div>
          <div className={styles.row}>
            <p className={styles.supporting_text}>Platba:</p>
            {selectedPayment === "card" && (
              <>
                <p>Kartou online</p>
                <p className={styles.summary_section_price}>zdarma</p>
              </>
            )}
            {selectedPayment === "paypal" && (
              <>
                <p>PayPal</p>
                <p className={styles.summary_section_price}>zdarma</p>
              </>
            )}
            {selectedPayment === "transaction" && (
              <>
                <p>Bankový prevod</p>
                <p className={styles.summary_section_price}>zdarma</p>
              </>
            )}
          </div>
          <div className={styles.row}>
            <p className={styles.supporting_text}>Balenie:</p>
            {giftPackaging ? (
              <>
                <p>Darčekové</p>
                <p className={styles.summary_section_price}>
                  {formatCurrency(giftPackagingPrice)}
                </p>
              </>
            ) : (
              <>
                <p>Štandardné</p>
                <p className={styles.summary_section_price}>zdarma</p>
              </>
            )}
          </div>
        </section>
      ) : null}
      <div>
        {page === "billing" && (
          <p
            className={`${styles.secondary_text} ${styles.gift} ${giftPackaging && styles.active}`}
          >
            + Darčekové balenie {formatCurrency(giftPackagingPrice)}
          </p>
        )}
      </div>
      <div className={`${styles.total_price_container}`}>
        <p className={`${styles.secondary_text} `}>Celkom s DPH </p>
        <p className={styles.total_price}>
          {formatCurrency(
            cartItems.reduce((total, cartItem) => {
              const product = data.find((item) => item.id === cartItem.id);
              return total + (product?.price || 0) * cartItem.quantity;
            }, 0) +
              (giftPackaging ? giftPackagingPrice : 0) +
              (deliveryPrice ? deliveryPrice().value : 0),
          )}{" "}
        </p>
      </div>
    </div>
  );
}
