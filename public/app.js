window.addEventListener("load",() => {
  let msgButton = document.getElementById("msg-submit");
  msgButton.addEventListener("click", () => {
    let msgText = document.getElementById("msg-input").value;
    let idtext = document.getElementById("id-input").value;
    if(msgText == "" || idtext == ""){
      alert("missing input:  topic and/or Inspiration missed");
    }else{
      alert("inspiration submitted");
      //send the msgText to the server
      let msgObj = {
        "Userid" : idtext,
        "msg" : msgText
      }
      let msgObjectJSON = JSON.stringify(msgObj)
      fetch('/message', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: msgObjectJSON
            })
            .then(res => res.json())
            .then(data => {
                //console.log(data);
                //console.log("data");
              })
      }
  })

  document.getElementById('ins_show').addEventListener('click',()=>{
    let inputMon = document.getElementById("chooseMonth").value;
    let nowMon = Month2number(inputMon); 
    console.log(inputMon,nowMon);
    let idtext = document.getElementById("id-output").value;
    if(idtext == ""){
      alert("missing input:  topic missed");
    }else{

      fetch('/getmessage')
      .then(resp => resp.json())
      .then(daty => {
        console.log(daty.inspiration);
        document.getElementById('msginfo').innerHTML = '';
        let SameMonth = [];
        let SameTopic = [];
        for(let i=0;i<daty.inspiration.length; i++){
          let targetMonth = daty.inspiration[i].month +1;
          if(targetMonth == nowMon){
            SameMonth.push(daty.inspiration[i]);
          }
        }

        //console.log(SameMonth);
        //check month
        if(SameMonth.length == 0){
          alert("No inspiration this month");
        }else{
          for(let i=0; i<SameMonth.length; i++){
            if(SameMonth[i].userid.toLowerCase() == idtext.toLowerCase()){
              SameTopic.push(SameMonth[i]);
            }
          }

          //console.log(SameTopic);
          //chech topic
          if(SameTopic.length == 0){
            alert("No Same topic this month");
          }else{
            for(let i=0; i<SameTopic.length; i++){
              //display result
              //HEADING UPDATE
              let heading = document.getElementById('section-heading-show')
              heading.innerHTML = "+++Inspiration for " +idtext +" in "+ number2Month(SameTopic[i].month)+ "+++";
              //SHOW TIME
              let Rtime = document.createElement('p');
              let stringDate = "------Stored Time: " + SameTopic[i].date + "------";
              Rtime.innerHTML=stringDate;
              //show inspiration
              let insText = document.createElement('p');
              let string = "Inspiration: " + SameTopic[i].msg;
              insText.innerHTML=string;
              //display all
              document.getElementById('msginfo').appendChild(Rtime);
              document.getElementById('msginfo').appendChild(insText);
            }
            
          }
  
        }
        
      })

    }

  })

})

function number2Month(x){
  let month= '';
  if(x==1){ month = "January";}
  if(x==2){ month = "February";}
  if(x==3){ month = "March";}
  if(x==4){ month = "April";}
  if(x==5){ month = "May";}
  if(x==6){ month = "June";}
  if(x==7){ month = "July";}
  if(x==8){ month = "August";}
  if(x==9){ month = "September";}
  if(x==10){ month = "October";}
  if(x==11){ month = "November";}
  if(x==12){ month = "December";}

  return month;
}

function Month2number(x){
  let month=0;
  if(x=="January"){ month = 1;}
  if(x=="February"){ month = 2;}
  if(x=="March"){ month = 3;}
  if(x=="April"){ month = 4;}
  if(x=="May"){ month = 5;}
  if(x=="June"){ month = 6;}
  if(x=="July"){ month = 7;}
  if(x=="August"){ month = 8;}
  if(x=="September"){ month = 9;}
  if(x=="October"){ month = 10;}
  if(x=="November"){ month = 11;}
  if(x=="December"){ month = 12;}

  return month;
}