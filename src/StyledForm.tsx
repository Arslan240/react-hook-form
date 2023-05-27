import styled from "styled-components";

export const StyledForm = styled.form`
width: 100%;
display: flex;
flex-direction: column;
gap: 1rem;

div {
  display: flex;
  gap: 1rem;
}

input {
  border-radius: 6px;
}

input, button {
  padding: 15px;
  font-size: 1.1rem;
  border: none;
}

input::placeholder{
  color: #212A9B;
  opacity: 1;
}
button{
  background-color: #233CF3;
  color: white;
  width: 100px;
  border-radius: 25px;
  cursor: pointer;
}

span {
  color: #e04848;
}

.name-inputs > input{
  background-color: #E8E9FF;

}

.email-phone-input > input {
  background-color: #DDE1FF;
}

#password {
  background-color: #C7CDFD;
}

#cpassword {
  background-color: #A4B1FC;
}
`