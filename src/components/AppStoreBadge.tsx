import { APP_STORE_BADGE_BLACK, APP_STORE_BADGE_WHITE } from '../constants';

type Variant = 'black' | 'white';

const AppStoreBadge = ({ variant = 'white', className }: { variant?: Variant; className?: string }) => {
  const html = variant === 'black' ? APP_STORE_BADGE_BLACK : APP_STORE_BADGE_WHITE;
  return (
    <span
      className={className}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

export default AppStoreBadge;
