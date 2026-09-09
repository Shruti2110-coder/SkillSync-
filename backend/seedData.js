// Demo catalogue used by seed.js.
const L = (title, duration) => ({ title, duration, videoUrl: "https://example.com/video" });

export const COURSES = [
  {
    title: "React Fundamentals",
    subtitle: "Think in components, not pages",
    description:
      "Start from an empty file and build up to a working app. You will learn how React actually re-renders, why keys matter in lists, and how to keep state in the right place instead of scattering it across the tree.",
    price: 0, level: "Beginner", category: "Frontend", instructor: "Ananya Rao",
    lessons: [
      L("Why React exists", "9m"), L("JSX and the component model", "14m"),
      L("Props, and passing data down", "11m"), L("useState and the render cycle", "17m"),
      L("Lists, keys and reconciliation", "13m"), L("useEffect without the footguns", "21m"),
    ],
  },
  {
    title: "Node.js & Express APIs",
    subtitle: "Build the backend your frontend deserves",
    description:
      "A practical walk through building a REST API: routing, middleware, MongoDB with Mongoose, and JWT authentication. Ends with the error handling and validation most tutorials skip.",
    price: 0, level: "Intermediate", category: "Backend", instructor: "Rohit Menon",
    lessons: [
      L("HTTP, and what a server really does", "12m"), L("Routing and middleware", "16m"),
      L("Modelling data with Mongoose", "19m"), L("Password hashing with bcrypt", "14m"),
      L("JWT authentication end to end", "23m"), L("Error handling and validation", "15m"),
      L("Deploying to production", "18m"),
    ],
  },
  {
    title: "Tailwind CSS in Practice",
    subtitle: "Design in the markup, ship faster",
    description:
      "Utility-first CSS stops being strange once you build a couple of real layouts. Covers responsive design, dark mode, extracting components, and keeping long class strings readable.",
    price: 0, level: "Beginner", category: "Frontend", instructor: "Meera Shah",
    lessons: [
      L("The utility-first idea", "10m"), L("Spacing, type and colour scales", "13m"),
      L("Responsive layouts with breakpoints", "16m"), L("Flexbox and grid utilities", "15m"),
      L("Dark mode that actually works", "12m"),
    ],
  },
  {
    title: "MongoDB for Developers",
    subtitle: "Model documents without regretting it later",
    description:
      "When to embed and when to reference, how indexes change everything, and how to write aggregation pipelines that answer real product questions.",
    price: 0, level: "Intermediate", category: "Backend", instructor: "Rohit Menon",
    lessons: [
      L("Documents, collections, and the mental shift", "11m"),
      L("Embed or reference?", "18m"), L("Indexes and query performance", "20m"),
      L("The aggregation pipeline", "24m"), L("Transactions and consistency", "16m"),
    ],
  },
  {
    title: "JavaScript: The Hard Parts",
    subtitle: "Closures, async, and the event loop",
    description:
      "The parts of JavaScript that stay confusing until someone draws them for you. Execution contexts, the call stack, closures, promises, and what await is really doing.",
    price: 0, level: "Intermediate", category: "Fundamentals", instructor: "Ananya Rao",
    lessons: [
      L("The call stack and execution context", "17m"), L("Closures, and why they leak", "22m"),
      L("this, bind, call, apply", "15m"), L("The event loop, visually", "19m"),
      L("Promises from first principles", "21m"), L("async/await and error propagation", "18m"),
    ],
  },
  {
    title: "Git & GitHub for Teams",
    subtitle: "Stop being afraid of rebase",
    description:
      "Branching strategies, resolving conflicts calmly, rewriting history safely, and reviewing pull requests in a way teammates appreciate.",
    price: 0, level: "Beginner", category: "Tooling", instructor: "Karan Iyer",
    lessons: [
      L("Commits, branches, and the DAG", "14m"), L("Merge vs rebase", "16m"),
      L("Resolving conflicts without panic", "13m"), L("Interactive rebase and history", "18m"),
      L("Pull requests and code review", "12m"),
    ],
  },
  {
    title: "System Design Foundations",
    subtitle: "From one server to many",
    description:
      "How systems grow: caching, load balancing, replication, queues, and the trade-offs behind each. Built around real scenarios rather than buzzwords.",
    price: 0, level: "Advanced", category: "Architecture", instructor: "Karan Iyer",
    lessons: [
      L("Latency, throughput, and bottlenecks", "16m"), L("Caching strategies", "20m"),
      L("Load balancing and statelessness", "18m"), L("Database replication and sharding", "25m"),
      L("Message queues and async work", "19m"), L("Designing a URL shortener", "27m"),
    ],
  },
  {
    title: "TypeScript for React Developers",
    subtitle: "Types that help instead of fight",
    description:
      "Add TypeScript to a React codebase without drowning in generics. Typing props, hooks, context, and API responses, plus how to read the error messages.",
    price: 0, level: "Intermediate", category: "Frontend", instructor: "Meera Shah",
    lessons: [
      L("Why types, and how much", "10m"), L("Typing props and children", "15m"),
      L("Hooks with generics", "18m"), L("Typing API responses safely", "17m"),
      L("Reading TypeScript errors", "14m"),
    ],
  },
  {
    title: "REST API Design",
    subtitle: "Interfaces other developers enjoy",
    description:
      "Resource naming, status codes that mean something, pagination, versioning, and writing documentation people can follow.",
    price: 0, level: "Intermediate", category: "Backend", instructor: "Priya Nair",
    lessons: [
      L("Resources and naming", "12m"), L("Status codes with intent", "14m"),
      L("Pagination and filtering", "16m"), L("Versioning without breaking clients", "15m"),
      L("Documentation that stays current", "13m"),
    ],
  },
  {
    title: "Web Accessibility Essentials",
    subtitle: "Build for everyone, by default",
    description:
      "Semantic HTML, keyboard navigation, focus management, colour contrast, and testing with a screen reader. Small habits that make a large difference.",
    price: 0, level: "Beginner", category: "Frontend", instructor: "Priya Nair",
    lessons: [
      L("Why accessibility, concretely", "11m"), L("Semantic HTML does most of the work", "16m"),
      L("Keyboard navigation and focus", "18m"), L("Colour and contrast", "12m"),
      L("Testing with a screen reader", "20m"),
    ],
  },
  {
    title: "Testing JavaScript Applications",
    subtitle: "Confidence, not coverage numbers",
    description:
      "What to test and what to skip. Unit tests with Vitest, component tests with Testing Library, and end-to-end flows that catch real regressions.",
    price: 0, level: "Intermediate", category: "Tooling", instructor: "Karan Iyer",
    lessons: [
      L("What is worth testing", "13m"), L("Unit tests with Vitest", "17m"),
      L("Testing React components", "21m"), L("Mocking network requests", "15m"),
      L("End-to-end tests that survive", "19m"),
    ],
  },
  {
    title: "Deploying Full-Stack Apps",
    subtitle: "From localhost to a real URL",
    description:
      "Environment variables, build pipelines, deploying a React frontend and a Node backend, connecting a managed database, and reading logs when something breaks at 2am.",
    price: 0, level: "Beginner", category: "DevOps", instructor: "Priya Nair",
    lessons: [
      L("Environments and secrets", "14m"), L("Building for production", "13m"),
      L("Deploying the frontend", "16m"), L("Deploying the API", "18m"),
      L("Managed databases and network access", "15m"), L("Logs, alerts and debugging live", "17m"),
    ],
  },
];

export const ACCOUNTS = [
  { name: "Demo Admin", email: "admin@skillsync.dev", password: "admin1234", role: "admin" },
  { name: "Demo Student", email: "student@skillsync.dev", password: "student1234", role: "user" },
];
