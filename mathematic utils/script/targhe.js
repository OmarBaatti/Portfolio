
import {getI, textInputError} from "./globalx.js";

const targat = getI("targat");
const targan = getI("targan");

let lastt=targat.value;

targat.addEventListener("change", (evento) => {
    const val=targat.value.toUpperCase();
    if(/^[A-Z]{2}\d{3}[A-Z]{2}$/.test(val)){
        targat.value = val;
        lastt = val;
        targan.value = targaToNum(val);
    } else {
        console.log("Errore di formattazione della targa!");
        textInputError(targat,lastt),100;
    }
    
})

targan.addEventListener("change", (evento) => {
    // nessun controllo ma abs e mod(456975999) che sarebbe 26^4*10^3
    /*
    const num = Math.abs(targan.value % 456976000); // per gestione
    // targan.value = num;
    */
    // oppure
    targan.value = targan.value % 456976000;
    const num = Math.abs(targan.value);
    lastt = numToTarga(num);
    targat.value = lastt;
})

function numToTarga(num){
    function divmod(a,b){
        return [Math.floor(a/b), a%b];
    }
    function doubleChar(n){
        const [first,second]=divmod(n,26);
        return `${String.fromCharCode(first+65)}${String.fromCharCode(second+65)}`;
    }
    const [start,resto]=divmod(num, 676000); //676000 indica il valore delle prime due lettere rispetto all posizione, ovvero 26 x 26 x 1000
    const [mid,end]=divmod(resto, 676); // 676 indica il valore del numero da 3 cifre centrale e il resto finale è ovviamente il valore delle ultime 2 lettere;
    return `${doubleChar(start)}${mid.toString().padStart(3, '0')}${doubleChar(end)}`;
}

function targaToNum(str){
    function doubleCharNum(startpos){
        function charNum(pos){
            return str.charCodeAt(pos) - 65;
        }
        return charNum(startpos)*26+charNum(startpos+1);
    }
    const start = doubleCharNum(0);
    const mid = parseInt(str.slice(2,5), 10);
    const end = doubleCharNum(5);

    return start * 676000 + mid * 676 + end;
}