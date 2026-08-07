/* =====================================================
   ConsumerLens — script.js (V3.2, Bilingual: 中文 / English)
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
      tagline: "消费者智能洞察平台",
      heroDesc: "将消费者评论转化为可执行的商业洞察。",

      wfTitle: "分析工作流",
      wfSubtitle: "六步分析流程，将原始评论转化为高管级商业报告",
      wfNodeReviews: "输入评论",
      wfSentimentAI: "情感分析",
      wfPersonaAI: "消费者画像",
      wfCompetitorAI: "竞争分析",
      wfBusinessIntel: "商业智能",
      wfExecReport: "高管报告",

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
      btnExportReport: "导出分析数据（JSON）",
      btnExportHistory: "导出历史记录",

      progressSectionTitle: "2. 分析工作流",
      progressSectionSubtext: "所有分析均在您的浏览器本地完成，基于规则的文本分析技术，不调用任何外部服务。",
      statusWaiting: "等待中",
      statusAnalysing: "分析中",
      statusGenerating: "生成中",
      statusComplete: "已完成",

      dashboardTitle: "结果仪表盘",

      kpiSectionTitle: "核心指标概览",
      kpiBrandHealth: "品牌健康度",
      kpiSatisfaction: "客户满意度",
      kpiCompetitivePosition: "竞争地位指数",
      kpiAiConfidence: "置信度分数",
      kpiBusinessRisk: "业务风险指数",
      kpiBrandHealthCaption: "综合满意度与各主题表现计算得出",
      kpiSatisfactionCaption: "基于正负面评论比例计算",
      kpiPositionCaption: "50 为持平，高于 50 表示领先竞品",
      kpiConfidenceCaption: "基于本次分析的评论样本量",
      kpiRiskCaption: "基于负面评论占比，数值越高风险越大",

      execSummaryTitle: "高管摘要",
      execSummarySubtitle: "适合市场经理阅读的简明报告",
      execOverallFindingLabel: "整体发现",
      execPainPointLabel: "主要客户痛点",
      execOpportunityLabel: "主要增长机会",
      execAdvantageLabel: "竞品优势",
      execRecommendationLabel: "建议商业行动",

      labelOverallSatisfactionYou: "总体满意度（本品牌）",
      labelOverallSatisfactionCompetitor: "总体满意度（竞品）",
      sentimentDistTitle: "情感分布 — 本品牌",
      sentimentPieTitle: "情感占比图",
      positiveLabel: "正面评论",
      neutralLabel: "中立评论",
      negativeLabel: "负面评论",
      topPositiveThemesTitle: "主要正面主题",
      consumerInsightsTitle: "消费者洞察",

      keywordIntelTitle: "关键词智能分析",
      keywordIntelSubtitle: "自动提取并按频率排序评论中的关键词与主题",
      topPositiveKeywords: "高频正面关键词",
      topNegativeKeywords: "高频负面关键词",
      topMentionedTopics: "高频提及主题",
      noKeywordsText: "未检测到足够的关键词数据。",

      themeDistTitle: "主题分布",
      themeDistSubtitle: "评论中各主题类别的提及占比",
      themeDistProduct: "产品体验",
      themeDistOther: "其他",

      painPointDashboardTitle: "痛点仪表盘",
      painPointDashboardSubtitle: "自动汇总本品牌评论中最主要的五大痛点",
      painPointChartAxisLabel: "占本品牌评论的百分比",

      opportunityDashboardTitle: "增长机会仪表盘",
      opportunityDashboardSubtitle: "基于客户投诉自动生成的改进机会",
      opportunityCardTitlePrefix: "增长机会",
      opportunityMarketLabel: "市场机会",
      opportunityQuickWinLabel: "速赢举措",
      opportunityLongTermLabel: "长期机会",
      opportunityRiskLabel: "潜在风险",
      opportunityPriorityLabel: "优先级",
      opportunityEvidence: (n) => `依据：${n} 条负面评论提及`,
      noOpportunitiesText: "暂未检测到明显的改进机会，说明当前评论整体反馈良好。",

      personasTitle: "消费者画像",
      personasSubtext: "仅展示评论中有证据支持的消费者画像；以下属性为基于语言模式推断的典型特征，并非从评论者收集的真实人口统计数据。",
      personaAgeLabel: "年龄范围",
      personaDescLabel: "画像描述",
      personaMotivationLabel: "购买动机",
      personaPainLabel: "主要痛点",
      personaChannelLabel: "偏好渠道",
      personaMarketingLabel: "建议营销策略",
      noPersonasText: "暂未检测到有力的消费者画像特征，尝试输入更详细的评论以获得画像分析。",

      competitiveGapTitle: "竞争基准分析",
      colCategory: "类别",
      colYourBrand: "本品牌",
      colCompetitor: "竞品",
      colGap: "差距",
      strengthsTitle: "我们的优势",
      weaknessesTitle: "我们的劣势",
      noStrengthsText: "暂未检测到明显领先的对比维度。",
      noWeaknessesText: "暂未检测到明显落后的对比维度。",

      radarSectionTitle: "竞争维度雷达图",
      radarSubtitle: "对比本品牌与竞品在七个关键维度上的表现",

      actionPlanTitle: "优先行动计划",
      highPriority: "高优先级",
      mediumPriority: "中优先级",
      lowPriority: "低优先级",

      businessRecTitle: "战略建议",
      businessRecSubtitle: "按时间维度划分的行动路线图",
      immediateAction: "立即行动",
      plan30Day: "30 天计划",
      strategy90Day: "90 天策略",

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
      historySubtext: "数据保存在您浏览器的本地存储（localStorage）中。点击任意记录可重新加载该次分析的完整图表。",
      historyEmptyText: "暂无历史记录。完成上方第一次分析后即可开始积累历史数据。",
      historyYouLabel: "本品牌",
      historyCompetitorLabel: "竞品",

      footerText: "ConsumerLens 完全在您的浏览器本地运行。任何评论内容、品牌名称或分析结果均不会被发送到任何服务器、API 或第三方。",

      errorMinBrand: "请至少输入3条本品牌消费者评论。",
      errorMinCompetitor: "请至少输入3条竞品消费者评论。",

      loadedFromHistoryPrefix: "已从历史记录加载 —",

      reportCenterTitle: "高管报告中心",
      reportCenterSubtitle: "基于最新的分析结果生成专业管理报告",
      btnGenerateReport: "生成管理报告",
      btnPrintReport: "打印 / 保存为 PDF",
      reportCenterEmptyText: "请先完成一次分析，然后点击“生成报告”以创建高管报告。",
      reportCenterNoticeText: "请先完成一次分析，才能生成或打印高管报告。",
      reportCoverTagline: "消费者智能洞察平台",
      reportCoverGeneratedLabel: "生成的报告",
      reportIdLabel: "报告编号",
      reportGenTimeLabel: "生成时间",
      reportVersionLabel: "版本",
      reportOverallSentimentLabel: "整体情感倾向",
      reportMainRiskLabel: "主要风险",
      reportDashboardSummaryTitle: "仪表盘摘要",
      reportCompetitorTitle: "竞品对比",
      reportGapLabel: "竞争基准",
      reportFooterText: "由 ConsumerLens 自动生成",
      sentimentDominantPositive: (pct) => `本次评论以正面情感为主，正面评论占比 ${pct}%。`,
      sentimentDominantNeutral: (pct) => `本次评论以中立情感为主，中立评论占比 ${pct}%。`,
      sentimentDominantNegative: (pct) => `本次评论以负面情感为主，负面评论占比 ${pct}%。`,

      defaultBrandName: "本品牌",
      defaultCompetitorName: "竞品"
    },

    en: {
      tagBadge: "Runs 100% locally · No API · No cost",
      tagline: "Consumer Intelligence Platform",
      heroDesc: "Turn customer feedback into actionable business insights.",

      wfTitle: "Analysis Workflow",
      wfSubtitle: "A six-step analysis process that turns raw reviews into an executive-ready business report",
      wfNodeReviews: "Input Reviews",
      wfSentimentAI: "Sentiment Analysis",
      wfPersonaAI: "Consumer Personas",
      wfCompetitorAI: "Competitive Analysis",
      wfBusinessIntel: "Business Intelligence",
      wfExecReport: "Executive Report",

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
      btnExportReport: "Export Analysis Data (JSON)",
      btnExportHistory: "Export History",

      progressSectionTitle: "2. Analysis Workflow",
      progressSectionSubtext: "All processing happens in your browser using rule-based text analysis. No external services are called.",
      statusWaiting: "Waiting",
      statusAnalysing: "Analysing",
      statusGenerating: "Generating",
      statusComplete: "Completed",

      dashboardTitle: "Results Dashboard",

      kpiSectionTitle: "Executive Dashboard",
      kpiBrandHealth: "Brand Health Score",
      kpiSatisfaction: "Customer Satisfaction",
      kpiCompetitivePosition: "Competitive Position",
      kpiAiConfidence: "Confidence Score",
      kpiBusinessRisk: "Business Risk",
      kpiBrandHealthCaption: "Blended from overall satisfaction and theme performance",
      kpiSatisfactionCaption: "Based on the ratio of positive to negative reviews",
      kpiPositionCaption: "50 = parity; above 50 means you're ahead of the competitor",
      kpiConfidenceCaption: "Based on the review sample size in this analysis",
      kpiRiskCaption: "Based on the share of negative reviews; higher = more risk",

      execSummaryTitle: "Executive Summary",
      execSummarySubtitle: "A concise report for marketing managers",
      execOverallFindingLabel: "Overall Finding",
      execPainPointLabel: "Main Customer Pain Point",
      execOpportunityLabel: "Main Growth Opportunity",
      execAdvantageLabel: "Competitor Advantage",
      execRecommendationLabel: "Recommended Business Action",

      labelOverallSatisfactionYou: "Overall Satisfaction — Your Brand",
      labelOverallSatisfactionCompetitor: "Overall Satisfaction — Competitor",
      sentimentDistTitle: "Sentiment Distribution — Your Brand",
      sentimentPieTitle: "Sentiment Breakdown",
      positiveLabel: "Positive Reviews",
      neutralLabel: "Neutral Reviews",
      negativeLabel: "Negative Reviews",
      topPositiveThemesTitle: "Top Positive Themes",
      consumerInsightsTitle: "Consumer Insights",

      keywordIntelTitle: "Keyword Intelligence",
      keywordIntelSubtitle: "Automatically extracts and ranks keywords and topics from your reviews by frequency",
      topPositiveKeywords: "Top Positive Keywords",
      topNegativeKeywords: "Top Negative Keywords",
      topMentionedTopics: "Top Mentioned Topics",
      noKeywordsText: "Not enough keyword data detected.",

      themeDistTitle: "Theme Distribution",
      themeDistSubtitle: "Share of reviews mentioning each theme category",
      themeDistProduct: "Product",
      themeDistOther: "Other",

      painPointDashboardTitle: "Pain Point Dashboard",
      painPointDashboardSubtitle: "Automatically summarizes the top 5 pain points from your brand's reviews",
      painPointChartAxisLabel: "% of your brand's reviews",

      opportunityDashboardTitle: "Growth Opportunities Dashboard",
      opportunityDashboardSubtitle: "Opportunities automatically generated from customer complaints",
      opportunityCardTitlePrefix: "Growth Opportunity",
      opportunityMarketLabel: "Market Opportunity",
      opportunityQuickWinLabel: "Quick Win",
      opportunityLongTermLabel: "Long-term Opportunity",
      opportunityRiskLabel: "Risk",
      opportunityPriorityLabel: "Priority Level",
      opportunityEvidence: (n) => `Based on ${n} negative mention(s)`,
      noOpportunitiesText: "No clear improvement opportunities detected — overall feedback looks strong.",

      personasTitle: "Consumer Personas",
      personasSubtext: "Personas are only shown when supported by evidence in the submitted reviews. Attributes below are inferred archetypes based on language patterns, not demographic data collected from reviewers.",
      personaAgeLabel: "Age Range",
      personaDescLabel: "Description",
      personaMotivationLabel: "Buying Motivation",
      personaPainLabel: "Pain Point",
      personaChannelLabel: "Preferred Channel",
      personaMarketingLabel: "Suggested Marketing Strategy",
      noPersonasText: "No strong persona patterns were detected yet. Try adding more detailed reviews to surface consumer personas.",

      competitiveGapTitle: "Competitive Benchmark",
      colCategory: "Category",
      colYourBrand: "Your Brand",
      colCompetitor: "Competitor",
      colGap: "Gap",
      strengthsTitle: "Our Strengths",
      weaknessesTitle: "Our Weaknesses",
      noStrengthsText: "No categories with a clear lead were detected.",
      noWeaknessesText: "No categories with a clear deficit were detected.",

      radarSectionTitle: "Competitor Radar",
      radarSubtitle: "Compares your brand and the competitor across seven key dimensions",

      actionPlanTitle: "Priority Action Plan",
      highPriority: "High Priority",
      mediumPriority: "Medium Priority",
      lowPriority: "Low Priority",

      businessRecTitle: "Strategic Recommendations",
      businessRecSubtitle: "A time-phased action roadmap",
      immediateAction: "Immediate Action",
      plan30Day: "30-Day Plan",
      strategy90Day: "90-Day Strategy",

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
      historySubtext: "Stored locally in your browser using localStorage. Click an entry to reload that analysis's full charts.",
      historyEmptyText: "No saved analyses yet. Run your first analysis above to start building history.",
      historyYouLabel: "You",
      historyCompetitorLabel: "Competitor",

      footerText: "ConsumerLens runs entirely in your browser. No reviews, brand names, or results are sent to any server, API, or third party.",

      errorMinBrand: "Please enter at least 3 customer reviews for your brand.",
      errorMinCompetitor: "Please enter at least 3 customer reviews for the competitor.",

      loadedFromHistoryPrefix: "Loaded from history —",

      reportCenterTitle: "Executive Report Center",
      reportCenterSubtitle: "Generate professional management reports from the latest analysis.",
      btnGenerateReport: "Generate Executive Report",
      btnPrintReport: "Print / Save as PDF",
      reportCenterEmptyText: "Please run an analysis first, then click \"Generate Report\" to create an executive report.",
      reportCenterNoticeText: "Please run an analysis first before generating or printing an executive report.",
      reportCoverTagline: "Consumer Intelligence Platform",
      reportCoverGeneratedLabel: "Generated Report",
      reportIdLabel: "Report ID",
      reportGenTimeLabel: "Generation Time",
      reportVersionLabel: "Version",
      reportOverallSentimentLabel: "Overall Sentiment",
      reportMainRiskLabel: "Main Risk",
      reportDashboardSummaryTitle: "Dashboard Summary",
      reportCompetitorTitle: "Competitor Comparison",
      reportGapLabel: "Competitive Benchmark",
      reportFooterText: "Generated automatically by ConsumerLens",
      sentimentDominantPositive: (pct) => `Reviews for this analysis are predominantly positive, at ${pct}%.`,
      sentimentDominantNeutral: (pct) => `Reviews for this analysis are predominantly neutral, at ${pct}%.`,
      sentimentDominantNegative: (pct) => `Reviews for this analysis are predominantly negative, at ${pct}%.`,

      defaultBrandName: "Your Brand",
      defaultCompetitorName: "Competitor"
    }
  };

  function t(key) {
    const val = I18N[state.lang][key];
    return typeof val === "function" ? val : (val !== undefined ? val : key);
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
    },
    innovation: {
      zh: ["创新", "新颖", "黑科技", "独特", "新品", "智能", "科技感", "前卫"],
      en: ["innovative", "innovation", "unique", "cutting-edge", "novel",
        "smart", "tech-forward", "groundbreaking"]
    },
    brandImage: {
      zh: ["品牌形象", "口碑", "高端", "档次感", "品牌力", "有面子", "形象好"],
      en: ["brand image", "reputation", "prestige", "premium brand",
        "iconic", "status symbol", "brand reputation"]
    }
  };

  const THEME_LABELS = {
    zh: { price: "价格", quality: "质量", taste: "口味", packaging: "包装",
      delivery: "配送", service: "服务", convenience: "便利性", design: "设计",
      comfort: "舒适度", ingredients: "成分", innovation: "创新", brandImage: "品牌形象" },
    en: { price: "Price", quality: "Quality", taste: "Taste", packaging: "Packaging",
      delivery: "Delivery", service: "Service", convenience: "Convenience",
      design: "Design", comfort: "Comfort", ingredients: "Ingredients",
      innovation: "Innovation", brandImage: "Brand Image" }
  };

  const BENCHMARK_CATEGORY_KEYS = ["satisfaction", "price", "quality", "packaging", "delivery", "service"];
  const BENCHMARK_LABELS = {
    zh: { satisfaction: "满意度", price: "价格感知", quality: "质量", packaging: "包装",
      delivery: "配送", service: "服务" },
    en: { satisfaction: "Satisfaction", price: "Price Perception", quality: "Quality",
      packaging: "Packaging", delivery: "Delivery", service: "Service" }
  };

  // Radar chart compares 7 fixed dimensions (per spec)
  const RADAR_CATEGORY_KEYS = ["taste", "price", "packaging", "delivery", "quality", "innovation", "brandImage"];

  // Theme Distribution groups the 12 detailed themes into 8 fixed buckets (per spec)
  const THEME_DIST_GROUPS = {
    zh: [
      { labelKey: "themeDistProduct", themes: ["taste", "comfort", "design"] },
      { labelKey: null, staticLabel: "价格", themes: ["price"] },
      { labelKey: null, staticLabel: "包装", themes: ["packaging"] },
      { labelKey: null, staticLabel: "配送", themes: ["delivery"] },
      { labelKey: null, staticLabel: "服务", themes: ["service"] },
      { labelKey: null, staticLabel: "质量", themes: ["quality"] },
      { labelKey: null, staticLabel: "成分/营养", themes: ["ingredients"] },
      { labelKey: "themeDistOther", themes: ["convenience", "innovation", "brandImage"] }
    ]
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
      innovation: "加大产品创新投入，推出更具差异化的新功能或新品，回应客户对创新性的期待。",
      brandImage: "加强品牌形象建设与公关传播，提升客户对品牌档次与口碑的感知。",
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
      innovation: "Invest more in product innovation and launch more differentiated features or new products to meet customer expectations.",
      brandImage: "Strengthen brand image building and PR communications to improve customer perception of brand prestige and reputation.",
      noHigh: "No high-severity issues detected. Continue monitoring reviews regularly for early warning signs.",
      noMedium: "No medium-severity issues detected in this batch of reviews.",
      maintainStrength: (theme) => `Continue reinforcing your strength in ${theme} through marketing and messaging.`,
      maintainGeneric: "Maintain current quality standards and continue collecting customer feedback."
    }
  };

  // Market-opportunity framing per theme (used on Opportunity Cards + Business Recommendation)
  const OPPORTUNITY_MARKET_TEMPLATES = {
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
      ingredients: "透明化配料信息并优化配方，将成分顾虑转化为健康信任的建立机会。",
      innovation: "以创新功能或新品发布制造话题，将创新诉求转化为产品差异化的机会。",
      brandImage: "通过品牌故事与公关活动重塑品牌形象，将形象顾虑转化为品牌升级的契机。"
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
      ingredients: "Increase ingredient transparency and reformulate where needed, turning ingredient concerns into a trust-building opportunity.",
      innovation: "Generate buzz through innovative features or new product launches, turning innovation demand into a differentiation opportunity.",
      brandImage: "Reshape brand image through brand storytelling and PR campaigns, turning image concerns into a brand-elevation opportunity."
    }
  };

  function opportunityLongTermText(themeLabel) {
    return state.lang === "zh"
      ? `将「${themeLabel}」打造为品牌的长期差异化优势，纳入年度产品与传播规划。`
      : `Build ${themeLabel} into a long-term brand differentiator, incorporated into the annual product and communications roadmap.`;
  }

  function opportunityRiskText(themeLabel) {
    return state.lang === "zh"
      ? `若不加以改善，「${themeLabel}」相关的负面反馈可能持续影响复购率与口碑传播。`
      : `If left unaddressed, negative feedback related to ${themeLabel} may continue to affect repeat purchase rate and word-of-mouth.`;
  }

  const PERSONA_DEFINITIONS = {
    zh: {
      price: {
        title: "价格敏感型消费者", tags: ["价格敏感", "追求性价比"],
        ageRange: "25–40 岁",
        description: "以性价比为核心决策依据的消费者，习惯货比三家。",
        motivation: "追求高性价比，希望花更少的钱获得同等甚至更好的体验。",
        painPoints: "价格上涨、隐藏费用、感觉物无所值。",
        preferredChannel: "电商促销活动、比价平台、会员专属折扣渠道。",
        marketingStrategy: "通过限时折扣、组合套餐和会员价体系强化价格吸引力。",
        describe: (c) => `价格相关话题在 ${c} 条评论中被提及，显示该客群非常看重性价比。`
      },
      quality: {
        title: "品质导向型消费者", tags: ["注重细节", "品牌忠诚"],
        ageRange: "30–50 岁",
        description: "重视产品耐用性与工艺水准，愿意为可靠品质买单。",
        motivation: "看重产品的耐用性与一致性，愿意为更高品质支付溢价。",
        painPoints: "质量不稳定、做工瑕疵、与宣传不符。",
        preferredChannel: "品牌官网、专业评测媒体、老客户口碑推荐。",
        marketingStrategy: "突出质检认证、耐用性测试数据与真实用户长期使用反馈。",
        describe: (c) => `质量相关话题在 ${c} 条评论中被提及，表明该客群会仔细比较产品标准。`
      },
      convenience: {
        title: "便利导向型消费者", tags: ["时间紧张", "务实"],
        ageRange: "22–35 岁",
        description: "追求高效便捷生活方式，希望减少决策与使用成本的消费者。",
        motivation: "生活节奏快，希望产品能节省时间、简化流程。",
        painPoints: "使用步骤繁琐、携带不便、配送速度慢。",
        preferredChannel: "即时配送平台、订阅制服务、移动端一键下单。",
        marketingStrategy: "强调“省时省心”的使用场景，突出快速配送与简单上手体验。",
        describe: (c) => `便利性话题在 ${c} 条评论中被提及，通常与忙碌的生活方式相关。`
      },
      ingredients: {
        title: "健康健身型消费者", tags: ["注重健康", "关注成分表"],
        ageRange: "20–38 岁",
        description: "关注健康与自我投资，会仔细研究成分与营养数据的消费者。",
        motivation: "关注营养成分与健康效益，将购买视为自我投资的一部分。",
        painPoints: "配料表不透明、添加剂过多、营养宣传夸大。",
        preferredChannel: "健身社群、健康类内容平台、专业营养师推荐。",
        marketingStrategy: "提供透明的成分标签、第三方检测报告与专业健康背书内容。",
        describe: (c) => `成分相关话题在 ${c} 条评论中被提及，反映出注重健康的购买决策。`
      },
      design: {
        title: "设计审美型消费者", tags: ["注重美感", "在意品牌形象"],
        ageRange: "24–40 岁",
        description: "将购买视为自我表达，重视产品外观与品牌调性的消费者。",
        motivation: "重视产品的视觉呈现与品牌形象，购买也是一种自我表达。",
        painPoints: "设计过时、包装缺乏辨识度、与个人审美不符。",
        preferredChannel: "社交媒体、设计类内容平台、联名或限量发售渠道。",
        marketingStrategy: "通过高质感视觉内容、故事化传播与限量款制造话题与稀缺感。",
        describe: (c) => `设计相关话题在 ${c} 条评论中被提及，说明外观会影响该客群的评价。`
      }
    },
    en: {
      price: {
        title: "Value Seeker", tags: ["Price-sensitive", "Deal-driven"],
        ageRange: "25–40",
        description: "A shopper who makes decisions primarily on value for money and habitually compares prices across options.",
        motivation: "Seeks the best value for money and wants an equal or better experience for less spend.",
        painPoints: "Rising prices, hidden fees, feeling like it's not worth the cost.",
        preferredChannel: "E-commerce promotions, price-comparison platforms, and members-only discount channels.",
        marketingStrategy: "Use limited-time discounts, bundle deals, and a membership pricing tier to reinforce price appeal.",
        describe: (c) => `Price-related themes appear in ${c} review(s), showing this segment pays close attention to value for money.`
      },
      quality: {
        title: "Quality-Focused Buyer", tags: ["Detail-oriented", "Brand-loyal"],
        ageRange: "30–50",
        description: "Values product durability and craftsmanship, and is willing to pay for dependable quality.",
        motivation: "Values durability and consistency, and is willing to pay a premium for reliable quality.",
        painPoints: "Inconsistent quality, manufacturing flaws, product not matching expectations.",
        preferredChannel: "Brand's own website, professional review media, and word-of-mouth from existing customers.",
        marketingStrategy: "Highlight quality certifications, durability test data, and genuine long-term user feedback.",
        describe: (c) => `Quality-related themes appear in ${c} review(s), indicating shoppers who compare product standards closely.`
      },
      convenience: {
        title: "Convenience Seeker", tags: ["Time-poor", "Practical"],
        ageRange: "22–35",
        description: "Pursues an efficient, low-friction lifestyle and wants to minimize decision and usage effort.",
        motivation: "Has a busy lifestyle and wants products that save time and simplify daily routines.",
        painPoints: "Complicated usage steps, poor portability, slow delivery.",
        preferredChannel: "Instant delivery platforms, subscription services, and one-tap mobile ordering.",
        marketingStrategy: "Emphasize 'save time, save effort' use cases, highlighting fast delivery and an easy onboarding experience.",
        describe: (c) => `Convenience is mentioned in ${c} review(s), often in the context of on-the-go or busy lifestyles.`
      },
      ingredients: {
        title: "Fitness and Health Consumer", tags: ["Health-focused", "Label-reader"],
        ageRange: "20–38",
        description: "Focused on health and self-investment, and carefully studies ingredient and nutrition data before buying.",
        motivation: "Focused on nutrition and health benefits; views the purchase as an investment in themselves.",
        painPoints: "Unclear ingredient labeling, too many additives, overstated health claims.",
        preferredChannel: "Fitness communities, health-focused content platforms, and recommendations from nutrition professionals.",
        marketingStrategy: "Provide transparent ingredient labeling, third-party test reports, and credible health-professional endorsements.",
        describe: (c) => `Ingredient-related themes appear in ${c} review(s), reflecting health-conscious purchase decisions.`
      },
      design: {
        title: "Design-Conscious Consumer", tags: ["Aesthetic-driven", "Image-aware"],
        ageRange: "24–40",
        description: "Views purchasing as self-expression and cares deeply about product aesthetics and brand tone.",
        motivation: "Values visual presentation and brand image; purchasing is also a form of self-expression.",
        painPoints: "Outdated design, packaging that lacks distinctiveness, mismatch with personal aesthetic.",
        preferredChannel: "Social media, design-focused content platforms, and limited-edition or collaboration release channels.",
        marketingStrategy: "Use high-quality visual content, storytelling, and limited releases to generate buzz and a sense of scarcity.",
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
    businessRecData: null,
    stageStatus: { sentimentAI: "waiting", personaAI: "waiting", competitorAI: "waiting", businessIntel: "waiting", execReport: "waiting" },
    currentErrorKey: null
  };

  const STAGE_KEYS = ["sentimentAI", "personaAI", "competitorAI", "businessIntel", "execReport"];

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
    btnExportReport: document.getElementById("btn-export-report"),
    btnExportHistory: document.getElementById("btn-export-history"),

    progressSection: document.getElementById("progress-section"),
    stageTracker: document.getElementById("stage-tracker"),

    dashboard: document.getElementById("dashboard"),
    dashboardMeta: document.getElementById("dashboard-meta"),

    kpiGrid: document.getElementById("kpi-grid"),

    execSummaryBody: document.getElementById("exec-summary-body"),

    brandScoreCircle: document.getElementById("brand-score-circle"),
    brandScoreValue: document.getElementById("brand-score-value"),
    brandScoreSub: document.getElementById("brand-score-sub"),
    competitorScoreCircle: document.getElementById("competitor-score-circle"),
    competitorScoreValue: document.getElementById("competitor-score-value"),
    competitorScoreSub: document.getElementById("competitor-score-sub"),

    sentimentBars: document.getElementById("sentiment-bars"),
    sentimentLegend: document.getElementById("sentiment-legend"),
    sentimentPieCanvas: document.getElementById("sentiment-pie-canvas"),

    positiveThemes: document.getElementById("positive-themes"),

    keywordPositive: document.getElementById("keyword-positive"),
    keywordNegative: document.getElementById("keyword-negative"),
    keywordTopics: document.getElementById("keyword-topics"),

    insightCards: document.getElementById("insight-cards"),

    themeDistCanvas: document.getElementById("theme-dist-canvas"),

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

    radarCanvas: document.getElementById("radar-canvas"),

    actionHigh: document.getElementById("action-high"),
    actionMedium: document.getElementById("action-medium"),
    actionLow: document.getElementById("action-low"),

    recImmediate: document.getElementById("rec-immediate"),
    rec30day: document.getElementById("rec-30day"),
    rec90day: document.getElementById("rec-90day"),

    trendCanvas: document.getElementById("trend-canvas"),
    trendEmptyState: document.getElementById("trend-empty-state"),

    historyList: document.getElementById("history-list"),

    reportCenterNotice: document.getElementById("report-center-notice"),
    reportCenterEmpty: document.getElementById("report-center-empty"),
    reportPreview: document.getElementById("report-preview"),
    btnGenerateReport: document.getElementById("btn-generate-report"),
    btnPrintReport: document.getElementById("btn-print-report")
  };

  let painPointChartInstance = null;
  let trendChartInstance = null;
  let sentimentPieChartInstance = null;
  let themeDistChartInstance = null;
  let radarChartInstance = null;

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
      return { word, test: (text) => text.indexOf(w) !== -1 };
    }
    const regex = new RegExp("\\b" + escapeRegex(word) + "\\b", "i");
    return { word, test: (text) => regex.test(text) };
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

  // Counts hits AND accumulates per-keyword frequency into freqMap (for Keyword Intelligence)
  function countHitsWithFreq(text, matcherList, freqMap) {
    let count = 0;
    for (const m of matcherList) {
      if (m.test(text)) {
        count++;
        freqMap[m.word] = (freqMap[m.word] || 0) + 1;
      }
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

    const positiveKeywordFreq = {};
    const negativeKeywordFreq = {};

    const themeStats = {};
    Object.keys(THEMES).forEach((key) => {
      themeStats[key] = { positive: 0, negative: 0, neutral: 0, total: 0 };
    });

    reviews.forEach((review) => {
      const posHits = countHitsWithFreq(review, POSITIVE_MATCHERS, positiveKeywordFreq);
      const negHits = countHitsWithFreq(review, NEGATIVE_MATCHERS, negativeKeywordFreq);

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
      sentimentPct, overallScore, themeStats,
      positiveKeywordFreq, negativeKeywordFreq
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

  function getRankedKeywords(freqMap, limit) {
    return Object.keys(freqMap)
      .map((word) => ({ word, count: freqMap[word] }))
      .sort((a, b) => b.count - a.count)
      .slice(0, limit || 8);
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
      let priority = "low";
      if (idx === 0) priority = "high";
      else if (idx === 1) priority = "medium";
      return { theme: pp.key, count: pp.count, priority };
    });
  }

  function generateBusinessRecommendationData(brandA, benchmarkRows) {
    const painPoints = getRankedThemes(brandA.themeStats, "negative");
    const comparable = benchmarkRows.filter((r) => r.key !== "satisfaction" && r.gap !== null);
    const strongest = comparable.length ? comparable.reduce((a, b) => (a.gap > b.gap ? a : b)) : null;

    const immediate = painPoints[0] ? { type: "quickWin", theme: painPoints[0].key } : { type: "generic" };
    const thirtyDay = painPoints[1]
      ? { type: "market", theme: painPoints[1].key }
      : (painPoints[0] ? { type: "longTerm", theme: painPoints[0].key } : { type: "generic" });
    const ninetyDay = (strongest && strongest.gap > 0)
      ? { type: "leverage", key: strongest.key }
      : (painPoints[2] ? { type: "longTerm", theme: painPoints[2].key } : { type: "generic" });

    return { immediate, thirtyDay, ninetyDay };
  }

  /* -----------------------------------------------------
     9. KPI COMPUTATION (Executive Dashboard)
  ----------------------------------------------------- */

  function computeKPIs(brandA, compA) {
    const themeKeys = Object.keys(brandA.themeStats);
    const scored = themeKeys.map((k) => themeScore(brandA.themeStats[k])).filter((v) => v !== null);
    const avgThemeScore = scored.length ? Math.round(scored.reduce((a, b) => a + b, 0) / scored.length) : brandA.overallScore;

    const brandHealth = Math.round(brandA.overallScore * 0.6 + avgThemeScore * 0.4);
    const satisfaction = brandA.overallScore;
    const gap = brandA.overallScore - compA.overallScore;
    const competitivePosition = clamp(50 + gap, 0, 100);
    const sampleSize = brandA.total + compA.total;
    const aiConfidence = clamp(Math.round((sampleSize / 30) * 100), 35, 100);
    const businessRisk = brandA.sentimentPct.negative;

    return { brandHealth, satisfaction, competitivePosition, aiConfidence, businessRisk };
  }

  function kpiSeverityClass(key, value) {
    if (key === "businessRisk") {
      if (value >= 50) return "kpi-bad";
      if (value >= 25) return "kpi-warn";
      return "kpi-good";
    }
    // higher-is-better metrics
    if (value >= 65) return "kpi-good";
    if (value >= 40) return "kpi-warn";
    return "kpi-bad";
  }

  function renderKPIs(kpis) {
    const cards = [
      { key: "brandHealth", labelKey: "kpiBrandHealth", captionKey: "kpiBrandHealthCaption", suffix: "" },
      { key: "satisfaction", labelKey: "kpiSatisfaction", captionKey: "kpiSatisfactionCaption", suffix: "" },
      { key: "competitivePosition", labelKey: "kpiCompetitivePosition", captionKey: "kpiPositionCaption", suffix: "" },
      { key: "aiConfidence", labelKey: "kpiAiConfidence", captionKey: "kpiConfidenceCaption", suffix: "%" },
      { key: "businessRisk", labelKey: "kpiBusinessRisk", captionKey: "kpiRiskCaption", suffix: "%" }
    ];
    el.kpiGrid.innerHTML = cards.map((c) => {
      const value = kpis[c.key];
      const sevClass = kpiSeverityClass(c.key, c.key === "businessRisk" ? value : value);
      return `
        <div class="kpi-card">
          <p class="kpi-label">${t(c.labelKey)}</p>
          <p class="kpi-value ${sevClass}">${value}${c.suffix}</p>
          <p class="kpi-caption">${t(c.captionKey)}</p>
        </div>
      `;
    }).join("");
  }

  /* -----------------------------------------------------
     10. RENDERING (language-aware, driven by state.lang)
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

  function renderKeywordList(container, items, colorVar, emptyKey) {
    container.innerHTML = "";
    if (!items || items.length === 0) {
      container.innerHTML = `<p class="empty-state-text">${t(emptyKey || "noKeywordsText")}</p>`;
      return;
    }
    const maxCount = items[0].count;
    items.forEach((item) => {
      const row = document.createElement("div");
      row.className = "keyword-row";
      const widthPct = Math.round((item.count / maxCount) * 100);
      row.innerHTML = `
        <span class="kw-name" title="${item.label}">${item.label}</span>
        <div class="keyword-track"><div class="keyword-fill" style="width:${widthPct}%; background:${colorVar};"></div></div>
        <span class="kw-count">${item.count}</span>
      `;
      container.appendChild(row);
    });
  }

  function renderKeywordIntelligence(brandA) {
    const topPos = getRankedKeywords(brandA.positiveKeywordFreq, 8).map((k) => ({ label: k.word, count: k.count }));
    const topNeg = getRankedKeywords(brandA.negativeKeywordFreq, 8).map((k) => ({ label: k.word, count: k.count }));
    const labels = THEME_LABELS[state.lang];
    const topTopics = getRankedThemes(brandA.themeStats, "total").slice(0, 8).map((th) => ({ label: labels[th.key], count: th.count }));

    renderKeywordList(el.keywordPositive, topPos, "var(--green)");
    renderKeywordList(el.keywordNegative, topNeg, "var(--red)");
    renderKeywordList(el.keywordTopics, topTopics, "var(--purple)");
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
          <p class="pf-label">${t("personaDescLabel")}</p>
          <p class="pf-text">${def.description}</p>
        </div>
        <div class="persona-field">
          <p class="pf-label">${t("personaMotivationLabel")}</p>
          <p class="pf-text">${def.motivation}</p>
        </div>
        <div class="persona-field">
          <p class="pf-label">${t("personaPainLabel")}</p>
          <p class="pf-text">${def.painPoints}</p>
        </div>
        <div class="persona-field">
          <p class="pf-label">${t("personaChannelLabel")}</p>
          <p class="pf-text">${def.preferredChannel}</p>
        </div>
        <div class="persona-field">
          <p class="pf-label">${t("personaMarketingLabel")}</p>
          <p class="pf-text">${def.marketingStrategy}</p>
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
    const marketTemplates = OPPORTUNITY_MARKET_TEMPLATES[state.lang];
    const quickWinTemplates = ACTION_TEMPLATES[state.lang];
    const priorityLabelMap = { high: t("highPriority"), medium: t("mediumPriority"), low: t("lowPriority") };
    opportunitiesData.forEach((opp) => {
      const themeLabel = labels[opp.theme];
      const card = document.createElement("div");
      card.className = "opportunity-card";
      card.innerHTML = `
        <div class="opportunity-card-header">
          <h4>${t("opportunityCardTitlePrefix")}: ${themeLabel}</h4>
          <span class="impact-badge impact-${opp.priority}">${priorityLabelMap[opp.priority]}</span>
        </div>
        <div class="opportunity-field">
          <p class="of-label">${t("opportunityMarketLabel")}</p>
          <p class="of-text">${marketTemplates[opp.theme]}</p>
        </div>
        <div class="opportunity-field">
          <p class="of-label">${t("opportunityQuickWinLabel")}</p>
          <p class="of-text">${quickWinTemplates[opp.theme]}</p>
        </div>
        <div class="opportunity-field">
          <p class="of-label">${t("opportunityLongTermLabel")}</p>
          <p class="of-text">${opportunityLongTermText(themeLabel)}</p>
        </div>
        <div class="opportunity-field">
          <p class="of-label">${t("opportunityRiskLabel")}</p>
          <p class="of-text">${opportunityRiskText(themeLabel)}</p>
        </div>
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

  function businessRecText(item) {
    const labels = THEME_LABELS[state.lang];
    const genericText = state.lang === "zh"
      ? "保持当前的产品与服务标准，持续监测客户反馈以捕捉新的信号。"
      : "Maintain current product and service standards, and continue monitoring feedback for new signals.";
    if (item.type === "generic") return genericText;
    if (item.type === "quickWin") return ACTION_TEMPLATES[state.lang][item.theme];
    if (item.type === "market") return OPPORTUNITY_MARKET_TEMPLATES[state.lang][item.theme];
    if (item.type === "longTerm") return opportunityLongTermText(labels[item.theme]);
    if (item.type === "leverage") {
      const themeLabel = BENCHMARK_LABELS[state.lang][item.key];
      return state.lang === "zh"
        ? `持续投入并放大在「${themeLabel}」方面相对竞品的优势，将其固化为品牌的长期护城河。`
        : `Continue investing in and amplifying your advantage in ${themeLabel} relative to the competitor, turning it into a durable long-term moat.`;
    }
    return genericText;
  }

  function renderBusinessRecommendation(recData) {
    el.recImmediate.textContent = businessRecText(recData.immediate);
    el.rec30day.textContent = businessRecText(recData.thirtyDay);
    el.rec90day.textContent = businessRecText(recData.ninetyDay);
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
     11. EXECUTIVE SUMMARY (5 fields per spec)
  ----------------------------------------------------- */

  function buildExecutiveSummary() {
    const brandA = state.brandAnalysis, compA = state.competitorAnalysis;
    const brandName = state.brandName, competitorName = state.competitorName;
    const labels = THEME_LABELS[state.lang];
    const benchLabels = BENCHMARK_LABELS[state.lang];
    const marketTemplates = OPPORTUNITY_MARKET_TEMPLATES[state.lang];

    const topPositive = getRankedThemes(brandA.themeStats, "positive")[0];
    const topPain = getRankedThemes(brandA.themeStats, "negative")[0];
    const comparable = state.benchmarkRows.filter((r) => r.key !== "satisfaction" && r.gap !== null);
    const strongest = comparable.length ? comparable.reduce((a, b) => (a.gap > b.gap ? a : b)) : null;
    const weakest = comparable.length ? comparable.reduce((a, b) => (a.gap < b.gap ? a : b)) : null;
    const firstHighAction = state.actionPlanData.high[0] ? actionText(state.actionPlanData.high[0]) : null;
    const gap = brandA.overallScore - compA.overallScore;

    if (state.lang === "zh") {
      const overallFinding = `本次分析基于 ${brandA.total} 条 ${brandName} 评论与 ${compA.total} 条 ${competitorName} 评论。${brandName} 的总体满意度得分为 ${brandA.overallScore} 分，${competitorName} 为 ${compA.overallScore} 分，` +
        (gap > 0 ? `${brandName} 领先 ${gap} 分。` : gap < 0 ? `${brandName} 落后 ${Math.abs(gap)} 分。` : `两者持平。`);
      const mainPainPoint = topPain
        ? `${labels[topPain.key]}是当前最主要的客户痛点，在 ${topPain.count} 条评论中被负面提及，需要优先关注以避免影响品牌口碑。`
        : `本次评论中未发现明显的痛点信号，整体反馈情况良好。`;
      const mainOpportunity = topPositive
        ? (marketTemplates[topPositive.key] || `${labels[topPositive.key]}是客户最常称赞的方面，可作为进一步放大的机会点。`)
        : `本次评论中未发现特别突出的机会点，建议持续收集更多客户反馈以识别机会领域。`;
      const competitorAdvantage = (weakest && weakest.gap < 0)
        ? `${competitorName} 在「${benchLabels[weakest.key]}」方面相对 ${brandName} 领先 ${Math.abs(weakest.gap)} 分，是竞品当前最主要的优势领域。`
        : `本次对比中未发现 ${competitorName} 具有明显领先的维度。`;
      const recommendedAction = firstHighAction
        ? firstHighAction
        : `建议持续监测客户评论，保持当前的产品与服务标准，并定期复盘满意度变化趋势。`;

      return { overallFinding, mainPainPoint, mainOpportunity, competitorAdvantage, recommendedAction };
    } else {
      const overallFinding = `This analysis is based on ${brandA.total} reviews for ${brandName} and ${compA.total} reviews for ${competitorName}. ${brandName} scored ${brandA.overallScore} on overall satisfaction versus ${compA.overallScore} for ${competitorName}, ` +
        (gap > 0 ? `putting ${brandName} ahead by ${gap} point(s).` : gap < 0 ? `putting ${brandName} behind by ${Math.abs(gap)} point(s).` : `putting the two brands at parity.`);
      const mainPainPoint = topPain
        ? `${labels[topPain.key]} is the leading customer pain point, mentioned negatively in ${topPain.count} review(s), and should be prioritized to protect brand reputation.`
        : `No significant pain point signals were detected in this batch of reviews; overall feedback looks healthy.`;
      const mainOpportunity = topPositive
        ? (marketTemplates[topPositive.key] || `${labels[topPositive.key]} is the most consistently praised aspect and a strong candidate to amplify further.`)
        : `No single standout opportunity was detected in this batch of reviews; continue collecting feedback to identify clear opportunities.`;
      const competitorAdvantage = (weakest && weakest.gap < 0)
        ? `${competitorName} leads ${brandName} by ${Math.abs(weakest.gap)} point(s) in ${benchLabels[weakest.key]}, making it the competitor's strongest edge right now.`
        : `No category was found where ${competitorName} holds a clear lead in this comparison.`;
      const recommendedAction = firstHighAction
        ? firstHighAction
        : `Continue monitoring customer reviews, maintain current product and service standards, and periodically review satisfaction trends.`;

      return { overallFinding, mainPainPoint, mainOpportunity, competitorAdvantage, recommendedAction };
    }
  }

  function renderExecutiveSummary() {
    const summary = buildExecutiveSummary();
    el.execSummaryBody.innerHTML = `
      <div class="exec-block">
        <p class="exec-label">${t("execOverallFindingLabel")}</p>
        <p class="exec-text">${summary.overallFinding}</p>
      </div>
      <div class="exec-block">
        <p class="exec-label">${t("execPainPointLabel")}</p>
        <p class="exec-text">${summary.mainPainPoint}</p>
      </div>
      <div class="exec-block">
        <p class="exec-label">${t("execOpportunityLabel")}</p>
        <p class="exec-text">${summary.mainOpportunity}</p>
      </div>
      <div class="exec-block">
        <p class="exec-label">${t("execAdvantageLabel")}</p>
        <p class="exec-text">${summary.competitorAdvantage}</p>
      </div>
      <div class="exec-block">
        <p class="exec-label">${t("execRecommendationLabel")}</p>
        <p class="exec-text">${summary.recommendedAction}</p>
      </div>
    `;
  }

  /* -----------------------------------------------------
     12. FULL DASHBOARD RENDER (used for both live runs and history reload)
  ----------------------------------------------------- */

  function renderFullDashboard() {
    if (!state.hasResults) return;
    renderDashboardMeta();

    renderKPIs(computeKPIs(state.brandAnalysis, state.competitorAnalysis));

    setScoreCircle(el.brandScoreCircle, el.brandScoreValue, state.brandAnalysis.overallScore, "var(--purple)");
    setScoreCircle(el.competitorScoreCircle, el.competitorScoreValue, state.competitorAnalysis.overallScore, "var(--navy-soft)");
    renderScoreSubs();

    renderSentimentBars(state.brandAnalysis.sentimentPct);
    renderSentimentPie(state.brandAnalysis.sentimentPct);
    renderThemeList(el.positiveThemes, getRankedThemes(state.brandAnalysis.themeStats, "positive"), "positive");

    renderKeywordIntelligence(state.brandAnalysis);
    renderInsights(state.insightsData);

    renderThemeDistributionChart(state.brandAnalysis);
    renderPainPointChart();
    renderOpportunities(state.opportunitiesData);
    renderPersonas(state.personasData);

    renderBenchmark(state.benchmarkRows, state.brandName, state.competitorName);
    renderStrengthsWeaknesses(state.benchmarkRows);
    renderBenchmarkSummary(state.benchmarkRows, state.brandName, state.competitorName);
    renderRadarChart();

    renderActionPlan(state.actionPlanData);
    renderBusinessRecommendation(state.businessRecData);
    renderExecutiveSummary();
  }

  /* -----------------------------------------------------
     13. CHARTS (Chart.js, CDN only)
  ----------------------------------------------------- */

  function hasChart() {
    return typeof window.Chart !== "undefined";
  }

  function renderSentimentPie(sentimentPct) {
    if (!hasChart()) return;
    if (sentimentPieChartInstance) sentimentPieChartInstance.destroy();
    sentimentPieChartInstance = new window.Chart(el.sentimentPieCanvas.getContext("2d"), {
      type: "pie",
      data: {
        labels: [t("positiveLabel"), t("neutralLabel"), t("negativeLabel")],
        datasets: [{
          data: [sentimentPct.positive, sentimentPct.neutral, sentimentPct.negative],
          backgroundColor: ["#1fa971", "#d98c1f", "#e0505b"],
          borderWidth: 2,
          borderColor: "#ffffff"
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: true, position: "bottom" } }
      }
    });
  }

  function renderThemeDistributionChart(brandA) {
    if (!hasChart()) return;
    const total = brandA.total;
    const groups = THEME_DIST_GROUPS.zh; // structure identical across languages, labels resolved below
    const chartLabels = groups.map((g) => g.labelKey ? t(g.labelKey) : g.staticLabel);
    // For static (non-translated) group labels, resolve via BENCHMARK/THEME labels where possible for correctness in English too
    const resolvedLabels = groups.map((g) => {
      if (g.labelKey) return t(g.labelKey);
      // map static zh label back to a canonical theme key for proper EN translation
      const singleTheme = g.themes.length === 1 ? g.themes[0] : null;
      if (singleTheme && THEME_LABELS[state.lang][singleTheme]) return THEME_LABELS[state.lang][singleTheme];
      return g.staticLabel;
    });
    const chartData = groups.map((g) => {
      const sum = g.themes.reduce((acc, themeKey) => acc + brandA.themeStats[themeKey].total, 0);
      return Math.round((sum / total) * 100);
    });

    if (themeDistChartInstance) themeDistChartInstance.destroy();
    themeDistChartInstance = new window.Chart(el.themeDistCanvas.getContext("2d"), {
      type: "bar",
      data: {
        labels: resolvedLabels,
        datasets: [{
          data: chartData,
          backgroundColor: "#6c5ce7",
          borderRadius: 6,
          maxBarThickness: 28
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

  function renderPainPointChart() {
    const painPoints = getRankedThemes(state.brandAnalysis.themeStats, "negative").slice(0, 5);
    const total = state.brandAnalysis.total;

    if (painPoints.length === 0) {
      el.painPointCanvas.classList.add("hidden");
      el.painPointEmpty.classList.remove("hidden");
      if (painPointChartInstance) { painPointChartInstance.destroy(); painPointChartInstance = null; }
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

  function renderRadarChart() {
    if (!hasChart()) return;
    const labels = THEME_LABELS[state.lang];
    const chartLabels = RADAR_CATEGORY_KEYS.map((k) => labels[k]);

    // Radar needs a value at every axis; default to 50 (neutral midpoint) when a theme has no mentions.
    const brandData = RADAR_CATEGORY_KEYS.map((k) => {
      const s = themeScore(state.brandAnalysis.themeStats[k]);
      return s === null ? 50 : s;
    });
    const compData = RADAR_CATEGORY_KEYS.map((k) => {
      const s = themeScore(state.competitorAnalysis.themeStats[k]);
      return s === null ? 50 : s;
    });

    if (radarChartInstance) radarChartInstance.destroy();
    radarChartInstance = new window.Chart(el.radarCanvas.getContext("2d"), {
      type: "radar",
      data: {
        labels: chartLabels,
        datasets: [
          {
            label: state.brandName || t("historyYouLabel"),
            data: brandData,
            borderColor: "#6c5ce7",
            backgroundColor: "rgba(108, 92, 231, 0.18)",
            pointBackgroundColor: "#6c5ce7"
          },
          {
            label: state.competitorName || t("historyCompetitorLabel"),
            data: compData,
            borderColor: "#3c4568",
            backgroundColor: "rgba(60, 69, 104, 0.12)",
            pointBackgroundColor: "#3c4568"
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: true, position: "bottom" } },
        scales: {
          r: { beginAtZero: true, max: 100, ticks: { stepSize: 25 } }
        }
      }
    });
  }

  function drawTrendChart(history) {
    if (!history || history.length < 2) {
      el.trendCanvas.classList.add("hidden");
      el.trendEmptyState.classList.remove("hidden");
      if (trendChartInstance) { trendChartInstance.destroy(); trendChartInstance = null; }
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
     14. HISTORY (localStorage) — stores full analysis so every chart can reload
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
          <span class="h-date">${dateStr} · ${entry.language === "zh" ? "中文" : "EN"}</span>
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

  // Rebuilds full application state from a stored history entry (full themeStats/keyword data
  // was saved at analysis time), then reuses the exact same render pipeline as a live run —
  // this is what makes "clicking history reloads every chart" work.
  function loadFromHistory(entry) {
    const brandA = {
      total: entry.brandTotal,
      overallScore: entry.brandScore,
      sentimentPct: entry.brandSentimentPct,
      themeStats: entry.brandThemeStats,
      positiveKeywordFreq: entry.positiveKeywordFreq || {},
      negativeKeywordFreq: entry.negativeKeywordFreq || {}
    };
    const compA = {
      total: entry.compTotal,
      overallScore: entry.competitorScore,
      sentimentPct: entry.compSentimentPct,
      themeStats: entry.compThemeStats,
      positiveKeywordFreq: {},
      negativeKeywordFreq: {}
    };

    const benchmarkRows = buildBenchmark(brandA, compA);

    state.hasResults = true;
    state.brandName = entry.brandName;
    state.competitorName = entry.competitorName;
    state.brandAnalysis = brandA;
    state.competitorAnalysis = compA;
    state.benchmarkRows = benchmarkRows;
    state.insightsData = generateInsightsData(brandA, compA, benchmarkRows);
    state.personasData = generatePersonasData(brandA);
    state.actionPlanData = generateActionPlanData(brandA);
    state.opportunitiesData = generateOpportunitiesData(brandA);
    state.businessRecData = generateBusinessRecommendationData(brandA, benchmarkRows);

    el.dashboard.classList.remove("hidden");
    renderFullDashboard();

    const locale = state.lang === "zh" ? "zh-CN" : "en-US";
    el.dashboardMeta.textContent = `${t("loadedFromHistoryPrefix")} ${entry.brandName} vs ${entry.competitorName} — ${new Date(entry.date).toLocaleString(locale)}`;

    window.scrollTo({ top: el.dashboard.offsetTop - 20, behavior: "smooth" });
  }

  /* -----------------------------------------------------
     15. STAGE ANIMATION (5 stages)
  ----------------------------------------------------- */

  function wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  function renderStageStatuses() {
    STAGE_KEYS.forEach((key) => {
      const statusEl = el.stageTracker.querySelector(`[data-stage-status="${key}"]`);
      const status = state.stageStatus[key];
      if (status === "waiting") statusEl.textContent = t("statusWaiting");
      else if (status === "analysing") statusEl.textContent = key === "execReport" ? t("statusGenerating") : t("statusAnalysing");
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
    await wait(550);
    stageEl.classList.remove("is-analysing");
    stageEl.classList.add("is-complete");
    stageEl.querySelector(".stage-icon").textContent = "\u2713";
    state.stageStatus[stageName] = "complete";
    renderStageStatuses();
    await wait(120);
  }

  /* -----------------------------------------------------
     16. MAIN WORKFLOW
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

    for (const stageKey of STAGE_KEYS) {
      await runStage(stageKey);
    }

    const brandA = analyseReviews(brandLines);
    const compA = analyseReviews(competitorLines);
    const benchmarkRows = buildBenchmark(brandA, compA);

    state.hasResults = true;
    state.brandName = brandName;
    state.competitorName = competitorName;
    state.brandAnalysis = brandA;
    state.competitorAnalysis = compA;
    state.benchmarkRows = benchmarkRows;
    state.insightsData = generateInsightsData(brandA, compA, benchmarkRows);
    state.personasData = generatePersonasData(brandA);
    state.actionPlanData = generateActionPlanData(brandA);
    state.opportunitiesData = generateOpportunitiesData(brandA);
    state.businessRecData = generateBusinessRecommendationData(brandA, benchmarkRows);

    el.dashboard.classList.remove("hidden");
    renderFullDashboard();

    const historyEntry = {
      date: new Date().toISOString(),
      brandName, competitorName,
      language: state.lang,
      brandScore: brandA.overallScore,
      competitorScore: compA.overallScore,
      brandTotal: brandA.total,
      compTotal: compA.total,
      brandSentimentPct: brandA.sentimentPct,
      compSentimentPct: compA.sentimentPct,
      brandThemeStats: brandA.themeStats,
      compThemeStats: compA.themeStats,
      positiveKeywordFreq: brandA.positiveKeywordFreq,
      negativeKeywordFreq: brandA.negativeKeywordFreq
    };
    const history = saveHistoryEntry(historyEntry);
    renderHistoryList(history);
    drawTrendChart(history);

    el.btnAnalyse.disabled = false;
    el.btnAnalyse.textContent = t("btnAnalyse");

    window.scrollTo({ top: el.dashboard.offsetTop - 20, behavior: "smooth" });
  }

  /* -----------------------------------------------------
     17. EXPORT FUNCTIONS (100% client-side, no backend)
  ----------------------------------------------------- */

  function downloadBlob(filename, content, mimeType) {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  function exportCurrentReport() {
    if (!state.hasResults) return;
    const report = {
      generatedAt: new Date().toISOString(),
      language: state.lang,
      brandName: state.brandName,
      competitorName: state.competitorName,
      kpis: computeKPIs(state.brandAnalysis, state.competitorAnalysis),
      executiveSummary: buildExecutiveSummary(),
      brandAnalysis: {
        total: state.brandAnalysis.total,
        overallScore: state.brandAnalysis.overallScore,
        sentimentPct: state.brandAnalysis.sentimentPct,
        themeStats: state.brandAnalysis.themeStats
      },
      competitorAnalysis: {
        total: state.competitorAnalysis.total,
        overallScore: state.competitorAnalysis.overallScore,
        sentimentPct: state.competitorAnalysis.sentimentPct,
        themeStats: state.competitorAnalysis.themeStats
      },
      benchmarkRows: state.benchmarkRows,
      opportunities: state.opportunitiesData,
      businessRecommendation: state.businessRecData
    };
    const safeBrand = (state.brandName || "brand").replace(/[^a-zA-Z0-9\u4e00-\u9fff-]+/g, "_");
    downloadBlob(`ConsumerLens_AnalysisData_${safeBrand}.json`, JSON.stringify(report, null, 2), "application/json");
  }

  function exportHistoryCSV() {
    const history = loadHistory();
    if (history.length === 0) return;
    const headers = ["date", "brandName", "competitorName", "language", "brandScore", "competitorScore"];
    const rows = history.map((h) => headers.map((k) => `"${String(h[k]).replace(/"/g, '""')}"`).join(","));
    const csv = [headers.join(","), ...rows].join("\n");
    downloadBlob("ConsumerLens_History.csv", csv, "text/csv");
  }

  /* -----------------------------------------------------
     17b. EXECUTIVE REPORT CENTER
     Builds a professional, print-ready report from the same
     state used by the live dashboard, then either renders it
     inline for preview or sends it to the browser print dialog
     (the user can choose "Save as PDF" there). No PDF library,
     no embedded fonts, no external API — purely local rendering.
  ----------------------------------------------------- */

  function generateReportId() {
    return "CL-" + Date.now().toString(36).toUpperCase();
  }

  function overallSentimentText(brandA) {
    const pct = brandA.sentimentPct;
    const dominant = pct.positive >= pct.neutral && pct.positive >= pct.negative
      ? "positive"
      : (pct.negative >= pct.neutral ? "negative" : "neutral");
    const val = dominant === "positive" ? pct.positive : dominant === "negative" ? pct.negative : pct.neutral;
    const fnKey = dominant === "positive" ? "sentimentDominantPositive" : dominant === "negative" ? "sentimentDominantNegative" : "sentimentDominantNeutral";
    const fn = t(fnKey);
    return typeof fn === "function" ? fn(val) : "";
  }

  function buildReportData() {
    if (!state.hasResults) return null;

    const brandA = state.brandAnalysis, compA = state.competitorAnalysis;
    const kpis = computeKPIs(brandA, compA);
    const execSummary = buildExecutiveSummary();
    const labels = THEME_LABELS[state.lang];
    const personaDefs = PERSONA_DEFINITIONS[state.lang];

    const personas = state.personasData.map((p) => ({
      title: personaDefs[p.theme].title,
      painPoints: personaDefs[p.theme].painPoints,
      motivation: personaDefs[p.theme].motivation,
      preferredChannel: personaDefs[p.theme].preferredChannel,
      marketingStrategy: personaDefs[p.theme].marketingStrategy
    }));

    const topPositiveKeywords = getRankedKeywords(brandA.positiveKeywordFreq, 8).map((k) => k.word);
    const topNegativeKeywords = getRankedKeywords(brandA.negativeKeywordFreq, 8).map((k) => k.word);
    const topTopics = getRankedThemes(brandA.themeStats, "total").slice(0, 8).map((th) => labels[th.key]);

    const benchLabels = BENCHMARK_LABELS[state.lang];
    const comparable = state.benchmarkRows.filter((r) => r.key !== "satisfaction" && r.gap !== null);
    const strengths = comparable.filter((r) => r.gap > 0).sort((a, b) => b.gap - a.gap).map((r) => `${benchLabels[r.key]} (+${r.gap})`);
    const weaknesses = comparable.filter((r) => r.gap < 0).sort((a, b) => a.gap - b.gap).map((r) => `${benchLabels[r.key]} (${r.gap})`);

    return {
      reportId: generateReportId(),
      generatedAt: new Date(),
      version: "3.1",
      lang: state.lang,
      brandName: state.brandName,
      competitorName: state.competitorName,
      overallSentiment: overallSentimentText(brandA),
      execSummary,
      kpis,
      personas,
      topPositiveKeywords,
      topNegativeKeywords,
      topTopics,
      strengths,
      weaknesses,
      gapNarrative: el.benchmarkSummary.textContent,
      businessRec: {
        immediate: businessRecText(state.businessRecData.immediate),
        thirtyDay: businessRecText(state.businessRecData.thirtyDay),
        ninetyDay: businessRecText(state.businessRecData.ninetyDay)
      }
    };
  }

  function renderReportPreview(data) {
    const locale = data.lang === "zh" ? "zh-CN" : "en-US";
    const genTimeStr = data.generatedAt.toLocaleString(locale);

    const kpiCells = [
      { label: t("kpiBrandHealth"), value: data.kpis.brandHealth },
      { label: t("kpiSatisfaction"), value: data.kpis.satisfaction },
      { label: t("kpiCompetitivePosition"), value: data.kpis.competitivePosition },
      { label: t("kpiAiConfidence"), value: data.kpis.aiConfidence + "%" },
      { label: t("kpiBusinessRisk"), value: data.kpis.businessRisk + "%" }
    ].map((c) => `
      <div class="report-kpi-cell">
        <p class="rk-label">${c.label}</p>
        <p class="rk-value">${c.value}</p>
      </div>
    `).join("");

    const personaCells = data.personas.length
      ? data.personas.map((p) => `
          <div class="report-persona-cell">
            <h4>${p.title}</h4>
            <p class="rp-row"><b>${t("personaPainLabel")}:</b> ${p.painPoints}</p>
            <p class="rp-row"><b>${t("personaMotivationLabel")}:</b> ${p.motivation}</p>
            <p class="rp-row"><b>${t("personaChannelLabel")}:</b> ${p.preferredChannel}</p>
            <p class="rp-row"><b>${t("personaMarketingLabel")}:</b> ${p.marketingStrategy}</p>
          </div>
        `).join("")
      : `<p class="empty-state-text">${t("noPersonasText")}</p>`;

    const kwList = (items) => items.length
      ? `<ul>${items.map((w) => `<li>${w}</li>`).join("")}</ul>`
      : `<p class="empty-state-text">${t("noKeywordsText")}</p>`;

    const gapList = (items, emptyKey) => items.length
      ? `<ul>${items.map((s) => `<li>${s}</li>`).join("")}</ul>`
      : `<p class="empty-state-text">${t(emptyKey)}</p>`;

    el.reportPreview.innerHTML = `
      <div class="report-cover">
        <p class="report-brand-name">ConsumerLens</p>
        <p class="report-cover-tagline">${t("reportCoverTagline")}</p>
        <p class="report-cover-title">${t("reportCoverGeneratedLabel")}: ${data.brandName} vs ${data.competitorName}</p>
        <div class="report-cover-meta">
          <div class="rc-item">
            <p class="rc-label">${t("reportIdLabel")}</p>
            <p class="rc-value">${data.reportId}</p>
          </div>
          <div class="rc-item">
            <p class="rc-label">${t("reportGenTimeLabel")}</p>
            <p class="rc-value">${genTimeStr}</p>
          </div>
          <div class="rc-item">
            <p class="rc-label">${t("reportVersionLabel")}</p>
            <p class="rc-value">${data.version}</p>
          </div>
        </div>
      </div>

      <div class="report-section">
        <h3>${t("execSummaryTitle")}</h3>
        <div class="report-block">
          <p class="rb-label">${t("reportOverallSentimentLabel")}</p>
          <p class="rb-text">${data.overallSentiment}</p>
        </div>
        <div class="report-block">
          <p class="rb-label">${t("execOverallFindingLabel")}</p>
          <p class="rb-text">${data.execSummary.overallFinding}</p>
        </div>
        <div class="report-block">
          <p class="rb-label">${t("execOpportunityLabel")}</p>
          <p class="rb-text">${data.execSummary.mainOpportunity}</p>
        </div>
        <div class="report-block">
          <p class="rb-label">${t("reportMainRiskLabel")}</p>
          <p class="rb-text">${data.execSummary.mainPainPoint}</p>
        </div>
      </div>

      <div class="report-section">
        <h3>${t("reportDashboardSummaryTitle")}</h3>
        <div class="report-kpi-grid">${kpiCells}</div>
      </div>

      <div class="report-section">
        <h3>${t("personasTitle")}</h3>
        <div class="report-persona-grid">${personaCells}</div>
      </div>

      <div class="report-section">
        <h3>${t("keywordIntelTitle")}</h3>
        <div class="report-keyword-grid">
          <div class="report-keyword-col">
            <h4>${t("topPositiveKeywords")}</h4>
            ${kwList(data.topPositiveKeywords)}
          </div>
          <div class="report-keyword-col">
            <h4>${t("topNegativeKeywords")}</h4>
            ${kwList(data.topNegativeKeywords)}
          </div>
          <div class="report-keyword-col">
            <h4>${t("topMentionedTopics")}</h4>
            ${kwList(data.topTopics)}
          </div>
        </div>
      </div>

      <div class="report-section">
        <h3>${t("reportCompetitorTitle")}</h3>
        <div class="report-gap-grid">
          <div class="report-gap-col rg-strengths">
            <h4>${t("strengthsTitle")}</h4>
            ${gapList(data.strengths, "noStrengthsText")}
          </div>
          <div class="report-gap-col rg-weaknesses">
            <h4>${t("weaknessesTitle")}</h4>
            ${gapList(data.weaknesses, "noWeaknessesText")}
          </div>
        </div>
        <div class="report-block">
          <p class="rb-label">${t("reportGapLabel")}</p>
          <p class="rb-text">${data.gapNarrative}</p>
        </div>
      </div>

      <div class="report-section">
        <h3>${t("businessRecTitle")}</h3>
        <div class="report-rec-grid">
          <div class="report-rec-cell rr-immediate">
            <h4>${t("immediateAction")}</h4>
            <p>${data.businessRec.immediate}</p>
          </div>
          <div class="report-rec-cell rr-30day">
            <h4>${t("plan30Day")}</h4>
            <p>${data.businessRec.thirtyDay}</p>
          </div>
          <div class="report-rec-cell rr-90day">
            <h4>${t("strategy90Day")}</h4>
            <p>${data.businessRec.ninetyDay}</p>
          </div>
        </div>
      </div>

      <div class="report-footer">${t("reportFooterText")}</div>
    `;

    el.reportPreview.classList.remove("hidden");
    el.reportCenterEmpty.classList.add("hidden");
  }

  function showReportNotice() {
    el.reportCenterNotice.textContent = t("reportCenterNoticeText");
    el.reportCenterNotice.classList.remove("hidden");
  }

  function hideReportNotice() {
    el.reportCenterNotice.classList.add("hidden");
    el.reportCenterNotice.textContent = "";
  }

  function generateReportClick() {
    const data = buildReportData();
    if (!data) {
      showReportNotice();
      return;
    }
    hideReportNotice();
    renderReportPreview(data);
  }

  function printReportClick() {
    const data = buildReportData();
    if (!data) {
      showReportNotice();
      return;
    }
    hideReportNotice();
    renderReportPreview(data);
    // Give the browser a tick to paint the freshly rendered report before invoking print.
    setTimeout(() => window.print(), 80);
  }

  /* -----------------------------------------------------
     18. LANGUAGE SWITCHING
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

    document.querySelectorAll("[data-i18n-title]").forEach((elNode) => {
      const key = elNode.getAttribute("data-i18n-title");
      const val = t(key);
      if (typeof val === "string") elNode.title = val;
    });

    document.querySelectorAll("[data-i18n-aria]").forEach((elNode) => {
      const key = elNode.getAttribute("data-i18n-aria");
      const val = t(key);
      if (typeof val === "string") elNode.setAttribute("aria-label", val);
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
    }

    if (!el.reportPreview.classList.contains("hidden")) {
      const data = buildReportData();
      if (data) renderReportPreview(data);
    }

    const history = loadHistory();
    renderHistoryList(history);
    drawTrendChart(history);
  }

  /* -----------------------------------------------------
     19. EVENT WIRING
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

  el.btnExportReport.addEventListener("click", exportCurrentReport);
  el.btnExportHistory.addEventListener("click", exportHistoryCSV);
  el.btnGenerateReport.addEventListener("click", generateReportClick);
  el.btnPrintReport.addEventListener("click", printReportClick);

  el.langBtnZh.addEventListener("click", () => setLanguage("zh"));
  el.langBtnEn.addEventListener("click", () => setLanguage("en"));

  /* -----------------------------------------------------
     20. INITIAL LOAD
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
