import styles from "./Favorites.module.css";
import { StoreProduct } from "../components/StoreProduct";
import { useFavoritesStore } from "../store/useFavoritesStore";
import { useProducts } from "../hooks/useProducts";

export default function Favorites() {
  const favs = useFavoritesStore((s) => s.favs);
  const { data: products = [] } = useProducts();

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h2 className={styles.subtitle}>PÁČILO SA VÁM</h2>
      </div>
      {favs.length !== 0 ? (
        <div className={styles.content}>
          {favs.map((fav: number) => {
            const product = products.find((item) => item.id === fav);
            if (!product) return null;

            return (
              <StoreProduct
                key={product.id}
                product={product}
                page={"favorites"}
              />
            );
          })}
        </div>
      ) : (
        <p className={styles.message}>
          Miesto pre tvoje obľúbené je zatiaľ prázdne{" "}
        </p>
      )}
    </div>
  );
}
