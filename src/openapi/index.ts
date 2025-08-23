/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export { ApiError } from "./core/ApiError";
export { CancelablePromise, CancelError } from "./core/CancelablePromise";
export { OpenAPI } from "./core/OpenAPI";
export type { OpenAPIConfig } from "./core/OpenAPI";
export type { Avatar } from "./models/Avatar";
export { BloodType } from "./models/BloodType";
export type { Character } from "./models/Character";
export type { CharacterPerson } from "./models/CharacterPerson";
export type { CharacterRevision } from "./models/CharacterRevision";
export type { CharacterRevisionDataItem } from "./models/CharacterRevisionDataItem";
export { CharacterType } from "./models/CharacterType";
export type { Creator } from "./models/Creator";
export type { DetailedRevision } from "./models/DetailedRevision";
export type { Episode } from "./models/Episode";
export { EpisodeCollectionType } from "./models/EpisodeCollectionType";
export type { EpisodeDetail } from "./models/EpisodeDetail";
export { EpType } from "./models/EpType";
export type { ErrorDetail } from "./models/ErrorDetail";
export type { Images } from "./models/Images";
// 注意：由于 Windows 文件系统不区分大小写，Index.ts 和 index.ts 会冲突。
// 建议将 Index.ts 重命名为其他名称（如 IndexModel.ts），然后如下导入：
// export type { IndexModel } from './models/IndexModel';
// 这里暂时注释掉 Index 的导出，避免与 index.ts 冲突。
// export type { Index } from './models/Index';
export type { IndexBasicInfo } from "./models/IndexBasicInfo";
export type { IndexSubject } from "./models/IndexSubject";
export type { IndexSubjectAddInfo } from "./models/IndexSubjectAddInfo";
export type { IndexSubjectEditInfo } from "./models/IndexSubjectEditInfo";
export type { Page } from "./models/Page";
export type { Paged_Character } from "./models/Paged_Character";
export type { Paged_Episode } from "./models/Paged_Episode";
export type { Paged_IndexSubject } from "./models/Paged_IndexSubject";
export type { Paged_Person } from "./models/Paged_Person";
export type { Paged_Revision } from "./models/Paged_Revision";
export type { Paged_Subject } from "./models/Paged_Subject";
export type { Paged_UserCharacterCollection } from "./models/Paged_UserCharacterCollection";
export type { Paged_UserCollection } from "./models/Paged_UserCollection";
export type { Paged_UserPersonCollection } from "./models/Paged_UserPersonCollection";
export type { Person } from "./models/Person";
export { PersonCareer } from "./models/PersonCareer";
export type { PersonCharacter } from "./models/PersonCharacter";
export type { PersonDetail } from "./models/PersonDetail";
export type { PersonImages } from "./models/PersonImages";
export type { PersonRevision } from "./models/PersonRevision";
export type { PersonRevisionDataItem } from "./models/PersonRevisionDataItem";
export type { PersonRevisionProfession } from "./models/PersonRevisionProfession";
export { PersonType } from "./models/PersonType";
export type { RelatedCharacter } from "./models/RelatedCharacter";
export type { RelatedPerson } from "./models/RelatedPerson";
export type { Revision } from "./models/Revision";
export type { RevisionExtra } from "./models/RevisionExtra";
export type { SlimSubject } from "./models/SlimSubject";
export type { Stat } from "./models/Stat";
export type { Subject } from "./models/Subject";
export { SubjectAnimeCategory } from "./models/SubjectAnimeCategory";
export { SubjectBookCategory } from "./models/SubjectBookCategory";
export type { SubjectCategory } from "./models/SubjectCategory";
export { SubjectCollectionType } from "./models/SubjectCollectionType";
export { SubjectGameCategory } from "./models/SubjectGameCategory";
export type { SubjectID } from "./models/SubjectID";
export { SubjectRealCategory } from "./models/SubjectRealCategory";
export type { SubjectRevision } from "./models/SubjectRevision";
export type { SubjectRevisionData } from "./models/SubjectRevisionData";
export type { SubjectTags } from "./models/SubjectTags";
export { SubjectType } from "./models/SubjectType";
export type { User } from "./models/User";
export type { UserCharacterCollection } from "./models/UserCharacterCollection";
export type { UserEpisodeCollection } from "./models/UserEpisodeCollection";
export { UserGroup } from "./models/UserGroup";
export type { UserPersonCollection } from "./models/UserPersonCollection";
export type { UserSubjectCollection } from "./models/UserSubjectCollection";
export type { UserSubjectCollectionModifyPayload } from "./models/UserSubjectCollectionModifyPayload";
export type { v0_RelatedSubject } from "./models/v0_RelatedSubject";
export type { v0_subject_relation } from "./models/v0_subject_relation";
export type { WikiV0 } from "./models/WikiV0";

export { Service } from "./services/Service";

// 缓存服务导出
export { CachedService } from "./services/CachedService";
export { clearCache, clearAllCache } from "./core/cachedRequest";
export { default as OpenAPICache } from "./core/Cache";
