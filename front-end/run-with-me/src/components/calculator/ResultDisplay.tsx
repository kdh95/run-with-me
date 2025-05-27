import React from 'react';
import type { Environment } from '../../types/calculator'; // 경로에 맞게 수정
import styles from './ResultDisplay.module.css'; // CSS Module import

interface ResultDisplayProps {
  result: string;
  treadmillSpeed: string;
  environment: Environment;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ result, treadmillSpeed, environment }) => {
  if (!result && !(environment === 'indoor' && treadmillSpeed)) { // 둘 다 내용이 없을 때만 null 반환
    return null;
  }
  
  return (
    <div className={styles.resultContainer}>
      {result && <h3>{result}</h3>} {/* 결과가 있을 때만 표시 */}
      {environment === 'indoor' && treadmillSpeed && <p>트레드밀 속도: {treadmillSpeed}</p>}
    </div>
  );
};

export default ResultDisplay;