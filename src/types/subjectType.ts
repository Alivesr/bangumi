export interface SearchSubjectsFilter {
  type?: number[];
  meta_tags?: string[];
  tag?: string[];
  air_date?: string[];
  rating?: string[];
  rank?: string[];
  nsfw?: boolean;
}

export interface SearchSubjectsParamsRequest {
  keyword: string;
  sort?: string;
  filter?: SearchSubjectsFilter;
}

/**
 * Paged[Subject]
 */
export interface SearchSubjectsParamsResponse {
  /**
   * Data
   */
  data?: Subject[];
  /**
   * Limit
   */
  limit?: number;
  /**
   * Offset
   */
  offset?: number;
  /**
   * Total
   */
  total?: number;
  [property: string]: any;
}

/**
 * Subject
 */
export interface Subject {
  /**
   * Collection
   */
  collection: Collection;
  /**
   * Date，air date in `YYYY-MM-DD` format
   */
  date?: string;
  /**
   * Eps，由旧服务端从wiki中解析，对于书籍条目为`话数`
   */
  eps: number;
  /**
   * ID
   */
  id: number;
  images: Images;
  infobox?: Item[];
  /**
   * Locked
   */
  locked: boolean;
  /**
   * 由维基人维护的 tag
   */
  meta_tags: string[];
  /**
   * Name
   */
  name: string;
  /**
   * Name Cn
   */
  name_cn: string;
  /**
   * Nsfw
   */
  nsfw: boolean;
  /**
   * Platform，TV, Web, 欧美剧, DLC...
   */
  platform: string;
  /**
   * Rating
   */
  rating: Rating;
  /**
   * Series，是否为书籍系列的主条目
   */
  series: boolean;
  /**
   * Summary
   */
  summary: string;
  tags: Tag[];
  /**
   * Total Episodes，数据库中的章节数量
   */
  total_episodes: number;
  /**
   * Type
   */
  type: number;
  /**
   * Volumes，书籍条目的册数，由旧服务端从wiki中解析
   */
  volumes: number;
  [property: string]: any;
}

/**
 * Collection
 */
export interface Collection {
  /**
   * Collect
   */
  collect: number;
  /**
   * Doing
   */
  doing: number;
  /**
   * Dropped
   */
  dropped: number;
  /**
   * On Hold
   */
  on_hold: number;
  /**
   * Wish
   */
  wish: number;
  [property: string]: any;
}

/**
 * Images
 */
export interface Images {
  /**
   * Common
   */
  common: string;
  /**
   * Grid
   */
  grid: string;
  /**
   * Large
   */
  large: string;
  /**
   * Medium
   */
  medium: string;
  /**
   * Small
   */
  small: string;
  [property: string]: any;
}

/**
 * Infobox
 *
 * Item
 */
export interface Item {
  /**
   * Key
   */
  key: string;
  /**
   * Value
   */
  value: Kv[] | string;
  [property: string]: any;
}

/**
 * KV
 *
 * V
 */
export interface Kv {
  /**
   * K
   */
  k?: string;
  /**
   * V
   */
  v: string;
  [property: string]: any;
}

/**
 * Rating
 */
export interface Rating {
  /**
   * Count
   */
  count: Count;
  /**
   * Rank
   */
  rank: number;
  /**
   * Score
   */
  score: number;
  /**
   * Total
   */
  total: number;
  [property: string]: any;
}

/**
 * Count
 */
export interface Count {
  "1"?: number;
  "10"?: number;
  "2"?: number;
  "3"?: number;
  "4"?: number;
  "5"?: number;
  "6"?: number;
  "7"?: number;
  "8"?: number;
  "9"?: number;
  [property: string]: any;
}

/**
 * Tags
 *
 * Tag
 */
export interface Tag {
  /**
   * Count
   */
  count: number;
  /**
   * Name
   */
  name: string;
  [property: string]: any;
}
