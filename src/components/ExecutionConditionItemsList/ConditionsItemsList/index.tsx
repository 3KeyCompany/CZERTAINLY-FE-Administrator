import cx from 'classnames';
import { selectors as enumSelectors, getEnumLabel } from 'ducks/enums';
import { EntityType, selectors } from 'ducks/filters';
import { selectors as rulesSelectors } from 'ducks/rules';
import { useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Badge, Spinner } from 'reactstrap';
import { AttributeContentType, ConditionItemDto, FilterFieldType, PlatformEnum, SearchFieldDataDto } from 'types/openapi';
import { getFormattedDate, getFormattedDateTime } from 'utils/dateUtil';
import styles from './conditionsItemsList.module.scss';

interface ConditionsTableViewerProps {
    conditionItems: ConditionItemDto[];
    conditionName: string;
    conditionUuid: string;
}

const ConditionsItemsList = ({ conditionItems = [], conditionName, conditionUuid }: ConditionsTableViewerProps) => {
    const searchGroupEnum = useSelector(enumSelectors.platformEnum(PlatformEnum.FilterFieldSource));
    const FilterConditionOperatorEnum = useSelector(enumSelectors.platformEnum(PlatformEnum.FilterConditionOperator));
    const availableFilters = useSelector(selectors.availableFilters(EntityType.CONDITIONS));
    const platformEnums = useSelector(enumSelectors.platformEnums);
    const isFetchingConditionDetails = useSelector(rulesSelectors.isFetchingConditionDetails);

    const booleanOptions = useMemo(
        () => [
            { label: 'True', value: true },
            { label: 'False', value: false },
        ],
        [],
    );
    const checkIfFieldIsDate = useCallback((field: SearchFieldDataDto) => {
        if (
            field.attributeContentType === AttributeContentType.Date ||
            field.attributeContentType === AttributeContentType.Time ||
            field.attributeContentType === AttributeContentType.Datetime
        ) {
            return true;
        } else {
            return false;
        }
    }, []);

    const renderConditionsBadges = useMemo(() => {
        return conditionItems.map((condition, i) => {
            const field = availableFilters
                .find((a) => a.filterFieldSource === condition.fieldSource)
                ?.searchFieldData?.find((s) => s.fieldIdentifier === condition.fieldIdentifier);

            const label = field ? field.fieldLabel : condition.fieldIdentifier;

            let value = '';

            value =
                field && field.type === FilterFieldType.Boolean
                    ? `'${booleanOptions.find((b) => !!condition.value === b.value)?.label}'`
                    : Array.isArray(condition.value)
                      ? `${condition.value
                            .map(
                                (v) =>
                                    `'${
                                        field?.platformEnum
                                            ? platformEnums[field.platformEnum][v]?.label
                                            : v?.name
                                              ? v.name
                                              : field && field.attributeContentType === AttributeContentType.Date
                                                ? getFormattedDate(v as unknown as string)
                                                : field && field.attributeContentType === AttributeContentType.Datetime
                                                  ? getFormattedDateTime(v as unknown as string)
                                                  : v
                                    }'`,
                            )
                            .join(' OR ')}`
                      : condition.value
                        ? `'${
                              field?.platformEnum
                                  ? platformEnums[field.platformEnum][condition.value as unknown as string]?.label
                                  : field && field.attributeContentType === AttributeContentType.Date
                                    ? getFormattedDate(condition.value as unknown as string)
                                    : field && field.attributeContentType === AttributeContentType.Datetime
                                      ? getFormattedDateTime(condition.value as unknown as string)
                                      : condition.value
                          }'`
                        : '';

            return (
                <Badge
                    key={i}
                    title={`${getEnumLabel(searchGroupEnum, condition.fieldSource)} ${label} ${getEnumLabel(
                        FilterConditionOperatorEnum,
                        condition.operator,
                    )} ${value}`}
                    className={styles.groupConditionBadge}
                >
                    <b>{getEnumLabel(searchGroupEnum, condition.fieldSource)}&nbsp;</b>'{label}'&nbsp;
                    {getEnumLabel(FilterConditionOperatorEnum, condition.operator)}&nbsp;
                    {value}
                </Badge>
            );
        });
    }, [FilterConditionOperatorEnum, availableFilters, booleanOptions, conditionItems, platformEnums, searchGroupEnum]);

    if (isFetchingConditionDetails) return <Spinner active={isFetchingConditionDetails} />;

    return (
        <div className={styles.groupConditionContainerDiv} key={conditionUuid}>
            <h6 className={cx('text-muted', styles.groupConditionTitle)}>{`${conditionName}`}</h6>
            <div className="ms-3">{renderConditionsBadges}</div>
        </div>
    );
};

export default ConditionsItemsList;
