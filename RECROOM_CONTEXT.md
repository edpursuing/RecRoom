# The Rec Room - Project Context

## Overview

The Rec Room is a peer discovery and resource sharing platform for the Pursuit AI Fellowship L2 cohort. It allows classmates to share learning resources, discover each other's skills, and connect via Slack.

**Builders:** Edwin Perez & Nefera (Paula Lawton)
**Deadline:** Saturday, February 8, 2026 (morning presentation)

---

## Supabase Configuration

```
Project URL: https://avctzjhsjrwtkmutfrrm.supabase.co
Anon Key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF2Y3R6amhzanJ3dGttdXRmcnJtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA0MDE2NDIsImV4cCI6MjA4NTk3NzY0Mn0.Qzc4_mrPj5tiAcKT2svkkzhVx1ab1V5izzrjOFieTM0
```

**Database Tables:**
- `profiles` - 13 records (classmate profiles with photos)
- `resources` - empty (users will add)
- `upvotes` - empty (tracks who upvoted what)

**Storage:**
- Bucket: `avatars` (public) - contains 13 profile photos

---

## Tech Stack

- **Frontend:** React 18 + Vite
- **Routing:** React Router v6
- **Styling:** Plain CSS with CSS variables
- **Database:** Supabase (PostgreSQL)
- **Hosting:** Vercel
- **Icons:** Lucide React

---

## Database Schema

```sql
-- Profiles
CREATE TABLE profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  photo_url TEXT,
  title TEXT NOT NULL,
  skills TEXT[] NOT NULL,
  ask_me_about TEXT NOT NULL,
  how_i_can_help TEXT,
  what_id_like_to_explore TEXT,
  slack_handle TEXT NOT NULL,
  slack_profile_url TEXT,
  linkedin_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Resources
CREATE TABLE resources (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  url TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('tutorial', 'video', 'article', 'tool', 'docs', 'other')),
  topics TEXT[] NOT NULL,
  description TEXT NOT NULL,
  submitted_by UUID REFERENCES profiles(id),
  upvote_count INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Upvotes
CREATE TABLE upvotes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  resource_id UUID REFERENCES resources(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(resource_id, user_id)
);
```

---

## Project Structure

```
rec-room/
├── public/
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── NavBar.jsx
│   │   ├── ProfileCard.jsx
│   │   ├── ProfileDetail.jsx
│   │   ├── ResourceCard.jsx
│   │   ├── ResourceForm.jsx
│   │   ├── SkillTag.jsx
│   │   ├── SkillFilter.jsx
│   │   ├── UpvoteButton.jsx
│   │   ├── SlackButton.jsx
│   │   ├── Modal.jsx
│   │   ├── EmptyState.jsx
│   │   └── LoadingSpinner.jsx
│   │
│   ├── pages/
│   │   ├── LoginPage.jsx
│   │   ├── HomePage.jsx
│   │   ├── ProfilesPage.jsx
│   │   ├── ProfileDetailPage.jsx
│   │   └── ResourcesPage.jsx
│   │
│   ├── hooks/
│   │   ├── useAuth.js
│   │   ├── useProfiles.js
│   │   ├── useResources.js
│   │   └── useUpvote.js
│   │
│   ├── lib/
│   │   ├── supabase.js
│   │   ├── constants.js
│   │   └── helpers.js
│   │
│   ├── styles/
│   │   └── global.css
│   │
│   ├── App.jsx
│   └── main.jsx
│
├── .env
├── .env.example
├── .gitignore
├── package.json
├── vite.config.js
└── README.md
```

---

## Design System

### Colors
```css
--color-red: #D32F2F;
--color-red-dark: #B71C1C;
--color-gold: #F5A623;
--color-gold-light: #FFF3E0;
--color-white: #FFFFFF;
--color-black: #1A1A1A;
--color-gray-dark: #424242;
--color-gray-mid: #6B7280;
--color-gray-light: #F5F5F5;
--color-gray-border: #E5E7EB;
```

### Skill Tag Colors
```javascript
const SKILL_COLORS = {
  'React': '#3B82F6',
  'JavaScript': '#EAB308',
  'TypeScript': '#2563EB',
  'Python': '#22C55E',
  'Node.js': '#16A34A',
  'SQL': '#F97316',
  'HTML/CSS': '#EF4444',
  'Git/GitHub': '#6B7280',
  'API Design': '#8B5CF6',
  'AI/ML': '#EC4899',
  'UI/UX Design': '#F59E0B',
  'Project Management': '#10B981',
  'Backend Development': '#059669',
  'Cybersecurity': '#DC2626',
  'Data Analysis': '#14B8A6',
};
```

### Typography
- Headings: 'Playfair Display', serif
- Body: 'Source Sans 3', sans-serif

---

## Features (MVP Scope)

### 1. Login Page
- Dropdown with all classmate names
- Select name → taken to Home
- No passwords (trust-based for cohort)
- Store current user in localStorage

### 2. Home Page
- Welcome message with user's name
- First-visit banner (dismissable, stored in localStorage)
- Two cards: "Browse Classmates" and "Resource Library"
- "Share a Resource" CTA

### 3. Profiles Page
- Grid of profile cards (3 columns on desktop)
- Skill filter chips (multi-select)
- Each card shows: photo, name, title, skills, "Ask me about"
- Click card → Profile Detail page

### 4. Profile Detail Page
- Full profile with photo, name, title, skills
- "Message on Slack" button (deep link using slack_profile_url)
- "LinkedIn" button (if URL exists)
- "Ask me about" section (prominent)
- "How I Can Help" and "What I'd Like to Explore" (two columns)
- Resources shared by this person

### 5. Resources Page
- Type filter buttons: All, Tutorial, Video, Article, Tool, Docs
- Topic filter chips (same as skills)
- Sort dropdown: Most Upvoted, Most Recent
- Resource cards (compact): icon, title, tags, author, upvote button
- "Add Resource" button → opens modal

### 6. Add Resource Modal
- URL input (required)
- Title input (required)
- Type dropdown (required)
- Topics multi-select (required)
- Description textarea (required)
- Submit → adds to database

### 7. Upvote Functionality
- Click upvote → toggles on/off
- Filled arrow (gold) = upvoted, outline arrow (gray) = not upvoted
- Updates upvote_count in resources table
- Tracks in upvotes table (prevents duplicates)

---

## Slack Deep Link

Extract member ID from slack_profile_url and create deep link:

```javascript
function getSlackDeepLink(profileUrl) {
  if (!profileUrl) return null;
  const match = profileUrl.match(/\/team\/(U[A-Z0-9]+)/);
  if (match) {
    return `https://slack.com/app_redirect?channel=${match[1]}`;
  }
  return null;
}
```

---

## Authentication (Simple)

No real auth — just name selection stored in localStorage:

```javascript
// On login
localStorage.setItem('recroom_user', JSON.stringify({ id, name }));

// Get current user
const user = JSON.parse(localStorage.getItem('recroom_user'));

// On logout
localStorage.removeItem('recroom_user');
```

---

## Build Order

1. Project setup (Vite, dependencies, env vars)
2. Supabase client + constants
3. Global CSS
4. App.jsx with router
5. LoginPage
6. NavBar
7. HomePage
8. ProfileCard component
9. ProfilesPage (with filtering)
10. ProfileDetailPage
11. ResourceCard component
12. ResourcesPage
13. ResourceForm modal
14. UpvoteButton functionality
15. Polish and deploy

---

## Empty States

- Profiles (no filter match): "No classmates match your filters" + Clear button
- Resources (no data): "No resources yet. Be the first to share!" + Add button
- Resources (no filter match): "No resources match your filters" + Clear button

---

## Environment Variables

```
VITE_SUPABASE_URL=https://avctzjhsjrwtkmutfrrm.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF2Y3R6amhzanJ3dGttdXRmcnJtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA0MDE2NDIsImV4cCI6MjA4NTk3NzY0Mn0.Qzc4_mrPj5tiAcKT2svkkzhVx1ab1V5izzrjOFieTM0
```

---

## Deployment (Vercel)

1. Push to GitHub
2. Connect repo to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

Build command: `npm run build`
Output directory: `dist`

---

## Key Files Reference

- UI Mockup: RecRoom_UI_Mockup.html (interactive preview)
- PRD: RecRoom_PRD_v3_Simplified.md (full spec)
- Presentation: RecRoom_Presentation.pptx (for Saturday demo)
