//DOM
const randomNumbers = document.getElementById("random-numbers");
const bottoneConferma = document.getElementById("conferma-btn");
const ricomincia = document.getElementById("ricomincia");
const message = document.getElementById("messaggio-winlose");
const inputForm = document.getElementById("numbers-form");
const formElem = document.querySelectorAll(".memory-num");


//genero i 5 numeri
const numeriDaIndovinare = [];

// Disabilito  gli input all'inizio
formElem.forEach(input => {
    input.disabled = true;
});

const indovina = () => {
    while (numeriDaIndovinare.length < 5) {
        const numeriRnd = Math.floor((Math.random() * 100) + 1);
        //escludo i doppioni dai numeri generati
        if (!numeriDaIndovinare.includes(numeriRnd)) {
            numeriDaIndovinare.push(numeriRnd)
        }
    }

}

randomNumbers.innerHTML = numeriDaIndovinare;

const cancellaNumeri = () => {
    randomNumbers.innerHTML = `<h3 class="sbrigati">Ora Tocca a Te</h3>`
    // Abilita gli input dopo i primi 30 secondi
    formElem.forEach(input => {
        input.disabled = false;
    });

    // Secondo timer per bloccare il gioco
    setTimeout(() => {
        // Rimuovi la scritta lampeggiante e metti quella statica
        randomNumbers.innerHTML = `<h3>Tempo Scaduto</h3>`;

        formElem.forEach(input => {
            input.disabled = true;
        });
        bottoneConferma.disabled = true;
        message.classList.remove('h5', 'h5-loser');
        message.classList.add('h5-loser');
        message.innerHTML = "Game Over";
    }, 30000);
}

setTimeout(cancellaNumeri, 30000)


indovina();
///////////////////7
//gestico gli input
const numeriInseriti = [];
bottoneConferma.addEventListener("click", function () {
    numeriInseriti.length = 0;

    // Controllo se ci sono campi lasciati vuoti o non validi e stampo il relativo avviso per l'utente
    let campiVuoti = false;
    formElem.forEach(input => {
        if (input.value === '' || input.value === null || input.value === '0') {
            campiVuoti = true;
        }
    });

    if (campiVuoti) {
        message.innerHTML = `Non puoi lasciare vuoto o inserire 0`;
        return;
    }

    formElem.forEach(numeroInserito => {
        numeriInseriti.push(Number(numeroInserito.value));
    });

    randomNumbers.innerHTML = ``;

    const numeriUnici = new Set(numeriInseriti)

    if (numeriUnici.size !== numeriDaIndovinare.length) {
        message.innerHTML = `Hai inserito uno o più doppioni`
    } else {
        let counter = 0;
        let numeroIndovinato = [];

        numeriUnici.forEach(numeroUnico => {
            if (numeriDaIndovinare.includes(numeroUnico)) {
                counter++;
                numeroIndovinato.push(numeroUnico);
            }
        });

        // Gestione del messaggio in base a vittoria o sconfitta - 
        //messaggi separati per sconfitta con 0 numeri indovinati e sconfitta con numeri indovinati minori di 3
        message.classList.remove('h5', 'h5-loser');

        if (counter >= 3) {
            message.classList.add('h5');
            message.innerHTML = `Hai vinto indovinando ${counter} numeri su 5 : (${numeroIndovinato})`;
            // Disabilito input e bottone dopo la vittoria
            formElem.forEach(input => {
                input.disabled = true;
            });
            bottoneConferma.disabled = true;
            // Rimuovo la scritta lampeggiante
            randomNumbers.innerHTML = '';
        } else if (counter > 0) {
            message.classList.add('h5-loser');
            message.innerHTML = `Hai indovinato solo ${counter} numeri su 5 : hai perso`;
            // Disabilito input e bottone dopo la sconfitta
            formElem.forEach(input => {
                input.disabled = true;
            });
            bottoneConferma.disabled = true;
            randomNumbers.innerHTML = '';
        } else {
            message.classList.add('h5-loser');
            message.innerHTML = `Non indovinato abbastanza numeri : hai perso`;
            formElem.forEach(input => {
                input.disabled = true;
            });
            bottoneConferma.disabled = true;
            randomNumbers.innerHTML = '';
        }
    }
});




ricomincia.addEventListener("click", function () {
    location.reload();
});