import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal as TerminalIcon, X, Minimize2, Maximize2, Download, Send } from 'lucide-react';
import { useTheme } from './ThemeProvider';

interface TerminalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Command {
  input: string;
  output: string;
  timestamp: Date;
  type: 'user' | 'bot' | 'error' | 'system';
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
  const [isOnline, setIsOnline] = useState(true);

  const quickCommands = [
    { cmd: 'whoami', desc: 'About Abdullah', icon: '👨‍💻' },
    { cmd: 'skills', desc: 'Tech Stack', icon: '🛠️' },
    { cmd: 'projects', desc: 'My Work', icon: '🚀' },
    { cmd: 'experience', desc: 'Work History', icon: '💼' },
    { cmd: 'contact', desc: 'Get in Touch', icon: '📧' },
    { cmd: 'help', desc: 'Available Commands', icon: '❓' },
  ];

  // Enhanced responses with more personality
  const responses = {
    whoami: [
      "🤖 Hi there! I'm AbduBot, Abdullah's AI assistant. Abdullah is a passionate Software Engineering student at UCP with a solid 3.6 CGPA. He's the kind of developer who sees bugs as puzzles to solve! ☕",
      "👨‍💻 Meet Muhammad Abdullah Uzair - a full-stack developer who believes every line of code tells a story. Currently mastering Software Engineering at University of Central Punjab while building amazing digital experiences!",
      "🚀 Abdullah Uzair here (well, his digital twin)! I'm a Software Engineering student who loves turning coffee into code. My mission? Creating digital solutions that make people's lives easier, one pixel at a time!"
    ],
    skills: [
      "💻 Abdullah's Tech Arsenal:\n\n🎨 Frontend Magic:\n• HTML5, CSS3, JavaScript (Expert)\n• Bootstrap, Tailwind CSS (Advanced)\n• Responsive Design (Master)\n\n⚙️ Backend Power:\n• PHP, Node.js, Express.js\n• RESTful APIs\n\n🗄️ Database Mastery:\n• MySQL, MongoDB\n\n🔧 Tools & More:\n• Git & GitHub, VS Code, Postman\n• C, C++, Python\n• Machine Learning, SEO\n• Agile Methodology\n\nAlways learning, always growing! 📈",
      "🛠️ Technical Expertise Breakdown:\n\n📊 Proficiency Levels:\n• Web Development: 95% ⭐⭐⭐⭐⭐\n• JavaScript: 90% ⭐⭐⭐⭐��\n• PHP/Backend: 88% ⭐⭐⭐⭐\n• Database Design: 85% ⭐⭐⭐⭐\n• Python/ML: 80% ⭐⭐⭐⭐\n• SEO & Optimization: 88% ⭐⭐⭐⭐\n\n🎯 Currently exploring: AI/ML integration in web apps!"
    ],
    projects: [
      "🚀 Abdullah's Project Showcase:\n\n⭐ Featured Projects:\n• MacroMate - AI-powered health & fitness tracker (Final Year Project)\n• XRevStudio.com - Creative agency portfolio with stunning animations\n• ObecheInterior.com - Elegant interior design showcase\n• LevelUpSol.com.pk - Professional corporate website\n• CricketX.net - Enhanced sports platform\n\n💡 Each project represents a unique challenge solved with creativity and cutting-edge tech!",
      "📂 Project Portfolio Deep Dive:\n\n🏆 MacroMate (2024) - The Crown Jewel\n   Tech: AI/ML + React + Node.js + MongoDB\n   Features: Personalized meal planning, workout tracking\n\n🎨 XRevStudio - Creative Excellence\n   Tech: React + Tailwind + Framer Motion\n   Features: Interactive galleries, SEO optimized\n\n🏠 ObecheInterior - Design Elegance\n   Tech: HTML5 + CSS3 + JavaScript\n   Features: Responsive, gallery showcase\n\nWant to explore any project in detail? Just ask!"
    ],
    experience: [
      "💼 Professional Journey:\n\n🔍 SEO Specialist at Web20Ranker (Jul 2024 - Apr 2025)\n• Improved team efficiency by 40% through custom workflows\n• Built advanced ranking signal systems\n• Enhanced Web 2.0 backlink strategies\n\n🎨 Web Designer Intern at LevelUp Solutions (Apr 2024 - Jul 2024)\n• Developed responsive landing pages\n• Increased user engagement by 25%\n• Ensured cross-browser compatibility\n\n📈 1+ years of hands-on experience, 5+ successful projects!",
      "🚀 Career Highlights:\n\n📊 Current Role - SEO Specialist:\n• Leading workflow optimization initiatives\n• Developing custom SEO tools and systems\n• Collaborating with cross-functional teams\n\n🌟 Previous Experience:\n• Front-end development internship\n• UI/UX design implementations\n• Client project management\n\n🎯 Always seeking new challenges and growth opportunities!"
    ],
    contact: [
      "📧 Let's Connect!\n\n📱 Reach out to Abdullah:\n• Email: abdullahuzair860@gmail.com\n• LinkedIn: linkedin.com/in/abdullah-uzair-2a18b9278/\n• GitHub: github.com/mabdullahuzair\n\n💬 Whether it's a project collaboration, job opportunity, or just a tech chat - Abdullah loves connecting with fellow developers and innovative minds!\n\n🚀 Ready to build something amazing together?",
      "🤝 Get In Touch:\n\n📧 Professional Email: abdullahuzair860@gmail.com\n🔗 LinkedIn: Connect for professional networking\n💻 GitHub: Check out the code repositories\n\n💡 Open to:\n• Freelance projects\n• Full-time opportunities\n• Tech collaborations\n• Mentorship discussions\n\nDrop a message anytime! 😊"
    ],
    help: [
      "🤖 AbduBot Command Center:\n\n🔧 Available Commands:\n• whoami - Learn about Abdullah\n• skills - Technical expertise\n• projects - Portfolio showcase\n• experience - Professional journey\n• contact - Get in touch\n• clear - Clear terminal\n• theme - Toggle dark/light mode\n• joke - Need a laugh?\n• quote - Inspirational quotes\n• time - Current time\n• weather - Ask about weather\n• exit - Close terminal\n\n💡 Pro tip: I understand natural language too! Try asking questions like 'What technologies do you know?' or 'Tell me about your projects'"
    ],
    clear: [""],
    theme: ["🎨 Theme toggled! Enjoy the new look!"],
    joke: [
      "😄 Why do programmers prefer dark mode?\nBecause light attracts bugs! 🐛",
      "🤓 Why do Java developers wear glasses?\nBecause they can't C#! 👓",
      "😅 How many programmers does it take to change a light bulb?\nNone. That's a hardware problem! 💡",
      "🤣 Why did the programmer quit his job?\nHe didn't get arrays! 📊"
    ],
    quote: [
      "💭 'Code is like humor. When you have to explain it, it's bad.' - Cory House",
      "🚀 'The best way to predict the future is to implement it.' - David Heinemeier Hansson",
      "💡 'First, solve the problem. Then, write the code.' - John Johnson",
      "⚡ 'Experience is the name everyone gives to their mistakes.' - Oscar Wilde"
    ],
    time: [`🕒 Current time: ${new Date().toLocaleTimeString()}`],
    exit: ["👋 Thanks for chatting! See you next time!"]
  };

  // Smart response system that can handle variations and natural language
  const getSmartResponse = (input: string): { response: string; type: 'bot' | 'error' | 'system' } => {
    const lowerInput = input.toLowerCase().trim();

    // Direct command matches
    if (responses[lowerInput as keyof typeof responses]) {
      const responseArray = responses[lowerInput as keyof typeof responses];
      return {
        response: responseArray[Math.floor(Math.random() * responseArray.length)],
        type: 'bot'
      };
    }

    // Natural language processing
    if (lowerInput.includes('who') || lowerInput.includes('about') || lowerInput.includes('yourself')) {
      return { response: responses.whoami[0], type: 'bot' };
    }

    if (lowerInput.includes('skill') || lowerInput.includes('tech') || lowerInput.includes('technology') || lowerInput.includes('know')) {
      return { response: responses.skills[0], type: 'bot' };
    }

    if (lowerInput.includes('project') || lowerInput.includes('work') || lowerInput.includes('portfolio')) {
      return { response: responses.projects[0], type: 'bot' };
    }

    if (lowerInput.includes('experience') || lowerInput.includes('job') || lowerInput.includes('career')) {
      return { response: responses.experience[0], type: 'bot' };
    }

    if (lowerInput.includes('contact') || lowerInput.includes('email') || lowerInput.includes('reach')) {
      return { response: responses.contact[0], type: 'bot' };
    }

    if (lowerInput.includes('hello') || lowerInput.includes('hi') || lowerInput.includes('hey')) {
      return {
        response: "👋 Hello there! I'm AbduBot, Abdullah's AI assistant. How can I help you today? Try 'help' to see what I can do!",
        type: 'bot'
      };
    }

    if (lowerInput.includes('thank') || lowerInput.includes('thanks')) {
      return {
        response: "😊 You're welcome! Is there anything else you'd like to know about Abdullah's work or skills?",
        type: 'bot'
      };
    }

    if (lowerInput.includes('weather')) {
      return {
        response: "☀️ I'm a coding bot, not a weather bot! But I can tell you it's always sunny in the world of programming! ☀️",
        type: 'bot'
      };
    }

    // Error handling with helpful suggestions
    const suggestions = ['whoami', 'skills', 'projects', 'experience', 'contact', 'help'];
    const randomSuggestion = suggestions[Math.floor(Math.random() * suggestions.length)];

    return {
      response: `❌ Command '${input}' not recognized.\n\n💡 Try these popular commands:\n• help - See all available commands\n• ${randomSuggestion} - ${quickCommands.find(cmd => cmd.cmd === randomSuggestion)?.desc}\n\n🤖 I also understand natural language! Try asking: "What are your skills?" or "Tell me about your projects"`,
      type: 'error'
    };
  };

  const executeCommand = async (input: string) => {
    if (!input.trim()) return;

    const timestamp = new Date();

    // Add user input
    setCommands(prev => [...prev, {
      input,
      output: '',
      timestamp,
      type: 'user'
    }]);

    // Add to history
    setCommandHistory(prev => [...prev, input]);
    setHistoryIndex(-1);

    setIsTyping(true);

    // Simulate thinking time
    await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 1000));

    // Handle special commands
    if (input.toLowerCase() === 'clear') {
      setCommands([]);
      setIsTyping(false);
      return;
    }

    if (input.toLowerCase() === 'theme') {
      toggleTheme();
    }

    if (input.toLowerCase() === 'exit') {
      onClose();
      return;
    }

    // Get smart response
    const { response, type } = getSmartResponse(input);

    // Add bot response with typing effect
    setCommands(prev => [...prev, {
      input: '',
      output: response,
      timestamp: new Date(),
      type
    }]);

    setIsTyping(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentInput.trim()) {
      executeCommand(currentInput);
      setCurrentInput('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setCurrentInput(commandHistory[commandHistory.length - 1 - newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setCurrentInput(commandHistory[commandHistory.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setCurrentInput('');
      }
    }

    // Close terminal with Escape key
    if (e.key === 'Escape') {
      onClose();
    }
  };

  // Auto-scroll to bottom
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [commands]);

  // Focus input when terminal opens and prevent body scroll
  useEffect(() => {
    if (isOpen) {
      // Prevent body scroll when terminal is open
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';

      if (inputRef.current && !isMinimized) {
        // Small delay to ensure proper focus
        setTimeout(() => {
          inputRef.current?.focus();
        }, 100);
      }
    } else {
      // Restore body scroll when terminal is closed
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    }

    // Handle escape key to close terminal
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, isMinimized, onClose]);

  // Initial greeting
  useEffect(() => {
    if (isOpen && commands.length === 0) {
      setTimeout(() => {
        setCommands([{
          input: '',
          output: "👋 Welcome to AbduBot Terminal!\n\n🤖 I'm Abdullah's AI assistant. I can help you learn about his skills, projects, and experience.\n\n💡 Try typing 'help' to see available commands, or just ask me anything in natural language!\n\nReady to explore? 🚀",
          timestamp: new Date(),
          type: 'system'
        }]);
      }, 500);
    }
  }, [isOpen]);

  // Handle click outside to close (optional)
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[9999] bg-black/20 backdrop-blur-sm"
        onClick={handleBackdropClick}
        data-terminal-overlay
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          overflow: 'hidden'
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 30 }}
          transition={{ type: "spring", damping: 20, stiffness: 400 }}
          className="fixed inset-2 sm:inset-4 md:inset-8 lg:inset-12 xl:inset-16 flex items-center justify-center pointer-events-none"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="w-full max-w-5xl max-h-[95vh] bg-gradient-to-b from-gray-900 to-black rounded-xl sm:rounded-2xl shadow-2xl overflow-hidden border border-gray-600/50 backdrop-blur-sm pointer-events-auto">
            {/* Terminal Header */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-gray-800 to-gray-900 border-b border-gray-600/50">
              <div className="flex items-center space-x-4">
                <div className="flex space-x-2">
                  <motion.div
                    className="w-3 h-3 bg-red-500 rounded-full cursor-pointer hover:bg-red-400 flex items-center justify-center group relative"
                    onClick={onClose}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    title="Close"
                  >
                    <X className="w-2 h-2 text-red-800 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.div>
                  <motion.div
                    className="w-3 h-3 bg-yellow-500 rounded-full cursor-pointer hover:bg-yellow-400 flex items-center justify-center group relative"
                    onClick={() => setIsMinimized(!isMinimized)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    title="Minimize"
                  >
                    <Minimize2 className="w-2 h-2 text-yellow-800 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.div>
                  <motion.div
                    className="w-3 h-3 bg-green-500 rounded-full cursor-pointer hover:bg-green-400 flex items-center justify-center group relative"
                    whileHover={{ scale: 1.1 }}
                    title="Maximize"
                  >
                    <Maximize2 className="w-2 h-2 text-green-800 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.div>
                </div>
                <div className="flex items-center space-x-2">
                  <TerminalIcon className="w-5 h-5 text-emerald-400" />
                  <span className="text-emerald-400 font-mono font-medium">Bot Terminal</span>
                  <motion.div
                    className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-400' : 'bg-red-400'}`}
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-1 text-gray-400 hover:text-white transition-colors"
                >
                  <Minimize2 className="w-4 h-4" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="p-1 text-gray-400 hover:text-red-400 transition-colors"
                >
                  <X className="w-4 h-4" />
                </motion.button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Quick Commands */}
                <div className="px-4 sm:px-6 py-3 bg-gray-800/50 border-b border-gray-600/30">
                  <div className="flex flex-wrap gap-2">
                    {quickCommands.map((cmd) => (
                      <motion.button
                        key={cmd.cmd}
                        whileHover={{ scale: 1.05, y: -1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => executeCommand(cmd.cmd)}
                        className="px-2 sm:px-3 py-1 bg-blue-600/20 hover:bg-blue-600/40 text-blue-300 rounded-lg text-xs sm:text-sm font-mono border border-blue-500/30 transition-all duration-200 shadow-sm hover:shadow-md"
                      >
                        <span className="hidden sm:inline">{cmd.icon} </span>{cmd.cmd}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Terminal Content */}
                <div
                  ref={terminalRef}
                  className="h-80 sm:h-96 overflow-y-auto p-4 sm:p-6 font-mono text-xs sm:text-sm space-y-3 sm:space-y-4 bg-gradient-to-b from-gray-900/95 to-black/95 scrollbar-thin scrollbar-thumb-blue-600/50 scrollbar-track-gray-800/50"
                >
                  {commands.map((command, index) => (
                    <div key={index} className="space-y-2">
                      {command.input && (
                        <div className="flex items-center space-x-2">
                          <span className="text-emerald-400">abdullah@portfolio:~$</span>
                          <span className="text-white">{command.input}</span>
                        </div>
                      )}
                      {command.output && (
                        <motion.pre
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={`whitespace-pre-wrap leading-relaxed ${
                            command.type === 'error' ? 'text-red-400' :
                            command.type === 'system' ? 'text-cyan-400' :
                            'text-gray-300'
                          }`}
                        >
                          {command.output}
                        </motion.pre>
                      )}
                    </div>
                  ))}

                  {isTyping && (
                    <div className="flex items-center space-x-2">
                      <span className="text-emerald-400">🤖 AbduBot:</span>
                      <motion.div
                        animate={{ opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="text-yellow-400"
                      >
                        Thinking...
                      </motion.div>
                    </div>
                  )}
                </div>

                {/* Input Area */}
                <form onSubmit={handleSubmit} className="p-4 sm:p-6 bg-gradient-to-r from-gray-800 to-gray-900 border-t border-gray-600/50">
                  <div className="flex items-center space-x-2 sm:space-x-4">
                    <span className="text-emerald-400 font-mono text-xs sm:text-sm">abdullah@portfolio:~$</span>
                    <input
                      ref={inputRef}
                      type="text"
                      value={currentInput}
                      onChange={(e) => setCurrentInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      className="flex-1 bg-transparent text-white font-mono focus:outline-none placeholder-gray-500 text-xs sm:text-sm"
                      placeholder="Type a command or ask me anything..."
                      autoComplete="off"
                    />
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.1, color: "#60a5fa" }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 text-blue-400 hover:text-blue-300 transition-colors rounded-md hover:bg-blue-600/10"
                    >
                      <Send className="w-3 h-3 sm:w-4 sm:h-4" />
                    </motion.button>
                  </div>
                  <div className="text-xs text-gray-500 mt-2 hidden sm:block">
                    Press ESC to close • Use ↑/↓ for command history
                  </div>
                </form>
              </>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Terminal;
