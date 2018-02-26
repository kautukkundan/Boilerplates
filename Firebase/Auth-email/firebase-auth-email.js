var userId;
firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    // User is signed in.
    console.log(user.uid);
    userId = user.uid;
  } else {
    // No user is signed in.
    console.log("no user");
  }
});

console.log(firebase.auth().currentuser.uid);

function signUp() {
  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;
  firebase.auth().createUserWithEmailAndPassword(email, password).then(function (data) {
    console.log(data);
    userId = data.uid;
    alert("sign-up-success");
  }).catch(function (error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    alert(errorMessage);
  });
}

function logIn() {
  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;
  firebase.auth().signInWithEmailAndPassword(email, password).then(function (data) {
    console.log(data);
    userId = data.uid;
    alert("login-success");
  }).catch(function (error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorMessage);
    if(errorMessage==='There is no user record corresponding to this identifier. The user may have been deleted.'){
      alert("This user does not exist, please signup to continue")
    }
    else if(errorMessage==='The email address is badly formatted.'){
      alert('Please check the email formatting')
    }
    else if(errorMessage==='The password is invalid or the user does not have a password.'){
      alert(errorMessage)
    }
    else {
      alert('oops something went wrong! please login again')
    }
  });
}