import styles from "./Favorites.module.css";
import data from "../data/data.json";
// import { FavsPageProduct } from "../components/FavsPageProduct";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { StoreProduct } from "../components/StoreProduct";

export function Favorites() {
  const { favs } = useShoppingCart();
  console.log(favs.length);

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h2 className={styles.subtitle}>PÁČILO SA VÁM</h2>
      </div>
      {favs.length !== 0 ? (
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
      ) : (
        <p className={styles.message}>
          Miesto pre tvoje obľúbené je zatiaľ prázdne{" "}
          {/* Hľadáš, čo si si uložila? Hmm… zatiaľ nič */}
          {/* <svg
            className={styles.heart}
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>{" "} */}
        </p>
      )}
    </div>
  );
}
