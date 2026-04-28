import { useState } from "react";
import styles from "./CheckOut.module.css";
import { CartSummary } from "../components/CartSummary";
import { Billing } from "../components/Billing";
import { Delivery } from "../components/Delivery";
import { useNavigate } from "react-router-dom";
import { useShoppingCart } from "../context/ShoppingCartContext";

export function CheckOut() {
  // steps => cart, billing, delivery, purchase
  const { setCartItems } = useShoppingCart();

  const [step, setStep] = useState<string>("cart");
  const navigate = useNavigate();

  type FormData = {
    billing: {
      firstName: string;
      lastName: string;
      email: string;
      street: string;
      town: string;
      psc: string;
      phone: string;
      giftPackaging: boolean;
      newsletter: boolean;
    };
    delivery: {
      country: string;
      delivery: string;
      payment: string;
    };
  };
  const INITIAL_DATA: FormData = {
    billing: {
      firstName: "",
      lastName: "",
      email: "",
      street: "",
      town: "",
      psc: "",
      phone: "",
      giftPackaging: false,
      newsletter: false,
    },
    delivery: {
      country: "",
      delivery: "",
      payment: "",
    },
  };

  const [formData, setFormData] = useState<FormData>(INITIAL_DATA);

  function finishProcess() {
    navigate("/");
    setFormData(INITIAL_DATA);
    setCartItems([]);
    setStep("cart");
  }

  return (
    <div
      className={`${styles.container} ${step !== "purchase" ? styles.not_purchase : ""}`}
    >
      <section className={styles.step_navigation}>
        <div
          className={`${styles.step} ${styles.one} ${step === "cart" || step === "billing" || step === "delivery" ? styles.active : ""}`}
        >
          <div
            className={`${styles.circle}  ${step === "cart" || step === "billing" || step === "delivery" ? styles.active : ""}`}
          >
            1
          </div>{" "}
          <p className={styles.title}> Nákupný košík</p>
        </div>
        <div
          className={`${styles.step} ${styles.two} ${step === "billing" || step === "delivery" ? styles.active : ""}`}
        >
          <div
            className={`${styles.circle}  ${step === "cart" || step === "billing" || step === "delivery" ? styles.active : ""}`}
          >
            2
          </div>{" "}
          <p className={styles.title}> Fakturačné údaje</p>
        </div>
        <div
          className={`${styles.step} ${styles.three} ${step === "delivery" ? styles.active : ""}`}
        >
          <div
            className={`${styles.circle} ${step === "cart" || step === "billing" || step === "delivery" ? styles.active : ""}`}
          >
            3
          </div>{" "}
          <p className={styles.title}> Doprava a&nbsp;platba</p>
        </div>
      </section>
      {step === "cart" ? (
        <CartSummary variant="big" setStep={setStep} />
      ) : step === "billing" ? (
        <Billing
          defaultValues={formData.billing}
          onUpdateBilling={(billing) =>
            setFormData((prev) => ({ ...prev, billing }))
          }
          setStep={setStep}
        />
      ) : (
        <Delivery
          step={step}
          defaultValues={formData.delivery}
          onUpdateDelivery={(delivery) =>
            setFormData((prev) => ({ ...prev, delivery }))
          }
          giftPackaging={formData.billing.giftPackaging}
          finishProcess={finishProcess}
          setStep={setStep}
        />
      )}
    </div>
  );
}
