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

import type { AttributeMappingDto, RequestAttributeDto } from './';

/**
 * @export
 * @interface NotificationInstanceUpdateRequestDto
 */
export interface NotificationInstanceUpdateRequestDto {
    /**
     * Notification instance description
     * @type {string}
     * @memberof NotificationInstanceUpdateRequestDto
     */
    description?: string;
    /**
     * List of Notification instance Attributes
     * @type {Array<RequestAttributeDto>}
     * @memberof NotificationInstanceUpdateRequestDto
     */
    attributes: Array<RequestAttributeDto>;
    /**
     * List of attribute mappings between mapping attributes and (recipient) custom attributes
     * @type {Array<AttributeMappingDto>}
     * @memberof NotificationInstanceUpdateRequestDto
     */
    attributeMappings?: Array<AttributeMappingDto>;
}
