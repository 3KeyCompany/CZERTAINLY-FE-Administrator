import { Observable } from 'rxjs';
import { AuditLogOperation, AuditLogOperationStatus, AuditLogSourceTarget } from 'types/auditlog';

import { PagedDataDTO } from "../_common/pagedDataDTO";
import { FormValues } from "components/_pages/auditLogs/AuditLogsFilters";

export interface AuditLogDTO {
   id: number;
   author: string;
   created: Date;
   operationStatus: AuditLogOperationStatus;
   origination: AuditLogSourceTarget;
   affected: AuditLogSourceTarget;
   objectIdentifier: string;
   operation: AuditLogOperation;
   additionalData: any;
}

export type PagedAuditLog = PagedDataDTO<AuditLogDTO>;

export interface AuditLogsApi {

   getLogs(pageNumber: number, pageSize: number, filters?: FormValues): Observable<PagedAuditLog>;

   getObjects(): Observable<string[]>;

   getOperations(): Observable<string[]>;

   getStatuses(): Observable<string[]>;

   purgeLogs(queryString: string): Observable<void>;
}