/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Notice } from '../models/Notice';
import type { Profile } from '../models/Profile';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class MiscService {
    /**
     * 获取当前用户信息
     * @returns Profile Default Response
     * @throws ApiError
     */
    public static getCurrentUser(): CancelablePromise<Profile> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/p1/me',
            errors: {
                401: `default error response type`,
                500: `意料之外的服务器错误`,
            },
        });
    }
    /**
     * 标记通知为已读
     * 标记通知为已读
     *
     * 不传id时会清空所有未读通知
     * @param requestBody
     * @returns any Default Response
     * @throws ApiError
     */
    public static clearNotice(
        requestBody?: {
            id?: Array<number>;
        },
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/p1/clear-notify',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                500: `意料之外的服务器错误`,
            },
        });
    }
    /**
     * 获取未读通知
     * @param limit max 40
     * @param unread
     * @returns any Default Response
     * @throws ApiError
     */
    public static listNotice(
        limit: number = 20,
        unread?: boolean,
    ): CancelablePromise<{
        data: Array<Notice>;
        /**
         * limit+offset 为参数的请求表示总条数，page 为参数的请求表示总页数
         */
        total: number;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/p1/notify',
            query: {
                'limit': limit,
                'unread': unread,
            },
            errors: {
                500: `意料之外的服务器错误`,
            },
        });
    }
}
