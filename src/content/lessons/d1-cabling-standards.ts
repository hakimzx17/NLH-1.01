import type { LessonDefinition } from '../types';

export const d1CablingStandards: LessonDefinition = {
  id: 'd1-cabling-standards',
  domainId: 'domain-1',
  moduleLabel: '1.6',
  title: 'Cabling Standards and Connectors',
  estimatedMinutes: 22,
  hook: 'Behind every network outage caused by "something weird with the cable" is an engineer who did not know the difference between T568A and T568B, or why a rollover cable will never work as a patch cable. The CCNA tests cabling because choosing the wrong cable type is the fastest way to waste hours on a problem that should take seconds. This lesson makes cable selection automatic.',

  sections: [
    {
      id: 'copper-cable-types',
      heading: 'Copper Cable Categories',
      body: 'Twisted-pair copper cable is the most common network media. The twisting reduces electromagnetic interference (EMI) and crosstalk between wire pairs. Each category improves on the last with tighter twists, better insulation, and higher bandwidth.\n\n**Cat5** — Obsolete. Supported 100 Mbps Ethernet up to 100 meters. Four twisted pairs, 100 MHz bandwidth.\n\n**Cat5e** (enhanced) — The minimum standard for new installations. Supports 1 Gbps (1000BASE-T) up to 100 meters. Reduced crosstalk compared to Cat5. 100 MHz bandwidth.\n\n**Cat6** — Supports 1 Gbps up to 100 meters and 10 Gbps up to 55 meters. Tighter twist specification and a plastic spline separating the four pairs. 250 MHz bandwidth.\n\n**Cat6a** (augmented) — Supports 10 Gbps up to the full 100 meters. Double the bandwidth of Cat6 at 500 MHz. Thicker cable, more expensive, but the standard for new 10G installations.\n\n**Cat7/Cat8** — Data center grade. Cat8 supports 25/40 Gbps up to 30 meters. Not typically tested on the CCNA but good to know exist.\n\nThe exam will ask you to choose the right cable category for a scenario. If the requirement is 10 Gbps at 80 meters, Cat6 will not work (max 55m at 10G) — you need Cat6a.',
      estimatedReadingMinutes: 4,
    },
    {
      id: 'wiring-standards',
      heading: 'T568A and T568B Wiring Standards',
      body: 'RJ-45 connectors have eight pins, each connected to one of the eight wires in a Cat5e/Cat6 cable. Two wiring standards define which color wire goes to which pin:\n\n**T568A pinout (left to right, clip facing away):**\n1. Green/White, 2. Green, 3. Orange/White, 4. Blue, 5. Blue/White, 6. Orange, 7. Brown/White, 8. Brown\n\n**T568B pinout (left to right, clip facing away):**\n1. Orange/White, 2. Orange, 3. Green/White, 4. Blue, 5. Blue/White, 6. Green, 7. Brown/White, 8. Brown\n\nThe only difference between A and B is that the green and orange pairs are swapped. Both work identically — the critical rule is that both ends of a cable must use the same standard for a straight-through cable.\n\n**Straight-through cable:** Both ends use the same standard (both T568A or both T568B). Used to connect different-type devices: PC to switch, router to switch, PC to hub.\n\n**Crossover cable:** One end uses T568A, the other uses T568B. Used to connect same-type devices: PC to PC, switch to switch, router to router.\n\nModern devices support **Auto-MDIX** (automatic medium-dependent interface crossover), which automatically detects and corrects the cable type. This means a straight-through cable works even when a crossover is technically required. However, the CCNA exam still tests your knowledge of when each cable type is needed.',
      estimatedReadingMinutes: 5,
    },
    {
      id: 'fiber-optic',
      heading: 'Fiber Optic Cable Types and Connectors',
      body: 'Fiber optic cable transmits data as light pulses through glass or plastic strands. It is immune to EMI, supports much longer distances than copper, and provides higher bandwidth.\n\n**Single-mode fiber (SMF):**\n- Core diameter: ~9 microns (very thin)\n- Light source: Laser\n- Distance: Kilometers (up to 100+ km with the right optics)\n- Color: Yellow jacket\n- Use case: Long-distance, campus backbones, service provider links\n- Connector types: LC, SC, ST\n\n**Multi-mode fiber (MMF):**\n- Core diameter: 50 or 62.5 microns (wider)\n- Light source: LED\n- Distance: Up to 550 meters (OM3/OM4) or 2 km (OM1/OM2)\n- Color: Orange (OM1/OM2) or Aqua (OM3/OM4) jacket\n- Use case: Within buildings, data center interconnects\n- Connector types: LC, SC, ST\n\nCommon fiber connector types:\n- **LC (Lucent Connector):** Small form-factor, push-pull latch. Most common in modern installations.\n- **SC (Subscriber Connector):** Square push-pull connector. Common in older installations.\n- **ST (Straight Tip):** Bayonet-style twist-lock connector. Legacy installations.\n\nThe exam tests your ability to choose the right fiber type for a distance requirement. If the link is 5 km, you need single-mode. If it is 200 meters within a building, multi-mode is sufficient and more cost-effective.',
      estimatedReadingMinutes: 5,
    },
    {
      id: 'console-cables',
      heading: 'Console and Management Cables',
      body: 'Not all cables carry network traffic. Some are used exclusively for device management and configuration.\n\n**Rollover cable (console cable):**\n- Pinout is reversed: pin 1 on one end connects to pin 8 on the other, pin 2 to pin 7, etc.\n- Used to connect a PC\'s serial port (or USB-to-serial adapter) to a Cisco device\'s console port\n- RJ-45 on the device end, DB-9 or USB on the PC end\n- Terminal settings: 9600 baud, 8 data bits, no parity, 1 stop bit, no flow control (9600-8-N-1)\n\n**USB console cable:**\n- Modern Cisco devices include a USB Type-B console port\n- Uses a standard USB A-to-B cable (like a printer cable)\n- Takes priority over the RJ-45 console port if both are connected\n- Does not require a serial-to-USB adapter\n\nThe console connection gives you out-of-band management — you can configure a device even when it has no network connectivity. This is your lifeline when a router\'s configuration is corrupted and it cannot pass traffic.',
      estimatedReadingMinutes: 3,
    },
    {
      id: 'cable-selection',
      heading: 'Choosing the Right Cable — Decision Guide',
      body: 'The CCNA exam will present scenarios and ask you to select the correct cable type. Use this decision framework:\n\n**Step 1: What distance?**\n- Under 100m → Copper (Cat5e minimum, Cat6 for Gigabit)\n- 100m to 550m → Multi-mode fiber\n- Over 550m → Single-mode fiber\n\n**Step 2: What speed?**\n- 1 Gbps at 100m → Cat5e or Cat6\n- 10 Gbps at 100m → Cat6a\n- 10 Gbps at 55m → Cat6\n- 40 Gbps → Cat8 (up to 30m) or fiber\n\n**Step 3: What devices are being connected?**\n- Different types (PC to switch) → Straight-through (or any cable with Auto-MDIX)\n- Same types (switch to switch) → Crossover (or any cable with Auto-MDIX)\n- PC to router console → Rollover cable\n\n**Step 4: Environmental factors?**\n- Near heavy machinery or power lines → Fiber (immune to EMI)\n- Outdoor runs → Fiber or outdoor-rated copper\n- Plenum spaces (air handling) → Plenum-rated cable (CMP)\n\nThe exam trap: they will describe a 10 Gbps link at 80 meters and offer Cat6 as an option. Cat6 only supports 10 Gbps up to 55 meters. The correct answer is Cat6a.',
      estimatedReadingMinutes: 4,
    },
    {
      id: 'cable-testing',
      heading: 'Cable Testing and Verification',
      body: 'When a cable is suspected of causing problems, several tools can verify its integrity:\n\n**Cable tester:** A basic continuity tester checks that all eight wires are connected correctly and in the right order. It identifies opens (broken wires), shorts (wires touching), and miswires (wrong pin mapping). Essential for verifying newly terminated cables.\n\n**TDR (Time Domain Reflectometer):** Sends a signal down the cable and measures the reflection to find the exact distance to a fault. Used for long cable runs where you need to know "the break is 47 meters from this end."\n\n**OTDR (Optical Time Domain Reflectometer):** The fiber equivalent of a TDR. Uses light pulses to find breaks, bends, or dirty connectors in fiber optic cables.\n\n**Tone generator and probe:** Sends an audible tone through a cable. Used to trace and identify unlabeled cables in a patch panel. The probe beeps when placed near the correct cable.\n\nOn Cisco devices, cable diagnostics can be run from the CLI:\n```\nSwitch# test cable-diagnostics tdr interface GigabitEthernet0/1\nSwitch# show cable-diagnostics tdr interface GigabitEthernet0/1\n```\n\nThis built-in TDR test shows the status and approximate cable length for each pair, helping identify cable faults without physical testing equipment.',
      estimatedReadingMinutes: 4,
    },
  ],

  callouts: [
    {
      type: 'why-matters',
      title: 'Why This Matters',
      body: 'Physical layer problems cause more network downtime than any other layer. A damaged cable, wrong connector, or exceeded distance limit will bring down a perfectly configured network. The CCNA tests cable selection because choosing the wrong media is a design-time mistake that no amount of configuration can fix.',
    },
    {
      type: 'exam-trap',
      title: 'Exam Trap',
      body: 'The exam will ask you to identify the cable type needed to connect a switch to a switch. The answer is crossover — but only if Auto-MDIX is not mentioned. If the question states that both devices support Auto-MDIX, any Ethernet cable works. Always read the question carefully for Auto-MDIX mentions.',
    },
    {
      type: 'remember',
      title: 'Remember This',
      body: 'T568A and T568B differ only in the green and orange pairs. Straight-through = same standard on both ends. Crossover = different standards. Rollover = pinout reversed. Cat6 supports 10G up to 55m. Cat6a supports 10G up to 100m. Single-mode = laser, long distance, yellow. Multi-mode = LED, short distance, orange/aqua.',
    },
    {
      type: 'real-world',
      title: 'Real World',
      body: 'In production data centers, fiber is the standard for all inter-switch links and server uplinks. Copper is used only for the last meter to end devices. The transition point — the patch panel where copper meets fiber — is where most physical layer problems occur. Always label both ends of every cable.',
    },
    {
      type: 'analogy',
      title: 'Analogy',
      body: 'Think of cable types like plumbing. Copper cable is like standard household pipes — good for short runs, affordable, but limited by pressure (signal degradation). Fiber is like a high-pressure industrial pipeline — expensive to install, but carries vastly more volume over much longer distances. A rollover cable is like a special adapter that only fits one specific valve — it does one job and does it exclusively.',
    },
  ],

  cliSpotlights: [
    {
      id: 'cable-diagnostics',
      title: 'Running Cable Diagnostics on a Switch',
      commands: [
        'Switch# test cable-diagnostics tdr interface GigabitEthernet0/1',
        'Switch# show cable-diagnostics tdr interface GigabitEthernet0/1',
      ],
      explanation: 'The TDR (Time Domain Reflectometer) test sends a signal down each wire pair and measures the reflection to determine cable length and detect faults. The output shows the status of each pair (OK, Open, Short) and the approximate length in meters. If a pair shows "Open" at 23 meters, there is a break approximately 23 meters from the switch. This is invaluable for diagnosing cable problems without physical testing equipment.',
    },
    {
      id: 'interface-media-type',
      title: 'Checking Interface Media Type',
      commands: [
        'Switch# show interfaces status',
        'Switch# show interfaces GigabitEthernet0/1 transceiver',
      ],
      explanation: '`show interfaces status` gives a compact view of all ports: port name, status, VLAN, duplex, speed, and type. `show interfaces <interface> transceiver` displays SFP/SFP+ module details including type (copper or fiber), wavelength, supported distance, and temperature. This is critical when verifying that the correct transceiver is installed for the link requirements.',
    },
  ],

  checkpoints: [
    {
      id: 'cp-cable-type',
      question: 'Which cable type should you use to connect a PC directly to a router\'s console port for initial configuration?',
      options: [
        { id: 'a', text: 'Straight-through Ethernet cable', isCorrect: false },
        { id: 'b', text: 'Crossover Ethernet cable', isCorrect: false },
        { id: 'c', text: 'Rollover cable', isCorrect: true },
        { id: 'd', text: 'Fiber optic cable', isCorrect: false },
      ],
      hint: 'This is a management connection, not a network data connection.',
    },
    {
      id: 'cp-fiber-selection',
      question: 'You need to connect two buildings 2 kilometers apart with a 10 Gbps link. Which cable type should you choose?',
      options: [
        { id: 'a', text: 'Cat6a copper', isCorrect: false },
        { id: 'b', text: 'Multi-mode fiber', isCorrect: false },
        { id: 'c', text: 'Single-mode fiber', isCorrect: true },
        { id: 'd', text: 'Cat8 copper', isCorrect: false },
      ],
      hint: 'Consider both distance and speed requirements. Copper maxes out at 100m.',
    },
  ],

  visualBlocks: [
    {
      id: 'cable-comparison',
      type: 'diagram',
      title: 'Cable Type Comparison',
      description: 'Side-by-side comparison of copper, multi-mode fiber, and single-mode fiber showing distance, speed, and use case differences.',
      svgContent: `<svg viewBox="0 0 640 340" xmlns="http://www.w3.org/2000/svg">
        <text x="320" y="25" text-anchor="middle" fill="#e2e8f0" font-size="14" font-weight="700">Media Type Comparison</text>
        
        <rect x="20" y="45" width="190" height="270" rx="8" fill="rgba(245,158,11,0.08)" stroke="#f59e0b" stroke-width="1.5"/>
        <text x="115" y="70" text-anchor="middle" fill="#fcd34d" font-size="13" font-weight="700">Copper (Cat6)</text>
        <circle cx="115" cy="100" r="20" fill="rgba(245,158,11,0.2)" stroke="#f59e0b" stroke-width="1"/>
        <text x="115" y="105" text-anchor="middle" fill="#fcd34d" font-size="8">RJ-45</text>
        <text x="35" y="140" fill="#94a3b8" font-size="10">Max distance: 100m (1G)</text>
        <text x="35" y="158" fill="#94a3b8" font-size="10">Max distance: 55m (10G)</text>
        <text x="35" y="176" fill="#94a3b8" font-size="10">Speed: 1-10 Gbps</text>
        <text x="35" y="194" fill="#94a3b8" font-size="10">Signal: Electrical</text>
        <text x="35" y="212" fill="#94a3b8" font-size="10">EMI: Susceptible</text>
        <text x="35" y="230" fill="#94a3b8" font-size="10">Cost: Low</text>
        <text x="35" y="248" fill="#94a3b8" font-size="10">Use: Desktop to switch</text>
        <text x="35" y="266" fill="#94a3b8" font-size="10">Connector: RJ-45</text>
        <text x="35" y="284" fill="#94a3b8" font-size="10">Jacket: Blue/Gray</text>
        <text x="35" y="302" fill="#94a3b8" font-size="10">Bandwidth: 250 MHz</text>
        
        <rect x="225" y="45" width="190" height="270" rx="8" fill="rgba(139,92,246,0.08)" stroke="#8b5cf6" stroke-width="1.5"/>
        <text x="320" y="70" text-anchor="middle" fill="#c4b5fd" font-size="13" font-weight="700">Multi-Mode Fiber</text>
        <circle cx="320" cy="100" r="20" fill="rgba(139,92,246,0.2)" stroke="#8b5cf6" stroke-width="1"/>
        <text x="320" y="105" text-anchor="middle" fill="#c4b5fd" font-size="8">LC/SC</text>
        <text x="240" y="140" fill="#94a3b8" font-size="10">Max distance: 550m (OM3)</text>
        <text x="240" y="158" fill="#94a3b8" font-size="10">Max distance: 2km (OM1)</text>
        <text x="240" y="176" fill="#94a3b8" font-size="10">Speed: 1-100 Gbps</text>
        <text x="240" y="194" fill="#94a3b8" font-size="10">Signal: Light (LED)</text>
        <text x="240" y="212" fill="#94a3b8" font-size="10">EMI: Immune</text>
        <text x="240" y="230" fill="#94a3b8" font-size="10">Cost: Medium</text>
        <text x="240" y="248" fill="#94a3b8" font-size="10">Use: Building backbone</text>
        <text x="240" y="266" fill="#94a3b8" font-size="10">Connector: LC, SC, ST</text>
        <text x="240" y="284" fill="#94a3b8" font-size="10">Jacket: Orange/Aqua</text>
        <text x="240" y="302" fill="#94a3b8" font-size="10">Core: 50-62.5 microns</text>
        
        <rect x="430" y="45" width="190" height="270" rx="8" fill="rgba(59,130,246,0.08)" stroke="#3b82f6" stroke-width="1.5"/>
        <text x="525" y="70" text-anchor="middle" fill="#93c5fd" font-size="13" font-weight="700">Single-Mode Fiber</text>
        <circle cx="525" cy="100" r="20" fill="rgba(59,130,246,0.2)" stroke="#3b82f6" stroke-width="1"/>
        <text x="525" y="105" text-anchor="middle" fill="#93c5fd" font-size="8">LC/SC</text>
        <text x="445" y="140" fill="#94a3b8" font-size="10">Max distance: 100+ km</text>
        <text x="445" y="158" fill="#94a3b8" font-size="10">Speed: 10-400 Gbps</text>
        <text x="445" y="176" fill="#94a3b8" font-size="10">Signal: Light (Laser)</text>
        <text x="445" y="194" fill="#94a3b8" font-size="10">EMI: Immune</text>
        <text x="445" y="212" fill="#94a3b8" font-size="10">Cost: High</text>
        <text x="445" y="230" fill="#94a3b8" font-size="10">Use: Long-distance, ISP</text>
        <text x="445" y="248" fill="#94a3b8" font-size="10">Connector: LC, SC, ST</text>
        <text x="445" y="266" fill="#94a3b8" font-size="10">Jacket: Yellow</text>
        <text x="445" y="284" fill="#94a3b8" font-size="10">Core: ~9 microns</text>
        <text x="445" y="302" fill="#94a3b8" font-size="10">Lowest signal loss</text>
      </svg>`,
    },
  ],

  summaryPoints: [
    'Cat5e supports 1 Gbps at 100m. Cat6 supports 10 Gbps at 55m. Cat6a supports 10 Gbps at 100m.',
    'T568A and T568B differ only in the green and orange pair positions. Both work identically.',
    'Straight-through cable: same standard on both ends. Connects different-type devices.',
    'Crossover cable: T568A on one end, T568B on the other. Connects same-type devices.',
    'Rollover cable: pinout reversed. Used exclusively for console/management connections.',
    'Single-mode fiber: laser, ~9 micron core, yellow jacket, kilometers of distance.',
    'Multi-mode fiber: LED, 50-62.5 micron core, orange/aqua jacket, up to 550m.',
    'Auto-MDIX eliminates the need to choose between straight-through and crossover cables on modern devices.',
  ],
};
