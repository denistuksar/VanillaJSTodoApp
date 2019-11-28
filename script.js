//elementi
const clear = document.getElementById("clear");
const date = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");
const add = document.getElementById("add");

//klase
const check = "fa-check-circle";
const uncheck = "fa-circle-thin";
const precrtano = "lineThrough";

//varijable
let stavke, id;

//danasnji datum
const options = {
    weekday: "long",
    month: "short",
    day: "numeric"
};
const today = new Date();
date.innerHTML = today.toLocaleDateString("hr-HR", options);

//dohvati iz lokalne pohrane
let data = localStorage.getItem("TODO");
if (data) {
    stavke = JSON.parse(data);
    id = stavke.length;
    loadList(stavke);
} else {
    stavke = [];
    id = 0;
}
//funkcija za dohvacanje stavki iz lokalne pohrane
function loadList(array) {
    array.forEach(element => {
        Dodaj(element.naziv, element.id, element.done, element.trash);
    });
}

//funkcija za dodavanje todo stavke
function Dodaj(toDo, id, done, trash) {
    if (trash) {
        return;
    }
    const izvrseno = done ? check : uncheck;
    const line = done ? precrtano : "";
    const tekst = `<li class="list-group-item" id="${id}">
    <i class="fa ${izvrseno} fa-2x" job="complete"></i>
    <p class="text ${line}" >${toDo}</p>
    <i class="fa fa-trash-o fa-2x delete float-right" job="delete"></i></li>`
    list.insertAdjacentHTML("beforeend", tekst);
}

//na enter dodaje se u polje stavke
document.addEventListener("keyup", Enter)

function Enter() {
    if (event.keyCode == 13) {
        const toDo = input.value;
        if (toDo) {
            Dodaj(toDo, id, false, false);
            stavke.push({
                naziv: toDo,
                id: id,
                done: false,
                trash: false
            });
            localStorage.setItem("TODO", JSON.stringify(stavke));
        }
        input.value = "";
        id++;
    }
}

//dodavanje, klik na ikonicu
add.addEventListener("click", dodajKlik)
function dodajKlik() {
    const toDo2 = input.value;
    if (toDo2) {
        Dodaj(toDo2, id, false, false);
        stavke.push({
            naziv: toDo2,
            id: id,
            done: false,
            trash: false
        });
        localStorage.setItem("TODO", JSON.stringify(stavke));
    }
    input.value = "";
    id++;
}

//klik na izvrseno
function Complete(element) {
    element.classList.toggle(check);
    element.classList.toggle(uncheck);
    element.parentNode.querySelector(".text").classList.toggle(precrtano);
    stavke[element.parentNode.id].done = stavke[element.parentNode.id].done ? false : true;
}

//klik na brisanje
function Delete(element) {
    element.parentNode.parentNode.removeChild(element.parentNode)
    stavke[element.parentNode.id].trash = true;
}

//eventlisteneri za klik na ikonice
list.addEventListener("click", function (event) {
    const element = event.target;
    const job = element.attributes.job.value;
    if (job == "complete") {
        Complete(element);
    } else if (job == "delete") {
        Delete(element);
    }
    localStorage.setItem("TODO", JSON.stringify(stavke));
});

//clear
clear.addEventListener("click", function () {
    localStorage.clear();
    location.reload();
});