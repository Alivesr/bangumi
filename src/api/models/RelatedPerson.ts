/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PersonCareer } from './PersonCareer';
import type { PersonImages } from './PersonImages';
import type { PersonType } from './PersonType';
export type RelatedPerson = {
    id: number;
    name: string;
    /**
     * `1`, `2`, `3` 表示 `个人`, `公司`, `组合`
     */
    type: PersonType;
    career: Array<PersonCareer>;
    /**
     * object with some size of images, this object maybe `null`
     */
    images?: PersonImages;
    relation: string;
    /**
     * 参与章节/曲目
     */
    eps: string;
};

