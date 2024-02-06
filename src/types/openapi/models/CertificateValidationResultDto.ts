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

import type { CertificateValidationCheckDto, CertificateValidationStatus } from './';

/**
 * @export
 * @interface CertificateValidationResultDto
 */
export interface CertificateValidationResultDto {
    /**
     * @type {CertificateValidationStatus}
     * @memberof CertificateValidationResultDto
     */
    resultStatus: CertificateValidationStatus;
    /**
     * Certificate validation check results
     * @type {{ [key: string]: CertificateValidationCheckDto; }}
     * @memberof CertificateValidationResultDto
     */
    validationChecks?: { [key: string]: CertificateValidationCheckDto };
}
