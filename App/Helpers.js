


export function validateEmailAndPassword(mail, password) {
  if(mail.length > 0 ){
      if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))) {
        alert("You have entered an invalid email address!") 
        return false
      }
  }
  else {
    alert('Please enter an email address.')
    return false
  }
   if (password.length < 6){

    alert("Password cannot be lower than 6 letters.") 
    return false
   }

     return true
 }