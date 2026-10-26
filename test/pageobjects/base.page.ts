import { $, browser } from '@wdio/globals';

/** Shared helpers for every screen object. */
export default abstract class BasePage {
    /** Locate by accessibility id (content-desc on Android) — preferred locator. */
    protected byAccessibilityId(id: string) {
        return $(`~${id}`);
    }

    /** Locate by Android resource-id, e.g. "com.onebill:id/login_button". */
    protected byResourceId(resourceId: string) {
        return $(`id=${resourceId}`);
    }

    /** Locate by exact visible text via UiAutomator. */
    protected byText(text: string) {
        return $(`android=new UiSelector().text("${text}")`);
    }

    /** Scroll a scrollable container until the element with this text is visible. */
    protected scrollToText(text: string) {
        return $(
            `android=new UiScrollable(new UiSelector().scrollable(true)).scrollIntoView(new UiSelector().text("${text}"))`,
        );
    }

    async tap(element: ChainablePromiseElement) {
        await element.waitForDisplayed();
        await element.click();
    }

    async type(element: ChainablePromiseElement, value: string) {
        await element.waitForDisplayed();
        await element.clearValue();
        await element.setValue(value);
    }

    async hideKeyboard() {
        if (await browser.isKeyboardShown()) {
            await browser.hideKeyboard();
        }
    }
}
