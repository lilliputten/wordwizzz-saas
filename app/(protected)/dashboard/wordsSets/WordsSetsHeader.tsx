import { DashboardHeader } from '@/components/dashboard/header';

import { pageDescription, pageTitle } from './constants/texts';

export function WordsSetsHeader() {
  return (
    <DashboardHeader
      // prettier-ignore
      heading={pageTitle}
      text={pageDescription}
      className="__WordsSetsHeader"
    />
  );
}
