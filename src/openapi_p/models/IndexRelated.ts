/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Episode } from './Episode';
import type { IndexRelatedCategory } from './IndexRelatedCategory';
import type { SlimCharacter } from './SlimCharacter';
import type { SlimPerson } from './SlimPerson';
import type { SlimSubject } from './SlimSubject';
export type IndexRelated = {
    cat: IndexRelatedCategory;
    character?: SlimCharacter;
    episode?: Episode;
    person?: SlimPerson;
    subject?: SlimSubject;
    award: string;
    comment: string;
    createdAt: number;
    id: number;
    order: number;
    rid: number;
    sid: number;
    type: number;
};

