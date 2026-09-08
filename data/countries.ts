export type Country = {
  code: string;
  name: string;
  flag: string;
  registry: string;

  landingPage?: string;
  registrationUrl: string;

  directRegistration: boolean;

  registrationType:
    | "questionnaire"
    | "kit"
    | "blood-donation"
    | "pre-registration";

  estimatedTime: string;

  verified: string;

  status: "verified" | "review" | "coming-soon";

  eligibleAge?: string;

  searchTerms: string[];
};

export const countries: Country[] = [
  {
    code: "PT",
    name: "Portugal",
    flag: "🇵🇹",
    registry: "CEDACE",
    landingPage: "/pt",
    registrationUrl:
      "https://plataforma.dadiva.ipst.pt/donor/marrow/self-assessment",
    directRegistration: true,
    registrationType: "questionnaire",
    estimatedTime: "2 min",
    verified: "2026-09-07",
    status: "verified",
    eligibleAge: "18–35 years",
    searchTerms: ["Portugal"],
  },

  {
    code: "ES",
    name: "Spain",
    flag: "🇪🇸",
    registry: "REDMO",
    registrationUrl: "https://fcarreras.org/donamedula",
    directRegistration: true,
    registrationType: "pre-registration",
    estimatedTime: "3 min",
    verified: "2026-09-07",
    status: "verified",
    eligibleAge: "18–40 years",
    searchTerms: ["Spain", "España", "Espana", "Reino de España"],
  },

  {
    code: "FR",
    name: "France",
    flag: "🇫🇷",
    registry: "France Greffe de Moelle",
    registrationUrl: "https://www.dondemoelleosseuse.fr/se_preinscrire",
    directRegistration: true,
    registrationType: "pre-registration",
    estimatedTime: "3 min",
    verified: "2026-09-07",
    status: "verified",
    eligibleAge: "18–35 years",
    searchTerms: ["France", "França", "France"],
  },

  {
    code: "LU",
    name: "Luxembourg",
    flag: "🇱🇺",
    registry: "Luxembourg Marrow Donor Program",
    registrationUrl: "https://www.dondemoelle.lu/devenir-donneur/s-inscrire",
    directRegistration: true,
    registrationType: "questionnaire",
    estimatedTime: "2 min",
    verified: "2026-09-07",
    status: "verified",
    searchTerms: ["Luxembourg", "Luxemburgo", "Lëtzebuerg"],
  },

  {
    code: "DE",
    name: "Germany",
    flag: "🇩🇪",
    registry: "DKMS Germany",
    registrationUrl: "https://www.dkms.de/aktiv-werden/spender-werden",
    directRegistration: true,
    registrationType: "kit",
    estimatedTime: "2 min + free kit",
    verified: "2026-09-07",
    status: "verified",
    eligibleAge: "17–55 years",
    searchTerms: ["Germany", "Deutschland", "Alemanha"],
  },

  {
    code: "NL",
    name: "Netherlands",
    flag: "🇳🇱",
    registry: "Matchis",
    registrationUrl:
      "https://www.matchis.nl/en/become-donor/how-do-i-register-stem-cell-donor",
    directRegistration: true,
    registrationType: "questionnaire",
    estimatedTime: "2 min",
    verified: "2026-09-07",
    status: "verified",
    searchTerms: ["Netherlands", "Nederland", "Holland", "Países Baixos"],
  },

  {
    code: "CH",
    name: "Switzerland",
    flag: "🇨🇭",
    registry: "Swiss Blood Stem Cell Registry",
    registrationUrl:
      "https://www.blutstammzellspende.ch/de/registrieren/blutstammzellspender-werden",
    directRegistration: true,
    registrationType: "questionnaire",
    estimatedTime: "3 min",
    verified: "2026-09-07",
    status: "verified",
    searchTerms: [
      "Switzerland",
      "Schweiz",
      "Suisse",
      "Suiza",
      "Svizzera",
      "Suíça",
    ],
  },

  {
    code: "AT",
    name: "Austria",
    flag: "🇦🇹",
    registry: "Geben für Leben",
    registrationUrl:
      "https://www.gebenfuerleben.at/werde-jetzt-stammzellspenderin/",
    directRegistration: true,
    registrationType: "kit",
    estimatedTime: "2 min + free kit",
    verified: "2026-09-07",
    status: "verified",
    searchTerms: ["Austria", "Österreich", "Áustria"],
  },

  {
    code: "BE",
    name: "Belgium",
    flag: "🇧🇪",
    registry: "Marrow Donor Program Belgium",
    registrationUrl:
      "https://www.stemcelldonor.be/become-a-donor/registration/",
    directRegistration: true,
    registrationType: "questionnaire",
    estimatedTime: "2 min",
    verified: "2026-09-07",
    status: "verified",
    searchTerms: ["Belgium", "België", "Belgique", "Belgien", "Bélgica"],
  },

  {
    code: "IT",
    name: "Italy",
    flag: "🇮🇹",
    registry: "IBMDR",
    registrationUrl:
      "https://ibmdr.galliera.it/come-diventare-donatore/informazioni-per-i-donatori/iscrizione",
    directRegistration: true,
    registrationType: "pre-registration",
    estimatedTime: "3 min",
    verified: "2026-09-07",
    status: "verified",
    searchTerms: ["Italy", "Italia"],
  },

  {
    code: "IE",
    name: "Ireland",
    flag: "🇮🇪",
    registry: "Irish Unrelated Bone Marrow Registry",
    registrationUrl:
      "https://www.giveblood.ie/bone-marrow/can_i_join_the_bone_marrow_registry/",
    directRegistration: true,
    registrationType: "blood-donation",
    estimatedTime: "Next blood donation",
    verified: "2026-09-07",
    status: "verified",
    searchTerms: ["Ireland", "Éire", "Irlanda"],
  },

  {
    code: "PL",
    name: "Poland",
    flag: "🇵🇱",
    registry: "DKMS Polska",
    registrationUrl: "https://www.dkms.pl/dzialaj/zostan-dawca",
    directRegistration: true,
    registrationType: "kit",
    estimatedTime: "2 min + free kit",
    verified: "2026-09-07",
    status: "verified",
    searchTerms: ["Poland", "Polska", "Polónia"],
  },

  {
    code: "SE",
    name: "Sweden",
    flag: "🇸🇪",
    registry: "Tobias Registry",
    registrationUrl: "https://tobiasregistret.se/en",
    directRegistration: true,
    registrationType: "kit",
    estimatedTime: "3 min + home kit",
    verified: "2026-09-07",
    status: "verified",
    searchTerms: ["Sweden", "Sverige", "Suécia"],
  },

  {
    code: "CZ",
    name: "Czech Republic",
    flag: "🇨🇿",
    registry: "Czech National Marrow Donor Registry",
    registrationUrl: "https://registr.kostnidren.cz/chci-pomoct/",
    directRegistration: true,
    registrationType: "pre-registration",
    estimatedTime: "3 min",
    verified: "2026-09-07",
    status: "verified",
    searchTerms: [
      "Czech Republic",
      "Czechia",
      "Česko",
      "Cesko",
      "República Checa",
    ],
  },

  {
    code: "CA",
    name: "Canada",
    flag: "🇨🇦",
    registry: "Canadian Blood Services",
    registrationUrl: "https://perfectmatch.blood.ca/stem/",
    directRegistration: true,
    registrationType: "questionnaire",
    estimatedTime: "2 min + free kit",
    verified: "2026-09-07",
    status: "verified",
    searchTerms: ["Canada", "Canadá"],
  },

  {
    code: "US",
    name: "United States",
    flag: "🇺🇸",
    registry: "NMDP",
    registrationUrl: "https://www.nmdp.org/get-involved/join-the-registry",
    directRegistration: true,
    registrationType: "kit",
    estimatedTime: "2 min + free swab kit",
    verified: "2026-09-07",
    status: "verified",
    searchTerms: [
      "United States",
      "USA",
      "US",
      "America",
      "Estados Unidos",
    ],
  },

  {
    code: "AU",
    name: "Australia",
    flag: "🇦🇺",
    registry: "Stem Cell Donors Australia",
    registrationUrl:
      "https://stemcelldonors.org.au/join-the-registry/when-i-donate-blood/",
    directRegistration: true,
    registrationType: "blood-donation",
    estimatedTime: "Next blood donation",
    verified: "2026-09-07",
    status: "verified",
    searchTerms: ["Australia"],
  },

  {
    code: "NZ",
    name: "New Zealand",
    flag: "🇳🇿",
    registry: "New Zealand Bone Marrow Donor Registry",
    registrationUrl: "https://www.bonemarrow.org.nz/join-us/how-to-join/",
    directRegistration: true,
    registrationType: "blood-donation",
    estimatedTime: "Book first appointment",
    verified: "2026-09-07",
    status: "verified",
    searchTerms: ["New Zealand", "Nova Zelândia", "Aotearoa"],
  },

  {
    code: "JP",
    name: "Japan",
    flag: "🇯🇵",
    registry: "Japan Marrow Donor Program",
    registrationUrl: "https://www.jmdp.or.jp/reg/",
    directRegistration: true,
    registrationType: "pre-registration",
    estimatedTime: "5 min + 2 mL blood sample",
    verified: "2026-09-07",
    status: "verified",
    searchTerms: ["Japan", "日本", "Japão"],
  },

  {
    code: "BR",
    name: "Brazil",
    flag: "🇧🇷",
    registry: "REDOME",
    registrationUrl: "https://redome.inca.gov.br/doadores/",
    directRegistration: true,
    registrationType: "blood-donation",
    estimatedTime: "Visit hemocenter",
    verified: "2026-09-07",
    status: "verified",
    eligibleAge: "18–35 years",
    searchTerms: ["Brazil", "Brasil"],
  },

  {
    code: "AR",
    name: "Argentina",
    flag: "🇦🇷",
    registry: "INCUCAI",
    registrationUrl: "https://sintra.incucai.gov.ar/cph/donante/",
    directRegistration: true,
    registrationType: "blood-donation",
    estimatedTime: "Book at collection center",
    verified: "2026-09-07",
    status: "verified",
    searchTerms: ["Argentina"],
  },

  {
    code: "CL",
    name: "Chile",
    flag: "🇨🇱",
    registry: "DKMS Chile",
    registrationUrl: "https://www.dkms.cl/involucrate/conviertete-en-donante",
    directRegistration: true,
    registrationType: "kit",
    estimatedTime: "2 min + home kit",
    verified: "2026-09-07",
    status: "verified",
    searchTerms: ["Chile"],
  },

  {
    code: "HK",
    name: "Hong Kong",
    flag: "🇭🇰",
    registry: "Hong Kong Bone Marrow Donor Registry",
    registrationUrl: "https://www5.ha.org.hk/rcbts/bm-reg?lang=en",
    directRegistration: true,
    registrationType: "blood-donation",
    estimatedTime: "Visit donor centre",
    verified: "2026-09-07",
    status: "verified",
    searchTerms: ["Hong Kong", "香港"],
  },

  {
    code: "DK",
    name: "Denmark",
    flag: "🇩🇰",
    registry: "Danish Stem Cell Donor Registry",
    registrationUrl: "https://bloddonor.dk/stamcelledonor/",
    directRegistration: true,
    registrationType: "blood-donation",
    estimatedTime: "During blood donor registration",
    verified: "2026-09-07",
    status: "verified",
    searchTerms: ["Denmark", "Danmark", "Dinamarca"],
  },

  {
    code: "FI",
    name: "Finland",
    flag: "🇫🇮",
    registry: "Finnish Stem Cell Registry",
    registrationUrl:
      "https://www.veripalvelu.fi/en/stem-cell-registry/join-the-finnish-stem-cell-registry/",
    directRegistration: true,
    registrationType: "kit",
    estimatedTime: "2 min + home swab kit",
    verified: "2026-09-07",
    status: "verified",
    searchTerms: ["Finland", "Suomi", "Finlândia"],
  },
];