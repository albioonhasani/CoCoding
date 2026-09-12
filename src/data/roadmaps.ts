import type { Roadmap, RoadmapStep } from '@/types/content'

const step = (id: string, title: string, description: string, estimatedMinutes: number, concepts: string[], resourceIds: string[], challengeTopics: string[]): RoadmapStep => ({ id, title, description, difficulty: 'beginner', estimatedMinutes, concepts, resourceIds, challengeTopics })

export const roadmaps: Roadmap[] = [
  { id: 'web-development-beginner', title: 'Web Development Beginner', description: 'Learn how a web page is structured, styled, and published.', category: 'Web Development', accent: 'bg-brand-500', steps: [
    step('web-programming-basics', 'How the web works', 'Get oriented with browsers, servers, and the files that make up a website.', 45, ['browser', 'server', 'files'], ['cs50-youtube'], ['web concepts']),
    step('web-html-semantics', 'HTML and semantic content', 'Structure a meaningful page with headings, links, lists, and forms.', 90, ['HTML', 'semantic elements', 'forms'], ['mdn-learn-html'], ['semantic page']),
    step('web-css-layout', 'CSS and responsive layout', 'Style content and build layouts that adapt to different screen sizes.', 120, ['selectors', 'box model', 'flexbox'], ['mdn-learn-css', 'fcc-responsive-web'], ['responsive card']),
    step('web-git-basics', 'Git and GitHub basics', 'Track changes and share a project using a repository.', 60, ['repository', 'commit', 'branch'], ['github-hello-world'], ['first commit']),
    step('web-project', 'Build a personal webpage', 'Combine HTML and CSS into a small, complete responsive page.', 150, ['planning', 'responsive design', 'deployment'], ['fcc-responsive-web'], ['portfolio page']),
  ] },
  { id: 'javascript-beginner', title: 'JavaScript Beginner', description: 'Build core JavaScript skills, then use them to make web pages interactive.', category: 'JavaScript', accent: 'bg-violet-500', steps: [
    step('js-variables', 'Variables and data types', 'Store values and recognise strings, numbers, booleans, and more.', 45, ['let', 'const', 'data types'], ['mdn-js-guide'], ['variables']),
    step('js-conditionals', 'Conditionals', 'Make a program choose between paths with comparisons and if statements.', 45, ['if', 'else', 'comparison'], ['mdn-js-guide'], ['conditionals']),
    step('js-loops', 'Loops', 'Repeat useful work with for and while loops.', 60, ['for', 'while', 'iteration'], ['mdn-js-guide'], ['loops']),
    step('js-functions', 'Functions', 'Group reusable behaviour and pass information through parameters.', 60, ['functions', 'parameters', 'return'], ['mdn-js-guide'], ['functions']),
    step('js-arrays', 'Arrays', 'Collect, access, and update ordered data.', 60, ['arrays', 'index', 'length'], ['mdn-js-guide'], ['arrays']),
    step('js-objects', 'Objects', 'Model related information using properties and values.', 60, ['objects', 'properties', 'dot notation'], ['mdn-js-guide'], ['objects']),
    step('js-array-methods', 'Array methods', 'Transform and filter collections with modern array methods.', 75, ['map', 'filter', 'find'], ['javascript-info'], ['array methods']),
    step('js-dom', 'DOM basics', 'Select page elements and respond to user actions.', 90, ['DOM', 'events', 'selectors'], ['javascript-info'], ['DOM interaction']),
    step('js-async', 'Async JavaScript', 'Understand promises and async functions without blocking the page.', 90, ['promises', 'async', 'await'], ['javascript-info'], ['async flow']),
    step('js-apis', 'APIs and fetch', 'Request and display data from a web API.', 90, ['fetch', 'JSON', 'HTTP'], ['javascript-info'], ['fetch data']),
    step('js-project', 'Small projects', 'Put the pieces together in a small interactive application.', 180, ['debugging', 'scope', 'composition'], ['javascript-info'], ['interactive project']),
  ] },
  { id: 'python-beginner', title: 'Python Beginner', description: 'Learn clear, practical Python for problem-solving and small scripts.', category: 'Python', accent: 'bg-emerald-500', steps: [
    step('py-basics', 'Python basics', 'Run Python code and work with names, strings, and numbers.', 60, ['variables', 'strings', 'numbers'], ['python-tutorial', 'cs50-youtube'], ['python values']),
    step('py-control-flow', 'Control flow', 'Use conditions and loops to guide a program’s behaviour.', 75, ['if', 'for', 'while'], ['python-tutorial'], ['python loops']),
    step('py-functions', 'Functions', 'Write reusable functions and test their outputs.', 75, ['def', 'parameters', 'return'], ['python-tutorial', 'exercism-python'], ['python functions']),
    step('py-collections', 'Lists and dictionaries', 'Organise and look up related information.', 75, ['lists', 'dictionaries', 'iteration'], ['python-tutorial'], ['collections']),
    step('py-files', 'Files and errors', 'Read simple files and handle expected problems safely.', 75, ['files', 'exceptions', 'with'], ['python-tutorial'], ['file reader']),
    step('py-project', 'Small Python project', 'Build a command-line tool that solves a real small task.', 150, ['planning', 'functions', 'debugging'], ['exercism-python'], ['command-line project']),
  ] },
  { id: 'react-beginner', title: 'React Beginner', description: 'Use React to compose interfaces from reusable, interactive components.', category: 'React', accent: 'bg-sky-500', steps: [
    step('react-components', 'Components and JSX', 'Describe interface pieces as reusable React components.', 75, ['components', 'JSX', 'props'], ['react-learn'], ['profile component']),
    step('react-state', 'State and events', 'Respond to user actions and remember changing information.', 90, ['useState', 'events', 'rendering'], ['react-learn'], ['counter']),
    step('react-lists', 'Lists and conditional UI', 'Render collections and choose what the user sees.', 75, ['map', 'keys', 'conditional rendering'], ['react-learn'], ['task list']),
    step('react-sharing-state', 'Sharing state', 'Lift state up when components need to coordinate.', 90, ['lifting state', 'controlled components', 'data flow'], ['react-learn'], ['accordion']),
    step('react-effects', 'Effects and data flow', 'Synchronise with external systems using effects thoughtfully.', 90, ['useEffect', 'dependencies', 'cleanup'], ['react-learn'], ['timer']),
    step('react-project', 'Small React project', 'Build and refine a focused interactive interface.', 180, ['component design', 'state', 'accessibility'], ['react-learn'], ['small app']),
  ] },
]
