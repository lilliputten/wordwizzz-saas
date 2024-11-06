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
import { TWordsSet, TWordsSetId } from '@/features/wordsSets/types';
import { tailwindClippingLayout } from '@/shared/helpers/tailwind';

// import { useConfirmDeleteWordsSetModal } from './DeleteWordsSet';

interface TWordsSetsListTableProps extends TPropsWithClassName {
  wordsSets: TWordsSet[];
  // onDeleteWordsSet: (id: TWordsSetId) => Promise<unknown>;
  showAddWordsSetModal: () => void; // React.Dispatch<React.SetStateAction<void>>;
}
type TChildProps = Omit<TWordsSetsListTableProps, 'className'>;

function Title() {
  return (
    <div className="__WordsSetsListTable_Title grid gap-2">
      <CardTitle>Current wordsSets</CardTitle>
      <CardDescription className="text-balance">
        WordsSets you've added to the profile.
      </CardDescription>
    </div>
  );
}

function Toolbar(props: TChildProps) {
  const { showAddWordsSetModal } = props;
  return (
    <div className="__WordsSetsListTable_Toolbar ml-auto flex shrink-0 gap-2">
      <Button size="sm" onClick={showAddWordsSetModal}>
        <Icons.add className="mr-2 size-4" />
        <span>Add</span>
        <span className="hidden sm:inline-flex">&nbsp;WordsSet</span>
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
        <TableHead>WordsSet</TableHead>
      </TableRow>
    </TableHeader>
  );
}

interface TWordsSetTableRowProps {
  wordsSet: TWordsSet;
  invokeConfirmDeleteWordsSetModal?: (wordsSet: TWordsSet) => void;
}

function WordsSetTableRow(props: TWordsSetTableRowProps) {
  const { wordsSet, invokeConfirmDeleteWordsSetModal } = props;
  const { id, name } = wordsSet;
  return (
    <TableRow data-wordsSet-id={id}>
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
          onClick={() => invokeConfirmDeleteWordsSetModal?.(wordsSet)}
        >
          <Icons.trash className="size-4" />
        </Button>
      </TableCell>
    </TableRow>
  );
}

export function WordsSetsListTable(props: TWordsSetsListTableProps) {
  const {
    className,
    wordsSets,
    // onDeleteWordsSet,
  } = props;
  // const { invokeConfirmDeleteWordsSetModal, confirmDeleteWordsSetModalElement } = useConfirmDeleteWordsSetModal({ onDeleteWordsSet });
  return (
    <Card className={cn(className, '__WordsSetsListTable', 'xl:col-span-2')}>
      <Header {...props} />
      <CardContent
        className={cn(
          '__WordsSetsListTable_Content',
          //  tailwindClippingLayout(),
        )}
      >
        <Table>
          <WordsSetTableHeader />
          <TableBody>
            {wordsSets.map((wordsSet) => {
              const key = wordsSet.id;
              return (
                <WordsSetTableRow
                  key={key}
                  wordsSet={wordsSet}
                  // invokeConfirmDeleteWordsSetModal={invokeConfirmDeleteWordsSetModal}
                />
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
      {/*
      {confirmDeleteWordsSetModalElement}
      */}
    </Card>
  );
}
