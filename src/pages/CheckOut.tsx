import { useEffect, useRef, useState } from "react";
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
  const giftPackagingPrice = 1.5;
  console.log(formData);

  // function toPrev() {
  //   if (step === "delivery") {
  //     setStep("billing");
  //   } else if (step === "billing") {
  //     setStep("cart");
  //   } else if (step === "cart") {
  //     navigate("/");
  //   }
  // }

  // function toNext() {
  //   if (step === "cart") {
  //     setStep("billing");
  //   } else if (step === "billing") {
  //     setStep("delivery");
  //   } else if (step === "delivery") {
  //     setStep("purchase");
  //     alert("PURCHASED");
  //   }
  // }

  // function handleSubmit(e: MouseEvent) {
  //   e.preventDefault();
  // }

  // function handleClick(e: MouseEvent) {
  //   if (step === "billing" || step === "delivery") {
  //     handleSubmit(e);
  //   }
  //   toNext();
  // }

  function finishProcess() {
    // alert("done");
    console.log("data sent", formData);
    navigate("/");

    setFormData(INITIAL_DATA);
    setCartItems([]);
    setStep("cart");
  }

  useEffect(() => {
    console.log("FORM DATA FROM STATE---", formData);
  }, [formData]);

  return (
    <div className={styles.container}>
      <section className={styles.step_navigation}>
        <div
          className={`${styles.step} ${step === "cart" || step === "billing" || step === "delivery" ? styles.active : ""}`}
        >
          <span>1</span> Nákupný košík
        </div>
        <div
          className={`${styles.step} ${step === "billing" || step === "delivery" ? styles.active : ""}`}
        >
          <span>2</span> fakturačné údaje
        </div>
        <div
          className={`${styles.step} ${step === "delivery" ? styles.active : ""}`}
        >
          <span>3</span> Doprava a platba
        </div>
      </section>
      {step === "cart" ? (
        <CartSummary setStep={setStep} />
      ) : step === "billing" ? (
        <Billing
          defaultValues={formData.billing}
          onUpdateBilling={(billing) =>
            setFormData((prev) => ({ ...prev, billing }))
          }
          giftPackagingPrice={giftPackagingPrice}
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
          giftPackagingPrice={giftPackagingPrice}
          finishProcess={finishProcess}
          setStep={setStep}
        />
      )}
      {/* <section className={styles.step_controls}>
        <button className={styles.step_controls__prev} onClick={toPrev}>
          back
        </button>
        <button
          className={styles.step_controls__next}
          onClick={(e) => handleClick(e)}
        >
          next
        </button>
      </section> */}
    </div>
  );
}
