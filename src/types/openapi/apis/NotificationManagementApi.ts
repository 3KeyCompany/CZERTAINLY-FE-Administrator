// tslint:disable
/**
 * CZERTAINLY Core API
 * REST API for CZERTAINLY Core
 *
 * The version of the OpenAPI document: 2.8.2-SNAPSHOT
 * Contact: getinfo@czertainly.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import type { Observable } from "rxjs";
import type { AjaxResponse } from "rxjs/ajax";
import { BaseAPI, throwIfNullOrUndefined, encodeURI } from "../runtime";
import type { OperationOpts, HttpHeaders } from "../runtime";
import type {
    AuthenticationServiceExceptionDto,
    DataAttribute,
    ErrorMessageDto,
    NotificationInstanceDto,
    NotificationInstanceRequestDto,
    NotificationInstanceUpdateRequestDto,
    UuidDto,
} from "../models";

export interface CreateNotificationInstanceRequest {
    notificationInstanceRequestDto: NotificationInstanceRequestDto;
}

export interface DeleteNotificationInstanceRequest {
    uuid: string;
}

export interface EditNotificationInstanceRequest {
    uuid: string;
    notificationInstanceUpdateRequestDto: NotificationInstanceUpdateRequestDto;
}

export interface GetNotificationInstanceRequest {
    uuid: string;
}

export interface ListMappingAttributesRequest {
    connectorUuid: string;
    kind: string;
}

/**
 * no description
 */
export class NotificationManagementApi extends BaseAPI {
    /**
     * Add Notification instance
     */
    createNotificationInstance({ notificationInstanceRequestDto }: CreateNotificationInstanceRequest): Observable<UuidDto>;
    createNotificationInstance(
        { notificationInstanceRequestDto }: CreateNotificationInstanceRequest,
        opts?: OperationOpts,
    ): Observable<AjaxResponse<UuidDto>>;
    createNotificationInstance(
        { notificationInstanceRequestDto }: CreateNotificationInstanceRequest,
        opts?: OperationOpts,
    ): Observable<UuidDto | AjaxResponse<UuidDto>> {
        throwIfNullOrUndefined(notificationInstanceRequestDto, "notificationInstanceRequestDto", "createNotificationInstance");

        const headers: HttpHeaders = {
            "Content-Type": "application/json",
        };

        return this.request<UuidDto>(
            {
                url: "/v1/notificationInstances",
                method: "POST",
                headers,
                body: notificationInstanceRequestDto,
            },
            opts?.responseOpts,
        );
    }

    /**
     * Delete Notification instance
     */
    deleteNotificationInstance({ uuid }: DeleteNotificationInstanceRequest): Observable<void>;
    deleteNotificationInstance({ uuid }: DeleteNotificationInstanceRequest, opts?: OperationOpts): Observable<void | AjaxResponse<void>>;
    deleteNotificationInstance({ uuid }: DeleteNotificationInstanceRequest, opts?: OperationOpts): Observable<void | AjaxResponse<void>> {
        throwIfNullOrUndefined(uuid, "uuid", "deleteNotificationInstance");

        return this.request<void>(
            {
                url: "/v1/notificationInstances/{uuid}".replace("{uuid}", encodeURI(uuid)),
                method: "DELETE",
            },
            opts?.responseOpts,
        );
    }

    /**
     * Edit Notification instance
     */
    editNotificationInstance({
        uuid,
        notificationInstanceUpdateRequestDto,
    }: EditNotificationInstanceRequest): Observable<NotificationInstanceDto>;
    editNotificationInstance(
        { uuid, notificationInstanceUpdateRequestDto }: EditNotificationInstanceRequest,
        opts?: OperationOpts,
    ): Observable<AjaxResponse<NotificationInstanceDto>>;
    editNotificationInstance(
        { uuid, notificationInstanceUpdateRequestDto }: EditNotificationInstanceRequest,
        opts?: OperationOpts,
    ): Observable<NotificationInstanceDto | AjaxResponse<NotificationInstanceDto>> {
        throwIfNullOrUndefined(uuid, "uuid", "editNotificationInstance");
        throwIfNullOrUndefined(notificationInstanceUpdateRequestDto, "notificationInstanceUpdateRequestDto", "editNotificationInstance");

        const headers: HttpHeaders = {
            "Content-Type": "application/json",
        };

        return this.request<NotificationInstanceDto>(
            {
                url: "/v1/notificationInstances/{uuid}".replace("{uuid}", encodeURI(uuid)),
                method: "PUT",
                headers,
                body: notificationInstanceUpdateRequestDto,
            },
            opts?.responseOpts,
        );
    }

    /**
     * Details of an Notification instance
     */
    getNotificationInstance({ uuid }: GetNotificationInstanceRequest): Observable<NotificationInstanceDto>;
    getNotificationInstance(
        { uuid }: GetNotificationInstanceRequest,
        opts?: OperationOpts,
    ): Observable<AjaxResponse<NotificationInstanceDto>>;
    getNotificationInstance(
        { uuid }: GetNotificationInstanceRequest,
        opts?: OperationOpts,
    ): Observable<NotificationInstanceDto | AjaxResponse<NotificationInstanceDto>> {
        throwIfNullOrUndefined(uuid, "uuid", "getNotificationInstance");

        return this.request<NotificationInstanceDto>(
            {
                url: "/v1/notificationInstances/{uuid}".replace("{uuid}", encodeURI(uuid)),
                method: "GET",
            },
            opts?.responseOpts,
        );
    }

    /**
     * List of mapping attributes
     */
    listMappingAttributes({ connectorUuid, kind }: ListMappingAttributesRequest): Observable<Array<DataAttribute>>;
    listMappingAttributes(
        { connectorUuid, kind }: ListMappingAttributesRequest,
        opts?: OperationOpts,
    ): Observable<AjaxResponse<Array<DataAttribute>>>;
    listMappingAttributes(
        { connectorUuid, kind }: ListMappingAttributesRequest,
        opts?: OperationOpts,
    ): Observable<Array<DataAttribute> | AjaxResponse<Array<DataAttribute>>> {
        throwIfNullOrUndefined(connectorUuid, "connectorUuid", "listMappingAttributes");
        throwIfNullOrUndefined(kind, "kind", "listMappingAttributes");

        return this.request<Array<DataAttribute>>(
            {
                url: "/v1/notificationInstances/attributes/mapping/{connectorUuid}/{kind}"
                    .replace("{connectorUuid}", encodeURI(connectorUuid))
                    .replace("{kind}", encodeURI(kind)),
                method: "GET",
            },
            opts?.responseOpts,
        );
    }

    /**
     * List of available Notification instances
     */
    listNotificationInstances(): Observable<Array<NotificationInstanceDto>>;
    listNotificationInstances(opts?: OperationOpts): Observable<AjaxResponse<Array<NotificationInstanceDto>>>;
    listNotificationInstances(
        opts?: OperationOpts,
    ): Observable<Array<NotificationInstanceDto> | AjaxResponse<Array<NotificationInstanceDto>>> {
        return this.request<Array<NotificationInstanceDto>>(
            {
                url: "/v1/notificationInstances",
                method: "GET",
            },
            opts?.responseOpts,
        );
    }
}