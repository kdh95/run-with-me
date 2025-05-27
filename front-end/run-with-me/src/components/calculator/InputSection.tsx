import React from 'react';
import type {
  CalculationMode,
  DistanceUnit,
  TimeInputState,
  PaceInputState,
} from '../../types/calculator'; // 경로에 맞게 수정
import styles from './InputSection.module.css'; // CSS Module import

interface InputSectionProps {
  calculationMode: CalculationMode;
  distance: string;
  setDistance: React.Dispatch<React.SetStateAction<string>>;
  distanceUnit: DistanceUnit;
  setDistanceUnit: React.Dispatch<React.SetStateAction<DistanceUnit>>;
  timeInput: TimeInputState;
  setTimeInput: React.Dispatch<React.SetStateAction<TimeInputState>>;
  paceInput: PaceInputState;
  setPaceInput: React.Dispatch<React.SetStateAction<PaceInputState>>;
}

const InputSection: React.FC<InputSectionProps> = ({
  calculationMode,
  distance, setDistance,
  distanceUnit, setDistanceUnit,
  timeInput, setTimeInput,
  paceInput, setPaceInput,
}) => {
  return (
    <div>
      <div className={styles.inputGroup}>
        <label htmlFor="distance">거리: </label>
        <div className={styles.distanceInputContainer}> {/* 거리와 단위를 한 줄에 놓기 위한 컨테이너 */}
          <input
            id="distance"
            type="number"
            value={distance}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDistance(e.target.value)}
            placeholder="0"
            className={styles.distanceValue}
          />
          <select 
            value={distanceUnit} 
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setDistanceUnit(e.target.value as DistanceUnit)}
            className={styles.distanceUnit}
          >
            <option value="km">km</option>
            <option value="miles">miles</option>
          </select>
        </div>
      </div>

      {calculationMode === 'pace' && (
        <div className={styles.inputGroup}>
          <label htmlFor="timeHours">시간: </label>
          <div className={styles.inlineInputs}>
            <input 
              id="timeHours" 
              type="text" 
              placeholder="HH" 
              value={timeInput.hours} 
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTimeInput({...timeInput, hours: e.target.value})} 
              maxLength={2}
            />
            <span>:</span>
            <input 
              type="text" 
              placeholder="MM" 
              value={timeInput.minutes} 
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTimeInput({...timeInput, minutes: e.target.value})} 
              maxLength={2}
            />
            <span>:</span>
            <input 
              type="text" 
              placeholder="SS" 
              value={timeInput.seconds} 
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTimeInput({...timeInput, seconds: e.target.value})} 
              maxLength={2}
            />
          </div>
        </div>
      )}

      {calculationMode === 'time' && (
        <div className={styles.inputGroup}>
          <label htmlFor="paceMinutes">페이스: </label>
          <div className={styles.inlineInputs}>
            <input 
              id="paceMinutes"
              type="text" 
              placeholder="MM" 
              value={paceInput.minutes} 
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPaceInput({...paceInput, minutes: e.target.value})} 
              maxLength={2}
            />
            <span>'</span>
            <input 
              type="text" 
              placeholder="SS" 
              value={paceInput.seconds} 
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPaceInput({...paceInput, seconds: e.target.value})} 
              maxLength={2}
            />
            <span>"</span>
            <span className={styles.paceUnitSuffix}>/{distanceUnit}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default InputSection;