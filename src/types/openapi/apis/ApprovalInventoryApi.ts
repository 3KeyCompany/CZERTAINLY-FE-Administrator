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
import type { ApprovalDetailDto, ApprovalResponseDto, ApprovalUserDto, PaginationRequestDto, UserApprovalDto } from '../models';
import type { HttpHeaders, HttpQuery, OperationOpts } from '../runtime';
import { BaseAPI, encodeURI, throwIfNullOrUndefined } from '../runtime';

export interface ApproveApprovalRequest {
    uuid: string;
}

export interface ApproveApprovalRecipientRequest {
    uuid: string;
    userApprovalDto: UserApprovalDto;
}

export interface GetApprovalRequest {
    uuid: string;
}

export interface ListApprovalsRequest {
    paginationRequestDto: PaginationRequestDto;
}

export interface ListUserApprovalsRequest {
    paginationRequestDto: PaginationRequestDto;
    approvalUserDto: ApprovalUserDto;
}

export interface RejectApprovalRequest {
    uuid: string;
}

export interface RejectApprovalRecipientRequest {
    uuid: string;
    userApprovalDto: UserApprovalDto;
}

/**
 * no description
 */
export class ApprovalInventoryApi extends BaseAPI {
    /**
     * Approving of the Approval
     */
    approveApproval({ uuid }: ApproveApprovalRequest): Observable<void>;
    approveApproval({ uuid }: ApproveApprovalRequest, opts?: OperationOpts): Observable<void | AjaxResponse<void>>;
    approveApproval({ uuid }: ApproveApprovalRequest, opts?: OperationOpts): Observable<void | AjaxResponse<void>> {
        throwIfNullOrUndefined(uuid, 'uuid', 'approveApproval');

        return this.request<void>(
            {
                url: '/v1/approvals/{uuid}/approve'.replace('{uuid}', encodeURI(uuid)),
                method: 'PATCH',
            },
            opts?.responseOpts,
        );
    }

    /**
     * Approving of Recipient of the Approval
     */
    approveApprovalRecipient({ uuid, userApprovalDto }: ApproveApprovalRecipientRequest): Observable<void>;
    approveApprovalRecipient(
        { uuid, userApprovalDto }: ApproveApprovalRecipientRequest,
        opts?: OperationOpts,
    ): Observable<void | AjaxResponse<void>>;
    approveApprovalRecipient(
        { uuid, userApprovalDto }: ApproveApprovalRecipientRequest,
        opts?: OperationOpts,
    ): Observable<void | AjaxResponse<void>> {
        throwIfNullOrUndefined(uuid, 'uuid', 'approveApprovalRecipient');
        throwIfNullOrUndefined(userApprovalDto, 'userApprovalDto', 'approveApprovalRecipient');

        const headers: HttpHeaders = {
            'Content-Type': 'application/json',
        };

        return this.request<void>(
            {
                url: '/v1/approvals/{uuid}/approveRecipient'.replace('{uuid}', encodeURI(uuid)),
                method: 'PATCH',
                headers,
                body: userApprovalDto,
            },
            opts?.responseOpts,
        );
    }

    /**
     * Get Approval Detail
     */
    getApproval({ uuid }: GetApprovalRequest): Observable<ApprovalDetailDto>;
    getApproval({ uuid }: GetApprovalRequest, opts?: OperationOpts): Observable<AjaxResponse<ApprovalDetailDto>>;
    getApproval({ uuid }: GetApprovalRequest, opts?: OperationOpts): Observable<ApprovalDetailDto | AjaxResponse<ApprovalDetailDto>> {
        throwIfNullOrUndefined(uuid, 'uuid', 'getApproval');

        return this.request<ApprovalDetailDto>(
            {
                url: '/v1/approvals/{uuid}'.replace('{uuid}', encodeURI(uuid)),
                method: 'GET',
            },
            opts?.responseOpts,
        );
    }

    /**
     * List of Approvals
     */
    listApprovals({ paginationRequestDto }: ListApprovalsRequest): Observable<ApprovalResponseDto>;
    listApprovals({ paginationRequestDto }: ListApprovalsRequest, opts?: OperationOpts): Observable<AjaxResponse<ApprovalResponseDto>>;
    listApprovals(
        { paginationRequestDto }: ListApprovalsRequest,
        opts?: OperationOpts,
    ): Observable<ApprovalResponseDto | AjaxResponse<ApprovalResponseDto>> {
        throwIfNullOrUndefined(paginationRequestDto, 'paginationRequestDto', 'listApprovals');

        const query: HttpQuery = {};
        if (paginationRequestDto != null) {
            Object.assign(query, paginationRequestDto);
        }

        return this.request<ApprovalResponseDto>(
            {
                url: '/v1/approvals',
                method: 'GET',
                query,
            },
            opts?.responseOpts,
        );
    }

    /**
     * List of User\'s Approvals
     */
    listUserApprovals({ paginationRequestDto, approvalUserDto }: ListUserApprovalsRequest): Observable<ApprovalResponseDto>;
    listUserApprovals(
        { paginationRequestDto, approvalUserDto }: ListUserApprovalsRequest,
        opts?: OperationOpts,
    ): Observable<AjaxResponse<ApprovalResponseDto>>;
    listUserApprovals(
        { paginationRequestDto, approvalUserDto }: ListUserApprovalsRequest,
        opts?: OperationOpts,
    ): Observable<ApprovalResponseDto | AjaxResponse<ApprovalResponseDto>> {
        throwIfNullOrUndefined(paginationRequestDto, 'paginationRequestDto', 'listUserApprovals');
        throwIfNullOrUndefined(approvalUserDto, 'approvalUserDto', 'listUserApprovals');

        const query: HttpQuery = {};
        if (paginationRequestDto != null) {
            Object.assign(query, paginationRequestDto);
        }
        if (approvalUserDto != null) {
            Object.assign(query, approvalUserDto);
        }

        return this.request<ApprovalResponseDto>(
            {
                url: '/v1/approvals/user',
                method: 'GET',
                query,
            },
            opts?.responseOpts,
        );
    }

    /**
     * Rejecting of the Approval
     */
    rejectApproval({ uuid }: RejectApprovalRequest): Observable<void>;
    rejectApproval({ uuid }: RejectApprovalRequest, opts?: OperationOpts): Observable<void | AjaxResponse<void>>;
    rejectApproval({ uuid }: RejectApprovalRequest, opts?: OperationOpts): Observable<void | AjaxResponse<void>> {
        throwIfNullOrUndefined(uuid, 'uuid', 'rejectApproval');

        return this.request<void>(
            {
                url: '/v1/approvals/{uuid}/reject'.replace('{uuid}', encodeURI(uuid)),
                method: 'PATCH',
            },
            opts?.responseOpts,
        );
    }

    /**
     * Rejecting of Recipient of the Approval
     */
    rejectApprovalRecipient({ uuid, userApprovalDto }: RejectApprovalRecipientRequest): Observable<void>;
    rejectApprovalRecipient(
        { uuid, userApprovalDto }: RejectApprovalRecipientRequest,
        opts?: OperationOpts,
    ): Observable<void | AjaxResponse<void>>;
    rejectApprovalRecipient(
        { uuid, userApprovalDto }: RejectApprovalRecipientRequest,
        opts?: OperationOpts,
    ): Observable<void | AjaxResponse<void>> {
        throwIfNullOrUndefined(uuid, 'uuid', 'rejectApprovalRecipient');
        throwIfNullOrUndefined(userApprovalDto, 'userApprovalDto', 'rejectApprovalRecipient');

        const headers: HttpHeaders = {
            'Content-Type': 'application/json',
        };

        return this.request<void>(
            {
                url: '/v1/approvals/{uuid}/rejectRecipient'.replace('{uuid}', encodeURI(uuid)),
                method: 'PATCH',
                headers,
                body: userApprovalDto,
            },
            opts?.responseOpts,
        );
    }
}
