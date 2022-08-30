import { Observable } from "rxjs";

import { HttpRequestOptions } from "ts-rest-client";
import { FetchHttpService } from "ts-rest-client-fetch";

import { AttributeDescriptorDTO, AttributeDTO } from "api/_common/attributeDTO";

import * as model from "./model";
import { createNewResource } from "utils/net";
import { map } from "rxjs/operators";


const baseUrl = "/api/v1/locations";


export class LocationManagementBackend implements model.LocationManagementApi {


   constructor() {
      this._fetchService = new FetchHttpService();
   }

   private _fetchService: FetchHttpService;


   listLocations(enabled?: boolean): Observable<model.LocationDTO[]> {

      return this._fetchService.request(
         new HttpRequestOptions(
            `${baseUrl}${enabled !== undefined ? "?enabled=" + enabled.toString() : ""}`,
            "GET"
         )
      )

   }


   getLocationDetail(uuid: string): Observable<model.LocationDTO> {

      return this._fetchService.request(
         new HttpRequestOptions(
            `${baseUrl}/${uuid}`,
            "GET"
         )
      )

   }


   addLocation(entityUuid: string, name: string, description: string, attributes: AttributeDTO[], enabled: boolean): Observable<string> {

      return createNewResource(baseUrl, {
            entityInstanceUuid: entityUuid,
            name,
            description,
            attributes,
            enabled
         }
      ).pipe(
         map(
            uuid => {
               if (!uuid) throw new Error("Unexpected response returned from server");
               return uuid;
            }
         )
      );

   }


   editLocation(uuid: string, entityUuid: string, description: string, attributes: AttributeDTO[], enabled: boolean): Observable<model.LocationDTO> {

      return this._fetchService.request(
         new HttpRequestOptions(
            `${baseUrl}/${uuid}`,
            "PATCH", {
            entityInstanceUuid: entityUuid,
            description,
            attributes,
            enabled
         }
         )
      )


   }


   deleteLocation(uuid: string): Observable<void> {

      return this._fetchService.request(
         new HttpRequestOptions(
            `${baseUrl}/${uuid}`,
            "DELETE"
         )
      )

   }


   enableLocation(uuid: string): Observable<void> {

      return this._fetchService.request(
         new HttpRequestOptions(
            `${baseUrl}/${uuid}/enable`,
            "PATCH"
         )
      )

   }


   disableLocation(uuid: string): Observable<void> {

      return this._fetchService.request(
         new HttpRequestOptions(
            `${baseUrl}/${uuid}/disable`,
            "PATCH"
         )
      )

   }


   syncLocation(uuid: string): Observable<model.LocationDTO> {

      return this._fetchService.request(
         new HttpRequestOptions(
            `${baseUrl}/${uuid}/sync`,
            "PUT"
         )
      )

   }


   getPushAttributes(uuid: string): Observable<AttributeDescriptorDTO[]> {

      return this._fetchService.request(
         new HttpRequestOptions(
            `${baseUrl}/${uuid}/push/attributes`,
            "GET"
         )
      )

   }


   getCSRAttributes(uuid: string): Observable<AttributeDescriptorDTO[]> {

      return this._fetchService.request(
         new HttpRequestOptions(
            `${baseUrl}/${uuid}/issue/attributes`,
            "GET"
         )
      )

   }


   pushCertificate(locationUuid: string, certificateUuid: string, attributes: AttributeDTO[]): Observable<model.LocationDTO> {

      return this._fetchService.request(
         new HttpRequestOptions(
            `${baseUrl}/${locationUuid}/push/${certificateUuid}`,
            "POST", {
               attributes
            }
         )
      )

   }


   issueCertificate(locationUuid: string, raProfileUuid: string, csrAttributes: AttributeDTO[], issueAttributes: AttributeDTO[]): Observable<model.LocationDTO> {

      return this._fetchService.request(
         new HttpRequestOptions(
            `${baseUrl}/${locationUuid}/issue`,
            "POST",
            {
               raProfileUuid,
               csrAttributes,
               issueAttributes
            }
         )
      )

   }


   autoRenewCertificate(locationUuid: string, certificateUuid: string): Observable<model.LocationDTO> {

      return this._fetchService.request(
         new HttpRequestOptions(
            `${baseUrl}/${locationUuid}/push/${certificateUuid}`,
            "PATCH"
         )
      )

   }


   removeCertificate(locationUuid: string, certificateUuid: string): Observable<model.LocationDTO> {

      return this._fetchService.request(
         new HttpRequestOptions(
            `${baseUrl}/${locationUuid}/remove/${certificateUuid}`,
            "DELETE"
         )
      )

   }

}
