/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { EpisodeType } from './EpisodeType';
export type EpsisodesEdit = {
    commitMessage: string;
    expectedRevision?: Array<{
        date?: string;
        duration?: string;
        name?: string;
        nameCN?: string;
        summary?: string;
    }>;
    episodes: Array<{
        type?: EpisodeType;
        /**
         * YYYY-MM-DD
         */
        date?: string;
        disc?: number;
        duration?: string;
        ep?: number;
        id: number;
        name?: string;
        nameCN?: string;
        summary?: string;
    }>;
};

