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

/**
 * Certificate filter input
 * @export
 * @interface SearchFilterRequestDto
 */
export interface SearchFilterRequestDto {
    /**
     * Field to search
     * @type {string}
     * @memberof SearchFilterRequestDto
     */
    field: SearchFilterRequestDtoFieldEnum;
    /**
     * Condition for the search
     * @type {string}
     * @memberof SearchFilterRequestDto
     */
    condition: SearchFilterRequestDtoConditionEnum;
    /**
     * Value to match
     * @type {object}
     * @memberof SearchFilterRequestDto
     */
    value?: object;
}

/**
 * @export
 * @enum {string}
 */
export enum SearchFilterRequestDtoFieldEnum {
    CommonName = 'commonName',
    SerialNumber = 'serialNumber',
    RaProfile = 'raProfile',
    Entity = 'entity',
    Status = 'status',
    ComplianceStatus = 'complianceStatus',
    Group = 'group',
    Owner = 'owner',
    IssuerCommonName = 'issuerCommonName',
    SignatureAlgorithm = 'signatureAlgorithm',
    Fingerprint = 'fingerprint',
    NotAfter = 'notAfter',
    NotBefore = 'notBefore',
    PublicKeyAlgorithm = 'publicKeyAlgorithm',
    KeySize = 'keySize',
    KeyUsage = 'keyUsage',
    BasicConstraints = 'basicConstraints',
    Meta = 'meta',
    SubjectAlternativeNames = 'subjectAlternativeNames',
    SubjectDn = 'subjectDn',
    IssuerDn = 'issuerDn',
    IssuerSerialNumber = 'issuerSerialNumber',
    OcspValidation = 'ocspValidation',
    CrlValidation = 'crlValidation',
    SignatureValidation = 'signatureValidation'
}
/**
 * @export
 * @enum {string}
 */
export enum SearchFilterRequestDtoConditionEnum {
    Equals = 'EQUALS',
    NotEquals = 'NOT_EQUALS',
    Greater = 'GREATER',
    Lesser = 'LESSER',
    Contains = 'CONTAINS',
    NotContains = 'NOT_CONTAINS',
    StartsWith = 'STARTS_WITH',
    EndsWith = 'ENDS_WITH',
    Empty = 'EMPTY',
    NotEmpty = 'NOT_EMPTY',
    Success = 'SUCCESS',
    Failed = 'FAILED',
    Unknown = 'UNKNOWN',
    NotChecked = 'NOT_CHECKED'
}

