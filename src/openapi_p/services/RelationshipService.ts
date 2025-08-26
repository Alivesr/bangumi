/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Friend } from '../models/Friend';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class RelationshipService {
    /**
     * 取消好友
     * @param username
     * @returns any Default Response
     * @throws ApiError
     */
    public static removeFriend(
        username: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/p1/friends/{username}',
            path: {
                'username': username,
            },
            errors: {
                429: `default error response type`,
                500: `意料之外的服务器错误`,
            },
        });
    }
    /**
     * 添加好友
     * @param username
     * @returns any Default Response
     * @throws ApiError
     */
    public static addFriend(
        username: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/p1/friends/{username}',
            path: {
                'username': username,
            },
            errors: {
                429: `default error response type`,
                500: `意料之外的服务器错误`,
            },
        });
    }
    /**
     * 获取当前用户的关注者列表
     * @param limit max 100
     * @param offset min 0
     * @returns any Default Response
     * @throws ApiError
     */
    public static getMyFollowers(
        limit: number = 20,
        offset?: number,
    ): CancelablePromise<{
        data: Array<Friend>;
        /**
         * limit+offset 为参数的请求表示总条数，page 为参数的请求表示总页数
         */
        total: number;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/p1/followers',
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
     * 获取当前用户的好友列表
     * @param limit max 100
     * @param offset min 0
     * @returns any Default Response
     * @throws ApiError
     */
    public static getMyFriends(
        limit: number = 20,
        offset?: number,
    ): CancelablePromise<{
        data: Array<Friend>;
        /**
         * limit+offset 为参数的请求表示总条数，page 为参数的请求表示总页数
         */
        total: number;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/p1/friends',
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
     * 获取当前用户的绝交用户列表
     * @returns any Default Response
     * @throws ApiError
     */
    public static getBlocklist(): CancelablePromise<{
        blocklist: Array<number>;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/p1/blocklist',
            errors: {
                500: `意料之外的服务器错误`,
            },
        });
    }
    /**
     * 获取当前用户的好友 ID 列表
     * @returns any Default Response
     * @throws ApiError
     */
    public static getFriendlist(): CancelablePromise<{
        friendlist: Array<number>;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/p1/friendlist',
            errors: {
                500: `意料之外的服务器错误`,
            },
        });
    }
    /**
     * 取消与用户绝交
     * @param username
     * @returns any Default Response
     * @throws ApiError
     */
    public static removeUserFromBlocklist(
        username: string,
    ): CancelablePromise<{
        blocklist: Array<number>;
    }> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/p1/blocklist/{username}',
            path: {
                'username': username,
            },
            errors: {
                429: `default error response type`,
                500: `意料之外的服务器错误`,
            },
        });
    }
    /**
     * 与用户绝交
     * @param username
     * @returns any Default Response
     * @throws ApiError
     */
    public static addUserToBlocklist(
        username: string,
    ): CancelablePromise<{
        blocklist: Array<number>;
    }> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/p1/blocklist/{username}',
            path: {
                'username': username,
            },
            errors: {
                429: `default error response type`,
                500: `意料之外的服务器错误`,
            },
        });
    }
}
