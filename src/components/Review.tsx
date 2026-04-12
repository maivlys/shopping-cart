import { useShoppingCart } from "../context/ShoppingCartContext";
import styles from "./Review.module.css";
import { formatCurrency } from "../utilities/formatCurrency";
import data from "../data/data.json";

export function Review() {
  const { cartItems } = useShoppingCart();

  return (
    <div className={styles.review}>
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
            <img src={product.imgUrl[0]} alt="product-image" />
            <p>
              {product.name}{" "}
              {product.description.includes("-") ? `- ${selectedColor()}` : ""}
            </p>

            <p>
              {p.quantity} x {formatCurrency(product.price)}
            </p>
            <p className={styles.price_review}>
              {formatCurrency(p.quantity * product.price)}
            </p>
          </div>
        );
      })}
    </div>
  );
}
