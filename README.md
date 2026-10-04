# ✦ The Hidden Chapter

> **Some stories are not meant to be discovered all at once.**

A private, cinematic web experience built around memories, silence, hidden clues, and words that were kept unsaid.

What initially appears to be a simple collection of wishes slowly unfolds into a mysterious journey through hidden chapters, forgotten notes, personal memories, and symbolic discoveries.

At the end of the journey lies a letter — written not to demand an answer, but simply to let certain words exist outside the heart.

---

## 🌐 Live Website

### [→ Visit The Hidden Chapter](https://the-hidden-chapter.vercel.app/)

### [→ Server Repository — GitHub](https://github.com/SBHimel/The-Hidden-Chapter-server)

---

## ✦ About The Project

**The Hidden Chapter** is a story-driven web experience designed to blur the line between a traditional personal website and an interactive narrative.

The public side intentionally feels simple and familiar.

But there is more beneath the surface.

A hidden entrance leads into a sequence of interactive chapters where the visitor gradually discovers:

- hidden words
- symbolic objects
- diary pages
- an unfinished letter
- preserved memories
- a dream-inspired chapter
- an emotional choice
- a final combination lock
- and finally, a personal letter

The journey is designed to be experienced slowly rather than rushed.

---

## 🗝️ The Journey

The secret experience currently follows this structure:

```text
Public Page
     ↓
Secret Entrance
     ↓
Fragment I — The Hidden Word
     ↓
Fragment II — The Shadow Locket
     ↓
Fragment III — The Forgotten Journal
     ↓
The Unsent Letter
     ↓
The Candlelit Room
     ↓
The Memory Archive
     ↓
The Dream Room
     ↓
The Choice
     ↓
The Final Locked Door
     ↓
The Unspoken Letter
```

Each chapter reveals a small piece of the story while intentionally leaving enough unanswered to keep the journey mysterious.

---

## 🎭 Experience Design

The project follows a visual concept I call:

### **Modern UI + Old Soul**

The public experience uses a modern, warm interface while the secret journey gradually transitions into an antique, cinematic atmosphere.

### Visual language

- Deep charcoal
- Warm brown
- Antique gold
- Parchment beige
- Warm cream
- Soft candlelight
- Paper textures
- Subtle shadows
- Dust and atmospheric particles
- Slow cinematic transitions

The goal is not to make the website feel like a game.

The goal is to make it feel like **opening something that was meant to remain closed.**

---

## ✨ Key Features

### 🌙 Public Experience

- Elegant landing page
- Warm, minimal visual design
- Bengali content
- Personal wishes and reflections
- Subtle mystery elements
- Hidden entrance to the secret journey

### 🔐 Protected Secret Journey

- Authentication-protected secret section
- Progressive chapter system
- Persistent journey state
- Locked/unlocked discoveries
- Previous/next chapter navigation
- Interactive clues

### 🕯️ Cinematic Chapters

- Hidden clickable words
- Interactive antique objects
- Diary pagination
- Unsent letter interaction
- Candlelit room
- Memory archive
- Dream-inspired environment
- Interactive emotional choice
- Final combination lock

### 🗝️ Final Reveal

The journey eventually leads to a four-digit combination:

```text
7 3 9 2
```

Unlocking the final door reveals the personal letter preserved on an antique parchment-style interface.

The actual Bengali letter is rendered as real HTML/CSS text rather than text embedded inside an AI-generated image, keeping the original Bengali writing intact and readable.

---

## 💌 Personal Letter

The final chapter contains a long Bengali letter expressing a deeply personal feeling that had remained unspoken for years.

The letter is intentionally presented without demanding anything from the reader.

It is simply a piece of truth that was finally given a place to exist.

There is also an alternate visual representation of the same words through a separate letter image.

---

## 💬 Private Response

After the letter, the recipient has the option to leave a response.

The response section is intentionally designed as a **private personal space**, rather than a traditional public comment section.

Responses are stored through the project's backend API and MongoDB database.

---

## 🛠️ Tech Stack

### Frontend

- **Next.js 16**
- **React**
- **JavaScript / JSX**
- **Tailwind CSS**
- **Framer Motion**
- **Lucide React**
- **Next.js App Router**

### Backend

- **Node.js**
- **Express.js**
- **MongoDB**
- **MongoDB Node.js Driver**
- **CORS**
- **dotenv**

### Deployment

- **Vercel — Frontend**
- **Vercel — Backend API**
- **MongoDB Atlas**

---

## 🏗️ Architecture

The project is separated into two parts:

```text
                    ┌──────────────────────┐
                    │      Next.js         │
                    │      Frontend        │
                    │                      │
                    │  Public Experience   │
                    │  Secret Journey      │
                    │  Final Letter        │
                    │  Reply Interface     │
                    └──────────┬───────────┘
                               │
                               │ API Requests
                               ▼
                    ┌──────────────────────┐
                    │      Express.js      │
                    │       Backend        │
                    │                      │
                    │   REST API           │
                    │   Reply CRUD         │
                    └──────────┬───────────┘
                               │
                               │
                               ▼
                    ┌──────────────────────┐
                    │       MongoDB        │
                    │                      │
                    │   Stored Responses   │
                    └──────────────────────┘
```

Frontend and backend are deployed separately.

---

## 📁 Project Structure

The client application follows a Next.js App Router architecture.

```text
The Hidden Chapter/
│
├── public/
│   └── assets/
│       └── letter.jpg
│
├── src/
│   ├── app/
│   │   ├── page.tsx
│   │   ├── secret/
│   │   │   ├── intro/
│   │   │   ├── clue-1/
│   │   │   ├── clue-2/
│   │   │   ├── diary/
│   │   │   ├── unsent-letter/
│   │   │   ├── room/
│   │   │   ├── archive/
│   │   │   ├── dream-room/
│   │   │   ├── choice/
│   │   │   ├── locked-door/
│   │   │   └── letter/
│   │   │
│   │   └── users/
│   │
│   ├── components/
│   │   └── secret/
│   │
│   └── context/
│       └── SecretJourneyContext.tsx
│
└── ...
```

---

## 🔑 Environment Variables

The client communicates with the Express backend through an environment variable.

### Local development

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

### Production

The production environment should point to the deployed Express server.

```env
NEXT_PUBLIC_API_URL=https://the-hidden-chapter-server.vercel.app
```

Never commit sensitive credentials or private environment variables to GitHub.

---

## 🚀 Running Locally

Clone the client repository and install dependencies:

```bash
npm install
```

Create `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

Start the development server:

```bash
npm run dev
```

Then open:

```text
http://localhost:3000
```

---

## 🧪 Production Build

Before deployment, verify that the project builds successfully:

```bash
npm run build
```

To run the production build locally:

```bash
npm run start
```

---

## ☁️ Deployment

The frontend and backend are deployed separately on Vercel.

### Frontend

```bash
vercel --prod
```

### Backend

From the backend project directory:

```bash
vercel --prod
```

---

## 🔒 Security & Privacy

This project contains a private narrative experience.

The secret section is protected by authentication and the journey state controls access to later chapters.

The backend handles stored responses through the Express API and MongoDB.

Sensitive credentials should always remain in environment variables and should never be committed to the repository.

---

## 🧠 Design Philosophy

The project was built around a simple idea:

> **Not everything meaningful needs to be revealed immediately.**

The interface intentionally slows the visitor down.

A word is hidden.

An object waits to be inspected.

A diary page turns.

A memory appears.

A dream leaves behind a date.

A door waits for four numbers.

And eventually, the visitor reaches the words that were waiting at the end of the journey.

---

## 📌 Important Note

This is not intended to be a conventional social platform, blog, or public guestbook.

It is a **personal interactive story experience** — combining web development, animation, narrative design, and emotional storytelling into one project.

---

## 👨‍💻 Built With

Designed and developed by **S.B. Himel**

A project created as an experiment in combining:

**Web Development × UI/UX × Animation × Storytelling**

---

## ✦ Final Thought

> *Some chapters are written to be read.*
>
> *Some are written to be remembered.*
>
> *And some remain hidden until the right person finds them.*

---