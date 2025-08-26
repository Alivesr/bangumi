/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SlimUser } from './SlimUser';
export type BlogEntry = {
    user: SlimUser;
    content: string;
    createdAt: number;
    icon: string;
    id: number;
    noreply: number;
    public: boolean;
    related: number;
    replies: number;
    title: string;
    type: number;
    updatedAt: number;
    views: number;
    tags: Array<string>;
};

