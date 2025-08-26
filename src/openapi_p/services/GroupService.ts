/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateTopic } from '../models/CreateTopic';
import type { Group } from '../models/Group';
import type { GroupFilterMode } from '../models/GroupFilterMode';
import type { GroupMember } from '../models/GroupMember';
import type { GroupMemberRole } from '../models/GroupMemberRole';
import type { GroupSort } from '../models/GroupSort';
import type { GroupTopic } from '../models/GroupTopic';
import type { GroupTopicFilterMode } from '../models/GroupTopicFilterMode';
import type { SlimGroup } from '../models/SlimGroup';
import type { Topic } from '../models/Topic';
import type { TurnstileToken } from '../models/TurnstileToken';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class GroupService {
    /**
     * 获取小组详情
     * @param groupName
     * @returns Group Default Response
     * @throws ApiError
     */
    public static getGroup(
        groupName: string,
    ): CancelablePromise<Group> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/p1/groups/{groupName}',
            path: {
                'groupName': groupName,
            },
            errors: {
                500: `意料之外的服务器错误`,
            },
        });
    }
    /**
     * 获取小组列表
     * @param sort
     * @param mode
     * @param limit
     * @param offset
     * @returns any Default Response
     * @throws ApiError
     */
    public static getGroups(
        sort: GroupSort,
        mode?: GroupFilterMode,
        limit: number = 20,
        offset?: number,
    ): CancelablePromise<{
        data: Array<SlimGroup>;
        /**
         * limit+offset 为参数的请求表示总条数，page 为参数的请求表示总页数
         */
        total: number;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/p1/groups',
            query: {
                'mode': mode,
                'sort': sort,
                'limit': limit,
                'offset': offset,
            },
            errors: {
                500: `意料之外的服务器错误`,
            },
        });
    }
    /**
     * 获取最新的小组话题
     * @param mode 登录时默认为 joined, 未登录或没有加入小组时始终为 all
     * @param limit
     * @param offset
     * @returns any Default Response
     * @throws ApiError
     */
    public static getRecentGroupTopics(
        mode: GroupTopicFilterMode,
        limit: number = 20,
        offset?: number,
    ): CancelablePromise<{
        data: Array<GroupTopic>;
        /**
         * limit+offset 为参数的请求表示总条数，page 为参数的请求表示总页数
         */
        total: number;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/p1/groups/-/topics',
            query: {
                'mode': mode,
                'limit': limit,
                'offset': offset,
            },
            errors: {
                500: `意料之外的服务器错误`,
            },
        });
    }
    /**
     * 获取小组成员列表
     * @param groupName
     * @param role
     * @param limit
     * @param offset
     * @returns any Default Response
     * @throws ApiError
     */
    public static getGroupMembers(
        groupName: string,
        role?: GroupMemberRole,
        limit: number = 20,
        offset?: number,
    ): CancelablePromise<{
        data: Array<GroupMember>;
        /**
         * limit+offset 为参数的请求表示总条数，page 为参数的请求表示总页数
         */
        total: number;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/p1/groups/{groupName}/members',
            path: {
                'groupName': groupName,
            },
            query: {
                'role': role,
                'limit': limit,
                'offset': offset,
            },
            errors: {
                500: `意料之外的服务器错误`,
            },
        });
    }
    /**
     * 获取小组话题列表
     * @param groupName
     * @param limit
     * @param offset
     * @returns any Default Response
     * @throws ApiError
     */
    public static getGroupTopics(
        groupName: string,
        limit: number = 20,
        offset?: number,
    ): CancelablePromise<{
        data: Array<Topic>;
        /**
         * limit+offset 为参数的请求表示总条数，page 为参数的请求表示总页数
         */
        total: number;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/p1/groups/{groupName}/topics',
            path: {
                'groupName': groupName,
            },
            query: {
                'limit': limit,
                'offset': offset,
            },
            errors: {
                500: `意料之外的服务器错误`,
            },
        });
    }
    /**
     * 创建小组话题
     * @param groupName
     * @param requestBody
     * @returns any Default Response
     * @throws ApiError
     */
    public static createGroupTopic(
        groupName: string,
        requestBody?: (CreateTopic & TurnstileToken),
    ): CancelablePromise<{
        /**
         * new topic id
         */
        id: number;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/p1/groups/{groupName}/topics',
            path: {
                'groupName': groupName,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                429: `default error response type`,
                500: `意料之外的服务器错误`,
            },
        });
    }
}
