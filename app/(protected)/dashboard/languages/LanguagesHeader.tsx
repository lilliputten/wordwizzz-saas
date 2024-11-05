import { DashboardHeader } from '@/components/dashboard/header';

import { pageDescription, pageTitle } from './constants/texts';

export function LanguagesHeader() {
  return (
    <DashboardHeader
      // prettier-ignore
      heading={pageTitle}
      text={pageDescription}
      className="__LanguagesHeader"
    />
  );
}
