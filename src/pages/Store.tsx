import { useShoppingCart } from "../context/ShoppingCartContext";
import styles from "./Store.module.css";
import { StoreProduct } from "../components/StoreProduct";
import { useState } from "react";
import { Filter } from "../components/Filter";
import type { Product } from "../types/Product";

export default function Store() {
  const { data, loading } = useShoppingCart();
  const [productsToRender, setProductsToRender] = useState<Product[]>(data);

  if (loading) {
    return (
      <>
        <div className={styles.container}>
          <p className={styles.message}>Načítavam...</p>
        </div>
      </>
    );
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.category_wrapper}>
          <p className={styles.p}>KATEGÓRIA:</p>
          <h2 className={styles.category}>ELEGANCE</h2>
          <p className={styles.subtitle}>Elegantné korálkové šperky</p>
        </div>
        <div className={styles.main_content}>
          <div>
            <Filter setProductsToRender={setProductsToRender} />
          </div>

          <section className={styles.products}>
            {productsToRender.length !== 0 ? (
              productsToRender.map((item) => {
                return (
                  <StoreProduct key={item.id} product={item} page={"store"} />
                );
              })
            ) : (
              <div className={styles.empty_filter}>
                <p className={styles.message}>
                  Ľutujeme, produkt, ktorý hľadáš, nie je dostupný
                </p>
              </div>
            )}
          </section>
        </div>
      </div>
    </>
  );
}
