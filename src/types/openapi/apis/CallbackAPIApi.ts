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
    ErrorMessageDto,
    RequestAttributeCallback,
} from '../models';

export interface CallbackRequest {
    uuid: string;
    functionGroup: string;
    kind: string;
    requestAttributeCallback: RequestAttributeCallback;
}

export interface RaProfileCallbackRequest {
    authorityUuid: string;
    requestAttributeCallback: RequestAttributeCallback;
}

/**
 * no description
 */
export class CallbackAPIApi extends BaseAPI {

    /**
     * API to trigger the Callback for Connector.
     * Connector Callback API
     */
    callback({ uuid, functionGroup, kind, requestAttributeCallback }: CallbackRequest): Observable<object>
    callback({ uuid, functionGroup, kind, requestAttributeCallback }: CallbackRequest, opts?: OperationOpts): Observable<AjaxResponse<object>>
    callback({ uuid, functionGroup, kind, requestAttributeCallback }: CallbackRequest, opts?: OperationOpts): Observable<object | AjaxResponse<object>> {
        throwIfNullOrUndefined(uuid, 'uuid', 'callback');
        throwIfNullOrUndefined(functionGroup, 'functionGroup', 'callback');
        throwIfNullOrUndefined(kind, 'kind', 'callback');
        throwIfNullOrUndefined(requestAttributeCallback, 'requestAttributeCallback', 'callback');

        const headers: HttpHeaders = {
            'Content-Type': 'application/json',
        };

        return this.request<object>({
            url: '/v1/connectors/{uuid}/{functionGroup}/{kind}/callback'.replace('{uuid}', encodeURI(uuid)).replace('{functionGroup}', encodeURI(functionGroup)).replace('{kind}', encodeURI(kind)),
            method: 'POST',
            headers,
            body: requestAttributeCallback,
        }, opts?.responseOpts);
    };

    /**
     * API to trigger the Callback for RA Profile.
     * RA Profile Callback API
     */
    raProfileCallback({ authorityUuid, requestAttributeCallback }: RaProfileCallbackRequest): Observable<object>
    raProfileCallback({ authorityUuid, requestAttributeCallback }: RaProfileCallbackRequest, opts?: OperationOpts): Observable<AjaxResponse<object>>
    raProfileCallback({ authorityUuid, requestAttributeCallback }: RaProfileCallbackRequest, opts?: OperationOpts): Observable<object | AjaxResponse<object>> {
        throwIfNullOrUndefined(authorityUuid, 'authorityUuid', 'raProfileCallback');
        throwIfNullOrUndefined(requestAttributeCallback, 'requestAttributeCallback', 'raProfileCallback');

        const headers: HttpHeaders = {
            'Content-Type': 'application/json',
        };

        return this.request<object>({
            url: '/v1/{authorityUuid}/callback'.replace('{authorityUuid}', encodeURI(authorityUuid)),
            method: 'POST',
            headers,
            body: requestAttributeCallback,
        }, opts?.responseOpts);
    };

}