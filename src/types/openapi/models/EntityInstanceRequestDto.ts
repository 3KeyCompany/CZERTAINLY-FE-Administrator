// tslint:disable
/**
 * CZERTAINLY Core API
 * REST API for CZERTAINLY Core
 *
 * The version of the OpenAPI document: 2.7.2-SNAPSHOT
 * Contact: getinfo@czertainly.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import type { RequestAttributeDto } from "./";

/**
 * @export
 * @interface EntityInstanceRequestDto
 */
export interface EntityInstanceRequestDto {
    /**
     * Entity instance name
     * @type {string}
     * @memberof EntityInstanceRequestDto
     */
    name: string;
    /**
     * List of Entity instance Attributes
     * @type {Array<RequestAttributeDto>}
     * @memberof EntityInstanceRequestDto
     */
    attributes: Array<RequestAttributeDto>;
    /**
     * List of Custom Attributes
     * @type {Array<RequestAttributeDto>}
     * @memberof EntityInstanceRequestDto
     */
    customAttributes?: Array<RequestAttributeDto>;
    /**
     * UUID of Entity Provider
     * @type {string}
     * @memberof EntityInstanceRequestDto
     */
    connectorUuid: string;
    /**
     * Entity instance Kind
     * @type {string}
     * @memberof EntityInstanceRequestDto
     */
    kind: string;
}
