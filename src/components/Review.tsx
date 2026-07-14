// import { useShoppingCart } from "../context/ShoppingCartContext";
import styles from "./Review.module.css";
import { formatCurrency } from "../utilities/formatCurrency";
import { GIFT_PACKAGING_PRICE } from "../config/constants";
import { useCartStore } from "../store/useCartStore";
import { useProducts } from "../hooks/useProducts";

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
  // const { cartItems, giftPackagingPrice, data } = useShoppingCart();
  const cartItems = useCartStore((s) => s.items);
  const { data: products = [] } = useProducts();

  return (
    <div className={styles.review}>
      <section className={styles.cart_summary}>
        {cartItems.map((p) => {
          const product = products.find((item) => item.id === p.id);
          if (!product) return null;

          return (
            <div className={styles.product_review}>
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
                  {formatCurrency(GIFT_PACKAGING_PRICE)}
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
            + Darčekové balenie {formatCurrency(GIFT_PACKAGING_PRICE)}
          </p>
        )}
      </div>
      <div className={`${styles.total_price_container}`}>
        <p className={`${styles.secondary_text} `}>Celkom s DPH </p>
        <p className={styles.total_price}>
          {formatCurrency(
            cartItems.reduce((total, cartItem) => {
              const product = products.find((item) => item.id === cartItem.id);
              return total + (product?.price || 0) * cartItem.quantity;
            }, 0) +
              (giftPackaging ? GIFT_PACKAGING_PRICE : 0) +
              (deliveryPrice ? deliveryPrice().value : 0),
          )}{" "}
        </p>
      </div>
    </div>
  );
}
