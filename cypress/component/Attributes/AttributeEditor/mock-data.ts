import { Props as AttributeEditorProps } from 'components/Attributes/AttributeEditor';
import { CustomAttributeModel, InfoAttributeModel } from 'types/attributes';
import {
    AttributeContentType,
    AttributeType,
    AuthorityInstanceDto,
    ConnectorDto,
    DataAttribute,
    GroupAttribute,
    ProgrammingLanguageEnum,
} from 'types/openapi';
import { RaProfileResponseModel } from 'types/ra-profiles';

export const customAttributeEditorProps: AttributeEditorProps = {
    id: 'test',
    attributeDescriptors: [
        {
            uuid: 'test-uuid-1',
            name: 'test-name-1',
            description: 'test-description-string-1',
            type: AttributeType.Custom,
            contentType: AttributeContentType.String,
            properties: {
                label: 'Test property string',
                visible: true,
                required: true,
                readOnly: false,
                list: false,
                multiSelect: false,
            },
            // content: [
            //     {
            //         data: 'test-data-1',
            //     },
            // ],
            constraints: [
                {
                    description: 'Test Description 1',
                    errorMessage: 'Test Error Message 1',
                    type: 'test-type-1',
                    data: 'test-data-1',
                },
            ],
        },
        {
            uuid: 'test-uuid-2',
            name: 'test-name-2',
            description: 'test-description-boolean-2',
            // content: [
            //     {
            //         data: true,
            //     },
            // ],
            type: AttributeType.Custom,
            contentType: AttributeContentType.Boolean,
            properties: {
                label: 'Test property boolean',
                visible: true,
                required: true,
                readOnly: true,
                list: false,
                multiSelect: false,
            },
        },
        {
            uuid: 'test-uuid-3',
            name: 'test-name-3',
            description: 'test-description-integer-3',
            // content: [
            //     {
            //         data: 5985,
            //     },
            // ],
            type: AttributeType.Custom,
            contentType: AttributeContentType.Integer,
            properties: {
                label: 'Test property integer',
                visible: true,
                required: true,
                readOnly: false,
                list: false,
                multiSelect: false,
            },
        },
        {
            uuid: 'test-uuid-4',
            name: 'test-name-4',
            description: 'test-description-drop-down-4',
            type: AttributeType.Custom,
            contentType: AttributeContentType.Credential,
            properties: {
                label: 'Test property drop down',
                visible: true,
                required: true,
                readOnly: false,
                list: true,
                multiSelect: true,
            },
            content: [
                {
                    data: 'test-default-content-1',
                },
                {
                    data: 'test-default-content-2',
                },
            ],
        },
        {
            uuid: 'test-uuid-5',
            name: 'test-name-5',
            label: 'Test property codeblock',
            type: AttributeType.Custom,
            contentType: AttributeContentType.Codeblock,
            properties: {
                label: 'Test property codeblock',
                group: 'test-group',
            },
            content: [
                {
                    data: {
                        // code: 'PGgxPk9EUE9WRcSOPC9oMT4KPGRpdj5Qb8SNw610YW1lIGtvxL5rbyBjZXJ0aWZpa8OhdG92IHR1IGplLjwvZGl2PgoKPHVsPgogIDxsaT5TdWJqZWN0OiAke25vdGlmaWNhdGlvbkRhdGEuc3ViamVjdERufTwvbGk+CiAgPGxpPlNlcmlhbCBOdW1iZXI6ICR7bm90aWZpY2F0aW9uRGF0YS5zZXJpYWxOdW1iZXJ9PC9saT4KICA8bGk+SXNzdWVyOiAke25vdGlmaWNhdGlvbkRhdGEuaXNzdWVyRG59PC9saT4KPC91bD4=',
                        code: '',
                        language: ProgrammingLanguageEnum.Html,
                    },
                },
            ],
        },
        {
            uuid: 'test-uuid-6',
            name: 'test-name-6',
            label: 'test float property',
            type: AttributeType.Custom,
            contentType: AttributeContentType.Float,
            properties: {
                label: 'test float property',
                group: 'test-group',
                visible: true,
                required: true,
                readOnly: false,
                list: false,
                multiSelect: false,
            },
            // content: [
            //     {
            //         data: '1.1',
            //     },
            // ],
        },
        {
            uuid: 'test-uuid-7',
            name: 'test-name-7',
            label: 'test date property',
            type: AttributeType.Custom,
            contentType: AttributeContentType.Date,
            properties: {
                label: 'test date property',
                group: 'test-group',
                visible: true,
                required: true,
                readOnly: false,
                list: false,
                multiSelect: false,
            },
            // content: [
            //     {
            //         data: '2022-01-01',
            //     },
            // ],
        },
        {
            uuid: 'test-uuid-8',
            name: 'test-name-8',
            label: 'test datetime property',
            type: AttributeType.Custom,
            contentType: AttributeContentType.Datetime,
            properties: {
                label: 'test datetime property',
                group: 'test-group',
                visible: true,
                required: true,
                readOnly: false,
                list: false,
                multiSelect: false,
            },
            // content: [
            //     {
            //         data: '2022-01-01T00:00:00',
            //     },
            // ],
        },
        {
            uuid: 'test-uuid-9',
            name: 'test-name-9',
            label: 'test text property',
            type: AttributeType.Custom,
            contentType: AttributeContentType.Text,
            properties: {
                label: 'test-property-text',
                group: 'test-group',
                visible: true,
                required: true,
                readOnly: false,
                list: false,
                multiSelect: false,
            },
            // content: [
            //     {
            //         data: 'test-text',
            //     },
            // ],
        },
        {
            uuid: 'test-uuid-10',
            name: 'test-name-10',
            label: 'test date property',
            type: AttributeType.Custom,
            contentType: AttributeContentType.Time,
            properties: {
                label: 'test-property-time',
                group: 'test-group',
                visible: true,
                required: true,
                readOnly: false,
                list: false,
                multiSelect: false,
            },
            // content: [
            //     {
            //         data: '00:00:00',
            //     },
            // ],
        },
        {
            uuid: 'test-uuid-11',
            name: 'test-name-11',
            label: 'test date property',
            type: AttributeType.Custom,
            contentType: AttributeContentType.File,
            properties: {
                label: 'test-property-file',
                group: 'test-group',
                visible: true,
                required: true,
                readOnly: false,
                list: false,
                multiSelect: false,
            },
        },
        {
            uuid: 'test-uuid-12',
            name: 'test-name-12',
            label: 'test object property',
            type: AttributeType.Custom,
            contentType: AttributeContentType.Object,
            properties: {
                label: 'test-property-object',
                group: 'test-group',
                visible: false,
                required: true,
                readOnly: false,
                list: false,
                multiSelect: false,
            },
            // content: [
            //     {
            //         data: {
            //             name: 'WebServer',
            //             display_name: 'Web Server',
            //             schema_version: '1',
            //             version: '4.1',
            //             oid: '
        },
    ] as CustomAttributeModel[],
};

export const infoAttributeEditorProps: AttributeEditorProps = {
    id: 'test1',
    attributeDescriptors: [
        {
            content: [{ data: 'test-data-1', reference: 'test-reference-1' }],
            contentType: AttributeContentType.String,
            description: 'test-description-1',
            name: 'test-name-1',
            type: AttributeType.Info,
            uuid: 'test-uuid-1',
            properties: {
                label: 'Test Label String 1',
                visible: true,
                group: 'test-group-1',
            },
        },
        {
            content: [{ data: 'test-data-2', reference: 'test-reference-2' }],
            contentType: AttributeContentType.Text,
            description: 'test-description-2',
            name: 'test-name-2',
            type: AttributeType.Info,
            uuid: 'test-uuid-2',
            properties: {
                label: 'Test Label Text 2',
                visible: true,
                group: 'test-group-1',
            },
        },
        {
            content: [
                {
                    data: '2022-01-01',
                },
            ],
            contentType: AttributeContentType.Date,
            description: 'test-description-3',
            name: 'test-name-3',
            type: AttributeType.Info,
            uuid: 'test-uuid-3',
            properties: {
                label: 'Test Label date 3',
                visible: true,
                group: 'test-group-2',
            },
        },
        {
            contentType: AttributeContentType.Datetime,
            description: 'test-description-4',
            name: 'test-name-4',
            type: AttributeType.Info,
            uuid: 'test-uuid-3',
            properties: {
                label: 'Test Label datetime 4',
                visible: true,
                group: 'test-group-2',
            },
            content: [
                {
                    data: '2022-01-01T00:00:00',
                },
            ],
        },
        {
            contentType: AttributeContentType.Time,
            description: 'test-description-5',
            name: 'test-name-5',
            type: AttributeType.Info,
            uuid: 'test-uuid-5',
            properties: {
                label: 'Test Label time 5',
                visible: true,
                group: 'test-group-2',
            },
            content: [
                {
                    data: '00:00:00',
                },
            ],
        },
        {
            contentType: AttributeContentType.Integer,
            description: 'test-description-6',
            name: 'test-name-6',
            type: AttributeType.Info,
            uuid: 'test-uuid-6',
            properties: {
                label: 'Test Label integer 6',
                visible: true,
                group: 'test-group-3',
            },
            content: [
                {
                    data: 123,
                },
            ],
        },
        {
            contentType: AttributeContentType.Float,
            description: 'test-description-7',
            name: 'test-name-7',
            type: AttributeType.Info,
            uuid: 'test-uuid-7',
            properties: {
                label: 'Test Label float 7',
                visible: true,
                group: 'test-group-3',
            },
            content: [
                {
                    data: '1.5',
                },
            ],
        },
        {
            contentType: AttributeContentType.Codeblock,
            description: 'test-description-8',
            name: 'test-name-8',
            type: AttributeType.Info,
            uuid: 'test-uuid-8',
            properties: {
                label: 'test-property-codeblock',
                group: 'test-group-4',
                visible: true,
                required: true,
                readOnly: false,
                list: false,
                multiSelect: false,
            },
            content: [
                {
                    data: {
                        code: 'PGgxPk9EUE9WRcSOPC9oMT4KPGRpdj5Qb8SNw610YW1lIGtvxL5rbyBjZXJ0aWZpa8OhdG92IHR1IGplLjwvZGl2PgoKPHVsPgogIDxsaT5TdWJqZWN0OiAke25vdGlmaWNhdGlvbkRhdGEuc3ViamVjdERufTwvbGk+CiAgPGxpPlNlcmlhbCBOdW1iZXI6ICR7bm90aWZpY2F0aW9uRGF0YS5zZXJpYWxOdW1iZXJ9PC9saT4KICA8bGk+SXNzdWVyOiAke25vdGlmaWNhdGlvbkRhdGEuaXNzdWVyRG59PC9saT4KPC91bD4=',
                        language: 'html',
                    },
                },
            ],
        },
        {
            contentType: AttributeContentType.File,
            description: 'test-description-9',
            name: 'test-name-9',
            type: AttributeType.Info,
            uuid: 'test-uuid-9',
            properties: {
                label: 'test-property-file',
                group: 'test-group-4',
                visible: true,
                required: true,
                readOnly: false,
                list: false,
                multiSelect: false,
            },
            content: [{ data: 'test-file', reference: 'test.txt' }],
        },
        {
            uuid: 'test-uuid-10',
            name: 'test-name-10',
            description: 'test-description-drop-down-4',
            type: AttributeType.Info,
            contentType: AttributeContentType.Credential,
            properties: {
                group: 'test-group-5',
                label: 'Test property Credential',
                visible: true,
                required: true,
                readOnly: false,
                list: true,
                multiSelect: true,
            },
            content: [
                {
                    data: 'test-default-content-1',
                    reference: 'test-reference-content-1',
                },
                {
                    data: 'test-default-content-2',
                    reference: 'test-reference-content-2',
                },
            ],
        },
        {
            uuid: 'test-uuid-11',
            name: 'test-name-11',
            description: 'test-description-secret',
            contentType: AttributeContentType.Secret,
            type: AttributeType.Info,
            properties: {
                group: 'test-group-5',
                label: 'Test property secret',
                visible: true,
                required: true,
                readOnly: false,
                list: false,
                multiSelect: false,
            },
            content: [
                {
                    data: {
                        name: 'password-test',
                        display_name: 'test-reference-secret',
                    },
                    reference: 'test-reference-secret',
                },
            ],
        },
        {
            uuid: 'test-uuid-12',
            name: 'test-name-12',
            label: 'Test object',
            type: AttributeType.Info,
            contentType: AttributeContentType.Object,
            properties: {
                group: 'test-group-5',
                label: 'Test property Object',
            },
            content: [
                {
                    reference: 'Web Server',
                    data: {
                        name: 'WebServer',
                        display_name: 'Web Server',
                        schema_version: '1',
                        version: '4.1',
                        oid: '1.3.6.1.4.1.311.21.8.16335329.656368.4341948.8708353.10624234.204.1.16',
                    },
                },
            ],
        },
    ] as InfoAttributeModel[],
};

export const dataAttributeDescriptors = [
    {
        uuid: '93ca0ba2-3863-4ffa-a469-fd14ab3992bf',
        name: 'address',
        description: 'Address of ADCS server.',
        type: AttributeType.Data,
        contentType: AttributeContentType.String,
        properties: {
            label: 'MS-ADCS Address',
            visible: true,
            required: true,
            readOnly: false,
            list: false,
            multiSelect: false,
        },
        constraints: [
            {
                description: 'Address of ADCS Server',
                errorMessage: 'Enter Valid Address',
                type: 'regExp',
                data: '^((([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])|(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\\-]*[a-zA-Z0-9])\\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9\\-]*[A-Za-z0-9]))$',
            },
        ],
    },
    {
        uuid: 'd9f79ba6-47e5-437b-a7bc-82dbafa9cf01',
        name: 'https',
        description: 'Use https for connection with ADCS server.',
        content: [
            {
                data: false,
            },
        ],
        type: AttributeType.Data,
        contentType: AttributeContentType.Boolean,
        properties: {
            label: 'HTTPS Enabled',
            visible: true,
            required: false,
            readOnly: false,
            list: false,
            multiSelect: false,
        },
    },
    {
        uuid: '9587a320-a487-4084-9645-0b6c24636fa6',
        name: 'port',
        description: 'Define WinRM port, default port for http is 5985 and for https 5986.',
        content: [
            {
                data: 5985,
            },
        ],
        type: AttributeType.Data,
        contentType: AttributeContentType.Integer,
        properties: {
            label: 'Port',
            visible: true,
            required: true,
            readOnly: false,
            list: false,
            multiSelect: false,
        },
    },
    {
        uuid: 'd9f79ba6-47e5-437b-a7bc-82dbafa9cf03',
        name: 'credential',
        description: 'Credential for the communication',
        type: AttributeType.Data,
        contentType: AttributeContentType.Credential,
        properties: {
            label: 'Credential',
            visible: true,
            required: true,
            readOnly: false,
            list: true,
            multiSelect: false,
        },
        attributeCallback: {
            callbackContext: 'core/getCredentials',
            callbackMethod: 'GET',
            mappings: [
                {
                    to: 'credentialKind',
                    targets: ['pathVariable'],
                    value: 'Basic',
                },
            ],
        },
    },
] as DataAttribute[];

export const dataCallback = [
    {
        reference: 'lab01-testssh',
        data: {
            uuid: '91c105e3-29d4-46e5-88c3-2ba7fb1fbd40',
            name: 'lab01-testssh',
        },
    },
    {
        reference: 'statecredmodal112',
        data: {
            uuid: '42ea93c3-8725-4d26-a87e-e0ea92f3c29c',
            name: 'statecredmodal112',
        },
    },
    {
        reference: 'adcs-lab02-login',
        data: {
            uuid: '34e58936-c041-4aa6-8ae7-ab2157da290b',
            name: 'adcs-lab02-login',
        },
    },
    {
        reference: 'adcs-sefira-test',
        data: {
            uuid: 'c3aa7609-e5ba-492e-b64b-2d3e6bad3b0d',
            name: 'adcs-sefira-test',
        },
    },
    {
        reference: 'optncallback',
        data: {
            uuid: '871c2d8f-0831-44cb-a0e5-bc34fc3452c3',
            name: 'optncallback',
        },
    },
    {
        reference: 'newoptna',
        data: {
            uuid: '75993605-a81d-4d53-b278-f471c9658cc6',
            name: 'newoptna',
        },
    },
    {
        reference: 'initiateAttributeCallbackstateredux',
        data: {
            uuid: '2b761650-f5bb-4894-9ba4-54b1498b9bb6',
            name: 'initiateAttributeCallbackstateredux',
        },
    },
    {
        reference: 'initiateAttributeCallbackstateredux12',
        data: {
            uuid: '005a0fe6-b891-41e7-bcfb-1a759389adc0',
            name: 'initiateAttributeCallbackstateredux12',
        },
    },
    {
        reference: 'lab03-testssh',
        data: {
            uuid: 'cfc0953d-e57c-4038-8e5a-c2f636a68071',
            name: 'lab03-testssh',
        },
    },
    {
        reference: 'tempnewtest',
        data: {
            uuid: '4a509d31-3725-442c-9c5e-d0a4bb6c4138',
            name: 'tempnewtest',
        },
    },
];

export const authorityDetailSuccessObject = {
    uuid: '59c908cd-15ed-4ca0-a183-6237fd65d1f1',
    name: 'ADCS-through-proxy',
    attributes: [
        {
            uuid: 'd9f79ba6-47e5-437b-a7bc-82dbafa9cf01',
            name: 'https',
            label: 'HTTPS Enabled',
            type: AttributeType.Data,
            contentType: AttributeContentType.Boolean,
            content: [
                {
                    data: false,
                },
            ],
        },
        {
            uuid: '9587a320-a487-4084-9645-0b6c24636fa6',
            name: 'port',
            label: 'Port',
            type: AttributeType.Data,
            contentType: AttributeContentType.Integer,
            content: [
                {
                    data: '80',
                },
            ],
        },
        {
            uuid: '93ca0ba2-3863-4ffa-a469-fd14ab3992bf',
            name: 'address',
            label: 'MS-ADCS Address',
            type: AttributeType.Data,
            contentType: AttributeContentType.String,
            content: [
                {
                    data: 'data.cveradar.com',
                },
            ],
        },
        {
            uuid: 'd9f79ba6-47e5-437b-a7bc-82dbafa9cf03',
            name: 'credential',
            label: 'Credential',
            type: AttributeType.Data,
            contentType: AttributeContentType.Credential,
            content: [
                {
                    reference: 'adcs-lab02-login',
                    data: {
                        uuid: '04274e0f-06e6-48bc-a5db-d3399c97f1df',
                        name: 'adcs-lab02-login',
                        kind: 'Basic',
                        attributes: [
                            {
                                uuid: 'fe2d6d35-fb3d-4ea0-9f0b-7e39be93beeb',
                                name: 'username',
                                description: 'Username',
                                content: [
                                    {
                                        data: 'nejaky.uzivatel',
                                    },
                                ],
                                type: AttributeType.Data,
                                contentType: AttributeContentType.String,
                                properties: {
                                    label: 'Username',
                                    visible: true,
                                    group: 'Basic',
                                    required: true,
                                    readOnly: false,
                                    list: false,
                                    multiSelect: false,
                                },
                            },
                            {
                                uuid: '04506d45-c865-4ddc-b6fc-117ee5d5c8e7',
                                name: 'password',
                                description: 'Password',
                                content: [{}],
                                type: AttributeType.Data,
                                contentType: AttributeContentType.Secret,
                                properties: {
                                    label: 'Password',
                                    visible: true,
                                    group: 'Basic',
                                    required: true,
                                    readOnly: false,
                                    list: false,
                                    multiSelect: false,
                                },
                            },
                        ],
                    },
                },
            ],
        },
    ],
    customAttributes: [],
    connectorUuid: '5dcd1aa6-91b7-4d12-9495-c38d43993326',
    connectorName: 'MS-ADCS-Connector',
    kind: 'ADCS',
    status: 'ENABLED',
} as AuthorityInstanceDto;

export const connectorsSuccessObject = [
    {
        uuid: '4de45721-e88b-4bc8-b5b5-cedff5c72472',
        name: 'EJBCA-NG-Connector',
        functionGroups: [
            {
                functionGroupCode: 'authorityProvider',
                kinds: ['EJBCA'],
                endPoints: [
                    {
                        uuid: 'efdb9bcd-4f7c-473b-8704-77b12b3f6d33',
                        name: 'renewCertificate',
                        context: '/v2/authorityProvider/authorities/{uuid}/certificates/renew',
                        method: 'POST',
                        required: true,
                    },
                    {
                        uuid: '0288132c-5d9c-4db8-97a1-7ef977b45b17',
                        name: 'listIssueCertificateAttributes',
                        context: '/v2/authorityProvider/authorities/{uuid}/certificates/issue/attributes',
                        method: 'GET',
                        required: true,
                    },
                    {
                        uuid: 'f83d858a-d63b-48e7-b22c-fdb7f7e3d9b1',
                        name: 'removeAuthorityInstance',
                        context: '/v1/authorityProvider/authorities/{uuid}',
                        method: 'DELETE',
                        required: false,
                    },
                    {
                        uuid: 'e43155b6-51ad-46e0-a60c-176ee5e6dfea',
                        name: 'listRAProfileAttributes',
                        context: '/v1/authorityProvider/authorities/{uuid}/raProfile/attributes',
                        method: 'GET',
                        required: true,
                    },
                    {
                        uuid: '59070334-e550-466c-b538-bd8d2d9b06e5',
                        name: 'validateAttributes',
                        context: '/v1/authorityProvider/{kind}/attributes/validate',
                        method: 'POST',
                        required: true,
                    },
                    {
                        uuid: 'f28a2c14-1183-430d-a908-85bcfda56dab',
                        name: 'validateRevokeCertificateAttributes',
                        context: '/v2/authorityProvider/authorities/{uuid}/certificates/revoke/attributes/validate',
                        method: 'POST',
                        required: true,
                    },
                    {
                        uuid: '072349d4-d1a0-4398-b4e5-88fba454d815',
                        name: 'listAttributeDefinitions',
                        context: '/v1/authorityProvider/{kind}/attributes',
                        method: 'GET',
                        required: true,
                    },
                    {
                        uuid: '065dbfba-63f9-4011-abe4-f2ca6d224521',
                        name: 'issueCertificate',
                        context: '/v2/authorityProvider/authorities/{uuid}/certificates/issue',
                        method: 'POST',
                        required: true,
                    },
                    {
                        uuid: '51c5b673-0e6e-4b8d-a31b-1b35835b4025',
                        name: 'updateAuthorityInstance',
                        context: '/v1/authorityProvider/authorities/{uuid}',
                        method: 'POST',
                        required: true,
                    },
                    {
                        uuid: 'e3521dd0-e150-4676-a79c-30a33e62889c',
                        name: 'listAuthorityInstances',
                        context: '/v1/authorityProvider/authorities',
                        method: 'GET',
                        required: true,
                    },
                    {
                        uuid: 'ecdf6214-a491-4a0f-9084-7b502a16315e',
                        name: 'listSupportedFunctions',
                        context: '/v1',
                        method: 'GET',
                        required: false,
                    },
                    {
                        uuid: '7085fad6-df6e-4697-9c8e-7c80c2a12bd7',
                        name: 'revokeCertificate',
                        context: '/v2/authorityProvider/authorities/{uuid}/certificates/revoke',
                        method: 'POST',
                        required: true,
                    },
                    {
                        uuid: '9bf9cd3b-73de-4c1c-a712-7396e9dc78e5',
                        name: 'createAuthorityInstance',
                        context: '/v1/authorityProvider/authorities',
                        method: 'POST',
                        required: true,
                    },
                    {
                        uuid: 'd9e162ae-2d50-4e98-bc37-62d015c43199',
                        name: 'revokeCertificate',
                        context: '/v2/authorityProvider/authorities/{uuid}/certificates/revoke',
                        method: 'POST',
                        required: true,
                    },
                    {
                        uuid: '2dcc528b-9e16-46c6-877e-74eae258173f',
                        name: 'listRevokeCertificateAttributes',
                        context: '/v2/authorityProvider/authorities/{uuid}/certificates/revoke/attributes',
                        method: 'GET',
                        required: true,
                    },
                    {
                        uuid: '924ac89a-7376-4ac8-8c15-ecb7d9e8ca16',
                        name: 'getAuthorityInstance',
                        context: '/v1/authorityProvider/authorities/{uuid}',
                        method: 'GET',
                        required: true,
                    },
                    {
                        uuid: '355d306e-75f7-4b85-848b-58bddf95c582',
                        name: 'validateIssueCertificateAttributes',
                        context: '/v2/authorityProvider/authorities/{uuid}/certificates/issue/attributes/validate',
                        method: 'POST',
                        required: true,
                    },
                ],
                uuid: '736b0fd6-5ea0-4e10-abe7-cfed39cc2a1a',
                name: 'authorityProvider',
            },
        ],
        url: 'http://ejbca-ng-connector-service:8080',
        authType: 'none',
        authAttributes: [],
        status: 'connected',
    },
    {
        uuid: '5dcd1aa6-91b7-4d12-9495-c38d43993326',
        name: 'MS-ADCS-Connector',
        functionGroups: [
            {
                functionGroupCode: 'authorityProvider',
                kinds: ['ADCS'],
                endPoints: [
                    {
                        uuid: 'efdb9bcd-4f7c-473b-8704-77b12b3f6d33',
                        name: 'renewCertificate',
                        context: '/v2/authorityProvider/authorities/{uuid}/certificates/renew',
                        method: 'POST',
                        required: true,
                    },
                    {
                        uuid: '0288132c-5d9c-4db8-97a1-7ef977b45b17',
                        name: 'listIssueCertificateAttributes',
                        context: '/v2/authorityProvider/authorities/{uuid}/certificates/issue/attributes',
                        method: 'GET',
                        required: true,
                    },
                    {
                        uuid: 'f83d858a-d63b-48e7-b22c-fdb7f7e3d9b1',
                        name: 'removeAuthorityInstance',
                        context: '/v1/authorityProvider/authorities/{uuid}',
                        method: 'DELETE',
                        required: false,
                    },
                    {
                        uuid: 'e43155b6-51ad-46e0-a60c-176ee5e6dfea',
                        name: 'listRAProfileAttributes',
                        context: '/v1/authorityProvider/authorities/{uuid}/raProfile/attributes',
                        method: 'GET',
                        required: true,
                    },
                    {
                        uuid: '59070334-e550-466c-b538-bd8d2d9b06e5',
                        name: 'validateAttributes',
                        context: '/v1/authorityProvider/{kind}/attributes/validate',
                        method: 'POST',
                        required: true,
                    },
                    {
                        uuid: 'f28a2c14-1183-430d-a908-85bcfda56dab',
                        name: 'validateRevokeCertificateAttributes',
                        context: '/v2/authorityProvider/authorities/{uuid}/certificates/revoke/attributes/validate',
                        method: 'POST',
                        required: true,
                    },
                    {
                        uuid: '072349d4-d1a0-4398-b4e5-88fba454d815',
                        name: 'listAttributeDefinitions',
                        context: '/v1/authorityProvider/{kind}/attributes',
                        method: 'GET',
                        required: true,
                    },
                    {
                        uuid: '065dbfba-63f9-4011-abe4-f2ca6d224521',
                        name: 'issueCertificate',
                        context: '/v2/authorityProvider/authorities/{uuid}/certificates/issue',
                        method: 'POST',
                        required: true,
                    },
                    {
                        uuid: '51c5b673-0e6e-4b8d-a31b-1b35835b4025',
                        name: 'updateAuthorityInstance',
                        context: '/v1/authorityProvider/authorities/{uuid}',
                        method: 'POST',
                        required: true,
                    },
                    {
                        uuid: 'e3521dd0-e150-4676-a79c-30a33e62889c',
                        name: 'listAuthorityInstances',
                        context: '/v1/authorityProvider/authorities',
                        method: 'GET',
                        required: true,
                    },
                    {
                        uuid: 'ecdf6214-a491-4a0f-9084-7b502a16315e',
                        name: 'listSupportedFunctions',
                        context: '/v1',
                        method: 'GET',
                        required: false,
                    },
                    {
                        uuid: '7085fad6-df6e-4697-9c8e-7c80c2a12bd7',
                        name: 'revokeCertificate',
                        context: '/v2/authorityProvider/authorities/{uuid}/certificates/revoke',
                        method: 'POST',
                        required: true,
                    },
                    {
                        uuid: '9bf9cd3b-73de-4c1c-a712-7396e9dc78e5',
                        name: 'createAuthorityInstance',
                        context: '/v1/authorityProvider/authorities',
                        method: 'POST',
                        required: true,
                    },
                    {
                        uuid: 'd9e162ae-2d50-4e98-bc37-62d015c43199',
                        name: 'revokeCertificate',
                        context: '/v2/authorityProvider/authorities/{uuid}/certificates/revoke',
                        method: 'POST',
                        required: true,
                    },
                    {
                        uuid: '2dcc528b-9e16-46c6-877e-74eae258173f',
                        name: 'listRevokeCertificateAttributes',
                        context: '/v2/authorityProvider/authorities/{uuid}/certificates/revoke/attributes',
                        method: 'GET',
                        required: true,
                    },
                    {
                        uuid: '924ac89a-7376-4ac8-8c15-ecb7d9e8ca16',
                        name: 'getAuthorityInstance',
                        context: '/v1/authorityProvider/authorities/{uuid}',
                        method: 'GET',
                        required: true,
                    },
                    {
                        uuid: '355d306e-75f7-4b85-848b-58bddf95c582',
                        name: 'validateIssueCertificateAttributes',
                        context: '/v2/authorityProvider/authorities/{uuid}/certificates/issue/attributes/validate',
                        method: 'POST',
                        required: true,
                    },
                ],
                uuid: '736b0fd6-5ea0-4e10-abe7-cfed39cc2a1a',
                name: 'authorityProvider',
            },
        ],
        url: 'http://ms-adcs-connector-service:8080',
        authType: 'none',
        authAttributes: [],
        status: 'connected',
    },
    {
        uuid: 'a6f47841-08d7-4948-ad1d-802d34ec9d2c',
        name: 'Legacy-EJBCA-Connector',
        functionGroups: [
            {
                functionGroupCode: 'legacyAuthorityProvider',
                kinds: ['LegacyEjbca'],
                endPoints: [
                    {
                        uuid: 'e881624f-af84-41fd-aeb8-a90e342bb131',
                        name: 'removeEndEntity',
                        context:
                            '/v1/authorityProvider/authorities/{uuid}/endEntityProfiles/{endEntityProfileName}/endEntities/{endEntityName}',
                        method: 'DELETE',
                        required: false,
                    },
                    {
                        uuid: 'e13b274b-bdbd-4b4d-a5fa-875f0a6594e9',
                        name: 'listEntityProfiles',
                        context: '/v1/authorityProvider/authorities/{uuid}/endEntityProfiles',
                        method: 'GET',
                        required: false,
                    },
                    {
                        uuid: '656e4414-d735-457f-ad43-f921c5af4507',
                        name: 'revokeCertificate',
                        context: '/v1/authorityProvider/authorities/{uuid}/endEntityProfiles/{endEntityProfileName}/certificates/revoke',
                        method: 'POST',
                        required: false,
                    },
                    {
                        uuid: '5a78b374-3113-4310-a35d-45a8a2a04eca',
                        name: 'listEndEntities',
                        context: '/v1/authorityProvider/authorities/{uuid}/endEntityProfiles/{endEntityProfileName}/endEntities',
                        method: 'GET',
                        required: false,
                    },
                    {
                        uuid: 'ca07a81d-724f-4304-8ffa-3cb405766301',
                        name: 'validateAttributes',
                        context: '/v1/authorityProvider/{kind}/attributes/validate',
                        method: 'POST',
                        required: false,
                    },
                    {
                        uuid: '6350c3bb-57ef-4416-964b-0254df28131e',
                        name: 'createAuthorityInstance',
                        context: '/v1/authorityProvider/authorities',
                        method: 'POST',
                        required: true,
                    },
                    {
                        uuid: 'b3592167-af2a-44b3-89d2-e4bfd000caa4',
                        name: 'removeAuthorityInstance',
                        context: '/v1/authorityProvider/authorities/{uuid}',
                        method: 'DELETE',
                        required: false,
                    },
                    {
                        uuid: '57320a6d-3763-4a25-bdae-4a2a92a67487',
                        name: 'updateEndEntity',
                        context: '/v1/authorities/{uuid}/endEntityProfiles/{endEntityProfileName}/endEntities/{endEntityName}',
                        method: 'POST',
                        required: false,
                    },
                    {
                        uuid: 'cf4af237-164e-4326-8a34-80c90d53b2d7',
                        name: 'listSupportedFunctions',
                        context: '/v1',
                        method: 'GET',
                        required: false,
                    },
                    {
                        uuid: 'cb1ae7eb-a97b-44bd-bf76-46ae96e32985',
                        name: 'listAuthorityInstances',
                        context: '/v1/authorityProvider/authorities',
                        method: 'GET',
                        required: true,
                    },
                    {
                        uuid: 'a8b1d647-6a8e-46fd-b4e1-844b30df4dcc',
                        name: 'getEndEntity',
                        context: '/v1/authorities/{uuid}/endEntityProfiles/{endEntityProfileName}/endEntities/{endEntityName}',
                        method: 'GET',
                        required: false,
                    },
                    {
                        uuid: 'f2a6f043-3fb2-4f9d-9996-ce8cf68d2ad9',
                        name: 'resetPassword',
                        context:
                            '/v1/authorityProvider/authorities/{uuid}/endEntityProfiles/{endEntityProfileName}/endEntities/{endEntityName}/resetPassword',
                        method: 'PUT',
                        required: false,
                    },
                    {
                        uuid: '4bef1a55-4725-48af-911e-9a051784c4c4',
                        name: 'listCAsInProfile',
                        context: '/v1/authorityProvider/authorities/{uuid}/endEntityProfiles/{endEntityProfileId}/cas',
                        method: 'GET',
                        required: false,
                    },
                    {
                        uuid: '06f1f14f-328b-40f7-8f34-f168619e3a3a',
                        name: 'updateAuthorityInstance',
                        context: '/v1/authorityProvider/authorities/{uuid}',
                        method: 'POST',
                        required: true,
                    },
                    {
                        uuid: 'ca0595ad-36e5-4060-a19d-e80b8f7461fd',
                        name: 'listAttributeDefinitions',
                        context: '/v1/authorityProvider/{kind}/attributes',
                        method: 'GET',
                        required: false,
                    },
                    {
                        uuid: 'a91dd6df-cd2c-46f4-af09-3693a167118d',
                        name: 'issueCertificate',
                        context: '/v1/authorityProvider/authorities/{uuid}/endEntityProfiles/{endEntityProfileName}/certificates/issue',
                        method: 'POST',
                        required: false,
                    },
                    {
                        uuid: 'b2a2a828-598b-47dd-a1c5-ce877989153f',
                        name: 'listCertificateProfiles',
                        context: '/v1/authorityProvider/authorities/{uuid}/endEntityProfiles/{endEntityProfileId}/certificateprofiles',
                        method: 'GET',
                        required: false,
                    },
                    {
                        uuid: '5f61c054-0d68-44b1-b326-2ed28a2a55fa',
                        name: 'createEndEntity',
                        context: '/v1/authorities/{uuid}/endEntityProfiles/{endEntityProfileName}/endEntities',
                        method: 'POST',
                        required: false,
                    },
                    {
                        uuid: '1692cec0-50aa-46a3-be7f-b32e6a752d2a',
                        name: 'getAuthorityInstance',
                        context: '/v1/authorityProvider/authorities/{uuid}',
                        method: 'GET',
                        required: true,
                    },
                ],
                uuid: '435ee47f-fd03-4c50-ae6f-ca60f4829023',
                name: 'legacyAuthorityProvider',
            },
        ],
        url: 'http://ejbca-legacy-connector-service:8080',
        authType: 'none',
        authAttributes: [],
        status: 'connected',
    },
    {
        uuid: '0647b608-00b3-4d3b-a83b-24e3b6718c42',
        name: 'PyADCS-Connector',
        functionGroups: [
            {
                functionGroupCode: 'authorityProvider',
                kinds: ['PyADCS-WinRM'],
                endPoints: [
                    {
                        uuid: 'efdb9bcd-4f7c-473b-8704-77b12b3f6d33',
                        name: 'renewCertificate',
                        context: '/v2/authorityProvider/authorities/{uuid}/certificates/renew',
                        method: 'POST',
                        required: true,
                    },
                    {
                        uuid: '0288132c-5d9c-4db8-97a1-7ef977b45b17',
                        name: 'listIssueCertificateAttributes',
                        context: '/v2/authorityProvider/authorities/{uuid}/certificates/issue/attributes',
                        method: 'GET',
                        required: true,
                    },
                    {
                        uuid: 'f83d858a-d63b-48e7-b22c-fdb7f7e3d9b1',
                        name: 'removeAuthorityInstance',
                        context: '/v1/authorityProvider/authorities/{uuid}',
                        method: 'DELETE',
                        required: false,
                    },
                    {
                        uuid: 'e43155b6-51ad-46e0-a60c-176ee5e6dfea',
                        name: 'listRAProfileAttributes',
                        context: '/v1/authorityProvider/authorities/{uuid}/raProfile/attributes',
                        method: 'GET',
                        required: true,
                    },
                    {
                        uuid: '59070334-e550-466c-b538-bd8d2d9b06e5',
                        name: 'validateAttributes',
                        context: '/v1/authorityProvider/{kind}/attributes/validate',
                        method: 'POST',
                        required: true,
                    },
                    {
                        uuid: 'f28a2c14-1183-430d-a908-85bcfda56dab',
                        name: 'validateRevokeCertificateAttributes',
                        context: '/v2/authorityProvider/authorities/{uuid}/certificates/revoke/attributes/validate',
                        method: 'POST',
                        required: true,
                    },
                    {
                        uuid: '072349d4-d1a0-4398-b4e5-88fba454d815',
                        name: 'listAttributeDefinitions',
                        context: '/v1/authorityProvider/{kind}/attributes',
                        method: 'GET',
                        required: true,
                    },
                    {
                        uuid: '065dbfba-63f9-4011-abe4-f2ca6d224521',
                        name: 'issueCertificate',
                        context: '/v2/authorityProvider/authorities/{uuid}/certificates/issue',
                        method: 'POST',
                        required: true,
                    },
                    {
                        uuid: '51c5b673-0e6e-4b8d-a31b-1b35835b4025',
                        name: 'updateAuthorityInstance',
                        context: '/v1/authorityProvider/authorities/{uuid}',
                        method: 'POST',
                        required: true,
                    },
                    {
                        uuid: 'e3521dd0-e150-4676-a79c-30a33e62889c',
                        name: 'listAuthorityInstances',
                        context: '/v1/authorityProvider/authorities',
                        method: 'GET',
                        required: true,
                    },
                    {
                        uuid: 'ecdf6214-a491-4a0f-9084-7b502a16315e',
                        name: 'listSupportedFunctions',
                        context: '/v1',
                        method: 'GET',
                        required: false,
                    },
                    {
                        uuid: '7085fad6-df6e-4697-9c8e-7c80c2a12bd7',
                        name: 'revokeCertificate',
                        context: '/v2/authorityProvider/authorities/{uuid}/certificates/revoke',
                        method: 'POST',
                        required: true,
                    },
                    {
                        uuid: '9bf9cd3b-73de-4c1c-a712-7396e9dc78e5',
                        name: 'createAuthorityInstance',
                        context: '/v1/authorityProvider/authorities',
                        method: 'POST',
                        required: true,
                    },
                    {
                        uuid: 'd9e162ae-2d50-4e98-bc37-62d015c43199',
                        name: 'revokeCertificate',
                        context: '/v2/authorityProvider/authorities/{uuid}/certificates/revoke',
                        method: 'POST',
                        required: true,
                    },
                    {
                        uuid: '2dcc528b-9e16-46c6-877e-74eae258173f',
                        name: 'listRevokeCertificateAttributes',
                        context: '/v2/authorityProvider/authorities/{uuid}/certificates/revoke/attributes',
                        method: 'GET',
                        required: true,
                    },
                    {
                        uuid: '924ac89a-7376-4ac8-8c15-ecb7d9e8ca16',
                        name: 'getAuthorityInstance',
                        context: '/v1/authorityProvider/authorities/{uuid}',
                        method: 'GET',
                        required: true,
                    },
                    {
                        uuid: '355d306e-75f7-4b85-848b-58bddf95c582',
                        name: 'validateIssueCertificateAttributes',
                        context: '/v2/authorityProvider/authorities/{uuid}/certificates/issue/attributes/validate',
                        method: 'POST',
                        required: true,
                    },
                ],
                uuid: '736b0fd6-5ea0-4e10-abe7-cfed39cc2a1a',
                name: 'authorityProvider',
            },
        ],
        url: 'http://pyadcs-connector-service:8080',
        authType: 'none',
        authAttributes: [],
        status: 'connected',
    },
    {
        uuid: '6eda227a-c175-4c6f-9ce9-e5cac1c4d9e4',
        name: 'ADCS-NET-Connector',
        functionGroups: [
            {
                functionGroupCode: 'authorityProvider',
                kinds: ['ADCS.NET'],
                endPoints: [
                    {
                        uuid: 'efdb9bcd-4f7c-473b-8704-77b12b3f6d33',
                        name: 'renewCertificate',
                        context: '/v2/authorityProvider/authorities/{uuid}/certificates/renew',
                        method: 'POST',
                        required: true,
                    },
                    {
                        uuid: '0288132c-5d9c-4db8-97a1-7ef977b45b17',
                        name: 'listIssueCertificateAttributes',
                        context: '/v2/authorityProvider/authorities/{uuid}/certificates/issue/attributes',
                        method: 'GET',
                        required: true,
                    },
                    {
                        uuid: 'f83d858a-d63b-48e7-b22c-fdb7f7e3d9b1',
                        name: 'removeAuthorityInstance',
                        context: '/v1/authorityProvider/authorities/{uuid}',
                        method: 'DELETE',
                        required: false,
                    },
                    {
                        uuid: 'e43155b6-51ad-46e0-a60c-176ee5e6dfea',
                        name: 'listRAProfileAttributes',
                        context: '/v1/authorityProvider/authorities/{uuid}/raProfile/attributes',
                        method: 'GET',
                        required: true,
                    },
                    {
                        uuid: '59070334-e550-466c-b538-bd8d2d9b06e5',
                        name: 'validateAttributes',
                        context: '/v1/authorityProvider/{kind}/attributes/validate',
                        method: 'POST',
                        required: true,
                    },
                    {
                        uuid: 'f28a2c14-1183-430d-a908-85bcfda56dab',
                        name: 'validateRevokeCertificateAttributes',
                        context: '/v2/authorityProvider/authorities/{uuid}/certificates/revoke/attributes/validate',
                        method: 'POST',
                        required: true,
                    },
                    {
                        uuid: '072349d4-d1a0-4398-b4e5-88fba454d815',
                        name: 'listAttributeDefinitions',
                        context: '/v1/authorityProvider/{kind}/attributes',
                        method: 'GET',
                        required: true,
                    },
                    {
                        uuid: '065dbfba-63f9-4011-abe4-f2ca6d224521',
                        name: 'issueCertificate',
                        context: '/v2/authorityProvider/authorities/{uuid}/certificates/issue',
                        method: 'POST',
                        required: true,
                    },
                    {
                        uuid: '51c5b673-0e6e-4b8d-a31b-1b35835b4025',
                        name: 'updateAuthorityInstance',
                        context: '/v1/authorityProvider/authorities/{uuid}',
                        method: 'POST',
                        required: true,
                    },
                    {
                        uuid: 'e3521dd0-e150-4676-a79c-30a33e62889c',
                        name: 'listAuthorityInstances',
                        context: '/v1/authorityProvider/authorities',
                        method: 'GET',
                        required: true,
                    },
                    {
                        uuid: 'ecdf6214-a491-4a0f-9084-7b502a16315e',
                        name: 'listSupportedFunctions',
                        context: '/v1',
                        method: 'GET',
                        required: false,
                    },
                    {
                        uuid: '7085fad6-df6e-4697-9c8e-7c80c2a12bd7',
                        name: 'revokeCertificate',
                        context: '/v2/authorityProvider/authorities/{uuid}/certificates/revoke',
                        method: 'POST',
                        required: true,
                    },
                    {
                        uuid: '9bf9cd3b-73de-4c1c-a712-7396e9dc78e5',
                        name: 'createAuthorityInstance',
                        context: '/v1/authorityProvider/authorities',
                        method: 'POST',
                        required: true,
                    },
                    {
                        uuid: 'd9e162ae-2d50-4e98-bc37-62d015c43199',
                        name: 'revokeCertificate',
                        context: '/v2/authorityProvider/authorities/{uuid}/certificates/revoke',
                        method: 'POST',
                        required: true,
                    },
                    {
                        uuid: '2dcc528b-9e16-46c6-877e-74eae258173f',
                        name: 'listRevokeCertificateAttributes',
                        context: '/v2/authorityProvider/authorities/{uuid}/certificates/revoke/attributes',
                        method: 'GET',
                        required: true,
                    },
                    {
                        uuid: '924ac89a-7376-4ac8-8c15-ecb7d9e8ca16',
                        name: 'getAuthorityInstance',
                        context: '/v1/authorityProvider/authorities/{uuid}',
                        method: 'GET',
                        required: true,
                    },
                    {
                        uuid: '355d306e-75f7-4b85-848b-58bddf95c582',
                        name: 'validateIssueCertificateAttributes',
                        context: '/v2/authorityProvider/authorities/{uuid}/certificates/issue/attributes/validate',
                        method: 'POST',
                        required: true,
                    },
                ],
                uuid: '736b0fd6-5ea0-4e10-abe7-cfed39cc2a1a',
                name: 'authorityProvider',
            },
        ],
        url: 'http://adcs-net-connector-service:8080',
        authType: 'none',
        authAttributes: [],
        status: 'offline',
    },
] as ConnectorDto[];

export const raProfileDetailSuccessObject = {
    uuid: '9cb76b6a-c291-4e23-b11a-bb3da76adbc6',
    name: 'ADCS-py-webserver',
    description: '',
    authorityInstanceUuid: '4a87e1a2-c9bf-4f32-a4a9-2f0612f15be7',
    authorityInstanceName: 'pyADCS-lab02-Authority',
    legacyAuthority: false,
    enabled: true,
    attributes: [
        {
            uuid: '8c4c213a-9bd4-4d49-9812-a539a2deac16',
            name: 'raprofile_authority_uuid',
            label: 'Authority UUID',
            type: AttributeType.Data,
            contentType: AttributeContentType.String,
            content: [
                {
                    data: 'b0d18653-14b1-41de-a1b3-8286f07f1c7d',
                },
            ],
        },
        {
            uuid: '9b5b38a2-9bcc-4178-8d02-7817cc3f3ada',
            name: 'raprofile_select_ca_method',
            label: 'Select CA Method',
            type: AttributeType.Data,
            contentType: AttributeContentType.String,
            content: [
                {
                    reference: 'Search for all available CAs',
                    data: 'search',
                },
            ],
        },
        {
            uuid: 'da285a61-822a-4508-a565-ce366de66980',
            name: 'raprofile_template_name',
            label: 'Certificate Template Name',
            type: AttributeType.Data,
            contentType: AttributeContentType.Object,
            content: [
                {
                    reference: 'Web Server',
                    data: {
                        name: 'WebServer',
                        display_name: 'Web Server',
                        schema_version: '1',
                        version: '4.1',
                        oid: '1.3.6.1.4.1.311.21.8.16335329.656368.4341948.8708353.10624234.204.1.16',
                    },
                },
            ],
        },
        {
            uuid: '86a3fcb9-d74e-4b2c-b78d-3f71b1181472',
            name: 'raprofile_ca_name',
            label: 'CA Name',
            type: AttributeType.Data,
            contentType: AttributeContentType.Object,
            content: [
                {
                    reference: 'Demo MS Sub CA',
                    data: {
                        name: 'Demo MS Sub CA',
                        display_name: 'Demo MS Sub CA',
                        computer_name: 'vmi307469.3key.local',
                        config_string: 'vmi307469.3key.local\\Demo MS Sub CA',
                        ca_type: 'Enterprise Subordinate CA',
                        is_enterprise: true,
                        is_root: false,
                        is_accessible: true,
                        service_status: 'Running',
                    },
                },
            ],
        },
    ],
    customAttributes: [
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
    ],
} as RaProfileResponseModel;

export const groupAttributeDescriptors = [
    {
        uuid: '9b5b38a2-9bcc-4178-8d02-7817cc3f3ada',
        name: 'raprofile_select_ca_method',
        description: 'Select how the CA will be chosen, either by ComputerName or search',
        content: [
            {
                reference: 'Search for all available CAs',
                data: 'search',
            },
            {
                reference: 'Use the ConfigString to select existing CA',
                data: 'configstring',
            },
        ],
        type: AttributeType.Data,
        contentType: AttributeContentType.String,
        properties: {
            label: 'Select CA Method',
            visible: true,
            required: true,
            readOnly: false,
            list: true,
            multiSelect: false,
        },
    },
    {
        uuid: '8c4c213a-9bd4-4d49-9812-a539a2deac16',
        name: 'raprofile_authority_uuid',
        description: 'UUID of selected authority',
        content: [
            {
                reference: 'b0d18653-14b1-41de-a1b3-8286f07f1c7d',
                data: 'b0d18653-14b1-41de-a1b3-8286f07f1c7d',
            },
        ],
        type: AttributeType.Data,
        contentType: AttributeContentType.String,
        properties: {
            label: 'Authority UUID',
            visible: false,
            required: true,
            readOnly: false,
            list: false,
            multiSelect: false,
        },
    },
    {
        uuid: '0f26f6a0-94ca-420b-bbd8-4324218d7692',
        name: 'raprofile_ca_select_group',
        description: 'For identification of select CA method',
        type: AttributeType.Group,
        attributeCallback: {
            callbackContext: '/v1/callbacks/raProfile/caSelect/{ca_select_method}/{authority_instance_uuid}',
            callbackMethod: 'GET',
            mappings: [
                {
                    from: 'raprofile_authority_uuid.data',
                    to: 'authority_instance_uuid',
                    targets: ['pathVariable'],
                },
                {
                    from: 'raprofile_select_ca_method.data',
                    to: 'ca_select_method',
                    targets: ['pathVariable'],
                },
            ],
        },
    },
    {
        uuid: 'da285a61-822a-4508-a565-ce366de66980',
        name: 'raprofile_template_name',
        description: 'Select certificate templates to use',
        content: [
            {
                reference: 'Administrator',
                data: {
                    name: 'Administrator',
                    display_name: 'Administrator',
                    schema_version: '1',
                    version: '4.1',
                    oid: '1.3.6.1.4.1.311.21.8.16335329.656368.4341948.8708353.10624234.204.1.7',
                },
            },
            {
                reference: 'Autorizace Pracovní Stanice - Čočka',
                data: {
                    name: 'AutorizacePracovníStanice-Čočka',
                    display_name: 'Autorizace Pracovní Stanice - Čočka',
                    schema_version: '2',
                    version: '100.2',
                    oid: '1.3.6.1.4.1.311.21.8.16335329.656368.4341948.8708353.10624234.204.4239016.5997329',
                },
            },
            {
                reference: 'Root Certification Authority',
                data: {
                    name: 'CA',
                    display_name: 'Root Certification Authority',
                    schema_version: '1',
                    version: '5.1',
                    oid: '1.3.6.1.4.1.311.21.8.16335329.656368.4341948.8708353.10624234.204.1.17',
                },
            },
            {
                reference: 'CA Exchange',
                data: {
                    name: 'CAExchange',
                    display_name: 'CA Exchange',
                    schema_version: '2',
                    version: '106.0',
                    oid: '1.3.6.1.4.1.311.21.8.16335329.656368.4341948.8708353.10624234.204.1.26',
                },
            },
            {
                reference: 'CEP Encryption',
                data: {
                    name: 'CEPEncryption',
                    display_name: 'CEP Encryption',
                    schema_version: '1',
                    version: '4.1',
                    oid: '1.3.6.1.4.1.311.21.8.16335329.656368.4341948.8708353.10624234.204.1.22',
                },
            },
            {
                reference: 'Certificate authentication external client',
                data: {
                    name: 'Certificateauthenticationexternalclient',
                    display_name: 'Certificate authentication external client',
                    schema_version: '2',
                    version: '100.4',
                    oid: '1.3.6.1.4.1.311.21.8.16335329.656368.4341948.8708353.10624234.204.2517003.8444064',
                },
            },
            {
                reference: 'Authenticated Session',
                data: {
                    name: 'ClientAuth',
                    display_name: 'Authenticated Session',
                    schema_version: '1',
                    version: '3.1',
                    oid: '1.3.6.1.4.1.311.21.8.16335329.656368.4341948.8708353.10624234.204.1.4',
                },
            },
            {
                reference: 'Code Signing',
                data: {
                    name: 'CodeSigning',
                    display_name: 'Code Signing',
                    schema_version: '1',
                    version: '3.1',
                    oid: '1.3.6.1.4.1.311.21.8.16335329.656368.4341948.8708353.10624234.204.1.9',
                },
            },
            {
                reference: 'Copy of Web Server',
                data: {
                    name: 'Copy of Web Server',
                    display_name: 'Copy of Web Server',
                    schema_version: '2',
                    version: '100.4',
                    oid: '1.3.6.1.4.1.311.21.8.16335329.656368.4341948.8708353.10624234.204.4484942.314197',
                },
            },
            {
                reference: 'Cross Certification Authority',
                data: {
                    name: 'CrossCA',
                    display_name: 'Cross Certification Authority',
                    schema_version: '2',
                    version: '105.0',
                    oid: '1.3.6.1.4.1.311.21.8.16335329.656368.4341948.8708353.10624234.204.1.25',
                },
            },
            {
                reference: 'Trust List Signing',
                data: {
                    name: 'CTLSigning',
                    display_name: 'Trust List Signing',
                    schema_version: '1',
                    version: '3.1',
                    oid: '1.3.6.1.4.1.311.21.8.16335329.656368.4341948.8708353.10624234.204.1.10',
                },
            },
            {
                reference: 'Directory Email Replication',
                data: {
                    name: 'DirectoryEmailReplication',
                    display_name: 'Directory Email Replication',
                    schema_version: '2',
                    version: '115.0',
                    oid: '1.3.6.1.4.1.311.21.8.16335329.656368.4341948.8708353.10624234.204.1.29',
                },
            },
            {
                reference: 'Domain Controller',
                data: {
                    name: 'DomainController',
                    display_name: 'Domain Controller',
                    schema_version: '1',
                    version: '4.1',
                    oid: '1.3.6.1.4.1.311.21.8.16335329.656368.4341948.8708353.10624234.204.1.15',
                },
            },
            {
                reference: 'Domain Controller Authentication',
                data: {
                    name: 'DomainControllerAuthentication',
                    display_name: 'Domain Controller Authentication',
                    schema_version: '2',
                    version: '110.0',
                    oid: '1.3.6.1.4.1.311.21.8.16335329.656368.4341948.8708353.10624234.204.1.28',
                },
            },
            {
                reference: 'Basic EFS',
                data: {
                    name: 'EFS',
                    display_name: 'Basic EFS',
                    schema_version: '1',
                    version: '3.1',
                    oid: '1.3.6.1.4.1.311.21.8.16335329.656368.4341948.8708353.10624234.204.1.6',
                },
            },
            {
                reference: 'EFS Recovery Agent',
                data: {
                    name: 'EFSRecovery',
                    display_name: 'EFS Recovery Agent',
                    schema_version: '1',
                    version: '6.1',
                    oid: '1.3.6.1.4.1.311.21.8.16335329.656368.4341948.8708353.10624234.204.1.8',
                },
            },
            {
                reference: 'Enrollment Agent',
                data: {
                    name: 'EnrollmentAgent',
                    display_name: 'Enrollment Agent',
                    schema_version: '1',
                    version: '4.1',
                    oid: '1.3.6.1.4.1.311.21.8.16335329.656368.4341948.8708353.10624234.204.1.11',
                },
            },
            {
                reference: 'Exchange Enrollment Agent (Offline request)',
                data: {
                    name: 'EnrollmentAgentOffline',
                    display_name: 'Exchange Enrollment Agent (Offline request)',
                    schema_version: '1',
                    version: '4.1',
                    oid: '1.3.6.1.4.1.311.21.8.16335329.656368.4341948.8708353.10624234.204.1.12',
                },
            },
            {
                reference: 'Exchange User',
                data: {
                    name: 'ExchangeUser',
                    display_name: 'Exchange User',
                    schema_version: '1',
                    version: '7.1',
                    oid: '1.3.6.1.4.1.311.21.8.16335329.656368.4341948.8708353.10624234.204.1.23',
                },
            },
            {
                reference: 'Exchange Signature Only',
                data: {
                    name: 'ExchangeUserSignature',
                    display_name: 'Exchange Signature Only',
                    schema_version: '1',
                    version: '6.1',
                    oid: '1.3.6.1.4.1.311.21.8.16335329.656368.4341948.8708353.10624234.204.1.24',
                },
            },
            {
                reference: 'IPSec (Offline request)',
                data: {
                    name: 'IPSECIntermediateOffline',
                    display_name: 'IPSec (Offline request)',
                    schema_version: '1',
                    version: '7.1',
                    oid: '1.3.6.1.4.1.311.21.8.16335329.656368.4341948.8708353.10624234.204.1.20',
                },
            },
            {
                reference: 'IPSec',
                data: {
                    name: 'IPSECIntermediateOnline',
                    display_name: 'IPSec',
                    schema_version: '1',
                    version: '8.1',
                    oid: '1.3.6.1.4.1.311.21.8.16335329.656368.4341948.8708353.10624234.204.1.19',
                },
            },
            {
                reference: 'Kerberos Authentication',
                data: {
                    name: 'KerberosAuthentication',
                    display_name: 'Kerberos Authentication',
                    schema_version: '2',
                    version: '110.0',
                    oid: '1.3.6.1.4.1.311.21.8.16335329.656368.4341948.8708353.10624234.204.1.33',
                },
            },
            {
                reference: 'Key Recovery Agent',
                data: {
                    name: 'KeyRecoveryAgent',
                    display_name: 'Key Recovery Agent',
                    schema_version: '2',
                    version: '105.0',
                    oid: '1.3.6.1.4.1.311.21.8.16335329.656368.4341948.8708353.10624234.204.1.27',
                },
            },
            {
                reference: 'Computer',
                data: {
                    name: 'Machine',
                    display_name: 'Computer',
                    schema_version: '1',
                    version: '5.1',
                    oid: '1.3.6.1.4.1.311.21.8.16335329.656368.4341948.8708353.10624234.204.1.14',
                },
            },
            {
                reference: 'Enrollment Agent (Computer)',
                data: {
                    name: 'MachineEnrollmentAgent',
                    display_name: 'Enrollment Agent (Computer)',
                    schema_version: '1',
                    version: '5.1',
                    oid: '1.3.6.1.4.1.311.21.8.16335329.656368.4341948.8708353.10624234.204.1.13',
                },
            },
            {
                reference: 'OCSP Response Signing',
                data: {
                    name: 'OCSPResponseSigning',
                    display_name: 'OCSP Response Signing',
                    schema_version: '3',
                    version: '101.3',
                    oid: '1.3.6.1.4.1.311.21.8.16335329.656368.4341948.8708353.10624234.204.1.32',
                },
            },
            {
                reference: 'Router (Offline request)',
                data: {
                    name: 'OfflineRouter',
                    display_name: 'Router (Offline request)',
                    schema_version: '1',
                    version: '4.1',
                    oid: '1.3.6.1.4.1.311.21.8.16335329.656368.4341948.8708353.10624234.204.1.21',
                },
            },
            {
                reference: 'RAS and IAS Server',
                data: {
                    name: 'RASAndIASServer',
                    display_name: 'RAS and IAS Server',
                    schema_version: '2',
                    version: '101.0',
                    oid: '1.3.6.1.4.1.311.21.8.16335329.656368.4341948.8708353.10624234.204.1.31',
                },
            },
            {
                reference: 'Smartcard Logon',
                data: {
                    name: 'SmartcardLogon',
                    display_name: 'Smartcard Logon',
                    schema_version: '1',
                    version: '6.1',
                    oid: '1.3.6.1.4.1.311.21.8.16335329.656368.4341948.8708353.10624234.204.1.5',
                },
            },
            {
                reference: 'Smartcard User',
                data: {
                    name: 'SmartcardUser',
                    display_name: 'Smartcard User',
                    schema_version: '1',
                    version: '11.1',
                    oid: '1.3.6.1.4.1.311.21.8.16335329.656368.4341948.8708353.10624234.204.1.3',
                },
            },
            {
                reference: 'Subordinate Certification Authority',
                data: {
                    name: 'SubCA',
                    display_name: 'Subordinate Certification Authority',
                    schema_version: '1',
                    version: '5.1',
                    oid: '1.3.6.1.4.1.311.21.8.16335329.656368.4341948.8708353.10624234.204.1.18',
                },
            },
            {
                reference: 'Test of Enrollment Agent',
                data: {
                    name: 'TestofEnrollmentAgent',
                    display_name: 'Test of Enrollment Agent',
                    schema_version: '4',
                    version: '100.3',
                    oid: '1.3.6.1.4.1.311.21.8.16335329.656368.4341948.8708353.10624234.204.8007785.10868302',
                },
            },
            {
                reference: 'User',
                data: {
                    name: 'User',
                    display_name: 'User',
                    schema_version: '1',
                    version: '3.1',
                    oid: '1.3.6.1.4.1.311.21.8.16335329.656368.4341948.8708353.10624234.204.1.1',
                },
            },
            {
                reference: 'User Signature Only',
                data: {
                    name: 'UserSignature',
                    display_name: 'User Signature Only',
                    schema_version: '1',
                    version: '4.1',
                    oid: '1.3.6.1.4.1.311.21.8.16335329.656368.4341948.8708353.10624234.204.1.2',
                },
            },
            {
                reference: 'Web Server',
                data: {
                    name: 'WebServer',
                    display_name: 'Web Server',
                    schema_version: '1',
                    version: '4.1',
                    oid: '1.3.6.1.4.1.311.21.8.16335329.656368.4341948.8708353.10624234.204.1.16',
                },
            },
            {
                reference: 'Workstation Authentication',
                data: {
                    name: 'Workstation',
                    display_name: 'Workstation Authentication',
                    schema_version: '2',
                    version: '101.0',
                    oid: '1.3.6.1.4.1.311.21.8.16335329.656368.4341948.8708353.10624234.204.1.30',
                },
            },
        ],
        type: AttributeType.Data,
        contentType: AttributeContentType.Object,
        properties: {
            label: 'Certificate Template Name',
            visible: true,
            required: true,
            readOnly: false,
            list: true,
            multiSelect: false,
        },
    },
] as GroupAttribute[];

export const groupCallbackData = [
    {
        name: 'raprofile_ca_name',
        uuid: '86a3fcb9-d74e-4b2c-b78d-3f71b1181472',
        type: 'data',
        contentType: 'object',
        description: 'Identification of the certification authority',
        properties: {
            label: 'CA Name',
            readOnly: false,
            required: false,
            list: true,
            visible: true,
            multiSelect: false,
        },
        content: [
            {
                reference: 'Demo MS Sub CA',
                data: {
                    name: 'Demo MS Sub CA',
                    display_name: 'Demo MS Sub CA',
                    computer_name: 'vmi307469.3key.local',
                    config_string: 'vmi307469.3key.local\\Demo MS Sub CA',
                    ca_type: 'Enterprise Subordinate CA',
                    is_enterprise: true,
                    is_root: false,
                    is_accessible: true,
                    service_status: 'Running',
                },
            },
            {
                reference: '3KEY-LAB-CA1',
                data: {
                    name: '3KEY-LAB-CA1',
                    display_name: '3KEY-LAB-CA1',
                    computer_name: 'labca1.3key.local',
                    config_string: 'labca1.3key.local\\3KEY-LAB-CA1',
                    ca_type: '',
                    is_enterprise: false,
                    is_root: false,
                    is_accessible: false,
                    service_status: '',
                },
            },
        ],
    },
];
