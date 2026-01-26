export type Language = 'en' | 'fr' | 'es' | 'pt' | 'ha' | 'yo' | 'ig' | 'ff' | 'ar' | 'zh' | 'he' | 'de' | 'hi' | 'ko'

// Default translations to be reused for languages without full translations
const defaultTranslations = {
  footer: {
    about: 'Evangelical Biblical Outreach Ministries International - A radical, prophetic, and authoritative ministry committed to spreading the Gospel and transforming lives.',
    quickLinks: 'Quick Links',
    headquarters: 'Headquarters',
    contactUs: 'Contact Us',
    allRightsReserved: 'All rights reserved.',
  },
  branches: {
    title: 'EBOMI Branches',
    subtitle: 'Find a branch near you across Nigeria',
    searchPlaceholder: 'Search by state or coordinator...',
    allBranches: 'All Branches',
    coordinator: 'Coordinator',
    contact: 'Contact',
  },
  give: {
    title: 'Give with',
    titleHighlight: 'Purpose',
    subtitle: 'Your giving is an act of worship and partnership in advancing the Kingdom of God. Every contribution makes a difference.',
    secureEncrypted: 'Secure & Encrypted',
    sslProtected: 'SSL Protected',
    waysToGive: 'Ways to Give',
    choosePartnership: 'Choose how you want to partner with us',
    tithe: 'Tithe',
    titheDescription: 'Honor the Lord with your firstfruits. Your tithe supports the ongoing work of the ministry.',
    titheBenefit1: 'Supports daily ministry operations',
    titheBenefit2: 'Blesses the house of God',
    titheBenefit3: 'Opens windows of heaven',
    seed: 'Seed Offering',
    seedDescription: 'Plant a seed of faith and watch God multiply it. Seed offerings support special projects and outreaches.',
    seedBenefit1: 'Supports special projects',
    seedBenefit2: 'Funds outreach programs',
    seedBenefit3: 'Multiplied by God\'s grace',
    project: 'Project Support',
    projectDescription: 'Partner with us in building the kingdom. Support our building projects and infrastructure development.',
    projectBenefit1: 'Builds physical infrastructure',
    projectBenefit2: 'Expands ministry reach',
    projectBenefit3: 'Creates lasting legacy',
    giveButton: 'Give',
    partnerTitle: 'Partner With Us',
    partnerDescription: 'Become a monthly partner and join a community committed to transforming lives through the Gospel. Your consistent partnership enables us to plan and execute long-term ministry initiatives.',
    partnerBenefit1: 'Monthly partnership benefits',
    partnerBenefit2: 'Regular ministry updates',
    partnerBenefit3: 'Special partner events',
    becomePartner: 'Become a Partner',
    paymentMethods: 'Accepted Payment Methods',
    bankTransfer: 'Bank Transfer',
    creditDebitCard: 'Credit/Debit Card',
    mobileMoney: 'Mobile Money',
    paypal: 'PayPal',
  },
  download: {
    title: 'Download Centre',
    subtitle: 'Access sermons, teachings, music, and resources',
    searchPlaceholder: 'Search resources...',
    allTypes: 'All Types',
    allCategories: 'All Categories',
    sermons: 'Sermons',
    teachings: 'Teachings',
    music: 'Music',
    books: 'Books',
    accessResource: 'Access Resource',
    noResourcesFound: 'No resources found matching your criteria.',
  },
  ebomiprays: {
    title: 'Join Us',
    subtitle: 'Submit your prayer requests and share testimonies',
    submitPrayerRequest: 'Submit Prayer Request',
    testimonies: 'Testimonies',
    nameOptional: 'Name (Optional)',
    emailOptional: 'Email (Optional)',
    phoneOptional: 'Phone (Optional)',
    category: 'Category',
    prayerRequest: 'Prayer Request',
    required: '*',
    submitButton: 'Submit Prayer Request',
    thankYou: 'Thank you! Your prayer request has been submitted. We will be praying for you.',
    prayerSubmitted: 'Prayer request submitted',
    general: 'General',
    healing: 'Healing',
    breakthrough: 'Breakthrough',
    family: 'Family',
    finances: 'Finances',
    career: 'Career',
    spiritual: 'Spiritual Growth',
    shareTestimony: 'Share Your Testimony',
    shareTestimonyDescription: 'Have a testimony to share? Submit it through the prayer request form and we\'ll add it here!',
    shareTestimonyButton: 'Share Testimony',
  },
}

export interface Translations {
  // Navigation
  nav: {
    home: string
    aboutUs: string
    branches: string
    gallery: string
    library: string
    resources: string
    joinUs: string
    visitTemple: string
  }
  
  // Home Page
  home: {
    welcomeHome: string
    welcomeMessage: string
    upcomingEvent: string
    globalRevivalCongress: string
    theme: string
    date: string
    location: string
    registerNow: string
    limitedSeats: string
    propheticMondays: string
    swipeToView: string
    recentPrograms: string
    ebomiAnthem: string
    anthemText: string[]
    joinTheArmy: string
    meetTheProphet: string
    ourMinistries: string
    prophetsLibrary: string
    transformYourLife: string
    viewAllBooks: string
    shareTestimony: string
    testimonyDescription: string
    inspireOthers: string
    inspireDescription: string
    glorifyGod: string
    glorifyDescription: string
    buildFaith: string
    buildFaithDescription: string
    joinUsInWorship: string
    serviceTimes: string
    everyMonday: string
    lastWeekOfMonth: string
    everyday: string
    watchOn: string
    ebomiTv: string
    ebomiTvDescription: string
    liveNow: string
    onDemand: string
    weAreGodsArmy: string
    intercessors: string
    nations: string
    partners: string
    branches: string
    joinTheArmyDescription: string
    findBranchNearYou: string
    ebomiDescription: string
    ebomiAimsTo: string
    ebomiAim1: string
    ebomiAim2: string
    ebomiAim3: string
    ebomiAim4: string
    joinTheArmySecondParagraph: string
    joinTheArmyBenefit1: string
    joinTheArmyBenefit2: string
    joinTheArmyBenefit3: string
    joinTheArmyBenefit4: string
    prophetBiography1: string
    prophetBiography2: string
    prophetBiography3: string
    ourMinistriesDescription: string
  }
  
  // Common
  common: {
    readMore: string
    learnMore: string
    visitWebsite: string
    readNow: string
    watchNow: string
    share: string
    submit: string
    cancel: string
    close: string
    search: string
    all: string
    loading: string
    noResults: string
  }
  
  // Footer
  footer: {
    about: string
    quickLinks: string
    headquarters: string
    contactUs: string
    allRightsReserved: string
  }
  
  // Branches Page
  branches: {
    title: string
    subtitle: string
    searchPlaceholder: string
    allBranches: string
    coordinator: string
    contact: string
  }
  
  // Give Page
  give: {
    title: string
    titleHighlight: string
    subtitle: string
    secureEncrypted: string
    sslProtected: string
    waysToGive: string
    choosePartnership: string
    tithe: string
    titheDescription: string
    titheBenefit1: string
    titheBenefit2: string
    titheBenefit3: string
    seed: string
    seedDescription: string
    seedBenefit1: string
    seedBenefit2: string
    seedBenefit3: string
    project: string
    projectDescription: string
    projectBenefit1: string
    projectBenefit2: string
    projectBenefit3: string
    giveButton: string
    partnerTitle: string
    partnerDescription: string
    partnerBenefit1: string
    partnerBenefit2: string
    partnerBenefit3: string
    becomePartner: string
    paymentMethods: string
    bankTransfer: string
    creditDebitCard: string
    mobileMoney: string
    paypal: string
  }
  
  // Download Centre
  download: {
    title: string
    subtitle: string
    searchPlaceholder: string
    allTypes: string
    allCategories: string
    sermons: string
    teachings: string
    music: string
    books: string
    accessResource: string
    noResourcesFound: string
  }
  
  // Ebomiprays Page
  ebomiprays: {
    title: string
    subtitle: string
    submitPrayerRequest: string
    testimonies: string
    nameOptional: string
    emailOptional: string
    phoneOptional: string
    category: string
    prayerRequest: string
    required: string
    submitButton: string
    thankYou: string
    prayerSubmitted: string
    general: string
    healing: string
    breakthrough: string
    family: string
    finances: string
    career: string
    spiritual: string
    shareTestimony: string
    shareTestimonyDescription: string
    shareTestimonyButton: string
  }
}

export const translations: Record<Language, Translations> = {
  en: {
    nav: {
      home: 'Home',
      aboutUs: 'About Us',
      branches: 'EBOMI Branches',
      gallery: 'Gallery',
      library: 'Library',
      resources: 'Resources',
      joinUs: 'Join Us',
      visitTemple: 'Visit EBOMI',
    },
    home: {
      welcomeHome: 'WELCOME HOME',
      welcomeMessage: 'At EBOMI, every heart finds a home, every soul finds love, and every life is changed by the Word of God.',
      upcomingEvent: 'Upcoming Event',
      globalRevivalCongress: 'Global Revival Congress',
      theme: 'Theme',
      date: 'Date',
      location: 'Location',
      registerNow: 'Register Now',
      limitedSeats: 'Limited Seats Available',
      propheticMondays: 'Prophetic Mondays',
      swipeToView: 'Swipe to view more',
      recentPrograms: 'Recent Programs',
      ebomiAnthem: 'EBOMI ANTHEM',
      anthemText: [
        'God has got an army marching through the land',
        'Deliverance is our song with healing in our hands,',
        'Everlasting Joy with gladness in our hearts',
        'In this army I\'ve got a part',
        'The army of the Lord is marching on',
      ],
      joinTheArmy: 'Join the Army of the Lord',
      meetTheProphet: 'Meet the Prophet',
      ourMinistries: 'Our Ministries & Arms',
      prophetsLibrary: 'Prophet\'s Library',
      transformYourLife: 'Transform your life through powerful teachings and prophetic insights',
      viewAllBooks: 'View All Books',
      shareTestimony: 'Share Your Testimony',
      testimonyDescription: 'Your story of God\'s faithfulness can inspire and encourage others. Every testimony is a powerful declaration of God\'s goodness and a beacon of hope for those who need it.',
      inspireOthers: 'Inspire Others',
      inspireDescription: 'Your testimony can be the encouragement someone needs to keep believing and pressing forward.',
      glorifyGod: 'Glorify God',
      glorifyDescription: 'Give God the glory for what He has done in your life and magnify His name.',
      buildFaith: 'Build Faith',
      buildFaithDescription: 'Help others believe for their own breakthrough and experience God\'s faithfulness.',
      joinUsInWorship: 'Join Us in Worship',
      serviceTimes: 'Service Times',
      everyMonday: 'Every Monday: 3PM',
      lastWeekOfMonth: 'Last Week of Every Month',
      everyday: 'Everyday: 9PM WAT',
      watchOn: 'Watch on:',
      ebomiTv: 'EBOMI.TV',
      ebomiTvDescription: 'Watch live services, catch up on past programs, and stay connected with powerful teachings and worship sessions from anywhere in the world.',
      liveNow: 'Live Now',
      onDemand: 'On-Demand',
      weAreGodsArmy: 'We are God\'s Army marching through the Land.',
      intercessors: 'INTERCESSORS',
      nations: 'NATIONS',
      partners: 'PARTNERS',
      branches: 'BRANCHES',
      joinTheArmyDescription: 'We are God\'s Army, marching through the land with deliverance in our song and healing in our hands. Every believer has a part to play in this great movement.',
      findBranchNearYou: 'Find a Branch Near You',
      ebomiDescription: 'EBOMI is an inter-denominational, global Christian prayer and outreach movement founded by Prophet Isa El-Buba, headquartered in Jos, Plateau State, Nigeria. Its mission includes mobilizing, training, equipping, and empowering believers, leaders, and institutions to live out their prophetic destinies; advancing the Kingdom of God through intercession, church planting, evangelism, and community development.',
      ebomiAimsTo: 'EBOMI aims to:',
      ebomiAim1: 'Build a strong and militant network of Christians in politics, media, finance, government, military, and the Church.',
      ebomiAim2: 'Free believers from religious yokes and reveal Kingdom demands as the key to success and advancement.',
      ebomiAim3: 'Raise an army of intercessors, who pray and intercede for nations, and affect transformation in society, politics, education, culture and more.',
      ebomiAim4: 'Promote Unity beyond denominational boundaries.',
      joinTheArmySecondParagraph: 'When you join EBOMI, you become part of a global network of intercessors, leaders, and change-makers committed to advancing the Kingdom of God. Together, we pray, we serve, and we transform nations.',
      joinTheArmyBenefit1: 'Be part of a militant network of believers',
      joinTheArmyBenefit2: 'Join intercessors praying for nations',
      joinTheArmyBenefit3: 'Transform society through Kingdom principles',
      joinTheArmyBenefit4: 'Live out your prophetic destiny',
      prophetBiography1: `Prophet (Dr) Isa El-Buba is a globally recognized prophetic voice, transformational leader, and apostolic reformer. He is the visionary behind Evangelical Biblical Outreach Ministries International (EBOMI), headquartered in Jos, Nigeria—a ministry dedicated to raising "Kingdom Ambassadors" who shape culture, rebuild nations, and manifest Godly influence in every sphere of human existence.

Known for his uncompromising stance on righteousness and his deep prophetic insights, Prophet Isa El-buba has spent over four decades pioneering spiritual and social awakening across the globe.

The Encounter: From Islam to the Cross
Born in Jos into a devout Muslim family, Prophet Isa’s life took a radical turn in 1982. Following a dramatic, supernatural encounter with Jesus Christ, he was delivered from deep Islamic occult involvement and commissioned into a life of Christian ministry. This powerful conversion remains the bedrock of his message: that the Gospel of Jesus Christ has the power to liberate any soul and transform any nation.

Ministry Philosophy & Global Impact
Prophet Isa’s ministry is defined by the "Radical Prophetic." His meetings are marked by the tangible presence of God, healing, and precise prophetic proclamations that steer the destinies of individuals and governments alike.

He carries a specific, divine burden for:

The Global Mission: Reaching the Muslim world with the authentic love and truth of Christ.

Spiritual Awakening: Equipping the Body of Christ to move beyond religion into supernatural kingdom assignments.

National Reform: Acting as a "Watchman" over Nigeria and the nations, calling leaders to accountability, justice, and godly governance.

A Catalyst for National Transformation
Beyond the pulpit, Prophet Isa is a fierce advocate for civic responsibility. He is the convener of the Initiative for a Better and Brighter Nigeria (IBBN). Through this movement, he mobilizes millions of citizens toward nation-building, credible leadership, and the pursuit of a righteous political landscape. His influence bridges the gap between the Church and the State, making him a sought-after voice for national peace and renewal.

Authorship & Global Media
A prolific communicator, Prophet Isa El-buba reaches millions through his televangelism broadcasts and published works. His books serve as manuals for spiritual warfare, leadership, and prophetic activation, ensuring that his mantle of wisdom is accessible to the next generation of believers worldwide.

Family & Legacy
Prophet Isa El-Buba is happily married to Pastor Choice Isa El-Buba, a pillar of strength and a co-laborer in the vision. Together, they are blessed with children and grandchildren who serve alongside them in the ministry. The El-Buba legacy is one of unwavering commitment to truth, spiritual authenticity, and the relentless pursuit of God’s purpose on earth.`,
      prophetBiography2: '',
      prophetBiography3: '',
      ourMinistriesDescription: 'EBOMI extends its impact through four strategic arms, each dedicated to transforming lives and communities',
    },
    common: {
      readMore: 'Read More',
      learnMore: 'Learn More',
      visitWebsite: 'Visit Website',
      readNow: 'Read Now',
      watchNow: 'Watch Now',
      share: 'Share',
      submit: 'Submit',
      cancel: 'Cancel',
      close: 'Close',
      search: 'Search',
      all: 'All',
      loading: 'Loading...',
      noResults: 'No results found',
    },
    footer: {
      about: 'Evangelical Biblical Outreach Ministries International - A radical, prophetic, and authoritative ministry committed to spreading the Gospel and transforming lives.',
      quickLinks: 'Quick Links',
      headquarters: 'Headquarters',
      contactUs: 'Contact Us',
      allRightsReserved: 'All rights reserved.',
    },
    branches: {
      title: 'EBOMI Branches',
      subtitle: 'Find a branch near you across Nigeria',
      searchPlaceholder: 'Search by state or coordinator...',
      allBranches: 'All Branches',
      coordinator: 'Coordinator',
      contact: 'Contact',
    },
    give: {
      title: 'Give with',
      titleHighlight: 'Purpose',
      subtitle: 'Your giving is an act of worship and partnership in advancing the Kingdom of God. Every contribution makes a difference.',
      secureEncrypted: 'Secure & Encrypted',
      sslProtected: 'SSL Protected',
      waysToGive: 'Ways to Give',
      choosePartnership: 'Choose how you want to partner with us',
      tithe: 'Tithe',
      titheDescription: 'Honor the Lord with your firstfruits. Your tithe supports the ongoing work of the ministry.',
      titheBenefit1: 'Supports daily ministry operations',
      titheBenefit2: 'Blesses the house of God',
      titheBenefit3: 'Opens windows of heaven',
      seed: 'Seed Offering',
      seedDescription: 'Plant a seed of faith and watch God multiply it. Seed offerings support special projects and outreaches.',
      seedBenefit1: 'Supports special projects',
      seedBenefit2: 'Funds outreach programs',
      seedBenefit3: 'Multiplied by God\'s grace',
      project: 'Project Support',
      projectDescription: 'Partner with us in building the kingdom. Support our building projects and infrastructure development.',
      projectBenefit1: 'Builds physical infrastructure',
      projectBenefit2: 'Expands ministry reach',
      projectBenefit3: 'Creates lasting legacy',
      giveButton: 'Give',
      partnerTitle: 'Partner With Us',
      partnerDescription: 'Become a monthly partner and join a community committed to transforming lives through the Gospel. Your consistent partnership enables us to plan and execute long-term ministry initiatives.',
      partnerBenefit1: 'Monthly partnership benefits',
      partnerBenefit2: 'Regular ministry updates',
      partnerBenefit3: 'Special partner events',
      becomePartner: 'Become a Partner',
      paymentMethods: 'Accepted Payment Methods',
      bankTransfer: 'Bank Transfer',
      creditDebitCard: 'Credit/Debit Card',
      mobileMoney: 'Mobile Money',
      paypal: 'PayPal',
    },
    download: {
      title: 'Download Centre',
      subtitle: 'Access sermons, teachings, music, and resources',
      searchPlaceholder: 'Search resources...',
      allTypes: 'All Types',
      allCategories: 'All Categories',
      sermons: 'Sermons',
      teachings: 'Teachings',
      music: 'Music',
      books: 'Books',
      accessResource: 'Access Resource',
      noResourcesFound: 'No resources found matching your criteria.',
    },
    ebomiprays: {
      title: 'Join Us',
      subtitle: 'Submit your prayer requests and share testimonies',
      submitPrayerRequest: 'Submit Prayer Request',
      testimonies: 'Testimonies',
      nameOptional: 'Name (Optional)',
      emailOptional: 'Email (Optional)',
      phoneOptional: 'Phone (Optional)',
      category: 'Category',
      prayerRequest: 'Prayer Request',
      required: '*',
      submitButton: 'Submit Prayer Request',
      thankYou: 'Thank you! Your prayer request has been submitted. We will be praying for you.',
      prayerSubmitted: 'Prayer request submitted',
      general: 'General',
      healing: 'Healing',
      breakthrough: 'Breakthrough',
      family: 'Family',
      finances: 'Finances',
      career: 'Career',
      spiritual: 'Spiritual Growth',
      shareTestimony: 'Share Your Testimony',
      shareTestimonyDescription: 'Have a testimony to share? Submit it through the prayer request form and we\'ll add it here!',
      shareTestimonyButton: 'Share Testimony',
    },
  },
  
  fr: {
    nav: {
      home: 'Accueil',
      aboutUs: 'À propos',
      branches: 'Branches EBOMI',
      gallery: 'Galerie',
      library: 'Bibliothèque',
      resources: 'Ressources',
      joinUs: 'Rejoignez-nous',
      visitTemple: 'Visitez EBOMI',
    },
    home: {
      welcomeHome: 'BIENVENUE À LA MAISON',
      welcomeMessage: 'Chez EBOMI, chaque cœur trouve un foyer, chaque âme trouve l\'amour, et chaque vie est transformée par la Parole de Dieu.',
      upcomingEvent: 'Événement à venir',
      globalRevivalCongress: 'Congrès de Réveil Mondial',
      theme: 'Thème',
      date: 'Date',
      location: 'Lieu',
      registerNow: 'S\'inscrire maintenant',
      limitedSeats: 'Places limitées disponibles',
      propheticMondays: 'Lundis Prophétiques',
      swipeToView: 'Glissez pour voir plus',
      recentPrograms: 'Programmes récents',
      ebomiAnthem: 'HYMNE EBOMI',
      anthemText: [
        'Dieu a une armée qui marche à travers le pays',
        'La délivrance est notre chant avec la guérison dans nos mains,',
        'Joie éternelle avec allégresse dans nos cœurs',
        'Dans cette armée j\'ai une part',
        'L\'armée du Seigneur avance',
      ],
      joinTheArmy: 'Rejoignez l\'Armée du Seigneur',
      meetTheProphet: 'Rencontrez le Prophète',
      ourMinistries: 'Nos Ministères et Branches',
      prophetsLibrary: 'Bibliothèque du Prophète',
      transformYourLife: 'Transformez votre vie grâce à des enseignements puissants et des perspectives prophétiques',
      viewAllBooks: 'Voir tous les livres',
      shareTestimony: 'Partagez votre témoignage',
      testimonyDescription: 'Votre histoire de la fidélité de Dieu peut inspirer et encourager les autres. Chaque témoignage est une déclaration puissante de la bonté de Dieu et un phare d\'espoir pour ceux qui en ont besoin.',
      inspireOthers: 'Inspirer les autres',
      inspireDescription: 'Votre témoignage peut être l\'encouragement dont quelqu\'un a besoin pour continuer à croire et à avancer.',
      glorifyGod: 'Glorifier Dieu',
      glorifyDescription: 'Donnez gloire à Dieu pour ce qu\'Il a fait dans votre vie et magnifiez Son nom.',
      buildFaith: 'Bâtir la foi',
      buildFaithDescription: 'Aidez les autres à croire pour leur propre percée et à expérimenter la fidélité de Dieu.',
      joinUsInWorship: 'Rejoignez-nous dans l\'adoration',
      serviceTimes: 'Heures de service',
      everyMonday: 'Chaque lundi: 15h',
      lastWeekOfMonth: 'Dernière semaine de chaque mois',
      everyday: 'Tous les jours: 21h WAT',
      watchOn: 'Regarder sur:',
      ebomiTv: 'EBOMI.TV',
      ebomiTvDescription: 'Regardez les services en direct, rattrapez les programmes passés et restez connecté avec des enseignements puissants et des sessions d\'adoration depuis n\'importe où dans le monde.',
      liveNow: 'En direct',
      onDemand: 'À la demande',
      weAreGodsArmy: 'Nous sommes l\'Armée de Dieu marchant à travers le pays.',
      intercessors: 'INTERCESSIONS',
      nations: 'NATIONS',
      partners: 'PARTENAIRES',
      branches: 'BRANCHES',
      joinTheArmyDescription: 'Nous sommes l\'Armée de Dieu, marchant à travers le pays avec la délivrance dans notre chant et la guérison dans nos mains. Chaque croyant a un rôle à jouer dans ce grand mouvement.',
      findBranchNearYou: 'Trouver une branche près de vous',
      ebomiDescription: 'EBOMI est un mouvement chrétien interconfessionnel et mondial de prière et d\'évangélisation fondé par le Prophète Isa El-Buba, dont le siège est à Jos, État du Plateau, Nigeria. Sa mission comprend la mobilisation, la formation, l\'équipement et l\'autonomisation des croyants, des dirigeants et des institutions pour vivre leurs destins prophétiques; faire avancer le Royaume de Dieu par l\'intercession, la plantation d\'églises, l\'évangélisation et le développement communautaire.',
      ebomiAimsTo: 'EBOMI vise à:',
      ebomiAim1: 'Construire un réseau fort et militant de chrétiens dans la politique, les médias, la finance, le gouvernement, l\'armée et l\'Église.',
      ebomiAim2: 'Libérer les croyants des jougs religieux et révéler les exigences du Royaume comme clé du succès et de l\'avancement.',
      ebomiAim3: 'Élever une armée d\'intercesseurs, qui prient et intercèdent pour les nations, et affectent la transformation dans la société, la politique, l\'éducation, la culture et plus encore.',
      ebomiAim4: 'Promouvoir l\'unité au-delà des frontières confessionnelles.',
      joinTheArmySecondParagraph: 'Lorsque vous rejoignez EBOMI, vous devenez partie d\'un réseau mondial d\'intercesseurs, de dirigeants et d\'agents de changement engagés à faire avancer le Royaume de Dieu. Ensemble, nous prions, nous servons et nous transformons les nations.',
      joinTheArmyBenefit1: 'Faire partie d\'un réseau militant de croyants',
      joinTheArmyBenefit2: 'Rejoindre les intercesseurs qui prient pour les nations',
      joinTheArmyBenefit3: 'Transformer la société par les principes du Royaume',
      joinTheArmyBenefit4: 'Vivre votre destin prophétique',
      prophetBiography1: `Le Prophète (Dr) Isa El-Buba est une voix prophétique mondialement reconnue, un leader transformationnel et un réformateur apostolique. Il est le visionnaire derrière les Ministères Internationaux d'Évangélisation Biblique (EBOMI), dont le siège est à Jos, au Nigeria—un ministère dédié à élever des "Ambassadeurs du Royaume" qui façonnent la culture, reconstruisent les nations et manifestent l'influence divine dans toutes les sphères de l'existence humaine.

Connu pour sa position intransigeante sur la justice et ses profondes perspectives prophétiques, le Prophète Isa El-buba a passé plus de quatre décennies à être un pionnier du réveil spirituel et social à travers le globe.

La Rencontre : De l'Islam à la Croix
Born in Jos into a devout Muslim family, Prophet Isa’s life took a radical turn in 1982. Following a dramatic, supernatural encounter with Jesus Christ, he was delivered from deep Islamic occult involvement and commissioned into a life of Christian ministry. This powerful conversion remains the bedrock of his message: that the Gospel of Jesus Christ has the power to liberate any soul and transform any nation.

Ministry Philosophy & Global Impact
Prophet Isa’s ministry is defined by the "Radical Prophetic." His meetings are marked by the tangible presence of God, healing, and precise prophetic proclamations that steer the destinies of individuals and governments alike.

He carries a specific, divine burden for:

The Global Mission: Reaching the Muslim world with the authentic love and truth of Christ.

Spiritual Awakening: Equipping the Body of Christ to move beyond religion into supernatural kingdom assignments.

National Reform: Acting as a "Watchman" over Nigeria and the nations, calling leaders to accountability, justice, and godly governance.

A Catalyst for National Transformation
Beyond the pulpit, Prophet Isa is a fierce advocate for civic responsibility. He is the convener of the Initiative for a Better and Brighter Nigeria (IBBN). Through this movement, he mobilizes millions of citizens toward nation-building, credible leadership, and the pursuit of a righteous political landscape. His influence bridges the gap between the Church and the State, making him a sought-after voice for national peace and renewal.

Authorship & Global Media
A prolific communicator, Prophet Isa El-buba reaches millions through his televangelism broadcasts and published works. His books serve as manuals for spiritual warfare, leadership, and prophetic activation, ensuring that his mantle of wisdom is accessible to the next generation of believers worldwide.

Family & Legacy
Prophet Isa El-Buba is happily married to Pastor Choice Isa El-Buba, a pillar of strength and a co-laborer in the vision. Together, they are blessed with children and grandchildren who serve alongside them in the ministry. The El-Buba legacy is one of unwavering commitment to truth, spiritual authenticity, and the relentless pursuit of God’s purpose on earth.`,
      prophetBiography2: '',
      prophetBiography3: '',
      ourMinistriesDescription: 'EBOMI étend son impact à travers quatre bras stratégiques, chacun dédié à transformer des vies et des communautés',
    },
    common: {
      readMore: 'Lire la suite',
      learnMore: 'En savoir plus',
      visitWebsite: 'Visiter le site web',
      readNow: 'Lire maintenant',
      watchNow: 'Regarder maintenant',
      share: 'Partager',
      submit: 'Soumettre',
      cancel: 'Annuler',
      close: 'Fermer',
      search: 'Rechercher',
      all: 'Tout',
      loading: 'Chargement...',
      noResults: 'Aucun résultat trouvé',
    },
    footer: {
      about: 'Ministères Internationaux d\'Évangélisation Biblique - Un ministère radical, prophétique et autoritaire engagé à répandre l\'Évangile et à transformer des vies.',
      quickLinks: 'Liens rapides',
      headquarters: 'Siège social',
      contactUs: 'Contactez-nous',
      allRightsReserved: 'Tous droits réservés.',
    },
    branches: {
      title: 'Branches EBOMI',
      subtitle: 'Trouvez une branche près de vous à travers le Nigeria',
      searchPlaceholder: 'Rechercher par état ou coordinateur...',
      allBranches: 'Toutes les branches',
      coordinator: 'Coordinateur',
      contact: 'Contact',
    },
    give: {
      title: 'Donner avec',
      titleHighlight: 'But',
      subtitle: 'Votre don est un acte d\'adoration et de partenariat pour faire avancer le Royaume de Dieu. Chaque contribution fait une différence.',
      secureEncrypted: 'Sécurisé et crypté',
      sslProtected: 'Protégé SSL',
      waysToGive: 'Façons de donner',
      choosePartnership: 'Choisissez comment vous voulez vous associer à nous',
      tithe: 'Dîme',
      titheDescription: 'Honorez le Seigneur avec vos prémices. Votre dîme soutient le travail continu du ministère.',
      titheBenefit1: 'Soutient les opérations quotidiennes du ministère',
      titheBenefit2: 'Bénit la maison de Dieu',
      titheBenefit3: 'Ouvre les fenêtres du ciel',
      seed: 'Offrande de semence',
      seedDescription: 'Plantez une semence de foi et regardez Dieu la multiplier. Les offrandes de semence soutiennent des projets spéciaux et des évangélisations.',
      seedBenefit1: 'Soutient des projets spéciaux',
      seedBenefit2: 'Finance des programmes d\'évangélisation',
      seedBenefit3: 'Multiplié par la grâce de Dieu',
      project: 'Soutien aux projets',
      projectDescription: 'Partenaire avec nous dans la construction du royaume. Soutenez nos projets de construction et de développement d\'infrastructure.',
      projectBenefit1: 'Construit une infrastructure physique',
      projectBenefit2: 'Élargit la portée du ministère',
      projectBenefit3: 'Crée un héritage durable',
      giveButton: 'Donner',
      partnerTitle: 'Partenaire avec nous',
      partnerDescription: 'Devenez un partenaire mensuel et rejoignez une communauté engagée à transformer des vies par l\'Évangile. Votre partenariat constant nous permet de planifier et d\'exécuter des initiatives ministérielles à long terme.',
      partnerBenefit1: 'Avantages du partenariat mensuel',
      partnerBenefit2: 'Mises à jour régulières du ministère',
      partnerBenefit3: 'Événements spéciaux pour les partenaires',
      becomePartner: 'Devenir un partenaire',
      paymentMethods: 'Moyens de paiement acceptés',
      bankTransfer: 'Virement bancaire',
      creditDebitCard: 'Carte de crédit/débit',
      mobileMoney: 'Argent mobile',
      paypal: 'PayPal',
    },
    download: {
      title: 'Centre de téléchargement',
      subtitle: 'Accédez aux sermons, enseignements, musique et ressources',
      searchPlaceholder: 'Rechercher des ressources...',
      allTypes: 'Tous les types',
      allCategories: 'Toutes les catégories',
      sermons: 'Sermons',
      teachings: 'Enseignements',
      music: 'Musique',
      books: 'Livres',
      accessResource: 'Accéder à la ressource',
      noResourcesFound: 'Aucune ressource trouvée correspondant à vos critères.',
    },
    ebomiprays: {
      title: 'Rejoignez-nous',
      subtitle: 'Soumettez vos demandes de prière et partagez des témoignages',
      submitPrayerRequest: 'Soumettre une demande de prière',
      testimonies: 'Témoignages',
      nameOptional: 'Nom (Optionnel)',
      emailOptional: 'Email (Optionnel)',
      phoneOptional: 'Téléphone (Optionnel)',
      category: 'Catégorie',
      prayerRequest: 'Demande de prière',
      required: '*',
      submitButton: 'Soumettre la demande de prière',
      thankYou: 'Merci! Votre demande de prière a été soumise. Nous prierons pour vous.',
      prayerSubmitted: 'Demande de prière soumise',
      general: 'Général',
      healing: 'Guérison',
      breakthrough: 'Percée',
      family: 'Famille',
      finances: 'Finances',
      career: 'Carrière',
      spiritual: 'Croissance spirituelle',
      shareTestimony: 'Partagez votre témoignage',
      shareTestimonyDescription: 'Avez-vous un témoignage à partager? Soumettez-le via le formulaire de demande de prière et nous l\'ajouterons ici!',
      shareTestimonyButton: 'Partager le témoignage',
    },
  },
  
  es: {
    nav: {
      home: 'Inicio',
      aboutUs: 'Acerca de nosotros',
      branches: 'Ramas EBOMI',
      gallery: 'Galería',
      library: 'Biblioteca',
      resources: 'Recursos',
      joinUs: 'Únete a nosotros',
      visitTemple: 'Visita EBOMI',
    },
    home: {
      welcomeHome: 'BIENVENIDO A CASA',
      welcomeMessage: 'En EBOMI, cada corazón encuentra un hogar, cada alma encuentra amor, y cada vida es transformada por la Palabra de Dios.',
      upcomingEvent: 'Próximo evento',
      globalRevivalCongress: 'Congreso de Avivamiento Global',
      theme: 'Tema',
      date: 'Fecha',
      location: 'Ubicación',
      registerNow: 'Registrarse ahora',
      limitedSeats: 'Asientos limitados disponibles',
      propheticMondays: 'Lunes Proféticos',
      swipeToView: 'Desliza para ver más',
      recentPrograms: 'Programas recientes',
      ebomiAnthem: 'HIMNO DE EBOMI',
      anthemText: [
        'Dios tiene un ejército marchando por la tierra',
        'La liberación es nuestra canción con sanidad en nuestras manos,',
        'Gozo eterno con alegría en nuestros corazones',
        'En este ejército tengo una parte',
        'El ejército del Señor sigue avanzando',
      ],
      joinTheArmy: 'Únete al Ejército del Señor',
      meetTheProphet: 'Conoce al Profeta',
      ourMinistries: 'Nuestros Ministerios y Ramas',
      prophetsLibrary: 'Biblioteca del Profeta',
      transformYourLife: 'Transforma tu vida a través de enseñanzas poderosas e ideas proféticas',
      viewAllBooks: 'Ver todos los libros',
      shareTestimony: 'Comparte tu testimonio',
      testimonyDescription: 'Tu historia de la fidelidad de Dios puede inspirar y alentar a otros. Cada testimonio es una declaración poderosa de la bondad de Dios y un faro de esperanza para quienes lo necesitan.',
      inspireOthers: 'Inspirar a otros',
      inspireDescription: 'Tu testimonio puede ser el aliento que alguien necesita para seguir creyendo y avanzando.',
      glorifyGod: 'Glorificar a Dios',
      glorifyDescription: 'Da gloria a Dios por lo que Él ha hecho en tu vida y magnifica Su nombre.',
      buildFaith: 'Edificar la fe',
      buildFaithDescription: 'Ayuda a otros a creer para su propio avance y experimentar la fidelidad de Dios.',
      joinUsInWorship: 'Únete a nosotros en adoración',
      serviceTimes: 'Horarios de servicio',
      everyMonday: 'Cada lunes: 3PM',
      lastWeekOfMonth: 'Última semana de cada mes',
      everyday: 'Todos los días: 9PM WAT',
      watchOn: 'Ver en:',
      ebomiTv: 'EBOMI.TV',
      ebomiTvDescription: 'Mira servicios en vivo, ponte al día con programas pasados y mantente conectado con enseñanzas poderosas y sesiones de adoración desde cualquier parte del mundo.',
      liveNow: 'En vivo',
      onDemand: 'Bajo demanda',
      weAreGodsArmy: 'Somos el Ejército de Dios marchando por la tierra.',
      intercessors: 'INTERCESORES',
      nations: 'NACIONES',
      partners: 'SOCIOS',
      branches: 'RAMAS',
      joinTheArmyDescription: 'Somos el Ejército de Dios, marchando por la tierra con liberación en nuestra canción y sanidad en nuestras manos. Cada creyente tiene un papel que desempeñar en este gran movimiento.',
      findBranchNearYou: 'Encuentra una rama cerca de ti',
      ebomiDescription: 'EBOMI es un movimiento cristiano interdenominacional y global de oración y alcance fundado por el Profeta Isa El-Buba, con sede en Jos, Estado de Plateau, Nigeria. Su misión incluye movilizar, capacitar, equipar y empoderar a creyentes, líderes e instituciones para vivir sus destinos proféticos; avanzar el Reino de Dios a través de la intercesión, plantación de iglesias, evangelismo y desarrollo comunitario.',
      ebomiAimsTo: 'EBOMI tiene como objetivo:',
      ebomiAim1: 'Construir una red fuerte y militante de cristianos en política, medios, finanzas, gobierno, militar y la Iglesia.',
      ebomiAim2: 'Liberar a los creyentes de los yugos religiosos y revelar las demandas del Reino como la clave del éxito y el avance.',
      ebomiAim3: 'Levantar un ejército de intercesores, que oran e interceden por las naciones, y afectan la transformación en la sociedad, política, educación, cultura y más.',
      ebomiAim4: 'Promover la Unidad más allá de los límites denominacionales.',
      joinTheArmySecondParagraph: 'Cuando te unes a EBOMI, te conviertes en parte de una red global de intercesores, líderes y agentes de cambio comprometidos a avanzar el Reino de Dios. Juntos, oramos, servimos y transformamos naciones.',
      joinTheArmyBenefit1: 'Ser parte de una red militante de creyentes',
      joinTheArmyBenefit2: 'Unirse a intercesores que oran por las naciones',
      joinTheArmyBenefit3: 'Transformar la sociedad a través de los principios del Reino',
      joinTheArmyBenefit4: 'Vivir tu destino profético',
      prophetBiography1: `Prophet (Dr) Isa El-Buba is a globally recognized prophetic voice, transformational leader, and apostolic reformer. He is the visionary behind Evangelical Biblical Outreach Ministries International (EBOMI), headquartered in Jos, Nigeria—a ministry dedicated to raising "Kingdom Ambassadors" who shape culture, rebuild nations, and manifest Godly influence in every sphere of human existence.

Known for his uncompromising stance on righteousness and his deep prophetic insights, Prophet Isa El-buba has spent over four decades pioneering spiritual and social awakening across the globe.

The Encounter: From Islam to the Cross
Born in Jos into a devout Muslim family, Prophet Isa’s life took a radical turn in 1982. Following a dramatic, supernatural encounter with Jesus Christ, he was delivered from deep Islamic occult involvement and commissioned into a life of Christian ministry. This powerful conversion remains the bedrock of his message: that the Gospel of Jesus Christ has the power to liberate any soul and transform any nation.

Ministry Philosophy & Global Impact
Prophet Isa’s ministry is defined by the "Radical Prophetic." His meetings are marked by the tangible presence of God, healing, and precise prophetic proclamations that steer the destinies of individuals and governments alike.

He carries a specific, divine burden for:

The Global Mission: Reaching the Muslim world with the authentic love and truth of Christ.

Spiritual Awakening: Equipping the Body of Christ to move beyond religion into supernatural kingdom assignments.

National Reform: Acting as a "Watchman" over Nigeria and the nations, calling leaders to accountability, justice, and godly governance.

A Catalyst for National Transformation
Beyond the pulpit, Prophet Isa is a fierce advocate for civic responsibility. He is the convener of the Initiative for a Better and Brighter Nigeria (IBBN). Through this movement, he mobilizes millions of citizens toward nation-building, credible leadership, and the pursuit of a righteous political landscape. His influence bridges the gap between the Church and the State, making him a sought-after voice for national peace and renewal.

Authorship & Global Media
A prolific communicator, Prophet Isa El-buba reaches millions through his televangelism broadcasts and published works. His books serve as manuals for spiritual warfare, leadership, and prophetic activation, ensuring that his mantle of wisdom is accessible to the next generation of believers worldwide.

Family & Legacy
Prophet Isa El-Buba is happily married to Pastor Choice Isa El-Buba, a pillar of strength and a co-laborer in the vision. Together, they are blessed with children and grandchildren who serve alongside them in the ministry. The El-Buba legacy is one of unwavering commitment to truth, spiritual authenticity, and the relentless pursuit of God’s purpose on earth.`,
      prophetBiography2: '',
      prophetBiography3: '',
      ourMinistriesDescription: 'EBOMI extiende su impacto a través de cuatro brazos estratégicos, cada uno dedicado a transformar vidas y comunidades',
    },
    common: {
      readMore: 'Leer más',
      learnMore: 'Saber más',
      visitWebsite: 'Visitar sitio web',
      readNow: 'Leer ahora',
      watchNow: 'Ver ahora',
      share: 'Compartir',
      submit: 'Enviar',
      cancel: 'Cancelar',
      close: 'Cerrar',
      search: 'Buscar',
      all: 'Todo',
      loading: 'Cargando...',
      noResults: 'No se encontraron resultados',
    },
    footer: {
      about: 'Ministerios Internacionales de Alcance Bíblico Evangélico - Un ministerio radical, profético y autoritario comprometido a difundir el Evangelio y transformar vidas.',
      quickLinks: 'Enlaces rápidos',
      headquarters: 'Sede',
      contactUs: 'Contáctanos',
      allRightsReserved: 'Todos los derechos reservados.',
    },
    branches: {
      title: 'Ramas EBOMI',
      subtitle: 'Encuentra una rama cerca de ti en Nigeria',
      searchPlaceholder: 'Buscar por estado o coordinador...',
      allBranches: 'Todas las ramas',
      coordinator: 'Coordinador',
      contact: 'Contacto',
    },
    give: {
      title: 'Da con',
      titleHighlight: 'Propósito',
      subtitle: 'Tu ofrenda es un acto de adoración y asociación para hacer avanzar el Reino de Dios. Cada contribución marca la diferencia.',
      secureEncrypted: 'Seguro y encriptado',
      sslProtected: 'Protegido SSL',
      waysToGive: 'Formas de dar',
      choosePartnership: 'Elige cómo quieres asociarte con nosotros',
      tithe: 'Diezmo',
      titheDescription: 'Honra al Señor con tus primicias. Tu diezmo apoya el trabajo continuo del ministerio.',
      titheBenefit1: 'Apoya las operaciones diarias del ministerio',
      titheBenefit2: 'Bendice la casa de Dios',
      titheBenefit3: 'Abre las ventanas del cielo',
      seed: 'Ofrenda de semilla',
      seedDescription: 'Planta una semilla de fe y mira a Dios multiplicarla. Las ofrendas de semilla apoyan proyectos especiales y alcances.',
      seedBenefit1: 'Apoya proyectos especiales',
      seedBenefit2: 'Financia programas de alcance',
      seedBenefit3: 'Multiplicado por la gracia de Dios',
      project: 'Apoyo a proyectos',
      projectDescription: 'Asóciate con nosotros en la construcción del reino. Apoya nuestros proyectos de construcción y desarrollo de infraestructura.',
      projectBenefit1: 'Construye infraestructura física',
      projectBenefit2: 'Expande el alcance del ministerio',
      projectBenefit3: 'Crea un legado duradero',
      giveButton: 'Dar',
      partnerTitle: 'Asóciate con nosotros',
      partnerDescription: 'Conviértete en un socio mensual y únete a una comunidad comprometida a transformar vidas a través del Evangelio. Tu asociación constante nos permite planificar y ejecutar iniciativas ministeriales a largo plazo.',
      partnerBenefit1: 'Beneficios de asociación mensual',
      partnerBenefit2: 'Actualizaciones regulares del ministerio',
      partnerBenefit3: 'Eventos especiales para socios',
      becomePartner: 'Convertirse en socio',
      paymentMethods: 'Métodos de pago aceptados',
      bankTransfer: 'Transferencia bancaria',
      creditDebitCard: 'Tarjeta de crédito/débito',
      mobileMoney: 'Dinero móvil',
      paypal: 'PayPal',
    },
    download: {
      title: 'Centro de descargas',
      subtitle: 'Accede a sermones, enseñanzas, música y recursos',
      searchPlaceholder: 'Buscar recursos...',
      allTypes: 'Todos los tipos',
      allCategories: 'Todas las categorías',
      sermons: 'Sermones',
      teachings: 'Enseñanzas',
      music: 'Música',
      books: 'Libros',
      accessResource: 'Acceder al recurso',
      noResourcesFound: 'No se encontraron recursos que coincidan con tus criterios.',
    },
    ebomiprays: {
      title: 'Únete a nosotros',
      subtitle: 'Envía tus peticiones de oración y comparte testimonios',
      submitPrayerRequest: 'Enviar petición de oración',
      testimonies: 'Testimonios',
      nameOptional: 'Nombre (Opcional)',
      emailOptional: 'Email (Opcional)',
      phoneOptional: 'Teléfono (Opcional)',
      category: 'Categoría',
      prayerRequest: 'Petición de oración',
      required: '*',
      submitButton: 'Enviar petición de oración',
      thankYou: '¡Gracias! Tu petición de oración ha sido enviada. Estaremos orando por ti.',
      prayerSubmitted: 'Petición de oración enviada',
      general: 'General',
      healing: 'Sanidad',
      breakthrough: 'Avance',
      family: 'Familia',
      finances: 'Finanzas',
      career: 'Carrera',
      spiritual: 'Crecimiento espiritual',
      shareTestimony: 'Comparte tu testimonio',
      shareTestimonyDescription: '¿Tienes un testimonio para compartir? Envíalo a través del formulario de petición de oración y lo agregaremos aquí!',
      shareTestimonyButton: 'Compartir testimonio',
    },
  },
  
  pt: {
    nav: {
      home: 'Início',
      aboutUs: 'Sobre nós',
      branches: 'Ramos EBOMI',
      gallery: 'Galeria',
      library: 'Biblioteca',
      resources: 'Recursos',
      joinUs: 'Junte-se a nós',
      visitTemple: 'Visite EBOMI',
    },
    home: {
      welcomeHome: 'BEM-VINDO AO LAR',
      welcomeMessage: 'Na EBOMI, cada coração encontra um lar, cada alma encontra amor, e cada vida é transformada pela Palavra de Deus.',
      upcomingEvent: 'Próximo evento',
      globalRevivalCongress: 'Congresso de Avivamento Global',
      theme: 'Tema',
      date: 'Data',
      location: 'Localização',
      registerNow: 'Registrar agora',
      limitedSeats: 'Assentos limitados disponíveis',
      propheticMondays: 'Segundas Proféticas',
      swipeToView: 'Deslize para ver mais',
      recentPrograms: 'Programas recentes',
      ebomiAnthem: 'HINO DA EBOMI',
      anthemText: [
        'Deus tem um exército marchando pela terra',
        'Libertação é nossa canção com cura em nossas mãos,',
        'Alegria eterna com regozijo em nossos corações',
        'Neste exército tenho uma parte',
        'O exército do Senhor está avançando',
      ],
      joinTheArmy: 'Junte-se ao Exército do Senhor',
      meetTheProphet: 'Conheça o Profeta',
      ourMinistries: 'Nossos Ministérios e Ramos',
      prophetsLibrary: 'Biblioteca do Profeta',
      transformYourLife: 'Transforme sua vida através de ensinamentos poderosos e insights proféticos',
      viewAllBooks: 'Ver todos os livros',
      shareTestimony: 'Compartilhe seu testemunho',
      testimonyDescription: 'Sua história da fidelidade de Deus pode inspirar e encorajar outros. Cada testemunho é uma declaração poderosa da bondade de Deus e um farol de esperança para aqueles que precisam.',
      inspireOthers: 'Inspirar outros',
      inspireDescription: 'Seu testemunho pode ser o encorajamento que alguém precisa para continuar crendo e avançando.',
      glorifyGod: 'Glorificar Deus',
      glorifyDescription: 'Dê glória a Deus pelo que Ele fez em sua vida e magnifique Seu nome.',
      buildFaith: 'Edificar a fé',
      buildFaithDescription: 'Ajude outros a crerem para seu próprio avanço e experimentarem a fidelidade de Deus.',
      joinUsInWorship: 'Junte-se a nós na adoração',
      serviceTimes: 'Horários de serviço',
      everyMonday: 'Toda segunda-feira: 15h',
      lastWeekOfMonth: 'Última semana de cada mês',
      everyday: 'Todos os dias: 21h WAT',
      watchOn: 'Assistir em:',
      ebomiTv: 'EBOMI.TV',
      ebomiTvDescription: 'Assista serviços ao vivo, acompanhe programas passados e mantenha-se conectado com ensinamentos poderosos e sessões de adoração de qualquer lugar do mundo.',
      liveNow: 'Ao vivo',
      onDemand: 'Sob demanda',
      weAreGodsArmy: 'Somos o Exército de Deus marchando pela terra.',
      intercessors: 'INTERCESSORES',
      nations: 'NAÇÕES',
      partners: 'PARCEIROS',
      branches: 'RAMOS',
      joinTheArmyDescription: 'Somos o Exército de Deus, marchando pela terra com libertação em nossa canção e cura em nossas mãos. Cada crente tem um papel a desempenhar neste grande movimento.',
      findBranchNearYou: 'Encontre um ramo perto de você',
      ebomiDescription: 'EBOMI é um movimento cristão interdenominacional e global de oração e alcance fundado pelo Profeta Isa El-Buba, com sede em Jos, Estado de Plateau, Nigéria. Sua missão inclui mobilizar, treinar, equipar e capacitar crentes, líderes e instituições para viver seus destinos proféticos; avançar o Reino de Deus através da intercessão, plantação de igrejas, evangelismo e desenvolvimento comunitário.',
      ebomiAimsTo: 'EBOMI visa:',
      ebomiAim1: 'Construir uma rede forte e militante de cristãos na política, mídia, finanças, governo, militar e a Igreja.',
      ebomiAim2: 'Libertar os crentes dos jugos religiosos e revelar as demandas do Reino como a chave para o sucesso e o avanço.',
      ebomiAim3: 'Levantar um exército de intercessores, que oram e intercedem pelas nações, e afetam a transformação na sociedade, política, educação, cultura e mais.',
      ebomiAim4: 'Promover a Unidade além das fronteiras denominacionais.',
      joinTheArmySecondParagraph: 'Quando você se junta ao EBOMI, você se torna parte de uma rede global de intercessores, líderes e agentes de mudança comprometidos em avançar o Reino de Deus. Juntos, oramos, servimos e transformamos nações.',
      joinTheArmyBenefit1: 'Fazer parte de uma rede militante de crentes',
      joinTheArmyBenefit2: 'Juntar-se a intercessores que oram pelas nações',
      joinTheArmyBenefit3: 'Transformar a sociedade através dos princípios do Reino',
      joinTheArmyBenefit4: 'Viver seu destino profético',
      prophetBiography1: `Prophet (Dr) Isa El-Buba is a globally recognized prophetic voice, transformational leader, and apostolic reformer. He is the visionary behind Evangelical Biblical Outreach Ministries International (EBOMI), headquartered in Jos, Nigeria—a ministry dedicated to raising "Kingdom Ambassadors" who shape culture, rebuild nations, and manifest Godly influence in every sphere of human existence.

Known for his uncompromising stance on righteousness and his deep prophetic insights, Prophet Isa El-buba has spent over four decades pioneering spiritual and social awakening across the globe.

The Encounter: From Islam to the Cross
Born in Jos into a devout Muslim family, Prophet Isa’s life took a radical turn in 1982. Following a dramatic, supernatural encounter with Jesus Christ, he was delivered from deep Islamic occult involvement and commissioned into a life of Christian ministry. This powerful conversion remains the bedrock of his message: that the Gospel of Jesus Christ has the power to liberate any soul and transform any nation.

Ministry Philosophy & Global Impact
Prophet Isa’s ministry is defined by the "Radical Prophetic." His meetings are marked by the tangible presence of God, healing, and precise prophetic proclamations that steer the destinies of individuals and governments alike.

He carries a specific, divine burden for:

The Global Mission: Reaching the Muslim world with the authentic love and truth of Christ.

Spiritual Awakening: Equipping the Body of Christ to move beyond religion into supernatural kingdom assignments.

National Reform: Acting as a "Watchman" over Nigeria and the nations, calling leaders to accountability, justice, and godly governance.

A Catalyst for National Transformation
Beyond the pulpit, Prophet Isa is a fierce advocate for civic responsibility. He is the convener of the Initiative for a Better and Brighter Nigeria (IBBN). Through this movement, he mobilizes millions of citizens toward nation-building, credible leadership, and the pursuit of a righteous political landscape. His influence bridges the gap between the Church and the State, making him a sought-after voice for national peace and renewal.

Authorship & Global Media
A prolific communicator, Prophet Isa El-buba reaches millions through his televangelism broadcasts and published works. His books serve as manuals for spiritual warfare, leadership, and prophetic activation, ensuring that his mantle of wisdom is accessible to the next generation of believers worldwide.

Family & Legacy
Prophet Isa El-Buba is happily married to Pastor Choice Isa El-Buba, a pillar of strength and a co-laborer in the vision. Together, they are blessed with children and grandchildren who serve alongside them in the ministry. The El-Buba legacy is one of unwavering commitment to truth, spiritual authenticity, and the relentless pursuit of God’s purpose on earth.`,
      prophetBiography2: '',
      prophetBiography3: '',
      ourMinistriesDescription: 'EBOMI estende seu impacto através de quatro braços estratégicos, cada um dedicado a transformar vidas e comunidades',
    },
    common: {
      readMore: 'Ler mais',
      learnMore: 'Saber mais',
      visitWebsite: 'Visitar site',
      readNow: 'Ler agora',
      watchNow: 'Assistir agora',
      share: 'Compartilhar',
      submit: 'Enviar',
      cancel: 'Cancelar',
      close: 'Fechar',
      search: 'Pesquisar',
      all: 'Tudo',
      loading: 'Carregando...',
      noResults: 'Nenhum resultado encontrado',
    },
    footer: defaultTranslations.footer,
    branches: defaultTranslations.branches,
    give: defaultTranslations.give,
    download: defaultTranslations.download,
    ebomiprays: defaultTranslations.ebomiprays,
  },
  
  ha: {
    nav: {
      home: 'Gida',
      aboutUs: 'Game da mu',
      branches: 'Rassan EBOMI',
      gallery: 'Hotuna',
      library: 'Laburare',
      resources: 'Albarkatu',
      joinUs: 'Ku shiga tare da mu',
      visitTemple: 'Ziyarci EBOMI',
    },
    home: {
      welcomeHome: 'BARKA DA GIDA',
      welcomeMessage: 'A EBOMI, kowane zuciya yana samun gida, kowane rai yana samun ƙauna, kuma kowane rayuwa yana canzawa ta Kalmar Allah.',
      upcomingEvent: 'Taron da zai zo',
      globalRevivalCongress: 'Majalisar Farkawa ta Duniya',
      theme: 'Jigo',
      date: 'Kwanan wata',
      location: 'Wuri',
      registerNow: 'Yi rajista yanzu',
      limitedSeats: 'Kujeru kaɗan ne ake da su',
      propheticMondays: 'Littattafan Annabawa',
      swipeToView: 'Matsa don ganin ƙari',
      recentPrograms: 'Shirye-shiryen kwanan nan',
      ebomiAnthem: 'WAƘAR EBOMI',
      anthemText: [
        'Allah yana da sojoji da ke tafiya cikin ƙasa',
        'Ceto shine waƙarmu tare da warkewa a hannayenmu,',
        'Farin ciki na har abada tare da farin ciki a cikin zukatanmu',
        'A cikin wannan sojoji ina da wani bangare',
        'Sojojin Ubangiji suna ci gaba',
      ],
      joinTheArmy: 'Shiga Sojojin Ubangiji',
      meetTheProphet: 'Haɗu da Annabi',
      ourMinistries: 'Iliminmu & Hannaye',
      prophetsLibrary: 'Laburaren Annabi',
      transformYourLife: 'Canza rayuwarka ta hanyar koyarwa mai ƙarfi da fahimtar annabawa',
      viewAllBooks: 'Duba duk littattafan',
      shareTestimony: 'Raba shaidarka',
      testimonyDescription: 'Labarin amincin Allah na iya ƙarfafa da ƙarfafa wasu. Kowane shaida shine sanarwa mai ƙarfi na alherin Allah kuma haske na bege ga waɗanda suke buƙata.',
      inspireOthers: 'Ƙarfafa wasu',
      inspireDescription: 'Shaidarka na iya zama ƙarfafawa wanda wani yake buƙata don ci gaba da gaskatawa da matsa gaba.',
      glorifyGod: 'Girman Allah',
      glorifyDescription: 'Ka ba Allah ɗaukaka don abin da Ya yi a rayuwarka kuma ka girma Sunansa.',
      buildFaith: 'Gina bangaskiya',
      buildFaithDescription: 'Taimaka wa wasu su yi imani don nasarar kansu kuma su ji amincin Allah.',
      joinUsInWorship: 'Ku shiga tare da mu cikin ibada',
      serviceTimes: 'Lokutan hidima',
      everyMonday: 'Kowane Litinin: 3PM',
      lastWeekOfMonth: 'Makon ƙarshe na kowane wata',
      everyday: 'Kowace rana: 9PM WAT',
      watchOn: 'Kallo akan:',
      ebomiTv: 'EBOMI.TV',
      ebomiTvDescription: 'Kalli ayyukan kai tsaye, ka koma kan shirye-shiryen da suka gabata, kuma ka ci gaba da haɗuwa da koyarwa mai ƙarfi da zaman ibada daga ko\'ina a duniya.',
      liveNow: 'Kai tsaye yanzu',
      onDemand: 'A kan buƙata',
      weAreGodsArmy: 'Mu ne Sojojin Allah da ke tafiya cikin ƙasa.',
      intercessors: 'MASU ADDU\'A',
      nations: 'AL\'UMMOMI',
      partners: 'ABOKAN HAUDAKA',
      branches: 'RASSA',
      joinTheArmyDescription: 'Mu ne Sojojin Allah, muna tafiya cikin ƙasa tare da ceto a cikin waƙarmu da warkewa a hannayenmu. Kowane mai bi yana da wani bangare da zai taka a cikin wannan babban motsi.',
      findBranchNearYou: 'Nemo reshe kusa da ku',
      ebomiDescription: 'EBOMI ƙungiya ce ta Kirista ta duniya ta addu\'a da wayarwa wacce Annabi Isa El-Buba ya kafa, tana da hedikwata a Jos, Jihar Plateau, Najeriya. Manufarta ta haɗa da tattarawa, horarwa, sanya kayan aiki, da ƙarfafa masu bi, shugabanni, da cibiyoyi don rayuwa da makomarsu ta annabawa; ci gaba da Mulkin Allah ta hanyar addu\'a, shuka coci, wa\'azi, da ci gaban al\'umma.',
      ebomiAimsTo: 'EBOMI tana nufin:',
      ebomiAim1: 'Gina ƙungiyar Kiristoci mai ƙarfi da gwagwarmaya a cikin siyasa, kafofin watsa labarai, kuɗi, gwamnati, soja, da Coci.',
      ebomiAim2: 'Yanci masu bi daga kullun addini kuma bayyana buƙatun Mulki a matsayin mabuɗin nasara da ci gaba.',
      ebomiAim3: 'Tada rundunar masu addu\'a, waɗanda suke addu\'a da yin addu\'a ga al\'ummomi, kuma suka shafi canji a cikin al\'umma, siyasa, ilimi, al\'ada da ƙari.',
      ebomiAim4: 'Inganta Haɗin Kai fiye da iyakokin ƙungiyoyin addini.',
      joinTheArmySecondParagraph: 'Lokacin da ka shiga EBOMI, ka zama wani ɓangare na hanyar sadarwa ta duniya na masu addu\'a, shugabanni, da masu canji waɗanda suke jajircewa wajen ci gaba da Mulkin Allah. Tare, muna addu\'a, muna hidima, kuma muna canza al\'ummomi.',
      joinTheArmyBenefit1: 'Kasance wani ɓangare na hanyar sadarwa ta gwagwarmaya na masu bi',
      joinTheArmyBenefit2: 'Shiga masu addu\'a waɗanda suke addu\'a ga al\'ummomi',
      joinTheArmyBenefit3: 'Canza al\'umma ta hanyar ka\'idojin Mulki',
      joinTheArmyBenefit4: 'Rayu da makomarka ta annabawa',
      prophetBiography1: `Prophet (Dr) Isa El-Buba is a globally recognized prophetic voice, transformational leader, and apostolic reformer. He is the visionary behind Evangelical Biblical Outreach Ministries International (EBOMI), headquartered in Jos, Nigeria—a ministry dedicated to raising "Kingdom Ambassadors" who shape culture, rebuild nations, and manifest Godly influence in every sphere of human existence.

Known for his uncompromising stance on righteousness and his deep prophetic insights, Prophet Isa El-buba has spent over four decades pioneering spiritual and social awakening across the globe.

The Encounter: From Islam to the Cross
Born in Jos into a devout Muslim family, Prophet Isa’s life took a radical turn in 1982. Following a dramatic, supernatural encounter with Jesus Christ, he was delivered from deep Islamic occult involvement and commissioned into a life of Christian ministry. This powerful conversion remains the bedrock of his message: that the Gospel of Jesus Christ has the power to liberate any soul and transform any nation.

Ministry Philosophy & Global Impact
Prophet Isa’s ministry is defined by the "Radical Prophetic." His meetings are marked by the tangible presence of God, healing, and precise prophetic proclamations that steer the destinies of individuals and governments alike.

He carries a specific, divine burden for:

The Global Mission: Reaching the Muslim world with the authentic love and truth of Christ.

Spiritual Awakening: Equipping the Body of Christ to move beyond religion into supernatural kingdom assignments.

National Reform: Acting as a "Watchman" over Nigeria and the nations, calling leaders to accountability, justice, and godly governance.

A Catalyst for National Transformation
Beyond the pulpit, Prophet Isa is a fierce advocate for civic responsibility. He is the convener of the Initiative for a Better and Brighter Nigeria (IBBN). Through this movement, he mobilizes millions of citizens toward nation-building, credible leadership, and the pursuit of a righteous political landscape. His influence bridges the gap between the Church and the State, making him a sought-after voice for national peace and renewal.

Authorship & Global Media
A prolific communicator, Prophet Isa El-buba reaches millions through his televangelism broadcasts and published works. His books serve as manuals for spiritual warfare, leadership, and prophetic activation, ensuring that his mantle of wisdom is accessible to the next generation of believers worldwide.

Family & Legacy
Prophet Isa El-Buba is happily married to Pastor Choice Isa El-Buba, a pillar of strength and a co-laborer in the vision. Together, they are blessed with children and grandchildren who serve alongside them in the ministry. The El-Buba legacy is one of unwavering commitment to truth, spiritual authenticity, and the relentless pursuit of God’s purpose on earth.`,
      prophetBiography2: '',
      prophetBiography3: '',
      ourMinistriesDescription: 'EBOMI tana faɗaɗa tasirinta ta hanyar hannaye huɗu na dabara, kowanne ya keɓe ga canza rayuwa da al\'ummomi',
    },
    common: {
      readMore: 'Karanta ƙari',
      learnMore: 'Koyi ƙari',
      visitWebsite: 'Ziyarci gidan yanar gizo',
      readNow: 'Karanta yanzu',
      watchNow: 'Kallo yanzu',
      share: 'Raba',
      submit: 'Tura',
      cancel: 'Soke',
      close: 'Rufe',
      search: 'Nema',
      all: 'Duka',
      loading: 'Ana lodawa...',
      noResults: 'Babu sakamako da aka samu',
    },
    footer: defaultTranslations.footer,
    branches: defaultTranslations.branches,
    give: defaultTranslations.give,
    download: defaultTranslations.download,
    ebomiprays: defaultTranslations.ebomiprays,
  },
  
  yo: {
    nav: {
      home: 'Ile',
      aboutUs: 'Nipa wa',
      branches: 'Awọn ẹka EBOMI',
      gallery: 'Awọn fọto',
      library: 'Ile-ikawe',
      resources: 'Awọn ohun elo',
      joinUs: 'Darapọ mọ wa',
      visitTemple: 'Wọ EBOMI',
    },
    home: {
      welcomeHome: 'KAABO SI ILE',
      welcomeMessage: 'Ni EBOMI, gbogbo ọkàn ri ile, gbogbo ọkàn ri ifẹ, ati pe gbogbo igbesi aye yipada nipasẹ Ọrọ Ọlọrun.',
      upcomingEvent: 'Iṣẹlẹ ti n bọ',
      globalRevivalCongress: 'Igbimọ Igbasilẹ Agbaye',
      theme: 'Akori',
      date: 'Ọjọ',
      location: 'Ibi',
      registerNow: 'Forukọsilẹ ni bayi',
      limitedSeats: 'Awọn ijoko ti o to ni o wa',
      propheticMondays: 'Awọn Ọjọ Ajọṣe',
      swipeToView: 'Fi pamọ lati wo diẹ sii',
      recentPrograms: 'Awọn Eto Tuntun',
      ebomiAnthem: 'ORIN EBOMI',
      anthemText: [
        'Ọlọrun ni ogun ti n rin kọja ilẹ',
        'Igbala ni orin wa pẹlu iwosan ni awọn ọwọ wa,',
        'Ayọ ti ko ni ipari pẹlu ayọ ni awọn ọkàn wa',
        'Ni ogun yii Mo ni apakan',
        'Ogun Oluwa n rin lọ',
      ],
      joinTheArmy: 'Darapọ mọ Ogun Oluwa',
      meetTheProphet: 'Pade Woli',
      ourMinistries: 'Awọn Ijọsin wa & Awọn Apa',
      prophetsLibrary: 'Ile-ikawe Woli',
      transformYourLife: 'Yipada igbesi aye rẹ nipasẹ awọn ẹkọ alagbara ati awọn imọ woli',
      viewAllBooks: 'Wo Gbogbo Awọn Iwe',
      shareTestimony: 'Pin Ijẹrisi rẹ',
      testimonyDescription: 'Itan rẹ ti igbagbọ Ọlọrun le mu awọn miiran ni okun ati mu wọn ni igboya. Gbogbo ijẹrisi jẹ ifihan alagbara ti oore Ọlọrun ati itọsọna irora fun awọn ti o nilo rẹ.',
      inspireOthers: 'Mu Awọn Miiran ni Okun',
      inspireDescription: 'Ijẹrisi rẹ le jẹ igboya ti ẹnikan nilo lati tẹsiwaju gbagbọ ati tẹsiwaju lọ siwaju.',
      glorifyGod: 'Bọ Ọlọrun',
      glorifyDescription: 'Fun Ọlọrun ni ogo fun ohun ti O ti ṣe ni igbesi aye rẹ ati gbega Orukọ Rẹ.',
      buildFaith: 'Kọ Igbagbọ',
      buildFaithDescription: 'Ran awọn miiran lọwọ lati gbagbọ fun aṣeyọri wọn ati gba igbagbọ Ọlọrun.',
      joinUsInWorship: 'Darapọ mọ wa ni Ijọsin',
      serviceTimes: 'Awọn Akoko Iṣẹ',
      everyMonday: 'Gboogbo Ọjọ Ajọṣe: 3PM',
      lastWeekOfMonth: 'Ọsẹ Ikẹhin ti Gbogbo Oṣu',
      everyday: 'Gboogbo Ọjọ: 9PM WAT',
      watchOn: 'Wo lori:',
      ebomiTv: 'EBOMI.TV',
      ebomiTvDescription: 'Wo awọn iṣẹ laifọwọyi, ṣe idasilẹ lori awọn eto ti o kọja, ki o si tẹsiwaju ni ibatan pẹlu awọn ẹkọ alagbara ati awọn akoko ijọsin lati ibikibi ni agbaye.',
      liveNow: 'Laifọwọyi ni bayi',
      onDemand: 'Lori ibeere',
      weAreGodsArmy: 'Awa ni Ogun Ọlọrun ti n rin kọja ilẹ.',
      intercessors: 'AWỌN OLUGBẸ',
      nations: 'ORILẸ-EDE',
      partners: 'AWỌN ALABAṢEPỌ',
      branches: 'AWỌN ẸKA',
      joinTheArmyDescription: 'Awa ni Ogun Ọlọrun, ti n rin kọja ilẹ pẹlu igbala ni orin wa ati iwosan ni awọn ọwọ wa. Gbogbo onigbagbọ ni apakan lati ṣe ni agbara yii.',
      findBranchNearYou: 'Wa Ẹka kan nitosi ọ',
      ebomiDescription: 'EBOMI jẹ iṣipopada Kristẹni ti aiyipada, ti agbaye ti adura ati iwọle ti Annabi Isa El-Buba ṣe da, ti o ni aaye aarin ni Jos, Ipinle Plateau, Naijiria. Ipa rẹ pẹlu gbigba, ikẹkọ, ikojọpọ, ati agbara awọn onigbagbọ, awọn oludari, ati awọn ile-ẹkọ lati gbe awọn ipinnu wọn jade; gbigbe Ijọba Ọlọrun siwaju nipasẹ adura, gbigbin ile-ẹkọ, iwosan, ati idagbasoke agbegbe.',
      ebomiAimsTo: 'EBOMI n gbero lati:',
      ebomiAim1: 'Kọ ẹgbẹ alagbara ati ogun ti awọn Kristẹni ni oselu, awọn oniroyin, owo, ijọba, ogun, ati Ijọ.',
      ebomiAim2: 'Dà onigbagbọ kuro lati awọn ihamọna esin ati fi awọn ibeere Ijọba han bi bọtini ti aṣeyọri ati ilọsiwaju.',
      ebomiAim3: 'Dide ogun awọn olugbe, ti n gbadura ati gbadura fun awọn orilẹ-ede, ati ṣe ayipada ni awujọ, oselu, ẹkọ, asa ati diẹ sii.',
      ebomiAim4: 'Ṣe agbega Iṣọkan kọja awọn aala aiyipada.',
      joinTheArmySecondParagraph: 'Nigba ti o ba darapọ mọ EBOMI, o di apakan ti ẹgbẹ agbaye ti awọn olugbe, awọn oludari, ati awọn oluyipada ti o ṣe igbẹkẹle lati gbe Ijọba Ọlọrun siwaju. Pẹlu, a n gbadura, a n sin, a si n yipada awọn orilẹ-ede.',
      joinTheArmyBenefit1: 'Di apakan ti ẹgbẹ ogun ti awọn onigbagbọ',
      joinTheArmyBenefit2: 'Darapọ mọ awọn olugbe ti n gbadura fun awọn orilẹ-ede',
      joinTheArmyBenefit3: 'Yipada awujọ nipasẹ awọn ofin Ijọba',
      joinTheArmyBenefit4: 'Gbe ipinnu woli rẹ jade',
      prophetBiography1: `Prophet (Dr) Isa El-Buba is a globally recognized prophetic voice, transformational leader, and apostolic reformer. He is the visionary behind Evangelical Biblical Outreach Ministries International (EBOMI), headquartered in Jos, Nigeria—a ministry dedicated to raising "Kingdom Ambassadors" who shape culture, rebuild nations, and manifest Godly influence in every sphere of human existence.

Known for his uncompromising stance on righteousness and his deep prophetic insights, Prophet Isa El-buba has spent over four decades pioneering spiritual and social awakening across the globe.

The Encounter: From Islam to the Cross
Born in Jos into a devout Muslim family, Prophet Isa’s life took a radical turn in 1982. Following a dramatic, supernatural encounter with Jesus Christ, he was delivered from deep Islamic occult involvement and commissioned into a life of Christian ministry. This powerful conversion remains the bedrock of his message: that the Gospel of Jesus Christ has the power to liberate any soul and transform any nation.

Ministry Philosophy & Global Impact
Prophet Isa’s ministry is defined by the "Radical Prophetic." His meetings are marked by the tangible presence of God, healing, and precise prophetic proclamations that steer the destinies of individuals and governments alike.

He carries a specific, divine burden for:

The Global Mission: Reaching the Muslim world with the authentic love and truth of Christ.

Spiritual Awakening: Equipping the Body of Christ to move beyond religion into supernatural kingdom assignments.

National Reform: Acting as a "Watchman" over Nigeria and the nations, calling leaders to accountability, justice, and godly governance.

A Catalyst for National Transformation
Beyond the pulpit, Prophet Isa is a fierce advocate for civic responsibility. He is the convener of the Initiative for a Better and Brighter Nigeria (IBBN). Through this movement, he mobilizes millions of citizens toward nation-building, credible leadership, and the pursuit of a righteous political landscape. His influence bridges the gap between the Church and the State, making him a sought-after voice for national peace and renewal.

Authorship & Global Media
A prolific communicator, Prophet Isa El-buba reaches millions through his televangelism broadcasts and published works. His books serve as manuals for spiritual warfare, leadership, and prophetic activation, ensuring that his mantle of wisdom is accessible to the next generation of believers worldwide.

Family & Legacy
Prophet Isa El-Buba is happily married to Pastor Choice Isa El-Buba, a pillar of strength and a co-laborer in the vision. Together, they are blessed with children and grandchildren who serve alongside them in the ministry. The El-Buba legacy is one of unwavering commitment to truth, spiritual authenticity, and the relentless pursuit of God’s purpose on earth.`,
      prophetBiography2: '',
      prophetBiography3: '',
      ourMinistriesDescription: 'EBOMI n fa ipa rẹ kọja awọn apa mẹrin ti ogbon, kọọkan ti o ṣe igbẹkẹle lati yipada awọn igbesi aye ati awọn agbegbe',
    },
    common: {
      readMore: 'Ka Diẹ Si',
      learnMore: 'Kọ ẹkọ diẹ sii',
      visitWebsite: 'Ṣabẹwo oju opo wẹẹbu',
      readNow: 'Ka ni bayi',
      watchNow: 'Wo ni bayi',
      share: 'Pin',
      submit: 'Fi ranṣẹ',
      cancel: 'Fagilee',
      close: 'Pa',
      search: 'Wa',
      all: 'Gbogbo',
      loading: 'O n lo...',
      noResults: 'Ko si awọn abajade ti a ri',
    },
    footer: defaultTranslations.footer,
    branches: defaultTranslations.branches,
    give: defaultTranslations.give,
    download: defaultTranslations.download,
    ebomiprays: defaultTranslations.ebomiprays,
  },
  
  ig: {
    nav: {
      home: 'Ụlọ',
      aboutUs: 'Banyere anyị',
      branches: 'Alaka EBOMI',
      gallery: 'Ihe osise',
      library: 'Ọbá akwụkwọ',
      resources: 'Akụrụngwa',
      joinUs: 'Sonye anyị',
      visitTemple: 'Gaa na EBOMI',
    },
    home: {
      welcomeHome: 'NNABATA N\'ỤLỌ',
      welcomeMessage: 'Na EBOMI, obi ọ bụla na-achọta ebe obibi, mkpụrụ obi ọ bụla na-achọta ịhụnanya, na ndụ ọ bụla na-agbanwe site n\'Okwu Chineke.',
      upcomingEvent: 'Ihe omume na-abịa',
      globalRevivalCongress: 'Nzukọ Mbilite n\'Ọnwụ Ụwa',
      theme: 'Isiokwu',
      date: 'Ụbọchị',
      location: 'Ebe',
      registerNow: 'Debanye aha ugbu a',
      limitedSeats: 'Oche dị obere',
      propheticMondays: 'Mọnde Amụma',
      swipeToView: 'Pịa ka ịhụ ọzọ',
      recentPrograms: 'Mmemme na-adịbeghị anya',
      ebomiAnthem: 'ABU EBOMI',
      anthemText: [
        'Chineke nwere ndị agha na-agagharị n\'ala',
        'Nnwere onwe bụ abụ anyị na ọgwụgwọ n\'aka anyị,',
        'Ọṅụ na-adịgide adịgide na ọṅụ n\'obi anyị',
        'N\'ime ndị agha a enwere m òkè',
        'Ndị agha nke Onyenwe anyị na-aga n\'ihu',
      ],
      joinTheArmy: 'Sonye ndị agha nke Onyenwe anyị',
      meetTheProphet: 'Zute Onye amụma',
      ourMinistries: 'Ozi anyị na Aka',
      prophetsLibrary: 'Ọbá akwụkwọ Onye amụma',
      transformYourLife: 'Gbanwee ndụ gị site na nkuzi dị ike na nghọta amụma',
      viewAllBooks: 'Lelee akwụkwọ niile',
      shareTestimony: 'Kesaa ihe àmà gị',
      testimonyDescription: 'Akụkọ gị banyere ikwesị ntụkwasị obi Chineke nwere ike ịkpali ma gbaa ndị ọzọ ume. Ihe àmà ọ bụla bụ nkwupụta dị ike nke ịdị mma Chineke na ihe ngosi olileanya maka ndị chọrọ ya.',
      inspireOthers: 'Kpalie ndị ọzọ',
      inspireDescription: 'Ihe àmà gị nwere ike ịbụ agbamume mmadụ chọrọ iji nọgide na-ekwere ma na-aga n\'ihu.',
      glorifyGod: 'Tọọ Chineke ùgwù',
      glorifyDescription: 'Nye Chineke otuto maka ihe O mere na ndụ gị ma bulie Aha Ya elu.',
      buildFaith: 'Wulie okwukwe',
      buildFaithDescription: 'Nyere ndị ọzọ aka ikwere maka ọganihu nke ha ma nweta ikwesị ntụkwasị obi Chineke.',
      joinUsInWorship: 'Sonye anyị n\'ofufe',
      serviceTimes: 'Oge ọrụ',
      everyMonday: 'Mọnde ọ bụla: 3PM',
      lastWeekOfMonth: 'Izu ikpeazụ nke ọnwa ọ bụla',
      everyday: 'Kwa ụbọchị: 9PM WAT',
      watchOn: 'Lelee na:',
      ebomiTv: 'EBOMI.TV',
      ebomiTvDescription: 'Lelee ọrụ ndị dị ndụ, megharịa na mmemme ndị gara aga, ma nọgide na-ejikọta na nkuzi dị ike na nnọkọ ofufe site n\'ebe ọ bụla n\'ụwa.',
      liveNow: 'Dị ndụ ugbu a',
      onDemand: 'N\'arịrịọ',
      weAreGodsArmy: 'Anyị bụ ndị agha Chineke na-agagharị n\'ala.',
      intercessors: 'NDỊ NA-ARỊỌ ARỊỌ',
      nations: 'MBA',
      partners: 'NDỊ MMẸKỌRỌTA',
      branches: 'ALAKA',
      joinTheArmyDescription: 'Anyị bụ ndị agha Chineke, na-agagharị n\'ala na nnwere onwe n\'abụ anyị na ọgwụgwọ n\'aka anyị. Onye kwere ekwe ọ bụla nwere òkè ịrụ na nnukwu mmegharị a.',
      findBranchNearYou: 'Chọta alaka dị nso gị',
      ebomiDescription: 'EBOMI bụ òtù Ndị Kraịst na-ekpe ekpere na mba ụwa nke Onye amụma Isa El-Buba hiwere, nke nwere isi ụlọ ọrụ na Jos, Plateau State, Nigeria. Ọrụ ya gụnyere ịchịkọta, ịzụ, ịkwadebe, na inye ndị kwere ekwe, ndị isi, na ụlọ ọrụ ike ka ha bie ọdịnihu amụma ha; ịkwalite Alaeze Chineke site na arịrịọ, ịkụ ụlọ ụka, izisa ozi ọma, na mmepe obodo.',
      ebomiAimsTo: 'EBOMI na-achọ:',
      ebomiAim1: 'Wulite netwọk siri ike na ndị agha nke ndị Kraịst na ndọrọ ndọrọ ọchịchị, mgbasa ozi, ego, gọọmentị, agha, na Chọọchị.',
      ebomiAim2: 'Tọhapụ ndị kwere ekwe pụọ na yok okpukpe ma kpughee ihe Alaeze chọrọ dị ka isi ihe maka ihe ịga nke ọma na ọganihu.',
      ebomiAim3: 'Zụlite ndị agha nke ndị na-ekpe ekpere, ndị na-ekpe ekpere ma na-ekpe ekpere maka mba, ma na-emetụta mgbanwe na ọha mmadụ, ndọrọ ndọrọ ọchịchị, agụmakwụkwọ, omenala na ndị ọzọ.',
      ebomiAim4: 'Kwalite Ịdị n\'otu karịa oke nke òtù okpukpe.',
      joinTheArmySecondParagraph: 'Mgbe ị sonyere EBOMI, ị ghọrọ akụkụ nke netwọk zuru ụwa ọnụ nke ndị na-ekpe ekpere, ndị isi, na ndị na-eme mgbanwe na-agba mbọ ịkwalite Alaeze Chineke. Ọnụ, anyị na-ekpe ekpere, anyị na-eje ozi, anyị na-agbanwe mba.',
      joinTheArmyBenefit1: 'Bụrụ akụkụ nke netwọk ndị agha nke ndị kwere ekwe',
      joinTheArmyBenefit2: 'Sonye ndị na-ekpe ekpere na-ekpe ekpere maka mba',
      joinTheArmyBenefit3: 'Gbanwee ọha mmadụ site na ụkpụrụ Alaeze',
      joinTheArmyBenefit4: 'Bie ọdịnihu amụma gị',
      prophetBiography1: `Prophet (Dr) Isa El-Buba is a globally recognized prophetic voice, transformational leader, and apostolic reformer. He is the visionary behind Evangelical Biblical Outreach Ministries International (EBOMI), headquartered in Jos, Nigeria—a ministry dedicated to raising "Kingdom Ambassadors" who shape culture, rebuild nations, and manifest Godly influence in every sphere of human existence.

Known for his uncompromising stance on righteousness and his deep prophetic insights, Prophet Isa El-buba has spent over four decades pioneering spiritual and social awakening across the globe.

The Encounter: From Islam to the Cross
Born in Jos into a devout Muslim family, Prophet Isa’s life took a radical turn in 1982. Following a dramatic, supernatural encounter with Jesus Christ, he was delivered from deep Islamic occult involvement and commissioned into a life of Christian ministry. This powerful conversion remains the bedrock of his message: that the Gospel of Jesus Christ has the power to liberate any soul and transform any nation.

Ministry Philosophy & Global Impact
Prophet Isa’s ministry is defined by the "Radical Prophetic." His meetings are marked by the tangible presence of God, healing, and precise prophetic proclamations that steer the destinies of individuals and governments alike.

He carries a specific, divine burden for:

The Global Mission: Reaching the Muslim world with the authentic love and truth of Christ.

Spiritual Awakening: Equipping the Body of Christ to move beyond religion into supernatural kingdom assignments.

National Reform: Acting as a "Watchman" over Nigeria and the nations, calling leaders to accountability, justice, and godly governance.

A Catalyst for National Transformation
Beyond the pulpit, Prophet Isa is a fierce advocate for civic responsibility. He is the convener of the Initiative for a Better and Brighter Nigeria (IBBN). Through this movement, he mobilizes millions of citizens toward nation-building, credible leadership, and the pursuit of a righteous political landscape. His influence bridges the gap between the Church and the State, making him a sought-after voice for national peace and renewal.

Authorship & Global Media
A prolific communicator, Prophet Isa El-buba reaches millions through his televangelism broadcasts and published works. His books serve as manuals for spiritual warfare, leadership, and prophetic activation, ensuring that his mantle of wisdom is accessible to the next generation of believers worldwide.

Family & Legacy
Prophet Isa El-Buba is happily married to Pastor Choice Isa El-Buba, a pillar of strength and a co-laborer in the vision. Together, they are blessed with children and grandchildren who serve alongside them in the ministry. The El-Buba legacy is one of unwavering commitment to truth, spiritual authenticity, and the relentless pursuit of God’s purpose on earth.`,
      prophetBiography2: '',
      prophetBiography3: '',
      ourMinistriesDescription: 'EBOMI na-agbasawanye mmetụta ya site na aka anọ dị mkpa, nke ọ bụla raara onwe ya nye ịgbanwe ndụ na obodo',
    },
    common: {
      readMore: 'Gụọ ọzọ',
      learnMore: 'Mụtakwuo',
      visitWebsite: 'Gaa na weebụsaịtị',
      readNow: 'Gụọ ugbu a',
      watchNow: 'Lelee ugbu a',
      share: 'Kesaa',
      submit: 'Nyefee',
      cancel: 'Kagbuo',
      close: 'Mechie',
      search: 'Chọọ',
      all: 'Niile',
      loading: 'Na-ebu...',
      noResults: 'Enweghị nsonaazụ achọtara',
    },
    footer: defaultTranslations.footer,
    branches: defaultTranslations.branches,
    give: defaultTranslations.give,
    download: defaultTranslations.download,
    ebomiprays: defaultTranslations.ebomiprays,
  },
  
  ff: {
    nav: {
      home: 'Galle',
      aboutUs: 'E hoore amen',
      branches: 'Laamorɗe EBOMI',
      gallery: 'Njaajeendi',
      library: 'Dawre',
      resources: 'Jokkondirɗe',
      joinUs: 'Naat e amen',
      visitTemple: 'Yah e EBOMI',
    },
    home: {
      welcomeHome: 'JAMMINGOL E GALLE',
      welcomeMessage: 'E EBOMI, kala bange nji galle, kala mangel nji yurmeende, e kala nguurndam yaltata e Konngol Alla.',
      upcomingEvent: 'Fedde nden',
      globalRevivalCongress: 'Fedde Ndenngal Aduna',
      theme: 'Tema',
      date: 'Ñalnde',
      location: 'Nokkuure',
      registerNow: 'Winndito jooni',
      limitedSeats: 'Dillooje limtiteeɗe',
      propheticMondays: 'Talaata Annabaaɓe',
      swipeToView: 'Doolto ngam yi\'de ɓeydude',
      recentPrograms: 'Fedde cakkitiingol',
      ebomiAnthem: 'YIMRE EBOMI',
      anthemText: [
        'Alla woodi soldaaji ɗiɗi njaayoo e leydi',
        'Ndenngal ko ɗiɗam ngam alaa e juuɗe amen,',
        'Weltere laatoo e weltere e ɓerɗe amen',
        'E soldaaji ɗoo am woodi fannu',
        'Soldaaji Joomi ɗi njaayoo',
      ],
      joinTheArmy: 'Naatu e Soldaaji Joomi',
      meetTheProphet: 'Humpito Annabaa',
      ourMinistries: 'Fedde Amen & Juuɗe',
      prophetsLibrary: 'Dawre Annabaa',
      transformYourLife: 'Waylu nguurndam maa e jokke ɗiɗi caggal e fahamde annabaa',
      viewAllBooks: 'Yi\'de Deftere fof',
      shareTestimony: 'Udditoo Seedam Ma',
      testimonyDescription: 'Tawtore maa e seedam Alla naa waawi jokkondirde e jokkondirde go\'o. Seedam kala ko seedam caggal ɗiɗi e moƴƴere Alla e jantol ngol ngam ɓe ɗiɗi njiɗi.',
      inspireOthers: 'Jokkondir Go\'o',
      inspireDescription: 'Seedam maa naa waawi jokkondirde go\'o njiɗi ngam tawtore e jokkondirde.',
      glorifyGod: 'Yettinde Alla',
      glorifyDescription: 'Okka Alla yettinde ngam ko O waɗi e nguurndam maa e mawninde Innde Makko.',
      buildFaith: 'Maajinde Seedam',
      buildFaithDescription: 'Wallit go\'o ngam seedde ngam fedde mum e anndude seedam Alla.',
      joinUsInWorship: 'Naatu e Amen e Rewde',
      serviceTimes: 'Wakkatirɗe Fedde',
      everyMonday: 'Talaata kala: 3PM',
      lastWeekOfMonth: 'Leyre Cakkitiingol Lewru Kala',
      everyday: 'Ñalnde kala: 9PM WAT',
      watchOn: 'Yi\'de e:',
      ebomiTv: 'EBOMI.TV',
      ebomiTvDescription: 'Yi\'de fedde laifowo, rutto e fedde cakkitiingol, e tawtore e jokke ɗiɗi caggal e fedde rewde e hakkunde nder leydi.',
      liveNow: 'Laifowo jooni',
      onDemand: 'E jokkondirde',
      weAreGodsArmy: 'Amen ko Soldaaji Alla ɗi njaayoo e leydi.',
      intercessors: 'GO\'O JOKKONDIRDE',
      nations: 'LEYDII',
      partners: 'GO\'O JOKKONDIRDE',
      branches: 'LAAMORɗE',
      joinTheArmyDescription: 'Amen ko Soldaaji Alla, men njaayoo e leydi e ndenngal e ɗiɗam amen e alaa e juuɗe amen. Kala jokkondirɗo woodi fannu e fedde mawnɗe ɗoo.',
      findBranchNearYou: 'Yi\'de laamorɗe nder ɓeyngu maa',
      ebomiDescription: 'EBOMI ko fedde Kristanaaɓe nder aduna, jokkondirde e jokkondirde ti Annabaa Isa El-Buba waɗi, ti woodi nokkuure maɓɓe e Jos, Leydi Plateau, Naajeeriya. Fedde makko ina jokkondirde, jokke, wallitde, e agbara jokkondirɓe, kolluɓe, e fedde ngam gbeede fedde annabaa mum; jokkondirde Ijọba Alla e jokke, gbinnde suka, wa\'azi, e jokkondirde leydi.',
      ebomiAimsTo: 'EBOMI njiɗi:',
      ebomiAim1: 'Maajinde ɗiɗam jokkondirɗe e Kristanaaɓe e siyasa, kafofin watsa labarai, kuɗi, ijọba, soja, e Ijọ.',
      ebomiAim2: 'Yancin jokkondirɓe e kullun addini e fiinde buɓɓe Ijọba han a matsayin mabuɗin nasara e jokkondirde.',
      ebomiAim3: 'Dide soldaaji jokkondirɓe, ɓe jokkondirde e jokkondirde e leydii, e wallitde canji e leydi, siyasa, jangde, asal, e ɓeydude.',
      ebomiAim4: 'Jokkondirde Haɗin Kai fiye e iyakokin ɗiɗam addini.',
      joinTheArmySecondParagraph: 'Nde a naatu e EBOMI, a naatu e ɗiɗam aduna jokkondirɓe, kolluɓe, e wallitɓe canji ɓe jokkondirɗe jokkondirde Ijọba Alla. Pelle, men jokkondirde, men sin, men wallit leydii.',
      joinTheArmyBenefit1: 'Naatu e ɗiɗam jokkondirɗe e jokkondirɓe',
      joinTheArmyBenefit2: 'Naatu e jokkondirɓe ɓe jokkondirde e leydii',
      joinTheArmyBenefit3: 'Wallit leydi e jokke Ijọba',
      joinTheArmyBenefit4: 'Gbeede fedde annabaa maa',
      prophetBiography1: `Prophet (Dr) Isa El-Buba is a globally recognized prophetic voice, transformational leader, and apostolic reformer. He is the visionary behind Evangelical Biblical Outreach Ministries International (EBOMI), headquartered in Jos, Nigeria—a ministry dedicated to raising "Kingdom Ambassadors" who shape culture, rebuild nations, and manifest Godly influence in every sphere of human existence.

Known for his uncompromising stance on righteousness and his deep prophetic insights, Prophet Isa El-buba has spent over four decades pioneering spiritual and social awakening across the globe.

The Encounter: From Islam to the Cross
Born in Jos into a devout Muslim family, Prophet Isa’s life took a radical turn in 1982. Following a dramatic, supernatural encounter with Jesus Christ, he was delivered from deep Islamic occult involvement and commissioned into a life of Christian ministry. This powerful conversion remains the bedrock of his message: that the Gospel of Jesus Christ has the power to liberate any soul and transform any nation.

Ministry Philosophy & Global Impact
Prophet Isa’s ministry is defined by the "Radical Prophetic." His meetings are marked by the tangible presence of God, healing, and precise prophetic proclamations that steer the destinies of individuals and governments alike.

He carries a specific, divine burden for:

The Global Mission: Reaching the Muslim world with the authentic love and truth of Christ.

Spiritual Awakening: Equipping the Body of Christ to move beyond religion into supernatural kingdom assignments.

National Reform: Acting as a "Watchman" over Nigeria and the nations, calling leaders to accountability, justice, and godly governance.

A Catalyst for National Transformation
Beyond the pulpit, Prophet Isa is a fierce advocate for civic responsibility. He is the convener of the Initiative for a Better and Brighter Nigeria (IBBN). Through this movement, he mobilizes millions of citizens toward nation-building, credible leadership, and the pursuit of a righteous political landscape. His influence bridges the gap between the Church and the State, making him a sought-after voice for national peace and renewal.

Authorship & Global Media
A prolific communicator, Prophet Isa El-buba reaches millions through his televangelism broadcasts and published works. His books serve as manuals for spiritual warfare, leadership, and prophetic activation, ensuring that his mantle of wisdom is accessible to the next generation of believers worldwide.

Family & Legacy
Prophet Isa El-Buba is happily married to Pastor Choice Isa El-Buba, a pillar of strength and a co-laborer in the vision. Together, they are blessed with children and grandchildren who serve alongside them in the ministry. The El-Buba legacy is one of unwavering commitment to truth, spiritual authenticity, and the relentless pursuit of God’s purpose on earth.`,
      prophetBiography2: '',
      prophetBiography3: '',
      ourMinistriesDescription: 'EBOMI faɗaɗa tasir makko e juuɗe nayi naatirɗe, kala jokkondirɗe e fedde e wallitde nguurndam e leydi',
    },
    common: {
      readMore: 'Jang ɓeydude',
      learnMore: 'Ɓeydu ɓeydude',
      visitWebsite: 'Yah e lowre',
      readNow: 'Jang jooni',
      watchNow: 'Yi\' jooni',
      share: 'Uddit',
      submit: 'Naatnude',
      cancel: 'Haaltinde',
      close: 'Uddunde',
      search: 'Yi\'de',
      all: 'Fof',
      loading: 'Njaayoo...',
      noResults: 'Alaa yi\'de ɓeydude',
    },
    footer: defaultTranslations.footer,
    branches: defaultTranslations.branches,
    give: defaultTranslations.give,
    download: defaultTranslations.download,
    ebomiprays: defaultTranslations.ebomiprays,
  },
  
  ar: {
    nav: {
      home: 'الرئيسية',
      aboutUs: 'من نحن',
      branches: 'فروع إيبومي',
      gallery: 'المعرض',
      library: 'المكتبة',
      resources: 'الموارد',
      joinUs: 'انضم إلينا',
      visitTemple: 'زيارة إيبومي',
    },
    home: {
      welcomeHome: 'مرحباً بك في البيت',
      welcomeMessage: 'في إيبومي، كل قلب يجد بيتاً، كل روح تجد حباً، وكل حياة تتغير بكلمة الله.',
      upcomingEvent: 'الحدث القادم',
      globalRevivalCongress: 'مؤتمر الصحوة العالمية',
      theme: 'الموضوع',
      date: 'التاريخ',
      location: 'الموقع',
      registerNow: 'سجل الآن',
      limitedSeats: 'مقاعد محدودة متاحة',
      propheticMondays: 'الإثنين النبوية',
      swipeToView: 'اسحب لعرض المزيد',
      recentPrograms: 'البرامج الأخيرة',
      ebomiAnthem: 'نشيد إيبومي',
      anthemText: [
        'لله جيش يسير في الأرض',
        'التحرير هو أغانينا مع الشفاء في أيدينا،',
        'فرح أبدي مع بهجة في قلوبنا',
        'في هذا الجيش لي جزء',
        'جيش الرب يسير قدماً',
      ],
      joinTheArmy: 'انضم إلى جيش الرب',
      meetTheProphet: 'التق بالنبي',
      ourMinistries: 'خدماتنا وأذرعنا',
      prophetsLibrary: 'مكتبة النبي',
      transformYourLife: 'غيّر حياتك من خلال تعاليم قوية ورؤى نبوية',
      viewAllBooks: 'عرض جميع الكتب',
      shareTestimony: 'شارك شهادتك',
      testimonyDescription: 'قصتك عن أمانة الله يمكن أن تلهم وتشجع الآخرين. كل شهادة هي إعلان قوي عن صلاح الله ومنارة أمل لمن يحتاجها.',
      inspireOthers: 'ألهم الآخرين',
      inspireDescription: 'شهادتك يمكن أن تكون التشجيع الذي يحتاجه شخص ما للاستمرار في الإيمان والمضي قدماً.',
      glorifyGod: 'مجّد الله',
      glorifyDescription: 'أعطِ الله المجد لما فعله في حياتك وعظّم اسمه.',
      buildFaith: 'ابنِ الإيمان',
      buildFaithDescription: 'ساعد الآخرين على الإيمان لتحقيقهم الخاص وتجربة أمانة الله.',
      joinUsInWorship: 'انضم إلينا في العبادة',
      serviceTimes: 'أوقات الخدمة',
      everyMonday: 'كل يوم إثنين: 3 مساءً',
      lastWeekOfMonth: 'الأسبوع الأخير من كل شهر',
      everyday: 'كل يوم: 9 مساءً بتوقيت غرب أفريقيا',
      watchOn: 'شاهد على:',
      ebomiTv: 'EBOMI.TV',
      ebomiTvDescription: 'شاهد الخدمات المباشرة، وتابع البرامج السابقة، وابق على اتصال مع تعاليم قوية وجلسات عبادة من أي مكان في العالم.',
      liveNow: 'مباشر الآن',
      onDemand: 'عند الطلب',
      weAreGodsArmy: 'نحن جيش الله يسير في الأرض.',
      intercessors: 'المشفعون',
      nations: 'الأمم',
      partners: 'الشركاء',
      branches: 'الفروع',
      joinTheArmyDescription: 'نحن جيش الله، نسير في الأرض مع التحرير في أغانينا والشفاء في أيدينا. لكل مؤمن دور يلعبه في هذه الحركة العظيمة.',
      findBranchNearYou: 'ابحث عن فرع قريب منك',
      ebomiDescription: 'EBOMI هي حركة صلاة وتبشير مسيحية عالمية بين الطوائف أسسها النبي عيسى البوبا، ومقرها في جوس، ولاية بلاتو، نيجيريا. تشمل مهمتها حشد وتدريب وتجهيز وتمكين المؤمنين والقادة والمؤسسات ليعيشوا مصائرهم النبوية؛ تعزيز ملكوت الله من خلال الشفاعة وزرع الكنائس والتبشير والتنمية المجتمعية.',
      ebomiAimsTo: 'تهدف EBOMI إلى:',
      ebomiAim1: 'بناء شبكة قوية ومقاتلة من المسيحيين في السياسة والإعلام والمالية والحكومة والعسكرية والكنيسة.',
      ebomiAim2: 'تحرير المؤمنين من نير الديني وكشف مطالب المملكة كمفتاح للنجاح والتقدم.',
      ebomiAim3: 'رفع جيش من الشفعاء الذين يصلون ويتشفعون من أجل الأمم ويؤثرون على التحول في المجتمع والسياسة والتعليم والثقافة والمزيد.',
      ebomiAim4: 'تعزيز الوحدة خارج الحدود الطائفية.',
      joinTheArmySecondParagraph: 'عندما تنضم إلى EBOMI، تصبح جزءًا من شبكة عالمية من الشفعاء والقادة وصانعي التغيير الملتزمين بتعزيز ملكوت الله. معًا، نصلي ونخدم ونحول الأمم.',
      joinTheArmyBenefit1: 'كن جزءًا من شبكة مقاتلة من المؤمنين',
      joinTheArmyBenefit2: 'انضم إلى الشفعاء الذين يصلون من أجل الأمم',
      joinTheArmyBenefit3: 'تحويل المجتمع من خلال مبادئ المملكة',
      joinTheArmyBenefit4: 'عش مصيرك النبوي',
      prophetBiography1: `Prophet (Dr) Isa El-Buba is a globally recognized prophetic voice, transformational leader, and apostolic reformer. He is the visionary behind Evangelical Biblical Outreach Ministries International (EBOMI), headquartered in Jos, Nigeria—a ministry dedicated to raising "Kingdom Ambassadors" who shape culture, rebuild nations, and manifest Godly influence in every sphere of human existence.

Known for his uncompromising stance on righteousness and his deep prophetic insights, Prophet Isa El-buba has spent over four decades pioneering spiritual and social awakening across the globe.

The Encounter: From Islam to the Cross
Born in Jos into a devout Muslim family, Prophet Isa’s life took a radical turn in 1982. Following a dramatic, supernatural encounter with Jesus Christ, he was delivered from deep Islamic occult involvement and commissioned into a life of Christian ministry. This powerful conversion remains the bedrock of his message: that the Gospel of Jesus Christ has the power to liberate any soul and transform any nation.

Ministry Philosophy & Global Impact
Prophet Isa’s ministry is defined by the "Radical Prophetic." His meetings are marked by the tangible presence of God, healing, and precise prophetic proclamations that steer the destinies of individuals and governments alike.

He carries a specific, divine burden for:

The Global Mission: Reaching the Muslim world with the authentic love and truth of Christ.

Spiritual Awakening: Equipping the Body of Christ to move beyond religion into supernatural kingdom assignments.

National Reform: Acting as a "Watchman" over Nigeria and the nations, calling leaders to accountability, justice, and godly governance.

A Catalyst for National Transformation
Beyond the pulpit, Prophet Isa is a fierce advocate for civic responsibility. He is the convener of the Initiative for a Better and Brighter Nigeria (IBBN). Through this movement, he mobilizes millions of citizens toward nation-building, credible leadership, and the pursuit of a righteous political landscape. His influence bridges the gap between the Church and the State, making him a sought-after voice for national peace and renewal.

Authorship & Global Media
A prolific communicator, Prophet Isa El-buba reaches millions through his televangelism broadcasts and published works. His books serve as manuals for spiritual warfare, leadership, and prophetic activation, ensuring that his mantle of wisdom is accessible to the next generation of believers worldwide.

Family & Legacy
Prophet Isa El-Buba is happily married to Pastor Choice Isa El-Buba, a pillar of strength and a co-laborer in the vision. Together, they are blessed with children and grandchildren who serve alongside them in the ministry. The El-Buba legacy is one of unwavering commitment to truth, spiritual authenticity, and the relentless pursuit of God’s purpose on earth.`,
      prophetBiography2: '',
      prophetBiography3: '',
      ourMinistriesDescription: 'تمتد EBOMI تأثيرها من خلال أربعة أذرع استراتيجية، كل منها مكرس لتحويل الأرواح والمجتمعات',
    },
    common: {
      readMore: 'اقرأ المزيد',
      learnMore: 'تعلم المزيد',
      visitWebsite: 'زر الموقع',
      readNow: 'اقرأ الآن',
      watchNow: 'شاهد الآن',
      share: 'شارك',
      submit: 'إرسال',
      cancel: 'إلغاء',
      close: 'إغلاق',
      search: 'بحث',
      all: 'الكل',
      loading: 'جاري التحميل...',
      noResults: 'لم يتم العثور على نتائج',
    },
    footer: defaultTranslations.footer,
    branches: defaultTranslations.branches,
    give: defaultTranslations.give,
    download: defaultTranslations.download,
    ebomiprays: defaultTranslations.ebomiprays,
  },
  
  zh: {
    nav: {
      home: '首页',
      aboutUs: '关于我们',
      branches: 'EBOMI 分会',
      gallery: '画廊',
      library: '图书馆',
      resources: '资源',
      joinUs: '加入我们',
      visitTemple: '参观 EBOMI',
    },
    home: {
      welcomeHome: '欢迎回家',
      welcomeMessage: '在EBOMI，每颗心都找到家，每个灵魂都找到爱，每个生命都因神的话语而改变。',
      upcomingEvent: '即将举行的活动',
      globalRevivalCongress: '全球复兴大会',
      theme: '主题',
      date: '日期',
      location: '地点',
      registerNow: '立即注册',
      limitedSeats: '座位有限',
      propheticMondays: '先知星期一',
      swipeToView: '滑动查看更多',
      recentPrograms: '最近的项目',
      ebomiAnthem: 'EBOMI 会歌',
      anthemText: [
        '神有一支军队行遍全地',
        '释放是我们的歌，医治在我们手中，',
        '永恒的喜乐在我们心中',
        '在这支军队中我有份',
        '主的军队正在前进',
      ],
      joinTheArmy: '加入主的军队',
      meetTheProphet: '认识先知',
      ourMinistries: '我们的事工和分支',
      prophetsLibrary: '先知图书馆',
      transformYourLife: '通过强有力的教导和先知性的洞察来改变你的生活',
      viewAllBooks: '查看所有书籍',
      shareTestimony: '分享你的见证',
      testimonyDescription: '你关于神信实的故事可以激励和鼓励他人。每个见证都是对神良善的有力宣告，也是为需要的人带来希望之光。',
      inspireOthers: '激励他人',
      inspireDescription: '你的见证可以成为某人继续相信和前进所需的鼓励。',
      glorifyGod: '荣耀神',
      glorifyDescription: '为神在你生命中所做的归荣耀给祂，并尊崇祂的名。',
      buildFaith: '建立信心',
      buildFaithDescription: '帮助他人相信自己的突破并体验神的信实。',
      joinUsInWorship: '加入我们的敬拜',
      serviceTimes: '服务时间',
      everyMonday: '每周一：下午3点',
      lastWeekOfMonth: '每月最后一周',
      everyday: '每天：西非时间晚上9点',
      watchOn: '观看平台：',
      ebomiTv: 'EBOMI.TV',
      ebomiTvDescription: '观看现场服务，回顾过去的节目，并通过强大的教导和敬拜聚会与世界任何地方保持联系。',
      liveNow: '正在直播',
      onDemand: '点播',
      weAreGodsArmy: '我们是神的军队，行遍全地。',
      intercessors: '代祷者',
      nations: '国家',
      partners: '合作伙伴',
      branches: '分会',
      joinTheArmyDescription: '我们是神的军队，行遍全地，释放是我们的歌，医治在我们手中。每个信徒在这个伟大的运动中都有份。',
      findBranchNearYou: '找到您附近的分会',
      ebomiDescription: 'EBOMI是由先知以撒·埃尔-布巴创立的跨宗派全球基督教祈祷和外展运动，总部位于尼日利亚高原州乔斯。其使命包括动员、培训、装备和授权信徒、领导人和机构活出他们的先知命运；通过代祷、植堂、传福音和社区发展推进神的国度。',
      ebomiAimsTo: 'EBOMI旨在：',
      ebomiAim1: '在政治、媒体、金融、政府、军队和教会中建立强大而战斗的基督徒网络。',
      ebomiAim2: '将信徒从宗教的轭中释放出来，揭示国度要求作为成功和进步的关键。',
      ebomiAim3: '建立一支代祷者的军队，为国家祈祷和代祷，并在社会、政治、教育、文化等方面影响转变。',
      ebomiAim4: '促进超越宗派界限的合一。',
      joinTheArmySecondParagraph: '当您加入EBOMI时，您成为致力于推进神国度的代祷者、领导人和变革者的全球网络的一部分。我们一起祈祷，一起服务，一起转变国家。',
      joinTheArmyBenefit1: '成为信徒战斗网络的一部分',
      joinTheArmyBenefit2: '加入为国家祈祷的代祷者',
      joinTheArmyBenefit3: '通过国度原则转变社会',
      joinTheArmyBenefit4: '活出您的先知命运',
      prophetBiography1: `Prophet (Dr) Isa El-Buba is a globally recognized prophetic voice, transformational leader, and apostolic reformer. He is the visionary behind Evangelical Biblical Outreach Ministries International (EBOMI), headquartered in Jos, Nigeria—a ministry dedicated to raising "Kingdom Ambassadors" who shape culture, rebuild nations, and manifest Godly influence in every sphere of human existence.

Known for his uncompromising stance on righteousness and his deep prophetic insights, Prophet Isa El-buba has spent over four decades pioneering spiritual and social awakening across the globe.

The Encounter: From Islam to the Cross
Born in Jos into a devout Muslim family, Prophet Isa’s life took a radical turn in 1982. Following a dramatic, supernatural encounter with Jesus Christ, he was delivered from deep Islamic occult involvement and commissioned into a life of Christian ministry. This powerful conversion remains the bedrock of his message: that the Gospel of Jesus Christ has the power to liberate any soul and transform any nation.

Ministry Philosophy & Global Impact
Prophet Isa’s ministry is defined by the "Radical Prophetic." His meetings are marked by the tangible presence of God, healing, and precise prophetic proclamations that steer the destinies of individuals and governments alike.

He carries a specific, divine burden for:

The Global Mission: Reaching the Muslim world with the authentic love and truth of Christ.

Spiritual Awakening: Equipping the Body of Christ to move beyond religion into supernatural kingdom assignments.

National Reform: Acting as a "Watchman" over Nigeria and the nations, calling leaders to accountability, justice, and godly governance.

A Catalyst for National Transformation
Beyond the pulpit, Prophet Isa is a fierce advocate for civic responsibility. He is the convener of the Initiative for a Better and Brighter Nigeria (IBBN). Through this movement, he mobilizes millions of citizens toward nation-building, credible leadership, and the pursuit of a righteous political landscape. His influence bridges the gap between the Church and the State, making him a sought-after voice for national peace and renewal.

Authorship & Global Media
A prolific communicator, Prophet Isa El-buba reaches millions through his televangelism broadcasts and published works. His books serve as manuals for spiritual warfare, leadership, and prophetic activation, ensuring that his mantle of wisdom is accessible to the next generation of believers worldwide.

Family & Legacy
Prophet Isa El-Buba is happily married to Pastor Choice Isa El-Buba, a pillar of strength and a co-laborer in the vision. Together, they are blessed with children and grandchildren who serve alongside them in the ministry. The El-Buba legacy is one of unwavering commitment to truth, spiritual authenticity, and the relentless pursuit of God’s purpose on earth.`,
      prophetBiography2: '',
      prophetBiography3: '',
      ourMinistriesDescription: 'EBOMI通过四个战略分支扩展其影响力，每个分支都致力于转变生命和社区',
    },
    common: {
      readMore: '阅读更多',
      learnMore: '了解更多',
      visitWebsite: '访问网站',
      readNow: '立即阅读',
      watchNow: '立即观看',
      share: '分享',
      submit: '提交',
      cancel: '取消',
      close: '关闭',
      search: '搜索',
      all: '全部',
      loading: '加载中...',
      noResults: '未找到结果',
    },
    footer: defaultTranslations.footer,
    branches: defaultTranslations.branches,
    give: defaultTranslations.give,
    download: defaultTranslations.download,
    ebomiprays: defaultTranslations.ebomiprays,
  },
  
  he: {
    nav: {
      home: 'בית',
      aboutUs: 'אודותינו',
      branches: 'סניפי EBOMI',
      gallery: 'גלריה',
      library: 'ספרייה',
      resources: 'משאבים',
      joinUs: 'הצטרף אלינו',
      visitTemple: 'בקר ב-EBOMI',
    },
    home: {
      welcomeHome: 'ברוך הבא הביתה',
      welcomeMessage: 'ב-EBOMI, כל לב מוצא בית, כל נפש מוצאת אהבה, וכל חיים משתנים על ידי דבר האלוהים.',
      upcomingEvent: 'אירוע קרוב',
      globalRevivalCongress: 'קונגרס התעוררות עולמי',
      theme: 'נושא',
      date: 'תאריך',
      location: 'מיקום',
      registerNow: 'הירשם עכשיו',
      limitedSeats: 'מושבים מוגבלים זמינים',
      propheticMondays: 'ימי שני נבואיים',
      swipeToView: 'גלול כדי לראות עוד',
      recentPrograms: 'תוכניות אחרונות',
      ebomiAnthem: 'המנון EBOMI',
      anthemText: [
        'לאלוהים יש צבא המתהלך בארץ',
        'גאולה היא השיר שלנו עם ריפוי בידינו,',
        'שמחה נצחית עם שמחה בלבבנו',
        'בצבא הזה יש לי חלק',
        'צבא ה\' מתקדם',
      ],
      joinTheArmy: 'הצטרף לצבא ה\'',
      meetTheProphet: 'פגוש את הנביא',
      ourMinistries: 'השירותים והזרועות שלנו',
      prophetsLibrary: 'ספריית הנביא',
      transformYourLife: 'שנה את חייך דרך תורות חזקות ותובנות נבואיות',
      viewAllBooks: 'צפה בכל הספרים',
      shareTestimony: 'שתף את עדותך',
      testimonyDescription: 'הסיפור שלך על נאמנות האלוהים יכול להשרות ולהעודד אחרים. כל עדות היא הצהרה חזקה על טוב האלוהים ומגדלור של תקווה למי שצריך.',
      inspireOthers: 'השראה לאחרים',
      inspireDescription: 'העדות שלך יכולה להיות העידוד שמישהו צריך כדי להמשיך להאמין ולהתקדם.',
      glorifyGod: 'פאר את האלוהים',
      glorifyDescription: 'תן לאלוהים את התהילה על מה שהוא עשה בחייך והגדל את שמו.',
      buildFaith: 'בנה אמונה',
      buildFaithDescription: 'עזור לאחרים להאמין לפריצת הדרך שלהם ולחוות את נאמנות האלוהים.',
      joinUsInWorship: 'הצטרף אלינו בפולחן',
      serviceTimes: 'זמני שירות',
      everyMonday: 'כל יום שני: 15:00',
      lastWeekOfMonth: 'השבוע האחרון של כל חודש',
      everyday: 'כל יום: 21:00 WAT',
      watchOn: 'צפה ב:',
      ebomiTv: 'EBOMI.TV',
      ebomiTvDescription: 'צפה בשירותים חיים, השלם תוכניות עבר והישאר מחובר עם תורות חזקות ופגישות פולחן מכל מקום בעולם.',
      liveNow: 'שידור חי עכשיו',
      onDemand: 'לפי דרישה',
      weAreGodsArmy: 'אנחנו צבא האלוהים המתהלך בארץ.',
      intercessors: 'מתפללים',
      nations: 'אומות',
      partners: 'שותפים',
      branches: 'סניפים',
      joinTheArmyDescription: 'אנחנו צבא האלוהים, מתהלכים בארץ עם גאולה בשיר שלנו וריפוי בידינו. לכל מאמין יש חלק לשחק בתנועה הגדולה הזו.',
      findBranchNearYou: 'מצא סניף קרוב אליך',
      ebomiDescription: 'EBOMI היא תנועה נוצרית בין-כיתתית גלובלית של תפילה והגעה שנוסדה על ידי הנביא איסא אל-בובה, שמרכזה בג\'וס, מדינת פלאטו, ניגריה. המשימה שלה כוללת גיוס, הכשרה, ציוד והעצמת מאמינים, מנהיגים ומוסדות לחיות את ייעודם הנבואי; קידום מלכות האלוהים דרך תפילה, נטיעת כנסיות, אוונגליזם ופיתוח קהילתי.',
      ebomiAimsTo: 'EBOMI שואפת ל:',
      ebomiAim1: 'בניית רשת חזקה ומיליטנטית של נוצרים בפוליטיקה, מדיה, פיננסים, ממשלה, צבא והכנסייה.',
      ebomiAim2: 'שחרור מאמינים מעול דתי וגילוי דרישות המלכות כמפתח להצלחה וקידום.',
      ebomiAim3: 'הקמת צבא של מתפללים, שמתפללים ומתפללים עבור אומות, ומשפיעים על שינוי בחברה, פוליטיקה, חינוך, תרבות ועוד.',
      ebomiAim4: 'קידום אחדות מעבר לגבולות כיתתיים.',
      joinTheArmySecondParagraph: 'כשאתה מצטרף ל-EBOMI, אתה הופך לחלק מרשת גלובלית של מתפללים, מנהיגים ועושי שינוי המחויבים לקידום מלכות האלוהים. יחד, אנו מתפללים, משרתים ומשנים אומות.',
      joinTheArmyBenefit1: 'היה חלק מרשת מיליטנטית של מאמינים',
      joinTheArmyBenefit2: 'הצטרף למתפללים שמתפללים עבור אומות',
      joinTheArmyBenefit3: 'שנה את החברה דרך עקרונות המלכות',
      joinTheArmyBenefit4: 'חיה את ייעודך הנבואי',
      prophetBiography1: `Prophet (Dr) Isa El-Buba is a globally recognized prophetic voice, transformational leader, and apostolic reformer. He is the visionary behind Evangelical Biblical Outreach Ministries International (EBOMI), headquartered in Jos, Nigeria—a ministry dedicated to raising "Kingdom Ambassadors" who shape culture, rebuild nations, and manifest Godly influence in every sphere of human existence.

Known for his uncompromising stance on righteousness and his deep prophetic insights, Prophet Isa El-buba has spent over four decades pioneering spiritual and social awakening across the globe.

The Encounter: From Islam to the Cross
Born in Jos into a devout Muslim family, Prophet Isa’s life took a radical turn in 1982. Following a dramatic, supernatural encounter with Jesus Christ, he was delivered from deep Islamic occult involvement and commissioned into a life of Christian ministry. This powerful conversion remains the bedrock of his message: that the Gospel of Jesus Christ has the power to liberate any soul and transform any nation.

Ministry Philosophy & Global Impact
Prophet Isa’s ministry is defined by the "Radical Prophetic." His meetings are marked by the tangible presence of God, healing, and precise prophetic proclamations that steer the destinies of individuals and governments alike.

He carries a specific, divine burden for:

The Global Mission: Reaching the Muslim world with the authentic love and truth of Christ.

Spiritual Awakening: Equipping the Body of Christ to move beyond religion into supernatural kingdom assignments.

National Reform: Acting as a "Watchman" over Nigeria and the nations, calling leaders to accountability, justice, and godly governance.

A Catalyst for National Transformation
Beyond the pulpit, Prophet Isa is a fierce advocate for civic responsibility. He is the convener of the Initiative for a Better and Brighter Nigeria (IBBN). Through this movement, he mobilizes millions of citizens toward nation-building, credible leadership, and the pursuit of a righteous political landscape. His influence bridges the gap between the Church and the State, making him a sought-after voice for national peace and renewal.

Authorship & Global Media
A prolific communicator, Prophet Isa El-buba reaches millions through his televangelism broadcasts and published works. His books serve as manuals for spiritual warfare, leadership, and prophetic activation, ensuring that his mantle of wisdom is accessible to the next generation of believers worldwide.

Family & Legacy
Prophet Isa El-Buba is happily married to Pastor Choice Isa El-Buba, a pillar of strength and a co-laborer in the vision. Together, they are blessed with children and grandchildren who serve alongside them in the ministry. The El-Buba legacy is one of unwavering commitment to truth, spiritual authenticity, and the relentless pursuit of God’s purpose on earth.`,
      prophetBiography2: '',
      prophetBiography3: '',
      ourMinistriesDescription: 'EBOMI מרחיבה את השפעתה דרך ארבעה זרועות אסטרטגיות, כל אחת מוקדשת לשינוי חיים וקהילות',
    },
    common: {
      readMore: 'קרא עוד',
      learnMore: 'למד עוד',
      visitWebsite: 'בקר באתר',
      readNow: 'קרא עכשיו',
      watchNow: 'צפה עכשיו',
      share: 'שתף',
      submit: 'שלח',
      cancel: 'בטל',
      close: 'סגור',
      search: 'חפש',
      all: 'הכל',
      loading: 'טוען...',
      noResults: 'לא נמצאו תוצאות',
    },
    footer: defaultTranslations.footer,
    branches: defaultTranslations.branches,
    give: defaultTranslations.give,
    download: defaultTranslations.download,
    ebomiprays: defaultTranslations.ebomiprays,
  },
  
  de: {
    nav: {
      home: 'Startseite',
      aboutUs: 'Über uns',
      branches: 'EBOMI Zweigstellen',
      gallery: 'Galerie',
      library: 'Bibliothek',
      resources: 'Ressourcen',
      joinUs: 'Tritt uns bei',
      visitTemple: 'Besuchen Sie EBOMI',
    },
    home: {
      welcomeHome: 'WILLKOMMEN ZU HAUSE',
      welcomeMessage: 'Bei EBOMI findet jedes Herz ein Zuhause, jede Seele findet Liebe, und jedes Leben wird durch das Wort Gottes verändert.',
      upcomingEvent: 'Bevorstehende Veranstaltung',
      globalRevivalCongress: 'Globaler Erweckungskongress',
      theme: 'Thema',
      date: 'Datum',
      location: 'Ort',
      registerNow: 'Jetzt registrieren',
      limitedSeats: 'Begrenzte Plätze verfügbar',
      propheticMondays: 'Prophetische Montage',
      swipeToView: 'Wischen, um mehr zu sehen',
      recentPrograms: 'Aktuelle Programme',
      ebomiAnthem: 'EBOMI HYMNUS',
      anthemText: [
        'Gott hat eine Armee, die durch das Land marschiert',
        'Befreiung ist unser Lied mit Heilung in unseren Händen,',
        'Ewige Freude mit Fröhlichkeit in unseren Herzen',
        'In dieser Armee habe ich einen Teil',
        'Die Armee des Herrn marschiert weiter',
      ],
      joinTheArmy: 'Tritt der Armee des Herrn bei',
      meetTheProphet: 'Triff den Propheten',
      ourMinistries: 'Unsere Dienste & Arme',
      prophetsLibrary: 'Bibliothek des Propheten',
      transformYourLife: 'Verwandle dein Leben durch kraftvolle Lehren und prophetische Einsichten',
      viewAllBooks: 'Alle Bücher anzeigen',
      shareTestimony: 'Teile dein Zeugnis',
      testimonyDescription: 'Deine Geschichte von Gottes Treue kann andere inspirieren und ermutigen. Jedes Zeugnis ist eine kraftvolle Erklärung von Gottes Güte und ein Leuchtfeuer der Hoffnung für die, die es brauchen.',
      inspireOthers: 'Andere inspirieren',
      inspireDescription: 'Dein Zeugnis kann die Ermutigung sein, die jemand braucht, um weiter zu glauben und voranzukommen.',
      glorifyGod: 'Gott verherrlichen',
      glorifyDescription: 'Gib Gott die Ehre für das, was Er in deinem Leben getan hat, und verherrliche Seinen Namen.',
      buildFaith: 'Glauben aufbauen',
      buildFaithDescription: 'Hilf anderen, für ihren eigenen Durchbruch zu glauben und Gottes Treue zu erfahren.',
      joinUsInWorship: 'Tritt uns im Gottesdienst bei',
      serviceTimes: 'Gottesdienstzeiten',
      everyMonday: 'Jeden Montag: 15 Uhr',
      lastWeekOfMonth: 'Letzte Woche jeden Monats',
      everyday: 'Täglich: 21 Uhr WAT',
      watchOn: 'Ansehen auf:',
      ebomiTv: 'EBOMI.TV',
      ebomiTvDescription: 'Sehen Sie Live-Dienste, holen Sie vergangene Programme nach und bleiben Sie mit kraftvollen Lehren und Anbetungssitzungen von überall auf der Welt verbunden.',
      liveNow: 'Jetzt live',
      onDemand: 'Auf Abruf',
      weAreGodsArmy: 'Wir sind die Armee Gottes, die durch das Land marschiert.',
      intercessors: 'FÜRBITTER',
      nations: 'NATIONEN',
      partners: 'PARTNER',
      branches: 'ZWEIGSTELLEN',
      joinTheArmyDescription: 'Wir sind die Armee Gottes, marschieren durch das Land mit Befreiung in unserem Lied und Heilung in unseren Händen. Jeder Gläubige hat einen Teil in dieser großen Bewegung zu spielen.',
      findBranchNearYou: 'Finden Sie eine Zweigstelle in Ihrer Nähe',
      ebomiDescription: 'EBOMI ist eine überkonfessionelle, globale christliche Gebets- und Evangelisationsbewegung, die vom Propheten Isa El-Buba gegründet wurde und ihren Hauptsitz in Jos, Plateau State, Nigeria hat. Ihre Mission umfasst die Mobilisierung, Ausbildung, Ausrüstung und Ermächtigung von Gläubigen, Leitern und Institutionen, um ihre prophetischen Bestimmungen zu leben; das Reich Gottes durch Fürbitte, Gemeindegründung, Evangelisation und Gemeindeentwicklung voranzutreiben.',
      ebomiAimsTo: 'EBOMI zielt darauf ab:',
      ebomiAim1: 'Ein starkes und militantes Netzwerk von Christen in Politik, Medien, Finanzen, Regierung, Militär und Kirche aufzubauen.',
      ebomiAim2: 'Gläubige von religiösen Jochen zu befreien und die Anforderungen des Reiches als Schlüssel zum Erfolg und Fortschritt zu offenbaren.',
      ebomiAim3: 'Eine Armee von Fürbittern aufzubauen, die für Nationen beten und Fürbitte tun und Transformation in Gesellschaft, Politik, Bildung, Kultur und mehr bewirken.',
      ebomiAim4: 'Einheit über konfessionelle Grenzen hinaus zu fördern.',
      joinTheArmySecondParagraph: 'Wenn Sie sich EBOMI anschließen, werden Sie Teil eines globalen Netzwerks von Fürbittern, Leitern und Veränderern, die sich der Förderung des Reiches Gottes verpflichtet haben. Zusammen beten wir, dienen wir und transformieren wir Nationen.',
      joinTheArmyBenefit1: 'Teil eines militanten Netzwerks von Gläubigen sein',
      joinTheArmyBenefit2: 'Schließen Sie sich Fürbittern an, die für Nationen beten',
      joinTheArmyBenefit3: 'Gesellschaft durch Reichsprinzipien transformieren',
      joinTheArmyBenefit4: 'Leben Sie Ihre prophetische Bestimmung aus',
      prophetBiography1: `Prophet (Dr) Isa El-Buba is a globally recognized prophetic voice, transformational leader, and apostolic reformer. He is the visionary behind Evangelical Biblical Outreach Ministries International (EBOMI), headquartered in Jos, Nigeria—a ministry dedicated to raising "Kingdom Ambassadors" who shape culture, rebuild nations, and manifest Godly influence in every sphere of human existence.

Known for his uncompromising stance on righteousness and his deep prophetic insights, Prophet Isa El-buba has spent over four decades pioneering spiritual and social awakening across the globe.

The Encounter: From Islam to the Cross
Born in Jos into a devout Muslim family, Prophet Isa’s life took a radical turn in 1982. Following a dramatic, supernatural encounter with Jesus Christ, he was delivered from deep Islamic occult involvement and commissioned into a life of Christian ministry. This powerful conversion remains the bedrock of his message: that the Gospel of Jesus Christ has the power to liberate any soul and transform any nation.

Ministry Philosophy & Global Impact
Prophet Isa’s ministry is defined by the "Radical Prophetic." His meetings are marked by the tangible presence of God, healing, and precise prophetic proclamations that steer the destinies of individuals and governments alike.

He carries a specific, divine burden for:

The Global Mission: Reaching the Muslim world with the authentic love and truth of Christ.

Spiritual Awakening: Equipping the Body of Christ to move beyond religion into supernatural kingdom assignments.

National Reform: Acting as a "Watchman" over Nigeria and the nations, calling leaders to accountability, justice, and godly governance.

A Catalyst for National Transformation
Beyond the pulpit, Prophet Isa is a fierce advocate for civic responsibility. He is the convener of the Initiative for a Better and Brighter Nigeria (IBBN). Through this movement, he mobilizes millions of citizens toward nation-building, credible leadership, and the pursuit of a righteous political landscape. His influence bridges the gap between the Church and the State, making him a sought-after voice for national peace and renewal.

Authorship & Global Media
A prolific communicator, Prophet Isa El-buba reaches millions through his televangelism broadcasts and published works. His books serve as manuals for spiritual warfare, leadership, and prophetic activation, ensuring that his mantle of wisdom is accessible to the next generation of believers worldwide.

Family & Legacy
Prophet Isa El-Buba is happily married to Pastor Choice Isa El-Buba, a pillar of strength and a co-laborer in the vision. Together, they are blessed with children and grandchildren who serve alongside them in the ministry. The El-Buba legacy is one of unwavering commitment to truth, spiritual authenticity, and the relentless pursuit of God’s purpose on earth.`,
      prophetBiography2: '',
      prophetBiography3: '',
      ourMinistriesDescription: 'EBOMI erweitert seine Wirkung durch vier strategische Arme, die jeweils dem Transformieren von Leben und Gemeinden gewidmet sind',
    },
    common: {
      readMore: 'Mehr lesen',
      learnMore: 'Mehr erfahren',
      visitWebsite: 'Website besuchen',
      readNow: 'Jetzt lesen',
      watchNow: 'Jetzt ansehen',
      share: 'Teilen',
      submit: 'Absenden',
      cancel: 'Abbrechen',
      close: 'Schließen',
      search: 'Suchen',
      all: 'Alle',
      loading: 'Lädt...',
      noResults: 'Keine Ergebnisse gefunden',
    },
    footer: defaultTranslations.footer,
    branches: defaultTranslations.branches,
    give: defaultTranslations.give,
    download: defaultTranslations.download,
    ebomiprays: defaultTranslations.ebomiprays,
  },
  
  hi: {
    nav: {
      home: 'होम',
      aboutUs: 'हमारे बारे में',
      branches: 'EBOMI शाखाएं',
      gallery: 'गैलरी',
      library: 'पुस्तकालय',
      resources: 'संसाधन',
      joinUs: 'हमसे जुड़ें',
      visitTemple: 'EBOMI पर जाएं',
    },
    home: {
      welcomeHome: 'घर में स्वागत है',
      welcomeMessage: 'EBOMI में, हर दिल को घर मिलता है, हर आत्मा को प्यार मिलता है, और हर जीवन परमेश्वर के वचन से बदल जाता है।',
      upcomingEvent: 'आगामी कार्यक्रम',
      globalRevivalCongress: 'वैश्विक पुनरुत्थान कांग्रेस',
      theme: 'विषय',
      date: 'तारीख',
      location: 'स्थान',
      registerNow: 'अभी पंजीकरण करें',
      limitedSeats: 'सीमित सीटें उपलब्ध',
      propheticMondays: 'भविष्यवाणी सोमवार',
      swipeToView: 'और देखने के लिए स्वाइप करें',
      recentPrograms: 'हाल के कार्यक्रम',
      ebomiAnthem: 'EBOMI गान',
      anthemText: [
        'परमेश्वर के पास एक सेना है जो धरती पर चल रही है',
        'मुक्ति हमारा गीत है जिसमें हमारे हाथों में चंगाई है,',
        'हमारे दिलों में खुशी के साथ अनंत आनंद',
        'इस सेना में मेरा हिस्सा है',
        'प्रभु की सेना आगे बढ़ रही है',
      ],
      joinTheArmy: 'प्रभु की सेना में शामिल हों',
      meetTheProphet: 'भविष्यद्वक्ता से मिलें',
      ourMinistries: 'हमारी सेवाएं और शाखाएं',
      prophetsLibrary: 'भविष्यद्वक्ता की पुस्तकालय',
      transformYourLife: 'शक्तिशाली शिक्षाओं और भविष्यवाणी की अंतर्दृष्टि के माध्यम से अपने जीवन को बदलें',
      viewAllBooks: 'सभी पुस्तकें देखें',
      shareTestimony: 'अपनी गवाही साझा करें',
      testimonyDescription: 'परमेश्वर की विश्वासयोग्यता के बारे में आपकी कहानी दूसरों को प्रेरित और प्रोत्साहित कर सकती है। हर गवाही परमेश्वर की भलाई की एक शक्तिशाली घोषणा है और जरूरतमंदों के लिए आशा की रोशनी है।',
      inspireOthers: 'दूसरों को प्रेरित करें',
      inspireDescription: 'आपकी गवाही किसी के लिए विश्वास करना जारी रखने और आगे बढ़ने के लिए आवश्यक प्रोत्साहन हो सकती है।',
      glorifyGod: 'परमेश्वर की महिमा करें',
      glorifyDescription: 'परमेश्वर को आपके जीवन में जो किया है उसके लिए महिमा दें और उसके नाम को बढ़ाएं।',
      buildFaith: 'विश्वास बनाएं',
      buildFaithDescription: 'दूसरों को अपने सफलता के लिए विश्वास करने और परमेश्वर की विश्वासयोग्यता का अनुभव करने में मदद करें।',
      joinUsInWorship: 'हमारे साथ आराधना में शामिल हों',
      serviceTimes: 'सेवा समय',
      everyMonday: 'हर सोमवार: दोपहर 3 बजे',
      lastWeekOfMonth: 'हर महीने का अंतिम सप्ताह',
      everyday: 'हर दिन: रात 9 बजे WAT',
      watchOn: 'देखें:',
      ebomiTv: 'EBOMI.TV',
      ebomiTvDescription: 'लाइव सेवाएं देखें, पिछले कार्यक्रमों को पकड़ें, और दुनिया में कहीं से भी शक्तिशाली शिक्षाओं और आराधना सत्रों के साथ जुड़े रहें।',
      liveNow: 'अभी लाइव',
      onDemand: 'मांग पर',
      weAreGodsArmy: 'हम परमेश्वर की सेना हैं जो धरती पर चल रही है।',
      intercessors: 'मध्यस्थ',
      nations: 'राष्ट्र',
      partners: 'साझेदार',
      branches: 'शाखाएं',
      joinTheArmyDescription: 'हम परमेश्वर की सेना हैं, धरती पर चल रहे हैं जिसमें हमारे गीत में मुक्ति है और हमारे हाथों में चंगाई है। इस महान आंदोलन में हर विश्वासी का एक हिस्सा है।',
      findBranchNearYou: 'अपने पास एक शाखा खोजें',
      ebomiDescription: 'EBOMI एक अंतर-संप्रदायिक, वैश्विक ईसाई प्रार्थना और आउटरीच आंदोलन है जिसकी स्थापना पैगंबर इसा अल-बुबा ने की थी, जिसका मुख्यालय जोस, पठार राज्य, नाइजीरिया में है। इसका मिशन विश्वासियों, नेताओं और संस्थानों को उनकी भविष्यवाणी की नियति को जीने के लिए जुटाना, प्रशिक्षित करना, सुसज्जित करना और सशक्त बनाना शामिल है; प्रार्थना, चर्च रोपण, सुसमाचार प्रचार और सामुदायिक विकास के माध्यम से परमेश्वर के राज्य को आगे बढ़ाना।',
      ebomiAimsTo: 'EBOMI का लक्ष्य है:',
      ebomiAim1: 'राजनीति, मीडिया, वित्त, सरकार, सैन्य और चर्च में ईसाइयों का एक मजबूत और सैन्य नेटवर्क बनाना।',
      ebomiAim2: 'विश्वासियों को धार्मिक जुए से मुक्त करना और सफलता और प्रगति की कुंजी के रूप में राज्य की मांगों को प्रकट करना।',
      ebomiAim3: 'मध्यस्थों की एक सेना खड़ी करना, जो राष्ट्रों के लिए प्रार्थना करते हैं और मध्यस्थता करते हैं, और समाज, राजनीति, शिक्षा, संस्कृति और अधिक में परिवर्तन को प्रभावित करते हैं।',
      ebomiAim4: 'संप्रदायिक सीमाओं से परे एकता को बढ़ावा देना।',
      joinTheArmySecondParagraph: 'जब आप EBOMI में शामिल होते हैं, तो आप परमेश्वर के राज्य को आगे बढ़ाने के लिए प्रतिबद्ध मध्यस्थों, नेताओं और परिवर्तनकारियों के वैश्विक नेटवर्क का हिस्सा बन जाते हैं। एक साथ, हम प्रार्थना करते हैं, हम सेवा करते हैं, और हम राष्ट्रों को बदलते हैं।',
      joinTheArmyBenefit1: 'विश्वासियों के सैन्य नेटवर्क का हिस्सा बनें',
      joinTheArmyBenefit2: 'राष्ट्रों के लिए प्रार्थना करने वाले मध्यस्थों में शामिल हों',
      joinTheArmyBenefit3: 'राज्य सिद्धांतों के माध्यम से समाज को बदलें',
      joinTheArmyBenefit4: 'अपनी भविष्यवाणी की नियति को जीएं',
      prophetBiography1: `Prophet (Dr) Isa El-Buba is a globally recognized prophetic voice, transformational leader, and apostolic reformer. He is the visionary behind Evangelical Biblical Outreach Ministries International (EBOMI), headquartered in Jos, Nigeria—a ministry dedicated to raising "Kingdom Ambassadors" who shape culture, rebuild nations, and manifest Godly influence in every sphere of human existence.

Known for his uncompromising stance on righteousness and his deep prophetic insights, Prophet Isa El-buba has spent over four decades pioneering spiritual and social awakening across the globe.

The Encounter: From Islam to the Cross
Born in Jos into a devout Muslim family, Prophet Isa’s life took a radical turn in 1982. Following a dramatic, supernatural encounter with Jesus Christ, he was delivered from deep Islamic occult involvement and commissioned into a life of Christian ministry. This powerful conversion remains the bedrock of his message: that the Gospel of Jesus Christ has the power to liberate any soul and transform any nation.

Ministry Philosophy & Global Impact
Prophet Isa’s ministry is defined by the "Radical Prophetic." His meetings are marked by the tangible presence of God, healing, and precise prophetic proclamations that steer the destinies of individuals and governments alike.

He carries a specific, divine burden for:

The Global Mission: Reaching the Muslim world with the authentic love and truth of Christ.

Spiritual Awakening: Equipping the Body of Christ to move beyond religion into supernatural kingdom assignments.

National Reform: Acting as a "Watchman" over Nigeria and the nations, calling leaders to accountability, justice, and godly governance.

A Catalyst for National Transformation
Beyond the pulpit, Prophet Isa is a fierce advocate for civic responsibility. He is the convener of the Initiative for a Better and Brighter Nigeria (IBBN). Through this movement, he mobilizes millions of citizens toward nation-building, credible leadership, and the pursuit of a righteous political landscape. His influence bridges the gap between the Church and the State, making him a sought-after voice for national peace and renewal.

Authorship & Global Media
A prolific communicator, Prophet Isa El-buba reaches millions through his televangelism broadcasts and published works. His books serve as manuals for spiritual warfare, leadership, and prophetic activation, ensuring that his mantle of wisdom is accessible to the next generation of believers worldwide.

Family & Legacy
Prophet Isa El-Buba is happily married to Pastor Choice Isa El-Buba, a pillar of strength and a co-laborer in the vision. Together, they are blessed with children and grandchildren who serve alongside them in the ministry. The El-Buba legacy is one of unwavering commitment to truth, spiritual authenticity, and the relentless pursuit of God’s purpose on earth.`,
      prophetBiography2: '',
      prophetBiography3: '',
      ourMinistriesDescription: 'EBOMI चार रणनीतिक शाखाओं के माध्यम से अपने प्रभाव का विस्तार करता है, प्रत्येक जीवन और समुदायों को बदलने के लिए समर्पित है',
    },
    common: {
      readMore: 'और पढ़ें',
      learnMore: 'और जानें',
      visitWebsite: 'वेबसाइट पर जाएं',
      readNow: 'अभी पढ़ें',
      watchNow: 'अभी देखें',
      share: 'साझा करें',
      submit: 'जमा करें',
      cancel: 'रद्द करें',
      close: 'बंद करें',
      search: 'खोजें',
      all: 'सभी',
      loading: 'लोड हो रहा है...',
      noResults: 'कोई परिणाम नहीं मिला',
    },
    footer: defaultTranslations.footer,
    branches: defaultTranslations.branches,
    give: defaultTranslations.give,
    download: defaultTranslations.download,
    ebomiprays: defaultTranslations.ebomiprays,
  },
  
  ko: {
    nav: {
      home: '홈',
      aboutUs: '소개',
      branches: 'EBOMI 지부',
      gallery: '갤러리',
      library: '도서관',
      resources: '자료',
      joinUs: '함께하기',
      visitTemple: 'EBOMI 방문',
    },
    home: {
      welcomeHome: '집에 오신 것을 환영합니다',
      welcomeMessage: 'EBOMI에서 모든 마음은 집을 찾고, 모든 영혼은 사랑을 찾으며, 모든 삶은 하나님의 말씀으로 변화됩니다.',
      upcomingEvent: '다가오는 행사',
      globalRevivalCongress: '글로벌 부흥 대회',
      theme: '주제',
      date: '날짜',
      location: '위치',
      registerNow: '지금 등록',
      limitedSeats: '좌석 제한',
      propheticMondays: '예언의 월요일',
      swipeToView: '더 보려면 스와이프',
      recentPrograms: '최근 프로그램',
      ebomiAnthem: 'EBOMI 찬송가',
      anthemText: [
        '하나님께는 땅을 행진하는 군대가 있습니다',
        '구원은 우리의 노래이며 우리 손에 치유가 있습니다,',
        '우리 마음에 기쁨과 함께 영원한 기쁨',
        '이 군대에서 나는 한 부분을 가지고 있습니다',
        '주의 군대가 전진하고 있습니다',
      ],
      joinTheArmy: '주의 군대에 합류하세요',
      meetTheProphet: '선지자를 만나보세요',
      ourMinistries: '우리의 사역과 팔',
      prophetsLibrary: '선지자 도서관',
      transformYourLife: '강력한 가르침과 예언적 통찰을 통해 삶을 변화시키세요',
      viewAllBooks: '모든 책 보기',
      shareTestimony: '당신의 증언을 공유하세요',
      testimonyDescription: '하나님의 신실하심에 대한 당신의 이야기는 다른 사람들에게 영감을 주고 격려할 수 있습니다. 모든 증언은 하나님의 선하심에 대한 강력한 선언이며 필요한 사람들에게 희망의 등불입니다.',
      inspireOthers: '다른 사람들에게 영감을 주세요',
      inspireDescription: '당신의 증언은 누군가가 계속 믿고 나아가기 위해 필요한 격려가 될 수 있습니다.',
      glorifyGod: '하나님을 영화롭게 하세요',
      glorifyDescription: '하나님이 당신의 삶에서 하신 일에 대해 하나님께 영광을 돌리고 그분의 이름을 높이세요.',
      buildFaith: '믿음을 세우세요',
      buildFaithDescription: '다른 사람들이 자신의 돌파를 위해 믿고 하나님의 신실하심을 경험하도록 도와주세요.',
      joinUsInWorship: '예배에 함께하세요',
      serviceTimes: '예배 시간',
      everyMonday: '매주 월요일: 오후 3시',
      lastWeekOfMonth: '매월 마지막 주',
      everyday: '매일: 서아프리카 시간 오후 9시',
      watchOn: '시청:',
      ebomiTv: 'EBOMI.TV',
      ebomiTvDescription: '라이브 서비스를 시청하고, 과거 프로그램을 따라잡고, 세계 어디서나 강력한 가르침과 예배 세션으로 연결을 유지하세요.',
      liveNow: '지금 라이브',
      onDemand: '주문형',
      weAreGodsArmy: '우리는 땅을 행진하는 하나님의 군대입니다.',
      intercessors: '중보자',
      nations: '국가',
      partners: '파트너',
      branches: '지부',
      joinTheArmyDescription: '우리는 하나님의 군대입니다. 우리의 노래에 구원이 있고 우리 손에 치유가 있는 땅을 행진하고 있습니다. 모든 신자는 이 위대한 운동에서 역할을 할 부분이 있습니다.',
      findBranchNearYou: '가까운 지부 찾기',
      ebomiDescription: 'EBOMI는 나이지리아 플라토 주 조스에 본부를 둔 선지자 이사 엘-부바가 설립한 교파 간 글로벌 기독교 기도 및 전도 운동입니다. 그 사명은 신자, 지도자 및 기관을 동원, 훈련, 장비 및 권한 부여하여 예언적 운명을 살아가도록 하는 것입니다; 중보, 교회 개척, 전도 및 지역 사회 개발을 통해 하나님의 왕국을 발전시키는 것입니다.',
      ebomiAimsTo: 'EBOMI는 다음을 목표로 합니다:',
      ebomiAim1: '정치, 미디어, 금융, 정부, 군대 및 교회에서 강력하고 전투적인 기독교인 네트워크를 구축합니다.',
      ebomiAim2: '신자들을 종교적 멍에에서 해방시키고 왕국의 요구사항을 성공과 발전의 열쇠로 드러냅니다.',
      ebomiAim3: '국가를 위해 기도하고 중보하는 중보자들의 군대를 일으켜 사회, 정치, 교육, 문화 등에서 변화를 가져옵니다.',
      ebomiAim4: '교파 경계를 넘어 통일을 촉진합니다.',
      joinTheArmySecondParagraph: 'EBOMI에 가입하면 하나님의 왕국을 발전시키기 위해 헌신한 중보자, 지도자 및 변화를 만드는 사람들의 글로벌 네트워크의 일부가 됩니다. 함께 우리는 기도하고, 섬기고, 국가를 변화시킵니다.',
      joinTheArmyBenefit1: '신자들의 전투 네트워크의 일부가 되기',
      joinTheArmyBenefit2: '국가를 위해 기도하는 중보자들과 함께하기',
      joinTheArmyBenefit3: '왕국 원칙을 통해 사회를 변화시키기',
      joinTheArmyBenefit4: '당신의 예언적 운명을 살아가기',
      prophetBiography1: `Prophet (Dr) Isa El-Buba is a globally recognized prophetic voice, transformational leader, and apostolic reformer. He is the visionary behind Evangelical Biblical Outreach Ministries International (EBOMI), headquartered in Jos, Nigeria—a ministry dedicated to raising "Kingdom Ambassadors" who shape culture, rebuild nations, and manifest Godly influence in every sphere of human existence.

Known for his uncompromising stance on righteousness and his deep prophetic insights, Prophet Isa El-buba has spent over four decades pioneering spiritual and social awakening across the globe.

The Encounter: From Islam to the Cross
Born in Jos into a devout Muslim family, Prophet Isa’s life took a radical turn in 1982. Following a dramatic, supernatural encounter with Jesus Christ, he was delivered from deep Islamic occult involvement and commissioned into a life of Christian ministry. This powerful conversion remains the bedrock of his message: that the Gospel of Jesus Christ has the power to liberate any soul and transform any nation.

Ministry Philosophy & Global Impact
Prophet Isa’s ministry is defined by the "Radical Prophetic." His meetings are marked by the tangible presence of God, healing, and precise prophetic proclamations that steer the destinies of individuals and governments alike.

He carries a specific, divine burden for:

The Global Mission: Reaching the Muslim world with the authentic love and truth of Christ.

Spiritual Awakening: Equipping the Body of Christ to move beyond religion into supernatural kingdom assignments.

National Reform: Acting as a "Watchman" over Nigeria and the nations, calling leaders to accountability, justice, and godly governance.

A Catalyst for National Transformation
Beyond the pulpit, Prophet Isa is a fierce advocate for civic responsibility. He is the convener of the Initiative for a Better and Brighter Nigeria (IBBN). Through this movement, he mobilizes millions of citizens toward nation-building, credible leadership, and the pursuit of a righteous political landscape. His influence bridges the gap between the Church and the State, making him a sought-after voice for national peace and renewal.

Authorship & Global Media
A prolific communicator, Prophet Isa El-buba reaches millions through his televangelism broadcasts and published works. His books serve as manuals for spiritual warfare, leadership, and prophetic activation, ensuring that his mantle of wisdom is accessible to the next generation of believers worldwide.

Family & Legacy
Prophet Isa El-Buba is happily married to Pastor Choice Isa El-Buba, a pillar of strength and a co-laborer in the vision. Together, they are blessed with children and grandchildren who serve alongside them in the ministry. The El-Buba legacy is one of unwavering commitment to truth, spiritual authenticity, and the relentless pursuit of God’s purpose on earth.`,
      prophetBiography2: '',
      prophetBiography3: '',
      ourMinistriesDescription: 'EBOMI는 각각 삶과 지역 사회를 변화시키는 데 전념하는 네 가지 전략적 팔을 통해 그 영향력을 확장합니다',
    },
    common: {
      readMore: '더 읽기',
      learnMore: '더 알아보기',
      visitWebsite: '웹사이트 방문',
      readNow: '지금 읽기',
      watchNow: '지금 시청',
      share: '공유',
      submit: '제출',
      cancel: '취소',
      close: '닫기',
      search: '검색',
      all: '전체',
      loading: '로딩 중...',
      noResults: '결과를 찾을 수 없습니다',
    },
    footer: defaultTranslations.footer,
    branches: defaultTranslations.branches,
    give: defaultTranslations.give,
    download: defaultTranslations.download,
    ebomiprays: defaultTranslations.ebomiprays,
  },
}

export const languageNames: Record<Language, string> = {
  en: 'English',
  fr: 'Français',
  es: 'Español',
  pt: 'Português',
  ha: 'Hausa',
  yo: 'Yorùbá',
  ig: 'Igbo',
  ff: 'Fulani',
  ar: 'العربية',
  zh: '中文',
  he: 'עברית',
  de: 'Deutsch',
  hi: 'हिन्दी',
  ko: '한국어',
}

// Country codes for flag icons (mapping languages to countries)
export const languageCountryCodes: Record<Language, string> = {
  en: 'GB', // United Kingdom
  fr: 'FR', // France
  es: 'ES', // Spain
  pt: 'PT', // Portugal
  ha: 'NG', // Nigeria
  yo: 'NG', // Nigeria
  ig: 'NG', // Nigeria
  ff: 'NG', // Nigeria (Fulani)
  ar: 'SA', // Saudi Arabia
  zh: 'CN', // China
  he: 'IL', // Israel
  de: 'DE', // Germany
  hi: 'IN', // India
  ko: 'KR', // South Korea
}

// Keep emoji flags as fallback
export const languageFlags: Record<Language, string> = {
  en: '🇬🇧',
  fr: '🇫🇷',
  es: '🇪🇸',
  pt: '🇵🇹',
  ha: '🇳🇬',
  yo: '🇳🇬',
  ig: '🇳🇬',
  ff: '🇸🇳',
  ar: '🇸🇦',
  zh: '🇨🇳',
  he: '🇮🇱',
  de: '🇩🇪',
  hi: '🇮🇳',
  ko: '🇰🇷',
}
