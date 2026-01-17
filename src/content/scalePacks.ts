export type ScalePack = {
  title: string;
  author: string;
  description: string;
  limit: number;
  formats: string[];
  license?: string;
  links: {
    repo: string;
    download?: string;
    preview?: string;
  };
  tags?: string[];
};

export const scalePacks: ScalePack[] = [];
