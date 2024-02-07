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

import type {
    RequestAttributeDto,
} from './';

/**
 * @export
 * @interface AuthorityInstanceRequestDto
 */
export interface AuthorityInstanceRequestDto {
    /**
     * Authority instance name
     * @type {string}
     * @memberof AuthorityInstanceRequestDto
     */
    name: string;
    /**
     * List of Authority instance Attributes
     * @type {Array<RequestAttributeDto>}
     * @memberof AuthorityInstanceRequestDto
     */
    attributes: Array<RequestAttributeDto>;
    /**
     * List of Custom Attributes
     * @type {Array<RequestAttributeDto>}
     * @memberof AuthorityInstanceRequestDto
     */
    customAttributes?: Array<RequestAttributeDto>;
    /**
     * UUID of Authority provider
     * @type {string}
     * @memberof AuthorityInstanceRequestDto
     */
    connectorUuid: string;
    /**
     * Authority instance Kind
     * @type {string}
     * @memberof AuthorityInstanceRequestDto
     */
    kind: string;
}
