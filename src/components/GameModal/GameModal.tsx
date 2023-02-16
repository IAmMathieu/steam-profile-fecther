import styles from "@assets/styles/views/GameModal.module.css";
import { MouseEventHandler } from "react";

type Show = {
  show: boolean;
  onClose: MouseEventHandler<HTMLButtonElement>;
  gameID: number;
};

export default function GameModal(props: Show) {
  console.log(props.gameID);
  
  if (!props.show) {
    return null;
  }
  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <div className={styles.modalTitle}>My Modal</div>
        </div>
        <div className={styles.modalBody}>My Modal Body</div>
        <div className={styles.modalFooter}>
          <button className={styles.button} onClick={props.onClose}>
            Close Me
          </button>
        </div>
      </div>
    </div>
  );
}
