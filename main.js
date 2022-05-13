prediction_1="";
var mean;
Webcam.set({
    width:350,
    height:300,
    img_format:'png',
    png_quality:90
});

camera = document.getElementById("camera");
Webcam.attach("camera");

function take_snapshot(){
    Webcam.snap(function(data_url){
        document.getElementById("result").innerHTML='<img id="captured_image" src="' + data_url + '" />';
    })
}

console.log("ml5 Varision : " + ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/T3p1WGPc-/model.json',modelLoaded);

function modelLoaded(){
    console.log("Model is Loaded");
}

function speak(){
    var synth = window.speechSynthesis;
    speak_data1 = "This hand gesture is "+ prediction_1;
    speak_data2 = "and this gesture means"+ mean;
    var utterThis = new SpeechSynthesisUtterance(speak_data1+speak_data2);
    synth.speak(utterThis);
}

function start_identification() {
    var img = document.getElementById("captured_image");
    console.log("Identification Started");
    classifier.classify(img, gotResult);
    console.log("Identification Done");
}

function gotResult(error, results) {
    if (error) {
        console.log(error);
    } else {
        console.log(results)
        document.getElementById("result_emotion_name").innerHTML = results[0].label;
        document.getElementById("confidence").innerHTML = results[0].confidence.toFixed(2) * 100 +"%";
        prediction_1 = results[0].label;
        
        if(prediction_1 == "Best"){
            mean = "All the Best";
            document.getElementById("emoji").innerHTML="👍";
        }

        if(prediction_1 == "Amazing"){
            mean = "This is looking amazing";
            document.getElementById("emoji").innerHTML="👌";
        }

        if(prediction_1 == "Victory"){
            mean = "That was a marvellous victory";
            document.getElementById("emoji").innerHTML="✌";
        }
        speak();
    }
}