export const parseTime = (timeString: string): number => {
  const [hours, minutes, seconds] = timeString.split(":").map(Number);
  return hours * 3600 + minutes * 60 + seconds;
};

export const formatTime = (timeInSeconds: number): string => {
  const hours = Math.floor(timeInSeconds / 3600);
  const minutes = Math.floor((timeInSeconds % 3600) / 60);
  const seconds = timeInSeconds % 60;
  if (hours > 0) {
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  } else {
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  }
};

export const sendNotification = (title: string, body: string): void => {
  if (!("Notification" in window)) {
    console.warn("Notifications are not supported by your browser.");
    return;
  }

  if (Notification.permission === "granted") {
    new Notification(title, { body });
  } else if (Notification.permission === "default") {
    Notification.requestPermission()
      .then((permission) => {
        if (permission === "granted") {
          new Notification(title, { body });
        } else if (permission === "denied") {
          console.warn("Notifications have been denied by the user.");
        }
      })
      .catch((error) => console.error("Notification permission request failed:", error));
  } else {
    console.warn("Notifications have been denied. Please enable them in your browser settings.");
  }
};
