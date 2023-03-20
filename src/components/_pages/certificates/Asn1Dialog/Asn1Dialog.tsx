import Spinner from "components/Spinner";
import { actions as utilsActuatorActions, selectors as utilsActuatorSelectors } from "ducks/utilsActuator";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "reactstrap";
import { transformParseCertificateResponseDtoToAsn1String } from "../../../../ducks/transform/utilsCertificate";
import { actions as utilsCertificateActions, selectors as utilsCertificateSelectors } from "../../../../ducks/utilsCertificate";
import { ParseCertificateRequestDtoParseTypeEnum } from "../../../../types/openapi/utils";
import Dialog from "../../../Dialog";

interface Props {
    certificateContent: string;
}

export default function Asn1Dialog({ certificateContent }: Props) {
    const dispatch = useDispatch();
    const parsedCertificate = useSelector(utilsCertificateSelectors.parsedCertificate);
    const isFetchingDetail = useSelector(utilsCertificateSelectors.isFetchingDetail);
    const [asn1, setAsn1] = useState<string | undefined>(undefined);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const health = useSelector(utilsActuatorSelectors.health);

    useEffect(() => {
        console.log(health)
        if (!health) {
            dispatch(utilsActuatorActions.health());
        }
    }, [dispatch]);

    useEffect(() => {
        if (certificateContent && health && isOpen) {
            dispatch(utilsCertificateActions.reset());
            dispatch(utilsCertificateActions.parseCertificate({ certificate: certificateContent, parseType: ParseCertificateRequestDtoParseTypeEnum.Asn1 }));
        }
    }, [dispatch, certificateContent, health, isOpen]);

    useEffect(() => {
        if (parsedCertificate) {
            setAsn1(transformParseCertificateResponseDtoToAsn1String(parsedCertificate));
        }
    }, [parsedCertificate]);

    return <>
        <Spinner active={isFetchingDetail} />
        <Button
            className="btn btn-link p-0"
            disabled={isFetchingDetail}
            size="sm"
            color="primary"
            onClick={() => {
                if (certificateContent) {
                    setIsOpen(true);
                    dispatch(utilsCertificateActions.parseCertificate({ certificate: certificateContent, parseType: ParseCertificateRequestDtoParseTypeEnum.Asn1 }));
                }
            }}
            title="Show ASN.1 Structure"
        >Show</Button>
        <Dialog
            isOpen={isOpen}
            size={"lg"}
            caption="ASN.1 Structure"
            body={<pre>{asn1}</pre>}
            toggle={() => setIsOpen(false)}
            buttons={[{ color: "primary", onClick: () => setIsOpen(false), body: "Close" }]}
        />
    </>
}