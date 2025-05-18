import { useNavigate } from "react-router-dom";
import { FaRunning } from "react-icons/fa";
import NotificationBell from "./NotificationBell";
import styles from "./HeaderBar.module.css";

export default function HeaderBar() {
  const navigate = useNavigate();

  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        {/* 왼쪽: 홈 이동용 */}
        <div className={styles.left} onClick={() => navigate("/")}>
          <FaRunning size={24} className={styles.homeIcon} />
        </div>

        {/* 오른쪽: 알림 */}
        <div className={styles.right}>
          <NotificationBell />
        </div>
      </div>
    </header>
  );
}
