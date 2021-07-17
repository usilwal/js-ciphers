const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const vigenereTable = create_vigenere_table();
const yourMessage = document.getElementById('yourMessage');
const keywordV = document.getElementById('keywordV');
let lettersNum = document.getElementById('lettersNum');
let numbersNum = document.getElementById('numbersNum');
const encryptC = document.getElementById('encryptC');
const encryptV = document.getElementById('encryptV');
const decryptC = document.getElementById('decryptC');
const modifiedMessage = document.getElementById('modifiedMessage');

encryptC.addEventListener('click', function(e) {
    modifiedMessage.value = caesar(yourMessage.value, lettersNum.value, numbersNum.value);
});

decryptC.addEventListener('click', function(e) {
    modifiedMessage.value = caesar_decrypt(yourMessage.value, lettersNum.value, numbersNum.value);
});

encryptV.addEventListener('click', function(e) {
    modifiedMessage.value = vigenere_encrypt(yourMessage.value.toUpperCase(), keywordV.value.toUpperCase());
});

function caesar(message, lettersDown, numbersDown) {
    let newMsg = '';
    let newAscii;
    for(let i = 0; i < message.length; i++) {
        if (message[i].match(/^[A-Z]+$/)) {
            newAscii = ((message[i].charCodeAt() - 65 + parseInt(lettersDown)) % 26) + 65;
        }
        else if (message[i].match(/^[a-z]+$/)) {
            newAscii = ((message[i].charCodeAt() - 97 + parseInt(lettersDown)) % 26) + 97;
        }
        else if (message[i].match(/^[0-9]+$/)) {
            newAscii = ((message[i].charCodeAt() - 48 + parseInt(numbersDown)) % 10) + 48;
        }
        else {
            newAscii = message[i].charCodeAt();
        }
        newMsg += String.fromCharCode(newAscii)
    }
    return newMsg;
}

function caesar_decrypt(message, lettersUp, numbersUp) {
    return caesar(message, 26 - lettersUp, 10 - numbersUp)
}

function create_vigenere_table() {
    let table = []
    for (let i = 0; i < 26; i++) {
        modAlphabet = '';
        for (let j = 0; j < 26; j++) {
            modAlphabet += caesar(alphabet[j], i, i)
        }
        table.push(modAlphabet)
    }
    return table
}

function vigenere_encrypt(message, key) {
    encryptedMessage = '';
    for (let i = 0; i < message.length; i++) {
        encryptedMessage += caesar(message[i], key[i % key.length].charCodeAt() - 65, 0)
    }
    return encryptedMessage;
}