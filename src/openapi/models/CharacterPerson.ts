/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CharacterType } from './CharacterType';
import type { PersonImages } from './PersonImages';
import type { SubjectType } from './SubjectType';
export type CharacterPerson = {
    id: number;
    name: string;
    /**
     * 角色，机体，舰船，组织...
     */
    type: CharacterType;
    /**
     * object with some size of images, this object maybe `null`
     */
    images?: PersonImages;
    subject_id: number;
    subject_type: SubjectType;
    subject_name: string;
    subject_name_cn: string;
    staff?: string;
};

