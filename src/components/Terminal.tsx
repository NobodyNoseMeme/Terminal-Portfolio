import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal as TerminalIcon, X, Minimize2, Maximize2, Download } from 'lucide-react';
import { useTheme } from './ThemeProvider';

interface TerminalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Command {
  input: string;
  output: string;
  timestamp: Date;
}

const Terminal: React.FC<TerminalProps> = ({ isOpen, onClose }) => {
  const [commands, setCommands] = useState<Command[]>([]);
  const [currentInput, setCurrentInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isMinimized, setIsMinimized] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const quickCommands = [
    { cmd: 'whoami', desc: 'About Abdullah' },
    { cmd: 'skills', desc: 'Tech Stack' },
    { cmd: 'projects', desc: 'My Work' },
    { cmd: 'experience', desc: 'Work History' },
    { cmd: 'contact', desc: 'Get in Touch' },
    { cmd: 'clear', desc: 'Clear Terminal' },
  ];

  const responses = {
    whoami: [
      "🤖 AbduBot here! I'm Abdullah's digital buddy. He's a Software Engineering student at UCP with a 3.6 CGPA. Not bad for someone who probably drinks too much coffee! ☕",
      "👨‍💻 Meet Muhammad Abdullah Uzair - a full-stack developer who thinks debugging is a sport. Currently studying Software Engineering at University of Central Punjab.",
      "🚀 Abdullah Uzair: Software Engineering student, full-stack developer, and professional bug hunter. I'm his terminal sidekick - think of me as his digital wingman!"
    ],
    skills: [
      "💻 Abdullah's arsenal includes:\n• Frontend: HTML5, CSS3, JavaScript, React, Tailwind CSS\n• Backend: PHP, Node.js, Express.js\n• Databases: MySQL, MongoDB\n• Tools: Git, VS Code, Postman\n• Languages: C, C++, Python, JavaScript\n\nHe's basically a walking tech stack! 🤓",
      "🛠️ Tech Skills Breakdown:\n• Web Dev: HTML5, CSS3, Bootstrap, Tailwind CSS (92%)\n• Programming: JavaScript (88%), PHP (85%), Python (75%)\n• Databases: MySQL (88%), MongoDB (82%)\n• Other: SEO (88%), Git (90%), Problem Solving (92%)\n\nNot to brag, but he's pretty good at this stuff! 😎"
    ],
    projects: [
      "🚀 Abdullah's Project Showcase:\n\n• MacroMate - AI-powered health & fitness tracker (Final year project)\n• XRevStudio.com - Creative agency portfolio\n• ObecheInterior.com - Interior design landing page\n• LevelUpSol.com.pk - Corporate website\n• CricketX.net - Sports platform enhancement\n\nEach one built with love, caffeine, and probably some late-night debugging sessions! 🌙",
      "📂 Project Portfolio:\n\n1. MacroMate (AI/ML + React + Node.js) - His crown jewel!\n2. XRevStudio - Stunning creative portfolio\n3. ObecheInterior - Elegant interior design site\n4. LevelUpSol - Professional corporate website\n5. CricketX - Sports platform with responsive design\n\nWant to see them? Just ask for 'demo' or 'github'! 🔗"
    ],
    experience: [
      "💼 Work Experience (4+ Years):\n\n• SEO Specialist at Web20Ranker (Jul 2024 - Apr 2025)\n  - Created SEO workflows (40% efficiency boost)\n  - Built ranking signal systems\n  - Enhanced Web 2.0 backlink strategies\n\n• Web Designer Intern at LevelUp Solutions (Apr 2024 - Jul 2024)\n  - Developed responsive landing pages\n  - Improved UI/UX (25% engagement increase)\n  - Cross-browser compatibility master\n\n4+ years of turning coffee into code! ☕➡️💻"
    ],
    education: [
      "🎓 Educational Journey:\n\n• BSc Software Engineering (2022-2026)\n  University of Central Punjab, Lahore\n  CGPA: 3.6/4.0 (In Progress)\n\n• FSc Pre-Engineering (2019-2021)\n  Govt. College of Science Lahore\n  First Division\n\nBuilding that academic foundation one semester at a time! 📚"
    ],
    contact: [
      "📞 Want to reach Abdullah? Here's how:\n\n• Email: abdullahuzair860@gmail.com\n• Phone: 03034673255\n• LinkedIn: linkedin.com/in/abdullah-uzair-2a18b9278/\n• Location: Lahore, Pakistan\n\nHe's always up for a good tech conversation! Just don't call during debugging hours... 🐛",
      "🤝 Let's Connect!\n\n📧 abdullahuzair860@gmail.com\n📱 03034673255\n🌍 Lahore, Pakistan\n💼 LinkedIn: abdullah-uzair-2a18b9278\n\nFair warning: He might talk your ear off about the latest JavaScript framework! 😄"
    ],
    help: [
      "🤖 AbduBot Command Center:\n\n• whoami - Learn about Abdullah\n• skills - View tech stack\n• projects - See his work\n• experience - Work history\n• education - Academic background\n• contact - Get in touch\n• joke - Developer humor\n• quote - Motivational quotes\n• coffee - Virtual caffeine\n• download resume - Get his CV\n• theme - Toggle dark/light mode\n• clear - Clean the terminal\n\nI'm like a Swiss Army knife, but for portfolio info! 🔧"
    ],
    joke: [
      "😂 Why do programmers prefer dark mode?\n\nBecause light attracts bugs! 🐛\n\n(Abdullah definitely agrees with this one!)",
      "🤓 How many programmers does it take to change a light bulb?\n\nNone. That's a hardware problem! 💡",
      "😄 Why do Java developers wear glasses?\n\nBecause they can't C#! 👓\n\n(Abdullah knows both, so he's got 20/20 vision!)",
      "🎯 A SQL query goes into a bar, walks up to two tables and asks:\n\n'Can I join you?' 🍺"
    ],
    quote: [
      "💡 'Code is like humor. When you have to explain it, it's bad.' - Cory House\n\n(Abdullah's code is pretty self-explanatory though! 😉)",
      "🚀 'The best error message is the one that never shows up.' - Thomas Fuchs\n\n(Abdullah's debugging skills are on point! 🎯)",
      "⚡ 'First, solve the problem. Then, write the code.' - John Johnson\n\n(Words Abdullah lives by! 💪)",
      "🎨 'Clean code always looks like it was written by someone who cares.' - Robert C. Martin\n\n(Abdullah definitely cares about his craft! ❤️)"
    ],
    coffee: [
      "☕ Brewing virtual coffee...\n\n████████████ 100%\n\n*sip* Ahh! Nothing like virtual caffeine to fuel those coding sessions! Abdullah probably needs the real thing though. 😴",
      "☕ *Coffee machine noises*\n\nBEEP BEEP! Your virtual espresso is ready! ☕\n\nFun fact: Abdullah runs on coffee and clean code. Mostly coffee. 😂"
    ]
  };

  const typos = {
    'skils': 'skills',
    'skilz': 'skills',
    'projets': 'projects',
    'projet': 'projects',
    'experiance': 'experience',
    'experince': 'experience',
    'contakt': 'contact',
    'contat': 'contact',
    'educaton': 'education',
    'educaion': 'education'
  };

  useEffect(() => {
    if (isOpen && !isMinimized) {
      const welcomeMessage = "🤖 AbduBot v2.0 initialized successfully!\n\n👋 Hey there! I'm AbduBot, Abdullah's digital buddy and your friendly neighborhood terminal assistant!\n\n💡 Type 'help' to see what I can do, or try commands like 'whoami', 'skills', or 'projects'.\n\nLet's explore Abdullah's world together! 🚀";
      
      setCommands([{
        input: 'system',
        output: welcomeMessage,
        timestamp: new Date()
      }]);
    }
  }, [isOpen, isMinimized]);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [commands]);

  const typeResponse = async (response: string): Promise<void> => {
    return new Promise((resolve) => {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        resolve();
      }, Math.min(response.length * 20, 2000));
    });
  };

  const getRandomResponse = (key: keyof typeof responses): string => {
    const responseArray = responses[key];
    return responseArray[Math.floor(Math.random() * responseArray.length)];
  };

  const handleCommand = async (input: string) => {
    const cmd = input.toLowerCase().trim();
    let output = '';

    // Check for typos
    if (typos[cmd as keyof typeof typos]) {
      output = `🤔 Did you mean '${typos[cmd as keyof typeof typos]}'? I'm pretty good at reading minds, but typos still confuse me! Try again with the correct spelling.`;
    } else {
      switch (cmd) {
        case 'whoami':
        case 'about':
          output = getRandomResponse('whoami');
          break;
        case 'skills':
        case 'tech':
        case 'technologies':
          output = getRandomResponse('skills');
          break;
        case 'projects':
        case 'work':
        case 'portfolio':
          output = getRandomResponse('projects');
          break;
        case 'experience':
        case 'job':
        case 'career':
          output = getRandomResponse('experience');
          break;
        case 'education':
        case 'study':
        case 'university':
          output = getRandomResponse('education');
          break;
        case 'contact':
        case 'reach':
        case 'connect':
          output = getRandomResponse('contact');
          break;
        case 'help':
        case 'commands':
          output = getRandomResponse('help');
          break;
        case 'joke':
        case 'funny':
          output = getRandomResponse('joke');
          break;
        case 'quote':
        case 'motivation':
        case 'inspire':
          output = getRandomResponse('quote');
          break;
        case 'coffee':
        case 'caffeine':
          output = getRandomResponse('coffee');
          break;
        case 'download resume':
        case 'resume':
        case 'cv':
          output = "📄 Initiating resume download...\n\n*Beep boop* Unfortunately, I can't actually download files (I'm just a chatbot, not a file server! 😅), but you can contact Abdullah directly for his latest resume!\n\nTry: 'contact' for his details! 📞";
          break;
        case 'theme':
        case 'toggle':
          toggleTheme();
          output = `🎨 Theme switched to ${theme === 'light' ? 'dark' : 'light'} mode! Looking good! ✨`;
          break;
        case 'clear':
        case 'cls':
          setCommands([]);
          return;
        case 'github':
        case 'code':
          output = "🔗 Abdullah's GitHub: github.com\n\nCheck out his repositories and contributions! Warning: You might get lost in the code for hours! 🤓";
          break;
        case 'demo':
        case 'live':
          output = "🌐 Live Demos:\n\n• MacroMate - AI Health Tracker\n• XRevStudio - Creative Portfolio\n• ObecheInterior - Interior Design\n• LevelUpSol - Corporate Website\n\nEach project showcases different skills and technologies! 🚀";
          break;
        case 'age':
          output = "🤖 I'm as old as this terminal session! Abdullah, on the other hand, is a young and energetic developer born to code! 👶💻";
          break;
        case 'location':
        case 'where':
          output = "📍 Abdullah is based in Lahore, Pakistan - the heart of innovation and great food! 🍛\n\nFun fact: Lahore is known for its rich culture and amazing tech community! 🏛️";
          break;
        case '':
          return;
        default:
          const suggestions = ['whoami', 'skills', 'projects', 'experience', 'contact', 'help'];
          const randomSuggestion = suggestions[Math.floor(Math.random() * suggestions.length)];
          output = `🤷‍♂️ Command '${input}' not found in my database!\n\nI'm smart, but not THAT smart! Try 'help' for available commands, or maybe '${randomSuggestion}'?\n\nRemember: I'm here to talk about Abdullah, not solve world hunger! 🌍`;
      }
    }

    await typeResponse(output);
    
    setCommands(prev => [...prev, {
      input,
      output,
      timestamp: new Date()
    }]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentInput.trim()) {
      setCommandHistory(prev => [...prev, currentInput]);
      setHistoryIndex(-1);
      handleCommand(currentInput);
      setCurrentInput('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setCurrentInput(commandHistory[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1;
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1);
          setCurrentInput('');
        } else {
          setHistoryIndex(newIndex);
          setCurrentInput(commandHistory[newIndex]);
        }
      }
    }
  };

  const executeQuickCommand = (cmd: string) => {
    setCurrentInput(cmd);
    handleCommand(cmd);
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="fixed inset-4 z-[9999] flex items-center justify-center"
    >
      <div className={`w-full max-w-4xl h-full max-h-[80vh] bg-gray-900 dark:bg-black rounded-lg shadow-2xl border border-gray-700 dark:border-gray-600 overflow-hidden ${isMinimized ? 'h-12' : ''}`}>
        {/* Terminal Header */}
        <div className="flex items-center justify-between px-4 py-2 bg-gray-800 dark:bg-gray-900 border-b border-gray-700">
          <div className="flex items-center space-x-2">
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <div className="flex items-center ml-4">
              <TerminalIcon className="w-4 h-4 text-green-400 mr-2" />
              <span className="text-green-400 font-mono text-sm">AbduBot Terminal v2.0</span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Minimize2 className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-red-400 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Quick Commands Panel (Light Mode Only) */}
            {theme === 'light' && (
              <div className="px-4 py-2 bg-gray-100 border-b border-gray-300">
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs text-gray-600 mr-2">Quick Commands:</span>
                  {quickCommands.map((cmd) => (
                    <button
                      key={cmd.cmd}
                      onClick={() => executeQuickCommand(cmd.cmd)}
                      className="px-2 py-1 text-xs bg-blue-100 hover:bg-blue-200 text-blue-700 rounded transition-colors"
                      title={cmd.desc}
                    >
                      {cmd.cmd}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Terminal Content */}
            <div
              ref={terminalRef}
              className="flex-1 p-4 overflow-y-auto font-mono text-sm text-green-400 bg-gray-900 dark:bg-black"
              style={{ maxHeight: 'calc(80vh - 120px)' }}
            >
              {commands.map((command, index) => (
                <div key={index} className="mb-4">
                  {command.input !== 'system' && (
                    <div className="flex items-center mb-1">
                      <span className="text-blue-400">abdullah@portfolio:~$</span>
                      <span className="ml-2 text-white">{command.input}</span>
                    </div>
                  )}
                  <div className="whitespace-pre-wrap text-green-300 leading-relaxed">
                    {command.output}
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex items-center text-yellow-400">
                  <span>AbduBot is typing</span>
                  <motion.span
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="ml-1"
                  >
                    ...
                  </motion.span>
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="border-t border-gray-700 p-4 bg-gray-900 dark:bg-black">
              <form onSubmit={handleSubmit} className="flex items-center">
                <span className="text-blue-400 font-mono mr-2">abdullah@portfolio:~$</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={currentInput}
                  onChange={(e) => setCurrentInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 bg-transparent text-white font-mono outline-none"
                  placeholder="Type a command... (try 'help')"
                  autoFocus
                />
                <motion.div
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="w-2 h-4 bg-green-400 ml-1"
                />
              </form>
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
};

export default Terminal;