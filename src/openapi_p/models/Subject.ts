/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Infobox } from './Infobox';
import type { SubjectAirtime } from './SubjectAirtime';
import type { SubjectCollection } from './SubjectCollection';
import type { SubjectImages } from './SubjectImages';
import type { SubjectInterest } from './SubjectInterest';
import type { SubjectPlatform } from './SubjectPlatform';
import type { SubjectRating } from './SubjectRating';
import type { SubjectTag } from './SubjectTag';
import type { SubjectType } from './SubjectType';
export type Subject = {
    airtime: SubjectAirtime;
    collection: SubjectCollection;
    images?: SubjectImages;
    infobox: Infobox;
    interest?: SubjectInterest;
    platform: SubjectPlatform;
    rating: SubjectRating;
    type: SubjectType;
    eps: number;
    id: number;
    info: string;
    locked: boolean;
    name: string;
    nameCN: string;
    nsfw: boolean;
    redirect: number;
    series: boolean;
    seriesEntry: number;
    summary: string;
    tags: Array<SubjectTag>;
    volumes: number;
    metaTags: Array<string>;
};

