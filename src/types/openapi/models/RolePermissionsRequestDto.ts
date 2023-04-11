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

import type { ResourcePermissionsRequestDto } from "./";

/**
 * @export
 * @interface RolePermissionsRequestDto
 */
export interface RolePermissionsRequestDto {
    /**
     * Allow all resources, True = Yes, False = No
     * @type {boolean}
     * @memberof RolePermissionsRequestDto
     */
    allowAllResources: boolean;
    /**
     * Resources
     * @type {Array<ResourcePermissionsRequestDto>}
     * @memberof RolePermissionsRequestDto
     */
    resources?: Array<ResourcePermissionsRequestDto>;
}
