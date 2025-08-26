/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Episode } from './Episode';
import type { Reaction } from './Reaction';
import type { SlimBlogEntry } from './SlimBlogEntry';
import type { SlimCharacter } from './SlimCharacter';
import type { SlimGroup } from './SlimGroup';
import type { SlimIndex } from './SlimIndex';
import type { SlimPerson } from './SlimPerson';
import type { SlimSubject } from './SlimSubject';
import type { SlimUser } from './SlimUser';
export type TimelineMemo = {
    blog?: SlimBlogEntry;
    index?: SlimIndex;
    wiki?: {
        subject?: SlimSubject;
    };
    daily?: {
        groups?: Array<SlimGroup>;
        users?: Array<SlimUser>;
    };
    mono?: {
        characters: Array<SlimCharacter>;
        persons: Array<SlimPerson>;
    };
    subject?: Array<{
        subject: SlimSubject;
        collectID?: number;
        comment: string;
        rate?: number;
        reactions?: Array<Reaction>;
    }>;
    progress?: {
        single?: {
            episode: Episode;
            subject: SlimSubject;
        };
        batch?: {
            subject: SlimSubject;
            epsTotal: string;
            epsUpdate?: number;
            volsTotal: string;
            volsUpdate?: number;
        };
    };
    status?: {
        sign?: string;
        tsukkomi?: string;
        nickname?: {
            after: string;
            before: string;
        };
    };
};

