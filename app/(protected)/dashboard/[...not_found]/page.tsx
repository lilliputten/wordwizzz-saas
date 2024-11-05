'use client';

import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';

export default function NotFound() {
  const router = useRouter();
  return (
    <div className="grid gap-3">
      <h1 className="text-2xl font-normal">Error: Page not found!</h1>
      <div className="flex flex-row gap-2 text-base text-muted-foreground">
        <Button onClick={() => router.back()}>Go back</Button>
        <Button onClick={() => router.push('/dashboard')}>To dashboard</Button>
      </div>
    </div>
  );
}
