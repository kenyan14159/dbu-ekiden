"use client";

import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export default function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={cn(
        "flex items-center space-x-1 text-sm text-neutral-600",
        className
      )}
    >
      {/* ホームリンク */}
      <Link
        href="/"
        className="hover:text-daito-green transition-colors"
        aria-label="Home"
      >
        Home
      </Link>

      {/* パンくずアイテム */}
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <div key={index} className="flex items-center space-x-1">
            <ChevronRight className="w-4 h-4 text-neutral-400" />
            {item.href && !isLast ? (
              <Link
                href={item.href}
                className="hover:text-daito-green transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span
                className={cn(
                  "font-medium",
                  isLast ? "text-neutral-900" : "text-neutral-600"
                )}
                aria-current={isLast ? "page" : undefined}
              >
                {item.label}
              </span>
            )}
          </div>
        );
      })}
    </nav>
  );
}
