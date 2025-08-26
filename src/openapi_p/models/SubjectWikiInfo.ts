/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SubjectType } from './SubjectType';
import type { WikiPlatform } from './WikiPlatform';
export type SubjectWikiInfo = {
    typeID: SubjectType;
    availablePlatform: Array<WikiPlatform>;
    id: number;
    infobox: string;
    name: string;
    nsfw: boolean;
    platform: number;
    summary: string;
    metaTags: Array<string>;
};

