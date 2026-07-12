import { cn } from '@utils/cn'

function PageHeader({ title, description, children, className }) {
  return (
    <div
      className={cn(
        'mb-6 flex flex-col gap-4 md:mb-8 lg:flex-row lg:items-center lg:justify-between',
        className,
      )}
    >
      <div className="min-w-0">
        <h1 className="text-2xl font-semibold tracking-tight text-text md:text-3xl">
          {title}
        </h1>
        {description && (
          <p className="mt-1.5 text-sm leading-relaxed text-text-secondary md:text-base">
            {description}
          </p>
        )}
      </div>
      {children && (
        <div className="flex w-full shrink-0 flex-col gap-2 sm:flex-row sm:items-center lg:w-auto">
          {children}
        </div>
      )}
    </div>
  )
}

export default PageHeader
