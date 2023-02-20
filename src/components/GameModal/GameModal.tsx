/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import styles from './GameModal.module.css';
import { Show } from '../../types/Types';

export default function GameModal(props: Show) {
  const { show, onClose } = props;
  if (!show) {
    return null;
  }
  return (
    <div className={styles.modal} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <div className={styles.modalTitle}>My Modal</div>
        </div>
        <div className={styles.modalBody}>My Modal Body</div>
        <div className={styles.modalFooter}>
          <button type="button" className={styles.button} onClick={onClose}>
            Close Me
          </button>
        </div>
      </div>
    </div>
  );
}
