import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { useMutation, useQueries, useQuery } from 'react-query'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { Pagination } from '../components/Paging'
import { Button } from '../GlobalStyled'
import { IInvoice, IPaging, IPagingServer } from '../interface'
import { createInvoice, getInvoices } from '../service/invoice'

const Home = () => {
  const [page, setPage] = useState(1)
  const [text, setText] = useState('')
  const [searchKey, setSearchKey] = useState('')

  const paging: IPaging = {
    pageNum: page,
    pageSize: 10,
    dateType: 'INVOICE_DATE',
    sortBy: 'CREATED_DATE',
    ordering: 'DESCENDING',
    keyword: searchKey,
  }
  const { data, isLoading, refetch } = useQuery<{
    data: IInvoice[]
    paging: IPagingServer
  }>(['invoices', page, searchKey], () => getInvoices(paging))

  return (
    <TableStyled>
      <HeaderStyle>
        <h3>Invoice List</h3>

        <input
          placeholder="Enter key search"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyUp={(e) => e.key == 'Enter' && setSearchKey(text)}
        />

        <NavLink to="/new-invoice">
          <Button>Create new </Button>
        </NavLink>
      </HeaderStyle>
      <div className="wrap">
        <table>
          <thead>
            <tr>
              <th>Invoice Number</th>
              <th>Create at</th>
              <th>Type</th>
              <th>Customer</th>
              <th className="text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            {data?.data?.map((a) => (
              <tr key={a.invoiceNumber}>
                <td> {a.invoiceNumber}</td>
                <td> {dayjs(a.createdAt).format('DD/MM/YYYY - HH:mm')}</td>
                <td>{a.type}</td>
                <td>
                  {a.customer?.lastName} {a.customer?.firstName}
                </td>
                <td className="text-right">
                  {a.totalAmount} {a.currency}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination
        page={page}
        totalPage={Math.ceil((data?.paging?.totalRecords || 1) / 10)}
        onChange={(e) => setPage(e)}
      />
    </TableStyled>
  )
}
export default Home

const TableStyled = styled.div`
  input {
    height: 35px;
    border: 1px solid #ccc;
    border-radius: 4px;
    padding-left: 16px;
  }
  padding: 12px;
  background: white;
  .wrap {
    overflow: auto;
  }
  table {
    border-collapse: collapse;
    width: 100%;
    font-size: 16px;
    color: #333;
    margin-bottom: 20px;
  }
  th {
    text-align: left;
  }
  th,
  td {
    padding: 10px;
    border: 1px solid #ccc;
    font-size: 14px;
  }

  th {
    background-color: #f2f2f2;
    font-weight: bold;
  }

  tr:nth-child(even) {
    background-color: #f2f2f2;
  }

  tr:hover {
    background-color: #ddd;
  }
`

const HeaderStyle = styled.div`
  display: flex;
  padding: 16px 0;
  gap: 16px;
  h3 {
    margin: 0;
    flex: 1;
  }
`
