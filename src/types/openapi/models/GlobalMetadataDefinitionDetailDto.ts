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

import type { AttributeContentType, AttributeType } from "./";

/**
 * @export
 * @interface GlobalMetadataDefinitionDetailDto
 */
export interface GlobalMetadataDefinitionDetailDto {
    /**
     * UUID of the Attribute
     * @type {string}
     * @memberof GlobalMetadataDefinitionDetailDto
     */
    uuid: string;
    /**
     * Name of the Attribute
     * @type {string}
     * @memberof GlobalMetadataDefinitionDetailDto
     */
    name: string;
    /**
     * @type {AttributeContentType}
     * @memberof GlobalMetadataDefinitionDetailDto
     */
    contentType: AttributeContentType;
    /**
     * Attribute description
     * @type {string}
     * @memberof GlobalMetadataDefinitionDetailDto
     */
    description: string;
    /**
     * Boolean determining if the Attribute is enabled. Required only for Custom Attribute
     * @type {boolean}
     * @memberof GlobalMetadataDefinitionDetailDto
     */
    enabled?: boolean;
    /**
     * @type {AttributeType}
     * @memberof GlobalMetadataDefinitionDetailDto
     */
    type: AttributeType;
    /**
     * Friendly name of the the Attribute
     * @type {string}
     * @memberof GlobalMetadataDefinitionDetailDto
     */
    label: string;
    /**
     * Boolean determining if the Attribute is visible and can be displayed, otherwise it should be hidden to the user.
     * @type {boolean}
     * @memberof GlobalMetadataDefinitionDetailDto
     */
    visible?: boolean;
    /**
     * Group of the Attribute, used for the logical grouping of the Attribute
     * @type {string}
     * @memberof GlobalMetadataDefinitionDetailDto
     */
    group?: string;
}
