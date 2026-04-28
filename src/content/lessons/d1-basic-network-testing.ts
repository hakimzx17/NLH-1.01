import type { LessonDefinition } from '../types';

export const d1BasicNetworkTesting: LessonDefinition = {
  id: 'd1-basic-network-testing',
  domainId: 'domain-1',
  moduleLabel: '1.5',
  title: 'Basic Network Testing and Troubleshooting',
  estimatedMinutes: 26,
  hook: 'Something is broken. A user cannot reach a server, a printer stopped printing, or a website will not load. The difference between a junior engineer who guesses and a confident engineer who diagnoses is a systematic testing methodology. This lesson gives you the exact command-by-command approach the CCNA expects and real network teams use every day.',

  sections: [
    {
      id: 'testing-methodology',
      heading: 'The Systematic Testing Approach',
      body: 'Network troubleshooting is not random poking. The CCNA exam tests a structured approach called the **bottom-up method** — start at the physical layer and work your way up to the application layer. If the cable is unplugged, there is no point checking DNS settings.\n\nThe testing flow:\n\n**Layer 1 — Physical:** Is the cable plugged in? Is the interface up? Are there link lights? Use `show interfaces` and `show ip interface brief` to check physical status.\n\n**Layer 2 — Data Link:** Are devices on the same subnet? Is the MAC address table populated? Use `show mac address-table` on switches to verify Layer 2 connectivity.\n\n**Layer 3 — Network:** Can you ping the default gateway? Is the routing table correct? Use `ping` and `traceroute` to verify Layer 3 paths.\n\n**Layer 4 — Transport:** Is the service listening on the expected port? Use `telnet <ip> <port>` or `show tcp brief` to check transport connectivity.\n\n**Layer 7 — Application:** Is DNS resolving? Is the web server responding? Use `nslookup` and `show hosts` to verify application-layer services.\n\nThe golden rule: test from the device closest to the problem first, then expand outward. If a single user cannot reach the internet, start at their PC. If an entire department cannot reach the internet, start at their switch or router.',
      estimatedReadingMinutes: 5,
    },
    {
      id: 'ping-command',
      heading: 'The Ping Command — Your First Diagnostic Tool',
      body: 'Ping uses **ICMP (Internet Control Message Protocol)** Echo Request and Echo Reply messages to test Layer 3 connectivity between two devices. It is the single most used troubleshooting command in networking.\n\nBasic syntax on a Cisco device:\n```\nRouter# ping 192.168.1.1\n```\n\nThe output shows five ICMP Echo Requests sent by default. Each successful reply is marked with an exclamation point (!). A period (.) means the request timed out. Other symbols include:\n- **!** — Echo reply received (success)\n- **.** — Request timed out\n- **U** — Destination unreachable\n- **M** — Could not fragment\n- **?** — Unknown packet type\n\nExtended ping adds options:\n```\nRouter# ping\nProtocol [ip]:\nTarget IP address: 192.168.1.1\nRepeat count [5]: 10\nDatagram size [100]: 1500\nTimeout in seconds [2]:\nExtended commands? [no]: yes\nSource address: 10.0.0.1\n```\n\nThe source address option is critical for troubleshooting. By default, a router uses the exit interface IP as the source. If you want to test from a specific loopback or subnet, you must specify the source. This is how you verify that return routing is correct — the remote device must be able to route back to your chosen source address.',
      estimatedReadingMinutes: 4,
    },
    {
      id: 'traceroute-command',
      heading: 'Traceroute — Mapping the Path',
      body: 'Traceroute shows you every hop between the source and destination. It works by sending packets with incrementally increasing **TTL (Time To Live)** values. Each router that decrements the TTL to zero sends back an ICMP Time Exceeded message, revealing its address.\n\nBasic syntax:\n```\nRouter# traceroute 8.8.8.8\n```\n\nThe output shows each hop with three round-trip times (three probes per hop):\n```\n1  192.168.1.1  2 ms  1 ms  2 ms\n2  10.0.0.1     5 ms  4 ms  5 ms\n3  203.0.113.1  12 ms  11 ms  13 ms\n4  8.8.8.8      18 ms  17 ms  19 ms\n```\n\nReading traceroute output:\n- **Low, consistent times** — healthy path\n- **Increasing latency at one hop** — congestion or processing delay at that router\n- **Asterisks (*)** — the hop is not responding (could be a firewall blocking ICMP, not necessarily a failure)\n- **Path stops** — routing issue or ACL blocking beyond that point\n\nThe exam will show you a traceroute output and ask where the problem lies. Look for the last successful hop — the problem is between that hop and the next one.',
      estimatedReadingMinutes: 4,
    },
    {
      id: 'show-commands',
      heading: 'Essential Show Commands for Troubleshooting',
      body: 'The CCNA exam tests your ability to choose the right show command for the right situation. Here are the commands you must know:\n\n**`show ip interface brief`** — Quick overview of all interfaces. Shows IP address, status (up/down), and protocol status. "up/up" = healthy. "up/down" = Layer 2 issue. "administratively down" = interface is shut.\n\n**`show interfaces`** — Detailed interface statistics. Shows errors, collisions, input/output rates, and MTU. Look for increasing error counters — they indicate physical problems.\n\n**`show mac address-table`** — Displays the switch\'s MAC address table. Shows which MAC addresses are learned on which ports. If a MAC is missing, the device is not communicating at Layer 2.\n\n**`show ip route`** — The routing table. Shows all known networks and how to reach them. Connected routes (C), static routes (S), and dynamic routes (O for OSPF, D for EIGRP).\n\n**`show arp`** — The ARP table. Maps IP addresses to MAC addresses on directly connected networks. If an IP is missing from the ARP table, Layer 2 communication is failing.\n\n**`show cdp neighbors`** — Lists directly connected Cisco devices. Shows device ID, local interface, remote interface, and platform. Useful for discovering what is physically connected to each port.\n\n**`show running-config`** — The current active configuration. Use `show running-config | section interface` to focus on interface configs, or `show running-config | include <keyword>` to search for specific settings.',
      estimatedReadingMinutes: 5,
    },
    {
      id: 'common-issues',
      heading: 'Common Network Issues and How to Identify Them',
      body: 'The CCNA exam presents scenarios that map to specific, recognizable problems. Here are the most tested:\n\n**Wrong default gateway:** A host can reach devices on its own subnet but cannot reach other networks. Fix: verify the gateway IP matches the router interface IP on that subnet.\n\n**Duplicate IP address:** Intermittent connectivity, ARP table flapping. Two devices claiming the same IP cause unpredictable behavior. Fix: use `show arp` to see which MAC is claiming the address, then track down the duplicate.\n\n**Wrong subnet mask:** A host thinks a destination is on a different subnet (or the same subnet) when it is not. Symptoms: can ping some devices but not others on the same physical segment. Fix: verify the mask matches on both ends of the link.\n\n**Shutdown interface:** Interface shows "administratively down." Fix: `no shutdown` on the interface.\n\n**Wrong VLAN:** A host is connected to a switch port assigned to the wrong VLAN. The host gets an IP in a different subnet than expected. Fix: `show vlan brief` on the switch, then reassign the port.\n\n**ACL blocking traffic:** Traffic silently drops because an access control list denies it. Fix: `show access-lists` to check for deny entries matching the traffic pattern.\n\n**DNS failure:** Users can reach servers by IP but not by name. Fix: verify DNS server settings with `ipconfig /all` on Windows or `show hosts` on the router.',
      estimatedReadingMinutes: 5,
    },
    {
      id: 'documenting-results',
      heading: 'Documenting Your Troubleshooting Process',
      body: 'Real network engineers document everything. The CCNA exam does not test documentation directly, but understanding the process helps you think systematically.\n\nA good troubleshooting record includes:\n1. **Symptom** — What is the user experiencing? Be specific: "Cannot reach 10.0.0.5" is better than "Network is broken."\n2. **Scope** — Is it one device, one subnet, or the entire network?\n3. **Baseline** — What does "normal" look like? Compare current state to known-good state.\n4. **Tests performed** — Each command run, its output, and what it proved or ruled out.\n5. **Root cause** — The actual problem, not just the symptom.\n6. **Resolution** — What fixed it and how to prevent recurrence.\n\nThis documentation habit is what separates professionals from guessers. On the exam, it translates to choosing the answer that follows a logical diagnostic sequence rather than jumping to conclusions.',
      estimatedReadingMinutes: 3,
    },
  ],

  callouts: [
    {
      type: 'why-matters',
      title: 'Why This Matters',
      body: 'The CCNA exam is fundamentally a troubleshooting exam disguised as a theory exam. Every question that asks "what is the cause of this problem?" is testing your ability to interpret show command output and ping/traceroute results. Without systematic testing skills, you will guess. With them, you will diagnose.',
    },
    {
      type: 'exam-trap',
      title: 'Exam Trap',
      body: 'The exam loves the "up/down" interface status. "up/down" means the physical layer is fine (cable is connected) but the data link layer is failing. Common causes: encapsulation mismatch (HDLC vs PPP on serial links), clock rate missing on DCE serial interface, or switchport mode mismatch. Do not confuse this with "administratively down" — that means someone typed `shutdown` on the interface.',
    },
    {
      type: 'analogy',
      title: 'Analogy',
      body: 'Think of troubleshooting like a doctor diagnosing an illness. You do not start with brain surgery. You check vital signs first (physical layer), then listen to the heart (data link), then order blood tests (network layer), then do specialized scans (application layer). Each step rules out categories of problems and narrows the search.',
    },
    {
      type: 'real-world',
      title: 'Real World',
      body: 'In a real NOC (Network Operations Center), the first three commands run on any trouble ticket are: `ping` the device, `show ip interface brief` on the nearest router, and `show cdp neighbors` to map the physical topology. These three commands answer 80 percent of "what is going on?" questions before diving deeper.',
    },
    {
      type: 'remember',
      title: 'Remember This',
      body: 'Ping tests Layer 3 connectivity. Traceroute shows the path. `show ip interface brief` gives interface health. `show mac address-table` shows Layer 2 learning. `show ip route` shows the routing table. `show arp` shows IP-to-MAC mappings. `show cdp neighbors` shows directly connected Cisco devices. Know what each command reveals.',
    },
  ],

  cliSpotlights: [
    {
      id: 'ping-extended',
      title: 'Extended Ping for Precise Testing',
      commands: [
        'Router# ping',
        'Protocol [ip]:',
        'Target IP address: 10.0.0.5',
        'Repeat count [5]: 10',
        'Datagram size [100]:',
        'Timeout in seconds [2]:',
        'Extended commands? [no]: yes',
        'Source address or interface: 192.168.1.1',
        'Type of service [0]:',
        'Sweep range of sizes? [no]:',
      ],
      explanation: 'Extended ping lets you specify the source address, which is critical for testing return routing. By default, a router uses the exit interface IP as the source. If you want to verify that a remote network can route back to a specific subnet, set the source address to an IP in that subnet. If the ping fails but a normal ping succeeds, the problem is return routing — the destination cannot reach your chosen source address.',
    },
    {
      id: 'cdp-discovery',
      title: 'Discovering Network Topology with CDP',
      commands: [
        'Router# show cdp neighbors',
        'Router# show cdp neighbors detail',
        'Router# show cdp interface',
      ],
      explanation: 'CDP (Cisco Discovery Protocol) runs at Layer 2 and discovers directly connected Cisco devices. `show cdp neighbors` gives a quick table: device ID, local interface, holdtime, capability, platform, and remote interface. `show cdp neighbors detail` adds the neighbor\'s IP address and IOS version. `show cdp interface` shows which interfaces have CDP enabled. CDP is Cisco-proprietary — the open equivalent is LLDP (`show lldp neighbors`).',
    },
  ],

  checkpoints: [
    {
      id: 'cp-interface-status',
      question: 'An interface shows "up/down" in `show ip interface brief`. What does this indicate?',
      options: [
        { id: 'a', text: 'The cable is unplugged', isCorrect: false },
        { id: 'b', text: 'The interface has been administratively shut down', isCorrect: false },
        { id: 'c', text: 'Physical layer is up but data link layer is failing', isCorrect: true },
        { id: 'd', text: 'The interface is operating correctly', isCorrect: false },
      ],
      hint: 'The first status is Layer 1 (physical), the second is Layer 2 (protocol).',
    },
    {
      id: 'cp-ping-symbols',
      question: 'During an extended ping, you see a series of "U" characters in the output. What does this mean?',
      options: [
        { id: 'a', text: 'Successful replies', isCorrect: false },
        { id: 'b', text: 'Request timed out', isCorrect: false },
        { id: 'c', text: 'Destination unreachable', isCorrect: true },
        { id: 'd', text: 'Packet could not be fragmented', isCorrect: false },
      ],
      hint: 'Each ping symbol has a specific meaning. "U" stands for a specific ICMP message type.',
    },
  ],

  visualBlocks: [
    {
      id: 'troubleshooting-flow',
      type: 'diagram',
      title: 'Bottom-Up Troubleshooting Flow',
      description: 'Visual flow showing the systematic approach from physical layer up to application layer, with the key commands and checks at each step.',
      svgContent: `<svg viewBox="0 0 600 440" xmlns="http://www.w3.org/2000/svg">
        <text x="300" y="25" text-anchor="middle" fill="#e2e8f0" font-size="14" font-weight="700">Bottom-Up Troubleshooting Flow</text>
        
        <rect x="40" y="45" width="520" height="60" rx="8" fill="rgba(239,68,68,0.1)" stroke="#ef4444" stroke-width="1.5"/>
        <text x="60" y="68" fill="#fca5a5" font-size="12" font-weight="600">Layer 1 — Physical</text>
        <text x="60" y="88" fill="#94a3b8" font-size="10">Cable connected? Link lights? Interface up? → show ip interface brief</text>
        
        <text x="300" y="120" text-anchor="middle" fill="#64748b" font-size="16">↓</text>
        
        <rect x="40" y="130" width="520" height="60" rx="8" fill="rgba(245,158,11,0.1)" stroke="#f59e0b" stroke-width="1.5"/>
        <text x="60" y="153" fill="#fcd34d" font-size="12" font-weight="600">Layer 2 — Data Link</text>
        <text x="60" y="173" fill="#94a3b8" font-size="10">Same subnet? MAC table populated? → show mac address-table, show arp</text>
        
        <text x="300" y="205" text-anchor="middle" fill="#64748b" font-size="16">↓</text>
        
        <rect x="40" y="215" width="520" height="60" rx="8" fill="rgba(34,197,94,0.1)" stroke="#22c55e" stroke-width="1.5"/>
        <text x="60" y="238" fill="#86efac" font-size="12" font-weight="600">Layer 3 — Network</text>
        <text x="60" y="258" fill="#94a3b8" font-size="10">Can ping gateway? Routing table correct? → ping, traceroute, show ip route</text>
        
        <text x="300" y="290" text-anchor="middle" fill="#64748b" font-size="16">↓</text>
        
        <rect x="40" y="300" width="520" height="60" rx="8" fill="rgba(59,130,246,0.1)" stroke="#3b82f6" stroke-width="1.5"/>
        <text x="60" y="323" fill="#93c5fd" font-size="12" font-weight="600">Layer 4 — Transport</text>
        <text x="60" y="343" fill="#94a3b8" font-size="10">Service listening on port? → telnet &lt;ip&gt; &lt;port&gt;, show tcp brief</text>
        
        <text x="300" y="375" text-anchor="middle" fill="#64748b" font-size="16">↓</text>
        
        <rect x="40" y="385" width="520" height="45" rx="8" fill="rgba(139,92,246,0.1)" stroke="#8b5cf6" stroke-width="1.5"/>
        <text x="60" y="408" fill="#c4b5fd" font-size="12" font-weight="600">Layer 7 — Application</text>
        <text x="60" y="423" fill="#94a3b8" font-size="10">DNS resolving? HTTP responding? → nslookup, show hosts</text>
      </svg>`,
    },
  ],

  summaryPoints: [
    'Always troubleshoot bottom-up: Physical → Data Link → Network → Transport → Application.',
    'Ping (ICMP Echo) tests Layer 3 connectivity between two devices. Use extended ping to specify source address.',
    'Traceroute maps the path hop-by-hop using incrementing TTL values. Look for the last successful hop to locate failures.',
    '`show ip interface brief` is the fastest way to check interface health: up/up = healthy, up/down = Layer 2 issue, admin down = shut.',
    '`show mac address-table` reveals which devices are connected to which switch ports at Layer 2.',
    '`show ip route` displays the routing table — if a network is not in the table, the router cannot reach it.',
    '`show cdp neighbors` discovers directly connected Cisco devices and their interfaces.',
    'Common issues: wrong gateway, duplicate IP, wrong subnet mask, shutdown interface, wrong VLAN, ACL blocking, DNS failure.',
  ],
};
