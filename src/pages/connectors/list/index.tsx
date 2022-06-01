import React, { Fragment, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useRouteMatch } from "react-router-dom";
import { Button, Container, Table } from "reactstrap";

import Widget from "components/Widget";
import { actions, selectors } from "ducks/connectors";
import MDBColumnName from "components/MDBColumnName";
import { FunctionGroupDTO } from "api/connectors";

import { inventoryStatus } from "utils/connector";
import CustomTable from "components/CustomTable";
import WidgetButtons, { WidgetButtonProps } from "components/WidgetButtons";
import { attributeFieldNameTransform } from "models/attributes";
import { Dialog } from "components/Dialog";

const { MDBBadge } = require("mdbreact");

function ConnectorList() {

   const dispatch = useDispatch();
   const history = useHistory();

   const { path } = useRouteMatch();

   const checkedRows = useSelector(selectors.checkedRows);
   const connectors = useSelector(selectors.connectors);

   const isFetching = useSelector(selectors.isFetchingList);
   const isDeleting = useSelector(selectors.isDeleting);
   const isBulkDeleting = useSelector(selectors.isBulkDeleting);

   const isBusy = isFetching || isDeleting || isBulkDeleting;

   const [confirmDelete, setConfirmDelete] = useState<boolean>(false);

   const [deleteErrorModalOpen, setDeleteErrorModalOpen] = useState(false);
   const [duplicateRows, setDuplicateRows] = useState<(string | number)[]>([]);

   useEffect(() => {
      dispatch(actions.listConnectors());
   }, [dispatch]);

   /*useEffect(() => {
      if (deleteErrorMessages?.length > 0) {
         setDeleteErrorModalOpen(true);
      } else {
         setDeleteErrorModalOpen(false);
      }
   }, [deleteErrorMessages]);*/

   /*const onConfirmDelete = useCallback(() => {
      dispatch(actions.confirmBulkDeleteConnector(checkedRows));
      setDuplicateRows(checkedRows);
      setCheckedRows([]);
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [dispatch, confirmDeleteId]);*/

   /*const onConfirmAuthorize = useCallback(() => {
      dispatch(actions.confirmBulkAuthorizeConnector(checkedRows));
   }, [dispatch, checkedRows]);*/

   /*const onCancelAuthorize = useCallback(
      () => dispatch(actions.cancelAuthorizeConnector()),
      [dispatch]
   );*/

   /*const onForceDeleteCancel = useCallback(() => {
      dispatch(actions.cancelForceDeleteConnector());
      setDeleteErrorModalOpen(false);
   }, [dispatch]);*/

   /*const onCancelDelete = useCallback(
      () => dispatch(actions.cancelDeleteConnector()),
      [dispatch]
   );*/


   const onDeleteConfirmed = () => {
      dispatch(actions.bulkDeleteConnectors(checkedRows));
   };

   const onAuthorizeConnector = (event: any) => {
      //dispatch(actions.confirmBulkAuthorizeConnector(checkedRows));
   };

   const onReconnectConnector = () => {
      //dispatch(actions.requestBulkReconnectConnector(checkedRows));
      //setCheckedRows([]);
   };

   const onForceDeleteConnector = (event: any) => {
      //dispatch(actions.requestBulkForceDeleteConnector(duplicateRows));
      //setDuplicateRows([]);
      //setDeleteErrorModalOpen(false);
   };


   const onAddClick = useCallback(() => {
   }, [history]);


   const onReconnectClick = useCallback(() => {
   }, [checkedRows, dispatch]);


   const onAuthorizeClick = useCallback(() => {
   }, [checkedRows, dispatch]);


   const setCheckedRows = useCallback((rows: string[]) => {
      dispatch(actions.setCheckedRows(rows));
   }, [dispatch]);


   const buttons: WidgetButtonProps[] = [
      { icon: "plus", disabled: false, tooltip: "Create", onClick: () => { onAddClick(); } },
      { icon: "trash", disabled: checkedRows.length === 0, tooltip: "Delete", onClick: () => { setConfirmDelete(true); } },
      { icon: "plug", disabled: checkedRows.length === 0, tooltip: "Reconnect", onClick: () => { onReconnectClick() } },
      { icon: "check", disabled: checkedRows.length === 0, tooltip: "Authorize", onClick: () => { onAuthorizeClick() } }
   ]


   const title = (

      <div>

         <div className="pull-right mt-n-xs">
            <WidgetButtons buttons={buttons} />
         </div>

         <h5 className="mt-0">
            <span className="fw-semi-bold">Connector Store</span>
         </h5>

      </div>

   );


   const getKinds = (functionGroups: FunctionGroupDTO[]) => {

      return functionGroups.map(

         group => (

            <div key={group.uuid}>

               {group.kinds.map(

                  kind => (
                     <span key={kind}>
                        <MDBBadge color="secondary" searchvalue={kind}>
                           {kind}
                        </MDBBadge>
                        &nbsp;
                     </span>
                  )

               )}

            </div>

         )

      )

   };


   const getFunctionGroups = (functionGroups: FunctionGroupDTO[]) => {

      return functionGroups.map(

         group => (

            <div key={group.uuid}>
               <MDBBadge color="primary" searchvalue={attributeFieldNameTransform[group.name || ""] || group.name}>
                  {attributeFieldNameTransform[group.name || ""] || group.name}
               </MDBBadge>
            </div>

         )

      )
   }


   const connectorList = () => {
      let rows: any = [];
      for (let connector of connectors) {

         let connectorStatus = inventoryStatus(connector.status || "");
         let column: any = {};

         column["name"] = {
            content: connector.name,
            styledContent: (
               <Link to={`${path}/detail/${connector.uuid}`}>{connector.name}</Link>
            ),
            lineBreak: true,

         };

         column["functions"] = {
            styledContent: getFunctionGroups(connector.functionGroups || []),
            lineBreak: true,
         };

         column["kinds"] = {
            styledContent: getKinds(connector.functionGroups || []),
            lineBreak: true,
         };

         column["url"] = {
            content: connector.url,
            lineBreak: true,
         };

         column["status"] = {
            content: connector.status,
            styledContent: (
               <MDBBadge color={connectorStatus[1]}>{connectorStatus[0]}</MDBBadge>
            ),
            lineBreak: true,
         };

         rows.push({
            id: connector.uuid,
            column: column,
            data: connector,
         });

      }

      return rows;
   };

   const connectorRowHeaders = [
      {
         styledContent: <MDBColumnName columnName="Name" />,
         content: "name",
         sort: false,
         id: "connectorName",
         width: "15%",
      },
      {
         styledContent: <MDBColumnName columnName="Function Groups" />,
         content: "functions",
         sort: false,
         id: "connectorFunctions",
         width: "35%",
      },
      {
         styledContent: <MDBColumnName columnName="Kinds" />,
         content: "kinds",
         sort: false,
         id: "kinds",
         width: "35%",
      },
      {
         styledContent: <MDBColumnName columnName="URL" />,
         content: "url",
         sort: false,
         id: "connectorUrl",
         width: "30%",
      },
      {
         styledContent: <MDBColumnName columnName="Status" />,
         content: "status",
         sort: false,
         id: "connectorStatus",
         width: "10%",
      },
   ];

   return (

      <div>
         <Container className="themed-container" fluid>

            <Widget title={title} busy={isBusy}>

               <br />

               <CustomTable
                  checkedRows={checkedRows}
                  checkedRowsFunction={setCheckedRows}
                  data={connectors}
                  headers={connectorRowHeaders}
                  rows={connectorList()}
               />

            </Widget>

            <Dialog
               isOpen={confirmDelete}
               caption="Delete Connector"
               body="You are about to delete connectors. Is this what you want to do?"
               toggle={() => setConfirmDelete(false)}
               buttons={[
                  { color: "danger", onClick: onDeleteConfirmed, body: "Yes, delete" },
                  { color: "secondary", onClick: () => setConfirmDelete(false), body: "Cancel" },
               ]}
            />



            {/*<MDBModal
               overflowScroll={false}
               isOpen={confirmDeleteId !== ""}
               toggle={onCancelDelete}
            >
               <MDBModalHeader toggle={onCancelDelete}>
                  Delete Connector
               </MDBModalHeader>
               <MDBModalBody>
                  You are about to delete connectors. Is this what you want to do?
               </MDBModalBody>
               <MDBModalFooter>
                  <Button color="danger" onClick={onConfirmDelete}>
                     Yes, delete
                  </Button>
                  <Button color="secondary" onClick={onCancelDelete}>
                     Cancel
                  </Button>
               </MDBModalFooter>
            </MDBModal>
            <MDBModal
               overflowScroll={false}
               isOpen={confirmAuthorizeId !== ""}
               toggle={onCancelAuthorize}
            >
               <MDBModalHeader toggle={onCancelAuthorize}>
                  Authorize Connector
               </MDBModalHeader>
               <MDBModalBody>
                  You are about authorize a connector. Is this what you want to do?
               </MDBModalBody>
               <MDBModalFooter>
                  <Button color="success" onClick={onConfirmAuthorize}>
                     Yes, Authorize
                  </Button>
                  <Button color="secondary" onClick={onCancelAuthorize}>
                     Cancel
                  </Button>
               </MDBModalFooter>
            </MDBModal>

            <MDBModal
               overflowScroll={false}
               isOpen={deleteErrorModalOpen}
               toggle={onForceDeleteCancel}
            >
               <MDBModalHeader toggle={onForceDeleteCancel}>
                  Delete Connector
               </MDBModalHeader>
               <MDBModalBody>
                  Failed to delete some of the connectors. Please find the details
                  below
                  <Table className="table-hover" size="sm">
                     <thead>
                        <tr>
                           <th>
                              <b>Name</b>
                           </th>
                           <th>
                              <b>Dependencies</b>
                           </th>
                        </tr>
                     </thead>
                     <tbody>
                        {deleteErrorMessages?.map(function (message) {
                           return (
                              <tr>
                                 <td>{message.name}</td>
                                 <td>{message.message}</td>
                              </tr>
                           );
                        })}
                     </tbody>
                  </Table>
               </MDBModalBody>
               <MDBModalFooter>
                  <Button color="danger" onClick={onForceDeleteConnector}>
                     Force
                  </Button>
                  <Button color="secondary" onClick={onForceDeleteCancel}>
                     Cancel
                  </Button>
               </MDBModalFooter>
                     </MDBModal>*/}

         </Container>
      </div>
   );
}

export default ConnectorList;
