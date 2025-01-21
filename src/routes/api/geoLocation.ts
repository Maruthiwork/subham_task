const DEFAULT_LOCATIONS = {
  mumbai: {
    latitude: 19.076,
    longitude: 72.8777
  },
  pune: {
    latitude: 18.5204,
    longitude: 73.8567
  },
  delhi: {
    latitude: 28.6139,
    longitude: 77.209
  }
}

export async function getLocation() {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          localStorage.setItem("locationForWeather", JSON.stringify({
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
          }));
          resolve({
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
          });
        },
        (error) => {
          console.log("Location Error ", error);
          localStorage.setItem("locationForWeather", JSON.stringify(DEFAULT_LOCATIONS.delhi));
          resolve(DEFAULT_LOCATIONS.delhi);
        }
      );
    } else {
      console.log("No Geolocation available", navigator);
      localStorage.setItem("locationForWeather", JSON.stringify(DEFAULT_LOCATIONS.delhi));
      resolve(DEFAULT_LOCATIONS.delhi)
    }
  });
}