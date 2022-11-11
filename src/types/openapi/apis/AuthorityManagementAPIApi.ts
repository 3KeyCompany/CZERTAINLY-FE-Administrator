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
    AuthorityInstanceDto,
    AuthorityInstanceRequestDto,
    AuthorityInstanceUpdateRequestDto,
    BulkActionMessageDto,
    ErrorMessageDto,
    ListLocationAttributes200ResponseInner,
    RequestAttributeDto,
    UuidDto,
} from '../models';

export interface BulkDeleteAuthorityInstanceRequest {
    requestBody: Array<string>;
}

export interface CreateAuthorityInstanceRequest {
    authorityInstanceRequestDto: AuthorityInstanceRequestDto;
}

export interface DeleteAuthorityInstanceRequest {
    uuid: string;
}

export interface EditAuthorityInstanceRequest {
    uuid: string;
    authorityInstanceUpdateRequestDto: AuthorityInstanceUpdateRequestDto;
}

export interface ForceDeleteAuthorityInstancesRequest {
    requestBody: Array<string>;
}

export interface GetAuthorityInstanceRequest {
    uuid: string;
}

export interface ListCAsInProfileRequest {
    uuid: string;
    endEntityProfileId: number;
}

export interface ListCertificateProfilesRequest {
    uuid: string;
    endEntityProfileId: number;
}

export interface ListEntityProfilesRequest {
    uuid: string;
}

export interface ListRAProfileAttributesRequest {
    uuid: string;
}

export interface ValidateRAProfileAttributesRequest {
    uuid: string;
    requestAttributeDto: Array<RequestAttributeDto>;
}

/**
 * no description
 */
export class AuthorityManagementAPIApi extends BaseAPI {

    /**
     * Delete multiple Authority instances
     */
    bulkDeleteAuthorityInstance({ requestBody }: BulkDeleteAuthorityInstanceRequest): Observable<Array<BulkActionMessageDto>>
    bulkDeleteAuthorityInstance({ requestBody }: BulkDeleteAuthorityInstanceRequest, opts?: OperationOpts): Observable<AjaxResponse<Array<BulkActionMessageDto>>>
    bulkDeleteAuthorityInstance({ requestBody }: BulkDeleteAuthorityInstanceRequest, opts?: OperationOpts): Observable<Array<BulkActionMessageDto> | AjaxResponse<Array<BulkActionMessageDto>>> {
        throwIfNullOrUndefined(requestBody, 'requestBody', 'bulkDeleteAuthorityInstance');

        const headers: HttpHeaders = {
            'Content-Type': 'application/json',
        };

        return this.request<Array<BulkActionMessageDto>>({
            url: '/v1/authorities',
            method: 'DELETE',
            headers,
            body: requestBody,
        }, opts?.responseOpts);
    };

    /**
     * Add Authority instance
     */
    createAuthorityInstance({ authorityInstanceRequestDto }: CreateAuthorityInstanceRequest): Observable<UuidDto>
    createAuthorityInstance({ authorityInstanceRequestDto }: CreateAuthorityInstanceRequest, opts?: OperationOpts): Observable<AjaxResponse<UuidDto>>
    createAuthorityInstance({ authorityInstanceRequestDto }: CreateAuthorityInstanceRequest, opts?: OperationOpts): Observable<UuidDto | AjaxResponse<UuidDto>> {
        throwIfNullOrUndefined(authorityInstanceRequestDto, 'authorityInstanceRequestDto', 'createAuthorityInstance');

        const headers: HttpHeaders = {
            'Content-Type': 'application/json',
        };

        return this.request<UuidDto>({
            url: '/v1/authorities',
            method: 'POST',
            headers,
            body: authorityInstanceRequestDto,
        }, opts?.responseOpts);
    };

    /**
     * Delete Authority instance
     */
    deleteAuthorityInstance({ uuid }: DeleteAuthorityInstanceRequest): Observable<void>
    deleteAuthorityInstance({ uuid }: DeleteAuthorityInstanceRequest, opts?: OperationOpts): Observable<void | AjaxResponse<void>>
    deleteAuthorityInstance({ uuid }: DeleteAuthorityInstanceRequest, opts?: OperationOpts): Observable<void | AjaxResponse<void>> {
        throwIfNullOrUndefined(uuid, 'uuid', 'deleteAuthorityInstance');

        return this.request<void>({
            url: '/v1/authorities/{uuid}'.replace('{uuid}', encodeURI(uuid)),
            method: 'DELETE',
        }, opts?.responseOpts);
    };

    /**
     * Edit Authority instance
     */
    editAuthorityInstance({ uuid, authorityInstanceUpdateRequestDto }: EditAuthorityInstanceRequest): Observable<AuthorityInstanceDto>
    editAuthorityInstance({ uuid, authorityInstanceUpdateRequestDto }: EditAuthorityInstanceRequest, opts?: OperationOpts): Observable<AjaxResponse<AuthorityInstanceDto>>
    editAuthorityInstance({ uuid, authorityInstanceUpdateRequestDto }: EditAuthorityInstanceRequest, opts?: OperationOpts): Observable<AuthorityInstanceDto | AjaxResponse<AuthorityInstanceDto>> {
        throwIfNullOrUndefined(uuid, 'uuid', 'editAuthorityInstance');
        throwIfNullOrUndefined(authorityInstanceUpdateRequestDto, 'authorityInstanceUpdateRequestDto', 'editAuthorityInstance');

        const headers: HttpHeaders = {
            'Content-Type': 'application/json',
        };

        return this.request<AuthorityInstanceDto>({
            url: '/v1/authorities/{uuid}'.replace('{uuid}', encodeURI(uuid)),
            method: 'PUT',
            headers,
            body: authorityInstanceUpdateRequestDto,
        }, opts?.responseOpts);
    };

    /**
     * Force delete multiple Authority instances
     */
    forceDeleteAuthorityInstances({ requestBody }: ForceDeleteAuthorityInstancesRequest): Observable<Array<BulkActionMessageDto>>
    forceDeleteAuthorityInstances({ requestBody }: ForceDeleteAuthorityInstancesRequest, opts?: OperationOpts): Observable<AjaxResponse<Array<BulkActionMessageDto>>>
    forceDeleteAuthorityInstances({ requestBody }: ForceDeleteAuthorityInstancesRequest, opts?: OperationOpts): Observable<Array<BulkActionMessageDto> | AjaxResponse<Array<BulkActionMessageDto>>> {
        throwIfNullOrUndefined(requestBody, 'requestBody', 'forceDeleteAuthorityInstances');

        const headers: HttpHeaders = {
            'Content-Type': 'application/json',
        };

        return this.request<Array<BulkActionMessageDto>>({
            url: '/v1/authorities/force',
            method: 'DELETE',
            headers,
            body: requestBody,
        }, opts?.responseOpts);
    };

    /**
     * Details of an Authority instance
     */
    getAuthorityInstance({ uuid }: GetAuthorityInstanceRequest): Observable<AuthorityInstanceDto>
    getAuthorityInstance({ uuid }: GetAuthorityInstanceRequest, opts?: OperationOpts): Observable<AjaxResponse<AuthorityInstanceDto>>
    getAuthorityInstance({ uuid }: GetAuthorityInstanceRequest, opts?: OperationOpts): Observable<AuthorityInstanceDto | AjaxResponse<AuthorityInstanceDto>> {
        throwIfNullOrUndefined(uuid, 'uuid', 'getAuthorityInstance');

        return this.request<AuthorityInstanceDto>({
            url: '/v1/authorities/{uuid}'.replace('{uuid}', encodeURI(uuid)),
            method: 'GET',
        }, opts?.responseOpts);
    };

    /**
     * List of available Authority instances
     */
    listAuthorityInstances(): Observable<Array<AuthorityInstanceDto>>
    listAuthorityInstances(opts?: OperationOpts): Observable<AjaxResponse<Array<AuthorityInstanceDto>>>
    listAuthorityInstances(opts?: OperationOpts): Observable<Array<AuthorityInstanceDto> | AjaxResponse<Array<AuthorityInstanceDto>>> {
        return this.request<Array<AuthorityInstanceDto>>({
            url: '/v1/authorities',
            method: 'GET',
        }, opts?.responseOpts);
    };

    /**
     */
    listCAsInProfile({ uuid, endEntityProfileId }: ListCAsInProfileRequest): Observable<void>
    listCAsInProfile({ uuid, endEntityProfileId }: ListCAsInProfileRequest, opts?: OperationOpts): Observable<void | AjaxResponse<void>>
    listCAsInProfile({ uuid, endEntityProfileId }: ListCAsInProfileRequest, opts?: OperationOpts): Observable<void | AjaxResponse<void>> {
        throwIfNullOrUndefined(uuid, 'uuid', 'listCAsInProfile');
        throwIfNullOrUndefined(endEntityProfileId, 'endEntityProfileId', 'listCAsInProfile');

        return this.request<void>({
            url: '/v1/authorities/{uuid}/endentityprofiles/{endEntityProfileId}/cas'.replace('{uuid}', encodeURI(uuid)).replace('{endEntityProfileId}', encodeURI(endEntityProfileId)),
            method: 'GET',
        }, opts?.responseOpts);
    };

    /**
     */
    listCertificateProfiles({ uuid, endEntityProfileId }: ListCertificateProfilesRequest): Observable<void>
    listCertificateProfiles({ uuid, endEntityProfileId }: ListCertificateProfilesRequest, opts?: OperationOpts): Observable<void | AjaxResponse<void>>
    listCertificateProfiles({ uuid, endEntityProfileId }: ListCertificateProfilesRequest, opts?: OperationOpts): Observable<void | AjaxResponse<void>> {
        throwIfNullOrUndefined(uuid, 'uuid', 'listCertificateProfiles');
        throwIfNullOrUndefined(endEntityProfileId, 'endEntityProfileId', 'listCertificateProfiles');

        return this.request<void>({
            url: '/v1/authorities/{uuid}/endentityprofiles/{endEntityProfileId}/certificateprofiles'.replace('{uuid}', encodeURI(uuid)).replace('{endEntityProfileId}', encodeURI(endEntityProfileId)),
            method: 'GET',
        }, opts?.responseOpts);
    };

    /**
     */
    listEntityProfiles({ uuid }: ListEntityProfilesRequest): Observable<void>
    listEntityProfiles({ uuid }: ListEntityProfilesRequest, opts?: OperationOpts): Observable<void | AjaxResponse<void>>
    listEntityProfiles({ uuid }: ListEntityProfilesRequest, opts?: OperationOpts): Observable<void | AjaxResponse<void>> {
        throwIfNullOrUndefined(uuid, 'uuid', 'listEntityProfiles');

        return this.request<void>({
            url: '/v1/authorities/{uuid}/endentityprofiles'.replace('{uuid}', encodeURI(uuid)),
            method: 'GET',
        }, opts?.responseOpts);
    };

    /**
     * List RA Profile Attributes
     */
    listRAProfileAttributes({ uuid }: ListRAProfileAttributesRequest): Observable<Array<ListLocationAttributes200ResponseInner>>
    listRAProfileAttributes({ uuid }: ListRAProfileAttributesRequest, opts?: OperationOpts): Observable<AjaxResponse<Array<ListLocationAttributes200ResponseInner>>>
    listRAProfileAttributes({ uuid }: ListRAProfileAttributesRequest, opts?: OperationOpts): Observable<Array<ListLocationAttributes200ResponseInner> | AjaxResponse<Array<ListLocationAttributes200ResponseInner>>> {
        throwIfNullOrUndefined(uuid, 'uuid', 'listRAProfileAttributes');

        return this.request<Array<ListLocationAttributes200ResponseInner>>({
            url: '/v1/authorities/{uuid}/attributes/raProfile'.replace('{uuid}', encodeURI(uuid)),
            method: 'GET',
        }, opts?.responseOpts);
    };

    /**
     * Validate RA Profile Attributes
     */
    validateRAProfileAttributes({ uuid, requestAttributeDto }: ValidateRAProfileAttributesRequest): Observable<void>
    validateRAProfileAttributes({ uuid, requestAttributeDto }: ValidateRAProfileAttributesRequest, opts?: OperationOpts): Observable<void | AjaxResponse<void>>
    validateRAProfileAttributes({ uuid, requestAttributeDto }: ValidateRAProfileAttributesRequest, opts?: OperationOpts): Observable<void | AjaxResponse<void>> {
        throwIfNullOrUndefined(uuid, 'uuid', 'validateRAProfileAttributes');
        throwIfNullOrUndefined(requestAttributeDto, 'requestAttributeDto', 'validateRAProfileAttributes');

        const headers: HttpHeaders = {
            'Content-Type': 'application/json',
        };

        return this.request<void>({
            url: '/v1/authorities/{uuid}/attributes/raProfile/validate'.replace('{uuid}', encodeURI(uuid)),
            method: 'POST',
            headers,
            body: requestAttributeDto,
        }, opts?.responseOpts);
    };

}
