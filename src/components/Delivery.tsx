import { formatCurrency } from "../utilities/formatCurrency";
import styles from "./Delivery.module.css";
import { Review } from "./Review";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useEffect, useState } from "react";
import { PurchaseConfirmationModal } from "./PurchaseConfirmationModal";
import { useShoppingCart } from "../context/ShoppingCartContext";
import data from "../data/data.json";

type Props = {
  step: string;
  defaultValues: DeliveryData;
  onUpdateDelivery: (data: DeliveryData) => void;
  giftPackaging: boolean;
  giftPackagingPrice: number;
  setStep: React.Dispatch<React.SetStateAction<string>>;
  finishProcess: () => void;
};

export function Delivery({
  step,
  defaultValues,
  onUpdateDelivery,
  giftPackaging,
  giftPackagingPrice,
  setStep,
  finishProcess,
}: Props) {
  const { cartItems } = useShoppingCart();
  const [deliveryTo, setDeliveryTo] = useState<string>("");
  const [loading, setLoading] = useState(false);

  let totalPrice = cartItems.reduce((total, cartItem) => {
    const product = data.find((item) => item.id === cartItem.id);
    return total + (product?.price || 0) * cartItem.quantity;
  }, 0);

  const isFree = Number(totalPrice.toFixed(2)) >= 49;

  const schema = z.object({
    country: z.enum(["cz", "sk"]),
    delivery: z.enum(["packeta-box", "packeta-home", "ppl-box", "ppl-home"]),
    payment: z.enum(["card", "paypal", "transaction"]),
  });

  type DeliveryData = z.infer<typeof schema>;

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<DeliveryData>({
    resolver: zodResolver(schema),
  });

  function submitData(data: DeliveryData) {
    console.log("clicked");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1300);
    onUpdateDelivery(data);
    setStep("purchase");
    // alert("purchased");
    // finishProcess();

    // if (!termsRef.current?.checked) {
    //   setTermsError(true);
    //   return;
    // }
    // const finalData = { ...data, newsletter: data.newsletter ?? false };

    // setStep("delivery");
  }

  const selectedDelivery = watch("delivery");
  const selectedPayment = watch("payment");

  function deliveryPrice() {
    let value = 0;

    const isSK = deliveryTo === "sk" || deliveryTo === "";

    if (!isFree) {
      if (selectedDelivery === "packeta-box") {
        value = isSK ? 3.4 : 4.1;
      }

      if (selectedDelivery === "packeta-home") {
        value = isSK ? 5.99 : 7.2;
      }

      if (selectedDelivery === "ppl-box") {
        value = isSK ? 3.6 : 4.7;
      }

      if (selectedDelivery === "ppl-home") {
        value = isSK ? 5.99 : 6.99;
      }
    }

    return {
      value,
      label: value === 0 ? "Doprava zdarma" : formatCurrency(value),
    };
  }

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues]);

  return (
    <>
      <div className={styles.container}>
        <form onSubmit={handleSubmit(submitData)}>
          <div className={styles.billing_info}>
            <section>
              <p>1. Vyberte krajinu doručenia</p>
              <div>
                <input
                  type="radio"
                  id="cz"
                  {...register("country")}
                  value="cz"
                  onClick={(e) => setDeliveryTo(e.currentTarget.value)}
                />
                <label htmlFor="cz"> Česko </label>
              </div>
              <div>
                <input
                  type="radio"
                  id="sk"
                  {...register("country")}
                  value="sk"
                  onClick={(e) => setDeliveryTo(e.currentTarget.value)}
                />
                <label htmlFor="sk"> Slovensko </label>
              </div>
              {errors.country && (
                <span style={{ color: "red" }}>Vyberte možnosť</span>
              )}
            </section>
            <section>
              <p>2. Vyberte spôsob dopravy</p>

              <div className={styles.radio_option}>
                <div>
                  <input
                    type="radio"
                    id="packeta-box"
                    {...register("delivery")}
                    value="packeta-box"
                  />
                  <label htmlFor="packeta-box"> Packeta - Z-BOX</label>
                </div>
                <p>
                  {isFree
                    ? "doprava zdarma"
                    : deliveryTo === "sk" || deliveryTo === ""
                      ? formatCurrency(3.4)
                      : formatCurrency(4.1)}
                </p>
              </div>
              <div className={styles.radio_option}>
                <div>
                  <input
                    type="radio"
                    id="packeta-home"
                    {...register("delivery")}
                    value="packeta-home"
                  />
                  <label htmlFor="packeta-home">
                    {" "}
                    Packeta – doručenie na adresu{" "}
                  </label>
                </div>
                <p>
                  {isFree
                    ? "doprava zdarma"
                    : deliveryTo === "sk" || deliveryTo === ""
                      ? formatCurrency(5.99)
                      : formatCurrency(7.2)}
                </p>
              </div>
              <div className={styles.radio_option}>
                <div>
                  <input
                    type="radio"
                    id="ppl-box"
                    {...register("delivery")}
                    value="ppl-box"
                  />
                  <label htmlFor="ppl-box"> PPL – Parcelbox</label>
                </div>
                <p>
                  {isFree
                    ? "doprava zdarma"
                    : deliveryTo === "sk" || deliveryTo === ""
                      ? formatCurrency(3.6)
                      : formatCurrency(4.7)}
                </p>
              </div>
              <div className={styles.radio_option}>
                <div>
                  <input
                    type="radio"
                    id="ppl-home"
                    {...register("delivery")}
                    value="ppl-home"
                  />
                  <label htmlFor="ppl-home"> PPL – doručenie na adresu</label>
                </div>
                <p>
                  {" "}
                  {isFree
                    ? "doprava zdarma"
                    : deliveryTo === "sk" || deliveryTo === ""
                      ? formatCurrency(5.99)
                      : formatCurrency(6.99)}
                </p>
              </div>
              {errors.delivery && (
                <span style={{ color: "red" }}>Vyberte možnosť</span>
              )}
            </section>
            <section>
              <p>3. Vyberte spôsob platby</p>

              <div className={styles.radio_option}>
                <div>
                  <input
                    type="radio"
                    id="card"
                    {...register("payment")}
                    value="card"
                  />
                  <label htmlFor="card"> Platba kartou online </label>
                </div>
                <p>free</p>
              </div>
              <div className={styles.radio_option}>
                <div>
                  <input
                    type="radio"
                    id="paypal"
                    {...register("payment")}
                    value="paypal"
                  />
                  <label htmlFor="paypal"> PayPal </label>
                </div>
                <p>free</p>
              </div>
              <div className={styles.radio_option}>
                <div>
                  <input
                    type="radio"
                    id="transaction"
                    {...register("payment")}
                    value="transaction"
                  />
                  <label htmlFor="transaction"> Bankový prevod </label>
                </div>
                <p>free</p>
              </div>
              {errors.payment && (
                <span style={{ color: "red" }}>Vyberte možnosť</span>
              )}
            </section>
          </div>
          <Review />
          <div>
            <div>
              <p>Doprava: </p>
              {selectedDelivery === "packeta-box" && (
                <>
                  {" "}
                  <p>Packeta - Z-BOX</p>
                  <p>{deliveryPrice().label}</p>
                  {/* <p>
                    {Number(totalPrice.toFixed(2)) >= 49
                      ? "doprava zdarma"
                      : deliveryTo === "sk" || deliveryTo === ""
                        ? formatCurrency(3.4)
                        : formatCurrency(4.1)}
                  </p> */}
                </>
              )}
              {selectedDelivery === "packeta-home" && (
                <>
                  <p>Packeta - kuriér</p>
                  <p>{deliveryPrice().label}</p>
                </>
              )}
              {selectedDelivery === "ppl-box" && (
                <>
                  <p>PPL - Parcelbox</p>
                  <p>{deliveryPrice().label}</p>
                </>
              )}
              {selectedDelivery === "ppl-home" && (
                <>
                  <p>PPL - kuriér</p>
                  <p>{deliveryPrice().label}</p>
                </>
              )}
            </div>
            <div>
              <p>Platba:</p>
              {selectedPayment === "card" && <p>Kartou online</p>}
              {selectedPayment === "paypal" && <p>PayPal</p>}
              {selectedPayment === "transaction" && <p>Bankový prevod</p>}
            </div>{" "}
            {giftPackaging && (
              <p>+ Darčekové balenie {formatCurrency(giftPackagingPrice)}</p>
            )}
          </div>
          <div>
            <p>
              Celkom s DPH{" "}
              {formatCurrency(
                cartItems.reduce((total, cartItem) => {
                  const product = data.find((item) => item.id === cartItem.id);
                  return total + (product?.price || 0) * cartItem.quantity;
                }, 0) +
                  (giftPackaging ? giftPackagingPrice : 0) +
                  deliveryPrice().value,
              )}{" "}
            </p>
          </div>

          <section className={styles.step_controls}>
            <button
              className={styles.step_controls__prev}
              onClick={() => setStep("billing")}
            >
              Späť
            </button>
            <button type="submit" className={styles.step_controls__next}>
              Objednať s povinnosťou platby
            </button>
          </section>
          {step === "purchase" && (
            <PurchaseConfirmationModal
              finishProcess={finishProcess}
              loading={loading}
              setLoading={setLoading}
            />
          )}
        </form>
      </div>
    </>
  );
}
