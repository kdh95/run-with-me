import { useState, useCallback } from 'react';
import styles from './CalculatorPage.module.css'; // CSS Module import

// 공유 타입 import (경로는 실제 프로젝트 구조에 맞게 조정해주세요)
import type {
  CalculationMode,
  Environment,
  DistanceUnit,
  TimeInputState,
  PaceInputState,
} from '../types/calculator';

// 분리된 컴포넌트들 import (경로는 실제 프로젝트 구조에 맞게 조정해주세요)
import ModeSelector from '../components/calculator/ModeSelector';
import EnvironmentSelector from '../components/calculator/EnvironmentSelector';
import InputSection from '../components/calculator/InputSection';
import ActionButton from '../components/calculator/ActionButton';
import ResultDisplay from '../components/calculator/ResultDisplay';

function CalculatorPage() {
  const [calculationMode, setCalculationMode] = useState<CalculationMode>('pace');
  const [environment, setEnvironment] = useState<Environment>('outdoor');
  const [distance, setDistance] = useState<string>('');
  const [distanceUnit, setDistanceUnit] = useState<DistanceUnit>('km');
  const [timeInput, setTimeInput] = useState<TimeInputState>({ hours: '', minutes: '', seconds: '' });
  const [paceInput, setPaceInput] = useState<PaceInputState>({ minutes: '', seconds: '' });
  const [calculatedResult, setCalculatedResult] = useState<string>('');
  const [treadmillSpeedEquivalent, setTreadmillSpeedEquivalent] = useState<string>('');

  const handleCalculate = useCallback(() => {
    const dist = parseFloat(distance);
    if (isNaN(dist) || dist <= 0) {
        alert("올바른 거리를 입력해주세요.");
        return;
    }

    let resultText = "";
    let treadmillSpeedText = "";

    if (calculationMode === 'pace') {
        const h = parseInt(timeInput.hours || '0');
        const m = parseInt(timeInput.minutes || '0');
        const s = parseInt(timeInput.seconds || '0');
        // 시간 입력이 모두 비어있거나, 숫자가 아니거나, 0인 경우 유효성 검사
        if ((!timeInput.hours && !timeInput.minutes && !timeInput.seconds) || isNaN(h) || isNaN(m) || isNaN(s)) {
             alert("올바른 시간을 입력해주세요 (숫자만 입력 가능).");
            return;
        }
        const totalSeconds = h * 3600 + m * 60 + s;
        if (totalSeconds <= 0) {
            alert("시간은 0보다 커야 합니다.");
            return;
        }

        const paceSecondsPerUnit = totalSeconds / dist;
        const paceMinutes = Math.floor(paceSecondsPerUnit / 60);
        const paceRemainingSeconds = Math.round(paceSecondsPerUnit % 60);
        resultText = `${paceMinutes}'${paceRemainingSeconds.toString().padStart(2, '0')}"/${distanceUnit}`;

        if (environment === 'indoor') {
            const speed = distanceUnit === 'km' ? (dist / (totalSeconds / 3600)) : ((dist * 1.60934) / (totalSeconds / 3600));
            if (!isNaN(speed) && speed !== Infinity) {
              treadmillSpeedText = `${speed.toFixed(1)} km/h`;
            }
        }

    } else { // 'time' calculationMode
        const pM = parseInt(paceInput.minutes || '0');
        const pS = parseInt(paceInput.seconds || '0');
        if ((!paceInput.minutes && !paceInput.seconds) || isNaN(pM) || isNaN(pS)) {
            alert("올바른 페이스를 입력해주세요 (숫자만 입력 가능).");
            return;
        }
        const paceTotalSecondsPerUnit = pM * 60 + pS;
         if (paceTotalSecondsPerUnit <= 0) {
            alert("페이스는 0보다 커야 합니다.");
            return;
        }
        const totalSeconds = paceTotalSecondsPerUnit * dist;

        const totalHours = Math.floor(totalSeconds / 3600);
        const remainingSecondsAfterHours = totalSeconds % 3600;
        const totalMinutes = Math.floor(remainingSecondsAfterHours / 60);
        const finalSeconds = Math.round(remainingSecondsAfterHours % 60);

        resultText = "";
        if (totalHours > 0) resultText += `${totalHours}시간 `;
        resultText += `${totalMinutes}분 `;
        resultText += `${finalSeconds.toString().padStart(2, '0')}초`;

        if (environment === 'indoor') {
             const speed = distanceUnit === 'km' ? (3600 / paceTotalSecondsPerUnit) : ( (3600 / paceTotalSecondsPerUnit) * 1.60934) ;
             if (!isNaN(speed) && speed !== Infinity) {
                treadmillSpeedText = `${speed.toFixed(1)} km/h (설정 페이스 기준)`;
             }
        }
    }
    setCalculatedResult(resultText);
    setTreadmillSpeedEquivalent(treadmillSpeedText);
  }, [distance, distanceUnit, timeInput, paceInput, calculationMode, environment]);

  const handleReset = useCallback(() => {
    setDistance('');
    // setDistanceUnit('km'); // 단위는 유지하거나 초기화 선택
    setTimeInput({ hours: '', minutes: '', seconds: '' });
    setPaceInput({ minutes: '', seconds: '' });
    setCalculatedResult('');
    setTreadmillSpeedEquivalent('');
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

      <div className={styles.sectionWrapper}>
        <ActionButton onCalculate={handleCalculate} onReset={handleReset} />
      </div>

      {/* 결과 표시는 결과가 있거나 트레드밀 속도 정보가 있을 때만 섹션으로 감싸서 렌더링 */}
      {(calculatedResult || (environment === 'indoor' && treadmillSpeedEquivalent)) && (
         <div className={styles.sectionWrapper}>
            <ResultDisplay result={calculatedResult} treadmillSpeed={treadmillSpeedEquivalent} environment={environment} />
        </div>
      )}
    </div>
  );
}

export default CalculatorPage;