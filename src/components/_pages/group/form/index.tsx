import AttributeEditor from "components/Attributes/AttributeEditor";
import ProgressButton from "components/ProgressButton";
import Widget from "components/Widget";

import { actions, selectors } from "ducks/certificateGroups";
import { actions as customAttributesActions, selectors as customAttributesSelectors } from "ducks/customAttributes";
import { useCallback, useEffect, useMemo, useState } from "react";

import { Field, Form } from "react-final-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Form as BootstrapForm, Button, ButtonGroup, FormFeedback, FormGroup, Input, Label } from "reactstrap";
import { CertificateGroupResponseModel } from "types/certificateGroups";
import { Resource } from "types/openapi";
import { mutators } from "utils/attributes/attributeEditorMutators";
import { collectFormAttributes } from "utils/attributes/attributes";
import { composeValidators, validateAlphaNumeric, validateRequired } from "utils/validators";
import TabLayout from "../../../Layout/TabLayout";

interface FormValues {
    name: string;
    description: string;
}

export default function GroupForm() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { id } = useParams();

    const editMode = useMemo(() => !!id, [id]);

    const groupSelector = useSelector(selectors.certificateGroup);
    const resourceCustomAttributes = useSelector(customAttributesSelectors.resourceCustomAttributes);
    const isFetchingResourceCustomAttributes = useSelector(customAttributesSelectors.isFetchingResourceCustomAttributes);
    const isFetchingDetail = useSelector(selectors.isFetchingDetail);
    const isCreating = useSelector(selectors.isCreating);
    const isUpdating = useSelector(selectors.isUpdating);

    const [group, setGroup] = useState<CertificateGroupResponseModel>();

    const isBusy = useMemo(
        () => isFetchingDetail || isCreating || isUpdating || isFetchingResourceCustomAttributes,
        [isCreating, isFetchingDetail, isUpdating, isFetchingResourceCustomAttributes],
    );

    const onSubmit = useCallback(
        (values: FormValues) => {
            if (editMode) {
                dispatch(
                    actions.updateGroup({
                        groupUuid: id!,
                        editGroupRequest: {
                            name: values.name,
                            description: values.description,
                            customAttributes: collectFormAttributes("customGroup", resourceCustomAttributes, values),
                        },
                    }),
                );
            } else {
                dispatch(
                    actions.createGroup({
                        name: values.name,
                        description: values.description,
                        customAttributes: collectFormAttributes("customGroup", resourceCustomAttributes, values),
                    }),
                );
            }
        },
        [dispatch, editMode, id, resourceCustomAttributes],
    );

    const onCancelClick = useCallback(() => {
        navigate(-1);
    }, [navigate]);

    useEffect(() => {
        dispatch(customAttributesActions.listResourceCustomAttributes(Resource.Groups));
        if (editMode && groupSelector && groupSelector.uuid !== group?.uuid) {
            setGroup(groupSelector);
        }
    }, [dispatch, editMode, group?.uuid, groupSelector]);

    const defaultValues: FormValues = useMemo(
        () => ({
            name: editMode ? group?.name || "" : "",
            description: editMode ? group?.description || "" : "",
        }),
        [editMode, group],
    );

    const title = useMemo(() => (editMode ? "Edit Group" : "Add Group"), [editMode]);

    return (
        <Widget title={title} busy={isBusy}>
            <Form initialValues={defaultValues} onSubmit={onSubmit} mutators={{ ...mutators<FormValues>() }}>
                {({ handleSubmit, pristine, submitting, valid, form }) => (
                    <BootstrapForm onSubmit={handleSubmit}>
                        <Field name="name" validate={composeValidators(validateRequired(), validateAlphaNumeric())}>
                            {({ input, meta }) => (
                                <FormGroup>
                                    <Label for="name">Group Name</Label>

                                    <Input
                                        {...input}
                                        valid={!meta.error && meta.touched}
                                        invalid={!!meta.error && meta.touched}
                                        type="text"
                                        id="name"
                                        placeholder="Group Name"
                                        disabled={editMode}
                                    />

                                    <FormFeedback>{meta.error}</FormFeedback>
                                </FormGroup>
                            )}
                        </Field>

                        <Field name="description" validate={composeValidators(validateAlphaNumeric())}>
                            {({ input, meta }) => (
                                <FormGroup>
                                    <Label for="description">Group Description</Label>

                                    <Input
                                        {...input}
                                        valid={!meta.error && meta.touched}
                                        invalid={!!meta.error && meta.touched}
                                        type="text"
                                        id="description"
                                        placeholder="Group Description"
                                    />

                                    <FormFeedback>{meta.error}</FormFeedback>
                                </FormGroup>
                            )}
                        </Field>

                        <>
                            <br />

                            <TabLayout
                                tabs={[
                                    {
                                        title: "Custom Attributes",
                                        content: (
                                            <AttributeEditor
                                                id="customGroup"
                                                attributeDescriptors={resourceCustomAttributes}
                                                attributes={group?.customAttributes}
                                            />
                                        ),
                                    },
                                ]}
                            />
                        </>

                        <div className="d-flex justify-content-end">
                            <ButtonGroup>
                                <ProgressButton
                                    title={editMode ? "Update" : "Create"}
                                    inProgressTitle={editMode ? "Updating..." : "Creating..."}
                                    inProgress={submitting}
                                    disabled={pristine || submitting || !valid}
                                />

                                <Button color="default" onClick={onCancelClick} disabled={submitting}>
                                    Cancel
                                </Button>
                            </ButtonGroup>
                        </div>
                    </BootstrapForm>
                )}
            </Form>
        </Widget>
    );
}
