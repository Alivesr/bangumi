/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateReply } from '../models/CreateReply';
import type { GroupTopic } from '../models/GroupTopic';
import type { Post } from '../models/Post';
import type { SubjectTopic } from '../models/SubjectTopic';
import type { TurnstileToken } from '../models/TurnstileToken';
import type { UpdateContent } from '../models/UpdateContent';
import type { UpdateTopic } from '../models/UpdateTopic';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class TopicService {
    /**
     * 获取小组话题详情
     * @param topicId
     * @returns GroupTopic Default Response
     * @throws ApiError
     */
    public static getGroupTopic(
        topicId: number,
    ): CancelablePromise<GroupTopic> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/p1/groups/-/topics/{topicID}',
            path: {
                'topicID': topicId,
            },
            errors: {
                500: `意料之外的服务器错误`,
            },
        });
    }
    /**
     * editGroupTopic
     * 编辑小组话题
     * @param topicId
     * @param requestBody
     * @returns any Default Response
     * @throws ApiError
     */
    public static editGroupTopic(
        topicId: number,
        requestBody?: UpdateTopic,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/p1/groups/-/topics/{topicID}',
            path: {
                'topicID': topicId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                500: `意料之外的服务器错误`,
            },
        });
    }
    /**
     * 获取小组话题回复详情
     * @param postId
     * @returns Post Default Response
     * @throws ApiError
     */
    public static getGroupPost(
        postId: number,
    ): CancelablePromise<Post> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/p1/groups/-/posts/{postID}',
            path: {
                'postID': postId,
            },
            errors: {
                500: `意料之外的服务器错误`,
            },
        });
    }
    /**
     * 删除小组话题回复
     * @param postId
     * @returns any Default Response
     * @throws ApiError
     */
    public static deleteGroupPost(
        postId: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/p1/groups/-/posts/{postID}',
            path: {
                'postID': postId,
            },
            errors: {
                500: `意料之外的服务器错误`,
            },
        });
    }
    /**
     * 编辑小组话题回复
     * @param postId
     * @param requestBody
     * @returns any Default Response
     * @throws ApiError
     */
    public static editGroupPost(
        postId: number,
        requestBody?: UpdateContent,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/p1/groups/-/posts/{postID}',
            path: {
                'postID': postId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                500: `意料之外的服务器错误`,
            },
        });
    }
    /**
     * 取消小组话题回复点赞
     * @param postId
     * @returns any Default Response
     * @throws ApiError
     */
    public static unlikeGroupPost(
        postId: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/p1/groups/-/posts/{postID}/like',
            path: {
                'postID': postId,
            },
            errors: {
                500: `意料之外的服务器错误`,
            },
        });
    }
    /**
     * 给小组话题回复点赞
     * @param postId
     * @param requestBody
     * @returns any Default Response
     * @throws ApiError
     */
    public static likeGroupPost(
        postId: number,
        requestBody?: {
            value: number;
        },
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/p1/groups/-/posts/{postID}/like',
            path: {
                'postID': postId,
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
     * 获取条目讨论回复详情
     * @param postId
     * @returns Post Default Response
     * @throws ApiError
     */
    public static getSubjectPost(
        postId: number,
    ): CancelablePromise<Post> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/p1/subjects/-/posts/{postID}',
            path: {
                'postID': postId,
            },
            errors: {
                500: `意料之外的服务器错误`,
            },
        });
    }
    /**
     * 删除条目讨论回复
     * @param postId
     * @returns any Default Response
     * @throws ApiError
     */
    public static deleteSubjectPost(
        postId: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/p1/subjects/-/posts/{postID}',
            path: {
                'postID': postId,
            },
            errors: {
                500: `意料之外的服务器错误`,
            },
        });
    }
    /**
     * 编辑条目讨论回复
     * @param postId
     * @param requestBody
     * @returns any Default Response
     * @throws ApiError
     */
    public static editSubjectPost(
        postId: number,
        requestBody?: UpdateContent,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/p1/subjects/-/posts/{postID}',
            path: {
                'postID': postId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                500: `意料之外的服务器错误`,
            },
        });
    }
    /**
     * 取消条目讨论回复点赞
     * @param postId
     * @returns any Default Response
     * @throws ApiError
     */
    public static unlikeSubjectPost(
        postId: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/p1/subjects/-/posts/{postID}/like',
            path: {
                'postID': postId,
            },
            errors: {
                500: `意料之外的服务器错误`,
            },
        });
    }
    /**
     * 给条目讨论回复点赞
     * @param postId
     * @param requestBody
     * @returns any Default Response
     * @throws ApiError
     */
    public static likeSubjectPost(
        postId: number,
        requestBody?: {
            value: number;
        },
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/p1/subjects/-/posts/{postID}/like',
            path: {
                'postID': postId,
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
     * 获取条目讨论详情
     * @param topicId
     * @returns SubjectTopic Default Response
     * @throws ApiError
     */
    public static getSubjectTopic(
        topicId: number,
    ): CancelablePromise<SubjectTopic> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/p1/subjects/-/topics/{topicID}',
            path: {
                'topicID': topicId,
            },
            errors: {
                500: `意料之外的服务器错误`,
            },
        });
    }
    /**
     * 编辑自己创建的条目讨论
     * @param topicId
     * @param requestBody
     * @returns any Default Response
     * @throws ApiError
     */
    public static updateSubjectTopic(
        topicId: number,
        requestBody?: {
            /**
             * bbcode
             */
            content: string;
            title: string;
        },
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/p1/subjects/-/topics/{topicID}',
            path: {
                'topicID': topicId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                500: `意料之外的服务器错误`,
            },
        });
    }
    /**
     * 创建小组话题回复
     * @param topicId
     * @param requestBody
     * @returns any Default Response
     * @throws ApiError
     */
    public static createGroupReply(
        topicId: number,
        requestBody?: (CreateReply & TurnstileToken),
    ): CancelablePromise<{
        id: number;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/p1/groups/-/topics/{topicID}/replies',
            path: {
                'topicID': topicId,
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
     * 创建条目讨论回复
     * @param topicId
     * @param requestBody
     * @returns any Default Response
     * @throws ApiError
     */
    public static createSubjectReply(
        topicId: number,
        requestBody?: (CreateReply & TurnstileToken),
    ): CancelablePromise<{
        id: number;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/p1/subjects/-/topics/{topicID}/replies',
            path: {
                'topicID': topicId,
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
