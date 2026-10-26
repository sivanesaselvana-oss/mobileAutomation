import { driver, expect } from '@wdio/globals';

const expectedPackage = process.env.APP_PACKAGE ?? 'com.android.settings';

describe('Setup smoke test', () => {
    it('connects to the device', async () => {
        await expect(driver.getCurrentPackage()).resolves.toBeTruthy();
    });

    it(`launches ${expectedPackage} in the foreground`, async () => {
        await driver.waitUntil(async () => (await driver.getCurrentPackage()) === expectedPackage, {
            timeout: 30000,
            timeoutMsg: `Expected ${expectedPackage} to be in the foreground`,
        });
        await driver.saveScreenshot('./screenshots/smoke_app_launched.png');
    });
});
