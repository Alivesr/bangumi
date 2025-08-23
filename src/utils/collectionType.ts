const collectionType = (type?: number) => {
  if (type === undefined) return "未知";
  
  switch (type) {
    case 1:
      return "想看";
    case 2:
      return "看过";
    case 3:
      return "在看";
    case 4:
      return "搁置";
    case 5:
      return "抛弃";
    default:
      return "未知";
  }
};

export default collectionType;
