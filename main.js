const alphaNum = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

const yourMessage = document.getElementById('yourMessage');
let lettersNum = document.getElementById('lettersNum');
let numbersNum = document.getElementById('numbersNum');
const encrypt = document.getElementById('encrypt');
const decrypt = document.getElementById('decrypt');
const modifiedMessage = document.getElementById('modifiedMessage');

encrypt.addEventListener('click', function(e) {
    modifiedMessage.value = caesar(yourMessage.value, lettersNum.value, numbersNum.value);
});

decrypt.addEventListener('click', function(e) {
    modifiedMessage.value = caesar_decrypt(yourMessage.value, lettersNum.value, numbersNum.value);
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