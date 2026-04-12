import styles from "./Navbar.module.css";
import { Link } from "react-router";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { formatCurrency } from "../utilities/formatCurrency";

export function Navbar() {
  const { getTotalQnt, favs, freeDeliveryPrice } = useShoppingCart();

  return (
    <div className={styles.container}>
      <div className={styles.delivery_info}>
        <p>Doprava zdarma pri nákupe nad {formatCurrency(freeDeliveryPrice)}</p>
      </div>
      <ul>
        <Link to="/">
          <div className={styles.left_side}>
            <svg
              className={styles.svg}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <path d="M9 22V12h6v10" />
            </svg>
          </div>
        </Link>
        <h1 className={styles.logo}>PEARLA</h1>
        <div className={styles.right_side}>
          <Link to="/favorites" className={styles.link}>
            <div className={styles.wrapper}>
              <svg
                className={styles.svg}
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>{" "}
              <div className={styles.integer}>
                <p>{favs.length === 0 ? 0 : favs.length}</p>
              </div>
            </div>
          </Link>
          <Link to="/checkout" className={styles.link}>
            <div className={styles.wrapper}>
              <svg
                className={styles.svg}
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.75 8.25A.75.75 0 0 0 3 9v10.125c0 1.418 1.207 2.625 2.625 2.625h12.75c1.418 0 2.625-1.149 2.625-2.566V9a.75.75 0 0 0-.75-.75H3.75Z"
                  clipRule="evenodd"
                />
                <path d="M7.5 8.25v-1.5a4.5 4.5 0 0 1 4.5-4.5v0a4.5 4.5 0 0 1 4.5 4.5v1.5" />
              </svg>
              {/* <svg
                className={styles.svg}
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9 20a1 1 0 1 0 0 2 1 1 0 1 0 0-2z" />
                <path d="M20 20a1 1 0 1 0 0 2 1 1 0 1 0 0-2z" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>{" "} */}
              <div className={styles.integer}>
                <p>{getTotalQnt()}</p>
              </div>
            </div>
          </Link>
        </div>
      </ul>
    </div>
  );
}
