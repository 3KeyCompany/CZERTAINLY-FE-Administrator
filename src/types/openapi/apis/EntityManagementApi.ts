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

import type { Observable } from "rxjs";
import type { AjaxResponse } from "rxjs/ajax";
import { BaseAPI, throwIfNullOrUndefined, encodeURI } from "../runtime";
import type { OperationOpts, HttpHeaders } from "../runtime";
import type {
    BaseAttributeDto,
    EntityInstanceDto,
    EntityInstanceRequestDto,
    EntityInstanceUpdateRequestDto,
    ErrorMessageDto,
    RequestAttributeDto,
    UuidDto,
} from "../models";

export interface CreateEntityInstanceRequest {
    entityInstanceRequestDto: EntityInstanceRequestDto;
}

export interface DeleteEntityInstanceRequest {
    entityUuid: string;
}

export interface EditEntityInstanceRequest {
    entityUuid: string;
    entityInstanceUpdateRequestDto: EntityInstanceUpdateRequestDto;
}

export interface GetEntityInstanceRequest {
    entityUuid: string;
}

export interface ListLocationAttributesRequest {
    entityUuid: string;
}

export interface ValidateLocationAttributesRequest {
    entityUuid: string;
    requestAttributeDto: Array<RequestAttributeDto>;
}

/**
 * no description
 */
export class EntityManagementApi extends BaseAPI {
    /**
     * Add Entity instance
     */
    createEntityInstance({ entityInstanceRequestDto }: CreateEntityInstanceRequest): Observable<UuidDto>;
    createEntityInstance(
        { entityInstanceRequestDto }: CreateEntityInstanceRequest,
        opts?: OperationOpts,
    ): Observable<AjaxResponse<UuidDto>>;
    createEntityInstance(
        { entityInstanceRequestDto }: CreateEntityInstanceRequest,
        opts?: OperationOpts,
    ): Observable<UuidDto | AjaxResponse<UuidDto>> {
        throwIfNullOrUndefined(entityInstanceRequestDto, "entityInstanceRequestDto", "createEntityInstance");

        const headers: HttpHeaders = {
            "Content-Type": "application/json",
        };

        return this.request<UuidDto>(
            {
                url: "/v1/entities",
                method: "POST",
                headers,
                body: entityInstanceRequestDto,
            },
            opts?.responseOpts,
        );
    }

    /**
     * Delete Entity instance
     */
    deleteEntityInstance({ entityUuid }: DeleteEntityInstanceRequest): Observable<void>;
    deleteEntityInstance({ entityUuid }: DeleteEntityInstanceRequest, opts?: OperationOpts): Observable<void | AjaxResponse<void>>;
    deleteEntityInstance({ entityUuid }: DeleteEntityInstanceRequest, opts?: OperationOpts): Observable<void | AjaxResponse<void>> {
        throwIfNullOrUndefined(entityUuid, "entityUuid", "deleteEntityInstance");

        return this.request<void>(
            {
                url: "/v1/entities/{entityUuid}".replace("{entityUuid}", encodeURI(entityUuid)),
                method: "DELETE",
            },
            opts?.responseOpts,
        );
    }

    /**
     * Edit Entity instance
     */
    editEntityInstance({ entityUuid, entityInstanceUpdateRequestDto }: EditEntityInstanceRequest): Observable<EntityInstanceDto>;
    editEntityInstance(
        { entityUuid, entityInstanceUpdateRequestDto }: EditEntityInstanceRequest,
        opts?: OperationOpts,
    ): Observable<AjaxResponse<EntityInstanceDto>>;
    editEntityInstance(
        { entityUuid, entityInstanceUpdateRequestDto }: EditEntityInstanceRequest,
        opts?: OperationOpts,
    ): Observable<EntityInstanceDto | AjaxResponse<EntityInstanceDto>> {
        throwIfNullOrUndefined(entityUuid, "entityUuid", "editEntityInstance");
        throwIfNullOrUndefined(entityInstanceUpdateRequestDto, "entityInstanceUpdateRequestDto", "editEntityInstance");

        const headers: HttpHeaders = {
            "Content-Type": "application/json",
        };

        return this.request<EntityInstanceDto>(
            {
                url: "/v1/entities/{entityUuid}".replace("{entityUuid}", encodeURI(entityUuid)),
                method: "PUT",
                headers,
                body: entityInstanceUpdateRequestDto,
            },
            opts?.responseOpts,
        );
    }

    /**
     * Get Entity instance details
     */
    getEntityInstance({ entityUuid }: GetEntityInstanceRequest): Observable<EntityInstanceDto>;
    getEntityInstance({ entityUuid }: GetEntityInstanceRequest, opts?: OperationOpts): Observable<AjaxResponse<EntityInstanceDto>>;
    getEntityInstance(
        { entityUuid }: GetEntityInstanceRequest,
        opts?: OperationOpts,
    ): Observable<EntityInstanceDto | AjaxResponse<EntityInstanceDto>> {
        throwIfNullOrUndefined(entityUuid, "entityUuid", "getEntityInstance");

        return this.request<EntityInstanceDto>(
            {
                url: "/v1/entities/{entityUuid}".replace("{entityUuid}", encodeURI(entityUuid)),
                method: "GET",
            },
            opts?.responseOpts,
        );
    }

    /**
     * List Entity instances
     */
    listEntityInstances(): Observable<Array<EntityInstanceDto>>;
    listEntityInstances(opts?: OperationOpts): Observable<AjaxResponse<Array<EntityInstanceDto>>>;
    listEntityInstances(opts?: OperationOpts): Observable<Array<EntityInstanceDto> | AjaxResponse<Array<EntityInstanceDto>>> {
        return this.request<Array<EntityInstanceDto>>(
            {
                url: "/v1/entities",
                method: "GET",
            },
            opts?.responseOpts,
        );
    }

    /**
     * List Location Attributes
     */
    listLocationAttributes({ entityUuid }: ListLocationAttributesRequest): Observable<Array<BaseAttributeDto>>;
    listLocationAttributes(
        { entityUuid }: ListLocationAttributesRequest,
        opts?: OperationOpts,
    ): Observable<AjaxResponse<Array<BaseAttributeDto>>>;
    listLocationAttributes(
        { entityUuid }: ListLocationAttributesRequest,
        opts?: OperationOpts,
    ): Observable<Array<BaseAttributeDto> | AjaxResponse<Array<BaseAttributeDto>>> {
        throwIfNullOrUndefined(entityUuid, "entityUuid", "listLocationAttributes");

        return this.request<Array<BaseAttributeDto>>(
            {
                url: "/v1/entities/{entityUuid}/attributes/location".replace("{entityUuid}", encodeURI(entityUuid)),
                method: "GET",
            },
            opts?.responseOpts,
        );
    }

    /**
     * Validate Location Attributes
     */
    validateLocationAttributes({ entityUuid, requestAttributeDto }: ValidateLocationAttributesRequest): Observable<void>;
    validateLocationAttributes(
        { entityUuid, requestAttributeDto }: ValidateLocationAttributesRequest,
        opts?: OperationOpts,
    ): Observable<void | AjaxResponse<void>>;
    validateLocationAttributes(
        { entityUuid, requestAttributeDto }: ValidateLocationAttributesRequest,
        opts?: OperationOpts,
    ): Observable<void | AjaxResponse<void>> {
        throwIfNullOrUndefined(entityUuid, "entityUuid", "validateLocationAttributes");
        throwIfNullOrUndefined(requestAttributeDto, "requestAttributeDto", "validateLocationAttributes");

        const headers: HttpHeaders = {
            "Content-Type": "application/json",
        };

        return this.request<void>(
            {
                url: "/v1/entities/{entityUuid}/attributes/location/validate".replace("{entityUuid}", encodeURI(entityUuid)),
                method: "POST",
                headers,
                body: requestAttributeDto,
            },
            opts?.responseOpts,
        );
    }
}
