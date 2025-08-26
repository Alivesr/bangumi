/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SlimUser } from './SlimUser';
import type { Topic } from './Topic';
export type Post = {
    creator: SlimUser;
    topic: Topic;
    content: string;
    createdAt: number;
    creatorID: number;
    id: number;
    state: number;
};

