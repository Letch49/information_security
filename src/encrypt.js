const charToVernam = (char, gamma, alphabetPower) => char + (gamma % alphabetPower);
const vernamToChar = (char, gamma, alpabetPower) => alpabetPower + (char - gamma) % alpabetPower;

const findAlphabetPower = (el, idx) => (gamma) => {
    if (el < 100) {
        return el != ' ' ?vernamToChar(el, gamma[idx], 65) : el;
    }
    return vernamToChar(el, gamma[idx], 97);
};

const chiper = (mode) => (text, gamma, alphabetPower) => {
    const sliceSize = gamma.length;
    const sliceIter = (current, acc = []) => {
        if (!current) {
            return acc;
        }
        const item = current.slice(0, sliceSize);
        return sliceIter(current.slice(sliceSize, current.length), [...acc, item]);
    };

    const charCodes = sliceIter(text, []).reduce((acc, el) => {
        const current = el.split('').map((e) => e != ' ' ? e.charCodeAt() : e);
        return [...acc, current];
    }, []);

    let final = [];
    if (mode === 'encrypt') {
        final = charCodes.map((el) => el.map((el, index) => el != ' ' ? charToVernam(el, gamma[index], alphabetPower) : el));
    } else if (mode === 'decrypt') {
        final = charCodes.map((el) => el.map((el, index) => findAlphabetPower(el,index)(gamma) ));

    }

    return final.reduce((acc, el) => {
        const current = el.map((el) => el != ' ' ? String.fromCharCode(el): el);
        return acc + current.join('');
    }, '');
};

module.exports.encrypt = chiper('encrypt');
module.exports.decrypt = chiper('decrypt');