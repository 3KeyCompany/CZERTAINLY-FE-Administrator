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
    RuleConditionRequestDto,
} from './';

/**
 * List of new condition groups to add in the Rule
 * @export
 * @interface RuleConditionGroupRequestDto
 */
export interface RuleConditionGroupRequestDto {
    /**
     * Name of the Rule Condition Group
     * @type {string}
     * @memberof RuleConditionGroupRequestDto
     */
    name: string;
    /**
     * Description of the Rule Condition Group
     * @type {string}
     * @memberof RuleConditionGroupRequestDto
     */
    description?: string;
    /**
     * @type {Resource}
     * @memberof RuleConditionGroupRequestDto
     */
    resource: Resource;
    /**
     * List of the Rule Conditions to add in the Rule Condition Group
     * @type {Array<RuleConditionRequestDto>}
     * @memberof RuleConditionGroupRequestDto
     */
    conditions: Array<RuleConditionRequestDto>;
}


