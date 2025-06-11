import React, { useEffect, useState } from "react";

// Daftar toko dengan mapUrl langsung
const stores = [
  {
    id: 4,
    name: "Guardian - Citimall Sukabumi",
    lat: -6.9217785,
    lng: 106.9278479,
    mapUrl: "https://www.google.com/maps/place/Guardian+-+Citimall+Sukabumi/@-6.9227149,106.9281983,18.83z/data=!4m6!3m5!1s0x2e68495e4c45aaed:0xc386081f25c19c32!8m2!3d-6.9219083!4d106.928828!16s%2Fg%2F11x13jgvkn?entry=ttu&g_ep=EgoyMDI1MDYwOC4wIKXMDSoASAFQAw%3D%3D"
  },
  {
    id: 2,
    name: "Watsons Supermall Sukabumi",
    lat: -6.9201908,
    lng: 106.9255351,
    mapUrl: "https://www.google.com/maps/place/Watsons+Supermall+Sukabumi/@-6.9201908,106.9255351,17z/data=!3m1!4b1!4m6!3m5!1s0x2e6848307cf1159b:0x20d158e88d2eed75!8m2!3d-6.9201908!4d106.9281154!16s%2Fg%2F11d_7whtwv?entry=ttu&g_ep=EgoyMDI1MDYwOC4wIKXMDSoASAFQAw%3D%3D"
  },
  {
    id: 3,
    name: "Alfamart A. Yani 2 Sukabumi",
    lat: -6.9213604,
    lng: 106.9233741,
    mapUrl: "https://www.google.com/maps/place/Alfamart+A.+Yani+2+Sukabumi/@-6.9213604,106.9233741,21z/data=!4m6!3m5!1s0x2e684825601ec201:0x717b3dd99b6b4200!8m2!3d-6.9213085!4d106.9232601!16s%2Fg%2F11b6dnr27n?entry=ttu&g_ep=EgoyMDI1MDYwOC4wIKXMDSoASAFQAw%3D%3D"
  }
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
            )
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
    <div className="rounded-3xl shadow-lg ">
      <h2
        className="text-xl font-extrabold mb-6"
        style={{
          color: "var(--color-primary)",
          fontFamily: "'Poppins', sans-serif"
        }}
      >
        Toko Terdekat
      </h2>

      {!userLocation && (
        <p
          className="text-center italic fade-in"
          style={{ color: "var(--color-desc)" }}
        >
          Menunggu lokasi pengguna...
        </p>
      )}

      {userLocation && sortedStores.length > 0 && (
        <ul className="space-y-4">
          {sortedStores.map((store, idx) => (
            <li key={store.id}>
              <a
                href={
                  store.mapUrl ||
                  `https://www.google.com/maps/search/?api=1&query=${store.lat},${store.lng}`
                }
                target="_blank"
                rel="noopener noreferrer"
                className="flex justify-between items-center p-4 rounded-2xl cursor-pointer shadow-md transition-transform duration-300 hover:scale-[1.03] hover:shadow-xl"
                style={{
                  backgroundColor:
                    idx === 0 ? "var(--color-primary)" : "white",
                  color:
                    idx === 0 ? "white" : "var(--color-secondary)",
                  fontWeight: idx === 0 ? "600" : "400",
                  fontFamily: "'Poppins', sans-serif",
                  boxShadow:
                    idx === 0
                      ? "0 10px 20px rgba(44, 157, 143, 0.4)"
                      : "0 4px 6px rgba(0,0,0,0.1)",
                  textDecoration: "none"
                }}
                title={`Buka di Maps - Jarak: ${store.distance.toFixed(2)} km`}
              >
                <span>{store.name}</span>
                <span
                  style={{
                    fontFamily: "monospace",
                    letterSpacing: "0.05em"
                  }}
                >
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
  return R * c;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

export default NearbyStores;
