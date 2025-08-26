/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Reply } from './Reply';
import type { SlimSubject } from './SlimSubject';
import type { Topic } from './Topic';
export type SubjectTopic = (Topic & {
    subject: SlimSubject;
    replies: Array<Reply>;
});

