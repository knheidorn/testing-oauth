import React from 'react';
import './App.css';
import GoogleLogin from 'react-google-login';

class App extends React.Component {

  responseGoogle = (response) => {
    let profile = response.getBasicProfile();
    let id_token = response.getAuthResponse().id_token;
    let first_name = response.profileObj.givenName
    let name = profile.getName()
    let img = profile.getImageUrl()
    let email = profile.getEmail()

    let url = 'http://localhost:3000/users'

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
    fetch(url, config)
      .then(response => response.json())
      .then(data => {console.log(data)})
  }

  render() {
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

export default App;
