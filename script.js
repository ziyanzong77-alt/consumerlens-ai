/* =====================================================
   ConsumerLens AI — script.js (V2, Bilingual: 中文 / English)
   100% local, rule-based text analysis.
   No APIs, no backend, no external services.
   Uses Chart.js (CDN) purely for client-side rendering.
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

      wfTitle: "AI 智能分析工作流",
      wfSubtitle: "四步本地 AI 代理管道，将原始评论转化为可执行的商业建议",
      wfNodeReviews: "消费者评论",
      wfAgent1Sub: "语音解析器",
      wfAgent2Sub: "消费者洞察生成器",
      wfAgent3Sub: "竞争情报分析",
      wfNodeOutput: "业务建议",

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
      agent1Name: "Agent 1：语音解析器",
      agent2Name: "Agent 2：消费者洞察生成器",
      agent3Name: "Agent 3：竞争情报分析",
      statusWaiting: "等待中",
      statusAnalysing: "分析中",
      statusGenerating: "生成中",
      statusComplete: "已完成",

      dashboardTitle: "结果仪表盘",
      labelOverallSatisfactionYou: "总体满意度（本品牌）",
      labelOverallSatisfactionCompetitor: "总体满意度（竞品）",
      sentimentDistTitle: "情感分布 — 本品牌",
      positiveLabel: "正面评论",
      neutralLabel: "中立评论",
      negativeLabel: "负面评论",
      topPositiveThemesTitle: "主要正面主题",
      consumerInsightsTitle: "消费者洞察",

      painPointDashboardTitle: "痛点仪表盘",
      painPointDashboardSubtitle: "自动汇总本品牌评论中最主要的五大痛点",
      painPointChartAxisLabel: "占本品牌评论的百分比",

      opportunityDashboardTitle: "机会仪表盘",
      opportunityDashboardSubtitle: "基于客户投诉自动生成的改进机会",
      opportunityCardTitlePrefix: "机会",
      impactHigh: "高潜力",
      impactMedium: "中等潜力",
      impactLow: "低潜力",
      opportunityEvidence: (n) => `依据：${n} 条负面评论提及`,
      noOpportunitiesText: "暂未检测到明显的改进机会，说明当前评论整体反馈良好。",

      personasTitle: "消费者画像",
      personasSubtext: "仅展示评论中有证据支持的消费者画像；以下属性为基于语言模式推断的典型特征，并非从评论者收集的真实人口统计数据。",
      personaAgeLabel: "年龄范围",
      personaMotivationLabel: "核心动机",
      personaPainLabel: "主要痛点",
      personaDriverLabel: "购买驱动因素",
      personaCommLabel: "沟通风格",
      noPersonasText: "暂未检测到有力的消费者画像特征，尝试输入更详细的评论以获得画像分析。",

      competitiveGapTitle: "竞争差距分析",
      colCategory: "类别",
      colYourBrand: "本品牌",
      colCompetitor: "竞品",
      colGap: "差距",
      strengthsTitle: "我们的优势",
      weaknessesTitle: "我们的劣势",
      noStrengthsText: "暂未检测到明显领先的对比维度。",
      noWeaknessesText: "暂未检测到明显落后的对比维度。",

      actionPlanTitle: "优先行动计划",
      highPriority: "高优先级",
      mediumPriority: "中优先级",
      lowPriority: "低优先级",

      trendTitle: "历史趋势",
      trendSubtext: "追踪您在此浏览器上完成的所有分析的满意度得分变化。",
      trendEmptyText: "完成至少两次分析后，这里将显示趋势折线图。每次完成的分析都会自动保存到您浏览器的本地历史记录中。",
      trendBrandLabel: "本品牌",
      trendCompetitorLabel: "竞品",

      mentionsSuffix: "条提及",
      reviewsSuffix: "条评论",
      noPositiveThemesText: "未在这些评论中检测到明显的正面主题。",
      noPainPointsText: "未在这些评论中检测到明显的负面主题。",

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
      opportunityHistoryNote: "历史记录不保存机会细节，请重新运行一次分析以生成完整机会仪表盘。",
      execSummaryHistoryNote: "历史记录不保存完整摘要，请重新运行一次分析以生成高管摘要。",

      execSummaryTitle: "高管摘要",
      execSummarySubtitle: "适合市场经理阅读的简明报告",
      execOverviewLabel: "总体概况",
      execStrengthLabel: "核心优势",
      execRiskLabel: "主要风险",
      execPositionLabel: "竞争位置",
      execRecommendationLabel: "建议下一步",

      defaultBrandName: "本品牌",
      defaultCompetitorName: "竞品"
    },

    en: {
      tagBadge: "Runs 100% locally · No API · No cost",
      tagline: "Voice of Customer & Competitive Intelligence Platform",
      heroDesc: "Turn customer feedback into actionable business insights.",

      wfTitle: "AI Analysis Workflow",
      wfSubtitle: "A four-step local AI agent pipeline that turns raw reviews into actionable business recommendations",
      wfNodeReviews: "Consumer Reviews",
      wfAgent1Sub: "Voice Parser",
      wfAgent2Sub: "Consumer Insight Generator",
      wfAgent3Sub: "Competitive Intelligence",
      wfNodeOutput: "Business Recommendation",

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
      agent1Name: "Agent 1: Voice Parser",
      agent2Name: "Agent 2: Consumer Insight Generator",
      agent3Name: "Agent 3: Competitive Intelligence",
      statusWaiting: "Waiting",
      statusAnalysing: "Analysing",
      statusGenerating: "Generating",
      statusComplete: "Completed",

      dashboardTitle: "Results Dashboard",
      labelOverallSatisfactionYou: "Overall Satisfaction — Your Brand",
      labelOverallSatisfactionCompetitor: "Overall Satisfaction — Competitor",
      sentimentDistTitle: "Sentiment Distribution — Your Brand",
      positiveLabel: "Positive Reviews",
      neutralLabel: "Neutral Reviews",
      negativeLabel: "Negative Reviews",
      topPositiveThemesTitle: "Top Positive Themes",
      consumerInsightsTitle: "Consumer Insights",

      painPointDashboardTitle: "Pain Point Dashboard",
      painPointDashboardSubtitle: "Automatically summarizes the top 5 pain points from your brand's reviews",
      painPointChartAxisLabel: "% of your brand's reviews",

      opportunityDashboardTitle: "Opportunity Dashboard",
      opportunityDashboardSubtitle: "Opportunities automatically generated from customer complaints",
      opportunityCardTitlePrefix: "Opportunity",
      impactHigh: "High Impact",
      impactMedium: "Medium Impact",
      impactLow: "Low Impact",
      opportunityEvidence: (n) => `Based on ${n} negative mention(s)`,
      noOpportunitiesText: "No clear improvement opportunities detected — overall feedback looks strong.",

      personasTitle: "Consumer Personas",
      personasSubtext: "Personas are only shown when supported by evidence in the submitted reviews. Attributes below are inferred archetypes based on language patterns, not demographic data collected from reviewers.",
      personaAgeLabel: "Age Range",
      personaMotivationLabel: "Motivation",
      personaPainLabel: "Pain Points",
      personaDriverLabel: "Purchase Driver",
      personaCommLabel: "Communication Style",
      noPersonasText: "No strong persona patterns were detected yet. Try adding more detailed reviews to surface consumer personas.",

      competitiveGapTitle: "Competitive Gap",
      colCategory: "Category",
      colYourBrand: "Your Brand",
      colCompetitor: "Competitor",
      colGap: "Gap",
      strengthsTitle: "Our Strengths",
      weaknessesTitle: "Our Weaknesses",
      noStrengthsText: "No categories with a clear lead were detected.",
      noWeaknessesText: "No categories with a clear deficit were detected.",

      actionPlanTitle: "Priority Action Plan",
      highPriority: "High Priority",
      mediumPriority: "Medium Priority",
      lowPriority: "Low Priority",

      trendTitle: "Historical Trend",
      trendSubtext: "Tracks satisfaction scores across all analyses completed on this browser.",
      trendEmptyText: "Run at least two analyses to see a trend line here. Each completed analysis is saved automatically to your browser's local history.",
      trendBrandLabel: "Your Brand",
      trendCompetitorLabel: "Competitor",

      mentionsSuffix: " mention(s)",
      reviewsSuffix: " reviews",
      noPositiveThemesText: "No clear positive themes were detected in these reviews.",
      noPainPointsText: "No clear negative themes were detected in these reviews.",

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
      opportunityHistoryNote: "Opportunity detail is not stored in history. Run a new analysis to regenerate the opportunity dashboard.",
      execSummaryHistoryNote: "Full summary detail is not stored in history. Run a new analysis to regenerate the executive summary.",

      execSummaryTitle: "Executive Summary",
      execSummarySubtitle: "A concise report for marketing managers",
      execOverviewLabel: "Overview",
      execStrengthLabel: "Key Strength",
      execRiskLabel: "Key Risk",
      execPositionLabel: "Competitive Position",
      execRecommendationLabel: "Recommended Next Step",

      defaultBrandName: "Your Brand",
      defaultCompetitorName: "Competitor"
    }
  };

  function t(key) {
    const val = I18N[state.lang][key];
    return typeof val === "function" ? val : val || key;
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

  const OPPORTUNITY_TEMPLATES = {
    zh: {
      price: "推出透明定价或增值套餐，将价格顾虑转化为忠诚度提升的机会。",
      quality: "建立更严格的质检流程，把质量痛点转化为口碑差异化优势。",
      taste: "重新配方优化口感，将口味反馈转化为产品迭代的方向。",
      packaging: "升级包装结构与视觉设计，将包装问题转化为货架竞争力提升的机会。",
      delivery: "优化物流合作伙伴与配送流程，将配送痛点转化为履约体验的竞争优势。",
      service: "加强客服团队培训与响应机制，将服务短板转化为客户关系深化的机会。",
      convenience: "简化使用流程或说明，将便利性顾虑转化为产品易用性的卖点。",
      design: "更新产品外观与品牌视觉语言，将设计短板转化为品牌焕新的契机。",
      comfort: "改进产品的贴合度与舒适体验，将舒适度问题转化为差异化卖点。",
      ingredients: "透明化配料信息并优化配方，将成分顾虑转化为健康信任的建立机会。"
    },
    en: {
      price: "Introduce transparent pricing or value bundles, turning price concerns into a loyalty-building opportunity.",
      quality: "Strengthen quality control processes, turning quality complaints into a word-of-mouth differentiator.",
      taste: "Reformulate for improved taste, turning flavor feedback into a clear product iteration roadmap.",
      packaging: "Upgrade packaging structure and visual design, turning packaging issues into a shelf-appeal opportunity.",
      delivery: "Optimize logistics partners and fulfillment processes, turning delivery pain points into a fulfillment advantage.",
      service: "Invest in customer service training and response systems, turning service gaps into a relationship-building opportunity.",
      convenience: "Streamline usage or instructions, turning convenience concerns into an ease-of-use selling point.",
      design: "Refresh product appearance and brand visual language, turning design gaps into a brand-refresh opportunity.",
      comfort: "Improve product fit and comfort, turning comfort concerns into a differentiation point.",
      ingredients: "Increase ingredient transparency and reformulate where needed, turning ingredient concerns into a trust-building opportunity."
    }
  };

  const PERSONA_DEFINITIONS = {
    zh: {
      price: {
        title: "价格敏感型消费者", tags: ["价格敏感", "追求性价比"],
        ageRange: "25–40 岁",
        motivation: "追求高性价比，希望花更少的钱获得同等甚至更好的体验。",
        painPoints: "价格上涨、隐藏费用、感觉物无所值。",
        purchaseDriver: "促销折扣、组合优惠、透明定价。",
        communicationStyle: "直接、注重数据对比，喜欢看到价格与同类产品的对比信息。",
        describe: (c) => `价格相关话题在 ${c} 条评论中被提及，显示该客群非常看重性价比。`
      },
      quality: {
        title: "品质导向型消费者", tags: ["注重细节", "品牌忠诚"],
        ageRange: "30–50 岁",
        motivation: "看重产品的耐用性与一致性，愿意为更高品质支付溢价。",
        painPoints: "质量不稳定、做工瑕疵、与宣传不符。",
        purchaseDriver: "品牌口碑、质检认证、真实用户评价。",
        communicationStyle: "偏理性，重视细节说明与权威背书。",
        describe: (c) => `质量相关话题在 ${c} 条评论中被提及，表明该客群会仔细比较产品标准。`
      },
      convenience: {
        title: "便利导向型消费者", tags: ["时间紧张", "务实"],
        ageRange: "22–35 岁",
        motivation: "生活节奏快，希望产品能节省时间、简化流程。",
        painPoints: "使用步骤繁琐、携带不便、配送速度慢。",
        purchaseDriver: "便捷的购买与使用体验、快速配送。",
        communicationStyle: "偏好简洁明了的信息，容易被“省时省心”类信息打动。",
        describe: (c) => `便利性话题在 ${c} 条评论中被提及，通常与忙碌的生活方式相关。`
      },
      ingredients: {
        title: "健康健身型消费者", tags: ["注重健康", "关注成分表"],
        ageRange: "20–38 岁",
        motivation: "关注营养成分与健康效益，将购买视为自我投资的一部分。",
        painPoints: "配料表不透明、添加剂过多、营养宣传夸大。",
        purchaseDriver: "清晰的成分标签、第三方检测、健康背书。",
        communicationStyle: "喜欢深入了解成分与数据，偏好专业、可信的表达方式。",
        describe: (c) => `成分相关话题在 ${c} 条评论中被提及，反映出注重健康的购买决策。`
      },
      design: {
        title: "设计审美型消费者", tags: ["注重美感", "在意品牌形象"],
        ageRange: "24–40 岁",
        motivation: "重视产品的视觉呈现与品牌形象，购买也是一种自我表达。",
        painPoints: "设计过时、包装缺乏辨识度、与个人审美不符。",
        purchaseDriver: "独特的视觉设计、限量或联名款、社交分享价值。",
        communicationStyle: "视觉驱动，容易被精美的图片和故事化内容打动。",
        describe: (c) => `设计相关话题在 ${c} 条评论中被提及，说明外观会影响该客群的评价。`
      }
    },
    en: {
      price: {
        title: "Value Seeker", tags: ["Price-sensitive", "Deal-driven"],
        ageRange: "25–40",
        motivation: "Seeks the best value for money and wants an equal or better experience for less spend.",
        painPoints: "Rising prices, hidden fees, feeling like it's not worth the cost.",
        purchaseDriver: "Discounts, bundle deals, transparent pricing.",
        communicationStyle: "Direct and comparison-driven; responds well to clear price-vs-value messaging.",
        describe: (c) => `Price-related themes appear in ${c} review(s), showing this segment pays close attention to value for money.`
      },
      quality: {
        title: "Quality-Focused Buyer", tags: ["Detail-oriented", "Brand-loyal"],
        ageRange: "30–50",
        motivation: "Values durability and consistency, and is willing to pay a premium for reliable quality.",
        painPoints: "Inconsistent quality, manufacturing flaws, product not matching expectations.",
        purchaseDriver: "Brand reputation, quality certifications, genuine user reviews.",
        communicationStyle: "Rational and detail-oriented; responds to authoritative, evidence-based messaging.",
        describe: (c) => `Quality-related themes appear in ${c} review(s), indicating shoppers who compare product standards closely.`
      },
      convenience: {
        title: "Convenience Seeker", tags: ["Time-poor", "Practical"],
        ageRange: "22–35",
        motivation: "Has a busy lifestyle and wants products that save time and simplify daily routines.",
        painPoints: "Complicated usage steps, poor portability, slow delivery.",
        purchaseDriver: "A frictionless buying and usage experience, fast delivery.",
        communicationStyle: "Prefers concise messaging; responds to 'save time, save effort' framing.",
        describe: (c) => `Convenience is mentioned in ${c} review(s), often in the context of on-the-go or busy lifestyles.`
      },
      ingredients: {
        title: "Fitness and Health Consumer", tags: ["Health-focused", "Label-reader"],
        ageRange: "20–38",
        motivation: "Focused on nutrition and health benefits; views the purchase as an investment in themselves.",
        painPoints: "Unclear ingredient labeling, too many additives, overstated health claims.",
        purchaseDriver: "Clear ingredient labels, third-party testing, credible health endorsements.",
        communicationStyle: "Wants to dig into ingredients and data; prefers professional, trustworthy messaging.",
        describe: (c) => `Ingredient-related themes appear in ${c} review(s), reflecting health-conscious purchase decisions.`
      },
      design: {
        title: "Design-Conscious Consumer", tags: ["Aesthetic-driven", "Image-aware"],
        ageRange: "24–40",
        motivation: "Values visual presentation and brand image; purchasing is also a form of self-expression.",
        painPoints: "Outdated design, packaging that lacks distinctiveness, mismatch with personal aesthetic.",
        purchaseDriver: "Distinctive visual design, limited editions or collaborations, social sharing value.",
        communicationStyle: "Visually driven; responds to beautiful imagery and storytelling.",
        describe: (c) => `Design is mentioned in ${c} review(s), suggesting aesthetics influence this segment's opinion.`
      }
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
    opportunitiesData: null,
    stageStatus: { agent1: "waiting", agent2: "waiting", agent3: "waiting", output: "waiting" },
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

    execSummaryBody: document.getElementById("exec-summary-body"),

    brandScoreCircle: document.getElementById("brand-score-circle"),
    brandScoreValue: document.getElementById("brand-score-value"),
    brandScoreSub: document.getElementById("brand-score-sub"),
    competitorScoreCircle: document.getElementById("competitor-score-circle"),
    competitorScoreValue: document.getElementById("competitor-score-value"),
    competitorScoreSub: document.getElementById("competitor-score-sub"),

    sentimentBars: document.getElementById("sentiment-bars"),
    sentimentLegend: document.getElementById("sentiment-legend"),

    positiveThemes: document.getElementById("positive-themes"),

    insightCards: document.getElementById("insight-cards"),

    painPointCanvas: document.getElementById("pain-point-canvas"),
    painPointEmpty: document.getElementById("pain-point-empty"),

    opportunityCards: document.getElementById("opportunity-cards"),

    personaCards: document.getElementById("persona-cards"),

    thBrand: document.getElementById("th-brand"),
    thCompetitor: document.getElementById("th-competitor"),
    benchmarkBody: document.getElementById("benchmark-body"),
    benchmarkSummary: document.getElementById("benchmark-summary"),
    strengthsList: document.getElementById("strengths-list"),
    weaknessesList: document.getElementById("weaknesses-list"),

    actionHigh: document.getElementById("action-high"),
    actionMedium: document.getElementById("action-medium"),
    actionLow: document.getElementById("action-low"),

    trendCanvas: document.getElementById("trend-canvas"),
    trendEmptyState: document.getElementById("trend-empty-state"),

    historyList: document.getElementById("history-list")
  };

  let painPointChartInstance = null;
  let trendChartInstance = null;

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

  function generateOpportunitiesData(brandA) {
    const painPoints = getRankedThemes(brandA.themeStats, "negative");
    return painPoints.slice(0, 4).map((pp, idx) => {
      let impact = "low";
      if (idx === 0) impact = "high";
      else if (idx === 1) impact = "medium";
      return { theme: pp.key, count: pp.count, impact };
    });
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
        <span class="persona-age">${t("personaAgeLabel")}: ${def.ageRange}</span>
        <div class="persona-field">
          <p class="pf-label">${t("personaMotivationLabel")}</p>
          <p class="pf-text">${def.motivation}</p>
        </div>
        <div class="persona-field">
          <p class="pf-label">${t("personaPainLabel")}</p>
          <p class="pf-text">${def.painPoints}</p>
        </div>
        <div class="persona-field">
          <p class="pf-label">${t("personaDriverLabel")}</p>
          <p class="pf-text">${def.purchaseDriver}</p>
        </div>
        <div class="persona-field">
          <p class="pf-label">${t("personaCommLabel")}</p>
          <p class="pf-text">${def.communicationStyle}</p>
        </div>
        <p class="pf-text" style="font-style:italic; opacity:0.85;">${def.describe(p.mentionCount)}</p>
        <div class="persona-tags">${tagsHtml}</div>
      `;
      el.personaCards.appendChild(card);
    });
  }

  function renderOpportunities(opportunitiesData) {
    el.opportunityCards.innerHTML = "";
    if (opportunitiesData.length === 0) {
      el.opportunityCards.innerHTML = `<p class="empty-state-text">${t("noOpportunitiesText")}</p>`;
      return;
    }
    const labels = THEME_LABELS[state.lang];
    const templates = OPPORTUNITY_TEMPLATES[state.lang];
    const impactLabelMap = { high: t("impactHigh"), medium: t("impactMedium"), low: t("impactLow") };
    opportunitiesData.forEach((opp) => {
      const card = document.createElement("div");
      card.className = "opportunity-card";
      card.innerHTML = `
        <div class="opportunity-card-header">
          <h4>${t("opportunityCardTitlePrefix")}: ${labels[opp.theme]}</h4>
          <span class="impact-badge impact-${opp.impact}">${impactLabelMap[opp.impact]}</span>
        </div>
        <p>${templates[opp.theme]}</p>
        <p class="opportunity-evidence">${t("opportunityEvidence")(opp.count)}</p>
      `;
      el.opportunityCards.appendChild(card);
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

  function renderStrengthsWeaknesses(rows) {
    const labels = BENCHMARK_LABELS[state.lang];
    const comparable = rows.filter((r) => r.key !== "satisfaction" && r.gap !== null);
    const strengths = comparable.filter((r) => r.gap > 0).sort((a, b) => b.gap - a.gap);
    const weaknesses = comparable.filter((r) => r.gap < 0).sort((a, b) => a.gap - b.gap);

    el.strengthsList.innerHTML = strengths.length
      ? strengths.map((r) => `<li>${labels[r.key]} (+${r.gap})</li>`).join("")
      : `<li class="empty-state-text">${t("noStrengthsText")}</li>`;

    el.weaknessesList.innerHTML = weaknesses.length
      ? weaknesses.map((r) => `<li>${labels[r.key]} (${r.gap})</li>`).join("")
      : `<li class="empty-state-text">${t("noWeaknessesText")}</li>`;
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

  /* -----------------------------------------------------
     10. EXECUTIVE SUMMARY
  ----------------------------------------------------- */

  function buildExecutiveSummary() {
    const brandA = state.brandAnalysis, compA = state.competitorAnalysis;
    const brandName = state.brandName, competitorName = state.competitorName;
    const labels = THEME_LABELS[state.lang];
    const benchLabels = BENCHMARK_LABELS[state.lang];

    const topPositive = getRankedThemes(brandA.themeStats, "positive")[0];
    const topPain = getRankedThemes(brandA.themeStats, "negative")[0];
    const comparable = state.benchmarkRows.filter((r) => r.key !== "satisfaction" && r.gap !== null);
    const strongest = comparable.length ? comparable.reduce((a, b) => (a.gap > b.gap ? a : b)) : null;
    const weakest = comparable.length ? comparable.reduce((a, b) => (a.gap < b.gap ? a : b)) : null;
    const firstHighAction = state.actionPlanData.high[0] ? actionText(state.actionPlanData.high[0]) : null;
    const gap = brandA.overallScore - compA.overallScore;

    if (state.lang === "zh") {
      const overview = `本次分析基于 ${brandA.total} 条 ${brandName} 评论与 ${compA.total} 条 ${competitorName} 评论。${brandName} 的总体满意度得分为 ${brandA.overallScore} 分，${competitorName} 为 ${compA.overallScore} 分，` +
        (gap > 0 ? `${brandName} 领先 ${gap} 分。` : gap < 0 ? `${brandName} 落后 ${Math.abs(gap)} 分。` : `两者持平。`);
      const strength = topPositive
        ? `${labels[topPositive.key]}是客户最常称赞的方面，在 ${topPositive.count} 条评论中获得正面评价，可作为营销传播的核心卖点。`
        : `本次评论中未发现特别突出的正面主题，建议持续收集更多客户反馈以识别优势领域。`;
      const risk = topPain
        ? `${labels[topPain.key]}是当前最主要的风险点，在 ${topPain.count} 条评论中被负面提及，需要优先关注以避免影响品牌口碑。`
        : `本次评论中未发现明显的风险信号，整体反馈情况良好。`;
      const position = strongest && strongest.gap > 0
        ? `在「${benchLabels[strongest.key]}」方面相对 ${competitorName} 具备明显优势` + (weakest && weakest.gap < 0 ? `，但在「${benchLabels[weakest.key]}」方面存在差距，需要重点补强。` : `。`)
        : (weakest && weakest.gap < 0 ? `在「${benchLabels[weakest.key]}」方面相对 ${competitorName} 存在差距，是需要优先补强的领域。` : `与 ${competitorName} 相比，各维度表现较为接近，尚未形成明显的差异化优势。`);
      const recommendation = firstHighAction
        ? firstHighAction
        : `建议持续监测客户评论，保持当前的产品与服务标准，并定期复盘满意度变化趋势。`;

      return { overview, strength, risk, position, recommendation };
    } else {
      const overview = `This analysis is based on ${brandA.total} reviews for ${brandName} and ${compA.total} reviews for ${competitorName}. ${brandName} scored ${brandA.overallScore} on overall satisfaction versus ${compA.overallScore} for ${competitorName}, ` +
        (gap > 0 ? `putting ${brandName} ahead by ${gap} point(s).` : gap < 0 ? `putting ${brandName} behind by ${Math.abs(gap)} point(s).` : `putting the two brands at parity.`);
      const strength = topPositive
        ? `${labels[topPositive.key]} is the most consistently praised aspect of the brand, mentioned positively in ${topPositive.count} review(s), and is a strong candidate for marketing messaging.`
        : `No single standout positive theme was detected in this batch of reviews; continue collecting feedback to identify clear strengths.`;
      const risk = topPain
        ? `${labels[topPain.key]} is the leading risk area, mentioned negatively in ${topPain.count} review(s), and should be prioritized to protect brand reputation.`
        : `No significant risk signals were detected in this batch of reviews; overall feedback looks healthy.`;
      const position = strongest && strongest.gap > 0
        ? `${brandName} holds a clear lead over ${competitorName} in ${benchLabels[strongest.key]}` + (weakest && weakest.gap < 0 ? `, but trails in ${benchLabels[weakest.key]}, which should be a focus area.` : `.`)
        : (weakest && weakest.gap < 0 ? `${brandName} trails ${competitorName} in ${benchLabels[weakest.key]}, making it the top priority for competitive catch-up.` : `${brandName} and ${competitorName} are closely matched across categories, with no clear differentiation yet.`);
      const recommendation = firstHighAction
        ? firstHighAction
        : `Continue monitoring customer reviews, maintain current product and service standards, and periodically review satisfaction trends.`;

      return { overview, strength, risk, position, recommendation };
    }
  }

  function renderExecutiveSummary() {
    const summary = buildExecutiveSummary();
    el.execSummaryBody.innerHTML = `
      <div class="exec-block">
        <p class="exec-label">${t("execOverviewLabel")}</p>
        <p class="exec-text">${summary.overview}</p>
      </div>
      <div class="exec-block">
        <p class="exec-label">${t("execStrengthLabel")}</p>
        <p class="exec-text">${summary.strength}</p>
      </div>
      <div class="exec-block">
        <p class="exec-label">${t("execRiskLabel")}</p>
        <p class="exec-text">${summary.risk}</p>
      </div>
      <div class="exec-block">
        <p class="exec-label">${t("execPositionLabel")}</p>
        <p class="exec-text">${summary.position}</p>
      </div>
      <div class="exec-block">
        <p class="exec-label">${t("execRecommendationLabel")}</p>
        <p class="exec-text">${summary.recommendation}</p>
      </div>
    `;
  }

  /* -----------------------------------------------------
     11. FULL DASHBOARD RENDER
  ----------------------------------------------------- */

  function renderFullDashboard() {
    if (!state.hasResults) return;
    renderDashboardMeta();

    setScoreCircle(el.brandScoreCircle, el.brandScoreValue, state.brandAnalysis.overallScore, "var(--purple)");
    setScoreCircle(el.competitorScoreCircle, el.competitorScoreValue, state.competitorAnalysis.overallScore, "var(--navy-soft)");
    renderScoreSubs();

    renderSentimentBars(state.brandAnalysis.sentimentPct);
    renderThemeList(el.positiveThemes, getRankedThemes(state.brandAnalysis.themeStats, "positive"), "positive");
    renderInsights(state.insightsData);

    renderPainPointChart();
    renderOpportunities(state.opportunitiesData);
    renderPersonas(state.personasData);

    renderBenchmark(state.benchmarkRows, state.brandName, state.competitorName);
    renderStrengthsWeaknesses(state.benchmarkRows);
    renderBenchmarkSummary(state.benchmarkRows, state.brandName, state.competitorName);

    renderActionPlan(state.actionPlanData);
    renderExecutiveSummary();
  }

  /* -----------------------------------------------------
     12. CHARTS (Chart.js, CDN only)
  ----------------------------------------------------- */

  function hasChart() {
    return typeof window.Chart !== "undefined";
  }

  function renderPainPointChart() {
    const painPoints = getRankedThemes(state.brandAnalysis.themeStats, "negative").slice(0, 5);
    const total = state.brandAnalysis.total;

    if (painPoints.length === 0) {
      el.painPointCanvas.classList.add("hidden");
      el.painPointEmpty.classList.remove("hidden");
      if (painPointChartInstance) {
        painPointChartInstance.destroy();
        painPointChartInstance = null;
      }
      return;
    }
    el.painPointCanvas.classList.remove("hidden");
    el.painPointEmpty.classList.add("hidden");

    const labels = THEME_LABELS[state.lang];
    const chartLabels = painPoints.map((p) => labels[p.key]);
    const chartData = painPoints.map((p) => Math.round((p.count / total) * 100));

    if (!hasChart()) return;

    if (painPointChartInstance) painPointChartInstance.destroy();

    painPointChartInstance = new window.Chart(el.painPointCanvas.getContext("2d"), {
      type: "bar",
      data: {
        labels: chartLabels,
        datasets: [{
          label: t("painPointChartAxisLabel"),
          data: chartData,
          backgroundColor: "#e0505b",
          borderRadius: 6,
          maxBarThickness: 34
        }]
      },
      options: {
        indexAxis: "y",
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: { beginAtZero: true, max: 100, ticks: { callback: (v) => v + "%" }, grid: { color: "#e4e6ef" } },
          y: { grid: { display: false } }
        }
      }
    });
  }

  function drawTrendChart(history) {
    if (!history || history.length < 2) {
      el.trendCanvas.classList.add("hidden");
      el.trendEmptyState.classList.remove("hidden");
      if (trendChartInstance) {
        trendChartInstance.destroy();
        trendChartInstance = null;
      }
      return;
    }
    el.trendCanvas.classList.remove("hidden");
    el.trendEmptyState.classList.add("hidden");

    if (!hasChart()) return;

    const chronological = history.slice().reverse();
    const labels = chronological.map((entry) => {
      const d = new Date(entry.date);
      return (d.getMonth() + 1) + "/" + d.getDate();
    });
    const brandData = chronological.map((entry) => entry.brandScore);
    const compData = chronological.map((entry) => entry.competitorScore);

    if (trendChartInstance) trendChartInstance.destroy();

    trendChartInstance = new window.Chart(el.trendCanvas.getContext("2d"), {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            label: t("trendBrandLabel"),
            data: brandData,
            borderColor: "#6c5ce7",
            backgroundColor: "rgba(108, 92, 231, 0.12)",
            tension: 0.3,
            fill: true,
            pointRadius: 3.5
          },
          {
            label: t("trendCompetitorLabel"),
            data: compData,
            borderColor: "#3c4568",
            backgroundColor: "rgba(60, 69, 104, 0.08)",
            tension: 0.3,
            fill: true,
            pointRadius: 3.5
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: true, position: "bottom" } },
        scales: {
          y: { beginAtZero: true, max: 100, grid: { color: "#e4e6ef" } },
          x: { grid: { display: false } }
        }
      }
    });
  }

  /* -----------------------------------------------------
     13. HISTORY (localStorage)
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
    state.hasResults = false;

    el.dashboard.classList.remove("hidden");
    const locale = state.lang === "zh" ? "zh-CN" : "en-US";
    el.dashboardMeta.textContent = `${t("loadedFromHistoryPrefix")} ${entry.brandName} vs ${entry.competitorName} — ${new Date(entry.date).toLocaleString(locale)}`;

    setScoreCircle(el.brandScoreCircle, el.brandScoreValue, entry.brandScore, "var(--purple)");
    el.brandScoreSub.textContent = entry.brandName;
    setScoreCircle(el.competitorScoreCircle, el.competitorScoreValue, entry.competitorScore, "var(--navy-soft)");
    el.competitorScoreSub.textContent = entry.competitorName;

    renderSentimentBars(entry.brandSentiment);
    renderThemeList(el.positiveThemes, entry.topPositiveTheme ? [entry.topPositiveTheme] : [], "positive");

    el.insightCards.innerHTML = `<div class="insight-card"><p class="insight-label">${state.lang === "zh" ? "历史快照" : "Historical Snapshot"}</p><p class="insight-text">${t("historyDetailNote")}</p></div>`;
    el.execSummaryBody.innerHTML = `<div class="exec-block"><p class="exec-text">${t("execSummaryHistoryNote")}</p></div>`;
    el.opportunityCards.innerHTML = `<p class="empty-state-text">${t("opportunityHistoryNote")}</p>`;
    el.personaCards.innerHTML = `<p class="empty-state-text">${t("personaHistoryNote")}</p>`;
    el.benchmarkBody.innerHTML = `<tr><td colspan="4" class="empty-state-text">${t("benchmarkHistoryNote")}</td></tr>`;
    el.strengthsList.innerHTML = "";
    el.weaknessesList.innerHTML = "";
    el.thBrand.textContent = entry.brandName;
    el.thCompetitor.textContent = entry.competitorName;
    el.benchmarkSummary.textContent = "";
    el.actionHigh.innerHTML = "";
    el.actionMedium.innerHTML = "";
    el.actionLow.innerHTML = `<li>${t("actionHistoryNote")}</li>`;

    if (painPointChartInstance) { painPointChartInstance.destroy(); painPointChartInstance = null; }
    el.painPointCanvas.classList.add("hidden");
    el.painPointEmpty.classList.remove("hidden");

    window.scrollTo({ top: el.dashboard.offsetTop - 20, behavior: "smooth" });
  }

  /* -----------------------------------------------------
     14. STAGE ANIMATION
  ----------------------------------------------------- */

  function wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  function renderStageStatuses() {
    ["agent1", "agent2", "agent3", "output"].forEach((key) => {
      const statusEl = el.stageTracker.querySelector(`[data-stage-status="${key}"]`);
      const status = state.stageStatus[key];
      if (status === "waiting") statusEl.textContent = t("statusWaiting");
      else if (status === "analysing") statusEl.textContent = key === "output" ? t("statusGenerating") : t("statusAnalysing");
      else statusEl.textContent = t("statusComplete");
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
     15. MAIN WORKFLOW
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

    await runStage("agent1");
    await runStage("agent2");
    await runStage("agent3");
    await runStage("output");

    const brandA = analyseReviews(brandLines);
    const compA = analyseReviews(competitorLines);
    const benchmarkRows = buildBenchmark(brandA, compA);
    const insightsData = generateInsightsData(brandA, compA, benchmarkRows);
    const personasData = generatePersonasData(brandA);
    const actionPlanData = generateActionPlanData(brandA);
    const opportunitiesData = generateOpportunitiesData(brandA);

    state.hasResults = true;
    state.brandName = brandName;
    state.competitorName = competitorName;
    state.brandAnalysis = brandA;
    state.competitorAnalysis = compA;
    state.benchmarkRows = benchmarkRows;
    state.insightsData = insightsData;
    state.personasData = personasData;
    state.actionPlanData = actionPlanData;
    state.opportunitiesData = opportunitiesData;

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
     16. LANGUAGE SWITCHING
  ----------------------------------------------------- */

  function applyStaticTranslations() {
    document.documentElement.lang = state.lang === "zh" ? "zh-CN" : "en";

    document.querySelectorAll("[data-i18n]").forEach((elNode) => {
      const key = elNode.getAttribute("data-i18n");
      const val = t(key);
      if (typeof val === "string") elNode.textContent = val;
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
     17. EVENT WIRING
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

  window.addEventListener("resize", () => {
    // Chart.js handles its own responsive resizing via the `responsive: true` option,
    // so no manual redraw wiring is required here.
  });

  /* -----------------------------------------------------
     18. INITIAL LOAD
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
