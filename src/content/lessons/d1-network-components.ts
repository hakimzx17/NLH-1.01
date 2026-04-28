import type { LessonDefinition } from '../types';

export const d1NetworkComponents: LessonDefinition = {
  id: 'd1-network-components',
  domainId: 'domain-1',
  moduleLabel: '1.1',
  title: 'Network Components and Roles',
  estimatedMinutes: 24,
  hook: 'You tap a website on your phone and it loads in under a second. Behind that instant response is an invisible chain of devices — routers, switches, cables, and servers — each playing a specific role. If any one of them misunderstands its job, the chain breaks. This lesson maps out every device you will meet on the CCNA and explains exactly what each one does.',

  sections: [
    {
      id: 'what-is-a-network',
      heading: 'What Is a Network?',
      body: 'A network is simply two or more devices connected so they can exchange data. That definition sounds trivial, but the CCNA exam cares deeply about the *how* and the *what*. Every device on a network has a role, and every role maps to a specific layer of the OSI or TCP/IP model. Understanding the roles is the foundation for everything that follows — routing, switching, security, automation. If you cannot identify what a router does versus what a switch does, the rest of the curriculum will feel like memorizing without understanding.\n\nNetworks exist to share resources. A printer in one office, a file server in another country, a database behind three firewalls — they all communicate because someone designed a path between them. That path is built from physical components (cables, radios) and logical components (addresses, protocols).',
      estimatedReadingMinutes: 4,
    },
    {
      id: 'end-devices',
      heading: 'End Devices (Hosts)',
      body: 'End devices are where network communication starts and ends. Your laptop, phone, server, printer, IP camera — these are all end devices, also called *hosts*. Each host has at least one network interface card (NIC) that gives it a physical address (MAC address) and, in most cases, a logical address (IP address).\n\nThe key insight: end devices do not forward traffic for other devices. A laptop sends its own traffic and receives traffic addressed to it. It does not decide where other people\'s packets should go. That forwarding decision is the job of intermediary devices.',
      estimatedReadingMinutes: 3,
    },
    {
      id: 'intermediary-devices',
      heading: 'Intermediary Devices',
      body: 'Intermediary devices sit between end devices and make forwarding decisions. The three you must know for the CCNA are:\n\n**Routers** operate at Layer 3 (Network layer). They connect different networks together and make forwarding decisions based on IP addresses. A router looks at the destination IP in a packet, consults its routing table, and sends the packet out the correct interface. Routers are the border guards between networks.\n\n**Switches** operate primarily at Layer 2 (Data Link layer). They connect devices within the same network and make forwarding decisions based on MAC addresses. A switch learns which MAC address lives on which port and builds a MAC address table. When a frame arrives, the switch looks up the destination MAC and sends it only to the correct port — unlike a hub, which blindly copies to every port.\n\n**Wireless Access Points (WAPs)** bridge wireless clients to a wired network. They operate at Layer 1 and Layer 2, converting radio signals into Ethernet frames. A WAP is essentially a switch with a radio instead of copper ports.',
      estimatedReadingMinutes: 6,
    },
    {
      id: 'network-media',
      heading: 'Network Media',
      body: 'Media is the physical path that signals travel along. The CCNA focuses on three types:\n\n**Copper cable** (twisted pair, coaxial) carries electrical signals. Cat5e and Cat6 Ethernet cables use RJ-45 connectors and support speeds from 100 Mbps to 10 Gbps depending on category and distance. Copper is limited to about 100 meters per segment.\n\n**Fiber optic cable** carries light signals through glass or plastic strands. It supports much longer distances (kilometers) and higher speeds than copper. Single-mode fiber uses a laser and a thin core for long-distance. Multi-mode fiber uses LEDs and a wider core for shorter runs within buildings.\n\n**Wireless** (radio waves) carries data through the air using IEEE 802.11 standards. Wireless is convenient but introduces shared media challenges — every device on the same channel competes for airtime, unlike switched Ethernet where each port is its own collision domain.',
      estimatedReadingMinutes: 5,
    },
    {
      id: 'topology-types',
      heading: 'Physical and Logical Topologies',
      body: 'Topology describes how devices are connected. The CCNA distinguishes between physical topology (the actual cable layout) and logical topology (how data flows).\n\n**Star topology** is the most common in modern networks. Every device connects to a central switch. If one cable fails, only that one device loses connectivity.\n\n**Mesh topology** provides redundancy by connecting devices through multiple paths. Full mesh connects every device to every other device (expensive but resilient). Partial mesh connects only critical devices redundantly.\n\n**Bus topology** uses a single shared cable. Rarely used today because a single cable break takes down the entire segment.\n\n**Ring topology** passes data in one direction around a closed loop. Token Ring used this concept. Modern networks use logical rings (like STP) over physical star topologies.',
      estimatedReadingMinutes: 4,
    },
  ],

  callouts: [
    {
      type: 'why-matters',
      title: 'Why This Matters',
      body: 'Every troubleshooting scenario on the CCNA exam — and in real life — starts with identifying which device should be doing what. If a user cannot reach a server on another subnet, you need to know: is this a router problem (wrong default gateway?), a switch problem (wrong VLAN?), or an endpoint problem (wrong IP configuration?). Device roles are your first diagnostic filter.',
    },
    {
      type: 'exam-trap',
      title: 'Exam Trap',
      body: 'The exam will describe a device that "forwards frames based on MAC addresses" and ask you to identify it. That is a switch, not a router. Routers forward *packets* based on *IP addresses*. The distinction between frames (Layer 2) and packets (Layer 3) is tested constantly. Do not let the exam blur these terms.',
    },
    {
      type: 'analogy',
      title: 'Analogy',
      body: 'Think of a network like a postal system. End devices are houses (they send and receive mail). Switches are local post offices (they sort mail within a neighborhood using street addresses = MAC addresses). Routers are regional distribution centers (they decide which city a letter goes to using ZIP codes = IP addresses). The cables are the roads between them.',
    },
    {
      type: 'real-world',
      title: 'Real World',
      body: 'In a typical small business: a modem connects to the ISP, a router connects to the modem and handles NAT/firewall, a switch connects to the router and provides 24 Ethernet ports, and a wireless access point connects to the switch for mobile devices. Understanding this chain lets you troubleshoot from the outside in or inside out.',
    },
    {
      type: 'remember',
      title: 'Remember This',
      body: 'Routers = Layer 3 = IP addresses = connect different networks. Switches = Layer 2 = MAC addresses = connect devices within the same network. This distinction is the single most important concept in the entire CCNA.',
    },
  ],

  cliSpotlights: [
    {
      id: 'show-version',
      title: 'Identifying a Cisco Device',
      commands: [
        'Router> enable',
        'Router# show version',
      ],
      explanation: 'The `show version` command is your first step when you connect to any Cisco device. It tells you the device model, IOS version, uptime, and memory. The prompt itself reveals the device type — "Router>" means you are on a router in user EXEC mode. A switch would show "Switch>". The `enable` command moves you from user EXEC mode (limited commands) to privileged EXEC mode (full access).',
    },
    {
      id: 'show-interfaces',
      title: 'Checking Interface Status',
      commands: [
        'Router# show ip interface brief',
      ],
      explanation: 'This command gives you a quick overview of every interface on the device. The two status columns tell different stories: the first shows the physical layer status (is the cable plugged in?), and the second shows the protocol layer status (is the data link working?). "up/up" means the interface is healthy. "up/down" usually means a Layer 2 mismatch. "administratively down" means someone typed `shutdown` on that interface.',
    },
  ],

  checkpoints: [
    {
      id: 'cp-device-role',
      question: 'A device receives an Ethernet frame, looks up the destination MAC address in its table, and forwards the frame out a single port. What type of device is this?',
      options: [
        { id: 'a', text: 'Router', isCorrect: false },
        { id: 'b', text: 'Switch', isCorrect: true },
        { id: 'c', text: 'Hub', isCorrect: false },
        { id: 'd', text: 'Firewall', isCorrect: false },
      ],
      hint: 'Think about which layer this device operates at and what addressing it uses.',
    },
    {
      id: 'cp-media-limit',
      question: 'What is the maximum recommended segment length for Cat6 copper Ethernet cable?',
      options: [
        { id: 'a', text: '50 meters', isCorrect: false },
        { id: 'b', text: '100 meters', isCorrect: true },
        { id: 'c', text: '200 meters', isCorrect: false },
        { id: 'd', text: '500 meters', isCorrect: false },
      ],
      hint: 'This is a hard physical limit defined by the Ethernet standard.',
    },
  ],

  visualBlocks: [
    {
      id: 'basic-network-topology',
      type: 'topology',
      title: 'Basic Network Topology',
      description: 'A typical small office network showing the path from end devices through switches and routers to the internet.',
      svgContent: `<svg viewBox="0 0 600 300" xmlns="http://www.w3.org/2000/svg">
        <rect x="20" y="120" width="80" height="60" rx="8" fill="rgba(59,130,246,0.15)" stroke="#3b82f6" stroke-width="1.5"/>
        <text x="60" y="155" text-anchor="middle" fill="#93c5fd" font-size="11">PC-1</text>
        <rect x="20" y="220" width="80" height="60" rx="8" fill="rgba(59,130,246,0.15)" stroke="#3b82f6" stroke-width="1.5"/>
        <text x="60" y="255" text-anchor="middle" fill="#93c5fd" font-size="11">PC-2</text>
        <rect x="220" y="140" width="80" height="80" rx="8" fill="rgba(6,182,212,0.15)" stroke="#06b6d4" stroke-width="1.5"/>
        <text x="260" y="185" text-anchor="middle" fill="#67e8f9" font-size="11">Switch</text>
        <rect x="400" y="140" width="80" height="80" rx="8" fill="rgba(0,200,150,0.15)" stroke="#00c896" stroke-width="1.5"/>
        <text x="440" y="175" text-anchor="middle" fill="#74f3cb" font-size="11">Router</text>
        <circle cx="540" cy="180" r="30" fill="rgba(139,92,246,0.15)" stroke="#8b5cf6" stroke-width="1.5"/>
        <text x="540" y="185" text-anchor="middle" fill="#c4b5fd" font-size="10">Internet</text>
        <line x1="100" y1="150" x2="220" y2="170" stroke="rgba(148,163,184,0.3)" stroke-width="1.5"/>
        <line x1="100" y1="250" x2="220" y2="195" stroke="rgba(148,163,184,0.3)" stroke-width="1.5"/>
        <line x1="300" y1="180" x2="400" y2="180" stroke="rgba(148,163,184,0.3)" stroke-width="1.5"/>
        <line x1="480" y1="180" x2="510" y2="180" stroke="rgba(148,163,184,0.3)" stroke-width="1.5"/>
      </svg>`,
    },
  ],

  summaryPoints: [
    'End devices (hosts) originate and receive traffic — they do not forward for others.',
    'Routers operate at Layer 3, forward packets based on IP addresses, and connect different networks.',
    'Switches operate at Layer 2, forward frames based on MAC addresses, and connect devices within the same network.',
    'Copper cable max segment length is 100 meters. Fiber supports kilometers.',
    'Wireless is shared media — devices on the same channel compete for airtime.',
    'Star topology is the most common physical layout in modern networks.',
    'The device prompt (Router> vs Switch>) identifies the device type in Cisco IOS.',
  ],
};
