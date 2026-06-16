export const reactArchitecture = {
  id: "react-architecture",
  title: "React Architecture Best Practices",
  category: "React",
  difficulty: "Advanced",
  tags: [
    "Architecture",
    "Folder Structure",
    "Scalability",
    "Separation of Concerns",
    "Clean Code",
    "Senior Level",
    "Maintenance",
  ],

  definition:
    "React Architecture is the high-level organization of your codebase to ensure it remains maintainable, scalable, and testable as it grows. It includes decisions about folder structure, component categorization, state management strategy, and the separation of UI (Presentational) from Logic (Business/Data).",

  simpleExplanation:
    "Architecture is like the 'Blueprint' of a skyscraper. If you build a house without a plan, it might be fine. But if you try to build a 100-story tower without a plan, it will collapse. Professional React apps follow a strict folder structure so that any new developer can join the team and know exactly where to find a button, an API call, or a helper function.",

  romanUrduRevision:
    "React architecture codes ko organized rakhne ka tareeqa hai. Folder structure (features, components, hooks, services) hamesha clear hona chahiye. Business logic ko UI se alag (Separation of Concerns) rakhna zaroori hai taake app scalable ho aur testing mein asani ho.",

  why: "Most React apps start clean but become a 'Big Ball of Mud' after 6 months. Good architecture prevents this by enforcing rules like 'Feature-based folders' or 'Atomic Design'. This makes the app easier to refactor, reduces merge conflicts, and ensures performance doesn't degrade over time.",

  how: [
    "Step 1 - Group by Feature: Create folders for specific features (e.g., /features/auth, /features/cart) instead of just /components.",
    "Step 2 - Separate UI and Logic: Use custom hooks for all logic; keep components primarily focused on rendering JSX and styles.",
    "Step 3 - Use 'Index' files (Barrels): Export everything from a folder through an index.js to keep imports clean.",
    "Step 4 - Atomic Design: Categorize components into Atoms (buttons), Molecules (search bar), and Organisms (navbar).",
    "Step 5 - Absolute Imports: Configure your project to use symbols like '@' for imports (e.g., import X from '@/components/X') to avoid messy relative paths.",
  ],

  diagram: `
flowchart TD
    subgraph "src Folder"
    A[index.js / App.js] --> B[routes/]
    B --> C[features/]
    C --> D[auth/]
    C --> E[products/]
    D --> F[components/]
    D --> G[hooks/]
    D --> H[services/]
    A --> I[shared/]
    I --> J[ui/ - atoms]
    I --> K[utils/]
    end
    style C fill:#f39c12,color:white
    style I fill:#3498db,color:white
  `,

  analogy:
    "Think of a professional kitchen. There's a section for meat, a section for vegetables, and a section for washing dishes. The chefs (Components) don't go into the storage room (Services) themselves; they have an assistant (Hooks) bring them the ingredients. This organization allows them to serve hundreds of customers without confusion.",

  realLifeExample:
    "A senior-led project: Instead of a 'GeneralComponents' folder with 200 files, they have a 'Features' folder. Inside the 'Payment' feature, you'll find the 'PaymentButton', the 'useCreditCardValidation' hook, and the 'paymentService' API call. This makes the code for Payment completely self-contained and easy to find.",

  code: `
// RECOMMENDED FOLDER STRUCTURE

/*
src/
  ├── api/              # Axios instances & interceptors
  ├── assets/           # Images, fonts, styles
  ├── components/       # Shared UI components (Atoms)
  ├── features/         # Logic grouped by feature domain
  │   ├── dashboard/
  │   │   ├── components/
  │   │   ├── hooks/
  │   │   └── index.js  # Public API for this feature
  ├── hooks/            # Global shared hooks
  ├── layouts/          # Page layouts (Navbar + Footer)
  ├── providers/        # All context providers
  ├── utils/            # Helper functions
  └── main.jsx
*/

// Example of Separation of Concerns (Logic in Hook)
function UserDisplay() {
  const { user, loading } = useUserData(); // Logic is isolated
  
  if (loading) return <Spinner />;
  return <div>{user.name}</div>; // UI is clean
}
  `,

  commonMistakes: [
    "Letting components grow to 500+ lines (break them down!).",
    "Importing files using '../../../../' (use absolute imports/aliases).",
    "Putting all business logic inside useEffect (extract it to custom hooks/services).",
    "Not having a consistent naming convention (PascalCase for components, camelCase for files/hooks).",
  ],

  interviewSummary: [
    "Separation of Concerns: Decouple logic (hooks) from presentation (components).",
    "Feature-based Folder Structure: Organizes code by what it *does*, not just what it *is*.",
    "Colocation: Keep code as close to where it's used as possible.",
    "Atomic Design: A mental model for component hierarchy (atoms to pages).",
  ],
};
