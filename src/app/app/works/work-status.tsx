export type WorkStatus = "pending" | "placed" | "partial-removed" | "removed" | "canceled";

interface WorkStatusProps {
  status: WorkStatus
}

const workStatusMap: Record<WorkStatus, string> = {
  pending: 'Pendente',
  placed: 'Colocado',
  'partial-removed': 'Retirado Parc.',
  removed: 'Retirado',
  canceled: 'Cancelado',
}

export function WorkStatus({ status }: WorkStatusProps) {
  return (
    <div className="flex items-center gap-2" >
      {status === 'pending' && (
        <span data-testid='badge' className="h-2 w-2 rounded bg-slate-400" />
      )}
      {status === 'canceled' && (
        <span data-testid='badge' className="h-2 w-2 rounded bg-rose-500" />
      )}
      {status === 'placed' && (
        <span data-testid='badge' className="h-2 w-2 rounded bg-emerald-500" />
      )}
      {status === 'removed' && (
        <span data-testid='badge' className="h-2 w-2 rounded bg-blue-500" />
      )}
      {status === 'partial-removed' && (
        <span data-testid='badge' className="h-2 w-2 rounded bg-amber-500" />
      )}
      <span className="font-medium text-muted-foreground" >{workStatusMap[status]}</span>
    </div>
  )
}