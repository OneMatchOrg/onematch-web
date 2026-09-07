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
    directRegistration: false,
    verified: "This Month",
    status: "verified",
  },

  {
    code: "BR",
    name: "Brazil",
    flag: "🇧🇷",
    registry: "REDOME",
    registrationUrl: "https://redome.inca.gov.br/",
    directRegistration: false,
    verified: "This Month",
    status: "verified",
  },

  {
    code: "US",
    name: "United States",
    flag: "🇺🇸",
    registry: "NMDP",
    registrationUrl: "https://www.nmdp.org/",
    directRegistration: false,
    verified: "This Month",
    status: "verified",
  },

  {
    code: "GB",
    name: "United Kingdom",
    flag: "🇬🇧",
    registry: "Anthony Nolan",
    registrationUrl: "https://www.anthonynolan.org/",
    directRegistration: false,
    verified: "This Month",
    status: "verified",
  },
];