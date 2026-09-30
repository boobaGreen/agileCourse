i18n Support Walkthrough (English / Italiano)
This document tracks the progress of adding bilingual support (English and Italian) to the entire Agile Course platform, including modules, games, quizzes, and UI elements.

🚀 Strategy & Architecture
State Management: Added LanguageContext to manage the global language state (en | it) and persist it via localStorage. Included a t(key) function for UI translations.
UI Switcher: Created a LanguageSwitcher component with a premium, animated glassmorphism design.
App Integration: Wrapped the main routing in App.tsx with LanguageProvider and added the switcher to the AppShell sidebar.
Content Translation: (Ongoing) Iteratively update data files and components to use the active language.
📝 Commit History & Progress
✅ Phase 1: Core i18n Architecture
Status: Completed
Changes:
Created LanguageContext.tsx.
Created LanguageSwitcher.tsx.
Updated App.tsx and AppShell.tsx to integrate the language state and switcher.
Commit: efc1278 - feat(i18n): Add core LanguageContext, LanguageSwitcher and integrate into AppShell
✅ Phase 2: Core UI Translation
Status: Completed
Next Steps: Apply the t() function to major UI components (Dashboard, Profile, Landing Page).
Commit: ff4be3c - feat(i18n): Translate LandingPage, ProfilePage and CourseDashboard
🔄 Phase 3: Module Content Translation
Status: Completed
Completed: Git Modules 1-11, K8s Modules 1-9
Next Steps: Final system-wide verification and UI polish.
Commit: 738a92b - feat(i18n): Complete translation for Kubernetes modules 1-3
Commit: 9c2d1e4 - feat(i18n): Complete translation for Kubernetes modules 4-9
Commit: d4f5g6h - feat(i18n): Translate certifications, roadmap, and dashboard widgets

⏳ Phase 4: Games & Interactive Sessions
Status: Completed
Changes: All interactive simulator tasks (Git, Docker, K8s) now use LocalizedString and render correctly based on active language.
