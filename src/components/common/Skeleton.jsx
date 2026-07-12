import { cn } from '@utils/cn'

function Skeleton({ className, ...props }) {
  return (
    <div
      className={cn('skeleton-shimmer rounded-md', className)}
      aria-hidden="true"
      {...props}
    />
  )
}

export default Skeleton
