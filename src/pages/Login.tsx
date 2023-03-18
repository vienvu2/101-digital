import { useForm } from 'react-hook-form'
import styled from 'styled-components'
import { Button } from '../GlobalStyled'
import { runLogin } from './../service/auth'

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export type ILoginForm = {
  username: string
  password: string
}
const Login = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<ILoginForm>({
    defaultValues: {
      username: 'dung+octopus4@101digital.io',
      password: 'Abc@123456',
    },
  })

  const onSubmit = (data: ILoginForm) => {
    runLogin(data)
      .then((res) => {
        window.location.href = '/'
      })
      .catch((e) => {
        const message = e.response.data?.error_description
        setError('username', { type: 'server', message })
      })
  }

  return (
    <Container>
      <LoginForm onSubmit={handleSubmit(onSubmit)}>
        <Title>Login</Title>
        <Label>Email</Label>
        <Input
          type="text"
          {...register('username', {
            required: true,
            pattern: emailPattern,
          })}
        />
        {errors.username?.type === 'required' && (
          <TextError>Email is required</TextError>
        )}
        {errors.username?.type === 'pattern' && (
          <TextError>Invalid email address</TextError>
        )}
        {errors.username?.type === 'server' && (
          <TextError>{errors.username?.message}</TextError>
        )}
        <Label>Password</Label>
        <Input
          type="password"
          {...register('password', {
            required: true,
          })}
        />
        {errors.password?.type === 'required' && (
          <TextError>Email is required</TextError>
        )}

        <SubmitButton type="submit">Login</SubmitButton>
      </LoginForm>
    </Container>
  )
}

export default Login

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 50px);
`

const LoginForm = styled.form`
  width: 500px;
  border: 1px solid #ccc;
  padding: 16px 32px;
  border-radius: 4px;
  background: white;
`

const Title = styled.h3`
  margin-bottom: 12px;
  font-weight: bold;
  font-size: 20px;
`
const Label = styled.label`
  margin-bottom: 12px;
  font-weight: bold;
  opacity: 0.6;
  margin-top: 12px;
  display: block;
`

const Input = styled.input`
  padding: 12px 16px;
  border: 1px solid #ccc;
  margin-bottom: 10px;
  width: 100%;
  display: block;
  border-radius: 4px;
`

const SubmitButton = styled(Button)`
  width: 100%;
`

const TextError = styled.p`
  color: red;
  font-size: 12px;
`
