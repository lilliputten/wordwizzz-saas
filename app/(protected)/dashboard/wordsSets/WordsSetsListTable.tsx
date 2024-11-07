import Link from 'next/link';

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
import { TWordsSet, TWordsSetId, TWordsSetWithLanguages } from '@/features/wordsSets/types';
import { tailwindClippingLayout } from '@/shared/helpers/tailwind';

import { useConfirmDeleteWordsSetModal } from './DeleteWordsSet';

interface TWordsSetsListTableProps extends TPropsWithClassName {
  wordsSets: TWordsSetWithLanguages[];
  onDeleteWordsSet: (id: TWordsSetId) => Promise<unknown>;
  showAddWordsSetModal: () => void; // React.Dispatch<React.SetStateAction<void>>;
}
type TChildProps = Omit<TWordsSetsListTableProps, 'className'>;

function Title() {
  return (
    <div className="__WordsSetsListTable_Title grid gap-2">
      <CardTitle>Current words sets</CardTitle>
      <CardDescription className="text-balance">
        Words sets you've added to the profile.
      </CardDescription>
    </div>
  );
}

function Toolbar(props: TChildProps) {
  const { showAddWordsSetModal } = props;
  return (
    <div className="__WordsSetsListTable_Toolbar ml-auto flex shrink-0 flex-wrap gap-2">
      <Button disabled variant="ghost" size="sm" className="flex gap-2 px-4">
        <Link href="#" className="flex items-center gap-2">
          <Icons.refresh className="hidden size-4 sm:block" />
          <span>Refresh</span>
        </Link>
      </Button>
      <Button variant="ghost" size="sm" onClick={showAddWordsSetModal} className="flex gap-2 px-4">
        <Icons.add className="hidden size-4 sm:block" />
        <span>
          Add <span className="hidden sm:inline-flex">New Set</span>
        </span>
      </Button>
    </div>
  );
}

function Header(props: TChildProps) {
  return (
    <CardHeader className={cn('__WordsSetsListTable_Header flex flex-row items-center')}>
      <Title />
      <Toolbar {...props} />
    </CardHeader>
  );
}

function WordsSetTableHeader() {
  return (
    <TableHeader>
      <TableRow>
        <TableHead>Set Name</TableHead>
        <TableHead>Languages</TableHead>
      </TableRow>
    </TableHeader>
  );
}

interface TWordsSetTableRowProps {
  wordsSet: TWordsSetWithLanguages;
  invokeConfirmDeleteWordsSetModal: (wordsSet: TWordsSet) => void;
}

function WordsSetTableRow(props: TWordsSetTableRowProps) {
  const { wordsSet, invokeConfirmDeleteWordsSetModal } = props;
  const { id, name, languages } = wordsSet;
  const languagesContent = languages.map(({ id, name }) => <span key={id}>{name}</span>);
  return (
    <TableRow data-words-set-id={id}>
      <TableCell>
        <div className="text-lg font-medium">{name}</div>
        {/* EXAMPLE
        <div className="hidden text-sm text-muted-foreground md:inline">
          liam@example.com
        </div>
        */}
      </TableCell>
      <TableCell>
        <div
          className={cn(
            // Show commas after language list items
            '[&>span]:after:inline-block',
            '[&>span]:after:content-[","]',
            '[&>span]:after:mr-1',
            'last:[&>span]:after:hidden',
          )}
        >
          {languagesContent}
        </div>
      </TableCell>
      <TableCell className="text-right">
        <div className="flex justify-end gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="size-9 shrink-0"
            // onClick={() => invokeConfirmDeleteWordsSetModal(wordsSet)}
            aria-label="Edit"
            title="Edit"
            disabled
          >
            <Icons.edit className="size-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="size-9 shrink-0"
            onClick={() => invokeConfirmDeleteWordsSetModal(wordsSet)}
            aria-label="Delete"
            title="Delete"
          >
            <Icons.trash className="size-4" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
}

export function WordsSetsListTable(props: TWordsSetsListTableProps) {
  const { className, wordsSets, onDeleteWordsSet } = props;
  const { invokeConfirmDeleteWordsSetModal, confirmDeleteWordsSetModalElement } =
    useConfirmDeleteWordsSetModal({ onDeleteWordsSet });
  return (
    <Card className={cn(className, '__WordsSetsListTable', 'xl:col-span-2')}>
      <Header {...props} />
      <CardContent className={cn('__WordsSetsListTable_Content', tailwindClippingLayout())}>
        <Table>
          <WordsSetTableHeader />
          <TableBody>
            {wordsSets.map((wordsSet) => {
              const key = wordsSet.id;
              return (
                <WordsSetTableRow
                  key={key}
                  wordsSet={wordsSet}
                  invokeConfirmDeleteWordsSetModal={invokeConfirmDeleteWordsSetModal}
                />
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
      {confirmDeleteWordsSetModalElement}
    </Card>
  );
}
