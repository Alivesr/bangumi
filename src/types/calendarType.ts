type CalendarItem = {
  id: number;
  name: string;
  name_cn?: string;
  images?: {
    large?: string;
    medium?: string;
    small?: string;
    [key: string]: string | undefined;
  };
  // 可根据实际数据结构补充更多字段
};

type CalendarDay = {
  weekday: {
    en: string;
    cn: string;
    ja: string;
    id: number;
  };
  items: CalendarItem[];
};

export type { CalendarItem, CalendarDay };
