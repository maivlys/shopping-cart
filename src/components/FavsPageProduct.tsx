import styles from "./StoreProduct.module.css";
import stylesFavs from "./FavsPageProduct.module.css";
import { formatCurrency } from "../utilities/formatCurrency";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { Link, useNavigate } from "react-router";

type ProductItemProps = {
  id: number;
  name: string;
  description: string;
  price: number;
  imgUrl: string;
};

export function FavsPageProduct({
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
        <div className={`${styles.heart_circle}`}>
          <svg
            onClick={() => handleClick(id)}
            className={`${stylesFavs.bin} ${isFav(id) ? styles.fav : ""}`}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M3 6h18" />
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            <path d="M10 11v6" />
            <path d="M14 11v6" />
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
            onClick={() => {
              increaseQnt(id);
            }}
            //   setAddedAlert(true);
            //   setTimeout(() => {
            //     setAddedAlert(false);
            //   }, 10000);
            // }}
          >
            Pridať do košíka
          </button>
        ) : (
          <div>
            <button onClick={() => decreaseQnt(id)}>-</button>
            <input
              readOnly
              type="text"
              value={productQnt}
              // onChange={(e) => setQntInput(e.target.value)}
            />
            <button onClick={() => increaseQnt(id)}>+</button>
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

        <p>{formatCurrency(price)}</p>
      </div>
    </div>
  );
}
