export type CaseStudy = {
  title: string;
  tag?: string;
  dates: string;
  summary: string;
  metric: string;
  problem: string;
  approach: string;
  decisions: string[];
  tradeoffs: string[];
  stack: string[];
  image?: { src: string; alt: string; caption?: string };
  links?: { label: string; href: string }[];
};

export type MoreProject = {
  title: string;
  summary: string;
  stack: string[];
  href: string;
};

export type CompactEntry = {
  title: string;
  org: string;
  dates: string;
  summary: string;
};

export type SkillGroup = {
  label: string;
  items: string[];
};

export type Metric = {
  value: string;
  label: string;
  // Optional numeric target for the count-up animation; when present the strip
  // animates `prefix + to + suffix` instead of rendering `value` statically.
  to?: number;
  prefix?: string;
  suffix?: string;
};
