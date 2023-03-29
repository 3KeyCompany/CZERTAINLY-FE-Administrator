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
 * @export
 * @interface CertificateEventHistoryDto
 */
export interface CertificateEventHistoryDto {
    /**
     * UUID of the event
     * @type {string}
     * @memberof CertificateEventHistoryDto
     */
    uuid: string;
    /**
     * UUID of the Certificate
     * @type {string}
     * @memberof CertificateEventHistoryDto
     */
    certificateUuid: string;
    /**
     * Event creation time
     * @type {string}
     * @memberof CertificateEventHistoryDto
     */
    created: string;
    /**
     * Created By
     * @type {string}
     * @memberof CertificateEventHistoryDto
     */
    createdBy: string;
    /**
     * Event type
     * @type {string}
     * @memberof CertificateEventHistoryDto
     */
    event: CertificateEventHistoryDtoEventEnum;
    /**
     * Event result
     * @type {string}
     * @memberof CertificateEventHistoryDto
     */
    status: CertificateEventHistoryDtoStatusEnum;
    /**
     * Event message
     * @type {string}
     * @memberof CertificateEventHistoryDto
     */
    message: string;
    /**
     * Additional information for the event
     * @type {{ [key: string]: object; }}
     * @memberof CertificateEventHistoryDto
     */
    additionalInformation?: { [key: string]: object };
}

/**
 * @export
 * @enum {string}
 */
export enum CertificateEventHistoryDtoEventEnum {
    IssueCertificate = "Issue Certificate",
    CreateCsr = "Create CSR",
    RenewCertificate = "Renew Certificate",
    RevokeCertificate = "Revoke Certificate",
    DeleteCertificate = "Delete Certificate",
    UpdateRaProfile = "Update RA Profile",
    UpdateEntity = "Update Entity",
    UpdateGroup = "Update Group",
    UpdateOwner = "Update Owner",
    UploadCertificate = "Upload Certificate",
    CertificateDiscovered = "Certificate Discovered",
    UpdateLocation = "Update Location",
}
/**
 * @export
 * @enum {string}
 */
export enum CertificateEventHistoryDtoStatusEnum {
    Success = "SUCCESS",
    Failed = "FAILED",
}
