import styles from "./Navbar.module.css";
import { Link } from "react-router";
import { useShoppingCart } from "../context/ShoppingCartContext";

export function Navbar() {
  const { getTotalQnt, favs } = useShoppingCart();

  return (
    <div className={styles.container}>
      <ul>
        <Link to="/">Produkty</Link>
        <Link to="/favorites">
          <div>
            <svg
              width={25}
              height={25}
              fill="none"
              stroke="#000000"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>{" "}
            <span>{favs.length === 0 ? 0 : favs.length}</span>
          </div>
        </Link>
        <Link to="/checkout">
          <div>
            <svg
              width={25}
              height={25}
              fill="none"
              stroke="#000000"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M9 20a1 1 0 1 0 0 2 1 1 0 1 0 0-2z" />
              <path d="M20 20a1 1 0 1 0 0 2 1 1 0 1 0 0-2z" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>{" "}
            <span>{getTotalQnt()}</span>
          </div>
        </Link>
      </ul>
    </div>
  );
}
