import { useEffect, useState } from "react";
import styles from "./MatchResultsPage.module.css";
import axios from "axios";

type MatchResult = {
  id: number;
  nickname: string;
  date: string;
  time: string;
  distanceKm: number;
  paceMinPerKm: number;
};

export default function MatchResultsPage() {
  const [results, setResults] = useState<MatchResult[]>([]);

  useEffect(() => {
    // 🧪 임시로 fetch (나중에 실제 userId, 필터 기반으로 요청)
    axios
      .get("http://localhost:8080/api/match-results?userId=1")
      .then((res) => setResults(res.data))
      .catch((err) => console.error("❌ 매칭 결과 조회 실패:", err));
  }, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>매칭 결과</h2>

      {results.length === 0 ? (
        <p className={styles.empty}>조건에 맞는 러너가 아직 없어요!</p>
      ) : (
        <ul className={styles.list}>
          {results.map((r) => (
            <li key={r.id} className={styles.item}>
              <p>
                <strong>{r.nickname}</strong> 님
              </p>
              <p>
                {r.date} {r.time}
              </p>
              <p>
                {r.distanceKm}km / 페이스 {r.paceMinPerKm}분/km
              </p>
              <button className={styles.button}>알림 보내기</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
