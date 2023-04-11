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

import type { RequestAttributeDto } from "./";

/**
 * @export
 * @interface AcmeProfileRequestDto
 */
export interface AcmeProfileRequestDto {
    /**
     * Name of the ACME Profile
     * @type {string}
     * @memberof AcmeProfileRequestDto
     */
    name: string;
    /**
     * Description of the ACME Profile
     * @type {string}
     * @memberof AcmeProfileRequestDto
     */
    description?: string;
    /**
     * Terms of Service URL
     * @type {string}
     * @memberof AcmeProfileRequestDto
     */
    termsOfServiceUrl?: string;
    /**
     * Website URL
     * @type {string}
     * @memberof AcmeProfileRequestDto
     */
    websiteUrl?: string;
    /**
     * DNS Resolver IP address
     * @type {string}
     * @memberof AcmeProfileRequestDto
     */
    dnsResolverIp?: string;
    /**
     * DNS Resolver port number
     * @type {string}
     * @memberof AcmeProfileRequestDto
     */
    dnsResolverPort?: string;
    /**
     * RA Profile UUID
     * @type {string}
     * @memberof AcmeProfileRequestDto
     */
    raProfileUuid?: string;
    /**
     * Retry interval for the Orders
     * @type {number}
     * @memberof AcmeProfileRequestDto
     */
    retryInterval?: number;
    /**
     * Order Validity
     * @type {number}
     * @memberof AcmeProfileRequestDto
     */
    validity?: number;
    /**
     * List of Attributes to issue Certificate
     * @type {Array<RequestAttributeDto>}
     * @memberof AcmeProfileRequestDto
     */
    issueCertificateAttributes: Array<RequestAttributeDto>;
    /**
     * List of Attributes to revoke Certificate
     * @type {Array<RequestAttributeDto>}
     * @memberof AcmeProfileRequestDto
     */
    revokeCertificateAttributes: Array<RequestAttributeDto>;
    /**
     * Require contact information for new Account
     * @type {boolean}
     * @memberof AcmeProfileRequestDto
     */
    requireContact?: boolean;
    /**
     * Require new Account to agree on Terms of Service
     * @type {boolean}
     * @memberof AcmeProfileRequestDto
     */
    requireTermsOfService?: boolean;
    /**
     * List of Custom Attributes
     * @type {Array<RequestAttributeDto>}
     * @memberof AcmeProfileRequestDto
     */
    customAttributes?: Array<RequestAttributeDto>;
}
