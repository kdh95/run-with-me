import React from 'react';
import styles from './ActionButton.module.css'; // CSS Module import

interface ActionButtonProps {
  onCalculate: () => void;
  onReset: () => void;
}

const ActionButton: React.FC<ActionButtonProps> = ({ onCalculate, onReset }) => {
  return (
    <div className={styles.buttonGroup}>
      <button onClick={onCalculate} className={`${styles.button} ${styles.calculateButton}`}>
        계산하기
      </button>
      <button onClick={onReset} className={styles.button}>
        초기화
      </button>
    </div>
  );
};

export default ActionButton;