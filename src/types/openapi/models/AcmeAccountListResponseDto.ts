// tslint:disable
/**
 * CZERTAINLY Core API
 * REST API for CZERTAINLY Core
 *
 * The version of the OpenAPI document: 1.6.1-SNAPSHOT
 * Contact: getinfo@czertainly.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import type {
    AccountStatus,
} from './';

/**
 * @export
 * @interface AcmeAccountListResponseDto
 */
export interface AcmeAccountListResponseDto {
    /**
     * ID of the Account
     * @type {string}
     * @memberof AcmeAccountListResponseDto
     */
    accountId: string;
    /**
     * UUID of the Account
     * @type {string}
     * @memberof AcmeAccountListResponseDto
     */
    uuid: string;
    /**
     * Enabled flag. true = enabled, false=disabled
     * @type {boolean}
     * @memberof AcmeAccountListResponseDto
     */
    enabled: boolean;
    /**
     * Total number of Orders
     * @type {number}
     * @memberof AcmeAccountListResponseDto
     */
    totalOrders: number;
    /**
     * @type {AccountStatus}
     * @memberof AcmeAccountListResponseDto
     */
    status: AccountStatus;
    /**
     * Name of the RA Profile
     * @type {string}
     * @memberof AcmeAccountListResponseDto
     */
    raProfileName: string;
    /**
     * Name of the ACME Profile
     * @type {string}
     * @memberof AcmeAccountListResponseDto
     */
    acmeProfileName: string;
    /**
     * UUID of the ACME Profile
     * @type {string}
     * @memberof AcmeAccountListResponseDto
     */
    acmeProfileUuid: string;
}


