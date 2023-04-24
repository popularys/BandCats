function createCard(cat, tag = box) {
    const card = document.createElement("div");
    card.className = "card";
    const cardImg = document.createElement("div");
    cardImg.className = "pic";
    
    if (cat.image) {
        cardImg.style.backgroundImage = `url(${cat.image})`;
    } else {
        cardImg.classList.add("tmp");
    }

    const cardTitle = document.createElement("h2");
    cardTitle.innerText = cat.name;
    // const cardAge = document.createElement("h2");
    // cardTitle.innerText = cat.age;

    const cardLike = document.createElement("i");
    cardLike.className = "like fa-heart";
    cardLike.classList.add(cat.favorite ? "fa-solid" : "fa-regular");
    cardLike.addEventListener("click", e => {
    setLike(cardLike, cat.id, !cat.favorite);
    })
    const cardChange = document.createElement("i");
    cardChange.className = "fa-solid fa-cat change";
    cardChange.addEventListener("click", e => {
        // e.stopPropagation();
        // e.preventDefault();
    setChange(cardChange, cat.id, cat.name);
    })
    const trash = document.createElement("i");
    trash.className = "fa-solid fa-trash trash";
    trash.addEventListener("click", e => {
        e.stopPropagation();
        // deleteCard(???, e.currentTarget.parentElement);
        deleteCard(cat.id, card);
    })

    card.append(cardImg, cardTitle, cardLike, cardChange, trash);
    tag.append(card);
    // cardImg.style.height = cardImg.offsetWidth + "px";
}

function setLike(el, id, like) {
    el.classList.toggle("fa-solid");
    el.classList.toggle("fa-regular");

    fetch(path + "/update/" + id, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({favorite: like})
    })
    .then(res => res.json())
    .then(data => {
        // console.log(data);
        cats = cats.map(c => {
            if (c.id === id) {
                c.favorite = like;
            }
            return c;
        })
        localStorage.setItem("popularys", JSON.stringify(cats));
    })
}

// function setChange(el, id, name, ) {
//     el.classList.toggle("fa-solid");
//     el.classList.toggle("fa-regular");

//     fetch(path + "/update/" + id, {
//         method: "PUT",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify({favorite: like})
//     })
//     .then(res => res.json())
//     .then(data => {
//         // console.log(data);
//         cats = cats.map(c => {
//             if (c.id === id) {
//                 c.favorite = like;
//             }
//             return c;
//         })
//         localStorage.setItem("popularys", JSON.stringify(cats));
//     })
// }

function deleteCard(id, el) {
    if (id) {
        fetch(`${path}/delete/${id}`, {
            method: "DELETE"
        })
            .then(res => {
                if (res.status === 200) {
                    el.remove();
                    cats = cats.filter(c => c.id !== id)
                    localStorage.setItem("popularys", JSON.stringify(cats));
                }
            })
    }
}

function changeCard(cat, tag = box) {
    const card = document.createElement("div");
    card.className = "change";
    const cardImg = document.createElement("div");
    cardImg.className = "pic";
    
    if (cat.image) {
        cardImg.style.backgroundImage = `url(${cat.image})`;
    } else {
        cardImg.classList.add("tmp");
    }

    const cardTitle = document.createElement("h2");
    cardTitle.innerText = cat.name;

    const cardLike = document.createElement("i");
    cardLike.className = "like fa-heart";
    cardLike.classList.add(cat.favorite ? "fa-solid" : "fa-regular");
    cardLike.addEventListener("click", e => {
    setLike(cardLike, cat.id, !cat.favorite);
    })
    const cardChange = document.createElement("i");
    cardChange.className = "fa-solid fa-cat change";
    // cardChange.addEventListener("click", e => {
    // setChange(cardChange, cat.id, cat.name);
    // })

    card.append(cardImg, cardTitle, cardLike, cardChange);
    tag.append(card);
    // cardImg.style.height = cardImg.offsetWidth + "px";
}

function showModal(id, el) {
    let m = Array.from(modals).find(m => m.dataset.type === el.dataset.action);
    m.classList.add("active");
    let content = m.querySelector(".modal-cat")
    let cat = cats.find(cat => cat.id === id);
    content.innerHTML = `
        <div class="cat-text">
            <h2>${cat.name}</h2>
            <div>${typeof cat.age === "number" ? setAge(cat.age) : "Возраст не указан"}</div>
            <div>${cat.description || "Информации о котике пока нет..."}</div>
        </div>
        <img src=${cat.image || "images/default.png"} alt="${cat.name}">
    `
}

function setUpd(id, el) {
    Array.from(modals).find(m => m.dataset.type === el.dataset.action).classList.add("active");
    let cat = cats.find(cat => cat.id === id);
    console.log(cat);
    for (let i = 0; i < updForm.elements.length; i++) {
        let inp = updForm.elements[i];
        if (inp.name && cat[inp.name]) {
            if (inp.type === "checkbox") {
                inp.checked = cat[inp.name]
            } else {
                inp.value = cat[inp.name];
            }
        }
    }
}