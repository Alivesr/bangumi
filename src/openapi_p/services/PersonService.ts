/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CommentBase } from '../models/CommentBase';
import type { CreateReply } from '../models/CreateReply';
import type { Person } from '../models/Person';
import type { PersonCharacter } from '../models/PersonCharacter';
import type { PersonCollect } from '../models/PersonCollect';
import type { PersonWork } from '../models/PersonWork';
import type { Reaction } from '../models/Reaction';
import type { SlimUser } from '../models/SlimUser';
import type { SubjectType } from '../models/SubjectType';
import type { TurnstileToken } from '../models/TurnstileToken';
import type { UpdateContent } from '../models/UpdateContent';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class PersonService {
    /**
     * 删除人物的吐槽
     * @param commentId
     * @returns any Default Response
     * @throws ApiError
     */
    public static deletePersonComment(
        commentId: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/p1/persons/-/comments/{commentID}',
            path: {
                'commentID': commentId,
            },
            errors: {
                500: `意料之外的服务器错误`,
            },
        });
    }
    /**
     * 编辑人物的吐槽
     * @param commentId
     * @param requestBody
     * @returns any Default Response
     * @throws ApiError
     */
    public static updatePersonComment(
        commentId: number,
        requestBody?: UpdateContent,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/p1/persons/-/comments/{commentID}',
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
     * 获取人物
     * @param personId
     * @returns Person Default Response
     * @throws ApiError
     */
    public static getPerson(
        personId: number,
    ): CancelablePromise<Person> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/p1/persons/{personID}',
            path: {
                'personID': personId,
            },
            errors: {
                404: `default error response type`,
                500: `意料之外的服务器错误`,
            },
        });
    }
    /**
     * 获取人物的出演角色
     * @param personId
     * @param subjectType
     * @param type 角色出场类型: 主角，配角，客串
     * @param limit max 100
     * @param offset min 0
     * @returns any Default Response
     * @throws ApiError
     */
    public static getPersonCasts(
        personId: number,
        subjectType?: SubjectType,
        type?: number,
        limit: number = 20,
        offset?: number,
    ): CancelablePromise<{
        data: Array<PersonCharacter>;
        /**
         * limit+offset 为参数的请求表示总条数，page 为参数的请求表示总页数
         */
        total: number;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/p1/persons/{personID}/casts',
            path: {
                'personID': personId,
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
     * 获取人物的收藏用户
     * @param personId
     * @param limit max 100
     * @param offset min 0
     * @returns any Default Response
     * @throws ApiError
     */
    public static getPersonCollects(
        personId: number,
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
            url: '/p1/persons/{personID}/collects',
            path: {
                'personID': personId,
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
     * 获取人物的参与作品
     * @param personId
     * @param subjectType
     * @param position 职位
     * @param limit max 100
     * @param offset min 0
     * @returns any Default Response
     * @throws ApiError
     */
    public static getPersonWorks(
        personId: number,
        subjectType?: SubjectType,
        position?: number,
        limit: number = 20,
        offset?: number,
    ): CancelablePromise<{
        data: Array<PersonWork>;
        /**
         * limit+offset 为参数的请求表示总条数，page 为参数的请求表示总页数
         */
        total: number;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/p1/persons/{personID}/works',
            path: {
                'personID': personId,
            },
            query: {
                'subjectType': subjectType,
                'position': position,
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
     * 创建人物的吐槽
     * @param personId
     * @param requestBody
     * @returns any Default Response
     * @throws ApiError
     */
    public static createPersonComment(
        personId: number,
        requestBody?: (CreateReply & TurnstileToken),
    ): CancelablePromise<{
        /**
         * new comment id
         */
        id: number;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/p1/persons/{personID}/comments',
            path: {
                'personID': personId,
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
     * 获取人物的吐槽箱
     * @param personId
     * @returns any Default Response
     * @throws ApiError
     */
    public static getPersonComments(
        personId: number,
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
            url: '/p1/persons/{personID}/comments',
            path: {
                'personID': personId,
            },
            errors: {
                404: `default error response type`,
                500: `意料之外的服务器错误`,
            },
        });
    }
}
