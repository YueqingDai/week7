window.addEventListener("load", () => {
    let startBtn = document.getElementById("start");
    let sendtBtn = document.getElementById("send");
    let SendDiv = document.getElementById("sendOUT");
    let checkBtn = document.getElementById("check");



    SendDiv.hidden = true;

    startBtn.addEventListener("click", () => {
        if (SendDiv.hidden == true) {
            SendDiv.hidden = false;
        } else {
            SendDiv.hidden = true;
        }
    })

    sendtBtn.addEventListener("click", () => {
        let nameText = document.getElementById("username").value;
        let toText = document.getElementById("to-input").value;
        let praise = document.getElementById("praise").value;
        if (toText == "Username" || praise == "praise here") {
            alert("missing input:  Receiver and/or praise missed");
        } else {
            console.log("send Clicked");
            fetch('/user')
                .then(resp => resp.json())
                .then(data => {
                    let userExt = false;
                    //check if username is exist
                    for (let i = 0; i < data.users.length; i++) {
                        let NowUser = data.users[i].userid;
                        if (toText == NowUser) {
                            console.log("Receiver exist");
                            userExt = true;
                            break;
                        }
                    }
                    if (userExt == false) {
                        alert("Receiver not exist");
                    } else {
                        let msg = {
                            'W_id': nameText,
                            'R_id': toText,
                            'praise': praise
                        }
                        let msgtJSON = JSON.stringify(msg);
                        fetch('/Content', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: msgtJSON
                        })
                            .then(res => res.json())
                            .then(data => {
                                console.log(data);
                            })
                        alert("Praise send!");

                    }
                })
        }

    })

    checkBtn.addEventListener("click", () => {
        let idtext = document.getElementById("id-input").value;
        fetch('/Content')
            .then(resp => resp.json())
            .then(data => {
                document.getElementById('praise_content').innerHTML = '';
                let myPraise = [];
                for (let i = 0; i < data.praise.length; i++) {
                    let praiseName = data.praise[i].r_id;
                    if (praiseName == idtext) {
                        myPraise.push(data.praise[i]);
                    }
                }

                //random praise from system
                let randn = Math.ceil(Math.random() * 10);
                let praiseForU = ['Great job!', 'You rock!', 'You are great!', 'I love your work!', 'Marvelous']

                //praise from others + system
                for (let i = 0; i < myPraise.length + randn; i++) {
                    //from others
                    if (i < myPraise.length) {
                        //show praise received by who
                        let writer = document.createElement('p');
                        let writerName = '--'+myPraise[i].w_id + ' wants to tell you:';
                        writer.innerHTML = writerName;
                        //show content
                        let praiseT = document.createElement('p');
                        let praiseText = myPraise[i].praise;
                        praiseT.innerHTML = praiseText;
                        //display
                        document.getElementById('praise_content').appendChild(writer);
                        document.getElementById('praise_content').appendChild(praiseT);
                    } else {
                        //from system
                        //show praise received by system
                        let writer = document.createElement('p');
                        let writerName = '--The Mystery wants to tell you:';
                        writer.innerHTML = writerName;
                        //show content
                        let index = Math.floor((Math.random() * praiseForU.length))
                        let praiseT = document.createElement('p');
                        let praiseText = praiseForU[index];
                        praiseT.innerHTML = praiseText;
                        //display all
                        document.getElementById('praise_content').appendChild(writer);
                        document.getElementById('praise_content').appendChild(praiseT);
                    }

                }

            })

    })

})