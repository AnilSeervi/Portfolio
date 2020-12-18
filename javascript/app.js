if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/sw.js")
    .then(() => console.log("service worker is Registered"))
    .catch((err) => console.log("serviceWorker not Registered", err));
}
