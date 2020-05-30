'use strict';

class user{
    constructor(id,name,surname,country,age,about,imageSrc) {
        this._id = id;
        this._name = name;
        this._surname = surname;
        this._country = country;
        this._age = age;
        this._about = about;
        this._imageSrc = imageSrc;
    }
    get id(){
        return this._id;
    }
    get name(){
        return this._name;
    }
    get surname(){
        return this._surname;
    }
    get country(){
        return this._country;
    }
    get age(){
        return this._age;
    }
    get about(){
        return this._about;
    }
    get imageSrc(){
        return this._imageSrc;
    }
    capsulate(){
        return {
            id: this._id,
            name: this._name,
            surname: this._surname,
            country: this._country,
            age: this._age,
            about: this._about,
            imageSrc: this._imageSrc,
        }
    }
}

let usersContainer = {
    items: [],
    push(item){
        this.items.push(item);
    },
    capsulate(){
        let arr = [];
        for(let item of this.items){
            arr.push(item.capsulate());
        }
        return arr;
    },
};
let users = [];
let users2 = [];
if (localStorage.getItem('jsonUsers') == null) {
    usersContainer.push(new user(1,"Женя", "Смидт","Англия", 40,"Английский фолк-гитарист и певец","https://img.discogs.com/rm-TtJ-PybcLqML0FefJJRzJCQg=/fit-in/300x300/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/A-6835333-1543256249-6048.jpeg.jpg"));
    usersContainer.push(new user(2,"Ваня", "Паркер", "США",38, "Американский Southern Gospel певец","https://img.discogs.com/yfetXNmO4qnCB_2e5977AG4LNMw=/fit-in/300x300/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/A-2643018-1521449975-6660.jpeg.jpg"));
    usersContainer.push(new user(3,"Георгий", "Новиков","Россия", 48, "Доктор медицинских наук, профессор","https://data.cyclowiki.org/images/thumb/9/9c/Georij_Andreevich_Novikov.jpg/300px-Georij_Andreevich_Novikov.jpg"));
    usersContainer.push(new user(4,"Андрей", "Абрамов","Россия", 35, "Заслуженный артист","https://www.film.ru/sites/default/files/people/1576176-917527.jpg"));
    users = usersContainer.capsulate();
    let jsonUsers = JSON.stringify(users);
    localStorage.setItem("jsonUsers", jsonUsers);
}else{
    let jsonUsers = localStorage.getItem('jsonUsers');
    users = JSON.parse(jsonUsers);
}

fetch('./users.json')
    .then((response)=>response.json())
    .then((data)=>{
        users2 = data;
        console.log(showCards(users2));
    })
    .catch(console.error);

async function createUserImageElem(user){
    //>>
    let imageContainer = document.createElement('div');
    imageContainer.className = "imageContainer";
    let img = document.createElement('img');
    img.setAttribute("src", user.imageSrc);
    imageContainer.append(img);

    return imageContainer;
}

async function createUserInfoElem(user){
    let infoContainer = document.createElement('div');
    infoContainer.className = "infoContainer";
    let name = document.createElement('h3');
    name.innerText = user.name + ' ' + user.surname;
    infoContainer.append(name);

    let age = document.createElement("div");
    age.classList.add("userAge")
    age.innerText = user.age + " лет";
    infoContainer.append(age);

    let country = document.createElement("div");
    country.classList.add("userCountry");
    country.innerText = user.country;
    infoContainer.append(country);

    let about = document.createElement("div");
    about.classList.add("userAbout");
    about.innerText = user.about;
    infoContainer.append(about);

    return infoContainer;
}

async function createUserCardElem(user){
    let cardContainer = document.createElement('div');
    cardContainer.className = "cardContainer";
    cardContainer.id = user.id;

    //ImageContainer
    createUserImageElem(user)
        .then(res => {
            let imageContainer;
            imageContainer = res;
            cardContainer.append(imageContainer);
        });

    //InfoContainer
        createUserInfoElem(user)
            .then(res => {
                let userInfoElem
                userInfoElem = res;
                cardContainer.append(userInfoElem);
            });

    return cardContainer;
}
async function showCards(arr){

    let mainContainer = document.querySelector(".mainContainer");

    for(let user of arr){
        createUserCardElem(user)
            .then(res => {
                let card;
                card = res;
                mainContainer.append(card);
            });
    };

}
console.log(showCards(users));

let deg = 180;
setInterval(function(){
    document.body.setAttribute("style",`background: linear-gradient(${deg}deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%);`);
        deg++;
        if (deg == 360){
            deg = 0;
        }
}, 1000/15);