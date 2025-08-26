/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Calendar } from '../models/Calendar';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class CalendarService {
    /**
     * 获取每日放送
     * @returns Calendar Default Response
     * @throws ApiError
     */
    public static getCalendar(): CancelablePromise<Calendar> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/p1/calendar',
            errors: {
                500: `意料之外的服务器错误`,
            },
        });
    }
}
