import { LocalizedText } from './translations';

export type TreatmentCategory = 'preventive' | 'cosmetic' | 'ortho' | 'restorative';

export interface TreatmentItem {
  id: string;
  category: TreatmentCategory;
  categoryLabel: LocalizedText;
  title: LocalizedText;
  description: LocalizedText;
  duration: LocalizedText;
  baseFeePKR: number;
  image: string;
}

export interface DentistProfile {
  id: string;
  name: LocalizedText;
  credentials: string;
  role: LocalizedText;
  experience: LocalizedText;
  approach: LocalizedText;
  image: string;
}

export interface SmileCase {
  id: string;
  procedure: LocalizedText;
  duration: LocalizedText;
  summary: LocalizedText;
  image: string;
}

export interface PatientReview {
  id: string;
  reviewerName: string;
  visitType: LocalizedText;
  rating: number;
  dateLabel: LocalizedText;
  quote: LocalizedText;
  avatar: string;
}

export const TREATMENTS: TreatmentItem[] = [
  {
    id: 'scaling-polishing',
    category: 'preventive',
    categoryLabel: {
      en: 'Preventive Care',
      ur: 'حفاظتی صفائی',
      ar: 'الرعاية الوقائية',
    },
    title: {
      en: 'Scaling & Polishing (Teeth Cleaning)',
      ur: 'اسکیلنگ اور پالشنگ (دانتوں کی صفائی)',
      ar: 'تنظيف الأسنان وإزالة الجير والتلميع',
    },
    description: {
      en: 'Gentle ultrasonic removal of plaque, tartar, and coffee or tea stains followed by smooth enamel polishing and gum health evaluation.',
      ur: 'الٹراسونک مشین کے ذریعے دانتوں سے میل، پتھری اور داغ دھبے کی نرم صفائی اور مسوڑھوں کا مکمل معائنہ۔',
      ar: 'إزالة لطيفة للترسبات الجيرية والتصبغات بالموجات فوق الصوتية مع تلميع المينا وفحص صحة اللثة.',
    },
    duration: {
      en: '35–45 mins',
      ur: '35 تا 45 منٹ',
      ar: '35–45 دقيقة',
    },
    baseFeePKR: 4500,
    image: '/src/assets/images/treatment_scaling_1795599580813.jpg',
  },
  {
    id: 'teeth-whitening',
    category: 'cosmetic',
    categoryLabel: {
      en: 'Cosmetic Dentistry',
      ur: 'کاسمیٹک ڈینٹسٹری',
      ar: 'تجميل الأسنان',
    },
    title: {
      en: 'Teeth Whitening & Smile Makeover',
      ur: 'دانتوں کی سفیدی اور اسمائل میک اوور',
      ar: 'تبييض الأسنان وتصميم الابتسامة',
    },
    description: {
      en: 'Sensitivity-safe LED whitening and ultra-thin porcelain veneers tailored to brighten natural shade without harming tooth enamel.',
      ur: 'دانتوں کی حساسیت سے محفوظ جدید ایل ای ڈی وائٹننگ اور قدرتی مسکراہٹ کے لیے باریک وینیئرز۔',
      ar: 'تبييض آمن بتقنية LED يحمي من الحساسية مع قشور تجميلية رقيقة لإشراقة طبيعية متناسقة.',
    },
    duration: {
      en: '60 mins',
      ur: '60 منٹ',
      ar: '60 دقيقة',
    },
    baseFeePKR: 18000,
    image: '/src/assets/images/treatment_whitening_1795599582053.jpg',
  },
  {
    id: 'braces-aligners',
    category: 'ortho',
    categoryLabel: {
      en: 'Orthodontics',
      ur: 'آرتھوڈانٹکس',
      ar: 'تقويم الأسنان',
    },
    title: {
      en: 'Braces & Clear Aligners',
      ur: 'بریسز اور کلیئر الائنرز',
      ar: 'التقويم المعدني والشفاف',
    },
    description: {
      en: 'Removable invisible clear aligners and low-profile ceramic or metal braces planned with 3D digital bite scanning.',
      ur: 'نہ نظر آنے والے شفاف الائنرز اور جدید سیرامک یا میٹل بریسز جو تھری ڈی اسکین سے تیار کیے جاتے ہیں۔',
      ar: 'قوالب تقويم شفافة قابلة للإزالة وتقويم خزفي أو معدني مريح مخطط بالمسح الرقمي ثلاثي الأبعاد.',
    },
    duration: {
      en: '45 min scan & consult',
      ur: '45 منٹ اسکین اور پلان',
      ar: '45 دقيقة فحص ومسح',
    },
    baseFeePKR: 85000,
    image: '/src/assets/images/treatment_aligners_1795599582678.jpg',
  },
  {
    id: 'dental-implants',
    category: 'restorative',
    categoryLabel: {
      en: 'Implants & Prosthetics',
      ur: 'امپلانٹس اور کراؤنز',
      ar: 'الزراعة والتركيبات',
    },
    title: {
      en: 'Dental Implants & Zirconia Crowns',
      ur: 'ڈینٹل امپلانٹس اور زرکونیا کراؤنز',
      ar: 'زراعة الأسنان وتيجان الزيركونيا',
    },
    description: {
      en: 'Biocompatible titanium root replacements and shade-matched monolithic zirconia crowns or bridges for natural chewing strength.',
      ur: 'مضبوط ٹائٹینیم امپلانٹس اور قدرتی رنگ کے زرکونیا کراؤنز یا برجز جو اصلی دانتوں جیسا احساس دیتے ہیں۔',
      ar: 'غرسات تيتانيوم حيوية متوافقة وتيجان وجسور زيركونيا مطابقة للون الطبيعي لاستعادة قوة المضغ.',
    },
    duration: {
      en: '60–90 mins',
      ur: '60 تا 90 منٹ',
      ar: '60–90 دقيقة',
    },
    baseFeePKR: 65000,
    image: '/src/assets/images/treatment_implants_1795599581489.jpg',
  },
  {
    id: 'root-canal',
    category: 'restorative',
    categoryLabel: {
      en: 'Endodontics',
      ur: 'روٹ کینال علاج',
      ar: 'علاج الجذور',
    },
    title: {
      en: 'Painless Root Canal Treatment (RCT)',
      ur: 'بے درد روٹ کینال علاج (RCT)',
      ar: 'علاج جذور الأسنان بدون ألم',
    },
    description: {
      en: 'Single-sitting rotary endodontics performed under topical and deep local numbing with digital apex length verification.',
      ur: 'جدید روٹری آلات اور مکمل بے حسی کے ساتھ ایک ہی نشست میں بے درد روٹ کینال اور ڈیجیٹل ایکسرے تصدیق۔',
      ar: 'علاج عصب دقيق في جلسة واحدة تحت تخدير موضعي كامل وبمساعدة الأشعة الرقمية الفورية.',
    },
    duration: {
      en: '45–60 mins',
      ur: '45 تا 60 منٹ',
      ar: '45–60 دقيقة',
    },
    baseFeePKR: 12000,
    image: '/src/assets/images/treatment_rct_1795599681084.jpg',
  },
  {
    id: 'wisdom-pediatric',
    category: 'preventive',
    categoryLabel: {
      en: 'Oral Surgery & Kids',
      ur: 'سرجری اور بچوں کا علاج',
      ar: 'الجراحة وطب أسنان الأطفال',
    },
    title: {
      en: 'Wisdom Tooth & Pediatric Dentistry',
      ur: 'عقل داڑھ اور بچوں کا ڈینٹل علاج',
      ar: 'خلع ضرس العقل وطب أسنان الأطفال',
    },
    description: {
      en: 'Atraumatic impacted wisdom tooth removal alongside calm, child-friendly checkups, fluoride varnish, and fissure sealants.',
      ur: 'عقل داڑھ کی آرام دہ سرجری اور بچوں کے لیے دوستانہ ماحول میں دانتوں کی حفاظت اور فلورائیڈ کیئر۔',
      ar: 'خلع جراحي لطيف لضرس العقل وفحوصات ودية للأطفال مع تطبيق الفلورايد وحشوات الحماية.',
    },
    duration: {
      en: '30–50 mins',
      ur: '30 تا 50 منٹ',
      ar: '30–50 دقيقة',
    },
    baseFeePKR: 6000,
    image: '/src/assets/images/treatment_pediatric_1795599583366.jpg',
  },
];

export const DENTISTS: DentistProfile[] = [
  {
    id: 'dr-zayan-khan',
    name: {
      en: 'Dr. Zayan Khan',
      ur: 'ڈاکٹر زيان خان',
      ar: 'د. زيان خان',
    },
    credentials: 'BDS, FCPS (Oral & Maxillofacial Surgery)',
    role: {
      en: 'Senior Dental Surgeon & Implantologist — Ahmed Dental Care',
      ur: 'سینئر ڈینٹل سرجن اور امپلانٹ ماہر — احمد ڈینٹل کیئر',
      ar: 'جراح أسنان أول وأخصائي زراعة — أحمد دنتال كير',
    },
    experience: {
      en: '12+ Years Clinical Experience',
      ur: '12+ سال کا کلینیکل تجربہ',
      ar: 'خبرة سريرية تتجاوز 12 عاماً',
    },
    approach: {
      en: 'Specializes in painless single-sitting root canals, atraumatic wisdom tooth surgery, and guided dental implants with unhurried patient explanations.',
      ur: 'بے درد روٹ کینال، عقل داڑھ کی سرجری اور ڈینٹل امپلانٹس میں مہارت، ہر مریض کو تسلی بخش مشاورت کے ساتھ۔',
      ar: 'متخصص في علاج الجذور بدون ألم، جراحة ضرس العقل، وزراعة الأسنان الموجهة مع شرح هادئ ومفصل للمرضى.',
    },
    image: '/src/assets/images/dentist_dr_ahmed_1795599584153.jpg',
  },
  {
    id: 'dr-zoya-khan',
    name: {
      en: 'Dr. Zoya Khan',
      ur: 'ڈاکٹر زویا خان',
      ar: 'د. زويا خان',
    },
    credentials: 'BDS, MDS (Orthodontics & Cosmetic Dentistry)',
    role: {
      en: 'Cosmetic Dentist & Clear Aligner Specialist — Ahmed Dental Care',
      ur: 'کاسمیٹک ڈینٹسٹ اور آرتھوڈانٹک ماہر — احمد ڈینٹل کیئر',
      ar: 'أخصائية تجميل الأسنان والتقويم الشفاف — أحمد دنتال كير',
    },
    experience: {
      en: '9+ Years Clinical Experience',
      ur: '9+ سال کا کلینیکل تجربہ',
      ar: 'خبرة سريرية تتجاوز 9 سنوات',
    },
    approach: {
      en: 'Focuses on conservative smile design, digital clear aligner therapy, sensitivity-free whitening, and gentle pediatric preventive care.',
      ur: 'قدرتی اسمائل ڈیزائن، کلیئر الائنرز، حساسیت سے پاک وائٹننگ اور بچوں کے دوستانہ علاج کی ماہر۔',
      ar: 'تركز على تصميم الابتسامة المحافظ، التقويم الشفاف الرقمي، التبييض اللطيف، ورعاية أسنان الأطفال.',
    },
    image: '/src/assets/images/dentist_dr_ayesha_1795599584068.jpg',
  },
];

export const SMILE_CASES: SmileCase[] = [
  {
    id: 'case-aligner-whitening',
    procedure: {
      en: 'Clear Aligners + Enamel Polishing',
      ur: 'کلیئر الائنرز اور اینامل پالشنگ',
      ar: 'تقويم شفاف وتلميع المينا',
    },
    duration: {
      en: '7 Months · Non-Extraction Alignment',
      ur: '7 ماہ · دانت نکالے بغیر سیدھا پن',
      ar: '7 أشهر · تقويم بدون خلع',
    },
    summary: {
      en: 'Closed anterior spacing and rotated lower incisors with sequential clear aligners, finished with subtle shade brightening.',
      ur: 'دانتوں کے درمیانی خلا کو کلیئر الائنرز کے ذریعے قدرتی انداز میں برابر کیا گیا۔',
      ar: 'إغلاق الفراغات الأمامية وتصحيح الاصطفاف باستخدام القوالب الشفافة مع تفتيح لطيف.',
    },
    image: '/src/assets/images/smile_gallery_one_1795599680407.jpg',
  },
  {
    id: 'case-veneers-smile',
    procedure: {
      en: 'Minimal-Prep Ceramic Veneers & Whitening',
      ur: 'باریک سیرامک وینیئرز اور وائٹننگ',
      ar: 'عدسات خزفية رقيقة وتبييض',
    },
    duration: {
      en: '2 Visits · Natural Enamel Shade Match',
      ur: '2 وزٹس · قدرتی رنگ کے مطابق',
      ar: 'زيارتان · تطابق لوني طبيعي',
    },
    summary: {
      en: 'Restored chipped upper lateral edges and uneven enamel symmetry while keeping full natural translucency.',
      ur: 'ٹوٹے ہوئے کناروں اور غیر متوازن مسکراہٹ کو قدرتی شفافیت کے ساتھ بحال کیا گیا۔',
      ar: 'ترميم الحواف المكسورة وتوحيد تناسق الابتسامة مع الحفاظ على الشفافية الطبيعية للأسنان.',
    },
    image: '/src/assets/images/smile_gallery_two_1795599584479.jpg',
  },
];

export const PATIENT_REVIEWS: PatientReview[] = [
  {
    id: 'review-hamza',
    reviewerName: 'Hamza Tariq',
    visitType: {
      en: 'Painless Root Canal & Crown',
      ur: 'بے درد روٹ کینال اور کراؤن',
      ar: 'علاج جذور وتاج زيركونيا',
    },
    rating: 5,
    dateLabel: {
      en: '2 weeks ago',
      ur: '2 ہفتے قبل',
      ar: 'منذ أسبوعين',
    },
    quote: {
      en: 'I walked in terrified of root canal pain, but the numbing gel and calm explanation made the entire 45-minute visit effortless. Cleanest clinic instruments I have seen.',
      ur: 'مجھے روٹ کینال کے درد سے بہت خوف تھا لیکن سن کرنے والی جیل اور ڈاکٹر کے پُرسکون انداز سے بالکل درد محسوس نہیں ہوا۔ صفائی کا معیار بہترین ہے۔',
      ar: 'كنت متوتراً جداً قبل علاج العصب، لكن التخدير الموضعي والشرح الهادئ جعلا الجلسة مريحة تماماً دون أي ألم، والنظافة ممتازة.',
    },
    avatar: '/src/assets/images/reviewer_avatar_one_1795599680389.jpg',
  },
  {
    id: 'review-sana',
    reviewerName: 'Sana Mahmood',
    visitType: {
      en: 'Scaling, Polishing & Whitening',
      ur: 'اسکیلنگ، پالشنگ اور وائٹننگ',
      ar: 'تنظيف وتلميع وتبييض',
    },
    rating: 5,
    dateLabel: {
      en: '1 month ago',
      ur: '1 ماہ قبل',
      ar: 'منذ شهر',
    },
    quote: {
      en: 'Booked via WhatsApp and got seen right on time. Zero pushy upselling—Dr. Zoya walked me through my digital X-ray first and my teeth felt spotless with zero sensitivity.',
      ur: 'واٹس ایپ پر وقت لیا اور عین وقت پر معائنہ ہوا۔ ڈاکٹر زویا نے پہلے ڈیجیٹل ایکسرے دکھا کر تسلی بخش رہنمائی کی۔',
      ar: 'حجزت عبر واتساب ودخلت في الموعد تماماً. شرحت الدكتورة زويا الأشعة الرقمية بوضوح وكانت النتيجة رائعة بدون حساسية.',
    },
    avatar: '/src/assets/images/reviewer_avatar_two_1795599584449.jpg',
  },
  {
    id: 'review-tariq',
    reviewerName: 'Tariq Mehmood',
    visitType: {
      en: 'Dental Implant & Family Checkup',
      ur: 'ڈینٹل امپلانٹ اور فیملی چیک اپ',
      ar: 'زراعة أسنان وفحص عائلي',
    },
    rating: 5,
    dateLabel: {
      en: '3 months ago',
      ur: '3 ماہ قبل',
      ar: 'منذ 3 أشهر',
    },
    quote: {
      en: 'Got a lower molar implant placed by Dr. Zayan Khan and now bring my grandchildren here as well. Every instrument pouch is opened fresh in front of the patient.',
      ur: 'ڈاکٹر زيان خان سے امپلانٹ کروایا اور اب پورا خاندان یہیں آتا ہے۔ ہر آلہ مریض کے سامنے سیل پیک سے کھولا جاتا ہے۔',
      ar: 'أجريت زراعة ضرس لدى د. زيان خان وأصبحت عائلتي كلها تراجع هنا. تفتح الأدوات المعقمة المغلفة أمام المريض مباشرة.',
    },
    avatar: '/src/assets/images/reviewer_avatar_three_1795599607582.jpg',
  },
];
