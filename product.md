# Product Overview

## Smartchat - AI Chat Application

A full-stack chat application that enables users to communicate with an AI assistant through a clean, responsive web interface. The system forwards chat requests to an n8n webhook for AI processing and maintains conversation history with session management.

## Core Features

- **Real-time Chat**: Send and receive messages from AI with fast response times
- **Chat History Management**: Save, view, rename, and delete conversation threads
- **Session Persistence**: Maintain user sessions across page reloads using sessionStorage
- **Responsive UI**: Optimized for mobile, tablet, and desktop devices
- **Accessibility**: WCAG 2.1 AA compliant with ARIA labels and keyboard navigation
- **PWA Support**: Progressive Web App with offline capabilities and installable on mobile devices

## Architecture

The application follows a **monorepo structure** with separate frontend and backend:

- **Frontend**: Next.js 15 with React 19, TypeScript, and Tailwind CSS
- **Backend**: Express.js serverless API with Prisma ORM and PostgreSQL database
- **Integration**: Backend forwards chat requests to n8n webhook for AI processing

## Language

All UI text, comments, error messages, and documentation are in **Bahasa Indonesia**.
