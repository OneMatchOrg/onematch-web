export type Country = {
  code: string;
  name: string;
  flag: string;
  registry: string;

  landingPage?: string;
  registrationUrl: string;

  directRegistration: boolean;
  verified: string;

  status: "verified" | "review" | "coming-soon";
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
    verified: "Today",
    status: "verified",
  },

  {
    code: "ES",
    name: "Spain",
    flag: "🇪🇸",
    registry: "REDMO",
    registrationUrl: "https://www.fcarreras.org/es/donante-de-medula",
    directRegistration: true,
    verified: "Today",
    status: "verified",
  },

  {
    code: "FR",
    name: "France",
    flag: "🇫🇷",
    registry: "France Greffe de Moelle",
    registrationUrl: "https://www.dondemoelleosseuse.fr/se_preinscrire",
    directRegistration: true,
    verified: "Today",
    status: "verified",
  },

  {
    code: "IT",
    name: "Italy",
    flag: "🇮🇹",
    registry: "IBMDR",
    registrationUrl: "https://ibmdr.galliera.it/",
    directRegistration: false,
    verified: "Today",
    status: "verified",
  },

  {
    code: "DE",
    name: "Germany",
    flag: "🇩🇪",
    registry: "DKMS",
    registrationUrl: "https://www.dkms.de/",
    directRegistration: true,
    verified: "Today",
    status: "verified",
  },

  {
    code: "GB",
    name: "United Kingdom",
    flag: "🇬🇧",
    registry: "Anthony Nolan",
    registrationUrl: "https://www.anthonynolan.org/",
    directRegistration: true,
    verified: "Today",
    status: "verified",
  },

  {
    code: "NL",
    name: "Netherlands",
    flag: "🇳🇱",
    registry: "Matchis",
    registrationUrl: "https://www.matchis.nl/",
    directRegistration: true,
    verified: "Today",
    status: "verified",
  },

  {
    code: "BE",
    name: "Belgium",
    flag: "🇧🇪",
    registry: "Marrow Donor Program Belgium",
    registrationUrl: "https://www.mdp.be/",
    directRegistration: true,
    verified: "Today",
    status: "verified",
  },

  {
    code: "CH",
    name: "Switzerland",
    flag: "🇨🇭",
    registry: "Swiss Blood Stem Cell Registry",
    registrationUrl: "https://www.blutspende.ch/",
    directRegistration: true,
    verified: "Today",
    status: "verified",
  },

  {
    code: "AT",
    name: "Austria",
    flag: "🇦🇹",
    registry: "Austrian Bone Marrow Donor Registry",
    registrationUrl: "https://www.gebenfuerleben.at/",
    directRegistration: true,
    verified: "Today",
    status: "verified",
  },

  {
    code: "IE",
    name: "Ireland",
    flag: "🇮🇪",
    registry: "Irish Unrelated Bone Marrow Registry",
    registrationUrl: "https://www.giveblood.ie/",
    directRegistration: false,
    verified: "Today",
    status: "verified",
  },
];