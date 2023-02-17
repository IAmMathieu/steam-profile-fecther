import styles from "./GameModal.module.css";
import { Show } from "../../types/Types";


export default function GameModal(props: Show) {

  if (!props.show) {
    return null;
  }
  return (
    <div className={styles.modal} onClick={props.onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
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
