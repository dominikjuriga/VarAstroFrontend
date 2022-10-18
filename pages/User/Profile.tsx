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
      <>
        <Typography variant="h2">Your Profile</Typography>
        <Button onClick={toggleEdit}>Edit Details</Button>
        <UserForm user={user} disabled={!isEditing} />
      </>
    )
  }

  return <Loader />
}

export default Profile