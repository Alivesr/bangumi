/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SlimSubjectInterest } from './SlimSubjectInterest';
import type { SubjectImages } from './SubjectImages';
import type { SubjectRating } from './SubjectRating';
import type { SubjectType } from './SubjectType';
export type SlimSubject = {
    images?: SubjectImages;
    interest?: SlimSubjectInterest;
    rating: SubjectRating;
    type: SubjectType;
    id: number;
    info: string;
    locked: boolean;
    name: string;
    nameCN: string;
    nsfw: boolean;
};

