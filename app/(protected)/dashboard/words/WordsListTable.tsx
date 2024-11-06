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
import { TWord, TWordId } from '@/features/words/types';
import { tailwindClippingLayout } from '@/shared/helpers/tailwind';

// import { useConfirmDeleteWordModal } from './DeleteWord';

interface TWordsListTableProps extends TPropsWithClassName {
  words: TWord[];
  // onDeleteWord: (id: TWordId) => Promise<unknown>;
  showAddWordModal: () => void; // React.Dispatch<React.SetStateAction<void>>;
}
type TChildProps = Omit<TWordsListTableProps, 'className'>;

function Title() {
  return (
    <div className="__WordsListTable_Title grid gap-2">
      <CardTitle>Current words</CardTitle>
      <CardDescription className="text-balance">Words you've added to the profile.</CardDescription>
    </div>
  );
}

function Toolbar(props: TChildProps) {
  const { showAddWordModal } = props;
  return (
    <div className="__WordsListTable_Toolbar ml-auto flex shrink-0 gap-2">
      <Button size="sm" onClick={showAddWordModal}>
        <Icons.add className="mr-2 size-4" />
        <span>Add</span>
        <span className="hidden sm:inline-flex">&nbsp;Word</span>
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
    <CardHeader className={cn('__WordsListTable_Header flex flex-row items-center')}>
      <Title />
      <Toolbar {...props} />
    </CardHeader>
  );
}

function WordTableHeader() {
  return (
    <TableHeader>
      <TableRow>
        <TableHead>Word</TableHead>
      </TableRow>
    </TableHeader>
  );
}

interface TWordTableRowProps {
  word: TWord;
  invokeConfirmDeleteWordModal?: (word: TWord) => void;
}

function WordTableRow(props: TWordTableRowProps) {
  const { word, invokeConfirmDeleteWordModal } = props;
  const { id, text } = word;
  return (
    <TableRow data-word-id={id}>
      <TableCell>
        <div className="text-lg font-medium">{text}</div>
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
          onClick={() => invokeConfirmDeleteWordModal?.(word)}
        >
          <Icons.trash className="size-4" />
        </Button>
      </TableCell>
    </TableRow>
  );
}

export function WordsListTable(props: TWordsListTableProps) {
  const {
    className,
    words,
    // onDeleteWord,
  } = props;
  // const { invokeConfirmDeleteWordModal, confirmDeleteWordModalElement } = useConfirmDeleteWordModal({ onDeleteWord });
  return (
    <Card className={cn(className, '__WordsListTable', 'xl:col-span-2')}>
      <Header {...props} />
      <CardContent
        className={cn(
          '__WordsListTable_Content',
          tailwindClippingLayout(),
        )}
      >
        <Table>
          <WordTableHeader />
          <TableBody>
            {words.map((word) => {
              const key = word.id;
              return (
                <WordTableRow
                  key={key}
                  word={word}
                  // invokeConfirmDeleteWordModal={invokeConfirmDeleteWordModal}
                />
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
      {/*
      {confirmDeleteWordModalElement}
      */}
    </Card>
  );
}
