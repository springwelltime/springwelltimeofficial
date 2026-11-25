/* =========================================================
   SPRINGWELL TIME — BRANDS & COLLECTION
   - brands: shown on the Brands page and the home brand strip.
   - products: shown on the Collection page (and home, if featured: true).
     The products below are SAMPLE listings using well-known collection
     names. Replace them with the pieces actually in store.

   Product fields:
     brand     one of the brand keys below
     name      model / collection name
     style     dress | sport | diver | chrono
     movement  automatic | quartz | manual | solar
     image     path to a photo, e.g. "images/products/seiko-prospex.jpg"
               (leave "" to show the placeholder)
     isNew     true shows a "New" badge
     featured  true shows it on the home page (first 4)
     variant   placeholder drawing only: 0 plain, 1 diver bezel, 2 chronograph
   ========================================================= */
window.CATALOG = {
  brands: [
    {
      key: "casio", name: "Casio", since: 1946,
      origin: { en: "Tokyo, Japan", ms: "Tokyo, Jepun", zh: "日本 东京" },
      blurb: {
        en: "Japanese innovation for everyday life. From classic digital and vintage styles to the Edifice line, Casio watches are reliable, practical and great value.",
        ms: "Inovasi Jepun untuk kehidupan harian. Dari gaya digital klasik dan vintaj hingga siri Edifice, jam Casio boleh dipercayai, praktikal dan berbaloi.",
        zh: "为日常生活而生的日本创新。从经典数字表、复古款到Edifice系列，卡西欧可靠、实用、物超所值。"
      }
    },
    {
      key: "cerruti", name: "Cerruti 1881", since: 1881,
      origin: { en: "Italy", ms: "Itali", zh: "意大利" },
      blurb: {
        en: "Italian elegance from a fashion house founded in Biella in 1881. Cerruti 1881 watches bring refined, tailored style to the wrist.",
        ms: "Keanggunan Itali daripada rumah fesyen yang diasaskan di Biella pada 1881. Jam Cerruti 1881 membawa gaya yang halus dan kemas ke pergelangan anda.",
        zh: "源自1881年创立于意大利比耶拉的时装品牌。Cerruti 1881腕表将精致剪裁般的优雅带到您的手腕。"
      }
    },
    {
      key: "emporioarmani", name: "Emporio Armani", since: 1981,
      origin: { en: "Milan, Italy", ms: "Milan, Itali", zh: "意大利 米兰" },
      blurb: {
        en: "Modern Milanese style. Emporio Armani watches pair clean, confident design with fashion-forward details.",
        ms: "Gaya moden Milan. Jam Emporio Armani menggabungkan reka bentuk yang kemas dan yakin dengan butiran fesyen terkini.",
        zh: "现代米兰风格。Emporio Armani腕表以简洁自信的设计，搭配时尚前卫的细节。"
      }
    },
    {
      key: "esprit", name: "Esprit", since: 1968,
      origin: { en: "San Francisco, USA", ms: "San Francisco, AS", zh: "美国 旧金山" },
      blurb: {
        en: "Fresh, easy-going style for everyday wear, with colourful and minimalist designs that are easy to love.",
        ms: "Gaya segar dan santai untuk pemakaian harian, dengan reka bentuk berwarna-warni dan minimalis yang mudah disukai.",
        zh: "清新随性的日常风格，色彩缤纷又简约的设计，让人一见倾心。"
      }
    },
    {
      key: "fossil", name: "Fossil", since: 1984,
      origin: { en: "Texas, USA", ms: "Texas, AS", zh: "美国 德州" },
      blurb: {
        en: "American vintage-inspired style with a playful twist, from leather-strap classics to bold chronographs.",
        ms: "Gaya Amerika berinspirasikan vintaj dengan sentuhan ceria, dari jam klasik bertali kulit hingga kronograf yang berani.",
        zh: "带有玩味的美式复古风格，从经典皮表带款到大胆的计时表。"
      }
    },
    {
      key: "gshock", name: "G-Shock Premium", since: 1983,
      origin: { en: "Japan", ms: "Jepun", zh: "日本" },
      blurb: {
        en: "The legendary toughness of G-Shock, refined. Premium lines such as MR-G, MT-G and full-metal models pair shock resistance with elevated materials and finishing.",
        ms: "Ketahanan G-Shock yang legenda, kini lebih halus. Siri premium seperti MR-G, MT-G dan model logam penuh menggabungkan daya tahan hentakan dengan bahan dan kemasan yang lebih tinggi.",
        zh: "传奇般坚固的G-Shock，更显精致。MR-G、MT-G及全金属等高端系列，将抗冲击性能与优质材料和工艺结合。"
      }
    },
    {
      key: "hamilton", name: "Hamilton", since: 1892,
      origin: { en: "Switzerland / USA", ms: "Switzerland / AS", zh: "瑞士 / 美国" },
      blurb: {
        en: "American spirit with Swiss precision. Hamilton's field, aviation and dress watches carry a long history in the military, the skies and on the big screen.",
        ms: "Semangat Amerika dengan ketepatan Switzerland. Jam lapangan, penerbangan dan formal Hamilton mempunyai sejarah panjang dalam ketenteraan, penerbangan dan dunia filem.",
        zh: "美式精神，瑞士精准。Hamilton的野战、飞行与正装腕表，在军事、航空与大银幕上都留下了悠久足迹。"
      }
    },
    {
      key: "longines", name: "Longines", since: 1832,
      origin: { en: "Saint-Imier, Switzerland", ms: "Saint-Imier, Switzerland", zh: "瑞士 圣伊米耶" },
      blurb: {
        en: "Elegance is an attitude. Under its winged hourglass emblem, Longines combines classic Swiss watchmaking with a rich heritage in sport timing and aviation.",
        ms: "Keanggunan adalah satu sikap. Dengan lambang jam pasir bersayap, Longines menggabungkan pembuatan jam klasik Switzerland dengan warisan pemasaan sukan dan penerbangan.",
        zh: "优雅是一种态度。以飞翼沙漏为标志，浪琴将经典瑞士制表与运动计时及航空传承融为一体。"
      }
    },
    {
      key: "mauricelacroix", name: "Maurice Lacroix", since: 1975,
      origin: { en: "Switzerland", ms: "Switzerland", zh: "瑞士" },
      blurb: {
        en: "Contemporary Swiss design with bold character, best known for the Aikon collection and its distinctive six-claw bezel.",
        ms: "Reka bentuk Switzerland kontemporari yang berani, terkenal dengan koleksi Aikon dan bezel enam cakarnya yang tersendiri.",
        zh: "个性鲜明的当代瑞士设计，以Aikon系列及其独特的六爪表圈而闻名。"
      }
    },
    {
      key: "mido", name: "Mido", since: 1918,
      origin: { en: "Le Locle, Switzerland", ms: "Le Locle, Switzerland", zh: "瑞士 力洛克" },
      blurb: {
        en: "Inspired by architecture, Mido builds durable Swiss automatics with long power reserves, from the Multifort to the Ocean Star dive line.",
        ms: "Diilhamkan oleh seni bina, Mido menghasilkan jam automatik Switzerland yang tahan lama dengan rizab kuasa panjang, dari Multifort hingga siri selam Ocean Star.",
        zh: "灵感源自建筑，美度打造坚固耐用、长动力储存的瑞士自动腕表，从Multifort到Ocean Star领航者潜水系列。"
      }
    },
    {
      key: "movado", name: "Movado", since: 1881,
      origin: { en: "Switzerland", ms: "Switzerland", zh: "瑞士" },
      blurb: {
        en: "Modern design at its purest. The iconic Museum dial, a single dot at twelve, has made Movado a symbol of minimalist elegance.",
        ms: "Reka bentuk moden yang paling tulen. Dail Museum yang ikonik, satu titik di angka dua belas, menjadikan Movado simbol keanggunan minimalis.",
        zh: "纯粹的现代设计。标志性的博物馆表盘——十二点位置的一颗圆点，使摩凡陀成为极简优雅的象征。"
      }
    },
    {
      key: "police", name: "Police", since: 1983,
      origin: { en: "Italy", ms: "Itali", zh: "意大利" },
      blurb: {
        en: "Bold, edgy design with an urban attitude, for those who like their watch to make a statement.",
        ms: "Reka bentuk yang berani dan tajam dengan sikap bandar, untuk mereka yang mahu jam mereka menonjol.",
        zh: "大胆前卫、充满都市态度的设计，适合想让腕表彰显个性的您。"
      }
    },
    {
      key: "rado", name: "Rado", since: 1917,
      origin: { en: "Lengnau, Switzerland", ms: "Lengnau, Switzerland", zh: "瑞士 伦瑙" },
      blurb: {
        en: "Master of materials. Rado pioneered high-tech ceramic watches that are light, warm to the touch and highly scratch-resistant.",
        ms: "Pakar bahan. Rado mempelopori jam seramik berteknologi tinggi yang ringan, selesa dipakai dan sangat tahan calar.",
        zh: "材质大师。雷达表率先采用高科技陶瓷，轻盈亲肤且高度耐磨抗刮。"
      }
    },
    {
      key: "seiko", name: "Seiko", since: 1881,
      origin: { en: "Tokyo, Japan", ms: "Tokyo, Jepun", zh: "日本 东京" },
      blurb: {
        en: "Over a century of Japanese innovation, from the everyday Seiko 5 Sports to Prospex tool watches and the refined Presage line.",
        ms: "Lebih seabad inovasi Jepun, daripada Seiko 5 Sports untuk harian hingga jam Prospex yang lasak dan siri Presage yang halus.",
        zh: "百余年的日本创新，从日常佩戴的Seiko 5 Sports，到专业的Prospex系列和精致的Presage系列。"
      }
    },
    {
      key: "skechers", name: "Skechers", since: 1992,
      origin: { en: "California, USA", ms: "California, AS", zh: "美国 加州" },
      blurb: {
        en: "Sporty, casual and comfortable. Skechers watches bring a relaxed Californian lifestyle to the wrist at an easy price.",
        ms: "Sporty, kasual dan selesa. Jam Skechers membawa gaya hidup santai California ke pergelangan anda pada harga yang mampu milik.",
        zh: "运动、休闲又舒适。Skechers腕表以亲民价格，将轻松的加州生活风格带到您的手腕。"
      }
    },
    {
      key: "tagheuer", name: "TAG Heuer", since: 1860,
      origin: { en: "Switzerland", ms: "Switzerland", zh: "瑞士" },
      blurb: {
        en: "Avant-garde Swiss watchmaking with roots in motorsport. Home of the Carrera, Monaco and Aquaracer.",
        ms: "Pembuatan jam Switzerland yang avant-garde dengan akar dalam sukan permotoran. Rumah kepada Carrera, Monaco dan Aquaracer.",
        zh: "源自赛车运动的前卫瑞士制表，Carrera、Monaco与Aquaracer的故乡。"
      }
    },
    {
      key: "timex", name: "Timex", since: 1854,
      origin: { en: "Connecticut, USA", ms: "Connecticut, AS", zh: "美国 康涅狄格州" },
      blurb: {
        en: "An American icon of dependable timekeeping, from the Weekender to the Indiglo night-light, built to last.",
        ms: "Ikon Amerika untuk ketepatan masa yang boleh diharap, dari Weekender hingga lampu malam Indiglo, dibina untuk tahan lama.",
        zh: "可靠计时的美国经典，从Weekender到Indiglo夜光，经久耐用。"
      }
    },
    {
      key: "tissot", name: "Tissot", since: 1853,
      origin: { en: "Le Locle, Switzerland", ms: "Le Locle, Switzerland", zh: "瑞士 力洛克" },
      blurb: {
        en: "Innovators by tradition. Tissot makes Swiss quality accessible, with favourites such as the PRX, Le Locle and Seastar.",
        ms: "Inovator secara tradisi. Tissot menjadikan kualiti Switzerland mudah dimiliki, dengan pilihan popular seperti PRX, Le Locle dan Seastar.",
        zh: "传统中的创新者。天梭让瑞士品质触手可及，热门系列包括PRX、力洛克与海星。"
      }
    }
  ],

  products: [
    { brand: "seiko", name: "Prospex Diver's 200m", style: "diver", movement: "automatic", image: "", isNew: true, featured: true, variant: 1 },
    { brand: "tissot", name: "PRX Powermatic 80", style: "sport", movement: "automatic", image: "", featured: true },
    { brand: "longines", name: "HydroConquest", style: "diver", movement: "automatic", image: "", featured: true, variant: 1 },
    { brand: "tagheuer", name: "Carrera Chronograph", style: "chrono", movement: "automatic", image: "", isNew: true, featured: true, variant: 2 },
    { brand: "seiko", name: "Presage Cocktail Time", style: "dress", movement: "automatic", image: "" },
    { brand: "seiko", name: "Seiko 5 Sports", style: "sport", movement: "automatic", image: "" },
    { brand: "tissot", name: "Le Locle Powermatic 80", style: "dress", movement: "automatic", image: "" },
    { brand: "tissot", name: "Seastar 1000 Chronograph", style: "chrono", movement: "quartz", image: "", variant: 2 },
    { brand: "longines", name: "Master Collection", style: "dress", movement: "automatic", image: "" },
    { brand: "tagheuer", name: "Aquaracer Professional 300", style: "diver", movement: "automatic", image: "", variant: 1 },
    { brand: "hamilton", name: "Khaki Field Mechanical", style: "sport", movement: "manual", image: "" },
    { brand: "hamilton", name: "Jazzmaster", style: "dress", movement: "automatic", image: "" },
    { brand: "rado", name: "Captain Cook", style: "diver", movement: "automatic", image: "", isNew: true, variant: 1 },
    { brand: "rado", name: "True Thinline", style: "dress", movement: "quartz", image: "" },
    { brand: "mido", name: "Ocean Star", style: "diver", movement: "automatic", image: "", variant: 1 },
    { brand: "mido", name: "Multifort", style: "sport", movement: "automatic", image: "" },
    { brand: "mauricelacroix", name: "Aikon", style: "sport", movement: "automatic", image: "" },
    { brand: "movado", name: "Museum Classic", style: "dress", movement: "quartz", image: "" },
    { brand: "gshock", name: "MR-G", style: "sport", movement: "solar", image: "" },
    { brand: "gshock", name: "Full Metal 5000", style: "sport", movement: "solar", image: "" },
    { brand: "casio", name: "Edifice Chronograph", style: "chrono", movement: "quartz", image: "", variant: 2 },
    { brand: "cerruti", name: "Classic Dress Watch", style: "dress", movement: "quartz", image: "" },
    { brand: "emporioarmani", name: "Classic Chronograph", style: "chrono", movement: "quartz", image: "", variant: 2 },
    { brand: "esprit", name: "Ladies' Classic", style: "dress", movement: "quartz", image: "" },
    { brand: "fossil", name: "Grant Chronograph", style: "chrono", movement: "quartz", image: "", variant: 2 },
    { brand: "police", name: "Urban Chronograph", style: "chrono", movement: "quartz", image: "", variant: 2 },
    { brand: "skechers", name: "Sport Watch", style: "sport", movement: "quartz", image: "" },
    { brand: "timex", name: "Weekender", style: "sport", movement: "quartz", image: "" }
  ]
};
