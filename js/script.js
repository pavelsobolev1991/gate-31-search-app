//ЗАПРОС к API
let result;
const app = async () => {

  const response = await fetch('https://jsonplaceholder.typicode.com/posts/?_start=0&_limit=7');
  const data = await response.json();

  //сохранение данных из формы в параметры URL
  const params = new URLSearchParams(window.location.search);
  const search = params.get("search");
  document.querySelector('.form__input__search').value = search

  //вызов функции для создания карточек
  createCards(data)

  return data

}

//сохранение данных из API в переменную result
app().then((value) => {
  result = value
})

//отрисовка карточек при клике на чекбоксы
function isClicked() {

  if (event.target.checked) {
    result.forEach((card) => {
      let searchCard = document.getElementById(card.id)
      if (event.target.id === searchCard.id) {
        searchCard.style = `
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          border: 1px solid black;
          width: 300px;
      height: 160px;
      margin: 10px;
      padding: 10px;
          background-color: #6b5b5c;
          color: white;
          `
      }
    })
  } else {
    result.forEach((card) => {
      let searchCard = document.getElementById(card.id)
      if (event.target.id === searchCard.id) {
        searchCard.style = `
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          border: 1px solid black;
          width: 300px;
          height: 160px;
          margin: 10px;
          padding: 10px;
          `
      }
    })
  }

}

//Обработка формы поиска
function handleSubmit(data) {
  event.preventDefault()
  const userSearch = document.querySelector('.form__input__search')

  //сохранение введенных данных пользователя в параметр URL search
  const url = new URL(window.location.href);
  url.searchParams.set('search', userSearch.value);
  window.history.replaceState(null, null, url)

  //фильтрация карточек
  const foundData = result.filter((card) => card.title.includes(userSearch.value.toLowerCase()))
  //вызов фильтрованных карточек
  createCards(foundData)
}

//функция создания карточек
function createCards(data) {

  //замена контейнера с карточками для фильтрации по поиску
  const mainContiner = document.querySelector('.container__additional')
  const container = document.querySelector('.container__list')
  container.remove()
  let newContainer = document.createElement('div')
  newContainer.className = "container__list"
  mainContiner.appendChild(newContainer)

  data.forEach((item) => {

    let card = document.createElement('div')
    card.className = "card__container";
    card.id = `${item.id}`
    card.style = `
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      border: 1px solid black;
      width: 300px;
      height: 160px;
      margin: 10px;
      padding: 10px;
      `
    if(item.title.length>37) item.title = item.title.slice(0,37) + '...'

    card.innerHTML += `<p class="card__title">${item.title}</p>`
    card.innerHTML += `<p class="card__description">${item.body}</p>`
    card.innerHTML += `<input id="${item.id}" type="checkbox" onClick="isClicked()"></input>`
    newContainer.appendChild(card)
  });

}