'use client';

import { signOut } from 'next-auth/react';
import type { Session } from 'next-auth';
import { LogOut, ExternalLink, User } from 'lucide-react';

interface TopBarProps {
  session: Session;
}

export default function TopBar({ session }: TopBarProps) {
  return (
    <header className="h-14 bg-background border-b border-border flex items-center justify-between px-6 shrink-0">
      <div className="flex items-center gap-2">
        <a
          href="http://localhost:3000"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1.5 transition-colors"
        >
          <ExternalLink size={14} />
          View Site
        </a>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-sm">
          <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-semibold text-xs">
            {session.user?.name?.charAt(0) || 'A'}
          </div>
          <span className="text-muted-foreground hidden sm:block">{session.user?.name}</span>
        </div>

        <button
          onClick={() => signOut({ callbackUrl: '/login' })}
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          title="Sign out"
        >
          <LogOut size={16} />
          <span className="hidden sm:block">Sign out</span>
        </button>
      </div>
    </header>
  );
}
