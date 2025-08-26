/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CommentBase } from '../models/CommentBase';
import type { CreateContent } from '../models/CreateContent';
import type { CreateReply } from '../models/CreateReply';
import type { FilterMode } from '../models/FilterMode';
import type { Reaction } from '../models/Reaction';
import type { SlimUser } from '../models/SlimUser';
import type { Timeline } from '../models/Timeline';
import type { TurnstileToken } from '../models/TurnstileToken';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class TimelineService {
    /**
     * 删除时间线
     * @param timelineId
     * @returns any Default Response
     * @throws ApiError
     */
    public static deleteTimeline(
        timelineId: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/p1/timeline/{timelineID}',
            path: {
                'timelineID': timelineId,
            },
            errors: {
                500: `意料之外的服务器错误`,
            },
        });
    }
    /**
     * 获取时间线
     * @param mode 登录时默认为 friends, 未登录或没有好友时始终为 all
     * @param limit min 1, max 20
     * @param until max timeline id to fetch from
     * @returns Timeline Default Response
     * @throws ApiError
     */
    public static getTimeline(
        mode?: FilterMode,
        limit: number = 20,
        until?: number,
    ): CancelablePromise<Array<Timeline>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/p1/timeline',
            query: {
                'mode': mode,
                'limit': limit,
                'until': until,
            },
            errors: {
                500: `意料之外的服务器错误`,
            },
        });
    }
    /**
     * 发送时间线吐槽
     * @param requestBody
     * @returns any Default Response
     * @throws ApiError
     */
    public static createTimelineSay(
        requestBody?: (CreateContent & TurnstileToken),
    ): CancelablePromise<{
        id: number;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/p1/timeline',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                429: `default error response type`,
                500: `意料之外的服务器错误`,
            },
        });
    }
    /**
     * 创建时间线回复
     * @param timelineId
     * @param requestBody
     * @returns any Default Response
     * @throws ApiError
     */
    public static createTimelineReply(
        timelineId: number,
        requestBody?: (CreateReply & TurnstileToken),
    ): CancelablePromise<{
        id: number;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/p1/timeline/{timelineID}/replies',
            path: {
                'timelineID': timelineId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                429: `default error response type`,
                500: `意料之外的服务器错误`,
            },
        });
    }
    /**
     * 获取时间线回复
     * @param timelineId
     * @returns any Default Response
     * @throws ApiError
     */
    public static getTimelineReplies(
        timelineId: number,
    ): CancelablePromise<Array<({
        user?: SlimUser;
        content: string;
        createdAt: number;
        creatorID: number;
        id: number;
        mainID: number;
        reactions?: Array<Reaction>;
        relatedID: number;
        state: number;
    } & {
        replies: Array<CommentBase>;
    })>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/p1/timeline/{timelineID}/replies',
            path: {
                'timelineID': timelineId,
            },
            errors: {
                404: `default error response type`,
                500: `意料之外的服务器错误`,
            },
        });
    }
}
