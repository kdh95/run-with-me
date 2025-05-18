import { useState } from "react";
import styles from "./SignupPage.module.css";

export default function SignupPage() {
  const [form, setForm] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    phone: "",
    address: "",
    allowMatch: false,
    verifyCode: "",
  });

  const [codeSent, setCodeSent] = useState(false);
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [mockCode, setMockCode] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const sendVerificationCode = () => {
    if (!form.phone) {
      alert("휴대폰 번호를 입력해주세요.");
      return;
    }
    const generated = String(Math.floor(100000 + Math.random() * 900000)); // 6자리 코드
    setMockCode(generated);
    setCodeSent(true);
    setPhoneVerified(false);
    alert(`모의 인증코드 전송됨: ${generated}`);
    // TODO: axios.post('/api/phone/send-code', { phone: form.phone })
  };

  const verifyCode = () => {
    if (form.verifyCode === mockCode) {
      setPhoneVerified(true);
      alert("휴대폰 인증이 완료되었습니다!");
    } else {
      alert("인증코드가 올바르지 않습니다.");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneVerified) {
      alert("휴대폰 번호 인증을 완료해주세요.");
      return;
    }
    if (form.password !== form.confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    alert("회원가입 성공!\n" + JSON.stringify(form, null, 2));
    // TODO: axios.post('/api/signup', form)
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>회원가입</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          className={styles.input}
          name="username"
          placeholder="아이디"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="비밀번호"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="비밀번호 확인"
          onChange={handleChange}
          required
        />

        <div className={styles.phoneGroup}>
          <input
            name="phone"
            placeholder="핸드폰 번호"
            onChange={handleChange}
            required
            disabled={phoneVerified}
          />
          <button
            type="button"
            onClick={sendVerificationCode}
            disabled={phoneVerified}
          >
            인증코드 전송
          </button>
        </div>

        {codeSent && !phoneVerified && (
          <div className={styles.phoneGroup}>
            <input
              className={styles.input}
              name="phone"
              placeholder="핸드폰 번호"
              onChange={handleChange}
              required
              disabled={phoneVerified}
            />
            <button
              type="button"
              onClick={sendVerificationCode}
              disabled={phoneVerified}
            >
              인증코드 전송
            </button>
          </div>
        )}

        {phoneVerified && <p className={styles.success}>인증 완료 ✔️</p>}

        <input
          className={styles.input}
          name="address"
          placeholder="주소"
          onChange={handleChange}
          required
        />

        <label className={styles.checkbox}>
          <input
            type="checkbox"
            name="allowMatch"
            checked={form.allowMatch}
            onChange={handleChange}
          />
          매칭 서비스 사용
        </label>

        <button type="submit" className={styles.button}>
          가입하기
        </button>
      </form>
    </div>
  );
}
