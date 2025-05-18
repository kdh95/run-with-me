import styles from "./MatchPage.module.css";
import { useState } from "react";
import dayjs from "dayjs";
import axios from "axios";
import KakaoMap from "../components/KakaoMap";
import { useNavigate } from "react-router-dom";

export default function MatchPage() {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [distance, setDistance] = useState(5);
  const [pace, setPace] = useState(5.5);

  const today = dayjs().format("YYYY-MM-DD");
  const maxDate = dayjs().add(14, "day").format("YYYY-MM-DD");

  const [locationMode, setLocationMode] = useState<"current" | "manual">(
    "current"
  );
  const [lat, setLat] = useState<number | null>(null);
  const [lng, setLng] = useState<number | null>(null);

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("브라우저에서 위치 정보를 지원하지 않습니다.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLat(pos.coords.latitude);
        setLng(pos.coords.longitude);
      },
      (err) => {
        console.error(err);
        alert("위치 정보를 가져오지 못했습니다.");
      },
      { enableHighAccuracy: true }
    );
  };

  const userId = 1;
  //   const lat = 37.541;
  //   const lng = 127.065;

  const navigate = useNavigate();

  const handleSubmit = async () => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      alert("로그인이 필요합니다. 로그인 페이지로 이동합니다.");
      navigate("/login");
      return;
    }

    if (lat === null || lng === null) {
      alert("위치를 선택하거나 입력해주세요.");
      return;
    }
    try {
      const payload = {
        userId,
        date,
        time,
        distanceKm: distance,
        paceMinPerKm: pace,
        latitude: lat,
        longitude: lng,
      };

      const res = await axios.post(
        "http://localhost:8080/api/match-requests",
        payload
      );
      console.log("✅ 매칭 요청 성공:", res.data);
      alert("매칭 요청이 완료되었습니다. 매칭이 완료되면 알려드릴게요!");
    } catch (error) {
      console.error("❌ 매칭 요청 실패:", error);
      alert("매칭 요청 중 오류가 발생했습니다.");
    }
  };

  // ✅ 이게 MatchPage 함수의 최상위 return!
  return (
    <div className={styles.container}>
      <h2
        style={{
          fontSize: "1.5rem",
          fontWeight: "bold",
          marginBottom: "1.5rem",
        }}
      >
        러너 매칭 요청
      </h2>

      <div className={styles.formGroup}>
        <label className={styles.label}>날짜</label>
        <input
          className={styles.inputField}
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          min={today}
          max={maxDate}
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>시간</label>
        <input
          className={styles.inputField}
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>목표 거리 (km)</label>
        <input
          className={styles.inputField}
          type="number"
          value={distance}
          onChange={(e) => setDistance(+e.target.value)}
          placeholder="예: 5"
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>목표 페이스 (분/km)</label>
        <input
          className={styles.inputField}
          type="number"
          step="0.1"
          value={pace}
          onChange={(e) => setPace(+e.target.value)}
          placeholder="예: 5.5"
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>위치 입력 방법</label>
        <div className={styles.radioGroup}>
          <label>
            <input
              type="radio"
              name="locationMode"
              value="current"
              checked={locationMode === "current"}
              onChange={() => setLocationMode("current")}
            />
            현재 위치 사용
          </label>
          <label>
            <input
              type="radio"
              name="locationMode"
              value="manual"
              checked={locationMode === "manual"}
              onChange={() => setLocationMode("manual")}
            />
            직접 위치 입력
          </label>
        </div>

        {locationMode === "current" && (
          <>
            <button
              className={styles.button}
              type="button"
              onClick={getCurrentLocation}
            >
              장소 선택
            </button>
            {lat !== null && lng !== null && (
              <p className={styles.label}>
                선택된 위치: {lat.toFixed(5)}, {lng.toFixed(5)}
              </p>
            )}
          </>
        )}

        {locationMode === "manual" && (
          <>
            <KakaoMap
              onSelect={(lat, lng) => {
                setLat(lat);
                setLng(lng);
              }}
            />
            {lat && lng && (
              <p className={styles.label}>
                선택한 위치: {lat.toFixed(5)}, {lng.toFixed(5)}
              </p>
            )}
          </>
        )}
      </div>

      <button className={styles.button} onClick={handleSubmit}>
        매칭 요청
      </button>
    </div>
  );
}
