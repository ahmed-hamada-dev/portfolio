# Brave Online 

A large-scale, production-ready education ERP platform with role-based dashboards, real-time communication, and secure enrollment workflows. Built with a monorepo architecture supporting both web and mobile clients.

**🔗 Live:** [braveonline.online](https://braveonline.online/)

---

##  Architecture

This project follows a **monorepo** structure:

```
├── server/          # Hono.js REST API with OpenAPI docs
├── frontend/        # TanStack Start (Admin & Teacher dashboards)
├── shared/          # Shared types, Zod schemas, i18n translations
└── mobile/          # Flutter app (Student-facing)
```

- **Backend & Web Dashboards:** Ahmed Hamada — [GitHub](https://github.com/ahmed-hamada-dev) · [LinkedIn](https://linkedin.com/in/ahmed-hamada-dev) · [Portfolio](https://ahmed-hamada.dev/)
- **Mobile App:** Flutter Developer (collaborative)

---

##  Key Features

### 👥 Role-Based Access Control
- **Admin** — Full system control: manage users, courses, universities, payments, QR codes, and all platform settings.
- **Teacher** — Manage assigned courses: create chapters, lessons, videos, PDFs. View enrolled students and revenue.
- **Student** — Access enrolled courses, take quizzes, join chats, and track learning progress.

###  Academic Hierarchy
- Organized structure: **University → College → Department → Level**
- All courses, students, teachers, and content are scoped within this hierarchy.

###  Course Management
- Create, edit, publish, and archive courses
- Drag-and-drop curriculum builder (Chapters → Lessons → Videos/PDFs)
- Discount and coupon system
- Draft/publish workflow
- Term types: Regular and Summer

###  Enrollment System (3 Methods)
1. **Join Request** — Student submits, Admin/Teacher approves or rejects.
2. **QR Code** — Admin generates single-use QR codes in batches. Each code activates course access instantly.
3. **Payment** — Student submits payment proof (Vodafone Cash / InstaPay). Admin/Teacher verifies.

###  Time-Based Course Access
- All course access is controlled through `CourseAccess` records with start and expiration dates.
- Access is automatically revoked upon expiration.
- No user directly "owns" a course — access is always time-bound.

###  Real-Time Chat System
- **Course Chat** — Group chat for all enrolled students + teacher.
- **Private Chat** — Direct messaging between student and course teacher.
- **Support Chat** — Student ↔ Admin communication.
- Permission-based access tied to course enrollment.

###  Notifications
- Push notifications via **Firebase FCM**
- Triggers: new courses, new lessons, messages, access approval/expiration.

###  Device-Based Security (Mobile Only)
- Each student account is bound to **one device** via `deviceId`.
- Device mismatch on login → account temporarily blocked.
- **Device Recovery** — Student submits a recovery request; Admin approves/rejects.
- Admins and Teachers are exempt from device restrictions.

### 🌐 Bilingual Support
- Full **Arabic (default)** and **English** interface.
- Shared i18n translation files (`ar.json`, `en.json`) in the shared folder.

---

##  Tech Stack

### Backend
| Technology | Purpose |
|---|---|
| **Hono.js** | API framework |
| **Prisma** | ORM & database migrations |
| **PostgreSQL** | Primary database |
| **Redis** | Caching & session management |
| **BullMQ** | Background job processing |
| **Firebase Admin** | Push notifications (FCM) |
| **Zod** | Schema validation |
| **OpenAPI** | Auto-generated API documentation |
| **Better Auth** | Authentication |
| **Sharp** | Image processing |
| **Bun** | Runtime |

### Frontend (Admin & Teacher Dashboards)
| Technology | Purpose |
|---|---|
| **TanStack Start** | Full-stack React framework |
| **TanStack Query** | Server state management |
| **React Hook Form + Zod** | Form handling & validation |
| **Tailwind CSS** | Styling |

### Mobile
| Technology | Purpose |
|---|---|
| **Flutter** | Cross-platform mobile app |

---

##  Admin Dashboard

The admin dashboard provides a centralized control panel with:

- **Analytics Overview** — Total revenue, active courses, total students, pending payments.
- **Time-Range Filtering** — Today, 7 days, 30 days, 3 months, 6 months, 1 year, all time.
- **Course Performance** — Best-selling courses by selected period.
- **Device Recovery** — Manage pending device recovery requests.
- **Full Sidebar Navigation** — Dashboard, Universities, Teachers, Students, Advertisements, Device Recovery, Notifications, Settings, Banks.

---

##  System Rules

- Users **never own courses directly** — all access is time-based via `CourseAccess`.
- QR codes are **single-use** and cannot be reused.
- Teachers can **only manage their own courses**.
- Admin can **override any action**.
- Permissions are enforced in **backend logic**, not database roles.

---

## 👨‍💻 Author

**Ahmed Hamada** — Backend & Web Developer

- 🌐 [Portfolio](https://ahmed-hamada.dev/)
- 💻 [GitHub](https://github.com/ahmed-hamada-dev)
- 💼 [LinkedIn](https://linkedin.com/in/ahmed-hamada-dev)
- 📧 [contact@ahmed-hamada.dev](mailto:contact@ahmed-hamada.dev)

Open for freelance and full-time opportunities.
