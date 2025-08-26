/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CollectionType } from './CollectionType';
import type { Reaction } from './Reaction';
import type { SlimUser } from './SlimUser';
export type SubjectInterestComment = {
    type: CollectionType;
    user: SlimUser;
    comment: string;
    id: number;
    rate: number;
    reactions?: Array<Reaction>;
    updatedAt: number;
};

