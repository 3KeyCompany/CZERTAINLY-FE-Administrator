// tslint:disable
/**
 * CZERTAINLY Core API
 * REST API for CZERTAINLY Core
 *
 * The version of the OpenAPI document: 1.5.1-SNAPSHOT
 * Contact: getinfo@czertainly.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import type {
    EndEntityExtendedInfoDto,
    RaProfileDto,
} from './';

/**
 * @export
 * @interface ClientAddEndEntityRequestDto
 */
export interface ClientAddEndEntityRequestDto {
    /**
     * @type {RaProfileDto}
     * @memberof ClientAddEndEntityRequestDto
     */
    raProfile: RaProfileDto;
    /**
     * End Entity email
     * @type {string}
     * @memberof ClientAddEndEntityRequestDto
     */
    email?: string;
    /**
     * End Entity extension data
     * @type {Array<EndEntityExtendedInfoDto>}
     * @memberof ClientAddEndEntityRequestDto
     */
    extensionData?: Array<EndEntityExtendedInfoDto>;
    /**
     * End Entity password
     * @type {string}
     * @memberof ClientAddEndEntityRequestDto
     */
    password: string;
    /**
     * End Entity Subject alternative name
     * @type {string}
     * @memberof ClientAddEndEntityRequestDto
     */
    subjectAltName?: string;
    /**
     * End Entity subject domain name
     * @type {string}
     * @memberof ClientAddEndEntityRequestDto
     */
    subjectDN: string;
    /**
     * End Entity name
     * @type {string}
     * @memberof ClientAddEndEntityRequestDto
     */
    username: string;
}