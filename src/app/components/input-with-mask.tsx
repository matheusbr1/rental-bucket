import { Input } from "@/components/ui/input"
import InputMask from 'react-input-mask'

export const InputWithMask: React.FC<any> = ({ mask, ...props }) => (
  <InputMask mask={mask} {...props}>
    {(inputProps: React.InputHTMLAttributes<HTMLInputElement>) =>
      <Input {...inputProps} />
    }
  </InputMask>
)