/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type HistorySummary = {
    commitMessage: string;
    /**
     * unix timestamp seconds
     */
    createdAt: number;
    /**
     * 修改类型。`1` 正常修改， `11` 合并，`103` 锁定/解锁 `104` 未知
     */
    type: number;
    creator: {
        username: string;
    };
};

