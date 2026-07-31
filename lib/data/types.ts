export type CaseStudy = {
  title: string;
  dates: string;
  summary: string;
  metric: string;
  problem: string;
  approach: string;
  decisions: string[];
  tradeoffs: string[];
  stack: string[];
  links?: { label: string; href: string }[];
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
};
