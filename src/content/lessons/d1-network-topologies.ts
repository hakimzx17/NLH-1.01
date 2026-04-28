import type { LessonDefinition } from '../types';

export const d1NetworkTopologies: LessonDefinition = {
  id: 'd1-network-topologies',
  domainId: 'domain-1',
  moduleLabel: '1.7',
  title: 'Network Topologies and Architecture',
  estimatedMinutes: 24,
  hook: 'The way you connect devices determines everything: how the network behaves when something fails, how traffic flows, how much it costs, and how hard it is to troubleshoot. A mesh network survives multiple cable cuts. A bus network dies from one broken connector. This lesson maps every topology the CCNA tests and shows you exactly when to use each one.',

  sections: [
    {
      id: 'physical-vs-logical',
      heading: 'Physical vs Logical Topology',
      body: 'The CCNA distinguishes between two ways of describing how a network is connected:\n\n**Physical topology** describes the actual cable layout — where devices are physically located and how they are wired together. It answers: "Which cable goes from which device to which device?"\n\n**Logical topology** describes how data flows through the network, regardless of the physical layout. It answers: "How does a packet travel from source to destination?"\n\nThe classic example: a modern office uses a physical star topology (every device cables back to a central switch in the wiring closet), but the logical topology might be a bus (all devices share the same broadcast domain) or a point-to-point link (a VLAN with only two devices).\n\nAnother example: Token Ring networks used a physical star (devices connected to a central MAU — Multistation Access Unit) but operated as a logical ring (tokens passed in a circular sequence). The physical and logical topologies were different.\n\nThe exam will describe a scenario and ask whether it is describing physical or logical topology. Look for clues: "cable layout" and "physical connections" point to physical. "Data flow" and "how traffic moves" point to logical.',
      estimatedReadingMinutes: 4,
    },
    {
      id: 'star-topology',
      heading: 'Star Topology',
      body: 'Star topology connects every device to a central device — typically a switch. It is the dominant physical topology in modern LANs.\n\n**Advantages:**\n- Single cable failure only affects one device\n- Easy to add or remove devices without disrupting the network\n- Centralized management — all connections terminate in one location\n- Easy to troubleshoot — isolate problems to individual ports\n\n**Disadvantages:**\n- Central device is a single point of failure — if the switch dies, everything goes down\n- Requires more cable than bus topology\n- Limited by the number of ports on the central device\n\n**Real-world example:** Every modern office network. Each wall jack runs back to a patch panel, which connects to switch ports in the wiring closet. If one cable is cut, only that one workstation loses connectivity.\n\nThe CCNA exam treats star topology as the default assumption for LAN questions unless stated otherwise.',
      estimatedReadingMinutes: 3,
    },
    {
      id: 'mesh-topology',
      heading: 'Mesh Topology',
      body: 'Mesh topology provides multiple paths between devices by connecting them through redundant links.\n\n**Full mesh:** Every device connects to every other device. The number of links = n(n-1)/2, where n is the number of devices. For 5 devices, that is 10 links. For 10 devices, that is 45 links. Full mesh provides maximum redundancy but is prohibitively expensive beyond a small number of nodes.\n\n**Partial mesh:** Only critical devices have redundant connections. For example, two core routers connect to each other and to multiple distribution switches, but access switches only connect to one distribution switch. This balances cost and resilience.\n\n**Advantages:**\n- Maximum redundancy — multiple paths survive link failures\n- Load balancing across multiple paths\n- No single point of failure (in full mesh)\n\n**Disadvantages:**\n- Expensive — every link requires cables, ports, and configuration\n- Complex to manage and troubleshoot\n- Routing protocols needed to manage multiple paths\n\n**Real-world example:** ISP backbone networks use partial mesh. Core routers in different cities connect to multiple peers, but not to every other router. This provides path diversity without the cost of full mesh.',
      estimatedReadingMinutes: 4,
    },
    {
      id: 'bus-ring-topologies',
      heading: 'Bus and Ring Topologies',
      body: '**Bus topology** uses a single shared cable (backbone) that all devices connect to. Data travels in both directions along the backbone. Terminators at each end prevent signal reflection.\n\n- All devices share the same collision domain\n- A single cable break takes down the entire segment\n- Largely obsolete — replaced by star topology with switches\n- Legacy Ethernet (10BASE2 and 10BASE5) used bus topology\n\n**Ring topology** connects devices in a closed loop. Data travels in one direction around the ring, passing through each device.\n\n- Each device regenerates the signal (acts as a repeater)\n- A single device failure can break the entire ring (unless dual ring)\n- Token Ring (IEEE 802.5) and FDDI used ring topology\n- Modern networks use logical rings over physical star topologies\n\n**Dual ring** (like FDDI) provides redundancy by using two counter-rotating rings. If one ring fails, traffic wraps to the other ring. This is the basis for many WAN resilience technologies like SONET/SDH rings.\n\nThe exam tests bus and ring primarily as historical context and to contrast with star topology. Know their weaknesses: bus = single cable break kills everything, ring = single device failure kills everything (unless dual ring).',
      estimatedReadingMinutes: 4,
    },
    {
      id: 'hybrid-topology',
      heading: 'Hybrid Topology',
      body: 'Real networks are almost always hybrid — they combine multiple topology types at different layers.\n\nA typical enterprise network:\n- **Access layer:** Star topology — end devices connect to access switches\n- **Distribution layer:** Partial mesh — access switches connect to two distribution switches for redundancy\n- **Core layer:** Full or partial mesh — core routers interconnect with multiple redundant links\n- **WAN:** Partial mesh — branch offices connect to headquarters and possibly to each other\n\nThis hierarchical design (access → distribution → core) is the Cisco three-layer model:\n\n**Access layer:** Where end devices connect. Provides port security, VLAN assignment, and PoE. Star topology.\n\n**Distribution layer:** Aggregates access switches. Provides routing, filtering, QoS, and VLAN routing. Partial mesh to core.\n\n**Core layer:** High-speed backbone. Provides fast, reliable transport between distribution layers. Full or partial mesh. No filtering or policy — just speed.\n\nThe exam will describe a network and ask you to identify which layer a device belongs to or what topology is used at a specific layer.',
      estimatedReadingMinutes: 4,
    },
    {
      id: 'wireless-topology',
      heading: 'Wireless Topology',
      body: 'Wireless networks introduce additional topology considerations:\n\n**Infrastructure mode:** Wireless clients connect through an access point (WAP), which bridges them to the wired network. This is essentially a star topology with the WAP as the center. This is the mode used in virtually all enterprise and home Wi-Fi deployments.\n\n**Ad-hoc mode (IBSS — Independent Basic Service Set):** Wireless clients connect directly to each other without an access point. Peer-to-peer wireless. Rarely used in production but tested on the exam.\n\n**Mesh wireless:** Multiple access points connect wirelessly to each other, forming a mesh backhaul. Clients connect to the nearest AP. Used in large outdoor deployments (campus Wi-Fi, city-wide networks) where running cables to every AP is impractical.\n\n**Extended Service Set (ESS):** Multiple access points share the same SSID and are connected to the same distribution system (wired network). Clients roam between APs seamlessly. This is how enterprise Wi-Fi works — you walk through a building and your connection stays active as your device switches between APs.',
      estimatedReadingMinutes: 3,
    },
  ],

  callouts: [
    {
      type: 'why-matters',
      title: 'Why This Matters',
      body: 'Topology choice determines network resilience, cost, and manageability. The CCNA tests topology because understanding how devices are connected is the first step in designing, troubleshooting, and securing any network. A poorly chosen topology creates problems that no amount of configuration can fix.',
    },
    {
      type: 'exam-trap',
      title: 'Exam Trap',
      body: 'The exam will describe a network where "each device connects to a central switch" and ask for the topology. That is a physical star. But if the question asks about the logical topology and all devices are in the same VLAN/broadcast domain, the logical topology is a bus. Always check whether the question is asking about physical or logical topology.',
    },
    {
      type: 'remember',
      title: 'Remember This',
      body: 'Star = central device, single failure isolated. Full mesh = every device to every device, n(n-1)/2 links. Partial mesh = selective redundancy. Bus = single cable, one break kills all. Ring = circular, one device failure kills all (unless dual ring). Hybrid = combination, which is what real networks use.',
    },
    {
      type: 'real-world',
      title: 'Real World',
      body: 'In production, the access layer is always star topology. The distribution and core layers use partial mesh for redundancy. The WAN uses whatever topology the ISP provides — often a hub-and-spoke (star) for small branches or partial mesh for larger sites. Understanding this hierarchy helps you communicate with other engineers using standard terminology.',
    },
    {
      type: 'analogy',
      title: 'Analogy',
      body: 'Think of topologies like transportation networks. Star topology is like a hub airport — all flights go through the central hub. If the hub closes, everything stops. Full mesh is like having direct flights between every pair of cities — maximum convenience but maximum cost. Bus topology is like a single highway — if it is blocked, nobody gets through. Ring topology is like a circular train line — if one station closes, the whole line stops (unless there is a reverse line).',
    },
  ],

  cliSpotlights: [
    {
      id: 'cdp-topology-discovery',
      title: 'Discovering Physical Topology with CDP',
      commands: [
        'Router# show cdp neighbors',
        'Router# show cdp entry *',
        'Router# show cdp topology',
      ],
      explanation: 'CDP (Cisco Discovery Protocol) reveals the physical topology by showing which Cisco devices are directly connected to each interface. `show cdp neighbors` gives a compact table. `show cdp entry *` shows detailed information for every neighbor including platform, IP address, and IOS version. `show cdp topology` shows the topology database. Combined with `show ip interface brief`, you can map the entire physical topology of a Cisco-only network.',
    },
    {
      id: 'lldp-discovery',
      title: 'Using LLDP for Multi-Vendor Topology Discovery',
      commands: [
        'Switch(config)# lldp run',
        'Switch# show lldp neighbors',
        'Switch# show lldp neighbors detail',
      ],
      explanation: 'LLDP (Link Layer Discovery Protocol) is the IEEE standard (802.1AB) equivalent of CDP. It works with non-Cisco devices. `lldp run` enables LLDP globally. `show lldp neighbors` displays discovered neighbors. `show lldp neighbors detail` shows detailed neighbor information. In multi-vendor environments, LLDP is preferred because CDP is Cisco-proprietary. Both can run simultaneously.',
    },
  ],

  checkpoints: [
    {
      id: 'cp-mesh-links',
      question: 'How many physical links are required for a full mesh topology with 6 devices?',
      options: [
        { id: 'a', text: '6', isCorrect: false },
        { id: 'b', text: '12', isCorrect: false },
        { id: 'c', text: '15', isCorrect: true },
        { id: 'd', text: '30', isCorrect: false },
      ],
      hint: 'The formula is n(n-1)/2 where n is the number of devices.',
    },
    {
      id: 'cp-topology-type',
      question: 'A network has all devices connected to a central switch, but they all share the same broadcast domain. What are the physical and logical topologies?',
      options: [
        { id: 'a', text: 'Physical: Bus, Logical: Star', isCorrect: false },
        { id: 'b', text: 'Physical: Star, Logical: Bus', isCorrect: true },
        { id: 'c', text: 'Physical: Star, Logical: Star', isCorrect: false },
        { id: 'd', text: 'Physical: Mesh, Logical: Bus', isCorrect: false },
      ],
      hint: 'Physical = how devices are cabled. Logical = how data flows.',
    },
  ],

  visualBlocks: [
    {
      id: 'topology-comparison',
      type: 'diagram',
      title: 'Network Topology Comparison',
      description: 'Visual comparison of star, full mesh, partial mesh, bus, and ring topologies showing connectivity patterns.',
      svgContent: `<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg">
        <text x="320" y="20" text-anchor="middle" fill="#e2e8f0" font-size="14" font-weight="700">Network Topology Types</text>
        
        <!-- Star -->
        <text x="100" y="50" text-anchor="middle" fill="#22c55e" font-size="11" font-weight="600">Star</text>
        <circle cx="100" cy="100" r="12" fill="rgba(34,197,94,0.2)" stroke="#22c55e" stroke-width="1.5"/>
        <text x="100" y="104" text-anchor="middle" fill="#86efac" font-size="7">SW</text>
        <circle cx="55" cy="65" r="8" fill="rgba(59,130,246,0.15)" stroke="#3b82f6" stroke-width="1"/>
        <circle cx="145" cy="65" r="8" fill="rgba(59,130,246,0.15)" stroke="#3b82f6" stroke-width="1"/>
        <circle cx="55" cy="135" r="8" fill="rgba(59,130,246,0.15)" stroke="#3b82f6" stroke-width="1"/>
        <circle cx="145" cy="135" r="8" fill="rgba(59,130,246,0.15)" stroke="#3b82f6" stroke-width="1"/>
        <line x1="90" y1="93" x2="62" y2="70" stroke="rgba(148,163,184,0.4)" stroke-width="1"/>
        <line x1="110" y1="93" x2="138" y2="70" stroke="rgba(148,163,184,0.4)" stroke-width="1"/>
        <line x1="90" y1="107" x2="62" y2="130" stroke="rgba(148,163,184,0.4)" stroke-width="1"/>
        <line x1="110" y1="107" x2="138" y2="130" stroke="rgba(148,163,184,0.4)" stroke-width="1"/>
        
        <!-- Full Mesh -->
        <text x="270" y="50" text-anchor="middle" fill="#3b82f6" font-size="11" font-weight="600">Full Mesh</text>
        <circle cx="230" cy="75" r="8" fill="rgba(59,130,246,0.15)" stroke="#3b82f6" stroke-width="1"/>
        <circle cx="310" cy="75" r="8" fill="rgba(59,130,246,0.15)" stroke="#3b82f6" stroke-width="1"/>
        <circle cx="230" cy="135" r="8" fill="rgba(59,130,246,0.15)" stroke="#3b82f6" stroke-width="1"/>
        <circle cx="310" cy="135" r="8" fill="rgba(59,130,246,0.15)" stroke="#3b82f6" stroke-width="1"/>
        <line x1="238" y1="75" x2="302" y2="75" stroke="rgba(148,163,184,0.4)" stroke-width="1"/>
        <line x1="238" y1="135" x2="302" y2="135" stroke="rgba(148,163,184,0.4)" stroke-width="1"/>
        <line x1="230" y1="83" x2="230" y2="127" stroke="rgba(148,163,184,0.4)" stroke-width="1"/>
        <line x1="310" y1="83" x2="310" y2="127" stroke="rgba(148,163,184,0.4)" stroke-width="1"/>
        <line x1="236" y1="80" x2="304" y2="130" stroke="rgba(148,163,184,0.4)" stroke-width="1"/>
        <line x1="304" y1="80" x2="236" y2="130" stroke="rgba(148,163,184,0.4)" stroke-width="1"/>
        
        <!-- Partial Mesh -->
        <text x="470" y="50" text-anchor="middle" fill="#f59e0b" font-size="11" font-weight="600">Partial Mesh</text>
        <circle cx="430" cy="75" r="8" fill="rgba(245,158,11,0.15)" stroke="#f59e0b" stroke-width="1"/>
        <circle cx="510" cy="75" r="8" fill="rgba(245,158,11,0.15)" stroke="#f59e0b" stroke-width="1"/>
        <circle cx="430" cy="135" r="8" fill="rgba(59,130,246,0.15)" stroke="#3b82f6" stroke-width="1"/>
        <circle cx="510" cy="135" r="8" fill="rgba(59,130,246,0.15)" stroke="#3b82f6" stroke-width="1"/>
        <line x1="438" y1="75" x2="502" y2="75" stroke="rgba(245,158,11,0.6)" stroke-width="1.5"/>
        <line x1="430" y1="83" x2="430" y2="127" stroke="rgba(148,163,184,0.4)" stroke-width="1"/>
        <line x1="510" y1="83" x2="510" y2="127" stroke="rgba(148,163,184,0.4)" stroke-width="1"/>
        <line x1="436" y1="80" x2="504" y2="130" stroke="rgba(245,158,11,0.6)" stroke-width="1.5"/>
        
        <!-- Bus -->
        <text x="100" y="180" text-anchor="middle" fill="#ef4444" font-size="11" font-weight="600">Bus</text>
        <line x1="40" y1="220" x2="160" y2="220" stroke="#ef4444" stroke-width="2"/>
        <circle cx="60" cy="220" r="8" fill="rgba(239,68,68,0.15)" stroke="#ef4444" stroke-width="1"/>
        <circle cx="100" cy="220" r="8" fill="rgba(239,68,68,0.15)" stroke="#ef4444" stroke-width="1"/>
        <circle cx="140" cy="220" r="8" fill="rgba(239,68,68,0.15)" stroke="#ef4444" stroke-width="1"/>
        <rect x="35" y="215" width="8" height="10" rx="2" fill="#ef4444"/>
        <rect x="157" y="215" width="8" height="10" rx="2" fill="#ef4444"/>
        
        <!-- Ring -->
        <text x="270" y="180" text-anchor="middle" fill="#8b5cf6" font-size="11" font-weight="600">Ring</text>
        <circle cx="270" cy="250" r="35" fill="none" stroke="#8b5cf6" stroke-width="1.5"/>
        <circle cx="270" cy="215" r="8" fill="rgba(139,92,246,0.15)" stroke="#8b5cf6" stroke-width="1"/>
        <circle cx="305" cy="250" r="8" fill="rgba(139,92,246,0.15)" stroke="#8b5cf6" stroke-width="1"/>
        <circle cx="270" cy="285" r="8" fill="rgba(139,92,246,0.15)" stroke="#8b5cf6" stroke-width="1"/>
        <circle cx="235" cy="250" r="8" fill="rgba(139,92,246,0.15)" stroke="#8b5cf6" stroke-width="1"/>
        <text x="290" y="230" fill="#8b5cf6" font-size="8">→</text>
        
        <!-- Hierarchical -->
        <text x="470" y="180" text-anchor="middle" fill="#06b6d4" font-size="11" font-weight="600">Hierarchical (3-Layer)</text>
        <rect x="400" y="195" width="140" height="25" rx="4" fill="rgba(6,182,212,0.15)" stroke="#06b6d4" stroke-width="1"/>
        <text x="470" y="212" text-anchor="middle" fill="#67e8f9" font-size="9">Core Layer</text>
        <rect x="400" y="235" width="60" height="25" rx="4" fill="rgba(34,197,94,0.15)" stroke="#22c55e" stroke-width="1"/>
        <text x="430" y="252" text-anchor="middle" fill="#86efac" font-size="8">Dist-1</text>
        <rect x="480" y="235" width="60" height="25" rx="4" fill="rgba(34,197,94,0.15)" stroke="#22c55e" stroke-width="1"/>
        <text x="510" y="252" text-anchor="middle" fill="#86efac" font-size="8">Dist-2</text>
        <rect x="395" y="275" width="35" height="20" rx="3" fill="rgba(59,130,246,0.1)" stroke="#3b82f6" stroke-width="0.8"/>
        <text x="412" y="289" text-anchor="middle" fill="#93c5fd" font-size="7">Acc</text>
        <rect x="435" y="275" width="35" height="20" rx="3" fill="rgba(59,130,246,0.1)" stroke="#3b82f6" stroke-width="0.8"/>
        <text x="452" y="289" text-anchor="middle" fill="#93c5fd" font-size="7">Acc</text>
        <rect x="475" y="275" width="35" height="20" rx="3" fill="rgba(59,130,246,0.1)" stroke="#3b82f6" stroke-width="0.8"/>
        <text x="492" y="289" text-anchor="middle" fill="#93c5fd" font-size="7">Acc</text>
        <rect x="515" y="275" width="35" height="20" rx="3" fill="rgba(59,130,246,0.1)" stroke="#3b82f6" stroke-width="0.8"/>
        <text x="532" y="289" text-anchor="middle" fill="#93c5fd" font-size="7">Acc</text>
        <line x1="430" y1="220" x2="430" y2="235" stroke="rgba(148,163,184,0.4)" stroke-width="1"/>
        <line x1="510" y1="220" x2="510" y2="235" stroke="rgba(148,163,184,0.4)" stroke-width="1"/>
        <line x1="465" y1="220" x2="465" y2="235" stroke="rgba(148,163,184,0.4)" stroke-width="1"/>
        <line x1="465" y1="220" x2="510" y2="235" stroke="rgba(148,163,184,0.4)" stroke-width="1"/>
        
        <!-- Bottom labels -->
        <text x="100" y="340" text-anchor="middle" fill="#64748b" font-size="9">Single point of failure:</text>
        <text x="100" y="352" text-anchor="middle" fill="#64748b" font-size="9">Central device</text>
        <text x="270" y="340" text-anchor="middle" fill="#64748b" font-size="9">Links: n(n-1)/2</text>
        <text x="270" y="352" text-anchor="middle" fill="#64748b" font-size="9">4 devices = 6 links</text>
        <text x="470" y="340" text-anchor="middle" fill="#64748b" font-size="9">Core links redundant,</text>
        <text x="470" y="352" text-anchor="middle" fill="#64748b" font-size="9">access links single</text>
        
        <text x="100" y="380" text-anchor="middle" fill="#64748b" font-size="9">Bus: 1 break = total failure</text>
        <text x="270" y="380" text-anchor="middle" fill="#64748b" font-size="9">Ring: 1 failure = total failure</text>
        <text x="470" y="380" text-anchor="middle" fill="#64748b" font-size="9">Real networks use hybrid</text>
      </svg>`,
    },
  ],

  summaryPoints: [
    'Physical topology = actual cable layout. Logical topology = how data flows. They can be different.',
    'Star topology: every device connects to a central switch. Most common in modern LANs. Single cable failure isolated.',
    'Full mesh: every device connects to every other device. n(n-1)/2 links. Maximum redundancy, maximum cost.',
    'Partial mesh: selective redundancy. Balances cost and resilience. Used in production core/distribution layers.',
    'Bus topology: single shared cable. One break kills the entire segment. Obsolete.',
    'Ring topology: circular data path. One device failure kills the ring (unless dual ring).',
    'Cisco three-layer model: Access (star) → Distribution (partial mesh) → Core (full/partial mesh).',
    'Real networks are hybrid — combining multiple topology types at different layers.',
  ],
};
