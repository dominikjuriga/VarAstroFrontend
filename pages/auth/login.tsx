import React, { useState } from 'react'

const login = () => {
  const [formState, setFormState] = useState({
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

  return (
    <>
      <form onSubmit={handleSubmit} className="custom-form">
        <div>
          <label htmlFor="username">Username</label>
          <input type="text" minLength={4} onChange={handleChange} name='username' placeholder='johndoe' value={formState.username} />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input type="password" minLength={8} onChange={handleChange} name='password' placeholder='asdasdasd' value={formState.password} />
        </div>

        <button type="submit">Submit</button>
      </form>
    </>
  )
}

export default login