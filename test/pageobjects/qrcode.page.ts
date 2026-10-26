import BasePage from './base.page.js';

/** Screen offering the QR code options (shown on app launch). */
class QrCodePage extends BasePage {
    // Inspector XPath: //android.widget.TextView[@text="Pick QR Code"]
    get pickQrCodeButton() {
        return this.byText('Pick QR Code');
    }

    async isLoaded() {
        return this.pickQrCodeButton.waitForDisplayed({ timeout: 30000 });
    }

    async tapPickQrCode() {
        await this.tap(this.pickQrCodeButton);
    }
}

export default new QrCodePage();
