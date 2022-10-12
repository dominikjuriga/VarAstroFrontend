import React from 'react'
import { Container, Stack } from "@mui/system";

interface IDefaultContainer {
  children: React.ReactNode;
}

const DefaultContainer = ({ children }: IDefaultContainer) => {
  return (
    <Container>
      <Stack spacing={2} marginTop={2}>
        {children}
      </Stack>
    </Container>
  )
}

export default DefaultContainer