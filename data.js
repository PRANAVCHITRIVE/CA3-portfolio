/**
 * ===================================================================
 * PORTFOLIO DATA CONFIGURATION
 * JavaScript Lab CA3 Mini Project - Symbiosis Institute of Technology
 * ===================================================================
 * This file contains all personal, academic, project, skill, and
 * achievement data for the portfolio. You can edit any details here
 * or use the in-browser "Edit Profile" widget!
 */

const PORTFOLIO_DATA = {
  profile: {
    name: "Pranav Chitrive",
    role: "Full-Stack Software Engineer & AI Enthusiast",
    tagline: "Building scalable web architectures, intelligent systems, and modern digital experiences.",
    avatar: "assets/images/profile-avatar.jpg",
    prn: "24070521084",
    institution: "Symbiosis Institute of Technology (SIT), Nagpur",
    department: "Department of Computer Science & Engineering",
    degree: "B.Tech in Computer Science & Engineering",
    batch: "2024 – 2028",
    currentSem: "Semester V",
    cgpa: "9.32",
    status: "Open to Summer 2026 Internships",
    location: "Nagpur, Maharashtra, India",
    email: "pranav.chitrive.btech2024@sitnagpur.siu.edu.in",
    altEmail: "pranavchitrive.dev@gmail.com",
    phone: "+91 98765 43210",
    socials: {
      github: "https://github.com/pranavchitrive",
      linkedin: "https://linkedin.com/in/pranavchitrive",
      leetcode: "https://leetcode.com/pranavchitrive",
      twitter: "https://twitter.com/pranav_dev",
      portfolio: "https://pranavchitrive.github.io"
    },
    bio: "I am a 3rd-year Computer Science Engineering student passionate about crafting high-performance full-stack web applications, distributed backend services, and practical AI applications. With a strong foundation in data structures, algorithms, and modern JavaScript architectures, I enjoy turning complex computational ideas into intuitive, elegant digital products.",
    stats: [
      { label: "Overall CGPA", value: "9.32", suffix: "/10" },
      { label: "Completed Projects", value: "14", suffix: "+" },
      { label: "LeetCode Solved", value: "480", suffix: "+" },
      { label: "Certifications", value: "6", suffix: "" }
    ],
    quickFacts: [
      { icon: "🎓", label: "Specialization", val: "AI & Full-Stack Development" },
      { icon: "⚡", label: "Core Stack", val: "JavaScript (ES6+), React, Node.js, Python" },
      { icon: "🏆", label: "Hackathons", val: "Winner @ Smart India Internal 2025" },
      { icon: "🌐", label: "Languages", val: "English, Hindi, Marathi" }
    ]
  },

  education: [
    {
      degree: "Bachelor of Technology (B.Tech) - Computer Science & Engineering",
      institution: "Symbiosis Institute of Technology (SIT), Nagpur",
      university: "Symbiosis International (Deemed University)",
      period: "2024 - 2028",
      score: "CGPA: 9.32 / 10.0 (Dean's Merit List)",
      description: "Core coursework: Data Structures & Algorithms, Object-Oriented Programming, Database Management Systems, Computer Networks, Operating Systems, Web Technologies, Software Engineering, and AI/ML.",
      badge: "In Progress (3rd Year)"
    },
    {
      degree: "Higher Secondary Certificate (HSC) - Class XII (Science PCM + CS)",
      institution: "Bhavan's B.P. Vidya Mandir, Civil Lines, Nagpur",
      university: "Maharashtra State Board (MSBSHSE)",
      period: "2022 - 2024",
      score: "Score: 94.60% (Distinction)",
      description: "Excellence in Mathematics, Computer Science, and Physics. Elected President of the High School Computer Science Club.",
      badge: "Completed"
    },
    {
      degree: "Secondary School Certificate (SSC) - Class X",
      institution: "Centre Point School, Katol Road, Nagpur",
      university: "Central Board of Secondary Education (CBSE)",
      period: "2020 - 2022",
      score: "Score: 96.20% (Gold Merit Medal)",
      description: "School topper in Mathematics (100/100) and Computer Applications. Represented school in National Science Olympiad.",
      badge: "Completed"
    }
  ],

  academicMarks: {
    cgpa: 9.32,
    maxCgpa: 10.0,
    percentageEquivalent: "88.54%",
    semesters: [
      { sem: "Sem 1", sgpa: 9.12, credits: 21, status: "Cleared" },
      { sem: "Sem 2", sgpa: 9.28, credits: 22, status: "Cleared" },
      { sem: "Sem 3", sgpa: 9.45, credits: 24, status: "Cleared" },
      { sem: "Sem 4", sgpa: 9.42, credits: 23, status: "Cleared" },
      { sem: "Sem 5 (Current)", sgpa: 9.35, credits: 22, status: "Ongoing" }
    ],
    highlights: [
      { subject: "JavaScript & Modern Web Tech", grade: "O (Outstanding)", score: "98/100" },
      { subject: "Data Structures & Algorithms", grade: "O (Outstanding)", score: "95/100" },
      { subject: "Database Management Systems", grade: "A+ (Excellent)", score: "92/100" },
      { subject: "Computer Networks & Protocols", grade: "A+ (Excellent)", score: "91/100" }
    ]
  },

  skills: [
    {
      category: "Programming Languages",
      icon: "💻",
      items: [
        { name: "JavaScript (ES6+)", level: 95, icon: "⚡" },
        { name: "Python 3", level: 90, icon: "🐍" },
        { name: "C / C++", level: 85, icon: "⚙️" },
        { name: "TypeScript", level: 80, icon: "🔷" },
        { name: "SQL (Postgres/MySQL)", level: 88, icon: "🗄️" }
      ]
    },
    {
      category: "Frontend Development",
      icon: "🎨",
      items: [
        { name: "Modern HTML5 & Semantic Web", level: 98, icon: "🌐" },
        { name: "CSS3 / CSS Grid & Flexbox", level: 95, icon: "🎭" },
        { name: "Vanilla DOM & Web APIs", level: 95, icon: "📜" },
        { name: "React.js / Next.js", level: 85, icon: "⚛️" },
        { name: "HTML5 Canvas & 2D Animations", level: 88, icon: "✨" }
      ]
    },
    {
      category: "Backend & Databases",
      icon: "⚙️",
      items: [
        { name: "Node.js & Express", level: 90, icon: "🚀" },
        { name: "RESTful API Architecture", level: 92, icon: "🔌" },
        { name: "PostgreSQL & Prisma ORM", level: 84, icon: "🐘" },
        { name: "MongoDB & Mongoose", level: 86, icon: "🍃" },
        { name: "Redis Caching", level: 78, icon: "⚡" }
      ]
    },
    {
      category: "DevOps, Cloud & Tools",
      icon: "☁️",
      items: [
        { name: "Git & GitHub Collaboration", level: 92, icon: "🐙" },
        { name: "Docker Containerization", level: 80, icon: "🐳" },
        { name: "AWS Cloud (S3, EC2, CloudFront)", level: 75, icon: "☁️" },
        { name: "Linux Bash & Shell Scripting", level: 85, icon: "🐧" },
        { name: "Postman & API Testing", level: 90, icon: "📬" }
      ]
    }
  ],

  projects: [
    {
      id: "project-1",
      title: "NexusCloud – AI & Developer Cloud Telemetry",
      category: "Full-Stack & Cloud",
      tag: "Featured Project",
      image: "assets/images/project-saas.jpg",
      summary: "High-performance microservices dashboard delivering real-time server telemetry, GPU cluster health monitoring, and AI model performance analytics.",
      description: "Engineered an end-to-end telemetry observability dashboard supporting WebSocket live data streaming, interactive canvas charts, and container metric aggregations. Utilizes Redis caching and server-sent events for sub-50ms data refreshes.",
      techStack: ["Vanilla JS", "Node.js", "WebSockets", "CSS Grid", "Canvas API", "Docker"],
      githubUrl: "https://github.com/pranavchitrive/nexus-cloud-telemetry",
      liveUrl: "https://pranavchitrive.github.io/nexus-cloud-telemetry",
      metrics: "Processes 4.2M events/day with 99.98% uptime SLA"
    },
    {
      id: "project-2",
      title: "NeuroVision – Deep Learning Medical Classifier",
      category: "AI / Machine Learning",
      tag: "Research Project",
      image: "assets/images/project-ai.svg",
      summary: "Convolutional neural network web platform for automated chest X-ray pulmonary anomaly detection with Grad-CAM visual heatmaps.",
      description: "Trained and deployed a ResNet-50 vision model reaching 96.8% diagnostic accuracy across 15,000 public clinical scans. Integrated into a fast browser client with client-side image normalization and instant diagnosis reporting.",
      techStack: ["Python", "PyTorch", "FastAPI", "JavaScript", "Grad-CAM", "Chart.js"],
      githubUrl: "https://github.com/pranavchitrive/neurovision-classifier",
      liveUrl: "https://pranavchitrive.github.io/neurovision-classifier",
      metrics: "96.8% Validation Accuracy across 4 pathology classes"
    },
    {
      id: "project-3",
      title: "AegisSentinel – Distributed IoT Edge Node",
      category: "IoT & Systems",
      tag: "Hardware & Edge",
      image: "assets/images/project-iot.svg",
      summary: "Ultra-low-power environmental telemetry sentinel using ESP32 microcontrollers, MQTT message broker, and real-time browser dashboard.",
      description: "Designed a multi-sensor firmware stack monitoring ambient air quality, temperature, and acoustics with edge anomaly detection. Transmits telemetry via MQTT to a Node.js gateway that broadcasts alerts via WebSockets.",
      techStack: ["C++ / Arduino", "ESP32", "MQTT", "Node.js", "Vanilla JS", "Tailored CSS"],
      githubUrl: "https://github.com/pranavchitrive/aegis-sentinel-iot",
      liveUrl: "https://pranavchitrive.github.io/aegis-sentinel-iot",
      metrics: "Sub-10ms sensor publish latency over local WiFi mesh"
    },
    {
      id: "project-4",
      title: "JS Lab Master Suite – 10 Practicals Showcase",
      category: "Web & JavaScript Lab",
      tag: "Curriculum Showcase",
      image: "assets/images/project-jslab.svg",
      summary: "Interactive web laboratory demonstrating all 10 core JavaScript Lab experiments with live playgrounds, regex evaluators, and DOM tools.",
      description: "Includes live implementations of Cart & Billing Invoice Generator with GST calculations (Exp 2 & 5), String manipulation and Palindrome verification (Exp 4 & 6), dynamic LocalStorage viewer (Exp 9), and async JSON table loader (Exp 10).",
      techStack: ["HTML5", "CSS3 Glassmorphism", "Vanilla ES6+", "DOM API", "Web Storage API"],
      githubUrl: "https://github.com/pranavchitrive/js-lab-ca3-portfolio",
      liveUrl: "#jslab-demo",
      metrics: "10/10 Experiments Fully Functional with Interactive Playgrounds"
    }
  ],

  certificates: [
    {
      title: "AWS Certified Cloud Practitioner (CLF-C02)",
      issuer: "Amazon Web Services (AWS)",
      date: "August 2025",
      id: "AWS-CLF-9481023",
      credentialUrl: "https://aws.amazon.com/verification",
      image: "assets/images/cert-aws.svg",
      description: "Validated fundamental cloud architecture expertise, AWS core infrastructure, identity management (IAM), compute, storage (S3), and security best practices."
    },
    {
      title: "DeepLearning.AI Machine Learning Specialization",
      issuer: "Stanford Online & DeepLearning.AI",
      date: "June 2025",
      id: "COURSERA-ML-7729104",
      credentialUrl: "https://coursera.org/verify/ML7729104",
      image: "assets/images/cert-python.svg",
      description: "Completed 3-course curriculum covering Supervised Machine Learning (Linear & Logistic Regression, Decision Trees), Neural Networks, and Unsupervised Learning."
    },
    {
      title: "Meta Certified Front-End Developer Professional",
      issuer: "Meta (Facebook)",
      date: "March 2025",
      id: "META-FED-8842918",
      credentialUrl: "https://coursera.org/verify/METAFED8842",
      image: "assets/images/cert-web.svg",
      description: "Mastered responsive layout design, advanced JavaScript (asynchronous paradigms, closures, prototypes), UI testing with Jest, and accessibility standards (WCAG)."
    }
  ],

  achievements: [
    {
      title: "1st Place Winner – Smart India Hackathon (College Internal)",
      organization: "Ministry of Education & SIT Nagpur",
      date: "September 2025",
      icon: "🥇",
      highlight: "Cash Prize & University Representative Nomination",
      detail: "Led a 6-member team to construct an AI-powered municipal water pipeline leakage detection telemetry system using real-time pressure sensor variance."
    },
    {
      title: "LeetCode Knight Rating (1940+ Peak Rating)",
      organization: "LeetCode Competitive Programming",
      date: "Ongoing 2025 - 2026",
      icon: "⚡",
      highlight: "Top 4.2% Globally | 480+ Problems Solved",
      detail: "Consistent contest participant (Biweekly & Weekly). High proficiency in Dynamic Programming, Graph Traversals, Binary Trees, and Greedy Algorithms."
    },
    {
      title: "Dean's Academic Merit Honor List",
      organization: "Symbiosis Institute of Technology",
      date: "Academic Year 2024 - 2025",
      icon: "📜",
      highlight: "Top 5 Rank in CSE Department",
      detail: "Awarded Dean's Academic Merit Certificate for consecutive semester SGPA above 9.25 and outstanding lab project submissions."
    },
    {
      title: "Finalist – National TechFest Algorithmic CodeSprint",
      organization: "IIT Bombay & Techfest",
      date: "December 2024",
      icon: "🏆",
      highlight: "All India Rank 34 out of 3,800+ Participants",
      detail: "Solved 6 complex algorithmic problems in 2.5 hours covering Segment Trees, Dijkstra variants, and Bitwise Dynamic Programming."
    }
  ],

  contributions: [
    {
      role: "Technical Lead & Co-Organizer",
      organization: "Google Developer Student Clubs (GDSC) – SIT Nagpur Chapter",
      period: "August 2025 - Present",
      icon: "🌐",
      description: "Spearheaded technical workshops on Modern JavaScript, Git/GitHub, and Cloud Computing reaching over 350+ engineering students. Mentored junior batches in hackathon preparation."
    },
    {
      role: "Core Committee Member",
      organization: "SIT TechFest & Hack-O-Week",
      period: "October 2025",
      icon: "🤝",
      description: "Managed logistics, judging criteria platform, and technical support for a 36-hour offline hackathon hosting 45 teams from across central India."
    },
    {
      role: "Open Source Contributor",
      organization: "GitHub Community",
      period: "2024 - Present",
      icon: "🐙",
      description: "Authored 2 open-source developer tool utilities with 120+ GitHub stars. Contributed bug fixes and documentation improvements to popular community frontend libraries."
    },
    {
      role: "Student Peer Mentor",
      organization: "SIT CSE Coding Peer Circle",
      period: "January 2025 - Present",
      icon: "💡",
      description: "Conducting weekly problem-solving sessions focusing on C++ STL, JavaScript fundamentals, and interview preparation for batchmates."
    }
  ],

  gallery: [
    {
      title: "Smart India Hackathon Team Sprint",
      subtitle: "36-Hour Continuous Collaborative Coding",
      image: "assets/images/gallery-hackathon.jpg",
      category: "Hackathons",
      tag: "SIH 2025"
    },
    {
      title: "NexusCloud Architecture Presentation",
      subtitle: "Demonstrating Microservices Telemetry at SIT TechFest",
      image: "assets/images/project-saas.jpg",
      category: "Symposium",
      tag: "TechFest"
    },
    {
      title: "IoT Edge Sentinel Hardware Prototyping",
      subtitle: "Assembling Sensor Nodes in Advanced Computing Lab",
      image: "assets/images/gallery-symposium.svg",
      category: "Workshops",
      tag: "Hardware Lab"
    },
    {
      title: "GDSC JavaScript & Web Architecture Workshop",
      subtitle: "Mentoring 80+ Students on Vanilla JS and DOM APIs",
      image: "assets/images/gallery-workshop.svg",
      category: "Workshops",
      tag: "GDSC"
    }
  ],

  careerInterests: [
    {
      role: "Full-Stack Software Engineer",
      icon: "🚀",
      description: "Architecting end-to-end resilient web applications with modern frontend aesthetics and high-throughput asynchronous backend systems.",
      targetCompanies: "Product SaaS firms, Fast-growth Tech startups, Global R&D hubs"
    },
    {
      role: "AI / ML Systems Engineer",
      icon: "🧠",
      description: "Bridging deep learning models with scalable production web services, model optimization, and interactive data visualization.",
      targetCompanies: "Applied AI labs, Autonomous systems, Healthcare tech"
    },
    {
      role: "Cloud & DevOps Engineer",
      icon: "☁️",
      description: "Designing containerized microservices architectures, automated CI/CD deployment pipelines, and zero-downtime infrastructure.",
      targetCompanies: "Cloud platform providers, Infrastructure & tooling engineering"
    }
  ]
};

// Export to window object for access across modular scripts
window.PORTFOLIO_DATA = PORTFOLIO_DATA;
