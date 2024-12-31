const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    
});


function generatePassword(length, options) {
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';

    let chars = '';
    if (options.lowercase) chars += lowercase;
    if (options.uppercase) chars += uppercase;
    if (options.numbers) chars += numbers;
    if (options.symbols) chars += symbols;

    let password = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        password += chars[randomIndex];
    }

    return password;
}

function askQuestion(question) {
    return new Promise(resolve => {
        rl.question(question, answer => {
            resolve(answer.toLowerCase() === 'e');
        });
    });
}

async function main() {
    console.log('Şifre Oluşturucu Programına Hoş Geldiniz!');

    const options = {
        lowercase: false,
        uppercase: false,
        numbers: false,
        symbols: false
    };

    const length = await new Promise(resolve => {
        rl.question('Şifre uzunluğunu girin: ', answer => {
            resolve(parseInt(answer));
        });
    });

    options.lowercase = await askQuestion('Küçük harfler kullanılsın mı? (E/H): ');
    options.uppercase = await askQuestion('Büyük harfler kullanılsın mı? (E/H): ');
    options.numbers = await askQuestion('Rakamlar kullanılsın mı? (E/H): ');
    options.symbols = await askQuestion('Özel karakterler kullanılsın mı? (E/H): ');

    if (!options.lowercase && !options.uppercase && !options.numbers && !options.symbols) {
        console.log('En az bir karakter tipi seçmelisiniz1!');
        rl.close();
        return;
    }

    const password = generatePassword(length, options);
    console.log('\nOluşturulan şifre:', password);
    rl.close();
}

main(); 