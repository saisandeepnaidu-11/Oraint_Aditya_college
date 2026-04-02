# NeuralFit - AI-Powered Fitness Companion 🏋️‍♂️

A modern, feature-rich fitness tracking and workout application built with React Native and Expo. NeuralFit combines personalized AI workouts, progress tracking, and gamification to help users achieve their fitness goals.

## ✨ Features

### Core Features
- 📱 **Multi-platform Support** - Works on iOS, Android, and Web
- 🔐 **User Authentication** - Secure login/registration system
- 📊 **Dashboard** - Real-time fitness stats and daily overview
- 🏋️ **Workout Library** - 50+ AI-generated workout programs
- 📈 **Progress Tracking** - Monitor calories, steps, workouts, and more
- 🏆 **Achievement System** - Earn badges and unlock rewards
- 🎯 **Fitness Goals** - Set and track personalized fitness objectives
- 📋 **Meal Tracking** - Log meals and track macronutrients
- ⚙️ **Settings** - Customize app preferences and notifications

### UI/UX Enhancements
- ✨ **Smooth Animations** - Staggered FadeIn entrance effects on all screens
- 🎨 **Glass-Morphism Design** - Modern frosted glass aesthetic
- 🌙 **Dark/Light Mode** - Full theme support with system preferences
- 🎯 **Responsive Layout** - Optimized for mobile and tablet devices
- 🔤 **3000+ Icons** - Lucide React Native icon library integration

## 🛠️ Tech Stack

### Frontend
- **React Native** - Cross-platform mobile framework
- **Expo 54.0.33** - Managed React Native platform
- **TypeScript 5.9.2** - Type-safe development
- **React Navigation 7.1.8** - Navigation management
- **expo-router 6.0.23** - File-based routing

### Animations & Styling
- **React Native Reanimated 4.1.1** - 60fps animations
- **lucide-react-native 1.7.0** - Icon library
- **Expo Linear Gradient** - Gradient effects

### Development
- **Node.js** - JavaScript runtime
- **npm** - Package manager

## 📋 Project Structure

```
fitness-app/
├── app/
│   ├── (auth)/                  # Authentication screens
│   │   ├── _layout.tsx         # Auth layout
│   │   ├── login.tsx           # Login screen
│   │   └── register.tsx        # Registration screen
│   ├── (tabs)/                 # Main tab navigation
│   │   ├── _layout.tsx         # Tab layout & navigation
│   │   ├── index.tsx           # Dashboard
│   │   ├── diet.tsx            # Meal tracking
│   │   ├── workout.tsx         # Workouts (tab)
│   │   ├── profile.tsx         # User profile
│   │   ├── achievements.tsx    # Badges & achievements
│   │   ├── goals.tsx           # Fitness goals
│   │   ├── settings.tsx        # App settings
│   │   ├── workouts.tsx        # Workout library
│   │   └── workout-detail.tsx  # Workout details
│   ├── _layout.tsx             # Root layout
│   ├── index.tsx               # Home/splash screen
│   ├── onboarding.tsx          # Onboarding flow
│   └── +not-found.tsx          # 404 page
├── components/
│   ├── GlassCard.tsx           # Glass-morphism card
│   ├── PrimaryButton.tsx       # Primary action button
│   ├── ProgressBar.tsx         # Animated progress indicator
│   ├── StatRing.tsx            # Circular stat display
│   ├── AchievementBadge.tsx    # Badge component
│   ├── WorkoutCard.tsx         # Workout preview card
│   ├── Themed.tsx              # Theme provider
│   ├── useColorScheme.ts       # Color scheme hook
│   └── __tests__/              # Component tests
├── constants/
│   └── Colors.ts               # Theme color palette
├── assets/
│   ├── fonts/                  # Custom fonts
│   └── images/                 # App images
├── app.json                    # Expo configuration
├── package.json                # Dependencies
├── tsconfig.json               # TypeScript config
└── README.md                   # This file
```

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ installed
- npm or yarn package manager
- Expo CLI (optional, but recommended)
- iOS Simulator (Mac) or Android Emulator / Physical device

### Installation

1. **Clone the repository**
```bash
cd fitness-app
```

2. **Install dependencies**
```bash
npm install
```

3. **Install Expo Go (for mobile testing)**
```bash
# Android
npm install expo-go

# iOS
# Download from App Store
```

### Running the App

#### Start Development Server
```bash
npm start
```

The server will start on `http://localhost:8082` and display a QR code.

#### Web
```bash
npm start -- --web
```

#### iOS Simulator
```bash
npm start -- --ios
```

#### Android Emulator
```bash
npm start -- --android
```

#### Physical Device
- Scan the QR code with Expo Go app (iOS/Android)
- Or use Expo app for direct connection

#### Using Expo CLI
```bash
# Install Expo CLI globally
npm install -g expo-cli

# Start project
expo start

# Open in web browser
expo start --web
```

## 📱 Key Screens

### Authentication
- **Login** - Email/password authentication with animated entrance
- **Register** - User registration with validation
- **Onboarding** - 4-step welcome flow introducing app features

### Main App (Tab Navigation)
- **Dashboard** - Daily stats, streaks, quick actions, motivation card
- **Diet** - Meal logging with macro tracking and daily overview
- **Workouts** - Browse and start workout programs
- **Achievements** - Badge collection and progress tracking
- **Goals** - Set fitness objectives with progress tracking
- **Profile** - User stats and account settings
- **Settings** - App preferences and notifications

## 🎨 Design System

### Colors (Dark Mode)
- **Primary Accent**: Cyan (#00F0FF)
- **Secondary Accent**: Purple (#bd00ff)
- **Background**: Dark gray (#09090B)
- **Surface**: Lighter gray (#18181B)
- **Text**: White/Gray scale

### Components
- **GlassCard** - Frosted glass effect container
- **PrimaryButton** - CTA button with icon support
- **ProgressBar** - Animated progress indicator
- **StatRing** - Circular progress visualization
- **WorkoutCard** - Interactive workout preview

## ⚡ Performance

- **Animation Performance**: 60fps using React Native Reanimated
- **Bundle Size**: ~50MB (Expo managed)
- **Load Time**: <3 seconds on modern devices
- **Memory Usage**: Optimized with lazy loading

## 🔒 Security

- User credentials handled securely
- TypeScript for type safety
- Input validation on all forms
- Secure password handling

## 📦 Dependencies

### Core
- react-native
- expo
- expo-router
- react-navigation

### UI & Animation
- react-native-reanimated
- lucide-react-native
- expo-linear-gradient

### Development
- typescript
- @types/react-native

See `package.json` for complete dependency list and versions.

## 🐛 Debugging

### Common Issues

**Port already in use**
```bash
# Kill process on port 8082
npx kill-port 8082
# Then restart
npm start
```

**Cached app issues**
```bash
npm start -- --clear
```

**TypeScript errors**
```bash
npm run type-check
```

### Enable Debug Mode
```bash
npm start -- --dev
```

## 📊 App Statistics

- **Total Screens**: 13
- **Components**: 10+ reusable components
- **Animations**: 50+ entrance transitions
- **Icons**: 50+ unique icons
- **Theme Colors**: 20+ color variables
- **Supported Platforms**: iOS, Android, Web

## 🧪 Testing

Run tests:
```bash
npm test
```

For component testing:
```bash
npm test -- components/
```

## 📝 Contributing

1. Create a feature branch (`git checkout -b feature/amazing-feature`)
2. Commit changes (`git commit -m 'Add amazing feature'`)
3. Push to branch (`git push origin feature/amazing-feature`)
4. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see LICENSE file for details.

## 👨‍💻 Author

**Aditya Sharma**
- GitHub: [@aditya]
- Email: aditya@neuralfit.io

## 🙏 Acknowledgments

- Expo team for the amazing managed React Native platform
- React Navigation team for routing solutions
- Lucide for the beautiful icon library
- All contributors and users

## 📞 Support

For issues, questions, or suggestions:
- GitHub Issues: [Create an issue](https://github.com/aditya/fitness-app/issues)
- Email: support@neuralfit.io

## 🗺️ Roadmap

### v1.1 (Coming Soon)
- [ ] Social features (friend challenges, leaderboards)
- [ ] Advanced analytics dashboard
- [ ] Wearable device integration
- [ ] Push notifications

### v1.2
- [ ] AI-powered workout recommendations
- [ ] Video tutorials for exercises
- [ ] Community forums
- [ ] Advanced nutrition planning

### v2.0
- [ ] Machine learning workout customization
- [ ] Real-time collaborative workouts
- [ ] VR workout experiences
- [ ] Advanced health metrics integration

---

**NeuralFit** - Your AI-powered path to fitness excellence! 💪

Made with ❤️ by Aditya Sharma
