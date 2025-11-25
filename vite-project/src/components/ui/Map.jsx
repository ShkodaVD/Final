import React, { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export default function Map() {
  useEffect(() => {

    const existing = L.DomUtil.get("map");
    if (existing !== null) {
      existing._leaflet_id = null;
    }


    const map = L.map("map").setView([47.221388, 39.720145], 15);


    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(map);


    L.marker([47.221388, 39.720145])
      .addTo(map)
      .openPopup();

    return () => {
      map.remove();
    };
  }, []);

  return (
    <div
      id="map"
      style={{
        width: "100%",
        height: "350px",
        borderRadius: "12px",
        overflow: "hidden",
      }}
    />
  );
}