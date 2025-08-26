/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BlogEntry } from '../models/BlogEntry';
import type { BlogPhoto } from '../models/BlogPhoto';
import type { CommentBase } from '../models/CommentBase';
import type { CreateReply } from '../models/CreateReply';
import type { Reaction } from '../models/Reaction';
import type { SlimSubject } from '../models/SlimSubject';
import type { SlimUser } from '../models/SlimUser';
import type { TurnstileToken } from '../models/TurnstileToken';
import type { UpdateContent } from '../models/UpdateContent';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class BlogService {
    /**
     * 获取日志详情
     * @param entryId
     * @returns BlogEntry Default Response
     * @throws ApiError
     */
    public static getBlogEntry(
        entryId: number,
    ): CancelablePromise<BlogEntry> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/p1/blogs/{entryID}',
            path: {
                'entryID': entryId,
            },
            errors: {
                500: `意料之外的服务器错误`,
            },
        });
    }
    /**
     * 获取日志的关联条目
     * @param entryId
     * @returns SlimSubject Default Response
     * @throws ApiError
     */
    public static getBlogRelatedSubjects(
        entryId: number,
    ): CancelablePromise<Array<SlimSubject>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/p1/blogs/{entryID}/subjects',
            path: {
                'entryID': entryId,
            },
            errors: {
                500: `意料之外的服务器错误`,
            },
        });
    }
    /**
     * 删除日志的吐槽
     * @param commentId
     * @returns any Default Response
     * @throws ApiError
     */
    public static deleteBlogComment(
        commentId: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/p1/blogs/-/comments/{commentID}',
            path: {
                'commentID': commentId,
            },
            errors: {
                500: `意料之外的服务器错误`,
            },
        });
    }
    /**
     * 编辑日志的吐槽
     * @param commentId
     * @param requestBody
     * @returns any Default Response
     * @throws ApiError
     */
    public static updateBlogComment(
        commentId: number,
        requestBody?: UpdateContent,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/p1/blogs/-/comments/{commentID}',
            path: {
                'commentID': commentId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                500: `意料之外的服务器错误`,
            },
        });
    }
    /**
     * 获取日志的图片
     * @param entryId
     * @param limit max 100
     * @param offset min 0
     * @returns any Default Response
     * @throws ApiError
     */
    public static getBlogPhotos(
        entryId: number,
        limit: number = 20,
        offset?: number,
    ): CancelablePromise<{
        data: Array<BlogPhoto>;
        /**
         * limit+offset 为参数的请求表示总条数，page 为参数的请求表示总页数
         */
        total: number;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/p1/blogs/{entryID}/photos',
            path: {
                'entryID': entryId,
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
     * 创建日志的吐槽
     * @param entryId
     * @param requestBody
     * @returns any Default Response
     * @throws ApiError
     */
    public static createBlogComment(
        entryId: number,
        requestBody?: (CreateReply & TurnstileToken),
    ): CancelablePromise<{
        /**
         * new comment id
         */
        id: number;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/p1/blogs/{entryID}/comments',
            path: {
                'entryID': entryId,
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
     * 获取日志的吐槽箱
     * @param entryId
     * @returns any Default Response
     * @throws ApiError
     */
    public static getBlogComments(
        entryId: number,
    ): CancelablePromise<Array<({
        user?: SlimUser;
        content: string;
        createdAt: number;
        creatorID: number;
        id: number;
        mainID: number;
        reactions?: Array<Reaction>;
        relatedID: number;
        state: number;
    } & {
        replies: Array<CommentBase>;
    })>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/p1/blogs/{entryID}/comments',
            path: {
                'entryID': entryId,
            },
            errors: {
                404: `default error response type`,
                500: `意料之外的服务器错误`,
            },
        });
    }
}
