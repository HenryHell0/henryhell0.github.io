var active = false;
var toggleButton = document.getElementById("toggleButton");
var recognition = new webkitSpeechRecognition();
recognition.continuous = true;
//recognition.lang = 'en-US';
recognition.interimResults = false;
//recognition.maxAlternatives = 1;
var sourceTextarea = document.getElementById("sourceText")
var resultTextarea = document.getElementById("resultText")


function translate(){
    //if (!sourceTextarea.val()) {
    //    return;
    //}
    var sourceText = sourceTextarea.innerHTML;
    var sourceLang = 'en';
    var targetLang = 'es';
    console.log(sourceText);

    var url = "https://translate.googleapis.com/translate_a/single?client=gtx&sl="+ sourceLang + "&tl=" + targetLang + "&dt=t&q=" + encodeURI(sourceText);
    //console.log(url);

    $.getJSON(url, function(data) {
        $('textarea#resultText').val(data[0][0][0]);
    });

}

function toggleSpeech () {
    active = !active;
    if (active == true) {
        runSpeechRecog()
        toggleButton.src = "assets/pause.svg"
    }
    if (active == false) {
        recognition.stop()
        toggleButton.src = "assets/record.svg"
    }
    
}

function runSpeechRecog () {
    recognition.onresult = (e) => {
        
        for(var i=e.resultIndex; i<e.results.length; i++){

            var transcript = e.results[i][0].transcript;
            //transcript.replace("\n", "<br>");
            sourceTextarea.innerHTML += transcript;
            translate();
        }
    }
    /*
    recognition.onspeechend = () => {
        recognition.stop()
    }
    */
    recognition.start();
 }
