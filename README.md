# FitCheck
Fitcheck is a social fashion rating app where users upload outfits, rate each other’s fits, and climb daily leaderboards.

## Overview
FitCheck is a mobile-first web app that lets users:
- upload outfit photos
- browse other users’ fits in a swipeable carousel
- rate fits using a 0–100 slider
- view daily leaderboards based on average ratings
- comment on fits and interact socially

The app is built with a modern full-stack architecture using **Next.js**, **FastAPI**, **PostgreSQL**, and **Supabase** for storage.

## Features

### Fit Uploading
- Users can upload outfit images.
- Images stored in Supabase buckets.
- Metadata stored in PostgreSQL.

### Rating System
- Users rate each other’s fits with a slider (0–100).
- Backend stores ratings and updates average rating per post.
- Duplicate ratings prevented.

### Daily Leaderboard
- Shows users ranked by their **average rating for the day**.
- Pulls ratings created within the last 24 hours.
- Uses friendships to create a "friends-only" leaderboard.

### Friend System
- Users can add/remove friends.
- Leaderboard and feed show fits from friends first.

### Comments & Interaction
- Users can comment on fits.
- UI supports real-time comment updates.

### Authentication
- Login + token system through the FastAPI backend.
- Frontend stores JWT in localStorage.
- Protected routes gated by auth context.

### Modern Responsive UI
- Built using **Next.js (App Router)** and **React**.
- TailwindCSS + ShadCN UI components.
- Fully mobile optimized for swipe interactions.

## Tech Stack

### Frontend
- Next.js (React)
- TailwindCSS
- ShadCN UI
- Context-based authentication
- Supabase storage for images

### Backend
- FastAPI
- PostgreSQL (via Supabase)
- SQLAlchemy ORM
- JWT authentication
- Rating, comments, posts, and friend endpoints

### Database
- Supabase PostgreSQL
- Tables include:
  - `users`
  - `posts`
  - `ratings`
  - `average_ratings`
  - `friends`
  - `comments`