// tslint:disable
/**
 * CZERTAINLY Core API
 * REST API for CZERTAINLY Core
 *
 * The version of the OpenAPI document: 2.11.1-SNAPSHOT
 * Contact: getinfo@czertainly.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import type {
    Resource,
} from './';

/**
 * List of condition groups in the Rule
 * @export
 * @interface RuleConditionGroupDto
 */
export interface RuleConditionGroupDto {
    /**
     * Object identifier
     * @type {string}
     * @memberof RuleConditionGroupDto
     */
    uuid: string;
    /**
     * Object Name
     * @type {string}
     * @memberof RuleConditionGroupDto
     */
    name: string;
    /**
     * Description of the Rule Condition Group
     * @type {string}
     * @memberof RuleConditionGroupDto
     */
    description?: string;
    /**
     * @type {Resource}
     * @memberof RuleConditionGroupDto
     */
    resource: Resource;
}


