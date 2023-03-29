// tslint:disable
/**
 * CZERTAINLY Core API
 * REST API for CZERTAINLY Core
 *
 * The version of the OpenAPI document: 2.7.1-SNAPSHOT
 * Contact: getinfo@czertainly.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import type { SearchFilterRequestDto } from "./";

/**
 * @export
 * @interface MultipleCertificateObjectUpdateDto
 */
export interface MultipleCertificateObjectUpdateDto {
    /**
     * UUID of the RA Profile
     * @type {string}
     * @memberof MultipleCertificateObjectUpdateDto
     */
    raProfileUuid?: string;
    /**
     * UUID of the Certificate Group
     * @type {string}
     * @memberof MultipleCertificateObjectUpdateDto
     */
    groupUuid?: string;
    /**
     * Certificate Owner
     * @type {string}
     * @memberof MultipleCertificateObjectUpdateDto
     */
    owner?: string;
    /**
     * List of Certificate UUIDs
     * @type {Array<string>}
     * @memberof MultipleCertificateObjectUpdateDto
     */
    certificateUuids?: Array<string>;
    /**
     * Certificate filter input
     * @type {Array<SearchFilterRequestDto>}
     * @memberof MultipleCertificateObjectUpdateDto
     */
    filters?: Array<SearchFilterRequestDto>;
}
