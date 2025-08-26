/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Reply } from './Reply';
import type { SlimGroup } from './SlimGroup';
import type { Topic } from './Topic';
export type GroupTopic = (Topic & {
    group: SlimGroup;
    replies: Array<Reply>;
});

