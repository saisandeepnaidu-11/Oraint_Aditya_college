# NeuralFit App Structure

## Project Structure Overview

```
fitness-app/
├── app/
│   ├── index.tsx                 # Root redirect to auth
│   ├── onboarding.tsx            # ✨ NEW: Welcome screens
│   ├── _layout.tsx               # Root navigation
│   ├── +html.tsx                 # Web configuration
│   ├── +not-found.tsx            # 404 page
│   │
│   ├── (auth)/                   # Authentication group
│   │   ├── _layout.tsx
│   │   ├── login.tsx             # Login screen
│   │   └── register.tsx          # Registration screen
│   │
│   └── (tabs)/                   # Main app tabs
│       ├── _layout.tsx           # Updated with new screens
│       ├── index.tsx             # 📊 Dashboard (enhanced)
│       ├── diet.tsx              # Diet tracker
│       ├── profile.tsx           # 👤 Profile (enhanced)
│       ├── workouts.tsx          # ✨ NEW: Workout library
│       ├── workout-detail.tsx    # ✨ NEW: Workout details
│       ├── achievements.tsx      # ✨ NEW: Badge gallery
│       ├── goals.tsx             # ✨ NEW: Goal tracking
│       └── settings.tsx          # ✨ NEW: App settings
│
├── components/
│   ├── Themed.tsx                # Theme wrapper components
│   ├── GlassCard.tsx             # Glass-morphism card
│   ├── PrimaryButton.tsx         # Animated button
│   ├── StatRing.tsx              # Animated ring progress
│   ├── ProgressBar.tsx           # ✨ NEW: Progress bar
│   ├── AchievementBadge.tsx      # ✨ NEW: Badge component
│   ├── WorkoutCard.tsx           # ✨ NEW: Workout card
│   ├── StyledText.tsx
│   ├── ExternalLink.tsx
│   ├── EditScreenInfo.tsx
│   ├── useColorScheme.ts
│   ├── useColorScheme.web.ts
│   ├── useClientOnlyValue.ts
│   ├── useClientOnlyValue.web.ts
│   └── __tests__/
│
├── constants/
│   └── Colors.ts                 # Neon theme colors
│
├── assets/
│   ├── fonts/
│   │   └── SpaceMono-Regular.ttf
│   └── images/
│       ├── icon.png
│       ├── splash-icon.png
│       ├── adaptive-icon.png
│       └── favicon.png
│
├── package.json                  # Dependencies
├── tsconfig.json                 # TypeScript config
├── app.json                      # Expo config
├── ENHANCEMENTS.md              # ✨ NEW: Enhancement guide
└── .gitignore

```

## Navigation Flow

```
Login/Register
    ↓
Onboarding (optional)
    ↓
(Tabs Layout)
├── Dashboard (Home)
│   ├── Quick Actions
│   │   ├── → Achievements
│   │   └── → Goals
│   └── Stats Overview
│
├── Workouts
│   └── → Workout Detail
│
├── Diet
│
└── Profile
    ├── → Achievements
    ├── → Goals
    ├── → Workouts
    └── → Settings
```

## Screen Types & Features

### Authentication Screens
- **Login**: Email/password with animations
- **Register**: New account creation

### Main App Screens (Tabs)
1. **Dashboard** - Stats, quick actions, daily overview
2. **Workouts** - Browse 6+ programs, search filter
3. **Diet** - Food logging with AI suggestions
4. **Profile** - User info, quick links

### Feature Screens (Accessed via Profile/Dashboard)
1. **Achievements** - Badge gallery, tier system
2. **Goals** - Track fitness objectives
3. **Workout Detail** - Exercise breakdown, timer
4. **Settings** - Preferences, notifications

### Onboarding
- 4-step intro screens
- Skip functionality
- Smooth animations

## Component Architecture

### UI Components
- `GlassCard` - Base container with glass effect
- `PrimaryButton` - CTA button with animations
- `ProgressBar` - Animated progress indicator
- `StatRing` - Circular progress visualization
- `AchievementBadge` - Badge with lock state
- `WorkoutCard` - Workout preview card

### Theme System
- Light mode (bright, clean)
- Dark mode (neon accents - cyan/purple)
- Automatic switching based on system preference

## Color Palette

```js
Dark Mode (Primary):
- Background: #09090B
- Surface: #18181B
- Text: #ECEDEE
- Tint (Cyan): #00F0FF
- Success (Green): #39FF14
- Accent: #00F0FF
- Border: #27272A

Light Mode:
- Background: #F9FAFB
- Surface: #FFFFFF
- Text: #11181C
- Tint (Purple): #bd00ff
- Success: #10B981
- Border: #E5E7EB
```

## Dependencies Overview

- **expo** - React Native framework
- **expo-router** - File-based routing
- **@react-navigation/native** - Navigation
- **react-native-reanimated** - Smooth animations
- **lucide-react-native** - Icons (3000+)
- **@expo/vector-icons** - Additional icons

## Getting Started

```bash
cd fitness-app

# Install dependencies (if needed)
npm install

# Start development server
npm start

# Run on web
npm run web

# Run on Android
npm run android

# Run on iOS
npm run ios
```

## Tips for Development

1. **Hot Reload**: Changes auto-refresh during development
2. **TypeScript**: Full type safety and intellisense
3. **Theme Colors**: Change in `constants/Colors.ts`
4. **Icons**: Browse at `lucide.dev/icons`
5. **Animations**: Use React Native Reanimated
6. **Navigation**: Use `expo-router` with file-based routes

## Performance Notes

- Animations use native thread (via Reanimated)
- Components are memoized where needed
- Icons are tree-shaken from lucide
- Images are optimized for both platforms
