import React, { useEffect, useMemo, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  AlertTriangle,
  ArrowRight,
  BrainCircuit,
  Building2,
  CheckCircle2,
  ChevronLeft,
  ClipboardCheck,
  FileCheck2,
  FileText,
  FileUp,
  Gauge,
  Landmark,
  Languages,
  Layers3,
  LineChart,
  LockKeyhole,
  MessageCircle,
  Radar,
  ScanText,
  ScrollText,
  Send,
  ShieldCheck,
  Sparkles,
  UploadCloud,
  UserRound,
  X,
  Zap
} from "lucide-react";
import "./styles.css";
import { analyzeContractText, getReadableApiError, uploadContractFile } from "./services/api";

const copy = {
  en: {
    dir: "ltr",
    brand: "Clarix",
    brandArabic: "كلاركس",
    language: "العربية",
    chatNav: "AI Chat",
    nav: ["Features", "How It Works", "Why Clarix"],
    navTargets: ["features", "how", "why"],
    title: "كلاركس",
    subtitle: "AI Compliance Assistant for Saudi Businesses",
    heroTitle: "كلاركس",
    heroBody:
      "Review Saudi business contracts with an elegant AI workflow that highlights compliance gaps, risk exposure, and practical next steps before signature.",
    uploadContract: "Analyze Contract",
    trust: "Purpose-built for Saudi businesses",
    metrics: ["Compliance score", "Risk signals", "Actionable report"],
    featuresTitle: "Compliance intelligence, simplified",
    featuresBody: "A premium review experience for teams that need clarity without legal clutter.",
    features: [
      ["Saudi-first review", "Flag contract language that may need local regulatory attention."],
      ["Bilingual analysis", "Designed for Arabic and English contracts, teams, and reporting."],
      ["Risk prioritization", "Separate urgent risks from wording improvements in seconds."]
    ],
    howTitle: "How it works",
    howBody: "From upload to executive-ready insight in a clean guided flow.",
    howSteps: [
      ["Upload", "Drop in a PDF contract through a secure, focused interface."],
      ["Analyze", "AI reads clauses, extracts signals, and evaluates compliance posture."],
      ["Review", "Receive score, risks, and recommended edits in a dashboard."]
    ],
    whyTitle: "Why Clarix",
    whyBody: "Built for Saudi operators who want speed, confidence, and a calmer contract review process.",
    whyItems: [
      ["Corporate clarity", "Minimal dashboards that executives and operations teams can scan quickly."],
      ["Decision support", "Recommendations are written as practical next actions."],
      ["Modern workflow", "A polished product surface ready for future backend integration."]
    ],
    ctaTitle: "Start with your next contract.",
    ctaBody: "Preview the Clarix workflow and see how an AI compliance assistant can support your review process.",
    footerTagline: "AI compliance assistance for Saudi business teams.",
    uploadTitle: "Upload contract",
    uploadBody: "Drag and drop a PDF, DOCX, or TXT contract to extract text and prepare it for AI compliance analysis.",
    dragTitle: "Drop your contract here",
    dragBody: "PDF, DOCX, and TXT files are supported by the connected backend",
    selected: "Selected file",
    noFile: "No file selected",
    removeFile: "Remove file",
    uploadProgress: "Upload progress",
    supportedFiles: "Supported files",
    upload: "Upload",
    analyze: "Analyze Contract",
    uploading: "Uploading...",
    backendReady: "Text extracted and ready for analysis.",
    chooseFileFirst: "Please upload a contract file first.",
    unsupportedFile: "Please choose a PDF, DOCX, or TXT file.",
    uploadFailed: "Backend is not running. Please start FastAPI on http://127.0.0.1:8000",
    analyzeFailed: "Analysis failed. Please try again.",
    loadingTitle: "Analyzing contract",
    loadingBody: "Clarix is securely reviewing your contract against compliance signals and Saudi regulatory expectations.",
    steps: ["Reading Contract", "Extracting Text", "Checking Saudi Regulations", "Generating Compliance Report"],
    dashboardTitle: "Compliance dashboard",
    dashboardBody: "A professional overview of contract compliance, risks, recommendations, and recent AI reviews.",
    scoreLabel: "Compliance Score",
    scoreNote: "Strong compliance posture with one high-priority gap.",
    riskOverview: "Risk Overview",
    risks: "Risk Overview",
    recommendations: "Recommendations",
    timeline: "Compliance Timeline",
    recentAnalysis: "Recent Analysis",
    highRisk: "High",
    mediumRisk: "Medium",
    lowRisk: "Low",
    missingAml: "Missing AML Clause",
    addVerification: "Add customer verification.",
    chartLabel: "Score trend",
    riskItems: [
      ["Missing AML Clause", "Customer verification language is not explicit enough.", "High"],
      ["Data handling", "Personal data obligations require tighter wording.", "Medium"],
      ["Termination clause", "Notice period should define escalation steps.", "Low"]
    ],
    recItems: [
      ["Add customer verification.", "Include KYC/AML checks before onboarding or payment release."],
      ["Clarify responsibilities", "Assign owners for data processing and regulatory requests."],
      ["Improve evidence trail", "Add required attachments and signature metadata."]
    ],
    timelineItems: [
      ["Document uploaded", "PDF received and prepared for review", "09:15"],
      ["Saudi regulations checked", "AML, data, payment, and contract controls reviewed", "09:17"],
      ["Report generated", "Score, risks, and recommendations finalized", "09:20"]
    ],
    recentItems: [
      ["Vendor Services Agreement", "84%", "High"],
      ["NDA - Strategic Partner", "92%", "Low"],
      ["Employment Policy Update", "78%", "Medium"]
    ],
    reset: "New contract",
    ready: "Ready to analyze",
    privacy: "Private preview interface",
    chatTitle: "AI Chat",
    chatBody: "Ask Clarix about clauses, Saudi compliance risks, and practical improvements.",
    chatPlaceholder: "Ask Clarix...",
    chatGreeting: "Hello, I am Clarix. Ask me about SAMA, AML clauses, contract risk, or compliance improvements.",
    chatExamples: ["Does this violate SAMA?", "Explain this clause.", "How can I improve compliance?"],
    mockResponses: {
      "Does this violate SAMA?":
        "Based on the mock contract context, this may create a SAMA compliance concern if customer consent, data handling, or audit rights are not clearly defined. I recommend adding explicit regulatory references and responsibility owners.",
      "Explain this clause.":
        "This clause appears to define obligations between the parties, but it should be clearer about scope, timelines, liability, and escalation. A stronger version would state who is responsible, when action is required, and what evidence must be retained.",
      "How can I improve compliance?":
        "Start by adding customer verification, AML/KYC language, data protection responsibilities, audit rights, and a clear governing-law reference. Then align termination, reporting, and record-retention terms with Saudi business expectations."
    },
    defaultMockResponse:
      "This is a mock Clarix response. I would review the clause for regulatory references, risk allocation, customer verification, data handling, auditability, and practical next steps before signing.",
    send: "Send"
  },
  ar: {
    dir: "rtl",
    brand: "كلاركس",
    brandArabic: "Clarix",
    language: "English",
    chatNav: "المحادثة",
    nav: ["المزايا", "آلية العمل", "لماذا كلاركس"],
    navTargets: ["features", "how", "why"],
    title: "كلاركس",
    subtitle: "AI Compliance Assistant for Saudi Businesses",
    heroTitle: "كلاركس",
    heroBody:
      "راجع عقود الأعمال السعودية بتجربة ذكية وأنيقة تكشف فجوات الامتثال، ومستوى المخاطر، والخطوات العملية قبل التوقيع.",
    uploadContract: "تحليل العقد",
    trust: "مصمم للشركات السعودية",
    metrics: ["درجة الامتثال", "إشارات المخاطر", "تقرير عملي"],
    featuresTitle: "ذكاء امتثال واضح ومبسط",
    featuresBody: "تجربة مراجعة راقية للفرق التي تحتاج وضوحا دون تعقيد قانوني زائد.",
    features: [
      ["مراجعة موجهة للسعودية", "رصد البنود التي قد تحتاج انتباها نظاميا محليا."],
      ["تحليل ثنائي اللغة", "مصمم للعقود والفرق والتقارير بالعربية والإنجليزية."],
      ["ترتيب المخاطر", "تمييز المخاطر العاجلة عن تحسينات الصياغة خلال ثوان."]
    ],
    howTitle: "آلية العمل",
    howBody: "من رفع الملف إلى مؤشرات جاهزة للمراجعة عبر مسار بسيط وواضح.",
    howSteps: [
      ["ارفع", "أضف عقد PDF من واجهة مركزة وسهلة."],
      ["حلل", "يقرأ الذكاء الاصطناعي البنود ويستخرج إشارات الامتثال."],
      ["راجع", "استلم الدرجة والمخاطر والتوصيات في لوحة واحدة."]
    ],
    whyTitle: "لماذا كلاركس",
    whyBody: "مصمم للفرق السعودية التي تريد سرعة وثقة وتجربة أكثر هدوءا في مراجعة العقود.",
    whyItems: [
      ["وضوح تنفيذي", "لوحات مختصرة يسهل على المدراء وفرق التشغيل قراءتها بسرعة."],
      ["دعم القرار", "التوصيات مكتوبة كخطوات عملية قابلة للتنفيذ."],
      ["تجربة حديثة", "واجهة مصقولة وجاهزة للتكامل مع Backend لاحقا."]
    ],
    ctaTitle: "ابدأ بعقدك القادم.",
    ctaBody: "جرّب مسار كلاركس وشاهد كيف يمكن لمساعد امتثال ذكي دعم عملية المراجعة.",
    footerTagline: "مساعد امتثال ذكي لفرق الأعمال في السعودية.",
    uploadTitle: "رفع العقد",
    uploadBody: "اسحب ملف PDF أو DOCX أو TXT وأفلته هنا لاستخراج النص وتجهيزه لتحليل الامتثال بالذكاء الاصطناعي.",
    dragTitle: "أفلت العقد هنا",
    dragBody: "يدعم Backend الحالي ملفات PDF و DOCX و TXT",
    selected: "الملف المحدد",
    noFile: "لم يتم اختيار ملف",
    removeFile: "إزالة الملف",
    uploadProgress: "تقدم الرفع",
    supportedFiles: "الملفات المدعومة",
    upload: "رفع",
    analyze: "تحليل العقد",
    uploading: "جاري الرفع...",
    backendReady: "تم استخراج النص وهو جاهز للتحليل.",
    chooseFileFirst: "يرجى رفع ملف عقد أولا.",
    unsupportedFile: "يرجى اختيار ملف PDF أو DOCX أو TXT.",
    uploadFailed: "Backend is not running. Please start FastAPI on http://127.0.0.1:8000",
    analyzeFailed: "فشل التحليل. يرجى المحاولة مرة أخرى.",
    loadingTitle: "جاري تحليل العقد",
    loadingBody: "كلاركس يراجع العقد بأمان مقابل مؤشرات الامتثال والمتطلبات التنظيمية السعودية.",
    steps: ["قراءة العقد", "استخراج النص", "التحقق من الأنظمة السعودية", "إنشاء تقرير الامتثال"],
    dashboardTitle: "لوحة الامتثال",
    dashboardBody: "نظرة احترافية على امتثال العقد والمخاطر والتوصيات وآخر التحليلات.",
    scoreLabel: "درجة الامتثال",
    scoreNote: "وضع امتثال قوي مع فجوة واحدة عالية الأولوية.",
    riskOverview: "نظرة عامة على المخاطر",
    risks: "نظرة عامة على المخاطر",
    recommendations: "التوصيات",
    timeline: "مسار الامتثال",
    recentAnalysis: "آخر التحليلات",
    highRisk: "مرتفع",
    mediumRisk: "متوسط",
    lowRisk: "منخفض",
    missingAml: "بند مكافحة غسل الأموال غير موجود",
    addVerification: "إضافة التحقق من العملاء.",
    chartLabel: "اتجاه الدرجة",
    riskItems: [
      ["بند مكافحة غسل الأموال غير موجود", "صياغة التحقق من العملاء غير واضحة بما يكفي.", "مرتفع"],
      ["معالجة البيانات", "التزامات البيانات الشخصية تحتاج صياغة أدق.", "متوسط"],
      ["شرط الإنهاء", "فترة الإشعار تحتاج خطوات تصعيد واضحة.", "منخفض"]
    ],
    recItems: [
      ["إضافة التحقق من العملاء.", "تضمين فحوصات KYC/AML قبل الإسناد أو صرف المدفوعات."],
      ["توضيح المسؤوليات", "تحديد المالكين لمعالجة البيانات والطلبات التنظيمية."],
      ["تحسين سجل الإثبات", "إضافة المرفقات المطلوبة وبيانات التوقيع."]
    ],
    timelineItems: [
      ["تم رفع المستند", "استلام ملف PDF وتجهيزه للمراجعة", "09:15"],
      ["تم فحص الأنظمة السعودية", "مراجعة مكافحة غسل الأموال والبيانات والمدفوعات والبنود", "09:17"],
      ["تم إنشاء التقرير", "اعتماد الدرجة والمخاطر والتوصيات", "09:20"]
    ],
    recentItems: [
      ["اتفاقية خدمات مورد", "84%", "مرتفع"],
      ["اتفاقية سرية - شريك استراتيجي", "92%", "منخفض"],
      ["تحديث سياسة التوظيف", "78%", "متوسط"]
    ],
    reset: "عقد جديد",
    ready: "جاهز للتحليل",
    privacy: "واجهة معاينة خاصة",
    chatTitle: "محادثة الذكاء الاصطناعي",
    chatBody: "اسأل كلاركس عن البنود والمخاطر التنظيمية السعودية وتحسينات الامتثال العملية.",
    chatPlaceholder: "Ask Clarix...",
    chatGreeting: "مرحبا، أنا كلاركس. اسألني عن SAMA أو بنود AML أو مخاطر العقد أو تحسينات الامتثال.",
    chatExamples: ["Does this violate SAMA?", "Explain this clause.", "How can I improve compliance?"],
    mockResponses: {
      "Does this violate SAMA?":
        "بناء على سياق تجريبي، قد يظهر احتمال مخالفة أو ملاحظة مرتبطة بمتطلبات SAMA إذا لم تكن الموافقة ومعالجة البيانات وحقوق التدقيق واضحة. أوصي بإضافة مراجع تنظيمية ومسؤوليات محددة.",
      "Explain this clause.":
        "يبدو أن هذا البند يحدد التزامات بين الأطراف، لكنه يحتاج وضوحا أكبر في النطاق والمدة والمسؤولية وآلية التصعيد. الصياغة الأفضل تحدد المسؤول، ووقت التنفيذ، والأدلة المطلوب حفظها.",
      "How can I improve compliance?":
        "ابدأ بإضافة التحقق من العملاء، وصياغة AML/KYC، ومسؤوليات حماية البيانات، وحقوق التدقيق، ومرجع واضح للنظام الحاكم. ثم راجع الإنهاء والتقارير والاحتفاظ بالسجلات.",
    },
    defaultMockResponse:
      "هذه استجابة تجريبية من كلاركس. سأراجع البند من زاوية المراجع التنظيمية، وتوزيع المخاطر، والتحقق من العملاء، ومعالجة البيانات، وقابلية التدقيق، والخطوات العملية قبل التوقيع.",
    send: "إرسال"
  }
};

const severityTone = {
  High: "border-red-200 bg-red-50 text-red-700",
  Medium: "border-amber-200 bg-amber-50 text-amber-700",
  Low: "border-emerald-200 bg-emerald-50 text-emerald-700",
  مرتفع: "border-red-200 bg-red-50 text-red-700",
  متوسط: "border-amber-200 bg-amber-50 text-amber-700",
  منخفض: "border-emerald-200 bg-emerald-50 text-emerald-700"
};

function App() {
  const [language, setLanguage] = useState("ar");
  const [stage, setStage] = useState("landing");
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [extractedText, setExtractedText] = useState("");
  const [analysisResult, setAnalysisResult] = useState(null);
  const [workflowError, setWorkflowError] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const t = copy[language];
  const isRtl = t.dir === "rtl";

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = t.dir;
  }, [language, t.dir]);

  useEffect(() => {
    if (stage !== "loading") return;
    const timer = setInterval(() => {
      setProgress((value) => (value >= 92 ? value : Math.min(value + 4, 92)));
    }, 280);
    return () => clearInterval(timer);
  }, [stage]);

  const activeStep = useMemo(() => Math.min(3, Math.floor(progress / 26)), [progress]);

  const acceptsUploadFile = (file) => /\.(pdf|docx|txt)$/i.test(file.name);

  const resetContractState = () => {
    setUploadProgress(0);
    setExtractedText("");
    setAnalysisResult(null);
    setWorkflowError("");
  };

  const handleFile = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!acceptsUploadFile(file)) {
      setWorkflowError(t.unsupportedFile);
      return;
    }

    resetContractState();
    setSelectedFile(file);
    setUploadProgress(100);
  };

  const handleDroppedFile = (file) => {
    if (!file) return;

    if (!acceptsUploadFile(file)) {
      setWorkflowError(t.unsupportedFile);
      return;
    }

    resetContractState();
    setSelectedFile(file);
    setUploadProgress(100);
  };

  const removeUploadedFile = () => {
    setSelectedFile(null);
    resetContractState();
  };

  const uploadContract = async () => {
    if (!selectedFile) {
      setWorkflowError(t.chooseFileFirst);
      return "";
    }

    setIsUploading(true);
    setWorkflowError("");
    setUploadProgress(100);

    try {
      const uploadResult = await uploadContractFile(selectedFile);

      setUploadProgress(100);
      setExtractedText(uploadResult.text);
      return uploadResult.text;
    } catch (error) {
      setWorkflowError(getReadableApiError(error, t.uploadFailed));
      return "";
    } finally {
      setIsUploading(false);
    }
  };

  const startAnalysis = async () => {
    setWorkflowError("");
    const text = extractedText || (await uploadContract());
    if (!text) return;

    setProgress(18);
    setStage("loading");

    try {
      const analysis = await analyzeContractText(text);
      setAnalysisResult(analysis);
      setProgress(100);
      window.setTimeout(() => setStage("dashboard"), 350);
    } catch (error) {
      setWorkflowError(getReadableApiError(error, t.analyzeFailed));
      setStage("upload");
      setProgress(0);
    }
  };

  return (
    <main id="main-content" className="app-shell min-h-screen bg-[#f8faf9] text-slate-950">
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <Header
        t={t}
        isRtl={isRtl}
        stage={stage}
        setStage={setStage}
        language={language}
        setLanguage={setLanguage}
      />

      {stage === "landing" && <Landing t={t} isRtl={isRtl} onUpload={() => setStage("upload")} />}
      {stage === "upload" && (
        <UploadPage
          t={t}
          fileName={selectedFile?.name || ""}
          uploadProgress={uploadProgress}
          isUploading={isUploading}
          isTextExtracted={Boolean(extractedText)}
          error={workflowError}
          onFile={handleFile}
          onDropFile={handleDroppedFile}
          onRemoveFile={removeUploadedFile}
          onUpload={uploadContract}
          onAnalyze={startAnalysis}
        />
      )}
      {stage === "loading" && <LoadingScreen t={t} progress={progress} activeStep={activeStep} />}
      {stage === "dashboard" && <Dashboard t={t} analysis={analysisResult} onReset={() => setStage("upload")} />}
      {stage === "chat" && <ChatPage t={t} />}
    </main>
  );
}

function Header({ t, isRtl, stage, setStage, language, setLanguage }) {
  const goToSection = (target) => {
    setStage("landing");
    window.setTimeout(() => {
      document.getElementById(target)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 40);
  };

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200/70 bg-white/82 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <button
          className="flex items-center gap-3 text-start"
          onClick={() => setStage("landing")}
          aria-label="Clarix home"
        >
          <span className="grid h-10 w-10 place-items-center rounded-lg bg-Clarix-500 text-white shadow-sm">
            <ShieldCheck size={21} />
          </span>
          <span>
            <span className="block text-lg font-semibold leading-5">{t.brand}</span>
            <span className="block text-xs font-medium text-slate-500">{t.brandArabic}</span>
          </span>
        </button>

        <nav className="hidden items-center rounded-full border border-slate-200 bg-white p-1 shadow-sm md:flex">
          {t.nav.map((item, index) => (
            <button
              key={item}
              onClick={() => goToSection(t.navTargets[index])}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                stage === "landing" ? "text-slate-600 hover:bg-slate-50 hover:text-slate-950" : "text-slate-500 hover:text-slate-950"
              }`}
            >
              {item}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setStage("chat")}
            aria-label={t.chatNav}
            className={`inline-flex h-10 items-center gap-2 rounded-lg border px-3 text-sm font-semibold shadow-sm transition ${
              stage === "chat"
                ? "border-Clarix-500 bg-Clarix-50 text-Clarix-700"
                : "border-slate-200 bg-white text-slate-700 hover:border-Clarix-500 hover:text-Clarix-600"
            }`}
          >
            <MessageCircle size={17} />
            <span className="hidden sm:inline">{t.chatNav}</span>
          </button>
          <button
            onClick={() => setLanguage(language === "ar" ? "en" : "ar")}
            className="inline-flex h-10 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-Clarix-500 hover:text-Clarix-600"
          >
            <Languages size={17} />
            <span>{t.language}</span>
            {isRtl ? <ChevronLeft size={16} /> : <ArrowRight size={16} />}
          </button>
        </div>
      </div>
    </header>
  );
}

function Landing({ t, isRtl, onUpload }) {
  const featureIcons = [Landmark, Languages, LineChart];
  const stepIcons = [UploadCloud, BrainCircuit, ClipboardCheck];
  const whyIcons = [Building2, Zap, Layers3];

  return (
    <>
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 pb-16 pt-14 sm:px-6 md:min-h-[calc(100vh-73px)] lg:grid-cols-[1fr_0.92fr] lg:px-8 lg:pb-24 lg:pt-20">
          <div className="animate-rise max-w-3xl">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-Clarix-100 bg-white px-3 py-1.5 text-sm font-medium text-Clarix-700 shadow-sm">
              <LockKeyhole size={15} />
              <span>{t.trust}</span>
            </div>
            <div className="mb-5 flex items-center gap-4">
              <span className="grid h-14 w-14 place-items-center rounded-2xl bg-Clarix-500 text-white shadow-xl shadow-Clarix-500/20">
                <ShieldCheck size={29} />
              </span>
              <span className="text-lg font-semibold text-slate-500">{t.subtitle}</span>
            </div>
            <h1 className="text-6xl font-semibold leading-none tracking-normal text-slate-950 sm:text-7xl lg:text-8xl">
              {t.heroTitle}
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl">{t.heroBody}</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={onUpload}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-slate-950 px-6 text-sm font-semibold text-white shadow-xl shadow-slate-950/15 transition hover:-translate-y-0.5 hover:bg-Clarix-600"
              >
                <ScanText size={18} />
                <span>{t.uploadContract}</span>
                {isRtl ? <ChevronLeft size={17} /> : <ArrowRight size={17} />}
              </button>
            </div>
            <div className="mt-10 grid max-w-2xl grid-cols-1 gap-3 sm:grid-cols-3">
              {t.metrics.map((metric, index) => (
                <div key={metric} className="animate-rise rounded-lg border border-slate-200 bg-white px-4 py-3 shadow-sm" style={{ animationDelay: `${index * 90}ms` }}>
                  <p className="text-sm font-semibold text-slate-700">{metric}</p>
                </div>
              ))}
            </div>
          </div>

          <HeroPreview t={t} />
        </div>
      </section>

      <LandingBand id="features" eyebrow="01" title={t.featuresTitle} body={t.featuresBody}>
        <div className="grid gap-4 md:grid-cols-3">
          {t.features.map(([title, body], index) => (
            <PremiumCard key={title} icon={featureIcons[index]} title={title} body={body} delay={index} />
          ))}
        </div>
      </LandingBand>

      <LandingBand id="how" eyebrow="02" title={t.howTitle} body={t.howBody}>
        <div className="grid gap-4 md:grid-cols-3">
          {t.howSteps.map(([title, body], index) => (
            <StepCard key={title} icon={stepIcons[index]} title={title} body={body} index={index + 1} />
          ))}
        </div>
      </LandingBand>

      <LandingBand id="why" eyebrow="03" title={t.whyTitle} body={t.whyBody}>
        <div className="grid gap-4 lg:grid-cols-3">
          {t.whyItems.map(([title, body], index) => (
            <PremiumCard key={title} icon={whyIcons[index]} title={title} body={body} delay={index} />
          ))}
        </div>
      </LandingBand>

      <section className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-slate-950 px-6 py-12 text-white shadow-soft sm:px-10 lg:px-14">
          <div className="grid items-center gap-8 lg:grid-cols-[1fr_auto]">
            <div>
              <h2 className="text-3xl font-semibold sm:text-5xl">{t.ctaTitle}</h2>
              <p className="mt-4 max-w-2xl leading-7 text-slate-300">{t.ctaBody}</p>
            </div>
            <button
              onClick={onUpload}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-white px-5 text-sm font-semibold text-slate-950 transition hover:-translate-y-0.5 hover:bg-Clarix-50"
            >
              <ScanText size={18} />
              <span>{t.uploadContract}</span>
              {isRtl ? <ChevronLeft size={17} /> : <ArrowRight size={17} />}
            </button>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-200 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 text-sm text-slate-500 md:flex-row md:items-center">
          <div className="flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-Clarix-500 text-white">
              <ShieldCheck size={19} />
            </span>
            <span className="font-semibold text-slate-950">{t.brand} | {t.brandArabic}</span>
          </div>
          <p>{t.footerTagline}</p>
        </div>
      </footer>
    </>
  );
}

function HeroPreview({ t }) {
  return (
    <div className="animate-float relative mx-auto w-full max-w-xl">
      <div className="absolute inset-6 rounded-[2rem] bg-Clarix-500/10 blur-3xl" />
      <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white/90 p-4 shadow-soft backdrop-blur">
        <div className="rounded-[1.4rem] border border-slate-200 bg-slate-50 p-5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-slate-500">{t.scoreLabel}</p>
              <p className="mt-2 text-5xl font-semibold text-slate-950">82%</p>
            </div>
            <span className="grid h-14 w-14 place-items-center rounded-2xl bg-Clarix-500 text-white shadow-lg shadow-Clarix-500/20">
              <Gauge size={30} />
            </span>
          </div>
          <div className="mt-6 h-2 overflow-hidden rounded-full bg-slate-200">
            <div className="h-full w-[82%] rounded-full bg-Clarix-500" />
          </div>
        </div>
        <div className="mt-4 grid gap-3">
          {t.riskItems.slice(0, 3).map(([title, body, severity], index) => (
            <div key={title} className="animate-rise rounded-2xl border border-slate-200 bg-white p-4 shadow-sm" style={{ animationDelay: `${index * 120}ms` }}>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-semibold text-slate-900">{title}</p>
                  <p className="mt-1 text-sm leading-6 text-slate-500">{body}</p>
                </div>
                <span className={`shrink-0 rounded-full border px-2.5 py-1 text-xs font-semibold ${severityTone[severity]}`}>
                  {severity}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function LandingBand({ id, eyebrow, title, body, children }) {
  return (
    <section id={id} className="scroll-mt-28 px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-9 max-w-3xl">
          <p className="mb-3 text-sm font-semibold text-Clarix-600">{eyebrow}</p>
          <h2 className="text-3xl font-semibold text-slate-950 sm:text-5xl">{title}</h2>
          <p className="mt-4 text-lg leading-8 text-slate-600">{body}</p>
        </div>
        {children}
      </div>
    </section>
  );
}

function PremiumCard({ icon: Icon, title, body, delay }) {
  return (
    <article className="animate-rise rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-soft" style={{ animationDelay: `${delay * 90}ms` }}>
      <span className="grid h-12 w-12 place-items-center rounded-xl bg-Clarix-50 text-Clarix-500">
        <Icon size={24} />
      </span>
      <h3 className="mt-5 text-xl font-semibold text-slate-950">{title}</h3>
      <p className="mt-3 leading-7 text-slate-600">{body}</p>
    </article>
  );
}

function StepCard({ icon: Icon, title, body, index }) {
  return (
    <article className="relative rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <span className="grid h-12 w-12 place-items-center rounded-xl bg-slate-950 text-white">
          <Icon size={23} />
        </span>
        <span className="text-4xl font-semibold text-slate-100">0{index}</span>
      </div>
      <h3 className="mt-6 text-xl font-semibold text-slate-950">{title}</h3>
      <p className="mt-3 leading-7 text-slate-600">{body}</p>
    </article>
  );
}

function UploadPage({
  t,
  fileName,
  uploadProgress,
  isUploading,
  isTextExtracted,
  error,
  onFile,
  onDropFile,
  onRemoveFile,
  onUpload,
  onAnalyze
}) {
  const [isDragging, setIsDragging] = useState(false);
  const acceptedTypes = ".pdf,.docx,.txt,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain";

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    onDropFile(event.dataTransfer.files?.[0]);
  };

  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <SectionIntro icon={FileText} title={t.uploadTitle} body={t.uploadBody} />

      <div className="mt-8 grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
        <UploadDropzone
          t={t}
          isDragging={isDragging}
          acceptedTypes={acceptedTypes}
          onFile={onFile}
          onDrop={handleDrop}
          onDragOver={() => setIsDragging(true)}
          onDragLeave={() => setIsDragging(false)}
        />

        <div className="grid content-start gap-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <h3 className="font-semibold text-slate-950">{t.supportedFiles}</h3>
              <FileCheck2 className="text-Clarix-500" size={20} />
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {["PDF", "DOCX", "TXT"].map((type) => (
                <FileTypePill key={type} type={type} />
              ))}
            </div>
          </div>

          <SelectedFileCard
            t={t}
            fileName={fileName}
            uploadProgress={uploadProgress}
            isTextExtracted={isTextExtracted}
            onRemoveFile={onRemoveFile}
          />

          {error && (
            <div className="rounded-2xl border border-red-100 bg-red-50 p-4 text-sm font-semibold leading-6 text-red-700">
              {error}
            </div>
          )}

          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
            <ActionButton variant="secondary" disabled={!fileName || isUploading} onClick={onUpload}>
              <UploadCloud size={17} />
              {isUploading ? t.uploading : t.upload}
            </ActionButton>
            <ActionButton variant="primary" disabled={!fileName || isUploading} onClick={onAnalyze}>
              <Sparkles size={17} />
              {t.analyze}
            </ActionButton>
          </div>
        </div>
      </div>
    </section>
  );
}

function UploadDropzone({ t, isDragging, acceptedTypes, onFile, onDrop, onDragOver, onDragLeave }) {
  return (
    <label
      onDragOver={(event) => {
        event.preventDefault();
        onDragOver();
      }}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      className={`upload-dropzone group relative grid min-h-[380px] cursor-pointer place-items-center overflow-hidden rounded-[2rem] border border-dashed px-6 text-center shadow-soft transition ${
        isDragging
          ? "border-Clarix-500 bg-Clarix-50"
          : "border-slate-300 bg-white hover:border-Clarix-500 hover:bg-Clarix-50/60"
      }`}
    >
      <input className="sr-only" type="file" accept={acceptedTypes} onChange={onFile} />
      <span className="pointer-events-none absolute inset-6 rounded-[1.5rem] border border-slate-100" />
      <span className="relative">
        <span className="mx-auto grid h-20 w-20 place-items-center rounded-3xl bg-slate-950 text-white shadow-xl shadow-slate-950/15 transition group-hover:-translate-y-1 group-hover:bg-Clarix-500">
          <FileUp size={34} />
        </span>
        <span className="mt-6 block text-2xl font-semibold text-slate-950">{t.dragTitle}</span>
        <span className="mt-3 block text-base font-medium text-slate-500">{t.dragBody}</span>
        <span className="mt-6 inline-flex items-center gap-2 rounded-full border border-Clarix-100 bg-white px-4 py-2 text-sm font-semibold text-Clarix-700 shadow-sm">
          <UploadCloud size={16} />
          {t.upload}
        </span>
      </span>
    </label>
  );
}

function SelectedFileCard({ t, fileName, uploadProgress, isTextExtracted, onRemoveFile }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-start gap-3">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-Clarix-50 text-Clarix-500">
            <FileText size={21} />
          </span>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-slate-500">{t.selected}</p>
            <p className="mt-1 truncate font-semibold text-slate-950">
              {fileName || t.noFile}
            </p>
          </div>
        </div>
        {fileName && (
          <button
            onClick={onRemoveFile}
            className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-slate-200 bg-white text-slate-500 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
            aria-label={t.removeFile}
            title={t.removeFile}
          >
            <X size={17} />
          </button>
        )}
      </div>

      <UploadProgress label={t.uploadProgress} value={fileName ? uploadProgress : 0} />
      {fileName && uploadProgress > 0 && uploadProgress < 100 && (
        <div className="mt-4 grid gap-2">
          <div className="skeleton-line h-2 w-3/4 rounded-full" />
          <div className="skeleton-line h-2 w-1/2 rounded-full" />
        </div>
      )}
      {isTextExtracted && (
        <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-Clarix-50 px-3 py-1.5 text-sm font-semibold text-Clarix-700">
          <CheckCircle2 size={16} />
          {t.backendReady}
        </div>
      )}
    </div>
  );
}

function UploadProgress({ label, value }) {
  return (
    <div className="mt-5">
      <div className="mb-2 flex items-center justify-between gap-3 text-sm">
        <span className="font-semibold text-slate-600">{label}</span>
        <span className="font-semibold text-Clarix-600">{value}%</span>
      </div>
      <div className="h-3 overflow-hidden rounded-full bg-slate-100">
        <div
          className="upload-progress h-full rounded-full bg-gradient-to-r from-Clarix-500 via-emerald-400 to-Clarix-600 transition-all duration-300"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

function FileTypePill({ type }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm font-semibold text-slate-700">
      <FileText size={15} className="text-Clarix-500" />
      {type}
    </span>
  );
}

function ActionButton({ variant, disabled, onClick, children }) {
  const isPrimary = variant === "primary";
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-lg px-4 text-sm font-semibold shadow-sm transition disabled:cursor-not-allowed disabled:opacity-45 ${
        isPrimary
          ? "bg-Clarix-500 text-white shadow-lg shadow-Clarix-500/20 hover:bg-Clarix-600"
          : "border border-slate-200 bg-white text-slate-700 hover:border-Clarix-200 hover:text-Clarix-600"
      }`}
    >
      {children}
    </button>
  );
}

function LoadingScreen({ t, progress, activeStep }) {
  const stepIcons = [ScrollText, FileText, Landmark, ClipboardCheck];
  const currentStep = t.steps[activeStep] ?? t.steps[t.steps.length - 1];
  const circumference = 2 * Math.PI * 46;
  const dashOffset = circumference - (progress / 100) * circumference;

  return (
    <section className="relative isolate grid min-h-[calc(100vh-73px)] place-items-center overflow-hidden bg-[#f7faf9] px-4 py-12 text-slate-950 dark:bg-slate-950 dark:text-white sm:px-6 lg:px-8">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(11,110,79,0.14),transparent_30%),radial-gradient(circle_at_80%_0%,rgba(15,23,42,0.08),transparent_32%)] dark:bg-[radial-gradient(circle_at_20%_20%,rgba(11,110,79,0.28),transparent_34%),radial-gradient(circle_at_80%_0%,rgba(255,255,255,0.08),transparent_28%)]" />
      <div className="absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-Clarix-500/40 to-transparent" />

      <div className="grid w-full max-w-6xl items-center gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="animate-rise rounded-[2rem] border border-white/70 bg-white/78 p-6 shadow-soft backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.06] sm:p-8">
          <div className="flex items-start justify-between gap-5">
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-Clarix-100 bg-Clarix-50 px-3 py-1.5 text-sm font-semibold text-Clarix-700 dark:border-Clarix-500/30 dark:bg-Clarix-500/10 dark:text-Clarix-100">
                <Radar className="loading-scan" size={15} />
                <span>{currentStep}</span>
              </div>
              <h2 className="text-3xl font-semibold leading-tight text-slate-950 dark:text-white sm:text-5xl">
                {t.loadingTitle}
              </h2>
              <p className="mt-4 max-w-xl text-base leading-8 text-slate-600 dark:text-slate-300 sm:text-lg">
                {t.loadingBody}
              </p>
            </div>
            <span className="hidden h-12 w-12 shrink-0 place-items-center rounded-2xl bg-slate-950 text-white shadow-lg shadow-slate-950/10 dark:bg-white dark:text-slate-950 sm:grid">
              <ShieldCheck size={24} />
            </span>
          </div>

          <div className="mt-8 grid gap-5 rounded-2xl border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-slate-900/70 sm:grid-cols-[auto_1fr] sm:items-center">
            <div className="relative mx-auto h-32 w-32">
              <svg className="-rotate-90" viewBox="0 0 120 120" aria-hidden="true">
                <circle
                  cx="60"
                  cy="60"
                  r="46"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="10"
                  className="text-slate-100 dark:text-slate-800"
                />
                <circle
                  cx="60"
                  cy="60"
                  r="46"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeWidth="10"
                  className="text-Clarix-500 transition-all duration-500 ease-out"
                  strokeDasharray={circumference}
                  strokeDashoffset={dashOffset}
                />
              </svg>
              <div className="absolute inset-0 grid place-items-center text-center">
                <div>
                  <p className="text-3xl font-semibold text-slate-950 dark:text-white">{progress}%</p>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">AI</p>
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">{currentStep}</p>
                <Sparkles className="text-Clarix-500 loading-twinkle" size={18} />
              </div>
              <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                <div
                  className="loading-progress h-full rounded-full bg-gradient-to-r from-Clarix-500 via-emerald-400 to-Clarix-600 transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="mt-5 grid grid-cols-4 gap-2">
                {t.steps.map((step, index) => (
                  <div
                    key={step}
                    className={`h-1.5 rounded-full transition ${
                      index <= activeStep ? "bg-Clarix-500" : "bg-slate-200 dark:bg-slate-800"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-3">
          {t.steps.map((step, index) => {
            const Icon = stepIcons[index];
            const isDone = index < activeStep;
            const isActive = index === activeStep;

            return (
              <div
                key={step}
                className={`loading-step animate-rise flex items-center gap-4 rounded-2xl border p-4 text-start shadow-sm transition duration-500 sm:p-5 ${
                  isActive
                    ? "border-Clarix-200 bg-white shadow-soft dark:border-Clarix-500/40 dark:bg-white/[0.09]"
                    : isDone
                      ? "border-emerald-200 bg-emerald-50/80 dark:border-emerald-500/30 dark:bg-emerald-500/10"
                      : "border-slate-200 bg-white/72 dark:border-white/10 dark:bg-white/[0.04]"
                }`}
                style={{ animationDelay: `${index * 110}ms` }}
              >
                <span
                  className={`relative grid h-12 w-12 shrink-0 place-items-center rounded-2xl transition ${
                    isDone
                      ? "bg-emerald-500 text-white"
                      : isActive
                        ? "bg-Clarix-500 text-white shadow-lg shadow-Clarix-500/25"
                        : "bg-slate-100 text-slate-400 dark:bg-slate-900 dark:text-slate-500"
                  }`}
                >
                  {isDone ? <CheckCircle2 size={23} /> : <Icon className={isActive ? "loading-icon" : ""} size={23} />}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-3">
                    <p className={`font-semibold ${isActive ? "text-slate-950 dark:text-white" : "text-slate-700 dark:text-slate-300"}`}>
                      {step}
                    </p>
                    <span className="text-xs font-semibold text-slate-400">0{index + 1}</span>
                  </div>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        isDone || isActive ? "bg-Clarix-500" : "bg-transparent"
                      }`}
                      style={{ width: isDone ? "100%" : isActive ? "62%" : "0%" }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Dashboard({ t, analysis, onReset }) {
  const apiRisks = analysis?.risks ?? [];
  const score = analysis?.compliance_score ?? 84;
  const displayedRisks = apiRisks.length
    ? apiRisks.map((risk) => [
        risk.risk_title ?? risk.title,
        risk.description,
        risk.risk_level ?? risk.level,
        risk.recommendation,
        risk.suggested_rewrite
      ])
    : t.riskItems.map(([title, description, level]) => [title, description, level, ""]);
  const recommendationItems = apiRisks.length
    ? apiRisks.map((risk) => [risk.recommendation, risk.suggested_rewrite || risk.description])
    : t.recItems;
  const primaryRisk = displayedRisks[0] ?? [t.missingAml, "", t.highRisk, t.addVerification];
  const riskBreakdown = [
    [t.highRisk, displayedRisks.filter((risk) => risk[2] === "High" || risk[2] === "مرتفع").length || 1, "bg-red-500"],
    [t.mediumRisk, displayedRisks.filter((risk) => risk[2] === "Medium" || risk[2] === "متوسط").length, "bg-amber-500"],
    [t.lowRisk, displayedRisks.filter((risk) => risk[2] === "Low" || risk[2] === "منخفض").length, "bg-emerald-500"]
  ];
  const chartBars = [62, 68, 71, 76, 73, Math.max(score - 3, 0), score];
  const timelineIcons = [UploadCloud, Landmark, ClipboardCheck];

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <SectionIntro icon={Gauge} title={t.dashboardTitle} body={t.dashboardBody} />
        <button
          onClick={onReset}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-Clarix-500 hover:text-Clarix-600"
        >
          <UploadCloud size={17} />
          {t.reset}
        </button>
      </div>

      <div className="mt-8 grid gap-5 lg:grid-cols-12">
        <article className="animate-rise rounded-2xl border border-slate-200 bg-white p-6 shadow-soft lg:col-span-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-slate-500">{t.scoreLabel}</p>
              <div className="mt-4 flex items-end gap-2">
                <span className="text-6xl font-semibold text-slate-950">{score}</span>
                <span className="pb-2 text-2xl font-semibold text-slate-400">%</span>
              </div>
            </div>
            <div className="relative h-28 w-28">
              <div
                className="absolute inset-0 rounded-full"
                style={{ background: `conic-gradient(#0B6E4F ${score * 3.6}deg, #e2e8f0 0deg)` }}
              />
              <div className="absolute inset-3 grid place-items-center rounded-full bg-white">
                <ShieldCheck className="text-Clarix-500" size={30} />
              </div>
            </div>
          </div>
          <p className="mt-5 leading-7 text-slate-600">{t.scoreNote}</p>
          <div className="mt-6 grid grid-cols-3 gap-2">
            {riskBreakdown.map(([label, count, color]) => (
              <div key={label} className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                <div className={`mb-2 h-2 w-8 rounded-full ${color}`} />
                <p className="text-lg font-semibold text-slate-950">{count}</p>
                <p className="text-xs font-semibold text-slate-500">{label}</p>
              </div>
            ))}
          </div>
        </article>

        <article className="animate-rise rounded-2xl border border-slate-200 bg-white p-6 shadow-soft lg:col-span-5" style={{ animationDelay: "80ms" }}>
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-slate-950">{t.riskOverview}</h2>
              <p className="mt-1 text-sm text-slate-500">{primaryRisk[0]}</p>
            </div>
            <span className="rounded-full border border-red-100 bg-red-50 px-3 py-1 text-sm font-semibold text-red-700">
              {primaryRisk[2]}
            </span>
          </div>

          <div className="mt-7 flex h-40 items-end gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
            {chartBars.map((value, index) => (
              <div key={value + index} className="flex flex-1 flex-col items-center gap-2">
                <div className="flex h-28 w-full items-end">
                  <div
                    className="w-full rounded-t-lg bg-gradient-to-t from-Clarix-600 to-emerald-300 shadow-sm transition-all"
                    style={{ height: `${value}%` }}
                  />
                </div>
                <span className="text-[11px] font-semibold text-slate-400">{index + 1}</span>
              </div>
            ))}
          </div>
          <p className="mt-3 text-sm font-semibold text-slate-500">{t.chartLabel}</p>
        </article>

        <article className="animate-rise rounded-2xl border border-slate-200 bg-slate-950 p-6 text-white shadow-soft lg:col-span-3" style={{ animationDelay: "140ms" }}>
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">{t.recommendations}</h2>
            <Sparkles className="text-emerald-300" size={20} />
          </div>
          <div className="mt-6 space-y-4">
            {recommendationItems.map(([title, body]) => (
              <div key={title} className="rounded-xl border border-white/10 bg-white/[0.06] p-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 shrink-0 text-emerald-300" size={19} />
                  <div>
                    <p className="font-semibold">{title}</p>
                    <p className="mt-1 text-sm leading-6 text-slate-300">{body}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className="animate-rise rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-5" style={{ animationDelay: "180ms" }}>
          <h2 className="text-lg font-semibold text-slate-950">{t.risks}</h2>
          <div className="mt-5 grid gap-3">
            {displayedRisks.map(([title, body, severity]) => (
              <div key={title} className="rounded-xl border border-slate-200 bg-white p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-amber-50 text-amber-600">
                      <AlertTriangle size={18} />
                    </span>
                    <div>
                      <h3 className="font-semibold text-slate-950">{title}</h3>
                      <p className="mt-1 text-sm leading-6 text-slate-600">{body}</p>
                    </div>
                  </div>
                  <span className={`shrink-0 rounded-full border px-2.5 py-1 text-xs font-semibold ${severityTone[severity]}`}>
                    {severity}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className="animate-rise rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-4" style={{ animationDelay: "220ms" }}>
          <h2 className="text-lg font-semibold text-slate-950">{t.timeline}</h2>
          <div className="mt-6 space-y-5">
            {t.timelineItems.map(([title, body, time], index) => {
              const Icon = timelineIcons[index];
              return (
                <div key={title} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-Clarix-50 text-Clarix-500">
                      <Icon size={19} />
                    </span>
                    {index < t.timelineItems.length - 1 && <span className="mt-2 h-10 w-px bg-slate-200" />}
                  </div>
                  <div className="min-w-0 flex-1 pb-1">
                    <div className="flex items-start justify-between gap-3">
                      <p className="font-semibold text-slate-950">{title}</p>
                      <span className="text-xs font-semibold text-slate-400">{time}</span>
                    </div>
                    <p className="mt-1 text-sm leading-6 text-slate-600">{body}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </article>

        <article className="animate-rise rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-3" style={{ animationDelay: "260ms" }}>
          <h2 className="text-lg font-semibold text-slate-950">{t.recentAnalysis}</h2>
          <div className="mt-5 space-y-3">
            {t.recentItems.map(([name, scoreValue, risk]) => (
              <div key={name} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate font-semibold text-slate-950">{name}</p>
                    <p className="mt-1 text-sm text-slate-500">{risk}</p>
                  </div>
                  <span className="rounded-lg bg-white px-2.5 py-1 text-sm font-semibold text-Clarix-600 shadow-sm">
                    {scoreValue}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}

function ChatPage({ t }) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: "assistant",
      content: t.chatGreeting
    }
  ]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages]);

  useEffect(() => {
    setMessages([
      {
        id: 1,
        role: "assistant",
        content: t.chatGreeting
      }
    ]);
    setInput("");
  }, [t.chatGreeting]);

  const sendMessage = (question = input) => {
    const trimmed = question.trim();
    if (!trimmed) return;

    const response = t.mockResponses[trimmed] ?? t.defaultMockResponse;
    setMessages((current) => [
      ...current,
      { id: Date.now(), role: "user", content: trimmed },
      { id: Date.now() + 1, role: "assistant", content: response }
    ]);
    setInput("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    sendMessage();
  };

  return (
    <section className="mx-auto flex min-h-[calc(100vh-73px)] max-w-6xl flex-col px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <SectionIntro icon={MessageCircle} title={t.chatTitle} body={t.chatBody} />
        <div className="flex flex-wrap gap-2">
          {t.chatExamples.map((question) => (
            <button
              key={question}
              onClick={() => sendMessage(question)}
              className="rounded-full border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-600 shadow-sm transition hover:border-Clarix-500 hover:text-Clarix-600"
            >
              {question}
            </button>
          ))}
        </div>
      </div>

      <div className="flex min-h-[560px] flex-1 flex-col overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-soft">
        <div className="border-b border-slate-200 bg-slate-50/80 px-5 py-4">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-Clarix-500 text-white">
              <ShieldCheck size={20} />
            </span>
            <div>
              <p className="font-semibold text-slate-950">Clarix AI</p>
              <p className="text-sm text-slate-500">{t.subtitle}</p>
            </div>
          </div>
        </div>

        <div className="flex-1 space-y-5 overflow-y-auto px-4 py-6 sm:px-6">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSubmit} className="border-t border-slate-200 bg-white p-4">
          <div className="flex items-end gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-2 focus-within:border-Clarix-500 focus-within:bg-white">
            <textarea
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter" && !event.shiftKey) {
                  event.preventDefault();
                  sendMessage();
                }
              }}
              rows={1}
              placeholder={t.chatPlaceholder}
              className="max-h-32 min-h-11 flex-1 resize-none bg-transparent px-3 py-3 text-sm text-slate-950 outline-none placeholder:text-slate-400"
            />
            <button
              type="submit"
              className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-slate-950 text-white transition hover:bg-Clarix-600"
              aria-label={t.send}
            >
              <Send size={18} />
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

function ChatMessage({ message }) {
  const isUser = message.role === "user";

  return (
    <div className={`flex gap-3 ${isUser ? "justify-end" : "justify-start"}`}>
      {!isUser && (
        <span className="mt-1 grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-Clarix-50 text-Clarix-500">
          <Sparkles size={18} />
        </span>
      )}
      <div
        className={`max-w-[min(760px,82%)] rounded-2xl px-4 py-3 text-sm leading-7 shadow-sm ${
          isUser
            ? "bg-slate-950 text-white"
            : "border border-slate-200 bg-white text-slate-700"
        }`}
      >
        {message.content}
      </div>
      {isUser && (
        <span className="mt-1 grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-slate-100 text-slate-500">
          <UserRound size={18} />
        </span>
      )}
    </div>
  );
}

function SectionIntro({ icon: Icon, title, body }) {
  return (
    <div className="max-w-2xl">
      <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-lg bg-Clarix-50 text-Clarix-500">
        <Icon size={23} />
      </div>
      <h2 className="text-3xl font-semibold text-slate-950 sm:text-4xl">{title}</h2>
      <p className="mt-3 leading-7 text-slate-600">{body}</p>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
