export function WorksEmpty() {
  return (
    <div className="flex flex-col items-center gap-1 text-center">
      <h3 className="text-2xl font-bold tracking-tight">
        Você não tem serviços
      </h3>
      <p className="text-sm text-muted-foreground">
        Comece adicionando algum serviço na plataforma.
      </p>
    </div>
  )
}