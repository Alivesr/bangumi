const collectionType = (type: number) => {
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
  }
};

export default collectionType;
