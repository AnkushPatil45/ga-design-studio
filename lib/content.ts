import type { ImageName } from "./images";

export type Lang = "en" | "mr";

// Placeholder contact details. Replace before launch.
export const CONTACT = {
  phone: "+91 90000 00000",
  whatsapp: "919000000000",
  email: "hello@gadesignstudio.in",
  instagram: "https://www.instagram.com/farzebshaikh/",
};

export type ProjectCategory = "homes" | "education" | "commercial" | "residential";

export type Project = {
  id: string;
  name: string;
  image: ImageName;
  story: { en: string; mr: string };
  materials: { en: string; mr: string };
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
    story: {
      en: "A family of three generations asked for one thing: a house where everyone could see the sky. The rooms wrap a single neem tree, so every bedroom, the kitchen and the puja room open onto the same courtyard and the same shade.",
      mr: "तीन पिढ्यांच्या कुटुंबाची एकच इच्छा होती: असे घर जिथून प्रत्येकाला आकाश दिसेल. सर्व खोल्या एका कडुनिंबाभोवती आहेत, त्यामुळे प्रत्येक शयनकक्ष, स्वयंपाकघर आणि देवघर एकाच अंगणात आणि एकाच सावलीत उघडतात.",
    },
    materials: { en: "Black basalt, lime plaster, kota stone, teak", mr: "काळा बेसाल्ट, चुन्याचा गिलावा, कोटा स्टोन, सागवान" },
    name: "Neem Courtyard House",
    image: "work-courtyard-house",
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
    story: {
      en: "A weekend home for a family who grow grapes. The bedrooms float in a single concrete volume above a glass living room, so the view of the vines runs uninterrupted from the pool to the hills.",
      mr: "द्राक्ष बागायतदार कुटुंबासाठी विकेंड होम. शयनकक्ष काचेच्या दिवाणखान्यावर तरंगणाऱ्या एकाच काँक्रीट खंडात आहेत, त्यामुळे तलावापासून डोंगरांपर्यंत द्राक्षबागेचे दृश्य अखंड दिसते.",
    },
    materials: { en: "Board formed concrete, teak louvres, Nashik stone", mr: "फळीच्या साच्यातील काँक्रीट, सागवानी लूव्हर, नाशिक दगड" },
    name: "Vineyard House",
    image: "work-vineyard-villa",
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
    story: {
      en: "A campus for 900 students where every corridor is a verandah. Terracotta jaali walls filter the Dhule sun and pull the breeze through, keeping classrooms cool without air conditioning.",
      mr: "९०० विद्यार्थ्यांसाठीचा परिसर, जिथे प्रत्येक व्हरांडा ओसरीसारखा आहे. टेराकोटा जाळीच्या भिंती धुळ्याचे ऊन गाळतात आणि वारा खेळता ठेवतात, त्यामुळे वर्ग वातानुकूलनाशिवाय थंड राहतात.",
    },
    materials: { en: "Terracotta jaali, exposed concrete, kota stone", mr: "टेराकोटा जाळी, उघडे काँक्रीट, कोटा स्टोन" },
    name: "Jaali School",
    image: "work-school",
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
    story: {
      en: "Six floors of offices behind a screen of terracotta fins. Each fin is angled to block the afternoon sun while keeping the view of the rain trees, cutting cooling loads by nearly a third.",
      mr: "टेराकोटा फिन्सच्या पडद्यामागे सहा मजली कार्यालये. प्रत्येक फिन दुपारचे ऊन रोखण्यासाठी कोनात बसवली आहे, तरी झाडांचे दृश्य कायम राहते. यामुळे थंड ठेवण्याचा खर्च जवळपास एक तृतीयांशाने कमी होतो.",
    },
    materials: { en: "Terracotta fins, fair faced concrete, granite", mr: "टेराकोटा फिन्स, स्वच्छ काँक्रीट, ग्रॅनाइट" },
    name: "Terracotta Offices",
    image: "work-office-pune",
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
    story: {
      en: "A slender tower designed around a hundred year old banyan that the client refused to cut. Deep balconies with built in planters give every home a garden in the sky.",
      mr: "शंभर वर्षांचा वड न तोडण्याचा आग्रह धरणाऱ्या ग्राहकासाठी त्या वडाभोवती आखलेला सडपातळ टॉवर. अंगभूत कुंड्यांसह खोल बाल्कन्यांमुळे प्रत्येक घराला आकाशात बाग मिळते.",
    },
    materials: { en: "Exposed concrete, teak screens, planted balconies", mr: "उघडे काँक्रीट, सागवानी पडदे, हिरव्या बाल्कन्या" },
    name: "Banyan Residences",
    image: "work-residence-mumbai",
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
    story: {
      en: "The interior of a Pune home stripped back to light and material. A dry stacked basalt wall holds the warmth of the day, and a tall jaali turns the morning sun into a pattern that moves across the room.",
      mr: "पुण्यातील घराचे इंटिरिअर, फक्त प्रकाश आणि साहित्यावर आधारित. कोरड्या रचलेल्या बेसाल्टची भिंत दिवसाची ऊब धरून ठेवते आणि उंच जाळी सकाळच्या उन्हाला खोलीभर फिरणाऱ्या नक्षीत बदलते.",
    },
    materials: { en: "Dry stacked basalt, lime plaster, teak, brass", mr: "रचलेला बेसाल्ट, चुन्याचा गिलावा, सागवान, पितळ" },
    name: "Basalt House Interiors",
    image: "work-interior",
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
  { key: "dhule", en: "Dhule", mr: "धुळे", lat: 20.9042, lon: 74.7749, hq: true, km: 0,
    line: { en: "Home of the studio. Where every drawing begins.", mr: "स्टुडिओचे घर. प्रत्येक आराखड्याची सुरुवात इथूनच." } },
  { key: "nashik", en: "Nashik", mr: "नाशिक", lat: 19.9975, lon: 73.7898, hq: false, km: 160,
    line: { en: "Vineyard homes and weekend retreats.", mr: "द्राक्षबागेतील घरे आणि विकेंड होम्स." } },
  { key: "mumbai", en: "Mumbai", mr: "मुंबई", lat: 19.076, lon: 72.8777, hq: false, km: 320,
    line: { en: "Towers that make room for trees.", mr: "झाडांसाठी जागा ठेवणारे टॉवर्स." } },
  { key: "pune", en: "Pune", mr: "पुणे", lat: 18.5204, lon: 73.8567, hq: false, km: 330,
    line: { en: "Offices, homes and interiors.", mr: "कार्यालये, घरे आणि इंटिरिअर." } },
];

const en = {
  meta: { title: "GA Design Studio · Architects", description: "Architecture and construction across Dhule, Nashik, Mumbai and Pune." },
  nav: { studio: "Studio", work: "Work", process: "Process", cities: "Cities", contact: "Contact", cta: "Start a project", menu: "Index", close: "Close", plan: "Ground floor plan · GA Design Studio", courtyard: "Courtyard", lang: "Language", rooms: { studio: "Where it begins", work: "Six buildings", process: "Sketch to keys", cities: "Four cities", contact: "Let's talk" } },
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
    fields: { project: "Project", location: "Location", type: "Type", year: "Year", area: "Area", materials: "Materials" },
    open: "View project",
    prev: "Previous",
    next: "Next",
    close: "Close",
    sheet: "Sheet",
  },
  process: {
    label: "Process",
    title: "From the first line to the front door.",
    steps: [
      { name: "Listen and sketch", text: "We understand your site, your way of living and your budget before the first line is drawn.", image: "studio-drawing-table" },
      { name: "Choose materials", text: "Basalt, teak, terracotta and lime. Local, lasting materials chosen with care.", image: "process-materials" },
      { name: "Build", text: "Built exactly to drawing, under Shoaib's direct supervision on site.", image: "process-site" },
      { name: "Hand over", text: "On time and on budget. The keys to your new home, in your hands.", image: "process-handover" },
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
    km: "km from the studio",
    all: "Four cities. One studio.",
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
    sketch: "Your project, drawn as you write",
    sketchDone: "Ready to build",
    stamp: "Sent",
  },
  footer: {
    tagline: "Creativity · Values · Freedom",
    rights: "All rights reserved.",
    top: "Back to top",
    studioTime: "Studio time, Dhule",
    open: "Open now",
    closed: "Closed now",
    hours: "Mon to Sat · 10:00 to 19:00",
  },
};

export type Dict = typeof en;

const mr: Dict = {
  meta: { title: "जी ए डिझाईन स्टुडिओ · वास्तुविशारद", description: "धुळे, नाशिक, मुंबई आणि पुण्यात वास्तुरचना आणि बांधकाम." },
  nav: { studio: "स्टुडिओ", work: "प्रकल्प", process: "प्रक्रिया", cities: "शहरे", contact: "संपर्क", cta: "प्रकल्प सुरू करा", menu: "अनुक्रमणिका", close: "बंद", plan: "तळमजला आराखडा · जी ए डिझाईन स्टुडिओ", courtyard: "अंगण", lang: "भाषा", rooms: { studio: "जिथे सुरुवात होते", work: "सहा वास्तू", process: "रेखाटन ते चावी", cities: "चार शहरे", contact: "बोलूया" } },
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
    fields: { project: "प्रकल्प", location: "ठिकाण", type: "प्रकार", year: "वर्ष", area: "क्षेत्रफळ", materials: "साहित्य" },
    open: "प्रकल्प पाहा",
    prev: "मागील",
    next: "पुढील",
    close: "बंद",
    sheet: "पत्रक",
  },
  process: {
    label: "प्रक्रिया",
    title: "पहिल्या रेषेपासून घराच्या दारापर्यंत.",
    steps: [
      { name: "ऐकणे आणि रेखाटन", text: "पहिली रेषा काढण्यापूर्वी तुमची जागा, तुमची जीवनशैली आणि तुमचे बजेट आम्ही समजून घेतो.", image: "studio-drawing-table" },
      { name: "साहित्य निवड", text: "बेसाल्ट, सागवान, टेराकोटा आणि चुना. स्थानिक, टिकाऊ साहित्याची काळजीपूर्वक निवड.", image: "process-materials" },
      { name: "बांधकाम", text: "शोएब यांच्या प्रत्यक्ष देखरेखीखाली, आराखड्याप्रमाणे काटेकोर बांधकाम.", image: "process-site" },
      { name: "हस्तांतरण", text: "वेळेवर आणि बजेटमध्ये. तुमच्या नव्या घराची चावी तुमच्या हातात.", image: "process-handover" },
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
    km: "किमी स्टुडिओपासून",
    all: "चार शहरे. एक स्टुडिओ.",
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
    submit: "व्हॉट्सॲपवर पाठवा",
    note: "तुमच्या माहितीसह व्हॉट्सॲप उघडेल.",
    visit: "स्टुडिओला भेट द्या",
    address: ["जय हिंद कॉलनी, देवपूर", "धुळे, महाराष्ट्र"],
    call: "फोन करा",
    write: "ईमेल करा",
    waIntro: "नमस्कार जी ए डिझाईन स्टुडिओ, मला एका प्रकल्पाबद्दल चर्चा करायची आहे.",
    sketch: "तुम्ही लिहिता तसा तुमचा प्रकल्प आकार घेतो",
    sketchDone: "उभारणीसाठी तयार",
    stamp: "पाठवले",
  },
  footer: {
    tagline: "सर्जनशीलता · मूल्ये · स्वातंत्र्य",
    rights: "सर्व हक्क राखीव.",
    top: "वर जा",
    studioTime: "स्टुडिओची वेळ, धुळे",
    open: "आता सुरू",
    closed: "आता बंद",
    hours: "सोम ते शनि · १०:०० ते १९:००",
  },
};

export const DICT: Record<Lang, Dict> = { en, mr };
