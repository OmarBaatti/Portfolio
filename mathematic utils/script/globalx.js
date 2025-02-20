export function getI(id){
    return document.getElementById(id);
}
export function textInputError(obj,value,time){
    let color = obj.style.color;
    obj.style.color = "red";
    obj.value = "Errore!";
    setTimeout(() => {
        obj.value = value;
        obj.style.color = color;
    }, time);
}