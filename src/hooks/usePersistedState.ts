import { useState, useEffect } from 'react'

function usePersistedState (key: string, initialState?: any) {
  const [state, setState] = useState(() => {
    const storagedValue = localStorage.getItem(`@rentalbucket:${key}`)

    if (storagedValue) {
      return JSON.parse(storagedValue)
    } else {
      return initialState
    }
  })

  useEffect(() => {
    localStorage.setItem(`@rentalbucket:${key}`, JSON.stringify(state))
  }, [key, state])

  return [state, setState]
}

export default usePersistedState
