// Helping Hand Vasai Community Platform - Client JS Engine with Image Upload & Enhanced Modals

// State Management
let currentCategory = 'All';
let currentLocation = 'All';
let currentSearch = '';
let wishlist = JSON.parse(localStorage.getItem('hh_wishlist') || '[]');
let currentLang = localStorage.getItem('hh_lang') || 'en';
let activeAdminTab = 'items';
let selectedDonatedImageDataUrl = '';

// FULL MULTI-LANGUAGE TRANSLATION DICTIONARIES
const i18n = {
  en: {
    bannerMsg: "Community Drive Active in Vasai, Virar & Nalasopara! Over 1,420+ Children Benefited This Month ❤️",
    btnBannerDonate: "Donate Now",
    logoName: "Helping Hand",
    logoSub: "Vasai Community Platform",
    navHome: "Home",
    navDonate: "Donate",
    navBorrow: "Borrow Books",
    navVolunteers: "Volunteers",
    navAbout: "About",
    navContact: "Contact",
    txtAdminBtn: "Admin Portal",

    // Hero
    tagline: "Vasai • Virar • Nalasopara • Mumbai Community",
    heroTitle: "Together We Can Build a <span class='bg-gradient-to-r from-sky-600 via-teal-500 to-emerald-600 bg-clip-text text-transparent'>Better Future.</span>",
    heroSubtitle: "Donate books, donate clothes, become a volunteer, and help children receive the education they deserve across Vasai, Virar, and nearby suburbs.",
    btnHeroVolunteer: "Become a Volunteer",
    btnHeroDonate: "Donate Now",
    btnHeroBorrow: "Borrow Books",
    lblBooks: "Books Donated",
    lblClothes: "Clothes Shared",
    lblVolunteers: "Active Volunteers",
    heroCenterBadge: "Vasai Center Live",
    heroCenterTitle: "Empowering Local Children Through Shared Books",
    floatTitle: "100% Local Impact",
    floatSub: "Connecting neighbors within 5km radius in Vasai & Virar.",

    // Search & Filter
    searchPlaceholder: "Search by book name, author, class, clothes type or Vasai/Virar location...",
    optLocAll: "All Locations",
    optLocVasai: "Vasai (West/East)",
    optLocNala: "Nalasopara",
    optLocVirar: "Virar",
    optLocMum: "Mumbai",
    btnListItem: "List Item",
    txtAiTitle: "AI Suggestions:",
    chip1: "Math textbooks in Vasai West",
    chip2: "Winter clothes for 10-year-old",
    chip3: "Class 10 science reference books",
    chip4: "Free school uniform in Nalasopara",

    // Features Section
    featuresTitle: "How You Can Help Your Community",
    featuresSubtitle: "Every book or piece of clothing you share creates an immediate ripple of hope for underprivileged children in Vasai and nearby suburbs.",
    card1Title: "Donate Books",
    card1Sub: "List textbooks, novels, or reference guides you no longer use. Help students access quality education for free.",
    btnCard1: "List a Book",
    card2Title: "Donate Clothes",
    card2Sub: "Share gently worn winter wear, uniforms, and everyday clothes for children and families in need nearby.",
    btnCard2: "Donate Clothes",
    card3Title: "Borrow Books",
    card3Sub: "Search nearby available books by class, author, or subject. Request free pickup or digital reservation instantly.",
    btnCard3: "Browse Library",
    card4Title: "Volunteer Registration",
    card4Sub: "Join our weekend teaching drives, book sorting camps, and community outreach programs in Vasai & Virar.",
    btnCard4: "Join as Volunteer",

    // Nearby Section
    nearbyBadge: "Local Community Network",
    nearbyTitle: "Nearby Donations in Vasai & Suburbs",
    nearbySubtitle: "Connect directly with donors living within 5km of your location.",
    tabAll: "All Items",
    tabBooks: "📚 Books Only",
    tabClothes: "👕 Clothes Only",

    // Item Cards Labels & Buttons
    cardAuthor: "Author:",
    cardAge: "Age:",
    cardClass: "Class:",
    cardGender: "Gender:",
    cardCondition: "Condition:",
    cardDonor: "Donor:",
    statusAvailable: "Available",
    statusReserved: "Reserved",
    statusCollected: "Collected",
    btnCall: "Call",
    btnDetails: "Details",
    btnPickup: "Pickup",
    btnCloseModal: "Close Details",

    // Volunteers Section
    volTitle: "Community Impact & Volunteer Dashboard",
    volSubtitle: "Real-time metrics of books shared, clothes distributed, and children supported across Vasai-Virar belt.",
    volBannerTag: "Join Our Mission",
    volBannerTitle: "Become a Local Hero in Vasai",
    volBannerSub: "Our volunteers organize weekend book collection drives, tutor children at local community centers, and sort winter clothes. Spend just 2 hours a week to change lives!",
    btnVolBannerReg: "Register as Volunteer",
    btnVolBannerDon: "Make a Contribution",
    volRosterTitle: "Recent Active Volunteers",

    // Community Gallery Section
    galleryTitle: "Community Gallery",
    galleryDesc: "AI-powered learning sessions and volunteer drives across Vasai West & East.",
    gallery1: "Happy Students in Vasai Center",
    gallery2: "Interactive Reading Session",
    gallery3: "Volunteer Sorting Clothes",
    gallery4: "Book Distribution Drive",
    gallery5: "Community Learning Circle",
    gallery6: "Warm Winter Wear Drive",

    // Education Mission Section
    missionTagline: "Our Core Mission",
    missionTitle: "Making Education Accessible to Every Child in Vasai",
    missionDesc: "Helping Hand is built on the belief that geography or financial status should never be a barrier to learning. By connecting generous donors directly with families and children in need within our local neighborhood, we ensure every book finds an eager reader and every warm garment brings comfort.",
    missionBox1Title: "Zero Middlemen",
    missionBox2Title: "Verified Pickups",
    missionBox3Title: "Vasai & Suburbs Focus",
    missionBox4Title: "Free Book Lending",

    // About Section
    aboutTitle: "About Helping Hand Platform",
    aboutDesc: "Helping Hand is a community-driven initiative dedicated to bridging the educational and welfare gap for underprivileged children in Vasai, Virar, Nalasopara, and Mumbai. We enable citizens to directly share textbooks, educational reference materials, and essential clothing with nearby families in need.",
    aboutBox1Title: "Direct Peer-to-Peer",
    aboutBox1Sub: "No middlemen. Directly contact donors or request pickup in your neighborhood.",
    aboutBox2Title: "Database Verified",
    aboutBox2Sub: "All donated items and volunteers are logged and managed in real-time backend database.",
    aboutBox3Title: "Zero Cost Access",
    aboutBox3Sub: "100% free borrowing and donation platform for every student and family.",

    // Contact Section
    contactTitle: "Get in Touch",
    contactSubtitle: "Have a question or want to host a donation drive at your society in Vasai?",
    lblContactName: "Your Name",
    lblContactEmail: "Your Email",
    lblContactSub: "Subject",
    lblContactMsg: "Message",
    btnContactSubmit: "Send Message",

    // Footer
    footLogo: "Helping Hand",
    footDesc: "Connecting Vasai, Virar & Nalasopara citizens to share books, clothes, and foster education.",
    footHead1: "Quick Links",
    ftLink1: "Home",
    ftLink2: "Donate Books & Clothes",
    ftLink3: "Borrow Books",
    ftLink4: "Volunteer Registration",
    footHead2: "Coverage Areas",
    ftArea1: "Vasai West & East",
    ftArea2: "Virar West & East",
    ftArea3: "Nalasopara West & East",
    ftArea4: "Greater Mumbai Region",
    footHead3: "Helpline & Support",
    ftHelp1: "Vasai Center: +91 98765 43210",
    ftHelp2: "Email: support@helpinghand-vasai.org",
    copyRight: "© 2026 Helping Hand Vasai Community Platform. All rights reserved. Powered by Backend Database API.",

    // Modals
    listModalTitle: "List an Item for Donation",
    listModalSub: "Your item will be logged in the database and visible to neighbors nearby.",
    lblItemCat: "Category",
    optCatBook: "📚 Book (Textbook / Reference)",
    optCatClothes: "👕 Clothes (Uniform / Winterwear)",
    lblItemTitle: "Item Title",
    lblItemImage: "Donate Item Photo / Image",
    lblImgOptA: "Option A: Upload Image File",
    lblImgOptB: "Option B: Image Web URL",
    lblItemLoc: "Location Area",
    lblItemCond: "Condition",
    optCondNew: "Like New",
    optCondGood: "Good (90%)",
    optCondFair: "Fair",
    lblDonorName: "Donor Name",
    lblDonorPhone: "Phone Number",
    lblItemDesc: "Short Description",
    btnSaveItemDb: "Save Item to Database",

    borrowModalTitle: "Request Book Pickup",
    lblBorrowName: "Your Full Name",
    lblBorrowPhone: "Phone Number",
    lblBorrowAddress: "Pickup Address / Area in Vasai",
    lblBorrowNotes: "Notes for Donor",
    btnSubmitPickupReq: "Submit Pickup Request",

    volModalTitle: "Join as a Volunteer",
    volModalSub: "Register in our Vasai community database to receive drive updates.",
    lblVolName: "Full Name",
    lblVolEmail: "Email",
    lblVolPhone: "Phone",
    lblVolLoc: "Location",
    lblVolRole: "Preferred Role",
    lblVolAvail: "Availability",
    btnRegVolProf: "Register Volunteer Profile",

    donateModalTitle: "Make a Financial Contribution",
    donateModalSub: "Funds directly support purchasing notebooks, stationery, and winter blankets for children.",
    lblDonateAmt: "Select Amount (₹)",
    lblDonorFinName: "Donor Name",
    lblDonorFinEmail: "Email Address",
    btnPayUpiCard: "Proceed to Pay via UPI / Card",

    adminModalTitle: "Admin Database Dashboard",
    adminModalSub: "Direct interface to SQLite database tables: Items, Volunteers, and Requests.",
    wishlistDrawerTitle: "Saved Wishlist",
    notifDrawerTitle: "Live Activity Feed"
  },

  hi: {
    bannerMsg: "वसई, विरार और नालासोपारा में सामुदायिक अभियान जारी! इस महीने 1,420+ बच्चों को लाभ मिला ❤️",
    btnBannerDonate: "अभी दान करें",
    logoName: "हेल्पिंग हैंड",
    logoSub: "वसई कम्युनिटी प्लेटफॉर्म",
    navHome: "मुख्य पृष्ठ",
    navDonate: "दान करें",
    navBorrow: "किताबें लें",
    navVolunteers: "स्वयंसेवक",
    navAbout: "हमारे बारे में",
    navContact: "संपर्क करें",
    txtAdminBtn: "एडमिन पोर्टल",

    // Hero
    tagline: "वसई • विरार • नालासोपारा • मुंबई समुदाय",
    heroTitle: "साथ मिलकर हम एक <span class='bg-gradient-to-r from-sky-600 via-teal-500 to-emerald-600 bg-clip-text text-transparent'>बेहतर भविष्य बना सकते हैं।</span>",
    heroSubtitle: "किताबें दान करें, कपड़े दान करें, स्वयंसेवक बनें और वसई, विरार व आसपास के बच्चों को शिक्षा दिलाने में मदद करें।",
    btnHeroVolunteer: "स्वयंसेवक बनें",
    btnHeroDonate: "अभी दान करें",
    btnHeroBorrow: "किताबें लें",
    lblBooks: "किताबें दान की गईं",
    lblClothes: "कपड़े साझा किए गए",
    lblVolunteers: "सक्रिय स्वयंसेवक",
    heroCenterBadge: "वसई केंद्र लाइव",
    heroCenterTitle: "किताबें साझा करके स्थानीय बच्चों को सशक्त बनाना",
    floatTitle: "100% स्थानीय प्रभाव",
    floatSub: "वसई और विरार में 5 किमी के दायरे में पड़ोसियों को जोड़ना।",

    // Search & Filter
    searchPlaceholder: "पुस्तक के नाम, लेखक, कक्षा, कपड़ों के प्रकार या स्थान से खोजें...",
    optLocAll: "सभी स्थान",
    optLocVasai: "वसई (पश्चिम/पूर्व)",
    optLocNala: "नालासोपारा",
    optLocVirar: "विरार",
    optLocMum: "मुंबई",
    btnListItem: "+ वस्तु जोड़ें",
    txtAiTitle: "एआई सुझाव:",
    chip1: "वसई पश्चिम में गणित की पुस्तकें",
    chip2: "10 साल के बच्चे के लिए सर्दियों के कपड़े",
    chip3: "कक्षा 10 विज्ञान संदर्भ पुस्तकें",
    chip4: "नालासोपारा में मुफ्त स्कूल गणवेश",

    // Features Section
    featuresTitle: "आप अपने समुदाय की मदद कैसे कर सकते हैं",
    featuresSubtitle: "आपके द्वारा साझा की गई प्रत्येक पुस्तक या कपड़ा जरूरतमंद बच्चों के लिए आशा की किरण बनता है।",
    card1Title: "किताबें दान करें",
    card1Sub: "जिन पाठ्यपुस्तकों या संदर्भ पुस्तकों का आप उपयोग नहीं करते उन्हें सूचीबद्ध करें। बच्चों को मुफ्त शिक्षा दें।",
    btnCard1: "किताब जोड़ें",
    card2Title: "कपड़े दान करें",
    card2Sub: "जरूरतमंद बच्चों और परिवारों के लिए सर्दियों के कपड़े, यूनिफॉर्म और वस्त्र साझा करें।",
    btnCard2: "कपड़े दान करें",
    card3Title: "किताबें उधार लें",
    card3Sub: "कक्षा, लेखक या विषय के अनुसार उपलब्ध पुस्तकें खोजें। मुफ्त पिकअप का अनुरोध करें।",
    btnCard3: "लाइब्रेरी देखें",
    card4Title: "स्वयंसेवक पंजीकरण",
    card4Sub: "वसई और विरार में हमारे सप्ताहांत शिक्षण अभियानों और पुस्तक छंटाई शिविरों में शामिल हों।",
    btnCard4: "स्वयंसेवक बनें",

    // Nearby Section
    nearbyBadge: "स्थानीय सामुदायिक नेटवर्क",
    nearbyTitle: "वसई और आसपास के क्षेत्रों में दान",
    nearbySubtitle: "अपने स्थान के 5 किमी के भीतर रहने वाले दाताओं से सीधे जुड़ें।",
    tabAll: "सभी वस्तुएं",
    tabBooks: "📚 केवल पुस्तकें",
    tabClothes: "👕 केवल कपड़े",

    // Item Cards Labels & Buttons
    cardAuthor: "लेखक:",
    cardAge: "आयु वर्ग:",
    cardClass: "कक्षा:",
    cardGender: "लिंग:",
    cardCondition: "स्थिति:",
    cardDonor: "दाता:",
    statusAvailable: "उपलब्ध",
    statusReserved: "आरक्षित",
    statusCollected: "संग्रहित",
    btnCall: "कॉल करें",
    btnDetails: "विवरण",
    btnPickup: "पिकअप करें",
    btnCloseModal: "विवरण बंद करें",

    // Volunteers Section
    volTitle: "सामुदायिक प्रभाव एवं स्वयंसेवक डैशबोर्ड",
    volSubtitle: "वसई-विरार क्षेत्र में साझा की गई पुस्तकों, कपड़ों और समर्थित बच्चों का लाइव डेटा।",
    volBannerTag: "हमारे मिशन से जुड़ें",
    volBannerTitle: "वसई में स्थानीय नायक बनें",
    volBannerSub: "हमारे स्वयंसेवक पुस्तक संग्रह अभियान आयोजित करते हैं और बच्चों को पढ़ाते हैं। सप्ताह में केवल 2 घंटे दें!",
    btnVolBannerReg: "स्वयंसेवक पंजीकरण",
    btnVolBannerDon: "आर्थिक योगदान दें",
    volRosterTitle: "हाल के सक्रिय स्वयंसेवक",

    // Community Gallery Section
    galleryTitle: "सामुदायिक गैलरी",
    galleryDesc: "वसई पश्चिम और पूर्व में AI आधारित शिक्षण सत्र और स्वयंसेवी अभियान।",
    gallery1: "वसई केंद्र में खुश बच्चे",
    gallery2: "इंटरैक्टिव रीडिंग सत्र",
    gallery3: "स्वयंसेवकों द्वारा कपड़ों की छंटाई",
    gallery4: "पुस्तक वितरण अभियान",
    gallery5: "सामुदायिक शिक्षण समूह",
    gallery6: "गर्म सर्दियों के कपड़ों का अभियान",

    // Education Mission Section
    missionTagline: "हमारा मुख्य मिशन",
    missionTitle: "वसई में हर बच्चे तक शिक्षा पहुँचाना",
    missionDesc: "हेल्पिंग हैंड इस सोच पर बना है कि जगह या आर्थिक स्थिति कभी भी सीखने में रुकावट नहीं बननी चाहिए। अपने आस-पास के ज़रूरतमंद परिवारों और बच्चों को उदार दानदाताओं से सीधे जोड़कर, हम यह सुनिश्चित करते हैं कि हर किताब को एक उत्सुक पाठक मिले और हर गर्म कपड़े से किसी को आराम मिले।",
    missionBox1Title: "कोई बिचौलिया नहीं",
    missionBox2Title: "सत्यापित पिकअप",
    missionBox3Title: "वसई और आसपास के क्षेत्रों पर फोकस",
    missionBox4Title: "मुफ्त किताब उधार",

    // About Section
    tagline: "हमारा मुख्य मिशन",
    aboutTitle: "हेल्पिंग हैंड प्लेटफॉर्म के बारे में",
    aboutDesc: "हेल्पिंग हैंड वसई, विरार, नालासोपारा और मुंबई में वंचित बच्चों के लिए शैक्षिक सहायता प्रदान करने की एक पहल है। नागरिक सीधे जरूरतमंद परिवारों के साथ पुस्तकें और कपड़े साझा कर सकते हैं।",
    aboutBox1Title: "प्रत्यक्ष संपर्क",
    aboutBox1Sub: "कोई मध्यस्थ नहीं। दाताओं से सीधे संपर्क करें या पिकअप का अनुरोध करें।",
    aboutBox2Title: "डेटाबेस सत्यापित",
    aboutBox2Sub: "सभी दान की गई वस्तुएं बैकएंड डेटाबेस में वास्तविक समय में दर्ज की जाती हैं।",
    aboutBox3Title: "मुफ्त पहुंच",
    aboutBox3Sub: "प्रत्येक छात्र और परिवार के लिए 100% मुफ्त पुस्तक उधार और दान मंच।",

    // Contact Section
    contactTitle: "संपर्क में रहें",
    contactSubtitle: "कोई प्रश्न है या अपनी सोसायटी में दान अभियान आयोजित करना चाहते हैं?",
    lblContactName: "आपका नाम",
    lblContactEmail: "आपका ईमेल",
    lblContactSub: "विषय",
    lblContactMsg: "संदेश",
    btnContactSubmit: "संदेश भेजें",

    // Footer
    footLogo: "हेल्पिंग हैंड",
    footDesc: "वसई, विरार और नालासोपारा के नागरिकों को पुस्तकें और कपड़े साझा करने के लिए जोड़ना।",
    footHead1: "त्वरित लिंक",
    ftLink1: "मुख्य पृष्ठ",
    ftLink2: "किताबें और कपड़े दान करें",
    ftLink3: "किताबें उधार लें",
    ftLink4: "स्वयंसेवक पंजीकरण",
    footHead2: "कवरेज क्षेत्र",
    ftArea1: "वसई पश्चिम और पूर्व",
    ftArea2: "विरार पश्चिम और पूर्व",
    ftArea3: "नालासोपारा पश्चिम और पूर्व",
    ftArea4: "ग्रेटर मुंबई क्षेत्र",
    footHead3: "हेल्पलाइन और सहायता",
    ftHelp1: "वसई केंद्र: +91 98765 43210",
    ftHelp2: "ईमेल: support@helpinghand-vasai.org",
    copyRight: "© 2026 हेल्पिंग हैंड वसई कम्युनिटी प्लेटफॉर्म। सर्वाधिकार सुरक्षित।",

    // Modals
    listModalTitle: "दान के लिए वस्तु जोड़ें",
    listModalSub: "आपकी वस्तु डेटाबेस में दर्ज होगी और आस-पास के लोगों को दिखाई देगी।",
    lblItemCat: "श्रेणी",
    optCatBook: "📚 पुस्तक (पाठ्यपुस्तक / संदर्भ)",
    optCatClothes: "👕 कपड़े (यूनिफॉर्म / सर्दियों के कपड़े)",
    lblItemTitle: "वस्तु का शीर्षक",
    lblItemImage: "दान की गई वस्तु की तस्वीर / फोटो",
    lblImgOptA: "विकल्प A: फोटो फाइल अपलोड करें",
    lblImgOptB: "विकल्प B: फोटो वेब यूआरएल",
    lblItemLoc: "स्थान क्षेत्र",
    lblItemCond: "स्थिति",
    optCondNew: "नए जैसा",
    optCondGood: "अच्छा (90%)",
    optCondFair: "सामान्य",
    lblDonorName: "दाता का नाम",
    lblDonorPhone: "फोन नंबर",
    lblItemDesc: "संक्षिप्त विवरण",
    btnSaveItemDb: "डेटाबेस में सहेजें",

    borrowModalTitle: "पुस्तक पिकअप का अनुरोध करें",
    lblBorrowName: "आपका पूरा नाम",
    lblBorrowPhone: "फोन नंबर",
    lblBorrowAddress: "पिकअप पता / वसई में क्षेत्र",
    lblBorrowNotes: "दाता के लिए टिप्पणी",
    btnSubmitPickupReq: "अनुरोध भेजें",

    volModalTitle: "स्वयंसेवक के रूप में जुड़ें",
    volModalSub: "अभियान अपडेट प्राप्त करने के लिए वसई डेटाबेस में पंजीकरण करें।",
    lblVolName: "पूरा नाम",
    lblVolEmail: "ईमेल",
    lblVolPhone: "फोन",
    lblVolLoc: "स्थान",
    lblVolRole: "पसंदीदा भूमिका",
    lblVolAvail: "उपलब्धता",
    btnRegVolProf: "प्रोफ़ाइल सहेजें",

    donateModalTitle: "वित्तीय योगदान दें",
    donateModalSub: "धनराशि सीधे बच्चों के लिए नोटबुक, स्टेशनरी और कंबल खरीदने में सहायता करती है।",
    lblDonateAmt: "राशि चुनें (₹)",
    lblDonorFinName: "दाता का नाम",
    lblDonorFinEmail: "ईमेल पता",
    btnPayUpiCard: "यूपीआई / कार्ड से भुगतान करें",

    adminModalTitle: "एडमिन डेटाबेस डैशबोर्ड",
    adminModalSub: "एसक्यूलाइट डेटाबेस तालिकाओं के लिए प्रत्यक्ष इंटरफ़ेस।",
    wishlistDrawerTitle: "सहेजी गई विशलिस्ट",
    notifDrawerTitle: "लाइव गतिविधि फ़ीड"
  },

  mr: {
    bannerMsg: "वसई, विरार आणि नालासोपारा येथे समुदाय मोहीम सुरू! या महिन्यात १४२०+ मुलांना लाभ ❤️",
    btnBannerDonate: "आत्ताच दान करा",
    logoName: "हेल्पिंग हँड",
    logoSub: "वसई कम्युनिटी प्लॅटफॉर्म",
    navHome: "मुख्य पान",
    navDonate: "दान करा",
    navBorrow: "पुस्तके घ्या",
    navVolunteers: "स्वयंसेवक",
    navAbout: "आमच्याबद्दल",
    navContact: "संपर्क",
    txtAdminBtn: "अ‍ॅडमिन पोर्टल",

    // Hero
    tagline: "वसई • विरार • नालासोपारा • मुंबई समुदाय",
    heroTitle: "एकत्र येऊन आपण <span class='bg-gradient-to-r from-sky-600 via-teal-500 to-emerald-600 bg-clip-text text-transparent'>उज्वल भविष्य घडवू शकतो.</span>",
    heroSubtitle: "पुस्तके दान करा, कपडे दान करा, स्वयंसेवक व्हा आणि गरजू मुलांना शिक्षणासाठी मदत करा.",
    btnHeroVolunteer: "स्वयंसेवक व्हा",
    btnHeroDonate: "आत्ताच दान करा",
    btnHeroBorrow: "पुस्तके उसनी घ्या",
    lblBooks: "दान केलेली पुस्तके",
    lblClothes: "वाटप केलेले कपडे",
    lblVolunteers: "सक्रिय स्वयंसेवक",
    heroCenterBadge: "वसई केंद्र थेट",
    heroCenterTitle: "पुस्तके शेअर करून स्थानिक मुलांना सक्षम बनवणे",
    floatTitle: "१००% स्थानिक प्रभाव",
    floatSub: "वसई आणि विरारमध्ये ५ किमी परिसरातील रहिवाशांना जोडणे.",

    // Search & Filter
    searchPlaceholder: "पुस्तकाचे नाव, लेखक, इयत्ता, कपड्यांचा प्रकार किंवा ठिकाणावरून शोधा...",
    optLocAll: "सर्व ठिकाणे",
    optLocVasai: "वसई (पश्चिम/पूर्व)",
    optLocNala: "नालासोपारा",
    optLocVirar: "विरार",
    optLocMum: "मुंबई",
    btnListItem: "+ वस्तू नोंदवा",
    txtAiTitle: "एआय सूचना:",
    chip1: "वसई पश्चिमेत गणिताची पुस्तके",
    chip2: "१० वर्षांच्या मुलासाठी हिवाळी कपडे",
    chip3: "इयत्ता १० वी विज्ञान संदर्भ पुस्तके",
    chip4: "नालासोपारा येथे मोफत शालेय गणवेश",

    // Features Section
    featuresTitle: "तुम्ही तुमच्या समुदायाला कशी मदत करू शकता",
    featuresSubtitle: "तुम्ही दिलेले प्रत्येक पुस्तक आणि कपडा मुलांच्या आयुष्यात बदल घडवून आणतो.",
    card1Title: "पुस्तके दान करा",
    card1Sub: "तुम्ही वापरत नसलेली पुस्तके नोंदवा. मुलांना मोफत शिक्षणाची संधी द्या.",
    btnCard1: "पुस्तक नोंदवा",
    card2Title: "कपडे दान करा",
    card2Sub: "गरजू मुलांसाठी आणि कुटुंबांसाठी कपडे आणि गणवेश शेअर करा.",
    btnCard2: "कपडे दान करा",
    card3Title: "पुस्तके उसनी घ्या",
    card3Sub: "इयत्ता किंवा विषयानुसार उपलब्ध पुस्तके शोधा. मोफत पिकअपची विनंती करा.",
    btnCard3: "वाचनालय पहा",
    card4Title: "स्वयंसेवक नोंदणी",
    card4Sub: "वसई आणि विरारमध्ये आमच्या शिक्षण मोहिमेत आणि पुस्तक वर्गीकरणात सहभागी व्हा.",
    btnCard4: "स्वयंसेवक व्हा",

    // Nearby Section
    nearbyBadge: "स्थानिक समुदाय नेटवर्क",
    nearbyTitle: "वसई व परिसरातील जवळचे दान",
    nearbySubtitle: "तुमच्या ५ किमी परिसरातील दात्यांशी थेट संपर्क साधा.",
    tabAll: "सर्व वस्तू",
    tabBooks: "📚 फक्त पुस्तके",
    tabClothes: "👕 फक्त कपडे",

    // Item Cards Labels & Buttons
    cardAuthor: "लेखक:",
    cardAge: "वयोगट:",
    cardClass: "इयत्ता:",
    cardGender: "लिंग:",
    cardCondition: "स्थिती:",
    cardDonor: "दाता:",
    statusAvailable: "उपलब्ध",
    statusReserved: "आरक्षित",
    statusCollected: "गोळा केले",
    btnCall: "कॉल करा",
    btnDetails: "तपशील",
    btnPickup: "पिकअप करा",
    btnCloseModal: "तपशील बंद करा",

    // Volunteers Section
    volTitle: "समुदाय प्रभाव आणि स्वयंसेवक डॅशबोर्ड",
    volSubtitle: "वसई-विरार परिसरातील पुस्तके, कपडे आणि मदत मिळालेल्या मुलांचा थेट डेटा.",
    volBannerTag: "आमच्या मोहिमेत सामील व्हा",
    volBannerTitle: "वसईत स्थानिक नायक बना",
    volBannerSub: "आमचे स्वयंसेवक पुस्तक संकलन मोहीम राबवतात आणि मुलांना शिकवतात. आठवड्यातून फक्त २ तास द्या!",
    btnVolBannerReg: "स्वयंसेवक नोंदणी",
    btnVolBannerDon: "आर्थिक मदत करा",
    volRosterTitle: "अलीकडील सक्रिय स्वयंसेवक",

    // Community Gallery Section
    galleryTitle: "सामुदायिक दालन",
    galleryDesc: "वसई पश्चिम आणि पूर्व भागात AI तंत्रज्ञानावर आधारित शिक्षण सत्रे आणि स्वयंसेवा उपक्रम.",
    gallery1: "वसई केंद्रातील आनंदी विद्यार्थी",
    gallery2: "परस्परसंवादी वाचन सत्र",
    gallery3: "स्वयंसेवकांकडून कपड्यांची वर्गवारी",
    gallery4: "पुस्तक वितरण मोहीम",
    gallery5: "सामुदायिक शिक्षण गट",
    gallery6: "उबदार हिवाळी कपड्यांची मोहीम",

    // Education Mission Section
    missionTagline: "आमचे मुख्य ध्येय",
    missionTitle: "वसईतील प्रत्येक मुलापर्यंत शिक्षण पोहोचवणे",
    missionDesc: "'हेल्पिंग हँड' या विश्वासावर आधारित आहे की भौगोलिक स्थान किंवा आर्थिक परिस्थिती ही शिक्षणाच्या मार्गातील अडथळा कधीच ठरू नये. आपल्या परिसरातील गरजू कुटुंबे आणि मुलांना थेट देणगीदारांशी जोडून, आम्ही हे सुनिश्चित करतो की प्रत्येक पुस्तकाला उत्सुक वाचक मिळावा आणि प्रत्येक उबदार कपड्यामुळे कोणालातरी दिलासा मिळावा.",
    missionBox1Title: "मध्यस्थांचा अभाव",
    missionBox2Title: "खात्रीशीर संकलन",
    missionBox3Title: "वसई आणि उपनगरांवर लक्ष",
    missionBox4Title: "मोफत पुस्तक वाटप",

    // About Section
    aboutTitle: "हेल्पिंग हँड प्लॅटफॉर्मबद्दल",
    aboutDesc: "हेल्पिंग हँड ही वसई, विरार, नालासोपारा आणि मुंबईतील गरजू मुलांच्या शिक्षणासाठी सुरू केलेली मोहीम आहे. नागरिक थेट पुस्तके आणि कपडे शेअर करू शकतात.",
    aboutBox1Title: "थेट संपर्क",
    aboutBox1Sub: "कोणताही मध्यस्थ नाही. थेट दात्यांशी संपर्क साधा किंवा पिकअपची विनंती करा.",
    aboutBox2Title: "डेटाबेस पडताळणी",
    aboutBox2Sub: "सर्व दान केलेल्या वस्तू बॅकएंड डेटाबेसमध्ये रिअल-टाइममध्ये नोंदवल्या जातात.",
    aboutBox3Title: "मोफत प्रवेश",
    aboutBox3Sub: "प्रत्येक विद्यार्थ्यासाठी आणि कुटुंबासाठी १००% मोफत पुस्तक उसने घेणे आणि दान मंच.",

    // Contact Section
    contactTitle: "संपर्क साधा",
    contactSubtitle: "काही प्रश्न आहेत किंवा तुमच्या सोसायटीमध्ये दान मोहीम राबवायची आहे?",
    lblContactName: "तुमचे नाव",
    lblContactEmail: "तुमचा ईमेल",
    lblContactSub: "विषय",
    lblContactMsg: "संदेश",
    btnContactSubmit: "संदेश पाठवा",

    // Footer
    footLogo: "हेल्पिंग हँड",
    footDesc: "वसई, विरार आणि नालासोपारा येथील नागरिकांना पुस्तके व कपडे शेअर करण्यासाठी जोडणे.",
    footHead1: "जलद लिंक्स",
    ftLink1: "मुख्य पान",
    ftLink2: "पुस्तके व कपडे दान करा",
    ftLink3: "पुस्तके उसनी घ्या",
    ftLink4: "स्वयंसेवक नोंदणी",
    footHead2: "कार्यक्षेत्र",
    ftArea1: "वसई पश्चिम व पूर्व",
    ftArea2: "विरार पश्चिम व पूर्व",
    ftArea3: "नालासोपारा पश्चिम व पूर्व",
    ftArea4: "ग्रेटर मुंबई परिसर",
    footHead3: "हेल्पलाइन आणि मदत",
    ftHelp1: "वसई केंद्र: +91 98765 43210",
    ftHelp2: "ईमेल: support@helpinghand-vasai.org",
    copyRight: "© 2026 हेल्पिंग हँड वसई कम्युनिटी प्लॅटफॉर्म. सर्व हक्क राखीव.",

    // Modals
    listModalTitle: "दानासाठी वस्तू नोंदवा",
    listModalSub: "तुमची वस्तू डेटाबेसमध्ये नोंदवली जाईल आणि जवळच्या लोकांना दिसेल.",
    lblItemCat: "वर्गवारी",
    optCatBook: "📚 पुस्तक (पाठ्यपुस्तक / संदर्भ)",
    optCatClothes: "👕 कपडे (गणवेश / हिवाळी कपडे)",
    lblItemTitle: "वस्तूचे नाव",
    lblItemImage: "दान केलेल्या वस्तूचा फोटो",
    lblImgOptA: "पर्याय A: फोटो फाइल अपलोड करा",
    lblImgOptB: "पर्याय B: फोटो वेब यूआरएल",
    lblItemLoc: "ठिकाण परिसर",
    lblItemCond: "स्थिती",
    optCondNew: "नवीनसारखे",
    optCondGood: "छान (90%)",
    optCondFair: "मध्यम",
    lblDonorName: "दात्याचे नाव",
    lblDonorPhone: "फोन नंबर",
    lblItemDesc: "थोडक्यात माहिती",
    btnSaveItemDb: "डेटाबेसमध्ये सेव्ह करा",

    borrowModalTitle: "पुस्तक पिकअपची विनंती करा",
    lblBorrowName: "तुमचे पूर्ण नाव",
    lblBorrowPhone: "फोन नंबर",
    lblBorrowAddress: "पिकअप पत्ता / वसईतील परिसर",
    lblBorrowNotes: "दात्यासाठी टीप",
    btnSubmitPickupReq: "विनंती पाठवा",

    volModalTitle: "स्वयंसेवक म्हणून सामील व्हा",
    volModalSub: "अपडेट्स मिळवण्यासाठी वसई डेटाबेसमध्ये नोंदणी करा.",
    lblVolName: "पूर्ण नाव",
    lblVolEmail: "ईमेल",
    lblVolPhone: "फोन",
    lblVolLoc: "ठिकाण",
    lblVolRole: "पसंतीची भूमिका",
    lblVolAvail: "उपलब्धता",
    btnRegVolProf: "प्रोफाइल सेव्ह करा",

    donateModalTitle: "आर्थिक मदत करा",
    donateModalSub: "ही रक्कम थेट मुलांसाठी वह्या, स्टेशनरी आणि ब्लँकेट्स खरेदी करण्यासाठी वापरली जाते.",
    lblDonateAmt: "रक्कम निवडा (₹)",
    lblDonorFinName: "दात्याचे नाव",
    lblDonorFinEmail: "ईमेल पत्ता",
    btnPayUpiCard: "यूपीआय / कार्डद्वारे पे करा",

    adminModalTitle: "अ‍ॅडमिन डेटाबेस डॅशबोर्ड",
    adminModalSub: "एसक्यूलाइट डेटाबेस तक्त्यांसाठी थेट इंटरफेस.",
    wishlistDrawerTitle: "सेव्ह केलेली विशलिस्ट",
    notifDrawerTitle: "थेट अपडेट्स"
  }
};

// INITIALIZATION
document.addEventListener('DOMContentLoaded', () => {
  setupTheme();
  setupScrollSpy();
  setupModalBackdropListeners();

  // Set initial language dropdown value
  const langSelect = document.getElementById('langSelect');
  if (langSelect) langSelect.value = currentLang;

  // Apply language immediately
  changeLanguage(currentLang, false);

  fetchStats();
  fetchItems();
  fetchVolunteersPreview();
  fetchNotificationsFeed();
  updateWishlistBadge();
});

// CLOSE MODALS ON BACKDROP CLICK OR ESC KEY
function setupModalBackdropListeners() {
  const modalIds = ['listModal', 'borrowModal', 'volunteerModal', 'donateModal', 'adminModal', 'itemDetailsModal'];
  modalIds.forEach((id) => {
    const modal = document.getElementById(id);
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.classList.add('hidden');
        }
      });
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      modalIds.forEach((id) => {
        const modal = document.getElementById(id);
        if (modal) modal.classList.add('hidden');
      });
      const wDrawer = document.getElementById('wishlistDrawer');
      const nDrawer = document.getElementById('notificationsDrawer');
      if (wDrawer) wDrawer.classList.add('translate-x-full');
      if (nDrawer) nDrawer.classList.add('translate-x-full');
    }
  });
}

// DYNAMIC SCROLLSPY FOR NAVIGATION BAR
function setupScrollSpy() {
  const sections = document.querySelectorAll('header, section');
  const navItems = document.querySelectorAll('.nav-item');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navItems.forEach((link) => {
            if (link.getAttribute('data-section') === id) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    },
    { threshold: 0.3 }
  );

  sections.forEach((sec) => observer.observe(sec));
}

// DARK / LIGHT THEME TOGGLE
function setupTheme() {
  const savedTheme = localStorage.getItem('hh_theme') || 'light';
  if (savedTheme === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
  updateThemeIcon();
}

function toggleTheme() {
  const isDark = document.documentElement.classList.toggle('dark');
  localStorage.setItem('hh_theme', isDark ? 'dark' : 'light');
  updateThemeIcon();
  showToast(isDark ? 'Switched to Dark Mode 🌙' : 'Switched to Light Mode ☀️');
}

function updateThemeIcon() {
  const icon = document.getElementById('themeIcon');
  if (!icon) return;
  const isDark = document.documentElement.classList.contains('dark');
  icon.setAttribute('data-lucide', isDark ? 'sun' : 'moon');
  lucide.createIcons();
}

// COMPLETE MULTI-LANGUAGE ENGINE
function changeLanguage(lang, notify = true) {
  if (!i18n[lang]) return;
  currentLang = lang;
  localStorage.setItem('hh_lang', lang);
  const dict = i18n[lang];

  // Helper to safely set innerHTML or textContent
  const setText = (id, text, isHtml = false) => {
    const el = document.getElementById(id);
    if (el) {
      if (isHtml) el.innerHTML = text;
      else el.textContent = text;
    }
  };

  // 1. Top Banner & Header Nav
  setText('txtBannerMsg', dict.bannerMsg);
  setText('btnBannerDonate', dict.btnBannerDonate);
  setText('txtLogoName', dict.logoName);
  setText('txtLogoSub', dict.logoSub);

  setText('nav-home', dict.navHome);
  setText('nav-features', dict.navDonate);
  setText('nav-nearby', dict.navBorrow);
  setText('nav-volunteers', dict.navVolunteers);
  setText('nav-about', dict.navAbout);
  setText('nav-contact', dict.navContact);
  setText('txtAdminBtn', dict.txtAdminBtn);

  // Mobile nav
  setText('mob-home', dict.navHome);
  setText('mob-features', dict.navDonate);
  setText('mob-nearby', dict.navBorrow);
  setText('mob-volunteers', dict.navVolunteers);
  setText('mob-about', dict.navAbout);
  setText('mob-contact', dict.navContact);
  setText('mobAdminBtn', dict.txtAdminBtn);

  // 2. Hero Section
  setText('txtTagline', dict.tagline);
  setText('txtHeroTitle', dict.heroTitle, true);
  setText('txtHeroSubtitle', dict.heroSubtitle);
  setText('btnHeroVolunteer', dict.btnHeroVolunteer);
  setText('btnHeroDonate', dict.btnHeroDonate);
  setText('btnHeroBorrow', dict.btnHeroBorrow);
  setText('lblBooks', dict.lblBooks);
  setText('lblClothes', dict.lblClothes);
  setText('lblVolunteers', dict.lblVolunteers);
  setText('txtHeroCenterBadge', dict.heroCenterBadge);
  setText('txtHeroCenterTitle', dict.heroCenterTitle);
  setText('txtFloatTitle', dict.floatTitle);
  setText('txtFloatSub', dict.floatSub);

  // 3. Search & Filter
  const searchInput = document.getElementById('searchInput');
  if (searchInput) searchInput.placeholder = dict.searchPlaceholder;

  setText('optLocAll', dict.optLocAll);
  setText('optLocVasai', dict.optLocVasai);
  setText('optLocNala', dict.optLocNala);
  setText('optLocVirar', dict.optLocVirar);
  setText('optLocMum', dict.optLocMum);
  setText('btnListItem', dict.btnListItem);
  setText('txtAiTitle', dict.txtAiTitle);
  setText('chip1', dict.chip1);
  setText('chip2', dict.chip2);
  setText('chip3', dict.chip3);
  setText('chip4', dict.chip4);

  // 4. Features Section
  setText('txtFeaturesTitle', dict.featuresTitle);
  setText('txtFeaturesSubtitle', dict.featuresSubtitle);
  setText('txtCard1Title', dict.card1Title);
  setText('txtCard1Sub', dict.card1Sub);
  setText('btnCard1', dict.btnCard1);
  setText('txtCard2Title', dict.card2Title);
  setText('txtCard2Sub', dict.card2Sub);
  setText('btnCard2', dict.btnCard2);
  setText('txtCard3Title', dict.card3Title);
  setText('txtCard3Sub', dict.card3Sub);
  setText('btnCard3', dict.btnCard3);
  setText('txtCard4Title', dict.card4Title);
  setText('txtCard4Sub', dict.card4Sub);
  setText('btnCard4', dict.btnCard4);

  // 5. Nearby Section
  setText('txtNearbyBadge', dict.nearbyBadge);
  setText('txtNearbyTitle', dict.nearbyTitle);
  setText('txtNearbySubtitle', dict.nearbySubtitle);
  setText('tabAll', dict.tabAll);
  setText('tabBooks', dict.tabBooks);
  setText('tabClothes', dict.tabClothes);

  // 6. Volunteers Section
  setText('txtVolTitle', dict.volTitle);
  setText('txtVolSubtitle', dict.volSubtitle);
  setText('txtVolBannerTag', dict.volBannerTag);
  setText('txtVolBannerTitle', dict.volBannerTitle);
  setText('txtVolBannerSub', dict.volBannerSub);
  setText('btnVolBannerReg', dict.btnVolBannerReg);
  setText('btnVolBannerDon', dict.btnVolBannerDon);
  setText('txtVolRosterTitle', dict.volRosterTitle);

  // 7. Community Gallery Section
  setText('txtGalleryTitle', dict.galleryTitle);
  setText('txtGalleryDesc', dict.galleryDesc);
  setText('gallery1', dict.gallery1);
  setText('gallery2', dict.gallery2);
  setText('gallery3', dict.gallery3);
  setText('gallery4', dict.gallery4);
  setText('gallery5', dict.gallery5);
  setText('gallery6', dict.gallery6);

  //8. Education Mission Section
  setText('txtMissionTagline', dict.missionTagline);
  setText('txtMissionTitle', dict.missionTitle);
  setText('txtMissionDesc', dict.missionDesc);
  setText('txtMissionBox1Title', dict.missionBox1Title);
  setText('txtMissionBox2Title', dict.missionBox2Title);
  setText('txtMissionBox3Title', dict.missionBox3Title);
  setText('txtMissionBox4Title', dict.missionBox4Title);

  // 9. About Section
  setText('txtAboutTitle', dict.aboutTitle);
  setText('txtAboutDesc', dict.aboutDesc);
  setText('txtAboutBox1Title', dict.aboutBox1Title);
  setText('txtAboutBox1Sub', dict.aboutBox1Sub);
  setText('txtAboutBox2Title', dict.aboutBox2Title);
  setText('txtAboutBox2Sub', dict.aboutBox2Sub);
  setText('txtAboutBox3Title', dict.aboutBox3Title);
  setText('txtAboutBox3Sub', dict.aboutBox3Sub);

  // 10. Contact Section
  setText('txtContactTitle', dict.contactTitle);
  setText('txtContactSubtitle', dict.contactSubtitle);
  setText('lblContactName', dict.lblContactName);
  setText('lblContactEmail', dict.lblContactEmail);
  setText('lblContactSub', dict.lblContactSub);
  setText('lblContactMsg', dict.lblContactMsg);
  setText('btnContactSubmit', dict.btnContactSubmit);

  // 11. Footer
  setText('txtFootLogo', dict.footLogo);
  setText('txtFootDesc', dict.footDesc);
  setText('txtFootHead1', dict.footHead1);
  setText('ftLink1', dict.ftLink1);
  setText('ftLink2', dict.ftLink2);
  setText('ftLink3', dict.ftLink3);
  setText('ftLink4', dict.ftLink4);
  setText('txtFootHead2', dict.footHead2);
  setText('ftArea1', dict.ftArea1);
  setText('ftArea2', dict.ftArea2);
  setText('ftArea3', dict.ftArea3);
  setText('ftArea4', dict.ftArea4);
  setText('txtFootHead3', dict.footHead3);
  setText('ftHelp1', dict.ftHelp1);
  setText('ftHelp2', dict.ftHelp2);
  setText('txtCopyRight', dict.copyRight);

  // 12. Modals
  setText('listModalTitle', dict.listModalTitle);
  setText('listModalSub', dict.listModalSub);
  setText('lblItemCat', dict.lblItemCat);
  setText('optCatBook', dict.optCatBook);
  setText('optCatClothes', dict.optCatClothes);
  setText('lblItemTitle', dict.lblItemTitle);
  setText('lblItemImage', dict.lblItemImage);
  setText('lblImgOptA', dict.lblImgOptA);
  setText('lblImgOptB', dict.lblImgOptB);
  setText('lblItemLoc', dict.lblItemLoc);
  setText('lblItemCond', dict.lblItemCond);
  setText('optCondNew', dict.optCondNew);
  setText('optCondGood', dict.optCondGood);
  setText('optCondFair', dict.optCondFair);
  setText('lblDonorName', dict.lblDonorName);
  setText('lblDonorPhone', dict.lblDonorPhone);
  setText('lblItemDesc', dict.lblItemDesc);
  setText('btnSaveItemDb', dict.btnSaveItemDb);

  setText('txtBorrowModalTitle', dict.borrowModalTitle);
  setText('lblBorrowName', dict.lblBorrowName);
  setText('lblBorrowPhone', dict.lblBorrowPhone);
  setText('lblBorrowAddress', dict.lblBorrowAddress);
  setText('lblBorrowNotes', dict.lblBorrowNotes);
  setText('btnSubmitPickupReq', dict.btnSubmitPickupReq);

  setText('txtVolModalTitle', dict.volModalTitle);
  setText('txtVolModalSub', dict.volModalSub);
  setText('lblVolName', dict.lblVolName);
  setText('lblVolEmail', dict.lblVolEmail);
  setText('lblVolPhone', dict.lblVolPhone);
  setText('lblVolLoc', dict.lblVolLoc);
  setText('lblVolRole', dict.lblVolRole);
  setText('lblVolAvail', dict.lblVolAvail);
  setText('btnRegVolProf', dict.btnRegVolProf);

  setText('txtDonateModalTitle', dict.donateModalTitle);
  setText('txtDonateModalSub', dict.donateModalSub);
  setText('lblDonateAmt', dict.lblDonateAmt);
  setText('lblDonorFinName', dict.lblDonorFinName);
  setText('lblDonorFinEmail', dict.lblDonorFinEmail);
  setText('btnPayUpiCard', dict.btnPayUpiCard);

  setText('txtAdminModalTitle', dict.adminModalTitle);
  setText('txtAdminModalSub', dict.adminModalSub);
  setText('txtWishlistDrawerTitle', dict.wishlistDrawerTitle);
  setText('txtNotifDrawerTitle', dict.notifDrawerTitle);

  // Re-render items grid to translate dynamic cards
  fetchItems();

  if (notify) {
    const langName = lang === 'hi' ? 'हिंदी (Hindi)' : lang === 'mr' ? 'मराठी (Marathi)' : 'English';
    showToast(`Language set to ${langName}`);
  }
}

// MOBILE MENU TOGGLE
function toggleMobileMenu() {
  const menu = document.getElementById('mobileMenu');
  menu.classList.toggle('hidden');
}

function closeMobileMenu() {
  document.getElementById('mobileMenu').classList.add('hidden');
}

// FETCH REAL-TIME STATS FROM BACKEND DATABASE
async function fetchStats() {
  try {
    const res = await fetch('/api/stats');
    const data = await res.json();
    document.getElementById('statBooks').innerText = data.booksDonated.toLocaleString() + '+';
    document.getElementById('statClothes').innerText = data.clothesShared.toLocaleString() + '+';
    document.getElementById('statVolunteers').innerText = data.activeVolunteers.toLocaleString() + '+';
  } catch (err) {
    console.error('Failed to fetch stats:', err);
  }
}

// FETCH ITEMS FROM BACKEND DATABASE (WITH FILTERS & SEARCH)
async function fetchItems() {
  const container = document.getElementById('itemsGrid');
  if (!container) return;

  container.innerHTML = `
    <div class="col-span-full py-12 text-center text-slate-500">
      <div class="w-8 h-8 border-4 border-sky-600 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
      <p class="text-sm font-medium">Fetching available items from database...</p>
    </div>
  `;

  try {
    const params = new URLSearchParams();
    if (currentCategory !== 'All') params.append('category', currentCategory);
    if (currentLocation !== 'All') params.append('location', currentLocation);
    if (currentSearch.trim() !== '') params.append('search', currentSearch.trim());

    const res = await fetch(`/api/items?${params.toString()}`);
    const items = await res.json();

    if (!items || items.length === 0) {
      container.innerHTML = `
        <div class="col-span-full py-12 text-center text-slate-500 bg-slate-50 dark:bg-slate-800/40 rounded-3xl border border-dashed border-slate-300 dark:border-slate-700">
          <i data-lucide="package-open" class="w-12 h-12 mx-auto text-slate-400 mb-3"></i>
          <h4 class="font-bold text-base text-slate-800 dark:text-slate-200">No items found matching criteria</h4>
          <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">Try clearing search filters or be the first to list an item in Vasai!</p>
          <button onclick="openListModal('Book')" class="mt-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2 rounded-xl text-xs shadow-md transition cursor-pointer">
            + List an Item Now
          </button>
        </div>
      `;
      lucide.createIcons();
      return;
    }

    container.innerHTML = items.map((item) => renderItemCard(item)).join('');
    lucide.createIcons();
  } catch (err) {
    console.error('Error fetching items:', err);
    container.innerHTML = `
      <div class="col-span-full py-12 text-center text-rose-500">
        Failed to load database items. Please check if server is running.
      </div>
    `;
  }
}

// RENDER ITEM CARD HTML WITH DYNAMIC LANGUAGE SUPPORT
function renderItemCard(item) {
  const dict = i18n[currentLang] || i18n.en;
  const isWishlisted = wishlist.includes(item.id);

  // Status translation
  let statusText = item.status;
  if (item.status === 'Available') statusText = dict.statusAvailable;
  else if (item.status === 'Reserved') statusText = dict.statusReserved;
  else if (item.status === 'Collected') statusText = dict.statusCollected;

  const statusColor = item.status === 'Available' ? 'bg-emerald-600' : item.status === 'Reserved' ? 'bg-orange-500' : 'bg-slate-600';
  const categoryBadge = item.category === 'Book' ? '📚 ' + (currentLang === 'hi' ? 'पुस्तक' : currentLang === 'mr' ? 'पुस्तक' : 'Book') : '👕 ' + (currentLang === 'hi' ? 'कपड़े' : currentLang === 'mr' ? 'कपडे' : 'Clothes');

  const labelKey1 = item.category === 'Book' ? dict.cardAuthor : dict.cardAge;
  const labelKey2 = item.category === 'Book' ? dict.cardClass : dict.cardGender;

  return `
    <div class="item-card bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-md flex flex-col justify-between group">
      <div>
        <div class="relative h-48 overflow-hidden bg-slate-200 dark:bg-slate-800">
          <img src="${item.image_url}" alt="${escapeHtml(item.title)}" class="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
          <div class="absolute top-3 left-3 flex gap-2">
            <span class="px-2.5 py-1 rounded-full text-[11px] font-bold text-white shadow-md ${statusColor}">
              ${statusText}
            </span>
            <span class="bg-slate-900/80 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-bold text-white shadow-md">
              ${categoryBadge}
            </span>
          </div>
          <button onclick="toggleWishlist(${item.id})" class="absolute top-3 right-3 p-2 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md text-rose-500 hover:scale-110 transition shadow-md cursor-pointer">
            <i data-lucide="heart" class="w-4 h-4 ${isWishlisted ? 'fill-rose-500' : ''}"></i>
          </button>
        </div>

        <div class="p-5 space-y-3">
          <div class="flex justify-between items-start">
            <span class="text-[11px] font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">${escapeHtml(item.sub_category || item.category)}</span>
            <span class="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
              <i data-lucide="map-pin" class="w-3.5 h-3.5 text-orange-500"></i> ${escapeHtml(item.location)} (${escapeHtml(item.distance || '1km')})
            </span>
          </div>

          <h3 class="font-bold text-base leading-snug text-slate-900 dark:text-white line-clamp-1">${escapeHtml(item.title)}</h3>

          <div class="grid grid-cols-2 gap-2 text-xs text-slate-600 dark:text-slate-400 bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800">
            <div><span class="font-semibold text-slate-700 dark:text-slate-300">${labelKey1}</span> ${escapeHtml(item.author_or_age || 'N/A')}</div>
            <div><span class="font-semibold text-slate-700 dark:text-slate-300">${labelKey2}</span> ${escapeHtml(item.class_or_gender || 'General')}</div>
            <div><span class="font-semibold text-slate-700 dark:text-slate-300">${dict.cardCondition}</span> ${escapeHtml(item.condition || 'Good')}</div>
            <div><span class="font-semibold text-slate-700 dark:text-slate-300">${dict.cardDonor}</span> ${escapeHtml(item.donor_name || 'Anonymous')}</div>
          </div>
        </div>
      </div>

      <div class="p-5 pt-0 grid grid-cols-3 gap-2">
        <button onclick="callDonor('${escapeHtml(item.donor_name)}', '${escapeHtml(item.donor_phone)}')" class="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 rounded-xl text-xs flex items-center justify-center gap-1 shadow-xs transition cursor-pointer">
          <i data-lucide="phone" class="w-3.5 h-3.5"></i>
          <span>${dict.btnCall}</span>
        </button>
        <button onclick="openItemDetailsModal(${item.id})" class="bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold py-2 rounded-xl text-xs flex items-center justify-center gap-1 transition cursor-pointer" title="View details with Close option">
          <i data-lucide="eye" class="w-3.5 h-3.5"></i>
          <span>${dict.btnDetails}</span>
        </button>
        <button onclick="openBorrowModal(${item.id}, '${escapeHtml(item.title)}')" class="bg-sky-600 hover:bg-sky-700 text-white font-semibold py-2 rounded-xl text-xs flex items-center justify-center gap-1 shadow-xs transition cursor-pointer">
          <i data-lucide="qr-code" class="w-3.5 h-3.5"></i>
          <span>${dict.btnPickup}</span>
        </button>
      </div>
    </div>
  `;
}

// SEARCH & FILTER INPUT HANDLERS
let searchTimeout;
function onSearchInput() {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => {
    currentSearch = document.getElementById('searchInput').value;
    fetchItems();
  }, 300);
}

function onLocationFilterChange() {
  currentLocation = document.getElementById('locationSelect').value;
  fetchItems();
}

function setCategoryFilter(cat) {
  currentCategory = cat;
  document.getElementById('tabAll').className = `px-4 py-2 rounded-lg transition cursor-pointer ${cat === 'All' ? 'bg-white dark:bg-slate-900 shadow-xs text-sky-600 dark:text-sky-400' : 'text-slate-600 dark:text-slate-400'}`;
  document.getElementById('tabBooks').className = `px-4 py-2 rounded-lg transition cursor-pointer ${cat === 'Book' ? 'bg-white dark:bg-slate-900 shadow-xs text-sky-600 dark:text-sky-400' : 'text-slate-600 dark:text-slate-400'}`;
  document.getElementById('tabClothes').className = `px-4 py-2 rounded-lg transition cursor-pointer ${cat === 'Clothes' ? 'bg-white dark:bg-slate-900 shadow-xs text-sky-600 dark:text-sky-400' : 'text-slate-600 dark:text-slate-400'}`;
  fetchItems();
}

function applyChip(query) {
  document.getElementById('searchInput').value = query;
  currentSearch = query;
  fetchItems();
  showToast(`Filter applied: "${query}"`);
}

// IMAGE UPLOAD & PREVIEW LOGIC FOR DONATED ITEMS
function previewDonatedImage(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    selectedDonatedImageDataUrl = e.target.result;
    const box = document.getElementById('imgPreviewBox');
    const tag = document.getElementById('imgPreviewTag');
    if (box && tag) {
      tag.src = selectedDonatedImageDataUrl;
      box.classList.remove('hidden');
    }
  };
  reader.readAsDataURL(file);
}

function previewDonatedImageUrl(url) {
  if (!url || !url.trim().startsWith('http')) {
    if (!selectedDonatedImageDataUrl) {
      document.getElementById('imgPreviewBox').classList.add('hidden');
    }
    return;
  }
  selectedDonatedImageDataUrl = url.trim();
  const box = document.getElementById('imgPreviewBox');
  const tag = document.getElementById('imgPreviewTag');
  if (box && tag) {
    tag.src = selectedDonatedImageDataUrl;
    box.classList.remove('hidden');
  }
}

function clearDonatedImagePreview() {
  selectedDonatedImageDataUrl = '';
  const fileInput = document.getElementById('itemImageFile');
  const urlInput = document.getElementById('itemImageUrl');
  const box = document.getElementById('imgPreviewBox');
  const tag = document.getElementById('imgPreviewTag');

  if (fileInput) fileInput.value = '';
  if (urlInput) urlInput.value = '';
  if (tag) tag.src = '';
  if (box) box.classList.add('hidden');
}

// LIST ITEM SUBMISSION (POST TO DATABASE WITH CUSTOM DONATED IMAGE)
function openListModal(category) {
  clearDonatedImagePreview();
  document.getElementById('itemCategory').value = category || 'Book';
  updateModalCategoryFields(category || 'Book');
  document.getElementById('listModal').classList.remove('hidden');
}

function closeListModal() {
  document.getElementById('listModal').classList.add('hidden');
}

function updateModalCategoryFields(cat) {
  const isBook = cat === 'Book';
  const dict = i18n[currentLang] || i18n.en;

  document.getElementById('lblAuthorAge').innerText = isBook ? dict.cardAuthor.replace(':', '') : dict.cardAge.replace(':', '');
  document.getElementById('itemAuthorAge').placeholder = isBook ? 'e.g. R.D. Sharma' : 'e.g. 8-12 Years';
  document.getElementById('lblClassGender').innerText = isBook ? dict.cardClass.replace(':', '') : dict.cardGender.replace(':', '');
  document.getElementById('itemClassGender').placeholder = isBook ? 'e.g. Class 10' : 'e.g. Unisex / Boys';
}

/* =========================================================
   FORM VALIDATION - HELPING HAND
   ========================================================= */

// ---------- VALIDATION REGEX ----------
const VALIDATION = {
  // Indian 10-digit phone number - numbers ONLY
  phone: /^[0-9]{10}$/,

  // Standard email validation
  email: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,

  // Names: letters, spaces, apostrophe, hyphen and dot
  // Supports English + Indian Unicode characters
  name: /^[\p{L}]+(?:[ .'-][\p{L}]+)*$/u
};


// ---------- CLEAN TEXT ----------
function cleanText(value) {
  return String(value || '')
    .trim()
    .replace(/\s+/g, ' ');
}


// ---------- PROPER NAME FORMAT ----------
// Example:
// "rAHUL vERMA" -> "Rahul Verma"
// "ikjyot kaur kohli" -> "Ikjyot Kaur Kohli"
function formatProperName(value) {
  return cleanText(value)
    .toLowerCase()
    .split(' ')
    .map(word => {
      if (!word) return word;

      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(' ');
}


// ---------- PHONE VALIDATION ----------
function isValidPhone(value) {
  return VALIDATION.phone.test(cleanText(value));
}


// ---------- EMAIL VALIDATION ----------
function isValidEmail(value) {
  return VALIDATION.email.test(cleanText(value));
}


// ---------- NAME VALIDATION ----------
function isValidName(value) {
  const name = cleanText(value);

  if (!name) return false;

  // Prevent names such as:
  // 12345
  // Rahul123
  // 123Rahul
  if (!VALIDATION.name.test(name)) {
    return false;
  }

  // Name should contain at least 2 letters
  const lettersOnly = name.replace(/[^\p{L}]/gu, '');

  return lettersOnly.length >= 2;
}


// ---------- GENERAL TEXT VALIDATION ----------
function isValidText(value, minLength = 2) {
  const text = cleanText(value);

  if (!text || text.length < minLength) {
    return false;
  }

  // Reject text containing only numbers/symbols
  const hasLetter = /\p{L}/u.test(text);

  return hasLetter;
}


// ---------- SHOW VALIDATION ERROR ----------
function setValidationError(input, message) {
  if (!input) return;

  input.setCustomValidity(message);

  input.classList.add(
    'border-red-500',
    'ring-2',
    'ring-red-200'
  );
}


// ---------- CLEAR VALIDATION ERROR ----------
function clearValidationError(input) {
  if (!input) return;

  input.setCustomValidity('');

  input.classList.remove(
    'border-red-500',
    'ring-2',
    'ring-red-200'
  );
}


// =========================================================
// PHONE INPUTS - ALLOW NUMBERS ONLY
// =========================================================

const phoneInputIds = [
  'itemDonorPhone',
  'borrowPhone',
  'volPhone'
];

phoneInputIds.forEach(id => {
  const input = document.getElementById(id);

  if (!input) return;

  input.setAttribute('inputmode', 'numeric');
  input.setAttribute('maxlength', '10');
  input.setAttribute('minlength', '10');
  input.setAttribute('pattern', '[0-9]{10}');

  input.addEventListener('input', function () {

    // Remove everything except numbers
    this.value = this.value.replace(/\D/g, '');

    if (this.value.length > 10) {
      this.value = this.value.slice(0, 10);
    }

    clearValidationError(this);

    if (this.value.length > 0 && !isValidPhone(this.value)) {
      setValidationError(
        this,
        'Phone number must contain exactly 10 digits.'
      );
    }
  });

  input.addEventListener('blur', function () {

    if (!this.value) {
      setValidationError(
        this,
        'Phone number is required.'
      );
      return;
    }

    if (!isValidPhone(this.value)) {
      setValidationError(
        this,
        'Enter a valid 10-digit phone number using numbers only.'
      );
    } else {
      clearValidationError(this);
    }
  });
});


// =========================================================
// EMAIL INPUTS
// =========================================================

const emailInputIds = [
  'contactEmail',
  'volEmail',
  'donorEmail'
];

emailInputIds.forEach(id => {
  const input = document.getElementById(id);

  if (!input) return;

  input.setAttribute('type', 'email');
  input.setAttribute('autocomplete', 'email');

  input.addEventListener('input', function () {

    // Remove spaces
    this.value = this.value.replace(/\s/g, '');

    clearValidationError(this);

    if (this.value && !isValidEmail(this.value)) {
      setValidationError(
        this,
        'Please enter a valid email address.'
      );
    }
  });

  input.addEventListener('blur', function () {

    if (!this.value) {
      setValidationError(
        this,
        'Email address is required.'
      );
      return;
    }

    if (!isValidEmail(this.value)) {
      setValidationError(
        this,
        'Enter a valid email address such as name@example.com.'
      );
    } else {
      clearValidationError(this);
    }
  });
});


// =========================================================
// NAME INPUTS
// =========================================================

const nameInputIds = [
  'contactName',
  'itemDonorName',
  'borrowName',
  'volName',
  'donorName'
];

nameInputIds.forEach(id => {
  const input = document.getElementById(id);

  if (!input) return;

  input.setAttribute(
    'pattern',
    "[A-Za-zÀ-ÖØ-öø-ÿ .'-]+"
  );

  input.addEventListener('input', function () {

    // Remove numbers and unwanted special characters
    this.value = this.value.replace(
      /[^\p{L} .'-]/gu,
      ''
    );

    // Remove repeated spaces
    this.value = this.value.replace(/\s+/g, ' ');

    clearValidationError(this);
  });

  input.addEventListener('blur', function () {

    this.value = formatProperName(this.value);

    if (!this.value) {
      setValidationError(
        this,
        'Name is required.'
      );
      return;
    }

    if (!isValidName(this.value)) {
      setValidationError(
        this,
        'Enter a valid name using letters only.'
      );
    } else {
      clearValidationError(this);
    }
  });
});


// =========================================================
// OTHER TEXT FIELDS
// =========================================================

const textInputIds = [
  'itemTitle',
  'itemAuthorAge',
  'itemClassGender',
  'itemDescription',
  'borrowAddress',
  'borrowNotes',
  'contactSubject',
  'contactMessage'
];

textInputIds.forEach(id => {

  const input = document.getElementById(id);

  if (!input) return;

  input.addEventListener('blur', function () {

    this.value = cleanText(this.value);

    // Only validate required fields
    if (this.hasAttribute('required') && !isValidText(this.value)) {
      setValidationError(
        this,
        'Please enter meaningful text.'
      );
    } else {
      clearValidationError(this);
    }
  });
});


// =========================================================
// VALIDATE COMPLETE FORM
// =========================================================

function validateFields(fieldIds) {

  for (const id of fieldIds) {

    const input = document.getElementById(id);

    if (!input) continue;

    const value = cleanText(input.value);

    // Required field
    if (input.hasAttribute('required') && !value) {

      setValidationError(
        input,
        'This field is required.'
      );

      input.focus();

      return false;
    }


    // Name
    if (
      id === 'contactName' ||
      id === 'itemDonorName' ||
      id === 'borrowName' ||
      id === 'volName' ||
      id === 'donorName'
    ) {

      if (!isValidName(value)) {

        setValidationError(
          input,
          'Enter a valid name using letters only.'
        );

        input.focus();

        return false;
      }

      input.value = formatProperName(value);
    }


    // Phone
    if (
      id === 'itemDonorPhone' ||
      id === 'borrowPhone' ||
      id === 'volPhone'
    ) {

      if (!isValidPhone(value)) {

        setValidationError(
          input,
          'Phone number must contain exactly 10 digits.'
        );

        input.focus();

        return false;
      }
    }


    // Email
    if (
      id === 'contactEmail' ||
      id === 'volEmail' ||
      id === 'donorEmail'
    ) {

      if (!isValidEmail(value)) {

        setValidationError(
          input,
          'Enter a valid email address.'
        );

        input.focus();

        return false;
      }
    }
  }

  return true;
}

async function handleListItemSubmit(e) {
  e.preventDefault();

  if (!validateFields([
    'itemTitle',
    'itemDonorName',
    'itemDonorPhone',
    'itemDescription'
  ])) {
    return;
  }

  // existing code continues...

  async function handleListItemSubmit(e) {
    e.preventDefault();

    const categoryVal = document.getElementById('itemCategory').value;
    const urlInputVal = document.getElementById('itemImageUrl').value.trim();
    const finalImageUrl = selectedDonatedImageDataUrl || urlInputVal || (categoryVal === 'Book'
      ? 'https://images.unsplash.com/photo-1599689868384-59cb2b01bb21?auto=format&fit=crop&w=600&q=80'
      : 'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=600&q=80');

    const newItem = {
      category: categoryVal,
      title: document.getElementById('itemTitle').value,
      author_or_age: document.getElementById('itemAuthorAge').value,
      class_or_gender: document.getElementById('itemClassGender').value,
      location: document.getElementById('itemLocation').value,
      condition: document.getElementById('itemCondition').value,
      donor_name: document.getElementById('itemDonorName').value,
      donor_phone: document.getElementById('itemDonorPhone').value,
      description: document.getElementById('itemDescription').value,
      image_url: finalImageUrl
    };

    try {
      const res = await fetch('/api/items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newItem)
      });

      if (res.ok) {
        closeListModal();
        clearDonatedImagePreview();
        showToast('Item with custom photo saved to database & live on platform! 🎉');
        fetchItems();
        fetchStats();
      } else {
        showToast('Failed to save item. Try again.');
      }
    } catch (err) {
      console.error('Failed to submit item:', err);
      showToast('Server error while saving item.');
    }
  }

  // BORROW / PICKUP REQUEST (POST TO DATABASE)
  function openBorrowModal(itemId, itemTitle) {
    document.getElementById('borrowItemId').value = itemId;
    document.getElementById('borrowItemTitle').value = itemTitle;
    document.getElementById('borrowItemSubtitle').innerText = `Requesting: ${itemTitle}`;
    document.getElementById('borrowModal').classList.remove('hidden');
  }

  function closeBorrowModal() {
    document.getElementById('borrowModal').classList.add('hidden');
  }

  async function handleBorrowSubmit(e) {
    e.preventDefault();

    if (!validateFields([
      'borrowName',
      'borrowPhone',
      'borrowAddress',
      'borrowNotes',
    ])) {
      return;
    }
    const reqData = {
      item_id: document.getElementById('borrowItemId').value,
      item_title: document.getElementById('borrowItemTitle').value,
      requester_name: document.getElementById('borrowName').value,
      requester_phone: document.getElementById('borrowPhone').value,
      address: document.getElementById('borrowAddress').value,
      notes: document.getElementById('borrowNotes').value
    };

    try {
      const res = await fetch('/api/borrow', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reqData)
      });

      if (res.ok) {
        closeBorrowModal();
        showToast('Pickup request sent to donor & logged in DB! 📲');
        fetchItems();
      } else {
        showToast('Error submitting request.');
      }
    } catch (err) {
      console.error('Borrow request error:', err);
    }
  }

  // VOLUNTEER REGISTRATION (POST TO DATABASE)
  function openVolunteerModal() {
    document.getElementById('volunteerModal').classList.remove('hidden');
  }

  function closeVolunteerModal() {
    document.getElementById('volunteerModal').classList.add('hidden');
  }

  async function handleVolunteerSubmit(e) {
    e.preventDefault();

    if (!validateFields([
      'volName',
      'volEmail',
      'volPhone'
    ])) {
      return;
    }

    const volData = {
      name: document.getElementById('volName').value,
      email: document.getElementById('volEmail').value,
      phone: document.getElementById('volPhone').value,
      location: document.getElementById('volLocation').value,
      role: document.getElementById('volRole').value,
      availability: document.getElementById('volAvailability').value
    };


    try {
      const res = await fetch('/api/volunteers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(volData)
      });

      if (res.ok) {
        closeVolunteerModal();
        showToast('Welcome to Helping Hand! Profile saved to DB. ❤️');
        fetchVolunteersPreview();
        fetchStats();
      } else {
        showToast('Error registering volunteer.');
      }
    } catch (err) {
      console.error('Volunteer registration error:', err);
    }
  }

  // MONETARY DONATION SUBMISSION
  function openDonateModal() {
    document.getElementById('donateModal').classList.remove('hidden');
  }

  function closeDonateModal() {
    document.getElementById('donateModal').classList.add('hidden');
  }

  function setDonateAmount(amt) {
    document.getElementById('customDonateAmount').value = amt;
  }

  async function handleDonateSubmit(e) {
    e.preventDefault();

    if (!validateFields([
      'donorName',
      'donorEmail'
    ])) {
      return;
    }

    const amountInput = document.getElementById('customDonateAmount');

    const amount = Number(amountInput.value);

    if (!Number.isFinite(amount) || amount < 1) {
      amountInput.setCustomValidity(
        'Please enter a valid donation amount.'
      );
      amountInput.reportValidity();
      return;
    }

    amountInput.setCustomValidity('');

    const donationData = {
      amount: amount,
      donor_name: document.getElementById('donorName').value,
      email: document.getElementById('donorEmail').value,
      cause: 'Educational Books & Clothes Drive'
    };


  }

  try {
    const res = await fetch('/api/donations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(donationData)
    });

    if (res.ok) {
      closeDonateModal();
      showToast(`Thank you ${donationData.donor_name}! Contribution of ₹${donationData.amount} received. ❤️`);
    }
  } catch (err) {
    console.error('Donation error:', err);
  }
}

// CONTACT FORM SUBMISSION
async function handleContactSubmit(e) {
  e.preventDefault();

  if (!validateFields([
    'contactName',
    'contactEmail',
    'contactSubject',
    'contactMessage'
  ])) {
    return;
  }

  const messageData = {
    name: document.getElementById('contactName').value,
    email: document.getElementById('contactEmail').value,
    subject: document.getElementById('contactSubject').value,
    message: document.getElementById('contactMessage').value
  };

}
try {
  const res = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(messageData)
  });

  if (res.ok) {
    document.getElementById('contactForm').reset();
    showToast('Your message has been sent to our Vasai team!');
  }
} catch (err) {
  console.error('Contact error:', err);
}


// ITEM DETAILS POPUP WITH PROMINENT TOP & BOTTOM CLOSE BUTTONS
async function openItemDetailsModal(id) {
  const modal = document.getElementById('itemDetailsModal');
  const container = document.getElementById('itemDetailsContent');
  modal.classList.remove('hidden');

  container.innerHTML = `
    <div class="py-8 text-center text-slate-500">
      <div class="w-8 h-8 border-4 border-sky-600 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
      <p>Loading item details...</p>
    </div>
  `;

  try {
    const res = await fetch(`/api/items/${id}`);
    const item = await res.json();
    const dict = i18n[currentLang] || i18n.en;

    container.innerHTML = `
      <div class="space-y-4 text-xs">
        <div class="h-60 rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 relative">
          <img src="${item.image_url}" class="w-full h-full object-cover" alt="${escapeHtml(item.title)}" />
          <span class="absolute top-3 left-3 bg-sky-600 text-white font-bold px-3 py-1 rounded-full shadow-md">${item.category}</span>
        </div>

        <div>
          <span class="text-[11px] font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">${escapeHtml(item.sub_category || item.category)}</span>
          <h3 class="text-xl font-extrabold text-slate-900 dark:text-white mb-1">${escapeHtml(item.title)}</h3>
          <p class="text-slate-600 dark:text-slate-300 leading-relaxed">${escapeHtml(item.description)}</p>
        </div>

        <div class="grid grid-cols-2 gap-3 bg-slate-50 dark:bg-slate-800 p-3 rounded-2xl border border-slate-200 dark:border-slate-700">
          <div><strong class="text-slate-700 dark:text-slate-300">Location:</strong> ${escapeHtml(item.location)}</div>
          <div><strong class="text-slate-700 dark:text-slate-300">Distance:</strong> ${escapeHtml(item.distance || 'Near Vasai')}</div>
          <div><strong class="text-slate-700 dark:text-slate-300">${item.category === 'Book' ? dict.cardAuthor : dict.cardAge}</strong> ${escapeHtml(item.author_or_age || 'N/A')}</div>
          <div><strong class="text-slate-700 dark:text-slate-300">${item.category === 'Book' ? dict.cardClass : dict.cardGender}</strong> ${escapeHtml(item.class_or_gender || 'General')}</div>
          <div><strong class="text-slate-700 dark:text-slate-300">${dict.cardCondition}</strong> ${escapeHtml(item.condition)}</div>
          <div><strong class="text-slate-700 dark:text-slate-300">Status:</strong> <span class="font-bold text-emerald-600">${item.status}</span></div>
        </div>

        <div class="p-3 bg-emerald-50 dark:bg-emerald-950/60 rounded-2xl border border-emerald-200 dark:border-emerald-800 flex items-center justify-between">
          <div>
            <h5 class="font-bold text-emerald-800 dark:text-emerald-300">${dict.cardDonor} ${escapeHtml(item.donor_name)}</h5>
            <p class="text-emerald-600 dark:text-emerald-400">${escapeHtml(item.donor_phone)}</p>
          </div>
          <button onclick="callDonor('${escapeHtml(item.donor_name)}', '${escapeHtml(item.donor_phone)}')" class="bg-emerald-600 text-white font-bold px-4 py-2 rounded-xl hover:bg-emerald-700 transition cursor-pointer">
            ${dict.btnCall}
          </button>
        </div>

        <!-- BOTTOM ACTIONS INCLUDING PROMINENT CLOSE BUTTON -->
        <div class="flex items-center justify-between gap-3 pt-2">
          <button onclick="closeItemDetailsModal()" class="w-full bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold py-2.5 rounded-xl transition cursor-pointer text-xs flex items-center justify-center gap-1.5 shadow-xs">
            <i data-lucide="x-circle" class="w-4 h-4 text-slate-500"></i>
            <span>${dict.btnCloseModal}</span>
          </button>
          <button onclick="closeItemDetailsModal(); openBorrowModal(${item.id}, '${escapeHtml(item.title)}');" class="w-full bg-sky-600 hover:bg-sky-700 text-white font-bold py-2.5 rounded-xl shadow-md transition cursor-pointer text-xs flex items-center justify-center gap-1.5">
            <i data-lucide="qr-code" class="w-4 h-4"></i>
            <span>${dict.btnPickup}</span>
          </button>
        </div>
      </div>
    `;
    lucide.createIcons();
  } catch (err) {
    console.error('Details fetch error:', err);
  }
}

function closeItemDetailsModal() {
  document.getElementById('itemDetailsModal').classList.add('hidden');
}

// CALL DONOR HELPER
function callDonor(name, phone) {
  showToast(`Contacting Donor ${name} at ${phone}`);
  window.location.href = `tel:${phone}`;
}

// WISHLIST MANAGEMENT
function toggleWishlist(id) {
  const index = wishlist.indexOf(id);
  if (index > -1) {
    wishlist.splice(index, 1);
    showToast('Removed from saved wishlist');
  } else {
    wishlist.push(id);
    showToast('Saved to wishlist! ❤️');
  }
  localStorage.setItem('hh_wishlist', JSON.stringify(wishlist));
  updateWishlistBadge();
  fetchItems();
}

function updateWishlistBadge() {
  const badge = document.getElementById('wishlistBadge');
  if (badge) badge.innerText = wishlist.length;
}

function toggleWishlistDrawer() {
  const drawer = document.getElementById('wishlistDrawer');
  const isHidden = drawer.classList.contains('translate-x-full');
  if (isHidden) {
    drawer.classList.remove('translate-x-full');
    renderWishlistDrawerItems();
  } else {
    drawer.classList.add('translate-x-full');
  }
}

function removeFromWishlist(id) {
  const index = wishlist.indexOf(id);
  if (index > -1) {
    wishlist.splice(index, 1);
    localStorage.setItem('hh_wishlist', JSON.stringify(wishlist));
    updateWishlistBadge();
    renderWishlistDrawerItems();
    fetchItems();
    showToast('Item removed from wishlist 🗑️');
  }
}

function clearAllWishlist() {
  if (wishlist.length === 0) return;
  if (!confirm('Clear all saved items from your wishlist?')) return;
  wishlist = [];
  localStorage.setItem('hh_wishlist', JSON.stringify(wishlist));
  updateWishlistBadge();
  renderWishlistDrawerItems();
  fetchItems();
  showToast('Wishlist cleared 🗑️');
}

async function renderWishlistDrawerItems() {
  const list = document.getElementById('wishlistItemsList');
  if (wishlist.length === 0) {
    list.innerHTML = `
      <div class="py-12 text-center text-slate-500">
        <i data-lucide="bookmark" class="w-10 h-10 mx-auto text-slate-300 mb-2"></i>
        <p class="text-xs">No saved items in wishlist yet.</p>
      </div>
    `;
    lucide.createIcons();
    return;
  }

  try {
    const res = await fetch('/api/items');
    const items = await res.json();
    const savedItems = items.filter((item) => wishlist.includes(item.id));
    const dict = i18n[currentLang] || i18n.en;

    list.innerHTML = savedItems.map((item) => `
      <div class="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs gap-2 shadow-2xs hover:border-sky-500 transition">
        <div class="flex items-center gap-2.5 overflow-hidden">
          <img src="${item.image_url}" class="w-10 h-10 rounded-lg object-cover border border-slate-200 dark:border-slate-700 shrink-0" alt="${escapeHtml(item.title)}" />
          <div class="min-w-0">
            <h5 class="font-bold text-slate-900 dark:text-white line-clamp-1">${escapeHtml(item.title)}</h5>
            <p class="text-slate-500 text-[11px]">${escapeHtml(item.location)}</p>
          </div>
        </div>
        <div class="flex items-center gap-1.5 shrink-0">
          <button onclick="openBorrowModal(${item.id}, '${escapeHtml(item.title)}')" class="bg-sky-600 hover:bg-sky-700 text-white font-bold px-2.5 py-1.5 rounded-lg shadow-xs cursor-pointer text-[11px]">
            ${dict.btnPickup}
          </button>
          <button onclick="removeFromWishlist(${item.id})" class="p-1.5 text-rose-500 hover:bg-rose-100 dark:hover:bg-rose-950/60 rounded-lg transition cursor-pointer" title="Remove from Wishlist">
            <i data-lucide="trash-2" class="w-4 h-4"></i>
          </button>
        </div>
      </div>
    `).join('');
    lucide.createIcons();
  } catch (err) {
    console.error('Wishlist drawer fetch error:', err);
  }
}

// NOTIFICATIONS DRAWER
function toggleNotificationsDrawer() {
  const drawer = document.getElementById('notificationsDrawer');
  const isHidden = drawer.classList.contains('translate-x-full');
  if (isHidden) {
    drawer.classList.remove('translate-x-full');
    fetchNotificationsFeed();
  } else {
    drawer.classList.add('translate-x-full');
  }
}

async function fetchNotificationsFeed() {
  try {
    const res = await fetch('/api/notifications');
    const feed = await res.json();
    const list = document.getElementById('notificationsFeedList');

    list.innerHTML = feed.map((note) => `
      <div class="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-xs space-y-1">
        <div class="flex items-center justify-between">
          <span class="font-bold text-slate-900 dark:text-white flex items-center gap-1">${note.icon} ${note.title}</span>
          <span class="text-[10px] text-slate-400">${note.time}</span>
        </div>
        <p class="text-slate-600 dark:text-slate-400">${note.message}</p>
      </div>
    `).join('');
  } catch (err) {
    console.error('Failed to fetch notifications:', err);
  }
}

// RECENT VOLUNTEERS PREVIEW
async function fetchVolunteersPreview() {
  try {
    const res = await fetch('/api/volunteers');
    const volunteers = await res.json();
    const container = document.getElementById('volunteerListPreview');
    if (!container) return;
    const preview = volunteers.slice(0, 3);

    container.innerHTML = preview.map((v) => `
      <div class="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 text-xs">
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 font-bold flex items-center justify-center">
            ${v.name.charAt(0)}
          </div>
          <div>
            <h5 class="font-bold text-slate-800 dark:text-slate-200">${escapeHtml(v.name)}</h5>
            <p class="text-[10px] text-slate-500">${escapeHtml(v.role)} • ${escapeHtml(v.location)}</p>
          </div>
        </div>
        <span class="text-[10px] bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-300 font-semibold px-2 py-0.5 rounded-full">${v.availability || 'Active'}</span>
      </div>
    `).join('');
  } catch (err) {
    console.error('Failed to fetch volunteer preview:', err);
  }
}

// ADMIN DASHBOARD MODAL
function openAdminModal() {
  document.getElementById('adminModal').classList.remove('hidden');
  renderAdminTab('items');
}

function closeAdminModal() {
  document.getElementById('adminModal').classList.add('hidden');
}

function switchAdminTab(tab) {
  activeAdminTab = tab;
  document.getElementById('adminTabItems').className = `px-4 py-2 border-b-2 font-bold cursor-pointer ${tab === 'items' ? 'border-emerald-600 text-emerald-600' : 'border-transparent text-slate-500'}`;
  document.getElementById('adminTabVolunteers').className = `px-4 py-2 border-b-2 font-bold cursor-pointer ${tab === 'volunteers' ? 'border-emerald-600 text-emerald-600' : 'border-transparent text-slate-500'}`;
  document.getElementById('adminTabBorrow').className = `px-4 py-2 border-b-2 font-bold cursor-pointer ${tab === 'borrow' ? 'border-emerald-600 text-emerald-600' : 'border-transparent text-slate-500'}`;
  renderAdminTab(tab);
}

async function renderAdminTab(tab) {
  const container = document.getElementById('adminTabContent');
  container.innerHTML = `<div class="py-8 text-center text-slate-500">Loading ${tab} data...</div>`;

  if (tab === 'items') {
    const res = await fetch('/api/items');
    const items = await res.json();
    document.getElementById('cntAdminItems').innerText = items.length;

    container.innerHTML = `
      <table class="w-full text-left text-xs border-collapse">
        <thead>
          <tr class="border-b border-slate-200 dark:border-slate-800 text-slate-500 uppercase tracking-wider text-[10px]">
            <th class="py-2 px-3">ID</th>
            <th class="py-2 px-3">Title</th>
            <th class="py-2 px-3">Category</th>
            <th class="py-2 px-3">Location</th>
            <th class="py-2 px-3">Status</th>
            <th class="py-2 px-3">Donor</th>
            <th class="py-2 px-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100 dark:divide-slate-800">
          ${items.map((i) => `
            <tr>
              <td class="py-2 px-3 font-mono text-slate-400">#${i.id}</td>
              <td class="py-2 px-3 font-bold text-slate-800 dark:text-slate-200">${escapeHtml(i.title)}</td>
              <td class="py-2 px-3">${i.category}</td>
              <td class="py-2 px-3">${escapeHtml(i.location)}</td>
              <td class="py-2 px-3"><span class="px-2 py-0.5 rounded-full font-bold text-[10px] text-white ${i.status === 'Available' ? 'bg-emerald-600' : 'bg-orange-500'}">${i.status}</span></td>
              <td class="py-2 px-3">${escapeHtml(i.donor_name)}</td>
              <td class="py-2 px-3 text-right space-x-1">
                <button onclick="updateItemStatusAdmin(${i.id}, '${i.status === 'Available' ? 'Collected' : 'Available'}')" class="px-2 py-1 bg-sky-100 text-sky-700 rounded font-semibold text-[10px] cursor-pointer">Toggle Status</button>
                <button onclick="deleteItemAdmin(${i.id})" class="px-2 py-1 bg-rose-100 text-rose-700 rounded font-semibold text-[10px] cursor-pointer">Delete</button>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;
  } else if (tab === 'volunteers') {
    const res = await fetch('/api/volunteers');
    const vols = await res.json();
    document.getElementById('cntAdminVolunteers').innerText = vols.length;

    container.innerHTML = `
      <table class="w-full text-left text-xs border-collapse">
        <thead>
          <tr class="border-b border-slate-200 dark:border-slate-800 text-slate-500 uppercase tracking-wider text-[10px]">
            <th class="py-2 px-3">ID</th>
            <th class="py-2 px-3">Name</th>
            <th class="py-2 px-3">Contact</th>
            <th class="py-2 px-3">Location</th>
            <th class="py-2 px-3">Role</th>
            <th class="py-2 px-3">Availability</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100 dark:divide-slate-800">
          ${vols.map((v) => `
            <tr>
              <td class="py-2 px-3 font-mono text-slate-400">#${v.id}</td>
              <td class="py-2 px-3 font-bold text-slate-800 dark:text-slate-200">${escapeHtml(v.name)}</td>
              <td class="py-2 px-3">${escapeHtml(v.email)}<br/>${escapeHtml(v.phone)}</td>
              <td class="py-2 px-3">${escapeHtml(v.location)}</td>
              <td class="py-2 px-3">${escapeHtml(v.role)}</td>
              <td class="py-2 px-3"><span class="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">${v.availability}</span></td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;
  } else if (tab === 'borrow') {
    const res = await fetch('/api/borrow');
    const reqs = await res.json();
    document.getElementById('cntAdminBorrow').innerText = reqs.length;

    container.innerHTML = `
      <table class="w-full text-left text-xs border-collapse">
        <thead>
          <tr class="border-b border-slate-200 dark:border-slate-800 text-slate-500 uppercase tracking-wider text-[10px]">
            <th class="py-2 px-3">ID</th>
            <th class="py-2 px-3">Requested Item</th>
            <th class="py-2 px-3">Requester Name</th>
            <th class="py-2 px-3">Phone</th>
            <th class="py-2 px-3">Address</th>
            <th class="py-2 px-3">Status</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100 dark:divide-slate-800">
          ${reqs.map((r) => `
            <tr>
              <td class="py-2 px-3 font-mono text-slate-400">#${r.id}</td>
              <td class="py-2 px-3 font-bold text-slate-800 dark:text-slate-200">${escapeHtml(r.item_title)}</td>
              <td class="py-2 px-3">${escapeHtml(r.requester_name)}</td>
              <td class="py-2 px-3">${escapeHtml(r.requester_phone)}</td>
              <td class="py-2 px-3">${escapeHtml(r.address)}</td>
              <td class="py-2 px-3"><span class="px-2 py-0.5 bg-orange-100 text-orange-800 rounded font-bold text-[10px]">${r.status}</span></td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;
  }
}

async function updateItemStatusAdmin(id, newStatus) {
  try {
    await fetch(`/api/items/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus })
    });
    showToast(`Status updated to ${newStatus}`);
    renderAdminTab('items');
    fetchItems();
  } catch (err) {
    console.error('Admin status update error:', err);
  }
}

async function deleteItemAdmin(id) {
  if (!confirm('Are you sure you want to delete this item from the database?')) return;
  try {
    await fetch(`/api/items/${id}`, { method: 'DELETE' });
    showToast('Item deleted from database');
    renderAdminTab('items');
    fetchItems();
    fetchStats();
  } catch (err) {
    console.error('Admin delete error:', err);
  }
}

// TOAST HELPER
function showToast(msg) {
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toastMsg');
  if (!toast || !toastMsg) return;

  toastMsg.innerText = msg;
  toast.classList.remove('translate-y-20', 'opacity-0');

  setTimeout(() => {
    toast.classList.add('translate-y-20', 'opacity-0');
  }, 3000);
}

// UTILITY: ESCAPE HTML
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// =========================================================
// GLOBAL FORM INPUT VALIDATION
// =========================================================

document.addEventListener('DOMContentLoaded', () => {

  // Phone fields: numbers only
  const phoneFields = [
    'itemDonorPhone',
    'borrowPhone',
    'volPhone'
  ];

  phoneFields.forEach((id) => {
    const input = document.getElementById(id);

    if (!input) return;

    input.addEventListener('input', () => {
      input.value = input.value
        .replace(/\D/g, '')
        .slice(0, 10);
    });

    input.addEventListener('blur', () => {
      if (input.value.length !== 10) {
        input.setCustomValidity(
          'Phone number must contain exactly 10 digits.'
        );
      } else {
        input.setCustomValidity('');
      }
    });
  });


  // Name fields
  const nameFields = [
    'itemDonorName',
    'borrowName',
    'volName',
    'donorName'
  ];

  nameFields.forEach((id) => {
    const input = document.getElementById(id);

    if (!input) return;

    input.addEventListener('input', () => {

      // Remove numbers and special characters
      input.value = input.value.replace(
        /[^A-Za-zÀ-ÖØ-öø-ÿ\u0900-\u097F .'-]/g,
        ''
      );

      // Remove extra spaces
      input.value = input.value.replace(/\s+/g, ' ');

      // Capitalize each word
      input.value = input.value
        .toLowerCase()
        .replace(/\b\w/g, char => char.toUpperCase());
    });

    input.addEventListener('blur', () => {

      const nameRegex =
        /^[A-Za-zÀ-ÖØ-öø-ÿ\u0900-\u097F]+(?:[ .'-][A-Za-zÀ-ÖØ-öø-ÿ\u0900-\u097F]+)*$/;

      if (!nameRegex.test(input.value.trim())) {
        input.setCustomValidity(
          'Please enter a valid name using letters only.'
        );
      } else {
        input.setCustomValidity('');
      }

    });
  });


  // Email fields
  const emailFields = [
    'volEmail',
    'donorEmail'
  ];

  emailFields.forEach((id) => {

    const input = document.getElementById(id);

    if (!input) return;

    input.addEventListener('input', () => {
      input.value = input.value.trim();
    });

    input.addEventListener('blur', () => {

      const emailRegex =
        /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

      if (!emailRegex.test(input.value.trim())) {
        input.setCustomValidity(
          'Please enter a valid email address.'
        );
      } else {
        input.setCustomValidity('');
      }

    });

  });

});