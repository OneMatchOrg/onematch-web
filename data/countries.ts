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
    registrationUrl: "https://fcarreras.org/donamedula",
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
    code: "LU",
    name: "Luxembourg",
    flag: "🇱🇺",
    registry: "Luxembourg Marrow Donor Program",
    registrationUrl: "https://www.dondemoelle.lu/devenir-donneur/s-inscrire",
    directRegistration: true,
    verified: "Today",
    status: "verified",
  },

  {
  code: "DE",
  name: "Germany",
  flag: "🇩🇪",
  registry: "DKMS Germany",
  registrationUrl: "https://www.dkms.de/aktiv-werden/spender-werden",
  directRegistration: true,
  verified: "2026-09-07",
  status: "verified",
  },

{
  code: "NL",
  name: "Netherlands",
  flag: "🇳🇱",
  registry: "Matchis",
  registrationUrl: "https://www.matchis.nl/en/become-donor/how-do-i-register-stem-cell-donor",
  directRegistration: true,
  verified: "2026-09-07",
  status: "verified",
},

{
  code: "CH",
  name: "Switzerland",
  flag: "🇨🇭",
  registry: "Swiss Blood Stem Cell Registry",
  registrationUrl: "https://www.blutstammzellspende.ch/de/registrieren/blutstammzellspender-werden",
  directRegistration: true,
  verified: "2026-09-07",
  status: "verified",
},

{
  code: "AT",
  name: "Austria",
  flag: "🇦🇹",
  registry: "Geben für Leben",
  registrationUrl: "https://www.gebenfuerleben.at/werde-jetzt-stammzellspenderin/",
  directRegistration: true,
  verified: "2026-09-07",
  status: "verified",
},

{
  code: "BE",
  name: "Belgium",
  flag: "🇧🇪",
  registry: "Marrow Donor Program Belgium",
  registrationUrl: "https://www.stemcelldonor.be/become-a-donor/registration/",
  directRegistration: true,
  verified: "2026-09-07",
  status: "verified",
},
];