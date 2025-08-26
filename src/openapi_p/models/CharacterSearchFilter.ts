/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type CharacterSearchFilter = {
    /**
     * 无权限的用户会直接忽略此字段，不会返回 R18 条目。
     * `null` 或者 `true` 会返回包含 R18 的所有搜索结果。
     * `false` 只会返回非 R18 条目。
     */
    nsfw?: boolean;
};

