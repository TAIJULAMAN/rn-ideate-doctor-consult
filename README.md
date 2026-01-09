# 🏥 Doctor Consultation App

A comprehensive React Native mobile application for doctor consultations, built with Expo and TypeScript. This app provides a complete healthcare platform with appointment booking, instant consultations, messaging, and more.

![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Expo](https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)

## ✨ Features

### 🔐 Authentication
- **Sign In** - Email/password with social login (Google, Facebook, Apple)
- **Sign Up** - Complete registration with validation
- **Forgot Password** - Email-based recovery
- **OTP Verification** - 6-digit code with auto-focus and timer
- **Reset Password** - Secure password reset with strength validation

### 👨‍⚕️ Doctor Services
- **Browse Doctors** - Filter by specialty and category
- **Doctor Profiles** - Detailed information with stats, reviews, and ratings
- **Instant Service** - Quick consultations via chat, voice, or video
- **Save Doctors** - Bookmark favorite doctors for quick access

### 📅 Appointment Booking
- **Calendar Booking** - Interactive calendar with time slot selection
- **Checkout** - Patient information and appointment summary
- **Payment** - Multiple payment methods (Card, PayPal, Apple Pay, Google Pay)
- **Success Confirmation** - Booking details with success modal

### 💬 Communication
- **Messaging** - Real-time chat with doctors
- **Audio Calls** - Voice consultation interface
- **Video Calls** - Face-to-face video consultations
- **Active Doctors** - See who's online and available

### 📰 Health Articles
- **Article Library** - Browse health and wellness content
- **Search** - Find articles by topic
- **Article Details** - Full content with author info and engagement

### ⚙️ Settings & Profile
- **Edit Profile** - Update personal information and photo
- **Change Password** - Secure password management
- **Saved Doctors** - Manage bookmarked doctors
- **Notifications** - Manage notification preferences

### 🔔 Notifications
- **Multiple Types** - Appointments, messages, reminders, promotions, system
- **Read/Unread** - Track notification status
- **Actions** - Mark as read, delete, mark all as read

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator (Mac) or Android Emulator

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd rn-ideate-doctor-consult/ideate-doctor-consult
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npx expo start
   ```

4. **Run on your preferred platform**
   - Press `i` for iOS simulator
   - Press `a` for Android emulator
   - Press `w` for web browser
   - Scan QR code with Expo Go app on your phone

### Web Development
```bash
npm run web
```

## 📁 Project Structure

```
app/
├── (tabs)/                          # Main navigation tabs
│   ├── index.tsx                    # Home page
│   ├── services.tsx                 # Services listing
│   ├── articles.tsx                 # Articles listing
│   ├── messages.tsx                 # Messages inbox
│   ├── settings.tsx                 # Settings page
│   └── _layout.tsx                  # Tab navigation layout
│
├── components/                      # Organized components
│   ├── auth/                        # Authentication (5 pages)
│   ├── services/                    # Doctor services (3 pages)
│   ├── articles/                    # Articles (2 pages)
│   ├── settings/                    # Settings & profile (3 pages)
│   ├── messaging/                   # Communication (3 pages)
│   ├── booking/                     # Appointments (3 pages)
│   ├── onboarding/                  # Onboarding (2 pages)
│   └── common/                      # Shared pages (1 page)
│
├── _layout.tsx                      # Root layout
└── index.tsx                        # App entry point

data/
├── doctors.ts                       # Doctor data
├── services.ts                      # Service categories
└── articles.ts                      # Health articles

assets/
├── services/                        # Service category icons
├── girls/                          # Doctor avatars
├── boys/                           # Doctor avatars
├── articles/                       # Article images
└── message/                        # Message avatars
```

## 🎨 Design System

### Color Palette
- **Primary**: `#FF8C42` (Orange) - Main accent color
- **Success**: `#48BB78` (Green) - Success states
- **Info**: `#4299E1` (Blue) - Informational elements
- **Text**: `#2D3748` (Dark Gray) - Primary text
- **Subtle**: `#718096` (Gray) - Secondary text
- **Background**: `#FAFAFA` (Light Gray) - App background

### Typography
- **Titles**: 28px, bold
- **Subtitles**: 15px, regular
- **Labels**: 14px, semibold
- **Body**: 15px, regular
- **Helper**: 14px, regular

### Components
- **Buttons**: 12px border radius, 16px vertical padding
- **Cards**: 16px border radius, 1px border
- **Inputs**: 12px border radius, icon prefix
- **Icons**: Ionicons from @expo/vector-icons

## 🛠️ Tech Stack

- **Framework**: React Native with Expo
- **Language**: TypeScript
- **Navigation**: Expo Router (file-based routing)
- **Icons**: @expo/vector-icons (Ionicons)
- **State Management**: React Hooks (useState, useEffect)
- **Styling**: StyleSheet API

## 📱 Screens Overview

### Main Tabs (5)
- Home, Services, Articles, Messages, Settings

### Authentication (5)
- Sign In, Sign Up, Forgot Password, OTP Verification, Reset Password

### Doctor Services (3)
- Category Doctors, Doctor Detail, Instant Service

### Booking (3)
- Book Appointment, Checkout, Payment

### Communication (3)
- Chat Detail, Audio Call, Video Call

### Articles (2)
- Article Detail, Search Articles

### Settings (3)
- Edit Profile, Change Password, Saved Doctors

### Other (3)
- Notifications, Onboarding 1, Onboarding 2

**Total: 27 Screens**

## 🔧 Development

### Available Scripts

```bash
# Start development server
npm start

# Start web development
npm run web

# Run on Android
npm run android

# Run on iOS
npm run ios

# Type checking
npx tsc --noEmit

# Reset project
npm run reset-project
```

### Adding New Pages

1. Create file in appropriate `components/` subfolder
2. Expo Router automatically creates route
3. Use `router.push()` for navigation
4. Follow existing patterns for consistency

### Data Management

Mock data is stored in the `data/` directory:
- `doctors.ts` - Doctor profiles
- `services.ts` - Service categories
- `articles.ts` - Health articles

## 🎯 Key Features Implementation

### Calendar Booking
- Interactive month navigation
- Time slot selection (30-minute intervals)
- Duration picker (1-4 hours)
- Real-time price calculation

### OTP Verification
- 6-digit input with auto-focus
- 60-second countdown timer
- Resend functionality
- Keyboard navigation support

### Payment Flow
- Multiple payment methods
- Card form validation
- Success modal with booking details
- Secure payment processing UI

### Notifications System
- 5 notification types
- Read/unread tracking
- Individual and bulk actions
- Empty state handling

## 🚧 Future Enhancements

- [ ] Backend API integration
- [ ] Real-time messaging with WebSocket
- [ ] Push notifications
- [ ] Payment gateway integration
- [ ] Doctor availability calendar
- [ ] Medical records management
- [ ] Prescription management
- [ ] Video call implementation
- [ ] Chat file attachments
- [ ] Multi-language support

## 📄 License

This project is licensed under the MIT License.

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For support, email support@doctorconsult.com or join our Slack channel.

---

**Built with ❤️ using React Native and Expo**
