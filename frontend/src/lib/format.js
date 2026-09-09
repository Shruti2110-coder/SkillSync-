// Small helpers shared across pages.

export const minutesOf = (lessons = []) =>
  lessons.reduce((total, l) => total + (parseInt(l.duration, 10) || 0), 0);

export const runtimeOf = (lessons = []) => {
  const mins = minutesOf(lessons);
  if (!mins) return null;
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return h ? `${h}h ${m}m` : `${m}m`;
};

export const priceOf = (price) => (price ? `₹${price}` : "Free");

export const authHeader = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};
