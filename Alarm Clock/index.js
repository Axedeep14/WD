const alarmSubmit = document.getElementById('alarmSubmit');
let validDate = false;
$('#failure').hide();
$('#success').hide();
const alarm = document.getElementById('alarm');
// Add an event listener to the submit button
alarmSubmit.addEventListener('click', setAlarm);

var audio = new Audio('./ring.mp3');

// function to play the alarm ring tone
function ringBell() {
    audio.play();
}

alarm.addEventListener('blur', ()=>{
    console.log("alarm is blurred");
    // Validate phone here
    let regex = /^([0-9]){4}\-([0-9]){2}\-([0-9]){2}\s([0-9]){2}\:([0-9]){2}\:([0-9]){2}$/;
    let str = alarm.value;
    console.log(regex, str);
    if(regex.test(str)){
        console.log('Your alarm is valid');
        alarm.classList.remove('is-invalid');
        validDate = true;
    }
    else{
        console.log('Your alarm is not valid');
        alarm.classList.add('is-invalid');
        validDate = false;
        
    }
})

// This function will run whenever alarm is set from the UI
function setAlarm(e) {
    e.preventDefault();
    if(validDate){
        let failure = document.getElementById('failure');
        console.log('Date is valid. Setting the alarm');
        let success = document.getElementById('success');
        success.classList.add('show');
        // failure.classList.remove('show');
        // $('#failure').alert('close');
        $('#failure').hide();
        $('#success').show();
        const alarm = document.getElementById('alarm');
        alarmDate = new Date(alarm.value);
        console.log(`Setting Alarm for ${alarmDate}...`);
        now = new Date();
        let timeToAlarm = alarmDate - now;
        console.log(timeToAlarm);
        if (timeToAlarm >= 0) {
            setTimeout(() => {
                console.log("Ringing now")
                ringBell();
            }, timeToAlarm);
        }
        
    }
    else{
        console.log('Date not valid. Please correct the errors and try again');
        let failure = document.getElementById('failure');
        failure.classList.add('show');
        // success.classList.remove('show');
        // $('#success').alert('hide');
        $('#success').hide();
        $('#failure').show();
        }




    
}
