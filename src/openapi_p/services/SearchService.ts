/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SearchCharacter } from '../models/SearchCharacter';
import type { SearchPerson } from '../models/SearchPerson';
import type { SearchSubject } from '../models/SearchSubject';
import type { SlimCharacter } from '../models/SlimCharacter';
import type { SlimPerson } from '../models/SlimPerson';
import type { SlimSubject } from '../models/SlimSubject';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class SearchService {
    /**
     * 搜索角色
     * @param limit max 100
     * @param offset min 0
     * @param requestBody
     * @returns any Default Response
     * @throws ApiError
     */
    public static searchCharacters(
        limit: number = 20,
        offset?: number,
        requestBody?: SearchCharacter,
    ): CancelablePromise<{
        data: Array<SlimCharacter>;
        /**
         * limit+offset 为参数的请求表示总条数，page 为参数的请求表示总页数
         */
        total: number;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/p1/search/characters',
            query: {
                'limit': limit,
                'offset': offset,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                500: `意料之外的服务器错误`,
            },
        });
    }
    /**
     * 搜索人物
     * @param limit max 100
     * @param offset min 0
     * @param requestBody
     * @returns any Default Response
     * @throws ApiError
     */
    public static searchPersons(
        limit: number = 20,
        offset?: number,
        requestBody?: SearchPerson,
    ): CancelablePromise<{
        data: Array<SlimPerson>;
        /**
         * limit+offset 为参数的请求表示总条数，page 为参数的请求表示总页数
         */
        total: number;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/p1/search/persons',
            query: {
                'limit': limit,
                'offset': offset,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                500: `意料之外的服务器错误`,
            },
        });
    }
    /**
     * 搜索条目
     * @param limit max 100
     * @param offset min 0
     * @param requestBody
     * @returns any Default Response
     * @throws ApiError
     */
    public static searchSubjects(
        limit: number = 20,
        offset?: number,
        requestBody?: SearchSubject,
    ): CancelablePromise<{
        data: Array<SlimSubject>;
        /**
         * limit+offset 为参数的请求表示总条数，page 为参数的请求表示总页数
         */
        total: number;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/p1/search/subjects',
            query: {
                'limit': limit,
                'offset': offset,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                500: `意料之外的服务器错误`,
            },
        });
    }
}
