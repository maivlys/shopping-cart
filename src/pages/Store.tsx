import styles from "./Store.module.css";
import { StoreProduct } from "../components/StoreProduct";
import { useMemo, useState } from "react";
import { Filter } from "../components/Filter";
import { useProducts } from "../hooks/useProducts";

export type FilterState = {
  priceMin: number;
  priceMax: number;
  colors: string[];
  types: string[];
};

const INITIAL_FILTERS: FilterState = {
  priceMin: 0,
  priceMax: Number.MAX_VALUE,
  colors: [],
  types: [],
};

export default function Store() {
  const { data: products = [], isLoading } = useProducts();
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS);

  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      const priceMatch =
        filters.priceMin <= item.price && filters.priceMax >= item.price;
      const colorMatch =
        filters.colors.length === 0 ||
        filters.colors.some((c) => item.color_filter.includes(c));
      const typeMatch =
        filters.types.length === 0 ||
        filters.types.some((t) => item.type.includes(t));
      return priceMatch && colorMatch && typeMatch;
    });
  }, [products, filters]);

  if (isLoading) {
    return (
      <>
        <div className={styles.container}>
          <p className={styles.message}>Načítavam...</p>
        </div>
      </>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.category_wrapper}>
        <p className={styles.p}>KATEGÓRIA:</p>
        <h2 className={styles.category}>ELEGANCE</h2>
        <p className={styles.subtitle}>Elegantné korálkové šperky</p>
      </div>
      <div className={styles.main_content}>
        <div>
          <Filter
            filters={filters}
            onFiltersChange={setFilters}
            initialFilters={INITIAL_FILTERS}
          />
        </div>

        <section className={styles.products}>
          {filteredProducts.length !== 0 ? (
            filteredProducts.map((item) => {
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
  );
}
