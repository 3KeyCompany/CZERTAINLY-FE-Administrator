import { configureStore, type Middleware, type UnknownAction } from '@reduxjs/toolkit';
import { useMemo } from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router';
import CryptographicKeyForm from 'components/_pages/cryptographic-keys/form';
import { actions as keyActions, slice as keySlice, type State as KeyState } from 'ducks/cryptographic-keys';
import { testInitialState, testReducers } from 'ducks/test-reducers';
import type { KeyRequestType } from 'types/openapi';
import type { TokenProfileResponseModel } from 'types/token-profiles';
import { createMockStore } from 'utils/test-helpers';

type State = Omit<ReturnType<typeof testReducers>, 'cryptographicKeys'> & { cryptographicKeys: KeyState };

function reducer(state: State | undefined, action: UnknownAction): State {
    return {
        ...testReducers(state, action),
        cryptographicKeys: keySlice.reducer(state?.cryptographicKeys, action),
    };
}

export type CryptographicKeyFormWithStoreProps = Readonly<{
    /** Route the form is rendered under — the source of the `:id` param the form used to trust. */
    initialRoute?: string;
    routePath?: string;
    usesGlobalModal?: boolean;
    tokenProfiles?: TokenProfileResponseModel[];
    supportedKeyRequestTypesByProfile?: Record<string, KeyRequestType[]>;
}>;

/** See TokenProfileFormWithStore — same harness for the sibling form behind the Key dropdown's "+". */
export function CryptographicKeyFormWithStore({
    initialRoute = '/certificates/detail/certificate-uuid',
    routePath = '/certificates/detail/:id',
    usesGlobalModal = false,
    tokenProfiles,
    supportedKeyRequestTypesByProfile,
}: CryptographicKeyFormWithStoreProps) {
    const store = useMemo(() => {
        if (!tokenProfiles) return createMockStore();

        const apiResponses: Middleware = (api) => (next) => (action) => {
            const result = next(action);
            if (keyActions.listSupportedKeyRequestTypes.match(action)) {
                api.dispatch(
                    keyActions.listSupportedKeyRequestTypesSuccess(
                        supportedKeyRequestTypesByProfile?.[action.payload.tokenProfileUuid] ?? [],
                    ),
                );
            } else if (keyActions.listAttributeDescriptors.match(action)) {
                api.dispatch(
                    keyActions.listAttributeDescriptorsSuccess({ uuid: action.payload.tokenProfileUuid, attributeDescriptors: [] }),
                );
            }
            return result;
        };

        return configureStore({
            reducer,
            middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }).concat(apiResponses),
            preloadedState: {
                ...testInitialState,
                tokenprofiles: { tokenProfiles },
                cryptographicKeys: keySlice.getInitialState(),
            },
        });
    }, [tokenProfiles, supportedKeyRequestTypesByProfile]);

    return (
        <Provider store={store}>
            <MemoryRouter initialEntries={[initialRoute]}>
                <Routes>
                    <Route path={routePath} element={<CryptographicKeyForm usesGlobalModal={usesGlobalModal} />} />
                </Routes>
            </MemoryRouter>
        </Provider>
    );
}

export default CryptographicKeyFormWithStore;
