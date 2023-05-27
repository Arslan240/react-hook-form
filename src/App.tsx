import { StyledForm } from "./StyledForm";
import { ZodType, z } from "zod";
import {useForm, FieldErrors} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'

const FIRSTNAME = "firstName"
const LASTNAME = "lastName"
const EMAIL = "email"
const AGE = "age"
const PASSWORD = "password"
const CONFIRMPASSWORD = "confirmPassword"

type FormData = {
  [FIRSTNAME]: string,
  [LASTNAME]: string,
  [EMAIL]: string,
  [AGE]: number,
  [PASSWORD]: string,
  [CONFIRMPASSWORD]: string
}

type ErrorProps = {
  errors: FieldErrors
}

const Errors = ({errors}: ErrorProps) => {
  console.log(errors)
  return (
    <>
      {errors[FIRSTNAME] && <span>First Name: {errors[FIRSTNAME].message?.toString()}</span>}
      {errors[LASTNAME] && <span>Last Name: {errors[LASTNAME].message?.toString()}</span>}
      {errors[EMAIL] && <span>Email: {errors[EMAIL].message?.toString()}</span>}
      {errors[AGE] && <span>Age: {errors[AGE].message?.toString()}</span>}
      {errors[PASSWORD] && <span>Password: {errors[PASSWORD].message?.toString()}</span>}
      {errors[CONFIRMPASSWORD] && <span>Confirm Password: {errors[CONFIRMPASSWORD].message?.toString()}</span>}
    </>
  )
}

function App() {
  // schema of our form data and we pass a type to zod for our form data
  const schema: ZodType<FormData> = z
    .object({
      [FIRSTNAME]: z.string().min(2).max(30),
      [LASTNAME]: z.string().min(2).max(30),
      [EMAIL]: z.string().email(),
      [AGE]: z.number().min(18).max(70),
      [PASSWORD]: z.string().min(5).max(20),
      [CONFIRMPASSWORD]: z.string().min(5).max(20),
    })
    .refine(data => data[PASSWORD] === data[CONFIRMPASSWORD],{
      message: "Passwords don't match",
      path: [CONFIRMPASSWORD],
      //this path object means the callback of refine will be called when validating CONFIRMPASSWORD, not on PASSWORD
    })

    // register funciton registers all the inputs with the schema.
    const {register, handleSubmit, formState: {errors}} = useForm<FormData>({resolver: zodResolver(schema)})

    const submitData = (data: FormData) => {
      console.log("It worked", data)
    }


    // when we click submit button, the data is first validated, then the function passed to handleSubmit will be called.
  return (
    <div className="app">
      <StyledForm onSubmit={handleSubmit(submitData)}>
        <Errors errors={errors}/>
        <div className="name-inputs">
          <input type="text" id="firstName" placeholder="First Name" {...register(FIRSTNAME)}/>
          
          <input type="text" id="lastName" placeholder="Last Name" {...register(LASTNAME)}/>
        </div>
        <div className="email-phone-input">
          <input type="email" id="email" placeholder="Email" {...register(EMAIL)}/>
          <input type="number" id="age" placeholder="Age" {...register(AGE, {valueAsNumber: true})}/>
        </div>

        <input type="password" id="password" placeholder="Password" {...register(PASSWORD)} />
        <input type="password" id="cpassword" placeholder="Confirm Password" {...register(CONFIRMPASSWORD)} />
        <button>Submit</button>
      </StyledForm>
    </div>
  );
}

export default App;
