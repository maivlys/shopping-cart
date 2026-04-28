import styles from "./StoreProduct.module.css";
import { formatCurrency } from "../utilities/formatCurrency";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { useNavigate } from "react-router";
import { useState } from "react";

type ProductItemProps = {
  product: {
    id: number;
    name: string;
    description: string;
    price: number;
    imgUrl: string[];
    colorOptions: {
      color: string;
      id: number;
    }[];
    material: string;
    length: string;
  };
  page: string;
};

export function StoreProduct({ product, page }: ProductItemProps) {
  const {
    increaseQnt,
    decreaseQnt,
    isInCart,
    isFav,
    addToFavs,
    removeFromFavs,
    cartItems,
  } = useShoppingCart();
  const navigate = useNavigate();

  const [addedInfo, setAddedInfo] = useState<boolean>(false);
  const isStorePage = page === "store";

  const productQnt = cartItems.find((p) => p.id === product.id)?.quantity;

  function handleClick(id: number) {
    if (isFav(id)) {
      removeFromFavs(id);
    } else {
      addToFavs(id);
    }
  }

  return (
    <div className={styles.container} key={product.id}>
      <div className={styles.image_container}>
        <img
          onClick={() => {
            navigate(`/product/${product.id}`);
          }}
          className={styles.img}
          src={product.imgUrl[0]}
          alt="product-image"
        />
        <div
          className={`${styles.svg_circle}`}
          onClick={() => handleClick(product.id)}
        >
          <svg
            className={`${isStorePage ? styles.heart : styles.bin}
                        ${isStorePage && isFav(product.id) ? styles.fav : ""}`}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {page === "store" ? (
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            ) : (
              <>
                {" "}
                <path d="M3 6h18" />
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                <path d="M10 11v6" />
                <path d="M14 11v6" />
              </>
            )}
          </svg>
        </div>
      </div>
      <p
        onClick={() => {
          navigate(`/product/${product.id}`);
        }}
        className={styles.product_description}
      >
        <span className={styles.product_name}>{product.name}</span> -{" "}
        {product.description}
      </p>
      <div className={styles.purchase_section}>
        {!isInCart(product.id) ? (
          <button
            className={`${styles.add_btn} ${!addedInfo ? styles.show : ""}`}
            onClick={() => {
              increaseQnt(product.id);
              setAddedInfo(true);
              setTimeout(() => {
                setAddedInfo(false);
              }, 2500);
            }}
          >
            Vložiť do košíka
          </button>
        ) : (
          <div className={styles.wrapper}>
            <div className={`${styles.added} ${addedInfo ? styles.show : ""}`}>
              <svg
                className={styles.check}
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M20 6 9 17l-5-5" />
              </svg>
              <p>Pridané</p>
            </div>

            <div
              className={`${styles.qnt_section} ${addedInfo ? styles.hide : ""}`}
            >
              {" "}
              <button
                className={styles.qnt_control}
                onClick={() => decreaseQnt(product.id)}
              >
                -
              </button>
              <input
                className={styles.input}
                readOnly
                type="text"
                value={productQnt}
              />
              <button
                className={styles.qnt_control}
                onClick={() => increaseQnt(product.id)}
              >
                +
              </button>
            </div>
          </div>
        )}
        <div className={styles.price_info}>
          <p className={styles.price}>{formatCurrency(product.price)}</p>
          <p className={styles.p}>s DPH</p>
        </div>
      </div>
    </div>
  );
}
