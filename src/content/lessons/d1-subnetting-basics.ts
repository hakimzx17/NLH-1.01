import type { LessonDefinition } from '../types';

export const d1SubnettingBasics: LessonDefinition = {
  id: 'd1-subnetting-basics',
  domainId: 'domain-1',
  moduleLabel: '1.4',
  title: 'Subnetting Fundamentals',
  estimatedMinutes: 28,
  hook: 'Imagine you have been given a single apartment building with 254 units, but you need to house four separate companies, each wanting their own locked floor. Subnetting is how you take one big network and carve it into smaller, isolated pieces — each with its own address range, its own broadcast boundary, and its own security perimeter. This is the most heavily tested math skill on the CCNA 200-301, and once the pattern clicks, you will solve subnet questions in under 60 seconds.',

  sections: [
    {
      id: 'what-is-subnetting',
      heading: 'What Is Subnetting and Why Do We Do It?',
      body: 'Subnetting is the process of dividing a single large IP network into multiple smaller networks called subnets. You do this by borrowing bits from the host portion of an IP address and giving them to the network portion.\n\nThree reasons we subnet:\n\n**Reduce broadcast domains.** Every device in a network receives every broadcast. In a /24 network with 254 hosts, a single ARP request hits all 254 devices. Split that into four /26 subnets and each broadcast only reaches 62 devices. Smaller broadcast domains mean less wasted CPU cycles on every endpoint.\n\n**Improve security and isolation.** Subnets act as natural boundaries. A router separates subnets, and routers can apply access control lists (ACLs) to filter traffic between them. If the guest Wi-Fi is on its own subnet, you can block it from reaching the finance department\'s subnet with a single ACL on the router.\n\n**Conserve IP addresses.** Without subnetting, you might assign an entire Class C network (/24, 254 hosts) to a point-to-point link that only needs two addresses. That wastes 252 addresses. Subnetting lets you use a /30 (exactly 2 usable hosts) instead.\n\nThe CCNA exam will not ask you "what is subnetting." It will give you a scenario — "Design an addressing scheme for a company with departments of 50, 30, 12, and 2 hosts" — and expect you to calculate the right subnets.',
      estimatedReadingMinutes: 5,
    },
    {
      id: 'cidr-notation',
      heading: 'Reading CIDR Notation',
      body: 'CIDR (Classless Inter-Domain Routing) notation is the shorthand that tells you how many bits belong to the network portion of an address. You write it as a slash followed by a number: /24, /27, /30.\n\nAn IPv4 address is 32 bits. The CIDR number tells you how many of those 32 bits are "network bits" (set to 1 in the subnet mask). The remaining bits are "host bits" (set to 0).\n\nCommon CIDR values you must know cold:\n- **/8** = 255.0.0.0 — 16,777,214 hosts (entire Class A range)\n- **/16** = 255.255.0.0 — 65,534 hosts (entire Class B range)\n- **/24** = 255.255.255.0 — 254 hosts (most common LAN subnet)\n- **/25** = 255.255.255.128 — 126 hosts (splits a /24 in half)\n- **/26** = 255.255.255.192 — 62 hosts (splits a /24 into quarters)\n- **/27** = 255.255.255.224 — 30 hosts\n- **/28** = 255.255.255.240 — 14 hosts\n- **/29** = 255.255.255.248 — 6 hosts\n- **/30** = 255.255.255.252 — 2 hosts (point-to-point links)\n- **/32** = 255.255.255.255 — single host (used for loopbacks and host routes)\n\nThe pattern: each time you increase the CIDR by 1, you cut the number of hosts roughly in half and double the number of subnets. This binary relationship is the key to doing subnet math in your head.',
      estimatedReadingMinutes: 4,
    },
    {
      id: 'converting-cidr-mask',
      heading: 'Converting Between CIDR and Subnet Mask',
      body: 'A subnet mask is a 32-bit number where the network bits are all 1s and the host bits are all 0s. CIDR just counts the 1s.\n\nTo convert CIDR to dotted decimal:\n1. Write out the CIDR number of 1s, then fill the rest with 0s to reach 32 bits.\n2. Split into four octets of 8 bits each.\n3. Convert each octet to decimal.\n\nExample: /26\n- Binary: 11111111.11111111.11111111.11000000\n- Octets: 255 . 255 . 255 . 192\n- Result: 255.255.255.192\n\nTo convert a subnet mask to CIDR:\n1. Convert each octet to binary.\n2. Count the total number of 1s.\n\nExample: 255.255.255.240\n- Binary: 11111111.11111111.11111111.11110000\n- Count the 1s: 8 + 8 + 8 + 4 = 28\n- Result: /28\n\nMemorize the octet values for partial masks — they appear on every exam:\n- 128 = 10000000 (1 bit)\n- 192 = 11000000 (2 bits)\n- 224 = 11100000 (3 bits)\n- 240 = 11110000 (4 bits)\n- 248 = 11111000 (5 bits)\n- 252 = 11111100 (6 bits)\n- 254 = 11111110 (7 bits)\n- 255 = 11111111 (8 bits)',
      estimatedReadingMinutes: 4,
    },
    {
      id: 'calculating-subnets-hosts',
      heading: 'Calculating Subnets and Hosts Per Subnet',
      body: 'Two formulas govern every subnetting calculation:\n\n**Hosts per subnet = 2^(host bits) - 2**\n\nThe "-2" removes the network address (all host bits = 0) and the broadcast address (all host bits = 1). These two addresses are reserved and cannot be assigned to devices.\n\nExample: /27 has 5 host bits (32 - 27 = 5).\nHosts = 2^5 - 2 = 32 - 2 = 30 usable hosts.\n\n**Number of subnets = 2^(borrowed bits)**\n\nBorrowed bits = the new CIDR minus the original CIDR.\n\nExample: You have 192.168.1.0/24 and subnet it to /27.\nBorrowed bits = 27 - 24 = 3.\nSubnets = 2^3 = 8 subnets.\n\nCombined example: Subnetting 10.0.0.0/8 into /24 subnets.\nBorrowed bits = 24 - 8 = 16.\nNumber of subnets = 2^16 = 65,536 subnets.\nHosts per subnet = 2^8 - 2 = 254 hosts.\n\nThe exam will often give you a requirement like "I need at least 50 hosts per subnet" and ask for the smallest CIDR that satisfies it. Work backward: 2^h - 2 ≥ 50, so h = 6 (since 2^6 - 2 = 62). CIDR = 32 - 6 = /26.',
      estimatedReadingMinutes: 5,
    },
    {
      id: 'step-by-step-method',
      heading: 'The Subnetting Step-by-Step Method',
      body: 'When the exam gives you an IP address and subnet mask and asks you to find the network address, broadcast address, and usable host range, follow this method every time:\n\n**Step 1: Identify the "interesting octet."** This is the octet where the subnet mask is not 255 or 0. For 255.255.255.224 (/27), the interesting octet is the 4th octet (224).\n\n**Step 2: Calculate the block size (magic number).** Block size = 256 - the interesting octet value. For 224: 256 - 224 = 32. Subnets increment by 32 in the interesting octet.\n\n**Step 3: Find the network address.** In the interesting octet, find the largest multiple of the block size that does not exceed the IP\'s value in that octet. All octets to the left stay the same. All octets to the right become 0.\n\n**Step 4: Find the broadcast address.** Take the network address and add (block size - 1) to the interesting octet. All octets to the right become 255.\n\n**Step 5: Find the usable host range.** First usable = network address + 1 in the interesting octet. Last usable = broadcast address - 1 in the interesting octet.\n\nWorked example: IP 192.168.1.100 /27\n- Interesting octet: 4th (mask = 224)\n- Block size: 256 - 224 = 32\n- Subnet boundaries: .0, .32, .64, .96, .128, .160...\n- 100 falls in the .96 block → Network: 192.168.1.96\n- Broadcast: 96 + 31 = 127 → 192.168.1.127\n- Usable hosts: 192.168.1.97 through 192.168.1.126\n\nThis method works for any CIDR value. Practice it until it is automatic.',
      estimatedReadingMinutes: 5,
    },
    {
      id: 'vlsm',
      heading: 'VLSM — Variable Length Subnet Masking',
      body: 'VLSM means using different subnet mask lengths within the same major network. Instead of giving every subnet the same size, you right-size each subnet to the number of hosts it actually needs.\n\nWithout VLSM: If you have departments needing 100, 50, 10, and 2 hosts, you would have to size every subnet for the largest department (100 hosts needs a /25). That wastes 48 addresses on the 50-host department, 116 on the 10-host department, and 124 on the 2-host department.\n\nWith VLSM: You allocate subnets from largest to smallest:\n- 100 hosts → /25 (126 hosts, uses 192.168.1.0/25)\n- 50 hosts → /26 (62 hosts, uses 192.168.1.128/26)\n- 10 hosts → /28 (14 hosts, uses 192.168.1.192/28)\n- 2 hosts → /30 (2 hosts, uses 192.168.1.208/30)\n\nThe golden rule of VLSM: always allocate the largest subnet first. If you start with the smallest, you will fragment the address space and run out of contiguous blocks for the larger subnets.\n\nThe CCNA exam tests VLSM by giving you a topology with multiple links and asking you to design an efficient addressing scheme. The key insight is that point-to-point serial links only need 2 hosts, so they should always get a /30.',
      estimatedReadingMinutes: 4,
    },
    {
      id: 'practical-examples',
      heading: 'Practical Subnetting — Worked Examples',
      body: 'Example 1: How many subnets and hosts when you subnet 172.16.0.0/16 to /20?\n- Borrowed bits: 20 - 16 = 4\n- Subnets: 2^4 = 16 subnets\n- Host bits: 32 - 20 = 12\n- Hosts per subnet: 2^12 - 2 = 4,094 hosts\n- Block size in 3rd octet: 256 - 240 = 16\n- First three subnets: 172.16.0.0/20, 172.16.16.0/20, 172.16.32.0/20\n\nExample 2: What is the last usable host in 10.100.50.75/29?\n- Interesting octet: 4th (mask = 248)\n- Block size: 256 - 248 = 8\n- Boundaries: .0, .8, .16... .72, .80\n- 75 falls in .72 block → Network: 10.100.50.72\n- Broadcast: 72 + 7 = 79 → 10.100.50.79\n- Last usable: 10.100.50.78\n\nExample 3: VLSM design for 192.168.10.0/24 with needs of 60, 25, 10, and 2 hosts.\n- 60 hosts → /26 (62 hosts): 192.168.10.0/26 (range .1-.62)\n- 25 hosts → /27 (30 hosts): 192.168.10.64/27 (range .65-.94)\n- 10 hosts → /28 (14 hosts): 192.168.10.96/28 (range .97-.110)\n- 2 hosts → /30 (2 hosts): 192.168.10.112/30 (range .113-.114)\n- Remaining space: 192.168.10.116 through 192.168.10.255 still available for future growth.\n\nEach example follows the same pattern: identify what is given, apply the formulas, verify the boundaries. The exam rewards speed and accuracy — drill these until the block-size method becomes muscle memory.',
      estimatedReadingMinutes: 5,
    },
  ],

  callouts: [
    {
      type: 'why-matters',
      title: 'Why This Matters',
      body: 'Subnetting appears on every single CCNA exam in multiple forms. You will be asked to calculate subnets, identify valid host addresses, design VLSM schemes, and troubleshoot misconfigured subnet masks. A wrong subnet mask on a real device means the device cannot determine which traffic is local and which needs to go to the gateway — the most common cause of "I can ping some things but not others." Mastering subnet math is not optional for the CCNA.',
    },
    {
      type: 'exam-trap',
      title: 'Exam Trap',
      body: 'The exam will give you an IP address and ask "which of the following is a valid host address in this subnet?" The trick answers are always the network address (all host bits = 0) or the broadcast address (all host bits = 1). These are never assignable to hosts. Always calculate the full range before selecting your answer. Also watch for questions that ask "how many hosts" — the "-2" is the difference between a correct and wrong answer every single time.',
    },
    {
      type: 'analogy',
      title: 'Analogy',
      body: 'Think of an IP network like a phone system for a corporation. The network portion is the company\'s main phone number (everyone in the company shares it). The host portion is the extension number (unique to each person). Subnetting is like adding a department prefix — now the Sales department has extensions 100-199 and Engineering has 200-299. Both are still part of the same company, but calls within Sales stay within Sales unless they specifically dial out.',
    },
    {
      type: 'real-world',
      title: 'Real World',
      body: 'In production networks, the most common subnetting mistake is a mismatched subnet mask between two devices on the same link. If PC-A has 192.168.1.10/24 and PC-B has 192.168.1.20/25, they are technically on the same physical segment but PC-B thinks PC-A is on a different network. PC-B will try to send traffic to its default gateway instead of directly to PC-A. The symptom: intermittent connectivity that makes no sense. Always verify subnet masks match on both ends of a link.',
    },
    {
      type: 'remember',
      title: 'Remember This',
      body: 'Block size = 256 minus the interesting octet value. Network address = largest multiple of block size ≤ the IP\'s interesting octet. Broadcast = network + block size - 1. First usable = network + 1. Last usable = broadcast - 1. This five-step chain solves every subnetting question on the exam.',
    },
  ],

  cliSpotlights: [
    {
      id: 'interface-subnet-config',
      title: 'Configuring an Interface with a Subnet',
      commands: [
        'Router(config)# interface GigabitEthernet0/0',
        'Router(config-if)# ip address 192.168.1.1 255.255.255.224',
        'Router(config-if)# no shutdown',
        'Router(config-if)# end',
        'Router# show ip interface brief',
      ],
      explanation: 'The `ip address` command takes the IP and subnet mask in dotted decimal — not CIDR notation. 255.255.255.224 is /27, which gives you 30 usable hosts on this segment. The `no shutdown` command is critical — Cisco interfaces are administratively down by default. The `show ip interface brief` output confirms the interface is up/up and shows the assigned address. If you see the correct IP but the protocol is down, the issue is Layer 2 (cable, switch port, or neighbor mismatch).',
    },
    {
      id: 'show-ip-route-subnets',
      title: 'Verifying Subnets in the Routing Table',
      commands: [
        'Router# show ip route',
        'Router# show ip route 192.168.1.0',
      ],
      explanation: 'The routing table shows every subnet the router knows about. Connected subnets (marked with "C") are networks directly attached to the router\'s interfaces. The notation "192.168.1.0/27 is directly connected, GigabitEthernet0/0" tells you the router considers 192.168.1.0 through 192.168.1.31 as local. If a subnet is missing from the routing table, the router will not know how to reach it. Use `show ip route <network>` to check for a specific entry — this is your first step when troubleshooting "I cannot reach that network."',
    },
  ],

  checkpoints: [
    {
      id: 'cp-subnet-range',
      question: 'Given the IP address 172.16.50.130 with subnet mask 255.255.255.192, what is the broadcast address for this subnet?',
      options: [
        { id: 'a', text: '172.16.50.127', isCorrect: false },
        { id: 'b', text: '172.16.50.191', isCorrect: true },
        { id: 'c', text: '172.16.50.255', isCorrect: false },
        { id: 'd', text: '172.16.50.192', isCorrect: false },
      ],
      hint: 'The mask 255.255.255.192 means the block size is 256 - 192 = 64. Find which 64-address block 130 falls into, then calculate the broadcast.',
    },
    {
      id: 'cp-vlsm-design',
      question: 'You are subnetting 10.0.0.0/8 using VLSM. Department A needs 500 hosts, Department B needs 100 hosts, and a point-to-point link needs 2 hosts. Which CIDR should you assign to the point-to-point link to conserve the most address space?',
      options: [
        { id: 'a', text: '/24', isCorrect: false },
        { id: 'b', text: '/28', isCorrect: false },
        { id: 'c', text: '/30', isCorrect: true },
        { id: 'd', text: '/32', isCorrect: false },
      ],
      hint: 'A point-to-point link connects exactly two devices. What is the smallest subnet that provides exactly 2 usable host addresses?',
    },
  ],

  visualBlocks: [
    {
      id: 'subnet-division-diagram',
      type: 'diagram',
      title: 'Subnet Division: /24 to Four /26 Subnets',
      description: 'Visual breakdown of how a single 192.168.1.0/24 network (256 addresses) is divided into four equal /26 subnets, each with 64 addresses (62 usable hosts).',
      svgContent: `<svg viewBox="0 0 640 420" xmlns="http://www.w3.org/2000/svg">
        <text x="320" y="25" text-anchor="middle" fill="#e2e8f0" font-size="14" font-weight="700">192.168.1.0/24 — 256 Total Addresses</text>
        <rect x="40" y="40" width="560" height="50" rx="6" fill="rgba(99,102,241,0.12)" stroke="#6366f1" stroke-width="2"/>
        <text x="320" y="70" text-anchor="middle" fill="#a5b4fc" font-size="12">Network: 192.168.1.0 — Broadcast: 192.168.1.255 — 254 Usable Hosts</text>

        <text x="320" y="120" text-anchor="middle" fill="#94a3b8" font-size="11" font-style="italic">Borrow 2 bits → 4 subnets of /26 (64 addresses each)</text>

        <rect x="40" y="145" width="130" height="55" rx="6" fill="rgba(34,197,94,0.12)" stroke="#22c55e" stroke-width="1.5"/>
        <text x="105" y="165" text-anchor="middle" fill="#86efac" font-size="11" font-weight="600">Subnet 1 — /26</text>
        <text x="105" y="182" text-anchor="middle" fill="#86efac" font-size="10">192.168.1.0 – 192.168.1.63</text>
        <text x="105" y="196" text-anchor="middle" fill="#bbf7d0" font-size="9">Usable: .1 – .62 (62 hosts)</text>

        <rect x="180" y="145" width="130" height="55" rx="6" fill="rgba(59,130,246,0.12)" stroke="#3b82f6" stroke-width="1.5"/>
        <text x="245" y="165" text-anchor="middle" fill="#93c5fd" font-size="11" font-weight="600">Subnet 2 — /26</text>
        <text x="245" y="182" text-anchor="middle" fill="#93c5fd" font-size="10">192.168.1.64 – 192.168.1.127</text>
        <text x="245" y="196" text-anchor="middle" fill="#bfdbfe" font-size="9">Usable: .65 – .126 (62 hosts)</text>

        <rect x="320" y="145" width="130" height="55" rx="6" fill="rgba(245,158,11,0.12)" stroke="#f59e0b" stroke-width="1.5"/>
        <text x="385" y="165" text-anchor="middle" fill="#fcd34d" font-size="11" font-weight="600">Subnet 3 — /26</text>
        <text x="385" y="182" text-anchor="middle" fill="#fcd34d" font-size="10">192.168.1.128 – 192.168.1.191</text>
        <text x="385" y="196" text-anchor="middle" fill="#fde68a" font-size="9">Usable: .129 – .190 (62 hosts)</text>

        <rect x="460" y="145" width="140" height="55" rx="6" fill="rgba(239,68,68,0.12)" stroke="#ef4444" stroke-width="1.5"/>
        <text x="530" y="165" text-anchor="middle" fill="#fca5a5" font-size="11" font-weight="600">Subnet 4 — /26</text>
        <text x="530" y="182" text-anchor="middle" fill="#fca5a5" font-size="10">192.168.1.192 – 192.168.1.255</text>
        <text x="530" y="196" text-anchor="middle" fill="#fecaca" font-size="9">Usable: .193 – .254 (62 hosts)</text>

        <text x="320" y="240" text-anchor="middle" fill="#94a3b8" font-size="11" font-style="italic">Each /26 borrows 2 bits from the host portion (255.255.255.192)</text>

        <rect x="40" y="260" width="560" height="140" rx="8" fill="rgba(30,41,59,0.6)" stroke="rgba(148,163,184,0.2)" stroke-width="1"/>
        <text x="320" y="285" text-anchor="middle" fill="#e2e8f0" font-size="12" font-weight="600">Binary View of the 4th Octet</text>

        <text x="80" y="310" fill="#86efac" font-size="10" font-family="monospace">Subnet 1: 00|000000 → .0</text>
        <text x="80" y="330" fill="#93c5fd" font-size="10" font-family="monospace">Subnet 2: 01|000000 → .64</text>
        <text x="80" y="350" fill="#fcd34d" font-size="10" font-family="monospace">Subnet 3: 10|000000 → .128</text>
        <text x="80" y="370" fill="#fca5a5" font-size="10" font-family="monospace">Subnet 4: 11|000000 → .192</text>

        <text x="340" y="310" fill="#94a3b8" font-size="10">↑ borrowed bits</text>
        <text x="340" y="330" fill="#94a3b8" font-size="10">↑ host bits (6 bits = 64 values)</text>
        <text x="340" y="350" fill="#94a3b8" font-size="10">Block size = 256 - 192 = 64</text>
        <text x="340" y="370" fill="#94a3b8" font-size="10">2 borrowed bits → 2² = 4 subnets</text>

        <text x="320" y="405" text-anchor="middle" fill="#64748b" font-size="10">The vertical bar | separates network bits (left) from host bits (right)</text>
      </svg>`,
    },
  ],

  summaryPoints: [
    'Subnetting divides one large network into smaller networks to reduce broadcasts, improve security, and conserve addresses.',
    'CIDR notation (/24, /27, /30) counts the number of network bits in a 32-bit IPv4 address.',
    'Hosts per subnet = 2^(host bits) - 2. The -2 reserves the network and broadcast addresses.',
    'Number of subnets = 2^(borrowed bits), where borrowed = new CIDR - original CIDR.',
    'Block size = 256 - interesting octet value. This is the fastest way to find subnet boundaries.',
    'Network address = all host bits set to 0. Broadcast address = all host bits set to 1. Neither is assignable.',
    'VLSM uses different mask sizes within the same network. Always allocate the largest subnet first.',
    'Point-to-point links should always use /30 (exactly 2 usable hosts) to conserve address space.',
  ],
};
