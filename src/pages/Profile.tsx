import { useQuery } from 'react-query'
import styled from 'styled-components'
import { LOCAL_STORE, QUERIES } from '../contains'
import { Button } from '../GlobalStyled'
import { IUser } from '../interface'
import { getProfile } from '../service/auth'

const Profile = () => {
  const logout = () => {
    localStorage.removeItem(LOCAL_STORE.ORG_TOKEN)
    localStorage.removeItem(LOCAL_STORE.TOKEN)
    localStorage.removeItem(LOCAL_STORE.USER)

    window.location.href = '/login'
  }
  const { data: profile } = useQuery<IUser>(QUERIES.PROFILE, getProfile)
  return (
    <Styled.Wrap>
      <Styled.Row>
        <Styled.Left>First name</Styled.Left>
        <Styled.Right>{profile?.firstName}</Styled.Right>
      </Styled.Row>

      <Styled.Row>
        <Styled.Left>Last name</Styled.Left>
        <Styled.Right>{profile?.lastName}</Styled.Right>
      </Styled.Row>

      <Styled.Row>
        <Styled.Left>Email</Styled.Left>
        <Styled.Right>{profile?.email}</Styled.Right>
      </Styled.Row>

      <Styled.Actions>
        <Styled.Button onClick={() => logout()}>Logout</Styled.Button>
      </Styled.Actions>
    </Styled.Wrap>
  )
}

export default Profile

const Styled = {
  Actions: styled.div`
    padding: 24px;
    text-align: center;
  `,
  Button: styled(Button)`
    background: #d42323;
    &:hover {
      background: red;
    }
  `,
  Wrap: styled.div`
    margin: 24px auto;
    border: 1px solid #f4f4f4;
    max-width: 700px;
    padding: 24px;
    background: white;
    border-radius: 4px;
  `,
  Row: styled.div`
    padding: 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  `,
  Left: styled.div``,
  Right: styled.div`
    font-weight: bold;
  `,
}
