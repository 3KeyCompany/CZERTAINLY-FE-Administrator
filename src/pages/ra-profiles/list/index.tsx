import React, { Fragment, useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useRouteMatch } from "react-router-dom";
import { Button, Container } from "reactstrap";
import Spinner from "components/Spinner";
import StatusBadge from "components/StatusBadge";
import Widget from "components/Widget";
import { actions, selectors } from "ducks/ra-profiles";
import MDBColumnName from "components/MDBColumnName";
import { MDBBadge, MDBModal, MDBModalBody, MDBModalFooter, MDBModalHeader } from "mdbreact";
import ToolTip from "components/ToolTip";
import CustomTable, { TableDataRow, TableHeader } from "components/CustomTable";
import WidgetButtons, { WidgetButtonProps } from "components/WidgetButtons";
import Dialog from "components/Dialog";

function RaProfileList() {

   const dispatch = useDispatch();
   const history = useHistory();

   const { path } = useRouteMatch();

   const checkedRows = useSelector(selectors.checkedRows);
   const raProfiles = useSelector(selectors.raProfiles);

   const isFetching = useSelector(selectors.isFetchingList);
   const isDeleting = useSelector(selectors.isDeleting);
   const isBulkDeleting = useSelector(selectors.isBulkDeleting);
   const isUpdating = useSelector(selectors.isUpdating);
   const isEnabling = useSelector(selectors.isEnabling);
   const isBulkEnabling = useSelector(selectors.isBulkEnabling);
   const isBulkDisabling = useSelector(selectors.isBulkDisabling);

   const isBusy = isFetching || isDeleting || isUpdating || isBulkDeleting || isEnabling || isBulkEnabling || isBulkDisabling;

   const [confirmDelete, setConfirmDelete] = useState<boolean>(false);


   useEffect(() => {
      dispatch(actions.setCheckedRows([]));
      dispatch(actions.listRaProfiles());
   }, [dispatch]);


   const onAddClick = useCallback(() => {
      history.push(`${path}/add`);
   }, [history, path]);


   const onEnableClick = useCallback(
      () => {
         dispatch(actions.bulkEnableRaProfiles(checkedRows));
      },
      [checkedRows, dispatch]
   );


   const onDisableClick = useCallback(
      () => {
         dispatch(actions.bulkDisableRaProfiles(checkedRows));
      },
      [checkedRows, dispatch]
   );


   const onDeleteConfirmed = useCallback(
      () => {
         dispatch(actions.bulkDeleteRaProfiles(checkedRows));
         setConfirmDelete(false);
      },
      [checkedRows, dispatch]
   );


   const setCheckedRows = useCallback(
      (rows: (string | number)[]) => {
         dispatch(actions.setCheckedRows(rows as string[]));
      },
      [dispatch]
   );


   const buttons: WidgetButtonProps[] = useMemo(
      () => [
         { icon: "plus", disabled: false, tooltip: "Create", onClick: () => { onAddClick(); } },
         { icon: "trash", disabled: checkedRows.length === 0, tooltip: "Delete", onClick: () => { setConfirmDelete(true); } },
         { icon: "check", disabled: checkedRows.length === 0, tooltip: "Enable", onClick: () => { onEnableClick() } },
         { icon: "times", disabled: checkedRows.length === 0, tooltip: "Disable", onClick: () => { onDisableClick() } }
      ],
      [checkedRows, onAddClick, onEnableClick, onDisableClick]
   );


   const title = useMemo(
      () => (
         <div>

            <div className="pull-right mt-n-xs">
               <WidgetButtons buttons={buttons} />
            </div>

            <h5 className="mt-0">
               List of <span className="fw-semi-bold">RA Profiles</span>
            </h5>

         </div>
      ),
      [buttons]
   );


   const raProfilesTableHeaders: TableHeader[] = useMemo(

      () => [
         {
            id: "name",
            content: <MDBColumnName columnName="Name" />,
            sortable: true,
            sort: "asc",
            width: "15%",
         },
         {
            id: "description",
            content: <MDBColumnName columnName="Description" />,
            sortable: true,
         },
         {
            id: "authority",
            styledContent: <MDBColumnName columnName="Authority" />,
            align: "center",
            content: "authority",
            sortable: true,
            width: "15%",
         },
         {
            id: "enabledProtocols",
            content: <MDBColumnName columnName="Enabled Protocols" />,
            align: "center",
            sortable: true,
            width: "20%",
         },
         {
            id: "status",
            styledContent: <MDBColumnName columnName="Status" />,
            align: "center",
            content: "status",
            sortable: true,
            width: "7%",
         },
      ],
      []

   );


   const getProtocolsForDisplay = useCallback(

      (protocols?: string[]) => !protocols ? <></> : (
         <>
            {
               protocols.map(
                  protocol => (
                     <Fragment key={protocol}>
                        <MDBBadge color="secondary" searchvalue={protocol}>
                           {protocol}
                        </MDBBadge>
                        &nbsp;
                     </Fragment>
                  )
               )
            }
         </>
      ),
      []

   );


   const profilesTableData: TableDataRow[] = useMemo(

      () => raProfiles.map(

         raProfile => ({

            id: raProfile.uuid,

            columns: [

               <Link to={`${path}/detail/${raProfile.uuid}`}>{raProfile.name}</Link>,

               raProfile.description || "",

               <MDBBadge color="info">{raProfile.authorityInstanceName}</MDBBadge>,

               getProtocolsForDisplay(raProfile.enabledProtocols),

               <StatusBadge enabled={raProfile.enabled} />

            ]

         })
      ),
      [raProfiles]

   )


   return (

      <Container className="themed-container" fluid>

         <Widget title={title} busy={isBusy}>

            <br />
            <CustomTable
               headers={raProfilesTableHeaders}
               data={profilesTableData}
               onCheckedRowsChanged={setCheckedRows}
               canSearch={true}
               hasCheckboxes={true}
               hasPagination={true}
            />

         </Widget>

         <Dialog
            isOpen={confirmDelete}
            caption={`Delete RA ${checkedRows.length > 1 ? "Profiles" : "Profile"}`}
            body={`You are about to delete ${checkedRows.length > 1 ? "a RA Profile" : "RA profiles"}. Is this what you want to do?`}
            toggle={() => setConfirmDelete(false)}
            buttons={[
               { color: "danger", onClick: onDeleteConfirmed, body: "Yes, delete" },
               { color: "secondary", onClick: () => setConfirmDelete(false), body: "Cancel" },
            ]}
         />

      </Container>
   );
}

export default RaProfileList;