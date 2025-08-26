/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Index } from '../models/Index';
import type { IndexRelated } from '../models/IndexRelated';
import type { IndexRelatedCategory } from '../models/IndexRelatedCategory';
import type { SubjectType } from '../models/SubjectType';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class IndexService {
    /**
     * 获取目录详情
     * @param indexId
     * @returns Index Default Response
     * @throws ApiError
     */
    public static getIndex(
        indexId: number,
    ): CancelablePromise<Index> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/p1/indexes/{indexID}',
            path: {
                'indexID': indexId,
            },
            errors: {
                500: `意料之外的服务器错误`,
            },
        });
    }
    /**
     * 获取目录的关联内容
     * @param indexId
     * @param cat
     * @param type
     * @param limit max 100
     * @param offset min 0
     * @returns any Default Response
     * @throws ApiError
     */
    public static getIndexRelated(
        indexId: number,
        cat?: IndexRelatedCategory,
        type?: SubjectType,
        limit: number = 20,
        offset?: number,
    ): CancelablePromise<{
        data: Array<IndexRelated>;
        /**
         * limit+offset 为参数的请求表示总条数，page 为参数的请求表示总页数
         */
        total: number;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/p1/indexes/{indexID}/related',
            path: {
                'indexID': indexId,
            },
            query: {
                'cat': cat,
                'type': type,
                'limit': limit,
                'offset': offset,
            },
            errors: {
                500: `意料之外的服务器错误`,
            },
        });
    }
}
