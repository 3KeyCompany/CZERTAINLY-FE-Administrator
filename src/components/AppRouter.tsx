import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import React, { useMemo } from "react";

import { selectors } from "ducks/auth";

import Layout from "./Layout";
import Spinner from "./Spinner";

import AppRedirect from "./AppRedirect";
import AppLogin from "./AppLogin/AppLogin";

import Home from "./_pages/home";
import About from "./_pages/about";
import Dashboard from "./_pages/dashboard";

import UserProfileDetail from "./_pages/user-profile/detail";
import UserProfileEdit from "./_pages/user-profile/form";

import UsersList from "./_pages/users/list";
import UserDetail from "./_pages/users/detail";
import UserEdit from "./_pages/users/form";

import RolesList from "./_pages/roles/list";
import RoleDetail from "./_pages/roles/detail";
import RoleEdit from "./_pages/roles/RoleForm";
import RoleUsers from "./_pages/roles/RoleUsersForm";
import RolePermissions from "./_pages/roles/RolePermissionsForm";

import ConnectorList from "./_pages/connectors/list";
import ConnectorDetail from "./_pages/connectors/detail";
import ConnectorEdit from "./_pages/connectors/form";

import AuthoritiesList from "./_pages/authorities/list";
import AuthorityDetail from "./_pages/authorities/detail";
import AuthorityEdit from "./_pages/authorities/form";

import RaProfilesList from "./_pages/ra-profiles/list";
import RaProfileDetail from "./_pages/ra-profiles/detail";
import RaProfileEdit from "./_pages/ra-profiles/form";

import AcmeProfilesList from "./_pages/acme-profiles/list";
import AcmeProfileDetail from "./_pages/acme-profiles/detail";
import AcmeProfileEdit from "./_pages/acme-profiles/form";

import AcmeAccountsList from "./_pages/acme-accounts/list";
import AcmeAccountDetail from "./_pages/acme-accounts/detail";

import GroupList from "./_pages/group/list";
import GroupDetail from "./_pages/group/detail";
import GroupEdit from "./_pages/group/form";

import CredentialsList from "./_pages/credentials/list";
import CredentialDetail from "./_pages/credentials/detail";
import CredentialEdit from "./_pages/credentials/form";

import EntitiesList from "./_pages/entities/list";
import EntityDetail from "./_pages/entities/detail";
import EntityEdit from "./_pages/entities/form";

import LocationsList from "./_pages/locations/list";
import LocationDetail from "./_pages/locations/detail";
import LocationEdit from "./_pages/locations/form";

export default function AppRouter() {

   const profile = useSelector(selectors.profile);

   const appRoutes = useMemo(

      () => (

         <>
            <Route element={< Layout />}>

               <Route path="" element={<Navigate to="/home" />} />
               <Route path="/" element={<Navigate to="/home" />} />

               <Route path="/home" element={<Home />} />
               <Route path="/about" element={<About />} />
               <Route path="/dashboard" element={<Dashboard />} />

               <Route path="/users" element={<UsersList />} />
               <Route path="/users/list" element={<Navigate to="/users" />} />
               <Route path="/users/detail/:id" element={<UserDetail />} />
               <Route path="/users/add" element={<UserEdit />} />
               <Route path="/users/edit/:id" element={<UserEdit />} />

               <Route path="/roles" element={<RolesList />} />
               <Route path="/roles/list" element={<Navigate to="/roles" />} />
               <Route path="/roles/detail/:id" element={<RoleDetail />} />
               <Route path="/roles/add" element={<RoleEdit />} />
               <Route path="/roles/edit/:id" element={<RoleEdit />} />
               <Route path="/roles/users/:id" element={<RoleUsers />} />
               <Route path="/roles/permissions/:id" element={<RolePermissions />} />

               <Route path="/connectors" element={<ConnectorList />} />
               <Route path="/connectors/list" element={<Navigate to="/connectors" />} />
               <Route path="/connectors/detail/:id" element={<ConnectorDetail />} />
               <Route path="/connectors/add" element={<ConnectorEdit />} />
               <Route path="/connectors/edit/:id" element={<ConnectorEdit />} />

               <Route path="/authorities" element={<AuthoritiesList />} />
               <Route path="/authorities/list" element={<Navigate to="/authorities" />} />
               <Route path="/authorities/detail/:id" element={<AuthorityDetail />} />
               <Route path="/authorities/add" element={<AuthorityEdit />} />
               <Route path="/authorities/edit/:id" element={<AuthorityEdit />} />

               <Route path="/raprofiles" element={<RaProfilesList />} />
               <Route path="/raprofiles/list" element={<Navigate to="/raprofiles" />} />
               <Route path="/raprofiles/detail/:authorityId/:id" element={<RaProfileDetail />} />
               <Route path="/raprofiles/add" element={<RaProfileEdit />} />
               <Route path="/raprofiles/edit/:authorityId/:id" element={<RaProfileEdit />} />

               <Route path="/acmeprofiles" element={<AcmeProfilesList />} />
               <Route path="/acmeprofiles/list" element={<Navigate to="/acmeprofiles" />} />
               <Route path="/acmeprofiles/detail/:id" element={<AcmeProfileDetail />} />
               <Route path="/acmeprofiles/edit/:id" element={<AcmeProfileEdit />} />
               <Route path="/acmeprofiles/add" element={<AcmeProfileEdit />} />

               <Route path="/acmeaccounts" element={<AcmeAccountsList />} />
               <Route path="/acmeaccounts/list" element={<Navigate to="/acmeaccounts" />} />
               <Route path="/acmeaccounts/detail/:acmeProfileId/:id" element={<AcmeAccountDetail />} />

               <Route path="/groups" element={<GroupList />} />
               <Route path="/groups/list" element={<Navigate to="/groups" />} />
               <Route path="/groups/detail/:id" element={<GroupDetail />} />
               <Route path="/groups/add" element={<GroupEdit />} />
               <Route path="/groups/edit/:id" element={<GroupEdit />} />

               <Route path="/credentials" element={<CredentialsList />} />
               <Route path="/credentials/list" element={<Navigate to="/credentials" />} />
               <Route path="/credentials/detail/:id" element={<CredentialDetail />} />
               <Route path="/credentials/add" element={<CredentialEdit />} />
               <Route path="/credentials/edit/:id" element={<CredentialEdit />} />

               <Route path="/entities" element={<EntitiesList />} />
               <Route path="/entities/list" element={<Navigate to="/entities" />} />
               <Route path="/entities/detail/:id" element={<EntityDetail />} />
               <Route path="/entities/add" element={<EntityEdit />} />
               <Route path="/entities/edit/:id" element={<EntityEdit />} />

               <Route path="/locations" element={<LocationsList />} />
               <Route path="/locations/list" element={<Navigate to="/locations" />} />
               <Route path="/locations/detail/:entityId/:id" element={<LocationDetail />} />
               <Route path="/locations/add" element={<LocationEdit />} />
               <Route path="/locations/edit/:entityId/:id" element={<LocationEdit />} />

               <Route path="/userprofile" element={<UserProfileDetail />} />
               <Route path="/userprofile/edit" element={<UserProfileEdit />} />


            </Route >

            {
               /*
               Please keep this remarked until migration is finished
               <Route path="*" element={<Navigate to="/home"/>}/>
               */
            }
            <Route path="*" element={<h1>404</h1>} />

         </>

      ),
      []

   )

   return (

      <BrowserRouter basename={(window as any).__ENV__.BASE_URL}>

         <AppRedirect />

         <Routes>

            <Route path="/login" element={<AppLogin />} />

            {
               profile ? appRoutes : <Route path="*" element={<Spinner active={true} />} />
            }

         </Routes>

      </BrowserRouter >

   );

}
