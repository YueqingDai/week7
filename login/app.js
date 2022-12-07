window.addEventListener("load", () => {

  let after = document.getElementById("after_L");
  after.hidden = true;


  //sign up
  let signBtn = document.getElementById("sign");
  signBtn.addEventListener("click", () => {
    let pwdText = document.getElementById("pwd-input").value;
    let idtext = document.getElementById("id-input").value;
    if (pwdText == "" || idtext == "") {
      alert("missing input:  topic and/or Inspiration missed");
    } else {
      console.log("sign up Clicked");
      fetch('/user')
        .then(resp => resp.json())
        .then(data => {
          let taken = false;
          console.log(data.users);
          //check if username is already taken
          for (let i = 0; i < data.users.length; i++) {
            let NowUser = data.users[i].userid;
            if (idtext == NowUser) {
              alert("Username is taken, try again!");
              taken = true;
              break;
            }
          }
          if (taken == false) {
            alert("Sign Up Succeed!");
            //send the pwdText to the server
            let pwdObj = {
              "Userid": idtext,
              "pwd": pwdText
            }
            let pwdObjectJSON = JSON.stringify(pwdObj)
            fetch('/user', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: pwdObjectJSON
            })
              .then(res => res.json())
              .then(data => {
                console.log(data);
              })

          }
        })


    }
  })

  //log in
  let logBtn = document.getElementById("log");
  logBtn.addEventListener("click", () => {
    let pwdText = document.getElementById("pwd-input").value;
    let idtext = document.getElementById("id-input").value;
    //check input
    if (pwdText == "" || idtext == "") {
      alert("missing input:  topic and/or Inspiration missed");
    } else {
      console.log("Log in Clicked");

      fetch('/user')
        .then(resp => resp.json())
        .then(data => {
          console.log('signin');
          console.log(data.users);
          for (let i = 0; i <= data.users.length; i++) {
            //check user exist
            if (i == data.users.length) {
              alert("Username not found!");
              break;
            } else {
              let NowUser = data.users[i].userid;
              let NowPwd = data.users[i].pwd;
              //check password
              if (idtext == NowUser) {
                if (pwdText == NowPwd) {
                  //jump to next page
                  //location.href = "/island";
                  let before = document.getElementById("before_L");
                  before.hidden = true;
                  console.log('hide');
                  after.hidden = false;

                  let heading = document.getElementById("project__heading");
                  let subheading = document.getElementById("sub_heading");
                  heading.innerHTML = 'Kwakwa Island of ' + idtext;
                  subheading.innerHTML = 'Sea of IMA Low Res';

                  break;
                } else {
                  alert("Wrong Password!");
                  break;
                }
              }
            }

          }
        })

    }
  })

})
