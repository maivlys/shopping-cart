import { useParams, useNavigate } from "react-router";
import data from "../data/data.json";
import styles from "./ProductPage.module.css";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { formatCurrency } from "../utilities/formatCurrency";
import { useEffect, useState } from "react";
import { CartSummary } from "../components/CartSummary";
import { ImageModal } from "../components/ImageModal";
import { QuickBuyModal } from "../components/QuickBuyModal";

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
  // console.log(product);

  const [isImgOpen, setIsImgOpen] = useState<boolean>(false);
  const [productToOpen, setProductToOpen] = useState<string[]>([]);
  const [key, setKey] = useState<number | undefined>(undefined);

  // const [selectedColor, setSelectedColor] = useState<string>("");

  // useEffect(() => {
  //   product.colorSelected = selectedColor;
  // }, [selectedColor]);

  // useEffect(() => {
  //   console.log("updated", key);
  // }, [key]);

  function openModal(src: string[], key: number) {
    // console.log("key-------", key);

    setKey(key);
    setProductToOpen(src);
    setIsImgOpen(true);
  }

  useEffect(() => {
    if (!isInCart(product.id)) {
      setQntInput("1");
    }
  }, [isInCart]);

  return (
    <div className={styles.container}>
      <section className={styles.product_details}>
        <div className={styles.images}>
          {/* {product.imgUrl.map((item,i)=>{
            if (i===0) {
              return
            }
          })} */}
          <img
            onClick={() => openModal(product.imgUrl, 0)}
            className={styles.img_main}
            src={product.imgUrl[0]}
            alt="main-product-picture"
          />
          <div className={styles.imgs_additional}>
            {product.imgUrl.map((item, i) => {
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
            // imgUrl={product.imgUrl}
            clickedImgIndex={key}
          />
        </div>
        <div className={styles.info}>
          <h2>
            {product.name} - {product.description}
          </h2>

          <p>
            {formatCurrency(product.price)} <span>s DPH</span>{" "}
          </p>
          {product.colorOptions.length > 1 && (
            <div>
              <p>farba</p>
              {product.colorOptions.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    navigate(`/product/${item.id}`);
                    // setSelectedColor(item);
                    // product.colorSelected = item;
                    // console.log(product);
                  }}
                  className={`${styles.color_options} ${product.id === item.id ? styles.selected : null}`}
                >
                  {item.color}
                </button>
              ))}
            </div>
          )}

          <div className={styles.quantity}>
            <div>
              <button
                onClick={() => {
                  if (!isInCart(product.id)) {
                    setQntInput((prev) => {
                      if (qntInput !== "1") {
                        return String((parseInt(prev) || 0) - 1);
                      } else {
                        return "1";
                      }
                    });
                  } else {
                    decreaseQnt(product.id);
                    // setQntInput("1");
                  }
                }}
              >
                -
              </button>
              <input
                readOnly
                type="text"
                value={isInCart(product.id) ? productQntInCart : qntInput}
                onChange={(e) => setQntInput(e.target.value)}
              />
              <button
                onClick={() => {
                  if (!isInCart(product.id)) {
                    setQntInput((prev) => String((parseInt(prev) || 0) + 1));
                  } else {
                    increaseQnt(product.id);
                    // setQntInput("1");
                  }
                  // if (isInCart(product.id)) {
                  //   increaseQnt(product.id);
                  // } else {
                  //   increaseQnt(product.id, Number(qntInput));
                  // }
                }}
              >
                +
              </button>

              {isInCart(product.id) ? <span>V košíku</span> : null}
            </div>
          </div>
          <div className={styles.actions}>
            {!isInCart(product.id) ? (
              <button onClick={() => increaseQnt(product.id, Number(qntInput))}>
                Pridať do košíka
              </button>
            ) : null}

            <button
              onClick={() => {
                if (isFav(product.id)) {
                  removeFromFavs(product.id);
                } else {
                  addToFavs(product.id);
                }
              }}
              className={`${isFav(product.id) ? styles.isFav : null}`}
            >
              <svg
                width={25}
                height={25}
                fill="none"
                stroke="#000000"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
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
          <p>
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
              width={20}
              height={20}
              fill="none"
              stroke="#ffffff"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            {isCopied ? (
              <span>
                <svg
                  width={25}
                  height={25}
                  fill="none"
                  stroke="#ffffff"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M20 6 9 17l-5-5" />
                </svg>
                email skopírovaný do schránky
              </span>
            ) : null}
          </p>
          <div>
            <div
              onClick={() => {
                setSectionsOpen((prev) => ({
                  ...prev,
                  delivery: !prev.delivery,
                }));
              }}
            >
              Prepravné informácie {sectionsOpen.delivery ? "⌃" : "⌄"}
            </div>
            {sectionsOpen.delivery ? (
              <div>{`Na výber máte prepravu spoločnosťami Zásielkovňa (Packeta) a PPL, s možnosťou doručenia na vybrané miesto alebo priamo domov. Cena sa odvíja od zvolenej možnosti a začína od ${formatCurrency(3.4)}`}</div>
            ) : (
              <></>
            )}

            <div
              onClick={() => {
                setSectionsOpen((prev) => ({
                  ...prev,
                  care: !prev.care,
                }));
              }}
            >
              Starostlivosť
              {sectionsOpen.care ? "⌃" : "⌄"}
            </div>
            {sectionsOpen.care ? (
              <div>
                V ideálnom prípade sa prosím vyhnite vystavovaniu šperkov vode,
                kúpaniu, spaniu a cvičeniu. Nepoužívajte na šperky parfumy.
                Správnou starostlivosťou môžete šperkom citelne predĺžiť
                životnosť.
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </section>
      <section className={styles.cart_summary}>
        <CartSummary variant="mini" />
      </section>
    </div>
  );
}
