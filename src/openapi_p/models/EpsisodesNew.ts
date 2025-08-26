/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { EpisodeType } from './EpisodeType';
export type EpsisodesNew = {
    episodes: Array<{
        type?: EpisodeType;
        /**
         * YYYY-MM-DD
         */
        date?: string;
        disc?: number;
        duration?: string;
        ep: number;
        name?: string;
        nameCN?: string;
        summary?: string;
    }>;
};

