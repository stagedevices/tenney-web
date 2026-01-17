type CaptionInput = {
  caption: string;
  copyright: string;
  copyrightDate: string;
  label: string;
};

export const buildCaption = ({ caption, copyright, copyrightDate, label }: CaptionInput) => {
  return `${caption}\n\n© ${copyright} — ${copyrightDate} — ${label}`;
};
