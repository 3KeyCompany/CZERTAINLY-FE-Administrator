import {
  AllAttributeResponse,
  ConnectorHealth,
  ErrorDeleteObject,
} from "models";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { HttpRequestOptions } from "ts-rest-client";
import { FetchHttpService } from "ts-rest-client-fetch";
import { attributeSimplifier } from "utils/attributes";

import { createNewResource } from "utils/net";
import * as model from "./model";

const baseUrl = "/api/v1/connectors";
const baseUrlCallback = "/api/v1";

export class ConnectorManagementBackend
  implements model.ConnectorManagementApi
{
  constructor() {
    this._fetchService = new FetchHttpService();
  }

  private _fetchService: FetchHttpService;

  createNewConnector(
    name: string,
    url: string,
    authType: string,
    authAttributes: any
  ): Observable<string> {
    if (authType === "none") {
      return createNewResource(baseUrl, {
        name,
        url,
        authType,
      }).pipe(
        map((location) => location?.substr(location.lastIndexOf("/") + 1) || "")
      );
    } else {
      return createNewResource(baseUrl, {
        name,
        url,
        authType,
        authAttributes: attributeSimplifier(authAttributes),
      }).pipe(
        map((location) => location?.substr(location.lastIndexOf("/") + 1) || "")
      );
    }
  }

  connectNewConnector(
    name: string,
    url: any,
    authType: string,
    authAttributes: any,
    uuid: string
  ): Observable<model.ConnectorConnectionResponse[]> {
    if (authType === "none") {
      return this._fetchService.request(
        new HttpRequestOptions(`${baseUrl}/connect`, "PUT", {
          uuid,
          name,
          url,
          authType,
        })
      );
    } else {
      return this._fetchService.request(
        new HttpRequestOptions(`${baseUrl}/connect`, "PUT", {
          uuid,
          name,
          url,
          authType,
          authAttributes,
        })
      );
    }
  }

  getConnectorsList(): Observable<model.ConnectorInfoResponse[]> {
    return this._fetchService.request(new HttpRequestOptions(baseUrl, "GET"));
  }

  getConnectorDetail(uuid: string): Observable<model.ConnectorDetailResponse> {
    return this._fetchService.request(
      new HttpRequestOptions(`${baseUrl}/${uuid}`, "GET")
    );
  }

  getConnectorHealth(uuid: string): Observable<ConnectorHealth> {
    return this._fetchService.request(
      new HttpRequestOptions(`${baseUrl}/${uuid}/health`, "GET")
    );
  }

  getConnectorAttributes(
    uuid: string,
    code: string,
    kind: string
  ): Observable<model.ConnectorAttributes[]> {
    return this._fetchService.request(
      new HttpRequestOptions(
        `${baseUrl}/${uuid}/${code}/${kind}/attributes`,
        "GET"
      )
    );
  }

  getConnectorAllAttributes(uuid: string): Observable<AllAttributeResponse> {
    return this._fetchService.request(
      new HttpRequestOptions(`${baseUrl}/${uuid}/attributes-all`, "GET")
    );
  }

  deleteConnector(uuid: string | number): Observable<ErrorDeleteObject[]> {
    return this._fetchService.request(
      new HttpRequestOptions(`${baseUrl}/${uuid}`, "DELETE")
    );
  }

  forceDeleteConnector(uuid: string | number): Observable<void> {
    return this._fetchService.request(
      new HttpRequestOptions(`${baseUrl}/force`, "DELETE", [uuid])
    );
  }

  authorizeConnector(uuid: string): Observable<void> {
    return this._fetchService.request(
      new HttpRequestOptions(`${baseUrl}/${uuid}`, "PUT")
    );
  }

  reconnectConnector(uuid: string): Observable<void> {
    return this._fetchService.request(
      new HttpRequestOptions(`${baseUrl}/${uuid}/reconnect`, "PUT")
    );
  }

  bulkDeleteConnector(
    uuid: (string | number)[]
  ): Observable<ErrorDeleteObject[]> {
    return this._fetchService.request(
      new HttpRequestOptions(`${baseUrl}`, "DELETE", uuid)
    );
  }

  bulkForceDeleteConnector(uuid: (string | number)[]): Observable<void> {
    return this._fetchService.request(
      new HttpRequestOptions(`${baseUrl}/force`, "DELETE", uuid)
    );
  }

  bulkAuthorizeConnector(uuid: string[]): Observable<void> {
    return this._fetchService.request(
      new HttpRequestOptions(`${baseUrl}/approve`, "PUT", uuid)
    );
  }

  bulkReconnectConnector(uuid: string[]): Observable<void> {
    return this._fetchService.request(
      new HttpRequestOptions(`${baseUrl}/reconnect`, "PUT", uuid)
    );
  }

  updateConnector(
    uuid: string,
    name: string,
    url: string,
    authType: string,
    authAttributes: any
  ): Observable<string> {
    if (authType === "none") {
      return this._fetchService.request(
        new HttpRequestOptions(`${baseUrl}/${uuid}`, "POST", {
          name,
          url,
          authType,
        })
      );
    } else {
      return this._fetchService.request(
        new HttpRequestOptions(`${baseUrl}/${uuid}`, "POST", {
          name,
          url,
          authType,
          authAttributes: attributeSimplifier(authAttributes),
        })
      );
    }
  }

  getCallback(
    connectorUuid: string,
    request: any,
    functionGroup: string,
    kind: string,
    authorityUuid: string
  ): Observable<any> {
    if (authorityUuid) {
      return this._fetchService.request(
        new HttpRequestOptions(
          `${baseUrlCallback}/${authorityUuid}/callback`,
          "POST",
          request
        )
      );
    } else {
      return this._fetchService.request(
        new HttpRequestOptions(
          `${baseUrl}/${connectorUuid}/${functionGroup}/${kind}/callback`,
          "POST",
          request
        )
      );
    }
  }
}
