import type { LessonDefinition } from '../types';

export const d1OsiModel: LessonDefinition = {
  id: 'd1-osi-model',
  domainId: 'domain-1',
  moduleLabel: '1.2',
  title: 'OSI and TCP/IP Without the Memorization Trap',
  estimatedMinutes: 26,
  hook: 'Most students memorize the seven OSI layers and then fail the exam. Why? Because the exam does not ask you to recite the layers — it asks you to use them as a troubleshooting tool. This lesson flips the script: you will learn each layer by what it does, not by its number, and you will walk away with a mental model that actually helps you solve problems.',

  sections: [
    {
      id: 'why-models-matter',
      heading: 'Why Models Matter (And Why Memorization Fails)',
      body: 'The OSI model is not a list to memorize. It is a shared language that lets engineers pinpoint where a problem lives. When a user says "the internet is broken," the OSI model gives you a diagnostic ladder to climb.\n\nCan they ping their default gateway? That tests Layers 1-3. Can they reach a website by IP but not by name? That isolates the problem to Layer 7 (DNS). The model turns a vague complaint into a targeted investigation.\n\nThe CCNA exam tests this constantly. A question will describe a symptom and ask which layer is most likely responsible. If you understand what each layer *does*, you will answer correctly every time — no memorization required.',
      estimatedReadingMinutes: 4,
    },
    {
      id: 'layer-1-physical',
      heading: 'Layer 1 — Physical',
      body: 'The Physical layer is the actual hardware: cables, connectors, radio waves, voltage levels, and the bits (1s and 0s) that travel across them. It does not care about addresses, protocols, or meaning. It only cares about getting raw bits from one end to the other.\n\nKey concepts:\n- **Bits**: The raw 1s and 0s transmitted as electrical signals (copper), light pulses (fiber), or radio waves (wireless).\n- **Encoding**: How bits are represented on the medium (e.g., Manchester encoding, PAM5 for Gigabit Ethernet).\n- **Topology**: The physical layout of cables and devices (star, mesh, bus, ring).\n- **Media types**: Copper (Cat5e/Cat6), fiber (single-mode, multi-mode), wireless (802.11).\n\nTroubleshooting Layer 1: Is the cable plugged in? Is the interface administratively up? Are the link lights on? If Layer 1 is broken, nothing above it works.',
      estimatedReadingMinutes: 4,
    },
    {
      id: 'layer-2-data-link',
      heading: 'Layer 2 — Data Link',
      body: 'The Data Link layer takes raw bits and organizes them into **frames** — structured units of data with a header, payload, and trailer. This layer is responsible for node-to-node delivery on the same network segment.\n\nKey concepts:\n- **Frames**: The PDU (Protocol Data Unit) at Layer 2. Contains source and destination MAC addresses.\n- **MAC addresses**: 48-bit physical addresses burned into the NIC. Format: AA:BB:CC:DD:EE:FF.\n- **Switching**: Switches operate at Layer 2, building MAC address tables to forward frames intelligently.\n- **Error detection**: The Frame Check Sequence (FCS) trailer detects corrupted frames.\n- **Sublayers**: LLC (Logical Link Control) and MAC (Media Access Control).\n\nThe critical insight: Layer 2 communication only works within the same broadcast domain. A switch cannot forward a frame to a device on a different network — that requires Layer 3.',
      estimatedReadingMinutes: 5,
    },
    {
      id: 'layer-3-network',
      heading: 'Layer 3 — Network',
      body: 'The Network layer handles **logical addressing** and **routing** — getting packets from one network to another, potentially across the entire internet.\n\nKey concepts:\n- **Packets**: The PDU at Layer 3. Contains source and destination IP addresses.\n- **IP addressing**: IPv4 (32-bit) and IPv6 (128-bit) logical addresses.\n- **Routing**: Routers examine destination IP addresses, consult routing tables, and forward packets toward their destination.\n- **ICMP**: Internet Control Message Protocol — used for diagnostics (ping, traceroute).\n- **ARP**: Address Resolution Protocol — maps IP addresses to MAC addresses (bridges Layer 2 and Layer 3).\n\nThis is where the CCNA exam lives. Routing protocols (OSPF, EIGRP, static routes), subnetting, and NAT all operate at Layer 3. Understanding that routers connect *different* networks while switches connect devices within the *same* network is the single most important distinction in the entire course.',
      estimatedReadingMinutes: 5,
    },
    {
      id: 'layer-4-transport',
      heading: 'Layer 4 — Transport',
      body: 'The Transport layer ensures end-to-end communication between applications running on different hosts. It uses **port numbers** to distinguish between different services on the same device.\n\nKey concepts:\n- **Segments** (TCP) and **Datagrams** (UDP): The PDUs at Layer 4.\n- **Port numbers**: 16-bit numbers (0-65535). Well-known ports: 0-1023. HTTP=80, HTTPS=443, SSH=22, DNS=53.\n- **TCP (Transmission Control Protocol)**: Connection-oriented, reliable, ordered delivery. Uses a three-way handshake (SYN, SYN-ACK, ACK). Provides flow control, error recovery, and congestion control.\n- **UDP (User Datagram Protocol)**: Connectionless, unreliable, no ordering guarantees. Lower overhead. Used for real-time applications (VoIP, video streaming, DNS queries).\n\nThe exam trap: They will describe an application and ask whether it uses TCP or UDP. Rule of thumb: if data loss matters (web pages, file transfers, email), use TCP. If speed matters more than perfection (voice, video, live streams), use UDP.',
      estimatedReadingMinutes: 5,
    },
    {
      id: 'layers-5-7',
      heading: 'Layers 5-7 — Session, Presentation, Application',
      body: 'The top three layers are often grouped together because they handle user-facing communication.\n\n**Layer 5 — Session**: Manages dialogues between applications. Establishes, maintains, and terminates sessions. Examples: NetBIOS, RPC. In practice, TCP handles most session management, so this layer is rarely tested in isolation.\n\n**Layer 6 — Presentation**: Translates, encrypts, and compresses data. SSL/TLS encryption happens here. So does JPEG compression and character encoding (ASCII, Unicode). The exam may ask which layer handles encryption — the answer is Layer 6.\n\n**Layer 7 — Application**: The layer closest to the end user. Provides network services to applications. Protocols: HTTP, HTTPS, FTP, SMTP, DNS, DHCP. Note: this is NOT your web browser — it is the HTTP protocol that the browser uses.\n\nMnemonic (bottom to top): "**P**lease **D**o **N**ot **T**hrow **S**ausage **P**izza **A**way" (Physical, Data Link, Network, Transport, Session, Presentation, Application).',
      estimatedReadingMinutes: 4,
    },
    {
      id: 'tcp-ip-model',
      heading: 'The TCP/IP Model — The Practical Alternative',
      body: 'While the OSI model has 7 layers, the TCP/IP model has 4. It is the model actually used in real networking.\n\n- **Layer 4 — Application**: Combines OSI Layers 5, 6, and 7. All user-facing protocols live here.\n- **Layer 3 — Transport**: Maps directly to OSI Layer 4. TCP and UDP.\n- **Layer 2 — Internet**: Maps to OSI Layer 3. IP, ICMP, ARP.\n- **Layer 1 — Network Access**: Combines OSI Layers 1 and 2. Ethernet, Wi-Fi, physical media.\n\nThe exam may ask you to map between the two models. Know that the TCP/IP Application layer encompasses three OSI layers, and the TCP/IP Network Access layer encompasses two.',
      estimatedReadingMinutes: 3,
    },
  ],

  callouts: [
    {
      type: 'why-matters',
      title: 'Why This Matters',
      body: 'Every CCNA troubleshooting question is really a Layer identification question in disguise. "A user can ping 8.8.8.8 but cannot load google.com" — that is a Layer 7 (DNS) problem. "A switch port shows up/down" — that is a Layer 2 issue. The OSI model is your diagnostic framework.',
    },
    {
      type: 'exam-trap',
      title: 'Exam Trap',
      body: 'The exam will describe a device or protocol and ask which layer it operates at. A switch = Layer 2. A router = Layer 3. A hub = Layer 1. An access point = Layers 1 and 2. SSL/TLS encryption = Layer 6. HTTP = Layer 7. TCP = Layer 4. Do not let the exam blur these boundaries.',
    },
    {
      type: 'remember',
      title: 'Remember This',
      body: 'PDU names matter: Bits (L1) → Frames (L2) → Packets (L3) → Segments (L4). The exam uses these terms precisely. If a question mentions "frames," you are at Layer 2. If it mentions "packets," you are at Layer 3.',
    },
    {
      type: 'analogy',
      title: 'Analogy',
      body: 'Sending a letter through the postal system: Layer 7 is writing the letter (application data). Layer 6 is putting it in an envelope and sealing it (presentation/formatting). Layer 5 is deciding this is a single conversation, not part of a batch (session). Layer 4 is choosing registered mail vs standard (transport reliability). Layer 3 is writing the ZIP code (network addressing). Layer 2 is the local post office sorting by street address (data link). Layer 1 is the truck driving the letter down the highway (physical).',
    },
    {
      type: 'real-world',
      title: 'Real World',
      body: 'When you run `ping 8.8.8.8` and it fails, you are testing Layers 1-3. When `ping google.com` fails but `ping 8.8.8.8` works, DNS (Layer 7) is broken. When you can ping but cannot load a webpage, the web server or firewall (Layers 4-7) is the issue. This is how real network troubleshooting works.',
    },
  ],

  cliSpotlights: [
    {
      id: 'ping-command',
      title: 'Testing Connectivity with Ping',
      commands: [
        'Router# ping 192.168.1.1',
        'Router# ping 8.8.8.8',
        'Router# ping google.com',
      ],
      explanation: 'The `ping` command uses ICMP (Layer 3) to test connectivity. A successful ping confirms Layers 1-3 are working between source and destination. If ping by IP works but ping by hostname fails, DNS (Layer 7) is the problem. The `!!!!!` output means success; `.....` means timeout.',
    },
    {
      id: 'show-cdp-neighbors',
      title: 'Discovering Neighbors with CDP',
      commands: [
        'Router# show cdp neighbors',
        'Router# show cdp neighbors detail',
      ],
      explanation: 'CDP (Cisco Discovery Protocol) operates at Layer 2 and discovers directly connected Cisco devices. It shows device ID, local interface, remote interface, and platform. This is a powerful Layer 2 troubleshooting tool — if CDP shows a neighbor, Layer 1 and Layer 2 are working on that link.',
    },
  ],

  checkpoints: [
    {
      id: 'cp-pdu-identification',
      question: 'What is the PDU name at Layer 3 of the OSI model?',
      options: [
        { id: 'a', text: 'Frame', isCorrect: false },
        { id: 'b', text: 'Packet', isCorrect: true },
        { id: 'c', text: 'Segment', isCorrect: false },
        { id: 'd', text: 'Bit', isCorrect: false },
      ],
      hint: 'Think about what a router processes when forwarding traffic between networks.',
    },
    {
      id: 'cp-layer-troubleshooting',
      question: 'A user can reach a website by typing its IP address but not by its domain name. Which layer is most likely responsible?',
      options: [
        { id: 'a', text: 'Layer 2 — Data Link', isCorrect: false },
        { id: 'b', text: 'Layer 3 — Network', isCorrect: false },
        { id: 'c', text: 'Layer 4 — Transport', isCorrect: false },
        { id: 'd', text: 'Layer 7 — Application', isCorrect: true },
      ],
      hint: 'What service translates domain names to IP addresses?',
    },
  ],

  visualBlocks: [
    {
      id: 'osi-encapsulation-flow',
      type: 'flow',
      title: 'Encapsulation: Data Flow Down the Stack',
      description: 'How data is wrapped with headers at each layer as it moves from application to physical transmission.',
      svgContent: `<svg viewBox="0 0 600 380" xmlns="http://www.w3.org/2000/svg">
        <rect x="120" y="10" width="360" height="40" rx="6" fill="rgba(139,92,246,0.15)" stroke="#8b5cf6" stroke-width="1.5"/>
        <text x="300" y="35" text-anchor="middle" fill="#c4b5fd" font-size="12" font-weight="600">Layer 7 — Application: DATA</text>
        <line x1="300" y1="50" x2="300" y2="65" stroke="rgba(148,163,184,0.3)" stroke-width="1.5"/>
        <rect x="120" y="65" width="360" height="40" rx="6" fill="rgba(6,182,212,0.15)" stroke="#06b6d4" stroke-width="1.5"/>
        <text x="300" y="90" text-anchor="middle" fill="#67e8f9" font-size="12" font-weight="600">Layer 6 — Presentation: DATA</text>
        <line x1="300" y1="105" x2="300" y2="120" stroke="rgba(148,163,184,0.3)" stroke-width="1.5"/>
        <rect x="120" y="120" width="360" height="40" rx="6" fill="rgba(59,130,246,0.15)" stroke="#3b82f6" stroke-width="1.5"/>
        <text x="300" y="145" text-anchor="middle" fill="#93c5fd" font-size="12" font-weight="600">Layer 5 — Session: DATA</text>
        <line x1="300" y1="160" x2="300" y2="175" stroke="rgba(148,163,184,0.3)" stroke-width="1.5"/>
        <rect x="80" y="175" width="440" height="40" rx="6" fill="rgba(0,200,150,0.15)" stroke="#00c896" stroke-width="1.5"/>
        <text x="300" y="200" text-anchor="middle" fill="#74f3cb" font-size="12" font-weight="600">Layer 4 — Transport: [TCP Header] + DATA = SEGMENT</text>
        <line x1="300" y1="215" x2="300" y2="230" stroke="rgba(148,163,184,0.3)" stroke-width="1.5"/>
        <rect x="60" y="230" width="480" height="40" rx="6" fill="rgba(245,158,11,0.15)" stroke="#f59e0b" stroke-width="1.5"/>
        <text x="300" y="255" text-anchor="middle" fill="#fcd34d" font-size="12" font-weight="600">Layer 3 — Network: [IP Header] + SEGMENT = PACKET</text>
        <line x1="300" y1="270" x2="300" y2="285" stroke="rgba(148,163,184,0.3)" stroke-width="1.5"/>
        <rect x="40" y="285" width="520" height="40" rx="6" fill="rgba(239,68,68,0.12)" stroke="#ef4444" stroke-width="1.5"/>
        <text x="300" y="310" text-anchor="middle" fill="#fca5a5" font-size="12" font-weight="600">Layer 2 — Data Link: [ETH Header] + PACKET + [FCS] = FRAME</text>
        <line x1="300" y1="325" x2="300" y2="340" stroke="rgba(148,163,184,0.3)" stroke-width="1.5"/>
        <rect x="40" y="340" width="520" height="30" rx="6" fill="rgba(148,163,184,0.08)" stroke="#94a3b8" stroke-width="1.5"/>
        <text x="300" y="360" text-anchor="middle" fill="#94a3b8" font-size="12" font-weight="600">Layer 1 — Physical: 10110010... (BITS on the wire)</text>
      </svg>`,
    },
  ],

  summaryPoints: [
    'The OSI model is a troubleshooting tool, not a memorization exercise.',
    'PDU names: Bits (L1), Frames (L2), Packets (L3), Segments (L4).',
    'Switches = Layer 2 (MAC addresses). Routers = Layer 3 (IP addresses).',
    'TCP is reliable and connection-oriented. UDP is fast and connectionless.',
    'Layer 6 handles encryption (SSL/TLS). Layer 7 handles application protocols (HTTP, DNS).',
    'The TCP/IP model has 4 layers: Application, Transport, Internet, Network Access.',
    'Ping tests Layers 1-3. DNS resolution is Layer 7.',
    'CDP operates at Layer 2 and discovers directly connected Cisco devices.',
  ],
};
