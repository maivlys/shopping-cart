import { useShoppingCart } from "../context/ShoppingCartContext";
import styles from "./Billing.module.css";
import { Review } from "./Review";
import { formatCurrency } from "../utilities/formatCurrency";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useEffect, useRef, useState } from "react";

const schema = z.object({
  firstName: z
    .string()
    .min(1, "Required")
    .transform((val) =>
      val.length > 0 ? val[0].toUpperCase() + val.slice(1) : val,
    ),
  lastName: z
    .string()
    .min(1, "Required")
    .transform((val) =>
      val.length > 0 ? val[0].toUpperCase() + val.slice(1) : val,
    ),
  email: z.email(),
  street: z
    .string()
    .min(1, "Required")
    .transform((val) =>
      val.length > 0 ? val[0].toUpperCase() + val.slice(1) : val,
    ),
  town: z
    .string()
    .min(1, "Required")
    .transform((val) =>
      val.length > 0 ? val[0].toUpperCase() + val.slice(1) : val,
    ),
  psc: z
    .string()
    .refine(
      (val) => val.replace(/\s/g, "").length === 5 && /^\d[\d\s]*\d$/.test(val),
    ),
  phone: z
    .string()
    .transform((val) => val.replace(/\s/g, ""))
    .refine((val) => val.length === 13 && /^\+\d{12}$/.test(val)),
  giftPackaging: z.boolean().nullish(),
  newsletter: z.boolean().nullish(),
});

type BillingData = z.infer<typeof schema>;

type Props = {
  defaultValues: BillingData;
  onUpdateBilling: (data: BillingData) => void;
  setStep: React.Dispatch<React.SetStateAction<string>>;
};

export function Billing({ defaultValues, onUpdateBilling, setStep }: Props) {
  const { giftPackagingPrice } = useShoppingCart();

  const termsRef = useRef<HTMLInputElement>(null);
  const [termsError, setTermsError] = useState(false);

  const [giftPackaging, setGiftPackaging] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<BillingData>({
    resolver: zodResolver(schema),
  });

  function submitData(data: BillingData) {
    if (!termsRef.current?.checked) {
      setTermsError(true);
      return;
    }
    const finalData = {
      ...data,
      giftPackaging: data.giftPackaging ?? false,
      newsletter: data.newsletter ?? false,
    };
    onUpdateBilling(finalData);
    setStep("delivery");
  }

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues]);

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit(submitData)}>
        <div className={styles.container}>
          <div className={`${styles.billing_info} ${styles.left_side}`}>
            <section className={styles.form_section}>
              <p className={styles.title}>Dodacie a fakturačné údaje</p>
              <div className={styles.input_group}>
                <label className={styles.label} htmlFor="name">
                  Meno<span className={styles.star}>*</span>
                </label>
                <input
                  className={`${styles.input} ${errors.firstName ? styles.empty : null}`}
                  {...register("firstName")}
                  type="text"
                  id="name"
                />
              </div>
              <div className={styles.input_group}>
                <label className={styles.label} htmlFor="name">
                  Priezvisko<span className={styles.star}>*</span>
                </label>
                <input
                  className={`${styles.input} ${errors.lastName ? styles.empty : null}`}
                  {...register("lastName")}
                  type="text"
                  id="name"
                />
              </div>
              <div className={styles.input_group}>
                <label className={styles.label} htmlFor="email">
                  Email<span className={styles.star}>*</span>
                </label>
                <input
                  className={`${styles.input} ${errors.email ? styles.empty : null}`}
                  {...register("email")}
                  type="email"
                  id="email"
                />
              </div>
              <div className={styles.input_group}>
                <label className={styles.label} htmlFor="street">
                  Ulica / číslo<span className={styles.star}>*</span>
                </label>
                <input
                  className={`${styles.input} ${errors.street ? styles.empty : null}`}
                  {...register("street")}
                  type="text"
                  id="street"
                />
              </div>
              <div className={styles.input_group}>
                <label className={styles.label} htmlFor="town">
                  Mesto<span className={styles.star}>*</span>
                </label>
                <input
                  className={`${styles.input} ${errors.town ? styles.empty : null}`}
                  {...register("town")}
                  type="text"
                  id="town"
                />
              </div>
              <div className={styles.input_group}>
                <label className={styles.label} htmlFor="post-code">
                  PSČ<span className={styles.star}>*</span>
                </label>
                <input
                  className={`${styles.input} ${errors.psc ? styles.empty : null}`}
                  {...register("psc")}
                  placeholder="123 45"
                  type="text"
                  id="post-code"
                />
              </div>
              <div className={styles.input_group}>
                <label className={styles.label} htmlFor="phone-number">
                  Telefón<span className={styles.star}>*</span>
                </label>
                <input
                  className={`${styles.input} ${errors.phone ? styles.empty : null}`}
                  placeholder="+420 000 000"
                  {...register("phone")}
                  type="tel"
                  id="phone-number"
                />
              </div>
            </section>
            <section className={styles.gift_section}>
              <p className={styles.title}>Balenie</p>

              <div className={styles.input_container}>
                <input
                  className={styles.gift_checkbox}
                  type="checkbox"
                  id="giftPackaging"
                  {...register("giftPackaging")}
                  name="giftPackaging"
                  checked={giftPackaging}
                  onChange={(e) => setGiftPackaging(e.target.checked)}
                />
                <label className={styles.label} htmlFor="giftPackaging">
                  {" "}
                  Darčekové balenie{" "}
                </label>
                <p className={styles.gift_price}>
                  {formatCurrency(giftPackagingPrice)}
                </p>
              </div>
            </section>

            <section className={styles.check_section}>
              <div>
                <input
                  className={styles.checkbox}
                  onClick={() => {
                    if (termsError === true) {
                      setTermsError(false);
                    }
                  }}
                  ref={termsRef}
                  type="checkbox"
                  id="scales"
                  name="scales"
                />
                <label
                  className={` ${styles.label} ${termsError ? styles.terms_error : ""}`}
                  htmlFor="scales"
                >
                  Súhlasím s obchodnými podmienkami a potvrdzujem, že som sa
                  oboznámil/a so spracovaním osobných údajov*
                </label>
              </div>
              <div>
                <input
                  className={styles.checkbox}
                  {...register("newsletter")}
                  type="checkbox"
                  id="newsletter"
                  name="newsletter"
                />
                <label className={styles.label} htmlFor="newsletter">
                  Chcem dostávať novinky, zľavy, inšpirácie a špeciálne ponuky
                  e-mailom.
                </label>
              </div>
            </section>
          </div>
          <div className={styles.right_side}>
            <Review giftPackaging={giftPackaging} page={"billing"} />
            <section className={styles.step_controls}>
              <button
                className={styles.step_controls__prev}
                onClick={() => setStep("cart")}
              >
                Späť
              </button>
              <button type="submit" className={styles.step_controls__next}>
                Pokračovať v objednávke
              </button>
            </section>
          </div>
        </div>
      </form>
    </>
  );
}
