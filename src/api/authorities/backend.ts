import { Observable } from "rxjs";
import { map } from "rxjs/operators";

import { HttpRequestOptions } from "ts-rest-client";
import { FetchHttpService } from "ts-rest-client-fetch";

import { createNewResource } from "utils/net";
import { AttributeDTO } from "api/.common/AttributeDTO";

import * as model from "./model";
import { DeleteObjectErrorDTO } from "api/.common/DeleteObjectErrorDTO";

const baseUrl = "/api/v1/authorities";
const baseUrlAuthorityProvider = "/api/v1/connectors";


export class AuthorityManagementBackend implements model.AuthorityManagementApi {

   constructor() {
      this._fetchService = new FetchHttpService();
   }

   private _fetchService: FetchHttpService;


   validateRAProfileAttributes(uuid: string, attributes: AttributeDTO[]): Observable<void> {

      return this._fetchService.request(
         new HttpRequestOptions(
            `${baseUrlAuthorityProvider}/${uuid}/raProfile/attributes/validate`,
            "POST",
            attributes
         )
      )

   }


   getAuthorityDetail(uuid: string): Observable<model.AuthorityDTO> {

      return this._fetchService.request(
         new HttpRequestOptions(`${baseUrl}/${uuid}`, "GET")
      );

   }


   updateAuthority(
      uuid: string,
      attributes: AttributeDTO[],
   ): Observable<model.AuthorityDTO> {

      return this._fetchService.request(

         new HttpRequestOptions(`${baseUrl}/${uuid}`, "POST", {
            uuid,
            attributes
         })
      );

   }


   deleteAuthority(uuid: string): Observable<void> {

      return this._fetchService.request(
         new HttpRequestOptions(`${baseUrl}/${uuid}`, "DELETE")
      );

   }


   getAuthoritiesList(): Observable<model.AuthorityDTO[]> {

      return this._fetchService.request(new HttpRequestOptions(baseUrl, "GET"));

   }



   createNewAuthority(
      name: string,
      attributes: AttributeDTO[],
      connectorUuid: string,
      kind: string
   ): Observable<string> {

      return createNewResource(baseUrl, {
         name,
         connectorUuid,
         attributes,
         kind,
      }).pipe(
         map(response => response ? response : "")
      )

   }


   bulkDeleteAuthority(uuids: string[]): Observable<DeleteObjectErrorDTO[]> {

      return this._fetchService.request(
         new HttpRequestOptions(`${baseUrl}`, "DELETE", uuids)
      );

   }


   listRAProfileAttributes(uuid: string): Observable<AttributeDTO[]> {

      return this._fetchService.request(
         new HttpRequestOptions(`${baseUrl}`, "GET", uuid)
      );

   }


   bulkForceDeleteAuthority(uuids: string[]): Observable<void> {

      return this._fetchService.request(
         new HttpRequestOptions(`${baseUrl}`, "DELETE", uuids)
      );

   }


}
