/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CollectionType } from '../models/CollectionType';
import type { CreateTopic } from '../models/CreateTopic';
import type { Episode } from '../models/Episode';
import type { EpisodeType } from '../models/EpisodeType';
import type { FilterMode } from '../models/FilterMode';
import type { SlimSubject } from '../models/SlimSubject';
import type { Subject } from '../models/Subject';
import type { SubjectBrowseSort } from '../models/SubjectBrowseSort';
import type { SubjectCharacter } from '../models/SubjectCharacter';
import type { SubjectCollect } from '../models/SubjectCollect';
import type { SubjectInterestComment } from '../models/SubjectInterestComment';
import type { SubjectPosition } from '../models/SubjectPosition';
import type { SubjectRec } from '../models/SubjectRec';
import type { SubjectRelation } from '../models/SubjectRelation';
import type { SubjectReview } from '../models/SubjectReview';
import type { SubjectStaff } from '../models/SubjectStaff';
import type { SubjectTopic } from '../models/SubjectTopic';
import type { SubjectType } from '../models/SubjectType';
import type { Topic } from '../models/Topic';
import type { TurnstileToken } from '../models/TurnstileToken';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class SubjectService {
    /**
     * 获取条目
     * @param subjectId
     * @returns Subject Default Response
     * @throws ApiError
     */
    public static getSubject(
        subjectId: number,
    ): CancelablePromise<Subject> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/p1/subjects/{subjectID}',
            path: {
                'subjectID': subjectId,
            },
            errors: {
                500: `意料之外的服务器错误`,
            },
        });
    }
    /**
     * 取消条目收藏点赞
     * @param collectId
     * @returns any Default Response
     * @throws ApiError
     */
    public static unlikeSubjectCollect(
        collectId: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/p1/subjects/-/collects/{collectID}/like',
            path: {
                'collectID': collectId,
            },
            errors: {
                500: `意料之外的服务器错误`,
            },
        });
    }
    /**
     * 给条目收藏点赞
     * @param collectId
     * @param requestBody
     * @returns any Default Response
     * @throws ApiError
     */
    public static likeSubjectCollect(
        collectId: number,
        requestBody?: {
            value: number;
        },
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/p1/subjects/-/collects/{collectID}/like',
            path: {
                'collectID': collectId,
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
     * 获取条目列表
     * @param type
     * @param sort
     * @param page min 1
     * @param cat 每种条目类型分类不同，具体参考 https://github.com/bangumi/common 的 subject_platforms.yaml
     * @param series 是否为系列，仅对书籍类型的条目有效
     * @param year 年份
     * @param month 月份
     * @param tags
     * @returns any Default Response
     * @throws ApiError
     */
    public static getSubjects(
        type: SubjectType,
        sort: SubjectBrowseSort,
        page: number = 1,
        cat?: number,
        series?: boolean,
        year?: number,
        month?: number,
        tags?: Array<string>,
    ): CancelablePromise<{
        data: Array<SlimSubject>;
        /**
         * limit+offset 为参数的请求表示总条数，page 为参数的请求表示总页数
         */
        total: number;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/p1/subjects',
            query: {
                'type': type,
                'sort': sort,
                'page': page,
                'cat': cat,
                'series': series,
                'year': year,
                'month': month,
                'tags': tags,
            },
            errors: {
                500: `意料之外的服务器错误`,
            },
        });
    }
    /**
     * 获取最新的条目讨论
     * @param limit max 100
     * @param offset min 0
     * @returns any Default Response
     * @throws ApiError
     */
    public static getRecentSubjectTopics(
        limit: number = 20,
        offset?: number,
    ): CancelablePromise<{
        data: Array<SubjectTopic>;
        /**
         * limit+offset 为参数的请求表示总条数，page 为参数的请求表示总页数
         */
        total: number;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/p1/subjects/-/topics',
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
     * 获取条目的角色
     * @param subjectId
     * @param type 角色出场类型: 主角，配角，客串
     * @param limit max 100
     * @param offset min 0
     * @returns any Default Response
     * @throws ApiError
     */
    public static getSubjectCharacters(
        subjectId: number,
        type?: number,
        limit: number = 20,
        offset?: number,
    ): CancelablePromise<{
        data: Array<SubjectCharacter>;
        /**
         * limit+offset 为参数的请求表示总条数，page 为参数的请求表示总页数
         */
        total: number;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/p1/subjects/{subjectID}/characters',
            path: {
                'subjectID': subjectId,
            },
            query: {
                'type': type,
                'limit': limit,
                'offset': offset,
            },
            errors: {
                500: `意料之外的服务器错误`,
            },
        });
    }
    /**
     * 获取条目的收藏用户
     * @param subjectId
     * @param type
     * @param mode 默认为 all, 未登录或没有好友时始终为 all
     * @param limit max 100
     * @param offset min 0
     * @returns any Default Response
     * @throws ApiError
     */
    public static getSubjectCollects(
        subjectId: number,
        type?: CollectionType,
        mode?: FilterMode,
        limit: number = 20,
        offset?: number,
    ): CancelablePromise<{
        data: Array<SubjectCollect>;
        /**
         * limit+offset 为参数的请求表示总条数，page 为参数的请求表示总页数
         */
        total: number;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/p1/subjects/{subjectID}/collects',
            path: {
                'subjectID': subjectId,
            },
            query: {
                'type': type,
                'mode': mode,
                'limit': limit,
                'offset': offset,
            },
            errors: {
                500: `意料之外的服务器错误`,
            },
        });
    }
    /**
     * 获取条目的吐槽箱
     * @param subjectId
     * @param type
     * @param limit max 100
     * @param offset min 0
     * @returns any Default Response
     * @throws ApiError
     */
    public static getSubjectComments(
        subjectId: number,
        type?: CollectionType,
        limit: number = 20,
        offset?: number,
    ): CancelablePromise<{
        data: Array<SubjectInterestComment>;
        /**
         * limit+offset 为参数的请求表示总条数，page 为参数的请求表示总页数
         */
        total: number;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/p1/subjects/{subjectID}/comments',
            path: {
                'subjectID': subjectId,
            },
            query: {
                'type': type,
                'limit': limit,
                'offset': offset,
            },
            errors: {
                500: `意料之外的服务器错误`,
            },
        });
    }
    /**
     * 获取条目的剧集
     * @param subjectId
     * @param type
     * @param limit max 1000
     * @param offset min 0
     * @returns any Default Response
     * @throws ApiError
     */
    public static getSubjectEpisodes(
        subjectId: number,
        type?: EpisodeType,
        limit: number = 100,
        offset?: number,
    ): CancelablePromise<{
        data: Array<Episode>;
        /**
         * limit+offset 为参数的请求表示总条数，page 为参数的请求表示总页数
         */
        total: number;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/p1/subjects/{subjectID}/episodes',
            path: {
                'subjectID': subjectId,
            },
            query: {
                'type': type,
                'limit': limit,
                'offset': offset,
            },
            errors: {
                500: `意料之外的服务器错误`,
            },
        });
    }
    /**
     * 获取条目的推荐
     * @param subjectId
     * @param limit max 10
     * @param offset min 0
     * @returns any Default Response
     * @throws ApiError
     */
    public static getSubjectRecs(
        subjectId: number,
        limit: number = 10,
        offset?: number,
    ): CancelablePromise<{
        data: Array<SubjectRec>;
        /**
         * limit+offset 为参数的请求表示总条数，page 为参数的请求表示总页数
         */
        total: number;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/p1/subjects/{subjectID}/recs',
            path: {
                'subjectID': subjectId,
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
     * 获取条目的关联条目
     * @param subjectId
     * @param type
     * @param offprint 是否单行本
     * @param limit max 100
     * @param offset min 0
     * @returns any Default Response
     * @throws ApiError
     */
    public static getSubjectRelations(
        subjectId: number,
        type?: SubjectType,
        offprint: boolean = false,
        limit: number = 20,
        offset?: number,
    ): CancelablePromise<{
        data: Array<SubjectRelation>;
        /**
         * limit+offset 为参数的请求表示总条数，page 为参数的请求表示总页数
         */
        total: number;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/p1/subjects/{subjectID}/relations',
            path: {
                'subjectID': subjectId,
            },
            query: {
                'type': type,
                'offprint': offprint,
                'limit': limit,
                'offset': offset,
            },
            errors: {
                500: `意料之外的服务器错误`,
            },
        });
    }
    /**
     * 获取条目的评论
     * @param subjectId
     * @param limit max 20
     * @param offset min 0
     * @returns any Default Response
     * @throws ApiError
     */
    public static getSubjectReviews(
        subjectId: number,
        limit: number = 5,
        offset?: number,
    ): CancelablePromise<{
        data: Array<SubjectReview>;
        /**
         * limit+offset 为参数的请求表示总条数，page 为参数的请求表示总页数
         */
        total: number;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/p1/subjects/{subjectID}/reviews',
            path: {
                'subjectID': subjectId,
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
     * 获取条目的制作人员
     * @param subjectId
     * @param position 人物职位: 监督，原案，脚本,..
     * @param limit max 100
     * @param offset min 0
     * @returns any Default Response
     * @throws ApiError
     */
    public static getSubjectStaffPersons(
        subjectId: number,
        position?: number,
        limit: number = 20,
        offset?: number,
    ): CancelablePromise<{
        data: Array<SubjectStaff>;
        /**
         * limit+offset 为参数的请求表示总条数，page 为参数的请求表示总页数
         */
        total: number;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/p1/subjects/{subjectID}/staffs/persons',
            path: {
                'subjectID': subjectId,
            },
            query: {
                'position': position,
                'limit': limit,
                'offset': offset,
            },
            errors: {
                500: `意料之外的服务器错误`,
            },
        });
    }
    /**
     * 获取条目的制作人员职位
     * @param subjectId
     * @param limit max 100
     * @param offset min 0
     * @returns any Default Response
     * @throws ApiError
     */
    public static getSubjectStaffPositions(
        subjectId: number,
        limit: number = 20,
        offset?: number,
    ): CancelablePromise<{
        data: Array<SubjectPosition>;
        /**
         * limit+offset 为参数的请求表示总条数，page 为参数的请求表示总页数
         */
        total: number;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/p1/subjects/{subjectID}/staffs/positions',
            path: {
                'subjectID': subjectId,
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
     * 获取条目讨论版
     * @param subjectId
     * @param limit max 100
     * @param offset min 0
     * @returns any Default Response
     * @throws ApiError
     */
    public static getSubjectTopics(
        subjectId: number,
        limit: number = 20,
        offset?: number,
    ): CancelablePromise<{
        data: Array<Topic>;
        /**
         * limit+offset 为参数的请求表示总条数，page 为参数的请求表示总页数
         */
        total: number;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/p1/subjects/{subjectID}/topics',
            path: {
                'subjectID': subjectId,
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
     * 创建条目讨论
     * @param subjectId
     * @param requestBody
     * @returns any Default Response
     * @throws ApiError
     */
    public static createSubjectTopic(
        subjectId: number,
        requestBody?: (CreateTopic & TurnstileToken),
    ): CancelablePromise<{
        /**
         * new topic id
         */
        id: number;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/p1/subjects/{subjectID}/topics',
            path: {
                'subjectID': subjectId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                429: `default error response type`,
                500: `意料之外的服务器错误`,
            },
        });
    }
}
