import BasePage from './base.page.js';

/**
 * Android Settings screen — used only to verify the Appium setup works
 * before the One Bill APK is available. Replace with One Bill screens.
 */
class SettingsPage extends BasePage {
    get searchBar() {
        return this.byResourceId('com.android.settings:id/search_action_bar');
    }

    get aboutPhone() {
        return this.scrollToText('About emulated device');
    }

    async isLoaded() {
        return this.searchBar.waitForDisplayed();
    }
}

export default new SettingsPage();
