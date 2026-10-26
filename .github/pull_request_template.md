## What does this PR change?

<!-- Screens / flows covered, page objects added or changed -->

## Type
- [ ] New test(s)
- [ ] Page object / locator update
- [ ] Framework / config change
- [ ] Fix for flaky or failing test

## How was it tested?
- [ ] `npm run typecheck` passes
- [ ] Ran locally on emulator / device: `npx wdio run ./wdio.conf.ts --spec <spec>`
- [ ] Device / Android version used: <!-- e.g. emulator API 34 -->

## Checklist
- [ ] Locators prefer accessibility id / resource-id over XPath
- [ ] No hard-coded waits (`driver.pause`) unless justified in a comment
- [ ] Tests are independent (no reliance on another test's state)
- [ ] No secrets, `.env`, or APK files committed
