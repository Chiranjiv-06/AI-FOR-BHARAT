# VaniSchema - Requirements Document

## 1. Project Overview

### 1.1 Project Name
VaniSchema - Voice-First Government Scheme Navigator

### 1.2 Problem Statement
Over $50 billion in welfare funds remain unused annually because rural citizens cannot navigate complex, text-heavy government portals. The digital divide is fundamentally a language and literacy barrier that prevents eligible citizens from accessing government benefits.

### 1.3 Solution
VaniSchema is an AI-powered, voice-first assistant that acts as a digital social worker, enabling citizens to discover and apply for government schemes using natural language voice commands in their preferred language (English/Hindi).

### 1.4 Target Users
- **Primary Users**: Rural citizens with limited literacy and digital skills
- **Secondary Users**: Government administrators managing scheme applications
- **Demographics**: Indian citizens, particularly farmers, small business owners, women, and low-income families

## 2. Functional Requirements

### 2.1 User Authentication & Authorization

#### 2.1.1 Citizen Login
- Users can log in with username/phone number
- Simple authentication for demo purposes (any valid username)
- User profile includes: name, role (user), location
- Session persistence across page refreshes

#### 2.1.2 Admin Login
- Separate admin portal access
- Credentials: admin/admin123 (demo)
- Admin role with elevated privileges
- Secure logout functionality

### 2.2 Voice Interaction System

#### 2.2.1 Voice Input
- Real-time speech recognition using Web Speech API
- Support for English (en-IN) and Hindi (hi-IN)
- Continuous listening mode with visual feedback
- Interim results display during speech
- Manual stop/start controls
- Fallback to text input if voice not supported

#### 2.2.2 Voice Output
- Text-to-speech responses using Speech Synthesis API
- Language-specific voice output (English/Hindi)
- Adjustable speech rate (0.9x)
- Confirmation messages for user actions

#### 2.2.3 Voice Commands
- Scheme search: "I am a farmer and lost my crops in the rain"
- Form filling: "My name is Rajesh, I am 45 years old, from Rampur"
- Natural language processing for intent recognition

### 2.3 Scheme Discovery & Search

#### 2.3.1 Scheme Database
- Comprehensive list of government schemes including:
  - PM-Kisan Samman Nidhi (Farmer Support)
  - Pradhan Mantri Fasal Bima Yojana (Crop Insurance)
  - Ayushman Bharat (Health Insurance)
  - PMMY Mudra Loan (Small Business)
  - PM Ujjwala Yojana (Free Gas Connection)
  - Sukanya Samriddhi Yojana (Girl Child Savings)

#### 2.3.2 Search Functionality
- Keyword-based matching algorithm
- Multi-language support (English/Hindi names and descriptions)
- Fuzzy matching for user queries
- Relevance-based result ranking
- Real-time search results display

#### 2.3.3 Scheme Information Display
- Scheme name (English and Hindi)
- Local/common name
- Detailed description
- Eligibility criteria
- Benefits overview
- Required documents list
- Visual card-based layout

### 2.4 Application Management

#### 2.4.1 Application Form
- Voice-powered auto-fill functionality
- Intelligent form field extraction from natural language
- Manual text input mode as alternative
- Required fields:
  - Full Name
  - Age
  - Location/Address
  - Aadhar Number (last 4 digits)
- Document upload capability
- Real-time field validation
- Visual feedback for completed fields

#### 2.4.2 Form Submission
- Submit application to local database
- Generate unique application ID
- Set initial status as "Pending"
- Timestamp creation
- Success confirmation (voice + visual)

#### 2.4.3 Application Tracking
- View all submitted applications
- Display application status (Pending/Approved/Rejected)
- Show submission date
- Scheme name reference
- User information display

### 2.5 Admin Dashboard

#### 2.5.1 Overview Statistics
- Total applications count
- Pending review count
- Approved applications count
- Visual stat cards with icons

#### 2.5.2 Application Management
- View all applications in table format
- Filter by status
- Search functionality
- Application details display:
  - Applicant name and location
  - Scheme name
  - Submission date
  - Current status

#### 2.5.3 Application Actions
- Approve pending applications
- Reject pending applications
- Real-time status updates
- Visual action buttons (approve/reject icons)

### 2.6 Multi-Language Support

#### 2.6.1 Language Toggle
- Switch between English and Hindi
- Persistent language preference
- UI translation for all text elements
- Voice input/output language synchronization

#### 2.6.2 Translated Content
- Navigation labels
- Button text
- Form labels
- Error messages
- Success notifications
- Scheme information

### 2.7 Additional Features

#### 2.7.1 Navigation
- Home page (scheme search)
- My Applications page
- Blogs section (informational content)
- Profile management
- Settings panel
- Help Center
- Bottom navigation bar
- Sidebar menu (mobile-responsive)

#### 2.7.2 Settings
- Language preference toggle
- Dark mode toggle
- Theme persistence

#### 2.7.3 User Profile
- Display user information
- Location details
- Application history summary

## 3. Non-Functional Requirements

### 3.1 Performance
- Voice recognition response time < 2 seconds
- Search results display < 1 second
- Form submission processing < 1.5 seconds
- Smooth animations (60fps)
- Optimized bundle size

### 3.2 Usability
- Intuitive voice-first interface
- High contrast design for accessibility
- Large touch targets (mobile-friendly)
- Clear visual feedback for all actions
- Error prevention and recovery
- Minimal cognitive load

### 3.3 Accessibility
- WCAG 2.1 AA compliance target
- Screen reader compatibility
- Keyboard navigation support
- Voice-only operation capability
- High contrast color scheme
- Readable font sizes (minimum 14px)

### 3.4 Compatibility
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile responsive design (320px - 1920px)
- Web Speech API support required
- LocalStorage support required
- Cross-tab synchronization

### 3.5 Security
- Client-side data storage (demo)
- No sensitive data transmission
- Input sanitization
- XSS prevention
- CSRF protection considerations

### 3.6 Reliability
- Offline-first data persistence
- LocalStorage backup
- Real-time data synchronization
- Error handling for API failures
- Graceful degradation (voice to text fallback)

### 3.7 Scalability
- Modular component architecture
- Efficient state management
- Lazy loading considerations
- Code splitting potential
- Database abstraction layer

## 4. Technical Requirements

### 4.1 Frontend Framework
- React 19.2.0
- Vite build tool
- ES6+ JavaScript

### 4.2 UI Libraries
- TailwindCSS for styling
- Framer Motion for animations
- Lucide React for icons

### 4.3 Voice Technologies
- Web Speech API (SpeechRecognition)
- Speech Synthesis API
- react-speech-recognition library

### 4.4 Data Management
- LocalStorage for persistence
- Custom database abstraction (db.js)
- Real-time subscription pattern
- Cross-tab synchronization

### 4.5 Development Tools
- ESLint for code quality
- PostCSS for CSS processing
- Autoprefixer for browser compatibility

## 5. Data Requirements

### 5.1 Scheme Data Structure
```json
{
  "id": "string",
  "name": "string (English)",
  "name_hi": "string (Hindi)",
  "local_name": "string (English)",
  "local_name_hi": "string (Hindi)",
  "description": "string (English)",
  "description_hi": "string (Hindi)",
  "eligibility": ["array of strings"],
  "benefits": "string",
  "documents": ["array of strings"],
  "keywords": ["array of strings"]
}
```

### 5.2 Application Data Structure
```json
{
  "id": "number (timestamp)",
  "user": "string",
  "scheme": "string",
  "status": "Pending|Approved|Rejected",
  "date": "string (ISO date)",
  "location": "string",
  "name": "string",
  "age": "string",
  "address": "string",
  "aadhar": "string",
  "fileName": "string (optional)"
}
```

### 5.3 User Data Structure
```json
{
  "name": "string",
  "role": "user|admin",
  "location": "string (optional)"
}
```

## 6. User Stories

### 6.1 Citizen User Stories
1. As a farmer, I want to find crop insurance schemes by speaking in Hindi, so I can protect my harvest
2. As a rural woman, I want to apply for gas connection without typing, so I can access the scheme despite low literacy
3. As a small business owner, I want to discover loan schemes by describing my need, so I can grow my business
4. As a parent, I want to find education schemes for my daughter by voice, so I can secure her future
5. As a citizen, I want to track my application status, so I know when to expect benefits

### 6.2 Admin User Stories
1. As an admin, I want to view all pending applications, so I can process them efficiently
2. As an admin, I want to approve/reject applications with one click, so I can manage high volumes
3. As an admin, I want to see application statistics, so I can monitor scheme uptake
4. As an admin, I want to search applications, so I can find specific cases quickly

## 7. Constraints & Assumptions

### 7.1 Constraints
- Browser must support Web Speech API
- Microphone access required for voice features
- Internet connection required for initial load
- LocalStorage must be enabled
- Demo authentication (not production-ready)

### 7.2 Assumptions
- Users have access to smartphones or computers
- Users can grant microphone permissions
- Users understand basic mobile/web navigation
- Government scheme data is accurate and current
- Admin credentials are securely managed (in production)

## 8. Future Enhancements

### 8.1 Phase 2 Features
- Real backend API integration
- SMS notifications for application status
- Aadhaar-based authentication
- Document OCR for auto-fill
- Multi-language support (10+ Indian languages)
- Offline mode with sync
- WhatsApp bot integration

### 8.2 Phase 3 Features
- AI-powered eligibility checker
- Personalized scheme recommendations
- Video tutorials for schemes
- Community forum
- Grievance redressal system
- Analytics dashboard for government
- Mobile native apps (iOS/Android)

## 9. Success Metrics

### 9.1 User Engagement
- Voice feature usage rate > 70%
- Application completion rate > 80%
- Average time to apply < 5 minutes
- User retention rate > 60%

### 9.2 Business Impact
- Increase in scheme applications by 50%
- Reduction in application errors by 40%
- Improved rural citizen reach by 3x
- Admin processing time reduced by 30%

## 10. Glossary

- **DBT**: Direct Benefit Transfer
- **SECC**: Socio-Economic Caste Census
- **BPL**: Below Poverty Line
- **KYC**: Know Your Customer
- **Aadhar**: 12-digit unique identity number for Indian residents
- **RAG**: Retrieval-Augmented Generation (AI technique)
- **Web Speech API**: Browser API for speech recognition and synthesis
