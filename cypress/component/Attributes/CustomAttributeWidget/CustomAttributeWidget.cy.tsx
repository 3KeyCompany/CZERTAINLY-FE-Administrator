import CustomAttributeWidget, { Props as CustomAttributeWidgetProps } from 'components/Attributes/CustomAttributeWidget';
import { actions as customAttributesActions } from 'ducks/customAttributes';
import { transformCustomAttributeDtoToModel } from 'ducks/transform/attributes';
import { AttributeResponseModel, CustomAttributeDto } from 'types/attributes';
import { AttributeContentType, AttributeType, Resource } from 'types/openapi';
import '../../../../src/resources/styles/theme.scss';

const successData = [
    {
        uuid: 'test-uuid-1',
        name: 'Test',
        description: '',
        content: [
            {
                data: 'Test content',
            },
        ],
        type: AttributeType.Custom,
        contentType: AttributeContentType.String,
        properties: {
            label: 'Test',
            visible: true,
            group: '',
            required: false,
            readOnly: false,
            list: false,
            multiSelect: false,
        },
    },
    {
        uuid: 'test-uuid-2',
        name: 'Distribution method',
        description: 'te2',
        content: [
            {
                data: 'Printer',
            },
            {
                data: 'Disk',
            },
        ],

        type: AttributeType.Custom,
        contentType: AttributeContentType.String,
        properties: {
            label: 'Distribution method',
            visible: true,
            group: 'Test',
            required: false,
            readOnly: false,
            list: true,
            multiSelect: false,
        },
    },
] as CustomAttributeDto[];

const customAttributeWidgetProps: CustomAttributeWidgetProps = {
    resource: Resource.Certificates,
    resourceUuid: 'e0264f92-b3bc-496b-b48c-e687863c8288',
    attributes: [
        {
            uuid: '4b42fe2c-2d59-4a62-8880-38a47d2c7db2',
            name: 'Distribution method',
            label: 'Distribution method',
            type: AttributeType.Custom,
            contentType: AttributeContentType.String,
            content: [
                {
                    data: 'Disk',
                },
            ],
        },
        {
            uuid: 'c189d9fd-6671-4b84-8e9e-f9c91d81982f',
            name: 'Test',
            label: 'Test',
            type: AttributeType.Custom,
            contentType: AttributeContentType.String,
            content: [
                {
                    data: 'Default content',
                },
            ],
        },
    ] as AttributeResponseModel[],
};
describe('CustomAttributeWidget', () => {
    it('should render info attribute editor', () => {
        cy.mount(<></>);
        cy.mount(
            <CustomAttributeWidget
                resource={customAttributeWidgetProps.resource}
                resourceUuid={customAttributeWidgetProps.resourceUuid}
                attributes={customAttributeWidgetProps.attributes}
            />,
        )
            .wait(1000)
            .window()
            .its('store')
            .invoke(
                'dispatch',
                customAttributesActions.listResourceCustomAttributesSuccess(successData.map(transformCustomAttributeDtoToModel)),
            );
    });
});
