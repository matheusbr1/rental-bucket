export function DriversEmpty() {
  return (
    <div className="flex flex-col items-center gap-1 text-center w-full">
      <h3 className="text-2xl font-bold tracking-tight">
        Você não tem motoristas
      </h3>
      <p className="text-sm text-muted-foreground">
        Comece adicionando algum motorista na plataforma.
      </p>
    </div>
  )
}