/* =====================================================
   ConsumerLens AI — script.js (Bilingual: 中文 / English)
   100% local, rule-based text analysis.
   No APIs, no backend, no external services.
===================================================== */

(function () {
  "use strict";

  const LANG_KEY = "consumerlens_lang";
  const HISTORY_KEY = "consumerlens_history";

  /* -----------------------------------------------------
     1. UI TEXT DICTIONARY (data-i18n keys)
  ----------------------------------------------------- */

  const I18N = {
    zh: {
      tagBadge: "本地运行 · 无需API · 零成本",
      tagline: "消费者之声与竞争洞察平台",
      heroDesc: "将消费者评论转化为可执行的商业洞察。",

      inputSectionTitle: "1. 输入评论进行分析",
      inputSectionSubtext: "粘贴真实或示例客户评论，每条评论请单独占一行。建议每个品牌至少输入 3 条评论，以获得有意义的分析结果。",
      labelBrandName: "品牌名称",
      labelCompetitorName: "竞品名称",
      labelBrandReviews: "本品牌消费者评论",
      labelCompetitorReviews: "竞品消费者评论",
      lineHint: "每条评论单独占一行",
      placeholderBrandName: "例如：纯萃蛋白",
      placeholderCompetitorName: "例如：劲能营养棒",
      placeholderBrandReviews: "每条评论单独占一行...\n例如：\n口感很好，比其他蛋白棒好吃很多。\n配送晚了，包装也有点破损。",
      placeholderCompetitorReviews: "每条评论单独占一行...\n例如：\n质量还可以，但价格偏贵。\n客服态度不好，退款申请一直没有回复。",
      btnAnalyse: "开始分析",
      btnSample: "加载示例数据",
      btnClearHistory: "清除历史记录",

      progressSectionTitle: "2. 正在进行本地分析",
      progressSectionSubtext: "所有分析均在您的浏览器本地完成，基于规则的文本分析技术，不调用任何外部服务。",
      agent1Name: "Agent 1：情感分析",
      agent2Name: "Agent 2：主题发现",
      agent3Name: "Agent 3：消费者洞察",
      agent4Name: "Agent 4：竞争对标",
      statusWaiting: "等待中",
      statusAnalysing: "分析中",
      statusComplete: "已完成",

      dashboardTitle: "结果仪表盘",
      labelOverallSatisfactionYou: "总体满意度（本品牌）",
      labelOverallSatisfactionCompetitor: "总体满意度（竞品）",
      sentimentDistTitle: "情感分布 — 本品牌",
      positiveLabel: "正面评论",
      neutralLabel: "中立评论",
      negativeLabel: "负面评论",
      topPositiveThemesTitle: "主要正面主题",
      painPointsTitle: "核心痛点",
      consumerInsightsTitle: "消费者洞察",
      personasTitle: "消费者画像",
      personasSubtext: "仅展示评论中有证据支持的消费者画像。",
      benchmarkTitle: "竞争对标",
      colCategory: "类别",
      colYourBrand: "本品牌",
      colCompetitor: "竞品",
      colGap: "差距",
      actionPlanTitle: "优先行动计划",
      highPriority: "高优先级",
      mediumPriority: "中优先级",
      lowPriority: "低优先级",
      trendTitle: "历史趋势",
      trendSubtext: "追踪您在此浏览器上完成的所有分析的满意度得分变化。",
      trendEmptyText: "完成至少两次分析后，这里将显示趋势折线图。每次完成的分析都会自动保存到您浏览器的本地历史记录中。",
      mentionsSuffix: "条提及",
      reviewsSuffix: "条评论",
      noPositiveThemesText: "未在这些评论中检测到明显的正面主题。",
      noPainPointsText: "未在这些评论中检测到明显的负面主题。",
      noPersonasText: "暂未检测到有力的消费者画像特征，尝试输入更详细的评论以获得画像分析。",

      historyTitle: "历史记录",
      historySubtext: "数据保存在您浏览器的本地存储（localStorage）中。点击任意记录可重新加载该次分析结果。",
      historyEmptyText: "暂无历史记录。完成上方第一次分析后即可开始积累历史数据。",
      historyYouLabel: "本品牌",
      historyCompetitorLabel: "竞品",

      footerText: "ConsumerLens AI 完全在您的浏览器本地运行。任何评论内容、品牌名称或分析结果均不会被发送到任何服务器、API 或第三方。",

      errorMinBrand: "请至少输入3条本品牌消费者评论。",
      errorMinCompetitor: "请至少输入3条竞品消费者评论。",

      loadedFromHistoryPrefix: "已从历史记录加载 —",
      historyDetailNote: "此条记录来自历史存档。完整的主题、画像与竞争对标细节仅在刚完成分析后展示。",
      personaHistoryNote: "历史记录不保存画像细节，请重新运行一次分析以生成画像。",
      benchmarkHistoryNote: "历史记录不保存对标细节，请重新运行一次分析以生成完整对比。",
      actionHistoryNote: "请重新运行一次分析以生成完整行动计划。",
      runNewAnalysis: "请重新运行分析",

      defaultBrandName: "本品牌",
      defaultCompetitorName: "竞品"
    },

    en: {
      tagBadge: "Runs 100% locally · No API · No cost",
      tagline: "Voice of Customer & Competitive Intelligence Platform",
      heroDesc: "Turn customer feedback into actionable business insights.",

      inputSectionTitle: "1. Enter Reviews for Analysis",
      inputSectionSubtext: "Paste real or sample customer reviews below. Each review should be on its own line. We recommend at least 3 reviews per brand for meaningful results.",
      labelBrandName: "Brand Name",
      labelCompetitorName: "Competitor Name",
      labelBrandReviews: "Your Customer Reviews",
      labelCompetitorReviews: "Competitor Customer Reviews",
      lineHint: "Enter one review per line",
      placeholderBrandName: "e.g., PureFuel Protein",
      placeholderCompetitorName: "e.g., FlexBar Nutrition",
      placeholderBrandReviews: "Enter one review per line...\nExample:\nThe taste is amazing and it keeps me full for hours.\nDelivery was late and the packaging was damaged.",
      placeholderCompetitorReviews: "Enter one review per line...\nExample:\nGood quality but a bit expensive for the size.\nCustomer service was unhelpful when I had an issue.",
      btnAnalyse: "Analyse Reviews",
      btnSample: "Load Sample Data",
      btnClearHistory: "Clear History",

      progressSectionTitle: "2. Running Local Analysis",
      progressSectionSubtext: "All processing happens in your browser using rule-based text analysis. No external services are called.",
      agent1Name: "Agent 1: Sentiment Analysis",
      agent2Name: "Agent 2: Theme Discovery",
      agent3Name: "Agent 3: Consumer Insight",
      agent4Name: "Agent 4: Competitive Benchmark",
      statusWaiting: "Waiting",
      statusAnalysing: "Analysing",
      statusComplete: "Completed",

      dashboardTitle: "Results Dashboard",
      labelOverallSatisfactionYou: "Overall Satisfaction — Your Brand",
      labelOverallSatisfactionCompetitor: "Overall Satisfaction — Competitor",
      sentimentDistTitle: "Sentiment Distribution — Your Brand",
      positiveLabel: "Positive Reviews",
      neutralLabel: "Neutral Reviews",
      negativeLabel: "Negative Reviews",
      topPositiveThemesTitle: "Top Positive Themes",
      painPointsTitle: "Key Pain Points",
      consumerInsightsTitle: "Consumer Insights",
      personasTitle: "Consumer Personas",
      personasSubtext: "Personas are only shown when supported by evidence in the submitted reviews.",
      benchmarkTitle: "Competitive Benchmark",
      colCategory: "Category",
      colYourBrand: "Your Brand",
      colCompetitor: "Competitor",
      colGap: "Gap",
      actionPlanTitle: "Priority Action Plan",
      highPriority: "High Priority",
      mediumPriority: "Medium Priority",
      lowPriority: "Low Priority",
      trendTitle: "Historical Trend",
      trendSubtext: "Tracks satisfaction scores across all analyses completed on this browser.",
      trendEmptyText: "Run at least two analyses to see a trend line here. Each completed analysis is saved automatically to your browser's local history.",
      mentionsSuffix: " mention(s)",
      reviewsSuffix: " reviews",
      noPositiveThemesText: "No clear positive themes were detected in these reviews.",
      noPainPointsText: "No clear negative themes were detected in these reviews.",
      noPersonasText: "No strong persona patterns were detected yet. Try adding more detailed reviews to surface consumer personas.",

      historyTitle: "Analysis History",
      historySubtext: "Stored locally in your browser using localStorage. Click an entry to reload that result.",
      historyEmptyText: "No saved analyses yet. Run your first analysis above to start building history.",
      historyYouLabel: "You",
      historyCompetitorLabel: "Competitor",

      footerText: "ConsumerLens AI runs entirely in your browser. No reviews, brand names, or results are sent to any server, API, or third party.",

      errorMinBrand: "Please enter at least 3 customer reviews for your brand.",
      errorMinCompetitor: "Please enter at least 3 customer reviews for the competitor.",

      loadedFromHistoryPrefix: "Loaded from history —",
      historyDetailNote: "This entry was loaded from saved history. Full theme, persona and benchmark detail is only available immediately after running a live analysis.",
      personaHistoryNote: "Persona detail is not stored in history. Run a new analysis to regenerate personas.",
      benchmarkHistoryNote: "Benchmark detail is not stored in history. Run a new analysis to regenerate the full comparison.",
      actionHistoryNote: "Run a new analysis to regenerate a full action plan.",
      runNewAnalysis: "Run a new analysis",

      defaultBrandName: "Your Brand",
      defaultCompetitorName: "Competitor"
    }
  };

  function t(key) {
    return I18N[state.lang][key] || key;
  }

  /* -----------------------------------------------------
     2. KEYWORD DICTIONARIES (Chinese + English, combined)
  ----------------------------------------------------- */

  const POSITIVE_WORDS_ZH = ["喜欢", "很好", "满意", "方便", "漂亮", "快速", "推荐",
    "好吃", "舒服", "优质", "便宜", "值得", "不错", "优秀", "棒", "完美", "新鲜",
    "耐用", "可靠", "贴心", "精致", "划算", "好评", "满意度高", "省心", "干净"];

  const NEGATIVE_WORDS_ZH = ["贵", "太慢", "不好", "失望", "难吃", "破损", "糟糕",
    "不舒服", "麻烦", "不推荐", "质量差", "慢", "差评", "垃圾", "不值", "退货",
    "投诉", "劣质", "难用", "过时", "偏贵", "不新鲜", "损坏", "延迟"];

  const POSITIVE_WORDS_EN = ["great", "love", "loved", "excellent", "amazing",
    "fantastic", "awesome", "good", "best", "perfect", "delicious", "tasty",
    "fresh", "affordable", "worth", "reasonable", "fast", "quick", "easy",
    "convenient", "comfortable", "durable", "sturdy", "reliable", "helpful",
    "friendly", "responsive", "beautiful", "stylish", "sleek", "nutritious",
    "healthy", "smooth", "soft", "effective", "satisfied", "satisfying",
    "recommend", "favorite", "favourite", "impressed", "impressive",
    "superb", "outstanding", "solid", "wonderful", "premium", "clean",
    "consistent", "nice", "pleasant", "enjoyable"];

  const NEGATIVE_WORDS_EN = ["bad", "terrible", "awful", "horrible", "poor",
    "disappointing", "disappointed", "worst", "hate", "hated", "expensive",
    "overpriced", "pricey", "costly", "slow", "late", "delayed", "difficult",
    "hard", "confusing", "uncomfortable", "cheap", "flimsy", "broken",
    "defective", "damaged", "stale", "bland", "gross", "disgusting", "rude",
    "unhelpful", "unresponsive", "useless", "waste", "regret", "avoid",
    "never again", "faulty", "leaking", "torn", "missing", "wrong",
    "incorrect", "subpar", "mediocre", "weak", "artificial", "chalky",
    "gritty", "inconsistent", "outdated", "crushed"];

  const THEMES = {
    price: {
      zh: ["价格", "贵", "便宜", "实惠", "划算", "性价比", "超值", "物有所值", "昂贵"],
      en: ["price", "expensive", "cheap", "cost", "affordable", "overpriced",
        "value", "worth", "pricey", "budget", "discount", "deal", "costly"]
    },
    quality: {
      zh: ["质量", "做工", "耐用", "结实", "劣质", "破损", "精致", "高档", "质量差", "质量不稳定"],
      en: ["quality", "durable", "sturdy", "well-made", "cheaply made",
        "defective", "broken", "premium", "solid", "flimsy", "faulty",
        "inconsistent", "consistent"]
    },
    taste: {
      zh: ["口味", "好吃", "难吃", "味道", "香", "甜", "咸", "美味", "回味", "口感"],
      en: ["taste", "tasty", "flavor", "flavour", "delicious", "bland",
        "sweet", "salty", "gross", "yummy", "aftertaste", "chalky", "gritty",
        "flavorful"]
    },
    packaging: {
      zh: ["包装", "盒子", "包装破损", "包装精美", "袋子", "封口", "包装盒", "外包装"],
      en: ["packaging", "package", "box", "wrapper", "seal", "packet",
        "bag", "container", "wrapping", "crushed"]
    },
    delivery: {
      zh: ["配送", "发货", "快递", "物流", "送货", "延迟", "准时", "到货", "派送"],
      en: ["delivery", "shipping", "shipment", "arrived", "delayed",
        "late", "fast delivery", "on time", "courier", "tracking", "shipped"]
    },
    service: {
      zh: ["服务", "客服", "售后", "态度", "退款", "退货", "响应", "支持"],
      en: ["service", "support", "customer service", "staff", "response",
        "rude", "helpful", "representative", "refund", "return", "respond"]
    },
    convenience: {
      zh: ["方便", "便利", "快捷", "简单", "携带方便", "轻松", "省事"],
      en: ["convenient", "easy", "quick", "portable", "on-the-go",
        "hassle", "simple", "handy", "effortless", "on the go"]
    },
    design: {
      zh: ["设计", "外观", "颜值", "好看", "款式", "风格", "时尚", "过时"],
      en: ["design", "look", "style", "sleek", "color", "colour",
        "appearance", "aesthetic", "stylish", "outdated"]
    },
    comfort: {
      zh: ["舒服", "舒适", "合身", "柔软", "不舒服", "贴合"],
      en: ["comfortable", "comfort", "fit", "soft", "cozy", "snug",
        "uncomfortable", "dense", "dry"]
    },
    ingredients: {
      zh: ["成分", "配料", "天然", "添加剂", "营养", "蛋白质", "热量", "有机", "防腐剂"],
      en: ["ingredients", "protein", "sugar", "natural", "artificial",
        "organic", "gluten", "additive", "preservative", "calories",
        "nutrition", "nutritious"]
    }
  };

  const THEME_LABELS = {
    zh: { price: "价格", quality: "质量", taste: "口味", packaging: "包装",
      delivery: "配送", service: "服务", convenience: "便利性", design: "设计",
      comfort: "舒适度", ingredients: "成分" },
    en: { price: "Price", quality: "Quality", taste: "Taste", packaging: "Packaging",
      delivery: "Delivery", service: "Service", convenience: "Convenience",
      design: "Design", comfort: "Comfort", ingredients: "Ingredients" }
  };

  const BENCHMARK_CATEGORY_KEYS = ["satisfaction", "price", "quality", "packaging", "delivery", "service"];
  const BENCHMARK_LABELS = {
    zh: { satisfaction: "满意度", price: "价格感知", quality: "质量", packaging: "包装",
      delivery: "配送", service: "服务" },
    en: { satisfaction: "Satisfaction", price: "Price Perception", quality: "Quality",
      packaging: "Packaging", delivery: "Delivery", service: "Service" }
  };

  const ACTION_TEMPLATES = {
    zh: {
      price: "重新评估定价策略或推出组合优惠 — 价格敏感度是客户反馈中反复出现的主题。",
      quality: "加强产品质量把控 — 评论中反复出现耐用性与瑕疵相关的问题。",
      taste: "改进口味配方，以解决反复出现的口感投诉。",
      packaging: "提升包装的耐损性与设计，减少运输损坏和相关差评。",
      delivery: "排查配送与物流的可靠性 — 延迟正在影响客户体验。",
      service: "加强客服培训，缩短响应与处理时间。",
      convenience: "简化产品使用方式或说明，解决便利性方面的顾虑。",
      design: "根据客户反馈更新产品设计与视觉呈现。",
      comfort: "根据客户反馈改进产品的舒适度或贴合度。",
      ingredients: "重新审视配方成分 — 客户对成分或营养表达了担忧。",
      noHigh: "未检测到高严重度问题，请持续关注评论动态。",
      noMedium: "本批次评论中未检测到中等严重度的问题。",
      maintainStrength: (theme) => `继续在营销与传播中强化您在「${theme}」方面的优势。`,
      maintainGeneric: "保持当前的质量标准，并持续收集客户反馈。"
    },
    en: {
      price: "Reassess pricing strategy or introduce value bundles — price sensitivity is a recurring theme in customer feedback.",
      quality: "Audit product quality control — durability and defect issues are appearing in customer reviews.",
      taste: "Revisit flavor formulation to address recurring taste complaints.",
      packaging: "Improve packaging durability and design to reduce damage and negative comments.",
      delivery: "Investigate delivery and shipping reliability — delays are affecting customer experience.",
      service: "Invest in customer service training and faster response times.",
      convenience: "Simplify product usage or instructions to address convenience concerns.",
      design: "Refresh product design and visual presentation based on customer feedback.",
      comfort: "Improve product comfort or fit based on customer reports.",
      ingredients: "Review ingredient formulation — customers are raising concerns about ingredients or nutrition.",
      noHigh: "No high-severity issues detected. Continue monitoring reviews regularly for early warning signs.",
      noMedium: "No medium-severity issues detected in this batch of reviews.",
      maintainStrength: (theme) => `Continue reinforcing your strength in ${theme} through marketing and messaging.`,
      maintainGeneric: "Maintain current quality standards and continue collecting customer feedback."
    }
  };

  const PERSONA_DEFINITIONS = {
    zh: {
      price: { title: "价格敏感型消费者", tags: ["价格敏感", "追求性价比"],
        describe: (c) => `密切关注价格与价值的平衡。价格相关话题在 ${c} 条评论中被提及，显示该客群非常看重性价比。` },
      quality: { title: "品质导向型消费者", tags: ["注重细节", "品牌忠诚"],
        describe: (c) => `重视产品的耐用性与一致性。质量相关话题在 ${c} 条评论中被提及，表明该客群会仔细比较产品标准。` },
      convenience: { title: "便利导向型消费者", tags: ["时间紧张", "务实"],
        describe: (c) => `重视易用性与便携性。便利性话题在 ${c} 条评论中被提及，通常与忙碌的生活方式相关。` },
      ingredients: { title: "健康健身型消费者", tags: ["注重健康", "关注成分表"],
        describe: (c) => `关注营养与成分品质。成分相关话题在 ${c} 条评论中被提及，反映出注重健康的购买决策。` },
      design: { title: "设计审美型消费者", tags: ["注重美感", "在意品牌形象"],
        describe: (c) => `留意产品的视觉呈现与风格。设计相关话题在 ${c} 条评论中被提及，说明外观会影响该客群的评价。` }
    },
    en: {
      price: { title: "Value Seeker", tags: ["Price-sensitive", "Deal-driven"],
        describe: (c) => `Weighs cost against benefit before buying. Price-related themes appear in ${c} review(s), showing this segment pays close attention to value for money.` },
      quality: { title: "Quality-Focused Buyer", tags: ["Detail-oriented", "Brand-loyal"],
        describe: (c) => `Prioritizes durability and consistency. Quality-related themes appear in ${c} review(s), indicating shoppers who compare product standards closely.` },
      convenience: { title: "Convenience Seeker", tags: ["Time-poor", "Practical"],
        describe: (c) => `Values ease of use and portability. Convenience is mentioned in ${c} review(s), often in the context of on-the-go or busy lifestyles.` },
      ingredients: { title: "Fitness and Health Consumer", tags: ["Health-focused", "Label-reader"],
        describe: (c) => `Focused on nutrition and ingredient quality. Ingredient-related themes appear in ${c} review(s), reflecting health-conscious purchase decisions.` },
      design: { title: "Design-Conscious Consumer", tags: ["Aesthetic-driven", "Image-aware"],
        describe: (c) => `Notices visual presentation and style. Design is mentioned in ${c} review(s), suggesting aesthetics influence this segment's opinion.` }
    }
  };

  /* -----------------------------------------------------
     3. SAMPLE DATA (Chinese + English)
  ----------------------------------------------------- */

  const SAMPLE = {
    zh: {
      brandName: "纯萃蛋白",
      competitorName: "劲能营养棒",
      brandReviews: [
        "口感很好，比其他蛋白棒好吃很多。",
        "包装到货时有点破损，不过零食本身没问题。",
        "配送很快，比预计提前两天到货。",
        "价格有点贵，不过质量对得起这个价钱。",
        "口感不错，不会像其他品牌那样难以下咽。",
        "客服态度很好，订单延迟的时候很耐心地帮我处理。",
        "体积小很方便随身携带，健身包里放着刚好。",
        "配料很干净，蛋白质含量也很扎实。",
        "外包装的封口不好撕，有点麻烦。",
        "吃起来很舒服，不会太干也不会太腻。",
        "包装设计很有质感，摆在货架上显得高档。",
        "物流时间比预期长，快递单号也查不到。"
      ].join("\n"),
      competitorReviews: [
        "质量还可以，但口味有点淡。",
        "价格偏贵，性价比不高。",
        "配送晚了快一个星期。",
        "客服态度很差，退款申请一直没有回复。",
        "包装很结实，运输过程中没有损坏。",
        "方便当早餐吃，很快捷。",
        "配料表里添加剂有点多，不太喜欢。",
        "外观设计比其他品牌显得过时。",
        "口感偏干，不太好嚼。",
        "这次配送很快，两天就到了。",
        "体积正好可以放进包里携带。",
        "质量不太稳定，有一条尝起来不新鲜。"
      ].join("\n")
    },
    en: {
      brandName: "PureFuel Protein",
      competitorName: "FlexBar Nutrition",
      brandReviews: [
        "The taste is amazing, way better than other protein bars I've tried.",
        "Packaging arrived a bit crushed but the bar itself was fine.",
        "Delivery was fast, arrived two days early which was a nice surprise.",
        "A little expensive for the size, but the quality justifies the price.",
        "Great texture and not too chalky like some competitors.",
        "Customer service was extremely helpful when my order was delayed.",
        "Easy to throw in my gym bag, very convenient for on-the-go snacking.",
        "Ingredients are clean and the protein content is impressive.",
        "The wrapper is hard to open and tears easily.",
        "Comfortable to eat without feeling too dense or dry.",
        "Love the design of the packaging, it looks premium on the shelf.",
        "Shipping took longer than expected and tracking was confusing."
      ].join("\n"),
      competitorReviews: [
        "Good quality bar but a bit bland in taste.",
        "Overpriced for what you get, not worth the cost.",
        "Delivery was late by almost a week.",
        "Customer service was unhelpful and slow to respond to my refund request.",
        "Packaging is sturdy and doesn't get damaged during shipping.",
        "The bar is convenient for quick breakfasts.",
        "Ingredients list has too many artificial additives for my taste.",
        "Design of the box looks outdated compared to other brands.",
        "Texture is a bit dry and hard to chew.",
        "Fast delivery this time, arrived within two days.",
        "Comfortable size to carry in a bag.",
        "Quality control seems inconsistent, one bar was stale."
      ].join("\n")
    }
  };

  /* -----------------------------------------------------
     4. APPLICATION STATE
  ----------------------------------------------------- */

  const state = {
    lang: "zh",
    hasResults: false,
    brandName: "",
    competitorName: "",
    brandAnalysis: null,
    competitorAnalysis: null,
    benchmarkRows: null,
    insightsData: null,
    personasData: null,
    actionPlanData: null,
    stageStatus: { sentiment: "waiting", theme: "waiting", insight: "waiting", benchmark: "waiting" },
    currentErrorKey: null,
    lastLoadedHistoryEntry: null
  };

  /* -----------------------------------------------------
     5. DOM REFERENCES
  ----------------------------------------------------- */

  const el = {
    langBtnZh: document.getElementById("lang-btn-zh"),
    langBtnEn: document.getElementById("lang-btn-en"),

    brandName: document.getElementById("brand-name"),
    competitorName: document.getElementById("competitor-name"),
    brandReviews: document.getElementById("brand-reviews"),
    competitorReviews: document.getElementById("competitor-reviews"),
    errorMessage: document.getElementById("error-message"),
    btnAnalyse: document.getElementById("btn-analyse"),
    btnSample: document.getElementById("btn-sample"),
    btnClearHistory: document.getElementById("btn-clear-history"),

    progressSection: document.getElementById("progress-section"),
    stageTracker: document.getElementById("stage-tracker"),

    dashboard: document.getElementById("dashboard"),
    dashboardMeta: document.getElementById("dashboard-meta"),

    brandScoreCircle: document.getElementById("brand-score-circle"),
    brandScoreValue: document.getElementById("brand-score-value"),
    brandScoreSub: document.getElementById("brand-score-sub"),
    competitorScoreCircle: document.getElementById("competitor-score-circle"),
    competitorScoreValue: document.getElementById("competitor-score-value"),
    competitorScoreSub: document.getElementById("competitor-score-sub"),

    sentimentBars: document.getElementById("sentiment-bars"),
    sentimentLegend: document.getElementById("sentiment-legend"),

    positiveThemes: document.getElementById("positive-themes"),
    painPoints: document.getElementById("pain-points"),

    insightCards: document.getElementById("insight-cards"),
    personaCards: document.getElementById("persona-cards"),

    thBrand: document.getElementById("th-brand"),
    thCompetitor: document.getElementById("th-competitor"),
    benchmarkBody: document.getElementById("benchmark-body"),
    benchmarkSummary: document.getElementById("benchmark-summary"),

    actionHigh: document.getElementById("action-high"),
    actionMedium: document.getElementById("action-medium"),
    actionLow: document.getElementById("action-low"),

    trendCanvas: document.getElementById("trend-canvas"),
    trendEmptyState: document.getElementById("trend-empty-state"),
    trendLegend: document.getElementById("trend-legend"),

    historyList: document.getElementById("history-list")
  };

  let lastHistorySnapshot = null;

  /* -----------------------------------------------------
     6. TEXT MATCHING HELPERS (CJK-safe + word-boundary)
  ----------------------------------------------------- */

  function escapeRegex(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  function isCJK(str) {
    return /[\u4e00-\u9fff]/.test(str);
  }

  function buildMatcher(word) {
    if (isCJK(word)) {
      // Chinese has no whitespace word boundaries; use direct substring match.
      const w = word;
      return { test: (text) => text.indexOf(w) !== -1 };
    }
    const regex = new RegExp("\\b" + escapeRegex(word) + "\\b", "i");
    return { test: (text) => regex.test(text) };
  }

  function buildMatcherList(words) {
    return words.map((w) => buildMatcher(w));
  }

  const POSITIVE_MATCHERS = buildMatcherList([...POSITIVE_WORDS_ZH, ...POSITIVE_WORDS_EN]);
  const NEGATIVE_MATCHERS = buildMatcherList([...NEGATIVE_WORDS_ZH, ...NEGATIVE_WORDS_EN]);

  const THEME_MATCHERS = {};
  Object.keys(THEMES).forEach((key) => {
    THEME_MATCHERS[key] = buildMatcherList([...THEMES[key].zh, ...THEMES[key].en]);
  });

  function countHits(text, matcherList) {
    let count = 0;
    for (const m of matcherList) {
      if (m.test(text)) count++;
    }
    return count;
  }

  function clamp(num, min, max) {
    return Math.max(min, Math.min(max, num));
  }

  function parseReviews(rawText) {
    return rawText
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.length > 0);
  }

  /* -----------------------------------------------------
     7. CORE ANALYSIS ENGINE (language-agnostic on input)
  ----------------------------------------------------- */

  function analyseReviews(reviews) {
    const total = reviews.length;
    let positiveCount = 0;
    let neutralCount = 0;
    let negativeCount = 0;

    const themeStats = {};
    Object.keys(THEMES).forEach((key) => {
      themeStats[key] = { positive: 0, negative: 0, neutral: 0, total: 0 };
    });

    reviews.forEach((review) => {
      const posHits = countHits(review, POSITIVE_MATCHERS);
      const negHits = countHits(review, NEGATIVE_MATCHERS);

      let sentiment = "neutral";
      if (posHits > negHits) {
        sentiment = "positive";
        positiveCount++;
      } else if (negHits > posHits) {
        sentiment = "negative";
        negativeCount++;
      } else {
        neutralCount++;
      }

      Object.keys(THEME_MATCHERS).forEach((themeKey) => {
        const matched = THEME_MATCHERS[themeKey].some((m) => m.test(review));
        if (matched) {
          themeStats[themeKey].total++;
          if (sentiment === "positive") themeStats[themeKey].positive++;
          else if (sentiment === "negative") themeStats[themeKey].negative++;
          else themeStats[themeKey].neutral++;
        }
      });
    });

    const overallScore = Math.round(
      clamp(((positiveCount - negativeCount) / total + 1) / 2, 0, 1) * 100
    );

    const sentimentPct = {
      positive: Math.round((positiveCount / total) * 100),
      neutral: Math.round((neutralCount / total) * 100),
      negative: Math.round((negativeCount / total) * 100)
    };

    return {
      total, positiveCount, neutralCount, negativeCount,
      sentimentPct, overallScore, themeStats
    };
  }

  function themeScore(stat) {
    const denom = stat.positive + stat.negative;
    if (denom === 0) return null;
    return Math.round(clamp(((stat.positive - stat.negative) / denom + 1) / 2, 0, 1) * 100);
  }

  function getRankedThemes(themeStats, field) {
    return Object.keys(themeStats)
      .map((key) => ({ key, count: themeStats[key][field] }))
      .filter((th) => th.count > 0)
      .sort((a, b) => b.count - a.count);
  }

  /* -----------------------------------------------------
     8. DATA-ONLY GENERATORS (language-neutral results)
  ----------------------------------------------------- */

  function generateInsightsData(brandA, compA, benchmarkRows) {
    const insights = [];

    const topPositive = getRankedThemes(brandA.themeStats, "positive")[0];
    if (topPositive) insights.push({ type: "topPositive", theme: topPositive.key, count: topPositive.count });

    const topPain = getRankedThemes(brandA.themeStats, "negative")[0];
    if (topPain) insights.push({ type: "topPain", theme: topPain.key, count: topPain.count });

    const gap = brandA.overallScore - compA.overallScore;
    if (gap > 0) insights.push({ type: "gapLead", amount: gap });
    else if (gap < 0) insights.push({ type: "gapTrail", amount: Math.abs(gap) });
    else insights.push({ type: "gapEqual" });

    const comparable = benchmarkRows.filter((r) => r.key !== "satisfaction" && r.gap !== null);
    if (comparable.length > 0) {
      const strongest = comparable.reduce((a, b) => (a.gap > b.gap ? a : b));
      if (strongest.gap > 0) insights.push({ type: "advantage", key: strongest.key, amount: strongest.gap });

      const weakest = comparable.reduce((a, b) => (a.gap < b.gap ? a : b));
      if (weakest.gap < 0) insights.push({ type: "opportunity", key: weakest.key, amount: Math.abs(weakest.gap) });
    }

    if (insights.length === 0) insights.push({ type: "none" });
    return insights;
  }

  function generatePersonasData(brandA) {
    const qualifying = [];
    Object.keys(PERSONA_DEFINITIONS.en).forEach((themeKey) => {
      const stat = brandA.themeStats[themeKey];
      const mentionCount = stat.positive + stat.negative + stat.neutral;
      if (mentionCount >= 2) qualifying.push({ theme: themeKey, mentionCount });
    });
    qualifying.sort((a, b) => b.mentionCount - a.mentionCount);
    return qualifying.slice(0, 3);
  }

  function buildBenchmark(brandA, compA) {
    return BENCHMARK_CATEGORY_KEYS.map((key) => {
      let brandVal, compVal;
      if (key === "satisfaction") {
        brandVal = brandA.overallScore;
        compVal = compA.overallScore;
      } else {
        brandVal = themeScore(brandA.themeStats[key]);
        compVal = themeScore(compA.themeStats[key]);
      }
      const gap = brandVal !== null && compVal !== null ? brandVal - compVal : null;
      return { key, brandVal, compVal, gap };
    });
  }

  function generateActionPlanData(brandA) {
    const painPoints = getRankedThemes(brandA.themeStats, "negative");
    const tiers = ["high", "medium", "low"];
    const plan = { high: [], medium: [], low: [] };
    painPoints.slice(0, 3).forEach((pp, idx) => {
      plan[tiers[idx]].push({ theme: pp.key });
    });
    if (plan.low.length === 0) {
      const topPositive = getRankedThemes(brandA.themeStats, "positive")[0];
      plan.low.push({ maintain: true, theme: topPositive ? topPositive.key : null });
    }
    return plan;
  }

  /* -----------------------------------------------------
     9. RENDERING (language-aware, driven by state.lang)
  ----------------------------------------------------- */

  function showError(key) {
    state.currentErrorKey = key;
    el.errorMessage.textContent = t(key);
    el.errorMessage.classList.remove("hidden");
  }

  function hideError() {
    state.currentErrorKey = null;
    el.errorMessage.classList.add("hidden");
    el.errorMessage.textContent = "";
  }

  function setScoreCircle(circleEl, valueEl, score, color) {
    valueEl.textContent = score;
    const degrees = (score / 100) * 360;
    circleEl.style.background = `conic-gradient(${color} ${degrees}deg, var(--border) ${degrees}deg)`;
  }

  function renderSentimentBars(sentimentPct) {
    el.sentimentBars.innerHTML = "";
    const rows = [
      { label: t("positiveLabel"), pct: sentimentPct.positive, color: "var(--green)" },
      { label: t("neutralLabel"), pct: sentimentPct.neutral, color: "var(--amber)" },
      { label: t("negativeLabel"), pct: sentimentPct.negative, color: "var(--red)" }
    ];
    rows.forEach((row) => {
      const rowDiv = document.createElement("div");
      rowDiv.className = "sentiment-row";
      rowDiv.innerHTML = `
        <span class="label">${row.label}</span>
        <div class="sentiment-track"><div class="sentiment-fill" style="width:${row.pct}%; background:${row.color};"></div></div>
        <span class="pct">${row.pct}%</span>
      `;
      el.sentimentBars.appendChild(rowDiv);
    });

    el.sentimentLegend.innerHTML = `
      <span class="legend-item"><span class="legend-dot" style="background:var(--green)"></span>${t("positiveLabel")}</span>
      <span class="legend-item"><span class="legend-dot" style="background:var(--amber)"></span>${t("neutralLabel")}</span>
      <span class="legend-item"><span class="legend-dot" style="background:var(--red)"></span>${t("negativeLabel")}</span>
    `;
  }

  function renderThemeList(container, themes, type) {
    container.innerHTML = "";
    if (themes.length === 0) {
      container.innerHTML = `<p class="empty-state-text">${type === "positive" ? t("noPositiveThemesText") : t("noPainPointsText")}</p>`;
      return;
    }
    const maxCount = themes[0].count;
    const labels = THEME_LABELS[state.lang];
    themes.slice(0, 5).forEach((theme) => {
      const row = document.createElement("div");
      row.className = "theme-row";
      const widthPct = Math.round((theme.count / maxCount) * 100);
      const fillClass = type === "positive" ? "theme-fill-positive" : "theme-fill-negative";
      row.innerHTML = `
        <span class="theme-name">${labels[theme.key]}</span>
        <div class="theme-track"><div class="${fillClass}" style="width:${widthPct}%"></div></div>
        <span class="count">${theme.count}${t("mentionsSuffix")}</span>
      `;
      container.appendChild(row);
    });
  }

  function insightText(insight, brandName, competitorName) {
    const labels = THEME_LABELS[state.lang];
    if (state.lang === "zh") {
      switch (insight.type) {
        case "topPositive": return { label: "最受好评的主题", text: `${labels[insight.theme]}是 ${brandName} 最受好评的主题，在 ${insight.count} 条评论中被正面提及。` };
        case "topPain": return { label: "最大痛点", text: `${labels[insight.theme]}是 ${brandName} 最常见的问题，在 ${insight.count} 条评论中被负面提及。` };
        case "gapLead": return { label: "满意度差距", text: `${brandName} 的总体满意度领先 ${competitorName} ${insight.amount} 分。` };
        case "gapTrail": return { label: "满意度差距", text: `${brandName} 的总体满意度落后 ${competitorName} ${insight.amount} 分。` };
        case "gapEqual": return { label: "满意度差距", text: `${brandName} 与 ${competitorName} 目前的总体满意度得分相同。` };
        case "advantage": return { label: "最强竞争优势", text: `${brandName} 在「${BENCHMARK_LABELS.zh[insight.key]}」方面领先 ${competitorName} 最为明显，领先 ${insight.amount} 分。` };
        case "opportunity": return { label: "最大改进机会", text: `${competitorName} 在「${BENCHMARK_LABELS.zh[insight.key]}」方面领先 ${brandName} 最为明显，落后 ${insight.amount} 分。` };
        default: return { label: "消费者洞察", text: "本次提交的评论中信号较弱，暂无法生成明确洞察，建议补充更详细的评论内容。" };
      }
    } else {
      switch (insight.type) {
        case "topPositive": return { label: "Highest Praised Theme", text: `${labels[insight.theme]} is the most praised aspect of ${brandName}, mentioned positively in ${insight.count} review(s).` };
        case "topPain": return { label: "Largest Pain Point", text: `${labels[insight.theme]} is the most common complaint for ${brandName}, mentioned negatively in ${insight.count} review(s).` };
        case "gapLead": return { label: "Satisfaction Gap", text: `${brandName} leads ${competitorName} by ${insight.amount} point(s) in overall satisfaction score.` };
        case "gapTrail": return { label: "Satisfaction Gap", text: `${brandName} trails ${competitorName} by ${insight.amount} point(s) in overall satisfaction score.` };
        case "gapEqual": return { label: "Satisfaction Gap", text: `${brandName} and ${competitorName} currently have the same overall satisfaction score.` };
        case "advantage": return { label: "Strongest Competitive Advantage", text: `${brandName} outperforms ${competitorName} most notably in ${BENCHMARK_LABELS.en[insight.key]}, leading by ${insight.amount} point(s).` };
        case "opportunity": return { label: "Biggest Improvement Opportunity", text: `${competitorName} outperforms ${brandName} most notably in ${BENCHMARK_LABELS.en[insight.key]}, by ${insight.amount} point(s).` };
        default: return { label: "Consumer Insight", text: "Not enough thematic signal was detected in the submitted reviews to generate a strong insight. Try adding more detailed reviews." };
      }
    }
  }

  function renderInsights(insightsData) {
    el.insightCards.innerHTML = "";
    insightsData.forEach((insight) => {
      const { label, text } = insightText(insight, state.brandName, state.competitorName);
      const card = document.createElement("div");
      card.className = "insight-card";
      card.innerHTML = `<p class="insight-label">${label}</p><p class="insight-text">${text}</p>`;
      el.insightCards.appendChild(card);
    });
  }

  function renderPersonas(personasData) {
    el.personaCards.innerHTML = "";
    if (personasData.length === 0) {
      el.personaCards.innerHTML = `<p class="empty-state-text">${t("noPersonasText")}</p>`;
      return;
    }
    const defs = PERSONA_DEFINITIONS[state.lang];
    personasData.forEach((p) => {
      const def = defs[p.theme];
      const card = document.createElement("div");
      card.className = "persona-card";
      const tagsHtml = def.tags.map((tag) => `<span class="persona-tag">${tag}</span>`).join("");
      card.innerHTML = `
        <h4>${def.title}</h4>
        <p>${def.describe(p.mentionCount)}</p>
        <div class="persona-tags">${tagsHtml}</div>
      `;
      el.personaCards.appendChild(card);
    });
  }

  function renderBenchmark(rows, brandName, competitorName) {
    el.thBrand.textContent = brandName;
    el.thCompetitor.textContent = competitorName;
    el.benchmarkBody.innerHTML = "";
    const labels = BENCHMARK_LABELS[state.lang];

    rows.forEach((row) => {
      const tr = document.createElement("tr");
      const brandDisplay = row.brandVal === null ? "N/A" : row.brandVal;
      const compDisplay = row.compVal === null ? "N/A" : row.compVal;
      let gapDisplay = "N/A";
      let gapClass = "gap-neutral";
      if (row.gap !== null) {
        if (row.gap > 0) { gapDisplay = "+" + row.gap; gapClass = "gap-positive"; }
        else if (row.gap < 0) { gapDisplay = row.gap; gapClass = "gap-negative"; }
        else { gapDisplay = "0"; gapClass = "gap-neutral"; }
      }
      tr.innerHTML = `
        <td class="cell-strong">${labels[row.key]}</td>
        <td>${brandDisplay}</td>
        <td>${compDisplay}</td>
        <td class="${gapClass}">${gapDisplay}</td>
      `;
      el.benchmarkBody.appendChild(tr);
    });
  }

  function renderBenchmarkSummary(rows, brandName, competitorName) {
    const labels = BENCHMARK_LABELS[state.lang];
    const comparable = rows.filter((r) => r.key !== "satisfaction" && r.gap !== null);
    if (comparable.length === 0) {
      el.benchmarkSummary.textContent = state.lang === "zh"
        ? "双方评论中重叠的主题不足，暂无法总结出明确的竞争优势。"
        : "Not enough overlapping themes were detected between both review sets to summarize a clear competitive edge.";
      return;
    }
    const strongest = comparable.reduce((a, b) => (a.gap > b.gap ? a : b));
    const weakest = comparable.reduce((a, b) => (a.gap < b.gap ? a : b));

    let text = "";
    if (state.lang === "zh") {
      if (strongest.gap > 0) text += `${brandName} 在「${labels[strongest.key]}」方面展现出最强的竞争优势（领先 ${strongest.gap} 分）。`;
      if (weakest.gap < 0) text += `相对于 ${competitorName}，最大的改进机会在于「${labels[weakest.key]}」（落后 ${Math.abs(weakest.gap)} 分）。`;
      if (!text) text = `${brandName} 与 ${competitorName} 在各对比维度上的表现较为接近。`;
    } else {
      if (strongest.gap > 0) text += `${brandName} shows its strongest competitive advantage in ${labels[strongest.key]} (+${strongest.gap} points). `;
      if (weakest.gap < 0) text += `The biggest improvement opportunity relative to ${competitorName} is in ${labels[weakest.key]} (${weakest.gap} points).`;
      if (!text) text = `${brandName} and ${competitorName} are closely matched across the detected comparison categories.`;
    }
    el.benchmarkSummary.textContent = text;
  }

  function actionText(item) {
    const templates = ACTION_TEMPLATES[state.lang];
    const labels = THEME_LABELS[state.lang];
    if (item.maintain) {
      return item.theme ? templates.maintainStrength(labels[item.theme]) : templates.maintainGeneric;
    }
    return templates[item.theme];
  }

  function renderActionPlan(planData) {
    const templates = ACTION_TEMPLATES[state.lang];
    const highItems = planData.high.length ? planData.high.map(actionText) : [templates.noHigh];
    const mediumItems = planData.medium.length ? planData.medium.map(actionText) : [templates.noMedium];
    const lowItems = planData.low.map(actionText);

    el.actionHigh.innerHTML = highItems.map((tItem) => `<li>${tItem}</li>`).join("");
    el.actionMedium.innerHTML = mediumItems.map((tItem) => `<li>${tItem}</li>`).join("");
    el.actionLow.innerHTML = lowItems.map((tItem) => `<li>${tItem}</li>`).join("");
  }

  function renderDashboardMeta() {
    const b = state.brandAnalysis, c = state.competitorAnalysis;
    if (!b || !c) return;
    if (state.lang === "zh") {
      el.dashboardMeta.textContent = `${state.brandName} 对比 ${state.competitorName} — 已分析本品牌评论 ${b.total} 条，竞品评论 ${c.total} 条`;
    } else {
      el.dashboardMeta.textContent = `${state.brandName} vs ${state.competitorName} — ${b.total} of your reviews, ${c.total} competitor reviews analysed`;
    }
  }

  function renderScoreSubs() {
    const b = state.brandAnalysis, c = state.competitorAnalysis;
    if (!b || !c) return;
    const suffix = t("reviewsSuffix");
    if (state.lang === "zh") {
      el.brandScoreSub.textContent = `${state.brandName}（共 ${b.total} ${suffix}）`;
      el.competitorScoreSub.textContent = `${state.competitorName}（共 ${c.total} ${suffix}）`;
    } else {
      el.brandScoreSub.textContent = `${state.brandName} (${b.total}${suffix})`;
      el.competitorScoreSub.textContent = `${state.competitorName} (${c.total}${suffix})`;
    }
  }

  function renderFullDashboard() {
    if (!state.hasResults) return;
    renderDashboardMeta();

    setScoreCircle(el.brandScoreCircle, el.brandScoreValue, state.brandAnalysis.overallScore, "var(--purple)");
    setScoreCircle(el.competitorScoreCircle, el.competitorScoreValue, state.competitorAnalysis.overallScore, "var(--navy-soft)");
    renderScoreSubs();

    renderSentimentBars(state.brandAnalysis.sentimentPct);
    renderThemeList(el.positiveThemes, getRankedThemes(state.brandAnalysis.themeStats, "positive"), "positive");
    renderThemeList(el.painPoints, getRankedThemes(state.brandAnalysis.themeStats, "negative"), "negative");
    renderInsights(state.insightsData);
    renderPersonas(state.personasData);
    renderBenchmark(state.benchmarkRows, state.brandName, state.competitorName);
    renderBenchmarkSummary(state.benchmarkRows, state.brandName, state.competitorName);
    renderActionPlan(state.actionPlanData);
  }

  /* -----------------------------------------------------
     10. TREND CHART (native canvas, no external library)
  ----------------------------------------------------- */

  function drawTrendChart(history) {
    lastHistorySnapshot = history;

    if (!history || history.length < 2) {
      el.trendCanvas.classList.add("hidden");
      el.trendEmptyState.classList.remove("hidden");
      el.trendLegend.innerHTML = "";
      return;
    }
    el.trendCanvas.classList.remove("hidden");
    el.trendEmptyState.classList.add("hidden");

    const chronological = history.slice().reverse();
    const canvas = el.trendCanvas;
    const ratio = window.devicePixelRatio || 1;
    const cssWidth = canvas.parentElement.clientWidth;
    const cssHeight = 220;

    canvas.style.width = cssWidth + "px";
    canvas.style.height = cssHeight + "px";
    canvas.width = cssWidth * ratio;
    canvas.height = cssHeight * ratio;

    const ctx = canvas.getContext("2d");
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    ctx.clearRect(0, 0, cssWidth, cssHeight);

    const paddingLeft = 36;
    const paddingRight = 16;
    const paddingTop = 16;
    const paddingBottom = 30;
    const chartWidth = cssWidth - paddingLeft - paddingRight;
    const chartHeight = cssHeight - paddingTop - paddingBottom;

    ctx.strokeStyle = "#e4e6ef";
    ctx.fillStyle = "#6b7186";
    ctx.font = "11px Arial";
    ctx.lineWidth = 1;

    [0, 25, 50, 75, 100].forEach((val) => {
      const y = paddingTop + chartHeight - (val / 100) * chartHeight;
      ctx.beginPath();
      ctx.moveTo(paddingLeft, y);
      ctx.lineTo(paddingLeft + chartWidth, y);
      ctx.stroke();
      ctx.fillText(String(val), 4, y + 4);
    });

    const n = chronological.length;
    const stepX = n > 1 ? chartWidth / (n - 1) : 0;

    function plotLine(field, color) {
      ctx.beginPath();
      ctx.strokeStyle = color;
      ctx.lineWidth = 2.5;
      chronological.forEach((entry, i) => {
        const x = paddingLeft + stepX * i;
        const y = paddingTop + chartHeight - (entry[field] / 100) * chartHeight;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.stroke();
      ctx.fillStyle = color;
      chronological.forEach((entry, i) => {
        const x = paddingLeft + stepX * i;
        const y = paddingTop + chartHeight - (entry[field] / 100) * chartHeight;
        ctx.beginPath();
        ctx.arc(x, y, 3.5, 0, Math.PI * 2);
        ctx.fill();
      });
    }

    plotLine("competitorScore", "#3c4568");
    plotLine("brandScore", "#6c5ce7");

    ctx.fillStyle = "#6b7186";
    ctx.font = "10px Arial";
    const labelEvery = Math.ceil(n / 6);
    chronological.forEach((entry, i) => {
      if (i % labelEvery !== 0 && i !== n - 1) return;
      const x = paddingLeft + stepX * i;
      const d = new Date(entry.date);
      const label = (d.getMonth() + 1) + "/" + d.getDate();
      ctx.fillText(label, x - 10, cssHeight - 8);
    });

    el.trendLegend.innerHTML = `
      <span class="legend-item"><span class="legend-dot" style="background:#6c5ce7"></span>${t("historyYouLabel")}</span>
      <span class="legend-item"><span class="legend-dot" style="background:#3c4568"></span>${t("historyCompetitorLabel")}</span>
    `;
  }

  window.addEventListener("resize", () => {
    if (lastHistorySnapshot) drawTrendChart(lastHistorySnapshot);
  });

  /* -----------------------------------------------------
     11. HISTORY (localStorage)
  ----------------------------------------------------- */

  function loadHistory() {
    try {
      const raw = localStorage.getItem(HISTORY_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  }

  function saveHistoryEntry(entry) {
    const history = loadHistory();
    history.unshift(entry);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
    return history;
  }

  function clearHistoryStorage() {
    localStorage.removeItem(HISTORY_KEY);
  }

  function renderHistoryList(history) {
    if (!history || history.length === 0) {
      el.historyList.innerHTML = `<p class="empty-state-text">${t("historyEmptyText")}</p>`;
      return;
    }
    el.historyList.innerHTML = "";
    const locale = state.lang === "zh" ? "zh-CN" : "en-US";
    history.forEach((entry) => {
      const item = document.createElement("div");
      item.className = "history-item";
      const d = new Date(entry.date);
      const dateStr = d.toLocaleDateString(locale) + " " + d.toLocaleTimeString(locale, { hour: "2-digit", minute: "2-digit" });
      item.innerHTML = `
        <div class="history-main">
          <span class="h-title">${entry.brandName} vs ${entry.competitorName}</span>
          <span class="h-date">${dateStr}</span>
        </div>
        <div class="history-scores">
          <div class="history-score">
            <div class="h-num">${entry.brandScore}</div>
            <div class="h-lbl">${t("historyYouLabel")}</div>
          </div>
          <div class="history-score">
            <div class="h-num">${entry.competitorScore}</div>
            <div class="h-lbl">${t("historyCompetitorLabel")}</div>
          </div>
        </div>
      `;
      item.addEventListener("click", () => loadFromHistory(entry));
      el.historyList.appendChild(item);
    });
  }

  function loadFromHistory(entry) {
    state.lastLoadedHistoryEntry = entry;
    state.hasResults = false; // history entries do not carry full re-renderable detail

    el.dashboard.classList.remove("hidden");
    const locale = state.lang === "zh" ? "zh-CN" : "en-US";
    el.dashboardMeta.textContent = `${t("loadedFromHistoryPrefix")} ${entry.brandName} vs ${entry.competitorName} — ${new Date(entry.date).toLocaleString(locale)}`;

    setScoreCircle(el.brandScoreCircle, el.brandScoreValue, entry.brandScore, "var(--purple)");
    el.brandScoreSub.textContent = entry.brandName;
    setScoreCircle(el.competitorScoreCircle, el.competitorScoreValue, entry.competitorScore, "var(--navy-soft)");
    el.competitorScoreSub.textContent = entry.competitorName;

    renderSentimentBars(entry.brandSentiment);

    renderThemeList(el.positiveThemes, entry.topPositiveTheme ? [entry.topPositiveTheme] : [], "positive");
    renderThemeList(el.painPoints, entry.topPainPoint ? [entry.topPainPoint] : [], "negative");

    el.insightCards.innerHTML = `<div class="insight-card"><p class="insight-label">${state.lang === "zh" ? "历史快照" : "Historical Snapshot"}</p><p class="insight-text">${t("historyDetailNote")}</p></div>`;
    el.personaCards.innerHTML = `<p class="empty-state-text">${t("personaHistoryNote")}</p>`;
    el.benchmarkBody.innerHTML = `<tr><td colspan="4" class="empty-state-text">${t("benchmarkHistoryNote")}</td></tr>`;
    el.thBrand.textContent = entry.brandName;
    el.thCompetitor.textContent = entry.competitorName;
    el.benchmarkSummary.textContent = "";
    el.actionHigh.innerHTML = "";
    el.actionMedium.innerHTML = "";
    el.actionLow.innerHTML = `<li>${t("actionHistoryNote")}</li>`;

    window.scrollTo({ top: el.dashboard.offsetTop - 20, behavior: "smooth" });
  }

  /* -----------------------------------------------------
     12. STAGE ANIMATION
  ----------------------------------------------------- */

  function wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  function renderStageStatuses() {
    ["sentiment", "theme", "insight", "benchmark"].forEach((key) => {
      const statusEl = el.stageTracker.querySelector(`[data-stage-status="${key}"]`);
      const status = state.stageStatus[key];
      statusEl.textContent = status === "waiting" ? t("statusWaiting") : status === "analysing" ? t("statusAnalysing") : t("statusComplete");
    });
  }

  function resetStages() {
    const stages = el.stageTracker.querySelectorAll(".stage");
    stages.forEach((s, idx) => {
      s.classList.remove("is-analysing", "is-complete");
      s.querySelector(".stage-icon").textContent = idx + 1;
      const key = s.getAttribute("data-stage");
      state.stageStatus[key] = "waiting";
    });
    renderStageStatuses();
  }

  async function runStage(stageName) {
    const stageEl = el.stageTracker.querySelector(`[data-stage="${stageName}"]`);
    state.stageStatus[stageName] = "analysing";
    stageEl.classList.add("is-analysing");
    renderStageStatuses();
    await wait(650);
    stageEl.classList.remove("is-analysing");
    stageEl.classList.add("is-complete");
    stageEl.querySelector(".stage-icon").textContent = "\u2713";
    state.stageStatus[stageName] = "complete";
    renderStageStatuses();
    await wait(150);
  }

  /* -----------------------------------------------------
     13. MAIN WORKFLOW
  ----------------------------------------------------- */

  async function runAnalysis() {
    hideError();

    const brandName = el.brandName.value.trim() || t("defaultBrandName");
    const competitorName = el.competitorName.value.trim() || t("defaultCompetitorName");
    const brandLines = parseReviews(el.brandReviews.value);
    const competitorLines = parseReviews(el.competitorReviews.value);

    if (brandLines.length < 3) {
      showError("errorMinBrand");
      return;
    }
    if (competitorLines.length < 3) {
      showError("errorMinCompetitor");
      return;
    }

    el.btnAnalyse.disabled = true;
    el.progressSection.classList.remove("hidden");
    el.dashboard.classList.add("hidden");
    resetStages();
    el.progressSection.scrollIntoView({ behavior: "smooth", block: "start" });

    await runStage("sentiment");
    await runStage("theme");
    await runStage("insight");
    await runStage("benchmark");

    const brandA = analyseReviews(brandLines);
    const compA = analyseReviews(competitorLines);
    const benchmarkRows = buildBenchmark(brandA, compA);
    const insightsData = generateInsightsData(brandA, compA, benchmarkRows);
    const personasData = generatePersonasData(brandA);
    const actionPlanData = generateActionPlanData(brandA);

    state.hasResults = true;
    state.brandName = brandName;
    state.competitorName = competitorName;
    state.brandAnalysis = brandA;
    state.competitorAnalysis = compA;
    state.benchmarkRows = benchmarkRows;
    state.insightsData = insightsData;
    state.personasData = personasData;
    state.actionPlanData = actionPlanData;

    el.dashboard.classList.remove("hidden");
    renderFullDashboard();

    const topPositiveTheme = getRankedThemes(brandA.themeStats, "positive")[0] || null;
    const topPainPoint = getRankedThemes(brandA.themeStats, "negative")[0] || null;

    const historyEntry = {
      date: new Date().toISOString(),
      brandName, competitorName,
      brandScore: brandA.overallScore,
      competitorScore: compA.overallScore,
      brandSentiment: brandA.sentimentPct,
      topPositiveTheme, topPainPoint,
      language: state.lang
    };
    const history = saveHistoryEntry(historyEntry);
    renderHistoryList(history);
    drawTrendChart(history);

    el.btnAnalyse.disabled = false;
    el.btnAnalyse.textContent = t("btnAnalyse");

    window.scrollTo({ top: el.dashboard.offsetTop - 20, behavior: "smooth" });
  }

  /* -----------------------------------------------------
     14. LANGUAGE SWITCHING
  ----------------------------------------------------- */

  function applyStaticTranslations() {
    document.documentElement.lang = state.lang === "zh" ? "zh-CN" : "en";

    document.querySelectorAll("[data-i18n]").forEach((elNode) => {
      const key = elNode.getAttribute("data-i18n");
      elNode.textContent = t(key);
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach((elNode) => {
      const key = elNode.getAttribute("data-i18n-placeholder");
      elNode.placeholder = t(key);
    });

    el.langBtnZh.classList.toggle("active", state.lang === "zh");
    el.langBtnEn.classList.toggle("active", state.lang === "en");

    if (!el.btnAnalyse.disabled) {
      el.btnAnalyse.textContent = t("btnAnalyse");
    }
  }

  function setLanguage(lang) {
    if (lang !== "zh" && lang !== "en") lang = "zh";
    state.lang = lang;
    localStorage.setItem(LANG_KEY, lang);

    applyStaticTranslations();
    renderStageStatuses();

    if (state.currentErrorKey) {
      el.errorMessage.textContent = t(state.currentErrorKey);
    }

    if (state.hasResults) {
      renderFullDashboard();
    } else if (state.lastLoadedHistoryEntry) {
      loadFromHistory(state.lastLoadedHistoryEntry);
    }

    const history = loadHistory();
    renderHistoryList(history);
    drawTrendChart(history);
  }

  /* -----------------------------------------------------
     15. EVENT WIRING
  ----------------------------------------------------- */

  el.btnAnalyse.addEventListener("click", runAnalysis);

  el.btnSample.addEventListener("click", () => {
    const sample = SAMPLE[state.lang];
    el.brandName.value = sample.brandName;
    el.competitorName.value = sample.competitorName;
    el.brandReviews.value = sample.brandReviews;
    el.competitorReviews.value = sample.competitorReviews;
    hideError();
  });

  el.btnClearHistory.addEventListener("click", () => {
    const confirmMsg = state.lang === "zh"
      ? "此操作将永久删除该浏览器中保存的所有历史分析记录，是否继续？"
      : "This will permanently delete all saved analysis history from this browser. Continue?";
    if (confirm(confirmMsg)) {
      clearHistoryStorage();
      renderHistoryList([]);
      drawTrendChart([]);
    }
  });

  el.langBtnZh.addEventListener("click", () => setLanguage("zh"));
  el.langBtnEn.addEventListener("click", () => setLanguage("en"));

  /* -----------------------------------------------------
     16. INITIAL LOAD
  ----------------------------------------------------- */

  (function init() {
    let savedLang = "zh";
    try {
      const stored = localStorage.getItem(LANG_KEY);
      if (stored === "zh" || stored === "en") savedLang = stored;
    } catch (e) {
      savedLang = "zh";
    }
    state.lang = savedLang;
    applyStaticTranslations();
    renderStageStatuses();

    const history = loadHistory();
    renderHistoryList(history);
    drawTrendChart(history);
  })();
})();
