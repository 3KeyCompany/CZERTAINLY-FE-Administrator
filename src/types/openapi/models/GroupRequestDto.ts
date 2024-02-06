// tslint:disable
/**
 * CZERTAINLY Core API
 * REST API for CZERTAINLY Core
 *
 * The version of the OpenAPI document: 2.10.1-SNAPSHOT
 * Contact: getinfo@czertainly.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import type { RequestAttributeDto } from './';

/**
 * @export
 * @interface GroupRequestDto
 */
export interface GroupRequestDto {
    /**
     * Name of the Group
     * @type {string}
     * @memberof GroupRequestDto
     */
    name: string;
    /**
     * Description of the Group
     * @type {string}
     * @memberof GroupRequestDto
     */
    description?: string;
    /**
     * Group contact email
     * @type {string}
     * @memberof GroupRequestDto
     */
    email?: string;
    /**
     * List of Custom Attributes
     * @type {Array<RequestAttributeDto>}
     * @memberof GroupRequestDto
     */
    customAttributes?: Array<RequestAttributeDto>;
}
