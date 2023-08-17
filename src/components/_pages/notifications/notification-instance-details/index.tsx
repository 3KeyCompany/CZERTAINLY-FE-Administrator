import AttributeViewer, { ATTRIBUTE_VIEWER_TYPE } from "components/Attributes/AttributeViewer";
import CustomTable, { TableDataRow, TableHeader } from "components/CustomTable";
import Dialog from "components/Dialog";
import Widget from "components/Widget";
import { WidgetButtonProps } from "components/WidgetButtons";
import { actions as notificationsActions, selectors as notificationsSelectors } from "ducks/notifications";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
const NotificationInstanceDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const notificationInstance = useSelector(notificationsSelectors.notificationInstanceDetail);
    const isFetchingNotificationInstanceDetail = useSelector(notificationsSelectors.isFetchingNotificationInstanceDetail);
    const navigate = useNavigate();
    const isDeleting = useSelector(notificationsSelectors.isDeleting);

    const deleteErrorMessage = useSelector(notificationsSelectors.deleteErrorMessage);

    const [confirmDelete, setConfirmDelete] = useState<boolean>(false);

    const isBusy = useMemo(() => isFetchingNotificationInstanceDetail || isDeleting, [isFetchingNotificationInstanceDetail, isDeleting]);

    const onDeleteConfirmed = useCallback(() => {
        if (!notificationInstance) return;
        dispatch(notificationsActions.clearDeleteErrorMessages());
        dispatch(notificationsActions.deleteNotificationInstance({ uuid: notificationInstance.uuid }));
        setConfirmDelete(false);
    }, [dispatch, notificationInstance]);

    const getFreshNotificationInstanceDetail = useCallback(() => {
        if (!id) return;
        dispatch(notificationsActions.getNotificationInstance({ uuid: id }));
    }, [dispatch, id]);

    useEffect(() => {
        getFreshNotificationInstanceDetail();
    }, [getFreshNotificationInstanceDetail]);

    const onEditClick = useCallback(() => {
        if (!id) return;
        navigate(`../../../notificationinstances/edit/${id}`);
    }, [navigate, id]);

    const buttons: WidgetButtonProps[] = useMemo(
        () => [
            {
                icon: "pencil",
                disabled: false,
                tooltip: "Edit",
                onClick: () => {
                    onEditClick();
                },
            },
            {
                icon: "trash",
                disabled: false,
                tooltip: "Delete",
                onClick: () => {
                    setConfirmDelete(true);
                },
            },
        ],
        [onEditClick],
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
        [],
    );

    const detailData: TableDataRow[] = useMemo(
        () =>
            !notificationInstance
                ? []
                : [
                      {
                          id: "uuid",
                          columns: ["UUID", notificationInstance.uuid],
                      },
                      {
                          id: "notificationProviderUuid",
                          columns: ["Notification Provider Uuid", notificationInstance.connectorUuid],
                      },
                      {
                          id: "name",
                          columns: ["Name", notificationInstance.name],
                      },
                      {
                          id: "description",
                          columns: ["Description", notificationInstance.description || ""],
                      },
                      {
                          id: "kind",
                          columns: ["Kind", notificationInstance.kind || ""],
                      },
                      {
                          id: "notificationProviderName",
                          columns: [
                              "Notification Provider Name",
                              <Link to={`../../../connectors/detail/${notificationInstance.connectorUuid}`}>
                                  {notificationInstance.connectorName}
                              </Link>,
                          ],
                      },
                  ],
        [notificationInstance],
    );

    return (
        <Container className="themed-container" fluid>
            <Row>
                <Col>
                    <Widget
                        widgetButtons={buttons}
                        refreshAction={getFreshNotificationInstanceDetail}
                        title="Notification Instance Details"
                        titleSize="large"
                        busy={isBusy}
                    >
                        <CustomTable headers={detailHeaders} data={detailData} />
                    </Widget>
                </Col>
                <Col>
                    {notificationInstance?.attributes?.length ? (
                        <Widget title="Notification Instance Attributes" busy={isFetchingNotificationInstanceDetail}>
                            <AttributeViewer attributes={notificationInstance.attributes} viewerType={ATTRIBUTE_VIEWER_TYPE.ATTRIBUTE} />
                        </Widget>
                    ) : (
                        <></>
                    )}
                </Col>
            </Row>
            <Dialog
                isOpen={confirmDelete}
                caption={`Delete a Notification Instance`}
                body={`You are about to delete a Notification Instance. Is this what you want to do?`}
                toggle={() => setConfirmDelete(false)}
                buttons={[
                    { color: "danger", onClick: onDeleteConfirmed, body: "Yes, delete" },
                    { color: "secondary", onClick: () => setConfirmDelete(false), body: "Cancel" },
                ]}
            />
        </Container>
    );
};

export default NotificationInstanceDetails;
