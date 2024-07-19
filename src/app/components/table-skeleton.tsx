import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { TableRow, TableCell } from "@/components/ui/table"
import { Search } from "lucide-react"

interface Props {
  rows?: number
  columns: number
  hasSearchColumn?: boolean
}

export function TableSkeleton({
  rows = 5,
  columns,
  hasSearchColumn = true
}: Props) {
  return Array.from({ length: rows }).map((_, i) => (
    <TableRow key={i} >
      {hasSearchColumn && (
        <TableCell>
          <Button variant='outline' size='xs' disabled>
            <Search className="h-3 w-3" />
          </Button>
        </TableCell>
      )}
      {Array.from({ length: columns }).map((_, i) => (
        <TableCell key={i} >
          <Skeleton className="h-4 w-full" />
        </TableCell>
      ))}
    </TableRow>
  ))
}