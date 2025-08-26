/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Infobox } from './Infobox';
import type { PersonImages } from './PersonImages';
export type Character = {
    images?: PersonImages;
    infobox: Infobox;
    collectedAt?: number;
    collects: number;
    comment: number;
    id: number;
    info: string;
    lock: boolean;
    name: string;
    nameCN: string;
    nsfw: boolean;
    redirect: number;
    role: number;
    summary: string;
};

