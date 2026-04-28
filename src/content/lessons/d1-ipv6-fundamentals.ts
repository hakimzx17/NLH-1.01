import type { LessonDefinition } from '../types';

export const d1Ipv6Fundamentals: LessonDefinition = {
  id: 'd1-ipv6-fundamentals',
  domainId: 'domain-1',
  moduleLabel: '1.9',
  title: 'IPv6 Fundamentals and Addressing',
  estimatedMinutes: 30,
  hook: 'IPv4 ran out of addresses years ago. Every new network you design, every cloud deployment, every IoT rollout needs IPv6. The CCNA 200-301 made IPv6 a first-class citizen — not an afterthought. This lesson takes you from "I know IPv4" to "I can read, configure, and troubleshoot IPv6" with the same confidence you bring to IPv4.',

  sections: [
    {
      id: 'why-ipv6',
      heading: 'Why IPv6 Exists',
      body: 'IPv4 provides approximately 4.3 billion addresses (2^32). That sounded like more than enough in 1981. It was not. By 2011, IANA (Internet Assigned Numbers Authority) had allocated the last IPv4 address blocks to regional registries.\n\nTemporary fixes extended IPv4\'s life:\n- **NAT (Network Address Translation):** Lets many private addresses share one public address. Works, but breaks end-to-end connectivity and complicates applications.\n- **CIDR (Classless Inter-Domain Routing):** More efficient address allocation. Reduces waste but does not create new addresses.\n- **Private addressing (RFC 1918):** Reuses the same address blocks in every organization. Requires NAT to reach the internet.\n\nIPv6 solves the root problem: it provides 2^128 addresses — approximately 340 undecillion (3.4 × 10^38). That is enough addresses for every grain of sand on Earth to have its own IP address. With IPv6, every device gets a globally unique, publicly routable address. NAT becomes unnecessary.\n\nThe transition is not a flip of a switch. Both protocols will coexist for years. The CCNA expects you to understand both and know how they operate together.',
      estimatedReadingMinutes: 4,
    },
    {
      id: 'ipv6-address-format',
      heading: 'IPv6 Address Format and Compression',
      body: 'An IPv6 address is 128 bits, written as eight groups of four hexadecimal digits separated by colons:\n\n`2001:0db8:0000:0000:0000:0000:0000:0001`\n\nTwo compression rules make addresses readable:\n\n**Rule 1 — Leading zeros in each group can be omitted:**\n`2001:0db8:0000:0000:0000:0000:0000:0001` → `2001:db8:0:0:0:0:0:1`\n\n**Rule 2 — One consecutive run of all-zero groups can be replaced with `::`:**\n`2001:db8:0:0:0:0:0:1` → `2001:db8::1`\n\nCritical rules:\n- Only ONE `::` per address. Two `::` makes the address ambiguous (you cannot tell how many zeros each represents).\n- Each group must have 1-4 hex digits. Five digits in a group is invalid.\n- The `::` can appear at the beginning, middle, or end of an address.\n- `::1` = loopback. `::` = unspecified address (all zeros).\n\nExam practice: decompress `fe80::1` → `fe80:0000:0000:0000:0000:0000:0000:0001`. Compress `2001:0db8:0000:0042:0000:0000:0000:0001` → `2001:db8:0:42::1` (the longest run of zeros is compressed).',
      estimatedReadingMinutes: 4,
    },
    {
      id: 'ipv6-address-types',
      heading: 'IPv6 Address Types',
      body: 'IPv6 has three address types (no broadcast):\n\n**Unicast:** One-to-one communication. Sent to a single interface.\n\n- **Global unicast (GUA):** Publicly routable, like IPv4 public addresses. Prefix: `2000::/3` (anything starting with 2 or 3). Assigned by ISPs. Format: Global Routing Prefix (48 bits) + Subnet ID (16 bits) + Interface ID (64 bits).\n- **Unique local (ULA):** Private addresses, like IPv4 RFC 1918. Prefix: `fc00::/7` (fc00:: to fdff::). Not routable on the public internet. Format: `fd` + 40-bit random global ID + 16-bit subnet ID + 64-bit interface ID.\n- **Link-local:** Automatically configured on every IPv6 interface. Used for neighbor discovery and local communication. Prefix: `fe80::/10`. Every IPv6 interface has a link-local address even if it has no GUA. Routers use link-local addresses as next-hop addresses in routing protocols.\n\n**Multicast:** One-to-many communication. Replaces IPv4 broadcast. Prefix: `ff00::/8`. Common multicast addresses:\n- `ff02::1` = All nodes on the local link\n- `ff02::2` = All routers on the local link\n- `ff02::5` = All OSPFv3 routers\n- `ff02::1:ffxx:xxxx` = Solicited-node multicast (used by NDP)\n\n**Anycast:** One-to-nearest communication. Same address assigned to multiple devices. The routing protocol delivers the packet to the nearest one. Used for DNS root servers and load balancing. Drawn from the global unicast address space — no special prefix.',
      estimatedReadingMinutes: 5,
    },
    {
      id: 'ipv6-autoconfiguration',
      heading: 'IPv6 Address Autoconfiguration',
      body: 'IPv6 devices can configure themselves without a DHCP server through **SLAAC (Stateless Address Autoconfiguration)**:\n\n**Step 1 — Link-local address:** The device generates a link-local address using the `fe80::/10` prefix and its interface identifier (derived from the MAC address using EUI-64 or randomly for privacy).\n\n**Step 2 — Router Solicitation (RS):** The device sends an ICMPv6 Router Solicitation message to `ff02::2` (all routers) asking "are there any routers on this network?"\n\n**Step 3 — Router Advertisement (RA):** A router responds with an ICMPv6 Router Advertisement message containing the network prefix, prefix length, and flags indicating how to configure addresses.\n\n**Step 4 — Address configuration:** Based on the RA flags:\n- **SLAAC flag set:** Device generates its own global address using the advertised prefix + its interface ID.\n- **DHCPv6 flag set:** Device contacts a DHCPv6 server for address assignment.\n- **Both flags set:** Device uses both SLAAC and DHCPv6 (gets address from SLAAC, other info like DNS from DHCPv6).\n\n**EUI-64** generates the 64-bit interface ID from the 48-bit MAC address:\n1. Split the MAC into two halves: `AA:BB:CC` and `DD:EE:FF`\n2. Insert `FF:FE` in the middle: `AA:BB:CC:FF:FE:DD:EE:FF`\n3. Flip the 7th bit (U/L bit) of the first octet\n4. Result becomes the interface ID\n\nExample: MAC `00:11:22:33:44:55` → EUI-64 `0211:22FF:FE33:4455`',
      estimatedReadingMinutes: 5,
    },
    {
      id: 'ndp',
      heading: 'Neighbor Discovery Protocol (NDP)',
      body: 'NDP replaces several IPv4 protocols and is fundamental to IPv6 operation. It uses ICMPv6 messages (not ARP):\n\n**Router Discovery (RS/RA):** Replaces IPv4 DHCP for basic configuration. Devices discover routers and network prefixes.\n\n**Neighbor Solicitation (NS) / Neighbor Advertisement (NA):** Replaces ARP. When a device needs to find the MAC address for an IPv6 address, it sends an NS to the target\'s solicited-node multicast address. The target responds with an NA containing its MAC address.\n\n**Duplicate Address Detection (DAD):** Before using an address, a device sends an NS for that address. If no NA is received, the address is unique and safe to use. If an NA is received, the address is already in use.\n\n**Redirect:** A router tells a host about a better next-hop for a specific destination. Similar to ICMP Redirect in IPv4.\n\n**Neighbor Cache:** The IPv6 equivalent of the ARP table. Maps IPv6 addresses to MAC addresses. View with `show ipv6 neighbors` on Cisco devices.\n\nKey difference from IPv4: NDP uses multicast instead of broadcast. This is more efficient — only devices that care about the message process it, rather than every device on the segment.',
      estimatedReadingMinutes: 4,
    },
    {
      id: 'ipv6-routing-protocols',
      heading: 'IPv6 Routing Protocols',
      body: 'Routing protocols have IPv6 equivalents that operate similarly to their IPv4 versions:\n\n**RIPng (RIP Next Generation):** IPv6 version of RIPv2. Uses UDP port 521. Distance vector. Maximum hop count 15. Sends updates to `ff02::9`. Rarely used in production but tested on the exam.\n\n**OSPFv3 (OSPF for IPv6):** IPv6 version of OSPFv2. Link-state protocol. Uses protocol number 89 (not a port). Sends updates to `ff02::5` (all OSPF routers) and `ff02::6` (DR/BDR). Key difference from OSPFv2: OSPFv3 runs per-link instead of per-subnet, and it uses link-local addresses for neighbor adjacencies.\n\n**EIGRP for IPv6:** Cisco-proprietary advanced distance vector. Uses protocol number 88. Sends updates to `ff02::A`. Configuration is similar to IPv4 EIGRP but uses IPv6 addressing.\n\n**MP-BGP (Multiprotocol BGP):** BGP with IPv6 address family (AFI 2). Carries IPv6 routes between autonomous systems. Uses the same TCP port 179 as IPv4 BGP.\n\nThe exam focuses on OSPFv3 configuration and the conceptual differences from OSPFv2. Know that OSPFv3 uses link-local addresses for neighbor relationships and that the process is similar but the address family is different.',
      estimatedReadingMinutes: 4,
    },
  ],

  callouts: [
    {
      type: 'why-matters',
      title: 'Why This Matters',
      body: 'IPv6 is not optional anymore. Every major cloud provider, ISP, and enterprise runs IPv6. The CCNA 200-301 significantly increased IPv6 coverage compared to previous versions. You must be able to read IPv6 addresses, understand address types, configure IPv6 on interfaces, and troubleshoot IPv6 connectivity.',
    },
    {
      type: 'exam-trap',
      title: 'Exam Trap',
      body: 'The exam will give you an IPv6 address with two `::` compressions and ask if it is valid. It is not — only one `::` is allowed. Also, they will ask "what is the IPv6 equivalent of ARP?" The answer is Neighbor Discovery Protocol (NDP), specifically Neighbor Solicitation/Advertisement messages. IPv6 does not have ARP or broadcast.',
    },
    {
      type: 'remember',
      title: 'Remember This',
      body: 'Global unicast = 2000::/3. Unique local = fc00::/7. Link-local = fe80::/10. Multicast = ff00::/8. No broadcast in IPv6. SLAAC = stateless autoconfiguration using RS/RA. NDP replaces ARP. EUI-64 = MAC + FF:FE + flipped 7th bit. Only one :: per address.',
    },
    {
      type: 'real-world',
      title: 'Real World',
      body: 'In production, most organizations run dual-stack (IPv4 + IPv6 simultaneously). The most common IPv6 deployment issue is inconsistent configuration — some devices have IPv6 enabled, others do not. Always verify IPv6 connectivity separately from IPv4. A device can have working IPv4 and broken IPv6 on the same interface.',
    },
    {
      type: 'analogy',
      title: 'Analogy',
      body: 'Think of IPv6 addressing like a global postal system. The global routing prefix is like the country code. The subnet ID is like the city. The interface ID is like the street address. Link-local addresses are like internal building room numbers — they only make sense within the building. Multicast is like a targeted mailing list — only subscribed recipients get the mail, unlike broadcast which delivers to everyone whether they want it or not.',
    },
  ],

  cliSpotlights: [
    {
      id: 'ipv6-interface-config',
      title: 'Configuring IPv6 on a Router Interface',
      commands: [
        'Router(config)# ipv6 unicast-routing',
        'Router(config)# interface GigabitEthernet0/0',
        'Router(config-if)# ipv6 address 2001:db8:1::1/64',
        'Router(config-if)# ipv6 address fe80::1 link-local',
        'Router(config-if)# no shutdown',
        'Router(config-if)# end',
        'Router# show ipv6 interface brief',
      ],
      explanation: '`ipv6 unicast-routing` enables IPv6 routing globally — without it, the router will not forward IPv6 packets between interfaces. The `ipv6 address` command assigns a global unicast address with prefix length (not subnet mask). You can also manually assign a link-local address (optional — the router auto-generates one). `show ipv6 interface brief` shows all interfaces with their IPv6 addresses and status.',
    },
    {
      id: 'ipv6-ndp-verification',
      title: 'Verifying NDP and Neighbor Cache',
      commands: [
        'Router# show ipv6 neighbors',
        'Router# show ipv6 route',
        'Router# ping ipv6 2001:db8:1::2',
      ],
      explanation: '`show ipv6 neighbors` displays the NDP neighbor cache — the IPv6 equivalent of `show arp`. It shows IPv6-to-MAC mappings for directly connected devices. `show ipv6 route` shows the IPv6 routing table. Connected routes show as "L" (local) and "C" (connected). `ping ipv6` is the IPv6 ping command — note the `ipv6` keyword is required on some IOS versions.',
    },
  ],

  checkpoints: [
    {
      id: 'cp-ipv6-type',
      question: 'What type of IPv6 address starts with fe80::?',
      options: [
        { id: 'a', text: 'Global unicast', isCorrect: false },
        { id: 'b', text: 'Unique local', isCorrect: false },
        { id: 'c', text: 'Link-local', isCorrect: true },
        { id: 'd', text: 'Multicast', isCorrect: false },
      ],
      hint: 'This address type is automatically configured on every IPv6 interface and used for local communication only.',
    },
    {
      id: 'cp-ndp-function',
      question: 'Which IPv6 protocol replaces ARP from IPv4?',
      options: [
        { id: 'a', text: 'DHCPv6', isCorrect: false },
        { id: 'b', text: 'Neighbor Discovery Protocol (NDP)', isCorrect: true },
        { id: 'c', text: 'ICMPv6 Echo', isCorrect: false },
        { id: 'd', text: 'SLAAC', isCorrect: false },
      ],
      hint: 'This protocol uses ICMPv6 messages to resolve IPv6 addresses to MAC addresses.',
    },
  ],

  visualBlocks: [
    {
      id: 'ipv6-address-structure',
      type: 'diagram',
      title: 'IPv6 Global Unicast Address Structure',
      description: 'Shows the 128-bit structure of a global unicast address: Global Routing Prefix (48 bits) + Subnet ID (16 bits) + Interface ID (64 bits).',
      svgContent: `<svg viewBox="0 0 640 280" xmlns="http://www.w3.org/2000/svg">
        <text x="320" y="25" text-anchor="middle" fill="#e2e8f0" font-size="14" font-weight="700">IPv6 Global Unicast Address Structure</text>
        
        <!-- Full address bar -->
        <rect x="40" y="50" width="560" height="50" rx="6" fill="rgba(139,92,246,0.1)" stroke="#8b5cf6" stroke-width="1.5"/>
        <text x="320" y="80" text-anchor="middle" fill="#c4b5fd" font-size="13" font-family="monospace">2001:0db8:0001:0000:0211:22ff:fe33:4455</text>
        
        <!-- Compressed -->
        <text x="320" y="120" text-anchor="middle" fill="#94a3b8" font-size="11">Compressed: 2001:db8:1::211:22ff:fe33:4455</text>
        
        <!-- Segmented bar -->
        <rect x="40" y="140" width="280" height="40" rx="4" fill="rgba(34,197,94,0.12)" stroke="#22c55e" stroke-width="1.5"/>
        <text x="180" y="158" text-anchor="middle" fill="#4ade80" font-size="11" font-weight="600">Global Routing Prefix</text>
        <text x="180" y="173" text-anchor="middle" fill="#86efac" font-size="10">2001:db8:1 (48 bits)</text>
        
        <rect x="320" y="140" width="100" height="40" rx="4" fill="rgba(245,158,11,0.12)" stroke="#f59e0b" stroke-width="1.5"/>
        <text x="370" y="158" text-anchor="middle" fill="#fcd34d" font-size="11" font-weight="600">Subnet ID</text>
        <text x="370" y="173" text-anchor="middle" fill="#fde68a" font-size="10">0000 (16 bits)</text>
        
        <rect x="420" y="140" width="180" height="40" rx="4" fill="rgba(59,130,246,0.12)" stroke="#3b82f6" stroke-width="1.5"/>
        <text x="510" y="158" text-anchor="middle" fill="#93c5fd" font-size="11" font-weight="600">Interface ID</text>
        <text x="510" y="173" text-anchor="middle" fill="#bfdbfe" font-size="10">64 bits (EUI-64 or random)</text>
        
        <!-- Bit counts -->
        <text x="180" y="200" text-anchor="middle" fill="#64748b" font-size="10">/48 prefix from ISP</text>
        <text x="370" y="200" text-anchor="middle" fill="#64748b" font-size="10">65,536 subnets</text>
        <text x="510" y="200" text-anchor="middle" fill="#64748b" font-size="10">1.8 × 10^19 hosts per subnet</text>
        
        <!-- EUI-64 breakdown -->
        <rect x="40" y="220" width="560" height="45" rx="6" fill="rgba(30,41,59,0.6)" stroke="rgba(148,163,184,0.2)" stroke-width="1"/>
        <text x="60" y="240" fill="#94a3b8" font-size="10">EUI-64: MAC 00:11:22:33:44:55 → Insert FF:FE → 0211:22FF:FE33:4455</text>
        <text x="60" y="256" fill="#94a3b8" font-size="10">Flip 7th bit of first octet: 00 → 02 (00000000 → 00000010)</text>
      </svg>`,
    },
  ],

  summaryPoints: [
    'IPv6 provides 2^128 addresses — enough to eliminate address exhaustion permanently.',
    'IPv6 address: 128 bits, 8 groups of 4 hex digits, colon-separated. Only one :: allowed per address.',
    'Global unicast (2000::/3) = public. Unique local (fc00::/7) = private. Link-local (fe80::/10) = automatic per interface. Multicast (ff00::/8) = one-to-many.',
    'IPv6 has no broadcast. Multicast replaces all broadcast functions.',
    'SLAAC allows devices to autoconfigure addresses using Router Solicitation and Router Advertisement messages.',
    'NDP (Neighbor Discovery Protocol) replaces ARP, using ICMPv6 NS/NA messages for address resolution.',
    'EUI-64 generates a 64-bit interface ID from a 48-bit MAC: insert FF:FE in the middle, flip the 7th bit.',
    'OSPFv3 is the IPv6 version of OSPF. Uses link-local addresses for neighbor adjacencies.',
  ],
};
