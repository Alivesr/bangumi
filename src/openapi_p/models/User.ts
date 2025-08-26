/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Avatar } from './Avatar';
import type { UserHomepage } from './UserHomepage';
import type { UserStats } from './UserStats';
export type User = {
    avatar: Avatar;
    homepage: UserHomepage;
    stats: UserStats;
    bio: string;
    group: number;
    id: number;
    joinedAt: number;
    location: string;
    nickname: string;
    sign: string;
    site: string;
    username: string;
    networkServices: Array<{
        account: string;
        color: string;
        name: string;
        title: string;
        url: string;
    }>;
};

