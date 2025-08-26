/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SlimUser } from './SlimUser';
import type { TimelineCat } from './TimelineCat';
import type { TimelineMemo } from './TimelineMemo';
import type { TimelineSource } from './TimelineSource';
export type Timeline = {
    cat: TimelineCat;
    memo: TimelineMemo;
    source: TimelineSource;
    user?: SlimUser;
    batch: boolean;
    createdAt: number;
    id: number;
    replies: number;
    type: number;
    uid: number;
};

