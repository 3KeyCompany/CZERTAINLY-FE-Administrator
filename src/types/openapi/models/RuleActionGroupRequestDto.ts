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
    RuleActionRequestDto,
} from './';

/**
 * @export
 * @interface RuleActionGroupRequestDto
 */
export interface RuleActionGroupRequestDto {
    /**
     * Name of the Rule Action Group
     * @type {string}
     * @memberof RuleActionGroupRequestDto
     */
    name: string;
    /**
     * Description of the Rule Action Group
     * @type {string}
     * @memberof RuleActionGroupRequestDto
     */
    description?: string;
    /**
     * @type {Resource}
     * @memberof RuleActionGroupRequestDto
     */
    resource: Resource;
    /**
     * List of new Rule Actions to add in the Rule Actions Group
     * @type {Array<RuleActionRequestDto>}
     * @memberof RuleActionGroupRequestDto
     */
    actions: Array<RuleActionRequestDto>;
}


