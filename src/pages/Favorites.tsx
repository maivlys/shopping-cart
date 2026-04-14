import styles from "./Favorites.module.css";
import data from "../data/data.json";
// import { FavsPageProduct } from "../components/FavsPageProduct";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { StoreProduct } from "../components/StoreProduct";

export function Favorites() {
  const { favs } = useShoppingCart();

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h2 className={styles.subtitle}>PÁČILO SA VÁM</h2>
      </div>
      <div className={styles.content}>
        {favs.map((fav: number) => {
          const product = data.find((item) => item.id === fav);
          if (!product) return null;

          return (
            <StoreProduct
              key={product.id}
              product={product}
              page={"favorites"}
              // id={item.id}
              // name={item.name}
              // description={item.description}
              // price={item.price}
              // imgUrl={item.imgUrl[0]}
              // colorOptions={item.colorOptions}
            />
            // <StoreProduct
            //   key={product.id}
            //   id={product.id}
            //   name={product.name}
            //   description={product.description}
            //   price={product.price}
            //   imgUrl={product.imgUrl[0]}
            // />
          );
        })}
      </div>
    </div>
  );
}
