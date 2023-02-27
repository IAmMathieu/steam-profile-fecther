/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { MouseEventHandler } from 'react';
import styles from './GameModal.module.css';
import { GameInfos } from '../../types/Types';

export default function GameModal(props: {
  show: boolean;
  onClose: MouseEventHandler;
  gameData: GameInfos;
}) {
  const { show, onClose, gameData } = props;
  if (!show) {
    return null;
  }
  return (
    <div className={styles.modal} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <div className={styles.modalTitle}>
            {gameData.playerstats.gameName}
          </div>
        </div>
        <div className={styles.achievements}>Achievements unlocked:</div>
        <ul>
          {gameData.playerstats.achievements.map((achievement) => (
            <li key={achievement.name}>{achievement.name}</li>
          ))}
        </ul>
        {gameData.playerstats.stats && (
          <>
            <div className={styles.stats}>Player stats:</div>
            <ul>
              {gameData.playerstats.stats.map((stat) => (
                <p key={stat.name}>
                  {stat.name}: {stat.value}
                </p>
              ))}
            </ul>
          </>
        )}

        <div className={styles.modalFooter}>
          <button type="button" className={styles.button} onClick={onClose}>
            Close Me
          </button>
        </div>
      </div>
    </div>
  );
}
