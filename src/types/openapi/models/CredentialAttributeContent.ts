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

import type { CredentialAttributeContentData } from './';

/**
 * @export
 * @interface CredentialAttributeContent
 */
export interface CredentialAttributeContent {
    /**
     * Content Reference
     * @type {string}
     * @memberof CredentialAttributeContent
     */
    reference?: string;
    /**
     * @type {CredentialAttributeContentData}
     * @memberof CredentialAttributeContent
     */
    data: CredentialAttributeContentData;
}
