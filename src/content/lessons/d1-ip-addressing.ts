import type { LessonDefinition } from '../types';

export const d1IpAddressing: LessonDefinition = {
  id: 'd1-ip-addressing',
  domainId: 'domain-1',
  moduleLabel: '1.3',
  title: 'IPv4 and IPv6 Addressing Foundations',
  estimatedMinutes: 28,
  hook: 'Every device on every network you will ever configure needs an address — and not just one. It needs a physical identity (MAC), a logical identity (IP), and sometimes both an IPv4 and an IPv6 address at the same time. The CCNA exam tests addressing relentlessly because it is the foundation of routing, switching, and troubleshooting. This lesson gives you a complete mental model of how addresses work, why they are structured the way they are, and how to read them like a network engineer.',

  sections: [
    {
      id: 'ipv4-structure',
      heading: 'IPv4 Address Structure',
      body: 'An IPv4 address is a 32-bit number, almost always written in **dotted decimal notation** — four groups of decimal numbers separated by periods, like `192.168.1.1`. Each group (called an *octet*) represents 8 bits, so the full address is 4 × 8 = 32 bits.\n\nEach octet can hold a value from 0 to 255 (because 2⁸ = 256 possible values, numbered 0-255). An address like `192.168.1.300` is invalid — 300 cannot fit in 8 bits.\n\nThe critical concept: every IPv4 address has two parts — a **network portion** and a **host portion**. The network portion identifies which network the device belongs to (like a street name). The host portion identifies the specific device on that network (like a house number). The **subnet mask** tells you where the boundary falls between network and host bits.\n\nFor example, `192.168.1.10` with mask `255.255.255.0` means the first three octets (192.168.1) are the network, and the last octet (.10) is the host. With mask `255.255.0.0`, the network would be 192.168 and the host would be .1.10. The same IP address means different things depending on the mask.',
      estimatedReadingMinutes: 5,
    },
    {
      id: 'ipv6-structure',
      heading: 'IPv6 Address Structure',
      body: 'IPv6 was created because we ran out of IPv4 addresses. An IPv6 address is **128 bits** long — four times the size of IPv4 — written as eight groups of four hexadecimal digits separated by colons: `2001:0db8:0000:0000:0000:0000:0000:0001`.\n\nTwo compression rules make IPv6 addresses readable:\n\n**Rule 1 — Leading zeros in each group can be omitted.** `0db8` becomes `db8`. `0001` becomes `1`. `0000` becomes `0`.\n\n**Rule 2 — One consecutive run of all-zero groups can be replaced with a double colon `::`.** This can only be done *once* per address, or the address becomes ambiguous.\n\nApplying both rules to the address above: `2001:db8::1`. That is the same 128-bit address, but now humans can actually read it.\n\nThe exam trap: they will give you an IPv6 address with two `::` compressions and ask if it is valid. It is not. Only one `::` is allowed. Also, each group must have 1-4 hex digits — five digits in a single group is invalid.',
      estimatedReadingMinutes: 5,
    },
    {
      id: 'address-classes',
      heading: 'Address Classes — History You Must Know',
      body: 'Classful addressing (Classes A through E) was the original way IPv4 addresses were organized. You still need to know it for the exam, even though it has been obsolete since the mid-1990s (replaced by CIDR — Classless Inter-Domain Routing).\n\n**Class A**: First octet 1-126. Network portion = first octet. Host portion = last three octets. Supports ~16 million hosts per network. Range: `1.0.0.0` to `126.255.255.255`.\n\n**Class B**: First octet 128-191. Network portion = first two octets. Host portion = last two octets. Supports ~65,000 hosts per network. Range: `128.0.0.0` to `191.255.255.255`.\n\n**Class C**: First octet 192-223. Network portion = first three octets. Host portion = last octet. Supports 254 hosts per network. Range: `192.0.0.0` to `223.255.255.255`.\n\n**Class D**: First octet 224-239. Reserved for **multicast** — one-to-many communication.\n\n**Class E**: First octet 240-255. Reserved for experimental use.\n\nNote that 127 is missing from Class A — it is reserved for loopback. The exam will test your ability to identify a class by looking at the first octet. Memorize the ranges.',
      estimatedReadingMinutes: 4,
    },
    {
      id: 'private-vs-public',
      heading: 'Private vs Public Addresses (RFC 1918)',
      body: 'Not all IP addresses are routable on the public internet. **RFC 1918** reserves three blocks of IPv4 address space for private use — addresses that exist only inside your organization and are never routed across the internet.\n\n**10.0.0.0/8** — A single Class A-sized block. Range: `10.0.0.0` to `10.255.255.255`. Used by large enterprises.\n\n**172.16.0.0/12** — Sixteen contiguous Class B-sized blocks. Range: `172.16.0.0` to `172.31.255.255`. Note: only 172.16 through 172.31 — not the entire 172.x.x.x range.\n\n**192.168.0.0/16** — 256 Class C-sized blocks. Range: `192.168.0.0` to `192.168.255.255`. This is what your home router uses.\n\nPrivate addresses reach the internet through **NAT (Network Address Translation)**, where a router translates private addresses to a public address at the network edge. The exam will ask you to identify which addresses are private — and `172.15.0.1` is a classic trap because it looks private but falls just outside the RFC 1918 range.',
      estimatedReadingMinutes: 4,
    },
    {
      id: 'special-addresses',
      heading: 'Special Addresses You Must Recognize',
      body: 'Certain IPv4 and IPv6 addresses have reserved meanings that the exam tests frequently.\n\n**Network address**: The first address in any subnet (all host bits = 0). Represents the subnet itself, not a usable host. Example: in `192.168.1.0/24`, the address `192.168.1.0` is the network address.\n\n**Broadcast address**: The last address in an IPv4 subnet (all host bits = 1). Sent to all devices on the subnet. Example: in `192.168.1.0/24`, the broadcast is `192.168.1.255`. IPv6 does not have broadcast — it uses multicast instead.\n\n**Loopback**: `127.0.0.1` in IPv4, `::1` in IPv6. Traffic sent to loopback never leaves the device — it loops back internally. Used to test the local TCP/IP stack. If you cannot ping 127.0.0.1, your IP stack is broken.\n\n**Link-local (IPv4)**: `169.254.0.0/16`. Automatically assigned when a device cannot reach a DHCP server (APIPA — Automatic Private IP Addressing). If you see a 169.254.x.x address on a client, DHCP has failed.\n\n**Link-local (IPv6)**: `fe80::/10`. Automatically configured on every IPv6 interface. Used for neighbor discovery and local communication. Every IPv6 interface has a link-local address even if it has no global address.',
      estimatedReadingMinutes: 5,
    },
    {
      id: 'mac-addresses',
      heading: 'MAC Addresses — The Physical Identity',
      body: 'A MAC (Media Access Control) address is a **48-bit** physical address burned into every network interface card at the factory. It is written as six pairs of hexadecimal digits: `AA:BB:CC:DD:EE:FF` or `AA-BB-CC-DD-EE-FF`.\n\nThe first 24 bits (three octets) are the **OUI (Organizationally Unique Identifier)** — assigned by IEEE to the manufacturer. The last 24 bits are the **NIC-specific portion** — assigned by the manufacturer to uniquely identify each card.\n\nThe first octet contains two important flag bits:\n- **Bit 0 (LSB)**: 0 = unicast (one specific device), 1 = multicast (a group of devices)\n- **Bit 1**: 0 = globally unique (burned-in), 1 = locally administered (software-assigned)\n\nA MAC address of `FF:FF:FF:FF:FF:FF` is the **broadcast MAC** — every device on the LAN processes frames sent to this address. Switches flood broadcast frames out all ports except the receiving port.\n\nThe exam may ask you to identify a multicast MAC by looking at the first octet. `01:00:5E:xx:xx:xx` is the IPv4 multicast MAC range. If the LSB of the first octet is 1, it is multicast.',
      estimatedReadingMinutes: 4,
    },
    {
      id: 'ipv4-ipv6-coexistence',
      heading: 'IPv4 and IPv6 Coexistence',
      body: 'The internet did not switch from IPv4 to IPv6 overnight. Both protocols operate simultaneously, and the CCNA expects you to understand the transition mechanisms.\n\n**Dual-stack**: The simplest approach. Devices run both IPv4 and IPv6 protocol stacks simultaneously. Every interface has both an IPv4 address and an IPv6 address. The device chooses which protocol to use based on the destination. This is the recommended approach and the one you will configure most often.\n\n**Tunneling**: Encapsulating IPv6 packets inside IPv4 packets to traverse IPv4-only infrastructure. Think of it like putting an IPv6 letter inside an IPv4 envelope. The IPv4 network routes the outer envelope normally, and the destination extracts the IPv6 packet. Common tunnel types include 6to4, ISATAP, and GRE tunnels.\n\n**NAT64/DNS64**: Allows IPv6-only clients to communicate with IPv4-only servers. A translation device converts between the two protocols at the network boundary.\n\nThe exam focuses on dual-stack configuration and the conceptual understanding of tunneling. You should know that dual-stack means both protocols are active, and tunneling means one protocol is carried inside the other.',
      estimatedReadingMinutes: 4,
    },
  ],

  callouts: [
    {
      type: 'why-matters',
      title: 'Why This Matters',
      body: 'Addressing is the single most tested topic on the CCNA. Every routing protocol, every VLAN configuration, every ACL rule depends on correct addressing. If you cannot read an IP address and instantly identify its network portion, host portion, and whether it is private or public, you will struggle with every subsequent lesson.',
    },
    {
      type: 'exam-trap',
      title: 'Exam Trap',
      body: 'The exam loves to test the 172.16.0.0/12 range. `172.16.0.1` is private. `172.31.255.255` is private. But `172.32.0.1` is **public** — it falls outside the RFC 1918 range. Similarly, `169.254.1.1` is a link-local address (APIPA), which means DHCP failed. These are instant-recognition questions.',
    },
    {
      type: 'remember',
      title: 'Remember This',
      body: 'IPv4 = 32 bits = 4 octets = dotted decimal. IPv6 = 128 bits = 8 groups = hexadecimal. MAC = 48 bits = 6 octets = hex pairs. The first 24 bits of a MAC = manufacturer (OUI). The last 24 bits = device serial. Only one `::` is allowed in an IPv6 address.',
    },
    {
      type: 'real-world',
      title: 'Real World',
      body: 'When a user complains "I cannot get online," check their IP address first. If it starts with 169.254, DHCP is broken. If it is correct but they still cannot reach the internet, check the default gateway. If the gateway is unreachable, check the physical link. This is the exact order real engineers follow.',
    },
    {
      type: 'analogy',
      title: 'Analogy',
      body: 'Think of addressing like a phone system. The MAC address is like your phone\'s serial number — hard-coded at the factory, unique to that device. The IP address is like your phone number — assigned by the network, can change when you move. The subnet mask is like the area code — it tells you which part of the number identifies the region. NAT is like a receptionist who takes your internal extension and maps it to the main company number for outside calls.',
    },
  ],

  cliSpotlights: [
    {
      id: 'ip-address-config',
      title: 'Configuring an IPv4 Address on an Interface',
      commands: [
        'Router> enable',
        'Router# configure terminal',
        'Router(config)# interface GigabitEthernet0/0',
        'Router(config-if)# ip address 192.168.1.1 255.255.255.0',
        'Router(config-if)# no shutdown',
        'Router(config-if)# end',
        'Router# show ip interface brief',
      ],
      explanation: 'This is the most fundamental configuration on any Cisco router. The `ip address` command assigns the IPv4 address and subnet mask to the interface. The `no shutdown` command is critical — interfaces are administratively down by default. Without it, the interface will not pass traffic even with a correct IP. The `show ip interface brief` command confirms the assignment and shows the interface status (up/up means healthy).',
    },
    {
      id: 'ipv6-enable',
      title: 'Enabling IPv6 on an Interface',
      commands: [
        'Router(config)# ipv6 unicast-routing',
        'Router(config)# interface GigabitEthernet0/0',
        'Router(config-if)# ipv6 address 2001:db8:1::1/64',
        'Router(config-if)# no shutdown',
        'Router# show ipv6 interface brief',
      ],
      explanation: 'IPv6 requires two steps that differ from IPv4. First, `ipv6 unicast-routing` enables IPv6 routing globally on the device (similar to how IPv4 routing is enabled by default). Second, the IPv6 address uses prefix-length notation (`/64`) instead of dotted-decimal subnet masks. The router auto-generates a link-local address (fe80::/10) on the interface even before you assign a global address.',
    },
  ],

  checkpoints: [
    {
      id: 'cp-private-address',
      question: 'Which of the following is a valid RFC 1918 private IPv4 address?',
      options: [
        { id: 'a', text: '172.32.0.1', isCorrect: false },
        { id: 'b', text: '192.169.1.1', isCorrect: false },
        { id: 'c', text: '172.20.10.1', isCorrect: true },
        { id: 'd', text: '100.64.0.1', isCorrect: false },
      ],
      hint: 'Remember the three RFC 1918 ranges: 10.0.0.0/8, 172.16.0.0/12, and 192.168.0.0/16.',
    },
    {
      id: 'cp-ipv6-compression',
      question: 'What is the correctly compressed form of the IPv6 address 2001:0db8:0000:0000:0042:0000:0000:0001?',
      options: [
        { id: 'a', text: '2001:db8::42::1', isCorrect: false },
        { id: 'b', text: '2001:db8:0:0:42::1', isCorrect: true },
        { id: 'c', text: '2001:db8::42:0:0:1', isCorrect: false },
        { id: 'd', text: '2001:db8:0:42:0:0:0:1', isCorrect: false },
      ],
      hint: 'Only one :: is allowed. Choose the longest run of zero groups to compress.',
    },
  ],

  visualBlocks: [
    {
      id: 'ipv4-vs-ipv6-structure',
      type: 'diagram',
      title: 'IPv4 vs IPv6 Address Structure',
      description: 'Side-by-side comparison showing the bit layout, notation, and key fields of IPv4 and IPv6 addresses.',
      svgContent: `<svg viewBox="0 0 700 420" xmlns="http://www.w3.org/2000/svg">
        <text x="350" y="28" text-anchor="middle" fill="#e2e8f0" font-size="16" font-weight="700">IPv4 vs IPv6 Address Structure</text>

        <!-- IPv4 Section -->
        <rect x="30" y="50" width="300" height="340" rx="10" fill="rgba(59,130,246,0.06)" stroke="#3b82f6" stroke-width="1.5"/>
        <text x="180" y="78" text-anchor="middle" fill="#60a5fa" font-size="14" font-weight="700">IPv4 — 32 bits</text>

        <!-- IPv4 octets -->
        <rect x="55" y="100" width="60" height="40" rx="4" fill="rgba(59,130,246,0.15)" stroke="#3b82f6" stroke-width="1"/>
        <text x="85" y="118" text-anchor="middle" fill="#93c5fd" font-size="10">192</text>
        <text x="85" y="132" text-anchor="middle" fill="#64748b" font-size="8">8 bits</text>

        <rect x="115" y="100" width="60" height="40" rx="4" fill="rgba(59,130,246,0.15)" stroke="#3b82f6" stroke-width="1"/>
        <text x="145" y="118" text-anchor="middle" fill="#93c5fd" font-size="10">168</text>
        <text x="145" y="132" text-anchor="middle" fill="#64748b" font-size="8">8 bits</text>

        <rect x="175" y="100" width="60" height="40" rx="4" fill="rgba(59,130,246,0.15)" stroke="#3b82f6" stroke-width="1"/>
        <text x="205" y="118" text-anchor="middle" fill="#93c5fd" font-size="10">1</text>
        <text x="205" y="132" text-anchor="middle" fill="#64748b" font-size="8">8 bits</text>

        <rect x="235" y="100" width="60" height="40" rx="4" fill="rgba(59,130,246,0.15)" stroke="#3b82f6" stroke-width="1"/>
        <text x="265" y="118" text-anchor="middle" fill="#93c5fd" font-size="10">10</text>
        <text x="265" y="132" text-anchor="middle" fill="#64748b" font-size="8">8 bits</text>

        <!-- Dots between octets -->
        <text x="112" y="125" text-anchor="middle" fill="#94a3b8" font-size="14" font-weight="700">.</text>
        <text x="172" y="125" text-anchor="middle" fill="#94a3b8" font-size="14" font-weight="700">.</text>
        <text x="232" y="125" text-anchor="middle" fill="#94a3b8" font-size="14" font-weight="700">.</text>

        <!-- IPv4 labels -->
        <rect x="55" y="155" width="180" height="30" rx="4" fill="rgba(34,197,94,0.1)" stroke="#22c55e" stroke-width="1" stroke-dasharray="4,2"/>
        <text x="145" y="175" text-anchor="middle" fill="#4ade80" font-size="11" font-weight="600">Network Portion</text>

        <rect x="235" y="155" width="60" height="30" rx="4" fill="rgba(251,146,60,0.1)" stroke="#fb923c" stroke-width="1" stroke-dasharray="4,2"/>
        <text x="265" y="175" text-anchor="middle" fill="#fb923c" font-size="11" font-weight="600">Host</text>

        <!-- IPv4 details -->
        <text x="55" y="215" fill="#94a3b8" font-size="11">Notation: Dotted decimal</text>
        <text x="55" y="235" fill="#94a3b8" font-size="11">Example: 192.168.1.10</text>
        <text x="55" y="255" fill="#94a3b8" font-size="11">Mask: 255.255.255.0</text>
        <text x="55" y="275" fill="#94a3b8" font-size="11">Loopback: 127.0.0.1</text>
        <text x="55" y="295" fill="#94a3b8" font-size="11">Link-local: 169.254.x.x</text>
        <text x="55" y="315" fill="#94a3b8" font-size="11">Private: 10.x, 172.16-31.x,</text>
        <text x="55" y="330" fill="#94a3b8" font-size="11">           192.168.x.x</text>
        <text x="55" y="355" fill="#94a3b8" font-size="11">Broadcast: Yes (directed)</text>
        <text x="55" y="375" fill="#94a3b8" font-size="11">Total addresses: ~4.3 billion</text>

        <!-- IPv6 Section -->
        <rect x="370" y="50" width="300" height="340" rx="10" fill="rgba(139,92,246,0.06)" stroke="#8b5cf6" stroke-width="1.5"/>
        <text x="520" y="78" text-anchor="middle" fill="#a78bfa" font-size="14" font-weight="700">IPv6 — 128 bits</text>

        <!-- IPv6 groups -->
        <rect x="385" y="100" width="30" height="40" rx="4" fill="rgba(139,92,246,0.15)" stroke="#8b5cf6" stroke-width="1"/>
        <text x="400" y="118" text-anchor="middle" fill="#c4b5fd" font-size="9">2001</text>
        <text x="400" y="132" text-anchor="middle" fill="#64748b" font-size="8">16b</text>

        <rect x="415" y="100" width="30" height="40" rx="4" fill="rgba(139,92,246,0.15)" stroke="#8b5cf6" stroke-width="1"/>
        <text x="430" y="118" text-anchor="middle" fill="#c4b5fd" font-size="9">db8</text>
        <text x="430" y="132" text-anchor="middle" fill="#64748b" font-size="8">16b</text>

        <rect x="445" y="100" width="30" height="40" rx="4" fill="rgba(139,92,246,0.15)" stroke="#8b5cf6" stroke-width="1"/>
        <text x="460" y="118" text-anchor="middle" fill="#c4b5fd" font-size="9">::</text>
        <text x="460" y="132" text-anchor="middle" fill="#64748b" font-size="8">32b</text>

        <rect x="475" y="100" width="30" height="40" rx="4" fill="rgba(139,92,246,0.15)" stroke="#8b5cf6" stroke-width="1"/>
        <text x="490" y="118" text-anchor="middle" fill="#c4b5fd" font-size="9">42</text>
        <text x="490" y="132" text-anchor="middle" fill="#64748b" font-size="8">16b</text>

        <rect x="505" y="100" width="30" height="40" rx="4" fill="rgba(139,92,246,0.15)" stroke="#8b5cf6" stroke-width="1"/>
        <text x="520" y="118" text-anchor="middle" fill="#c4b5fd" font-size="9">::</text>
        <text x="520" y="132" text-anchor="middle" fill="#64748b" font-size="8">16b</text>

        <rect x="535" y="100" width="30" height="40" rx="4" fill="rgba(139,92,246,0.15)" stroke="#8b5cf6" stroke-width="1"/>
        <text x="550" y="118" text-anchor="middle" fill="#c4b5fd" font-size="9">1</text>
        <text x="550" y="132" text-anchor="middle" fill="#64748b" font-size="8">16b</text>

        <!-- Colons between groups -->
        <text x="413" y="125" text-anchor="middle" fill="#94a3b8" font-size="14" font-weight="700">:</text>
        <text x="443" y="125" text-anchor="middle" fill="#94a3b8" font-size="14" font-weight="700">:</text>
        <text x="473" y="125" text-anchor="middle" fill="#94a3b8" font-size="14" font-weight="700">:</text>
        <text x="503" y="125" text-anchor="middle" fill="#94a3b8" font-size="14" font-weight="700">:</text>
        <text x="533" y="125" text-anchor="middle" fill="#94a3b8" font-size="14" font-weight="700">:</text>

        <!-- IPv6 labels -->
        <rect x="385" y="155" width="90" height="30" rx="4" fill="rgba(34,197,94,0.1)" stroke="#22c55e" stroke-width="1" stroke-dasharray="4,2"/>
        <text x="430" y="175" text-anchor="middle" fill="#4ade80" font-size="10" font-weight="600">Global Prefix</text>

        <rect x="475" y="155" width="60" height="30" rx="4" fill="rgba(236,72,153,0.1)" stroke="#ec4899" stroke-width="1" stroke-dasharray="4,2"/>
        <text x="505" y="175" text-anchor="middle" fill="#f472b6" font-size="10" font-weight="600">Subnet</text>

        <rect x="535" y="155" width="90" height="30" rx="4" fill="rgba(251,146,60,0.1)" stroke="#fb923c" stroke-width="1" stroke-dasharray="4,2"/>
        <text x="580" y="175" text-anchor="middle" fill="#fb923c" font-size="10" font-weight="600">Interface ID</text>

        <!-- IPv6 details -->
        <text x="385" y="215" fill="#94a3b8" font-size="11">Notation: Hexadecimal, colon</text>
        <text x="385" y="235" fill="#94a3b8" font-size="11">Example: 2001:db8::42:0:1</text>
        <text x="385" y="255" fill="#94a3b8" font-size="11">Prefix: /64 (typical)</text>
        <text x="385" y="275" fill="#94a3b8" font-size="11">Loopback: ::1</text>
        <text x="385" y="295" fill="#94a3b8" font-size="11">Link-local: fe80::/10</text>
        <text x="385" y="315" fill="#94a3b8" font-size="11">Unique local: fc00::/7</text>
        <text x="385" y="335" fill="#94a3b8" font-size="11">Multicast: ff00::/8</text>
        <text x="385" y="355" fill="#94a3b8" font-size="11">Broadcast: No (uses multicast)</text>
        <text x="385" y="375" fill="#94a3b8" font-size="11">Total addresses: ~3.4 × 10³⁸</text>

        <!-- Comparison arrow -->
        <text x="350" y="230" text-anchor="middle" fill="#f59e0b" font-size="20" font-weight="700">vs</text>
      </svg>`,
    },
  ],

  summaryPoints: [
    'IPv4 addresses are 32 bits (4 octets) in dotted decimal notation. IPv6 addresses are 128 bits (8 groups) in hexadecimal colon notation.',
    'Every IPv4 address has a network portion and a host portion, separated by the subnet mask boundary.',
    'Classful addressing (A-E) is obsolete but tested on the exam — identify class by the first octet value.',
    'RFC 1918 private ranges: 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16. Addresses outside these ranges are public.',
    'Special addresses: 127.0.0.1 (loopback), 169.254.x.x (APIPA/link-local), fe80::/10 (IPv6 link-local), ::1 (IPv6 loopback).',
    'MAC addresses are 48 bits: first 24 bits = OUI (manufacturer), last 24 bits = NIC serial. LSB of first octet indicates unicast (0) vs multicast (1).',
    'Only one :: compression is allowed in an IPv6 address. Leading zeros in each group can always be dropped.',
    'Dual-stack runs IPv4 and IPv6 simultaneously. Tunneling encapsulates IPv6 inside IPv4 packets to cross IPv4-only networks.',
  ],
};
