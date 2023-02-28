// tslint:disable
/**
 * CZERTAINLY Core API
 * REST API for CZERTAINLY Core
 *
 * The version of the OpenAPI document: 1.6.1-SNAPSHOT
 * Contact: getinfo@czertainly.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import type { Observable } from 'rxjs';
import type { AjaxResponse } from 'rxjs/ajax';
import { BaseAPI, throwIfNullOrUndefined } from '../runtime';
import type { OperationOpts, HttpHeaders } from '../runtime';
import type {
    AllSettingsDto,
    AuthenticationServiceExceptionDto,
    ErrorMessageDto,
    RequestAttributeDto,
    SectionDto,
    SectionSettingsDto,
} from '../models';

export interface UpdateSettingsRequest {
    requestBody: { [key: string]: Array<RequestAttributeDto>; };
}

/**
 * no description
 */
export class SettingsApi extends BaseAPI {

    /**
     * Get all settings extracted from attributes in dedicated DTO
     */
    getAllSettings(): Observable<AllSettingsDto>
    getAllSettings(opts?: OperationOpts): Observable<AjaxResponse<AllSettingsDto>>
    getAllSettings(opts?: OperationOpts): Observable<AllSettingsDto | AjaxResponse<AllSettingsDto>> {
        return this.request<AllSettingsDto>({
            url: '/v1/settings/all',
            method: 'GET',
        }, opts?.responseOpts);
    };

    /**
     * Get settings sections
     */
    getSections(): Observable<Array<SectionDto>>
    getSections(opts?: OperationOpts): Observable<AjaxResponse<Array<SectionDto>>>
    getSections(opts?: OperationOpts): Observable<Array<SectionDto> | AjaxResponse<Array<SectionDto>>> {
        return this.request<Array<SectionDto>>({
            url: '/v1/settings/sections',
            method: 'GET',
        }, opts?.responseOpts);
    };

    /**
     * Get sections settings
     */
    getSettings(): Observable<Array<SectionSettingsDto>>
    getSettings(opts?: OperationOpts): Observable<AjaxResponse<Array<SectionSettingsDto>>>
    getSettings(opts?: OperationOpts): Observable<Array<SectionSettingsDto> | AjaxResponse<Array<SectionSettingsDto>>> {
        return this.request<Array<SectionSettingsDto>>({
            url: '/v1/settings',
            method: 'GET',
        }, opts?.responseOpts);
    };

    /**
     * Update setting
     */
    updateSettings({ requestBody }: UpdateSettingsRequest): Observable<Array<SectionSettingsDto>>
    updateSettings({ requestBody }: UpdateSettingsRequest, opts?: OperationOpts): Observable<AjaxResponse<Array<SectionSettingsDto>>>
    updateSettings({ requestBody }: UpdateSettingsRequest, opts?: OperationOpts): Observable<Array<SectionSettingsDto> | AjaxResponse<Array<SectionSettingsDto>>> {
        throwIfNullOrUndefined(requestBody, 'requestBody', 'updateSettings');

        const headers: HttpHeaders = {
            'Content-Type': 'application/json',
        };

        return this.request<Array<SectionSettingsDto>>({
            url: '/v1/settings',
            method: 'PUT',
            headers,
            body: requestBody,
        }, opts?.responseOpts);
    };

}
