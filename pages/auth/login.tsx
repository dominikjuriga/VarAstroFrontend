import React, { useState } from 'react'
import { useTranslation } from "next-i18next"
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

interface IFormProps {
  username: string,
  password: string
}

const Login = () => {
  const [formState, setFormState] = useState<IFormProps>({
    username: "",
    password: ""
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()
  }

  const { t } = useTranslation("common")

  const usernameField = {
    autoComplete: 'username',
    minLength: 4,
    name: 'username',
    onChange: handleChange,
    placeholder: 'user@example.com',
    required: true,
    type: "email",
    value: formState.username
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

  return (
    <>
      <form onSubmit={handleSubmit} className="custom-form">
        <h2>Log In</h2>
        <div>
          <label htmlFor="username">Username (E-Mail)</label>
          <input {...usernameField} />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input {...passwordField} />
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

export default Login