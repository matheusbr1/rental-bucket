import { useCallback, useEffect } from "react"
import { privateApi } from "services/api"
import usePersistedState from "./usePersistedState"
import { useHistory } from 'react-router-dom'
import { signOut } from "store/user/user.actions"
import { useSnackbar } from "notistack"
import { useDispatch } from "react-redux"

const usePrivateApi = () => {
  const [tokens, setTokens] = usePersistedState('@rentalbucket:tokens', null)

  const { enqueueSnackbar: snackbar } = useSnackbar()

  const dispatch = useDispatch()

  const history = useHistory()

  const refresh = useCallback(async () => {
    try {
      const { data } = await privateApi.post('/refresh-token', {
        token: tokens?.refreshToken
      })

      const updatedTokens = {
        accessToken: data.token as string,
        refreshToken: data.refresh_token as string
      }


      setTokens(updatedTokens)

      return data.token
    } catch (err) {
      dispatch(signOut())

      snackbar('Sessão expirada, faça login novamente', { variant: 'info' })

      history?.push('/')
    }
  }, [dispatch, history, setTokens, snackbar, tokens?.refreshToken])

  useEffect(() => {
    const requestIntercept = privateApi.interceptors.request.use(
      config => {
        if (!config.headers['Authorization']) {
          config.headers['Authorization'] = `Bearer ${tokens?.accessToken}`
        }
        return config;
      }, (error) => Promise.reject(error)
    )

    const responseIntercept = privateApi.interceptors.response.use(
      response => response,
      async (error) => {
        const prevRequest = error?.config
        if (error?.response?.status === 401 && !prevRequest?.sent) {
          prevRequest.sent = true
          const newAccessToken = await refresh()
          prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`
          return privateApi(prevRequest)
        }
        return Promise.reject(error)
      }
    );

    return () => {
      privateApi.interceptors.request.eject(requestIntercept)
      privateApi.interceptors.response.eject(responseIntercept)
    }
  }, [tokens, refresh])

  return privateApi
}

export default usePrivateApi