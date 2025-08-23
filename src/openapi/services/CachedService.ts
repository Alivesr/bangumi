/**
 * 带缓存功能的 Service 封装
 * 为 OpenAPI 生成的 API 添加 localStorage 缓存支持
 */

import { Service } from "./Service";
import type { CancelablePromise } from "../core/CancelablePromise";
import { cachedRequest } from "../core/cachedRequest";
import { OpenAPI } from "../core/OpenAPI";
import type { SubjectType } from "../models/SubjectType";
import type { SubjectCategory } from "../models/SubjectCategory";
import type { SubjectID } from "../models/SubjectID";
import type { EpType } from "../models/EpType";
import type { SubjectCollectionType } from "../models/SubjectCollectionType";

// 导入模型类型
import type { Subject } from "../models/Subject";
import type { Paged_Subject } from "../models/Paged_Subject";
import type { RelatedPerson } from "../models/RelatedPerson";
import type { RelatedCharacter } from "../models/RelatedCharacter";
import type { v0_subject_relation } from "../models/v0_subject_relation";
import type { Character } from "../models/Character";
import type { v0_RelatedSubject } from "../models/v0_RelatedSubject";
import type { CharacterPerson } from "../models/CharacterPerson";
import type { PersonDetail } from "../models/PersonDetail";
import type { PersonCharacter } from "../models/PersonCharacter";
import type { Paged_Episode } from "../models/Paged_Episode";
import type { EpisodeDetail } from "../models/EpisodeDetail";
import type { Paged_UserCollection } from "../models/Paged_UserCollection";
import type { UserSubjectCollection } from "../models/UserSubjectCollection";
import type { Page } from "../models/Page";
import type { UserEpisodeCollection } from "../models/UserEpisodeCollection";
import type { Paged_UserCharacterCollection } from "../models/Paged_UserCharacterCollection";
import type { UserCharacterCollection } from "../models/UserCharacterCollection";
import type { Paged_UserPersonCollection } from "../models/Paged_UserPersonCollection";
import type { UserPersonCollection } from "../models/UserPersonCollection";

// 默认缓存时间配置
const CACHE_TTL = {
  // 短缓存：1分钟
  SHORT: 1 * 60 * 1000,
  // 中等缓存：5分钟
  MEDIUM: 5 * 60 * 1000,
  // 长缓存：30分钟
  LONG: 30 * 60 * 1000,
  // 超长缓存：24小时
  VERY_LONG: 24 * 60 * 60 * 1000,
};

export class CachedService {
  /**
   * 浏览条目（带缓存）
   * 第一页会 cache 24h，之后会 cache 1h
   * @param type 条目类型
   * @param cat 条目分类
   * @param series 是否系列
   * @param platform 平台
   * @param sort 排序
   * @param year 年份
   * @param month 月份
   * @param limit 分页参数
   * @param offset 分页参数
   * @returns Paged_Subject
   */
  public static getSubjects(
    type: SubjectType,
    cat?: SubjectCategory,
    series?: boolean,
    platform?: string,
    sort?: string,
    year?: number,
    month?: number,
    limit: number = 30,
    offset?: number,
  ): CancelablePromise<Paged_Subject> {
    // 根据 offset 决定缓存时间
    const ttl =
      offset === 0 || offset === undefined
        ? CACHE_TTL.VERY_LONG
        : CACHE_TTL.LONG;

    return cachedRequest(
      OpenAPI,
      {
        method: "GET",
        url: "/v0/subjects",
        query: {
          type: type,
          cat: cat,
          series: series,
          platform: platform,
          sort: sort,
          year: year,
          month: month,
          limit: limit,
          offset: offset,
        },
      },
      {
        cache: true,
        ttl: ttl,
      },
    );
  }

  /**
   * 获取条目（带缓存）
   * cache with 300s
   * @param subjectId 条目 ID
   * @returns Subject
   */
  public static getSubjectById(
    subjectId: SubjectID,
  ): CancelablePromise<Subject> {
    return cachedRequest(
      OpenAPI,
      {
        method: "GET",
        url: "/v0/subjects/{subject_id}",
        path: {
          subject_id: subjectId,
        },
      },
      {
        cache: true,
        ttl: CACHE_TTL.MEDIUM,
      },
    );
  }

  /**
   * Get Subject Persons（带缓存）
   * @param subjectId 条目 ID
   * @returns RelatedPerson[]
   */
  public static getRelatedPersonsBySubjectId(
    subjectId: SubjectID,
  ): CancelablePromise<Array<RelatedPerson>> {
    return cachedRequest(
      OpenAPI,
      {
        method: "GET",
        url: "/v0/subjects/{subject_id}/persons",
        path: {
          subject_id: subjectId,
        },
      },
      {
        cache: true,
        ttl: CACHE_TTL.MEDIUM,
      },
    );
  }

  /**
   * Get Subject Characters（带缓存）
   * @param subjectId 条目 ID
   * @returns RelatedCharacter[]
   */
  public static getRelatedCharactersBySubjectId(
    subjectId: SubjectID,
  ): CancelablePromise<Array<RelatedCharacter>> {
    return cachedRequest(
      OpenAPI,
      {
        method: "GET",
        url: "/v0/subjects/{subject_id}/characters",
        path: {
          subject_id: subjectId,
        },
      },
      {
        cache: true,
        ttl: CACHE_TTL.MEDIUM,
      },
    );
  }

  /**
   * Get Subject Relations（带缓存）
   * @param subjectId 条目 ID
   * @returns v0_subject_relation[]
   */
  public static getRelatedSubjectsBySubjectId(
    subjectId: SubjectID,
  ): CancelablePromise<Array<v0_subject_relation>> {
    return cachedRequest(
      OpenAPI,
      {
        method: "GET",
        url: "/v0/subjects/{subject_id}/subjects",
        path: {
          subject_id: subjectId,
        },
      },
      {
        cache: true,
        ttl: CACHE_TTL.MEDIUM,
      },
    );
  }

  /**
   * Get Character Detail（带缓存）
   * cache with 60s
   * @param characterId 角色 ID
   * @returns Character
   */
  public static getCharacterById(
    characterId: number,
  ): CancelablePromise<Character> {
    return cachedRequest(
      OpenAPI,
      {
        method: "GET",
        url: "/v0/characters/{character_id}",
        path: {
          character_id: characterId,
        },
      },
      {
        cache: true,
        ttl: CACHE_TTL.SHORT,
      },
    );
  }

  /**
   * get character related subjects（带缓存）
   * @param characterId 角色 ID
   * @returns v0_RelatedSubject[]
   */
  public static getRelatedSubjectsByCharacterId(
    characterId: number,
  ): CancelablePromise<Array<v0_RelatedSubject>> {
    return cachedRequest(
      OpenAPI,
      {
        method: "GET",
        url: "/v0/characters/{character_id}/subjects",
        path: {
          character_id: characterId,
        },
      },
      {
        cache: true,
        ttl: CACHE_TTL.MEDIUM,
      },
    );
  }

  /**
   * get character related persons（带缓存）
   * @param characterId 角色 ID
   * @returns CharacterPerson[]
   */
  public static getRelatedPersonsByCharacterId(
    characterId: number,
  ): CancelablePromise<Array<CharacterPerson>> {
    return cachedRequest(
      OpenAPI,
      {
        method: "GET",
        url: "/v0/characters/{character_id}/persons",
        path: {
          character_id: characterId,
        },
      },
      {
        cache: true,
        ttl: CACHE_TTL.MEDIUM,
      },
    );
  }

  /**
   * Get Person（带缓存）
   * cache with 60s
   * @param personId 人物 ID
   * @returns PersonDetail
   */
  public static getPersonById(
    personId: number,
  ): CancelablePromise<PersonDetail> {
    return cachedRequest(
      OpenAPI,
      {
        method: "GET",
        url: "/v0/persons/{person_id}",
        path: {
          person_id: personId,
        },
      },
      {
        cache: true,
        ttl: CACHE_TTL.SHORT,
      },
    );
  }

  /**
   * get person related subjects（带缓存）
   * @param personId 人物 ID
   * @returns v0_RelatedSubject[]
   */
  public static getRelatedSubjectsByPersonId(
    personId: number,
  ): CancelablePromise<Array<v0_RelatedSubject>> {
    return cachedRequest(
      OpenAPI,
      {
        method: "GET",
        url: "/v0/persons/{person_id}/subjects",
        path: {
          person_id: personId,
        },
      },
      {
        cache: true,
        ttl: CACHE_TTL.MEDIUM,
      },
    );
  }

  /**
   * get person related characters（带缓存）
   * @param personId 人物 ID
   * @returns PersonCharacter[]
   */
  public static getRelatedCharactersByPersonId(
    personId: number,
  ): CancelablePromise<Array<PersonCharacter>> {
    return cachedRequest(
      OpenAPI,
      {
        method: "GET",
        url: "/v0/persons/{person_id}/characters",
        path: {
          person_id: personId,
        },
      },
      {
        cache: true,
        ttl: CACHE_TTL.MEDIUM,
      },
    );
  }

  /**
   * Get Episodes（带缓存）
   * @param subjectId 条目 ID
   * @param type 章节类型
   * @param limit 分页参数
   * @param offset 分页参数
   * @returns Paged_Episode
   */
  public static getEpisodes(
    subjectId: SubjectID,
    type?: EpType,
    limit: number = 100,
    offset?: number,
  ): CancelablePromise<Paged_Episode> {
    return cachedRequest(
      OpenAPI,
      {
        method: "GET",
        url: "/v0/episodes",
        query: {
          subject_id: subjectId,
          type: type,
          limit: limit,
          offset: offset,
        },
      },
      {
        cache: true,
        ttl: CACHE_TTL.MEDIUM,
      },
    );
  }

  /**
   * Get Episode（带缓存）
   * @param episodeId 章节 ID
   * @returns EpisodeDetail
   */
  public static getEpisodeById(
    episodeId: number,
  ): CancelablePromise<EpisodeDetail> {
    return cachedRequest(
      OpenAPI,
      {
        method: "GET",
        url: "/v0/episodes/{episode_id}",
        path: {
          episode_id: episodeId,
        },
      },
      {
        cache: true,
        ttl: CACHE_TTL.MEDIUM,
      },
    );
  }

  /**
   * 获取用户收藏（带缓存）
   * @param username 用户名
   * @param subjectType 条目类型
   * @param type 收藏类型
   * @param limit 分页参数
   * @param offset 分页参数
   * @returns Paged_UserCollection
   */
  public static getUserCollectionsByUsername(
    username: string,
    subjectType?: SubjectType,
    type?: SubjectCollectionType,
    limit: number = 30,
    offset?: number,
  ): CancelablePromise<Paged_UserCollection> {
    return cachedRequest(
      OpenAPI,
      {
        method: "GET",
        url: "/v0/users/{username}/collections",
        path: {
          username: username,
        },
        query: {
          subject_type: subjectType,
          type: type,
          limit: limit,
          offset: offset,
        },
      },
      {
        cache: true,
        ttl: CACHE_TTL.MEDIUM,
      },
    );
  }

  /**
   * 获取用户单个条目收藏（带缓存）
   * @param username 用户名
   * @param subjectId 条目 ID
   * @returns UserSubjectCollection
   */
  public static getUserCollection(
    username: string,
    subjectId: SubjectID,
  ): CancelablePromise<UserSubjectCollection> {
    return cachedRequest(
      OpenAPI,
      {
        method: "GET",
        url: "/v0/users/{username}/collections/{subject_id}",
        path: {
          username: username,
          subject_id: subjectId,
        },
      },
      {
        cache: true,
        ttl: CACHE_TTL.MEDIUM,
      },
    );
  }

  /**
   * 章节收藏信息（带缓存）
   * @param subjectId 条目 ID
   * @param offset 分页参数
   * @param limit 分页参数
   * @param episodeType 章节类型
   * @returns Page with UserEpisodeCollection[]
   */
  public static getUserSubjectEpisodeCollection(
    subjectId: SubjectID,
    offset?: number,
    limit: number = 100,
    episodeType?: EpType,
  ): CancelablePromise<
    Page & {
      data?: Array<UserEpisodeCollection>;
    }
  > {
    return cachedRequest(
      OpenAPI,
      {
        method: "GET",
        url: "/v0/users/-/collections/{subject_id}/episodes",
        path: {
          subject_id: subjectId,
        },
        query: {
          offset: offset,
          limit: limit,
          episode_type: episodeType,
        },
      },
      {
        cache: true,
        ttl: CACHE_TTL.MEDIUM,
      },
    );
  }

  /**
   * 章节收藏信息（带缓存）
   * @param episodeId 章节 ID
   * @returns UserEpisodeCollection
   */
  public static getUserEpisodeCollection(
    episodeId: number,
  ): CancelablePromise<UserEpisodeCollection> {
    return cachedRequest(
      OpenAPI,
      {
        method: "GET",
        url: "/v0/users/-/collections/-/episodes/{episode_id}",
        path: {
          episode_id: episodeId,
        },
      },
      {
        cache: true,
        ttl: CACHE_TTL.MEDIUM,
      },
    );
  }

  /**
   * 获取用户角色收藏列表（带缓存）
   * @param username 用户名
   * @returns Paged_UserCharacterCollection
   */
  public static getUserCharacterCollections(
    username: string,
  ): CancelablePromise<Paged_UserCharacterCollection> {
    return cachedRequest(
      OpenAPI,
      {
        method: "GET",
        url: "/v0/users/{username}/collections/-/characters",
        path: {
          username: username,
        },
      },
      {
        cache: true,
        ttl: CACHE_TTL.MEDIUM,
      },
    );
  }

  /**
   * 获取用户单个角色收藏信息（带缓存）
   * @param username 用户名
   * @param characterId 角色 ID
   * @returns UserCharacterCollection
   */
  public static getUserCharacterCollection(
    username: string,
    characterId: number,
  ): CancelablePromise<UserCharacterCollection> {
    return cachedRequest(
      OpenAPI,
      {
        method: "GET",
        url: "/v0/users/{username}/collections/-/characters/{character_id}",
        path: {
          username: username,
          character_id: characterId,
        },
      },
      {
        cache: true,
        ttl: CACHE_TTL.MEDIUM,
      },
    );
  }

  /**
   * 获取用户人物收藏列表（带缓存）
   * @param username 用户名
   * @returns Paged_UserPersonCollection
   */
  public static getUserPersonCollections(
    username: string,
  ): CancelablePromise<Paged_UserPersonCollection> {
    return cachedRequest(
      OpenAPI,
      {
        method: "GET",
        url: "/v0/users/{username}/collections/-/persons",
        path: {
          username: username,
        },
      },
      {
        cache: true,
        ttl: CACHE_TTL.MEDIUM,
      },
    );
  }

  /**
   * 获取用户单个人物收藏信息（带缓存）
   * @param username 用户名
   * @param personId 人物 ID
   * @returns UserPersonCollection
   */
  public static getUserPersonCollection(
    username: string,
    personId: number,
  ): CancelablePromise<UserPersonCollection> {
    return cachedRequest(
      OpenAPI,
      {
        method: "GET",
        url: "/v0/users/{username}/collections/-/persons/{person_id}",
        path: {
          username: username,
          person_id: personId,
        },
      },
      {
        cache: true,
        ttl: CACHE_TTL.MEDIUM,
      },
    );
  }

  // 以下方法不使用缓存，因为它们是写操作或需要实时数据

  /**
   * 条目搜索
   */
  public static searchSubjects = Service.searchSubjects;

  /**
   * Get Subject Image
   */
  public static getSubjectImageById = Service.getSubjectImageById;

  /**
   * Get Subject Image
   */
  public static getCharacterImageById = Service.getCharacterImageById;

  /**
   * Collect character for current user
   */
  public static collectCharacterByCharacterIdAndUserId =
    Service.collectCharacterByCharacterIdAndUserId;

  /**
   * Uncollect character for current user
   */
  public static uncollectCharacterByCharacterIdAndUserId =
    Service.uncollectCharacterByCharacterIdAndUserId;

  /**
   * 角色搜索
   */
  public static searchCharacters = Service.searchCharacters;

  /**
   * Get Person Image
   */
  public static getPersonImageById = Service.getPersonImageById;

  /**
   * Collect person for current user
   */
  public static collectPersonByPersonIdAndUserId =
    Service.collectPersonByPersonIdAndUserId;

  /**
   * Uncollect person for current user
   */
  public static uncollectPersonByPersonIdAndUserId =
    Service.uncollectPersonByPersonIdAndUserId;

  /**
   * 人物搜索
   */
  public static searchPersons = Service.searchPersons;

  /**
   * Get User by name
   */
  public static getUserByName = Service.getUserByName;

  /**
   * Get User Avatar by name
   */
  public static getUserAvatarByName = Service.getUserAvatarByName;

  /**
   * Get User
   */
  public static getMyself = Service.getMyself;

  /**
   * 新增或修改用户单个条目收藏
   */
  public static postUserCollection = Service.postUserCollection;

  /**
   * 修改用户单个收藏
   */
  public static patchUserCollection = Service.patchUserCollection;

  /**
   * 章节收藏信息
   */
  public static patchUserSubjectEpisodeCollection =
    Service.patchUserSubjectEpisodeCollection;

  /**
   * 更新章节收藏信息
   */
  public static putUserEpisodeCollection = Service.putUserEpisodeCollection;

  /**
   * Get Person Revisions
   */
  public static getPersonRevisions = Service.getPersonRevisions;

  /**
   * Get Person Revision
   */
  public static getPersonRevisionByRevisionId =
    Service.getPersonRevisionByRevisionId;

  /**
   * Get Character Revisions
   */
  public static getCharacterRevisions = Service.getCharacterRevisions;

  /**
   * Get Character Revision
   */
  public static getCharacterRevisionByRevisionId =
    Service.getCharacterRevisionByRevisionId;

  /**
   * Get Subject Revisions
   */
  public static getSubjectRevisions = Service.getSubjectRevisions;

  /**
   * Get Subject Revision
   */
  public static getSubjectRevisionByRevisionId =
    Service.getSubjectRevisionByRevisionId;

  /**
   * Get Episode Revisions
   */
  public static getEpisodeRevisions = Service.getEpisodeRevisions;

  /**
   * Get Episode Revision
   */
  public static getEpisodeRevisionByRevisionId =
    Service.getEpisodeRevisionByRevisionId;

  /**
   * Create a new index
   */
  public static newIndex = Service.newIndex;

  /**
   * Get Index By ID
   */
  public static getIndexById = Service.getIndexById;

  /**
   * Edit index's information
   */
  public static editIndexById = Service.editIndexById;

  /**
   * Get Index Subjects
   */
  public static getIndexSubjectsByIndexId = Service.getIndexSubjectsByIndexId;

  /**
   * Add a subject to Index
   */
  public static addSubjectToIndexByIndexId = Service.addSubjectToIndexByIndexId;

  /**
   * Edit subject information in a index
   */
  public static editIndexSubjectsByIndexIdAndSubjectId =
    Service.editIndexSubjectsByIndexIdAndSubjectId;

  /**
   * Delete a subject from a Index
   */
  public static delelteSubjectFromIndexByIndexIdAndSubjectId =
    Service.delelteSubjectFromIndexByIndexIdAndSubjectId;

  /**
   * Collect index for current user
   */
  public static collectIndexByIndexIdAndUserId =
    Service.collectIndexByIndexIdAndUserId;

  /**
   * Uncollect index for current user
   */
  public static uncollectIndexByIndexIdAndUserId =
    Service.uncollectIndexByIndexIdAndUserId;
}
