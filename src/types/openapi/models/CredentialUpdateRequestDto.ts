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
 * @interface CredentialUpdateRequestDto
 */
export interface CredentialUpdateRequestDto {
    /**
     * List of Credential Attributes
     * @type {Array<RequestAttributeDto>}
     * @memberof CredentialUpdateRequestDto
     */
    attributes: Array<RequestAttributeDto>;
    /**
     * List of Custom Attributes
     * @type {Array<RequestAttributeDto>}
     * @memberof CredentialUpdateRequestDto
     */
    customAttributes?: Array<RequestAttributeDto>;
}
