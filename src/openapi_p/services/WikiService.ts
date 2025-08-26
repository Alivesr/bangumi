/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Avatar } from '../models/Avatar';
import type { EpisodeType } from '../models/EpisodeType';
import type { EpisodeWikiInfo } from '../models/EpisodeWikiInfo';
import type { HistorySummary } from '../models/HistorySummary';
import type { PersonWikiInfo } from '../models/PersonWikiInfo';
import type { RecentWikiChange } from '../models/RecentWikiChange';
import type { SubjectEdit } from '../models/SubjectEdit';
import type { SubjectType } from '../models/SubjectType';
import type { SubjectWikiInfo } from '../models/SubjectWikiInfo';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class WikiService {
    /**
     * getRecentWiki
     * 获取最近两天的wiki更新
     * @param since unix time stamp, only return last update time >= since
     *
     * only allow recent 2 days
     * @returns RecentWikiChange Default Response
     * @throws ApiError
     */
    public static getRecentWiki(
        since: number,
    ): CancelablePromise<RecentWikiChange> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/p1/wiki/recent',
            path: {
                'since': since,
            },
            errors: {
                401: `default error response type`,
                500: `意料之外的服务器错误`,
            },
        });
    }
    /**
     * lockSubject
     * @param requestBody
     * @returns any Default Response
     * @throws ApiError
     */
    public static lockSubject(
        requestBody?: {
            reason: string;
            subjectID: number;
        },
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/p1/wiki/lock/subjects',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                500: `意料之外的服务器错误`,
            },
        });
    }
    /**
     * 撤消条目封面投票
     * 需要 `subjectWikiEdit` 权限
     * @param subjectId
     * @param imageId
     * @returns any Default Response
     * @throws ApiError
     */
    public static unvoteSubjectCover(
        subjectId: number,
        imageId: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/p1/wiki/subjects/{subjectID}/covers/{imageID}/vote',
            path: {
                'subjectID': subjectId,
                'imageID': imageId,
            },
            errors: {
                500: `意料之外的服务器错误`,
            },
        });
    }
    /**
     * 为条目封面投票
     * 需要 `subjectWikiEdit` 权限
     * @param subjectId
     * @param imageId
     * @returns any Default Response
     * @throws ApiError
     */
    public static voteSubjectCover(
        subjectId: number,
        imageId: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/p1/wiki/subjects/{subjectID}/covers/{imageID}/vote',
            path: {
                'subjectID': subjectId,
                'imageID': imageId,
            },
            errors: {
                500: `意料之外的服务器错误`,
            },
        });
    }
    /**
     * unlockSubject
     * @param requestBody
     * @returns any Default Response
     * @throws ApiError
     */
    public static unlockSubject(
        requestBody?: {
            reason: string;
            subjectID: number;
        },
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/p1/wiki/unlock/subjects',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                500: `意料之外的服务器错误`,
            },
        });
    }
    /**
     * subjectEditHistorySummary
     * 获取当前的 wiki 信息
     * @param subjectId
     * @returns HistorySummary Default Response
     * @throws ApiError
     */
    public static subjectEditHistorySummary(
        subjectId: number,
    ): CancelablePromise<Array<HistorySummary>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/p1/wiki/subjects/{subjectID}/history-summary',
            path: {
                'subjectID': subjectId,
            },
            errors: {
                401: `default error response type`,
                500: `意料之外的服务器错误`,
            },
        });
    }
    /**
     * createNewSubject
     * 创建新条目
     * @param requestBody
     * @returns any Default Response
     * @throws ApiError
     */
    public static createNewSubject(
        requestBody?: {
            type: SubjectType;
            infobox: string;
            name: string;
            nsfw: boolean;
            platform: number;
            summary: string;
            metaTags: Array<string>;
        },
    ): CancelablePromise<{
        subjectID: number;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/p1/wiki/subjects',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `default error response type`,
                401: `default error response type`,
                500: `意料之外的服务器错误`,
            },
        });
    }
    /**
     * getPersonWikiInfo
     * 获取当前的 wiki 信息
     * @param personId
     * @returns PersonWikiInfo Default Response
     * @throws ApiError
     */
    public static getPersonWikiInfo(
        personId: number,
    ): CancelablePromise<PersonWikiInfo> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/p1/wiki/persons/{personID}',
            path: {
                'personID': personId,
            },
            errors: {
                401: `default error response type`,
                404: `角色不存在`,
                500: `意料之外的服务器错误`,
            },
        });
    }
    /**
     * patchPersonInfo
     * @param personId
     * @param requestBody
     * @returns any Default Response
     * @throws ApiError
     */
    public static patchPersonInfo(
        personId: number,
        requestBody?: {
            commitMessage: string;
            expectedRevision: {
                infobox?: string;
                name?: string;
                summary?: string;
            };
            person: {
                infobox?: string;
                name?: string;
                summary?: string;
            };
        },
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/p1/wiki/persons/{personID}',
            path: {
                'personID': personId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `default error response type`,
                401: `default error response type`,
                500: `意料之外的服务器错误`,
            },
        });
    }
    /**
     * getEpisodeWikiInfo
     * @param episodeId
     * @returns EpisodeWikiInfo Default Response
     * @throws ApiError
     */
    public static getEpisodeWikiInfo(
        episodeId: number,
    ): CancelablePromise<EpisodeWikiInfo> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/p1/wiki/ep/{episodeID}',
            path: {
                'episodeID': episodeId,
            },
            errors: {
                404: `default error response type`,
                500: `意料之外的服务器错误`,
            },
        });
    }
    /**
     * patchEpisodeWikiInfo
     * @param episodeId
     * @param requestBody
     * @returns any Default Response
     * @throws ApiError
     */
    public static patchEpisodeWikiInfo(
        episodeId: number,
        requestBody?: {
            commitMessage: string;
            /**
             * a optional object to check if input is changed by others
             * if some key is given, and current data in database doesn't match input, subject will not be changed
             */
            expectedRevision?: {
                date?: string;
                duration?: string;
                name?: string;
                nameCN?: string;
                summary?: string;
            };
            episode: {
                type?: EpisodeType;
                /**
                 * YYYY-MM-DD
                 */
                date?: string;
                disc?: number;
                duration?: string;
                ep?: number;
                name?: string;
                nameCN?: string;
                subjectID?: number;
                summary?: string;
            };
        },
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/p1/wiki/ep/{episodeID}',
            path: {
                'episodeID': episodeId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `invalid input`,
                404: `default error response type`,
                500: `意料之外的服务器错误`,
            },
        });
    }
    /**
     * 为条目添加新章节
     * 需要 `epEdit` 权限，一次最多可以添加 40 个章节
     * @param subjectId
     * @param requestBody
     * @returns any Default Response
     * @throws ApiError
     */
    public static createEpisodes(
        subjectId: number,
        requestBody?: {
            episodes: Array<{
                type?: EpisodeType;
                /**
                 * YYYY-MM-DD
                 */
                date?: string;
                disc?: number;
                duration?: string;
                ep: number;
                name?: string;
                nameCN?: string;
                summary?: string;
            }>;
        },
    ): CancelablePromise<{
        episodeIDs: Array<number>;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/p1/wiki/subjects/{subjectID}/ep',
            path: {
                'subjectID': subjectId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `default error response type`,
                500: `意料之外的服务器错误`,
            },
        });
    }
    /**
     * 批量编辑条目章节
     * 需要 `epEdit` 权限，一次最多可以编辑 20 个章节
     * @param subjectId
     * @param requestBody
     * @returns any Default Response
     * @throws ApiError
     */
    public static patchEpisodes(
        subjectId: number,
        requestBody?: {
            commitMessage: string;
            expectedRevision?: Array<{
                date?: string;
                duration?: string;
                name?: string;
                nameCN?: string;
                summary?: string;
            }>;
            episodes: Array<{
                type?: EpisodeType;
                /**
                 * YYYY-MM-DD
                 */
                date?: string;
                disc?: number;
                duration?: string;
                ep?: number;
                id: number;
                name?: string;
                nameCN?: string;
                summary?: string;
            }>;
        },
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/p1/wiki/subjects/{subjectID}/ep',
            path: {
                'subjectID': subjectId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `default error response type`,
                500: `意料之外的服务器错误`,
            },
        });
    }
    /**
     * subjectInfo
     * 获取当前的 wiki 信息
     * @param subjectId
     * @returns SubjectWikiInfo Default Response
     * @throws ApiError
     */
    public static subjectInfo(
        subjectId: number,
    ): CancelablePromise<SubjectWikiInfo> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/p1/wiki/subjects/{subjectID}',
            path: {
                'subjectID': subjectId,
            },
            errors: {
                401: `default error response type`,
                500: `意料之外的服务器错误`,
            },
        });
    }
    /**
     * patchSubjectInfo
     * @param subjectId
     * @param requestBody
     * @returns any Default Response
     * @throws ApiError
     */
    public static patchSubjectInfo(
        subjectId: number,
        requestBody?: {
            /**
             * when header x-admin-token is provided, use this as author id.
             */
            authorID?: number;
            commitMessage: string;
            subject: {
                date?: string;
                infobox?: string;
                name?: string;
                nsfw?: boolean;
                platform?: number;
                summary?: string;
                metaTags?: Array<string>;
            };
            /**
             * a optional object to check if input is changed by others
             * if `infobox` is given, and current data in database doesn't match input, subject will not be changed
             */
            expectedRevision?: {
                infobox?: (null | string);
                name?: (null | string);
                platform?: (null | number);
                summary?: (null | string);
                metaTags?: (null | Array<string>);
            };
        },
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/p1/wiki/subjects/{subjectID}',
            path: {
                'subjectID': subjectId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `default error response type`,
                500: `意料之外的服务器错误`,
            },
        });
    }
    /**
     * putSubjectInfo
     * 需要 `subjectWikiEdit` 权限
     * @param subjectId
     * @param requestBody
     * @returns any Default Response
     * @throws ApiError
     */
    public static putSubjectInfo(
        subjectId: number,
        requestBody?: {
            subject: SubjectEdit;
            commitMessage: string;
            /**
             * a optional object to check if input is changed by others
             * if `infobox` is given, and current data in database doesn't match input, subject will not be changed
             */
            expectedRevision?: {
                infobox?: (null | string);
                name?: (null | string);
                platform?: (null | number);
                summary?: (null | string);
                metaTags?: (null | Array<string>);
            };
        },
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/p1/wiki/subjects/{subjectID}',
            path: {
                'subjectID': subjectId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `default error response type`,
                500: `意料之外的服务器错误`,
            },
        });
    }
    /**
     * uploadSubjectCover
     * 需要 `subjectWikiEdit` 权限
     * @param subjectId
     * @param requestBody
     * @returns any Default Response
     * @throws ApiError
     */
    public static uploadSubjectCover(
        subjectId: number,
        requestBody?: {
            /**
             * base64 encoded raw bytes, 4mb size limit on **decoded** size
             */
            content: string;
        },
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/p1/wiki/subjects/{subjectID}/covers',
            path: {
                'subjectID': subjectId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `default error response type`,
                403: `default error response type`,
                500: `意料之外的服务器错误`,
            },
        });
    }
    /**
     * listSubjectCovers
     * @param subjectId
     * @returns any Default Response
     * @throws ApiError
     */
    public static listSubjectCovers(
        subjectId: number,
    ): CancelablePromise<{
        current?: {
            id: number;
            raw: string;
            thumbnail: string;
        };
        covers: Array<{
            id: number;
            raw: string;
            thumbnail: string;
            voted: boolean;
            creator: {
                avatar: Avatar;
                group: number;
                id: number;
                joinedAt: number;
                nickname: string;
                sign: string;
                username: string;
            };
        }>;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/p1/wiki/subjects/{subjectID}/covers',
            path: {
                'subjectID': subjectId,
            },
            errors: {
                500: `意料之外的服务器错误`,
            },
        });
    }
}
