/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Character } from '../models/Character';
import type { CollectionType } from '../models/CollectionType';
import type { CollectSubject } from '../models/CollectSubject';
import type { Index } from '../models/Index';
import type { Person } from '../models/Person';
import type { Subject } from '../models/Subject';
import type { SubjectType } from '../models/SubjectType';
import type { UpdateEpisodeProgress } from '../models/UpdateEpisodeProgress';
import type { UpdateSubjectProgress } from '../models/UpdateSubjectProgress';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class CollectionService {
    /**
     * 删除角色收藏
     * @param characterId
     * @returns any Default Response
     * @throws ApiError
     */
    public static deleteCharacterCollection(
        characterId: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/p1/collections/characters/{characterID}',
            path: {
                'characterID': characterId,
            },
            errors: {
                429: `default error response type`,
                500: `意料之外的服务器错误`,
            },
        });
    }
    /**
     * 新增角色收藏
     * @param characterId
     * @returns any Default Response
     * @throws ApiError
     */
    public static addCharacterCollection(
        characterId: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/p1/collections/characters/{characterID}',
            path: {
                'characterID': characterId,
            },
            errors: {
                429: `default error response type`,
                500: `意料之外的服务器错误`,
            },
        });
    }
    /**
     * 更新章节进度
     * @param episodeId
     * @param requestBody
     * @returns any Default Response
     * @throws ApiError
     */
    public static updateEpisodeProgress(
        episodeId: number,
        requestBody?: UpdateEpisodeProgress,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/p1/collections/episodes/{episodeID}',
            path: {
                'episodeID': episodeId,
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
     * 删除目录收藏
     * @param indexId
     * @returns any Default Response
     * @throws ApiError
     */
    public static deleteIndexCollection(
        indexId: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/p1/collections/indexes/{indexID}',
            path: {
                'indexID': indexId,
            },
            errors: {
                429: `default error response type`,
                500: `意料之外的服务器错误`,
            },
        });
    }
    /**
     * 新增目录收藏
     * @param indexId
     * @returns any Default Response
     * @throws ApiError
     */
    public static addIndexCollection(
        indexId: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/p1/collections/indexes/{indexID}',
            path: {
                'indexID': indexId,
            },
            errors: {
                429: `default error response type`,
                500: `意料之外的服务器错误`,
            },
        });
    }
    /**
     * 删除人物收藏
     * @param personId
     * @returns any Default Response
     * @throws ApiError
     */
    public static deletePersonCollection(
        personId: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/p1/collections/persons/{personID}',
            path: {
                'personID': personId,
            },
            errors: {
                429: `default error response type`,
                500: `意料之外的服务器错误`,
            },
        });
    }
    /**
     * 新增人物收藏
     * @param personId
     * @returns any Default Response
     * @throws ApiError
     */
    public static addPersonCollection(
        personId: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/p1/collections/persons/{personID}',
            path: {
                'personID': personId,
            },
            errors: {
                429: `default error response type`,
                500: `意料之外的服务器错误`,
            },
        });
    }
    /**
     * 更新条目进度
     * @param subjectId
     * @param requestBody
     * @returns any Default Response
     * @throws ApiError
     */
    public static updateSubjectProgress(
        subjectId: number,
        requestBody?: UpdateSubjectProgress,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/p1/collections/subjects/{subjectID}',
            path: {
                'subjectID': subjectId,
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
     * 新增或修改条目收藏
     * @param subjectId
     * @param requestBody
     * @returns any Default Response
     * @throws ApiError
     */
    public static updateSubjectCollection(
        subjectId: number,
        requestBody?: CollectSubject,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/p1/collections/subjects/{subjectID}',
            path: {
                'subjectID': subjectId,
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
     * 获取当前用户的角色收藏
     * @param limit max 100
     * @param offset min 0
     * @returns any Default Response
     * @throws ApiError
     */
    public static getMyCharacterCollections(
        limit: number = 20,
        offset?: number,
    ): CancelablePromise<{
        data: Array<Character>;
        /**
         * limit+offset 为参数的请求表示总条数，page 为参数的请求表示总页数
         */
        total: number;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/p1/collections/characters',
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
     * 获取当前用户的目录收藏
     * @param limit max 100
     * @param offset min 0
     * @returns any Default Response
     * @throws ApiError
     */
    public static getMyIndexCollections(
        limit: number = 20,
        offset?: number,
    ): CancelablePromise<{
        data: Array<Index>;
        /**
         * limit+offset 为参数的请求表示总条数，page 为参数的请求表示总页数
         */
        total: number;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/p1/collections/indexes',
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
     * 获取当前用户的人物收藏
     * @param limit max 100
     * @param offset min 0
     * @returns any Default Response
     * @throws ApiError
     */
    public static getMyPersonCollections(
        limit: number = 20,
        offset?: number,
    ): CancelablePromise<{
        data: Array<Person>;
        /**
         * limit+offset 为参数的请求表示总条数，page 为参数的请求表示总页数
         */
        total: number;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/p1/collections/persons',
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
     * 获取当前用户的条目收藏
     * @param subjectType
     * @param type
     * @param since 起始时间戳
     * @param limit max 100
     * @param offset min 0
     * @returns any Default Response
     * @throws ApiError
     */
    public static getMySubjectCollections(
        subjectType?: SubjectType,
        type?: CollectionType,
        since?: number,
        limit: number = 20,
        offset?: number,
    ): CancelablePromise<{
        data: Array<Subject>;
        /**
         * limit+offset 为参数的请求表示总条数，page 为参数的请求表示总页数
         */
        total: number;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/p1/collections/subjects',
            query: {
                'subjectType': subjectType,
                'type': type,
                'since': since,
                'limit': limit,
                'offset': offset,
            },
            errors: {
                500: `意料之外的服务器错误`,
            },
        });
    }
}
