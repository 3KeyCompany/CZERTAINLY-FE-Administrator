import { iif, of } from "rxjs";
import { catchError, filter, map, mergeMap, switchMap } from "rxjs/operators";

import { AppEpic } from "ducks";
import { extractError } from "utils/net";

import { slice } from "./compliance-profiles";
import { actions as appRedirectActions } from "./app-redirect";
import { actions as alertActions } from "./alerts";

import {
   transformComplianceConnectorGroupDTOToModel,
   transformComplianceConnectorRuleDTOToModel,
   transformComplianceProfileDtoToModel,
   transformComplianceProfileListDtoToModel,
   transformComplianceRuleDTOToModel
} from "./transform/compliance-profiles";


const listComplianceProfiles: AppEpic = (action$, state$, deps) => {

   return action$.pipe(

      filter(
         slice.actions.listComplianceProfiles.match
      ),
      switchMap(

         () => deps.apiClients.complianceProfile.getComplianceProfileList().pipe(

            map(
               complianceProfiles => slice.actions.listComplianceProfilesSuccess(
                  { complianceProfileList: complianceProfiles.map(transformComplianceProfileListDtoToModel) }
               )
            ),

            catchError(
               error => of(
                  slice.actions.listComplianceProfilesFailed({ error: extractError(error, "Failed to get Compliance Profiles list") }),
                  appRedirectActions.fetchError({ error, message: "Failed to get Compliance Profiles list" })
               )

            )

         )

      )

   );

}


const getComplianceProfileDetail: AppEpic = (action$, state$, deps) => {

   return action$.pipe(

      filter(
         slice.actions.getComplianceProfile.match
      ),

      switchMap(

         action => deps.apiClients.complianceProfile.getComplianceProfileDetail(action.payload.uuid).pipe(

            map(
               detail => slice.actions.getComplianceProfileSuccess({ complianceProfile: transformComplianceProfileDtoToModel(detail) })
            ),

            catchError(
               error => of(
                  slice.actions.getComplianceProfileFailed({ error: extractError(error, "Failed to get Compliance Profile details") }),
                  appRedirectActions.fetchError({ error, message: "Failed to get Compliance Profile details" })
               )
            )

         )

      )

   );

}


const createComplianceProfile: AppEpic = (action$, state$, deps) => {

   return action$.pipe(

      filter(
         slice.actions.createComplianceProfile.match
      ),

      switchMap(

         action => deps.apiClients.complianceProfile.createComplianceProfile(
            action.payload.name,
            action.payload.description
         ).pipe(

            mergeMap(
               obj => of(
                  slice.actions.createComplianceProfileSuccess({ uuid: obj.uuid }),
                  appRedirectActions.redirect({ url: `../detail/${obj.uuid}` })
               )
            ),

            catchError(
               error => of(
                  slice.actions.createComplianceProfileFailed({ error: extractError(error, "Failed to create Compliance Profile") }),
                  appRedirectActions.fetchError({ error, message: "Failed to create Compliance Profile" })
               )
            )

         )

      )

   )

}


const deleteComplianceProfile: AppEpic = (action$, state$, deps) => {

   return action$.pipe(

      filter(
         slice.actions.deleteComplianceProfile.match
      ),
      switchMap(

         action => deps.apiClients.complianceProfile.deleteComplianceProfile(action.payload.uuid).pipe(

            mergeMap(
               () => of(
                  slice.actions.deleteComplianceProfileSuccess({ uuid: action.payload.uuid }),
                  appRedirectActions.redirect({ url: "../../" })
               )
            ),

            catchError(
               error => of(
                  slice.actions.deleteComplianceProfileFailed({ error: extractError(error, "Failed to delete Compliance Profile") }),
                  appRedirectActions.fetchError({ error, message: "Failed to delete Compliance Profile" })
               )
            )

         )

      )

   );

}


const bulkDeleteComplianceProfiles: AppEpic = (action$, state$, deps) => {

   return action$.pipe(

      filter(
         slice.actions.bulkDeleteComplianceProfiles.match
      ),

      switchMap(

         action => deps.apiClients.complianceProfile.bulkDeleteComplianceProfiles(action.payload.uuids).pipe(

            map(
               errors => slice.actions.bulkDeleteComplianceProfilesSuccess({ uuids: action.payload.uuids, errors })
            ),

            catchError(
               error => of(
                  slice.actions.bulkDeleteComplianceProfilesFailed({ error: extractError(error, "Failed to delete Compliance Accounts") }),
                  appRedirectActions.fetchError({ error, message: "Failed to delete Compliance Accounts" })
               )
            )

         )

      )

   )

}


const bulkForceDeleteComplianceProfiles: AppEpic = (action$, state$, deps) => {


   return action$.pipe(

      filter(
         slice.actions.bulkForceDeleteComplianceProfiles.match
      ),
      switchMap(

         action => deps.apiClients.complianceProfile.bulkForceDeleteComplianceProfiles(action.payload.uuids).pipe(

            mergeMap(

               () => iif(

                  () => !!action.payload.redirect,
                  of(
                     slice.actions.bulkForceDeleteComplianceProfilesSuccess({ uuids: action.payload.uuids, redirect: action.payload.redirect }),
                     appRedirectActions.redirect({ url: action.payload.redirect! })
                  ),
                  of(
                     slice.actions.bulkForceDeleteComplianceProfilesSuccess({ uuids: action.payload.uuids, redirect: action.payload.redirect })
                  )

               )

            ),

            catchError(
               error => of(
                  slice.actions.bulkForceDeleteComplianceProfilesFailed({ error: extractError(error, "Failed to delete Compliance Accounts") }),
                  appRedirectActions.fetchError({ error, message: "Failed to delete Compliance Accounts" })
               )
            )

         )

      )

   );

}


const addRule: AppEpic = (action$, state$, deps) => {

   return action$.pipe(

      filter(
         slice.actions.addRule.match
      ),
      switchMap(

         action => deps.apiClients.complianceProfile.addRuleToComplianceProfile(
            action.payload.uuid,
            action.payload.connectorUuid,
            action.payload.kind,
            action.payload.ruleUuid,
            action.payload.attributes
         ).pipe(

            map(
               rule => slice.actions.addRuleSuccess({
                  connectorUuid: action.payload.connectorUuid,
                  connectorName: action.payload.connectorName,
                  kind: action.payload.kind,
                  rule: transformComplianceRuleDTOToModel(rule)
               })
            ),

            catchError(
               error => of(
                  slice.actions.addRuleFailed({ error: extractError(error, "Failed to add rule to Compliance Profile") }),
                  appRedirectActions.fetchError({ error, message: "Failed to add rule to Compliance Profile" })
               )
            )

         )

      )

   )
}


const addGroup: AppEpic = (action$, state$, deps) => {

   return action$.pipe(

      filter(
         slice.actions.addGroup.match
      ),
      switchMap(

         action => deps.apiClients.complianceProfile.addGroupToComplianceProfile(
            action.payload.uuid,
            action.payload.connectorUuid,
            action.payload.kind,
            action.payload.groupUuid,
         ).pipe(

            map(
               () => slice.actions.addGroupSuccess({
                  uuid: action.payload.uuid,
                  connectorUuid: action.payload.connectorUuid,
                  kind: action.payload.kind,
                  groupUuid: action.payload.groupUuid,
                  connectorName: action.payload.connectorName,
                  groupName: action.payload.groupName,
                  description: action.payload.description
               })
            ),

            catchError(
               error => of(
                  slice.actions.addGroupFailed({ error: extractError(error, "Failed to add group to Compliance Profile") }),
                  appRedirectActions.fetchError({ error, message: "Failed to add group to Compliance Profile" })
               )
            )

         )

      )

   )
}


const deleteRule: AppEpic = (action$, state$, deps) => {

   return action$.pipe(

      filter(
         slice.actions.deleteRule.match
      ),
      switchMap(

         action => deps.apiClients.complianceProfile.deleteRuleFromComplianceProfile(
            action.payload.uuid,
            action.payload.connectorUuid,
            action.payload.kind,
            action.payload.ruleUuid
         ).pipe(

            map(
               () => slice.actions.deleteRuleSuccess({ connectorUuid: action.payload.connectorUuid, kind: action.payload.kind, ruleUuid: action.payload.ruleUuid })
            ),
            catchError(
               error => of(
                  slice.actions.deleteRuleFailed({ error: extractError(error, "Failed to delete rule from Compliance Profile") }),
                  appRedirectActions.fetchError({ error, message: "Failed to delete rule from Compliance Profile" })
               )
            )

         )

      )

   )
}


const deleteGroup: AppEpic = (action$, state$, deps) => {

   return action$.pipe(

      filter(
         slice.actions.deleteGroup.match
      ),
      switchMap(

         action => deps.apiClients.complianceProfile.deleteGroupFromComplianceProfile(
            action.payload.uuid,
            action.payload.connectorUuid,
            action.payload.kind,
            action.payload.groupUuid
         ).pipe(

            map(
               () => slice.actions.deleteGroupSuccess({ connectorUuid: action.payload.connectorUuid, kind: action.payload.kind, groupUuid: action.payload.groupUuid })
            ),

            catchError(
               error => of(
                  slice.actions.deleteGroupFailed({ error: extractError(error, "Failed to delete group from Compliance Profile") }),
                  appRedirectActions.fetchError({ error, message: "Failed to delete group from Compliance Profile" })
               )
            )

         )

      )

   )
}


const associateRaProfile: AppEpic = (action$, state$, deps) => {

   return action$.pipe(

      filter(
         slice.actions.associateRaProfile.match
      ),
      switchMap(

         action => deps.apiClients.complianceProfile.associateComplianceProfileToRaProfile(
            action.payload.uuid,
            action.payload.raProfileUuids.map((raProfile) => (raProfile.uuid))
         ).pipe(

            map(
               () => slice.actions.associateRaProfileSuccess({ uuid: action.payload.uuid, raProfileUuids: action.payload.raProfileUuids })
            ),

            catchError(
               error => of(
                  slice.actions.associateRaProfileFailed({ error: extractError(error, "Failed to associate RA Profile to Compliance Profile") }),
                  appRedirectActions.fetchError({ error, message: "Failed to associate RA Profile to Compliance Profile" })
               )
            )

         )

      )

   )
}


const dissociateRaProfile: AppEpic = (action$, state$, deps) => {

   return action$.pipe(

      filter(
         slice.actions.dissociateRaProfile.match
      ),
      switchMap(

         action => deps.apiClients.complianceProfile.dissociateComplianceProfileFromRaProfile(
            action.payload.uuid,
            action.payload.raProfileUuids
         ).pipe(

            map(
               () => slice.actions.dissociateRaProfileSuccess({ uuid: action.payload.uuid, raProfileUuids: action.payload.raProfileUuids })
            ),

            catchError(
               error => of(
                  slice.actions.dissociateRaProfileFailed({ error: extractError(error, "Failed to dissociate RA Profile from Compliance Profile") }),
                  appRedirectActions.fetchError({ error, message: "Failed to dissociate RA Profile from Compliance Profile" })
               )
            )

         )

      )

   )
}


const getAssociatedRaProfiles: AppEpic = (action$, state$, deps) => {

   return action$.pipe(

      filter(
         slice.actions.getAssociatedRaProfiles.match
      ),
      switchMap(

         action => deps.apiClients.complianceProfile.getAssociatedRaProfiles(
            action.payload.uuid
         ).pipe(

            map(
               (raProfiles) => slice.actions.getAssociatedRaProfilesSuccess({ raProfiles: raProfiles })
            ),

            catchError(
               error => of(
                  slice.actions.getAssociatedRaProfilesFailed({ error: extractError(error, "Failed to get associated RA Profiles") }),
                  appRedirectActions.fetchError({ error, message: "Failed to get associated RA Profiles" })
               )
            )

         )

      )

   )
}


const getRules: AppEpic = (action$, state$, deps) => {

   return action$.pipe(

      filter(
         slice.actions.listComplianceRules.match
      ),
      switchMap(

         action => deps.apiClients.complianceProfile.getComplianceProfileRules()
            .pipe(

               map(
                  (rules) => slice.actions.listComplianceRulesSuccess(rules.map(transformComplianceConnectorRuleDTOToModel))
               ),

               catchError(
                  error => of(
                     slice.actions.listComplianceRulesFailed({ error: extractError(error, "Failed to get compliance rules") }),
                     appRedirectActions.fetchError({ error, message: "Failed to get compliance rules" })
                  )
               )

            )

      )

   )
}


const getGroups: AppEpic = (action$, state$, deps) => {

   return action$.pipe(

      filter(
         slice.actions.listComplianceGroups.match
      ),
      switchMap(

         action => deps.apiClients.complianceProfile.getComplianceProfileGroups()
            .pipe(

               map(
                  (groups) => slice.actions.listComplianceGroupsSuccess(groups.map(transformComplianceConnectorGroupDTOToModel))
               ),

               catchError(
                  error => of(
                     slice.actions.listComplianceGroupsFailed({ error: extractError(error, "Failed to get compliance groups") }),
                     appRedirectActions.fetchError({ error, message: "Failed to get compliance groups" })
                  )
               )

            )

      )

   )
}


const checkCompliance: AppEpic = (action$, state$, deps) => {

   return action$.pipe(

      filter(
         slice.actions.checkCompliance.match
      ),
      switchMap(

         action => deps.apiClients.complianceProfile.checkCompliance(
            action.payload.uuids
         ).pipe(

            mergeMap(
               () => of(
                  slice.actions.checkComplianceSuccess(),
                  alertActions.success("Compliance Check for the certificates initiated")
               )
            ),

            catchError(
               error => of(
                  slice.actions.checkComplianceFailed({ error: extractError(error, "Failed to check compliance") }),
                  appRedirectActions.fetchError({ error, message: "Failed to check compliance" })
               )

            )

         )

      )

   )
}




const epics = [
   listComplianceProfiles,
   getComplianceProfileDetail,
   createComplianceProfile,
   deleteComplianceProfile,
   bulkDeleteComplianceProfiles,
   bulkForceDeleteComplianceProfiles,
   addRule,
   deleteRule,
   addGroup,
   deleteGroup,
   associateRaProfile,
   dissociateRaProfile,
   getAssociatedRaProfiles,
   getRules,
   getGroups,
   checkCompliance,
];


export default epics;