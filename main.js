const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const yourMessage = document.getElementById('yourMessage');
const key = document.getElementById('key');
const lettersNum = document.getElementById('lettersNum');
const numbersNum = document.getElementById('numbersNum');
const encrypt = document.getElementById('encrypt');
const decrypt = document.getElementById('decrypt');
const randomize = document.getElementById('randomize');
const modifiedMessage = document.getElementById('modifiedMessage');

encrypt.addEventListener('click', function(e) {
    run_cipher('e');
});

decrypt.addEventListener('click', function(e) {
    run_cipher('d');
});

randomize.addEventListener('click', function(e) {
    value_randomizer();
});

function get_cipher_type() {
    const cipherType = document.querySelector('input[name="cipher"]:checked');
    if(cipherType) {
        return cipherType.value;
    }
    else {
        modifiedMessage.value = 'Please select a cipher type!';
    }
}

function randomize_key_helper(keyLength, asciiRange) {
    key.value = ''
    const chars = new Set();
    while(chars.size < keyLength) {
        chars.add(String.fromCharCode(asciiRange[0] + Math.floor(Math.random() * (asciiRange[1] - asciiRange[0]))))
    }
    chars.forEach((char) => key.value += char)
}

function value_randomizer() {
    let keyLength = 0;
    let asciiRange = [0, 0]
    switch(get_cipher_type()) {
        case 'caesar':
            lettersNum.value = Math.floor(Math.random() * 25);
            numbersNum.value = Math.floor(Math.random() * 9);
            break;
        case 'vigenere':
            keyLength = yourMessage.value.length;
            asciiRange = [65, 90]
            randomize_key_helper(keyLength, asciiRange)
            break;
        case 'monoalphabetic':
            keyLength = 26;
            asciiRange = [33, 126]
            randomize_key_helper(keyLength, asciiRange)
            break;
        default:
            break;
    }
}

function run_cipher(mode) {
    switch(get_cipher_type()) {
        case 'caesar':
            (mode === 'e') ? 
            modifiedMessage.value = caesar(yourMessage.value, lettersNum.value, numbersNum.value) : modifiedMessage.value = caesar_decrypt(yourMessage.value, lettersNum.value, numbersNum.value);
            break;
        case 'vigenere':
            (mode === 'e') ?
            modifiedMessage.value = vigenere_encrypt(yourMessage.value.toUpperCase(), key.value.toUpperCase()) : modifiedMessage.value = vigenere_decrypt(yourMessage.value.toUpperCase(), key.value.toUpperCase());
            break;
        case 'monoalphabetic':
            (mode === 'e') ?
            modifiedMessage.value = monoalphabetic(yourMessage.value.toUpperCase(), key.value, 'e') : modifiedMessage.value = monoalphabetic(yourMessage.value, key.value, 'd');
            break;
        default:
            break;
    }
}

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

function vigenere_encrypt(message, key) {
    encryptedMessage = '';
    for (let i = 0; i < message.length; i++) {
        encryptedMessage += caesar(message[i], key[i % key.length].charCodeAt() - 65, 0)
    }
    return encryptedMessage;
}

function vigenere_decrypt(message, key) {
    encryptedMessage = '';
    for (let i = 0; i < message.length; i++) {
        encryptedMessage += caesar(message[i], 26 - (key[i % key.length].charCodeAt() - 65), 0)
    }
    return encryptedMessage;
}

function monoalphabetic(message, key, mode) {
    let newMessage = '';

    if (key.length != 26) {
        return "Key must be 26 characters long";
    }
    else if (new Set(key).size != key.length) {
        return "Key must have all unique characters";
    }

    for (let i = 0; i < message.length; i++) {
        //create  messages
        if (message[i] !== ' ') {
            (mode === 'e') ? newMessage += key[(message[i].charCodeAt() - 65) % 26] : newMessage += alphabet[key.indexOf(message[i])]
        }
        else {
            newMessage += message[i]
        }
    }
    return newMessage;
}