import { Observable, of } from "rxjs";
import { delay, map } from "rxjs/operators";

import * as model from "./model";

import { dbData } from "mocks/db";
import { randomDelay } from "utils/mock";
import { HttpErrorResponse } from "ts-rest-client";

import { AttributeDescriptorDTO, AttributeDTO } from "api/_common/attributeDTO";


export class LocationManagementMock implements model.LocationManagementApi {


   listLocations(enabled?: boolean): Observable<model.LocationDTO[]> {

      return of(
         enabled !== undefined ? dbData.locations.filter(loc => loc.enabled === enabled) : dbData.locations
      ).pipe(

         delay(randomDelay())

      )

   }


   getLocationDetail(uuid: string): Observable<model.LocationDTO> {

      return of(
         dbData.locations.find(location => location.uuid === uuid)
      ).pipe(

         delay(randomDelay()),
         map(
            location => {
               if (!location) throw new HttpErrorResponse({ status: 404 });
               return location;
            }
         )

      )

   }


   addLocation(entityUuid: string, name: string, description: string, attributes: AttributeDTO[], enabled: boolean): Observable<string> {

      return of(
         dbData
      ).pipe(

         delay(randomDelay()),
         map(

            db => {

               const entity = dbData.entities.find(entity => entity.uuid === entityUuid);
               if (!entity) throw new HttpErrorResponse({ status: 404, statusText: "Entity not found" });

               const location: model.LocationDTO = {
                  uuid: crypto.randomUUID(),
                  name,
                  description,
                  attributes,
                  enabled,
                  metadata: {},
                  certificates: [],
                  entityInstanceName: entity.name,
                  entityInstanceUuid: entity.uuid,
                  supportKeyMannagement: false,
                  supportMultipleEntries: false
               };

               db.locations.push(location);

               return location.uuid;

            }


         )

      )

   }


   editLocation(uuid: string, entityUuid: string, description: string, attributes: AttributeDTO[], enabled: boolean): Observable<model.LocationDTO> {

      return of(
         dbData.locations.find(location => location.uuid === uuid)
      ).pipe(

         delay(randomDelay()),
         map(
            location => {
               if (!location) throw new HttpErrorResponse({ status: 404 });
               return location;
            }
         )

      )


   }


   deleteLocation(uuid: string): Observable<void> {

      return of(
         dbData.locations.findIndex(location => location.uuid === uuid)
      ).pipe(

         delay(randomDelay()),
         map(
            locationIndex => {

               if (locationIndex < 0) throw new HttpErrorResponse({ status: 404 });
               dbData.locations.splice(locationIndex, 1);

            }
         )

      )
   }


   enableLocation(uuid: string): Observable<void> {

      return of(
         dbData.locations.find(location => location.uuid === uuid)
      ).pipe(

         delay(randomDelay()),
         map(
            location => {
               if (!location) throw new HttpErrorResponse({ status: 404 });
               location.enabled = true;
            }
         )

      )

   }


   disableLocation(uuid: string): Observable<void> {

      return of(
         dbData.locations.find(location => location.uuid === uuid)
      ).pipe(

         delay(randomDelay()),
         map(
            location => {
               if (!location) throw new HttpErrorResponse({ status: 404 });
               location.enabled = false;
            }

         )

      )

   }


   syncLocation(uuid: string): Observable<model.LocationDTO> {

      return of(
         dbData.locations.find(location => location.uuid === uuid)
      ).pipe(

         delay(randomDelay()),
         map(
            location => {
               if (!location) throw new HttpErrorResponse({ status: 404 });
               return location;
            }
         )

      )
   }


   getPushAttributes(uuid: string): Observable<AttributeDescriptorDTO[]> {

      return of(
         dbData.locations.find(location => location.uuid === uuid)
      ).pipe(

         delay(randomDelay()),
         map(
            location => {
               if (!location) throw new HttpErrorResponse({ status: 404 });
               return [];
            }
         )

      )

   }


   getCSRAttributes(uuid: string): Observable<AttributeDescriptorDTO[]> {

      return of(
         dbData.locations.find(location => location.uuid === uuid)
      ).pipe(

         delay(randomDelay()),
         map(
            location => {
               if (!location) throw new HttpErrorResponse({ status: 404 });
               return [];
            }
         )

      )

   }


   pushCertificate(locationUuid: string, certificateUuid: string, pushAttributes: AttributeDTO[]): Observable<model.LocationDTO> {

      return of(
         dbData.locations.find(location => location.uuid === locationUuid)
      ).pipe(

         delay(randomDelay()),
         map(
            location => {
               if (!location) throw new HttpErrorResponse({ status: 404 });

               const certificate = dbData.certificates.find(certificate => certificate.uuid === certificateUuid);
               if (!certificate) throw new HttpErrorResponse({ status: 404, statusText: "Certificate not found" });

               location.certificates.push({
                  certificateUuid: certificate.uuid,
                  pushAttributes: [],
                  commonName: certificate.commonName,
                  csrAttributes: [],
                  metadata: certificate.meta || {},
                  serialNumber: certificate.serialNumber,
                  withKey: false
               });
               return location;
            }
         )

      )

   }


   issueCertificate(locationUuid: string, raProfileUuid: string, csrAttributes: AttributeDTO[], issueAttributes: AttributeDTO[]): Observable<model.LocationDTO> {


      return of(
         dbData.locations.find(location => location.uuid === locationUuid)
      ).pipe(

         delay(randomDelay()),
         map(
            location => {
               if (!location) throw new HttpErrorResponse({ status: 404 });

               const raProfile = dbData.raProfiles.find(raProfile => raProfile.uuid === raProfileUuid);
               if (!raProfile) throw new HttpErrorResponse({ status: 404, statusText: "RA Profile not found" });

               location.certificates.push({
                  certificateUuid: crypto.randomUUID(),
                  pushAttributes: [],
                  commonName: "",
                  csrAttributes,
                  metadata: {},
                  serialNumber: "",
                  withKey: true
               });
               return location;
            }
         )

      )


   }


   autoRenewCertificate(locationUuid: string, certificateUuid: string): Observable<model.LocationDTO> {

      return of(
         dbData.locations.find(location => location.uuid === locationUuid)
      ).pipe(

         delay(randomDelay()),
         map(

            location => {
               if (!location) throw new HttpErrorResponse({ status: 404 });

               const certificate = location.certificates.find(certificate => certificate.certificateUuid === certificateUuid);
               if (!certificate) throw new HttpErrorResponse({ status: 404, statusText: "Certificate not found" });

               // ...

               return location;
            }
         )

      )

   }


   removeCertificate(locationUuid: string, certificateUuid: string): Observable<model.LocationDTO> {

      return of(
         dbData.locations.find(location => location.uuid === locationUuid)
      ).pipe(

         delay(randomDelay()),
         map(
            location => {
               if (!location) throw new HttpErrorResponse({ status: 404 });

               const certificate = location.certificates.find(certificate => certificate.certificateUuid === certificateUuid);
               if (!certificate) throw new HttpErrorResponse({ status: 404, statusText: "Certificate not found" });

               location.certificates.splice(location.certificates.indexOf(certificate), 1);
               return location;
            }
         )

      )


   }



}
