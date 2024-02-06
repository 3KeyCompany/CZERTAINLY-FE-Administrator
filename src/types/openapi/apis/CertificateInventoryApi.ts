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

import type { Observable } from 'rxjs';
import type { AjaxResponse } from 'rxjs/ajax';
import type {
    ApprovalResponseDto,
    BaseAttributeDto,
    BulkOperationResponse,
    CertificateChainDownloadResponseDto,
    CertificateChainResponseDto,
    CertificateComplianceCheckDto,
    CertificateContentDto,
    CertificateDetailDto,
    CertificateDownloadResponseDto,
    CertificateEventHistoryDto,
    CertificateFormat,
    CertificateFormatEncoding,
    CertificateResponseDto,
    CertificateUpdateObjectsDto,
    CertificateValidationResultDto,
    ClientCertificateRequestDto,
    LocationDto,
    MultipleCertificateObjectUpdateDto,
    PaginationRequestDto,
    RemoveCertificateDto,
    SearchFieldDataByGroupDto,
    SearchRequestDto,
    UploadCertificateRequestDto,
    UuidDto,
} from '../models';
import type { HttpHeaders, HttpQuery, OperationOpts } from '../runtime';
import { BaseAPI, encodeURI, throwIfNullOrUndefined } from '../runtime';

export interface BulkDeleteCertificateRequest {
    removeCertificateDto: RemoveCertificateDto;
}

export interface BulkUpdateCertificateObjectsRequest {
    multipleCertificateObjectUpdateDto: MultipleCertificateObjectUpdateDto;
}

export interface CheckCertificatesComplianceRequest {
    certificateComplianceCheckDto: CertificateComplianceCheckDto;
}

export interface DeleteCertificateRequest {
    uuid: string;
}

export interface DownloadCertificateRequest {
    uuid: string;
    certificateFormat: CertificateFormat;
    encoding: CertificateFormatEncoding;
}

export interface DownloadCertificateChainRequest {
    uuid: string;
    certificateFormat: CertificateFormat;
    encoding: CertificateFormatEncoding;
    withEndCertificate?: boolean;
}

export interface GetCertificateRequest {
    uuid: string;
}

export interface GetCertificateChainRequest {
    uuid: string;
    withEndCertificate?: boolean;
}

export interface GetCertificateContentRequest {
    requestBody: Array<string>;
}

export interface GetCertificateEventHistoryRequest {
    uuid: string;
}

export interface GetCertificateValidationResultRequest {
    uuid: string;
}

export interface ListCertificateApprovalsRequest {
    uuid: string;
    paginationRequestDto: PaginationRequestDto;
}

export interface ListCertificateLocationsRequest {
    certificateUuid: string;
}

export interface ListCertificatesRequest {
    searchRequestDto: SearchRequestDto;
}

export interface SubmitCertificateRequestRequest {
    clientCertificateRequestDto: ClientCertificateRequestDto;
}

export interface UpdateCertificateObjectsRequest {
    uuid: string;
    certificateUpdateObjectsDto: CertificateUpdateObjectsDto;
}

export interface UploadRequest {
    uploadCertificateRequestDto: UploadCertificateRequestDto;
}

/**
 * no description
 */
export class CertificateInventoryApi extends BaseAPI {
    /**
     * In this operation, when the list of Certificate UUIDs are provided and the filter is left as null or undefined, then the change will be applied only to the list of Certificate UUIDs provided. When the filter is provided in the request, the list of UUIDs will be ignored and the change will be applied for the all the certificates that matches the filter criteria. To apply this change for all the Certificates in the inventory, provide an empty array \"[]\" for the value of \"filters\" in the request body
     * Delete multiple certificates
     */
    bulkDeleteCertificate({ removeCertificateDto }: BulkDeleteCertificateRequest): Observable<BulkOperationResponse>;
    bulkDeleteCertificate(
        { removeCertificateDto }: BulkDeleteCertificateRequest,
        opts?: OperationOpts,
    ): Observable<AjaxResponse<BulkOperationResponse>>;
    bulkDeleteCertificate(
        { removeCertificateDto }: BulkDeleteCertificateRequest,
        opts?: OperationOpts,
    ): Observable<BulkOperationResponse | AjaxResponse<BulkOperationResponse>> {
        throwIfNullOrUndefined(removeCertificateDto, 'removeCertificateDto', 'bulkDeleteCertificate');

        const headers: HttpHeaders = {
            'Content-Type': 'application/json',
        };

        return this.request<BulkOperationResponse>(
            {
                url: '/v1/certificates/delete',
                method: 'POST',
                headers,
                body: removeCertificateDto,
            },
            opts?.responseOpts,
        );
    }

    /**
     * In this operation, when the list of Certificate UUIDs are provided and the filter is left as null or undefined, then the change will be applied only to the list of Certificate UUIDs provided. When the filter is provided in the request, the list of UUIDs will be ignored and the change will be applied for the all the certificates that matches the filter criteria. To apply this change for all the Certificates in the inventory, provide an empty array \"[]\" for the value of \"filters\" in the request body
     * Update Group and/or Owner for multiple Certificates
     */
    bulkUpdateCertificateObjects({ multipleCertificateObjectUpdateDto }: BulkUpdateCertificateObjectsRequest): Observable<void>;
    bulkUpdateCertificateObjects(
        { multipleCertificateObjectUpdateDto }: BulkUpdateCertificateObjectsRequest,
        opts?: OperationOpts,
    ): Observable<void | AjaxResponse<void>>;
    bulkUpdateCertificateObjects(
        { multipleCertificateObjectUpdateDto }: BulkUpdateCertificateObjectsRequest,
        opts?: OperationOpts,
    ): Observable<void | AjaxResponse<void>> {
        throwIfNullOrUndefined(multipleCertificateObjectUpdateDto, 'multipleCertificateObjectUpdateDto', 'bulkUpdateCertificateObjects');

        const headers: HttpHeaders = {
            'Content-Type': 'application/json',
        };

        return this.request<void>(
            {
                url: '/v1/certificates',
                method: 'PATCH',
                headers,
                body: multipleCertificateObjectUpdateDto,
            },
            opts?.responseOpts,
        );
    }

    /**
     * Initiate Certificate Compliance Check
     */
    checkCertificatesCompliance({ certificateComplianceCheckDto }: CheckCertificatesComplianceRequest): Observable<void>;
    checkCertificatesCompliance(
        { certificateComplianceCheckDto }: CheckCertificatesComplianceRequest,
        opts?: OperationOpts,
    ): Observable<void | AjaxResponse<void>>;
    checkCertificatesCompliance(
        { certificateComplianceCheckDto }: CheckCertificatesComplianceRequest,
        opts?: OperationOpts,
    ): Observable<void | AjaxResponse<void>> {
        throwIfNullOrUndefined(certificateComplianceCheckDto, 'certificateComplianceCheckDto', 'checkCertificatesCompliance');

        const headers: HttpHeaders = {
            'Content-Type': 'application/json',
        };

        return this.request<void>(
            {
                url: '/v1/certificates/compliance',
                method: 'POST',
                headers,
                body: certificateComplianceCheckDto,
            },
            opts?.responseOpts,
        );
    }

    /**
     * Delete a certificate
     */
    deleteCertificate({ uuid }: DeleteCertificateRequest): Observable<void>;
    deleteCertificate({ uuid }: DeleteCertificateRequest, opts?: OperationOpts): Observable<void | AjaxResponse<void>>;
    deleteCertificate({ uuid }: DeleteCertificateRequest, opts?: OperationOpts): Observable<void | AjaxResponse<void>> {
        throwIfNullOrUndefined(uuid, 'uuid', 'deleteCertificate');

        return this.request<void>(
            {
                url: '/v1/certificates/{uuid}'.replace('{uuid}', encodeURI(uuid)),
                method: 'DELETE',
            },
            opts?.responseOpts,
        );
    }

    /**
     * Download Certificate
     */
    downloadCertificate({ uuid, certificateFormat, encoding }: DownloadCertificateRequest): Observable<CertificateDownloadResponseDto>;
    downloadCertificate(
        { uuid, certificateFormat, encoding }: DownloadCertificateRequest,
        opts?: OperationOpts,
    ): Observable<AjaxResponse<CertificateDownloadResponseDto>>;
    downloadCertificate(
        { uuid, certificateFormat, encoding }: DownloadCertificateRequest,
        opts?: OperationOpts,
    ): Observable<CertificateDownloadResponseDto | AjaxResponse<CertificateDownloadResponseDto>> {
        throwIfNullOrUndefined(uuid, 'uuid', 'downloadCertificate');
        throwIfNullOrUndefined(certificateFormat, 'certificateFormat', 'downloadCertificate');
        throwIfNullOrUndefined(encoding, 'encoding', 'downloadCertificate');

        const query: HttpQuery = {};

        if (encoding != null) {
            query['encoding'] = encoding;
        }
        return this.request<CertificateDownloadResponseDto>(
            {
                url: '/v1/certificates/{uuid}/{certificateFormat}'
                    .replace('{uuid}', encodeURI(uuid))
                    .replace('{certificateFormat}', encodeURI(certificateFormat)),
                method: 'GET',
                query,
            },
            opts?.responseOpts,
        );
    }

    /**
     * Download Certificate Chain in chosen format
     */
    downloadCertificateChain({
        uuid,
        certificateFormat,
        encoding,
        withEndCertificate,
    }: DownloadCertificateChainRequest): Observable<CertificateChainDownloadResponseDto>;
    downloadCertificateChain(
        { uuid, certificateFormat, encoding, withEndCertificate }: DownloadCertificateChainRequest,
        opts?: OperationOpts,
    ): Observable<AjaxResponse<CertificateChainDownloadResponseDto>>;
    downloadCertificateChain(
        { uuid, certificateFormat, encoding, withEndCertificate }: DownloadCertificateChainRequest,
        opts?: OperationOpts,
    ): Observable<CertificateChainDownloadResponseDto | AjaxResponse<CertificateChainDownloadResponseDto>> {
        throwIfNullOrUndefined(uuid, 'uuid', 'downloadCertificateChain');
        throwIfNullOrUndefined(certificateFormat, 'certificateFormat', 'downloadCertificateChain');
        throwIfNullOrUndefined(encoding, 'encoding', 'downloadCertificateChain');

        const query: HttpQuery = {};

        if (encoding != null) {
            query['encoding'] = encoding;
        }

        if (withEndCertificate != null) {
            query['withEndCertificate'] = withEndCertificate;
        }

        return this.request<CertificateChainDownloadResponseDto>(
            {
                url: '/v1/certificates/{uuid}/chain/{certificateFormat}'
                    .replace('{uuid}', encodeURI(uuid))
                    .replace('{certificateFormat}', encodeURI(certificateFormat)),
                method: 'GET',
                query,
            },
            opts?.responseOpts,
        );
    }

    /**
     * Get Certificate Details
     */
    getCertificate({ uuid }: GetCertificateRequest): Observable<CertificateDetailDto>;
    getCertificate({ uuid }: GetCertificateRequest, opts?: OperationOpts): Observable<AjaxResponse<CertificateDetailDto>>;
    getCertificate(
        { uuid }: GetCertificateRequest,
        opts?: OperationOpts,
    ): Observable<CertificateDetailDto | AjaxResponse<CertificateDetailDto>> {
        throwIfNullOrUndefined(uuid, 'uuid', 'getCertificate');

        return this.request<CertificateDetailDto>(
            {
                url: '/v1/certificates/{uuid}'.replace('{uuid}', encodeURI(uuid)),
                method: 'GET',
            },
            opts?.responseOpts,
        );
    }

    /**
     * Get certificate chain for the certificate with the given UUID. The certificate chain is returned in the order of the chain, with the first certificate being the certificate with the given UUID, up to the last identified certificate in the chain. If the certificate with the given UUID has status `NEW` or `REJECTED`, an empty list is returned.
     * Get certificate chain
     */
    getCertificateChain({ uuid, withEndCertificate }: GetCertificateChainRequest): Observable<CertificateChainResponseDto>;
    getCertificateChain(
        { uuid, withEndCertificate }: GetCertificateChainRequest,
        opts?: OperationOpts,
    ): Observable<AjaxResponse<CertificateChainResponseDto>>;
    getCertificateChain(
        { uuid, withEndCertificate }: GetCertificateChainRequest,
        opts?: OperationOpts,
    ): Observable<CertificateChainResponseDto | AjaxResponse<CertificateChainResponseDto>> {
        throwIfNullOrUndefined(uuid, 'uuid', 'getCertificateChain');

        const query: HttpQuery = {};

        if (withEndCertificate != null) {
            query['withEndCertificate'] = withEndCertificate;
        }

        return this.request<CertificateChainResponseDto>(
            {
                url: '/v1/certificates/{uuid}/chain'.replace('{uuid}', encodeURI(uuid)),
                method: 'GET',
                query,
            },
            opts?.responseOpts,
        );
    }

    /**
     * Get Certificate Content
     */
    getCertificateContent({ requestBody }: GetCertificateContentRequest): Observable<Array<CertificateContentDto>>;
    getCertificateContent(
        { requestBody }: GetCertificateContentRequest,
        opts?: OperationOpts,
    ): Observable<AjaxResponse<Array<CertificateContentDto>>>;
    getCertificateContent(
        { requestBody }: GetCertificateContentRequest,
        opts?: OperationOpts,
    ): Observable<Array<CertificateContentDto> | AjaxResponse<Array<CertificateContentDto>>> {
        throwIfNullOrUndefined(requestBody, 'requestBody', 'getCertificateContent');

        const headers: HttpHeaders = {
            'Content-Type': 'application/json',
        };

        return this.request<Array<CertificateContentDto>>(
            {
                url: '/v1/certificates/content',
                method: 'POST',
                headers,
                body: requestBody,
            },
            opts?.responseOpts,
        );
    }

    /**
     * Get Certificate event history
     */
    getCertificateEventHistory({ uuid }: GetCertificateEventHistoryRequest): Observable<Array<CertificateEventHistoryDto>>;
    getCertificateEventHistory(
        { uuid }: GetCertificateEventHistoryRequest,
        opts?: OperationOpts,
    ): Observable<AjaxResponse<Array<CertificateEventHistoryDto>>>;
    getCertificateEventHistory(
        { uuid }: GetCertificateEventHistoryRequest,
        opts?: OperationOpts,
    ): Observable<Array<CertificateEventHistoryDto> | AjaxResponse<Array<CertificateEventHistoryDto>>> {
        throwIfNullOrUndefined(uuid, 'uuid', 'getCertificateEventHistory');

        return this.request<Array<CertificateEventHistoryDto>>(
            {
                url: '/v1/certificates/{uuid}/history'.replace('{uuid}', encodeURI(uuid)),
                method: 'GET',
            },
            opts?.responseOpts,
        );
    }

    /**
     * Get Certificate Validation Result
     */
    getCertificateValidationResult({ uuid }: GetCertificateValidationResultRequest): Observable<CertificateValidationResultDto>;
    getCertificateValidationResult(
        { uuid }: GetCertificateValidationResultRequest,
        opts?: OperationOpts,
    ): Observable<AjaxResponse<CertificateValidationResultDto>>;
    getCertificateValidationResult(
        { uuid }: GetCertificateValidationResultRequest,
        opts?: OperationOpts,
    ): Observable<CertificateValidationResultDto | AjaxResponse<CertificateValidationResultDto>> {
        throwIfNullOrUndefined(uuid, 'uuid', 'getCertificateValidationResult');

        return this.request<CertificateValidationResultDto>(
            {
                url: '/v1/certificates/{uuid}/validate'.replace('{uuid}', encodeURI(uuid)),
                method: 'GET',
            },
            opts?.responseOpts,
        );
    }

    /**
     * Get CSR Generation Attributes
     */
    getCsrGenerationAttributes(): Observable<Array<BaseAttributeDto>>;
    getCsrGenerationAttributes(opts?: OperationOpts): Observable<AjaxResponse<Array<BaseAttributeDto>>>;
    getCsrGenerationAttributes(opts?: OperationOpts): Observable<Array<BaseAttributeDto> | AjaxResponse<Array<BaseAttributeDto>>> {
        return this.request<Array<BaseAttributeDto>>(
            {
                url: '/v1/certificates/csr/attributes',
                method: 'GET',
            },
            opts?.responseOpts,
        );
    }

    /**
     * Get Certificate searchable fields information
     */
    getSearchableFieldInformation4(): Observable<Array<SearchFieldDataByGroupDto>>;
    getSearchableFieldInformation4(opts?: OperationOpts): Observable<AjaxResponse<Array<SearchFieldDataByGroupDto>>>;
    getSearchableFieldInformation4(
        opts?: OperationOpts,
    ): Observable<Array<SearchFieldDataByGroupDto> | AjaxResponse<Array<SearchFieldDataByGroupDto>>> {
        return this.request<Array<SearchFieldDataByGroupDto>>(
            {
                url: '/v1/certificates/search',
                method: 'GET',
            },
            opts?.responseOpts,
        );
    }

    /**
     * List Certificates Approvals
     */
    listCertificateApprovals({ uuid, paginationRequestDto }: ListCertificateApprovalsRequest): Observable<ApprovalResponseDto>;
    listCertificateApprovals(
        { uuid, paginationRequestDto }: ListCertificateApprovalsRequest,
        opts?: OperationOpts,
    ): Observable<AjaxResponse<ApprovalResponseDto>>;
    listCertificateApprovals(
        { uuid, paginationRequestDto }: ListCertificateApprovalsRequest,
        opts?: OperationOpts,
    ): Observable<ApprovalResponseDto | AjaxResponse<ApprovalResponseDto>> {
        throwIfNullOrUndefined(uuid, 'uuid', 'listCertificateApprovals');
        throwIfNullOrUndefined(paginationRequestDto, 'paginationRequestDto', 'listCertificateApprovals');

        const query: HttpQuery = {};
        if (paginationRequestDto != null) {
            Object.assign(query, paginationRequestDto);
        }

        return this.request<ApprovalResponseDto>(
            {
                url: '/v1/certificates/{uuid}/approvals'.replace('{uuid}', encodeURI(uuid)),
                method: 'GET',
                query,
            },
            opts?.responseOpts,
        );
    }

    /**
     * List of available Locations for the Certificate
     */
    listCertificateLocations({ certificateUuid }: ListCertificateLocationsRequest): Observable<Array<LocationDto>>;
    listCertificateLocations(
        { certificateUuid }: ListCertificateLocationsRequest,
        opts?: OperationOpts,
    ): Observable<AjaxResponse<Array<LocationDto>>>;
    listCertificateLocations(
        { certificateUuid }: ListCertificateLocationsRequest,
        opts?: OperationOpts,
    ): Observable<Array<LocationDto> | AjaxResponse<Array<LocationDto>>> {
        throwIfNullOrUndefined(certificateUuid, 'certificateUuid', 'listCertificateLocations');

        return this.request<Array<LocationDto>>(
            {
                url: '/v1/certificates/{certificateUuid}/locations'.replace('{certificateUuid}', encodeURI(certificateUuid)),
                method: 'GET',
            },
            opts?.responseOpts,
        );
    }

    /**
     * List Certificates
     */
    listCertificates({ searchRequestDto }: ListCertificatesRequest): Observable<CertificateResponseDto>;
    listCertificates({ searchRequestDto }: ListCertificatesRequest, opts?: OperationOpts): Observable<AjaxResponse<CertificateResponseDto>>;
    listCertificates(
        { searchRequestDto }: ListCertificatesRequest,
        opts?: OperationOpts,
    ): Observable<CertificateResponseDto | AjaxResponse<CertificateResponseDto>> {
        throwIfNullOrUndefined(searchRequestDto, 'searchRequestDto', 'listCertificates');

        const headers: HttpHeaders = {
            'Content-Type': 'application/json',
        };

        return this.request<CertificateResponseDto>(
            {
                url: '/v1/certificates',
                method: 'POST',
                headers,
                body: searchRequestDto,
            },
            opts?.responseOpts,
        );
    }

    /**
     * Submit certificate request
     */
    submitCertificateRequest({ clientCertificateRequestDto }: SubmitCertificateRequestRequest): Observable<CertificateDetailDto>;
    submitCertificateRequest(
        { clientCertificateRequestDto }: SubmitCertificateRequestRequest,
        opts?: OperationOpts,
    ): Observable<AjaxResponse<CertificateDetailDto>>;
    submitCertificateRequest(
        { clientCertificateRequestDto }: SubmitCertificateRequestRequest,
        opts?: OperationOpts,
    ): Observable<CertificateDetailDto | AjaxResponse<CertificateDetailDto>> {
        throwIfNullOrUndefined(clientCertificateRequestDto, 'clientCertificateRequestDto', 'submitCertificateRequest');

        const headers: HttpHeaders = {
            'Content-Type': 'application/json',
        };

        return this.request<CertificateDetailDto>(
            {
                url: '/v1/certificates/create',
                method: 'POST',
                headers,
                body: clientCertificateRequestDto,
            },
            opts?.responseOpts,
        );
    }

    /**
     * Update Certificate Objects
     */
    updateCertificateObjects({ uuid, certificateUpdateObjectsDto }: UpdateCertificateObjectsRequest): Observable<void>;
    updateCertificateObjects(
        { uuid, certificateUpdateObjectsDto }: UpdateCertificateObjectsRequest,
        opts?: OperationOpts,
    ): Observable<void | AjaxResponse<void>>;
    updateCertificateObjects(
        { uuid, certificateUpdateObjectsDto }: UpdateCertificateObjectsRequest,
        opts?: OperationOpts,
    ): Observable<void | AjaxResponse<void>> {
        throwIfNullOrUndefined(uuid, 'uuid', 'updateCertificateObjects');
        throwIfNullOrUndefined(certificateUpdateObjectsDto, 'certificateUpdateObjectsDto', 'updateCertificateObjects');

        const headers: HttpHeaders = {
            'Content-Type': 'application/json',
        };

        return this.request<void>(
            {
                url: '/v1/certificates/{uuid}'.replace('{uuid}', encodeURI(uuid)),
                method: 'PATCH',
                headers,
                body: certificateUpdateObjectsDto,
            },
            opts?.responseOpts,
        );
    }

    /**
     * Upload a new Certificate
     */
    upload({ uploadCertificateRequestDto }: UploadRequest): Observable<UuidDto>;
    upload({ uploadCertificateRequestDto }: UploadRequest, opts?: OperationOpts): Observable<AjaxResponse<UuidDto>>;
    upload({ uploadCertificateRequestDto }: UploadRequest, opts?: OperationOpts): Observable<UuidDto | AjaxResponse<UuidDto>> {
        throwIfNullOrUndefined(uploadCertificateRequestDto, 'uploadCertificateRequestDto', 'upload');

        const headers: HttpHeaders = {
            'Content-Type': 'application/json',
        };

        return this.request<UuidDto>(
            {
                url: '/v1/certificates/upload',
                method: 'POST',
                headers,
                body: uploadCertificateRequestDto,
            },
            opts?.responseOpts,
        );
    }
}
