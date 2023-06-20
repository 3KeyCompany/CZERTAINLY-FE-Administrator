// tslint:disable
/**
 * CZERTAINLY Core API
 * REST API for CZERTAINLY Core
 *
 * The version of the OpenAPI document: 2.8.1-SNAPSHOT
 * Contact: getinfo@czertainly.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import type { SchedulerJobExecutionStatus } from "./";

/**
 * @export
 * @interface ScheduledJobDetailDto
 */
export interface ScheduledJobDetailDto {
    /**
     * UUID of the scheduled job
     * @type {string}
     * @memberof ScheduledJobDetailDto
     */
    uuid: string;
    /**
     * Name of the scheduled job
     * @type {string}
     * @memberof ScheduledJobDetailDto
     */
    jobName: string;
    /**
     * CRON expression representing configuration of pattern how to run scheduled job
     * @type {string}
     * @memberof ScheduledJobDetailDto
     */
    cronExpression: string;
    /**
     * Status of the scheduled job. True = Enabled, False = Disabled
     * @type {boolean}
     * @memberof ScheduledJobDetailDto
     */
    enabled: boolean;
    /**
     * Is scheduled job triggered only once
     * @type {boolean}
     * @memberof ScheduledJobDetailDto
     */
    oneShotOnly: boolean;
    /**
     * @type {SchedulerJobExecutionStatus}
     * @memberof ScheduledJobDetailDto
     */
    lastExecutionStatus: SchedulerJobExecutionStatus;
    /**
     * @type {string}
     * @memberof ScheduledJobDetailDto
     */
    userUuid?: string;
    /**
     * @type {string}
     * @memberof ScheduledJobDetailDto
     */
    jobClassName?: string;
    /**
     * Is system scheduled job
     * @type {boolean}
     * @memberof ScheduledJobDetailDto
     */
    system: boolean;
    /**
     * @type {object}
     * @memberof ScheduledJobDetailDto
     */
    objectData?: object;
}