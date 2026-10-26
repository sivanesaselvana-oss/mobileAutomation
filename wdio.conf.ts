import 'dotenv/config';
import path from 'node:path';

// When APP_PATH is set the APK is installed and launched; otherwise an already
// installed app is launched by APP_PACKAGE / APP_ACTIVITY (defaults to Settings
// so the setup can be smoke-tested before the One Bill APK is available).
const appPath = process.env.APP_PATH ? path.resolve(process.env.APP_PATH) : undefined;

const appCapabilities = appPath
    ? { 'appium:app': appPath }
    : {
          'appium:appPackage': process.env.APP_PACKAGE ?? 'com.android.settings',
          'appium:appActivity': process.env.APP_ACTIVITY ?? '.Settings',
      };

export const config: WebdriverIO.Config = {
    runner: 'local',
    tsConfigPath: './tsconfig.json',

    // Appium server started/stopped automatically by @wdio/appium-service,
    // using the project-local appium from node_modules (no global PATH needed)
    port: 4723,
    services: [
        [
            'appium',
            {
                args: { relaxedSecurity: true, log: './logs/appium.log' },
            },
        ],
    ],

    specs: ['./test/specs/**/*.spec.ts'],
    exclude: [],
    maxInstances: 1,

    capabilities: [
        {
            platformName: 'Android',
            'appium:automationName': 'UiAutomator2',
            'appium:deviceName': process.env.DEVICE_NAME ?? 'Android Emulator',
            ...(process.env.UDID ? { 'appium:udid': process.env.UDID } : {}),
            ...(process.env.PLATFORM_VERSION ? { 'appium:platformVersion': process.env.PLATFORM_VERSION } : {}),
            ...appCapabilities,
            'appium:autoGrantPermissions': true,
            'appium:noReset': process.env.NO_RESET === 'true',
            'appium:newCommandTimeout': 240,
            'appium:uiautomator2ServerInstallTimeout': 120000,
            'appium:adbExecTimeout': 120000,
        },
    ],

    logLevel: 'info',
    outputDir: './logs',
    bail: 0,
    waitforTimeout: 15000,
    connectionRetryTimeout: 180000,
    connectionRetryCount: 2,

    framework: 'mocha',
    reporters: ['spec'],
    mochaOpts: {
        ui: 'bdd',
        timeout: 180000,
    },

    afterTest: async function (test, _context, { passed }) {
        if (!passed) {
            const safeName = test.title.replace(/[^a-z0-9]+/gi, '_');
            await browser.saveScreenshot(`./screenshots/${safeName}_${Date.now()}.png`);
        }
    },
};
