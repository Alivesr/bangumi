/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { IndexStats } from './IndexStats';
import type { IndexType } from './IndexType';
import type { SlimUser } from './SlimUser';
export type Index = {
    stats: IndexStats;
    type: IndexType;
    user?: SlimUser;
    award: number;
    collectedAt?: number;
    collects: number;
    createdAt: number;
    desc: string;
    id: number;
    replies: number;
    title: string;
    total: number;
    uid: number;
    updatedAt: number;
};

