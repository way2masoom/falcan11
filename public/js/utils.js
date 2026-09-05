/* ======== INTERNATIONALIZATION (i18n) DICTIONARY ======== */
const languageLocaleMap = {
  en: 'en-US',
  'en-GB': 'en-GB',
  zh: 'zh-CN',
  ja: 'ja-JP',
  de: 'de-DE',
  es: 'es-ES',
  ar: 'ar-SA',
  fr: 'fr-FR',
  pt: 'pt-BR',
  tr: 'tr-TR',
  ru: 'ru-RU',
  it: 'it-IT'
};

const defaultCurrencyByLanguage = {
  en: 'USD',
  'en-GB': 'GBP',
  zh: 'CNY',
  ja: 'JPY',
  de: 'EUR',
  es: 'EUR',
  ar: 'USD',
  fr: 'EUR',
  pt: 'BRL',
  tr: 'TRY',
  ru: 'RUB',
  it: 'EUR'
};

const currencySymbols = {
  USD: '$',
  EUR: '€',
  GBP: '£',
  CNY: '¥',
  JPY: '¥',
  TRY: '₺',
  BRL: 'R$',
  RUB: '₽'
};

const translations = {
  // 1. English (US) - Default
  en: {
    docTitle: "LIVE Rewards — Exchange",
    liveRewards: "LIVE rewards",
    exchange: "Exchange",
    statement: "Statement",
    toolboxAndSettings: "Toolbox & Settings",
    walletSettings: "Wallet Settings",
    customerSupport: "Customer Support",
    back: "Back",
    cancel: "Cancel",
    save: "Save",
    saveAmount: "Save Amount",
    saveSettings: "Save Settings",
    done: "Done",
    complete: "Complete",
    goBack: "Go back",
    completed: "Completed",
    expired: "Expired",
    now: "now",
    sayHiScaled: "Say hi to Scaled LIVE Rewards",
    scaledDesc: "Your dedication to quality content could get you a rewards percentage of up to 53%.",
    learnMore: "Learn more",
    availableRewards: "Available rewards",
    upcomingRewards: "Upcoming rewards",
    withdraw: "Withdraw",
    dailyLimit: "Daily withdrawal limit (Remain/Total)",
    transactions: "Transactions",
    inLabel: "in:",
    coinsBalance: "TikTok Coins Balance",
    availBalanceToExchange: "Available balance to exchange the Coins",
    tiktokUsername: "TikTok username",
    handlePlaceholder: "your TikTok handle",
    searchingUser: "Searching @{user}...",
    creator: "Creator",
    followers: "followers",
    exchangeEarningsForCoins: "Exchange earnings for Coins",
    custom: "Custom",
    largeAmount: "Large amount",
    customAmountPlaceholder: "Enter a custom number or amount",
    policyText: "Coins obtained through this exchange are subject to our <strong class=\"font-bold text-black\" style=\"font-weight:700;color:#161823;\">Virtual Items Policy</strong>. Since you are accepting your Rewards in the form of Coins, this exchange is also subject to our <strong class=\"font-bold text-black\" style=\"font-weight:700;color:#161823;\">Rewards Policy</strong>. This exchange cannot be canceled or reversed.",
    bonusRoseTitle: "Bonus Roses & Coins on first recharge",
    bonusRoseDesc: "Get Rose x3 in your backpack – Rose x1 ready to be sent instantly, and the rest in 24 hours! Ends in 4 days",
    numberOfCoins: "Number of Coins",
    all: "All",
    total: "Total",
    completeExchangeTitle: "Complete exchange?",
    confirmDeductMsg: "<strong style=\"font-weight:700;color:#161823;\">{amount}</strong> will be deducted from LIVE rewards balance and sent to <strong style=\"font-weight:700;color:#161823;\">{user}</strong>",
    exchangeCompletedTitle: "Exchange Completed!",
    youExchangedFor: "You exchanged for",
    coinsUnit: "Coins",
    recipient: "Recipient",
    coinsExchanged: "Coins Exchanged",
    deductedAmount: "Deducted Amount",
    time: "Time",
    status: "Status",
    statusCompleted: "Completed",
    startGifterLevel: "Start gifter level",
    gifterLevelDesc: "Send your first Gift to begin your gifter journey and unlock more rewards as you level up.",
    sentToUser: "Sent to {user}",
    notifTitle: "TikTok LIVE Rewards",
    notifMsg: "Successfully sent coins to recipient",
    updateBalancePrompt: "Update your Available LIVE Rewards balance below:",
    availableAmountUsd: "Available Amount ({sym} {curr})",
    languageLabel: "Language",
    availableRewardsInput: "Available Rewards",
    upcomingRewardsInput: "Upcoming Rewards",
    currency: "Currency",
    loadingDuration: "Loading Duration",
    openAdminPanel: "Open Admin Panel (Customer Licenses)",
    txSentCoins: "Sent {coins} Coins to {user}",
    txLivePayout: "LIVE Payout",
    monthFormat: "{month} {year}",
    months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  },

  // 2. English (UK)
  "en-GB": {
    docTitle: "LIVE Rewards — Exchange",
    liveRewards: "LIVE rewards",
    exchange: "Exchange",
    statement: "Statement",
    toolboxAndSettings: "Toolbox & Settings",
    walletSettings: "Wallet Settings",
    customerSupport: "Customer Support",
    back: "Back",
    cancel: "Cancel",
    save: "Save",
    saveAmount: "Save Amount",
    saveSettings: "Save Settings",
    done: "Done",
    complete: "Complete",
    goBack: "Go back",
    completed: "Completed",
    expired: "Expired",
    now: "now",
    sayHiScaled: "Say hello to Scaled LIVE Rewards",
    scaledDesc: "Your dedication to quality content could get you a rewards percentage of up to 53%.",
    learnMore: "Learn more",
    availableRewards: "Available rewards",
    upcomingRewards: "Upcoming rewards",
    withdraw: "Withdraw",
    dailyLimit: "Daily withdrawal limit (Remain/Total)",
    transactions: "Transactions",
    inLabel: "in:",
    coinsBalance: "TikTok Coins Balance",
    availBalanceToExchange: "Available balance to exchange Coins",
    tiktokUsername: "TikTok username",
    handlePlaceholder: "your TikTok handle",
    searchingUser: "Searching @{user}...",
    creator: "Creator",
    followers: "followers",
    exchangeEarningsForCoins: "Exchange earnings for Coins",
    custom: "Custom",
    largeAmount: "Large amount",
    customAmountPlaceholder: "Enter a custom number or amount",
    policyText: "Coins obtained through this exchange are subject to our <strong class=\"font-bold text-black\" style=\"font-weight:700;color:#161823;\">Virtual Items Policy</strong>. Since you are accepting your Rewards in the form of Coins, this exchange is also subject to our <strong class=\"font-bold text-black\" style=\"font-weight:700;color:#161823;\">Rewards Policy</strong>. This exchange cannot be cancelled or reversed.",
    bonusRoseTitle: "Bonus Roses & Coins on first recharge",
    bonusRoseDesc: "Get Rose x3 in your backpack – Rose x1 ready to be sent instantly, and the rest in 24 hours! Ends in 4 days",
    numberOfCoins: "Number of Coins",
    all: "All",
    total: "Total",
    completeExchangeTitle: "Complete exchange?",
    confirmDeductMsg: "<strong style=\"font-weight:700;color:#161823;\">{amount}</strong> will be deducted from LIVE rewards balance and sent to <strong style=\"font-weight:700;color:#161823;\">{user}</strong>",
    exchangeCompletedTitle: "Exchange Completed!",
    youExchangedFor: "You exchanged for",
    coinsUnit: "Coins",
    recipient: "Recipient",
    coinsExchanged: "Coins Exchanged",
    deductedAmount: "Deducted Amount",
    time: "Time",
    status: "Status",
    statusCompleted: "Completed",
    startGifterLevel: "Start gifter level",
    gifterLevelDesc: "Send your first Gift to begin your gifter journey and unlock more rewards as you level up.",
    sentToUser: "Sent to {user}",
    notifTitle: "TikTok LIVE Rewards",
    notifMsg: "Successfully sent coins to recipient",
    updateBalancePrompt: "Update your Available LIVE Rewards balance below:",
    availableAmountUsd: "Available Amount ({sym} {curr})",
    languageLabel: "Language",
    availableRewardsInput: "Available Rewards",
    upcomingRewardsInput: "Upcoming Rewards",
    currency: "Currency",
    loadingDuration: "Loading Duration",
    openAdminPanel: "Open Admin Panel (Customer Licences)",
    txSentCoins: "Sent {coins} Coins to {user}",
    txLivePayout: "LIVE Payout",
    monthFormat: "{month} {year}",
    months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  },

  // 3. Chinese Simplified (中文)
  zh: {
    docTitle: "LIVE 收益 — 兑换",
    liveRewards: "LIVE 收益",
    exchange: "兑换",
    statement: "交易明细",
    toolboxAndSettings: "工具箱与设置",
    walletSettings: "钱包设置",
    customerSupport: "客户支持",
    back: "返回",
    cancel: "取消",
    save: "保存",
    saveAmount: "保存金额",
    saveSettings: "保存设置",
    done: "完成",
    complete: "完成",
    goBack: "返回",
    completed: "已完成",
    expired: "已过期",
    now: "刚刚",
    sayHiScaled: "欢迎使用阶梯式 LIVE 收益",
    scaledDesc: "凭借您对优质内容的投入，您最高可获得高达 53% 的收益比例。",
    learnMore: "了解详情",
    availableRewards: "可用收益",
    upcomingRewards: "待发放收益",
    withdraw: "提现",
    dailyLimit: "每日提现额度 (剩余/总额)",
    transactions: "交易记录",
    inLabel: "收入:",
    coinsBalance: "TikTok 金币余额",
    availBalanceToExchange: "可用于兑换金币的余额",
    tiktokUsername: "TikTok 用户名",
    handlePlaceholder: "输入您的 TikTok 账号",
    searchingUser: "正在搜索 @{user}...",
    creator: "创作者",
    followers: "粉丝",
    exchangeEarningsForCoins: "将收益兑换为金币",
    custom: "自定义",
    largeAmount: "大额兑换",
    customAmountPlaceholder: "输入自定义数量或金额",
    policyText: "通过本次兑换获取的金币须遵守我们的<strong class=\"font-bold text-black\" style=\"font-weight:700;color:#161823;\">《虚拟道具政策》</strong>。鉴于您以金币形式接收收益，本次兑换同样须遵守我们的<strong class=\"font-bold text-black\" style=\"font-weight:700;color:#161823;\">《收益政策》</strong>。本次兑换不可取消或撤回。",
    bonusRoseTitle: "首次充值赠送玫瑰与金币",
    bonusRoseDesc: "背包中获得玫瑰 x3 – 玫瑰 x1 可立即赠送，其余 24 小时内到账！4 天后结束",
    numberOfCoins: "金币数量",
    all: "全部",
    total: "总计",
    completeExchangeTitle: "确认完成兑换？",
    confirmDeductMsg: "将从 LIVE 收益余额中扣除 <strong style=\"font-weight:700;color:#161823;\">{amount}</strong> 并发送至 <strong style=\"font-weight:700;color:#161823;\">{user}</strong>",
    exchangeCompletedTitle: "兑换完成！",
    youExchangedFor: "您已成功兑换",
    coinsUnit: "金币",
    recipient: "收款人",
    coinsExchanged: "兑换金币",
    deductedAmount: "扣除金额",
    time: "时间",
    status: "状态",
    statusCompleted: "已完成",
    startGifterLevel: "开启送礼者等级",
    gifterLevelDesc: "送出您的第一个礼物开启送礼之旅，随着等级提升解锁更多特权福利。",
    sentToUser: "已发送至 {user}",
    notifTitle: "TikTok LIVE 收益",
    notifMsg: "金币已成功发送至收款人",
    updateBalancePrompt: "在下方更新您的可用 LIVE 收益余额：",
    availableAmountUsd: "可用金额 ({sym} {curr})",
    languageLabel: "语言 (Language)",
    availableRewardsInput: "可用收益",
    upcomingRewardsInput: "待发放收益",
    currency: "货币",
    loadingDuration: "加载动画时长",
    openAdminPanel: "打开管理面板 (客户授权)",
    txSentCoins: "向 {user} 发送了 {coins} 金币",
    txLivePayout: "LIVE 收益到账",
    monthFormat: "{year}年{month}",
    months: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"]
  },

  // 4. Japanese (日本語)
  ja: {
    docTitle: "LIVE リワード — 交換",
    liveRewards: "LIVE リワード",
    exchange: "交換",
    statement: "取引明細",
    toolboxAndSettings: "ツールボックスと設定",
    walletSettings: "ウォレット設定",
    customerSupport: "カスタマーサポート",
    back: "戻る",
    cancel: "キャンセル",
    save: "保存",
    saveAmount: "金額を保存",
    saveSettings: "設定を保存",
    done: "完了",
    complete: "完了",
    goBack: "戻る",
    completed: "完了",
    expired: "期限切れ",
    now: "今",
    sayHiScaled: "スケールされたLIVEリワードへようこそ",
    scaledDesc: "質の高いコンテンツへの取り組みにより、最大53%のリワード率を獲得できます。",
    learnMore: "詳細を見る",
    availableRewards: "利用可能なリワード",
    upcomingRewards: "今後のリワード",
    withdraw: "出金",
    dailyLimit: "1日の出金限度額 (残り/合計)",
    transactions: "取引履歴",
    inLabel: "収入:",
    coinsBalance: "TikTok コイン残高",
    availBalanceToExchange: "コインの交換に利用可能な残高",
    tiktokUsername: "TikTok ユーザー名",
    handlePlaceholder: "TikTokハンドル名を入力",
    searchingUser: "@{user} を検索中...",
    creator: "クリエイター",
    followers: "フォロワー",
    exchangeEarningsForCoins: "収益をコインに交換",
    custom: "カスタム",
    largeAmount: "高額交換",
    customAmountPlaceholder: "カスタム数量または金額を入力",
    policyText: "本交換で取得したコインには、当社の<strong class=\"font-bold text-black\" style=\"font-weight:700;color:#161823;\">バーチャルアイテムポリシー</strong>が適用されます。リワードをコインとして受け取るため、本交換には<strong class=\"font-bold text-black\" style=\"font-weight:700;color:#161823;\">リワードポリシー</strong>も適用されます。この交換はキャンセルまたは取り消しができません。",
    bonusRoseTitle: "初回チャージでボーナスローズ＆コイン",
    bonusRoseDesc: "バックパックにローズ×3を獲得 – ローズ×1は即時送信可能、残りは24時間以内に付与されます！あと4日で終了",
    numberOfCoins: "コイン数",
    all: "すべて",
    total: "合計",
    completeExchangeTitle: "交換を完了しますか？",
    confirmDeductMsg: "LIVEリワード残高から <strong style=\"font-weight:700;color:#161823;\">{amount}</strong> が差し引かれ、<strong style=\"font-weight:700;color:#161823;\">{user}</strong> に送信されます",
    exchangeCompletedTitle: "交換が完了しました！",
    youExchangedFor: "交換完了:",
    coinsUnit: "コイン",
    recipient: "受取人",
    coinsExchanged: "交換したコイン",
    deductedAmount: "差引金額",
    time: "日時",
    status: "ステータス",
    statusCompleted: "完了",
    startGifterLevel: "ギフターレベルを開始",
    gifterLevelDesc: "最初のギフトを送信してギフターの旅を始め、レベルアップするにつれてさらに多くの特典をアンロックしましょう。",
    sentToUser: "{user} に送信済み",
    notifTitle: "TikTok LIVE リワード",
    notifMsg: "受取人にコインを正常に送信しました",
    updateBalancePrompt: "以下の利用可能なLIVEリワード残高を更新してください：",
    availableAmountUsd: "利用可能残高 ({sym} {curr})",
    languageLabel: "言語 / Language",
    availableRewardsInput: "利用可能なリワード",
    upcomingRewardsInput: "今後のリワード",
    currency: "通貨",
    loadingDuration: "ローディング時間",
    openAdminPanel: "管理者パネルを開く（顧客ライセンス）",
    txSentCoins: "{user} に {coins} コインを送信しました",
    txLivePayout: "LIVE報酬受取",
    monthFormat: "{year}年{month}",
    months: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"]
  },

  // 5. German (Deutsch)
  de: {
    docTitle: "LIVE-Prämien — Umtausch",
    liveRewards: "LIVE-Prämien",
    exchange: "Eintauschen",
    statement: "Abrechnung",
    toolboxAndSettings: "Toolbox & Einstellungen",
    walletSettings: "Wallet-Einstellungen",
    customerSupport: "Kundensupport",
    back: "Zurück",
    cancel: "Abbrechen",
    save: "Speichern",
    saveAmount: "Betrag speichern",
    saveSettings: "Einstellungen speichern",
    done: "Fertig",
    complete: "Abschließen",
    goBack: "Zurück",
    completed: "Abgeschlossen",
    expired: "Abgelaufen",
    now: "jetzt",
    sayHiScaled: "Entdecke gestaffelte LIVE-Prämien",
    scaledDesc: "Dein Engagement für hochwertige Inhalte belohnt dich mit einem Prämienanteil von bis zu 53 %.",
    learnMore: "Mehr erfahren",
    availableRewards: "Verfügbare Prämien",
    upcomingRewards: "Ausstehende Prämien",
    withdraw: "Auszahlen",
    dailyLimit: "Tägliches Auszahlungslimit (Verbleibend/Gesamt)",
    transactions: "Transaktionen",
    inLabel: "Eingang:",
    coinsBalance: "TikTok-Münzguthaben",
    availBalanceToExchange: "Verfügbares Guthaben zum Eintauschen in Münzen",
    tiktokUsername: "TikTok-Benutzername",
    handlePlaceholder: "dein TikTok-Name",
    searchingUser: "Suche @{user}...",
    creator: "Creator",
    followers: "Follower",
    exchangeEarningsForCoins: "Einnahmen in Münzen eintauschen",
    custom: "Benutzerdefiniert",
    largeAmount: "Großer Betrag",
    customAmountPlaceholder: "Betrag oder Anzahl eingeben",
    policyText: "Die durch diesen Umtausch erworbenen Münzen unterliegen unserer <strong class=\"font-bold text-black\" style=\"font-weight:700;color:#161823;\">Richtlinie für virtuelle Gegenstände</strong>. Da du deine Prämien in Form von Münzen akzeptierst, gilt auch unsere <strong class=\"font-bold text-black\" style=\"font-weight:700;color:#161823;\">Prämienrichtlinie</strong>. Dieser Umtausch kann nicht storniert oder rückgängig gemacht werden.",
    bonusRoseTitle: "Bonus-Rosen & Münzen bei der 1. Aufladung",
    bonusRoseDesc: "Erhalte 3x Rosen im Rucksack – 1x Rose sofort versandbereit, die restlichen in 24 Stunden! Endet in 4 Tagen",
    numberOfCoins: "Anzahl der Münzen",
    all: "Alle",
    total: "Gesamt",
    completeExchangeTitle: "Umtausch abschließen?",
    confirmDeductMsg: "<strong style=\"font-weight:700;color:#161823;\">{amount}</strong> wird von deinem LIVE-Prämienguthaben abgezogen und an <strong style=\"font-weight:700;color:#161823;\">{user}</strong> gesendet",
    exchangeCompletedTitle: "Umtausch abgeschlossen!",
    youExchangedFor: "Eingetauscht gegen",
    coinsUnit: "Münzen",
    recipient: "Empfänger",
    coinsExchanged: "Eingetauschte Münzen",
    deductedAmount: "Abgezogener Betrag",
    time: "Zeitpunkt",
    status: "Status",
    statusCompleted: "Abgeschlossen",
    startGifterLevel: "Schenker-Level starten",
    gifterLevelDesc: "Sende dein erstes Geschenk, um dein Schenker-Level zu aktivieren und neue Belohnungen freizuschalten.",
    sentToUser: "Gesendet an {user}",
    notifTitle: "TikTok LIVE-Prämien",
    notifMsg: "Münzen erfolgreich an den Empfänger gesendet",
    updateBalancePrompt: "Aktualisiere dein verfügbares LIVE-Prämienguthaben unten:",
    availableAmountUsd: "Verfügbarer Betrag ({sym} {curr})",
    languageLabel: "Sprache / Language",
    availableRewardsInput: "Verfügbare Prämien",
    upcomingRewardsInput: "Ausstehende Prämien",
    currency: "Währung",
    loadingDuration: "Ladedauer",
    openAdminPanel: "Admin-Panel öffnen (Kundenlizenzen)",
    txSentCoins: "{coins} Münzen an {user} gesendet",
    txLivePayout: "LIVE-Auszahlung",
    monthFormat: "{month} {year}",
    months: ["Jan.", "Feb.", "März", "Apr.", "Mai", "Juni", "Juli", "Aug.", "Sept.", "Okt.", "Nov.", "Dez."]
  },

  // 6. Spanish (Español)
  es: {
    docTitle: "Recompensas LIVE — Canje",
    liveRewards: "Recompensas LIVE",
    exchange: "Canjear",
    statement: "Movimientos",
    toolboxAndSettings: "Caja de herramientas y ajustes",
    walletSettings: "Ajustes de billetera",
    customerSupport: "Atención al cliente",
    back: "Atrás",
    cancel: "Cancelar",
    save: "Guardar",
    saveAmount: "Guardar importe",
    saveSettings: "Guardar ajustes",
    done: "Listo",
    complete: "Completar",
    goBack: "Volver",
    completed: "Completado",
    expired: "Caducado",
    now: "ahora",
    sayHiScaled: "Descubre las Recompensas LIVE escalonadas",
    scaledDesc: "Tu dedicación al contenido de calidad puede otorgarte un porcentaje de recompensas de hasta el 53 %.",
    learnMore: "Más información",
    availableRewards: "Recompensas disponibles",
    upcomingRewards: "Próximas recompensas",
    withdraw: "Retirar",
    dailyLimit: "Límite diario de retiro (Restante/Total)",
    transactions: "Transacciones",
    inLabel: "ingresos:",
    coinsBalance: "Saldo de Monedas de TikTok",
    availBalanceToExchange: "Saldo disponible para canjear por Monedas",
    tiktokUsername: "Nombre de usuario de TikTok",
    handlePlaceholder: "tu usuario de TikTok",
    searchingUser: "Buscando a @{user}...",
    creator: "Creador",
    followers: "seguidores",
    exchangeEarningsForCoins: "Canjear ganancias por Monedas",
    custom: "Personalizado",
    largeAmount: "Monto grande",
    customAmountPlaceholder: "Introduce un número o monto",
    policyText: "Las Monedas obtenidas en este canje están sujetas a nuestra <strong class=\"font-bold text-black\" style=\"font-weight:700;color:#161823;\">Política de Objetos Virtuales</strong>. Al aceptar Recompensas en forma de Monedas, este canje también se rige por nuestra <strong class=\"font-bold text-black\" style=\"font-weight:700;color:#161823;\">Política de Recompensas</strong>. Este canje no se puede cancelar ni revertir.",
    bonusRoseTitle: "Rosas y Monedas de bonificación en tu 1.ª recarga",
    bonusRoseDesc: "Consigue 3 rosas en tu mochila: 1 rosa lista para enviar y las demás en 24 h. Termina en 4 días",
    numberOfCoins: "Número de Monedas",
    all: "Todo",
    total: "Total",
    completeExchangeTitle: "¿Completar el canje?",
    confirmDeductMsg: "Se deducirán <strong style=\"font-weight:700;color:#161823;\">{amount}</strong> de tu saldo de recompensas LIVE y se enviarán a <strong style=\"font-weight:700;color:#161823;\">{user}</strong>",
    exchangeCompletedTitle: "¡Canje completado!",
    youExchangedFor: "Has canjeado por",
    coinsUnit: "Monedas",
    recipient: "Destinatario",
    coinsExchanged: "Monedas canjeadas",
    deductedAmount: "Importe deducido",
    time: "Fecha y hora",
    status: "Estado",
    statusCompleted: "Completado",
    startGifterLevel: "Inicia tu nivel de regalador",
    gifterLevelDesc: "Envía tu primer regalo para iniciar tu aventura de regalador y desbloquear ventajas exclusivas.",
    sentToUser: "Enviado a {user}",
    notifTitle: "Recompensas LIVE de TikTok",
    notifMsg: "Monedas enviadas correctamente al destinatario",
    updateBalancePrompt: "Actualiza tu saldo disponible de recompensas LIVE a continuación:",
    availableAmountUsd: "Saldo disponible ({sym} {curr})",
    languageLabel: "Idioma / Language",
    availableRewardsInput: "Recompensas disponibles",
    upcomingRewardsInput: "Próximas recompensas",
    currency: "Moneda",
    loadingDuration: "Duración de carga",
    openAdminPanel: "Abrir panel de administración (Licencias)",
    txSentCoins: "Enviaste {coins} monedas a {user}",
    txLivePayout: "Pago de LIVE",
    monthFormat: "{month} de {year}",
    months: ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"]
  },

  // 7. Arabic (العربية - RTL)
  ar: {
    docTitle: "مكافآت LIVE — استبدال",
    liveRewards: "مكافآت LIVE",
    exchange: "استبدال",
    statement: "كشف الحساب",
    toolboxAndSettings: "الأدوات والإعدادات",
    walletSettings: "إعدادات المحفظة",
    customerSupport: "دعم العملاء",
    back: "رجوع",
    cancel: "إلغاء",
    save: "حفظ",
    saveAmount: "حفظ المبلغ",
    saveSettings: "حفظ الإعدادات",
    done: "تم",
    complete: "إتمام",
    goBack: "رجوع",
    completed: "مكتمل",
    expired: "منتهي الصلاحية",
    now: "الآن",
    sayHiScaled: "مرحباً بك في مكافآت LIVE المتدرجة",
    scaledDesc: "قد يمنحك تفانيك في تقديم محتوى عالي الجودة نسبة مكافآت تصل إلى 53%.",
    learnMore: "معرفة المزيد",
    availableRewards: "المكافآت المتاحة",
    upcomingRewards: "المكافآت القادمة",
    withdraw: "سحب",
    dailyLimit: "حد السحب اليومي (المتبقي/الإجمالي)",
    transactions: "المعاملات",
    inLabel: "وارد:",
    coinsBalance: "رصيد عملات TikTok",
    availBalanceToExchange: "الرصيد المتاح لاستبدال العملات",
    tiktokUsername: "اسم مستخدم TikTok",
    handlePlaceholder: "اسم حساب TikTok الخاص بك",
    searchingUser: "جارٍ البحث عن @{user}...",
    creator: "منشئ محتوى",
    followers: "متابع",
    exchangeEarningsForCoins: "استبدال الأرباح بعملات",
    custom: "مخصص",
    largeAmount: "مبلغ كبير",
    customAmountPlaceholder: "أدخل كمية مخصصة أو مبلغاً",
    policyText: "تخضع العملات المكتسبة من خلال هذا الاستبدال إلى <strong class=\"font-bold text-black\" style=\"font-weight:700;color:#161823;\">سياسة العناصر الافتراضية</strong> الخاصة بنا. ونظراً لأنك تقبل مكافآتك على شكل عملات، فإن هذا الاستبدال يخضع أيضاً إلى <strong class=\"font-bold text-black\" style=\"font-weight:700;color:#161823;\">سياسة المكافآت</strong>. لا يمكن إلغاء هذا الاستبدال أو التراجع عنه.",
    bonusRoseTitle: "ورود وعملات إضافية عند أول شحن",
    bonusRoseDesc: "احصل على 3 ورود في حقيبتك – وردة 1 جاهزة للإرسال فوراً والباقي خلال 24 ساعة! ينتهي خلال 4 أيام",
    numberOfCoins: "عدد العملات",
    all: "الكل",
    total: "الإجمالي",
    completeExchangeTitle: "هل تريد إتمام الاستبدال؟",
    confirmDeductMsg: "سيتم خصم <strong style=\"font-weight:700;color:#161823;\">{amount}</strong> من رصيد مكافآت LIVE وإرسالها إلى <strong style=\"font-weight:700;color:#161823;\">{user}</strong>",
    exchangeCompletedTitle: "اكتمل الاستبدال!",
    youExchangedFor: "لقد استبدلت مقابل",
    coinsUnit: "عملة",
    recipient: "المستلم",
    coinsExchanged: "العملات المستبدلة",
    deductedAmount: "المبلغ المخصوم",
    time: "الوقت",
    status: "الحالة",
    statusCompleted: "مكتمل",
    startGifterLevel: "ابدأ مستوى المانح",
    gifterLevelDesc: "أرسل هديتك الأولى لتبدأ رحلتك كمانح وتفتح المزيد من المكافآت مع تقدم مستواك.",
    sentToUser: "تم الإرسال إلى {user}",
    notifTitle: "مكافآت TikTok LIVE",
    notifMsg: "تم إرسال العملات بنجاح إلى المستلم",
    updateBalancePrompt: "قم بتحديث رصيد مكافآت LIVE المتاح أدناه:",
    availableAmountUsd: "المبلغ المتاح ({sym} {curr})",
    languageLabel: "اللغة / Language",
    availableRewardsInput: "المكافآت المتاحة",
    upcomingRewardsInput: "المكافآت القادمة",
    currency: "العملة",
    loadingDuration: "مدة التحميل",
    openAdminPanel: "فتح لوحة الإدارة (تراخيص العملاء)",
    txSentCoins: "تم إرسال {coins} عملة إلى {user}",
    txLivePayout: "دفعة LIVE",
    monthFormat: "{month} {year}",
    months: ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"]
  },

  // 8. French (Français)
  fr: {
    docTitle: "Récompenses LIVE — Échange",
    liveRewards: "Récompenses LIVE",
    exchange: "Échanger",
    statement: "Relevé",
    toolboxAndSettings: "Outils et paramètres",
    walletSettings: "Paramètres du portefeuille",
    customerSupport: "Support client",
    back: "Retour",
    cancel: "Annuler",
    save: "Enregistrer",
    saveAmount: "Enregistrer le montant",
    saveSettings: "Enregistrer les paramètres",
    done: "Terminé",
    complete: "Confirmer",
    goBack: "Retour",
    completed: "Terminé",
    expired: "Expiré",
    now: "maintenant",
    sayHiScaled: "Découvre les récompenses LIVE progressives",
    scaledDesc: "Ton investissement dans du contenu de qualité peut te rapporter jusqu'à 53 % de pourcentage de récompenses.",
    learnMore: "En savoir plus",
    availableRewards: "Récompenses disponibles",
    upcomingRewards: "Récompenses à venir",
    withdraw: "Retirer",
    dailyLimit: "Limite quotidienne de retrait (Restant/Total)",
    transactions: "Transactions",
    inLabel: "entrées :",
    coinsBalance: "Solde de pièces TikTok",
    availBalanceToExchange: "Solde disponible pour échanger contre des pièces",
    tiktokUsername: "Nom d'utilisateur TikTok",
    handlePlaceholder: "ton nom d'utilisateur TikTok",
    searchingUser: "Recherche de @{user}...",
    creator: "Créateur",
    followers: "abonnés",
    exchangeEarningsForCoins: "Échanger les gains contre des pièces",
    custom: "Personnalisé",
    largeAmount: "Montant élevé",
    customAmountPlaceholder: "Saisir un nombre ou montant",
    policyText: "Les pièces obtenues par cet échange sont soumises à notre <strong class=\"font-bold text-black\" style=\"font-weight:700;color:#161823;\">Politique relative aux objets virtuels</strong>. Comme vous recevez vos récompenses en pièces, cet échange est aussi soumis à notre <strong class=\"font-bold text-black\" style=\"font-weight:700;color:#161823;\">Politique des récompenses</strong>. Cet échange ne peut être annulé.",
    bonusRoseTitle: "Roses et pièces bonus lors de la 1ère recharge",
    bonusRoseDesc: "Obtiens 3 roses dans ton sac à dos – 1 rose prête à envoyer et les autres sous 24 h ! Se termine dans 4 jours",
    numberOfCoins: "Nombre de pièces",
    all: "Tout",
    total: "Total",
    completeExchangeTitle: "Finaliser l'échange ?",
    confirmDeductMsg: "<strong style=\"font-weight:700;color:#161823;\">{amount}</strong> seront déduits de votre solde LIVE et envoyés à <strong style=\"font-weight:700;color:#161823;\">{user}</strong>",
    exchangeCompletedTitle: "Échange terminé !",
    youExchangedFor: "Vous avez échangé contre",
    coinsUnit: "Pièces",
    recipient: "Destinataire",
    coinsExchanged: "Pièces échangées",
    deductedAmount: "Montant déduit",
    time: "Date et heure",
    status: "Statut",
    statusCompleted: "Terminé",
    startGifterLevel: "Commencer le niveau de donateur",
    gifterLevelDesc: "Envoie ton premier cadeau pour commencer ton parcours de donateur et débloquer plus d'avantages.",
    sentToUser: "Envoyé à {user}",
    notifTitle: "Récompenses TikTok LIVE",
    notifMsg: "Pièces envoyées avec succès au destinataire",
    updateBalancePrompt: "Mettez à jour votre solde de récompenses LIVE ci-dessous :",
    availableAmountUsd: "Montant disponible ({sym} {curr})",
    languageLabel: "Langue / Language",
    availableRewardsInput: "Récompenses disponibles",
    upcomingRewardsInput: "Récompenses à venir",
    currency: "Devise",
    loadingDuration: "Durée de chargement",
    openAdminPanel: "Ouvrir le panneau d'administration",
    txSentCoins: "{coins} pièces envoyées à {user}",
    txLivePayout: "Paiement LIVE",
    monthFormat: "{month} {year}",
    months: ["janv.", "févr.", "mars", "avr.", "mai", "juin", "juil.", "août", "sept.", "oct.", "nov.", "déc."]
  },

  // 9. Portuguese (Português)
  pt: {
    docTitle: "Recompensas LIVE — Troca",
    liveRewards: "Recompensas LIVE",
    exchange: "Trocar",
    statement: "Extrato",
    toolboxAndSettings: "Ferramentas e configurações",
    walletSettings: "Configurações da carteira",
    customerSupport: "Suporte ao cliente",
    back: "Voltar",
    cancel: "Cancelar",
    save: "Salvar",
    saveAmount: "Salvar valor",
    saveSettings: "Salvar configurações",
    done: "Concluído",
    complete: "Concluir",
    goBack: "Voltar",
    completed: "Concluído",
    expired: "Expirado",
    now: "agora",
    sayHiScaled: "Conheça as Recompensas LIVE escalonadas",
    scaledDesc: "Sua dedicação a conteúdos de qualidade pode render até 53% de porcentagem de recompensas.",
    learnMore: "Saiba mais",
    availableRewards: "Recompensas disponíveis",
    upcomingRewards: "Próximas recompensas",
    withdraw: "Sacar",
    dailyLimit: "Limite diário de saque (Restante/Total)",
    transactions: "Transações",
    inLabel: "entradas:",
    coinsBalance: "Saldo de Moedas do TikTok",
    availBalanceToExchange: "Saldo disponível para trocar por Moedas",
    tiktokUsername: "Nome de usuário do TikTok",
    handlePlaceholder: "seu nome de usuário do TikTok",
    searchingUser: "Buscando @{user}...",
    creator: "Criador",
    followers: "seguidores",
    exchangeEarningsForCoins: "Trocar ganhos por Moedas",
    custom: "Personalizado",
    largeAmount: "Valor alto",
    customAmountPlaceholder: "Insira uma quantidade ou valor",
    policyText: "As Moedas obtidas por esta troca estão sujeitas à nossa <strong class=\"font-bold text-black\" style=\"font-weight:700;color:#161823;\">Política de Itens Virtuais</strong>. Como você está aceitando Recompensas em Moedas, esta troca também está sujeita à nossa <strong class=\"font-bold text-black\" style=\"font-weight:700;color:#161823;\">Política de Recompensas</strong>. Esta troca não pode ser cancelada.",
    bonusRoseTitle: "Rosas e moedas bônus na 1ª recarga",
    bonusRoseDesc: "Ganhe 3 rosas na mochila – 1 rosa pronta para envio e o resto em 24h! Termina em 4 dias",
    numberOfCoins: "Número de Moedas",
    all: "Tudo",
    total: "Total",
    completeExchangeTitle: "Concluir troca?",
    confirmDeductMsg: "<strong style=\"font-weight:700;color:#161823;\">{amount}</strong> serão deduzidos do saldo de recompensas LIVE e enviados para <strong style=\"font-weight:700;color:#161823;\">{user}</strong>",
    exchangeCompletedTitle: "Troca concluída!",
    youExchangedFor: "Você trocou por",
    coinsUnit: "Moedas",
    recipient: "Destinatário",
    coinsExchanged: "Moedas trocadas",
    deductedAmount: "Valor deduzido",
    time: "Horário",
    status: "Status",
    statusCompleted: "Concluído",
    startGifterLevel: "Inicie seu nível de doador",
    gifterLevelDesc: "Envie seu primeiro presente para iniciar sua jornada de doador e desbloquear recompensas exclusivas.",
    sentToUser: "Enviado para {user}",
    notifTitle: "Recompensas TikTok LIVE",
    notifMsg: "Moedas enviadas com sucesso ao destinatário",
    updateBalancePrompt: "Atualize seu saldo de recompensas LIVE abaixo:",
    availableAmountUsd: "Valor disponível ({sym} {curr})",
    languageLabel: "Idioma / Language",
    availableRewardsInput: "Recompensas disponíveis",
    upcomingRewardsInput: "Próximas recompensas",
    currency: "Moeda",
    loadingDuration: "Duração de carregamento",
    openAdminPanel: "Abrir painel administrativo (Licenças)",
    txSentCoins: "Enviou {coins} moedas para {user}",
    txLivePayout: "Pagamento de LIVE",
    monthFormat: "{month} de {year}",
    months: ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"]
  },

  // 10. Turkish (Türkçe)
  tr: {
    docTitle: "LIVE Ödülleri — Takas",
    liveRewards: "LIVE ödülleri",
    exchange: "Takas et",
    statement: "Hesap Özeti",
    toolboxAndSettings: "Araçlar ve Ayarlar",
    walletSettings: "Cüzdan Ayarları",
    customerSupport: "Müşteri Desteği",
    back: "Geri",
    cancel: "İptal",
    save: "Kaydet",
    saveAmount: "Tutarı Kaydet",
    saveSettings: "Ayarları Kaydet",
    done: "Bitti",
    complete: "Tamamla",
    goBack: "Geri dön",
    completed: "Tamamlandı",
    expired: "Süresi doldu",
    now: "şimdi",
    sayHiScaled: "Kademeli LIVE Ödülleri ile tanışın",
    scaledDesc: "Kaliteli içerik üretmeye olan bağlılığınız size %53'e varan ödül oranı kazandırabilir.",
    learnMore: "Daha fazla bilgi",
    availableRewards: "Kullanılabilir ödüller",
    upcomingRewards: "Gelecek ödüller",
    withdraw: "Çek",
    dailyLimit: "Günlük çekim limiti (Kalan/Toplam)",
    transactions: "İşlemler",
    inLabel: "giriş:",
    coinsBalance: "TikTok Jeton Bakiyesi",
    availBalanceToExchange: "Jeton takası için kullanılabilir bakiye",
    tiktokUsername: "TikTok kullanıcı adı",
    handlePlaceholder: "TikTok kullanıcı adınız",
    searchingUser: "@{user} aranıyor...",
    creator: "İçerik Üreticisi",
    followers: "takipçi",
    exchangeEarningsForCoins: "Kazançları Jetona dönüştür",
    custom: "Özel",
    largeAmount: "Yüksek miktar",
    customAmountPlaceholder: "Özel bir miktar veya tutar girin",
    policyText: "Bu takas yoluyla elde edilen Jetonlar <strong class=\"font-bold text-black\" style=\"font-weight:700;color:#161823;\">Sanal Ürünler Politikamıza</strong> tabidir. Ödüllerinizi Jeton olarak kabul ettiğiniz için bu takas <strong class=\"font-bold text-black\" style=\"font-weight:700;color:#161823;\">Ödül Politikamıza</strong> da tabidir. Bu takas iptal edilemez.",
    bonusRoseTitle: "İlk yüklemede Bonus Güller ve Jetonlar",
    bonusRoseDesc: "Çantanda 3x Gül kazan – 1x Gül hemen gönderilmeye hazır, geri kalanı 24 saat içinde! 4 gün sonra bitiyor",
    numberOfCoins: "Jeton Sayısı",
    all: "Tümü",
    total: "Toplam",
    completeExchangeTitle: "Takas tamamlansın mı?",
    confirmDeductMsg: "LIVE ödülleri bakiyenizden <strong style=\"font-weight:700;color:#161823;\">{amount}</strong> düşülecek ve <strong style=\"font-weight:700;color:#161823;\">{user}</strong> hesabına gönderilecek",
    exchangeCompletedTitle: "Takas Tamamlandı!",
    youExchangedFor: "Takas edilen miktar:",
    coinsUnit: "Jeton",
    recipient: "Alıcı",
    coinsExchanged: "Takas Edilen Jetonlar",
    deductedAmount: "Düşülen Tutar",
    time: "Zaman",
    status: "Durum",
    statusCompleted: "Tamamlandı",
    startGifterLevel: "Hediye seviyenizi başlatın",
    gifterLevelDesc: "Hediyeleşme yolculuğunuza başlamak ve seviye atladıkça daha fazla ödülün kilidini açmak için ilk Hediyenizi gönderin.",
    sentToUser: "{user} kullanıcısına gönderildi",
    notifTitle: "TikTok LIVE Ödülleri",
    notifMsg: "Jetonlar alıcıya başarıyla gönderildi",
    updateBalancePrompt: "Kullanılabilir LIVE Ödülleri bakiyenizi aşağıdan güncelleyin:",
    availableAmountUsd: "Kullanılabilir Tutar ({sym} {curr})",
    languageLabel: "Dil / Language",
    availableRewardsInput: "Kullanılabilir Ödüller",
    upcomingRewardsInput: "Gelecek Ödüller",
    currency: "Para Birimi",
    loadingDuration: "Yükleme Süresi",
    openAdminPanel: "Yönetici Panelini Aç (Müşteri Lisansları)",
    txSentCoins: "{user} kullanıcısına {coins} jeton gönderildi",
    txLivePayout: "LIVE Ödemesi",
    monthFormat: "{month} {year}",
    months: ["Oca", "Şub", "Mar", "Nis", "May", "Haz", "Tem", "Ağu", "Eyl", "Eki", "Kas", "Ara"]
  },

  // 11. Russian (Русский)
  ru: {
    docTitle: "LIVE-награды — Обмен",
    liveRewards: "LIVE-награды",
    exchange: "Обменять",
    statement: "Выписка",
    toolboxAndSettings: "Инструменты и настройки",
    walletSettings: "Настройки кошелька",
    customerSupport: "Поддержка клиентов",
    back: "Назад",
    cancel: "Отмена",
    save: "Сохранить",
    saveAmount: "Сохранить сумму",
    saveSettings: "Сохранить настройки",
    done: "Готово",
    complete: "Завершить",
    goBack: "Назад",
    completed: "Выполнено",
    expired: "Истекло",
    now: "сейчас",
    sayHiScaled: "Встречайте обновленные LIVE-награды",
    scaledDesc: "Благодаря созданию качественного контента вы можете получать до 53 % от суммы вознаграждений.",
    learnMore: "Подробнее",
    availableRewards: "Доступные награды",
    upcomingRewards: "Предстоящие награды",
    withdraw: "Вывести",
    dailyLimit: "Дневной лимит вывода (Остаток/Всего)",
    transactions: "Транзакции",
    inLabel: "приход:",
    coinsBalance: "Баланс монет TikTok",
    availBalanceToExchange: "Доступный баланс для обмена на монеты",
    tiktokUsername: "Имя пользователя TikTok",
    handlePlaceholder: "ваш логин в TikTok",
    searchingUser: "Поиск @{user}...",
    creator: "Автор",
    followers: "подписчиков",
    exchangeEarningsForCoins: "Обменять доход на монеты",
    custom: "Другое",
    largeAmount: "Крупная сумма",
    customAmountPlaceholder: "Введите количество или сумму",
    policyText: "Монеты, полученные в результате обмена, регулируются нашей <strong class=\"font-bold text-black\" style=\"font-weight:700;color:#161823;\">Политикой в отношении виртуальных предметов</strong>. Принимая награды в виде монет, вы также соглашаетесь с <strong class=\"font-bold text-black\" style=\"font-weight:700;color:#161823;\">Политикой вознаграждений</strong>. Данный обмен нельзя отменить.",
    bonusRoseTitle: "Бонусные розы и монеты при 1-м пополнении",
    bonusRoseDesc: "Получите 3 розы в рюкзак – 1 розу можно отправить сразу, остальные в течение 24 ч.! Закончится через 4 дня",
    numberOfCoins: "Количество монет",
    all: "Все",
    total: "Итого",
    completeExchangeTitle: "Завершить обмен?",
    confirmDeductMsg: "<strong style=\"font-weight:700;color:#161823;\">{amount}</strong> будут списаны с баланса LIVE-наград и отправлены пользователю <strong style=\"font-weight:700;color:#161823;\">{user}</strong>",
    exchangeCompletedTitle: "Обмен выполнен!",
    youExchangedFor: "Вы обменяли на",
    coinsUnit: "монет",
    recipient: "Получатель",
    coinsExchanged: "Обменяно монет",
    deductedAmount: "Списанная сумма",
    time: "Время",
    status: "Статус",
    statusCompleted: "Выполнено",
    startGifterLevel: "Активируйте уровень дарителя",
    gifterLevelDesc: "Отправьте свой первый подарок, чтобы начать путь дарителя и открывать новые привилегии.",
    sentToUser: "Отправлено {user}",
    notifTitle: "Награды TikTok LIVE",
    notifMsg: "Монеты успешно отправлены получателю",
    updateBalancePrompt: "Обновите доступный баланс LIVE-наград ниже:",
    availableAmountUsd: "Доступная сумма ({sym} {curr})",
    languageLabel: "Язык / Language",
    availableRewardsInput: "Доступные награды",
    upcomingRewardsInput: "Предстоящие награды",
    currency: "Валюта",
    loadingDuration: "Длительность загрузки",
    openAdminPanel: "Открыть панель администратора",
    txSentCoins: "Отправлено {coins} монет пользователю {user}",
    txLivePayout: "Выплата LIVE",
    monthFormat: "{month} {year}",
    months: ["янв.", "февр.", "март", "апр.", "май", "июнь", "июль", "авг.", "сент.", "окт.", "нояб.", "дек."]
  },

  // 12. Italian (Italiano)
  it: {
    docTitle: "Ricompense LIVE — Conversione",
    liveRewards: "Ricompense LIVE",
    exchange: "Converti",
    statement: "Estratto conto",
    toolboxAndSettings: "Strumenti e impostazioni",
    walletSettings: "Impostazioni portafoglio",
    customerSupport: "Assistenza clienti",
    back: "Indietro",
    cancel: "Annulla",
    save: "Salva",
    saveAmount: "Salva importo",
    saveSettings: "Salva impostazioni",
    done: "Fatto",
    complete: "Completa",
    goBack: "Indietro",
    completed: "Completato",
    expired: "Scaduto",
    now: "adesso",
    sayHiScaled: "Scopri le Ricompense LIVE a scaglioni",
    scaledDesc: "Il tuo impegno nei contenuti di qualità può farti ottenere una percentuale di ricompense fino al 53%.",
    learnMore: "Scopri di più",
    availableRewards: "Ricompense disponibili",
    upcomingRewards: "Prossime ricompense",
    withdraw: "Preleva",
    dailyLimit: "Limite di prelievo giornaliero (Rimanente/Totale)",
    transactions: "Transazioni",
    inLabel: "entrate:",
    coinsBalance: "Saldo monete TikTok",
    availBalanceToExchange: "Saldo disponibile per la conversione in monete",
    tiktokUsername: "Nome utente TikTok",
    handlePlaceholder: "il tuo nome utente TikTok",
    searchingUser: "Ricerca di @{user}...",
    creator: "Creator",
    followers: "follower",
    exchangeEarningsForCoins: "Converti guadagni in monete",
    custom: "Personalizzato",
    largeAmount: "Importo elevato",
    customAmountPlaceholder: "Inserisci un numero o importo",
    policyText: "Le monete ottenute tramite questa conversione sono soggette alla nostra <strong class=\"font-bold text-black\" style=\"font-weight:700;color:#161823;\">Politica sugli oggetti virtuali</strong>. Poiché accetti le ricompense sotto forma di monete, si applica anche la nostra <strong class=\"font-bold text-black\" style=\"font-weight:700;color:#161823;\">Politica sulle ricompense</strong>. Questa operazione non può essere annullata.",
    bonusRoseTitle: "Rose e monete bonus alla 1ª ricarica",
    bonusRoseDesc: "Ottieni 3 rose nello zaino: 1 rosa pronta da inviare e le altre in 24 ore! Termina tra 4 giorni",
    numberOfCoins: "Numero di monete",
    all: "Tutto",
    total: "Totale",
    completeExchangeTitle: "Completare la conversione?",
    confirmDeductMsg: "<strong style=\"font-weight:700;color:#161823;\">{amount}</strong> verranno detratti dal saldo ricompense LIVE e inviati a <strong style=\"font-weight:700;color:#161823;\">{user}</strong>",
    exchangeCompletedTitle: "Conversione completata!",
    youExchangedFor: "Hai convertito per",
    coinsUnit: "Monete",
    recipient: "Destinatario",
    coinsExchanged: "Monete convertite",
    deductedAmount: "Importo detratto",
    time: "Data e ora",
    status: "Stato",
    statusCompleted: "Completato",
    startGifterLevel: "Inizia il livello donatore",
    gifterLevelDesc: "Invia il tuo primo regalo per iniziare il tuo percorso da donatore e sbloccare ulteriori vantaggi.",
    sentToUser: "Inviato a {user}",
    notifTitle: "Ricompense TikTok LIVE",
    notifMsg: "Monete inviate con successo al destinatario",
    updateBalancePrompt: "Aggiorna il tuo saldo di ricompense LIVE disponibile qui sotto:",
    availableAmountUsd: "Importo disponibile ({sym} {curr})",
    languageLabel: "Lingua / Language",
    availableRewardsInput: "Ricompense disponibili",
    upcomingRewardsInput: "Prossime ricompense",
    currency: "Valuta",
    loadingDuration: "Durata caricamento",
    openAdminPanel: "Apri pannello admin (Licenze clienti)",
    txSentCoins: "Inviate {coins} monete a {user}",
    txLivePayout: "Pagamento LIVE",
    monthFormat: "{month} {year}",
    months: ["gen", "feb", "mar", "apr", "mag", "giu", "lug", "ago", "set", "ott", "nov", "dic"]
  }
};

/* ======== SHARED STATE ======== */
const state = {
  user: null,
  transferProfile: null,
  transactions: [
    { name: 'Sent 250 Coins to @user', nameKey: 'txSentCoins', coins: 250, recipient: '@user', amount: '-$3.03', date: '6/9/2026 06:22:20', type: 'out' },
    { name: 'LIVE Payout', nameKey: 'txLivePayout', amount: '+$1,276,819.98', date: '6/1/2026 12:00:00', type: 'in', isPositive: true }
  ],
  m2Transactions: [
    { coins: 250, username: 'user', date: '6/9/2026 06:22:20', deducted: '$3.03' }
  ],
  totals: { in: 1276819.98, out: 3.03 },
  balance: 8573020.22,
  upcomingRewards: 167290.62,
  serviceFee: 30,
  m2Profile: null,
  m2Coins: 0
};

/* ======== SETTINGS (saved to localStorage) ======== */
const defaultSettings = {
  language: 'en', // default language is English (US)
  availableRewards: 8573020.22,
  upcomingRewards: 167290.62,
  currency: 'USD',
  autoRemoveAt: true,
  withdrawalName: 'Transfer details',
  transferDetailsTitle: 'Transfer details',
  transferLabel: 'LIVE rewards transfer to TikTok',
  followerSize: 2,
  paymentLoadingEnabled: true,
  paymentAnimationType: 'dots',
  paymentAnimationDuration: 1.5,
  searchLoadingEnabled: true,
  searchAnimationType: 'classic',
  searchAnimationDuration: 0.8,
  m2CompleteStyle: 'green'
};

function loadSettings() {
  try {
    const saved = JSON.parse(localStorage.getItem('walletSettings'));
    const savedLang = localStorage.getItem('walletLanguage');
    const merged = saved ? Object.assign({}, defaultSettings, saved) : Object.assign({}, defaultSettings);
    if (savedLang) {
      merged.language = savedLang;
    }
    return merged;
  } catch(e) {
    return Object.assign({}, defaultSettings);
  }
}

function saveSettings(s) {
  localStorage.setItem('walletSettings', JSON.stringify(s));
  if (s.language) localStorage.setItem('walletLanguage', s.language);
}

let settings = loadSettings();

/* ======== i18n TRANSLATION HELPERS ======== */
function getLanguage() {
  const lang = settings.language;
  return translations[lang] ? lang : 'en';
}

function t(key, params = {}) {
  const lang = getLanguage();
  const dict = translations[lang] || translations.en;
  let str = dict[key] || translations.en[key] || key;
  if (typeof str === 'string') {
    Object.keys(params).forEach(p => {
      str = str.replace(new RegExp(`\\{${p}\\}`, 'g'), params[p]);
    });
  }
  return str;
}

function applyTranslations() {
  const lang = getLanguage();
  document.documentElement.lang = lang;
  document.title = t('docTitle');

  // Handle RTL for Arabic
  if (lang === 'ar') {
    document.documentElement.setAttribute('dir', 'rtl');
  } else {
    document.documentElement.removeAttribute('dir');
  }

  const curr = getCurrencyPrefix();
  const symbol = getCurrencySymbol();

  // Update text elements with data-i18n
  document.querySelectorAll('[data-i18n]').forEach(node => {
    const key = node.getAttribute('data-i18n');
    if (key) {
      node.textContent = t(key, { curr, sym: symbol });
    }
  });

  // Update HTML elements with data-i18n-html
  document.querySelectorAll('[data-i18n-html]').forEach(node => {
    const key = node.getAttribute('data-i18n-html');
    if (key) {
      node.innerHTML = t(key, { curr, sym: symbol });
    }
  });

  // Update input placeholders with data-i18n-placeholder
  document.querySelectorAll('[data-i18n-placeholder]').forEach(node => {
    const key = node.getAttribute('data-i18n-placeholder');
    if (key) {
      node.placeholder = t(key);
    }
  });

  // Update language select dropdowns to match active language
  document.querySelectorAll('.lang-select').forEach(sel => {
    sel.value = lang;
  });
}

function setLanguage(lang) {
  const targetLang = translations[lang] ? lang : 'en';
  settings.language = targetLang;
  
  // Automatically adapt default currency for the language
  if (defaultCurrencyByLanguage[targetLang]) {
    settings.currency = defaultCurrencyByLanguage[targetLang];
  }

  saveSettings(settings);
  applyTranslations();

  // Re-render Mode 2 dynamic elements
  if (typeof renderM2Rewards === 'function') renderM2Rewards();
  if (typeof renderM2Transactions === 'function') renderM2Transactions();
  if (typeof updatePresetPrices === 'function') updatePresetPrices();
  if (typeof updateKeypadDisplay === 'function') updateKeypadDisplay();
  if (typeof updateSelectedAmountDisplay === 'function') updateSelectedAmountDisplay(state.m2Coins);
}

/* ======== HELPERS ======== */
function el(id) {
  return document.getElementById(id);
}

function toMoney(v) {
  const lang = getLanguage();
  const locale = languageLocaleMap[lang] || 'en-US';
  return Number(v || 0).toLocaleString(locale, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function nfmt(n) {
  const lang = getLanguage();
  const locale = languageLocaleMap[lang] || 'en-US';
  return Number(n || 0).toLocaleString(locale);
}

function getCurrencyPrefix() {
  return settings.currency || defaultCurrencyByLanguage[getLanguage()] || 'USD';
}

function getCurrencySymbol() {
  const curr = getCurrencyPrefix();
  return currencySymbols[curr] || '$';
}

function sym(v) {
  const symbol = getCurrencySymbol();
  const money = toMoney(v);
  const lang = getLanguage();
  if (['de', 'fr', 'ru'].includes(lang)) {
    return `${money} ${symbol}`;
  }
  return `${symbol}${money}`;
}

function formatDate(d) {
  const lang = getLanguage();
  const dateObj = new Date(d || Date.now());
  const locale = languageLocaleMap[lang] || 'en-US';
  return dateObj.toLocaleString(locale, {
    year: "numeric", month: "numeric", day: "numeric",
    hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false
  });
}

function formatFollowerCount(num) {
  if (typeof num !== 'number') num = parseInt(num, 10) || 0;
  const lang = getLanguage();

  if (lang === 'zh' || lang === 'ja') {
    if (num >= 100000000) return (num / 100000000).toFixed(1).replace(/\.0$/, '') + (lang === 'zh' ? '亿' : '億');
    if (num >= 10000) return (num / 10000).toFixed(1).replace(/\.0$/, '') + '万';
    return String(num);
  }

  if (lang === 'ru') {
    if (num >= 1000000) return (num / 1000000).toFixed(1).replace(/\.0$/, '') + ' млн';
    if (num >= 1000) return (num / 1000).toFixed(1).replace(/\.0$/, '') + ' тыс.';
    return String(num);
  }

  if (num >= 1000000) return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
  if (num >= 10000) return (num / 1000).toFixed(0) + 'K';
  if (num >= 1000) return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
  return String(num);
}

function formatTimeLeft(ms) {
  if (ms <= 0) return t('expired');
  const lang = getLanguage();
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days >= 30) {
    const months = Math.floor(days / 30);
    const rd = days % 30;
    if (lang === 'zh') return rd > 0 ? `${months} 个月 ${rd} 天` : `${months} 个月`;
    if (lang === 'ja') return rd > 0 ? `${months}ヶ月 ${rd}日` : `${months}ヶ月`;
    if (lang === 'ar') return rd > 0 ? `${months} شهر و ${rd} يوم` : `${months} شهر`;
    if (lang === 'es') return rd > 0 ? `${months} m ${rd} d` : `${months} meses`;
    if (lang === 'de') return rd > 0 ? `${months} Mon. ${rd} T.` : `${months} Monate`;
    return rd > 0 ? `${months}m ${rd}d left` : `${months}m left`;
  } else if (days > 0) {
    const rh = hours % 24;
    if (lang === 'zh') return rh > 0 ? `${days} 天 ${rh} 小时` : `${days} 天`;
    if (lang === 'ja') return rh > 0 ? `${days}日 ${rh}時間` : `${days}日`;
    if (lang === 'ar') return rh > 0 ? `${days} يوم و ${rh} ساعة` : `${days} يوم`;
    return rh > 0 ? `${days}d ${rh}h left` : `${days}d left`;
  } else if (hours > 0) {
    const rm = minutes % 60;
    return `${hours}h ${rm}m left`;
  } else if (minutes > 0) {
    const rs = seconds % 60;
    return `${minutes}m ${rs}s left`;
  }
  return `${seconds}s left`;
}
