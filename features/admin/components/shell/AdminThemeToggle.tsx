'use client';

import { Moon, Sun } from 'lucide-react';

import { useTheme } from 'next-themes';

import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

export function AdminThemeToggle() {
  const { theme, setTheme } = useTheme();

  function handleThemeToggle() {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';

    setTheme(nextTheme);
  }

  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <button
            type="button"
            aria-label="Toggle theme"
            onClick={handleThemeToggle}
            className="flex size-8 cursor-pointer items-center justify-center rounded-lg text-muted transition-colors hover:bg-surface-muted hover:text-foreground"
          />
        }>
        <Sun aria-hidden="true" className="hidden size-4 dark:block" />

        <Moon aria-hidden="true" className="block size-4 dark:hidden" />
      </TooltipTrigger>

      <TooltipContent>Toggle theme</TooltipContent>
    </Tooltip>
  );
}
