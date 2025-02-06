import React, { useEffect } from 'react'
import { Loader } from "@googlemaps/js-api-loader";

export default function GoogleMap({address, lat, lng}) {
  useEffect(() => {
    // Google Maps API 로드
    const loader = new Loader({
      apiKey: "YOUR_API_KEY",  
      version: "weekly",       
    });

    loader.load().then(() => {
      // API가 로드된 후에 google 객체 사용 가능
      const mapLat = parseFloat(lat) || 37.5665; // lat 값이 없다면 기본 서울 위도
      const mapLng = parseFloat(lng) || 126.9780; // lng 값이 없다면 기본 서울 경도

      // google 객체를 사용하려면 window.google로 접근
      const map = new window.google.maps.Map(document.getElementById("map"), {
        center: { lat: mapLat, lng: mapLng },
        zoom: 14,
      });

      const marker = new window.google.maps.Marker({
        position: { lat: mapLat, lng: mapLng },
        map: map,
        title: address || "주소 없음", // address가 없으면 기본 텍스트
      });

      const infoWindow = new window.google.maps.InfoWindow({
        content: `<p>${address || "주소 없음"}</p>`,
      });

      marker.addListener("click", () => {
        infoWindow.open(map, marker);
      });
    }).catch((error) => {
      console.error("Error loading Google Maps API:", error);
    });
  }, [address, lat, lng]);

  return (
    <>
      {/* <p>Address: {address}</p> */}
      <div id="map" style={{ width: "1000px", height: "500px" }}></div>
    </>
  );
}
