/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class DefaultService {
    /**
     * debug
     * debug 路由
     * @returns string Default Response
     * @throws ApiError
     */
    public static debug(): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/p1/debug',
            errors: {
                500: `意料之外的服务器错误`,
            },
        });
    }
}
