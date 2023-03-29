// tslint:disable
/**
 * CZERTAINLY Core API
 * REST API for CZERTAINLY Core
 *
 * The version of the OpenAPI document: 2.7.1-SNAPSHOT
 * Contact: getinfo@czertainly.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

/**
 * Signatures
 * @export
 * @interface SignatureResponseData
 */
export interface SignatureResponseData {
    /**
     * Base64 encoded signature data
     * @type {string}
     * @memberof SignatureResponseData
     */
    data: string;
    /**
     * Custom identifier of the data, that should be the same as in the request, if available
     * @type {string}
     * @memberof SignatureResponseData
     */
    identifier?: string;
    /**
     * Additional details of the data, for example, the data type, error handling, etc.
     * @type {object}
     * @memberof SignatureResponseData
     */
    details?: object;
}
