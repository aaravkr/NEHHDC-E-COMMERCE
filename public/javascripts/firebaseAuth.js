


    /* ========================
      Variables
    ======================== */
   const FIREBASE_AUTH = firebase.auth();
    const FIREBASE_DATABASE = firebase.database();


    /* ========================
     google auth variable
    ======================== */
    const signInButtonGoogle = document.getElementById('sign-in-google');
    const signInButtonfacebook = document.getElementById('sign-in-facebook');
    const signOutButton = document.getElementById('sign-out');


    const login_button = document.getElementById('login-button');
    const register_button = document.getElementById('register-button');
    const loading_bar = document.getElementById('loading-bar');


    /* =======================
      Event Listeners
    ======================== */

    signInButtonGoogle.addEventListener('click', signInwithGoogle);
    signInButtonfacebook.addEventListener('click', signInwithFacebook);
    signOutButton.addEventListener('click', signOut);
    FIREBASE_AUTH.onAuthStateChanged(handleAuthStateChanged);
    login_button.addEventListener('click', login);
    register_button.addEventListener('click', register);



    /* ========================
     facebook oAuth
    ======================== */

    //function signInwithFacebook() {
    //   var provider = new firebase.auth.FacebookAuthProvider();
    //    firebase.auth().signInWithPopup(provider).then(function(result) {
    // console.log(result);
    //}).catch(function(error) {
    //  // Handle Errors here.
    //  var errorCode = error.code;
    //  var errorMessage = error.message;
    //  // The email of the user's account used.
    //  var email = error.email;
    //  // The firebase.auth.AuthCredential type that was used.
    //  var credential = error.credential;
    //  // ...
    //        
    //    console.log(` ${errorCode}  : ${errorMessage} : ${email}  : ${credential} `);    
    //});
    //    
    //}

    /* ========================
     Google oAuth
    ======================== */


    function signInwithGoogle() {
        var provider = new firebase.auth.GoogleAuthProvider();
        return firebase.auth().signInWithPopup(provider).catch(function (error) {
            console.log('google login error' + error);
        });
    }



    /* ========================
     email signup
    ======================== */

    function register() {
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        if (!email && !password) {
            return console.log(" it is required");
        }

        firebase.auth().createUserWithEmailAndPassword(email, password)
            .catch(function (error) {
                console.log(`email is ${email} and password is ${password}`);
                console.log('register error : ' + error);
            });
    };


    /* ========================
     email signin
    ======================== */

    function login() {

        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        if (!email && !password) {
            return console.log(" it is required");
        }

        firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
            console.log(`error is ${errorCode} and message is ${errorMessage}`);

        });
        console.log('hello login');
    }

    /* ========================
    sign out
    ======================== */

    function signOut() {
        firebase.auth().signOut();
    }


    





    /* ===================================
     multi provider login - stack overflow
    ======================== =============*/

    function signInwithFacebook() {

        var existingEmail = null;
        var pendingCred = null;
        var provider = new firebase.auth.FacebookAuthProvider();
        firebase.auth().signInWithPopup(provider)
            .then(function (result) {
                console.log('signed in');
            }).catch(function (error) {
                // Account exists with different credential. To recover both accounts
                // have to be linked but the user must prove ownership of the original
                // account.
                if (error.code == 'auth/account-exists-with-different-credential') {
                    existingEmail = error.email;
                    pendingCred = error.credential;
                    // Lookup existing account’s provider ID.
                    return firebase.auth().fetchProvidersForEmail(error.email)
                        .then(function (providers) {
                            if (providers.indexOf(firebase.auth.EmailAuthProvider.PROVIDER_ID) != -1) {
                                // Password account already exists with the same email.
                                // Ask user to provide password associated with that account.
                                var password = window.prompt('Please provide the password for ' + existingEmail);
                                return firebase.auth().signInWithEmailAndPassword(existingEmail, password);
                            } else if (providers.indexOf(firebase.auth.GoogleAuthProvider.PROVIDER_ID) != -1) {
                                var googProvider = new firebase.auth.GoogleAuthProvider();
                                // Sign in user to Google with same account.
                                provider.setCustomParameters({
                                    'login_hint': existingEmail
                                });
                                return firebase.auth().signInWithPopup(googProvider).then(function (result) {
                                    return result.user;
                                });
                            } else {
                                console.log('no user');
                            }
                        })
                        .then(function (user) {
                            // Existing email/password or Google user signed in.
                            // Link Facebook OAuth credential to existing account.
                            return user.linkWithCredential(pendingCred);
                        });
                }
                throw error;
            });

    };
    
    
    /* ========================
      oAuth eventhandler
    ======================== */
    function handleAuthStateChanged(user) {
        if (user) {

            console.log(user);
            signInButtonGoogle.setAttribute("hidden", "true");
            signInButtonfacebook.setAttribute("hidden", "true");
            signOutButton.removeAttribute("hidden");
             window.location = '/'; 

//            firebase.auth().currentUser.getIdToken( /* forceRefresh */ true).then(function (idToken) {
//                FIREBASE_DATABASE.ref('/user').push({
//                    token: idToken
//                });
//                console.log(`token is ${idToken}`);
//
//                // Send token to your backend via HTTPS
//                // ...
//            }).catch(function (error) {
//                console.log('error is' + error);
//            });

        } else {
            console.log("no user");
            signOutButton.setAttribute("hidden", "true");
            signInButtonGoogle.removeAttribute("hidden");
            signInButtonfacebook.removeAttribute("hidden");

        }
    }