import { useEffect, useState } from "react";
import styles from "./MyMatchesPage.module.css";
import axios from "axios";

type MatchNotification = {
  id: number;
  fromUserNickname: string;
  matchDate: string;
  distanceKm: number;
  pace: number;
  locationName: string;
};

export default function MyMatchesPage() {
  const [notifications, setNotifications] = useState<MatchNotification[]>([]);

  useEffect(() => {
    // 🔧 실제 요청 시 userId를 로그인 정보로 대체
    axios
      .get("http://localhost:8080/api/match-notifications", {
        params: { userId: 1 },
      })
      .then((res) => {
        setNotifications(res.data);
      })
      .catch((err) => {
        console.error("알림 불러오기 실패", err);
      });
  }, []);

  const handleAccept = (id: number) => {
    // 추후 서버 요청 추가 가능
    alert("매칭을 수락했습니다!");
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const handleReject = (id: number) => {
    alert("매칭을 거절했습니다.");
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>받은 매칭 요청</h2>
      {notifications.length === 0 ? (
        <p className={styles.empty}>현재 받은 요청이 없습니다.</p>
      ) : (
        <ul className={styles.list}>
          {notifications.map((n) => (
            <li key={n.id} className={styles.card}>
              <p>
                <b>닉네임:</b> {n.fromUserNickname}
              </p>
              <p>
                <b>날짜:</b> {n.matchDate}
              </p>
              <p>
                <b>목표거리:</b> {n.distanceKm} km
              </p>
              <p>
                <b>목표페이스:</b> {n.pace} 분/km
              </p>
              <p>
                <b>위치:</b> {n.locationName}
              </p>
              <div className={styles.actions}>
                <button onClick={() => handleAccept(n.id)}>수락</button>
                <button onClick={() => handleReject(n.id)}>거절</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
