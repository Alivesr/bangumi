/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { EpisodeCollectionStatus } from './EpisodeCollectionStatus';
import type { EpisodeType } from './EpisodeType';
import type { SlimSubject } from './SlimSubject';
export type Episode = {
    subject?: SlimSubject;
    type: EpisodeType;
    airdate: string;
    comment: number;
    desc: string;
    disc: number;
    duration: string;
    id: number;
    name: string;
    nameCN: string;
    sort: number;
    subjectID: number;
    collection?: {
        status: EpisodeCollectionStatus;
        updatedAt?: number;
    };
};

