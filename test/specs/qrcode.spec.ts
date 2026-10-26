import { driver, expect } from '@wdio/globals';
import QrCodePage from '../pageobjects/qrcode.page.js';

describe('Pick QR Code', () => {
    it('shows the Pick QR Code option on launch', async () => {
        await QrCodePage.isLoaded();
        await expect(QrCodePage.pickQrCodeButton).toBeDisplayed();
    });

    it('taps Pick QR Code', async () => {
        await QrCodePage.tapPickQrCode();
        await driver.pause(2000); // let the next screen render for the screenshot
        await driver.saveScreenshot('./screenshots/after_pick_qr_code.png');
    });
});
