import React from 'react';
import type { CalculationMode } from '../../types/calculator';
import styles from './ModeSelector.module.css'; // CSS Module import

interface ModeSelectorProps {
  currentMode: CalculationMode;
  onModeChange: (mode: CalculationMode) => void;
}

const ModeSelector: React.FC<ModeSelectorProps> = ({ currentMode, onModeChange }) => {
  return (
    <div className={styles.buttonGroup}> {/* 버튼 그룹 클래스 적용 */}
      <button
        onClick={() => onModeChange('pace')}
        className={`${styles.button} ${currentMode === 'pace' ? styles.active : ''}`}
      >
        페이스 계산
      </button>
      <button
        onClick={() => onModeChange('time')}
        className={`${styles.button} ${currentMode === 'time' ? styles.active : ''}`}
      >
        예상 시간 계산
      </button>
    </div>
  );
};

export default ModeSelector;