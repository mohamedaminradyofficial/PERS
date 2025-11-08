نطاق التنفيذ: تحويل أفضل الممارسات والمحتوى التعريفي الواردين في الملفين إلى منتج ويب عملي يتيح إنشاء «كتاب سلسلة» للتلفزيون و«لوك-بوك/ديك عرض» للسينما وفق معايير الصناعة، مع قوالب جاهزة، أدوات مساعدة، وتصدير احترافي للطباعة والعرض. 

tv_film_pitch_best_practices

 

A TV series bible and a film lo…

1) المحور الأول: متطلبات المنتج والوظائف (Product & Functional)
1.1 قصة المستخدم والأدوار

المنتِج/الكاتب (Creator): ينشئ مشروعًا جديدًا، يختار «قالب Bible/Lookbook»، يعبّئ الحقول (Logline، ملخص، شخصيات…)، يبني Moodboard، يحدد Comps والجمهور، ثم يصدّر الملف للطباعة أو العرض.

المراجع/المستثمر (Reviewer): يستعرض نسخة قراءة فقط، يعلّق، ويراجع مؤشرات الجاهزية التجارية/الفنية.

المسؤول (Admin): إدارة القوالب، الصلاحيات، سياسات التصدير والعلامة المائية.

1.2 الميزات الأساسية (20 ميزة)

إنشاء مشروع Pitch جديد مع مُعالج (Wizard) قصير.

قوالب جاهزة لثلاث حالات: TV Series Bible، Film Lookbook، Pitch Deck مختصر. 

A TV series bible and a film lo…

مُولّد/مُدقّق Logline (طول 18–35 كلمة، عناصر البطل/الحدث المحفِّز/الهدف/الرهانات/العائق). 

tv_film_pitch_best_practices

ملخص تنفيذي (Executive Summary) يبرز «Why This/Why Now». 

tv_film_pitch_best_practices

Synopsis & Treatment مع تحقّق بنيوي (الكشف عن النهاية في الـSynopsis، لغة المضارع في الـTreatment). 

tv_film_pitch_best_practices

صفحات الشخصيات (وصف موجز، دوافع، قوس تطور، صور مرجعية). 

tv_film_pitch_best_practices

TV فقط: مخطط الموسم، عناوين الحلقات، تفصيل Pilot بفقرات مشهدية. 

tv_film_pitch_best_practices

وحدة Market Comparables (Comps) مع ربط دلالي للنوع/الجمهور/الميزانية والتبرير السردي-التجاري. 

tv_film_pitch_best_practices

تحليل الجمهور والسوق (Demographic/Psychographic/Behavioral/Geographic/Cultural) مع حقول أدلة واستشهادات. 

tv_film_pitch_best_practices

النبرة والستايل البصري (Tone/Visual Style) مع حقول السينماتوغرافيا/لوحة الألوان/الإحساس العام. 

tv_film_pitch_best_practices

Moodboard Builder (شبكة صور عالية الدقة مع أوصاف، سحب-إفلات، ملاحظات). 

A TV series bible and a film lo…

خطة الإنتاج والجدولة (مراحل ما قبل/خلال/ما بعد). 

A TV series bible and a film lo…

الميزانية (BudgetLines مجمّعة حسب المرحلة/القسم). 

A TV series bible and a film lo…

خطة التمويل (مصادر، نسب، افتراضات). 

A TV series bible and a film lo…

التسويق والتوزيع (قنوات/توقيت/شرائح) مع منطق «Why This Market». 

A TV series bible and a film lo…

الفريق (أدوار، خبرات، صور) لإسناد المصداقية. 

A TV series bible and a film lo…

مكتبة أصول (صور/مقاطع/مستندات) وعلامة مائية اختيارية.

التعاون والتعليقات (تعليق مُثبت على مقطع/عنصر).

التصدير إلى PDF للطباعة وPPTX/HTML تفاعلي (روابط قابلة للنقر وفهرس تلقائي). 

A TV series bible and a film lo…

الإصدارات/القوالب/اللغات/الأذونات (AR/EN، أدوار، نسخ محفوظة).

1.3 المتطلبات غير الوظيفية

أداء عالٍ مع أصول بصرية كثيرة، LCP ≤ 2.5s، تصيير PDF تحت 20 ثانية للمشروعات المتوسطة.

إمكانية الطباعة بجودة 300dpi وهوامش منظمة.

أمن: تحكّم وصول دقيق، روابط مشاركة مؤقتة موقّعة.

i18n (العربية أولًا + الإنجليزية)، RTL كامل.

وصولية WCAG 2.2 AA.

سجلات وتتبع تصدير/مراجعات.

2) المحور الثاني: المعمارية والتصميم الفني (Architecture & Design)
2.1 التقنية المقترحة

Frontend: Next.js (App Router)، React، TypeScript، Tailwind + shadcn/ui.

Backend: Node.js (Fastify)، Prisma + PostgreSQL، Redis + BullMQ للمهام الخلفية (توليد الصور المصغّرة/التصدير).

التخزين: S3-Compatible (MinIO/S3) للأصول والصادرات.

التوثيق والهوية: NextAuth/OAuth + Email.

التصيير إلى PDF/PPTX: Playwright/Puppeteer + قوالب Deck.

المراقبة: Sentry + OpenTelemetry، Pino Logs.

الترجمة: next-intl (AR/EN).

2.2 نموذج البيانات (20 كيانًا أساسيًا)

User، 2) Organization، 3) Project، 4) Document، 5) Character، 6) Season، 7) Episode، 8) PilotBreakdown،

Logline, 10) SynopsisTreatment، 11) Comp، 12) AudienceSegment، 13) MarketInsight، 14) VisualAsset،

Moodboard، 16) BudgetLine، 17) FinancePlan، 18) TeamMember、19) Comment、20) ExportJob/ExportFile.

ملاحظات:

Document.type ∈ {series_bible, film_lookbook, pitch_deck} مع حقول Sections مهيكلة حسب القالب. 

A TV series bible and a film lo…

Logline يحتوي حقول التحقق (الطول/العناصر). 

tv_film_pitch_best_practices

Comp يربط النوع والجمهور والميزانية مع «مبرّر الملاءمة». 

tv_film_pitch_best_practices

2.3 خريطة الواجهات (12 صفحة رئيسية)

لوحة المشاريع، 2) إنشاء مشروع، 3) محرر الـBible، 4) محرر الـLookbook، 5) محرر الـPitch،

محرر الشخصيات، 7) مُكوّن الحلقات/الموسم، 8) وحدة Comps، 9) وحدة الجمهور/السوق،

مُنشئ الـMoodboard، 11) الإعدادات/الترجمة/القوالب، 12) شاشة التصدير/المراجعات.

2.4 واجهات برمجة (عينات)

POST /api/projects، GET /api/projects/:id

POST /api/documents/:id/sections (حفظ قسم Bible/Lookbook)

POST /api/logline/validate (تحقق القواعد) 

tv_film_pitch_best_practices

POST /api/exports/pdf|pptx (تشغيل مهمة تصدير عبر BullMQ)

POST /api/moodboard/assets، GET /api/comps، POST /api/audience/segments

2.5 التصميم البصري

نظام شبكي، مسافات رحبة، صور عالية الدقة، نصوص قصيرة لكل قسم (Lookbook: «الصورة أولًا»). 

A TV series bible and a film lo…

نمط طباعة (CSS print) منفصل، وصفحات ممهّدة للعناوين/الفهارس.

مكوّنات: SectionCard، CharacterCard، EpisodeOutline، CompItem، KPI Badges.

3) المحور الثالث: خطة التنفيذ والاختبارات والتسليم (Delivery & QA)
3.1 منهجية المراحل (وفق دورة الإنتاج): assemble → grade → mix → render → export

assemble: تأسيس المشروع، المخطط البياني، نماذج البيانات، صفحات التحرير الأساسية (Bible/Lookbook).

grade: تطبيق قواعد الجودة (Logline/Synopsis)، تحسين الستايل البصري، ضبط القوالب والطباعة. 

tv_film_pitch_best_practices

mix: دمج وحدات Comps والجمهور/السوق والميزانية/التمويل والتوزيع في تدفق واحد. 

A TV series bible and a film lo…

render: تنفيذ محرّك التصدير PDF/PPTX ومزامنة الموارد البصرية.

export: حوكمة الإصدارات، الروابط الموقّعة، سجل التصدير، والمقاييس.

3.2 خطة إنجاز مختصرة (أسابيع 1–4)

أسبوع 1: البنية، المصادقة، نماذج Project/Document/Asset، محرر الأقسام، Logline Validator.

أسبوع 2: شخصيات/حلقات/بايلوت، وحدتا Synopsis/Treatment، Moodboard.

أسبوع 3: Comps + Audience/Market، الميزانية/التمويل، الفريق، مؤشرات الجاهزية.

أسبوع 4: التصدير (PDF/PPTX)، الطباعة، التحكم في الإصدارات، الوصولية/SEO، صقل الأداء.

3.3 معايير قبول انتقائية

Logline: إدخال واحد يُمرّ عبر محقق الطول (≤35 كلمة) وتوفر العناصر الخمسة؛ فشل أي عنصر يمنع الحفظ. 

tv_film_pitch_best_practices

Synopsis/Treatment: تنبيهات تلقائية عند غياب النهاية في الـSynopsis أو عدم المضارع في الـTreatment. 

tv_film_pitch_best_practices

Comps: حد أدنى 2–3 عناوين مع تبرير صريح وحقول نوع/جمهور/ميزانية. 

tv_film_pitch_best_practices

Lookbook: كل قسم ≤ 300–500 كلمة وصورة/لوح مزاج على الأقل. 

A TV series bible and a film lo…

TV Bible: وجود Pilot Breakdown + Season Arc مختصر. 

tv_film_pitch_best_practices

تصدير: توليد PDF بفهرس وعناوين مرقّمة وصور بدقة ≥ 180dpi وPPTX شرائح مطابقة للأقسام.

3.4 الاختبارات والجودة

وحدات/تكامل: منطق التحقق (Logline/Synopsis)، حفظ الأقسام، ترقيم الصفحات.

E2E (Playwright): تدفقات «إنشاء-تحرير-تصدير» للثلاثة قوالب.

أداء: LHCI ميزانية صور/خطوط، زمن تصدير مشروع نموذجي ≤ 20 ثانية.

وصولية: تباين ألوان، تبويبات لوحة المفاتيح، نص بديل لكل صورة.

أمان: روابط مشاركة موقّتة، صلاحيات دقيقة، فحص حقن/رفع ملفات.

قاموس المصطلحات (AR/EN) — عناوين فرعية مرقّمة

اللوغلاين (Logline): جملة/جملتان تُقطِّر جوهر القصة (بطل، حدث محفز، هدف، رهانات، عائق). تُستخدم كخطّاف فوري للمراجعين. 

tv_film_pitch_best_practices

كتاب السلسلة (TV Series Bible): مستند يبيّن العالم والشخصيات وأقواس الموسم والبايلوت؛ يُظهر قابلية الامتداد وعدسة السرد. 

A TV series bible and a film lo…

اللوك-بوك/ديك العرض (Film Lookbook/Pitch Deck): مخطط بصري موجّه يجعل «الصور أولًا» ويحد النص لكل قسم. 

A TV series bible and a film lo…

الملخص (Synopsis): عرض موجز يكشف كامل القصة بما فيها النهاية، مُهيّأ للمراجعة السريعة. 

tv_film_pitch_best_practices

المعالجة (Treatment): نثر مفصّل للمشاهد والتتابعات بصيغة المضارع ليحمل النبرة والموضوع. 

tv_film_pitch_best_practices

الحلقة التجريبية (Pilot): تفصيل دقيق للمشاهد/المنعطفات يبرر استمرار المشاهدة. 

tv_film_pitch_best_practices

مقارنات السوق (Comps): أعمال ناجحة مشابهة توضّح الملاءمة التجارية والنبرة والجمهور المستهدف. 

tv_film_pitch_best_practices

شرائح الجمهور (Audience Segments): تفكيك ديموغرافي/نفسي/سلوكي/جغرافي/ثقافي يُغذّي القرارات التجارية. 

tv_film_pitch_best_practices

النبرة والستايل البصري (Tone & Visual Style): حزمة خيارات تصوير/ألوان/إحساس لخلق الجوّ المقصود. 

tv_film_pitch_best_practices

لوح المزاج (Moodboard): شبكة صور مرجعية عالية الدقة تروي الإحساس وتضبط الهوية البصرية. 

A TV series bible and a film lo…

الملخص التنفيذي (Executive Summary): بيان مختصر «لماذا هذا/الآن» يربط الفن بالجدوى. 

A TV series bible and a film lo…

خطة الإنتاج (Production Plan): مراحل قبل/خلال/بعد مع معالم واقعية قابلة للقياس. 

A TV series bible and a film lo…

الميزانية (Budget): بنود تكلفة مقسّمة منطقيًا مع افتراضات واضحة. 

A TV series bible and a film lo…

التمويل (Financing): مصادر وأوزان وتدفقات نقدية متوقعة. 

A TV series bible and a film lo…

التوزيع والتسويق (Distribution & Marketing): قنوات/توقيت/رسائل مخصصة لشرائح الجمهور. 

A TV series bible and a film lo…

الجدول المرجعي السريع
المحور	عناصر مُحدّدة في المتن	أمثلة مذكورة
1) المنتج والوظائف	20 ميزة	Logline, Comps, Moodboard, Export
2) المعمارية والتصميم	20 كيان بيانات + 12 صفحة	Document.type، ExportJob، محرر Bible
3) التنفيذ والجودة	5 مراحل + 5 معايير قبول	assemble→export، قواعد Synopsis

المجموع الكلي للعناصر المحصاة: 20 + 20 + 12 + 5 + 5 = 62 عنصرًا (تطابق ما ورد أعلاه).

التحديثات والإضافات الرئيسية

إصدار أولي: لا إصدار سابق للمقارنة. أُضيفت دورة تنفيذ assemble→grade→mix→render→export وربطت بمراحل التطوير البرمجي.

ملاحظات الاستخدام

التزم بالاقتصاد النصي داخل أقسام اللوك-بوك؛ الصورة أولًا ثم جملة/فقرتان موجزتان. 

A TV series bible and a film lo…

لا تُنجز Synopsis بدون نهاية؛ ولا Treatment بصياغة غير المضارع. 

tv_film_pitch_best_practices

وفّر 2–3 Comps على الأقل مع تبرير صريح للملاءمة. 

tv_film_pitch_best_practices

اضبط Logline على حدود الطول وقواعد العناصر الخمسة قبل السماح بالحفظ. 

tv_film_pitch_best_practices

عند التصدير، استخدم قوالب طباعة/عرض منفصلة لضمان دقة العرض عبر الوسائط. 

A TV series bible and a film lo…

معايير التصنيف الشامل

أولوية التنفيذ (P0→P2):

P0: القوالب + Logline + Synopsis/Treatment + التصدير.

P1: شخصيات/حلقات/Comps/الجمهور.

P2: الميزانية/التمويل/التوزيع/الفريق/المكتبة.

جودة المحتوى: اكتمال أقسام القالب، مطابقة القواعد البنيوية، وضوح النبرة البصرية.

الجاهزية التجارية: وجود Comps مبررة، شرائح جمهور واضحة، وExecutive Summary مقنع.

جودة الإخراج: PDF/PPTX مطابق هيكليًا للقسم الأصلي، صور عالية الدقة، فهرس وعناوين صحيحة.