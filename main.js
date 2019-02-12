const fs = require('fs');
const minimist = require('minimist');
const _ = require('./src/functions');
const args = minimist(process.argv.slice(2));
const chiper = require('./src/encrypt');

const encrypt = chiper.encrypt;
const decrypt = chiper.decrypt;

const ENV = {
    'POWER' : 26,
};

const main = (args) => {
    if (args['help']) {
        const localMessages = {
            '--help' : 'Справочная информация',
            '--in' : 'путь к файлу',
            '--gamma': 'путь к гамме',
            '--out' : 'Путь к выходному файлу включая название.расширение, если не указано, создаётся автоматически в каталоге с программой',
            '--e': 'Зашифровать',
            '--d': 'Расшифровать',
        };
        Object.keys(localMessages).forEach((el) => {
            console.log(`${el}\t\t`, `${localMessages[el]}`, '\n');
        });
        process.exit();
    }

    if(_.objectLength(args) == false) {
        console.log('type node gammir.js --help ofr more info');
        process.exit();
    }
    if(!args['gamma'] || args['gamma'].length === 0) {
        console.log('you must type key. --gamma');
        process.exit();
    }
    if(!args['in'] || args['in'].length === 0) {
        console.log('you must type path to file. --in');
        process.exit();
    }
    if(!args['d'] && !args['e'] || args['d'] && args['e']) {
        console.log('you must type method -d decrypt or -e decrypt');
        process.exit();
    }

    const text = fs.readFileSync(args['in'], 'utf-8');
    const gamma = fs.readFileSync(args['gamma'], 'utf-8');

    if (args['e']) {
        const enycryption = encrypt(text, gamma, ENV.POWER);
        const path = args['out'] ? args['out'] : `${__dirname}/enc.txt`;
        fs.writeFile(path, enycryption, (err) => {
            if (err) throw new err;
            console.log(`Файл успешно создан по маршруту: ${path}`);
        });
    }

    if (args['d']) {
        const decrypttion = decrypt(text, gamma, ENV.POWER);
        const path = args['out'] ? args['out'] : `${__dirname}/dec.txt`;
        fs.writeFile(path, decrypttion, (err) => {
            if (err) throw new err;
            console.log(`Файл успешно создан по маршруту: ${path}`);
        });
    }
};

main(args);
