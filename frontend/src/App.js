import React from 'react';
import './App.css';
import { GoogleLogin } from 'react-google-login';
import { GoogleLogout }  from 'react-google-login';

class App extends React.Component {

  constructor() {
    super()
    this.state = {
      full_name: "",
      first_name: "",
      picture: "",
      token: "",
      id: ""
    }
  }

  responseGoogle = (response) => {
    let profile = response.getBasicProfile();
    let id_token = response.getAuthResponse().id_token;
    let first_name = response.profileObj.givenName
    let name = profile.getName()
    let img = profile.getImageUrl()
    let email = profile.getEmail()

    let config = {
      method: 'POST',
      headers: {
            'Content-Type': 'application/json',
        },
      body: JSON.stringify({
        user: {
          full_name: name,
          email: email,
          picture: img,
          token: id_token,
          first_name: first_name
        }
      })
    }

    let URL = "https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=" + id_token
    fetch(URL)
      .then(response=> response.json())
      .then(data => {if (data.email_verified) {
        this.getUser(config)
      } else {
        alert("Login Invalid")
      }
    })
  }

  getUser = (config) => {
    let url = 'http://localhost:3000/users'
    fetch(url, config)
      .then(response => response.json())
      .then(data => {
        this.setState({
        token: data.token,
        full_name: data.full_name,
        first_name: data.first_name,
        picture: data.picture,
        id: data.id
      })
    })
  }

  logout = () => {
    console.log("logout")
    this.setState({
    token: "",
    full_name: "",
    first_name: "",
    picture: "",
    id: ""
  })
  }

  render() {
    if (this.state.token) {
      return (
        <div>
          Welcome, {this.state.full_name}!
          <GoogleLogout
            buttonText="Logout"
            onLogoutSuccess={this.logout}
          />
        </div>
      )
    } else {
      return (
        <div>
          <GoogleLogin
            clientId="306712866153-k37qt6nhspd4v53gg1l7o73vp8hc1kfs.apps.googleusercontent.com"
            buttonText="Login"
            onSuccess={this.responseGoogle}
            onFailure={this.responseGoogle}
            cookiePolicy={'single_host_origin'}
          />
        </div>
      )
    }
  }

}

export default App;
