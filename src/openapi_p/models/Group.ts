/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Avatar } from './Avatar';
import type { GroupMember } from './GroupMember';
import type { SlimUser } from './SlimUser';
export type Group = {
    creator?: SlimUser;
    icon: Avatar;
    membership?: GroupMember;
    accessible: boolean;
    cat: number;
    createdAt: number;
    creatorID: number;
    description: string;
    id: number;
    members: number;
    name: string;
    nsfw: boolean;
    posts: number;
    title: string;
    topics: number;
};

