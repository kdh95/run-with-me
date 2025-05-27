import React from 'react';
import type { Environment } from '../../types/calculator'; // 경로에 맞게 수정
import styles from './ResultDisplay.module.css';

interface ResultDisplayProps {
  result: string; // 페이스 또는 시간 결과
  treadmillSpeed: string;
  environment: Environment;
  calories?: string; // 선택적: 계산된 칼로리
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ 
  result, 
  treadmillSpeed, 
  environment,
  calories 
}) => {
  // 표시할 내용이 하나라도 있는지 확인
  const hasContent = result || (environment === 'indoor' && treadmillSpeed) || calories;

  if (!hasContent) return null;
  
  return (
    <div className={styles.resultContainer}>
      {result && <h3 className={styles.mainResult}>{result}</h3>}
      {environment === 'indoor' && treadmillSpeed && <p className={styles.subResult}>트레드밀 속도: {treadmillSpeed}</p>}
      {calories && <p className={styles.calorieResult}> 예상 소모 칼로리: <strong>{calories} kcal</strong></p>}
    </div>
  );
};

export default ResultDisplay;