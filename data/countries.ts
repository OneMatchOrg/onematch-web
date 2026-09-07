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
  // Portugal
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

  // Espanha
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

  // França
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

  // Itália
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

  // Alemanha
  {
    code: "DE",
    name: "Germany",
    flag: "🇩🇪",
    registry: "DKMS / ZKRD",
    registrationUrl: "https://www.dkms.de/",
    directRegistration: true,
    verified: "Today",
    status: "verified",
  },

  // Reino Unido
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

  // Países Baixos
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

  // Bélgica
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

  // Suíça
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

  // Áustria
  {
    code: "AT",
    name: "Austria",
    flag: "🇦🇹",
    registry: "Geben für Leben",
    registrationUrl: "https://www.gebenfuerleben.at/",
    directRegistration: true,
    verified: "Today",
    status: "verified",
  },

  // Irlanda
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

  // Dinamarca
  {
    code: "DK",
    name: "Denmark",
    flag: "🇩🇰",
    registry: "Danish Stem Cell Donors",
    registrationUrl: "https://bloddonor.dk/",
    directRegistration: false,
    verified: "Today",
    status: "verified",
  },

  // Finlândia
  {
    code: "FI",
    name: "Finland",
    flag: "🇫🇮",
    registry: "Finnish Stem Cell Registry",
    registrationUrl: "https://www.veripalvelu.fi/",
    directRegistration: false,
    verified: "Today",
    status: "verified",
  },

  // Noruega
  {
    code: "NO",
    name: "Norway",
    flag: "🇳🇴",
    registry: "Norwegian Bone Marrow Donor Registry",
    registrationUrl: "https://www.blodbanken-oslo.no/",
    directRegistration: false,
    verified: "Today",
    status: "verified",
  },

  // Polónia
  {
    code: "PL",
    name: "Poland",
    flag: "🇵🇱",
    registry: "DKMS Polska",
    registrationUrl: "https://www.dkms.pl/",
    directRegistration: true,
    verified: "Today",
    status: "verified",
  },

  // República Checa
  {
    code: "CZ",
    name: "Czech Republic",
    flag: "🇨🇿",
    registry: "Czech National Marrow Donor Registry",
    registrationUrl: "https://www.kostnidren.cz/",
    directRegistration: false,
    verified: "Today",
    status: "verified",
  },
];