import React from 'react';
// import Link from 'next/link';
// import { ArrowUpRight } from 'lucide-react';

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

import { TLanguage, TLanguageId } from './types/TLanguage';

interface TProps {
  languages: TLanguage[];
  onDeleteLanguage: (id: TLanguageId) => void;
}

export const LanguagesListTable: React.FC<TProps> = (props) => {
  const { languages, onDeleteLanguage } = props;
  return (
    <Card className="xl:col-span-2">
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle>Current languages</CardTitle>
          <CardDescription className="text-balance">
            Languages you've added to the profile.
          </CardDescription>
        </div>
        {/*
        <Button size="sm" className="ml-auto shrink-0 gap-1 px-4">
          <Link href="#" className="flex items-center gap-2">
            <span>View All</span>
            <ArrowUpRight className="hidden size-4 sm:block" />
          </Link>
        </Button>
        */}
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Language</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {languages.map(({ id, name }) => {
              return (
                <TableRow key={id}>
                  <TableCell>
                    <div className="font-medium">{name}</div>
                    {/*
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
                      onClick={() => onDeleteLanguage(id)}
                    >
                      <Icons.trash className="size-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
