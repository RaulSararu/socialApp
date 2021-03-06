import { useState, useContext } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
  Link,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { SocialAppContext } from "./Context";

export default function Register() {
  const { users, setUsers, setLoggedInUser } = useContext(SocialAppContext);
  const [data, setData] = useState({
    username: "",
    email: "",
    pass: "",
  });

  const history = useHistory();

  const handleClick = async () => {
    const response = await axios.post("/users/register", data);

    if (response.data.success) {
      setUsers([...users, response.data.newUser]);
      setLoggedInUser(response.data.newUser);
      history.push("/login");
    }
  };

  const container = {
    padding: "40px",
    height: "60vh",
    width: 300,
    margin: "100px auto",
  };
  const avatarIcon = { backgroundColor: "blue" };
  const btn = { marginTop: "40px", marginBottom: "30px" };
  return (
    <Grid>
      <Paper elevation={20} style={container}>
        <Grid align="center">
          <Avatar style={avatarIcon}>
            <LockOutlinedIcon />
          </Avatar>
          <h2>Register!</h2>
        </Grid>
        <TextField
          label="Email adress"
          placeholder="Enter email"
          fullWidth
          required
          onChange={(e) => setData({ ...data, email: e.target.value })}
          id="email"
          value={data.email}
        />
        <TextField
          label="Username"
          placeholder="Enter username"
          fullWidth
          required
          onChange={(e) => setData({ ...data, username: e.target.value })}
          id="username"
          value={data.username}
        />
        <TextField
          label="Password"
          placeholder="Enter password"
          type="password"
          fullWidth
          required
          onChange={(e) => setData({ ...data, pass: e.target.value })}
          id="password"
          value={data.pass}
        />
        <Button
          type="submit"
          color="primary"
          variant="contained"
          style={btn}
          fullWidth
          onClick={handleClick}
        >
          Register
        </Button>
        <Typography>
          <Link href="#">Forgot password ?</Link>
        </Typography>
        <Typography>
          {" "}
          Do you already have an account?
          <Link href="/login">Log in here!</Link>
        </Typography>
      </Paper>
    </Grid>
  );
}
