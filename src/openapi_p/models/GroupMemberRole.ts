/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * 小组成员角色
 * - -2 = 访客
 * - -1 = 游客
 * - 0 = 小组成员
 * - 1 = 小组长
 * - 2 = 小组管理员
 * - 3 = 禁言成员
 */
export enum GroupMemberRole {
    Visitor = -2,
    Guest = -1,
    Member = 0,
    Creator = 1,
    Moderator = 2,
    Blocked = 3,
}
