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

import type { SearchFilterRequestDto } from './';

/**
 * @export
 * @interface MultipleCertificateObjectUpdateDto
 */
export interface MultipleCertificateObjectUpdateDto {
    /**
     * Certificate Group UUID (set to empty string to remove certificate from group)
     * @type {string}
     * @memberof MultipleCertificateObjectUpdateDto
     */
    groupUuid?: string;
    /**
     * Certificate owner user UUID (set to empty string to remove owner of certificate)
     * @type {string}
     * @memberof MultipleCertificateObjectUpdateDto
     */
    ownerUuid?: string;
    /**
     * RA Profile UUID (set to empty string to remove certificate from RA profile)
     * @type {string}
     * @memberof MultipleCertificateObjectUpdateDto
     */
    raProfileUuid?: string;
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
