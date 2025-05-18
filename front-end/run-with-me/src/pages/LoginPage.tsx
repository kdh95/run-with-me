import { useState } from "react";
import styles from "./LoginPage.module.css";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: axios.post('/api/login', form)
    if (form.username && form.password) {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userId", "1"); // 임시 사용자 ID
      alert("로그인 성공!");
      navigate("/"); // 홈으로 이동
    } else {
      alert("아이디와 비밀번호를 입력해주세요.");
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>로그인</h2>
      <form className={styles.form} onSubmit={handleLogin}>
        <input
          className={styles.input}
          name="username"
          placeholder="아이디"
          onChange={handleChange}
          required
        />
        <input
          className={styles.input}
          type="password"
          name="password"
          placeholder="비밀번호"
          onChange={handleChange}
          required
        />
        <button type="submit" className={styles.button}>
          로그인
        </button>
      </form>
      <p className={styles.link} onClick={() => navigate("/signup")}>
        아직 회원이 아니신가요? 회원가입
      </p>
    </div>
  );
}
