import styles from "./Filter.module.css";
import { useState } from "react";
import filterColors from "../data/filter_colors.json";
import filterTypes from "../data/filter_types.json";
import type { FilterState } from "../pages/Store";

type Props = {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  initialFilters: FilterState;
};

const TYPE_LABELS: Record<string, string> = {
  bracelet: "Náramok",
  necklace: "Náhrdelník",
  ring: "Prsteň",
  earrings: "Náušnice",
};

export function Filter({ filters, onFiltersChange, initialFilters }: Props) {
  const [priceInput, setPriceInput] = useState<{ min: string; max: string }>({
    min: "",
    max: "",
  });
  const [filterOpen, setFilterOpen] = useState(false);

  function applyPriceFilter() {
    onFiltersChange({
      ...filters,
      priceMin: Number(priceInput.min) || 0,
      priceMax: Number(priceInput.max) || Number.MAX_VALUE,
    });
  }

  function toggleColor(color: string) {
    const newColors = filters.colors.includes(color)
      ? filters.colors.filter((c) => c !== color)
      : [...filters.colors, color];
    onFiltersChange({ ...filters, colors: newColors });
  }

  function toggleType(type: string) {
    const newTypes = filters.types.includes(type)
      ? filters.types.filter((t) => t !== type)
      : [...filters.types, type];
    onFiltersChange({ ...filters, types: newTypes });
  }

  function cancelFilter() {
    onFiltersChange(initialFilters);
    setPriceInput({ min: "", max: "" });
  }

  return (
    <aside className={styles.filter}>
      <div className={`${styles.banner} ${styles.plain}`}></div>
      <div
        onClick={() => setFilterOpen((prev) => !prev)}
        className={`${styles.banner} ${styles.toggle_btn}`}
      >
        <p>FILTER</p> <p>{filterOpen ? "⌃" : "⌄"}</p>
      </div>
      <div className={`${styles.container} ${!filterOpen ? styles.hide : ""}`}>
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
                if (e.key === "Enter") applyPriceFilter();

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
            {filterColors.map((item) => (
              <button
                key={item.color}
                onClick={() => toggleColor(item.color)}
                className={`${styles.filter_color_btn} ${filters.colors.includes(item.color) ? styles.active : ""}`}
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
            {filterTypes.map((item) => (
              <button
                key={item}
                onClick={() => {
                  toggleType(item);
                }}
                className={`${styles.filter_type_btn} ${filters.types.includes(item) ? styles.active : ""}`}
              >
                {/* {item === "bracelet" ? "Náramok" : null}
                {item === "necklace" ? "Náhrdelník" : null}
                {item === "ring" ? "Prsteň" : null}
                {item === "earrings" ? "Náušnice" : null} */}
                {/* ----------------------------------------------------------------------HERE */}
                {TYPE_LABELS[item] ?? item}
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
  );
}
