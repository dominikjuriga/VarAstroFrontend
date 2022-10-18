import { Divider, Link, Stack } from "@mui/material";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useState } from "react"
import Loader from '../../components/Loader';
import useAuthentication from '../../features/auth/hooks/useAuthentication'
import UserForm from './UserForm';

const Profile = () => {
  const { user } = useAuthentication();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const toggleEdit = () => {
    setIsEditing(!isEditing)
  }
  if (user) {
    return (
      <Stack spacing={2}>
        <Typography variant="h2">Your Profile</Typography>
        <Button onClick={toggleEdit} variant="contained">Edit Details</Button>
        <UserForm user={user} disabled={!isEditing} />
        <Divider></Divider>
        <Button variant="outlined">
          <Link href="/User/Password">
            <a>Change Password</a>
          </Link>
        </Button>
      </Stack>
    )
  }

  return <Loader />
}

export default Profile