import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./SubMenuBar.module.css";

export default function SubMenuBar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className={styles.bar}>
      <div className={styles.inner}>
        <div className={styles.left}></div> {/* 비워두거나 확장용 */}
        <div className={styles.right}>
          <div className={styles.menuIcon} onClick={() => setOpen(!open)}>
            ☰
          </div>
          {open && (
            <ul className={styles.dropdown}>
              <li onClick={() => navigate("/match-results")}>매칭 결과 보기</li>
              <li className={styles.disabled}>러닝 클래스 (예정)</li>
              <li className={styles.disabled}>마라톤 일정 (예정)</li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
