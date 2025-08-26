/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { EpisodeCollectionStatus } from './EpisodeCollectionStatus';
export type UpdateEpisodeProgress = {
    type?: EpisodeCollectionStatus;
    /**
     * 是否批量更新(看到当前章节), 批量更新时 type 无效
     */
    batch?: boolean;
};

