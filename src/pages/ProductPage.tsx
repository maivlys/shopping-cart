import { useParams, useNavigate } from "react-router";
import data from "../data/data.json";
import styles from "./ProductPage.module.css";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { formatCurrency } from "../utilities/formatCurrency";
import { useEffect, useState } from "react";
import { CartSummary } from "../components/CartSummary";
import { ImageModal } from "../components/ImageModal";

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

export function ProductPage() {
  const { openCartPreview, setOpenCartPreview } = useShoppingCart();
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const navigate = useNavigate();

  const [qntInput, setQntInput] = useState<string>("1");

  type Sections = {
    delivery: boolean;
    care: boolean;
  };
  const [sectionsOpen, setSectionsOpen] = useState<Sections>({
    delivery: false,
    care: false,
  });
  const {
    cartItems,
    decreaseQnt,
    increaseQnt,
    isInCart,
    isFav,
    addToFavs,
    removeFromFavs,
  } = useShoppingCart();

  const { id } = useParams();
  const product = (data as Product[]).find((item) => item.id === Number(id));
  if (!product) return <div>product not found</div>;
  const productQntInCart = cartItems.find(
    (item) => item.id === product.id,
  )?.quantity;

  const [isImgOpen, setIsImgOpen] = useState<boolean>(false);
  const [productToOpen, setProductToOpen] = useState<string[]>([]);
  const [key, setKey] = useState<number | undefined>(undefined);

  const inCart = isInCart(product.id);

  function openModal(src: string[], key: number) {
    setKey(key);
    setProductToOpen(src);
    setIsImgOpen(true);
  }

  useEffect(() => {
    if (!inCart) {
      setQntInput("1");
    }
  }, [inCart]);

  return (
    <div className={styles.container}>
      <div className={styles.main_content}>
        <section className={`${styles.images} ${styles.desktop}`}>
          <img
            onClick={() => openModal(product.imgUrl, 0)}
            className={styles.img_main}
            src={product.imgUrl[0]}
            alt="main-product-picture"
          />
          <div className={styles.imgs_additional}>
            {product.imgUrl.map((_item, i) => {
              if (i === 0) {
                return null;
              }
              return (
                <img
                  onClick={() => openModal(product.imgUrl, i)}
                  className={styles.img_small}
                  src={product.imgUrl[i]}
                  alt="product-picture-detail"
                />
              );
            })}
          </div>
          <ImageModal
            isOpen={isImgOpen}
            onClose={() => setIsImgOpen(false)}
            productToOpen={productToOpen}
            clickedImgIndex={key}
          />
        </section>
        <section className={styles.info}>
          <h2 className={styles.title}>
            {product.name} - {product.description}
          </h2>

          <section className={`${styles.images} ${styles.mobile}`}>
            <div className={styles.wrapper}>
              <img
                onClick={() => openModal(product.imgUrl, 0)}
                className={styles.img_main}
                src={product.imgUrl[0]}
                alt="main-product-picture"
              />
            </div>

            <div className={styles.imgs_additional}>
              {product.imgUrl.map((_item, i) => {
                if (i === 0) {
                  return null;
                }
                return (
                  <img
                    onClick={() => openModal(product.imgUrl, i)}
                    className={styles.img_small}
                    src={product.imgUrl[i]}
                    alt="product-picture-detail"
                  />
                );
              })}
            </div>
            <ImageModal
              isOpen={isImgOpen}
              onClose={() => setIsImgOpen(false)}
              productToOpen={productToOpen}
              clickedImgIndex={key}
            />
          </section>

          <p className={styles.price}>
            {formatCurrency(product.price)}{" "}
            <span className={styles.supporting_text}>s DPH</span>{" "}
          </p>
          {product.colorOptions.length > 1 && (
            <div className={styles.color_options_section}>
              <p className={styles.supporting_text}>Farba</p>
              <div className={styles.color_options}>
                {product.colorOptions.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      navigate(`/product/${item.id}`);
                    }}
                    className={`${styles.color} ${product.id === item.id ? styles.selected : null}`}
                  >
                    {item.color}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className={styles.qnt_section}>
            <button
              className={styles.qnt_control}
              onClick={() => {
                if (!inCart) {
                  setQntInput((prev) => {
                    if (qntInput !== "1") {
                      return String((parseInt(prev) || 0) - 1);
                    } else {
                      return "1";
                    }
                  });
                } else {
                  decreaseQnt(product.id);
                }
              }}
            >
              -
            </button>
            <input
              className={styles.input}
              readOnly
              type="text"
              value={inCart ? productQntInCart : qntInput}
              onChange={(e) => setQntInput(e.target.value)}
            />
            <button
              className={styles.qnt_control}
              onClick={() => {
                if (!inCart) {
                  setQntInput((prev) => String((parseInt(prev) || 0) + 1));
                } else {
                  increaseQnt(product.id);
                }
              }}
            >
              +
            </button>
          </div>
          <div className={styles.actions}>
            <button
              className={`${styles.actions_button} ${styles.add_button}`}
              disabled={inCart}
              onClick={() => increaseQnt(product.id, Number(qntInput))}
            >
              {inCart ? "V košíku" : "Vložiť do košíka"}
            </button>

            <button
              onClick={() => {
                if (isFav(product.id)) {
                  removeFromFavs(product.id);
                } else {
                  addToFavs(product.id);
                }
              }}
              className={`${styles.actions_button} ${isFav(product.id) ? styles.isFav : null}`}
            >
              {" "}
              {isFav(product.id)
                ? "Odstrániť z obľúbených"
                : "Pridať do obľúbených"}
            </button>
          </div>
          <div className={styles.details_grid}>
            <div>Materiál:</div>
            <div>
              {product.material === "elastic"
                ? "Elastan, rokajlové korálky"
                : "Chirurgická oceľ v zlatej farbe, elastan, rokajlové korálky"}
            </div>
            <div>Vlastnosti:</div>
            <div>
              {product.material === "elastic" ? "Elastické" : "Hypoalergénne"}
            </div>
            <div>Kov:</div>
            <div>{product.material === "elastic" ? "Nie" : "Áno"}</div>
            <div>Nastaviteľnosť:</div>
            <div>{product.material === "elastic" ? "Nie" : "Áno"}</div>

            <div>Dĺžka:</div>
            <div>{product.length}</div>
          </div>

          <div className={styles.contact}>
            V prípade doplňujúcich otázok ti rada odpoviem. Napíš mi na{" "}
            <span
              onClick={() => {
                navigator.clipboard.writeText("pearla@koralkovesperky.eu");
                setIsCopied(true);
                setTimeout(() => {
                  setIsCopied(false);
                }, 2500);
              }}
              style={{ textDecoration: "underline", cursor: "pointer" }}
            >
              email
            </span>{" "}
            <svg
              className={styles.heart}
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            <span
              className={`${styles.confirmation} ${isCopied ? styles.show : ""}`}
            >
              email bol skopírovaný
            </span>
          </div>
          <div className={styles.additional_info}>
            <div className={styles.additional_info_section}>
              <div
                className={styles.additional_info_title}
                onClick={() => {
                  setSectionsOpen((prev) => ({
                    ...prev,
                    delivery: !prev.delivery,
                  }));
                }}
              >
                <svg
                  className={`${styles.additional_info_svg} ${styles.truck}`}
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M7 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
                  <path d="M17 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
                  <path d="M13 6h5l3 5v6h-2" />
                  <path d="M5 17H3v-4" />
                  <path d="M2 5h11v12" />
                  <path d="M9 17h6" />
                  <path d="M3 9h4" />
                  <path d="M21 11h-8" />
                </svg>
                <p className={styles.additional_info_text}>
                  {" "}
                  Prepravné informácie
                </p>{" "}
                <span className={styles.additional_info_arrow}>
                  {sectionsOpen.delivery ? "⌃" : "⌄"}
                </span>
              </div>
              {sectionsOpen.delivery ? (
                <div
                  className={styles.additional_info_instructions}
                >{`Na výber máte prepravu spoločnosťami Zásielkovňa (Packeta) a PPL, s možnosťou doručenia na vybrané miesto alebo priamo domov. Cena sa odvíja od zvolenej možnosti a začína od ${formatCurrency(3.4)}`}</div>
              ) : null}
            </div>
            <div
              className={`${styles.additional_info_section} ${styles.last_section}`}
            >
              <div
                className={styles.additional_info_title}
                onClick={() => {
                  setSectionsOpen((prev) => ({
                    ...prev,
                    care: !prev.care,
                  }));
                }}
              >
                {" "}
                <svg
                  className={styles.additional_info_svg}
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
                <p className={styles.additional_info_text}>Starostlivosť</p>
                <span className={styles.additional_info_arrow}>
                  {sectionsOpen.care ? "⌃" : "⌄"}
                </span>
              </div>
              {sectionsOpen.care ? (
                <div className={styles.additional_info_instructions}>
                  V ideálnom prípade sa prosím vyhnite vystavovaniu šperkov
                  vode, kúpaniu, spaniu a cvičeniu. Nepoužívajte na šperky
                  parfumy. Správnou starostlivosťou môžete šperkom citelne
                  predĺžiť životnosť.
                </div>
              ) : null}
            </div>
          </div>
        </section>

        <section
          onMouseEnter={() => {
            setOpenCartPreview(true);
          }}
          onMouseLeave={() => {
            setOpenCartPreview(false);
          }}
          className={`${styles.cart_summary}  ${openCartPreview ? styles.showPreview : ""}`}
        >
          <CartSummary variant="mini" />
        </section>
      </div>
    </div>
  );
}
