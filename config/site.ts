interface SiteConfig {
  name: string;
  description: string;
  url: string;
  links: {
    twitter: string;
    github: string;
  };
}

export const siteConfig: SiteConfig = {
  name: "",
  description:
    "",
  url: "",
  links: {
    twitter: "",
    github: "",
  },
};
