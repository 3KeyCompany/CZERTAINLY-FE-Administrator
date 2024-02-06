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

import type { DiscoveryStatus } from './';

/**
 * Discoveries
 * @export
 * @interface DiscoveryHistoryDto
 */
export interface DiscoveryHistoryDto {
    /**
     * Object identifier
     * @type {string}
     * @memberof DiscoveryHistoryDto
     */
    uuid: string;
    /**
     * Object Name
     * @type {string}
     * @memberof DiscoveryHistoryDto
     */
    name: string;
    /**
     * Discovery Kind
     * @type {string}
     * @memberof DiscoveryHistoryDto
     */
    kind: string;
    /**
     * @type {DiscoveryStatus}
     * @memberof DiscoveryHistoryDto
     */
    status: DiscoveryStatus;
    /**
     * Date and time when Discovery started
     * @type {string}
     * @memberof DiscoveryHistoryDto
     */
    startTime?: string | null;
    /**
     * Date and time when Discovery finished
     * @type {string}
     * @memberof DiscoveryHistoryDto
     */
    endTime?: string | null;
    /**
     * Number of certificates that are discovered
     * @type {number}
     * @memberof DiscoveryHistoryDto
     */
    totalCertificatesDiscovered?: number;
    /**
     * UUID of the Discovery Provider
     * @type {string}
     * @memberof DiscoveryHistoryDto
     */
    connectorUuid: string;
    /**
     * Name of the Discovery Provider
     * @type {string}
     * @memberof DiscoveryHistoryDto
     */
    connectorName: string;
}
