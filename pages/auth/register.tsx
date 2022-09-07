import React, { useState } from 'react'
import { useTranslation } from "next-i18next"
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

interface IFormProps {
  username: string,
  password: string,
  name: string,
  surname: string,
  confirmPassword: string
}

const Register = () => {
  const [formState, setFormState] = useState<IFormProps>({
    username: "",
    password: "",
    name: "",
    surname: "",
    confirmPassword: ""
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    })
  }

  const validatePasswordsValid = (password: string, confirmPassword: string) => {
    return password === confirmPassword && password.length >= 8
  }

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()
    if (!validatePasswordsValid(formState.password, formState.confirmPassword)) return
    else console.log("asd")
  }

  const { t } = useTranslation("common")

  const emailField = {
    autoComplete: 'username',
    minLength: 4,
    name: 'username',
    onChange: handleChange,
    placeholder: 'user@example.com',
    required: true,
    type: "email",
    value: formState.username
  }
  const nameField = {
    autoComplete: 'name',
    minLength: 2,
    name: 'name',
    onChange: handleChange,
    placeholder: 'John',
    required: true,
    value: formState.name,
    type: "text",
  }
  const surnameField = {
    autoComplete: 'surname',
    minLength: 2,
    name: 'surname',
    onChange: handleChange,
    placeholder: 'Doe',
    required: true,
    type: "text",
    value: formState.surname
  }

  const passwordField = {
    autoComplete: 'password',
    minLength: 8,
    name: 'password',
    onChange: handleChange,
    required: true,
    type: "password",
    value: formState.password
  }
  const confirmPasswordField = {
    autoComplete: 'confirmPassword',
    minLength: 8,
    name: 'confirmPassword',
    onChange: handleChange,
    required: true,
    type: "password",
    value: formState.confirmPassword
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="custom-form">
        <h2>Register new account</h2>
        <div>
          <label htmlFor="username">E-Mail</label>
          <input {...emailField} />
        </div>

        <div>
          <label htmlFor="name">Name</label>
          <input {...nameField} />
        </div>
        <div>
          <label htmlFor="surname">Surname</label>
          <input {...surnameField} />
        </div>


        <div>
          <label htmlFor="password">Password</label>
          <input {...passwordField} />
        </div>

        <div>
          <label htmlFor="password">Confirm Password</label>
          <input {...confirmPasswordField} />
        </div>

        <button type="submit">{t("test")}</button>
      </form>
    </>
  )
}

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'footer'])),
    },
  };
}

export default Register