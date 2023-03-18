import { LOCAL_STORE } from '../contains'
import { IPaging } from '../interface'
import api from './api'

export const getInvoices = async (paging: IPaging) => {
  const params = JSON.parse(JSON.stringify(paging))
  let url = '/invoice-service/1.0.0/invoices?'
  return await api
    .get(url + new URLSearchParams({ ...params }).toString(), {
      headers: {
        'Content-Type': 'application/json',
        'org-token': localStorage.getItem(LOCAL_STORE.ORG_TOKEN),
      },
    })
    .then((r) => r.data)
}

export const createInvoice = async (data: any) => {
  let url = '/invoice-service/2.0.0/invoices'
  return await api
    .post(
      url,
      { invoices: [data] },
      {
        headers: {
          'Operation-Mode': 'SYNC',
          'org-token': localStorage.getItem(LOCAL_STORE.ORG_TOKEN),
          'Content-Type': 'application/json',
        },
      },
    )
    .then((r) => r.data)
}
