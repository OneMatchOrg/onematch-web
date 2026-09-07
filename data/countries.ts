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
];