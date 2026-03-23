# Student Management Backend API

A scalable and modular **Student Management System** built to demonstrate real-world backend development skills including authentication, database design, query optimization, and performance improvement using indexing.

Built using **Node.js, Express.js, TypeScript, Prisma ORM, PostgreSQL, JWT (Cookie-based Auth), and Zod**, this backend implements full CRUD operations, advanced queries, pagination, and performance benchmarking.

---
# Live API

Live Server (Vercel): https://gain-solutions-server.vercel.app/  
 

> Note: This project is currently deployed on **Vercel** for demonstration purposes.

---
# Demo Credentials

You can use the following credentials to test the API:

### Test User

- Email: mahi@gmail.com  
- Password: Mahi@2221  

---
# Features

## Secure Authentication System

- JWT-based authentication (HTTP-only cookies)
- User registration and login
- Password hashing using bcrypt
- Protected routes using middleware
- Secure cookie configuration (production-ready)

---

## Database Design

The system is built with relational database design using PostgreSQL and Prisma ORM.

### Entities:

- Institutes
- Students
- Courses
- Results

### Relationships:

- Student belongs to Institute
- Result belongs to Student and Course

---

## CRUD Operations

Full CRUD implemented for:

- Institutes
- Students
- Courses
- Results

Includes:
- Validation using Zod
- Error handling using custom AppError
- Duplicate prevention
- Data integrity checks

---

## Pagination Support

Pagination implemented for:

- Institutes
- Students
- Courses
- Results
- Top students query

Supports:
- `page`
- `limit`
- Meta response (`total`, `page`, `limit`)

---

## Advanced Queries

### Results Per Institute

- Retrieve all students and their results for a specific institute
- Includes nested relations (course + result)

### Top Courses Per Year

- Uses aggregation (`groupBy`)
- Returns most taken courses for a given year

### Top Ranking Students

- Calculates average score using aggregation
- Returns top-performing students

---

## Indexing & Query Optimization

Indexes added on:

- `studentId`
- `courseId`
- `year`
- `(year, courseId)` composite index

---

## Performance Testing (EXPLAIN ANALYZE)

Implemented API to analyze query performance:

### Features:

- Detect scan type (Sequential vs Index Scan)
- Measure execution time
- Count rows returned
- Check if index is used

---

## Performance Comparison (Before vs After Index)

Advanced comparison implemented:

- Forces sequential scan (before)
- Enables index scan (after)
- Calculates performance improvement %

---

## Seed Data (100,000 Records)
```bash
npm run seed
```
Database seeding implemented for:

- Institutes
- Students
- Courses
- Results

Used for:
- Testing performance
- Validating indexing efficiency

---

## Clean Architecture

- Modular structure
- Separation of concerns:
  - Controller
  - Service
  - Route
  - Schema
- Centralized error handling
- Reusable middleware
- Type-safe codebase with TypeScript

---

# Tech Stack

| Category        | Technology     |
| --------------- | -------------- |
| Runtime         | Node.js        |
| Language        | TypeScript     |
| Framework       | Express.js     |
| Database        | PostgreSQL     |
| ORM             | Prisma         |
| Authentication  | JWT (Cookies)  |
| Validation      | Zod            |

---

# API Endpoints

## Authentication

| Endpoint                | Method | Description        |
|------------------------|--------|--------------------|
| `/api/auth/register`   | POST   | Register user      |
| `/api/auth/login`      | POST   | Login              |
| `/api/auth/logout`     | POST   | Logout             |

---

## Institutes

| Endpoint                    | Method | Description            |
|----------------------------|--------|------------------------|
| `/api/institutes`          | POST   | Create institute       |
| `/api/institutes`          | GET    | Get all institutes     |
| `/api/institutes/:id`      | PATCH  | Update institute       |
| `/api/institutes/:id`      | DELETE | Delete institute       |

---

## Students

| Endpoint                    | Method | Description            |
|----------------------------|--------|------------------------|
| `/api/students`            | POST   | Create student         |
| `/api/students`            | GET    | Get students (paginated) |
| `/api/students/:id`        | PATCH  | Update student         |
| `/api/students/:id`        | DELETE | Delete student         |

---

## Courses

| Endpoint                    | Method | Description            |
|----------------------------|--------|------------------------|
| `/api/courses`             | POST   | Create course          |
| `/api/courses`             | GET    | Get courses (paginated) |
| `/api/courses/:id`         | PATCH  | Update course          |
| `/api/courses/:id`         | DELETE | Delete course          |

---

## Results

| Endpoint                                      | Method | Description                      |
|-----------------------------------------------|--------|----------------------------------|
| `/api/results`                                | POST   | Create result                    |
| `/api/results`                                | GET    | Get results (paginated)          |
| `/api/results/:id`                            | PATCH  | Update result                    |
| `/api/results/:id`                            | DELETE | Delete result                    |
| `/api/results/institute/:instituteId`         | GET    | Results per institute(paginated)            |
| `/api/results/top-courses?year=2024`          | GET    | Top courses per year             |
| `/api/results/top-students`                   | GET    | Top students                     |

---

## Performance APIs

| Endpoint                              | Method | Description                        |
|--------------------------------------|--------|------------------------------------|
| `/api/results/performance-test`      | GET    | Query performance analysis         |
| `/api/results/performance-compare`   | GET    | Before vs after index comparison   |

---

# Setup Instructions

## Prerequisites

- Node.js (v18+)
- PostgreSQL
- npm or yarn
- Prisma CLI

---

## 1️⃣ Clone & Install

```bash
git clone https://github.com/mdmasharafilhossain/Gain_Solutions_Server
cd Gain_Solutions_Server
npm install
```
## 2️⃣ Setup Environment Variables

Create a `.env` file:

```bash
DATABASE_URL="postgresql://database_name:database_password@localhost:port/name?schema=public"
PORT=5000
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=1d
BCRYPT_SALT_ROUNDS=12
INSTITUTE_ID=48c99905-847e-4e2e-b587-e2ccd7219191
```

---

## 3️⃣ Prisma Setup

```bash
npx prisma generate
npx prisma migrate dev
```

---

## 4️⃣ Run Development Server

```bash
npm run dev
```

---
# Query Performance Example

## Query

```sql
SELECT * FROM Result WHERE year = 2024;
```
Before Index:
```bash
Scan Type: Sequential Scan
Execution Time: ~13.002 ms
```
After Index:
```bash
Scan Type: Bitmap Index Scan
Execution Time: ~5.9 ms
```
Improvement
~54% faster query execution

---

