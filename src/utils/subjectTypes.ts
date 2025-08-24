const subjectType = (type?: number) => {
  if (type === undefined) return "未知";

  switch (type) {
    case 0:
      return "全部";
    case 1:
      return "书籍";
    case 2:
      return "动画";
    case 3:
      return "音乐";
    case 4:
      return "游戏";
    case 6:
      return "三次元";
    default:
      return "未知";
  }
};

export default subjectType;
