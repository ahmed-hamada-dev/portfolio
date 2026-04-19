# School Platform 🏫

A comprehensive, production-grade school management and education platform combining school administration, real-time GPS bus tracking, an online course marketplace, a gamified Mental Math engine, and parent monitoring — all in a single monorepo.

---

## 🏗️ Architecture

```
├── server/          # Hono.js REST API with OpenAPI docs
├── frontend/        # TanStack Start (6 role-specific dashboards)
├── shared/          # Shared Zod schemas, types, i18n translations
└── mobile/          # Flutter app (Student & Driver)
```

**Backend & All Web Dashboards (Admin, Manager, Teacher, Student, Parent, Driver):** Ahmed Hamada — [GitHub](https://github.com/ahmed-hamada-dev) · [LinkedIn](https://linkedin.com/in/ahmed-hamada-dev) · [Portfolio](https://ahmed-hamada.dev/)

**Mobile App:** Flutter Developer (collaborative — student course viewing, quizzes, and real-time tracking for student & driver)

---

## 👥 Roles & Permissions (RBAC)

The platform implements a full RBAC system with 6 distinct roles, a `Permission` model, and `UserRoleAssignment` for granular, school-scoped access control.

| Role | Scope | Key Capabilities |
|---|---|---|
| **Admin** | Global | Full system control — create schools, assign managers, manage all users, review payments, ban users, approve recovery requests |
| **School Manager** | Per school | Manage school students, teachers, buses, stops, routes, and monitor transportation |
| **Teacher** | Own courses | Create courses, chapters, lessons, quizzes. School teachers serve courses free to same-school students. Independent teachers sell directly |
| **Student** | Enrolled content | Access courses, take quizzes, join chats, track bus. School students get free access to school courses |
| **Parent** | Own children | Track children's bus in real-time, receive arrival notifications, monitor trip progress |
| **Driver** | Assigned bus | Start/complete trips, send live GPS location during active trips |

---

## ✨ Core Features

### 🏛️ School Management
- Create and manage schools with address, phone, and geolocation
- Assign a dedicated manager per school
- Multi-level academic structure (e.g., First Year, Second Year, Third Year)
- Students and courses are scoped within levels

### 🚌 Real-Time Bus Tracking System
- **Live GPS Tracking** via WebSockets + Google Maps (not Firebase Realtime)
- Trip types: `PICKUP` and `DROPOFF`
- Trip statuses: `SCHEDULED` → `IN_PROGRESS` → `COMPLETED` (also `DELAYED`, `CANCELLED`, `NO_SHOW`)
- **Student Stops** — Named pickup locations with lat/lng, scoped per school
- **Bus Stops** — Ordered stop sequences per bus route with arrival timestamps
- **Trip Students** — Track individual pickup status with timestamp and location
- **Parent Notifications** — Real-time alerts when the bus reaches a student's stop
- **Trip Archiving** — Completed trips are archived as JSON with configurable retention
- **Radar** — Geo-fenced school radar points for proximity detection
- **Trip Replay** — Full playback of recorded GPS data for completed trips

### 📚 Course System
- Course creation with chapters → lessons → videos/PDFs
- Drag-and-drop curriculum builder with position-based ordering
- Course terms: Regular and Summer
- Course status: Published / Archived (with soft deletes)
- Free preview lessons
- PDF attachments per course

### 💰 Payment System (3 Scenarios)
| Scenario | Money Goes To |
|---|---|
| Student & teacher in **same school** | **Free** — auto-granted access |
| Student buys from a **school teacher** (different school) | **School Manager** |
| Student buys from an **independent teacher** | **Teacher directly** |

- Payment methods: Vodafone Cash, InstaPay
- Payment proof image upload
- Admin/Teacher approval workflow
- Access tracking with `CourseAccess` (method: `GRANTED_BY_SCHOOL`, `BOUGHT_FROM_SCHOOL`, `BOUGHT_FROM_TEACHER`)

### 🎫 Course Enrollment
- **Join Request** — Student requests, Admin/Teacher approves or rejects
- **Payment** — Submit proof, get verified access
- **School Grant** — Automatic free access for same-school students

### 🧠 Mental Math Engine (5 Modes)

A complete gamified math training ecosystem with procedural question generation and cheating-proof grading:

#### 1. Tutorial
- Guided introduction to mental math techniques

#### 2. Training (Classic)
- All equations visible simultaneously
- Configurable difficulty: Easy, Medium, Hard, Mixed
- Practice sessions with school-wide analytics and leaderboards

#### 3. Sequential (سرعة البديهة)
- Numbers and operators flash one-by-one with configurable delays
- Example: `5` → `+` → `6` (each appears then disappears)
- Forces students to calculate entirely in their heads
- Tests mental speed and working memory

#### 4. Adventure Mode (Map)
- Gamified linear progression with a visual map
- Levels with deterministic difficulty scaling
- Time limits per level
- Reward unlocks (badges, images, descriptions)
- Star-burst animations and visual celebrations
- Persistent progress tracking per user

#### 5. Competitions
- **Intra-School Competitions:**
  - Scoped to: `SCHOOL`, `LEVELS`, `STUDENTS`, or `COURSE`
  - One attempt per student within the allowed timeframe
  - Shared seed for fair, identical questions
  - Real-time leaderboard with score + time ranking
  - Multi-difficulty configs (easy/medium/hard with separate point values)

- **Inter-School Challenges:**
  - School-vs-school competitions
  - Challenge → Accept/Decline workflow
  - Scoped to: `ALL_SCHOOL`, `LEVEL`, or selected `STUDENTS`
  - Each school selects participants
  - Generated on acceptance with shared seed
  - Per-school score aggregation

**Technical Details:**
- Procedural generation using deterministic PRNG (Mulberry32) — questions are NOT stored in the database
- Same seed generates identical questions on frontend (display) and backend (grading)
- Web Audio API for real-time synthesized feedback (success chimes, failure drones, UI ticks)
- No external audio assets required

### 📝 Quiz System
- Quiz types: `COURSE`, `CHAPTER`, `LESSON`
- Question types: `MCQ`, `TRUE_FALSE`
- Media support: images, explanation videos
- Auto-graded with point-based scoring
- Attempt history with detailed answer review
- Position-based question ordering

### 💬 Chat System
- **Course Chat** — All enrolled students + assigned teacher
- **Personal Chat** — Direct messaging between student and teacher
- Permission-based access tied to course enrollment

### 🔔 Notifications
- Push notifications via **Firebase FCM**
- Multi-device token management (Android, iOS, Web)
- Triggers: bus arrival, course updates, payment status, messages, competition invites

### 🔐 Security
- **Account Banning** — Ban with reason, ban counter, admin notes
- **Unban Requests** — Students submit requests; Admin reviews (PENDING → APPROVED/REJECTED)
- **Audit Logging** — All critical operations logged with userId, action, entity, and metadata
- **Rate Limiting** — Per-user and per-IP rate limiting with configurable actions
- **Soft Deletes** — Critical entities (User, Course, Chapter, Lesson, Quiz) use `deletedAt` for data preservation

### 🌐 Bilingual Support
- Full Arabic (default) and English interface
- Shared i18n translation files in the monorepo

---

## 🛠️ Tech Stack

### Backend
| Technology | Purpose |
|---|---|
| **Hono.js** | API framework with OpenAPI |
| **Prisma** | ORM & database migrations |
| **PostgreSQL** | Primary database |
| **Redis** | Caching & rate limiting |
| **BullMQ** | Background job processing |
| **WebSockets** | Real-time GPS tracking |
| **Firebase Admin** | Push notifications (FCM) |
| **Zod** | Schema validation |
| **OpenAPI** | Auto-generated API documentation |
| **Better Auth** | Authentication |
| **Sharp** | Image processing |
| **Bun** | Runtime |

### Frontend (6 Role-Specific Dashboards)

Each role has its own dedicated dashboard with distinct views, permissions, and features:
| Technology | Purpose |
|---|---|
| **TanStack Start** | Full-stack React framework |
| **TanStack Query** | Server state management |
| **Google Maps API** | Bus tracking & trip replay |
| **Web Audio API** | Synthesized audio feedback |
| **React Hook Form + Zod** | Form handling & validation |
| **Tailwind CSS** | Styling |
| **Framer Motion** | Animations |

### Mobile
| Technology | Purpose |
|---|---|
| **Flutter** | Student course player, quizzes, real-time tracking |

### Deployment
| Technology | Purpose |
|---|---|
| **Coolify** | Self-hosted PaaS for VPS deployment |
| **VPS** | Production server with all services |
| **Docker** | Containerized backend, Redis, PostgreSQL |

---

## 📊 Database Schema Highlights

- **40+ models** covering the full domain
- **RBAC** with Role → Permission → UserRoleAssignment (school-scoped)
- **Indexed** on all high-traffic lookup fields for 100k+ user performance
- **Soft deletes** on critical academic and financial entities
- **Audit trail** for all write operations
- **Trip archiving** with JSON snapshots and configurable retention

---

## 👨‍💻 Author

**Ahmed Hamada** — Backend & Web Developer

- 🌐 [Portfolio](https://ahmed-hamada.dev/)
- 💻 [GitHub](https://github.com/ahmed-hamada-dev)
- 💼 [LinkedIn](https://linkedin.com/in/ahmed-hamada-dev)
- 📧 [contact@ahmed-hamada.dev](mailto:contact@ahmed-hamada.dev)

Open for freelance and full-time opportunities.
