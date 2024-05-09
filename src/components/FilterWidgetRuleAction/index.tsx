import Widget from 'components/Widget';

import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { ApiClients } from 'api';
import { selectors as enumSelectors, getEnumLabel } from 'ducks/enums';
import { EntityType, actions as filterActions, selectors } from 'ducks/filters';
import { useDispatch, useSelector } from 'react-redux';
import Select, { MultiValue, SingleValue } from 'react-select';
import { Badge, Button, Col, FormGroup, Input, Label, Row } from 'reactstrap';
import { Observable } from 'rxjs';
import { SearchFieldListModel } from 'types/certificate';
import { FilterFieldSource, FilterFieldType, PlatformEnum, RuleActionType } from 'types/openapi';
import { ActionRuleRequestModel } from 'types/rules';
import styles from './FilterWidgetRuleAction.module.scss';

interface CurrentActionOptions {
    label: string;
    value: string | any;
}

interface Props {
    title: string;
    entity: EntityType;
    getAvailableFiltersApi: (apiClients: ApiClients) => Observable<Array<SearchFieldListModel>>;
    onActionsUpdate?: (actionRuleRequests: ActionRuleRequestModel[]) => void;
    appendInWidgetContent?: React.ReactNode;
    actionsList?: ActionRuleRequestModel[];
}

export default function FilterWidgetRuleAction({
    actionsList,
    onActionsUpdate,
    appendInWidgetContent,
    title,
    entity,
    getAvailableFiltersApi,
}: Props) {
    const dispatch = useDispatch();

    const searchGroupEnum = useSelector(enumSelectors.platformEnum(PlatformEnum.FilterFieldSource));
    const RuleActionTypeEnum = useSelector(enumSelectors.platformEnum(PlatformEnum.RuleActionType));
    const [actions, setActions] = useState<ActionRuleRequestModel[]>([]);

    const platformEnums = useSelector(enumSelectors.platformEnums);

    const availableFilters = useSelector(selectors.availableFilters(entity));
    const isFetchingAvailableFilters = useSelector(selectors.isFetchingFilters(entity));

    const [selectedFilter, setSelectedFilter] = useState<number>(-1);

    const [ruleActionType, setRuleActionType] = useState<SingleValue<{ label: string; value: RuleActionType }> | undefined>(undefined);

    const [fieldSource, setFieldSource] = useState<SingleValue<{ label: string; value: FilterFieldSource }> | undefined>(undefined);

    const [filterField, setFilterField] = useState<SingleValue<{ label: string; value: string }> | undefined>(undefined);

    const [filterValue, setFilterValue] = useState<
        | object
        | SingleValue<object | object[] | { label: string; value: object }>
        | MultiValue<object | object[] | { label: string; value: object }>
        | undefined
    >(undefined);

    const ruleActionsOptions = useMemo(
        () => [
            // { label: 'Ignore', value: RuleActionType.Ignore },
            { label: 'Set Field', value: RuleActionType.SetField },
        ],
        [],
    );

    const booleanOptions = useMemo(
        () => [
            { label: 'True', value: true },
            { label: 'False', value: false },
        ],
        [],
    );

    useEffect(() => {
        dispatch(filterActions.getAvailableFilters({ entity, getAvailableFiltersApi }));
    }, [dispatch, entity, getAvailableFiltersApi]);

    const onUnselectFiltersClick = useCallback(
        (e: React.MouseEvent<HTMLDivElement>) => {
            if ((e.target as HTMLDivElement).id === 'unselectFilters') {
                setSelectedFilter(-1);
            }
        },
        [setSelectedFilter],
    );

    const onUpdateClick = useCallback(() => {
        if (!ruleActionType?.value) return;
        const newAction: ActionRuleRequestModel = {
            actionType: ruleActionType?.value,
            fieldSource: fieldSource?.value,
            fieldIdentifier: filterField?.value,
            actionData: filterValue
                ? typeof filterValue === 'string'
                    ? filterValue
                    : Array.isArray(filterValue)
                      ? filterValue.map((v) => (v as any).value)
                      : (filterValue as any).value
                : '',
        };
        setRuleActionType(undefined);
        setFieldSource(undefined);
        setFilterField(undefined);
        setFilterValue(undefined);

        if (selectedFilter === -1) {
            const updatedActions = [...actions, newAction];
            setActions(updatedActions);
            const updatedActionDataActions = updatedActions.map((a) => {
                return {
                    actionType: a.actionType,
                    fieldSource: a.fieldSource,
                    fieldIdentifier: a.fieldIdentifier,
                    actionData: Array.isArray(a.actionData)
                        ? a.actionData.map((v) => {
                              if (typeof v === 'object' && v.hasOwnProperty('uuid')) {
                                  return v.uuid;
                              }
                              return v;
                          })
                        : a.actionData,
                };
            });

            onActionsUpdate && onActionsUpdate(updatedActionDataActions);
        } else {
            const updatedActions = actions.map((a, i) => (i === selectedFilter ? newAction : a));
            setActions(updatedActions);
            const updatedActionDataActions = updatedActions.map((a) => {
                return {
                    actionType: a.actionType,
                    fieldSource: a.fieldSource,
                    fieldIdentifier: a.fieldIdentifier,
                    actionData: Array.isArray(a.actionData)
                        ? a.actionData.map((v) => {
                              if (typeof v === 'object' && v.hasOwnProperty('uuid')) {
                                  return v.uuid;
                              }
                              return v;
                          })
                        : a.actionData,
                };
            });

            onActionsUpdate && onActionsUpdate(updatedActionDataActions);
        }
    }, [
        ruleActionType,
        fieldSource,
        filterField,
        filterValue,
        setRuleActionType,
        setFieldSource,
        setFilterField,
        setFilterValue,
        actions,
        setActions,
        onActionsUpdate,
        selectedFilter,
    ]);

    useEffect(() => {
        if (selectedFilter === -1) {
            setRuleActionType(undefined);
            setFieldSource(undefined);
            setFilterField(undefined);
            setFilterValue(undefined);
        }
    }, [selectedFilter]);

    const onRemoveFilterClick = useCallback(
        (index: number) => {
            const newActions = actions.filter((_, i) => i !== index);
            setActions(newActions);
            onActionsUpdate && onActionsUpdate(newActions);
        },
        [actions, onActionsUpdate],
    );

    const toggleFilter = useCallback(
        (index: number) => {
            setSelectedFilter(selectedFilter === index ? -1 : index);
        },
        [selectedFilter],
    );

    const currentFields = useMemo(
        () => availableFilters.find((f) => f.filterFieldSource === fieldSource?.value)?.searchFieldData,
        [availableFilters, fieldSource],
    );

    const currentField = useMemo(() => currentFields?.find((f) => f.fieldIdentifier === filterField?.value), [filterField, currentFields]);

    const currentValueOptions: CurrentActionOptions[] = useMemo(() => {
        if (!currentField) return [];

        if (Array.isArray(currentField?.value)) {
            return currentField?.value?.map((v, i) => {
                let label = '';
                let value = '';
                if (typeof v === 'string') {
                    label = v;
                    value = v;
                } else {
                    const keys = Object.keys(v);
                    if (keys.length === 2) {
                        label = v[keys[1]];
                        value = v;
                    }
                }

                return { label, value };
            });
        }
        return [];
    }, [currentField]);

    useEffect(() => {
        // this effect is for updating dropdowns when a filter is selected
        if (selectedFilter >= actions.length) {
            setSelectedFilter(-1);
            return;
        }

        if (selectedFilter === -1) {
            return;
        }

        const selectedActionType = actions[selectedFilter].actionType;
        setRuleActionType({ label: getEnumLabel(RuleActionTypeEnum, selectedActionType), value: selectedActionType });

        const field = actions[selectedFilter].fieldSource;
        if (!field) return;
        setFieldSource({ label: getEnumLabel(searchGroupEnum, field), value: field });

        const fieldIdentifier = actions[selectedFilter].fieldIdentifier;
        const fieldIdentifierSelected = currentFields?.find((cf) => cf.fieldIdentifier === fieldIdentifier);
        if (!fieldIdentifier) return;
        if (fieldIdentifierSelected) {
            setFilterField({
                label: fieldIdentifierSelected.fieldLabel,
                value: fieldIdentifier,
            });
        } else {
            setFilterField({
                label: fieldIdentifier,
                value: fieldIdentifier,
            });
        }

        const currentActionData = actions[selectedFilter].actionData;
        if (!currentActionData) return;
        if (
            currentField?.type === FilterFieldType.String ||
            currentField?.type === FilterFieldType.Number ||
            currentField?.type === FilterFieldType.Date
        ) {
            setFilterValue(currentActionData);
            return;
        }
        if (currentField?.type === FilterFieldType.Boolean) {
            setFilterValue(booleanOptions.find((f) => !!currentActionData === f.value));
            return;
        }

        if (currentField && !currentField?.multiValue) {
            const value = currentActionData;
            const label = currentField.platformEnum ? platformEnums[currentField.platformEnum][value as unknown as string].label : value;
            setFilterValue({ label, value });
            return;
        }

        if (currentField && Array.isArray(currentActionData)) {
            const newFilterValue = currentActionData.map((v: any) => {
                let label = '';
                let value = '';
                if (typeof v === 'string') {
                    label = v;
                    value = v;
                } else {
                    const keys = Object.keys(v);
                    if (keys.length === 2) {
                        label = v[keys[1]];
                        value = v;
                    }
                }
                return { label, value };
            });
            setFilterValue(newFilterValue);
        }
    }, [selectedFilter, actions, currentFields, RuleActionTypeEnum, booleanOptions, currentField, platformEnums, searchGroupEnum]);

    useEffect(() => {
        // this effect is for updating the actions when the actionsList is passed
        if (!actionsList) return;

        const isActionDataObject = actionsList.some((a) => typeof a.actionData === 'object');
        if (!isActionDataObject) {
            setActions(actionsList);
            return;
        }

        const updatedActions = actionsList.map((action) => {
            if (!(typeof action.actionData === 'object')) return action;

            if (Array.isArray(action.actionData) && action.actionData.every((v) => typeof v === 'string')) {
                const thisCurrentFields = availableFilters.find((f) => f.filterFieldSource === action.fieldSource)?.searchFieldData;
                if (!thisCurrentFields) return action;

                const thisCurrentField = thisCurrentFields.find((f) => f.fieldIdentifier === action.fieldIdentifier);

                if (!thisCurrentField || !Array.isArray(thisCurrentField.value)) return action;

                const updatedActionData = action.actionData.map((v) => {
                    const value = (thisCurrentField.value as Array<any>)?.find((f) => f.uuid === v);

                    return value ? { uuid: value.uuid, name: value.name } : { label: v, value: v };
                });

                return {
                    ...action,
                    actionData: updatedActionData,
                };
            } else return action;
        });

        setActions(updatedActions);
    }, [actionsList, availableFilters]);

    return (
        <>
            <Widget title={title} busy={isFetchingAvailableFilters} titleSize="larger">
                <div id="unselectFilters" onClick={onUnselectFiltersClick}>
                    <div style={{ width: '99%', borderBottom: 'solid 1px silver', marginBottom: '1rem' }}>
                        <Row>
                            <Col>
                                <FormGroup>
                                    <Label for="actions">Action Type</Label>
                                    <Select
                                        id="actions"
                                        options={ruleActionsOptions}
                                        onChange={(e) => {
                                            setRuleActionType(e);
                                            setFilterValue(undefined);
                                        }}
                                        value={ruleActionType || null}
                                    />
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup>
                                    <Label for="group">Field Source</Label>
                                    <Select
                                        id="group"
                                        options={availableFilters.map((f) => ({
                                            label: getEnumLabel(searchGroupEnum, f.filterFieldSource),
                                            value: f.filterFieldSource,
                                        }))}
                                        onChange={(e) => {
                                            setFieldSource(e);
                                            setFilterField(undefined);
                                            setFilterValue(undefined);
                                        }}
                                        value={fieldSource || null}
                                        isClearable={true}
                                    />
                                </FormGroup>
                            </Col>

                            <Col>
                                <FormGroup>
                                    <Label for="field">Field</Label>
                                    <Select
                                        id="field"
                                        options={currentFields?.map((f) => ({ label: f.fieldLabel, value: f.fieldIdentifier }))}
                                        onChange={(e) => {
                                            setFilterField(e);
                                            setFilterValue(undefined);
                                        }}
                                        value={filterField || null}
                                        isDisabled={!fieldSource}
                                        isClearable={true}
                                    />
                                </FormGroup>
                            </Col>

                            <Col>
                                <FormGroup>
                                    <Label for="value">Value</Label>
                                    {currentField?.type === undefined ||
                                    currentField?.type === FilterFieldType.String ||
                                    currentField?.type === FilterFieldType.Date ||
                                    currentField?.type === FilterFieldType.Number ? (
                                        <Input
                                            id="value"
                                            type={currentField?.type === FilterFieldType.Date ? 'date' : 'text'}
                                            value={filterValue?.toString() || ''}
                                            onChange={(e) => {
                                                setFilterValue(JSON.parse(JSON.stringify(e.target.value)));
                                            }}
                                            placeholder="Enter filter value"
                                        />
                                    ) : currentField?.type === FilterFieldType.Boolean ? (
                                        <Select
                                            id="value"
                                            options={filterField ? booleanOptions : undefined}
                                            value={filterValue || null}
                                            onChange={(e) => {
                                                setFilterValue(e);
                                            }}
                                        />
                                    ) : (
                                        <>
                                            <Select
                                                id="value"
                                                options={currentValueOptions}
                                                value={filterValue || null}
                                                onChange={(e) => {
                                                    setFilterValue(e);
                                                }}
                                                isMulti={currentField?.multiValue}
                                                placeholder="Select filter value from options"
                                            />
                                        </>
                                    )}
                                </FormGroup>
                            </Col>

                            <Col md="auto">
                                <Button style={{ width: '7em', marginTop: '2em' }} color="primary" onClick={onUpdateClick}>
                                    {selectedFilter === -1 ? 'Add' : 'Update'}
                                </Button>
                            </Col>
                        </Row>
                    </div>

                    {actions.map((f, i) => {
                        const field = availableFilters
                            .find((a) => a.filterFieldSource === f.fieldSource)
                            ?.searchFieldData?.find((s) => s.fieldIdentifier === f.fieldIdentifier);
                        const label = field ? field.fieldLabel : f.fieldIdentifier;
                        const value =
                            field && field.type === FilterFieldType.Boolean
                                ? `'${booleanOptions.find((b) => !!f.actionData === b.value)?.label}'`
                                : Array.isArray(f.actionData)
                                  ? `${f.actionData
                                        .map(
                                            (v) =>
                                                `'${
                                                    field?.platformEnum ? platformEnums[field.platformEnum][v]?.label : v?.name ? v.name : v
                                                }'`,
                                        )
                                        .join(' OR ')}`
                                  : f.actionData
                                    ? `'${
                                          field?.platformEnum
                                              ? platformEnums[field.platformEnum][f.actionData as unknown as string]?.label
                                              : f.actionData
                                      }'`
                                    : '';
                        return (
                            <Badge
                                className={styles.filterBadge}
                                key={i}
                                onClick={() => toggleFilter(i)}
                                color={selectedFilter === i ? 'primary' : 'secondary'}
                            >
                                {getEnumLabel(RuleActionTypeEnum, f.actionType)}&nbsp;
                                <b>{f?.fieldSource && getEnumLabel(searchGroupEnum, f?.fieldSource)}&nbsp;</b>'{label}'&nbsp;to&nbsp;
                                {value}
                                <span className={styles.filterBadgeSpan} onClick={() => onRemoveFilterClick(i)}>
                                    &times;
                                </span>
                            </Badge>
                        );
                    })}
                </div>
                {appendInWidgetContent}
            </Widget>
        </>
    );
}