import React, { useEffect, useState } from "react";

const stores = [
  { id: 1, name: "Toko A", lat: -6.2, lng: 106.816666 },
  { id: 2, name: "Toko B", lat: -6.3, lng: 106.7 },
  { id: 3, name: "Toko C", lat: -6.25, lng: 106.8 },
];

function NearbyStores() {
  const [userLocation, setUserLocation] = useState(null);
  const [sortedStores, setSortedStores] = useState([]);

  useEffect(() => {
    if (!navigator.geolocation) {
      alert("Geolocation tidak didukung di browser ini.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ latitude, longitude });

        const storesWithDistance = stores
          .map((store) => ({
            ...store,
            distance: getDistanceFromLatLonInKm(
              latitude,
              longitude,
              store.lat,
              store.lng
            ),
          }))
          .sort((a, b) => a.distance - b.distance);

        setSortedStores(storesWithDistance);
      },
      (error) => {
        alert("Gagal mendapatkan lokasi: " + error.message);
      }
    );
  }, []);

  return (
    <div className="rounded-3xl shadow-lg bg-white">
      <h2
        className="text-xl font-extrabold mb-6"
        style={{ color: "var(--color-primary)", fontFamily: "'Poppins', sans-serif" }}
      >
        Toko Terdekat
      </h2>

      {!userLocation && (
        <p className="text-center italic fade-in" style={{ color: "var(--color-desc)" }}>
          Menunggu lokasi pengguna...
        </p>
      )}

      {userLocation && (
        <ul className="space-y-4">
          {sortedStores.map((store, idx) => (
            <li key={store.id}>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${store.lat},${store.lng}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex justify-between items-center p-4 rounded-2xl cursor-pointer shadow-md transition-transform duration-300 hover:scale-[1.03] hover:shadow-xl"
                style={{
                  backgroundColor: idx === 0 ? "var(--color-primary)" : "white",
                  color: idx === 0 ? "white" : "var(--color-secondary)",
                  fontWeight: idx === 0 ? "600" : "400",
                  fontFamily: "'Poppins', sans-serif",
                  boxShadow: idx === 0
                    ? "0 10px 20px rgba(44, 157, 143, 0.4)"
                    : "0 4px 6px rgba(0,0,0,0.1)",
                  textDecoration: "none",
                }}
                title={`Buka di Maps - Jarak: ${store.distance.toFixed(2)} km`}
              >
                <span>{store.name}</span>
                <span style={{ fontFamily: "monospace", letterSpacing: "0.05em" }}>
                  {store.distance.toFixed(2)} km
                </span>
              </a>
            </li>
          ))}
        </ul>
      )}

      {userLocation && sortedStores.length === 0 && (
        <p className="text-center" style={{ color: "var(--color-desc)" }}>
          Tidak ada toko yang tersedia.
        </p>
      )}
    </div>
  );
}

// Fungsi hitung jarak (Haversine)
function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  const R = 6371; // radius bumi dalam km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

export default NearbyStores;
