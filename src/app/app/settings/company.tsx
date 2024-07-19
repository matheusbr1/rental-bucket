import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function CompanyForm() {
  return (
    <>
      <Card x-chunk="dashboard-04-chunk-1">
        <CardHeader>
          <CardTitle>Nome da empresa</CardTitle>
        </CardHeader>
        <CardContent>
          <form>
            <Input />
          </form>
        </CardContent>
        <CardFooter className="border-t px-6 py-4">
          <Button>Salvar</Button>
        </CardFooter>
      </Card>
      <Card x-chunk="dashboard-04-chunk-2">
        <CardHeader>
          <CardTitle>Endereço da empresa</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="grid grid-cols-12 gap-4">
            <Input placeholder="CEP" className="col-span-2" />
            <Input placeholder="Logradouro" className="col-span-8" />
            <Input placeholder="N" className="col-span-2" />
            <Input placeholder="Bairro" className="col-span-4" />
            <Input placeholder="Cidade" className="col-span-4" />
            <Input placeholder="UF" className="col-span-2" />
          </form>
        </CardContent>
        <CardFooter className="border-t px-6 py-4">
          <Button>Salvar</Button>
        </CardFooter>
      </Card>
    </>
  )
}