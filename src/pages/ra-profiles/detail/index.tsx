import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useRouteMatch } from "react-router-dom";
import { useHistory } from "react-router";

import { ButtonGroup, Container, Form, FormGroup, Input, Label, Table, Row, Col, Button } from "reactstrap";

import { actions as clientActions, selectors as clientSelectors } from "ducks/clients";
import { actions as raProfilesActions, selectors as raProfilesSelectors } from "ducks/ra-profiles";

import Widget from "components/Widget";
import CustomTable, { TableDataRow, TableHeader } from "components/CustomTable";
import WidgetButtons, { WidgetButtonProps } from "components/WidgetButtons";
import AttributeViewer from "components/Attributes/AttributeViewer";
import Dialog from "components/Dialog";
import StatusBadge from "components/StatusBadge";
import Select from "react-select";
import ProgressButton from "components/ProgressButton";
import { group } from "console";
import ToolTip from "components/ToolTip";
import AttributeDescriptorViewer from "components/Attributes/AttributeDescriptorViewer";


export default function RaProfileDetail() {

   const dispatch = useDispatch();

   const { params } = useRouteMatch<{ id: string }>();
   const history = useHistory();

   const clients = useSelector(clientSelectors.clients);

   const isFetchingClients = useSelector(clientSelectors.isFetchingList);

   const raProfile = useSelector(raProfilesSelectors.raProfile);

   const raProfileAuthorizedClientUuids = useSelector(raProfilesSelectors.authorizedClients);
   const issuanceAttributes = useSelector(raProfilesSelectors.issuanceAttributes);
   const revocationAttributes = useSelector(raProfilesSelectors.revocationAttributes);

   const isFetchingProfile = useSelector(raProfilesSelectors.isFetchingDetail);
   const isFetchingAuthorizedClients = useSelector(raProfilesSelectors.isFetchingAuthorizedClients);
   const isFetchingAttributes = useSelector(raProfilesSelectors.isFetchingAttributes);
   const isFetchingIssuanceAttributes = useSelector(raProfilesSelectors.isFetchingIssuanceAttributes);
   const isFetchingRevocationAttributes = useSelector(raProfilesSelectors.isFetchingRevocationAttributes);

   const acmeDetails = useSelector(raProfilesSelectors.acmeDetails);

   const isFetchingAcmeDetails = useSelector(raProfilesSelectors.isFetchingAcmeDetails);

   const isDeleting = useSelector(raProfilesSelectors.isDeleting);
   const isEnabling = useSelector(raProfilesSelectors.isEnabling);
   const isDisabling = useSelector(raProfilesSelectors.isDisabling);
   const isActivatingAcme = useSelector(raProfilesSelectors.isActivatingAcme);
   const isDeactivatingAcme = useSelector(raProfilesSelectors.isDeactivatingAcme);

   const isAuthorizingClient = useSelector(clientSelectors.isAuthorizing);
   const isUnauthorizing = useSelector(clientSelectors.isUnauthorizing);

   const [clientToAuthorize, setClientToAuthorize] = useState<{ value: string; label: string; } | null>(null);
   const [authorizedClientsDataState, setAuthorizedClientsDataState] = useState<TableDataRow[]>([]);

   const [activatingAcme, setActivatingAcme] = useState(false);


   const isBusy = useMemo(
      () => isFetchingProfile || isDeleting || isEnabling || isDisabling,
      [isFetchingProfile, isDeleting, isEnabling, isDisabling]
   )


   const isWorkingWithProtocol = useMemo(
      () => isActivatingAcme || isDeactivatingAcme || isFetchingAcmeDetails,
      [isActivatingAcme, isDeactivatingAcme, isFetchingAcmeDetails]
   )


   useEffect(
      () => {
         dispatch(raProfilesActions.getRaProfileDetail(params.id));
         dispatch(raProfilesActions.listIssuanceAttributes(params.id));
         dispatch(raProfilesActions.listRevocationAttributes(params.id));
         dispatch(raProfilesActions.getAcmeDetails(params.id));
      },
      [params.id, dispatch]

   )


   useEffect(
      () => {
         if (isAuthorizingClient || isUnauthorizing) return;
         dispatch(raProfilesActions.listAuthorizedClients(params.id));
         dispatch(clientActions.listClients());
         setClientToAuthorize(null);
      },
      [dispatch, isAuthorizingClient, isUnauthorizing, params.id]
   )


   const onAuthorizeClientClick = useCallback(
      () => {
         if (!raProfile || !clientToAuthorize) return;
         dispatch(clientActions.authorizeClient({ clientUuid: clientToAuthorize.value, raProfile }))
      }
      , [dispatch, raProfile, clientToAuthorize]
   )


   const availableClients: { value: string; label: string; }[] = useMemo(

      () =>

         !raProfileAuthorizedClientUuids

            ?
            [] :
            clients.filter(
               client => !raProfileAuthorizedClientUuids.some(authorizedClientUuid => client.uuid === authorizedClientUuid)
            ).sort(
               (a, b) => a.name.localeCompare(b.name)
            ).map(
               client => (
                  { value: client.uuid, label: client.name }
               )
            ),

      [clients, raProfileAuthorizedClientUuids]

   );


   useEffect(
      () => {
         if (!availableClients || availableClients.length === 0) {
            setClientToAuthorize(null);
            return;
         }
         setClientToAuthorize(availableClients[0]);
      },
      [availableClients, setClientToAuthorize]
   )



   const detailHeaders: TableHeader[] = useMemo(
      () => [
         {
            id: "property",
            content: "Property",
         },
         {
            id: "value",
            content: "Value",
         },
      ],
      []
   );


   const detailData: TableDataRow[] = useMemo(

      () => !raProfile ? [] : [

         {
            id: "uuid",
            columns: ["UUID", raProfile.uuid]
         },
         {
            id: "name",
            columns: ["Name", raProfile.name]
         },
         {
            id: "description",
            columns: ["Description", raProfile.description || ""]
         },
         {
            id: "enabled",
            columns: ["Enabled", <StatusBadge enabled={raProfile!.enabled} />,
            ]
         },
         {
            id: "authorityUuid",
            columns: ["Authority Instance UUID", raProfile.authorityInstanceUuid]
         },
         {
            id: "authorityName",
            columns: ["Authority Instance Name", raProfile.authorityInstanceName]
         }

      ],
      [raProfile]

   )


   const authorizedClientsHeaders: TableHeader[] = useMemo(
      () => [
         {
            id: "name",
            content: "Client Name",
         },
         {
            id: "dn",
            content: "Client DN",
         },
         {
            id: "status",
            content: "Status",
            align: "center",
            width: "0"
         },
         {
            id: "actions",
            content: "Actions",
            align: "center",
            width: "0"
         },
      ],
      []
   );


   const authorizedClientsData: TableDataRow[] = useMemo(

      () => !raProfileAuthorizedClientUuids || !clients || raProfileAuthorizedClientUuids.length === 0 || clients.length === 0 || !raProfile
         ?
         []
         :
         raProfileAuthorizedClientUuids.map(

            uuid => {

               const client = clients.find(c => c.uuid === uuid);

               return ({
                  id: client!.uuid,
                  columns: [
                     <Link to={`../../clients/detail/${client!.uuid}`}>{client!.name}</Link>,
                     client!.certificate.subjectDn,
                     <StatusBadge enabled={client!.enabled} />,
                     <Button
                        className="btn btn-link p-0"
                        color="white"
                        data-placement="right"
                        data-for={client?.name}
                        data-tip
                        onClick={() => {
                           dispatch(clientActions.unauthorizeClient({ clientUuid: client!.uuid, raProfile }))
                        }}
                     >
                        <i className="fa fa-trash" style={{ color: "red" }} />
                        <ToolTip message={`Unauthorize ${client?.name}`} id={client!.name} place="right" />
                     </Button>

                  ]
               })

            }

         ),
      [dispatch, clients, raProfileAuthorizedClientUuids, raProfile]

   );


   // this is helper to prevent "blinking" of the table when the data is being fetched
   useEffect(
      () => {
         if (!isFetchingAuthorizedClients) setAuthorizedClientsDataState(authorizedClientsData);
      },
      [isFetchingAuthorizedClients, authorizedClientsData]
   )


   const acmeProfileHeaders: TableHeader[] = useMemo(
      () => [
         {
            id: "property",
            content: "",
         },
         {
            id: "value",
            content: "",
         },
      ],
      []
   )


   const acmeProfileData: TableDataRow[] = useMemo(

      () => !acmeDetails ? [] : [
         {
            id: "uuid",
            columns: [
               "UUID",
               acmeDetails.uuid || "",
            ]
         },
         {
            id: "name",
            columns: [
               "Name",
               acmeDetails.name || "",
            ]
         },
         {
            id: "Directory URL",
            columns: [
               "Directory URL",
               acmeDetails.directoryUrl || "",
            ]
         }
      ],

      [acmeDetails]

   )


   const availableProtocolsHeaders: TableHeader[] = useMemo(
      () => [
         {
            id: "name",
            content: "Protocol name",
            width: "10%"
         },
         {
            id: "status",
            content: "Status",
            align: "center",
            width: "10%"
         },
         {
            id: "actions",
            content: "Actions",
            align: "center",
            width: "10%"
         },
      ],
      []
   );


   const availableProtocolsData: TableDataRow[] = useMemo(
      () => [
         {
            id: "acme",
            columns: [
               "ACME",
               <StatusBadge enabled={acmeDetails ? acmeDetails.acmeAvailable : undefined} />,
               <ProgressButton
                  title={raProfile?.enabledProtocols?.includes("ACME") ? "Enable" : "Disable"}
                  inProgressTitle={raProfile?.enabledProtocols?.includes("ACME") ? "Enabling..." : "Disabling..."}
                  inProgress={isActivatingAcme || isDeactivatingAcme}
                  onClick={() => raProfile?.enabledProtocols?.includes("ACME") ? dispatch(raProfilesActions.deactivateAcme(raProfile.uuid)) : setActivatingAcme(true)}
               />

            ],
            detailColumns: [
               <></>,
               <></>,
               <></>,
               <>
                  <b>Protocol settings</b><br /><br />
                  <CustomTable
                     hasHeader={false}
                     headers={acmeProfileHeaders}
                     data={acmeProfileData}
                  />

                  {acmeDetails && acmeDetails.issueCertificateAttributes && acmeDetails.issueCertificateAttributes.length > 0 ? (
                     <>
                        <b>Settings for certificate issuing</b><br /><br />
                        <AttributeViewer hasHeader={false} attributes={acmeDetails?.issueCertificateAttributes} />
                     </>
                  ) : <></>}

                  {acmeDetails && acmeDetails.revokeCertificateAttributes && acmeDetails.revokeCertificateAttributes.length > 0 ? (
                     <>
                        <b>Settings for certificate revocation</b><br /><br />
                        <AttributeViewer hasHeader={false} attributes={acmeDetails?.revokeCertificateAttributes} />
                     </>
                  ) : <></>}

               </>,
            ],
         }
      ],
      [dispatch, isActivatingAcme, isDeactivatingAcme, raProfile, acmeDetails, acmeProfileData, acmeProfileHeaders]
   );


   return (

      <Container className="themed-container" fluid>

         <Row xs="1" sm="1" md="2" lg="2" xl="2">

            <Col>

               <Widget title="RA Profile Detail" busy={isBusy}>

                  <br />

                  <CustomTable
                     headers={detailHeaders}
                     data={detailData}
                  />

               </Widget>

            </Col>

            <Col>

               <Widget title="Attributes" busy={isBusy || isFetchingAttributes || isFetchingIssuanceAttributes || isFetchingRevocationAttributes}>

                  {

                     !raProfile || !raProfile.attributes || raProfile.attributes.length === 0 ? <></> : (
                        <>
                           <br />
                           <Label>RA profile attributes</Label>
                           <AttributeViewer attributes={raProfile?.attributes} />
                        </>
                     )
                  }

               </Widget>

            </Col>

         </Row>


         <Widget title="Authorized Clients" busy={isFetchingAuthorizedClients || isFetchingClients || isAuthorizingClient || isUnauthorizing}>

            <br />

            <CustomTable
               headers={authorizedClientsHeaders}
               data={authorizedClientsDataState}
            />

            <Label>Authorize a client</Label>

            <div style={{ display: "flex" }}>

               <div style={{ flexGrow: 1 }}>
                  <Select
                     value={clientToAuthorize}
                     options={availableClients}
                     placeholder="Select a client to authorize..."
                     onChange={(e: any) => { setClientToAuthorize(e) }}
                  />
               </div>

               &nbsp;

               <ProgressButton
                  title="Authorize"
                  inProgressTitle="Authorizing..."
                  inProgress={isAuthorizingClient}
                  disabled={clientToAuthorize === null}
                  onClick={onAuthorizeClientClick}
               />

            </div>

         </Widget>

         <Widget title="Available protocols" busy={isBusy || isWorkingWithProtocol}>

            <br />

            <CustomTable
               hasDetails={true}
               headers={availableProtocolsHeaders}
               data={availableProtocolsData}
            />

         </Widget>


      </Container>

   )

}

/*
import ProgressButton from "components/ProgressButton";
import Spinner from "components/Spinner";
import StatusBadge from "components/StatusBadge";
import Widget from "components/Widget";
import Select from "react-select";

import { actions as clientActions, selectors as clientSelectors } from "ducks/clients";
import { actions, selectors } from "ducks/ra-profiles";

import { actions as acmeActions, selectors as acmeSelectors } from "ducks/acme-profiles";
import { Client } from "models";

import { FieldNameTransform } from "utils/attributes/fieldNameTransform";
import ToolTip from "components/ToolTip";
import { AttributeResponse } from "models/attributes";

import { MDBModal, MDBModalBody, MDBModalFooter, MDBModalHeader } from "mdbreact";
import DynamicForm from "components/DynamicForm";

function RaProfileDetail() {

  const history = useHistory();
  const dispatch = useDispatch();

  const { params } = useRouteMatch();

  const uuid = (params as any).id as string;

  const isActivatingAcme = useSelector(selectors.isActivatingAcme);
  const isDeactivatingAcme = useSelector(selectors.isDeactivatingAcme);
  const acmeDetails = useSelector(selectors.selectAcmeDetails);

  const acmeProfiles = useSelector(acmeSelectors.selectProfiles);
  const allClients = useSelector(clientSelectors.selectClients);
  const isFetchingClients = useSelector(clientSelectors.isFetching);
  const isAuthorizing = useSelector(clientSelectors.isAuthorizingProfile);
  const isEditing = useSelector(selectors.isUpdating);
  const isFetchingProfiles = useSelector(selectors.isFetching);
  const profileDetails = useSelector(selectors.selectSelectedProfile);
  const authorizedClientIds = useSelector(selectors.selectAuthorizedClientIds);
  const confirmDeleteId = useSelector(selectors.selectConfirmDeleteProfileId);
  const selectIssueAttributes = useSelector(selectors.selectIssuanceAttributes);
  const selectRevokeAttributes = useSelector(selectors.selectRevocationAttributes);

  const [acmeProfileUuid, setAcmeProfileUuid] = useState(acmeDetails?.uuid || "");
  const [toggleActivateAcme, setToggleActivateAcme] = useState(false);
  const [toggleDeactivateAcme, setToggleDeactivateAcme] = useState(false);

  const [issueAttributes, setIssueAttributes] = useState(selectIssueAttributes);
  const [passIssueAttributes, setIssuePassAttributes] = useState<any>(selectIssueAttributes);
  const [revokeAttributes, setRevokeAttributes] = useState(selectRevokeAttributes);
  const [passRevokeAttributes, setRevokePassAttributes] = useState<any>(selectRevokeAttributes);

  const allowedAttributeTypeForDetail = [
    "STRING",
    "NUMBER",
    "DROPDOWN",
    "LIST",
    "BOOLEAN",
    "CREDENTIAL",
  ];

  useEffect(() => {
    setIssuePassAttributes(selectIssueAttributes);
    setIssueAttributes(selectIssueAttributes);
  }, [selectIssueAttributes]);

  useEffect(() => {
    setRevokePassAttributes(selectRevokeAttributes);
    setRevokeAttributes(selectRevokeAttributes);
  }, [selectRevokeAttributes]);

  useEffect(() => {
    dispatch(actions.requestProfileDetail(uuid));
    dispatch(actions.requestAcmeDetails(uuid));
  }, [uuid, dispatch]);

  function updateAttributes(formAttributes: AttributeResponse) {
    let updated =
      issueAttributes.length !== 0 ? issueAttributes : selectIssueAttributes;
    let updateAttributes: AttributeResponse[] = [];
    for (let i of updated) {
      if (i.uuid === formAttributes.uuid) {
        updateAttributes.push(formAttributes);
      } else {
        updateAttributes.push(i);
      }
    }
    setIssueAttributes(updateAttributes);
  }

  function updateRevokeAttributes(formAttributes: AttributeResponse) {
    let updated =
      revokeAttributes.length !== 0 ? revokeAttributes : selectRevokeAttributes;
    let updateAttributes: AttributeResponse[] = [];
    for (let i of updated) {
      if (i.uuid === formAttributes.uuid) {
        updateAttributes.push(formAttributes);
      } else {
        updateAttributes.push(i);
      }
    }
    setRevokeAttributes(updateAttributes);
  }

  const onCancelDelete = useCallback(
    () => dispatch(actions.cancelDeleteProfile()),
    [dispatch]
  );

  const onConfirmDelete = useCallback(() => {
    dispatch(actions.confirmDeleteProfile(profileDetails?.uuid || "", history));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, profileDetails]);

  const onDeleteProfile = () => {
    dispatch(
      actions.confirmDeleteProfileRequest(profileDetails?.uuid || "", history)
    );
  };

  const onEnableProfile = () => {
    dispatch(actions.requestEnableProfile(profileDetails?.uuid || ""));
  };

  const onDisableProfile = () => {
    dispatch(actions.requestDisableProfile(profileDetails?.uuid || ""));
  };

  const onConfirmActivate = () => {
    dispatch(
      actions.requestActivateAcme(
        profileDetails?.uuid || "",
        acmeProfileUuid || "",
        issueAttributes,
        revokeAttributes
      )
    );
    setToggleActivateAcme(false);
    setAcmeProfileUuid("");
  };

  const onConfirmDeactivate = () => {
    dispatch(actions.requestDeactivateAcme(profileDetails?.uuid || ""));
    setAcmeProfileUuid("");
    setToggleDeactivateAcme(false);
  };

  const onActivate = () => {
    dispatch(acmeActions.requestAcmeProfilesList());
    dispatch(actions.requestIssuanceAttributes(profileDetails?.uuid || ""));
    dispatch(actions.requestRevokeAttributes(profileDetails?.uuid || ""));
    setToggleActivateAcme(true);
  };

  const closeAcmePopup = () => {
    setToggleActivateAcme(false);
    setToggleDeactivateAcme(false);
    setAcmeProfileUuid("");
  };

  const detailsTitle = (
    <div>
      <div className="pull-right mt-n-xs">
        <Link
          to={`../../raprofiles/edit/${profileDetails?.uuid}`}
          className="btn btn-link"
          data-for="edit"
          data-tip
        >
          <i className="fa fa-pencil-square-o" />
          <ToolTip id="edit" message="Edit Ra Profile" />
        </Link>

        <Button
          className="btn btn-link"
          color="white"
          onClick={onDeleteProfile}
          data-for="delete"
          data-tip
          disabled={profileDetails?.enabled}
        >
          {profileDetails?.enabled ? (
            <i className="fa fa-trash" />
          ) : (
            <i className="fa fa-trash" style={{ color: "red" }} />
          )}

          <ToolTip id="delete" message="Delete" />
        </Button>

        <Button
          className="btn btn-link"
          color="white"
          onClick={onEnableProfile}
          data-for="enable"
          data-tip
          disabled={profileDetails?.enabled}
        >
          {profileDetails?.enabled ? (
            <i className="fa fa-check" />
          ) : (
            <i className="fa fa-check" style={{ color: "green" }} />
          )}

          <ToolTip id="enable" message="Enable" />
        </Button>

        <Button
          className="btn btn-link"
          color="white"
          onClick={onDisableProfile}
          data-for="disable"
          data-tip
          disabled={!profileDetails?.enabled}
        >
          {!profileDetails?.enabled ? (
            <i className="fa fa-times" />
          ) : (
            <i className="fa fa-times" style={{ color: "red" }} />
          )}

          <ToolTip id="disable" message="Disable" />
        </Button>
      </div>
      <h5>
        RA Profile <span className="fw-semi-bold">Details</span>
      </h5>
    </div>
  );

  const attributesTitle = (
    <h5>
      RA Profile <span className="fw-semi-bold">Attributes</span>
    </h5>
  );
  const authorizedClientsTitle = (
    <h5>
      List of Authorized <span className="fw-semi-bold">Clients</span>
    </h5>
  );
  const authorizeClientTitle = (
    <h5>
      Authorize new <span className="fw-semi-bold">Client</span>
    </h5>
  );

  const availableClients = useMemo(
    () =>
      allClients.filter(
        (c) => !authorizedClientIds.includes(c.uuid.toString())
      ),
    [allClients, authorizedClientIds]
  );

  const authorizedClients = authorizedClientIds
    .map((uuid) => allClients.find((c) => c.uuid.toString() === uuid))
    .filter(Boolean) as Client[];

  const [authorizedClient, setAuthorizedClient] = useState(
    availableClients[0]?.uuid
  );

  const authorizeClientCallback = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const client = authorizedClient || availableClients[0]?.uuid;
    dispatch(clientActions.requestAuthorizeProfile(client.toString(), uuid));
  };

  useEffect(() => {
    setAuthorizedClient(availableClients[0]?.uuid);
  }, [availableClients]);

  const getAcmeDisplay = () => {
    let acmeProv: any = [];
    for (let i of acmeProfiles) {
      if (i.uuid !== acmeDetails?.uuid) {
        acmeProv.push({
          label: i.name,
          value: i.uuid,
        });
      }
    }
    return acmeProv;
  };

  const getAttributeValue = (attribute: AttributeResponse) => {
    if (allowedAttributeTypeForDetail.includes(attribute.type)) {
      if (attribute.type === "BOOLEAN") {
        return attribute.value ? "Yes" : "No";
      } else {
        if (!["string", "number"].includes(typeof attribute.value)) {
          return attribute.value.name;
        } else {
          return attribute.value;
        }
      }
    } else {
      return "<" + attribute.type + ">";
    }
  };

  return (
    <Container className="themed-container" fluid>
      <Row xs="1" sm="1" md="2" lg="2" xl="2">
        <Col>
          <Widget title={detailsTitle}>
            <Table className="table-hover" size="sm">
              <thead>
                <tr>
                  <th>Attribute</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>UUID</td>
                  <td>{profileDetails?.uuid}</td>
                </tr>
                <tr>
                  <td>RA Profile Name</td>
                  <td>{profileDetails?.name}</td>
                </tr>
                <tr>
                  <td>Description</td>
                  <td>{profileDetails?.description}</td>
                </tr>
                <tr>
                  <td>Authority Instance UUID</td>
                  <td>
                    {profileDetails?.authorityInstanceUuid ||
                      "Authority not found"}
                  </td>
                </tr>
                <tr>
                  <td>Authority Instance Name</td>
                  <td>
                    {profileDetails?.authorityInstanceUuid ? (
                      <Link
                        to={`../../authorities/detail/${profileDetails?.authorityInstanceUuid}`}
                      >
                        {profileDetails.authorityInstanceName}
                      </Link>
                    ) : (
                      profileDetails?.authorityInstanceName
                    )}
                  </td>
                </tr>
                <tr>
                  <td>Status</td>
                  <td>
                    <StatusBadge enabled={profileDetails?.enabled} />
                  </td>
                </tr>
              </tbody>
            </Table>
          </Widget>
        </Col>
        <Col>
          <Widget title={attributesTitle}>
            <Table className="table-hover" size="sm">
              <thead>
                <tr>
                  <th>Attribute</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                {profileDetails?.attributes?.map(function (attribute) {
                  return (
                    <tr>
                      <td>
                        {attribute.label ||
                          FieldNameTransform[attribute.name] ||
                          attribute.name}
                      </td>
                      {}
                      <td>{getAttributeValue(attribute)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Widget>
        </Col>
      </Row>

      <Widget title={authorizedClientsTitle}>
        <Table className="table-hover" size="sm">
          <thead>
            <tr>
              <th>Client Name</th>
              <th>Client DN</th>
              <th>Client Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {authorizedClients?.map((client) => (
              <tr key={client.uuid}>
                <td>
                  <Link to={`../../clients/detail/${client?.uuid}`}>
                    {client?.name}
                  </Link>
                </td>
                <td>{client.certificate?.subjectDn}</td>
                <td>
                  <StatusBadge enabled={client.enabled} />
                </td>
                <td>
                  <Button
                    className="btn btn-link"
                    color="white"
                    data-placement="right"
                    data-for={client?.name}
                    data-tip
                    onClick={() =>
                      dispatch(
                        clientActions.requestUnauthorizeProfile(
                          client.uuid.toString(),
                          uuid
                        )
                      )
                    }
                  >
                    <i className="fa fa-trash" style={{ color: "red" }} />
                    <ToolTip message="Delete" id={client?.name} place="right" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Widget>

      <Widget title={authorizeClientTitle}>
        <Form onSubmit={authorizeClientCallback}>
          <FormGroup>
            <Label for="clientSelect">Select Client to Authorize</Label>
            <Input
              type="select"
              name="clientSelect"
              value={authorizedClient}
              onChange={(event) =>
                setAuthorizedClient((event.target as HTMLInputElement).value)
              }
            >
              {availableClients.map((client) => (
                <option
                  key={client.uuid}
                  value={client.uuid}
                >{`${client.certificate?.subjectDn} (id: ${client.uuid})`}</option>
              ))}
            </Input>
          </FormGroup>
          <div className="d-flex justify-content-end">
            <ButtonGroup>
              <ProgressButton
                title="Authorize"
                inProgressTitle="Authorizing..."
                inProgress={isAuthorizing}
                disabled={!availableClients.length}
              />
            </ButtonGroup>
          </div>
        </Form>
      </Widget>
      <Widget title="ACME Activation">
        {acmeDetails?.acmeAvailable ? (
          <Row xs="1" sm="1" md="2" lg="2" xl="2">
            <Col>
              <Widget title="ACME Profile Details">
                <Table className="table-hover" size="sm">
                  <thead>
                    <tr>
                      <th>Attribute</th>
                      <th>Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>UUID</td>
                      <td>{acmeDetails?.uuid}</td>
                    </tr>
                    <tr>
                      <td>Name</td>
                      <td>
                        {acmeDetails?.name ? (
                          <Link
                            to={`../../acmeProfiles/detail/${acmeDetails?.uuid}`}
                          >
                            {acmeDetails.name}
                          </Link>
                        ) : (
                          acmeDetails?.name
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td>Directory URL</td>
                      <td>{acmeDetails?.directoryUrl}</td>
                    </tr>
                  </tbody>
                </Table>
              </Widget>
            </Col>
            <Col>
              <Widget title={"List of Attributes to issue Certificate"}>
                <Table className="table-hover" size="sm">
                  <thead>
                    <tr>
                      <th>Attribute</th>
                      <th>Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {acmeDetails?.issueCertificateAttributes?.map(function (
                      attribute: any
                    ) {
                      return (
                        <tr>
                          <td>
                            {attribute.label ||
                              FieldNameTransform[attribute.name] ||
                              attribute.name}
                          </td>
                          {}
                          <td>{getAttributeValue(attribute)}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </Widget>
              <Widget title="List of Attributes to revoke Certificate">
                <Table className="table-hover" size="sm">
                  <thead>
                    <tr>
                      <th>Attribute</th>
                      <th>Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {acmeDetails?.revokeCertificateAttributes?.map(function (
                      attribute: any
                    ) {
                      return (
                        <tr>
                          <td>
                            {attribute.label ||
                              FieldNameTransform[attribute.name] ||
                              attribute.name}
                          </td>
                          {}
                          <td>{getAttributeValue(attribute)}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </Widget>
            </Col>
            <Col>
              <ButtonGroup>
                <Button
                  color="danger"
                  onClick={() => {
                    setToggleDeactivateAcme(true);
                  }}
                  disabled={isDeactivatingAcme}
                >
                  Deactivate
                </Button>
                &nbsp;&nbsp;
                <Button
                  color="primary"
                  onClick={onActivate}
                  disabled={isActivatingAcme}
                >
                  Update
                </Button>
              </ButtonGroup>
            </Col>
          </Row>
        ) : (
          <div>
            <p>ACME is not activated for this RA Profile</p>
            <ButtonGroup>
              <Button
                color="primary"
                onClick={onActivate}
                disabled={isActivatingAcme}
              >
                Activate ACME
              </Button>
            </ButtonGroup>
          </div>
        )}
      </Widget>

      <MDBModal
        overflowScroll={false}
        isOpen={confirmDeleteId !== ""}
        toggle={onCancelDelete}
      >
        <MDBModalHeader toggle={onCancelDelete}>Delete Profile</MDBModalHeader>
        <MDBModalBody>
          You are about to delete RA Profiles which may have existing
          authorizations from clients. If you continue, these authorizations
          will be deleted as well. Is this what you want to do?
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
        isOpen={toggleActivateAcme}
        toggle={closeAcmePopup}
      >
        <MDBModalHeader toggle={closeAcmePopup}>Activate ACME</MDBModalHeader>
        <MDBModalBody>
          <FormGroup>
            <Label for="raProfile">ACME Profile</Label>
            <Select
              maxMenuHeight={140}
              menuPlacement="auto"
              options={getAcmeDisplay()}
              placeholder="Select ACME Profile"
              onChange={(event: any) => setAcmeProfileUuid(event?.value || "")}
            />
          </FormGroup>
          <DynamicForm
            fieldInfo={JSON.parse(JSON.stringify(passIssueAttributes))}
            attributeFunction={updateAttributes}
            setPassAttribute={setIssuePassAttributes}
          />

          <DynamicForm
            fieldInfo={JSON.parse(JSON.stringify(passRevokeAttributes))}
            attributeFunction={updateRevokeAttributes}
            setPassAttribute={setRevokePassAttributes}
          />
        </MDBModalBody>
        <MDBModalFooter>
          <Button
            color="primary"
            onClick={onConfirmActivate}
            disabled={acmeProfileUuid === ""}
          >
            Activate
          </Button>
          <Button color="secondary" onClick={closeAcmePopup}>
            Cancel
          </Button>
        </MDBModalFooter>
      </MDBModal>

      <MDBModal
        overflowScroll={false}
        isOpen={toggleDeactivateAcme}
        toggle={closeAcmePopup}
      >
        <MDBModalHeader toggle={closeAcmePopup}>Deactivate ACME</MDBModalHeader>
        <MDBModalBody>
          Are you sure you wish to deactivate ACME for this RA Profile?
        </MDBModalBody>
        <MDBModalFooter>
          <Button color="danger" onClick={onConfirmDeactivate}>
            Deactivate
          </Button>
          <Button color="secondary" onClick={closeAcmePopup}>
            Cancel
          </Button>
        </MDBModalFooter>
      </MDBModal>

      <Spinner
        active={
          isFetchingClients ||
          isFetchingProfiles ||
          isEditing ||
          isAuthorizing ||
          isActivatingAcme ||
          isDeactivatingAcme
        }
      />
    </Container>
  );
}

export default RaProfileDetail;
*/