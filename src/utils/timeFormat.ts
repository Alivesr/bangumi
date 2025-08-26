const timeFormat = (isoString?: string) => {
  if (!isoString) return "未知时间";

  const date = new Date(isoString);

  const y = date.getFullYear();
  const m = date.getMonth() + 1; // 月份从0开始
  const d = date.getDate();
  const hh = date.getHours();
  const mm = date.getMinutes().toString().padStart(2, "0");

  return `${y}-${m}-${d} ${hh}:${mm}`;
};

export default timeFormat;

export const formatDate = (timestamp: number) => {
  const date = new Date(timestamp * 1000);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 1) {
    return "昨天";
  } else if (diffDays < 7) {
    return `${diffDays}天前`;
  } else if (diffDays < 30) {
    const weeks = Math.floor(diffDays / 7);
    return `${weeks}周前`;
  } else if (diffDays < 365) {
    const months = Math.floor(diffDays / 30);
    return `${months}个月前`;
  } else {
    const years = Math.floor(diffDays / 365);
    return `${years}年前`;
  }
};
