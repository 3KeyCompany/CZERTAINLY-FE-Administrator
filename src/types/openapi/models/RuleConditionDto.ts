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
    FilterConditionOperator,
    FilterFieldSource,
} from './';

/**
 * List of conditions in the Rule
 * @export
 * @interface RuleConditionDto
 */
export interface RuleConditionDto {
    /**
     * UUID of the Rule Condition
     * @type {string}
     * @memberof RuleConditionDto
     */
    uuid: string;
    /**
     * @type {FilterFieldSource}
     * @memberof RuleConditionDto
     */
    fieldSource: FilterFieldSource;
    /**
     * Field identifier of the Rule Condition
     * @type {string}
     * @memberof RuleConditionDto
     */
    fieldIdentifier: string;
    /**
     * @type {FilterConditionOperator}
     * @memberof RuleConditionDto
     */
    operator: FilterConditionOperator;
    /**
     * Value of the Rule Condition
     * @type {object}
     * @memberof RuleConditionDto
     */
    value?: object;
}


