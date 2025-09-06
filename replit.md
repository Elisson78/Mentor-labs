# Educational Platform - MentorLabs

## Overview

MentorLabs is a modern educational platform that combines AI-powered video analysis with gamified learning experiences. The platform enables mentors to create interactive quizzes and mentorships while providing students with an engaging gamified learning journey. Built with a monorepo architecture using Turborepo, it leverages modern web technologies to deliver a comprehensive educational experience with AI-driven content generation and smart video analysis capabilities.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: Next.js 15 with React 19 for modern component architecture
- **UI Components**: Radix UI with shadcn/ui for consistent, accessible design system
- **Styling**: TailwindCSS for utility-first CSS approach
- **State Management**: TanStack Query for server state with custom hooks
- **Animation**: Framer Motion for smooth, interactive animations
- **Routing**: App Router with middleware-based route protection
- **Build Tool**: Turborepo for efficient monorepo builds

### Backend Architecture
- **API Layer**: Next.js API Routes with tRPC for type-safe client-server communication
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Authentication**: Hybrid approach with local auth and Supabase integration
- **AI Integration**: Multiple AI providers (OpenAI, Google AI) with OpenRouter as proxy
- **Video Processing**: Automated video analysis for educational content generation

### Data Storage Design
- **Primary Database**: PostgreSQL with optimized schema for educational content
- **Schema Structure**: 
  - User profiles with role-based access (mentor/student)
  - Quiz and question entities with AI-generated content tracking
  - Session management for quiz attempts and progress tracking
  - Video processing metadata for AI analysis results

### Authentication & Authorization
- **Dual Auth System**: Local authentication with Supabase integration for scalability
- **Role-Based Access**: Mentor, student, and admin roles with route-level protection
- **Session Management**: JWT-based with middleware validation
- **Security**: Protected routes with automatic redirection based on user roles

### Gamification System
- **Progress Tracking**: XP-based leveling system with achievement badges
- **Learning Paths**: Structured curriculum with prerequisite-based progression
- **Interactive Elements**: Gamified quiz interface with real-time feedback
- **Visual Progress**: Animated progress maps and level indicators

## External Dependencies

### AI Services
- **OpenRouter**: Primary AI gateway for multiple model access (GPT-4, Claude, Gemini)
- **OpenAI API**: Direct integration for advanced language models
- **Google AI SDK**: Gemini integration for video content analysis

### Database & Infrastructure
- **PostgreSQL**: Primary database for production environments
- **Supabase**: Authentication provider and potential database hosting
- **Docker**: Containerization for consistent deployment environments

### Development Tools
- **Turborepo**: Monorepo management and build optimization
- **Drizzle Kit**: Database schema management and migrations
- **TypeScript**: Type safety across the entire application stack

### Deployment Platforms
- **Coolify**: Self-hosted deployment platform integration
- **Docker Compose**: Multi-service orchestration for production deployments
- **Hetzner Cloud**: Cloud infrastructure hosting solution

### UI & Design Libraries
- **Lucide React**: Consistent icon system
- **Next Themes**: Dark/light mode theme management
- **Sonner**: Toast notification system
- **TW Animate CSS**: Extended animation utilities for Tailwind

### Third-party Integrations
- **YouTube API**: Video metadata extraction and content analysis
- **Video Processing**: AI-powered content analysis for educational material generation
- **Email Services**: User communication and notification systems (configurable)