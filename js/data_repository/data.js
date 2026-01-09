function getRegisteredUser() {
  let users =  JSON.parse(localStorage.getItem('registeredUser'));
  if(!users){
    users = [];
  }
  console.log(users);
  return users;
}

function saveRegisteredUser(userPara){
  let users = getRegisteredUser();
  users.push(userPara);
  localStorage.setItem("registeredUser", JSON.stringify(users));
}

function saveLoggedInUser(userParam){
  sessionStorage.setItem("currentLoggedInUser", JSON.stringify(userParam));

}

function getCurrentLoggedInUser()  {
 return JSON.parse(sessionStorage.getItem('getCurrentLoggedInUser'));
}

// function getCurrentLoggedInUser() {
//   return JSON.parse(sessionStorage.getItem('currentLoggedInUser'));
// }

