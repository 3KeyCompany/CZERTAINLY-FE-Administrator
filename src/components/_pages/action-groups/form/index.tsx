import Widget from 'components/Widget';
import { selectors as rulesSelectors } from 'ducks/rules';
import { useCallback, useMemo } from 'react';
import { Field, Form } from 'react-final-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Form as BootstrapForm, Button, ButtonGroup, FormFeedback, FormGroup, Input, Label } from 'reactstrap';
import { mutators } from 'utils/attributes/attributeEditorMutators';

import ConditionFormFilter from 'components/ConditionFormFilter';
import ProgressButton from 'components/ProgressButton';
import { selectors as enumSelectors, getEnumLabel } from 'ducks/enums';
import { actions as rulesActions } from 'ducks/rules';
import Select from 'react-select';
import { ExecutionType, PlatformEnum, Resource } from 'types/openapi';
import { ExecutionItemRequestModel } from 'types/rules';
import { isObjectSame } from 'utils/common-utils';
import { useRuleEvaluatorResourceOptions } from 'utils/rules';
import { composeValidators, validateAlphaNumericWithSpecialChars, validateRequired } from 'utils/validators';

interface SelectChangeValue {
    value: string;
    label: string;
}

export interface ActionGroupFormValues {
    name: string;
    selectedResource?: SelectChangeValue;
    resource: Resource;
    description?: string;
    items: ExecutionItemRequestModel[];
    selectedType?: SelectChangeValue;
    type?: ExecutionType;
}

const ExecutionForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const title = 'Create Execution';
    const isCreatingExecution = useSelector(rulesSelectors.isCreatingExecution);
    const { resourceOptionsWithRuleEvaluator, isFetchingResourcesList } = useRuleEvaluatorResourceOptions();
    const isBusy = useMemo(() => isCreatingExecution || isFetchingResourcesList, [isCreatingExecution, isFetchingResourcesList]);
    const executionTyeEnum = useSelector(enumSelectors.platformEnum(PlatformEnum.ExecutionType));

    const executionTypeOptions = useMemo(() => {
        return [{ value: ExecutionType.SetField, label: getEnumLabel(executionTyeEnum, ExecutionType.SetField) }];
    }, [executionTyeEnum]);

    const defaultValues: ActionGroupFormValues = useMemo(() => {
        return {
            name: '',
            resource: Resource.None,
            selectedResource: undefined,
            description: undefined,
            actions: [],
            items: [],
            selectedType: undefined,
            type: undefined,
        };
    }, []);

    const submitTitle = 'Create';
    const inProgressTitle = 'Creating...';

    const onCancel = useCallback(() => {
        navigate(-1);
    }, [navigate]);

    const onSubmit = useCallback(
        (values: ActionGroupFormValues) => {
            if (values.resource === Resource.None || !values.type) return;
            console.log('values', values);
            dispatch(
                rulesActions.createExecution({
                    executionRequestModel: {
                        items: values.items,
                        type: values.type,
                        name: values.name,
                        description: values.description,
                        resource: values.resource,
                    },
                }),
            );
        },
        [dispatch],
    );

    const areDefaultValuesSame = useCallback(
        (values: ActionGroupFormValues) => {
            const areValuesSame = isObjectSame(
                values as unknown as Record<string, unknown>,
                defaultValues as unknown as Record<string, unknown>,
            );
            return areValuesSame;
        },
        [defaultValues],
    );

    return (
        <Widget title={title} busy={isBusy}>
            <Form initialValues={defaultValues} onSubmit={onSubmit} mutators={{ ...mutators<ActionGroupFormValues>() }}>
                {({ handleSubmit, pristine, submitting, values, valid, form }) => (
                    <BootstrapForm onSubmit={handleSubmit}>
                        <Field name="name" validate={composeValidators(validateRequired(), validateAlphaNumericWithSpecialChars())}>
                            {({ input, meta }) => (
                                <FormGroup>
                                    <Label for="name">Execution Name</Label>

                                    <Input
                                        {...input}
                                        valid={!meta.error && meta.touched}
                                        invalid={!!meta.error && meta.touched}
                                        type="text"
                                        placeholder="Enter the Execution Name"
                                    />

                                    <FormFeedback>{meta.error}</FormFeedback>
                                </FormGroup>
                            )}
                        </Field>

                        <Field name="description">
                            {({ input, meta }) => (
                                <FormGroup>
                                    <Label for="description">Description</Label>

                                    <Input
                                        {...input}
                                        valid={!meta.error && meta.touched}
                                        invalid={!!meta.error && meta.touched}
                                        type="text"
                                        placeholder="Enter the Description"
                                    />

                                    <FormFeedback>{meta.error}</FormFeedback>
                                </FormGroup>
                            )}
                        </Field>

                        <Field name="selectedType" validate={validateRequired()}>
                            {({ input, meta }) => (
                                <FormGroup>
                                    <Label for="type">Execution Type</Label>

                                    <Select
                                        {...input}
                                        options={executionTypeOptions}
                                        placeholder="Select Execution Type"
                                        onChange={(event) => {
                                            input.onChange(event);
                                            if (event?.value) {
                                                form.change('type', event.value);
                                            }
                                        }}
                                        styles={{
                                            control: (provided) =>
                                                meta.touched && meta.invalid
                                                    ? { ...provided, border: 'solid 1px red', '&:hover': { border: 'solid 1px red' } }
                                                    : { ...provided },
                                        }}
                                        isClearable
                                    />

                                    <div className="invalid-feedback" style={meta.touched && meta.invalid ? { display: 'block' } : {}}>
                                        {meta.error}
                                    </div>
                                </FormGroup>
                            )}
                        </Field>

                        <Field name="selectedResource" validate={validateRequired()}>
                            {({ input, meta }) => (
                                <FormGroup>
                                    <Label for="resource">Resource</Label>

                                    <Select
                                        {...input}
                                        maxMenuHeight={140}
                                        menuPlacement="auto"
                                        options={resourceOptionsWithRuleEvaluator || []}
                                        placeholder="Select Resource"
                                        onChange={(event) => {
                                            input.onChange(event);
                                            if (event?.value) {
                                                form.change('resource', event.value);
                                            }
                                            form.change('items', []);
                                        }}
                                        styles={{
                                            control: (provided) =>
                                                meta.touched && meta.invalid
                                                    ? { ...provided, border: 'solid 1px red', '&:hover': { border: 'solid 1px red' } }
                                                    : { ...provided },
                                        }}
                                        isClearable
                                    />

                                    <div className="invalid-feedback" style={meta.touched && meta.invalid ? { display: 'block' } : {}}>
                                        {meta.error}
                                    </div>
                                </FormGroup>
                            )}
                        </Field>

                        {values?.resource && <ConditionFormFilter formType="cxecutionItem" resource={values.resource} />}

                        <div className="d-flex justify-content-end">
                            <ButtonGroup>
                                <ProgressButton
                                    title={submitTitle}
                                    inProgressTitle={inProgressTitle}
                                    inProgress={submitting}
                                    disabled={
                                        areDefaultValuesSame(values) ||
                                        values.resource === Resource.None ||
                                        submitting ||
                                        !valid ||
                                        isBusy ||
                                        !values.items.length
                                    }
                                />

                                <Button color="default" onClick={onCancel} disabled={submitting}>
                                    Cancel
                                </Button>
                            </ButtonGroup>
                        </div>
                    </BootstrapForm>
                )}
            </Form>
        </Widget>
    );
};

export default ExecutionForm;
