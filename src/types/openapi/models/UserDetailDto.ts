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

import type { ResponseAttributeDto, RoleDto, UserCertificateDto } from './';

/**
 * @export
 * @interface UserDetailDto
 */
export interface UserDetailDto {
    /**
     * UUID of the User
     * @type {string}
     * @memberof UserDetailDto
     */
    uuid: string;
    /**
     * Username of the user
     * @type {string}
     * @memberof UserDetailDto
     */
    username: string;
    /**
     * First name of the user
     * @type {string}
     * @memberof UserDetailDto
     */
    firstName?: string;
    /**
     * Last name of the user
     * @type {string}
     * @memberof UserDetailDto
     */
    lastName?: string;
    /**
     * Email of the user
     * @type {string}
     * @memberof UserDetailDto
     */
    email?: string;
    /**
     * Description of the user
     * @type {string}
     * @memberof UserDetailDto
     */
    description?: string;
    /**
     * Group name of the user
     * @type {string}
     * @memberof UserDetailDto
     */
    groupName?: string;
    /**
     * Group UUID of the user
     * @type {string}
     * @memberof UserDetailDto
     */
    groupUuid?: string;
    /**
     * Status of the user. True = Enabled, False = Disabled
     * @type {boolean}
     * @memberof UserDetailDto
     */
    enabled: boolean;
    /**
     * Is System user. True = Yes, False = No
     * @type {boolean}
     * @memberof UserDetailDto
     */
    systemUser: boolean;
    /**
     * @type {UserCertificateDto}
     * @memberof UserDetailDto
     */
    certificate?: UserCertificateDto;
    /**
     * Roles for the user
     * @type {Array<RoleDto>}
     * @memberof UserDetailDto
     */
    roles: Array<RoleDto>;
    /**
     * List of Custom Attributes
     * @type {Array<ResponseAttributeDto>}
     * @memberof UserDetailDto
     */
    customAttributes?: Array<ResponseAttributeDto>;
}
