// if (!cats) {
//     fetch(path + "/show")
//         .then(function(res) {
//             return res.json();
//         })
//         .then(function(data) {
//             if (data.length) {
//                 cats = data;
//                 localStorage.setItem("popularys", JSON.stringify(data));
//                 for (let cat of data) {
//                     createCard(cat, block);
//                 }
//             }
//         })
// }


addBtn.addEventListener("click", e => {
    mdBox.classList.toggle("active");
});
mdClose.addEventListener("click", e => {
    mdBox.classList.remove("active");
});
mdBox.addEventListener("click", e => {
    if (e.target === e.currentTarget) {
        mdBox.classList.remove("active");
    }
});
mdChange.addEventListener("click", e => {
    mdChange.classList.toggle("active");
})
// addForm.elements.favorite.addEventListener("change", e => {
//     console.log(e.currentTarget.value);
//     console.log(e.currentTarget.checked);
// })

addForm.elements.image.addEventListener("change", e => {
    const prevTag = addForm.querySelector(".preview");
    prevTag.style.backgroundImage = `url(${e.currentTarget.value})`;
})

addForm.addEventListener("submit", e => {
    e.stopPropagation();
    e.preventDefault(); 

    const body = {}
    for (let i = 0; i < addForm.elements.length; i++) {
        const el = addForm.elements[i];
        if (el.name) {
            if (el.name === "favorite") {
                body[el.name] = el.checked;
            } else {
                body[el.name] = el.value;
            }
        }
    }
    
    fetch(path + "/ids")
        .then(res => res.json())
        .then(ids => {
            console.log(ids);
            body.id = ids[ids.length - 1] + 1;
            // console.log(body);
            return fetch(path + "/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            })
        })    
        .then(res => {
            if (res.status === 200) {
                addForm.reset();
                prevTag.style = null;
                mdBox.classList.remove("active");
                createCard(body, block);
                cats.push(body);
                localStorage.setItem("popularys", JSON.stringify(cats));
            }
            // return res.json();
        })
    })