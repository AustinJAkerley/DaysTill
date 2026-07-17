# DaysTill

A clean, no-backend app to count down the days until anything — a personal goal,
a trip, a deadline, or something you're trying to get past. Built with React
Native + Expo. No ads, no accounts, no tracking. Countdowns are stored locally on
the device.

## Features

- Home screen with all your countdowns, sorted by soonest first
- Add a countdown with a title, target date, and accent color
- Tap a countdown for a full-screen detail view
- Archive events once they've passed, or delete them
- Automatic light / dark theme (follows the system)
- Data persists on-device via AsyncStorage — works fully offline

## Run it (development)

```bash
npm install
npx expo start
```

Then scan the QR code with the **Expo Go** app (iOS App Store / Google Play), or
press `a` for an Android emulator / `i` for the iOS simulator.

## Project structure

```
App.tsx                       Navigation + providers
src/
  navigation.ts               Screen param types
  types.ts                    Countdown model
  theme.ts                    Light/dark theme + color palette
  storage.ts                  AsyncStorage load/save
  CountdownsContext.tsx       App state (add/update/remove/archive)
  utils/date.ts               Day math + date formatting
  components/CountdownCard.tsx
  screens/
    HomeScreen.tsx
    AddScreen.tsx
    DetailScreen.tsx
```

## Publishing to the App Store & Google Play

Publishing native binaries uses **EAS Build** (a free Expo tier is available).

```bash
npm install -g eas-cli
eas login
eas build:configure

# Build store-ready binaries
eas build --platform ios        # produces an .ipa
eas build --platform android    # produces an .aab

# Submit to the stores
eas submit --platform ios
eas submit --platform android
```

Before submitting:

- Bump `version` in `app.json` for each release.
- The bundle identifiers are set to `com.daystill.app` (change in `app.json` if
  you own a different identifier).
- Provide store icons/splash in `assets/` (an `icon.png` is already included).
- An Apple Developer account and a Google Play Developer account are required to
  publish to the respective stores.
