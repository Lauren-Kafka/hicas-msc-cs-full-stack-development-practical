export const quizData = {
  title: "React Fundamentals Final Exam",
  description: "Test your knowledge on React hooks, components, and state management lifecycle. You must score 80% to pass.",
  questions: [
    {
      id: 1,
      question: "Which of the following hooks is used for performing side effects in functional components?",
      options: [
        "useState",
        "useEffect",
        "useContext",
        "useReducer",
        "useMemo"
      ],
      correctAnswerIndex: 1,
      explanation: "useEffect is specifically designed to handle side effects in functional components like data fetching and document manipulation."
    },
    {
      id: 2,
      question: "What happens when you call setState() in React?",
      options: [
        "React merges the object you provide into the current state",
        "React completely replaces the old state with the new one",
        "React mutates the existing state directly",
        "React destroys the component and recreates it",
        "React immediately forces the DOM to evaluate the layout"
      ],
      correctAnswerIndex: 0,
      explanation: "In class components, setState() performs a shallow merge. In hooks, the setter function completely replaces the state instead of merging."
    },
    {
      id: 3,
      question: "Which hook should be used to memoize an expensive computation function between renders?",
      options: [
        "useCallback",
        "useMemo",
        "useRef",
        "useEffect",
        "useTransition"
      ],
      correctAnswerIndex: 1,
      explanation: "useMemo is used to memoize values resulting from expensive calculations, while useCallback is used to memoize the actual function definitions."
    },
    {
      id: 4,
      question: "What is the primary purpose of React.Fragment?",
      options: [
        "To apply styles to multiple CSS elements",
        "To create a reference to an underlying DOM node",
        "To group a list of children without adding extra nodes to the DOM",
        "To prevent a component from rendering unnecessarily",
        "To inject context deeply into the component tree"
      ],
      correctAnswerIndex: 2,
      explanation: "Fragments let you group a list of children without adding extra div wrappers or nodes to the HTML DOM."
    },
    {
      id: 5,
      question: "Which of these is NOT a rule of React Hooks?",
      options: [
        "Only call hooks at the top level",
        "Don't call hooks inside loops or conditions",
        "Only call hooks from React function components or custom hooks",
        "Hooks must always start with the word 'use'",
        "Hooks must be called in exactly the same order on every render"
      ],
      correctAnswerIndex: 3,
      explanation: "While starting with 'use' is a strongly enforced convention/lint rule, the strict architectural rules focus on the runtime call order and execution environment."
    }
  ]
};
