// src/pages/CalculatorPage.tsx
import { useState, useCallback } from 'react';
import styles from './CalculatorPage.module.css';

import type {
  CalculationMode,
  Environment,
  DistanceUnit,
  TimeInputState,
  PaceInputState,
  Gender, // Gender 타입 import
} from '../types/calculator';

import ModeSelector from '../components/calculator/ModeSelector';
import EnvironmentSelector from '../components/calculator/EnvironmentSelector';
import InputSection from '../components/calculator/InputSection';
import ActionButton from '../components/calculator/ActionButton';
import ResultDisplay from '../components/calculator/ResultDisplay';
import CalorieInputs from '../components/calculator/CalorieInputs'; // CalorieInputs import

// METs 값 추정 함수 (페이스[분/km] 기반)
const getMETs = (paceMinPerKm: number): number => {
  if (isNaN(paceMinPerKm) || paceMinPerKm <= 0) return 0; // 유효하지 않은 페이스
  if (paceMinPerKm > 7.5) return 7.0;      // 매우 느린 조깅 (> 7:30/km)
  if (paceMinPerKm > 6.2) return 8.3;      // 느린 조깅 (6:11/km ~ 7:30/km)
  if (paceMinPerKm > 5.6) return 9.0;      // 보통 조깅 (5:36/km ~ 6:10/km)
  if (paceMinPerKm > 5.0) return 10.0;     // 보통 달리기 (5:00/km ~ 5:35/km)
  if (paceMinPerKm > 4.3) return 11.5;     // 빠른 달리기 (4:18/km ~ 4:59/km)
  if (paceMinPerKm > 3.7) return 12.8;     // 매우 빠른 달리기 (3:42/km ~ 4:17/km)
  return 14.0;                             // 최상위권 (3:41/km 미만)
};

function CalculatorPage() {
  // 기존 상태 변수들 ...
  const [calculationMode, setCalculationMode] = useState<CalculationMode>('pace');
  const [environment, setEnvironment] = useState<Environment>('outdoor');
  const [distance, setDistance] = useState<string>('');
  const [distanceUnit, setDistanceUnit] = useState<DistanceUnit>('km');
  const [timeInput, setTimeInput] = useState<TimeInputState>({ hours: '', minutes: '', seconds: '' });
  const [paceInput, setPaceInput] = useState<PaceInputState>({ minutes: '', seconds: '' });
  const [calculatedResult, setCalculatedResult] = useState<string>('');
  const [treadmillSpeedEquivalent, setTreadmillSpeedEquivalent] = useState<string>('');

  // 칼로리 계산용 새 상태 변수들
  const [weight, setWeight] = useState<string>('');
  const [height, setHeight] = useState<string>(''); // 현재 직접 사용 X
  const [gender, setGender] = useState<Gender>(''); // 현재 직접 사용 X (향후 확장용)
  const [calculatedCalories, setCalculatedCalories] = useState<string>('');

  const handleCalculate = useCallback(() => {
    // --- 기존 페이스/시간 계산 로직 시작 ---
    const distKm = distanceUnit === 'miles' ? parseFloat(distance) * 1.60934 : parseFloat(distance);
    if (isNaN(distKm) || distKm <= 0) {
        alert("올바른 거리를 입력해주세요.");
        setCalculatedResult('');
        setTreadmillSpeedEquivalent('');
        setCalculatedCalories(''); // 결과 초기화
        return;
    }

    let resultText = "";
    let treadmillSpeedText = "";
    let totalSeconds = 0;
    let finalPaceMinPerKm = 0; // 칼로리 계산을 위해 페이스(분/km) 저장

    if (calculationMode === 'pace') {
        // ... (시간 입력 유효성 검사 및 totalSeconds 계산 로직은 이전과 동일)
        const h = parseInt(timeInput.hours || '0');
        const m = parseInt(timeInput.minutes || '0');
        const s = parseInt(timeInput.seconds || '0');
        if ((!timeInput.hours && !timeInput.minutes && !timeInput.seconds) || isNaN(h) || isNaN(m) || isNaN(s)) {
            alert("올바른 시간을 입력해주세요 (숫자만 입력 가능).");
            setCalculatedResult(''); setTreadmillSpeedEquivalent(''); setCalculatedCalories(''); return;
        }
        totalSeconds = h * 3600 + m * 60 + s;
        if (totalSeconds <= 0) {
            alert("시간은 0보다 커야 합니다.");
            setCalculatedResult(''); setTreadmillSpeedEquivalent(''); setCalculatedCalories(''); return;
        }

        const paceSecondsPerKm = totalSeconds / distKm;
        finalPaceMinPerKm = paceSecondsPerKm / 60; // 분 단위 페이스

        const paceMinutes = Math.floor(paceSecondsPerKm / 60);
        const paceRemainingSeconds = Math.round(paceSecondsPerKm % 60);
        resultText = `${paceMinutes}'${paceRemainingSeconds.toString().padStart(2, '0')}"/km`;
        if (distanceUnit === 'miles') {
            const paceSecondsPerMile = totalSeconds / parseFloat(distance);
            const paceMinutesMile = Math.floor(paceSecondsPerMile / 60);
            const paceRemainingSecondsMile = Math.round(paceSecondsPerMile % 60);
            resultText += ` (${paceMinutesMile}'${paceRemainingSecondsMile.toString().padStart(2, '0')}"/mile)`;
        }
        // ... (트레드밀 속도 계산 로직은 이전과 동일)
        if (environment === 'indoor') {
            const speedKmh = (distKm / (totalSeconds / 3600));
            if (!isNaN(speedKmh) && speedKmh !== Infinity) {
              treadmillSpeedText = `${speedKmh.toFixed(1)} km/h`;
            }
        }
    } else { // 'time' calculationMode (예상 시간 계산)
        // ... (페이스 입력 유효성 검사 및 totalSeconds 계산 로직은 이전과 동일)
        const pM = parseInt(paceInput.minutes || '0');
        const pS = parseInt(paceInput.seconds || '0');
        if ((!paceInput.minutes && !paceInput.seconds) || isNaN(pM) || isNaN(pS)) {
            alert("올바른 페이스를 입력해주세요 (숫자만 입력 가능).");
            setCalculatedResult(''); setTreadmillSpeedEquivalent(''); setCalculatedCalories(''); return;
        }
        const paceTotalSecondsPerUnit = pM * 60 + pS; // 입력된 페이스 (초/단위거리)
         if (paceTotalSecondsPerUnit <= 0) {
            alert("페이스는 0보다 커야 합니다.");
            setCalculatedResult(''); setTreadmillSpeedEquivalent(''); setCalculatedCalories(''); return;
        }
        
        finalPaceMinPerKm = distanceUnit === 'km' ? paceTotalSecondsPerUnit / 60 : (paceTotalSecondsPerUnit / 1.60934) / 60; // 분/km로 변환

        totalSeconds = distanceUnit === 'km' 
            ? paceTotalSecondsPerUnit * distKm 
            : paceTotalSecondsPerUnit * parseFloat(distance); // mile 단위 페이스면 원래 distance 사용

        // ... (예상 시간 표시 로직은 이전과 동일)
        const totalHours = Math.floor(totalSeconds / 3600);
        const remainingSecondsAfterHours = totalSeconds % 3600;
        const totalMinutes = Math.floor(remainingSecondsAfterHours / 60);
        const finalSeconds = Math.round(remainingSecondsAfterHours % 60);
        resultText = "";
        if (totalHours > 0) resultText += `${totalHours}시간 `;
        resultText += `${totalMinutes}분 `;
        resultText += `${finalSeconds.toString().padStart(2, '0')}초`;
        // ... (트레드밀 속도 계산 로직은 이전과 동일)
        if (environment === 'indoor') {
            const speedKmh = distanceUnit === 'km' ? (3600 / paceTotalSecondsPerUnit) : ( (3600 / paceTotalSecondsPerUnit) * 1.60934) ;
             if (!isNaN(speedKmh) && speedKmh !== Infinity) {
                treadmillSpeedText = `${speedKmh.toFixed(1)} km/h (설정 페이스 기준)`;
             }
        }
    }
    setCalculatedResult(resultText);
    setTreadmillSpeedEquivalent(treadmillSpeedText);
    // --- 기존 페이스/시간 계산 로직 끝 ---

    // --- 칼로리 계산 로직 시작 ---
    const weightKg = parseFloat(weight);
    if (!isNaN(weightKg) && weightKg > 0 && totalSeconds > 0 && !isNaN(finalPaceMinPerKm) && finalPaceMinPerKm > 0) {
      const mets = getMETs(finalPaceMinPerKm);
      const durationInHours = totalSeconds / 3600;
      let calories = mets * weightKg * durationInHours;

      // (선택적) 성별에 따른 미세 조정 (예시: 여성의 경우 5~10% 적게)
      // if (gender === 'female') {
      //   calories *= 0.95; 
      // }

      setCalculatedCalories(calories.toFixed(0)); // 소수점 없이 반올림
    } else {
      setCalculatedCalories(''); // 필요한 값이 없으면 칼로리 비움
    }
    // --- 칼로리 계산 로직 끝 ---

  }, [
    distance, distanceUnit, timeInput, paceInput, calculationMode, environment, 
    weight, gender // height는 직접 사용 안함
  ]);

  const handleReset = useCallback(() => {
    // 기존 리셋 로직 ...
    setDistance('');
    setTimeInput({ hours: '', minutes: '', seconds: '' });
    setPaceInput({ minutes: '', seconds: '' });
    setCalculatedResult('');
    setTreadmillSpeedEquivalent('');
    // 칼로리 관련 상태도 리셋
    setWeight('');
    setHeight('');
    setGender('');
    setCalculatedCalories('');
  }, []);

  return (
    <div className={styles.calculatorPage}>
      <h1>러닝 페이스 계산기</h1>

      <div className={styles.sectionWrapper}>
        <ModeSelector currentMode={calculationMode} onModeChange={setCalculationMode} />
      </div>

      <div className={styles.sectionWrapper}>
        <EnvironmentSelector currentEnvironment={environment} onEnvironmentChange={setEnvironment} />
      </div>

      <div className={styles.sectionWrapper}>
        <InputSection
          calculationMode={calculationMode}
          distance={distance} setDistance={setDistance}
          distanceUnit={distanceUnit} setDistanceUnit={setDistanceUnit}
          timeInput={timeInput} setTimeInput={setTimeInput}
          paceInput={paceInput} setPaceInput={setPaceInput}
        />
      </div>

      {/* 칼로리 입력 섹션 추가 */}
      <div className={styles.sectionWrapper}>
        <CalorieInputs
          weight={weight} setWeight={setWeight}
          height={height} setHeight={setHeight}
          gender={gender} setGender={setGender}
        />
      </div>

      <div className={styles.sectionWrapper}>
        <ActionButton onCalculate={handleCalculate} onReset={handleReset} />
      </div>
      
      {/* ResultDisplay에 calories prop 전달 */}
      {(calculatedResult || (environment === 'indoor' && treadmillSpeedEquivalent) || calculatedCalories) && (
         <div className={styles.sectionWrapper}>
            <ResultDisplay 
              result={calculatedResult} 
              treadmillSpeed={treadmillSpeedEquivalent} 
              environment={environment}
              calories={calculatedCalories} 
            />
        </div>
      )}
    </div>
  );
}

export default CalculatorPage;