import { createPortal } from "react-dom";
import styles from "./ImageModal.module.css";
import { useEffect, useRef, useState } from "react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  productToOpen: string[];
  clickedImgIndex?: number;
  // imgUrl: string[];
};

export function ImageModal({
  isOpen,
  onClose,
  productToOpen,
  clickedImgIndex,
  // imgUrl,
}: ModalProps) {
  if (!isOpen) return null;

  // const root = document.getElementById("modal-root");
  // if (!root) return null;

  // const [displayedImg, setDisplayedImg] = useState<string>("");

  const [imgToDisplay, setImgToDisplay] = useState<number>(
    clickedImgIndex || 0,
  );

  const imageRef = useRef(null);

  useEffect(() => {
    const handleAction = (e: MouseEvent | KeyboardEvent) => {
      if (e instanceof KeyboardEvent) {
        if (e.key === "Escape") {
          onClose();
        }
      }
    };

    window.addEventListener("keydown", handleAction);
    console.log("key---", clickedImgIndex);

    return () => {
      window.removeEventListener("keydown", handleAction);
    };
  }, [onClose]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        showNextImg();
      }
      if (e.key === "ArrowLeft") {
        showPreviousImg();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  function showPreviousImg() {
    setImgToDisplay((prev) => {
      if (prev === 0) {
        return productToOpen.length - 1;
      } else {
        return prev - 1;
      }
    });
  }

  function showNextImg() {
    setImgToDisplay((prev) => {
      if (prev === productToOpen.length - 1) {
        return 0;
      } else {
        return prev + 1;
      }
    });
  }

  function handleClick() {
    onClose();
  }

  return createPortal(
    <div
      className={styles.overlay}
      // onKeyDown={(e) => e.key === "Escape" && onClose()} - cant be used cause div is not focusable - useEffect is a better solution than tabIndex={0} (makes div focusable)
    >
      <span>
        <button onClick={handleClick} className={styles.close_btn}>
          x
        </button>
        <button onClick={showPreviousImg} className={styles.prev}>
          {"<"}
        </button>
        <img
          ref={imageRef}
          // onClick={handleClick}
          src={productToOpen[imgToDisplay]}
          alt="product-detail"
        />
        <button onClick={showNextImg} className={styles.next}>
          {">"}
        </button>
      </span>
    </div>,
    document.body,
  );
}
