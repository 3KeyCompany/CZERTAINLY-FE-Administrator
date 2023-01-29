import AttributeViewer from "components/Attributes/AttributeViewer";
import CustomTable, { TableDataRow, TableHeader } from "components/CustomTable";
import Dialog from "components/Dialog";
import KeyStateBadge from "components/KeyStateBadge";
import StatusBadge from "components/StatusBadge";

import WidgetButtons, { WidgetButtonProps } from "components/WidgetButtons";

import { actions } from "ducks/cryptographic-keys";

import React, { useCallback, useMemo, useState } from "react";
import { useDispatch } from "react-redux";

import { Badge, Col, Label, Row } from "reactstrap";
import { CryptographicKeyItemResponseModel } from "types/cryptographic-keys";
import { KeyState } from "types/openapi";
import SignVerifyData from "./SignVerifyData";

interface Props {
   keyUuid: string;
   tokenInstanceUuid: string;
   tokenProfileUuid?: string;
   keyItem: CryptographicKeyItemResponseModel;
   totalKeyItems: number;
}

export default function CryptographicKeyItem({
      keyUuid,
      tokenInstanceUuid,
      tokenProfileUuid,
      keyItem,
      totalKeyItems,
   }: Props) {

   const dispatch = useDispatch();
   
   const [confirmDelete, setConfirmDelete] = useState<boolean>(false);

   const [confirmCompromise, setConfirmCompromise] = useState<boolean>(false);

   const [confirmDestroy, setConfirmDestroy] = useState<boolean>(false);

   const [signData, setSignData] = useState<boolean>(false);

   const [verifyData, setVerifyData] = useState<boolean>(false);

   const onEnableClick = useCallback(

      () => {

         if (!keyItem) return;
         dispatch(actions.enableCryptographicKey({
            keyItemUuid: [keyItem.uuid],
            tokenInstanceUuid: tokenInstanceUuid, 
            uuid: keyUuid 
         }));
      },
      [dispatch, keyItem, tokenInstanceUuid, keyUuid]

   );


   const onDisableClick = useCallback(

      () => {
         dispatch(actions.disableCryptographicKey({ 
            keyItemUuid: [keyItem.uuid],
            tokenInstanceUuid: tokenInstanceUuid, 
            uuid: keyUuid
         }));
      },
      [dispatch, keyItem, tokenInstanceUuid, keyUuid]

   );


   const onDeleteConfirmed = useCallback(

      () => {
         dispatch(actions.deleteCryptographicKey({
            keyItemUuid: [keyItem.uuid],
            tokenInstanceUuid: tokenInstanceUuid,
            uuid: keyUuid,
            redirect: totalKeyItems === 1 ? "../../../" : undefined
         }));
         setConfirmDelete(false);
      },
      [dispatch, keyItem, tokenInstanceUuid, keyUuid, totalKeyItems]

   )

   const onCompromise = useCallback(

      () => {
         dispatch(actions.compromiseCryptographicKey({ 
            keyItemUuid: [keyItem.uuid],
            tokenInstanceUuid: tokenInstanceUuid, 
            uuid: keyUuid }));
         setConfirmCompromise(false);
      },
      [dispatch, keyItem, tokenInstanceUuid, keyUuid]

   );

   const onDestroy = useCallback(

      () => {
         dispatch(actions.destroyCryptographicKey({ 
            keyItemUuid: [keyItem.uuid],
            tokenInstanceUuid: tokenInstanceUuid, 
            uuid: keyUuid }));
         setConfirmDestroy(false);
      },
      [dispatch, keyItem, tokenInstanceUuid, keyUuid]

   );


   const buttons: WidgetButtonProps[] = useMemo(

      () => [
         { icon: "trash", disabled: false, tooltip: "Delete", onClick: () => { setConfirmDelete(true); } },
         { icon: "check", disabled: keyItem.state !== KeyState.Active || keyItem.enabled, tooltip: "Enable", onClick: () => { onEnableClick() } },
         { icon: "times", disabled: keyItem.state !== KeyState.Active || !keyItem.enabled, tooltip: "Disable", onClick: () => { onDisableClick() } },
         { icon: "handshake", disabled: keyItem.state === KeyState.Compromised || keyItem.state === KeyState.Destroyed, tooltip: "Compromised", onClick: () => { setConfirmCompromise(true) } },
         { icon: "bomb", disabled: keyItem.state === KeyState.Destroyed, tooltip: "Destroy", onClick: () => { setConfirmDestroy(true) } },
         { icon: "sign", disabled: keyItem.state !== KeyState.Active || !keyItem.enabled, tooltip: "Sign", onClick: () => { setSignData(true) } },
         { icon: "verify", disabled: keyItem.state !== KeyState.Active || !keyItem.enabled, tooltip: "Verify", onClick: () => { setVerifyData(true) } },

      ],
      [onDisableClick, onEnableClick, setConfirmCompromise, setConfirmDestroy, keyItem.enabled, keyItem.state]

   );

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


   const detailDataSlice1: TableDataRow[] = useMemo(

      () => !keyItem ? [] : [

         {
            id: "uuid",
            columns: ["UUID", keyItem.uuid]
         },
         {
            id: "name",
            columns: ["Name", keyItem.name]
         },
         {
            id: "Type",
            columns: ["Type", keyItem.type]
         },
         {
            id: "cryptographicAlgorithm",
            columns: ["Cryptographic Algorithm", keyItem.cryptographicAlgorithm]
         },
      ],
      [keyItem]

   )


   const detailDataSlice2: TableDataRow[] = useMemo(

      () => !keyItem ? [] : [
         {
            id: "format",
            columns: ["Key Format", keyItem.format || ""]
         },
         {
            id: "Usages",
            columns: ["Usages", keyItem.usage.map((usage) => <Badge key={usage} color="secondary" className="mr-xs">{usage}</Badge>)]
         },
         {
            id: "enabled",
            columns: ["Enabled", <StatusBadge enabled={keyItem!.enabled} />,
            ]
         },
         {
            id: "state",
            columns: ["State", <KeyStateBadge state={keyItem.state}/>]
         }
      ],
      [keyItem]

   )



   return (
      <div className="key-details">
         <div>
            <h6 className="d-inline-block">
            <Badge key={keyItem.uuid} color="dark" className="mr-xs">{keyItem.type}</Badge>
            </h6>
            <div className="fa-pull-right mt-n-xs">
               <WidgetButtons buttons={buttons} />
            </div>

          </div>
         <Row xs="1" sm="1" md="2" lg="2" xl="2">

            <Col>
                  <CustomTable
                     headers={detailHeaders}
                     data={detailDataSlice1}
                  />

            </Col>

            <Col>
                  <CustomTable
                     headers={detailHeaders}
                     data={detailDataSlice2}
                  />

            </Col>

            {
               keyItem.metadata && keyItem.metadata.length > 0 ? <Col>
                     
                     <Label>Meta Data</Label>
                     
                     <AttributeViewer metadata={keyItem.metadata} />
               
               </Col>
               
               : null
            }
         </Row>

         <Dialog
            isOpen={confirmDelete}
            caption="Delete Key"
            body="You are about to delete Key. Is this what you want to do?"
            toggle={() => setConfirmDelete(false)}
            buttons={[
               { color: "danger", onClick: onDeleteConfirmed, body: "Yes, delete" },
               { color: "secondary", onClick: () => setConfirmDelete(false), body: "Cancel" },
            ]}
         />

         <Dialog
            isOpen={confirmCompromise}
            caption={`Key Compromised?`}
            body={`If the Key is compromised, proceed to make the platform stop using it for any operations.`}
            toggle={() => setConfirmDelete(false)}
            buttons={[
               { color: "danger", onClick: onCompromise, body: "Yes" },
               { color: "secondary", onClick: () => setConfirmDelete(false), body: "Cancel" },
            ]}
         />

         <Dialog
            isOpen={confirmDestroy}
            caption={`Destroy Key"}`}
            body={`You are about to destroy the Key. Is this what you want to do?`}
            toggle={() => setConfirmDelete(false)}
            buttons={[
               { color: "danger", onClick: onDestroy, body: "Yes, Destroy" },
               { color: "secondary", onClick: () => setConfirmDelete(false), body: "Cancel" },
            ]}
         />

         <Dialog
            isOpen={signData}
            caption="Sign Data"
            body={SignVerifyData({ action: "sign", visible: signData, onClose: () => setSignData(false), tokenUuid: tokenInstanceUuid, keyUuid: keyUuid, keyItemUuid: keyItem.uuid, algorithm: keyItem.cryptographicAlgorithm, tokenProfileUuid: tokenProfileUuid })}
            toggle={() => setSignData(false)}
            buttons={[]}
         />

         <Dialog
            isOpen={verifyData}
            caption="Verify Signature"
            body={SignVerifyData({action:"verify", visible: verifyData, onClose: () => setVerifyData(false), tokenUuid: tokenInstanceUuid, keyUuid: keyUuid, keyItemUuid: keyItem.uuid, algorithm: keyItem.cryptographicAlgorithm, tokenProfileUuid: tokenProfileUuid })}
            toggle={() => setVerifyData(false)}
            buttons={[]}
         />

      </div >

   )

}