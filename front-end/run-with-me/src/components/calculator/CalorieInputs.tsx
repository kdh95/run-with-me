import React from 'react';
import type { Gender } from '../../types/calculator'; // Gender 타입 import
import styles from './CalorieInputs.module.css';

interface CalorieInputsProps {
  weight: string;
  setWeight: (value: string) => void;
  height: string;
  setHeight: (value: string) => void;
  gender: Gender;
  setGender: (value: Gender) => void;
}

const CalorieInputs: React.FC<CalorieInputsProps> = ({
  weight, setWeight,
  height, setHeight,
  gender, setGender
}) => {
  return (
    <div className={styles.calorieInputsContainer}>
      <h3 className={styles.sectionTitle}>추가 정보 (칼로리 계산용)</h3>
      <div className={styles.inputGrid}>
        <div className={styles.inputGroup}>
          <label htmlFor="weight">체중 (kg):</label>
          <input
            id="weight"
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="예: 70"
            className={styles.inputField}
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="height">키 (cm):</label>
          <input
            id="height"
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder="예: 175"
            className={styles.inputField}
          />
          <small className={styles.infoText}>* 키는 현재 활동 칼로리 계산에 직접 사용되지 않으나, 향후 정밀 계산을 위해 입력받습니다.</small>
        </div>

        <div className={styles.inputGroup}>
          <label>성별:</label>
          <div className={styles.radioGroup}>
            <label htmlFor="male" className={styles.radioLabel}>
              <input
                type="radio"
                id="male"
                name="gender"
                value="male"
                checked={gender === 'male'}
                onChange={() => setGender('male')}
              /> 남성
            </label>
            <label htmlFor="female" className={styles.radioLabel}>
              <input
                type="radio"
                id="female"
                name="gender"
                value="female"
                checked={gender === 'female'}
                onChange={() => setGender('female')}
              /> 여성
            </label>
          </div>
          <small className={styles.infoText}>* 성별은 칼로리 추정 시 참고될 수 있습니다.</small>
        </div>
      </div>
    </div>
  );
};

export default CalorieInputs;