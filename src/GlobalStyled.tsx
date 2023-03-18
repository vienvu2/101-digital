import styled, { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
/* Box sizing border-box for all elements */
* {
  box-sizing: border-box;
}

/* Remove default margins and paddings */
html,
body,
h1,
h2,
h3,
h4,
h5,
h6,
p,
ol,
ul {
  margin: 0;
  padding: 0;
}

/* Remove default list styles */
ol,
ul {
  list-style: none;
}

/* Remove default focus styles */
a{
  text-decoration: none;
}
a:focus,
button:focus {
  outline: none;
}

/* Set default font size and line height */
html,
body {
  font-size: 14px;
  line-height: 1.2;
  color: rgb(47 18 18);
  min-height: 100vh;
  background: #f4f4f4;
  font-family: 'Inter', sans-serif;
}

textarea:focus,
input:focus{
  outline: none;
}
textarea{

  font-family: 'Inter', sans-serif;
}

.text-right{
  text-align: right!important;
}

  `

export const Button = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
  border-radius: 4px;
  font-weight: bold;

  &:hover {
    background-color: #0062cc;
  }

  &:disabled {
    opacity: 0.5;
  }
`
