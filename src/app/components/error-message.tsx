import { PropsWithChildren } from "react";

export function ErrorMessage({ children }: PropsWithChildren) {
  return <p className="text-xs text-rose-500 dark:text-rose-400" >
    {children}
  </p>
}