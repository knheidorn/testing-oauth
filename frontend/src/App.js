import React from 'react';
import './App.css';
import GoogleLogin from 'react-google-login';

class App extends React.Component {

  responseGoogle = (response) => {
    console.log(response);
    let profile = response.getBasicProfile();
    let id_token = response.getAuthResponse().id_token;
    console.log('Profile: ' + profile);
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail());
    console.log('Token: ' + id_token)
  


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

  // componentDidMount = () => {
  //   window.gapi.signin2.render(
  //     GOOGLE_BUTTON,
  //     {
  //       width: 200,
  //       height: 50,
  //       onsuccess: this.onSuccess
  //     },
  //   );
  // }
  //
  // onSuccess = (googleUser) =>{
  //   let profile = googleUser.getBasicProfile();
  //   console.log("Name: " + profile.getName())
  // }
  //
  //
  // render() {
  //   return (
  //     <div className="App">
  //       <header className="App-header">
  //         <div id={GOOGLE_BUTTON} />
  //       </header>
  //     </div>
  //   );
  // }



}

export default App;
