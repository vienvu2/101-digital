import { LOCAL_STORE } from '../contains'
import { ILoginForm } from '../pages/Login'
import api from './api'

export const runLogin = async (data: ILoginForm) => {
  const dataSend = {
    grant_type: 'password',
    scope: 'openid',
    client_id: process.env.REACT_APP_CLIENT_ID,
    client_secret: process.env.REACT_APP_CLIENT_SECRET,
    ...data,
  }
  const response = await api.post('/token', dataSend, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  })

  localStorage.setItem(LOCAL_STORE.USER, JSON.stringify(response.data))
  localStorage.setItem(LOCAL_STORE.TOKEN, response.data?.access_token)

  const profile = await api.get('/membership-service/1.2.0/users/me', {
    headers: { Authorization: `Bearer ${response.data?.access_token}` },
  })

  localStorage.setItem(
    LOCAL_STORE.ORG_TOKEN,
    profile.data.data.memberships[0]?.token,
  )

  return response.data
}

export const getProfile = async () => {
  return await api
    .get('/membership-service/1.2.0/users/me')
    .then((r) => r.data?.data)
}
