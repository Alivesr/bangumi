/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SubjectTopic } from '../models/SubjectTopic';
import type { SubjectType } from '../models/SubjectType';
import type { TrendingSubject } from '../models/TrendingSubject';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class TrendingService {
    /**
     * 获取热门条目
     * @param type
     * @param limit max 100
     * @param offset min 0
     * @returns any Default Response
     * @throws ApiError
     */
    public static getTrendingSubjects(
        type: SubjectType,
        limit: number = 20,
        offset?: number,
    ): CancelablePromise<{
        data: Array<TrendingSubject>;
        /**
         * limit+offset 为参数的请求表示总条数，page 为参数的请求表示总页数
         */
        total: number;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/p1/trending/subjects',
            query: {
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
     * 获取热门条目讨论
     * @param limit max 100
     * @param offset min 0
     * @returns any Default Response
     * @throws ApiError
     */
    public static getTrendingSubjectTopics(
        limit: number = 20,
        offset?: number,
    ): CancelablePromise<{
        data: Array<SubjectTopic>;
        /**
         * limit+offset 为参数的请求表示总条数，page 为参数的请求表示总页数
         */
        total: number;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/p1/trending/subjects/topics',
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
