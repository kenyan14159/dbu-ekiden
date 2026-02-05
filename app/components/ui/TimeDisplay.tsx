import { cn } from '@/lib/utils';

interface TimeDisplayProps {
  event: string;
  time: string;
  className?: string;
  eventClassName?: string;
  timeClassName?: string;
  size?: 'sm' | 'md' | 'lg';
}

/**
 * 統一されたタイム表示コンポーネント
 * 形式: "距離 タイム" (例: "1500m 3:47.75")
 */
export default function TimeDisplay({
  event,
  time,
  className,
  eventClassName,
  timeClassName,
  size = 'md',
}: TimeDisplayProps) {
  const sizeClasses = {
    sm: {
      container: 'text-xs',
      event: 'text-neutral-500',
      time: 'font-sans font-medium text-neutral-900',
    },
    md: {
      container: 'text-sm',
      event: 'text-neutral-500',
      time: 'font-sans font-medium text-neutral-900',
    },
    lg: {
      container: 'text-base',
      event: 'text-neutral-600',
      time: 'font-sans font-bold text-lg text-daito-green',
    },
  };

  const classes = sizeClasses[size];

  return (
    <div className={cn('flex items-center gap-2', classes.container, className)}>
      <span className={cn(classes.event, eventClassName)}>{event}</span>
      <span className={cn(classes.time, timeClassName)}>{time}</span>
    </div>
  );
}
