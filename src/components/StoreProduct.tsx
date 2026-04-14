import styles from "./StoreProduct.module.css";
import { formatCurrency } from "../utilities/formatCurrency";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { Link, useNavigate } from "react-router";
import { useState } from "react";

type ProductItemProps = {
  id: number;
  name: string;
  description: string;
  price: number;
  imgUrl: string;
  colorOptions: {
    color: string;
    id: number;
  }[];
  material: string;
  length: string;
};

export function StoreProduct({
  id,
  name,
  description,
  price,
  imgUrl,
}: ProductItemProps) {
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

  // const [qntInput, setQntInput] = useState<string>("1");

  const [addedInfo, setAddedInfo] = useState<boolean>(false);

  const productQnt = cartItems.find((item) => item.id === id)?.quantity;

  function handleClick(id: number) {
    console.log(isFav(id));

    if (isFav(id)) {
      removeFromFavs(id);
    } else {
      addToFavs(id);
    }

    // addToFavs(id);
    // removeFromFavs(id);
  }

  return (
    <div className={styles.container} key={id}>
      <div className={styles.image_container}>
        <img
          onClick={() => {
            navigate(`/product/${id}`);
          }}
          className={styles.img}
          src={imgUrl}
          alt="product-image"
        />
        <div
          className={`${styles.heart_circle}`}
          onClick={() => handleClick(id)}
        >
          <svg
            className={`${styles.heart} ${isFav(id) ? styles.fav : ""}`}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </div>
      </div>
      <p
        onClick={() => {
          navigate(`/product/${id}`);
        }}
        className={styles.product_description}
      >
        <span className={styles.product_name}>{name}</span> - {description}
      </p>
      <div className={styles.purchase_section}>
        {!isInCart(id) ? (
          <button
            className={`${styles.add_btn} ${!addedInfo ? styles.show : ""}`}
            onClick={() => {
              increaseQnt(id);
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
                onClick={() => decreaseQnt(id)}
              >
                -
              </button>
              <input
                className={styles.input}
                readOnly
                type="text"
                value={productQnt}
                // onChange={(e) => setQntInput(e.target.value)}
              />
              <button
                className={styles.qnt_control}
                onClick={() => increaseQnt(id)}
              >
                +
              </button>
            </div>
          </div>
        )}
        {/* {addedAlert === true ? (
          <p>in cart</p>
        ) : (
          <button
            onClick={() => {
              increaseQnt(id);
              setAddedAlert(true);
              setTimeout(() => {
                setAddedAlert(false);
              }, 10000);
            }}
          >
            Pridať do košíka
          </button>
        )} */}

        {/* {isInCart(id) ? (
          <>
            <p>Added</p>
            <button>
              <Link to="/checkout">Prejsť do košíka</Link>
            </button>
          </>
        ) : (
          <button
            onClick={() => {
              // if (colorOptions.length > 1) {
              //   navigate(`/product/${id}`);
              // } else {
              increaseQnt(id);
              // }
            }}
          >
            Add to cart
          </button>
        )} */}
        <div className={styles.price_info}>
          <p className={styles.price}>{formatCurrency(price)}</p>
          <p className={styles.p}>s DPH</p>
        </div>
      </div>
    </div>
  );
}
