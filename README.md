# One Bill – Mobile Automation (Android)

Appium 3 + UiAutomator2 + WebdriverIO 10 + TypeScript + Mocha, Page Object Model.

## Toolchain (installed per-user, no admin)

| Tool | Location |
|---|---|
| JDK 17 (Temurin) | `D:\Mobile_Automation\tools\jdk-17` → `JAVA_HOME` |
| Android SDK (platform-tools, emulator, android-34, build-tools 34) | `D:\Mobile_Automation\tools\android-sdk` → `ANDROID_HOME` / `ANDROID_SDK_ROOT` |
| Appium 3 + UiAutomator2 driver | global npm (`appium -v`, `appium driver list --installed`) |
| Emulator (AVD) | `OneBill_Pixel_API34` (Pixel 6, Android 14, Google APIs x86_64) |

> Open a **new** terminal / restart VS Code after setup so the new user env vars are picked up.

Verify: `npm run doctor` (0 required fixes expected).

## Run a device

**Real device (recommended right now)**
1. Phone → Settings → About phone → tap *Build number* 7× → Developer options → enable **USB debugging**.
2. Connect via USB, accept the RSA prompt, then `adb devices` should list it.
3. Put its id in `.env` as `UDID=...`.

**Emulator** – needs CPU virtualization. One-time, as admin (PowerShell):
```powershell
Enable-WindowsOptionalFeature -Online -FeatureName HypervisorPlatform -All
```
Also make sure virtualization (VT-x / AMD-V) is enabled in BIOS, reboot, then:
```
npm run emulator
```

## Point at the One Bill app

```
copy .env.example .env
```
- APK: drop it into `apps/` and set `APP_PATH=./apps/onebill.apk`, **or**
- Installed app: set `APP_PACKAGE` / `APP_ACTIVITY`
  (find them with `adb shell dumpsys window | findstr mCurrentFocus` while the app is open).

With neither set, tests launch Android **Settings** – the smoke test uses this to prove the setup works.

## Commands

| Command | Purpose |
|---|---|
| `npm test` | Run all specs (Appium server starts automatically) |
| `npm run test:smoke` | Setup smoke test |
| `npm run typecheck` | TypeScript check |
| `npm run doctor` | Appium environment check |
| `npm run appium` | Start Appium manually (for Appium Inspector) |

## Inspecting elements

Install [Appium Inspector](https://github.com/appium/appium-inspector/releases), run `npm run appium`, connect to `http://127.0.0.1:4723` with:
```json
{ "platformName": "Android", "appium:automationName": "UiAutomator2", "appium:appPackage": "<pkg>", "appium:appActivity": "<activity>" }
```
Locator preference: accessibility id (`~id`) → resource-id (`id=...`) → UiSelector text → XPath (last resort).

## Structure

```
wdio.conf.ts            capabilities, Appium service, reporters, screenshot-on-failure
test/pageobjects/       BasePage helpers + one class per screen
test/specs/             *.spec.ts test files
apps/                   APK/AAB (git-ignored)
logs/ screenshots/      run output (git-ignored)
```
