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
    MimeTypeCharset,
} from './';

/**
 * Type of the file uploaded
 * @export
 * @interface MimeType
 */
export interface MimeType {
    /**
     * @type {string}
     * @memberof MimeType
     */
    type?: string;
    /**
     * @type {string}
     * @memberof MimeType
     */
    subtype?: string;
    /**
     * @type {{ [key: string]: string; }}
     * @memberof MimeType
     */
    parameters?: { [key: string]: string; };
    /**
     * @type {MimeTypeCharset}
     * @memberof MimeType
     */
    charset?: MimeTypeCharset;
    /**
     * @type {boolean}
     * @memberof MimeType
     */
    wildcardSubtype?: boolean;
    /**
     * @type {boolean}
     * @memberof MimeType
     */
    wildcardType?: boolean;
    /**
     * @type {boolean}
     * @memberof MimeType
     */
    concrete?: boolean;
}