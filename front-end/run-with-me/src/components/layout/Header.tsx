import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Header.module.css';
import { FaRunning } from "react-icons/fa";
// import { FiMenu, FiX } from 'react-icons/fi'; // react-icons 예시

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation(); // 페이지 이동 시 메뉴 닫기용

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // 페이지 이동 시 모바일 메뉴 닫기
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <header className={styles.header}>
      <div className={styles.headerContent}> {/* 중앙 정렬을 위한 내부 컨테이너 */}
        <div className={styles.logoContainer}>
          <Link to="/" className={styles.logo}>
            <FaRunning size={24} className={styles.homeIcon} />
          </Link>
        </div>
        <nav className={styles.nav}>
          {/* 데스크탑용 네비게이션 */}
          <div className={styles.desktopNavLinks}>
            <Link to="/calculator" className={styles.navLink}>
              페이스 계산기
            </Link>
            {/* <Link to="/marathon-schedule" className={styles.navLink}>마라톤 일정</Link> */}
            {/* <Link to="/community" className={styles.navLink}>커뮤니티</Link> */}
          </div>

          {/* 모바일용 햄버거 버튼 */}
          <button className={styles.hamburgerButton} onClick={toggleMenu} aria-label="메뉴 토글" aria-expanded={isMenuOpen}>
            {isMenuOpen ? '✕' : '☰'}
            {/* {isMenuOpen ? <FiX size={28}/> : <FiMenu size={28}/>} */}
          </button>
        </nav>
      </div>

      {/* 모바일 메뉴 (isMenuOpen 상태에 따라 표시) */}
      {isMenuOpen && (
        <div className={styles.mobileMenu}>
          <Link to="/calculator" className={styles.mobileMenuItem} onClick={() => setIsMenuOpen(false)}>
            페이스 계산기
          </Link>
          {/* <Link to="/marathon-schedule" className={styles.mobileMenuItem} onClick={() => setIsMenuOpen(false)}>마라톤 일정</Link> */}
          {/* <Link to="/community" className={styles.mobileMenuItem} onClick={() => setIsMenuOpen(false)}>커뮤니티</Link> */}
          {/* ... 추가 메뉴 항목 ... */}
        </div>
      )}
    </header>
  );
};

export default Header;