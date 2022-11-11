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

import type { Observable } from 'rxjs';
import type { AjaxResponse } from 'rxjs/ajax';
import { BaseAPI, throwIfNullOrUndefined, encodeURI } from '../runtime';
import type { OperationOpts, HttpHeaders } from '../runtime';
import type {
    AuthenticationServiceExceptionDto,
    ClientCertificateDataResponseDto,
    ClientCertificateRenewRequestDto,
    ClientCertificateRevocationDto,
    ClientCertificateSignRequestDto,
    ErrorMessageDto,
    ListRevokeCertificateAttributes200ResponseInner,
    RequestAttributeDto,
} from '../models';

export interface IssueCertificateRequest {
    authorityUuid: string;
    raProfileUuid: string;
    clientCertificateSignRequestDto: ClientCertificateSignRequestDto;
}

export interface ListIssueCertificateAttributesRequest {
    authorityUuid: string;
    raProfileUuid: string;
}

export interface ListRevokeCertificateAttributesRequest {
    authorityUuid: string;
    raProfileUuid: string;
}

export interface RenewCertificateRequest {
    authorityUuid: string;
    raProfileUuid: string;
    certificateUuid: string;
    clientCertificateRenewRequestDto: ClientCertificateRenewRequestDto;
}

export interface RevokeCertificateRequest {
    authorityUuid: string;
    raProfileUuid: string;
    certificateUuid: string;
    clientCertificateRevocationDto: ClientCertificateRevocationDto;
}

export interface ValidateIssueCertificateAttributesRequest {
    authorityUuid: string;
    raProfileUuid: string;
    requestAttributeDto: Array<RequestAttributeDto>;
}

export interface ValidateRevokeCertificateAttributesRequest {
    authorityUuid: string;
    raProfileUuid: string;
    requestAttributeDto: Array<RequestAttributeDto>;
}

/**
 * no description
 */
export class V2ClientOperationsAPIApi extends BaseAPI {

    /**
     * Issue Certificate
     */
    issueCertificate({ authorityUuid, raProfileUuid, clientCertificateSignRequestDto }: IssueCertificateRequest): Observable<ClientCertificateDataResponseDto>
    issueCertificate({ authorityUuid, raProfileUuid, clientCertificateSignRequestDto }: IssueCertificateRequest, opts?: OperationOpts): Observable<AjaxResponse<ClientCertificateDataResponseDto>>
    issueCertificate({ authorityUuid, raProfileUuid, clientCertificateSignRequestDto }: IssueCertificateRequest, opts?: OperationOpts): Observable<ClientCertificateDataResponseDto | AjaxResponse<ClientCertificateDataResponseDto>> {
        throwIfNullOrUndefined(authorityUuid, 'authorityUuid', 'issueCertificate');
        throwIfNullOrUndefined(raProfileUuid, 'raProfileUuid', 'issueCertificate');
        throwIfNullOrUndefined(clientCertificateSignRequestDto, 'clientCertificateSignRequestDto', 'issueCertificate');

        const headers: HttpHeaders = {
            'Content-Type': 'application/json',
        };

        return this.request<ClientCertificateDataResponseDto>({
            url: '/v2/operations/authorities/{authorityUuid}/raProfiles/{raProfileUuid}/certificates'.replace('{authorityUuid}', encodeURI(authorityUuid)).replace('{raProfileUuid}', encodeURI(raProfileUuid)),
            method: 'POST',
            headers,
            body: clientCertificateSignRequestDto,
        }, opts?.responseOpts);
    };

    /**
     * Get issue Certificate Attributes
     */
    listIssueCertificateAttributes({ authorityUuid, raProfileUuid }: ListIssueCertificateAttributesRequest): Observable<Array<ListRevokeCertificateAttributes200ResponseInner>>
    listIssueCertificateAttributes({ authorityUuid, raProfileUuid }: ListIssueCertificateAttributesRequest, opts?: OperationOpts): Observable<AjaxResponse<Array<ListRevokeCertificateAttributes200ResponseInner>>>
    listIssueCertificateAttributes({ authorityUuid, raProfileUuid }: ListIssueCertificateAttributesRequest, opts?: OperationOpts): Observable<Array<ListRevokeCertificateAttributes200ResponseInner> | AjaxResponse<Array<ListRevokeCertificateAttributes200ResponseInner>>> {
        throwIfNullOrUndefined(authorityUuid, 'authorityUuid', 'listIssueCertificateAttributes');
        throwIfNullOrUndefined(raProfileUuid, 'raProfileUuid', 'listIssueCertificateAttributes');

        return this.request<Array<ListRevokeCertificateAttributes200ResponseInner>>({
            url: '/v2/operations/authorities/{authorityUuid}/raProfiles/{raProfileUuid}/attributes/issue'.replace('{authorityUuid}', encodeURI(authorityUuid)).replace('{raProfileUuid}', encodeURI(raProfileUuid)),
            method: 'GET',
        }, opts?.responseOpts);
    };

    /**
     * Get revocation Attributes
     */
    listRevokeCertificateAttributes({ authorityUuid, raProfileUuid }: ListRevokeCertificateAttributesRequest): Observable<Array<ListRevokeCertificateAttributes200ResponseInner>>
    listRevokeCertificateAttributes({ authorityUuid, raProfileUuid }: ListRevokeCertificateAttributesRequest, opts?: OperationOpts): Observable<AjaxResponse<Array<ListRevokeCertificateAttributes200ResponseInner>>>
    listRevokeCertificateAttributes({ authorityUuid, raProfileUuid }: ListRevokeCertificateAttributesRequest, opts?: OperationOpts): Observable<Array<ListRevokeCertificateAttributes200ResponseInner> | AjaxResponse<Array<ListRevokeCertificateAttributes200ResponseInner>>> {
        throwIfNullOrUndefined(authorityUuid, 'authorityUuid', 'listRevokeCertificateAttributes');
        throwIfNullOrUndefined(raProfileUuid, 'raProfileUuid', 'listRevokeCertificateAttributes');

        return this.request<Array<ListRevokeCertificateAttributes200ResponseInner>>({
            url: '/v2/operations/authorities/{authorityUuid}/raProfiles/{raProfileUuid}/attributes/revoke'.replace('{authorityUuid}', encodeURI(authorityUuid)).replace('{raProfileUuid}', encodeURI(raProfileUuid)),
            method: 'GET',
        }, opts?.responseOpts);
    };

    /**
     * Renew Certificate
     */
    renewCertificate({ authorityUuid, raProfileUuid, certificateUuid, clientCertificateRenewRequestDto }: RenewCertificateRequest): Observable<ClientCertificateDataResponseDto>
    renewCertificate({ authorityUuid, raProfileUuid, certificateUuid, clientCertificateRenewRequestDto }: RenewCertificateRequest, opts?: OperationOpts): Observable<AjaxResponse<ClientCertificateDataResponseDto>>
    renewCertificate({ authorityUuid, raProfileUuid, certificateUuid, clientCertificateRenewRequestDto }: RenewCertificateRequest, opts?: OperationOpts): Observable<ClientCertificateDataResponseDto | AjaxResponse<ClientCertificateDataResponseDto>> {
        throwIfNullOrUndefined(authorityUuid, 'authorityUuid', 'renewCertificate');
        throwIfNullOrUndefined(raProfileUuid, 'raProfileUuid', 'renewCertificate');
        throwIfNullOrUndefined(certificateUuid, 'certificateUuid', 'renewCertificate');
        throwIfNullOrUndefined(clientCertificateRenewRequestDto, 'clientCertificateRenewRequestDto', 'renewCertificate');

        const headers: HttpHeaders = {
            'Content-Type': 'application/json',
        };

        return this.request<ClientCertificateDataResponseDto>({
            url: '/v2/operations/authorities/{authorityUuid}/raProfiles/{raProfileUuid}/certificates/{certificateUuid}/renew'.replace('{authorityUuid}', encodeURI(authorityUuid)).replace('{raProfileUuid}', encodeURI(raProfileUuid)).replace('{certificateUuid}', encodeURI(certificateUuid)),
            method: 'POST',
            headers,
            body: clientCertificateRenewRequestDto,
        }, opts?.responseOpts);
    };

    /**
     * Revoke Certificate
     */
    revokeCertificate({ authorityUuid, raProfileUuid, certificateUuid, clientCertificateRevocationDto }: RevokeCertificateRequest): Observable<void>
    revokeCertificate({ authorityUuid, raProfileUuid, certificateUuid, clientCertificateRevocationDto }: RevokeCertificateRequest, opts?: OperationOpts): Observable<void | AjaxResponse<void>>
    revokeCertificate({ authorityUuid, raProfileUuid, certificateUuid, clientCertificateRevocationDto }: RevokeCertificateRequest, opts?: OperationOpts): Observable<void | AjaxResponse<void>> {
        throwIfNullOrUndefined(authorityUuid, 'authorityUuid', 'revokeCertificate');
        throwIfNullOrUndefined(raProfileUuid, 'raProfileUuid', 'revokeCertificate');
        throwIfNullOrUndefined(certificateUuid, 'certificateUuid', 'revokeCertificate');
        throwIfNullOrUndefined(clientCertificateRevocationDto, 'clientCertificateRevocationDto', 'revokeCertificate');

        const headers: HttpHeaders = {
            'Content-Type': 'application/json',
        };

        return this.request<void>({
            url: '/v2/operations/authorities/{authorityUuid}/raProfiles/{raProfileUuid}/certificates/{certificateUuid}/revoke'.replace('{authorityUuid}', encodeURI(authorityUuid)).replace('{raProfileUuid}', encodeURI(raProfileUuid)).replace('{certificateUuid}', encodeURI(certificateUuid)),
            method: 'POST',
            headers,
            body: clientCertificateRevocationDto,
        }, opts?.responseOpts);
    };

    /**
     * Validate issue Certificate Attributes
     */
    validateIssueCertificateAttributes({ authorityUuid, raProfileUuid, requestAttributeDto }: ValidateIssueCertificateAttributesRequest): Observable<void>
    validateIssueCertificateAttributes({ authorityUuid, raProfileUuid, requestAttributeDto }: ValidateIssueCertificateAttributesRequest, opts?: OperationOpts): Observable<void | AjaxResponse<void>>
    validateIssueCertificateAttributes({ authorityUuid, raProfileUuid, requestAttributeDto }: ValidateIssueCertificateAttributesRequest, opts?: OperationOpts): Observable<void | AjaxResponse<void>> {
        throwIfNullOrUndefined(authorityUuid, 'authorityUuid', 'validateIssueCertificateAttributes');
        throwIfNullOrUndefined(raProfileUuid, 'raProfileUuid', 'validateIssueCertificateAttributes');
        throwIfNullOrUndefined(requestAttributeDto, 'requestAttributeDto', 'validateIssueCertificateAttributes');

        const headers: HttpHeaders = {
            'Content-Type': 'application/json',
        };

        return this.request<void>({
            url: '/v2/operations/authorities/{authorityUuid}/raProfiles/{raProfileUuid}/attributes/issue/validate'.replace('{authorityUuid}', encodeURI(authorityUuid)).replace('{raProfileUuid}', encodeURI(raProfileUuid)),
            method: 'POST',
            headers,
            body: requestAttributeDto,
        }, opts?.responseOpts);
    };

    /**
     * Validate revocation Attributes
     */
    validateRevokeCertificateAttributes({ authorityUuid, raProfileUuid, requestAttributeDto }: ValidateRevokeCertificateAttributesRequest): Observable<void>
    validateRevokeCertificateAttributes({ authorityUuid, raProfileUuid, requestAttributeDto }: ValidateRevokeCertificateAttributesRequest, opts?: OperationOpts): Observable<void | AjaxResponse<void>>
    validateRevokeCertificateAttributes({ authorityUuid, raProfileUuid, requestAttributeDto }: ValidateRevokeCertificateAttributesRequest, opts?: OperationOpts): Observable<void | AjaxResponse<void>> {
        throwIfNullOrUndefined(authorityUuid, 'authorityUuid', 'validateRevokeCertificateAttributes');
        throwIfNullOrUndefined(raProfileUuid, 'raProfileUuid', 'validateRevokeCertificateAttributes');
        throwIfNullOrUndefined(requestAttributeDto, 'requestAttributeDto', 'validateRevokeCertificateAttributes');

        const headers: HttpHeaders = {
            'Content-Type': 'application/json',
        };

        return this.request<void>({
            url: '/v2/operations/authorities/{authorityUuid}/raProfiles/{raProfileUuid}/attributes/revoke/validate'.replace('{authorityUuid}', encodeURI(authorityUuid)).replace('{raProfileUuid}', encodeURI(raProfileUuid)),
            method: 'POST',
            headers,
            body: requestAttributeDto,
        }, opts?.responseOpts);
    };

}
