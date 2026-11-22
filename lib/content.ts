export type Lang = "en" | "mr";

// Placeholder contact details. Replace before launch.
export const CONTACT = {
  phone: "+91 90000 00000",
  whatsapp: "919000000000",
  email: "hello@gadesignstudio.in",
  instagram: "gadesignstudio",
};

export type ProjectCategory = "homes" | "education" | "commercial" | "residential";

export type Project = {
  id: string;
  name: string;
  image: string;
  category: ProjectCategory;
  year: string;
  area: string;
  city: { en: string; mr: string };
  type: { en: string; mr: string };
  note: { en: string; mr: string };
};

// Placeholder projects. Replace with real work.
export const PROJECTS: Project[] = [
  {
    id: "01",
    name: "Neem Courtyard House",
    image: "/images/work-courtyard-house.jpg",
    category: "homes",
    year: "2025",
    area: "4,200 sq ft",
    city: { en: "Dhule", mr: "धुळे" },
    type: { en: "Private residence", mr: "खासगी निवासस्थान" },
    note: {
      en: "A modern wada built around a single neem tree.",
      mr: "एका कडुनिंबाभोवती उभारलेला आधुनिक वाडा.",
    },
  },
  {
    id: "02",
    name: "Vineyard House",
    image: "/images/work-vineyard-villa.jpg",
    category: "homes",
    year: "2024",
    area: "6,800 sq ft",
    city: { en: "Nashik", mr: "नाशिक" },
    type: { en: "Weekend home", mr: "विकेंड होम" },
    note: {
      en: "A concrete volume floating five metres over the vines.",
      mr: "द्राक्षबागेवर पाच मीटर तरंगणारा काँक्रीटचा खंड.",
    },
  },
  {
    id: "03",
    name: "Jaali School",
    image: "/images/work-school.jpg",
    category: "education",
    year: "2024",
    area: "38,000 sq ft",
    city: { en: "Dhule", mr: "धुळे" },
    type: { en: "School campus", mr: "शाळा परिसर" },
    note: {
      en: "Terracotta screens that cool every corridor without a single fan.",
      mr: "टेराकोटा जाळ्या, ज्या पंख्याशिवाय प्रत्येक व्हरांडा थंड ठेवतात.",
    },
  },
  {
    id: "04",
    name: "Terracotta Offices",
    image: "/images/work-office-pune.jpg",
    category: "commercial",
    year: "2025",
    area: "52,000 sq ft",
    city: { en: "Pune", mr: "पुणे" },
    type: { en: "Office building", mr: "कार्यालयीन इमारत" },
    note: {
      en: "Six floors of terracotta fins tuned to the Pune sun.",
      mr: "पुण्याच्या उन्हानुसार आखलेल्या टेराकोटा फिन्सचे सहा मजले.",
    },
  },
  {
    id: "05",
    name: "Banyan Residences",
    image: "/images/work-residence-mumbai.jpg",
    category: "residential",
    year: "2026",
    area: "18 floors",
    city: { en: "Mumbai", mr: "मुंबई" },
    type: { en: "Residential tower", mr: "निवासी टॉवर" },
    note: {
      en: "A tower that kept its hundred year old banyan.",
      mr: "शंभर वर्षांचा वड जपणारा टॉवर.",
    },
  },
  {
    id: "06",
    name: "Basalt House Interiors",
    image: "/images/work-interior.jpg",
    category: "homes",
    year: "2025",
    area: "3,100 sq ft",
    city: { en: "Pune", mr: "पुणे" },
    type: { en: "Interiors", mr: "इंटिरिअर" },
    note: {
      en: "Morning light, a basalt wall and nothing that does not need to be there.",
      mr: "सकाळचा प्रकाश, बेसाल्टची भिंत आणि अनावश्यक काहीही नाही.",
    },
  },
];

export const CITIES = [
  { key: "dhule", en: "Dhule", mr: "धुळे", lat: 20.9042, lon: 74.7749, hq: true },
  { key: "nashik", en: "Nashik", mr: "नाशिक", lat: 19.9975, lon: 73.7898, hq: false },
  { key: "mumbai", en: "Mumbai", mr: "मुंबई", lat: 19.076, lon: 72.8777, hq: false },
  { key: "pune", en: "Pune", mr: "पुणे", lat: 18.5204, lon: 73.8567, hq: false },
];

const en = {
  meta: { title: "GA Design Studio · Architects", description: "Architecture and construction across Dhule, Nashik, Mumbai and Pune." },
  nav: { studio: "Studio", work: "Work", process: "Process", cities: "Cities", contact: "Contact", cta: "Start a project", menu: "Menu", close: "Close" },
  hero: {
    eyebrow: "Architecture · Dhule · Nashik · Mumbai · Pune",
    title1: "Every great building",
    title2: "begins as a line.",
    title3: "We draw it. We build it.",
    sub: "GA Design Studio designs homes, schools and buildings across Maharashtra, and builds them with the same hands that drew them.",
    ctaPrimary: "See the work",
    ctaSecondary: "Talk to us",
    scroll: "Scroll to build",
    sheet: "Elevation 01",
    stages: ["Drawing", "Massing", "Materials", "Built"],
  },
  studio: {
    label: "The Studio",
    title1: "Designed by Farzeb.",
    title2: "Built by Shoaib.",
    body1: "Two brothers, one studio. Farzeb Shaikh leads design, from the first sketch to the last brass handle. Shoaib Shaikh, a civil engineer, turns every drawing into a building that stands for generations.",
    body2: "One team from idea to keys means nothing gets lost between the drawing board and the site.",
    farzebRole: "Principal Architect",
    shoaibRole: "Civil Engineer · Construction",
    values: [
      { name: "Creativity", text: "No two sites are alike. No two designs should be." },
      { name: "Values", text: "Honest materials, honest budgets, honest timelines." },
      { name: "Freedom", text: "Space to breathe, light to live in, room to grow." },
    ],
    caption: "Study model, courtyard house",
  },
  work: {
    label: "Selected Work",
    title: "Buildings that belong where they stand.",
    filters: { all: "All", homes: "Homes", education: "Education", commercial: "Commercial", residential: "Residential" },
    fields: { project: "Project", location: "Location", type: "Type", year: "Year", area: "Area" },
  },
  process: {
    label: "Process",
    title: "From the first line to the front door.",
    steps: [
      { name: "Listen and sketch", text: "We understand your site, your way of living and your budget before the first line is drawn.", image: "/images/studio-drawing-table.jpg" },
      { name: "Choose materials", text: "Basalt, teak, terracotta and lime. Local, lasting materials chosen with care.", image: "/images/process-materials.jpg" },
      { name: "Build", text: "Built exactly to drawing, under Shoaib's direct supervision on site.", image: "/images/process-site.jpg" },
      { name: "Hand over", text: "On time and on budget. The keys to your new home, in your hands.", image: "/images/process-handover.jpg" },
    ],
  },
  cities: {
    label: "Cities",
    title1: "Rooted in Dhule.",
    title2: "Building across Maharashtra.",
    body: "Our studio sits in Deopur, Dhule. Our sites stretch from the Arabian Sea to the Tapi valley.",
    hq: "Studio · HQ",
    site: "Projects",
    sea: "Arabian Sea",
  },
  contact: {
    label: "Contact",
    title1: "Let's build something",
    title2: "that lasts.",
    body: "Tell us about your site and what you dream of building. We reply within a day.",
    name: "Your name",
    phone: "Phone",
    city: "City",
    type: "Project type",
    message: "Tell us about the project",
    types: ["Home", "School", "Commercial", "Interiors", "Other"],
    submit: "Send on WhatsApp",
    note: "Opens WhatsApp with your details filled in.",
    visit: "Visit the studio",
    address: ["Jai Hind Colony, Deopur", "Dhule, Maharashtra"],
    call: "Call",
    write: "Write",
    waIntro: "Hello GA Design Studio, I would like to discuss a project.",
  },
  footer: {
    tagline: "Creativity · Values · Freedom",
    rights: "All rights reserved.",
    top: "Back to top",
  },
};

export type Dict = typeof en;

const mr: Dict = {
  meta: { title: "जी ए डिझाईन स्टुडिओ · वास्तुविशारद", description: "धुळे, नाशिक, मुंबई आणि पुण्यात वास्तुरचना आणि बांधकाम." },
  nav: { studio: "स्टुडिओ", work: "प्रकल्प", process: "प्रक्रिया", cities: "शहरे", contact: "संपर्क", cta: "प्रकल्प सुरू करा", menu: "मेनू", close: "बंद" },
  hero: {
    eyebrow: "वास्तुकला · धुळे · नाशिक · मुंबई · पुणे",
    title1: "प्रत्येक सुंदर वास्तूची",
    title2: "सुरुवात एका रेषेने होते.",
    title3: "आम्ही ती रेखाटतो. आम्हीच ती उभारतो.",
    sub: "जी ए डिझाईन स्टुडिओ संपूर्ण महाराष्ट्रात घरे, शाळा आणि इमारतींची रचना करतो, आणि ज्या हातांनी त्या रेखाटल्या त्याच हातांनी त्या उभारतो.",
    ctaPrimary: "प्रकल्प पाहा",
    ctaSecondary: "आमच्याशी बोला",
    scroll: "उभारणी पाहण्यासाठी स्क्रोल करा",
    sheet: "दर्शनी भाग ०१",
    stages: ["आराखडा", "आकारमान", "साहित्य", "पूर्ण"],
  },
  studio: {
    label: "स्टुडिओ",
    title1: "रचना फरझेब यांची.",
    title2: "उभारणी शोएब यांची.",
    body1: "दोन भाऊ, एक स्टुडिओ. पहिल्या रेखाटनापासून शेवटच्या पितळी मुठीपर्यंत, रचनेचे नेतृत्व फरझेब शेख करतात. सिव्हिल इंजिनिअर शोएब शेख प्रत्येक आराखड्याला पिढ्यानपिढ्या टिकणाऱ्या वास्तूचे रूप देतात.",
    body2: "कल्पनेपासून चावी हातात देईपर्यंत एकच टीम असल्याने, आराखडा आणि प्रत्यक्ष बांधकाम यांच्यात काहीही हरवत नाही.",
    farzebRole: "प्रमुख वास्तुविशारद",
    shoaibRole: "सिव्हिल इंजिनिअर · बांधकाम",
    values: [
      { name: "सर्जनशीलता", text: "प्रत्येक जागा वेगळी असते. प्रत्येक रचनाही वेगळीच हवी." },
      { name: "मूल्ये", text: "प्रामाणिक साहित्य, प्रामाणिक बजेट, प्रामाणिक वेळापत्रक." },
      { name: "स्वातंत्र्य", text: "मोकळा श्वास, भरपूर प्रकाश आणि वाढण्यासाठी जागा." },
    ],
    caption: "अभ्यास मॉडेल, अंगण असलेले घर",
  },
  work: {
    label: "निवडक प्रकल्प",
    title: "आपल्या जागेशी नाते जपणाऱ्या वास्तू.",
    filters: { all: "सर्व", homes: "घरे", education: "शिक्षण", commercial: "व्यावसायिक", residential: "निवासी" },
    fields: { project: "प्रकल्प", location: "ठिकाण", type: "प्रकार", year: "वर्ष", area: "क्षेत्रफळ" },
  },
  process: {
    label: "प्रक्रिया",
    title: "पहिल्या रेषेपासून घराच्या दारापर्यंत.",
    steps: [
      { name: "ऐकणे आणि रेखाटन", text: "पहिली रेषा काढण्यापूर्वी तुमची जागा, तुमची जीवनशैली आणि तुमचे बजेट आम्ही समजून घेतो.", image: "/images/studio-drawing-table.jpg" },
      { name: "साहित्य निवड", text: "बेसाल्ट, सागवान, टेराकोटा आणि चुना. स्थानिक, टिकाऊ साहित्याची काळजीपूर्वक निवड.", image: "/images/process-materials.jpg" },
      { name: "बांधकाम", text: "शोएब यांच्या प्रत्यक्ष देखरेखीखाली, आराखड्याप्रमाणे काटेकोर बांधकाम.", image: "/images/process-site.jpg" },
      { name: "हस्तांतरण", text: "वेळेवर आणि बजेटमध्ये. तुमच्या नव्या घराची चावी तुमच्या हातात.", image: "/images/process-handover.jpg" },
    ],
  },
  cities: {
    label: "शहरे",
    title1: "धुळ्यात रुजलेले.",
    title2: "संपूर्ण महाराष्ट्रात उभारणी.",
    body: "आमचा स्टुडिओ देवपूर, धुळे येथे आहे. आमची कामे अरबी समुद्रापासून तापी खोऱ्यापर्यंत पसरलेली आहेत.",
    hq: "स्टुडिओ · मुख्यालय",
    site: "प्रकल्प",
    sea: "अरबी समुद्र",
  },
  contact: {
    label: "संपर्क",
    title1: "चला, काहीतरी",
    title2: "टिकाऊ उभारूया.",
    body: "तुमच्या जागेबद्दल आणि तुमच्या स्वप्नातील वास्तूबद्दल सांगा. आम्ही एका दिवसात उत्तर देतो.",
    name: "तुमचे नाव",
    phone: "फोन",
    city: "शहर",
    type: "प्रकल्पाचा प्रकार",
    message: "प्रकल्पाबद्दल सांगा",
    types: ["घर", "शाळा", "व्यावसायिक", "इंटिरिअर", "इतर"],
    submit: "व्हॉट्सअॅपवर पाठवा",
    note: "तुमच्या माहितीसह व्हॉट्सअॅप उघडेल.",
    visit: "स्टुडिओला भेट द्या",
    address: ["जय हिंद कॉलनी, देवपूर", "धुळे, महाराष्ट्र"],
    call: "फोन करा",
    write: "ईमेल करा",
    waIntro: "नमस्कार जी ए डिझाईन स्टुडिओ, मला एका प्रकल्पाबद्दल चर्चा करायची आहे.",
  },
  footer: {
    tagline: "सर्जनशीलता · मूल्ये · स्वातंत्र्य",
    rights: "सर्व हक्क राखीव.",
    top: "वर जा",
  },
};

export const DICT: Record<Lang, Dict> = { en, mr };
