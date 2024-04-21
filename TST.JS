
function generateUsername(prefix) {
    const timestamp = new Date().getTime().toString();
    return prefix + (+timestamp % 1000000);
}

// console.log(generatePassword("Souvik karmakar","MP"));
console.log(generateUsername("MP"));