/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CommentBase } from '../models/CommentBase';
import type { CreateReply } from '../models/CreateReply';
import type { Episode } from '../models/Episode';
import type { Reaction } from '../models/Reaction';
import type { SlimUser } from '../models/SlimUser';
import type { TurnstileToken } from '../models/TurnstileToken';
import type { UpdateContent } from '../models/UpdateContent';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class EpisodeService {
    /**
     * 获取剧集信息
     * @param episodeId
     * @returns Episode Default Response
     * @throws ApiError
     */
    public static getEpisode(
        episodeId: number,
    ): CancelablePromise<Episode> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/p1/episodes/{episodeID}',
            path: {
                'episodeID': episodeId,
            },
            errors: {
                500: `意料之外的服务器错误`,
            },
        });
    }
    /**
     * 删除条目的剧集吐槽
     * @param commentId
     * @returns any Default Response
     * @throws ApiError
     */
    public static deleteEpisodeComment(
        commentId: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/p1/episodes/-/comments/{commentID}',
            path: {
                'commentID': commentId,
            },
            errors: {
                500: `意料之外的服务器错误`,
            },
        });
    }
    /**
     * 编辑条目的剧集吐槽
     * @param commentId
     * @param requestBody
     * @returns any Default Response
     * @throws ApiError
     */
    public static updateEpisodeComment(
        commentId: number,
        requestBody?: UpdateContent,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/p1/episodes/-/comments/{commentID}',
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
     * 取消条目的剧集吐槽点赞
     * @param commentId
     * @returns any Default Response
     * @throws ApiError
     */
    public static unlikeEpisodeComment(
        commentId: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/p1/episodes/-/comments/{commentID}/like',
            path: {
                'commentID': commentId,
            },
            errors: {
                500: `意料之外的服务器错误`,
            },
        });
    }
    /**
     * 给条目的剧集吐槽点赞
     * @param commentId
     * @param requestBody
     * @returns any Default Response
     * @throws ApiError
     */
    public static likeEpisodeComment(
        commentId: number,
        requestBody?: {
            value: number;
        },
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/p1/episodes/-/comments/{commentID}/like',
            path: {
                'commentID': commentId,
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
     * 创建条目的剧集吐槽
     * @param episodeId
     * @param requestBody
     * @returns any Default Response
     * @throws ApiError
     */
    public static createEpisodeComment(
        episodeId: number,
        requestBody?: (CreateReply & TurnstileToken),
    ): CancelablePromise<{
        /**
         * new comment id
         */
        id: number;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/p1/episodes/{episodeID}/comments',
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
     * 获取条目的剧集吐槽箱
     * @param episodeId
     * @returns any Default Response
     * @throws ApiError
     */
    public static getEpisodeComments(
        episodeId: number,
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
            url: '/p1/episodes/{episodeID}/comments',
            path: {
                'episodeID': episodeId,
            },
            errors: {
                500: `意料之外的服务器错误`,
            },
        });
    }
}
