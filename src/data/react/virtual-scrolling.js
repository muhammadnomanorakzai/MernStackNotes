export const virtualScrolling = {
  id: "virtual-scrolling",
  title: "Virtual Scrolling & Large Lists",
  category: "React",
  difficulty: "Advanced",
  tags: [
    "Virtualization",
    "Large Lists",
    "Performance",
    "List Rendering",
    "Windowing",
    "react-window",
    "react-virtualized",
  ],

  definition:
    "Virtualization (or Windowing) is a performance optimization for rendering massive data sets. Instead of creating thousands of DOM nodes for a long list, it only renders the small portion of the list that is currently visible on the screen. As the user scrolls, the nodes are recycled or swapped out.",

  simpleExplanation:
    "Imagine you have a book with 10,000 pages. Instead of printing the whole book and trying to hold it all in your hands (making it too heavy to move), you only print the 2 pages you are currently reading. As you flip the page, you quickly print the next one and throw away the previous one. This makes the 'book' very light and easy to handle.",

  romanUrduRevision:
    "Virtual scrolling tab kaam aati hai jab aap ke paas hazaron records hon (e.g., 10,000 users ki list). Browser itne saare components handle karte waqt hang ho jata hai. Virtualization sirf wo items render karti hai jo screen par dikh rahe hon. Isse app bohot fast ho jati hai.",

  why: "Rendering 5,000+ complex items in the DOM will make the browser stutter, scroll laggy, and use massive amounts of memory. Virtualization keeps the DOM size constant (only 10-20 items), regardless of whether the total list size is 100 or 100,000.",

  how: [
    "Step 1 - Use a library like 'react-window' or 'react-virtualized'.",
    "Step 2 - Specify the total count of items and the height of each item.",
    "Step 3 - Provide a 'Row' component that takes an 'index' prop.",
    "Step 4 - The library automatically calculates which rows should be in the DOM based on the scroll position.",
    "Step 5 - Use 'FixedSizeList' for items with equal height, or 'VariableSizeList' for dynamic heights.",
  ],

  diagram: `
flowchart TD
    subgraph "The DOM (Browser)"
    A[Visible Item 1]
    B[Visible Item 2]
    C[Visible Item 3]
    end
    D[Hidden Data Item 4]
    E[Hidden Data Item 5]
    F[Hidden Data Item 10,000]
    
    G[Scroll Down] --> H[Item 1 removed from DOM]
    G --> I[Item 4 added to DOM]
    style A fill:#2ecc71
    style B fill:#2ecc71
    style C fill:#2ecc71
  `,

  analogy:
    "Think of a security guard watching 50 cameras on 1 single monitor. They don't have 50 monitors on the wall (too expensive/bulky). They have 1 monitor and they switch the view to whichever camera needs attention. The 'monitor' is your screen, and the 'Switching' is virtualization.",

  realLifeExample:
    "Instagram or Facebook Feeds: They have millions of posts, but your phone only ever contains the code for the 3 or 4 posts you are looking at right now. As you scroll, the old ones are cleared and new ones are loaded instantly.",

  code: `
import { FixedSizeList as List } from 'react-window';

const Row = ({ index, style }) => (
  <div style={style} className="border-b">
    Row {index}: This is rendered dynamically only when visible!
  </div>
);

function HugeList() {
  return (
    <List
      height={400}
      itemCount={100000} // 100,000 items!
      itemSize={35}      // pixels
      width={300}
    >
      {Row}
    </List>
  );
}
  `,

  commonMistakes: [
    "Trying to manually build a virtual list from scratch (edge cases for scroll speed are very difficult).",
    "Not providing an explicit height for the list container (virtualization needs to know the 'window' size).",
    "Using virtualization for small lists (under 100 items), where the library overhead is greater than the benefit.",
    "Forgetting to pass the 'style' prop to the Row component (this is how items are positioned).",
  ],

  interviewSummary: [
    "Virtualization reduces the number of DOM nodes produced for large lists.",
    "It maintains performance by keeping memory usage constant regardless of data volume.",
    "React-window is the modern, lightweight recommendation for virtualization.",
    "It uses absolute positioning and calculated offsets to simulate a long scrollable area.",
  ],
};
