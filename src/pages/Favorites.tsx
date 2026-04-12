import styles from "./Favorites.module.css";
import data from "../data/data.json";
import { FavsPageProduct } from "../components/FavsPageProduct";
import { useShoppingCart } from "../context/ShoppingCartContext";

export function Favorites() {
  const { favs } = useShoppingCart();

  return (
    <div className={styles.container}>
      {favs.map((fav: number) => {
        const product = data.find((item) => item.id === fav);
        if (!product) return null;

        return (
          <FavsPageProduct
            key={product.id}
            id={product.id}
            name={product.name}
            description={product.description}
            price={product.price}
            imgUrl={product.imgUrl[0]}
          />
        );
      })}
    </div>
  );
}
