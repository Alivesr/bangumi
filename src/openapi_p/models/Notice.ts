/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SlimUser } from './SlimUser';
export type Notice = {
    sender: SlimUser;
    createdAt: number;
    id: number;
    /**
     * 对应的 topicID, episodeID, userID ...
     */
    mainID: number;
    /**
     * 对应的 postID ...
     */
    relatedID: number;
    title: string;
    /**
     * 查看 `./lib/notify.ts` _settings
     */
    type: number;
    unread: boolean;
};

