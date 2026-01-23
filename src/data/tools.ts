export type ToolFaq = {
  question: string;
  answer: string;
};

export type Tool = {
  slug: string;
  title: string;
  description: string;
  category: string;
  keywords: string[];
  howItWorks: string[];
  faq: ToolFaq[];
  related: string[];
  priority?: number;
};

export const tools: Tool[] = [
  {
    slug: "text-counter",
    title: "Text Counter",
    description:
      "Count words, characters, and lines instantly. Works on drafts, notes, or full documents.",
    category: "Text",
    keywords: ["word count", "character count", "line count", "copy"],
    howItWorks: [
      "Paste or type your text into the editor.",
      "Counts update in real time as you edit.",
      "Totals include words, characters, characters without spaces, and lines.",
    ],
    faq: [
      {
        question: "How are words counted?",
        answer:
          "Words are separated by whitespace, so multiple spaces or new lines are treated as a single separator.",
      },
      {
        question: "Does it store my text?",
        answer:
          "No. Everything stays in your browser and is never sent anywhere.",
      },
    ],
    related: ["json-formatter", "case-converter", "lorem-ipsum"],
    priority: 60,
  },
  {
    slug: "base64-encode-decode",
    title: "Base64 Encode / Decode",
    description:
      "Convert text to Base64 and back with UTF-8 safe handling.",
    category: "Encoding",
    keywords: ["base64", "encode", "decode", "utf-8"],
    howItWorks: [
      "Enter text to encode or paste Base64 to decode.",
      "The tool uses UTF-8 safe conversion in the browser.",
      "Copy the result with one click.",
    ],
    faq: [
      {
        question: "Is it safe for emojis and non-Latin text?",
        answer:
          "Yes. UTF-8 encoding is used so emoji and non-Latin characters round-trip correctly.",
      },
      {
        question: "Why does decoding fail sometimes?",
        answer:
          "Invalid Base64 strings will show a helpful error so you can fix the input.",
      },
    ],
    related: ["url-encode-decode", "json-formatter", "base64-image"],
    priority: 65,
  },
  {
    slug: "json-formatter",
    title: "JSON Formatter & Validator",
    description:
      "Validate JSON, pretty print it, or minify it for compact storage.",
    category: "Data",
    keywords: ["json", "formatter", "validator", "minify"],
    howItWorks: [
      "Paste JSON into the editor.",
      "Choose pretty print or minify.",
      "Errors are shown with clear messages so you can fix invalid JSON.",
    ],
    faq: [
      {
        question: "Does it support large JSON?",
        answer:
          "It runs locally in your browser and handles most typical payloads quickly.",
      },
      {
        question: "Will it change my data?",
        answer:
          "Formatting does not alter values, only whitespace and ordering as preserved by JSON.",
      },
    ],
    related: ["json-csv", "text-counter", "base64-encode-decode"],
    priority: 70,
  },
  {
    slug: "url-encode-decode",
    title: "URL Encode / Decode",
    description:
      "Encode query strings or decode percent-encoded URLs safely.",
    category: "Encoding",
    keywords: ["url", "encode", "decode", "percent"],
    howItWorks: [
      "Paste a URL or query string into the input.",
      "Encode to escape unsafe characters or decode to make it readable.",
      "Errors are surfaced when input is not valid for decoding.",
    ],
    faq: [
      {
        question: "What encoding is used?",
        answer:
          "Encoding uses encodeURIComponent, matching modern browser URL encoding.",
      },
      {
        question: "Does this handle full URLs?",
        answer:
          "Yes. You can encode or decode full URLs or just query components.",
      },
    ],
    related: ["base64-encode-decode", "html-entities"],
    priority: 75,
  },
  {
    slug: "unix-timestamp",
    title: "Unix Timestamp Converter",
    description:
      "Convert between Unix timestamps and readable dates in local time and UTC.",
    category: "Time",
    keywords: ["unix", "timestamp", "epoch", "utc"],
    howItWorks: [
      "Enter seconds or milliseconds since epoch.",
      "The tool displays local and UTC date-time instantly.",
      "Use the Now button to grab the current timestamp.",
    ],
    faq: [
      {
        question: "Seconds or milliseconds?",
        answer:
          "Both are supported. Enter one and the other updates automatically.",
      },
      {
        question: "Why are dates wrong?",
        answer:
          "Make sure you are using the correct unit. Milliseconds are 1,000x larger than seconds.",
      },
    ],
    related: ["timezone-converter", "text-counter"],
  },
  {
    slug: "image-compressor",
    title: "Image Compressor",
    description:
      "Compress images in your browser with adjustable quality and max width.",
    category: "Images",
    keywords: ["image", "compress", "jpg", "png"],
    howItWorks: [
      "Upload an image from your device.",
      "Pick a quality level and optional max width.",
      "Download the compressed result without uploading anything.",
    ],
    faq: [
      {
        question: "Are images uploaded?",
        answer:
          "No. Compression happens locally in your browser.",
      },
      {
        question: "Which formats are supported?",
        answer:
          "Most common image formats (JPEG, PNG, WebP) can be loaded and exported as JPEG.",
      },
    ],
    related: ["qr-code", "base64-image"],
  },
  {
    slug: "password-generator",
    title: "Password Generator",
    description:
      "Generate strong passwords with custom length and character sets.",
    category: "Security",
    keywords: ["password", "generator", "secure", "random"],
    howItWorks: [
      "Choose length and character options.",
      "Generate a new password instantly.",
      "Copy it to use in your password manager.",
    ],
    faq: [
      {
        question: "Does it save passwords?",
        answer: "No. Passwords are generated locally in your browser.",
      },
      {
        question: "What makes a password strong?",
        answer:
          "Length is most important. Use 12+ characters with mixed character types.",
      },
    ],
    related: ["uuid-generator", "hash-generator"],
    priority: 90,
  },
  {
    slug: "uuid-generator",
    title: "UUID v4 Generator",
    description: "Create random UUID v4 identifiers in bulk.",
    category: "Developer",
    keywords: ["uuid", "v4", "guid", "identifier"],
    howItWorks: [
      "Pick how many UUIDs you need.",
      "Generate a fresh list using browser crypto.",
      "Copy or download the result.",
    ],
    faq: [
      {
        question: "Are these cryptographically secure?",
        answer:
          "Yes. UUIDs are created with crypto.getRandomValues for strong randomness.",
      },
      {
        question: "Is there a limit?",
        answer: "You can generate up to 100 at a time for performance.",
      },
    ],
    related: ["password-generator", "hash-generator"],
  },
  {
    slug: "jwt-decoder",
    title: "JWT Decoder",
    description:
      "Decode JSON Web Tokens and inspect headers, payloads, and expiration times.",
    category: "Security",
    keywords: ["jwt", "token", "decode", "auth"],
    howItWorks: [
      "Paste a JWT into the input.",
      "The header and payload are decoded locally.",
      "Errors appear if the token format is invalid.",
    ],
    faq: [
      {
        question: "Does this verify signatures?",
        answer:
          "No. It only decodes the token. Verification requires the signing secret or key.",
      },
      {
        question: "Is my token stored?",
        answer: "No. The token stays in your browser.",
      },
    ],
    related: ["hash-generator", "base64-encode-decode"],
  },
  {
    slug: "hash-generator",
    title: "Hash Generator",
    description:
      "Generate MD5, SHA-1, and SHA-256 hashes for text input.",
    category: "Security",
    keywords: ["hash", "md5", "sha-1", "sha-256"],
    howItWorks: [
      "Enter text to hash.",
      "Choose the algorithm and generate a digest.",
      "Copy the result with one click.",
    ],
    faq: [
      {
        question: "Is MD5 secure?",
        answer:
          "MD5 is fast but not collision resistant. Use SHA-256 for security-sensitive cases.",
      },
      {
        question: "Is hashing done locally?",
        answer: "Yes. Hashing runs in your browser.",
      },
    ],
    related: ["password-generator", "jwt-decoder"],
  },
  {
    slug: "password-strength",
    title: "Password Strength Checker",
    description:
      "Check password strength with quick feedback on length and complexity.",
    category: "Security",
    keywords: ["password", "strength", "security", "check"],
    howItWorks: [
      "Enter a password to analyze.",
      "The meter scores length and character variety.",
      "Tips suggest how to improve strength.",
    ],
    faq: [
      {
        question: "Does it send my password anywhere?",
        answer: "No. The check runs locally in your browser.",
      },
      {
        question: "Is this a guarantee?",
        answer:
          "No. It is a quick heuristic, but longer passwords are always safer.",
      },
    ],
    related: ["password-generator", "hash-generator"],
    priority: 85,
  },
  {
    slug: "qr-code",
    title: "QR Code Generator",
    description:
      "Create QR codes for URLs, text, or contact info instantly.",
    category: "Productivity",
    keywords: ["qr", "code", "generator", "scan"],
    howItWorks: [
      "Enter the text or URL you want to encode.",
      "Pick a size and generate the QR code.",
      "Download the PNG to share or print.",
    ],
    faq: [
      {
        question: "Is it privacy friendly?",
        answer: "Yes. QR codes are generated locally with no uploads.",
      },
      {
        question: "What size should I pick?",
        answer:
          "Larger sizes are easier to scan, especially when printed.",
      },
    ],
    related: ["url-encode-decode", "base64-image"],
    priority: 80,
  },
  {
    slug: "markdown-preview",
    title: "Markdown Previewer",
    description:
      "Write Markdown and preview formatted output instantly.",
    category: "Writing",
    keywords: ["markdown", "preview", "md"],
    howItWorks: [
      "Type Markdown on the left.",
      "Preview renders on the right.",
      "Copy the HTML or the Markdown as needed.",
    ],
    faq: [
      {
        question: "Is the renderer safe?",
        answer:
          "Rendering is local and uses a sanitized subset to avoid executing scripts.",
      },
      {
        question: "Which syntax is supported?",
        answer: "Common Markdown like headings, lists, code, and links.",
      },
    ],
    related: ["css-formatter", "html-entities"],
  },
  {
    slug: "color-tools",
    title: "Color Palette & Contrast",
    description:
      "Generate palettes and check contrast ratios for accessibility.",
    category: "Design",
    keywords: ["color", "palette", "contrast", "accessibility"],
    howItWorks: [
      "Pick a base color or randomize one.",
      "Get a matching palette and contrast score.",
      "Adjust colors until the contrast is accessible.",
    ],
    faq: [
      {
        question: "What contrast ratio is recommended?",
        answer:
          "WCAG recommends at least 4.5:1 for normal text and 3:1 for large text.",
      },
      {
        question: "Are palettes saved?",
        answer: "No. Palettes stay in your session only.",
      },
    ],
    related: ["qr-code", "css-formatter"],
  },
  {
    slug: "css-formatter",
    title: "CSS Minifier & Formatter",
    description:
      "Format readable CSS or minify it for production bundles.",
    category: "Developer",
    keywords: ["css", "minify", "format", "beautify"],
    howItWorks: [
      "Paste CSS into the input.",
      "Choose format or minify.",
      "Copy the cleaned output.",
    ],
    faq: [
      {
        question: "Will it change selectors?",
        answer:
          "No. It only updates whitespace and formatting for readability or size.",
      },
      {
        question: "Does it support modern CSS?",
        answer: "Yes, for typical syntax and declarations.",
      },
    ],
    related: ["html-entities", "markdown-preview"],
  },
  {
    slug: "html-entities",
    title: "HTML Entity Encode / Decode",
    description:
      "Encode or decode HTML entities to safely display special characters.",
    category: "Developer",
    keywords: ["html", "entities", "encode", "decode"],
    howItWorks: [
      "Paste text to encode or decode.",
      "Encode to convert special characters to entities.",
      "Decode to get the original characters back.",
    ],
    faq: [
      {
        question: "Is it safe for scripts?",
        answer:
          "Encoding helps prevent HTML injection by escaping special characters.",
      },
      {
        question: "Does it handle named entities?",
        answer: "Yes. Common named entities decode correctly.",
      },
    ],
    related: ["css-formatter", "url-encode-decode"],
  },
  {
    slug: "regex-tester",
    title: "Regex Tester",
    description:
      "Test regular expressions with live matches and highlights.",
    category: "Developer",
    keywords: ["regex", "tester", "pattern", "match"],
    howItWorks: [
      "Enter a regex pattern and flags.",
      "Paste text to test against.",
      "Matches and counts update instantly.",
    ],
    faq: [
      {
        question: "Does it support global matches?",
        answer:
          "Yes. Use the g flag to return all matches with indices.",
      },
      {
        question: "Why do I see errors?",
        answer: "Invalid regex syntax will show a helpful error message.",
      },
    ],
    related: ["case-converter", "text-counter"],
  },
  {
    slug: "lorem-ipsum",
    title: "Lorem Ipsum Generator",
    description:
      "Generate placeholder text for layouts and mockups.",
    category: "Writing",
    keywords: ["lorem", "ipsum", "placeholder", "copy"],
    howItWorks: [
      "Choose number of paragraphs.",
      "Generate fresh lorem ipsum text.",
      "Copy it into your designs.",
    ],
    faq: [
      {
        question: "Can I generate short snippets?",
        answer: "Yes. Use 1 paragraph for short placeholders.",
      },
      {
        question: "Is the text customizable?",
        answer:
          "This tool uses classic lorem ipsum, but you can edit after generating.",
      },
    ],
    related: ["text-counter", "markdown-preview"],
  },
  {
    slug: "timezone-converter",
    title: "Timezone Converter",
    description:
      "Convert times between time zones with local and UTC reference.",
    category: "Time",
    keywords: ["timezone", "time", "convert", "utc"],
    howItWorks: [
      "Pick a source time and zone.",
      "Select a destination time zone.",
      "See the converted time instantly.",
    ],
    faq: [
      {
        question: "Does it handle daylight saving time?",
        answer: "Yes. It uses the browser's Intl time zone data.",
      },
      {
        question: "Can I use local time?",
        answer: "Yes. Local time is included in the zone list.",
      },
    ],
    related: ["unix-timestamp", "text-counter"],
  },
  {
    slug: "unit-converter",
    title: "Unit Converter",
    description:
      "Convert length, weight, and temperature values quickly.",
    category: "Utilities",
    keywords: ["unit", "converter", "length", "weight", "temperature"],
    howItWorks: [
      "Select a conversion category.",
      "Enter a value and pick from/to units.",
      "Results update instantly.",
    ],
    faq: [
      {
        question: "Which units are included?",
        answer:
          "Common length, weight, and temperature units are available.",
      },
      {
        question: "Is it accurate?",
        answer: "Yes. It uses standard conversion formulas.",
      },
    ],
    related: ["timezone-converter", "unix-timestamp"],
    priority: 50,
  },
  {
    slug: "age-date-difference",
    title: "Age & Date Difference",
    description:
      "Calculate age or the difference between two dates in days and years.",
    category: "Utilities",
    keywords: ["age", "date", "difference", "calculator"],
    howItWorks: [
      "Pick a start and end date.",
      "The tool calculates years, months, and days.",
      "Use Today to compare against the current date.",
    ],
    faq: [
      {
        question: "Which time zone is used?",
        answer: "Dates are handled in UTC to avoid daylight shifts.",
      },
      {
        question: "Can I use it for age?",
        answer: "Yes. Set the birth date as the start date.",
      },
    ],
    related: ["unix-timestamp", "timezone-converter"],
  },
  {
    slug: "date-diff-days",
    title: "Date to Date (Days)",
    description:
      "Calculate the exact number of days between two dates.",
    category: "Utilities",
    keywords: ["date", "days", "difference", "calculator"],
    howItWorks: [
      "Pick a start and end date.",
      "The tool calculates total days between them.",
      "Switch dates to compare in either direction.",
    ],
    faq: [
      {
        question: "Which time zone is used?",
        answer: "Dates are handled in UTC to avoid daylight shifts.",
      },
      {
        question: "Does it include the end date?",
        answer: "No. It reports the difference between the two dates.",
      },
    ],
    related: ["age-date-difference", "unix-timestamp"],
    priority: 40,
  },
  {
    slug: "bmi-calculator",
    title: "BMI Calculator",
    description:
      "Check body mass index with metric or imperial inputs.",
    category: "Utilities",
    keywords: ["bmi", "health", "weight", "height"],
    howItWorks: [
      "Choose metric or imperial units.",
      "Enter height and weight values.",
      "The tool calculates BMI and category.",
    ],
    faq: [
      {
        question: "Is BMI a diagnostic tool?",
        answer:
          "No. BMI is a screening measure and should be interpreted carefully.",
      },
      {
        question: "Does it store my data?",
        answer: "No. Everything stays in your browser.",
      },
    ],
    related: ["unit-converter", "age-date-difference"],
    priority: 45,
  },
  {
    slug: "dice-coin",
    title: "Dice & Coin Randomizer",
    description:
      "Flip a coin or roll dice with quick, random results.",
    category: "Utilities",
    keywords: ["dice", "coin", "random", "rng"],
    howItWorks: [
      "Pick coin or dice.",
      "Tap roll/flip for a random result.",
      "Use multiple dice for quick totals.",
    ],
    faq: [
      {
        question: "Is it truly random?",
        answer: "It uses browser crypto for strong randomness.",
      },
      {
        question: "How many dice can I roll?",
        answer: "Up to 10 dice at a time.",
      },
    ],
    related: ["password-generator", "uuid-generator"],
  },
  {
    slug: "email-url-validator",
    title: "Email & URL Validator",
    description:
      "Validate email addresses and URLs with clear feedback.",
    category: "Utilities",
    keywords: ["email", "url", "validator", "regex"],
    howItWorks: [
      "Paste an email or URL.",
      "Select what to validate.",
      "Instantly see whether the input is valid.",
    ],
    faq: [
      {
        question: "Does it check if an email exists?",
        answer:
          "No. It only validates the format, not deliverability.",
      },
      {
        question: "Does it allow international domains?",
        answer: "Yes. It uses the browser URL parser for validation.",
      },
    ],
    related: ["url-encode-decode", "regex-tester"],
    priority: 55,
  },
  {
    slug: "tiktok-profile",
    title: "TikTok Profile Lookup",
    description:
      "Generate a public TikTok profile URL from a username.",
    category: "Utilities",
    keywords: ["tiktok", "profile", "lookup", "username"],
    howItWorks: [
      "Enter a TikTok username.",
      "The tool builds the public profile URL.",
      "Open or copy the link.",
    ],
    faq: [
      {
        question: "Does it fetch profile data?",
        answer:
          "No. It only generates the public profile link without any tracking.",
      },
      {
        question: "Does it validate if a username exists?",
        answer: "No. It does not make any network requests.",
      },
    ],
    related: ["email-url-validator", "url-encode-decode"],
    priority: 100,
  },
  {
    slug: "website-status",
    title: "Website Status Checker",
    description:
      "Check HTTP status codes, final URL, and response time for any website.",
    category: "Network",
    keywords: ["status", "http", "uptime", "response time"],
    howItWorks: [
      "Enter a URL to check.",
      "The server makes a request and measures latency.",
      "View status code, final URL, and content type.",
    ],
    faq: [
      {
        question: "Does this run locally?",
        answer:
          "No. It performs a server-side request so we can measure response time.",
      },
      {
        question: "Why is the final URL different?",
        answer:
          "Some sites redirect HTTP to HTTPS or use other redirects that change the final URL.",
      },
    ],
    related: ["ping-latency", "opengraph-preview", "ssl-checker"],
    priority: 88,
  },
  {
    slug: "ip-asn-lookup",
    title: "IP / ASN Lookup",
    description:
      "Get public IP details including ASN, organization, and approximate location.",
    category: "Network",
    keywords: ["ip", "asn", "lookup", "network"],
    howItWorks: [
      "Leave empty to lookup your public IP, or enter an IP address.",
      "We query a public IP API for details.",
      "Review ASN, organization, and location.",
    ],
    faq: [
      {
        question: "Is my IP sent to a third party?",
        answer:
          "Yes. The lookup is performed via a public IP API service.",
      },
      {
        question: "Is the location exact?",
        answer: "No. IP location is approximate and city-level at best.",
      },
    ],
    related: ["website-status", "dns-lookup"],
    priority: 82,
  },
  {
    slug: "dns-lookup",
    title: "DNS Lookup",
    description:
      "Query A, AAAA, CNAME, MX, and TXT records using DNS over HTTPS.",
    category: "Network",
    keywords: ["dns", "records", "lookup", "mx"],
    howItWorks: [
      "Enter a domain and pick a record type.",
      "The tool queries public DNS over HTTPS.",
      "Results show record data and TTL.",
    ],
    faq: [
      {
        question: "Which resolver is used?",
        answer: "Google DNS over HTTPS is used for consistent results.",
      },
      {
        question: "Why are there no answers?",
        answer:
          "Some domains do not have that record type or it may be blocked by policy.",
      },
    ],
    related: ["whois-lookup", "website-status"],
    priority: 80,
  },
  {
    slug: "whois-lookup",
    title: "Whois Lookup",
    description:
      "Fetch RDAP domain registration data including registrar and dates.",
    category: "Network",
    keywords: ["whois", "rdap", "domain", "registrar"],
    howItWorks: [
      "Enter a domain name.",
      "The tool queries public RDAP services.",
      "Review registrar, status, and key events.",
    ],
    faq: [
      {
        question: "Is personal data shown?",
        answer:
          "RDAP data varies by registrar and privacy settings; personal data may be redacted.",
      },
      {
        question: "Why is the data incomplete?",
        answer:
          "Some registries return limited data or hide details for privacy.",
      },
    ],
    related: ["dns-lookup", "ssl-checker"],
    priority: 78,
  },
  {
    slug: "opengraph-preview",
    title: "OpenGraph Preview",
    description:
      "Preview OG and Twitter tags for any URL to see how it will share.",
    category: "Network",
    keywords: ["opengraph", "twitter card", "preview", "meta"],
    howItWorks: [
      "Enter a URL to inspect.",
      "We fetch the page HTML server-side.",
      "View OG/Twitter titles, descriptions, and images.",
    ],
    faq: [
      {
        question: "Does it render the page?",
        answer:
          "No. It reads the HTML response and extracts meta tags.",
      },
      {
        question: "Why are some fields blank?",
        answer:
          "The page may not define those tags, or they are injected client-side.",
      },
    ],
    related: ["website-status", "ssl-checker"],
    priority: 84,
  },
  {
    slug: "ssl-checker",
    title: "SSL Certificate Checker",
    description:
      "Inspect TLS certificate issuer, subject, and expiration dates.",
    category: "Network",
    keywords: ["ssl", "tls", "certificate", "expiry"],
    howItWorks: [
      "Enter a domain name.",
      "We open a TLS connection server-side.",
      "See issuer, subject, and expiration details.",
    ],
    faq: [
      {
        question: "Does this support custom ports?",
        answer: "No. It checks the default HTTPS port (443).",
      },
      {
        question: "Why might it fail?",
        answer:
          "The host may block TLS connections or use unsupported configurations.",
      },
    ],
    related: ["website-status", "whois-lookup"],
    priority: 86,
  },
  {
    slug: "ping-latency",
    title: "Ping & Latency Test",
    description:
      "Measure HTTP latency to a host or URL from the server.",
    category: "Network",
    keywords: ["ping", "latency", "response time", "http"],
    howItWorks: [
      "Enter a URL or hostname.",
      "The server performs an HTTP request and times it.",
      "Review latency and HTTP status.",
    ],
    faq: [
      {
        question: "Is this ICMP ping?",
        answer:
          "No. It measures HTTP response time, which is more useful for web services.",
      },
      {
        question: "Why is it slower than my browser?",
        answer:
          "Latency is measured from the server location, which may differ from your device.",
      },
    ],
    related: ["website-status", "ssl-checker"],
    priority: 83,
  },
  {
    slug: "base64-image",
    title: "Base64 Image Encoder / Decoder",
    description:
      "Convert images to Base64 data URLs and preview them.",
    category: "Images",
    keywords: ["base64", "image", "data url"],
    howItWorks: [
      "Upload an image to encode.",
      "Paste a Base64 data URL to decode.",
      "Preview and download the result.",
    ],
    faq: [
      {
        question: "Are images uploaded?",
        answer: "No. Everything stays on your device.",
      },
      {
        question: "Why are data URLs long?",
        answer:
          "Base64 adds overhead to binary data, so strings are larger than files.",
      },
    ],
    related: ["image-compressor", "qr-code"],
  },
  {
    slug: "json-csv",
    title: "JSON <-> CSV Converter",
    description:
      "Convert JSON arrays to CSV and parse CSV back into JSON.",
    category: "Data",
    keywords: ["json", "csv", "convert", "table"],
    howItWorks: [
      "Paste JSON or CSV into the input.",
      "Pick a conversion direction.",
      "Copy the converted output.",
    ],
    faq: [
      {
        question: "What JSON shape is supported?",
        answer:
          "Use arrays of objects with matching keys for the best results.",
      },
      {
        question: "Does it handle quoted CSV?",
        answer: "Yes, for standard quoted CSV with commas and quotes.",
      },
    ],
    related: ["json-formatter", "text-counter"],
  },
  {
    slug: "case-converter",
    title: "Case Converter",
    description:
      "Convert text to snake_case, camelCase, kebab-case, and more.",
    category: "Text",
    keywords: ["case", "snake", "camel", "kebab"],
    howItWorks: [
      "Paste text into the input.",
      "Choose a case style.",
      "Copy the transformed output.",
    ],
    faq: [
      {
        question: "Does it preserve acronyms?",
        answer:
          "It normalizes words before converting, so acronyms are lowercased.",
      },
      {
        question: "Does it handle punctuation?",
        answer:
          "Punctuation is removed to keep output clean.",
      },
    ],
    related: ["text-counter", "regex-tester"],
  },
];

const sortTools = (list: Tool[]) =>
  [...list].sort(
    (a, b) =>
      (b.priority || 0) - (a.priority || 0) ||
      a.title.localeCompare(b.title)
  );

export const sortedTools = sortTools(tools);

export const categories = [
  "All",
  ...new Set(sortedTools.map((tool) => tool.category)),
];

export const getToolBySlug = (slug: string) =>
  tools.find((tool) => tool.slug === slug);

export const getToolsBySlugs = (slugs: string[]) =>
  slugs
    .map((slug) => tools.find((tool) => tool.slug === slug))
    .filter((tool): tool is Tool => Boolean(tool));
