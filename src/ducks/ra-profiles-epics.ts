import { EMPTY, of } from "rxjs";
import { catchError, filter, map, switchMap } from "rxjs/operators";

import { actions as alertActions } from "./alerts";
import { extractError } from "utils/net";
import { AppEpic } from "ducks";
import { slice } from "./ra-profiles";
import history from "browser-history";
import { transformRaAcmeLinkDtoToModel, transformRaAuthorizedClientDtoToModel, transformRaProfileDtoToModel } from "./transform/ra-profiles";
import { transformAttributeDescriptorDTOToModel, transformAttributeModelToDTO } from "./transform/attributes";
import { transfromRaAcmeLinkDtoToModel } from "./transform/acme-profiles";


const listRaProfiles: AppEpic = (action$, state$, deps) => {

   return action$.pipe(

      filter(
         slice.actions.listRaProfiles.match
      ),
      switchMap(

         () => deps.apiClients.profiles.getRaProfilesList().pipe(

            map(
               list => slice.actions.listRaProfilesSuccess({
                  raProfiles: list.map(profile => transformRaProfileDtoToModel(profile))
               })
            ),

            catchError(
               err => of(slice.actions.listRaProfilesFailure({ error: extractError(err, "Failed to get RA profiles list") }))
            )
         )
      )
   );

}


const listRaProfilesFailure: AppEpic = (action$, state$, deps) => {

   return action$.pipe(

      filter(
         slice.actions.listRaProfilesFailure.match
      ),
      map(
         action => alertActions.error(action.payload.error || "Unexpected error occurred")
      )
   );

}


const getRaProfileDetail: AppEpic = (action$, state$, deps) => {

   return action$.pipe(

      filter(
         slice.actions.getRaProfileDetail.match
      ),
      switchMap(

         action => deps.apiClients.profiles.getRaProfileDetail(action.payload.uuid).pipe(

            map(
               profileDto => slice.actions.getRaProfileDetailSuccess({
                  raProfile: transformRaProfileDtoToModel(profileDto)
               })
            ),

            catchError(
               err => of(slice.actions.getRaProfileDetailFailure({ error: extractError(err, "Failed to get RA Profile detail") }))
            )

         )
      )

   );

}


const getRaProfileDetailFailure: AppEpic = (action$, state$, deps) => {

   return action$.pipe(

      filter(
         slice.actions.getRaProfileDetailFailure.match
      ),
      map(
         action => alertActions.error(action.payload.error || "Unexpected error occurred")
      )

   );

}


const listAuthorizedClients: AppEpic = (action$, state$, deps) => {

   return action$.pipe(

      filter(
         slice.actions.listAuthorizedClients.match
      ),
      switchMap(

         action => deps.apiClients.profiles.getAuthorizedClients(action.payload.uuid).pipe(

            map(
               clients => slice.actions.listAuthorizedClientsSuccess({
                  authorizedClientsUuids: clients.map(client => transformRaAuthorizedClientDtoToModel(client))
               })
            ),

            catchError(
               err => of(slice.actions.listAuthorizedClientsFailure({ error: extractError(err, "Failed to get list of authorized clients") }))
            )
         )

      )

   );
}


const listAuthorizedClientsFailure: AppEpic = (action$, state$, deps) => {

   return action$.pipe(

      filter(
         slice.actions.listAuthorizedClientsFailure.match
      ),

      map(
         action => alertActions.error(action.payload.error || "Unexpected error occurred")
      )

   );

}


const createRaProfile: AppEpic = (action$, state$, deps) => {

   return action$.pipe(

      filter(
         slice.actions.createRaProfile.match
      ),

      switchMap(

         action => deps.apiClients.profiles.createRaProfile(
            action.payload.authorityInstanceUuid,
            action.payload.name,
            action.payload.attributes.map(attr => transformAttributeModelToDTO(attr)),
            action.payload.description
         ).pipe(

            map(
               uuid => slice.actions.createRaProfileSuccess({ uuid })
            ),

            catchError(
               err => of(slice.actions.createRaProfileFailure({ error: extractError(err, "Failed to create profile") }))
            )
         )
      )

   );

}


const createRaProfileSuccess: AppEpic = (action$, state, deps) => {

   return action$.pipe(

      filter(
         slice.actions.createRaProfileSuccess.match
      ),

      switchMap(

         action => {
            history.push(`./detail/${action.payload}`);
            return EMPTY;
         }

      )

   )

}


const createRaProfileFailure: AppEpic = (action$, state$, deps) => {

   return action$.pipe(
      filter(
         slice.actions.createRaProfileFailure.match
      ),

      map(
         action => alertActions.error(action.payload.error || "Unexpected error occurred")
      )

   );

}



const updateRaProfile: AppEpic = (action$, state$, deps) => {

   return action$.pipe(

      filter(
         slice.actions.updateRaProfile.match
      ),
      switchMap(

         action => deps.apiClients.profiles.updateRaProfile(
            action.payload.profileUuid,
            action.payload.authorityInstanceUuid,
            action.payload.attributes.map(attr => transformAttributeModelToDTO(attr)),
            action.payload.enabled,
            action.payload.description
         ).pipe(

            map(
               raProfileDTO => slice.actions.updateRaProfileSuccess({ raProfile: transformRaProfileDtoToModel(raProfileDTO) })
            ),

            catchError(
               err => of(slice.actions.updateRaProfileFailure({ error: extractError(err, "Failed to update profile") }))
            )

         )

      )

   );

}


const updateRaProfileFailure: AppEpic = (action$, state$, deps) => {

   return action$.pipe(

      filter(
         slice.actions.updateRaProfileFailure.match
      ),
      map(
         action => alertActions.error(action.payload.error || "Unexpected error occurred")
      )

   );

}


const enableRaProfile: AppEpic = (action$, state$, deps) => {

   return action$.pipe(

      filter(
         slice.actions.enableRaProfile.match
      ),

      switchMap(

         action => deps.apiClients.profiles.enableRaProfile(action.payload.uuid).pipe(

            map(
               () => slice.actions.enableRaProfileSuccess({ uuid: action.payload.uuid })
            ),

            catchError(
               err => of(slice.actions.enableRaProfileFailure({ error: extractError(err, "Failed to enable profile") }))
            )

         )
      )

   );

}


const enableRaProfileFailure: AppEpic = (action$, state$, deps) => {

   return action$.pipe(

      filter(
         slice.actions.enableRaProfileFailure.match
      ),
      map(
         action => alertActions.error(action.payload.error || "Unexpected error occurred")
      )
   );

}


const disableRaProfile: AppEpic = (action$, state$, deps) => {

   return action$.pipe(

      filter(
         slice.actions.disableRaProfile.match
      ),

      switchMap(

         action => deps.apiClients.profiles.disableRaProfile(action.payload.uuid).pipe(

            map(
               () => slice.actions.disableRaProfileSuccess({ uuid: action.payload.uuid })
            ),

            catchError(
               err => of(slice.actions.enableRaProfileFailure({ error: extractError(err, "Failed to disable profile") }))
            )

         )
      )

   );

}


const disableRaProfileFailure: AppEpic = (action$, state$, deps) => {

   return action$.pipe(

      filter(
         slice.actions.disableRaProfileFailure.match
      ),

      map(
         action => alertActions.error(action.payload.error || "Unexpected error occurred")
      )

   );

}


const deleteRaProfile: AppEpic = (action$, state$, deps) => {

   return action$.pipe(

      filter(
         slice.actions.deleteRaProfile.match
      ),
      switchMap(

         action => deps.apiClients.profiles.deleteRaProfile(action.payload.uuid).pipe(

            map(
               () => slice.actions.deleteRaProfileSuccess({ uuid: action.payload.uuid })
            ),

            catchError(
               err => of(slice.actions.deleteRaProfileFailure({ error: extractError(err, "Failed to delete profile") }))
            )

         )

      )

   );

}


const deleteRaProfileFailure: AppEpic = (action$, state$, deps) => {

   return action$.pipe(

      filter(
         slice.actions.deleteRaProfileFailure.match
      ),
      map(
         action => alertActions.error(action.payload.error || "Unexpected error occurred")
      )

   );

}


const activateAcme: AppEpic = (action$, state$, deps) => {

   return action$.pipe(

      filter(
         slice.actions.activateAcme.match
      ),
      switchMap(

         action => deps.apiClients.profiles.activateAcme(
            action.payload.uuid,
            action.payload.acmeProfileUuid,
            action.payload.issueCertificateAttributes.map(attr => transformAttributeModelToDTO(attr)),
            action.payload.revokeCertificateAttributes.map(attr => transformAttributeModelToDTO(attr)),
         ).pipe(

            map(
               raAcmeLink => slice.actions.activateAcmeSuccess({
                  raAcmelink: transformRaAcmeLinkDtoToModel(raAcmeLink)
               })
            ),

            catchError(
               err => of(slice.actions.activateAcmeFailure({ error: extractError(err, "Failed to activate ACME") }))
            )

         )

      )

   );

}


const activateAcmeFailure: AppEpic = (action$, state$, deps) => {

   return action$.pipe(

      filter(
         slice.actions.activateAcmeFailure.match
      ),
      map(
         action => alertActions.error(action.payload.error || "Unexpected error occurred")
      )

   );

}


const deactivateAcme: AppEpic = (action$, state$, deps) => {

   return action$.pipe(

      filter(
         slice.actions.deactivateAcme.match
      ),
      switchMap(

         action => deps.apiClients.profiles.deactivateAcme(action.payload.uuid).pipe(

            map(
               () => slice.actions.deactivateAcmeSuccess({ uuid: action.payload.uuid })
            ),

            catchError(
               err => of(slice.actions.deactivateAcmeFailure({ error: extractError(err, "Failed to deactivate ACME") }))
            )

         )

      )

   );

}


const deactivateAcmeFailure: AppEpic = (action$, state$, deps) => {

   return action$.pipe(

      filter(
         slice.actions.deactivateAcmeFailure.match
      ),
      map(
         action => alertActions.error(action.payload.error || "Unexpected error occurred")
      )

   );

}


const getAcmeDetails: AppEpic = (action$, state$, deps) => {

   return action$.pipe(

      filter(
         slice.actions.getAcmeDetails.match
      ),
      switchMap(

         action => deps.apiClients.profiles.getRaAcmeProfile(action.payload.uuid).pipe(

            map(
               acmeDetails => slice.actions.getAcmeDetailsSuccess({
                  raAcmeLink: transfromRaAcmeLinkDtoToModel(acmeDetails)
               })
            ),

            catchError(
               err => of(slice.actions.getAcmeDetailsFailure({ error: extractError(err, "Failed to get ACME details") }))
            )

         )

      )

   );

}


const getAcmeDetailsFailure: AppEpic = (action$, state$, deps) => {

   return action$.pipe(

      filter(
         slice.actions.getAcmeDetailsFailure.match
      ),
      map(
         action => alertActions.error(action.payload.error || "Unexpected error occurred")
      )

   );

}


const listIssuanceAttributes: AppEpic = (action$, state$, deps) => {

   return action$.pipe(

      filter(
         slice.actions.listIssuanceAttributeDescriptors.match
      ),
      switchMap(

         action => deps.apiClients.profiles.getIssueAttributes(action.payload.uuid).pipe(

            map(
               issuanceAttributes => slice.actions.listIssuanceAttributesDescriptorsSuccess({
                  uuid: action.payload.uuid,
                  attributesDescriptors: issuanceAttributes.map(issuanceAttribute => transformAttributeDescriptorDTOToModel(issuanceAttribute))
               })
            ),

            catchError(
               err => of(slice.actions.listIssuanceAttributesFailure({ error: extractError(err, "Failed to list issuance attributes") }))
            )

         )
      )

   );

}


const listIssuanceAttributesFailure: AppEpic = (action$, state$, deps) => {

   return action$.pipe(

      filter(
         slice.actions.listIssuanceAttributesFailure.match
      ),
      map(
         action => alertActions.error(action.payload.error || "Unexpected error occurred")
      )

   );

}


const listRevocationAttributes: AppEpic = (action$, state$, deps) => {

   return action$.pipe(

      filter(
         slice.actions.listRevocationAttributes.match
      ),

      switchMap(

         action => deps.apiClients.profiles.getRevocationAttributes(action.payload.uuid).pipe(

            map(
               revocationAttributes => slice.actions.listRevocationAttributesSuccess({
                  uuid: action.payload.uuid,
                  attributesDescriptors: revocationAttributes.map(revocationAttribute => transformAttributeDescriptorDTOToModel(revocationAttribute))
               })
            ),

            catchError(
               err => of(slice.actions.listRevocationAttributesFailure({ error: extractError(err, "Failed to list revocation attributes") }))
            )

         )

      )

   );

}


const listRevocationAttributesFailure: AppEpic = (action$, state$, deps) => {

   return action$.pipe(

      filter(
         slice.actions.listRevocationAttributesFailure.match
      ),

      map(
         action => alertActions.error(action.payload.error || "Unexpected error occurred")
      )

   );

}


const bulkEnableProfiles: AppEpic = (action$, state$, deps) => {

   return action$.pipe(

      filter(
         slice.actions.bulkEnableRaProfiles.match
      ),
      switchMap(

         action => deps.apiClients.profiles.bulkEnableRaProfile(action.payload.uuids).pipe(

            map(
               () => slice.actions.bulkEnableRaProfilesSuccess({ uuids: action.payload.uuids })
            ),

            catchError(
               err => of(slice.actions.bulkEnableRaProfilesFailure({ error: extractError(err, "Failed to enable profiles") }))
            )

         )

      )

   );

}


const bulkEnableProfilesFailure: AppEpic = (action$, state$, deps) => {

   return action$.pipe(

      filter(
         slice.actions.bulkEnableRaProfilesFailure.match
      ),
      map(
         action => alertActions.error(action.payload.error || "Unexpected error occurred")
      )

   );

}


const bulkDisableProfiles: AppEpic = (action$, state$, deps) => {

   return action$.pipe(

      filter(
         slice.actions.bulkDisableRaProfiles.match
      ),

      switchMap(

         action => deps.apiClients.profiles.bulkDisableRaProfile(action.payload.uuids).pipe(

            map(
               () => slice.actions.bulkDisableRaProfilesSuccess({ uuids: action.payload.uuids })
            ),

            catchError(
               err => of(slice.actions.bulkDisableRaProfilesFailure({ error: extractError(err, "Failed to disable profiles") }))
            )

         )

      )

   );

}


const bulkDisableProfilesFailure: AppEpic = (action$, state$, deps) => {

   return action$.pipe(

      filter(
         slice.actions.bulkDisableRaProfilesFailure.match
      ),
      map(
         action => alertActions.error(action.payload.error || "Unexpected error occurred")
      )

   );

}


const bulkDeleteProfiles: AppEpic = (action$, state$, deps) => {

   return action$.pipe(

      filter(
         slice.actions.bulkDeleteRaProfiles.match
      ),
      switchMap(

         action => deps.apiClients.profiles.bulkDeleteRaProfile(action.payload.uuids).pipe(

            map(
               errors => slice.actions.bulkDeleteRaProfilesSuccess({ uuids: action.payload.uuids })
            ),

            catchError(
               err => of(slice.actions.bulkDeleteRaProfilesFailure({ error: extractError(err, "Failed to delete profiles") }))
            )

         )
      )

   );

}


const bulkDeleteProfilesFailure: AppEpic = (action$, state$, deps) => {

   return action$.pipe(

      filter(
         slice.actions.bulkDeleteRaProfilesFailure.match
      ),
      map(
         action => alertActions.error(action.payload.error || "Unexpected error occurred")
      )

   );

}


const epics = [
   listRaProfiles,
   listRaProfilesFailure,
   listAuthorizedClients,
   listAuthorizedClientsFailure,
   getRaProfileDetail,
   getRaProfileDetailFailure,
   createRaProfile,
   createRaProfileFailure,
   createRaProfileSuccess,
   updateRaProfile,
   updateRaProfileFailure,
   enableRaProfile,
   enableRaProfileFailure,
   disableRaProfile,
   disableRaProfileFailure,
   deleteRaProfile,
   deleteRaProfileFailure,
   activateAcme,
   activateAcmeFailure,
   deactivateAcme,
   deactivateAcmeFailure,
   getAcmeDetails,
   getAcmeDetailsFailure,
   listIssuanceAttributes,
   listIssuanceAttributesFailure,
   listRevocationAttributes,
   listRevocationAttributesFailure,
   bulkEnableProfiles,
   bulkEnableProfilesFailure,
   bulkDisableProfiles,
   bulkDisableProfilesFailure,
   bulkDeleteProfiles,
   bulkDeleteProfilesFailure
];


export default epics;