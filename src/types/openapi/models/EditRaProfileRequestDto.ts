// tslint:disable
/**
 * CZERTAINLY Core API
 * REST API for CZERTAINLY Core
 *
 * The version of the OpenAPI document: 1.5.1-SNAPSHOT
 * Contact: getinfo@czertainly.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import type {
    RequestAttributeDto,
} from './';

/**
 * @export
 * @interface EditRaProfileRequestDto
 */
export interface EditRaProfileRequestDto {
    /**
     * Description of RA Profile
     * @type {string}
     * @memberof EditRaProfileRequestDto
     */
    description?: string;
    /**
     * List of Attributes for RA Profile
     * @type {Array<RequestAttributeDto>}
     * @memberof EditRaProfileRequestDto
     */
    attributes: Array<RequestAttributeDto>;
    /**
     * Enabled flag - true = enabled; false = disabled
     * @type {boolean}
     * @memberof EditRaProfileRequestDto
     */
    enabled?: boolean;
}