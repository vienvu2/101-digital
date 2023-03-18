import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { GlobalStyle } from './GlobalStyled'
import Home from './pages/Home'
import Login from './pages/Login'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import Profile from './pages/Profile'
import { useQuery } from 'react-query'
import { QUERIES } from './contains'
import { getProfile } from './service/auth'
import { QueryClient, QueryClientProvider } from 'react-query'
import { IUser } from './interface'
import NewInvoice from './pages/NewInvoice'

const queryClient = new QueryClient()

function Main() {
  const { data: profile } = useQuery<IUser>(QUERIES.PROFILE, getProfile)

  return (
    <div className="App">
      <GlobalStyle />
      <BrowserRouter>
        <Header>
          <h1>
            <NavLink to="/">101Digital</NavLink>
          </h1>
          {profile?.userId ? (
            <Menu>
              <li>
                <NavLink to="/">Invoice List</NavLink>
              </li>
              <li>
                <NavLink to="/profile">
                  Hi, {profile?.lastName} {profile?.firstName}
                </NavLink>
              </li>
            </Menu>
          ) : (
            <Menu>
              <li>
                <NavLink to="/login">Login</NavLink>
              </li>
            </Menu>
          )}
        </Header>
        <div>
          <Routes>
            <Route path="/login" Component={Login} />
            {profile?.userId && (
              <>
                <Route path="/" Component={Home} />
                <Route path="/new-invoice" Component={NewInvoice} />
                <Route path="/profile" Component={Profile} />
              </>
            )}
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Main />
    </QueryClientProvider>
  )
}

const Menu = styled.ul`
  display: flex;
  justify-content: space-between;
  align-items: center;
  list-style: none;
  margin: 0;
  padding: 0;
  li {
    margin: 12px;
    a {
      color: rgb(47, 18, 18);
    }
  }
`

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  background-color: rgb(48, 18, 18, 0.05);
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
  padding: 0 20px;

  h1 {
    font-size: 20px;
  }
`
