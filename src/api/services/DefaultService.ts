/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class DefaultService {
    /**
     * 每日推送
     * @returns any
     * @throws ApiError
     */
    public static getCalendar(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/calendar',
        });
    }
}
