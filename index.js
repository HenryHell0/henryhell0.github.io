var active = false;
var toggleButton = document.getElementById("toggleButton");
var recognition = new webkitSpeechRecognition();
recognition.continuous = true;
//recognition.lang = 'en-US';
recognition.interimResults = false;
//recognition.maxAlternatives = 1;
var translations = document.getElementById("translations")
var transcript;
const basePhrase = document.getElementById("constructors").firstElementChild

// gets kids
    // translations.children
// clears
    // translations.innerHTML = "";
// adds stuff
    // translations.append(sourceTextarea)

function translate(text){
    //if (!sourceTextarea.val()) {
    //    return;
    //}
    var sourceText = text;
    var sourceLang = 'en';
    var targetLang = 'es';
    console.log(sourceText);

    var url = "https://translate.googleapis.com/translate_a/single?client=gtx&sl="+ sourceLang + "&tl=" + targetLang + "&dt=t&q=" + encodeURI(sourceText);


    $.getJSON(url, addPhrase);
}

function addPhrase(data) {
    let translated = data[0][0][0]
    
    let workingPhrase = basePhrase.cloneNode(true);
    workingPhrase.firstElementChild.innerHTML = transcript
    workingPhrase.lastElementChild.innerHTML = translated
    
    translations.appendChild(workingPhrase)
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
        transcript = e.results[e.results.length-1][0].transcript;
        //transcript.replace("\n", "<br>");

        translate(transcript)

    }
    /*
    recognition.onspeechend = () => {
        recognition.stop()
    }
    */
    recognition.start();
 }
