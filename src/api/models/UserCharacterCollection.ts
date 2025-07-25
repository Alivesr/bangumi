/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CharacterType } from './CharacterType';
import type { PersonImages } from './PersonImages';
export type UserCharacterCollection = {
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
    created_at: string;
};

