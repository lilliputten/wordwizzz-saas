import { TPropsWithClassName } from '@/types/generic';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Icons } from '@/components/shared/icons';
import { TLanguage, TLanguageId } from '@/features/languages/types';
import { tailwindClippingLayout } from '@/shared/helpers/tailwind';

import { useConfirmDeleteLanguageModal } from './DeleteLanguage';

interface TLanguagesListTableProps extends TPropsWithClassName {
  languages: TLanguage[];
  onDeleteLanguage: (id: TLanguageId) => Promise<unknown>;
  showAddLanguageModal: () => void; // React.Dispatch<React.SetStateAction<void>>;
}
type TChildProps = Omit<TLanguagesListTableProps, 'className'>;

function Title() {
  return (
    <div className="__LanguagesListTable_Title grid gap-2">
      <CardTitle>Current languages</CardTitle>
      <CardDescription className="text-balance">
        Languages you've added to the profile.
      </CardDescription>
    </div>
  );
}

function Toolbar(props: TChildProps) {
  const { showAddLanguageModal } = props;
  return (
    <div className="__LanguagesListTable_Toolbar ml-auto flex shrink-0 gap-2">
      <Button size="sm" onClick={showAddLanguageModal}>
        <Icons.add className="mr-2 size-4" />
        <span>Add</span>
        <span className="hidden sm:inline-flex">&nbsp;Language</span>
      </Button>
      {/* EXAMPLE
      <Button size="sm" className="ml-auto shrink-0 gap-1 px-4">
        <Link href="#" className="flex items-center gap-2">
          <ArrowUpRight className="hidden size-4 sm:block" />
          <span>View All</span>
        </Link>
      </Button>
       */}
    </div>
  );
}

function Header(props: TChildProps) {
  return (
    <CardHeader className={cn('__LanguagesListTable_Header flex flex-row items-center')}>
      <Title />
      <Toolbar {...props} />
    </CardHeader>
  );
}

function LanguageTableHeader() {
  return (
    <TableHeader>
      <TableRow>
        <TableHead>Language</TableHead>
      </TableRow>
    </TableHeader>
  );
}

interface TLanguageTableRowProps {
  language: TLanguage;
  invokeConfirmDeleteLanguageModal: (language: TLanguage) => void;
}

function LanguageTableRow(props: TLanguageTableRowProps) {
  const { language, invokeConfirmDeleteLanguageModal } = props;
  const { id, name } = language;
  return (
    <TableRow data-language-id={id}>
      <TableCell>
        <div className="text-lg font-medium">{name}</div>
        {/* EXAMPLE
        <div className="hidden text-sm text-muted-foreground md:inline">
          liam@example.com
        </div>
        */}
      </TableCell>
      <TableCell className="text-right">
        <Button
          variant="destructive"
          size="icon"
          className="size-9 shrink-0"
          onClick={() => invokeConfirmDeleteLanguageModal(language)}
        >
          <Icons.trash className="size-4" />
        </Button>
      </TableCell>
    </TableRow>
  );
}

export function LanguagesListTable(props: TLanguagesListTableProps) {
  const { className, languages, onDeleteLanguage } = props;
  const { invokeConfirmDeleteLanguageModal, confirmDeleteLanguageModalElement } =
    useConfirmDeleteLanguageModal({ onDeleteLanguage });
  return (
    <Card className={cn(className, '__LanguagesListTable', 'xl:col-span-2')}>
      <Header {...props} />
      <CardContent className={cn('__LanguagesListTable_Content', tailwindClippingLayout())}>
        <Table>
          <LanguageTableHeader />
          <TableBody>
            {languages.map((language) => {
              const key = language.id;
              return (
                <LanguageTableRow
                  key={key}
                  language={language}
                  invokeConfirmDeleteLanguageModal={invokeConfirmDeleteLanguageModal}
                />
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
      {confirmDeleteLanguageModalElement}
    </Card>
  );
}
