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
import { BaseAPI } from '../runtime';
import type { OperationOpts } from '../runtime';
import type {
    AuthenticationServiceExceptionDto,
    ErrorMessageDto,
    StatisticsDto,
} from '../models';

/**
 * no description
 */
export class StatisticsDashboardAPIApi extends BaseAPI {

    /**
     * Get Dashboard/Statistics Details
     */
    getStatistics(): Observable<StatisticsDto>
    getStatistics(opts?: OperationOpts): Observable<AjaxResponse<StatisticsDto>>
    getStatistics(opts?: OperationOpts): Observable<StatisticsDto | AjaxResponse<StatisticsDto>> {
        return this.request<StatisticsDto>({
            url: '/v1/statistics',
            method: 'GET',
        }, opts?.responseOpts);
    };

}