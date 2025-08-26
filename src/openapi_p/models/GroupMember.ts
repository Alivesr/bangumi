/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GroupMemberRole } from './GroupMemberRole';
import type { SlimUser } from './SlimUser';
export type GroupMember = {
    role: GroupMemberRole;
    user?: SlimUser;
    joinedAt: number;
    uid: number;
};

