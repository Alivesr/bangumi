/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CollectionType } from './CollectionType';
export type CollectSubject = {
    type?: CollectionType;
    /**
     * 评价
     */
    comment?: string;
    /**
     * 仅自己可见
     */
    private?: boolean;
    /**
     * 是否自动完成条目进度，仅在 `type` 为 `看过` 时有效，并且不会产生对应的时间线记录：
     * - 书籍条目会检查总的话数和卷数，并更新收藏进度到最新;
     * - 动画和三次元会标记所有正片章节为已完成，并同时更新收藏进度
     */
    progress?: boolean;
    /**
     * 评分，0 表示删除评分
     */
    rate?: number;
    tags?: Array<string>;
};

