import { AdministratorModel, AdministratorRole, CertificateModel } from "models";
import { createFeatureSelector } from "utils/ducks";
import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DeleteObjectErrorModel } from "models/deleteObjectErrorModel";


export type State = {

   checkedRows: string[];

   deleteErrorMessage: string;
   bulkDeleteErrorMessages: DeleteObjectErrorModel[];

   administrator?: AdministratorModel;
   administrators: AdministratorModel[];

   isFetchingList: boolean;
   isFetchingDetail: boolean;
   isCreating: boolean;
   isDeleting: boolean;
   isUpdating: boolean;
   isEnabling: boolean;
   isDisabling: boolean;
   isBulkDeleting: boolean;
   isBulkEnabling: boolean;
   isBulkDisabling: boolean;

};


export const initialState: State = {

   checkedRows: [],

   deleteErrorMessage: "",
   bulkDeleteErrorMessages: [],

   administrators: [],

   isFetchingDetail: false,
   isFetchingList: false,
   isCreating: false,
   isDeleting: false,
   isUpdating: false,
   isEnabling: false,
   isDisabling: false,
   isBulkDeleting: false,
   isBulkEnabling: false,
   isBulkDisabling: false

};


export const slice = createSlice({

   name: "administrators",

   initialState,

   reducers: {

      resetState: (state, action: PayloadAction<void>) => {

         state = initialState;

      },


      setCheckedRows: (state, action: PayloadAction<{ checkedRows: string[] }>) => {

         state.checkedRows = action.payload.checkedRows;

      },


      clearDeleteErrorMessages: (state, action: PayloadAction<void>) => {

         state.deleteErrorMessage = "";
         state.bulkDeleteErrorMessages = [];

      },


      listAdmins: (state, action: PayloadAction<void>) => {

         state.checkedRows = [];
         state.isFetchingList = true;

      },


      listAdminsSuccess: (state, action: PayloadAction<{ adminList: AdministratorModel[] }>) => {

         state.isFetchingList = false;
         state.administrators = action.payload.adminList;

      },


      listAdminFailure: (state, action: PayloadAction<{ error: string | undefined }>) => {

         state.isFetchingList = false;
      },


      getAdminDetail: (state, action: PayloadAction<{ uuid: string }>) => {

         state.administrator = undefined;
         state.isFetchingDetail = true;

      },


      getAdminDetailSuccess: (state, action: PayloadAction<{ administrator: AdministratorModel }>) => {

         state.isFetchingDetail = false;

         state.administrator = action.payload.administrator;

         const administratorIndex = state.administrators.findIndex(administrator => administrator.uuid === action.payload.administrator.uuid);

         if (administratorIndex >= 0) {
            state.administrators[administratorIndex] = action.payload.administrator;
         } else {
            state.administrators.push(action.payload.administrator);
         }

      },


      getAdminDetailFailure: (state, acttion: PayloadAction<{ error: string | undefined }>) => {

         state.isFetchingDetail = false;

      },


      createAdmin: (state, action: PayloadAction<{
         name: string,
         surname: string,
         username: string,
         email: string,
         description: string,
         role: AdministratorRole,
         certificate: CertificateModel | undefined,
         certificateUuid: string | undefined
      }>) => {

         state.isCreating = true;

      },


      createAdminSuccess: (state, action: PayloadAction<{ uuid: string }>) => {

         state.isCreating = false;

      },


      createAdminFailure: (state, action: PayloadAction<{ error: string | undefined }>) => {

         state.isCreating = false;

      },


      updateAdmin: (state, action: PayloadAction<{
         uuid: string,
         name: string,
         surname: string,
         username: string,
         email: string,
         certificate: CertificateModel | undefined,
         description: string,
         role: AdministratorRole,
         certificateUuid: string | undefined
      }>) => {

         state.isUpdating = true;

      },


      updateAdminSuccess: (state, action: PayloadAction<{ administrator: AdministratorModel }>) => {

         state.isUpdating = false;

         const adminIndex = state.administrators.findIndex(administrator => administrator.uuid === action.payload.administrator.uuid)

         if (adminIndex >= 0) {
            state.administrators[adminIndex] = action.payload.administrator;
         } else {
            state.administrators.push(action.payload.administrator);
         }

         if (state.administrator?.uuid === action.payload.administrator.uuid) state.administrator = action.payload.administrator;

      },


      updateAdminFailure: (state, action: PayloadAction<{ error: string | undefined }>) => {

         state.isUpdating = false;

      },


      deleteAdmin: (state, action: PayloadAction<{ uuid: string }>) => {

         state.isDeleting = true;

      },


      deleteAdminSuccess: (state, action: PayloadAction<{ uuid: string }>) => {

         state.isDeleting = false;

         state.checkedRows = [];

         const adminIndex = state.administrators.findIndex(administrator => administrator.uuid === action.payload.uuid);

         if (adminIndex >= 0) state.administrators.splice(adminIndex, 1);

         if (state.administrator?.uuid === action.payload.uuid) state.administrator = undefined;

      },


      deleteAdminFailure: (state, action: PayloadAction<{ error: string | undefined }>) => {

         state.deleteErrorMessage = action.payload.error || "Unknown error";
         state.isDeleting = false;

      },


      bulkDeleteAdmins: (state, action: PayloadAction<{ uuids: string[] }>) => {

         state.bulkDeleteErrorMessages = [];
         state.isBulkDeleting = true;

      },


      bulkDeleteAdminsSuccess: (state, action: PayloadAction<{ uuids: string[] }>) => {

         state.isBulkDeleting = false;
         state.checkedRows = [];

         action.payload.uuids.forEach(

            uuid => {
               const adminIndex = state.administrators.findIndex(administrator => administrator.uuid === uuid)
               if (adminIndex >= 0) state.administrators.splice(adminIndex, 1);
            }
         )

         if (state.administrator && action.payload.uuids.includes(state.administrator.uuid)) state.administrator = undefined;

      },


      bulkDeleteAdminsFailure: (state, action: PayloadAction<{ error: string | undefined }>) => {

         state.isBulkDeleting = false;

      },


      enableAdmin: (state, action: PayloadAction<{ uuid: string }>) => {

         state.isEnabling = true;

      },


      enableAdminSuccess: (state, action: PayloadAction<{ uuid: string }>) => {

         state.isEnabling = false;

         const admin = state.administrators.find(administrator => administrator.uuid === action.payload.uuid)
         if (admin) admin.enabled = true;

         if (state.administrator?.uuid === action.payload.uuid) state.administrator.enabled = true;

      },


      enableAdminFailure: (state, action: PayloadAction<{ error: string | undefined }>) => {

         state.isEnabling = false;

      },


      bulkEnableAdmins: (state, action: PayloadAction<{ uuids: string[] }>) => {

         state.isBulkEnabling = true;

      },


      bulkEnableAdminsSuccess: (state, action: PayloadAction<{ uuids: string[] }>) => {

         state.isBulkEnabling = false;

         action.payload.uuids.forEach(

            uuid => {
               const admin = state.administrators.find(administrator => administrator.uuid === uuid)
               if (admin) admin.enabled = true;
            }

         )

         if (state.administrator && action.payload.uuids.includes(state.administrator.uuid)) state.administrator.enabled = true;

      },


      bulkEnableAdminsFailure: (state, action: PayloadAction<{ error: string | undefined }>) => {

         state.isBulkEnabling = false;

      },


      disableAdmin: (state, action: PayloadAction<{ uuid: string }>) => {

         state.isDisabling = true;

      },


      disableAdminSuccess: (state, action: PayloadAction<{ uuid: string }>) => {

         state.isDisabling = false;

         const admin = state.administrators.find(administrator => administrator.uuid === action.payload.uuid)

         if (admin) admin.enabled = false;

         if (state.administrator?.uuid === action.payload.uuid) state.administrator.enabled = false;

      },


      disableAdminFailure: (state, action: PayloadAction<{ error: string | undefined }>) => {

         state.isDisabling = false;

      },


      bulkDisableAdmins: (state, action: PayloadAction<{ uuids: string[] }>) => {

         state.isBulkDisabling = true;

      },


      bulkDisableAdminsSuccess: (state, action: PayloadAction<{ uuids: string[] }>) => {

         state.isBulkDisabling = false;

         action.payload.uuids.forEach(

            uuid => {
               const admin = state.administrators.find(administrator => administrator.uuid === uuid)
               if (admin) admin.enabled = false;
            }

         )

         if (state.administrator && action.payload.uuids.includes(state.administrator.uuid)) state.administrator.enabled = false;

      },


      bulkDisableAdminsFailure: (state, action: PayloadAction<{ error: string | undefined }>) => {

         state.isBulkDisabling = false;

      },
   }

})


const state = createFeatureSelector<State>(slice.name);

const checkedRows = createSelector(state, state => state.checkedRows);

const deleteErrorMessage = createSelector(state, state => state.deleteErrorMessage);
const bulkDeleteErrorMessages = createSelector(state, state => state.bulkDeleteErrorMessages);

const administrators = createSelector(state, state => state.administrators);
const administrator = createSelector(state, state => state.administrator);

const isFetchingList = createSelector(state, state => state.isFetchingList);
const isFetchingDetail = createSelector(state, state => state.isFetchingDetail);
const isCreating = createSelector(state, state => state.isCreating);
const isUpdating = createSelector(state, state => state.isUpdating);
const isDeleting = createSelector(state, state => state.isDeleting);
const isEnabling = createSelector(state, state => state.isEnabling);
const isDisabling = createSelector(state, state => state.isDisabling);
const isBulkDeleting = createSelector(state, state => state.isBulkDeleting);
const isBulkEnabling = createSelector(state, state => state.isBulkEnabling);
const isBulkDisabling = createSelector(state, state => state.isBulkDisabling);


export const selectors = {

   state,

   checkedRows,

   deleteErrorMessage,
   bulkDeleteErrorMessages,

   administrator,
   administrators,

   isFetchingList,
   isFetchingDetail,
   isCreating,
   isDeleting,
   isUpdating,
   isEnabling,
   isDisabling,
   isBulkDeleting,
   isBulkEnabling,
   isBulkDisabling
};


export const actions = slice.actions;


export default slice.reducer;
