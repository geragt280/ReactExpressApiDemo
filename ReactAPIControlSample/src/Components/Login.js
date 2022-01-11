import logo from "../logo.svg";
import Cookies from "universal-cookie";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

const axios = require("axios");
const cookies = new Cookies();
function Login() {
  const [usernameInput, setusernameInput] = useState("");
  const [passwordInput, setpasswordInput] = useState("");
  const [browserIdGenerated, setbrowserIdGenerated] = useState("");
  const [authenticating, setAuthenticating] = useState(false);
  const [loggedInStutus, setloggedInStutus] = useState("No previous login");
  const history = useHistory();

  function makeid(length) {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  useEffect(() => {
    if (cookies.get("loginuseremail")) {
      history.push("/home");
    }

    if (cookies.get("mybrowsergeneratedId")) {
      setbrowserIdGenerated(cookies.get("mybrowsergeneratedId"));
    } else {
      setbrowserIdGenerated(makeid(15));
    }
  }, []);

  async function login() {
    if (isNotEmptyFields()) {
      console.log("inside login.");
      const username = usernameInput;
      const password = passwordInput;
      setAuthenticating(true);
      const url = "http://localhost:3005/Login";
      await axios
        .post(url, {
          email: username,
          password: password,
          browser_id: browserIdGenerated,
        })
        .then((response) => {
          //message after authentication.
          if (response.data.status) {
            setAuthenticating(false);
            SaveLoginInfo(
              usernameInput,
              response.data.message,
              browserIdGenerated
            );
            history.push("/home");
          } else {
            setAuthenticating(false);
            setloggedInStutus(response.data.message);
            console.log(response);
          }
        })
        .catch(function (error) {
          console.log("errort==>", error);
        });
    } else {
      setloggedInStutus("Email and Password fields can not be empty.");
    }
  }

  //This function run when we try to register our username and password.
  function Register() {
    if (isNotEmptyFields()) {
      fetch("http://localhost:3005/Register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: usernameInput,
          password: passwordInput,
        }),
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setloggedInStutus(data.message);
        })
        .catch((error) => console.log(error));
    } else {
      setloggedInStutus("Email and Password fields can not be empty.");
    }
  }

  function SaveLoginInfo(usernamedata, userloginstatus, currentbrowserid) {
    setloggedInStutus(userloginstatus);
    cookies.set("loginuseremail", usernamedata, { path: "/" });
    cookies.set("mybrowsergeneratedId", currentbrowserid, { path: "/" });
  }

  function sleep(seconds) {
    var e = new Date().getTime() + seconds * 1000;
    while (new Date().getTime() <= e) {}
  }

  function updateUsernameValue(evt) {
    setusernameInput(evt.target.value);
  }

  function updatePasswrodValue(evt) {
    setpasswordInput(evt.target.value);
  }

  function isNotEmptyFields() {
    return usernameInput && passwordInput ? true : false;
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Hello React</p>
        <div className="flowControl">
          <p>Email: </p>{" "}
          <input
            id="usernameinput"
            type="text"
            style={{ margin: 10 }}
            value={usernameInput}
            onChange={updateUsernameValue}
          ></input>
        </div>

        <div className="flowControl">
          <p>Password: </p>{" "}
          <input
            type="password"
            style={{ margin: 10 }}
            value={passwordInput}
            onChange={updatePasswrodValue}
          ></input>
        </div>

        <div className="flowControl">
          <button
            style={{
              margin: 5,
              padding: 10,
              backgroundColor: authenticating ? "gray" : "green",
              color: "white",
            }}
            onClick={() => login()}
            disabled={authenticating}
          >
            Login
          </button>
          <button
            style={{
              margin: 5,
              padding: 10,
              backgroundColor: "Background",
              color: "black",
            }}
            onClick={() => Register()}
          >
            Register
          </button>
        </div>
        <p>
          {usernameInput} {passwordInput} {browserIdGenerated}
        </p>
        <div>
          <p>{loggedInStutus} </p>{" "}
        </div>
      </header>
    </div>
  );
}

export default Login;
