import React from 'react';
import styles from './Footer.module.css';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      <p>&copy; {currentYear} RunWithMe. All rights reserved.</p>
      {/* <p>
        <Link to="/privacy-policy">개인정보처리방침</Link> | 
        <Link to="/terms-of-service">이용약관</Link>
      </p> */}
    </footer>
  );
};

export default Footer;