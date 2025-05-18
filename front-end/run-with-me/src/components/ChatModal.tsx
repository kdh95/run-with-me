import styles from "./ChatModal.module.css";
import { ReactNode } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  children?: ReactNode;
};

export default function ChatModal({ isOpen, onClose, children }: Props) {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.close} onClick={onClose}>
          ✕
        </button>
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
}
