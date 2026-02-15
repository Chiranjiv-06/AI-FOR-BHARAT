# VaniSchema - Design Document

## 1. System Architecture

### 1.1 High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     VaniSchema Application                   │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Citizen    │  │    Admin     │  │   Auth       │      │
│  │   Portal     │  │   Dashboard  │  │   System     │      │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘      │
│         │                  │                  │              │
│         └──────────────────┴──────────────────┘              │
│                            │                                 │
│         ┌──────────────────┴──────────────────┐             │
│         │                                      │             │
│  ┌──────▼───────┐                    ┌────────▼────────┐   │
│  │   Voice AI   │                    │   Application   │   │
│  │   Engine     │                    │   Manager       │   │
│  │              │                    │                 │   │
│  │ - Speech     │                    │ - Form Handler  │   │
│  │   Recognition│                    │ - Validation    │   │
│  │ - TTS        │                    │ - Submission    │   │
│  │ - NLP Parser │                    │                 │   │
│  └──────┬───────┘                    └────────┬────────┘   │
│         │                                      │             │
│         └──────────────────┬──────────────────┘             │
│                            │                                 │
│                   ┌────────▼────────┐                       │
│                   │  Data Layer     │                       │
│                   │                 │                       │
│                   │ - LocalStorage  │                       │
│                   │ - Schemes DB    │                       │
│                   │ - Applications  │                       │
│                   │ - Subscriptions │                       │
│                   └─────────────────┘                       │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

### 1.2 Component Architecture

```
App.jsx (Root)
├── Login.jsx (Auth Gate)
├── AdminDashboard.jsx (Admin View)
└── Citizen Portal
    ├── Sidebar.jsx (Navigation)
    ├── Home View
    │   ├── VoiceButton.jsx
    │   ├── SchemeCard.jsx (List)
    │   └── FormModal.jsx
    ├── ApplicationList.jsx
    ├── Profile.jsx
    ├── Blogs.jsx
    ├── Settings.jsx
    └── HelpCenter.jsx

Hooks
├── useVoice.js (Speech API)

Services
├── db.js (Data Persistence)

Data
└── schemes.json (Scheme Database)
```

## 2. Technology Stack

### 2.1 Frontend Framework
- **React 19.2.0**: Component-based UI library
- **Vite 7.3.1**: Fast build tool and dev server
- **JavaScript (ES6+)**: Modern JavaScript features

### 2.2 Styling & UI
- **TailwindCSS 3.4.1**: Utility-first CSS framework
- **PostCSS 8.5.6**: CSS processing
- **Autoprefixer 10.4.24**: Browser compatibility
- **Framer Motion 12.34.0**: Animation library
- **Lucide React 0.564.0**: Icon library

### 2.3 Voice & Speech
- **Web Speech API**: Native browser speech recognition
- **Speech Synthesis API**: Text-to-speech
- **react-speech-recognition 4.0.1**: React wrapper
- **regenerator-runtime 0.14.1**: Async/await support

### 2.4 Development Tools
- **ESLint 9.39.1**: Code linting
- **@vitejs/plugin-react 5.1.1**: React plugin for Vite

## 3. Design Patterns

### 3.1 Component Patterns

#### 3.1.1 Container/Presentational Pattern
- **Container Components**: App.jsx, AdminDashboard.jsx (logic)
- **Presentational Components**: SchemeCard.jsx, VoiceButton.jsx (UI)

#### 3.1.2 Custom Hooks Pattern
- **useVoice.js**: Encapsulates speech recognition logic
- Reusable across components
- Manages voice state and lifecycle

#### 3.1.3 Compound Component Pattern
- **FormModal.jsx**: Self-contained form with multiple sub-components
- Internal state management
- Controlled/uncontrolled input handling

### 3.2 State Management

#### 3.2.1 Local State (useState)
- Component-specific UI state
- Form inputs
- Modal visibility
- Loading states

#### 3.2.2 Derived State
- Search results computed from schemes data
- Statistics calculated from applications
- Filtered lists based on status

#### 3.2.3 Subscription Pattern
- Real-time data updates via db.subscribe()
- Cross-tab synchronization
- Event-driven architecture

### 3.3 Data Patterns

#### 3.3.1 Repository Pattern
- **db.js**: Abstraction layer for data operations
- CRUD operations: getAll(), add(), updateStatus()
- Subscribe/unsubscribe for real-time updates

#### 3.3.2 Observer Pattern
- LocalStorage event listeners
- Custom event dispatching
- Automatic UI updates on data changes

## 4. Data Flow

### 4.1 Voice Search Flow

```
User speaks → Web Speech API → useVoice hook → transcript state
                                                      ↓
                                              handleSearch()
                                                      ↓
                                          Keyword matching algorithm
                                                      ↓
                                          Filter schemes.json
                                                      ↓
                                          setResults() → UI update
                                                      ↓
                                          TTS confirmation
```

### 4.2 Application Submission Flow

```
User fills form → FormModal state → handleFormSubmit()
                                            ↓
                                    Create application object
                                            ↓
                                        db.add()
                                            ↓
                                    localStorage.setItem()
                                            ↓
                                    Dispatch storage event
                                            ↓
                                    Trigger subscriptions
                                            ↓
                            Update UI (ApplicationList, AdminDashboard)
```

### 4.3 Admin Approval Flow

```
Admin clicks approve → handleAction() → db.updateStatus()
                                              ↓
                                    Update localStorage
                                              ↓
                                    Dispatch event
                                              ↓
                                    Subscription callback
                                              ↓
                            Real-time UI update (both tabs)
```

## 5. Database Design

### 5.1 LocalStorage Schema

#### 5.1.1 Applications Collection
**Key**: `vanischema_db_v1`

**Structure**:
```javascript
[
  {
    id: 101,                    // Unique ID (timestamp)
    user: "Ramesh Pawar",       // Applicant name
    scheme: "Kisan Credit Card", // Scheme name
    status: "Pending",          // Pending|Approved|Rejected
    date: "2024-10-24",         // Submission date
    location: "Nashik",         // User location
    age: "45",                  // Optional: age
    address: "Rampur",          // Optional: address
    aadhar: "1234",             // Optional: Aadhar last 4
    fileName: "doc.pdf"         // Optional: uploaded document
  }
]
```

### 5.2 Schemes Database (JSON)

**File**: `src/data/schemes.json`

**Structure**:
```javascript
[
  {
    id: "pm-kisan",                          // Unique scheme ID
    name: "PM-Kisan Samman Nidhi",           // Official English name
    name_hi: "पीएम-किसान सम्मान निधि",       // Official Hindi name
    local_name: "PM Farmer Support Scheme",  // Common English name
    local_name_hi: "पीएम किसान सम्मान निधि", // Common Hindi name
    description: "Financial support...",     // English description
    description_hi: "छोटे और सीमांत...",     // Hindi description
    eligibility: ["Farmer", "Land < 2ha"],   // Eligibility criteria
    benefits: "Rs 6,000 via DBT annually",   // Benefits summary
    documents: ["Aadhar", "Land Record"],    // Required documents
    keywords: ["farmer", "kisan", "खेती"]    // Search keywords
  }
]
```

### 5.3 Data Operations

#### 5.3.1 Read Operations
- `db.getAll()`: Fetch all applications
- Filter by status in component
- Sort by date (newest first)

#### 5.3.2 Write Operations
- `db.add(application)`: Insert new application
- Auto-generate ID using timestamp
- Prepend to array (newest first)

#### 5.3.3 Update Operations
- `db.updateStatus(id, status)`: Update application status
- Map through array and update matching ID
- Persist to localStorage

#### 5.3.4 Real-time Sync
- `db.subscribe(callback)`: Register listener
- Listen to storage events (cross-tab)
- Listen to custom events (same-tab)
- Return unsubscribe function

## 6. Voice AI Engine Design

### 6.1 Speech Recognition

#### 6.1.1 Configuration
```javascript
{
  continuous: true,        // Keep listening
  interimResults: true,    // Real-time feedback
  lang: 'en-IN' | 'hi-IN', // Language code
  maxAlternatives: 1       // Single best result
}
```

#### 6.1.2 Event Handlers
- **onstart**: Set listening state to true
- **onend**: Set listening state to false
- **onerror**: Log error, graceful degradation
- **onresult**: Extract transcript, update state

### 6.2 Natural Language Processing

#### 6.2.1 Intent Recognition (Search)
```javascript
// Keyword matching algorithm
const lowerQuery = query.toLowerCase();
const filtered = schemes.filter(scheme => {
  return scheme.keywords.some(k => 
    lowerQuery.includes(k.toLowerCase())
  ) || 
  scheme.name.toLowerCase().includes(lowerQuery) ||
  scheme.local_name.toLowerCase().includes(lowerQuery);
});
```

#### 6.2.2 Entity Extraction (Form Filling)
```javascript
// Regex patterns for form fields
const patterns = {
  name: /name is\s+([a-z\s]+)/i,
  age: /(\d+)\s+years/i,
  location: /from\s+([a-z\s]+)/i
};

// Extract and populate form fields
const processInputText = (text) => {
  const nameMatch = text.match(patterns.name);
  if (nameMatch) formData.name = capitalize(nameMatch[1]);
  // ... similar for age, location
};
```

### 6.3 Text-to-Speech

#### 6.3.1 Configuration
```javascript
{
  lang: 'en-IN' | 'hi-IN',  // Voice language
  rate: 0.9,                // Speech speed
  pitch: 1.0,               // Voice pitch
  volume: 1.0               // Audio volume
}
```

#### 6.3.2 Response Templates
```javascript
const responses = {
  found: (count, name) => `I found ${count} schemes. Best match is ${name}.`,
  appStarted: (name) => `Starting application for ${name}...`,
  submitted: "Your application has been submitted successfully."
};
```

## 7. UI/UX Design

### 7.1 Design Principles

#### 7.1.1 Voice-First
- Large microphone button (primary CTA)
- Visual feedback during listening
- Minimal text input required
- Audio confirmations for actions

#### 7.1.2 Accessibility
- High contrast colors (WCAG AA)
- Large touch targets (44x44px minimum)
- Clear visual hierarchy
- Icon + text labels
- Screen reader compatible

#### 7.1.3 Mobile-First
- Responsive design (320px+)
- Bottom navigation for thumb reach
- Swipeable sidebar
- Touch-optimized interactions

### 7.2 Color Palette

```css
/* Brand Colors */
--brand-primary: #2563EB;    /* Blue - Primary actions */
--brand-dark: #1E293B;       /* Dark gray - Admin theme */
--brand-darker: #0F172A;     /* Darker - Sidebar */
--brand-secondary: #10B981;  /* Green - Success */

/* Semantic Colors */
--success: #10B981;          /* Green */
--warning: #F59E0B;          /* Yellow */
--error: #EF4444;            /* Red */
--info: #3B82F6;             /* Blue */

/* Neutral Colors */
--gray-50: #F9FAFB;
--gray-100: #F3F4F6;
--gray-500: #6B7280;
--gray-800: #1F2937;
--gray-900: #111827;
```

### 7.3 Typography

```css
/* Font Family */
font-family: system-ui, -apple-system, sans-serif;

/* Font Sizes */
--text-xs: 0.75rem;    /* 12px */
--text-sm: 0.875rem;   /* 14px */
--text-base: 1rem;     /* 16px */
--text-lg: 1.125rem;   /* 18px */
--text-xl: 1.25rem;    /* 20px */
--text-2xl: 1.5rem;    /* 24px */
--text-3xl: 1.875rem;  /* 30px */

/* Font Weights */
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
```

### 7.4 Component Design

#### 7.4.1 VoiceButton
- **Size**: 80x80px (mobile), 100x100px (desktop)
- **States**: 
  - Idle: Blue gradient, pulse animation
  - Listening: Red, pulsing animation
  - Thinking: Blue, spinner animation
- **Feedback**: Haptic (if supported), visual, audio

#### 7.4.2 SchemeCard
- **Layout**: Card with left border accent
- **Sections**: 
  - Header: Scheme name + icon
  - Body: Description (3 lines max)
  - Footer: Eligibility badge + Apply button
- **Interaction**: Hover shadow, active scale

#### 7.4.3 FormModal
- **Layout**: Full-screen on mobile, modal on desktop
- **Sections**:
  - Header: Title + close button
  - Mode switcher: Voice/Text toggle
  - Input area: Voice feedback or text input
  - Form fields: Auto-filled with visual confirmation
  - Footer: Submit button
- **Animation**: Slide up from bottom

#### 7.4.4 AdminDashboard
- **Layout**: Sidebar + main content
- **Sections**:
  - Sidebar: Navigation + logout
  - Stats cards: Total, Pending, Approved
  - Table: Applications with actions
- **Responsive**: Collapsible sidebar on mobile

### 7.5 Animation Strategy

#### 7.5.1 Framer Motion Variants
```javascript
// Fade in from bottom
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

// Scale animation
const scaleIn = {
  initial: { scale: 0.9, opacity: 0 },
  animate: { scale: 1, opacity: 1 }
};

// Stagger children
const staggerContainer = {
  animate: {
    transition: { staggerChildren: 0.1 }
  }
};
```

#### 7.5.2 CSS Animations
- **Pulse**: Microphone button when listening
- **Spin**: Loading spinner
- **Slide**: Sidebar open/close
- **Fade**: Modal backdrop

## 8. Security Design

### 8.1 Authentication
- **Current**: Simple demo authentication
- **Production Recommendations**:
  - JWT-based authentication
  - Secure password hashing (bcrypt)
  - Session management
  - CSRF tokens
  - Rate limiting

### 8.2 Data Protection
- **Current**: Client-side storage only
- **Production Recommendations**:
  - HTTPS encryption
  - Server-side validation
  - Input sanitization
  - XSS prevention (React auto-escapes)
  - SQL injection prevention (if using DB)

### 8.3 Privacy
- **Current**: No external data transmission
- **Production Recommendations**:
  - GDPR compliance
  - Data encryption at rest
  - Audit logs
  - User consent management
  - Data retention policies

## 9. Performance Optimization

### 9.1 Code Splitting
```javascript
// Lazy load routes
const AdminDashboard = lazy(() => import('./components/AdminDashboard'));
const Blogs = lazy(() => import('./components/Blogs'));
```

### 9.2 Memoization
```javascript
// Memoize expensive computations
const stats = useMemo(() => ({
  total: applications.length,
  pending: applications.filter(a => a.status === 'Pending').length,
  approved: applications.filter(a => a.status === 'Approved').length
}), [applications]);
```

### 9.3 Debouncing
```javascript
// Debounce voice input processing
const debouncedProcess = useCallback(
  debounce((text) => processInputText(text), 300),
  []
);
```

### 9.4 Image Optimization
- Use SVG for icons (scalable, small size)
- Lazy load images below fold
- Use appropriate image formats (WebP)

## 10. Testing Strategy

### 10.1 Unit Testing
- **Components**: SchemeCard, VoiceButton, FormModal
- **Hooks**: useVoice
- **Services**: db.js operations
- **Utils**: NLP parsing functions

### 10.2 Integration Testing
- Voice search flow
- Form submission flow
- Admin approval flow
- Cross-tab synchronization

### 10.3 E2E Testing
- Complete user journey (search → apply → track)
- Admin workflow (login → review → approve)
- Multi-language switching
- Voice + text input modes

### 10.4 Accessibility Testing
- Screen reader compatibility
- Keyboard navigation
- Color contrast ratios
- Focus management

## 11. Deployment Architecture

### 11.1 Build Process
```bash
npm run build
# Output: dist/ folder
# - index.html
# - assets/
#   - index-[hash].js
#   - index-[hash].css
```

### 11.2 Hosting Options
- **Static Hosting**: Vercel, Netlify, GitHub Pages
- **CDN**: Cloudflare, AWS CloudFront
- **Server**: Nginx, Apache

### 11.3 Environment Configuration
```javascript
// vite.config.js
export default {
  base: '/',
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'terser'
  }
};
```

## 12. Scalability Considerations

### 12.1 Backend Migration
- Replace LocalStorage with REST API
- Database: PostgreSQL, MongoDB
- Authentication: OAuth 2.0, JWT
- File storage: AWS S3, Cloudinary

### 12.2 Microservices Architecture
```
┌─────────────┐  ┌─────────────┐  ┌─────────────┐
│   Auth      │  │   Schemes   │  │ Applications│
│   Service   │  │   Service   │  │   Service   │
└─────────────┘  └─────────────┘  └─────────────┘
       │                │                │
       └────────────────┴────────────────┘
                        │
                ┌───────▼────────┐
                │   API Gateway  │
                └────────────────┘
```

### 12.3 Caching Strategy
- Redis for session management
- CDN for static assets
- Browser caching (service workers)
- API response caching

### 12.4 Load Balancing
- Horizontal scaling with multiple instances
- Load balancer (Nginx, AWS ALB)
- Database read replicas
- Message queue for async tasks

## 13. Monitoring & Analytics

### 13.1 Application Monitoring
- Error tracking: Sentry, Rollbar
- Performance monitoring: New Relic, Datadog
- Uptime monitoring: Pingdom, UptimeRobot

### 13.2 User Analytics
- Usage metrics: Google Analytics, Mixpanel
- Voice feature adoption rate
- Application completion rate
- User flow analysis

### 13.3 Business Metrics
- Scheme discovery rate
- Application submission rate
- Admin processing time
- User satisfaction (NPS)

## 14. Internationalization (i18n)

### 14.1 Current Implementation
- Hardcoded translations in TRANSLATIONS object
- Language toggle between English/Hindi
- Separate fields for each language in data

### 14.2 Future i18n Strategy
```javascript
// Use i18next library
import i18n from 'i18next';
import { useTranslation } from 'react-i18next';

// Translation files
// locales/en/translation.json
// locales/hi/translation.json
// locales/ta/translation.json (Tamil)
// locales/te/translation.json (Telugu)

// Usage
const { t } = useTranslation();
<h1>{t('welcome_message')}</h1>
```

## 15. Error Handling

### 15.1 Voice Recognition Errors
```javascript
recognition.onerror = (event) => {
  switch(event.error) {
    case 'no-speech':
      // Show "No speech detected" message
      break;
    case 'audio-capture':
      // Show "Microphone not available" message
      break;
    case 'not-allowed':
      // Show "Microphone permission denied" message
      break;
    default:
      // Fallback to text input
  }
};
```

### 15.2 Form Validation Errors
- Required field validation
- Format validation (age, Aadhar)
- Visual error messages
- Prevent submission if invalid

### 15.3 Network Errors (Future)
- Retry mechanism with exponential backoff
- Offline queue for submissions
- User-friendly error messages
- Fallback to cached data

## 16. Accessibility Features

### 16.1 ARIA Labels
```jsx
<button 
  aria-label="Start voice search"
  aria-pressed={isListening}
>
  <Mic />
</button>
```

### 16.2 Keyboard Navigation
- Tab order optimization
- Enter key for form submission
- Escape key to close modals
- Arrow keys for navigation

### 16.3 Screen Reader Support
- Semantic HTML elements
- Live regions for dynamic content
- Descriptive link text
- Form label associations

### 16.4 Visual Accessibility
- High contrast mode support
- Focus indicators
- Color-blind friendly palette
- Scalable text (rem units)

## 17. Development Workflow

### 17.1 Git Workflow
```
main (production)
  ├── develop (staging)
  │   ├── feature/voice-search
  │   ├── feature/admin-dashboard
  │   └── bugfix/form-validation
```

### 17.2 Code Review Checklist
- [ ] Component follows single responsibility
- [ ] Proper error handling
- [ ] Accessibility attributes added
- [ ] Responsive design tested
- [ ] Performance optimized
- [ ] Code documented

### 17.3 Release Process
1. Feature development in branch
2. Code review and approval
3. Merge to develop
4. QA testing
5. Merge to main
6. Build and deploy
7. Monitor for issues

## 18. Documentation

### 18.1 Code Documentation
- JSDoc comments for functions
- Component prop types
- README for setup instructions
- API documentation (future)

### 18.2 User Documentation
- Help Center with FAQs
- Video tutorials
- Step-by-step guides
- Troubleshooting section

### 18.3 Admin Documentation
- Dashboard user guide
- Application review process
- Reporting and analytics
- System administration

## 19. Compliance & Legal

### 19.1 Data Privacy
- Privacy policy
- Terms of service
- Cookie policy
- Data processing agreement

### 19.2 Accessibility Compliance
- WCAG 2.1 AA standard
- Section 508 compliance
- ADA compliance

### 19.3 Government Regulations
- Digital India guidelines
- Aadhaar usage compliance
- Data localization requirements

## 20. Maintenance Plan

### 20.1 Regular Updates
- Security patches
- Dependency updates
- Browser compatibility fixes
- Performance improvements

### 20.2 Content Updates
- New scheme additions
- Scheme information updates
- Translation improvements
- Help content updates

### 20.3 Monitoring
- Daily uptime checks
- Weekly performance reviews
- Monthly analytics reports
- Quarterly security audits
