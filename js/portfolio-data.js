/**
 * Krish Kumar Dey - Portfolio Structured Data Module
 * Recruiter-Audited Copy: 100% Grounded, Transparent & Realistic (Zero Fabrication / Zero Fluff)
 */

const PORTFOLIO_DATA = {
  profile: {
    fullName: "Krish Kumar Dey",
    preferredName: "Krish",
    degree: "B.Tech Computer Science & IT",
    university: "Ajeenkya DY Patil University (ADYPU)",
    location: "Lohegaon, Pune, Maharashtra, India",
    expectedGraduation: "2029",
    careerTarget: "SOC Analyst",
    primaryInterests: [
      "Cybersecurity",
      "SOC Operations",
      "Bug Bounty Hunting",
      "Web Application Security",
      "SIEM",
      "Linux Administration",
      "Networking",
      "Network Security",
      "Security Monitoring"
    ],
    socials: {
      tryHackMe: "https://tryhackme.com/p/krishdey100",
      hackTheBox: "https://profile.hackthebox.com/dashboard",
      github: "https://github.com/OSPANDA5555",
      linkedin: "https://www.linkedin.com/in/krish-dey-dev/",
      email: "krishdey100@gmail.com"
    }
  },

  focusPillars: [
    {
      id: "focus-1",
      icon: "activity",
      title: "SOC Operations & Triage",
      summary: "Learning structured alert triage, log aggregation workflows, and incident response lifecycles.",
      keyTopics: [
        "Event Log Parsing & Analysis",
        "Syslog & SIEM Fundamentals",
        "Incident Triage Procedures"
      ]
    },
    {
      id: "focus-2",
      icon: "network",
      title: "Network Security & Analysis",
      summary: "Studying TCP/IP protocol behavior, packet inspection with Wireshark, and network scanning with Nmap.",
      keyTopics: [
        "Packet Capture (PCAP) Inspection",
        "Host Discovery & Port Scanning",
        "Network Protocol Fundamentals"
      ]
    },
    {
      id: "focus-3",
      icon: "terminal",
      title: "Linux & Systems Security",
      summary: "Practicing daily Linux CLI administration, file permission models, system logging, and process monitoring.",
      keyTopics: [
        "Ubuntu / Linux CLI Administration",
        "File ACLs & SUID Auditing",
        "Bash Automation Scripting"
      ]
    },
    {
      id: "focus-4",
      icon: "code-2",
      title: "Security Automation",
      summary: "Writing lightweight Python and Bash scripts to parse log streams and extract indicators of compromise.",
      keyTopics: [
        "Python Log Parser Scripts",
        "Regex Data Extraction",
        "Basic Threat Intelligence Lookups"
      ]
    }
  ],

  skillsCategorized: {
    programming: [
      {
        name: "Python",
        state: "Practicing",
        stateBadgeClass: "state-cyan",
        description: "Writing scripts for automated log file parsing, string regex matching, and CLI utility generation.",
        relevance: "Automating repetitive data extraction during alert investigation."
      },
      {
        name: "Java",
        state: "Practicing",
        stateBadgeClass: "state-cyan",
        description: "Studying Object-Oriented Programming (OOP) principles, data structures, and software logic.",
        relevance: "Understanding enterprise application logic and backend architecture."
      },
      {
        name: "C++",
        state: "Practicing",
        stateBadgeClass: "state-cyan",
        description: "Studying memory management, pointers, and low-level computer system concepts.",
        relevance: "Understanding system memory fundamentals and execution behavior."
      },
      {
        name: "Rust",
        state: "Learning",
        stateBadgeClass: "state-indigo",
        description: "Exploring safe memory concurrency and modern system programming concepts.",
        relevance: "Next-generation memory-safe systems programming."
      }
    ],
    cybersecurity: [
      {
        name: "SOC Operations",
        state: "Learning",
        stateBadgeClass: "state-indigo",
        description: "Understanding Security Operations Center workflows, alert triage pipelines, and escalation paths.",
        relevance: "Core preparation for entry-level Security Analyst roles."
      },
      {
        name: "SIEM",
        state: "Learning",
        stateBadgeClass: "state-indigo",
        description: "Studying central log aggregation, syslog collection, and basic detection rule correlation.",
        relevance: "Primary diagnostic tool for security event monitoring."
      },
      {
        name: "Networking",
        state: "Practicing",
        stateBadgeClass: "state-cyan",
        description: "Analyzing packet captures, identifying TCP handshake states, and studying network protocols.",
        relevance: "Inspecting malicious traffic patterns and network anomalies."
      },
      {
        name: "Vulnerability Assessment",
        state: "Learning",
        stateBadgeClass: "state-amber",
        description: "Learning port scanning, service enumeration, and basic security vulnerability auditing.",
        relevance: "Identifying unpatched or misconfigured host services."
      },
      {
        name: "Web Security",
        state: "Learning",
        stateBadgeClass: "state-amber",
        description: "Studying OWASP top vulnerabilities, HTTP request/response headers, and parameter proxying.",
        relevance: "Understanding web application attack vectors."
      },
      {
        name: "Bug Bounty & Web Security",
        state: "Practicing",
        stateBadgeClass: "state-cyan",
        description: "Reconnaissance, OWASP Top 10 web vulnerabilities (IDOR, XSS, SSRF, Auth Bypass), and parameter tampering using Burp Suite.",
        relevance: "Hands-on offensive testing to identify exploitable flaws and defend production web apps."
      },
      {
        name: "Security Monitoring",
        state: "Practicing",
        stateBadgeClass: "state-cyan",
        description: "Inspecting host system logs, auth.log entries, and network traffic streams.",
        relevance: "Continuous monitoring for anomalous activity."
      }
    ],
    tools: [
      {
        name: "Wireshark",
        state: "Practicing",
        stateBadgeClass: "state-cyan",
        description: "Inspecting raw packet captures (PCAP), analyzing TCP streams, and identifying unencrypted protocols.",
        relevance: "Deep packet analysis for network security investigation."
      },
      {
        name: "Nmap",
        state: "Practicing",
        stateBadgeClass: "state-cyan",
        description: "Running SYN scans, service version detection, and host discovery scans in test labs.",
        relevance: "Network reconnaissance and asset inventory auditing."
      },
      {
        name: "Burp Suite",
        state: "Practicing",
        stateBadgeClass: "state-cyan",
        description: "Intercepting HTTP/HTTPS web requests, analyzing parameters, and inspecting server responses.",
        relevance: "Web application proxy analysis and header inspection."
      },
      {
        name: "Ubuntu/Linux",
        state: "Practicing",
        stateBadgeClass: "state-cyan",
        description: "Daily CLI operating environment, bash shell scripting, system permissions, and package management.",
        relevance: "Essential operating system environment for security operations."
      }
    ],
    infrastructure: [
      {
        name: "Docker",
        state: "Practicing",
        stateBadgeClass: "state-cyan",
        description: "Containerizing isolated software applications and test environments using Docker Compose.",
        relevance: "Creating lightweight, reproducible security lab environments."
      },
      {
        name: "AWS",
        state: "Learning",
        stateBadgeClass: "state-indigo",
        description: "Studying cloud computing fundamentals, EC2 instances, and security group ingress rules.",
        relevance: "Understanding cloud security infrastructure principles."
      }
    ]
  },

  toolsDetail: [
    {
      name: "Burp Suite",
      category: "WEB SECURITY",
      usage: "HTTP proxy request interception & web security inspection.",
      status: "PRACTICING",
      socRelevance: "Inspecting web traffic parameters and security headers."
    },
    {
      name: "Nmap",
      category: "NETWORK",
      usage: "Port scanning, service version detection & host discovery.",
      status: "PRACTICING",
      socRelevance: "Auditing active network services and open ports."
    },
    {
      name: "Wireshark",
      category: "NETWORK",
      usage: "Deep packet capture analysis & TCP stream reconstruction.",
      status: "PRACTICING",
      socRelevance: "Analyzing raw network PCAPs during alert triage."
    },
    {
      name: "Ubuntu / Linux",
      category: "SYSTEM",
      usage: "Daily Linux CLI environment, bash administration & auth log auditing.",
      status: "PRACTICING",
      socRelevance: "Inspecting host system logs and managing SecOps tools."
    },
    {
      name: "Docker",
      category: "INFRASTRUCTURE",
      usage: "Virtual lab containerization & isolated application testing.",
      status: "PRACTICING",
      socRelevance: "Spinning up isolated test targets safely."
    },
    {
      name: "AWS",
      category: "INFRASTRUCTURE",
      usage: "Cloud infrastructure concepts, EC2 & security groups.",
      status: "LEARNING",
      socRelevance: "Understanding cloud network ingress and IAM concepts."
    }
  ],

  projects: [
    {
      id: "proj-01",
      number: "01",
      title: "Home SOC Lab",
      status: "IN PROGRESS",
      statusBadgeClass: "badge-in-progress",
      tag: "Security Operations & Log Ingestion",
      summary: "SIEM, log ingestion, detection rules writing, and incident investigation across isolated virtual networks.",
      problem: "Traditional academic cybersecurity study often lacks hands-on experience with real-time log aggregation, pfSense firewall routing, and SIEM alert correlation across multi-host environments.",
      solution: "Building a virtualized SOC homelab utilizing pfSense for network segmentation, Security Onion / Elastic SIEM for syslog aggregation, and Linux endpoints to practice real-time alert triage.",
      techStack: ["Splunk / Elastic", "pfSense", "Ubuntu Linux", "Syslog", "Wireshark"],
      architectureDiagram: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80",
      screenshots: [
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80"
      ],
      github: "https://github.com/OSPANDA5555/siem",
      demo: null,
      challenges: [
        "Configuring pfSense virtual interface routing between isolated host subnets",
        "Parsing heterogeneous syslog formats into structured Elastic log indexes"
      ],
      whatILearned: [
        "Hands-on understanding of central log pipeline architecture",
        "Writing custom correlation triggers for SSH password brute-force alerts"
      ]
    },
    {
      id: "proj-02",
      number: "02",
      title: "Network Security Lab",
      status: "PLANNED",
      statusBadgeClass: "badge-planned",
      tag: "Traffic Analysis & Monitoring",
      summary: "Network traffic analysis, host scanning, PCAP inspection, and security monitoring.",
      problem: "Detecting unauthorized port scans, rogue network services, and unencrypted credentials requires deep packet-level inspection capabilities.",
      solution: "Designing packet capture workflows with Wireshark and custom Python Scapy scripts to inspect TCP 3-way handshakes and map active network nodes.",
      techStack: ["Wireshark", "Nmap", "Python (Scapy)", "TCP/IP Stack"],
      architectureDiagram: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80",
      screenshots: [
        "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80"
      ],
      github: "https://github.com/OSPANDA5555/Cyber-sec-lab-",
      demo: null,
      challenges: [
        "Filtering out benign background broadcast traffic during PCAP parsing",
        "Reconstructing fragmented TCP streams from raw packet captures"
      ],
      whatILearned: [
        "Deep protocol-level understanding of OSI Layer 3/4 headers",
        "Automated extraction of packet metadata for security audits"
      ]
    },
    {
      id: "proj-03",
      number: "03",
      title: "Autonomous Threat-Hunting Copilot",
      status: "COMPLETED & VERIFIED",
      statusBadgeClass: "badge-completed",
      tag: "AI SOC Copilot & Zero-Trust Investigation Engine",
      summary: "AI-assisted, zero-trust threat hunting workstation & controlled autonomous investigation engine for SOC analysts with MITRE ATT&CK mapping, interactive indicator graphs, prompt injection defenses, and 38/38 passing Pytest unit tests.",
      problem: "Traditional SOC alert investigations are manual and slow, while unconstrained LLM assistants risk arbitrary code/shell execution, prompt-injection exploits, and hallucinated security conclusions.",
      solution: "Engineered a zero-trust threat-hunting workstation featuring a FastAPI backend, 9 read-only security tools, strict Pydantic schemas, hypothesis state loops, MITRE ATT&CK technique correlation, directional indicator graphs, and an interactive React SOC analyst dashboard.",
      techStack: ["FastAPI", "React", "Python", "Docker", "Pydantic", "MITRE ATT&CK", "Pytest"],
      architectureDiagram: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80",
      screenshots: [
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80"
      ],
      github: "https://github.com/OSPANDA5555/threat-detection",
      demo: "https://threat-detection-os-82c6.vercel.app",
      challenges: [
        "Enforcing strict Zero-Trust boundaries and prompt-injection sanitization (<UNTRUSTED_TELEMETRY_DATA>) across 8 synthetic attack scenarios",
        "Building directional indicator graphs (IP → USER → HOST → PROCESS → FILE) and validating 38/38 unit tests for ground-truth evaluation"
      ],
      whatILearned: [
        "Architecting robust AI security controls with hard autonomy caps, human oversight approval gates, and zero shell execution",
        "Structuring enterprise SOC analyst workflows with MITRE ATT&CK framework alignment and reproducible audit streams"
      ]
    },
    {
      id: "proj-04",
      number: "04",
      title: "Vulnerability Research",
      status: "PLANNED",
      statusBadgeClass: "badge-planned",
      tag: "Web & Network Security",
      summary: "Web and network security experimentation in isolated virtual environments.",
      problem: "Understanding attack vectors and vulnerability mechanics is critical for defensive threat hunting and security hardening.",
      solution: "Configuring local vulnerable web applications in Docker containers to test parameter interception with Burp Suite and verify security patch effectiveness.",
      techStack: ["Burp Suite", "Docker", "OWASP Concepts", "Ubuntu Linux"],
      architectureDiagram: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80",
      screenshots: [
        "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80"
      ],
      github: "https://github.com/OSPANDA5555/Honeypot-1.0",
      demo: null,
      challenges: [
        "Maintaining strict isolation boundaries between test containers and local host network",
        "Analyzing HTTP proxy request headers for subtle security flaws"
      ],
      whatILearned: [
        "Hands-on web application proxy manipulation with Burp Suite",
        "Principles of defense-in-depth and input validation"
      ]
    },
    {
      id: "proj-05",
      number: "05",
      title: "Sentinel-X",
      status: "IN PROGRESS",
      statusBadgeClass: "badge-in-progress",
      tag: "AI SOC Investigator & Adversarial Lab",
      summary: "Autonomous AI-driven SOC investigation platform: correlates security telemetry, constructs attack graphs, and evaluates AI analyst performance under adversarial conditions.",
      problem: "Manual alert investigation does not scale, and trusting AI analysts without adversarial evaluation risks missed detections and prompt-injection abuse.",
      solution: "Decoupled microservice-ready platform with a Next.js SOC dashboard, FastAPI backend, PostgreSQL telemetry store, provider-agnostic AI engine, and a 7-stage tool invocation validator.",
      techStack: ["Next.js", "FastAPI", "PostgreSQL", "Docker", "Python"],
      architectureDiagram: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80",
      screenshots: [
        "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=800&q=80"
      ],
      github: "https://github.com/OSPANDA5555/sentinel-x",
      demo: null,
      challenges: [
        "Enforcing read-only tool constraints and prompt-injection isolation in the 7-stage validator",
        "Correlating heterogeneous telemetry into coherent attack graphs"
      ],
      whatILearned: [
        "Designing provider-agnostic AI engine abstractions across model providers and local mocks",
        "Structuring microservice-ready SOC apps with FastAPI and PostgreSQL via Docker Compose"
      ]
    }
  ],

  journeyTimeline: [
    {
      step: "01",
      status: "COMPLETED",
      statusClass: "badge-emerald",
      topic: "Cybersecurity Fundamentals",
      whatLearning: "Core security principles, CIA Triad (Confidentiality, Integrity, Availability), threat modeling, and defensive security posture.",
      toolsInvolved: ["Security Principles", "Threat Frameworks", "Adversary TTP Concepts"],
      futureGoal: "Maintain a strong theoretical foundation in risk management and defensive strategy."
    },
    {
      step: "02",
      status: "ACTIVE",
      statusClass: "badge-cyan",
      topic: "Linux System Administration",
      whatLearning: "Daily Ubuntu Linux CLI usage, file permission models (chmod/chown), SUID/SGID auditing, bash scripting, and process management.",
      toolsInvolved: ["Ubuntu Linux", "Bash CLI", "systemd", "grep / awk / sed"],
      futureGoal: "Master Linux shell automation and system auditing scripts."
    },
    {
      step: "03",
      status: "ACTIVE",
      statusClass: "badge-cyan",
      topic: "Networking & TCP/IP",
      whatLearning: "OSI 7-Layer model diagnostics, TCP 3-way handshake analysis, IP subnetting, ARP protocol, and DNS query resolution.",
      toolsInvolved: ["TCP/IP Stack", "IP Subnetting", "DNS / HTTP / HTTPS", "netstat / ss"],
      futureGoal: "Deep protocol-level understanding of raw network communications."
    },
    {
      step: "04",
      status: "ACTIVE",
      statusClass: "badge-cyan",
      topic: "Security Tools Mastery",
      whatLearning: "Hands-on packet capture inspection with Wireshark, host discovery scanning with Nmap, and HTTP proxy parameter interception with Burp Suite.",
      toolsInvolved: ["Wireshark", "Nmap", "Burp Suite", "Scapy"],
      futureGoal: "Proficiency with essential defensive scanning and inspection utilities."
    },
    {
      step: "05",
      status: "ACTIVE",
      statusClass: "badge-cyan",
      topic: "TryHackMe Defensive Rooms",
      whatLearning: "Guided interactive security labs focusing on SOC fundamentals, network rooms, Linux machines, and Wireshark PCAP challenges.",
      toolsInvolved: ["TryHackMe Rooms", "Linux Targets", "SOC Fundamentals"],
      futureGoal: "Complete dedicated SOC Analyst and Cyber Defense learning paths."
    },
    {
      step: "06",
      status: "PRACTICING",
      statusClass: "badge-indigo",
      topic: "Hack The Box Machine Practice",
      whatLearning: "Practicing machine service enumeration, target reconnaissance, vulnerability inspection, and privilege escalation concepts.",
      toolsInvolved: ["Hack The Box", "Linux Targets", "Recon Utilities"],
      futureGoal: "Strengthen hands-on machine analysis and security problem-solving skills."
    },
    {
      step: "07",
      status: "LEARNING",
      statusClass: "badge-amber",
      topic: "SIEM & Log Aggregation",
      whatLearning: "Studying central log ingestion, syslog formatting, Elastic / Splunk search syntax, and event correlation rules.",
      toolsInvolved: ["Splunk / Elastic", "Syslog", "Log Parsers"],
      futureGoal: "Deploy a functional virtual homelab SIEM aggregator."
    },
    {
      step: "08",
      status: "LEARNING",
      statusClass: "badge-amber",
      topic: "SOC Fundamentals & Triage",
      whatLearning: "Understanding alert triaging workflows, incident response lifecycles, threat containment protocols, and MITRE ATT&CK mapping.",
      toolsInvolved: ["SOC Workflows", "MITRE ATT&CK", "Incident Playbooks"],
      futureGoal: "Master real-time security alert investigation and incident report drafting."
    },
    {
      step: "09",
      status: "FUTURE TARGET",
      statusClass: "badge-planned",
      topic: "Future Certifications",
      whatLearning: "Preparing for industry certifications (e.g. CompTIA Security+ / eJPT) to formally validate technical security capabilities.",
      toolsInvolved: ["Industry Curriculums", "Practice Labs", "Exam Objectives"],
      futureGoal: "Achieve foundational cybersecurity industry credentials during university degree."
    },
    {
      step: "10",
      status: "CAREER GOAL",
      statusClass: "badge-planned",
      topic: "Target: SOC Analyst Role",
      whatLearning: "Applying Computer Science & IT degree knowledge, homelab experience, and platform training toward SOC Analyst positions.",
      toolsInvolved: ["SOC Operations", "SecOps Teamwork", "Continuous Monitoring"],
      futureGoal: "Secure an entry-level SOC Analyst or Security Trainee position."
    }
  ],

  platforms: [
    {
      id: "thm",
      name: "TryHackMe",
      handle: "krishdey100",
      profileUrl: "https://tryhackme.com/p/krishdey100",
      icon: "terminal",
      accent: "#10B981",
      statusText: "Active Learning Profile",
      description: "Practicing guided security rooms, SOC Analyst fundamentals, packet capture inspection, and Linux machine challenges."
    },
    {
      id: "htb",
      name: "Hack The Box",
      handle: "OSPANDA5555",
      profileUrl: "https://profile.hackthebox.com/dashboard",
      icon: "box",
      accent: "#9FEF00",
      statusText: "Hands-On Practice Profile",
      description: "Practicing machine enumeration, service reconnaissance, and basic vulnerability analysis in isolated virtual environments."
    },
    {
      id: "github",
      name: "GitHub",
      handle: "OSPANDA5555",
      profileUrl: "https://github.com/OSPANDA5555",
      icon: "github",
      accent: "#00E5FF",
      statusText: "Open Source Code Repository",
      description: "Code repository hosting the threat-detection platform, Sentinel-X, SIEM homelab notes, honeypot experiments, and TryHackMe lab writeups."
    },
    {
      id: "linkedin",
      name: "LinkedIn",
      handle: "krish-dey-dev",
      profileUrl: "https://www.linkedin.com/in/krish-dey-dev/",
      icon: "linkedin",
      accent: "#0A66C2",
      statusText: "Professional Network Profile",
      description: "Connecting with cybersecurity practitioners, SOC analysts, and engineering teams. Sharing project milestones and research findings."
    }
  ],

  currentlyLearning: [
    {
      topic: "SIEM & Log Aggregation",
      area: "SOC Operations",
      status: "ACTIVE STUDY",
      note: "Studying syslog formatting, central log aggregation, and search query syntax in Elastic / Splunk."
    },
    {
      topic: "Python Security Automation",
      area: "Scripting",
      status: "PRACTICING",
      note: "Developing regex parsers for text logs and extracting IP indicators of compromise."
    },
    {
      topic: "Network Protocol Analysis",
      area: "Networking",
      status: "PRACTICING",
      note: "Inspecting TCP 3-way handshakes and DNS queries using Wireshark PCAP captures."
    },
    {
      topic: "Bug Bounty & Web Security",
      area: "Offensive Defense",
      status: "PRACTICING",
      note: "Exploring OWASP Top 10 vulnerabilities (IDOR, XSS, SSRF) and Burp Suite HTTP proxy testing on target scopes."
    }
  ],

  education: {
    studentName: "Krish Kumar Dey",
    institution: "Ajeenkya DY Patil University",
    shortInstitution: "ADYPU",
    location: "Lohegaon, Pune, Maharashtra, India",
    degree: "Bachelor of Technology (B.Tech)",
    branch: "Computer Science & IT",
    focus: "Cybersecurity Focus",
    specialization: "Cybersecurity",
    timeline: "2025 — 2029",
    expectedGraduation: "2029",
    targetRole: "SOC Analyst",
    status: "IN PROGRESS",
    statusBadgeClass: "badge-in-progress"
  },

  simulatedEvents: [
    {
      id: "EVT-1089",
      timestamp: "14:22:08.102",
      domain: "NETWORK",
      tool: "Wireshark",
      eventType: "PACKET_INSPECT",
      severity: "INFO",
      sourceIp: "192.168.1.104",
      destIp: "10.0.0.15:443",
      summary: "TLS 1.3 Handshake Client Hello / Cipher Suite Negotiation",
      rawSnippet: "0000  45 00 00 3c a1 b2 40 00  40 06 7c 11 c0 a8 01 68  E..<..@.@.|...h\n0010  0a 00 00 0f 01 bb d4 31  a2 b4 10 e8 00 00 00 00  .......3........",
      notes: "Standard encrypted TLS session initiation. Inspected TCP window size and handshake flags."
    },
    {
      id: "EVT-1090",
      timestamp: "14:22:15.890",
      domain: "WEB SECURITY",
      tool: "Burp Suite",
      eventType: "HTTP_PROXY",
      severity: "LOW",
      sourceIp: "127.0.0.1:8080",
      destIp: "lab-app.local:80",
      summary: "HTTP GET Request Intercepted / User-Agent Inspection",
      rawSnippet: "GET /api/v1/user/profile HTTP/1.1\nHost: lab-app.local\nUser-Agent: Mozilla/5.0 (X11; Ubuntu; Linux x86_64)\nAccept: application/json",
      notes: "Intercepted request header parameter for proxy inspection before forwarding to target."
    },
    {
      id: "EVT-1091",
      timestamp: "14:22:24.411",
      domain: "NETWORK",
      tool: "Nmap",
      eventType: "PORT_SCAN",
      severity: "MEDIUM",
      sourceIp: "10.0.2.15",
      destIp: "10.0.2.80",
      summary: "SYN Port Scan Detected on Ports 22, 80, 443, 8080",
      rawSnippet: "Nmap scan report for 10.0.2.80\nPORT     STATE SERVICE\n22/tcp   open  ssh\n80/tcp   open  http\n443/tcp  open  https",
      notes: "Host discovery scan completed. Identified active SSH and web HTTP services on target subnet."
    },
    {
      id: "EVT-1092",
      timestamp: "14:22:31.005",
      domain: "SYSTEM",
      tool: "Ubuntu / Linux",
      eventType: "AUTH_AUDIT",
      severity: "WARN",
      sourceIp: "192.168.1.45",
      destIp: "localhost:22",
      summary: "Failed SSH Login Attempt / auth.log Event Trigger",
      rawSnippet: "Aug 10 14:22:31 ubuntu-sec sshd[4102]: Failed password for invalid user admin from 192.168.1.45 port 54210 ssh2",
      notes: "System auth.log entry parsed. Single failed authentication attempt recorded."
    },
    {
      id: "EVT-1093",
      timestamp: "14:22:40.782",
      domain: "SOC",
      tool: "SIEM",
      eventType: "SIEM_RULE",
      severity: "HIGH",
      sourceIp: "192.168.1.45",
      destIp: "10.0.0.0/24",
      summary: "Correlation Alert: Multiple SSH Auth Failures within 60s",
      rawSnippet: "[RULE-7810 MATCH] EventCount: 5 | Rule: Repeated SSH Authentication Failures | Subnet: 192.168.1.45 | Action: Alert Triggered",
      notes: "SIEM correlation trigger matched multiple authentication failure logs from same source IP."
    }
  ]
};
