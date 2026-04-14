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
      <span className={styles.container}>
        <button onClick={handleClick} className={styles.close_btn}>
          {/* x */}
          <svg
            className={styles.svg}
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
            <path d="M12 2a10 10 0 1 0 0 20 10 10 0 1 0 0-20z" />
            <path d="m15 9-6 6" />
            <path d="m9 9 6 6" />
          </svg>
        </button>
        <button onClick={showPreviousImg} className={styles.prev_btn}>
          {/* {"<"} */}
          <svg
            className={styles.svg}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 2a10 10 0 1 0 0 20 10 10 0 1 0 0-20z" />
            <path d="m12 8-4 4 4 4" />
            <path d="M16 12H8" />
          </svg>
        </button>
        <img
          className={styles.img}
          ref={imageRef}
          src={productToOpen[imgToDisplay]}
          alt="product-detail"
        />
        <button onClick={showNextImg} className={styles.next_btn}>
          {/* {">"} */}
          <svg
            className={styles.svg}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 2a10 10 0 1 0 0 20 10 10 0 1 0 0-20z" />
            <path d="m12 16 4-4-4-4" />
            <path d="M8 12h8" />
          </svg>
        </button>
      </span>
    </div>,
    document.body,
  );
}
