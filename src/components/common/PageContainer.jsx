import { cn } from '@utils/cn'

function PageContainer({ children, className }) {
  return (
    <div
      className={cn(
        'mx-auto w-full max-w-[1440px] animate-fade-in',
        className,
      )}
    >
      {children}
    </div>
  )
}

export default PageContainer
