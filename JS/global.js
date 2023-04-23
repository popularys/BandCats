const block = document.querySelector(".wrapper");
const addBtn = document.querySelector(".add");
const mdBox = document.querySelector(".modal-block");
const mdClose = mdBox.querySelector(".modal-close");
// const mdClose = mdBox.firstElementChild;
const addForm = document.forms.add;
const prevTag = addForm.querySelector(".preview");
const mdChange = document.querySelector(".change-modal-block");

let name = user = "popularys";
let path = `https://cats.petiteweb.dev/api/single/${user}`;

// let user = localStorage.getItem("popularys");
if (!user) {
    user = prompt("Введите Ваше уникальное имя пользователя, чтобы увидеть своих котиков:) ", "popularys");
    localStorage.setItem(user);
}

// const path = `https://cats.petiteweb.dev/api/single/${user}`;

/*
    JSON.stringify(obj) => преобразует объект в строку
    JSON.parse(str) => преобразует строку в объект
*/

let cats = localStorage.getItem(user);

// if (cats) {
//     try {
//         cats = JSON.parse(cats);
//         for (let cat of cats) {
//             createCard(cat, block);
//         }
//     } catch(err) {
//         alert(err.message);
//         cats = null;
//     }
// }

if (cats) {
    try {
        cats = JSON.parse(cats);
        for (let cat of cats) {
            createCard(cat, block);
        }
    } catch(err) {
        if (err) {
            alert(err.message);
            cats = null;
        }
    }
} else {
    fetch(path + "/show")
        .then(function(res) {
            if (res.statusText === "OK") {
                return res.json();
            }
        })
        .then(function (data) {
            if (!data.length) {
                alert("You don't have any cat:(");
            } else {
                cats = [...data];
                localStorage.setItem(user, JSON.stringify(data));
                for (let cat of data) {
                    createCard(cat, block);
                }
            }
        })
}