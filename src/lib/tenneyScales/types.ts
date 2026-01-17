export type TenneyScalesIndex = {
  schemaVersion: number;
  generatedAt?: string;
  packs: TenneyScalePack[];
};

export type TenneyScalePack = {
  slug: string;
  title: string;
  description: string;
  author: string;
  authorUrl?: string;
  license: string;
  tags: string[];
  defaults: { rootHz: number; primeLimit: number };
  files: {
    tenney: string;
    scl?: string;
    ascl?: string;
    kbm?: string;
  };
};
