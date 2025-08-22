const formatTime = (isoString: string) => {
  const date = new Date(isoString);

  const y = date.getFullYear();
  const m = date.getMonth() + 1; // 月份从0开始
  const d = date.getDate();
  const hh = date.getHours();
  const mm = date.getMinutes().toString().padStart(2, "0");

  return `${y}-${m}-${d} ${hh}:${mm}`;
};

export default formatTime;
