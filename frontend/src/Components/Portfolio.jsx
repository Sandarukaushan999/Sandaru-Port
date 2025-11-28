import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Mail, Phone, MapPin, Download, Github, Linkedin, Cpu, Database, Zap, Monitor, Code, Layers, Settings, ExternalLink, GraduationCap, Award, Star, User, Send, Terminal, Minimize2, Maximize2, X, Film } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import robotIcon from '../assets/robot.png';
import sandaruCV from '../assets/new cv sandaru kaushan.pdf';
import vendorVideo from '../assets/vendor.mp4';
import fiverrVideo from '../assets/fiverr.mp4';
import newProjectVideo from '../assets/video-project-2.mp4';

// Matrix Rain Effect Component
const MatrixRain = () => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const matrix = "01ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*(){}[]<>?/";
    const matrixArray = matrix.split("");
    
    const fontSize = 10;
    const columns = canvas.width / fontSize;
    const drops = [];
    
    for (let x = 0; x < columns; x++) {
      drops[x] = 1;
    }
    
    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.08)'; // Slightly less transparent for more visibility
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = '#22c55e'; // Tailwind green-500 for rain text
      ctx.font = fontSize + 'px monospace';
      
      for (let i = 0; i < drops.length; i++) {
        const text = matrixArray[Math.floor(Math.random() * matrixArray.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };
    
    const interval = setInterval(draw, 35);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 opacity-20" // Increased opacity for more visibility
      style={{ pointerEvents: 'none' }}
    />
  );
};

// Interactive Terminal Component
const TerminalWindow = ({ isOpen, onClose }) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([
    { type: 'system', text: 'Welcome to Sandaru\'s Portfolio Terminal v2.0' },
    { type: 'system', text: 'Type "help" for available commands' }
  ]);
  const [isMinimized, setIsMinimized] = useState(false);
  const terminalRef = useRef(null);

  const commands = {
    help: () => [
      'Available commands:',
      '• about - Learn about Sandaru',
      '• skills - View technical skills',
      '• projects - List all projects',
      '• contact - Get contact information',
      '• cv - Download CV',
      '• social - View social links',
      '• clear - Clear terminal',
      '• matrix - Toggle matrix rain',
      '• joke - Get a programming joke'
    ],
    about: () => [
      'Sandaru Kaushan - Software Engineer',
      'Passionate about mobile & web development',
      'Currently pursuing BSc Hons Software Engineering at SLIIT',
      'Location: Malabe, Colombo'
    ],
    skills: () => [
      'Programming Languages: Java, Kotlin, C/C++, JavaScript, Python',
      'Frameworks: React.js, Tailwind CSS',
      'Databases: MySQL, MongoDB, Firebase',
      'Tools: Git, Docker, Azure, Trello'
    ],
    projects: () => [
      '1. LUMINA - Solar Management System (React.js)',
      '2. VALUTY - Expense Tracker App (Kotlin)',
      '3. MyWallet - Online Banking System (Java)'
    ],
    contact: () => [
      'Email: Sandarukaushan999@gmail.com',
      'Phone: +94 76 6674 884',
      'LinkedIn: linkedin.com/in/sandaru-kaushan'
    ],
    cv: () => {
      const link = document.createElement('a');
      link.href = sandaruCV;
      link.download = 'Sandaru_Kaushan_CV.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return ['CV download initiated...', 'Check your downloads folder!'];
    },
    social: () => [
      'GitHub: github.com/Sandarukaushan999',
      'LinkedIn: linkedin.com/in/sandaru-kaushan'
    ],
    clear: () => {
      setHistory([]);
      return [];
    },
    matrix: () => ['Matrix rain effect toggled!'],
    joke: () => {
      const jokes = [
        'Why do programmers prefer dark mode? Because light attracts bugs!',
        'How many programmers does it take to change a light bulb? None, that\'s a hardware problem.',
        'Why did the programmer quit his job? He didn\'t get arrays.',
        'What\'s a programmer\'s favorite hangout place? Foo Bar!'
      ];
      return [jokes[Math.floor(Math.random() * jokes.length)]];
    }
  };

  const handleCommand = (cmd) => {
    const command = cmd.trim().toLowerCase();
    const output = commands[command] ? commands[command]() : [`Command not found: ${cmd}. Type "help" for available commands.`];
    
    if (command !== 'clear') {
      setHistory(prev => [
        ...prev,
        { type: 'input', text: `> ${cmd}` },
        ...output.map(line => ({ type: 'output', text: line }))
      ]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      handleCommand(input);
      setInput('');
    }
  };

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ 
        opacity: 1, 
        scale: isMinimized ? 0.3 : 1,
        x: isMinimized ? '-40%' : 0,
        y: isMinimized ? '40%' : 0
      }}
      exit={{ opacity: 0, scale: 0.8 }}
      className={`fixed ${isMinimized ? 'bottom-4 left-4' : 'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'} 
                  ${isMinimized ? 'w-64 h-40' : 'w-11/12 max-w-4xl h-5/6'} 
                  bg-black border border-yellow-500 rounded-lg shadow-2xl z-50 overflow-hidden`}
    >
      <div className="bg-gray-900 px-4 py-2 flex items-center justify-between border-b border-yellow-500">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-yellow-400" />
          <span className="text-yellow-400 font-mono text-sm">terminal@sandaru:~</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="text-yellow-400 hover:text-yellow-300 transition-colors"
          >
            {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
          </button>
          <button
            onClick={onClose}
            className="text-red-400 hover:text-red-300 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      {!isMinimized && (
        <>
          <div
            ref={terminalRef}
            className="flex-1 p-4 overflow-y-auto font-mono text-sm text-yellow-400 bg-black"
            style={{ height: 'calc(100% - 100px)' }}
          >
            {history.map((line, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.02 }}
                className={`mb-1 ${
                  line.type === 'input' ? 'text-cyan-400' : 
                  line.type === 'system' ? 'text-yellow-400' : 'text-yellow-400'
                }`}
              >
                {line.text}
              </motion.div>
            ))}
          </div>
          
          <form onSubmit={handleSubmit} className="border-t border-yellow-500 p-4 bg-gray-900">
            <div className="flex items-center gap-2">
              <span className="text-yellow-400 font-mono">{'>'}</span>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 bg-transparent text-yellow-400 font-mono outline-none"
                placeholder="Type a command..."
                autoFocus
              />
            </div>
          </form>
        </>
      )}
    </motion.div>
  );
};

// Enhanced Chatbot with Terminal Integration
const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "🤖 AI Assistant activated! I'm here to help you explore Sandaru's portfolio. Type 'terminal' to open the interactive terminal!", sender: 'bot' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getBotResponse = (input) => {
    const lowerInput = input.toLowerCase();
    
    if (lowerInput === 'terminal') {
      setTerminalOpen(true);
      return "🚀 Terminal opened! You can now interact with the portfolio using commands. Type 'help' in the terminal to see available commands.";
    } else if (lowerInput.includes('project') || lowerInput.includes('work')) {
      return "🚀 Sandaru has worked on amazing projects like LUMINA (Solar Management), VALUTY (Expense Tracker), and MyWallet (Banking System). Each showcases different technical skills!";
    } else if (lowerInput.includes('skill') || lowerInput.includes('technology')) {
      return "💻 Sandaru is proficient in Java, Kotlin, React.js, MongoDB, and many more technologies. He's also experienced with cloud platforms like Azure!";
    } else if (lowerInput.includes('contact') || lowerInput.includes('reach')) {
      return "📧 You can reach Sandaru at Sandarukaushan999@gmail.com or connect on LinkedIn. He's always open to collaboration!";
    } else if (lowerInput.includes('education') || lowerInput.includes('study')) {
      return "🎓 Sandaru is currently pursuing BSc Hons Software Engineering at SLIIT and has multiple certifications in DevOps, Docker, and Azure!";
    } else if (lowerInput.includes('cv') || lowerInput.includes('resume')) {
      // Direct download from chatbot
      const link = document.createElement('a');
      link.href = sandaruCV;
      link.download = 'Sandaru_Kaushan_CV.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return "📄 CV download started! Check your downloads folder.";
    } else {
      const responses = [
        "🔍 That's interesting! Feel free to explore different sections of the portfolio. Type 'terminal' for interactive commands!",
        "💡 Sandaru loves creating innovative solutions. What specific area interests you most?",
        "🌟 Great question! Check out the projects section to see Sandaru's technical expertise.",
        "🤝 Sandaru is passionate about software development and always eager to take on new challenges!",
        "🎯 Want to know more about any specific project or technology? Just ask! Or type 'terminal' for interactive exploration."
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage = { text: inputValue, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputValue;
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const botResponse = getBotResponse(currentInput);
      setMessages(prev => [...prev, { text: botResponse, sender: 'bot' }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-8 right-8 w-16 h-16 rounded-full flex items-center justify-center shadow-lg z-50 transition-all duration-300 ${
          isOpen ? 'bg-red-500 hover:bg-red-600' : 'bg-gradient-to-r from-yellow-400 to-[#AAC638] hover:from-yellow-500 hover:to-green-600'
        }`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <img
          src={robotIcon}
          alt="AI Chatbot"
          className="w-8 h-8"
          style={{ filter: 'drop-shadow(0 0 2px #fff)' }}
        />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-24 right-8 w-80 h-96 bg-black border-2 border-[#AAC638] rounded-2xl shadow-xl flex flex-col z-50"
          >
            <div className="bg-gradient-to-r from-yellow-400 to-[#AAC638] p-4 rounded-t-2xl flex items-center">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-3 overflow-hidden">
                <img src={robotIcon} alt="AI Chatbot" className="w-6 h-6" style={{ objectFit: 'contain' }} />
              </div>
              <h3 className="text-black font-semibold">AI Portfolio Assistant</h3>
            </div>

            <div className="flex-1 p-4 overflow-y-auto bg-[#101c0b]">
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`mb-4 flex ${
                    message.sender === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-xs p-3 rounded-lg ${
                      message.sender === 'user'
                        ? 'bg-gradient-to-r from-[#AAC638] to-green-500 text-black rounded-br-none'
                        : 'bg-[#101c0b] border border-[#AAC638] text-white rounded-bl-none'
                    }`}
                  >
                    {message.text}
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start mb-4"
                >
                  <div className="bg-[#AAC638] text-black rounded-lg p-3 border border-[#AAC638]">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-black rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-black rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-black rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSendMessage} className="p-3 border-t border-[#AAC638] bg-[#182a12]">
              <div className="flex items-center">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask me anything"
                  className="flex-1 bg-[#101c0b] text-[#AAC638] rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#AAC638] border border-[#AAC638]/30"
                />
                <button
                  type="submit"
                  className="bg-gradient-to-r from-[#AAC638] to-green-500 text-white rounded-r-lg px-4 py-2 hover:from-green-500 hover:to-[#AAC638] transition-all"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <TerminalWindow isOpen={terminalOpen} onClose={() => setTerminalOpen(false)} />
    </>
  );
};



// Add this above your Portfolio component
const htmlTagsList = [
  '<html>', '<head>', '<title>', '<body>', '<h1>', '<p>', '<img>', '<a>', '<div>', '<footer>'
];

const exampleCode = `<html>
  <head>
    <title>My Simple Webpage</title>
  </head>
  <body>
    <h1>Hello World</h1>
    <p>This is a paragraph.</p>
    <img src="https://placehold.co/100x50" alt="Sample" />
    <a href="#">A link</a>
    <div>A div element</div>
    <footer>Footer content</footer>
  </body>
</html>`;

const exampleOutput = (
  <div>
    <h1>Hello World</h1>
    <p>This is a paragraph.</p>
    <img src="https://placehold.co/100x50" alt="Sample" />
    <a href="#">A link</a>
    <div>A div element</div>
    <footer>Footer content</footer>
  </div>
);

function HtmlTagHunterGame() {
  const [caught, setCaught] = useState([]);
  const [showResult, setShowResult] = useState(false);

  const handleTagClick = (tag) => {
    if (!caught.includes(tag)) {
      setCaught([...caught, tag]);
    }
  };

  const allCaught = caught.length === htmlTagsList.length;

  return (
    <div className="bg-black/80 border-2 border-[#AAC638] rounded-2xl p-6 w-full max-w-xl h-[500px] relative overflow-hidden shadow-lg">
      <h3 className="text-2xl font-bold text-[#AAC638] mb-4 text-center">HTML Tag Hunter</h3>
      <p className="text-gray-300 mb-6 text-center text-sm">
        Collect all the HTML tags to build a simple webpage!
      </p>
      {/* Game Area */}
      <div className="game-area h-[360px] relative rounded-lg overflow-hidden border-2 border-yellow-500/20">
        {/* Floating Tags */}
        {htmlTagsList.map((tag, index) =>
          !caught.includes(tag) && (
            <motion.div
              key={tag}
              className={`tag absolute cursor-pointer px-3 py-1 rounded-md font-mono font-bold ${
                tag === '<h1>' ? 'bg-red-400 text-gray-900' :
                tag === '<p>' ? 'bg-blue-400 text-gray-900' :
                tag === '<img>' ? 'bg-green-400 text-gray-900' :
                'bg-yellow-400 text-gray-900'
              }`}
              style={{
                left: `${10 + Math.random() * 70}%`,
                top: `${10 + Math.random() * 60}%`,
                zIndex: 2
              }}
              animate={{
                y: [0, Math.random() * 40 - 20, 0],
                x: [0, Math.random() * 40 - 20, 0]
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleTagClick(tag)}
            >
              {tag}
            </motion.div>
          )
        )}

        {/* Collection Jar & Analyze Button Row */}
        <div className="absolute bottom-4 right-4 flex items-end gap-2 z-10">
          {/* Collection Jar */}
          <div className="w-24 h-32 bg-yellow-400/20 border-2 border-yellow-500/50 rounded-lg flex flex-col items-center justify-end p-2">
            {/* Caught tags in the jar */}
            <div className="w-full flex flex-col items-center">
              {caught.map((tag, i) => (
                <div key={i} className="text-green-700 font-mono text-xs mb-1">{tag}</div>
              ))}
            </div>
          </div>
          {/* Analyze Button */}
          {allCaught && !showResult && (
            <motion.button
              className="px-4 py-2 bg-gradient-to-r from-yellow-400 to-green-500 rounded-lg font-semibold hover:shadow-lg hover:shadow-yellow-400/25 transition-all"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              id="analyze-btn"
              onClick={() => setShowResult(true)}
            >
              Analyze
            </motion.button>
          )}
        </div>
      </div>

      {/* Result Modal */}
      {showResult && (
        <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center z-20">
          <div className="bg-gray-900 rounded-lg p-8 max-w-lg w-full text-left">
            <h3 className="text-2xl font-bold text-yellow-400 mb-4">HTML Output</h3>
            <div className="mb-4 p-4 bg-white rounded text-black">
              {exampleOutput}
            </div>
            <h4 className="text-lg font-semibold text-green-400 mb-2">HTML Code</h4>
            <pre className="bg-black text-green-400 rounded p-4 overflow-x-auto text-xs">{exampleCode}</pre>
            <button
              className="mt-6 px-4 py-2 bg-yellow-400 rounded text-black font-bold"
              onClick={() => setShowResult(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// Main Portfolio Component
const Portfolio = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [isVisible, setIsVisible] = useState({});
  const [heroInView, setHeroInView] = useState(true);

  useEffect(() => {
    const heroSection = document.getElementById('hero');
    if (!heroSection) return;

    const observer = new window.IntersectionObserver(
      ([entry]) => {
        setHeroInView(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );
    observer.observe(heroSection);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(prev => ({
            ...prev,
            [entry.target.id]: entry.isIntersecting
          }));
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    document.querySelectorAll('section[id]').forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const skills = {
    languages: ['Java', 'Kotlin', 'C', 'C++', 'JavaScript', 'HTML5', 'CSS', 'PHP', 'Python'],
    frameworks: ['React.js', 'Tailwind CSS'],
    databases: ['MySQL', 'MongoDB', 'Firebase'],
    tools: ['Git & GitHub', 'Docker', 'Microsoft Azure', 'Trello'],
    architecture: ['MVC', 'UI/UX Design']
  };

  const projects = [
    {
      title: 'VOXO POS | ERP System',
      description: 'A robust, full-featured Point of Sale & Retail Management platform designed for real-world retail business needs with offline capabilities and enterprise-grade security.',
      technologies: ['React 18', 'Vite', 'Electron', 'Node.js', 'Express.js', 'SQLite', 'Tailwind CSS', 'Lucide Icons', 'Zustand', 'Chart.js', 'JWT', 'bcrypt', 'ExcelJS'],
      features: ['Offline-capable desktop app', 'Role-based access control', 'Barcode scanning', 'Real-time inventory alerts', 'Excel reporting'],
      category: 'Full-Stack Development',
      gradient: 'from-blue-400 to-purple-500'
    },
    {
      title: 'LUMINA – Solar Management System',
      description: 'A comprehensive sustainability-focused platform for managing solar energy use, recycling waste, and accessing solar marketplaces.',
      technologies: ['React.js', 'JavaScript', 'Tailwind CSS', 'MongoDB', 'Trello'],
      features: ['EchoTrack (energy monitoring)', 'BrightBin (recycling)', 'Vendor portal', 'Feedback integration'],
      category: 'Web Development',
      gradient: 'from-yellow-400 to-orange-500'
    },
    {
      title: 'VALUTY - Expense Tracker App',
      description: 'Personal finance app for Android with comprehensive expense tracking, budgeting, and data management capabilities.',
      technologies: ['Kotlin', 'Shared Preferences', 'Internal Storage'],
      features: ['Charts & Analytics', 'Backup/Restore', 'PIN Authentication', 'Currency Selection', 'Notifications'],
      category: 'Mobile Development',
      gradient: 'from-yellow-400 to-green-500'
    },
    {
      title: 'MyWallet – Online Banking System',
      description: 'Secure online banking platform with complete transaction management and admin capabilities.',
      technologies: ['Java', 'MySQL', 'HTML', 'CSS', 'Tomcat', 'Servlet'],
      features: ['Secure Authentication', 'Transaction Management', 'Bill Payment', 'Admin Panel', 'Reward System'],
      category: 'Web Development',
      gradient: 'from-green-400 to-yellow-500'
    }
  ];

  const certifications = [
    'DevOps Foundations',
    'Docker',
    'Docker Compose',
    'Docker Products',
    'Microsoft Azure AI Essentials',
    'BRIDGING PROGRAMME',
    'Python For Beginners'
  ];

  const Navigation = () => (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 bg-black/90 backdrop-blur-md z-40 border-b border-[#AAC638]/30"
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <motion.div 
            className="text-2xl font-bold bg-gradient-to-r from-[#AAC638] to-green-500 bg-clip-text text-transparent mb-4 md:mb-0"
            whileHover={{ scale: 1.05 }}
          >
            &lt;SK/&gt;
          </motion.div>
          <div className="hidden md:flex space-x-8">
            {['hero', 'about', 'skills', 'projects', 'education', 'contact'].map((section) => (
              <a
                key={section}
                href={`#${section}`}
                className={`capitalize transition-all duration-300 relative px-4 py-2 border border-[#AAC638]/40 rounded-lg
                  ${activeSection === section ? 'font-semibold text-[#AAC638] bg-[#101c0b] border-[#AAC638]' : 'text-white hover:text-[#AAC638] hover:bg-[#101c0b]/80'}
                `}
                style={{
                  background: activeSection === section ? '#101c0b' : 'transparent',
                }}
              >
                {section}
                {activeSection === section && (
                  <motion.div
                    layoutId="activeSection"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#AAC638]"
                  />
                )}
              </a>
            ))}
          </div>
          {/* Mobile nav */}
          <div className="flex md:hidden flex-col w-full">
            <div className="flex justify-center space-x-4 mb-2">
              {['hero', 'about', 'skills', 'projects', 'education', 'contact'].map((section) => (
                <a
                  key={section}
                  href={`#${section}`}
                  className={`capitalize transition-all duration-300 px-3 py-1 border border-[#AAC638]/40 rounded-lg text-sm
                    ${activeSection === section ? 'font-semibold text-[#AAC638] bg-[#101c0b] border-[#AAC638]' : 'text-white hover:text-[#AAC638] hover:bg-[#101c0b]/80'}
                  `}
                  style={{
                    background: activeSection === section ? '#101c0b' : 'transparent',
                  }}
                >
                  {section}
                </a>
              ))}
            </div>
            <div className="w-full h-0.5 bg-[#AAC638] mb-2" />
          </div>
        </div>
      </div>
    </motion.nav>
  );

  // Project Demo Video (left)
  const luminaRef = useRef(null);
  // Video Editing Project Video (right)
  const fiverrRef = useRef(null);

  return (
    <div className="bg-black text-white min-h-screen overflow-x-hidden relative">
      <MatrixRain />
      <Navigation />
      
      {/* Hero Section */}
      <section
        id="hero"
        className="min-h-screen flex items-center justify-center relative overflow-hidden pt-24 md:pt-0"
      >
        {/* Animated Grid Background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(234, 179, 8, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(234, 179, 8, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }} />
        </div>

        {/* Floating Code Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/*
            'function()', 
            'const data =', 
            '{ }', 
            'return', 
            'await', 
            'export',
            'let result =',
            'console.log()',
            'import React',
            'useState()',
            'if (true) { }',
            'for (let i=0; i<n; i++)',
            '=>',
            'setTimeout()',
            'Promise.resolve()',
            'try { } catch(e) { }'
          */}
          {['function()', 'const data =', '{ }', 'return', 'await', 'export', 'let result =', 'console.log()', 'import React', 'useState()', 'if (true) { }', 'for (let i=0; i<n; i++)', '=>', 'setTimeout()', 'Promise.resolve()', 'try { } catch(e) { }'].map((code, i) => (
            <motion.div
              key={i}
              className="absolute font-mono text-sm text-red-500" // Set text color to red
              initial={{ 
                x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
                y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
                opacity: 0
              }}
              animate={{ 
                x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
                y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
                opacity: [0, 0.7, 0]
              }}
              transition={{
                duration: 10 + Math.random() * 10,
                repeat: Infinity,
                delay: i * 2
              }}
            >
              {code}
            </motion.div>
          ))}
        </div>
        
        <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
          {/* SANDARU KAUSHAN Main Title */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center justify-center mt-12 mb-8"
          >
            <h1 className="text-4xl md:text-7xl font-bold bg-gradient-to-r from-yellow-400 to-green-500 bg-clip-text text-transparent">
              SANDARU KAUSHAN
            </h1>
          </motion.div>

          {/* Typing Animation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mb-8"
          >
            <TypingEffect animate={heroInView} />
          </motion.div>

          {/* Enhanced Status Bar */}
          {/* HERO SECTION */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="mb-12 max-w-2xl mx-auto"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <Cpu className="w-7 h-7 text-[#AAC638] mx-auto mb-2" />
                <div className="text-[#AAC638] font-bold text-lg">9+</div>
                <div className="text-xs text-gray-400">Languages</div>
              </div>
              <div>
                <Database className="w-7 h-7 text-[#AAC638] mx-auto mb-2" />
                <div className="text-[#AAC638] font-bold text-lg">5+</div>
                <div className="text-xs text-gray-400">Projects</div>
              </div>
              <div>
                <Zap className="w-7 h-7 text-[#AAC638] mx-auto mb-2" />
                <div className="text-[#AAC638] font-bold text-lg">24/7</div>
                <div className="text-xs text-gray-400">Learning</div>
              </div>
              <div>
                <Monitor className="w-7 h-7 text-[#AAC638] mx-auto mb-2" />
                <div className="text-[#AAC638] font-bold text-lg">BSc</div>
                <div className="text-xs text-gray-400">Student</div>
              </div>
            </div>
          </motion.div>

          {/* Call to Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <motion.a
              href="#projects"
              className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-green-500 rounded-lg font-semibold text-black hover:shadow-lg hover:shadow-[#AAC638]/25 transition-all"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              View Projects
            </motion.a>
            <motion.a
              href="#contact"
              className="px-8 py-4 border border-[#AAC638] rounded-lg font-semibold text-[#AAC638] hover:bg-[#AAC638] hover:text-black transition-all"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Get In Touch
            </motion.a>
          </motion.div>

          {/* Scroll Indicator - Move this BELOW the buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 2 }}
            className="mt-8 flex flex-col items-center text-[#AAC638]"
          >
            <span className="text-sm mb-2">Scroll to explore</span>
            <motion.div
              animate={{ y: [0, 16, 0] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
            >
              <ChevronDown className="w-6 h-6" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 relative">
        <div className="max-w-6xl mx-auto px-6">
          {/* About Section Heading */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isVisible.about ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6"
                style={{ color: '#AAC638' }}>
              About Me
            </h2>
            <div className="w-24 h-1 mx-auto mb-8" style={{ background: '#AAC638' }}></div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isVisible.about ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className=""
            >
              <div>
                <div className="flex items-center mb-4">
                  <Terminal className="w-8 h-8 text-[#AAC638] mr-3" />
                  <h3 className="text-2xl font-bold text-[#AAC638]">Profile</h3>
                </div>
                <p className="text-gray-300 leading-relaxed mb-6">
                  I'm a passionate Software Engineering student at SLIIT with a strong foundation in both mobile and web development. 
                  My journey in tech is driven by curiosity and a desire to create innovative solutions that make a real impact.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-[#AAC638] font-semibold">Name:</span>
                    <p className="text-gray-300">Sandaru Kaushan</p>
                  </div>
                  <div>
                    <span className="text-[#AAC638] font-semibold">Location:</span>
                    <p className="text-gray-300">Malabe, Colombo</p>
                  </div>
                  <div>
                    <span className="text-[#AAC638] font-semibold">Focus:</span>
                    <p className="text-gray-300">Full-Stack Development</p>
                  </div>
                  <div>
                    <span className="text-[#AAC638] font-semibold">Status:</span>
                    <p className="text-[#AAC638]">Available for Projects</p>
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isVisible.about ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className=""
            >
              <div>
                <div className="flex items-center mb-4">
                  <Code className="w-8 h-8 text-[#AAC638] mr-3" />
                  <h3 className="text-2xl font-bold text-[#AAC638]">What I Do</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-[#AAC638] rounded-full mt-2 mr-3"></div>
                    <div>
                      <h4 className="text-[#AAC638] font-semibold">Mobile Development</h4>
                      <p className="text-gray-300 text-sm">Creating intuitive Android apps with Kotlin</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-[#AAC638] rounded-full mt-2 mr-3"></div>
                    <div>
                      <h4 className="text-[#AAC638] font-semibold">Web Development</h4>
                      <p className="text-gray-300 text-sm">Building responsive web applications with React.js</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-[#AAC638] rounded-full mt-2 mr-3"></div>
                    <div>
                      <h4 className="text-[#AAC638] font-semibold">Database Design</h4>
                      <p className="text-gray-300 text-sm">Designing efficient database structures</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-[#AAC638] rounded-full mt-2 mr-3"></div>
                    <div>
                      <h4 className="text-[#AAC638] font-semibold">DevOps & Cloud</h4>
                      <p className="text-gray-300 text-sm">Implementing CI/CD with Docker and Azure</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 relative">
        <div className="max-w-6xl mx-auto px-6">
          {/* Skills Section Heading */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isVisible.skills ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6"
                style={{ color: '#AAC638' }}>
              Skills & Technologies
            </h2>
            <div className="w-24 h-1 mx-auto mb-8" style={{ background: '#AAC638' }}></div>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {Object.entries(skills).map(([category, items], index) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 30 }}
                animate={isVisible.skills ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className=""
              >
                <div className="flex items-center mb-4">
                  {category === 'languages' && <Code className="w-6 h-6 text-[#AAC638] mr-3" />}
                  {category === 'frameworks' && <Layers className="w-6 h-6 text-[#AAC638] mr-3" />}
                  {category === 'databases' && <Database className="w-6 h-6 text-[#AAC638] mr-3" />}
                  {category === 'tools' && <Settings className="w-6 h-6 text-[#AAC638] mr-3" />}
                  {category === 'architecture' && <Monitor className="w-6 h-6 text-[#AAC638] mr-3" />}
                  <h3 className="text-xl font-bold capitalize text-white">
                    {category.replace(/([A-Z])/g, ' $1').trim()}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {items.map((skill, skillIndex) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={isVisible.skills ? { opacity: 1, scale: 1 } : {}}
                      transition={{ duration: 0.3, delay: (index * 0.1) + (skillIndex * 0.05) }}
                      className="px-3 py-1 border border-[#AAC638] rounded-full text-sm text-[#AAC638] bg-transparent hover:bg-[#AAC638] hover:text-black transition-all cursor-default"
                      whileHover={{ scale: 1.05 }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-6">
          {/* Projects Section Heading */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isVisible.projects ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6"
                style={{ color: '#AAC638' }}>
              Featured Projects
            </h2>
            <div className="w-24 h-1 mx-auto mb-8" style={{ background: '#AAC638' }}></div>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-10">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isVisible.projects ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="group overflow-hidden transition-all duration-300 border border-[#AAC638] rounded-2xl bg-black/80 hover:shadow-[0_4px_32px_0_rgba(170,198,56,0.15)]"
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 border border-[#AAC638] rounded-full text-xs text-[#AAC638] bg-transparent">
                      {project.category}
                    </span>
                    <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-[#AAC638] transition-colors" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white group-hover:text-[#AAC638] transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-300 mb-4 text-sm leading-relaxed">
                    {project.description}
                  </p>
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-[#AAC638] mb-2">Key Features:</h4>
                    <ul className="text-xs text-gray-400 space-y-1">
                      {project.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center">
                          <div className="w-1 h-1 bg-[#AAC638] rounded-full mr-2"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 border border-[#AAC638] rounded text-xs text-[#AAC638] bg-transparent"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Education & Certifications Section */}
      <section id="education" className="py-20 relative">
        <div className="max-w-6xl mx-auto px-6">
          {/* Education & Certifications Section Heading */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isVisible.education ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6"
                style={{ color: '#AAC638' }}>
              Education & Certifications
            </h2>
            <div className="w-24 h-1 mx-auto mb-8" style={{ background: '#AAC638' }}></div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-16">
            {/* Education */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isVisible.education ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className=""
            >
              <div>
                <div className="flex items-center mb-6">
                  <GraduationCap className="w-8 h-8 text-[#AAC638] mr-3" />
                  <h3 className="text-2xl font-bold text-[#AAC638]">Education</h3>
                </div>
                
                <div className="space-y-6">
                  <div className="border-l-2 border-[#AAC638] pl-6">
                    <div className="flex items-center mb-2">
                      <div className="w-3 h-3 bg-[#AAC638] rounded-full -ml-8 mr-4"></div>
                      <span className="text-[#AAC638] text-sm">2022 - Present</span>
                    </div>
                    <h4 className="text-xl font-bold text-white mb-2">
                      BSc Hons Software Engineering
                    </h4>
                    <p className="text-[#AAC638] font-semibold mb-2">
                      Sri Lanka Institute of Information Technology (SLIIT)
                    </p>
                    <p className="text-gray-300 text-sm">
                      Comprehensive study in software development, data structures, algorithms, 
                      database systems, and modern development practices.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Certifications */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isVisible.education ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className=""
            >
              <div>
                <div className="flex items-center mb-6">
                  <Award className="w-8 h-8 text-[#AAC638] mr-3" />
                  <h3 className="text-2xl font-bold text-[#AAC638]">Certifications</h3>
                </div>
                
                <div className="max-h-96 overflow-y-auto pr-2">
                  <div className="grid gap-3">
                    {certifications.map((cert, index) => (
                      <motion.div
                        key={cert}
                        initial={{ opacity: 0, x: 20 }}
                        animate={isVisible.education ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.3, delay: 0.6 + (index * 0.05) }}
                        className="flex items-center p-3 border border-[#AAC638] rounded-lg hover:bg-[#AAC638] hover:text-black transition-all"
                      >
                        <Star className="w-4 h-4 text-[#AAC638] mr-3 flex-shrink-0" />
                        <span className="text-gray-300 text-sm">{cert}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

    {/* Video Showcase Section */}
      <section id="video-showcase" className="py-20 relative">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isVisible['video-showcase'] ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: '#AAC638' }}>
              Video Showcase
            </h2>
            <div className="w-24 h-1 mx-auto mb-8" style={{ background: '#AAC638' }}></div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Project Demo (Left) */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isVisible['video-showcase'] ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-black/80 border-2 border-yellow-400 rounded-2xl p-6 flex flex-col items-center shadow-lg"
            >
              <div className="flex items-center mb-6">
                <Code className="w-8 h-8 text-yellow-400 mr-3" />
                <h3 className="text-2xl font-bold text-yellow-400">Project Demo</h3>
              </div>
              
              {/* Video Player with Navigation */}
              <div className="w-full mb-4">
                <div className="aspect-w-16 aspect-h-9 rounded-xl overflow-hidden w-full border border-[#AAC638] mb-4">
                  <video
                    ref={luminaRef}
                    controls
                    className="w-full h-full object-cover"
                    onMouseEnter={() => luminaRef.current && luminaRef.current.play()}
                    onMouseLeave={() => luminaRef.current && luminaRef.current.pause()}
                  >
                    <source src={vendorVideo} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
                
                {/* Navigation Buttons */}
                <div className="flex justify-center space-x-4 mb-4">
                  <motion.button
                    onClick={() => {
                      if (luminaRef.current) {
                        luminaRef.current.src = vendorVideo;
                        luminaRef.current.load();
                        luminaRef.current.play();
                      }
                    }}
                    className="px-4 py-2 bg-yellow-400 text-black font-semibold rounded hover:bg-yellow-500 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Project 1
                  </motion.button>
                  <motion.button
                    onClick={() => {
                      if (luminaRef.current) {
                        luminaRef.current.src = newProjectVideo;
                        luminaRef.current.load();
                        luminaRef.current.play();
                      }
                    }}
                    className="px-4 py-2 bg-[#AAC638] text-black font-semibold rounded hover:bg-green-500 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Project 2
                  </motion.button>
                </div>
              </div>
              
              <a
                href="https://www.linkedin.com/posts/sandaru-kaushan-03b045267_fullstackdevelopment-reactjs-nodejs-activity-7341149905127673856-Ui2P?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEFS1e8BsXe4a_t1T4osBv5ztIqx6jlB6So"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center px-4 py-2 bg-[#AAC638] text-black font-semibold rounded hover:bg-green-500 transition-colors"
              >
                View Project <ExternalLink className="w-4 h-4 ml-2" />
              </a>
            </motion.div>
            {/* Video Editing Projects (Right) */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isVisible['video-showcase'] ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-black/90 border-2 border-[#AAC638] rounded-2xl p-6 flex flex-col items-center shadow-lg"
            >
              <div className="flex items-center mb-6">
                <Film className="w-8 h-8 text-[#AAC638] mr-3" />
                <h3 className="text-2xl font-bold text-[#AAC638]">Video Editing Projects</h3>
              </div>
              <div className="aspect-w-16 aspect-h-9 rounded-xl overflow-hidden w-full mb-4 border border-[#AAC638]">
                <video
                  ref={fiverrRef}
                  controls
                  className="w-full h-full object-cover"
                  onMouseEnter={() => fiverrRef.current && fiverrRef.current.play()}
                  onMouseLeave={() => fiverrRef.current && fiverrRef.current.pause()}
                >
                  <source src={fiverrVideo} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
              <a
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center px-4 py-2 bg-[#AAC638] text-black font-semibold rounded hover:bg-green-600 transition-colors"
              >
                View on Fiverr <ExternalLink className="w-4 h-4 ml-2" />
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 relative">
        <div className="max-w-6xl mx-auto px-6">
          {/* Let's Connect Section Heading */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isVisible.contact ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: '#AAC638' }}>
              Let's Connect
            </h2>
            <div className="w-24 h-1 mx-auto mb-8" style={{ background: '#AAC638' }}></div>
          </motion.div>

          <div className="flex flex-col md:flex-row gap-12 items-center justify-center">
            {/* Contact Info Card */}
            <motion.div
              initial={{ opacity: 0, x: 0 }}
              animate={isVisible.contact ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-full max-w-xl border border-[#AAC638] rounded-xl p-8 bg-black/60"
            >
              <h3 className="text-2xl font-bold text-[#AAC638] mb-6 text-center">Get In Touch</h3>
              <p className="text-gray-300 mb-8 text-center">
                I'm always open to discussing new opportunities, collaborating on exciting projects, 
                or just having a chat about technology and innovation. Feel free to reach out directly!
              </p>
              <div className="space-y-6">
                <motion.a
                  href="mailto:Sandarukaushan999@gmail.com"
                  className="flex items-center justify-center p-4 border border-[#AAC638] rounded-lg hover:bg-[#AAC638] hover:text-black transition-all group"
                  whileHover={{ scale: 1.03 }}
                >
                  <Mail className="w-6 h-6 text-[#AAC638] mr-4 group-hover:text-black transition-colors" />
                  <span className="text-white font-semibold group-hover:text-black">Sandarukaushan999@gmail.com</span>
                </motion.a>
                <motion.a
                  href="tel:+94766674884"
                  className="flex items-center justify-center p-4 border border-[#AAC638] rounded-lg hover:bg-[#AAC638] hover:text-black transition-all group"
                  whileHover={{ scale: 1.03 }}
                >
                  <Phone className="w-6 h-6 text-[#AAC638] mr-4 group-hover:text-black transition-colors" />
                  <span className="text-white font-semibold group-hover:text-black">+94 76 6674 884</span>
                </motion.a>
                <div className="flex items-center justify-center p-4 border border-[#AAC638] rounded-lg">
                  <MapPin className="w-6 h-6 text-[#AAC638] mr-4" />
                  <span className="text-white font-semibold">Malabe, Colombo, Sri Lanka</span>
                </div>
                <motion.button
                  className="w-full mt-6 px-6 py-3 bg-gradient-to-r from-[#AAC638] to-green-500 rounded-lg font-semibold hover:shadow-lg hover:shadow-[#AAC638]/25 transition-all flex items-center justify-center text-black"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    const link = document.createElement('a');
                    link.href = sandaruCV;
                    link.download = 'Sandaru_Kaushan_CV.pdf';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                  }}
                >
                  <Download className="w-5 h-5 inline mr-2" />
                  Download CV
                </motion.button>
              </div>
            </motion.div>

            {/* HTML Tag Hunter Game */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={isVisible.contact ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="w-full max-w-xl"
            >
              <HtmlTagHunterGame />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-yellow-500/30 bg-gray-900/50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-green-500 bg-clip-text text-transparent mt-6 mb-4 h4">
                SANDARU KAUSHAN
              </h3>
              <p className="text-gray-400 mb-6">
                Building the future, one line of code at a time.
              </p>
              <div className="flex justify-center space-x-6 mb-8">
                <motion.a
                  href="https://github.com/Sandarukaushan999/Sandaru_kaushan1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-yellow-400 transition-colors"
                  whileHover={{ scale: 1.2 }}
                >
                  <Github className="w-6 h-6" />
                </motion.a>
                <motion.a
                  href="https://www.linkedin.com/in/sandaru-kaushan-03b045267/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-green-400 transition-colors"
                  whileHover={{ scale: 1.2 }}
                >
                  <Linkedin className="w-6 h-6" />
                </motion.a>
                <motion.a
                  href="mailto:Sandarukaushan999@gmail.com"
                  className="text-gray-400 hover:text-yellow-400 transition-colors"
                  whileHover={{ scale: 1.2 }}
                >
                  <Mail className="w-6 h-6" />
                </motion.a>
              </div>
              <div className="text-gray-500 text-sm">
                © 2024 Sandaru Kaushan. All rights reserved.
              </div>
            </motion.div>
          </div>
        </div>
      </footer>

      {/* Chatbot */}
      <Chatbot />
    </div>
  );
};

// TypingEffect with 3 blinking cursors and green color for all lines
const typingLines = [
  'Software Engineer Undergraduate',
  'Mobile Application Developer',
  'Fullstack Developer'
];

function TypingEffect({ animate }) {
  const [lineIdx, setLineIdx] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [typing, setTyping] = useState(true);

  // Reset typing effect when animate becomes true
  useEffect(() => {
    if (!animate) {
      setDisplayed('');
      setTyping(true);
      setLineIdx(0);
    }
  }, [animate]);

  useEffect(() => {
    if (!animate) return;
    let timeout;
    if (typing && displayed.length < typingLines[lineIdx].length) {
      timeout = setTimeout(() => {
        setDisplayed(typingLines[lineIdx].slice(0, displayed.length + 1));
      }, 50);
    } else if (typing && displayed.length === typingLines[lineIdx].length) {
      timeout = setTimeout(() => setTyping(false), 1000);
    } else if (!typing) {
      timeout = setTimeout(() => {
        setDisplayed('');
        setTyping(true);
        setLineIdx((prev) => (prev + 1) % typingLines.length);
      }, 1000);
    }
    return () => clearTimeout(timeout);
  }, [displayed, typing, lineIdx, animate]);

  // Render 3 blinking cursors at both sides
  return (
    <div className="text-2xl md:text-3xl font-mono mb-4 min-h-[2.5rem] flex justify-center items-center gap-2">
      <span className="flex gap-1">
        <span className="text-[#AAC638] animate-pulse">|</span>
        <span className="text-[#AAC638] animate-pulse" style={{ animationDelay: '0.2s' }}>|</span>
        <span className="text-[#AAC638] animate-pulse" style={{ animationDelay: '0.4s' }}>|</span>
      </span>
      <span className="text-[#AAC638]">
        {displayed}
      </span>
      <span className="flex gap-1">
        <span className="text-[#AAC638] animate-pulse">|</span>
        <span className="text-[#AAC638] animate-pulse" style={{ animationDelay: '0.2s' }}>|</span>
        <span className="text-[#AAC638] animate-pulse" style={{ animationDelay: '0.4s' }}>|</span>
      </span>
    </div>
  );
}

export default Portfolio;
