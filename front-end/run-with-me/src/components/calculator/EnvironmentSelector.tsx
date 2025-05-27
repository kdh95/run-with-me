import React from 'react';
import type { Environment } from '../../types/calculator'; // 경로에 맞게 수정
import styles from './EnvironmentSelector.module.css'; // CSS Module import

interface EnvironmentSelectorProps {
  currentEnvironment: Environment;
  onEnvironmentChange: (environment: Environment) => void;
}

const EnvironmentSelector: React.FC<EnvironmentSelectorProps> = ({ currentEnvironment, onEnvironmentChange }) => {
  return (
    <div className={styles.buttonGroup}> {/* ModeSelector와 동일한 그룹 클래스 사용 */}
      <button
        onClick={() => onEnvironmentChange('outdoor')}
        className={`${styles.button} ${currentEnvironment === 'outdoor' ? styles.active : ''}`}
      >
        실외
      </button>
      <button
        onClick={() => onEnvironmentChange('indoor')}
        className={`${styles.button} ${currentEnvironment === 'indoor' ? styles.active : ''}`}
      >
        실내(트레드밀)
      </button>
    </div>
  );
};

export default EnvironmentSelector;