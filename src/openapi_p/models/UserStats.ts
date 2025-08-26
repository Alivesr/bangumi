/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { UserIndexStats } from './UserIndexStats';
import type { UserMonoCollectionStats } from './UserMonoCollectionStats';
import type { UserSubjectCollectionStats } from './UserSubjectCollectionStats';
export type UserStats = {
    index: UserIndexStats;
    mono: UserMonoCollectionStats;
    subject: UserSubjectCollectionStats;
    blog: number;
    friend: number;
    group: number;
};

