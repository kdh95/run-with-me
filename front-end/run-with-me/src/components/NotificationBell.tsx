import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./NotificationBell.module.css";
import { FaBell } from "react-icons/fa";
import { API } from "../config"; // ✅ 공통 변수 사용
import ChatModal from "./ChatModal"; // ✅ 모달 컴포넌트 import

type MatchNotification = {
  id: number;
  fromUserNickname: string;
  matchDate: string;
  distanceKm: number;
};

export default function NotificationBell() {
  const [list, setList] = useState<MatchNotification[]>([]);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // 채팅 모달 관련 상태값
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatRoomId, setChatRoomId] = useState<number | null>(null);

  // ✅ 알림 목록 불러오기
  useEffect(() => {
    axios
      .get(API.MATCH_NOTIFICATIONS, { params: { userId: 1 } })
      .then((res) => setList(res.data))
      .catch((err) => console.error("❌ 알림 불러오기 실패:", err));
  }, []);

  // ✅ 드롭다운 외 클릭 시 닫기
  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, []);

  // ✅ 알림 제거 (UI에서만)
  const removeFromList = (id: number) => {
    setList((prev) => prev.filter((item) => item.id !== id));
  };

  // ✅ 수락 처리
  const handleAccept = async (id: number) => {
    try {
      await axios.post(`${API.MATCH_NOTIFICATIONS}/${id}/accept`);
      const res = await axios.post(
        `${API.MATCH_NOTIFICATIONS}/${id}/start-chat`
      );
      const roomId = res.data.chatRoomId;

      removeFromList(id);
      setChatRoomId(roomId); // ✅ 채팅방 ID 저장
      setIsChatOpen(true); // ✅ 모달 열기
    } catch (err) {
      console.error("❌ 수락 또는 채팅 생성 실패:", err);
    }
  };

  // ✅ 거절 처리
  const handleReject = async (id: number) => {
    try {
      await axios.post(`${API.MATCH_NOTIFICATIONS}/${id}/reject`);
      removeFromList(id);
    } catch (err) {
      console.error("❌ 거절 처리 실패:", err);
    }
  };

  return (
    <div className={styles.bellWrapper} ref={ref}>
      <div className={styles.bellIcon} onClick={() => setOpen((prev) => !prev)}>
        <FaBell size={24} />
        {list.length > 0 && <span className={styles.count}>{list.length}</span>}
      </div>

      {open && (
        <div className={styles.dropdown}>
          <ul>
            {list.length === 0 ? (
              <li className={styles.empty}>알림 없음</li>
            ) : (
              list.map((n) => (
                <li key={n.id} className={styles.item}>
                  <b>{n.fromUserNickname}</b> 님이 매칭을 요청했어요!
                  <div className={styles.meta}>
                    {n.matchDate} / {n.distanceKm}km
                  </div>
                  <div className={styles.actions}>
                    <button onClick={() => handleAccept(n.id)}>수락</button>
                    <button onClick={() => handleReject(n.id)}>거절</button>
                  </div>
                </li>
              ))
            )}
          </ul>
          <a className={styles.link} href="/my-matches">
            자세히 보기
          </a>
        </div>
      )}
    </div>
  );
}
