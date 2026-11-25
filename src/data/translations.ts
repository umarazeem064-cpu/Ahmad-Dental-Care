export type LanguageCode = 'en' | 'ur' | 'ar';
export type CurrencyCode = 'PKR' | 'USD' | 'GBP' | 'AED';

export interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  rateFromPKR: number;
  label: string;
}

export const CURRENCIES: Record<CurrencyCode, CurrencyConfig> = {
  PKR: { code: 'PKR', symbol: '₨', rateFromPKR: 1, label: 'PKR ₨' },
  USD: { code: 'USD', symbol: '$', rateFromPKR: 1 / 278, label: 'USD $' },
  GBP: { code: 'GBP', symbol: '£', rateFromPKR: 1 / 352, label: 'GBP £' },
  AED: { code: 'AED', symbol: 'د.إ', rateFromPKR: 1 / 75.7, label: 'AED د.إ' },
};

export const CLINIC_INFO = {
  brandName: 'Ahmed Dental Care',
  phoneDisplay: '+92 308 1991427',
  phoneTel: '+923081991427',
  whatsappNumber: '923081991427',
  email: 'appointments@ahmeddentalcare.pk',
  googleRating: '4.9',
  reviewCount: '180+',
  address: {
    en: 'Ahmed Dental Care — Main Boulevard Clinical Suite, Pakistan',
    ur: 'احمد ڈینٹل کیئر — مین بلیوارڈ کلینیکل سوٹ، پاکستان',
    ar: 'أحمد دنتال كير — الجناح الطبي في الشارع الرئيسي، باكستان',
  },
  mapsSearchUrl: 'https://www.google.com/maps/search/?api=1&query=Ahmed+Dental+Care+Pakistan',
  mapsEmbedUrl: 'https://www.google.com/maps?q=Ahmed+Dental+Care+Pakistan&output=embed',
};

export interface LocalizedText {
  en: string;
  ur: string;
  ar: string;
}

export interface UIContent {
  nav: {
    home: string;
    treatments: string;
    dentists: string;
    gallery: string;
    reviews: string;
    bookVisit: string;
  };
  utility: {
    callClinic: string;
    whatsappChat: string;
    lightMode: string;
    darkMode: string;
    languageLabel: string;
    currencyLabel: string;
  };
  hero: {
    kicker: string;
    headline: string;
    subheadline: string;
    primaryCta: string;
    secondaryCta: string;
    consultationLabel: string;
    consultationFeePKR: number;
    ratingSummary: string;
    assuranceItems: { title: string; detail: string }[];
  };
  treatmentsSection: {
    kicker: string;
    title: string;
    subtitle: string;
    filterAll: string;
    filterPreventive: string;
    filterCosmetic: string;
    filterOrtho: string;
    filterRestorative: string;
    startingFrom: string;
    sessionTimeLabel: string;
    bookThis: string;
  };
  specialistsSection: {
    kicker: string;
    title: string;
    subtitle: string;
    experienceLabel: string;
    standardsTitle: string;
    standards: { title: string; detail: string }[];
  };
  gallerySection: {
    kicker: string;
    title: string;
    subtitle: string;
  };
  bookingSection: {
    kicker: string;
    title: string;
    subtitle: string;
    fullNameLabel: string;
    fullNamePlaceholder: string;
    phoneLabel: string;
    phonePlaceholder: string;
    treatmentLabel: string;
    dateLabel: string;
    timeSlotLabel: string;
    timeSlots: string[];
    painLevelLabel: string;
    painLevels: string[];
    submitButton: string;
    whatsappInstantButton: string;
    validationError: string;
    confirmedTitle: string;
    confirmedSubtitle: string;
    sendWhatsAppButton: string;
    bookAnotherButton: string;
  };
  reviewsSection: {
    kicker: string;
    title: string;
    subtitle: string;
    verifiedLabel: string;
    timingsTitle: string;
    directionsButton: string;
    livePinButton: string;
    scheduleRows: { day: string; morning: string; evening: string }[];
  };
  footer: {
    tagline: string;
    quickLinksTitle: string;
    contactTitle: string;
    privacyPolicy: string;
    privacyTitle: string;
    privacyBody: string;
    closeLabel: string;
    rightsReserved: string;
    credit: string;
  };
}

export const UI_COPY: Record<LanguageCode, UIContent> = {
  en: {
    nav: {
      home: 'Home',
      treatments: 'Treatments',
      dentists: 'Dentists',
      gallery: 'Smile Gallery',
      reviews: 'Reviews',
      bookVisit: 'Book Visit',
    },
    utility: {
      callClinic: 'Call Clinic',
      whatsappChat: 'WhatsApp',
      lightMode: 'Light',
      darkMode: 'Dark',
      languageLabel: 'Language',
      currencyLabel: 'Currency',
    },
    hero: {
      kicker: 'Painless Modern Dentistry · Sterilized Clinical Care',
      headline: 'Gentle, painless dental care built around your comfort.',
      subheadline:
        'From ultrasonic teeth cleaning and painless root canals to clear aligners and dental implants, Ahmed Dental Care delivers calm, transparent treatment for your entire family.',
      primaryCta: 'Book Dental Appointment',
      secondaryCta: 'Chat on WhatsApp',
      consultationLabel: 'Specialist Consultation',
      consultationFeePKR: 1500,
      ratingSummary: '4.9 ★ Google Rating · 180+ Verified Patient Reviews · Autoclave Sterilized Suite',
      assuranceItems: [
        { title: '100% Class-B Autoclave', detail: 'Sealed pouched instruments for every patient' },
        { title: 'Painless Anesthesia', detail: 'Topical numbing & gentle micro-injection technique' },
        { title: 'Digital Low-Dose X-Ray', detail: 'Instant chairside diagnostics with minimal radiation' },
        { title: 'Transparent Fee Estimates', detail: 'Clear treatment plan before any procedure begins' },
      ],
    },
    treatmentsSection: {
      kicker: 'Clinical & Cosmetic Services',
      title: 'Comprehensive dental treatments under one roof.',
      subtitle:
        'Select a category below to explore procedures, estimated session durations, and starting consultation fees.',
      filterAll: 'All Treatments',
      filterPreventive: 'Preventive & Kids',
      filterCosmetic: 'Cosmetic',
      filterOrtho: 'Orthodontics',
      filterRestorative: 'Implants & RCT',
      startingFrom: 'Starting from',
      sessionTimeLabel: 'Session',
      bookThis: 'Book This Treatment',
    },
    specialistsSection: {
      kicker: 'Clinical Leadership & Hygiene',
      title: 'Experienced dental surgeons committed to calm, unhurried visits.',
      subtitle:
        'Every procedure at Ahmed Dental Care follows hospital-grade sterilization protocols and clear step-by-step communication.',
      experienceLabel: 'Experience',
      standardsTitle: 'Clinical Safety & Sterilization Protocol',
      standards: [
        {
          title: '100% Autoclave Sterilization',
          detail: 'All handpieces and surgical instruments undergo pressurized steam sterilization with chemical indicator verification.',
        },
        {
          title: 'Painless Local Anesthesia',
          detail: 'Surface desensitizing gel is applied prior to every injection so root canals and extractions remain virtually pain-free.',
        },
        {
          title: 'Digital X-Ray Precision',
          detail: 'High-definition RVG sensors reduce radiation exposure by up to 80% compared to conventional film.',
        },
      ],
    },
    gallerySection: {
      kicker: 'Patient Transformations',
      title: 'Natural, confident smiles crafted with conservative precision.',
      subtitle:
        'We prioritize tooth preservation and natural enamel harmony rather than artificial over-whitened results.',
    },
    bookingSection: {
      kicker: 'Direct Clinic Scheduling',
      title: 'Book your dental visit or confirm instantly via WhatsApp.',
      subtitle:
        'Reserve your preferred consultation slot below. Same-day emergency slots are held for acute toothache relief.',
      fullNameLabel: 'Patient Full Name',
      fullNamePlaceholder: 'e.g., Bilal Ahmed',
      phoneLabel: 'Phone / WhatsApp Number',
      phonePlaceholder: '+92 3XX XXXXXXX',
      treatmentLabel: 'Select Dental Treatment',
      dateLabel: 'Preferred Date',
      timeSlotLabel: 'Preferred Time Slot',
      timeSlots: [
        'Morning (10:00 AM – 1:00 PM)',
        'Afternoon (2:00 PM – 5:00 PM)',
        'Evening (6:00 PM – 9:30 PM)',
      ],
      painLevelLabel: 'Symptoms / Urgency Level',
      painLevels: ['Routine Checkup', 'Mild Discomfort / Sensitivity', 'Urgent Toothache'],
      submitButton: 'Confirm Appointment Request',
      whatsappInstantButton: 'Send Direct on WhatsApp',
      validationError: 'Please enter your full name, a valid phone number, and select a preferred date.',
      confirmedTitle: 'Appointment Request Ready',
      confirmedSubtitle:
        'Your visit summary has been prepared. Send it directly to our clinic reception on WhatsApp for immediate slot confirmation.',
      sendWhatsAppButton: 'Send Appointment on WhatsApp',
      bookAnotherButton: 'Edit or Book Another Visit',
    },
    reviewsSection: {
      kicker: 'Patient Feedback & Clinic Hours',
      title: 'Trusted by families for gentle hands and honest advice.',
      subtitle: 'Read verified patient experiences and view our morning and evening consultation schedule.',
      verifiedLabel: 'Verified Google Patient Review',
      timingsTitle: 'Weekly Consultation Hours',
      directionsButton: 'Get Directions on Google Maps',
      livePinButton: 'Request Clinic Pin on WhatsApp',
      scheduleRows: [
        { day: 'Monday – Thursday', morning: '10:00 AM – 2:30 PM', evening: '4:30 PM – 9:30 PM' },
        { day: 'Friday', morning: '10:00 AM – 1:00 PM', evening: '4:30 PM – 9:30 PM' },
        { day: 'Saturday', morning: '10:00 AM – 2:30 PM', evening: '4:30 PM – 9:30 PM' },
        { day: 'Sunday', morning: 'On-Call Emergency', evening: 'Prior Appointment Only' },
      ],
    },
    footer: {
      tagline: 'Ethical, painless preventive and cosmetic dentistry for individuals and families.',
      quickLinksTitle: 'Clinic Navigation',
      contactTitle: 'Appointments & Location',
      privacyPolicy: 'Privacy Policy',
      privacyTitle: 'Patient Privacy & Confidentiality',
      privacyBody:
        'Ahmed Dental Care treats all patient consultation requests, phone numbers, and symptom details as strictly confidential medical inquiries. Submitted form details are prepared locally in your browser to send directly to our clinic WhatsApp desk (+92 308 1991427) without third-party advertising trackers.',
      closeLabel: 'Close',
      rightsReserved: '© 2026 Ahmed Dental Care. All rights reserved.',
      credit: 'Patient Care Desk: +92 308 1991427',
    },
  },
  ur: {
    nav: {
      home: 'ہوم',
      treatments: 'علاج',
      dentists: 'ڈاکٹرز',
      gallery: 'مسکراہٹ گیلری',
      reviews: 'تاثرات',
      bookVisit: 'اپائنٹمنٹ بک کریں',
    },
    utility: {
      callClinic: 'کلینک کال',
      whatsappChat: 'واٹس ایپ',
      lightMode: 'روشن',
      darkMode: 'تاریک',
      languageLabel: 'زبان',
      currencyLabel: 'کرنسی',
    },
    hero: {
      kicker: 'بے درد جدید ڈینٹل کیئر · مکمل جراثیم کش کلینک',
      headline: 'آپ کے آرام اور اعتماد کے مطابق نرم اور بے درد دانتوں کا علاج۔',
      subheadline:
        'الٹراسونک اسکیلنگ، بے درد روٹ کینال، کلیئر الائنرز اور ڈینٹل امپلانٹس تک، احمد ڈینٹل کیئر پورے خاندان کے لیے شفاف اور محفوظ علاج فراہم کرتا ہے۔',
      primaryCta: 'ڈینٹل اپائنٹمنٹ بک کریں',
      secondaryCta: 'واٹس ایپ پر رابطہ کریں',
      consultationLabel: 'ماہر معائنہ فیس',
      consultationFeePKR: 1500,
      ratingSummary: '4.9 ★ گوگل ریٹنگ · 180+ تصدیق شدہ مریضوں کے تاثرات · آٹوکلیو جراثیم کش آلات',
      assuranceItems: [
        { title: '100% کلاس بی آٹوکلیو', detail: 'ہر مریض کے لیے الگ سیل شدہ جراثیم کش آلات' },
        { title: 'بے درد اینستھیزیا', detail: 'درد سے پاک سن کرنے والی جدید تکنیک' },
        { title: 'ڈیجیٹل لو ڈوز ایکسرے', detail: 'فوری اور محفوظ تشخیص' },
        { title: 'شفاف فیس تخمینہ', detail: 'علاج شروع کرنے سے پہلے واضح فیس' },
      ],
    },
    treatmentsSection: {
      kicker: 'کلینیکل اور کاسمیٹک خدمات',
      title: 'دانتوں کے تمام جدید علاج ایک ہی چھت تلے۔',
      subtitle: 'علاج کی تفصیلات، دورانیہ اور ابتدائی فیس دیکھنے کے لیے زمرہ منتخب کریں۔',
      filterAll: 'تمام علاج',
      filterPreventive: 'صفائی اور بچے',
      filterCosmetic: 'کاسمیٹک',
      filterOrtho: 'بریسز اور الائنرز',
      filterRestorative: 'امپلانٹس اور آر سی ٹی',
      startingFrom: 'ابتدائی فیس',
      sessionTimeLabel: 'دورانیہ',
      bookThis: 'یہ علاج بک کریں',
    },
    specialistsSection: {
      kicker: 'ماہر ڈینٹل سرجنز اور صفائی کا معیار',
      title: 'تجربہ کار ڈاکٹرز جو ہر وزٹ کو پُرسکون بناتے ہیں۔',
      subtitle: 'احمد ڈینٹل کیئر میں ہر علاج بین الاقوامی جراثیم کش اصولوں کے مطابق کیا جاتا ہے۔',
      experienceLabel: 'تجربہ',
      standardsTitle: 'کلینیکل سیفٹی اور سٹرلائزیشن پروٹوکول',
      standards: [
        {
          title: '100% آٹوکلیو سٹرلائزیشن',
          detail: 'تمام آلات پریشر بھاپ سے جراثیم کش کیے جاتے ہیں اور سیل شدہ پیک میں کھولے جاتے ہیں۔',
        },
        {
          title: 'بے درد علاج کی تکنیک',
          detail: 'انجیکشن سے پہلے ٹاپیکل سن کرنے والی جیل استعمال کی جاتی ہے۔',
        },
        {
          title: 'ڈیجیٹل ایکسرے سہولت',
          detail: 'کم تابکاری کے ساتھ فوری اور درست تشخیص۔',
        },
      ],
    },
    gallerySection: {
      kicker: 'مریضوں کے نتائج',
      title: 'قدرتی اور پُراعتماد مسکراہٹ کی بحالی۔',
      subtitle: 'ہم قدرتی دانتوں کی حفاظت اور متوازن خوبصورتی کو ترجیح دیتے ہیں۔',
    },
    bookingSection: {
      kicker: 'براہ راست اپائنٹمنٹ',
      title: 'اپنا وزٹ بک کریں یا واٹس ایپ پر فوری تصدیق حاصل کریں۔',
      subtitle: 'نیچے اپنی تفصیلات درج کریں۔ شدید درد کے لیے ہنگامی سلاٹس دستیاب ہیں۔',
      fullNameLabel: 'مریض کا مکمل نام',
      fullNamePlaceholder: 'مثلاً بلال احمد',
      phoneLabel: 'فون / واٹس ایپ نمبر',
      phonePlaceholder: '+92 3XX XXXXXXX',
      treatmentLabel: 'علاج منتخب کریں',
      dateLabel: 'پسندیدہ تاریخ',
      timeSlotLabel: 'پسندیدہ وقت',
      timeSlots: ['صبح (10:00 AM – 1:00 PM)', 'دوپہر (2:00 PM – 5:00 PM)', 'شام (6:00 PM – 9:30 PM)'],
      painLevelLabel: 'علامات / ہنگامی نوعیت',
      painLevels: ['معمول کا معائنہ', 'ہلکا درد / حساسیت', 'شدید دانت درد (ہنگامی)'],
      submitButton: 'اپائنٹمنٹ کی تصدیق کریں',
      whatsappInstantButton: 'واٹس ایپ پر بھیجیں',
      validationError: 'براہ کرم اپنا مکمل نام، درست فون نمبر اور تاریخ درج کریں۔',
      confirmedTitle: 'اپائنٹمنٹ کی تفصیلات تیار ہیں',
      confirmedSubtitle: 'فوری وقت کی تصدیق کے لیے نیچے دیے گئے بٹن سے واٹس ایپ پر تفصیلات بھیجیں۔',
      sendWhatsAppButton: 'واٹس ایپ پر اپائنٹمنٹ بھیجیں',
      bookAnotherButton: 'دوبارہ ترمیم کریں',
    },
    reviewsSection: {
      kicker: 'مریضوں کے تاثرات اور اوقات کار',
      title: 'نرم ہاتھوں اور دیانتدار مشورے پر خاندانوں کا اعتماد۔',
      subtitle: 'تصدیق شدہ مریضوں کے تجربات اور کلینک کے اوقات کار ملاحظہ کریں۔',
      verifiedLabel: 'تصدیق شدہ گوگل ریویو',
      timingsTitle: 'ہفتہ وار کلینک اوقات',
      directionsButton: 'گوگل میپس پر راستہ دیکھیں',
      livePinButton: 'واٹس ایپ پر لوکیشن پن منگوائیں',
      scheduleRows: [
        { day: 'پیر تا جمعرات', morning: '10:00 AM – 2:30 PM', evening: '4:30 PM – 9:30 PM' },
        { day: 'جمعہ', morning: '10:00 AM – 1:00 PM', evening: '4:30 PM – 9:30 PM' },
        { day: 'ہفتہ', morning: '10:00 AM – 2:30 PM', evening: '4:30 PM – 9:30 PM' },
        { day: 'اتوار', morning: 'ایمرجنسی آن کال', evening: 'صرف پیشگی اپائنٹمنٹ' },
      ],
    },
    footer: {
      tagline: 'افراد اور خاندانوں کے لیے محفوظ، بے درد اور معیاری ڈینٹل کیئر۔',
      quickLinksTitle: 'اہم لنکس',
      contactTitle: 'رابطہ اور پتہ',
      privacyPolicy: 'پرائیویسی پالیسی',
      privacyTitle: 'مریضوں کی رازداری کی پالیسی',
      privacyBody:
        'احمد ڈینٹل کیئر مریضوں کے تمام کوائف اور فون نمبرز کو مکمل طور پر خفیہ رکھتا ہے۔ فارم کی معلومات صرف کلینک کے واٹس ایپ ڈیسک (+92 308 1991427) پر اپائنٹمنٹ طے کرنے کے لیے استعمال ہوتی ہیں۔',
      closeLabel: 'بند کریں',
      rightsReserved: '© 2026 احمد ڈینٹل کیئر۔ جملہ حقوق محفوظ ہیں۔',
      credit: 'اپائنٹمنٹ ڈیسک: +92 308 1991427',
    },
  },
  ar: {
    nav: {
      home: 'الرئيسية',
      treatments: 'العلاجات',
      dentists: 'الأطباء',
      gallery: 'معرض الابتسامة',
      reviews: 'التقييمات',
      bookVisit: 'احجز موعداً',
    },
    utility: {
      callClinic: 'اتصل بالعيادة',
      whatsappChat: 'واتساب',
      lightMode: 'فاتح',
      darkMode: 'داكن',
      languageLabel: 'اللغة',
      currencyLabel: 'العملة',
    },
    hero: {
      kicker: 'طب أسنان حديث بدون ألم · تعقيم طبي متكامل',
      headline: 'رعاية أسنان لطيفة وبدون ألم مصممة لراحتك وثقتك.',
      subheadline:
        'من تنظيف الأسنان بالموجات فوق الصوتية وعلاج الجذور بدون ألم إلى التقويم الشفاف وزراعة الأسنان، يقدم مركز أحمد دنتال كير رعاية موثوقة لجميع أفراد العائلة.',
      primaryCta: 'احجز موعد أسنان',
      secondaryCta: 'تواصل عبر واتساب',
      consultationLabel: 'رسوم الكشف الاستشاري',
      consultationFeePKR: 1500,
      ratingSummary: '4.9 ★ تقييم جوجل · أكثر من 180 مراجعة موثقة · تعقيم أوتوكلاف كامل',
      assuranceItems: [
        { title: 'تعقيم أوتوكلاف فئة B', detail: 'أدوات معقمة ومغلفة لكل مريض على حدة' },
        { title: 'تخدير بدون ألم', detail: 'جل مخدر موضعي وتقنية حقن لطيفة للغاية' },
        { title: 'أشعة رقمية منخفضة الجرعة', detail: 'تشخيص فوري دقيق بأقل تعرض إشعاعي' },
        { title: 'شفافية تامة في الأسعار', detail: 'خطة علاج وتكلفة واضحة قبل بدء الإجراء' },
      ],
    },
    treatmentsSection: {
      kicker: 'الخدمات السريرية والتجميلية',
      title: 'علاجات أسنان متكاملة تحت سقف واحد.',
      subtitle: 'اختر الفئة أدناه لاستعراض الإجراءات ومدة الجلسة والأسعار التقديرية.',
      filterAll: 'جميع العلاجات',
      filterPreventive: 'الوقاية والأطفال',
      filterCosmetic: 'تجميل الأسنان',
      filterOrtho: 'تقويم الأسنان',
      filterRestorative: 'الزراعة وعلاج الجذور',
      startingFrom: 'يبدأ من',
      sessionTimeLabel: 'المدة',
      bookThis: 'احجز هذا العلاج',
    },
    specialistsSection: {
      kicker: 'الفريق الطبي ومعايير التعقيم',
      title: 'أطباء أسنان ذوو خبرة يحرصون على زيارة هادئة ومريحة.',
      subtitle: 'يتبع مركز أحمد دنتال كير أعلى معايير التعقيم العالمية مع شرح واضح لكل خطوة.',
      experienceLabel: 'الخبرة',
      standardsTitle: 'بروتوكول السلامة والتعقيم السريري',
      standards: [
        {
          title: 'تعقيم أوتوكلاف 100%',
          detail: 'تخضع جميع الأدوات الجراحية للتعقيم بالبخار المضغوط مع مؤشرات تحقق معتمدة.',
        },
        {
          title: 'تخدير موضعي بدون ألم',
          detail: 'نستخدم مخدراً سطحياً قبل أي إجراء لضمان راحة المريض الكاملة.',
        },
        {
          title: 'أشعة رقمية عالية الدقة',
          detail: 'تقليل الإشعاع بنسبة تصل إلى 80% مع رؤية فورية واضحة.',
        },
      ],
    },
    gallerySection: {
      kicker: 'نتائج الابتسامة',
      title: 'ابتسامات طبيعية واثقة مصممة بدقة تحفظ مينا الأسنان.',
      subtitle: 'نركز على النتائج الطبيعية المتناسقة مع الحفاظ على صحة الأسنان الأصلية.',
    },
    bookingSection: {
      kicker: 'حجز المواعيد المباشر',
      title: 'احجز زيارتك الآن أو أكد الموعد فوراً عبر واتساب.',
      subtitle: 'املأ بياناتك أدناه، مع توفر مواعيد طارئة في نفس اليوم لحالات الألم الحاد.',
      fullNameLabel: 'الاسم الكامل للمريض',
      fullNamePlaceholder: 'مثال: بلال أحمد',
      phoneLabel: 'رقم الهاتف / واتساب',
      phonePlaceholder: '+92 3XX XXXXXXX',
      treatmentLabel: 'اختر العلاج المطلوب',
      dateLabel: 'التاريخ المفضل',
      timeSlotLabel: 'الفترة الزمنية المفضلة',
      timeSlots: ['الصباح (10:00 ص – 1:00 م)', 'الظهيرة (2:00 م – 5:00 م)', 'المساء (6:00 م – 9:30 م)'],
      painLevelLabel: 'الأعراض / مستوى الاستعجال',
      painLevels: ['فحص دوري روتيني', 'انزعاج خفيف / حساسية', 'ألم أسنان عاجل'],
      submitButton: 'تأكيد طلب الموعد',
      whatsappInstantButton: 'إرسال مباشر عبر واتساب',
      validationError: 'يرجى إدخال الاسم الكامل ورقم هاتف صحيح واختيار التاريخ.',
      confirmedTitle: 'ملخص الموعد جاهز',
      confirmedSubtitle: 'أرسل التفاصيل مباشرة إلى استقبال العيادة عبر واتساب لتأكيد الموعد فوراً.',
      sendWhatsAppButton: 'إرسال الموعد عبر واتساب',
      bookAnotherButton: 'تعديل أو حجز موعد آخر',
    },
    reviewsSection: {
      kicker: 'آراء المرضى وساعات العمل',
      title: 'ثقة العائلات بفضل اللطف والشفافية الطبية.',
      subtitle: 'اطلع على تجارب المرضى الموثقة وجدول ساعات العمل الصباحية والمسائية.',
      verifiedLabel: 'تقييم جوجل موثق',
      timingsTitle: 'مواعيد العيادة الأسبوعية',
      directionsButton: 'الحصول على الاتجاهات في خرائط جوجل',
      livePinButton: 'طلب موقع العيادة عبر واتساب',
      scheduleRows: [
        { day: 'الإثنين – الخميس', morning: '10:00 AM – 2:30 PM', evening: '4:30 PM – 9:30 PM' },
        { day: 'الجمعة', morning: '10:00 AM – 1:00 PM', evening: '4:30 PM – 9:30 PM' },
        { day: 'السبت', morning: '10:00 AM – 2:30 PM', evening: '4:30 PM – 9:30 PM' },
        { day: 'الأحد', morning: 'حالات الطوارئ', evening: 'بموعد مسبق فقط' },
      ],
    },
    footer: {
      tagline: 'طب أسنان وقائي وتجميلي بدون ألم للأفراد والعائلات.',
      quickLinksTitle: 'روابط العيادة',
      contactTitle: 'المواعيد والموقع',
      privacyPolicy: 'سياسة الخصوصية',
      privacyTitle: 'خصوصية وسرية بيانات المرضى',
      privacyBody:
        'يتعامل مركز أحمد دنتال كير مع جميع طلبات المواعيد وأرقام الهواتف بسرية طبية تامة. يتم تجهيز تفاصيل الحجز محلياً لإرسالها مباشرة إلى مكتب واتساب العيادة (+92 308 1991427).',
      closeLabel: 'إغلاق',
      rightsReserved: '© 2026 أحمد دنتال كير. جميع الحقوق محفوظة.',
      credit: 'مكتب المواعيد: +92 308 1991427',
    },
  },
};
