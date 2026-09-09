import { test, expect, type Page } from 'playwright/ct-test';
import CryptographicKeyFormWithStore from 'components/_pages/cryptographic-keys/form/CryptographicKeyFormWithStore';
import { KeyRequestType, TokenInstanceStatus } from 'types/openapi';
import type { TokenProfileResponseModel } from 'types/token-profiles';

function aTokenProfile() {
    const profile: TokenProfileResponseModel = {
        uuid: 'token-profile',
        name: 'Token profile',
        tokenInstanceUuid: 'token-instance',
        tokenInstanceName: 'Token instance',
        tokenInstanceStatus: TokenInstanceStatus.Activated,
        enabled: true,
        usages: [],
    };
    return {
        withIdentity(uuid: string, name: string) {
            profile.uuid = uuid;
            profile.name = name;
            return this;
        },
        build: () => profile,
    };
}

async function selectTokenProfile(page: Page, profile: TokenProfileResponseModel) {
    await page.getByTestId('select-tokenProfileSelect-trigger').click();
    await page.getByRole('option', { name: profile.name, exact: true }).click();
}

async function selectKeyType(page: Page, type: KeyRequestType) {
    await page.getByTestId('select-typeSelect-trigger').click();
    await page.getByRole('option', { name: type, exact: true }).click();
}

test.describe('CryptographicKeyForm', () => {
    test('keeps Key Type visible, enabled, and selected when the current token profile is selected again', async ({ mount, page }) => {
        // given
        const tokenProfile = aTokenProfile().build();
        const selectedKeyType = KeyRequestType.KeyPair;
        await mount(
            <CryptographicKeyFormWithStore
                usesGlobalModal
                tokenProfiles={[tokenProfile]}
                supportedKeyRequestTypesByProfile={{ [tokenProfile.uuid]: [selectedKeyType] }}
            />,
        );
        await selectTokenProfile(page, tokenProfile);
        await selectKeyType(page, selectedKeyType);

        // when
        await selectTokenProfile(page, tokenProfile);

        // then
        const keyType = page.getByTestId('select-typeSelect-trigger');
        await expect(keyType).toBeVisible();
        await expect(keyType).toBeEnabled();
        await expect(keyType).toHaveText(selectedKeyType);
        await expect(page.getByTestId('select-typeSelect-input')).toHaveValue(selectedKeyType);
    });

    test('resets Key Type and loads the supported options when a different token profile is selected', async ({ mount, page }) => {
        // given
        const originalProfile = aTokenProfile().withIdentity('original-profile', 'Original profile').build();
        const nextProfile = aTokenProfile().withIdentity('next-profile', 'Next profile').build();
        const originalKeyType = KeyRequestType.KeyPair;
        const nextKeyType = KeyRequestType.Secret;
        await mount(
            <CryptographicKeyFormWithStore
                usesGlobalModal
                tokenProfiles={[originalProfile, nextProfile]}
                supportedKeyRequestTypesByProfile={{ [originalProfile.uuid]: [originalKeyType], [nextProfile.uuid]: [nextKeyType] }}
            />,
        );
        await selectTokenProfile(page, originalProfile);
        await selectKeyType(page, originalKeyType);

        // when
        await selectTokenProfile(page, nextProfile);

        // then
        const keyType = page.getByTestId('select-typeSelect-trigger');
        await expect(keyType).toBeEnabled();
        await expect(page.getByTestId('select-typeSelect-input')).toHaveValue('');
        await keyType.click();
        await expect(page.getByRole('option')).toHaveText([nextKeyType]);
    });

    test('stays in create mode in the global modal, where the route :id belongs to another resource', async ({ mount, page }) => {
        // Opened via "+" in the Key dropdown of the Complete Registration dialog: the page underneath
        // is /certificates/detail/:id, so the route param is a certificate uuid, not a key.
        await mount(<CryptographicKeyFormWithStore usesGlobalModal />);

        await expect(page.getByRole('button', { name: 'Create' })).toBeVisible();
        // Token Profile is required only for a new key — edit mode drops the marker and locks the field.
        await expect(page.getByText('Token Profile *')).toBeVisible();
    });

    test('still enters edit mode from its own route', async ({ mount, page }) => {
        await mount(<CryptographicKeyFormWithStore initialRoute="/keys/detail/key-uuid" routePath="/keys/detail/:id" />);

        await expect(page.getByRole('button', { name: 'Update' })).toBeVisible();
    });
});
