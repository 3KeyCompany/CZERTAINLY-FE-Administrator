import ProgressButton from "components/ProgressButton";

import Widget from "components/Widget";

import { actions as profileApprovalActions, selectors as profileApprovalSelectors } from "ducks/approval-profiles";
import { useCallback, useMemo } from "react";

import { Field, Form } from "react-final-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Form as BootstrapForm, Button, ButtonGroup, FormFeedback, FormGroup, Input, Label } from "reactstrap";

import { selectors as profileSelectors } from "ducks/auth";
import { ProfileApprovalRequestModel, ProfileApprovalStepModel } from "types/approval-profiles";
import { mutators } from "utils/attributes/attributeEditorMutators";
import { composeValidators, validateAlphaNumeric, validateRequired } from "utils/validators";

import ApprovalStepField from "./approval-step-field";

function ApprovalProfileForm() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const profile = useSelector(profileSelectors.profile);

    const isCreating = useSelector(profileApprovalSelectors.isCreating);

    const isBusy = useMemo(() => isCreating, [isCreating]);

    const onSubmit = useCallback(
        (values: ProfileApprovalRequestModel) => {
            dispatch(
                profileApprovalActions.createApprovalProfile({
                    ...values,
                }),
            );
        },
        [dispatch],
    );

    const onCancelClick = useCallback(() => {
        navigate(-1);
    }, [navigate]);

    const approvalSteps: ProfileApprovalStepModel[] = [
        {
            order: 1,
            description: "",
            requiredApprovals: 0,
            // userUuid: profile?.uuid,
        },
    ];
    const defaultValues: ProfileApprovalRequestModel = useMemo(
        () => ({
            name: "",
            description: "",
            enabled: false,
            approvalSteps,
        }),
        [],
    );

    return (
        <Widget title="Add Approval Profile" busy={isBusy}>
            <Form initialValues={defaultValues} onSubmit={onSubmit} mutators={{ ...mutators<ProfileApprovalRequestModel>() }}>
                {({ handleSubmit, pristine, submitting, valid, form, values }) => (
                    <BootstrapForm onSubmit={handleSubmit}>
                        <Field name="name" validate={composeValidators(validateRequired(), validateAlphaNumeric())}>
                            {({ input, meta }) => (
                                <FormGroup>
                                    <Label for="name">Profile Name</Label>

                                    <Input
                                        {...input}
                                        valid={!meta.error && meta.touched}
                                        invalid={!!meta.error && meta.touched}
                                        type="text"
                                        id="name"
                                        placeholder="Approval Profile Name"
                                    />

                                    <FormFeedback>{meta.error}</FormFeedback>
                                </FormGroup>
                            )}
                        </Field>

                        <Field name="description" validate={composeValidators(validateRequired(), validateAlphaNumeric())}>
                            {({ input, meta }) => (
                                <FormGroup>
                                    <Label for="description">Profile Description</Label>

                                    <Input
                                        {...input}
                                        valid={!meta.error && meta.touched}
                                        invalid={!!meta.error && meta.touched}
                                        type="text"
                                        id="description"
                                        placeholder="Approval Profile Description"
                                    />
                                </FormGroup>
                            )}
                        </Field>

                        <>
                            <br />

                            <ApprovalStepField
                                approvalSteps={values.approvalSteps}
                                inProgress={submitting}
                                disabled={pristine || submitting || !valid}
                                onCancelClick={onCancelClick}
                            />
                        </>

                        <div className="d-flex justify-content-end">
                            <ButtonGroup>
                                <ProgressButton
                                    title={"Create"}
                                    inProgressTitle={"Creating..."}
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

export default ApprovalProfileForm;
