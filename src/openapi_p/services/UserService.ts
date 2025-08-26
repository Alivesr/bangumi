/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CollectionType } from '../models/CollectionType';
import type { SlimBlogEntry } from '../models/SlimBlogEntry';
import type { SlimCharacter } from '../models/SlimCharacter';
import type { SlimGroup } from '../models/SlimGroup';
import type { SlimIndex } from '../models/SlimIndex';
import type { SlimPerson } from '../models/SlimPerson';
import type { SlimSubject } from '../models/SlimSubject';
import type { SlimUser } from '../models/SlimUser';
import type { SubjectType } from '../models/SubjectType';
import type { Timeline } from '../models/Timeline';
import type { User } from '../models/User';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class UserService {
    /**
     * 获取用户信息
     * @param username
     * @returns User Default Response
     * @throws ApiError
     */
    public static getUser(
        username: string,
    ): CancelablePromise<User> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/p1/users/{username}',
            path: {
                'username': username,
            },
            errors: {
                500: `意料之外的服务器错误`,
            },
        });
    }
    /**
     * 获取用户时间胶囊
     * @param username
     * @param limit min 1, max 20
     * @param until max timeline id to fetch from
     * @returns Timeline Default Response
     * @throws ApiError
     */
    public static getUserTimeline(
        username: string,
        limit: number = 20,
        until?: number,
    ): CancelablePromise<Array<Timeline>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/p1/users/{username}/timeline',
            path: {
                'username': username,
            },
            query: {
                'limit': limit,
                'until': until,
            },
            errors: {
                500: `意料之外的服务器错误`,
            },
        });
    }
    /**
     * 获取用户创建的日志
     * @param username
     * @param limit max 100
     * @param offset min 0
     * @returns any Default Response
     * @throws ApiError
     */
    public static getUserBlogs(
        username: string,
        limit: number = 20,
        offset?: number,
    ): CancelablePromise<{
        data: Array<SlimBlogEntry>;
        /**
         * limit+offset 为参数的请求表示总条数，page 为参数的请求表示总页数
         */
        total: number;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/p1/users/{username}/blogs',
            path: {
                'username': username,
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
     * 获取用户角色收藏
     * @param username
     * @param limit max 100
     * @param offset min 0
     * @returns any Default Response
     * @throws ApiError
     */
    public static getUserCharacterCollections(
        username: string,
        limit: number = 20,
        offset?: number,
    ): CancelablePromise<{
        data: Array<SlimCharacter>;
        /**
         * limit+offset 为参数的请求表示总条数，page 为参数的请求表示总页数
         */
        total: number;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/p1/users/{username}/collections/characters',
            path: {
                'username': username,
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
     * 获取用户目录收藏
     * @param username
     * @param limit max 100
     * @param offset min 0
     * @returns any Default Response
     * @throws ApiError
     */
    public static getUserIndexCollections(
        username: string,
        limit: number = 20,
        offset?: number,
    ): CancelablePromise<{
        data: Array<SlimIndex>;
        /**
         * limit+offset 为参数的请求表示总条数，page 为参数的请求表示总页数
         */
        total: number;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/p1/users/{username}/collections/indexes',
            path: {
                'username': username,
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
     * 获取用户人物收藏
     * @param username
     * @param limit max 100
     * @param offset min 0
     * @returns any Default Response
     * @throws ApiError
     */
    public static getUserPersonCollections(
        username: string,
        limit: number = 20,
        offset?: number,
    ): CancelablePromise<{
        data: Array<SlimPerson>;
        /**
         * limit+offset 为参数的请求表示总条数，page 为参数的请求表示总页数
         */
        total: number;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/p1/users/{username}/collections/persons',
            path: {
                'username': username,
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
     * 获取用户条目收藏
     * @param username
     * @param subjectType
     * @param type
     * @param limit max 100
     * @param offset min 0
     * @returns any Default Response
     * @throws ApiError
     */
    public static getUserSubjectCollections(
        username: string,
        subjectType?: SubjectType,
        type?: CollectionType,
        limit: number = 20,
        offset?: number,
    ): CancelablePromise<{
        data: Array<SlimSubject>;
        /**
         * limit+offset 为参数的请求表示总条数，page 为参数的请求表示总页数
         */
        total: number;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/p1/users/{username}/collections/subjects',
            path: {
                'username': username,
            },
            query: {
                'subjectType': subjectType,
                'type': type,
                'limit': limit,
                'offset': offset,
            },
            errors: {
                500: `意料之外的服务器错误`,
            },
        });
    }
    /**
     * 获取用户的关注者列表
     * @param username
     * @param limit max 100
     * @param offset min 0
     * @returns any Default Response
     * @throws ApiError
     */
    public static getUserFollowers(
        username: string,
        limit: number = 20,
        offset?: number,
    ): CancelablePromise<{
        data: Array<SlimUser>;
        /**
         * limit+offset 为参数的请求表示总条数，page 为参数的请求表示总页数
         */
        total: number;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/p1/users/{username}/followers',
            path: {
                'username': username,
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
     * 获取用户的好友列表
     * @param username
     * @param limit max 100
     * @param offset min 0
     * @returns any Default Response
     * @throws ApiError
     */
    public static getUserFriends(
        username: string,
        limit: number = 20,
        offset?: number,
    ): CancelablePromise<{
        data: Array<SlimUser>;
        /**
         * limit+offset 为参数的请求表示总条数，page 为参数的请求表示总页数
         */
        total: number;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/p1/users/{username}/friends',
            path: {
                'username': username,
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
     * 获取用户加入的小组
     * @param username
     * @param limit max 100
     * @param offset min 0
     * @returns any Default Response
     * @throws ApiError
     */
    public static getUserGroups(
        username: string,
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
            url: '/p1/users/{username}/groups',
            path: {
                'username': username,
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
     * 获取用户创建的目录
     * @param username
     * @param limit max 100
     * @param offset min 0
     * @returns any Default Response
     * @throws ApiError
     */
    public static getUserIndexes(
        username: string,
        limit: number = 20,
        offset?: number,
    ): CancelablePromise<{
        data: Array<SlimIndex>;
        /**
         * limit+offset 为参数的请求表示总条数，page 为参数的请求表示总页数
         */
        total: number;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/p1/users/{username}/indexes',
            path: {
                'username': username,
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
}
