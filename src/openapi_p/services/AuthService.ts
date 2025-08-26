/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { LoginRequestBody } from '../models/LoginRequestBody';
import type { SlimUser } from '../models/SlimUser';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AuthService {
    /**
     * 获取 Turnstile 令牌
     * 为防止滥用，Redirect URI 为白名单机制，如需添加请提交 PR。
     * @param redirectUri
     * @param theme
     * @returns void
     * @throws ApiError
     */
    public static getTurnstileToken(
        redirectUri: string,
        theme?: ('dark' | 'light' | 'auto'),
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/p1/turnstile',
            query: {
                'theme': theme,
                'redirect_uri': redirectUri,
            },
            errors: {
                500: `意料之外的服务器错误`,
            },
        });
    }
    /**
     * login
     * 需要 [turnstile](https://developers.cloudflare.com/turnstile/get-started/client-side-rendering/)
     *
     * next.bgm.tv 域名对应的 site-key 为 `0x4AAAAAAABkMYinukE8nzYS`
     *
     * dev.bgm38.tv 域名使用测试用的 site-key `1x00000000000000000000AA`
     * @param requestBody
     * @returns SlimUser Default Response
     * @throws ApiError
     */
    public static login(
        requestBody?: LoginRequestBody,
    ): CancelablePromise<SlimUser> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/p1/login',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `request validation error`,
                401: `验证码错误/账号密码不匹配`,
                429: `失败次数太多，需要过一段时间再重试`,
                500: `意料之外的服务器错误`,
            },
        });
    }
    /**
     * logout
     * 登出
     * @param requestBody
     * @returns string Default Response
     * @throws ApiError
     */
    public static logout(
        requestBody?: any,
    ): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/p1/logout',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `未登录`,
                500: `意料之外的服务器错误`,
            },
        });
    }
}
