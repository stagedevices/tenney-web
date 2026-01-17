type CaptionInput = {
  caption: string;
  copyright: string;
  lastUpdated: string;
};

export const buildCaption = ({ caption, copyright, lastUpdated }: CaptionInput) => {
  return `${caption}\n© ${copyright} — Last updated: ${lastUpdated}`;
};
