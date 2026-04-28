import data from "../data/data.json";
import styles from "./Store.module.css";
import { StoreProduct } from "../components/StoreProduct";
import filter_colors from "../data/filter_colors.json";
import filter_types from "../data/filter_types.json";
import { useEffect, useState } from "react";
import { Filter } from "../components/FIlter";

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  imgUrl: string[];
  color_filter: string[];
  type: string[];
  colorOptions: {
    color: string;
    id: number;
  }[];
  material: string;
  length: string;
};

export function Store() {
  const [productsToRender, setProductsToRender] = useState<Product[]>(data);

  // const [activeFilter_price, setActiveFilter_price] = useState<{
  //   min: number;
  //   max: number;
  // }>({ min: 0, max: Number.MAX_VALUE });
  // const [priceInput, setPriceInput] = useState<{ min: string; max: string }>({
  //   min: "",
  //   max: "",
  // });
  // const [activeFilter_colors, setActiveFilter_colors] = useState<string[]>([]);
  // const [activeFilter_types, setActiveFilter_types] = useState<string[]>([]);

  // useEffect(() => {
  //   const filteredData = data.filter((item) => {
  //     console.log(activeFilter_price);
  //     const priceMatch =
  //       activeFilter_price.min < item.price &&
  //       activeFilter_price.max > item.price;
  //     const colorMatch =
  //       activeFilter_colors.length === 0 ||
  //       activeFilter_colors.some((c) => item.color_filter.includes(c));
  //     const typeMatch =
  //       activeFilter_types.length === 0 ||
  //       activeFilter_types.some((t) => item.type.includes(t));
  //     return priceMatch && colorMatch && typeMatch;
  //   });
  //   setProductsToRender(filteredData);
  // }, [activeFilter_colors, activeFilter_types, activeFilter_price]);

  // function applyPriceFilter() {
  //   setActiveFilter_price({
  //     min: Number(priceInput.min) || 0,
  //     max: Number(priceInput.max) || Number.MAX_VALUE,
  //   });
  // }

  // function cancelFilter() {
  //   setActiveFilter_price({ min: 0, max: Number.MAX_VALUE });
  //   setPriceInput({
  //     min: "",
  //     max: "",
  //   });
  //   setActiveFilter_colors([]);
  //   setActiveFilter_types([]);
  // }

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
            {/* <button>
              <p>Filter</p>
              <span>{filterOpen.care ? "⌃" : "⌄"}</span>
            </button> */}
            <Filter setProductsToRender={setProductsToRender} />
          </div>

          <section className={styles.products}>
            {productsToRender.length !== 0 ? (
              productsToRender.map((item) => {
                return (
                  <StoreProduct
                    key={item.id}
                    product={item}
                    page={"store"}
                    // id={item.id}
                    // name={item.name}
                    // description={item.description}
                    // price={item.price}
                    // imgUrl={item.imgUrl[0]}
                    // colorOptions={item.colorOptions}
                  />
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
