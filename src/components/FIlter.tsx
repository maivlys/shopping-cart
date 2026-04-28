import styles from "./Filter.module.css";
import { useState, useEffect } from "react";
import data from "../data/data.json";
import filter_colors from "../data/filter_colors.json";
import filter_types from "../data/filter_types.json";

type Props = {
  setProductsToRender: () => void;
};

export function Filter({
  // priceInput,
  // setPriceInput,
  // applyPriceFilter,
  // filter_colors,
  // activeFilter_colors,
  // setActiveFilter_colors,
  // filter_types,
  // activeFilter_types,
  // setActiveFilter_types,
  // cancelFilter,
  setProductsToRender,
}: Props) {
  const [activeFilter_price, setActiveFilter_price] = useState<{
    min: number;
    max: number;
  }>({ min: 0, max: Number.MAX_VALUE });
  const [priceInput, setPriceInput] = useState<{ min: string; max: string }>({
    min: "",
    max: "",
  });
  const [activeFilter_colors, setActiveFilter_colors] = useState<string[]>([]);
  const [activeFilter_types, setActiveFilter_types] = useState<string[]>([]);

  useEffect(() => {
    const filteredData = data.filter((item) => {
      console.log(activeFilter_price);
      const priceMatch =
        activeFilter_price.min < item.price &&
        activeFilter_price.max > item.price;
      const colorMatch =
        activeFilter_colors.length === 0 ||
        activeFilter_colors.some((c) => item.color_filter.includes(c));
      const typeMatch =
        activeFilter_types.length === 0 ||
        activeFilter_types.some((t) => item.type.includes(t));
      return priceMatch && colorMatch && typeMatch;
    });
    setProductsToRender(filteredData);
  }, [activeFilter_colors, activeFilter_types, activeFilter_price]);

  function applyPriceFilter() {
    setActiveFilter_price({
      min: Number(priceInput.min) || 0,
      max: Number(priceInput.max) || Number.MAX_VALUE,
    });
  }

  function cancelFilter() {
    setActiveFilter_price({ min: 0, max: Number.MAX_VALUE });
    setPriceInput({
      min: "",
      max: "",
    });
    setActiveFilter_colors([]);
    setActiveFilter_types([]);
  }

  const [filterOpen, setFilterOpen] = useState(false);

  return (
    <>
      <aside className={styles.filter}>
        <div className={`${styles.banner} ${styles.plain}`}></div>
        <div
          onClick={() => setFilterOpen((prev) => !prev)}
          className={`${styles.banner} ${styles.toggle_btn}`}
        >
          <p>FILTER</p> <p>{filterOpen ? "⌃" : "⌄"}</p>
        </div>
        <div
          className={`${styles.container} ${!filterOpen ? styles.hide : ""}`}
        >
          <div className={styles.filter_price}>
            <p className={styles.title}> Cena:</p>
            <div>
              <input
                className={styles.input}
                placeholder="min"
                type="number"
                min={0}
                value={priceInput.min}
                onChange={(e) =>
                  setPriceInput((prev) => ({
                    ...prev,
                    min: e.target.value,
                  }))
                }
                onBlur={applyPriceFilter}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    applyPriceFilter();
                  }
                  if (e.key === "-" || e.key === "+" || e.key === "e")
                    e.preventDefault();
                }}
              />{" "}
              -{" "}
              <input
                className={styles.input}
                placeholder="max"
                type="number"
                min="0"
                value={priceInput.max}
                onChange={(e) =>
                  setPriceInput((prev) => ({
                    ...prev,
                    max: e.target.value,
                  }))
                }
                onBlur={applyPriceFilter}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    applyPriceFilter();
                  }
                }}
              />
            </div>
          </div>
          <div className={styles.filter_color}>
            <p className={styles.title}> Farba:</p>
            <div className={styles.wrapper}>
              {filter_colors.map((item) => (
                <button
                  onClick={() => {
                    if (activeFilter_colors.includes(item.color)) {
                      setActiveFilter_colors(
                        activeFilter_colors.filter(
                          (color) => color !== item.color,
                        ),
                      );
                    } else {
                      setActiveFilter_colors([
                        ...activeFilter_colors,
                        item.color,
                      ]);
                    }
                  }}
                  className={`${styles.filter_color_btn} ${activeFilter_colors.includes(item.color) ? styles.active : ""}`}
                  style={{ backgroundColor: item.code }}
                >
                  {
                    <svg
                      className={`${styles.color_check} ${item.color === "white" && styles.white_btn}`}
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="m9 11 3 3L22 4" />
                      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                    </svg>
                  }
                </button>
              ))}
            </div>
          </div>
          <div className={styles.product_type}>
            <p className={styles.title}> Typ produktu:</p>
            <div className={styles.wrapper}>
              {filter_types.map((item) => (
                <button
                  onClick={() => {
                    if (activeFilter_types.includes(item)) {
                      setActiveFilter_types(
                        activeFilter_types.filter((color) => color !== item),
                      );
                    } else {
                      setActiveFilter_types([...activeFilter_types, item]);
                    }
                  }}
                  className={`${styles.filter_type_btn} ${activeFilter_types.includes(item) ? styles.active : ""}`}
                >
                  {item === "bracelet" ? "Náramok" : null}
                  {item === "necklace" ? "Náhrdelník" : null}
                  {item === "ring" ? "Prsteň" : null}
                  {item === "earrings" ? "Náušnice" : null}
                </button>
              ))}
            </div>
          </div>
          <div className={styles.cancel_button_cnt}>
            <button className={styles.cancel_button} onClick={cancelFilter}>
              Zrušiť
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
