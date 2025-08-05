import { cn } from '@/lib/utils';

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={cn('animate-pulse rounded-md bg-muted', className)}
      {...props}
    />
  );
}

export function FoodItemSkeleton() {
  return (
    <div className="bg-card rounded-lg border shadow-sm overflow-hidden">
      <Skeleton className="h-48 w-full" />
      <div className="p-4 space-y-3">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
        <div className="flex items-center justify-between pt-2">
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-9 w-24" />
        </div>
      </div>
    </div>
  );
}

export function CategorySkeleton() {
  return (
    <div className="bg-card rounded-lg border shadow-sm overflow-hidden">
      <Skeleton className="h-32 w-full" />
      <div className="p-4">
        <Skeleton className="h-5 w-24" />
        <Skeleton className="h-4 w-16 mt-2" />
      </div>
    </div>
  );
}