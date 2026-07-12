import { cn } from '@utils/cn'

function Table({
  children,
  className,
  caption,
  scrollable = false,
  maxHeight = 'max-h-[calc(100vh-14rem)]',
  ...props
}) {
  return (
    <div
      className={cn(
        'w-full rounded-xl border border-border',
        scrollable ? cn('overflow-auto', maxHeight) : 'overflow-x-auto',
      )}
    >
      <table
        className={cn('w-full min-w-[1100px] border-collapse text-left text-sm', className)}
        {...props}
      >
        {caption && (
          <caption className="border-b border-border bg-bg px-4 py-3 text-left text-sm font-medium text-text">
            {caption}
          </caption>
        )}
        {children}
      </table>
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
        'transition-colors duration-150',
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
        'px-4 py-3 text-xs font-semibold tracking-wide text-text-secondary uppercase',
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
      className={cn('px-4 py-3.5 text-sm text-text', alignStyles[align], className)}
      {...props}
    >
      {children}
    </td>
  )
}

function TableEmpty({ colSpan, message = 'No data available', className }) {
  return (
    <tr>
      <td
        colSpan={colSpan}
        className={cn('px-4 py-12 text-center text-sm text-muted', className)}
      >
        {message}
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
