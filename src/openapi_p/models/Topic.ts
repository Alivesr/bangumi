/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SlimUser } from './SlimUser';
export type Topic = {
    creator?: SlimUser;
    /**
     * 发帖时间，unix time stamp in seconds
     */
    createdAt: number;
    creatorID: number;
    display: number;
    id: number;
    /**
     * 小组/条目ID
     */
    parentID: number;
    replyCount: number;
    state: number;
    title: string;
    /**
     * 最后回复时间，unix time stamp in seconds
     */
    updatedAt: number;
};

