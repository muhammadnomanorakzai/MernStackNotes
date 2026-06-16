export const reactDesignPatterns = {
  id: "react-design-patterns",
  title: "React Design Patterns",
  category: "React",
  difficulty: "Advanced",
  tags: [
    "Design Patterns",
    "HOC",
    "Render Props",
    "Compound Components",
    "Architecture",
    "Reusability",
    "Senior Level",
  ],

  definition:
    "React Design Patterns are established architectural solutions for recurring development challenges. They provide a structured way to share logic between components, manage complex UI states, and build highly reusable component libraries. Key patterns include Higher Order Components (HOC), Render Props, and Compound Components.",

  simpleExplanation:
    "Design patterns are like 'Proven Recipes' for building software. Instead of trying to invent a new way to share code every time, we use these patterns that senior developers have perfected over years. For example, if you want several components to have the same logic, you can wrap them in a 'Decorator' (HOC) or give them a 'Function' to help them render (Render Props).",

  romanUrduRevision:
    "React design patterns code ko reusable aur clean banane ke liye use hote hain. HOC (Higher Order Component) ek component leta hai aur ek naya enhanced component return karta hai. Render Props mein hum ek function pass karte hain jo UI render karti hai. Compound components (jaise <Select> aur <Option>) mil kar ek complex widget banate hain.",

  why: "In large-scale apps, code duplication leads to bugs and maintenance nightmares. Mastering these patterns allows you to build 'Headless UI' libraries, manage complex forms, and separate your UI (visuals) from your Logic (data), which is the hallmark of a senior engineer.",

  how: [
    "Step 1 - Higher Order Components: Wrap a component in a function that adds extra props or functionality (e.g., withAuth(MyComponent)).",
    "Step 2 - Render Props: Pass a function as a prop (usually called 'render' or as 'children') that returns JSX.",
    "Step 3 - Compound Components: Use 'Context API' inside a parent component to coordinate state between multiple related children.",
    "Step 4 - Custom Hooks: (The modern alternative) Move shared logic into a hook to avoid 'wrapper hell'.",
    "Step 5 - Choose the simplest pattern for your specific use case—don't overcomplicate things.",
  ],

  diagram: `
flowchart TD
    A[Component Logic] --> B{Reusability Pattern?}
    B -- "Enhance multiple components" --> C[HOC - Higher Order Component]
    B -- "Dynamic rendering logic" --> D[Render Props]
    B -- "Complex related UI set" --> E[Compound Components]
    B -- "Pure logic / Utility" --> F[Custom Hooks]
    style C fill:#3498db,color:white
    style E fill:#9b59b6,color:white
  `,

  analogy:
    "HOC is like a 'Superpower Suit' (e.g., Iron Man's suit)—you step into it and suddenly you can fly. Render Props is like a 'Universal Remote'—you provide the signal (data), and the remote decides how to control the TV. Compound Components are like a 'LEGO Set'—multiple small pieces that only make sense when they are put together in a specific box.",

  realLifeExample:
    "Compound Components: Think of an HTML '<select>' and '<option>'. The '<option>' knows it's inside a select, and the '<select>' knows which option is clicked. You can't use an option alone. In React, we build tabs, accordions, and dropdowns using this exact Compound Pattern.",

  code: `
// 1. COMPOUND COMPONENTS (Modern Style)
const Tabs = ({ children }) => {
  const [activeTab, setActiveTab] = useState(0);
  return (
    <TabContext.Provider value={{ activeTab, setActiveTab }}>
      <div className="tabs-container">{children}</div>
    </TabContext.Provider>
  );
};

Tabs.Tab = ({ index, children }) => {
  const { activeTab, setActiveTab } = useContext(TabContext);
  return (
    <button className={activeTab === index ? 'active' : ''} onClick={() => setActiveTab(index)}>
      {children}
    </button>
  );
};

// Usage
<Tabs>
  <Tabs.Tab index={0}>Home</Tabs.Tab>
  <Tabs.Tab index={1}>Profile</Tabs.Tab>
</Tabs>


// 2. HIGHER ORDER COMPONENT (HOC)
const withLogging = (WrappedComponent) => {
  return (props) => {
    useEffect(() => console.log("Component Mounted"), []);
    return <WrappedComponent {...props} />;
  };
};

const EnhancedButton = withLogging(SimpleButton);
  `,

  commonMistakes: [
    "Over-using HOCs, which leads to 'Wrapper Hell' and makes debugging difficult in DevTools.",
    "Forgetting to pass '...props' through an HOC, causing child components to lose their original props.",
    "Using these complex patterns when a simple 'Custom Hook' would have been cleaner and more readable.",
    "Not establishing a clear API for Compound Components, causing confusion for other developers.",
  ],

  interviewSummary: [
    "HOC is a function that takes a component and returns a new component.",
    "Render Props allow components to share code via a function prop.",
    "Compound Components manage state implicitly between related children using Context.",
    "Hooks have largely replaced HOCs and Render Props for simple logic sharing, but Patterns remain vital for UI libraries.",
  ],
};
