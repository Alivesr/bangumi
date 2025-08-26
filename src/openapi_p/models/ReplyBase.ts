/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Reaction } from './Reaction';
import type { SlimUser } from './SlimUser';
export type ReplyBase = {
    creator?: SlimUser;
    content: string;
    createdAt: number;
    creatorID: number;
    id: number;
    reactions?: Array<Reaction>;
    state: number;
};

