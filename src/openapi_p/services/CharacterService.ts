/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Character } from '../models/Character';
import type { CharacterSubject } from '../models/CharacterSubject';
import type { CommentBase } from '../models/CommentBase';
import type { CreateReply } from '../models/CreateReply';
import type { PersonCollect } from '../models/PersonCollect';
import type { Reaction } from '../models/Reaction';
import type { SlimUser } from '../models/SlimUser';
import type { SubjectType } from '../models/SubjectType';
import type { TurnstileToken } from '../models/TurnstileToken';
import type { UpdateContent } from '../models/UpdateContent';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class CharacterService {
    /**
     * 删除角色的吐槽
     * @param commentId
     * @returns any Default Response
     * @throws ApiError
     */
    public static deleteCharacterComment(
        commentId: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/p1/characters/-/comments/{commentID}',
            path: {
                'commentID': commentId,
            },
            errors: {
                500: `意料之外的服务器错误`,
            },
        });
    }
    /**
     * 编辑角色的吐槽
     * @param commentId
     * @param requestBody
     * @returns any Default Response
     * @throws ApiError
     */
    public static updateCharacterComment(
        commentId: number,
        requestBody?: UpdateContent,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/p1/characters/-/comments/{commentID}',
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
     * 获取角色
     * @param characterId
     * @returns Character Default Response
     * @throws ApiError
     */
    public static getCharacter(
        characterId: number,
    ): CancelablePromise<Character> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/p1/characters/{characterID}',
            path: {
                'characterID': characterId,
            },
            errors: {
                404: `default error response type`,
                500: `意料之外的服务器错误`,
            },
        });
    }
    /**
     * 获取角色出演作品
     * @param characterId
     * @param subjectType
     * @param type 角色出场类型: 主角，配角，客串
     * @param limit max 100
     * @param offset min 0
     * @returns any Default Response
     * @throws ApiError
     */
    public static getCharacterCasts(
        characterId: number,
        subjectType?: SubjectType,
        type?: number,
        limit: number = 20,
        offset?: number,
    ): CancelablePromise<{
        data: Array<CharacterSubject>;
        /**
         * limit+offset 为参数的请求表示总条数，page 为参数的请求表示总页数
         */
        total: number;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/p1/characters/{characterID}/casts',
            path: {
                'characterID': characterId,
            },
            query: {
                'subjectType': subjectType,
                'type': type,
                'limit': limit,
                'offset': offset,
            },
            errors: {
                404: `default error response type`,
                500: `意料之外的服务器错误`,
            },
        });
    }
    /**
     * 获取角色的收藏用户
     * @param characterId
     * @param limit max 100
     * @param offset min 0
     * @returns any Default Response
     * @throws ApiError
     */
    public static getCharacterCollects(
        characterId: number,
        limit: number = 20,
        offset?: number,
    ): CancelablePromise<{
        data: Array<PersonCollect>;
        /**
         * limit+offset 为参数的请求表示总条数，page 为参数的请求表示总页数
         */
        total: number;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/p1/characters/{characterID}/collects',
            path: {
                'characterID': characterId,
            },
            query: {
                'limit': limit,
                'offset': offset,
            },
            errors: {
                404: `default error response type`,
                500: `意料之外的服务器错误`,
            },
        });
    }
    /**
     * 创建角色的吐槽
     * @param characterId
     * @param requestBody
     * @returns any Default Response
     * @throws ApiError
     */
    public static createCharacterComment(
        characterId: number,
        requestBody?: (CreateReply & TurnstileToken),
    ): CancelablePromise<{
        /**
         * new comment id
         */
        id: number;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/p1/characters/{characterID}/comments',
            path: {
                'characterID': characterId,
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
     * 获取角色的吐槽箱
     * @param characterId
     * @returns any Default Response
     * @throws ApiError
     */
    public static getCharacterComments(
        characterId: number,
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
            url: '/p1/characters/{characterID}/comments',
            path: {
                'characterID': characterId,
            },
            errors: {
                404: `default error response type`,
                500: `意料之外的服务器错误`,
            },
        });
    }
}
