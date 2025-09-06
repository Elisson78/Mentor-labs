# Overview

Mentor Labs is a comprehensive educational gamification platform that connects mentors and students through AI-powered tools and interactive learning experiences. The platform features automated quiz generation from video content, personalized learning tracks, gamified dashboards, and AI-assisted mentorship creation. Built as a monorepo with separate frontend and backend applications, it serves both mentors and students with role-based access and personalized experiences.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: Next.js 15 with React 19 and TypeScript
- **Styling**: TailwindCSS with shadcn/ui components for consistent design system
- **Animation**: Framer Motion for smooth transitions and interactive elements
- **State Management**: React hooks with custom hooks for complex logic (useVideoAnalysis, useProfile)
- **Authentication**: Custom authentication system with localStorage and cookie-based sessions
- **Routing**: Next.js App Router with middleware for route protection based on user roles

## Backend Architecture
- **API Layer**: Next.js API routes with tRPC for type-safe API calls
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Authentication**: Custom session-based authentication with role-based access control (mentor/student/admin)
- **File Structure**: Monorepo architecture with separate apps for web and server components

## Data Storage Solutions
- **Primary Database**: PostgreSQL (Replit Database) with Drizzle ORM
- **Schema Design**: Profiles table for user management with user_type field for role differentiation
- **Session Management**: Combination of localStorage, cookies, and server-side validation
- **Data Validation**: Zod schemas for runtime type checking and validation

## Gamification System
- **Student Dashboard**: XP/points system, level progression, achievement badges, and learning tracks
- **Learning Paths**: Gamified map interface with unlockable levels and progress tracking
- **Quiz System**: Interactive quizzes with scoring, feedback, and reward mechanisms
- **Progress Tracking**: Visual progress indicators and milestone celebrations

## Authentication and Authorization
- **Custom Auth System**: Built specifically for Replit deployment without external dependencies
- **Role-Based Access**: Three user types (admin, mentor, student) with distinct dashboard experiences
- **Middleware Protection**: Route-level protection with automatic redirects based on user roles
- **Session Persistence**: Multi-layer session storage (localStorage + cookies) for reliability

# External Dependencies

## AI Services
- **OpenAI/OpenRouter API**: Powers video analysis and automatic quiz generation from YouTube, Vimeo, and direct video files
- **Google AI SDK**: Alternative AI provider for content generation and analysis
- **AI SDK React**: Provides hooks and utilities for streaming AI responses and chat interfaces

## Database Services
- **Replit PostgreSQL Database**: Primary data storage with automatic DATABASE_URL configuration
- **Drizzle ORM**: Type-safe database operations with automated migrations

## UI and Animation Libraries
- **shadcn/ui**: Complete component library built on Radix UI primitives
- **Framer Motion**: Animation library for smooth transitions and interactive elements
- **Lucide React**: Icon system for consistent visual elements
- **Radix UI**: Headless UI components for accessibility and customization

## Development Tools
- **Turborepo**: Monorepo management for efficient builds and development workflow
- **TypeScript**: Full type safety across frontend and backend
- **TailwindCSS**: Utility-first CSS framework with custom design tokens
- **React Query (TanStack)**: Server state management and caching

## Third-Party Integrations
- **Video Platforms**: YouTube and Vimeo URL processing for automated content analysis
- **File Upload**: Custom file upload system for media attachments in quizzes
- **Email Services**: Configured for user notifications and system communications (implementation ready)