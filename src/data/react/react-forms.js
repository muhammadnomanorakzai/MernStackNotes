export const reactForms = {
  id: "react-forms",
  title: "Forms in React",
  category: "React",
  difficulty: "Intermediate",
  tags: [
    "Forms",
    "Controlled Components",
    "Uncontrolled Components",
    "useRef",
    "useState",
    "React Hook Form",
    "Validation",
  ],

  definition:
    "Handling forms in React involves managing the state of input elements (text, checkboxes, selects). There are two primary patterns: Controlled Components (state is handled by React) and Uncontrolled Components (state is handled by the DOM). For complex forms, libraries like React Hook Form are the industry standard for performance and validation.",

  simpleExplanation:
    "Forms are how users give data to your app. In React, we usually like to have 'Total Control' over everything. So, whenever a user types a letter, we save it in a variable (Controlled). However, doing this for 50 inputs can make your app slow. That's why we use tools like 'React Hook Form' to make large forms fast and easy to validate.",

  romanUrduRevision:
    "Forms handle karne ke do tareeqe hain: Controlled (useState se) aur Uncontrolled (useRef se). Chote forms ke liye useState theek hai, magar bade aur complex validation wale forms ke liye 'React Hook Form' best hai kyunki yeh unnecessary re-renders ko rokta hai.",

  why: "Forms are the primary point of user interaction. Without proper form management, your app can feel sluggish, show incorrect validation errors, or lose data. Senior developers choose the right pattern (Controlled vs Uncontrolled) based on performance needs and form complexity.",

  how: [
    "Step 1 - Decide between 'Controlled' (for simple UI feedback) or 'React Hook Form' (for performance).",
    "Step 2 - For Controlled: map input 'value' to state and 'onChange' to a setter function.",
    "Step 3 - For Uncontrolled: use 'useRef' to grab values directly when the form is submitted.",
    "Step 4 - Use 'React Hook Form' register and handleSubmit for modern, scalable forms.",
    "Step 5 - Implement validation logic (e.g., checking for empty strings or email formats).",
  ],

  diagram: `
flowchart TD
    A[User Types] --> B{Strategy?}
    B -- "Controlled" --> C[Update React State]
    C --> D[Re-render Input]
    B -- "Uncontrolled" --> E[DOM stores value]
    B -- "Hook Form" --> F[Internal ref tracking]
    F --> G[Re-render ONLY on error/submit]
    style F fill:#ec5990,color:white
  `,

  analogy:
    "Controlled components are like a helicopter parent—they want to know every single move the child (Input) makes. Uncontrolled components are like a chill parent—they let the child play, and only ask what they did at the end of the day (Submit). React Hook Form is like a smart teacher—they keep the kids organized and only intervene if someone breaks a rule (Validation).",

  realLifeExample:
    "A Login Page: Since you only have two fields (Email/Password), Controlled components are perfect. You can instantly disable the login button if the email doesn't have an '@' symbol. For a massive Signup form with 20 fields, you'd use React Hook Form so the typing stays silky smooth.",

  code: `
// 1. CONTROLLED COMPONENT (Manual)
function SimpleForm() {
  const [name, setName] = useState('');
  return (
    <input value={name} onChange={(e) => setName(e.target.value)} />
  );
}

// 2. REACT HOOK FORM (Professional Standard)
import { useForm } from 'react-hook-form';

function ModernForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  
  const onSubmit = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email', { required: true })} />
      {errors.email && <span>Email is required!</span>}
      <button type="submit">Submit</button>
    </form>
  );
}
  `,

  commonMistakes: [
    "Updating massive global state on every single keystroke in a form (causes severe lag).",
    "Forgetting to call 'event.preventDefault()' in a manual submit handler.",
    "Mixing controlled and uncontrolled patterns on a single input (leads to sync bugs).",
    "Hardcoding validation logic that becomes impossible to read in large forms.",
  ],

  interviewSummary: [
    "Controlled components offer the most predictable UI but can impact performance on large forms.",
    "React Hook Form minimizes re-renders by using uncontrolled inputs under the hood (Refs).",
    "The register function connects your input to the form library's validation logic.",
    "Schema-based validation with libraries like Zod or Yup is the modern way to handle form rules.",
  ],
};
