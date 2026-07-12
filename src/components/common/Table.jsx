import { cn } from '@utils/cn'

function Table({
  children,
  className,
  caption,
  scrollable = false,
  maxHeight = 'max-h-[calc(100vh-14rem)]',
  minWidth = 'min-w-[720px] md:min-w-[960px] lg:min-w-[1100px]',
  bordered = true,
  ...props
}) {
  return (
    <div className="relative w-full">
      <div
        className={cn(
          'w-full rounded-2xl bg-surface',
          bordered && 'border border-border',
          scrollable
            ? cn('overflow-auto scrollbar-thin', maxHeight)
            : 'overflow-x-auto overscroll-x-contain scrollbar-thin',
        )}
      >
        <table
          className={cn(
            'w-full border-collapse text-left text-sm',
            minWidth,
            className,
          )}
          {...props}
        >
          {caption && (
            <caption className="border-b border-border bg-bg px-4 py-3 text-left text-sm font-medium text-text md:px-6">
              {caption}
            </caption>
          )}
          {children}
        </table>
      </div>
    </div>
  )
}

function TableHead({ children, className, sticky = false }) {
  return (
    <thead
      className={cn(
        'border-b border-border bg-bg',
        sticky && 'sticky top-0 z-10 shadow-sm',
        className,
      )}
    >
      {children}
    </thead>
  )
}

function TableBody({ children, className }) {
  return <tbody className={cn('divide-y divide-border', className)}>{children}</tbody>
}

function TableRow({ children, className, clickable = false, ...props }) {
  return (
    <tr
      className={cn(
        'transition-all duration-200 ease-out',
        clickable && 'cursor-pointer hover:bg-bg',
        className,
      )}
      {...props}
    >
      {children}
    </tr>
  )
}

function TableHeaderCell({ children, className, align = 'left', scope = 'col', ...props }) {
  const alignStyles = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  }

  return (
    <th
      scope={scope}
      className={cn(
        'px-4 py-3 text-xs font-semibold tracking-wider text-text-secondary uppercase md:px-6',
        alignStyles[align],
        className,
      )}
      {...props}
    >
      {children}
    </th>
  )
}

function TableCell({ children, className, align = 'left', ...props }) {
  const alignStyles = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  }

  return (
    <td
      className={cn(
        'px-4 py-3.5 text-sm text-text md:px-6 md:py-4',
        alignStyles[align],
        className,
      )}
      {...props}
    >
      {children}
    </td>
  )
}

function TableEmpty({ colSpan, message = 'No data available', className }) {
  return (
    <tr>
      <td colSpan={colSpan} className={cn('p-0', className)}>
        <div className="flex flex-col items-center justify-center px-6 py-14 text-center">
          <p className="text-base font-medium text-text">{message}</p>
          <p className="mt-1 max-w-sm text-sm text-text-secondary">
            There are no records to display right now.
          </p>
        </div>
      </td>
    </tr>
  )
}

Table.Head = TableHead
Table.Body = TableBody
Table.Row = TableRow
Table.HeaderCell = TableHeaderCell
Table.Cell = TableCell
Table.Empty = TableEmpty

export default Table
