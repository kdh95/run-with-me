import { useEffect, useRef, useState } from "react";

interface KakaoMapProps {
  onSelect: (lat: number, lng: number) => void;
}

export default function KakaoMap({ onSelect }: KakaoMapProps) {
  const [search, setSearch] = useState("");
  const mapRef = useRef<any>(null);
  const markerRef = useRef<any>(null);

  useEffect(() => {
    const loadMap = () => {
      const kakao = (window as any).kakao;
      kakao.maps.load(() => {
        const container = document.getElementById("map");
        const options = {
          center: new kakao.maps.LatLng(37.5665, 126.978),
          level: 3,
        };
        const map = new kakao.maps.Map(container, options);
        mapRef.current = map;

        const marker = new kakao.maps.Marker();
        markerRef.current = marker;

        kakao.maps.event.addListener(map, "click", function (mouseEvent: any) {
          const latlng = mouseEvent.latLng;
          marker.setMap(map);
          marker.setPosition(latlng);
          onSelect(latlng.getLat(), latlng.getLng());
        });
      });
    };

    if (!(window as any).kakao) {
      const script = document.createElement("script");
      script.src =
        "//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=8a9c7d66f3431a54d06b9a15b416dcd4&libraries=services";
      script.onload = loadMap;
      document.head.appendChild(script);
    } else {
      loadMap();
    }
  }, []);

  const handleSearch = () => {
    const kakao = (window as any).kakao;
    const ps = new kakao.maps.services.Places();

    ps.keywordSearch(search, function (data: any[], status: string) {
      if (status === kakao.maps.services.Status.OK) {
        const first = data[0];
        const coords = new kakao.maps.LatLng(first.y, first.x);
        mapRef.current.setCenter(coords);
        markerRef.current.setMap(mapRef.current);
        markerRef.current.setPosition(coords);
        onSelect(Number(first.y), Number(first.x));
      } else {
        alert("주소를 찾을 수 없습니다.");
      }
    });
  };

  return (
    <div>
      <div style={{ marginBottom: "0.5rem", display: "flex", gap: "0.5rem" }}>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="장소 또는 주소 검색"
          style={{
            flex: 1,
            padding: "0.5rem",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        />
        <button
          type="button"
          onClick={handleSearch}
          style={{ padding: "0.5rem 1rem" }}
        >
          검색
        </button>
      </div>
      <div id="map" style={{ width: "100%", height: "300px" }} />
    </div>
  );
}
