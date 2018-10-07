import auth0 from 'auth0-js';
import { AUTH_CONFIG } from './auth0-variables';
import history from '../history';
import { PROGRESSIVE_CONFIG } from '../Progressive/progressive-config';

export default class Auth {
  auth0 = new auth0.WebAuth({
    domain: AUTH_CONFIG.domain,
    clientID: AUTH_CONFIG.clientId,
    redirectUri: AUTH_CONFIG.callbackUrl,
    audience: "https://"+AUTH_CONFIG.domain+"/api/v2/",
    responseType: 'token id_token',
    scope: 'read:users read:current_user update:users profile update:current_user_metadata update:users_app_metadata'
  });

  userProfile;

  constructor() {
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.getAccessToken = this.getAccessToken.bind(this);
    this.getUserData = this.getUserData.bind(this);
    this.patchUserMetadata = this.patchUserMetadata.bind(this);
  }

  login() {
    this.auth0.authorize();
  }

  handleAuthentication() {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        console.log("Access Result: "+JSON.stringify(authResult));
        this.setSession(authResult);
        this.getUserData();
        history.replace('/home');
      } else if (err) {
        history.replace('/home');
        console.log(err);
        alert(`Error: ${err.error}. Check the console for further details.`);
      }
    });
  }

  setSession(authResult) {
    // Set the time that the access token will expire at
    let expiresAt = JSON.stringify(
      authResult.expiresIn * 1000 + new Date().getTime()
    );
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
    localStorage.setItem('userId', authResult.idTokenPayload.sub);
    // navigate to the home route
    history.replace('/home');
  }

  getAccessToken() {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      throw new Error('No access token found');
    }
    return accessToken;
  }
  
  getUserData(cb) {
    let accessToken = this.getAccessToken();
    let userId = localStorage.getItem('userId');
    var auth0Manage = new auth0.Management ({
      domain: AUTH_CONFIG.domain,
      token: accessToken
      });
    
    auth0Manage.getUser(userId, (err, userProfile) => {
      if (err) {
         console.log("getUser failed for "+userId+". Error: "+JSON.stringify(err));
      } else {
        this.userProfile = userProfile;
        console.log("userMetadata: "+JSON.stringify(userProfile.user_metadata));
        console.log("getUser: "+JSON.stringify(userProfile));
        
        localStorage.setItem('userProfile', JSON.stringify(userProfile));
        
        if (userProfile.user_metadata && userProfile.user_metadata.totalSteps) {
           localStorage.setItem('userMetadata', JSON.stringify(userProfile.user_metadata));
        } else {  
          var metaData = {"totalSteps": PROGRESSIVE_CONFIG.length,"step": 0};
          for (var k = 0; k < PROGRESSIVE_CONFIG.length; k++) {
            for (var i=0; i < PROGRESSIVE_CONFIG[k].questions.length; i++) {
              var objName = PROGRESSIVE_CONFIG[k].questions[i].key;
              if (PROGRESSIVE_CONFIG[k].questions[i].type === "checkbox") {
                metaData[objName] = [];
                } else {
                metaData[objName] = "";
                }
            }
          }
          localStorage.setItem('userMetadata', JSON.stringify(metaData));
          this.patchUserMetadata(metaData, cb);
        }
      }
        return (err, userProfile);
      });
  }
  
  patchUserMetadata(uData,cb) {
    console.log("patchUserMetadata");
    let userId = localStorage.getItem('userId');
    let accessToken = this.getAccessToken();
    
    console.log("patchUserMetadata - data "+JSON.stringify(uData));
    
    var auth0Manage = new auth0.Management ({
      domain: AUTH_CONFIG.domain,
      token: accessToken
      });
    
    auth0Manage.patchUserMetadata(userId, uData, (err, updateUser) => {
      if (err){
        console.log("update failed for "+userId+". Error: "+JSON.stringify(err));
      } else {
        this.userProfile = updateUser;
        localStorage.setItem('userProfile', JSON.stringify(updateUser));
        localStorage.setItem('userMetadata', JSON.stringify(updateUser.user_metadata));
        console.log("Updated UserData: "+JSON.stringify(updateUser));
        console.log("user updated");
      }
    });
  }
  
  logout() {
    // Clear access token and ID token from local storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('userProfile');
    localStorage.removeItem('userMetadata');
    this.userProfile = null;
    // navigate to the home route
    history.replace('/home');
  }

  isAuthenticated() {
    // Check whether the current time is past the 
    // access token's expiry time
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }
}
