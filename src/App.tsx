import { FormEvent, useEffect, useMemo, useState } from 'react';
import {
  Calendar,
  CheckCircle2,
  Clock,
  ExternalLink,
  Globe,
  MapPin,
  Menu,
  MessageCircle,
  Moon,
  Phone,
  ShieldCheck,
  Sparkles,
  Star,
  Sun,
  X,
} from 'lucide-react';
import { ClinicalImage } from './components/ClinicalImage';
import {
  DENTISTS,
  PATIENT_REVIEWS,
  SMILE_CASES,
  TREATMENTS,
  TreatmentCategory,
} from './data/clinicRecords';
import {
  CLINIC_INFO,
  CURRENCIES,
  CurrencyCode,
  LanguageCode,
  UI_COPY,
} from './data/translations';

type FilterOption = 'all' | TreatmentCategory;

interface BookingDraft {
  fullName: string;
  phone: string;
  treatmentId: string;
  preferredDate: string;
  timeSlot: string;
  painLevel: string;
}

function getDefaultDateString(): string {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow.toISOString().split('T')[0];
}

function getTodayDateString(): string {
  return new Date().toISOString().split('T')[0];
}

export default function App() {
  const [isPreloaderVisible, setIsPreloaderVisible] = useState(true);
  const [isPreloaderFading, setIsPreloaderFading] = useState(false);

  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [lang, setLang] = useState<LanguageCode>('en');
  const [currency, setCurrency] = useState<CurrencyCode>('PKR');
  const [activeFilter, setActiveFilter] = useState<FilterOption>('all');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [privacyModalOpen, setPrivacyModalOpen] = useState(false);

  const copy = UI_COPY[lang];
  const isRtl = lang === 'ur' || lang === 'ar';

  const [booking, setBooking] = useState<BookingDraft>(() => ({
    fullName: '',
    phone: '',
    treatmentId: TREATMENTS[0].id,
    preferredDate: getDefaultDateString(),
    timeSlot: UI_COPY.en.bookingSection.timeSlots[0],
    painLevel: UI_COPY.en.bookingSection.painLevels[0],
  }));

  const [formError, setFormError] = useState<string | null>(null);
  const [confirmedBooking, setConfirmedBooking] = useState<BookingDraft | null>(null);

  useEffect(() => {
    const fadeTimer = window.setTimeout(() => setIsPreloaderFading(true), 320);
    const hideTimer = window.setTimeout(() => setIsPreloaderVisible(false), 720);
    return () => {
      window.clearTimeout(fadeTimer);
      window.clearTimeout(hideTimer);
    };
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
    setBooking((prev) => ({
      ...prev,
      timeSlot: UI_COPY[lang].bookingSection.timeSlots[0],
      painLevel: UI_COPY[lang].bookingSection.painLevels[0],
    }));
  }, [lang, isRtl]);

  const formatFee = (amountPKR: number): string => {
    const cfg = CURRENCIES[currency];
    const converted = amountPKR * cfg.rateFromPKR;
    if (currency === 'PKR') {
      return `${cfg.symbol} ${Math.round(converted).toLocaleString('en-US')}`;
    }
    if (converted >= 100) {
      return `${cfg.symbol}${Math.round(converted).toLocaleString('en-US')}`;
    }
    return `${cfg.symbol}${converted.toFixed(0)}`;
  };

  const filteredTreatments = useMemo(() => {
    if (activeFilter === 'all') return TREATMENTS;
    return TREATMENTS.filter((item) => item.category === activeFilter);
  }, [activeFilter]);

  const handleSelectTreatmentForBooking = (treatmentId: string) => {
    setBooking((prev) => ({ ...prev, treatmentId }));
    setConfirmedBooking(null);
    setFormError(null);
    const el = document.getElementById('book-appointment');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const buildWhatsAppBookingUrl = (draft: BookingDraft): string => {
    const treatment = TREATMENTS.find((t) => t.id === draft.treatmentId) ?? TREATMENTS[0];
    const messageLines = [
      `Hello Ahmed Dental Care,`,
      `I would like to book a dental appointment:`,
      `- Patient Name: ${draft.fullName.trim() || 'Not specified'}`,
      `- Contact Number: ${draft.phone.trim() || 'Not specified'}`,
      `- Treatment: ${treatment.title.en}`,
      `- Preferred Date: ${draft.preferredDate}`,
      `- Preferred Slot: ${draft.timeSlot}`,
      `- Urgency / Symptoms: ${draft.painLevel}`,
    ];
    return `https://wa.me/${CLINIC_INFO.whatsappNumber}?text=${encodeURIComponent(messageLines.join('\n'))}`;
  };

  const handleBookingSubmit = (e: FormEvent) => {
    e.preventDefault();
    const cleanedPhone = booking.phone.replace(/[^\d+]/g, '');
    if (booking.fullName.trim().length < 2 || cleanedPhone.length < 7 || !booking.preferredDate) {
      setFormError(copy.bookingSection.validationError);
      return;
    }
    setFormError(null);
    setConfirmedBooking({ ...booking });
  };

  const quickWhatsAppUrl = `https://wa.me/${CLINIC_INFO.whatsappNumber}?text=${encodeURIComponent(
    'Hello Ahmed Dental Care, I would like to inquire about a dental consultation and available timings.'
  )}`;

  const liveLocationPinUrl = `https://wa.me/${CLINIC_INFO.whatsappNumber}?text=${encodeURIComponent(
    'Hello Ahmed Dental Care, could you please share your live Google Maps clinic location pin?'
  )}`;

  const confirmedTreatment = confirmedBooking
    ? TREATMENTS.find((t) => t.id === confirmedBooking.treatmentId) ?? TREATMENTS[0]
    : null;

  return (
    <div className="min-h-screen bg-[#FAFBFD] text-slate-900 transition-colors duration-200 dark:bg-[#090D12] dark:text-slate-100">
      {/* Smooth-Fading Preloader */}
      {isPreloaderVisible && (
        <div
          aria-hidden="true"
          className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#FAFBFD] transition-opacity duration-300 dark:bg-[#090D12] ${
            isPreloaderFading ? 'pointer-events-none opacity-0' : 'opacity-100'
          }`}
        >
          <div className="flex items-center gap-3">
            <svg
              viewBox="0 0 32 32"
              className="h-8 w-8 text-teal-700 dark:text-teal-400"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M10 6c-2.8 0-5 2.4-5 6 0 4.5 2 8.2 3.2 12.2.5 1.7 2.4 1.8 3.2.2l1.8-3.8c1.1-2.2 4.5-2.2 5.6 0l1.8 3.8c.8 1.6 2.7 1.5 3.2-.2C25 20.2 27 16.5 27 12c0-3.6-2.2-6-5-6-2.2 0-3.8 1.2-6 1.2S12.2 6 10 6Z" />
            </svg>
            <span className="font-display text-xl font-bold tracking-tight text-slate-900 dark:text-white">
              {CLINIC_INFO.brandName}
            </span>
          </div>
          <div className="mt-4 h-0.5 w-32 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
            <div className="h-full w-full origin-left animate-pulse bg-teal-700 dark:bg-teal-400" />
          </div>
        </div>
      )}

      {/* Primary Top Bar (Strict 3-Zone Contract) */}
      <header className="sticky top-0 z-40 h-16 border-b border-slate-200/80 bg-[#FAFBFD]/95 backdrop-blur-md dark:border-slate-800/80 dark:bg-[#090D12]/95">
        <div className="mx-auto flex h-full max-w-7xl items-center justify-between gap-8 px-4 sm:px-6 lg:px-8">
          {/* Zone 1: Brand Wordmark */}
          <a
            href="#home"
            className="flex shrink-0 items-center gap-2.5 whitespace-nowrap font-display text-lg font-bold tracking-tight text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-700 dark:text-white"
          >
            <svg
              viewBox="0 0 32 32"
              className="h-6 w-6 shrink-0 text-teal-700 dark:text-teal-400"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path d="M10 6c-2.8 0-5 2.4-5 6 0 4.5 2 8.2 3.2 12.2.5 1.7 2.4 1.8 3.2.2l1.8-3.8c1.1-2.2 4.5-2.2 5.6 0l1.8 3.8c.8 1.6 2.7 1.5 3.2-.2C25 20.2 27 16.5 27 12c0-3.6-2.2-6-5-6-2.2 0-3.8 1.2-6 1.2S12.2 6 10 6Z" />
            </svg>
            <span>{CLINIC_INFO.brandName}</span>
          </a>

          {/* Zone 2: Concise Single-Line Navigation Links */}
          <nav
            aria-label="Primary Navigation"
            className="hidden items-center gap-7 text-sm font-medium text-slate-600 lg:flex dark:text-slate-300"
          >
            <a
              href="#home"
              className="shrink-0 whitespace-nowrap underline-offset-4 transition-colors hover:text-slate-950 hover:underline dark:hover:text-white"
            >
              {copy.nav.home}
            </a>
            <a
              href="#treatments"
              className="shrink-0 whitespace-nowrap underline-offset-4 transition-colors hover:text-slate-950 hover:underline dark:hover:text-white"
            >
              {copy.nav.treatments}
            </a>
            <a
              href="#dentists"
              className="shrink-0 whitespace-nowrap underline-offset-4 transition-colors hover:text-slate-950 hover:underline dark:hover:text-white"
            >
              {copy.nav.dentists}
            </a>
            <a
              href="#gallery"
              className="shrink-0 whitespace-nowrap underline-offset-4 transition-colors hover:text-slate-950 hover:underline dark:hover:text-white"
            >
              {copy.nav.gallery}
            </a>
            <a
              href="#reviews"
              className="shrink-0 whitespace-nowrap underline-offset-4 transition-colors hover:text-slate-950 hover:underline dark:hover:text-white"
            >
              {copy.nav.reviews}
            </a>
          </nav>

          {/* Zone 3: Primary CTA + Mobile Drawer Trigger */}
          <div className="flex shrink-0 items-center gap-3">
            <a
              href="#book-appointment"
              className="inline-flex min-h-[40px] shrink-0 items-center justify-center whitespace-nowrap rounded-lg bg-teal-700 px-4 py-2 text-sm font-semibold text-white transition-colors duration-150 hover:bg-teal-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700 dark:bg-teal-600 dark:hover:bg-teal-500"
            >
              {copy.nav.bookVisit}
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen((v) => !v)}
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-700 transition-colors hover:bg-slate-100 lg:hidden dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="border-b border-slate-200 bg-white px-4 py-4 shadow-sm lg:hidden dark:border-slate-800 dark:bg-slate-900">
            <nav className="flex flex-col gap-2 text-sm font-medium">
              {[
                { href: '#home', label: copy.nav.home },
                { href: '#treatments', label: copy.nav.treatments },
                { href: '#dentists', label: copy.nav.dentists },
                { href: '#gallery', label: copy.nav.gallery },
                { href: '#reviews', label: copy.nav.reviews },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* Clinical Quick Utility Strip (Language, Currency, Theme, Call, WhatsApp) */}
      <div className="border-b border-slate-200/80 bg-white/80 dark:border-slate-800/80 dark:bg-slate-900/70">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-2.5 text-xs sm:px-6 lg:px-8">
          {/* Direct Clinic Contact Actions */}
          <div className="flex flex-wrap items-center gap-4">
            <a
              href={`tel:${CLINIC_INFO.phoneTel}`}
              className="inline-flex min-h-[36px] items-center gap-1.5 font-medium text-slate-700 transition-colors hover:text-teal-700 dark:text-slate-300 dark:hover:text-teal-400"
            >
              <Phone className="h-3.5 w-3.5 text-teal-700 dark:text-teal-400" />
              <span>{copy.utility.callClinic}:</span>
              <span className="font-mono-num font-semibold" dir="ltr">
                {CLINIC_INFO.phoneDisplay}
              </span>
            </a>
            <span className="hidden text-slate-300 sm:inline dark:text-slate-700" aria-hidden="true">
              |
            </span>
            <a
              href={quickWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[36px] items-center gap-1.5 font-medium text-teal-700 transition-colors hover:text-teal-800 dark:text-teal-400 dark:hover:text-teal-300"
            >
              <MessageCircle className="h-3.5 w-3.5" />
              <span>{copy.utility.whatsappChat}</span>
            </a>
          </div>

          {/* Global Controls: Language, Currency, Light/Dark Toggle */}
          <div className="flex flex-wrap items-center gap-2.5">
            <label className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200">
              <Globe className="h-3.5 w-3.5 text-slate-500 dark:text-slate-400" />
              <span className="sr-only">{copy.utility.languageLabel}</span>
              <select
                value={lang}
                onChange={(e) => setLang(e.target.value as LanguageCode)}
                aria-label={copy.utility.languageLabel}
                className="bg-transparent text-xs font-medium focus:outline-none dark:bg-slate-800"
              >
                <option value="en">English</option>
                <option value="ur">اردو</option>
                <option value="ar">العربية</option>
              </select>
            </label>

            <label className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200">
              <span className="sr-only">{copy.utility.currencyLabel}</span>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value as CurrencyCode)}
                aria-label={copy.utility.currencyLabel}
                className="font-mono-num bg-transparent text-xs font-medium focus:outline-none dark:bg-slate-800"
              >
                {Object.values(CURRENCIES).map((item) => (
                  <option key={item.code} value={item.code}>
                    {item.label}
                  </option>
                ))}
              </select>
            </label>

            <button
              type="button"
              onClick={() => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))}
              aria-label={theme === 'light' ? copy.utility.darkMode : copy.utility.lightMode}
              className="inline-flex min-h-[34px] items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs font-medium text-slate-700 transition-colors hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
            >
              {theme === 'light' ? (
                <>
                  <Moon className="h-3.5 w-3.5" />
                  <span>{copy.utility.darkMode}</span>
                </>
              ) : (
                <>
                  <Sun className="h-3.5 w-3.5 text-amber-400" />
                  <span>{copy.utility.lightMode}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      <main>
        {/* Hero Section */}
        <section id="home" className="mx-auto max-w-7xl px-4 pb-12 pt-10 sm:px-6 lg:px-8 lg:pb-16 lg:pt-14">
          <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12 lg:gap-10">
            <div className="flex flex-col justify-between lg:col-span-6">
              <div>
                <p className="text-xs font-semibold tracking-wide text-teal-700 dark:text-teal-400">
                  {copy.hero.kicker}
                </p>
                <h1
                  className="mt-3 font-display font-bold tracking-tight text-slate-950 dark:text-white"
                  style={{
                    fontSize: 'clamp(2.15rem, 3.8vw, 3.45rem)',
                    lineHeight: 1.12,
                    textWrap: 'balance',
                  }}
                >
                  {copy.hero.headline}
                </h1>
                <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-600 dark:text-slate-300">
                  {copy.hero.subheadline}
                </p>

                <div className="mt-7 flex flex-wrap items-center gap-3.5">
                  <a
                    href="#book-appointment"
                    className="inline-flex min-h-[46px] shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-teal-700 px-6 py-3 text-sm font-semibold text-white transition-colors duration-150 hover:bg-teal-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700 dark:bg-teal-600 dark:hover:bg-teal-500"
                  >
                    <Calendar className="h-4 w-4" />
                    <span>{copy.hero.primaryCta}</span>
                  </a>
                  <a
                    href={quickWhatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[46px] shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-800 transition-colors duration-150 hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
                  >
                    <MessageCircle className="h-4 w-4 text-teal-700 dark:text-teal-400" />
                    <span>{copy.hero.secondaryCta}</span>
                  </a>
                </div>
              </div>

              {/* Clean unboxed trust & fee metadata footer */}
              <div className="mt-8 border-t border-slate-200 pt-5 dark:border-slate-800">
                <p className="text-sm font-medium text-slate-700 dark:text-slate-200">
                  {copy.hero.ratingSummary}
                </p>
                <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 dark:text-slate-400">
                  <span>
                    {copy.hero.consultationLabel}:{' '}
                    <strong className="font-mono-num font-semibold text-slate-900 dark:text-white">
                      {formatFee(copy.hero.consultationFeePKR)}
                    </strong>
                  </span>
                  <span aria-hidden="true">·</span>
                  <span dir="ltr">{CLINIC_INFO.phoneDisplay}</span>
                </div>
              </div>
            </div>

            {/* Hero Suite Image */}
            <div className="lg:col-span-6">
              <div className="h-full overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 dark:border-slate-800 dark:bg-slate-900">
                <ClinicalImage
                  src="/src/assets/images/hero_dental_suite_1795599580814.jpg"
                  alt="Ahmed Dental Care modern sterile clinical suite with ergonomic dental chair and digital imaging display"
                  aspectClass="aspect-[16/9]"
                  className="h-full min-h-[260px] w-full lg:min-h-[430px]"
                />
              </div>
            </div>
          </div>

          {/* 4-Column Clinical Assurance Strip */}
          <div className="mt-10 grid grid-cols-1 gap-4 border-y border-slate-200 py-6 sm:grid-cols-2 lg:grid-cols-4 dark:border-slate-800">
            {copy.hero.assuranceItems.map((item) => (
              <div key={item.title} className="space-y-1 px-1">
                <p className="text-sm font-semibold text-slate-900 dark:text-white">{item.title}</p>
                <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-400">{item.detail}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Dental Treatments & Filterable Services Menu */}
        <section
          id="treatments"
          className="border-t border-slate-200/80 bg-white py-16 dark:border-slate-800/80 dark:bg-[#0D131A]"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
              <div className="max-w-2xl">
                <p className="text-xs font-semibold tracking-wide text-teal-700 dark:text-teal-400">
                  {copy.treatmentsSection.kicker}
                </p>
                <h2
                  className="mt-2 font-display text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl dark:text-white"
                  style={{ textWrap: 'balance' }}
                >
                  {copy.treatmentsSection.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-300">
                  {copy.treatmentsSection.subtitle}
                </p>
              </div>

              {/* Interactive Filter Tabs */}
              <div
                role="tablist"
                aria-label="Filter dental treatments"
                className="flex flex-wrap items-center gap-1.5 rounded-xl bg-slate-100 p-1.5 dark:bg-slate-800/90"
              >
                {(
                  [
                    { key: 'all', label: copy.treatmentsSection.filterAll },
                    { key: 'preventive', label: copy.treatmentsSection.filterPreventive },
                    { key: 'cosmetic', label: copy.treatmentsSection.filterCosmetic },
                    { key: 'ortho', label: copy.treatmentsSection.filterOrtho },
                    { key: 'restorative', label: copy.treatmentsSection.filterRestorative },
                  ] as { key: FilterOption; label: string }[]
                ).map((tab) => (
                  <button
                    key={tab.key}
                    type="button"
                    role="tab"
                    aria-selected={activeFilter === tab.key}
                    onClick={() => setActiveFilter(tab.key)}
                    className={`min-h-[36px] shrink-0 whitespace-nowrap rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-colors duration-150 ${
                      activeFilter === tab.key
                        ? 'bg-white text-slate-950 shadow-sm dark:bg-slate-900 dark:text-white'
                        : 'text-slate-600 hover:text-slate-950 dark:text-slate-300 dark:hover:text-white'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Treatment Cards Grid */}
            <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredTreatments.map((treatment) => (
                <article
                  key={treatment.id}
                  className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-[#FAFBFD] transition-colors duration-150 hover:border-teal-600/40 dark:border-slate-800 dark:bg-[#111822] dark:hover:border-teal-500/40"
                >
                  <div className="aspect-[4/3] w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                    <ClinicalImage
                      src={treatment.image}
                      alt={treatment.title[lang]}
                      aspectClass="aspect-[4/3]"
                      className="h-full w-full transition-transform duration-300 hover:scale-[1.02]"
                    />
                  </div>

                  <div className="flex flex-1 flex-col justify-between p-6">
                    <div>
                      <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                        <span>{treatment.categoryLabel[lang]}</span>
                        <span aria-hidden="true">·</span>
                        <span>
                          {copy.treatmentsSection.sessionTimeLabel}: {treatment.duration[lang]}
                        </span>
                      </div>

                      <h3 className="mt-2 font-display text-lg font-bold tracking-tight text-slate-950 dark:text-white">
                        {treatment.title[lang]}
                      </h3>

                      <p className="mt-2.5 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                        {treatment.description[lang]}
                      </p>
                    </div>

                    <div className="mt-6 flex items-center justify-between gap-4 border-t border-slate-200 pt-4 dark:border-slate-800">
                      <div>
                        <span className="block text-xs text-slate-500 dark:text-slate-400">
                          {copy.treatmentsSection.startingFrom}
                        </span>
                        <span className="font-mono-num text-base font-bold text-slate-950 dark:text-white">
                          {formatFee(treatment.baseFeePKR)}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleSelectTreatmentForBooking(treatment.id)}
                        className="inline-flex min-h-[40px] shrink-0 items-center justify-center whitespace-nowrap rounded-lg bg-teal-700 px-4 py-2 text-xs font-semibold text-white transition-colors duration-150 hover:bg-teal-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700 dark:bg-teal-600 dark:hover:bg-teal-500"
                      >
                        {copy.treatmentsSection.bookThis}
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Meet Our Dental Specialists & Sterilization Standards */}
        <section id="dentists" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-wide text-teal-700 dark:text-teal-400">
              {copy.specialistsSection.kicker}
            </p>
            <h2
              className="mt-2 font-display text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl dark:text-white"
              style={{ textWrap: 'balance' }}
            >
              {copy.specialistsSection.title}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-300">
              {copy.specialistsSection.subtitle}
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-2">
            {DENTISTS.map((doc) => (
              <article
                key={doc.id}
                className="grid grid-cols-1 overflow-hidden rounded-2xl border border-slate-200 bg-white sm:grid-cols-12 dark:border-slate-800 dark:bg-[#111822]"
              >
                <div className="sm:col-span-5">
                  <div className="h-full min-h-[260px] w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                    <ClinicalImage
                      src={doc.image}
                      alt={`${doc.name[lang]} — ${doc.credentials}`}
                      aspectClass="aspect-[3/4]"
                      className="h-full w-full object-top"
                    />
                  </div>
                </div>
                <div className="flex flex-col justify-between p-6 sm:col-span-7">
                  <div>
                    <p className="text-xs font-medium text-teal-700 dark:text-teal-400">
                      {doc.credentials}
                    </p>
                    <h3 className="mt-1.5 font-display text-xl font-bold tracking-tight text-slate-950 dark:text-white">
                      {doc.name[lang]}
                    </h3>
                    <p className="mt-1 text-sm font-medium text-slate-700 dark:text-slate-300">
                      {doc.role[lang]}
                    </p>
                    <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                      {doc.approach[lang]}
                    </p>
                  </div>

                  <div className="mt-6 border-t border-slate-200 pt-4 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
                    <span>{copy.specialistsSection.experienceLabel}: </span>
                    <strong className="font-semibold text-slate-900 dark:text-slate-100">
                      {doc.experience[lang]}
                    </strong>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Sterilization & Patient Comfort Highlight Strip */}
          <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 dark:border-slate-800 dark:bg-[#111822]">
            <div className="flex items-center gap-2.5 text-sm font-semibold text-slate-950 dark:text-white">
              <ShieldCheck className="h-5 w-5 text-teal-700 dark:text-teal-400" />
              <h3>{copy.specialistsSection.standardsTitle}</h3>
            </div>
            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
              {copy.specialistsSection.standards.map((std, idx) => (
                <div key={std.title} className="space-y-2">
                  <p className="font-display text-sm font-bold text-slate-900 dark:text-white">
                    0{idx + 1}. {std.title}
                  </p>
                  <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">{std.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Smile Gallery */}
        <section
          id="gallery"
          className="border-t border-slate-200/80 bg-white py-16 dark:border-slate-800/80 dark:bg-[#0D131A]"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold tracking-wide text-teal-700 dark:text-teal-400">
                {copy.gallerySection.kicker}
              </p>
              <h2
                className="mt-2 font-display text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl dark:text-white"
                style={{ textWrap: 'balance' }}
              >
                {copy.gallerySection.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-300">
                {copy.gallerySection.subtitle}
              </p>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2">
              {SMILE_CASES.map((item) => (
                <article
                  key={item.id}
                  className="overflow-hidden rounded-2xl border border-slate-200 bg-[#FAFBFD] dark:border-slate-800 dark:bg-[#111822]"
                >
                  <div className="aspect-[4/3] w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                    <ClinicalImage
                      src={item.image}
                      alt={item.procedure[lang]}
                      aspectClass="aspect-[4/3]"
                      className="h-full w-full"
                    />
                  </div>
                  <div className="p-6">
                    <p className="text-xs text-slate-500 dark:text-slate-400">{item.duration[lang]}</p>
                    <h3 className="mt-1.5 font-display text-lg font-bold text-slate-950 dark:text-white">
                      {item.procedure[lang]}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                      {item.summary[lang]}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Interactive Appointment Booking & WhatsApp Confirmation */}
        <section id="book-appointment" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="text-xs font-semibold tracking-wide text-teal-700 dark:text-teal-400">
                {copy.bookingSection.kicker}
              </p>
              <h2
                className="mt-2 font-display text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl dark:text-white"
                style={{ textWrap: 'balance' }}
              >
                {copy.bookingSection.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-300">
                {copy.bookingSection.subtitle}
              </p>

              <div className="mt-8 space-y-4 border-t border-slate-200 pt-6 text-sm dark:border-slate-800">
                <div className="flex items-start gap-3">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-teal-700 dark:text-teal-400" />
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white">
                      {copy.utility.callClinic}
                    </p>
                    <a
                      href={`tel:${CLINIC_INFO.phoneTel}`}
                      className="font-mono-num text-slate-600 underline-offset-4 hover:text-teal-700 hover:underline dark:text-slate-300 dark:hover:text-teal-400"
                      dir="ltr"
                    >
                      {CLINIC_INFO.phoneDisplay}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MessageCircle className="mt-0.5 h-4 w-4 shrink-0 text-teal-700 dark:text-teal-400" />
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white">WhatsApp Desk</p>
                    <a
                      href={quickWhatsAppUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono-num text-teal-700 underline-offset-4 hover:underline dark:text-teal-400"
                      dir="ltr"
                    >
                      {CLINIC_INFO.phoneDisplay}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-teal-700 dark:text-teal-400" />
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white">
                      {CLINIC_INFO.brandName}
                    </p>
                    <p className="text-slate-600 dark:text-slate-300">{CLINIC_INFO.address[lang]}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 dark:border-slate-800 dark:bg-[#111822]">
                {confirmedBooking && confirmedTreatment ? (
                  <div className="space-y-6">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0 text-teal-700 dark:text-teal-400" />
                      <div>
                        <h3 className="font-display text-xl font-bold text-slate-950 dark:text-white">
                          {copy.bookingSection.confirmedTitle}
                        </h3>
                        <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                          {copy.bookingSection.confirmedSubtitle}
                        </p>
                      </div>
                    </div>

                    <dl className="grid grid-cols-1 gap-4 rounded-xl border border-slate-200 bg-[#FAFBFD] p-5 text-sm sm:grid-cols-2 dark:border-slate-800 dark:bg-slate-900/70">
                      <div>
                        <dt className="text-xs text-slate-500 dark:text-slate-400">
                          {copy.bookingSection.fullNameLabel}
                        </dt>
                        <dd className="mt-0.5 font-semibold text-slate-950 dark:text-white">
                          {confirmedBooking.fullName}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-xs text-slate-500 dark:text-slate-400">
                          {copy.bookingSection.phoneLabel}
                        </dt>
                        <dd className="font-mono-num mt-0.5 font-semibold text-slate-950 dark:text-white" dir="ltr">
                          {confirmedBooking.phone}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-xs text-slate-500 dark:text-slate-400">
                          {copy.bookingSection.treatmentLabel}
                        </dt>
                        <dd className="mt-0.5 font-semibold text-slate-950 dark:text-white">
                          {confirmedTreatment.title[lang]}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-xs text-slate-500 dark:text-slate-400">
                          {copy.bookingSection.dateLabel}
                        </dt>
                        <dd className="font-mono-num mt-0.5 font-semibold text-slate-950 dark:text-white" dir="ltr">
                          {confirmedBooking.preferredDate}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-xs text-slate-500 dark:text-slate-400">
                          {copy.bookingSection.timeSlotLabel}
                        </dt>
                        <dd className="mt-0.5 font-semibold text-slate-950 dark:text-white">
                          {confirmedBooking.timeSlot}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-xs text-slate-500 dark:text-slate-400">
                          {copy.bookingSection.painLevelLabel}
                        </dt>
                        <dd className="mt-0.5 font-semibold text-slate-950 dark:text-white">
                          {confirmedBooking.painLevel}
                        </dd>
                      </div>
                    </dl>

                    <div className="flex flex-wrap items-center gap-3">
                      <a
                        href={buildWhatsAppBookingUrl(confirmedBooking)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-lg bg-teal-700 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-teal-800 dark:bg-teal-600 dark:hover:bg-teal-500"
                      >
                        <MessageCircle className="h-4 w-4" />
                        <span>{copy.bookingSection.sendWhatsAppButton}</span>
                      </a>
                      <button
                        type="button"
                        onClick={() => setConfirmedBooking(null)}
                        className="inline-flex min-h-[46px] items-center justify-center rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
                      >
                        {copy.bookingSection.bookAnotherButton}
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleBookingSubmit} noValidate className="space-y-5">
                    {formError && (
                      <div
                        role="alert"
                        className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-200"
                      >
                        {formError}
                      </div>
                    )}

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="patient-name"
                          className="block text-xs font-semibold text-slate-700 dark:text-slate-300"
                        >
                          {copy.bookingSection.fullNameLabel}
                        </label>
                        <input
                          id="patient-name"
                          type="text"
                          required
                          value={booking.fullName}
                          onChange={(e) => setBooking((prev) => ({ ...prev, fullName: e.target.value }))}
                          placeholder={copy.bookingSection.fullNamePlaceholder}
                          className="mt-1.5 block min-h-[44px] w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-teal-700 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-teal-400"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="patient-phone"
                          className="block text-xs font-semibold text-slate-700 dark:text-slate-300"
                        >
                          {copy.bookingSection.phoneLabel}
                        </label>
                        <input
                          id="patient-phone"
                          type="tel"
                          required
                          dir="ltr"
                          value={booking.phone}
                          onChange={(e) => setBooking((prev) => ({ ...prev, phone: e.target.value }))}
                          placeholder={copy.bookingSection.phonePlaceholder}
                          className="font-mono-num mt-1.5 block min-h-[44px] w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-teal-700 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-teal-400"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="dental-treatment"
                        className="block text-xs font-semibold text-slate-700 dark:text-slate-300"
                      >
                        {copy.bookingSection.treatmentLabel}
                      </label>
                      <select
                        id="dental-treatment"
                        value={booking.treatmentId}
                        onChange={(e) => setBooking((prev) => ({ ...prev, treatmentId: e.target.value }))}
                        className="mt-1.5 block min-h-[44px] w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-teal-700 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:focus:border-teal-400"
                      >
                        {TREATMENTS.map((item) => (
                          <option key={item.id} value={item.id}>
                            {item.title[lang]} ({formatFee(item.baseFeePKR)})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="preferred-date"
                          className="block text-xs font-semibold text-slate-700 dark:text-slate-300"
                        >
                          {copy.bookingSection.dateLabel}
                        </label>
                        <input
                          id="preferred-date"
                          type="date"
                          required
                          min={getTodayDateString()}
                          value={booking.preferredDate}
                          onChange={(e) => setBooking((prev) => ({ ...prev, preferredDate: e.target.value }))}
                          className="font-mono-num mt-1.5 block min-h-[44px] w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-teal-700 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:focus:border-teal-400"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="preferred-slot"
                          className="block text-xs font-semibold text-slate-700 dark:text-slate-300"
                        >
                          {copy.bookingSection.timeSlotLabel}
                        </label>
                        <select
                          id="preferred-slot"
                          value={booking.timeSlot}
                          onChange={(e) => setBooking((prev) => ({ ...prev, timeSlot: e.target.value }))}
                          className="mt-1.5 block min-h-[44px] w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-teal-700 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:focus:border-teal-400"
                        >
                          {copy.bookingSection.timeSlots.map((slot) => (
                            <option key={slot} value={slot}>
                              {slot}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <span className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                        {copy.bookingSection.painLevelLabel}
                      </span>
                      <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-3">
                        {copy.bookingSection.painLevels.map((level) => (
                          <button
                            key={level}
                            type="button"
                            onClick={() => setBooking((prev) => ({ ...prev, painLevel: level }))}
                            className={`min-h-[42px] rounded-lg border px-3 py-2 text-xs font-medium transition-colors ${
                              booking.painLevel === level
                                ? 'border-teal-700 bg-teal-50 text-teal-900 dark:border-teal-400 dark:bg-teal-950/60 dark:text-teal-200'
                                : 'border-slate-200 bg-[#FAFBFD] text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800'
                            }`}
                          >
                            {level}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 pt-2">
                      <button
                        type="submit"
                        className="inline-flex min-h-[46px] flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-teal-700 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-teal-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700 sm:flex-none dark:bg-teal-600 dark:hover:bg-teal-500"
                      >
                        <Sparkles className="h-4 w-4" />
                        <span>{copy.bookingSection.submitButton}</span>
                      </button>

                      <a
                        href={buildWhatsAppBookingUrl(booking)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-[46px] items-center justify-center gap-2 whitespace-nowrap rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-800 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
                      >
                        <MessageCircle className="h-4 w-4 text-teal-700 dark:text-teal-400" />
                        <span>{copy.bookingSection.whatsappInstantButton}</span>
                      </a>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Patient Reviews, Clinic Hours & Embedded Google Maps */}
        <section
          id="reviews"
          className="border-t border-slate-200/80 bg-white py-16 dark:border-slate-800/80 dark:bg-[#0D131A]"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div className="max-w-2xl">
                <p className="text-xs font-semibold tracking-wide text-teal-700 dark:text-teal-400">
                  {copy.reviewsSection.kicker}
                </p>
                <h2
                  className="mt-2 font-display text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl dark:text-white"
                  style={{ textWrap: 'balance' }}
                >
                  {copy.reviewsSection.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-300">
                  {copy.reviewsSection.subtitle}
                </p>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <div className="flex items-center gap-0.5 text-amber-500" aria-label="4.9 out of 5 stars">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star key={index} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <span className="font-mono-num font-bold text-slate-950 dark:text-white">
                  {CLINIC_INFO.googleRating}
                </span>
                <span className="text-slate-500 dark:text-slate-400">
                  ({CLINIC_INFO.reviewCount} {copy.reviewsSection.verifiedLabel})
                </span>
              </div>
            </div>

            {/* 3 Verified Patient Review Cards */}
            <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
              {PATIENT_REVIEWS.map((review) => (
                <article
                  key={review.id}
                  className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-[#FAFBFD] p-6 dark:border-slate-800 dark:bg-[#111822]"
                >
                  <div>
                    <div className="flex items-center gap-1 text-amber-500" aria-label={`${review.rating} stars`}>
                      {Array.from({ length: review.rating }).map((_, idx) => (
                        <Star key={idx} className="h-3.5 w-3.5 fill-current" />
                      ))}
                    </div>
                    <p className="mt-4 text-sm leading-relaxed text-slate-700 dark:text-slate-200">
                      &ldquo;{review.quote[lang]}&rdquo;
                    </p>
                  </div>

                  <div className="mt-6 flex items-center gap-3 border-t border-slate-200 pt-4 dark:border-slate-800">
                    <div className="h-11 w-11 shrink-0 overflow-hidden rounded-full border border-slate-200 dark:border-slate-700">
                      <ClinicalImage
                        src={review.avatar}
                        alt={review.reviewerName}
                        aspectClass="aspect-square"
                        className="h-full w-full"
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-slate-950 dark:text-white">
                        {review.reviewerName}
                      </p>
                      <p className="truncate text-xs text-slate-500 dark:text-slate-400">
                        {review.visitType[lang]} · {review.dateLabel[lang]}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Timings Table + Interactive Google Map */}
            <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-12">
              <div className="rounded-2xl border border-slate-200 bg-[#FAFBFD] p-6 lg:col-span-5 dark:border-slate-800 dark:bg-[#111822]">
                <div className="flex items-center gap-2 text-base font-bold text-slate-950 dark:text-white">
                  <Clock className="h-4 w-4 text-teal-700 dark:text-teal-400" />
                  <h3 className="font-display">{copy.reviewsSection.timingsTitle}</h3>
                </div>

                <div className="mt-5 overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                      {copy.reviewsSection.scheduleRows.map((row) => (
                        <tr key={row.day}>
                          <td className="py-3 font-medium text-slate-900 dark:text-white">{row.day}</td>
                          <td className="font-mono-num py-3 text-xs text-slate-600 dark:text-slate-300" dir="ltr">
                            <div>{row.morning}</div>
                            <div className="mt-0.5 text-slate-500 dark:text-slate-400">{row.evening}</div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="mt-6 flex flex-col gap-2.5">
                  <a
                    href={CLINIC_INFO.mapsSearchUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[42px] items-center justify-center gap-2 rounded-lg bg-teal-700 px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-teal-800 dark:bg-teal-600 dark:hover:bg-teal-500"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    <span>{copy.reviewsSection.directionsButton}</span>
                  </a>
                  <a
                    href={liveLocationPinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[42px] items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-xs font-semibold text-slate-800 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
                  >
                    <MessageCircle className="h-3.5 w-3.5 text-teal-700 dark:text-teal-400" />
                    <span>{copy.reviewsSection.livePinButton}</span>
                  </a>
                </div>
              </div>

              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 lg:col-span-7 dark:border-slate-800 dark:bg-slate-900">
                <iframe
                  title="Ahmed Dental Care Google Maps Location"
                  src={CLINIC_INFO.mapsEmbedUrl}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-[340px] w-full border-0 lg:h-full lg:min-h-[380px]"
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-[#FAFBFD] py-12 dark:border-slate-800 dark:bg-[#090D12]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div>
              <p className="font-display text-lg font-bold text-slate-950 dark:text-white">
                {CLINIC_INFO.brandName}
              </p>
              <p className="mt-2.5 max-w-sm text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                {copy.footer.tagline}
              </p>
            </div>

            <div>
              <h4 className="text-xs font-semibold tracking-wide text-slate-500 dark:text-slate-400">
                {copy.footer.quickLinksTitle}
              </h4>
              <ul className="mt-3 space-y-2 text-sm text-slate-700 dark:text-slate-300">
                <li>
                  <a href="#treatments" className="hover:text-teal-700 dark:hover:text-teal-400">
                    {copy.nav.treatments}
                  </a>
                </li>
                <li>
                  <a href="#dentists" className="hover:text-teal-700 dark:hover:text-teal-400">
                    {copy.nav.dentists}
                  </a>
                </li>
                <li>
                  <a href="#gallery" className="hover:text-teal-700 dark:hover:text-teal-400">
                    {copy.nav.gallery}
                  </a>
                </li>
                <li>
                  <a href="#book-appointment" className="hover:text-teal-700 dark:hover:text-teal-400">
                    {copy.nav.bookVisit}
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-semibold tracking-wide text-slate-500 dark:text-slate-400">
                {copy.footer.contactTitle}
              </h4>
              <div className="mt-3 space-y-2 text-sm text-slate-700 dark:text-slate-300">
                <p>{CLINIC_INFO.address[lang]}</p>
                <p>
                  <a
                    href={`tel:${CLINIC_INFO.phoneTel}`}
                    className="font-mono-num font-semibold hover:text-teal-700 dark:hover:text-teal-400"
                    dir="ltr"
                  >
                    {CLINIC_INFO.phoneDisplay}
                  </a>
                </p>
                <p>
                  <a
                    href={quickWhatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-teal-700 hover:underline dark:text-teal-400"
                  >
                    WhatsApp Appointment Desk
                  </a>
                </p>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-slate-200 pt-6 text-xs text-slate-500 sm:flex-row sm:items-center dark:border-slate-800 dark:text-slate-400">
            <p>{copy.footer.rightsReserved}</p>
            <div className="flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => setPrivacyModalOpen(true)}
                className="font-medium text-slate-700 underline-offset-4 hover:text-teal-700 hover:underline dark:text-slate-300 dark:hover:text-teal-400"
              >
                {copy.footer.privacyPolicy}
              </button>
              <span aria-hidden="true">·</span>
              <span dir="ltr">{copy.footer.credit}</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Privacy Policy Modal */}
      {privacyModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="privacy-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-xs"
        >
          <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-xl dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-start justify-between gap-4">
              <h3
                id="privacy-modal-title"
                className="font-display text-lg font-bold text-slate-950 dark:text-white"
              >
                {copy.footer.privacyTitle}
              </h3>
              <button
                type="button"
                onClick={() => setPrivacyModalOpen(false)}
                aria-label={copy.footer.closeLabel}
                className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              {copy.footer.privacyBody}
            </p>
            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={() => setPrivacyModalOpen(false)}
                className="inline-flex min-h-[40px] items-center justify-center rounded-lg bg-teal-700 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-teal-800 dark:bg-teal-600 dark:hover:bg-teal-500"
              >
                {copy.footer.closeLabel}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
