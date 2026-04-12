import { createPortal } from "react-dom";
import styles from "./PurchaseConfirmationModal.module.css";
import { useEffect, useRef, useState } from "react";

type ModalProps = {
  finishProcess: () => void;
  loading: boolean;
};

export function PurchaseConfirmationModal({
  finishProcess,
  loading,
  setLoading,
}: ModalProps) {
  // setLoading(true);

  return (
    <>
      <div className={styles.overlay}>
        {loading ? (
          <div className={styles.loading}></div>
        ) : (
          <>
            <div className={styles.modal}>
              <button className={styles.close_button} onClick={finishProcess}>
                ☓
              </button>
              <p className={styles.main_text}>Ďakujeme za nákup.</p>
              <p className={styles.secondary_text}>
                Potvrdenie o objednávke nájdete vo svojej e-mailovej schránke.
              </p>
            </div>
          </>
        )}
      </div>
    </>
  );
}
