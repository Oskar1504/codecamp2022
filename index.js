
let clicked_image = ""
let punkte = 0
let bilder_einzeln = [
    "coin_Gold.png", "gem_Ruby.png","F.png","letter.png",
    "fortkey.png","messageinabottle.png","supply_Pinapple.png"
]
let bilder = []

bilder_einzeln.forEach(img => {
    bilder.push(img)
    bilder.push(img)
})

tabelleErstellen()

function tabelleErstellen(){

    punkte = 0
    updatePunkte()

    document.getElementById("table").innerHTML = ""     // inhalt der tabelle köschen (alle die alten bilder)

    bilder = shuffle(bilder)

    let bilder_reihen = chunk(bilder, 4)

    bilder_reihen.forEach(reihe => {                    // für jede zeile/reihe in der tabelle gibt es eine extra liste

        let tr = document.createElement("tr")           // tr (tabellen zeile/reihen element) erstellen

        reihe.forEach(bild => {                         // für jedes bild in der reihe wird ein neues element erstellt

            let td = document.createElement("td")       //erstellen eines td elements (tabellen zelle)
            let img = document.createElement("img")     //erstellen eines img elements (bild)
            img.src = "./images/" + bild                       //src ( source = quelle) des bildes wird das bild

            img.classList.add("hidden")
            img.addEventListener("click",imageClick)

            td.append(img)                              // dem td element das img hinzufpgen
            tr.append(td)                               // dem tr (reihe) elemt das td ( tabellen zellen) element

        })

        document.getElementById("table").append(tr)
    })
}


function imageClick(event){
    let element = event.srcElement

    document.querySelectorAll(".hidden2").forEach(elm => {
        elm.classList.remove("hidden2")
    })   

    if(!element.classList.contains("show") && document.querySelectorAll(".show").length < 2){
        element.classList.add("show")
        
        setTimeout(function (){
            if(clicked_image == ""){
                clicked_image = element.src
            }else{
                if(clicked_image == element.src){           // wenn beide bilder gleich sind = gewonnen hat
                    console.log("Hat den gleichen namen")

                    document.querySelectorAll(".show").forEach(elm => {
                        elm.classList.add("win")
                        elm.classList.remove("show")

                        elm.parentElement.classList.add("green")
                    })

                    
                    playWinningSound()
                    punkte ++
                    updatePunkte()

                }else{
                    document.querySelectorAll(".show").forEach(elm => {
                        elm.classList.remove("show")

                        if(!elm.classList.contains("win")){    // bilder welche falsch sind
                            elm.classList.add("hidden2")        // bekommen hidden2 klasse damit sie wegfaden
                        }
                    })            
                }    
                clicked_image = ""
            }
        }, 800)
    }
}


/**
 * Shuffles array in place.
 * @param {Array} a items An array containing the items.
 */
    function shuffle(array) {
    let counter = array.length;

    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index/positon im array
        let index = Math.floor(Math.random() * counter);

        // Decrease counter by 1
        counter--;

        // And swap the last element with it
        let temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }

    return array;
}

function chunk(input_array, chunk_size){
    let output_array = []

    for(let i = 0, len = input_array.length; i < len; i += chunk_size){

        let teil_array = input_array.slice(i, i + chunk_size)

        output_array.push(teil_array)
    }
    
    return output_array
}

function updatePunkte(){
    
    if(punkte >= bilder_einzeln.length){
        if (confirm("Hurra du hast gewonnen. Möchtest du nochmal spielen.") == true) {
            punkte = 0
            tabelleErstellen()
        }
    }

    document.getElementById("punkte").innerText = "Punkte: "  + punkte
}


function playWinningSound() {
    var audio = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-achievement-bell-600.mp3');
    audio.play();
}



