window.addEventListener("DOMContentLoaded", () => {
  //​‌‌‍⁡⁢⁣⁢Tabs⁡​

  const tabs = document.querySelectorAll(".tabheader__item"),
    tabsContent = document.querySelectorAll(".tabcontent"),
    tabParents = document.querySelector(".tabheader__items");

  function hideTabContent() {
    tabsContent.forEach((item) => {
      item.classList.add("hide");
      item.classList.remove("show", "fade");
    });

    tabs.forEach((item) => {
      item.classList.remove("tabheader__item_active");
    });
  }

  function showTabContent(i = 0) {
    tabsContent[i].classList.add("show", "fade");
    tabsContent[i].classList.remove("hide");
    tabs[i].classList.add("tabheader__item_active");
  }

  hideTabContent();
  showTabContent();

  tabParents.addEventListener("click", (event) => {
    const target = event.target;

    if (target && target.classList.contains("tabheader__item")) {
      tabs.forEach((item, i) => {
        if (target == item) {
          hideTabContent();
          showTabContent(i);
        }
      });
    }
  });

  //​‌‌‍⁡⁢⁣⁢Timer⁡​

  const deadline = "2022-09-23";

  function getTimeRemaining(endtime) {
    let days, hours, minutes, seconds;
    const t = Date.parse(endtime) - Date.parse(new Date()); //отнимает от текущей даты в миллисекундах

    if (t <= 0) {
      (days = 0), (hours = 0), (minutes = 0), (seconds = 0);
    } else {
      (days = Math.floor(t / (1000 * 60 * 60 * 24))),
        (hours = Math.floor((t / (1000 * 60 * 60)) % 24)), // получаем количество часов,которых не хватает до полных суток(остаток), потому что что может вывести 50 часов
        (minutes = Math.floor((t / (1000 * 60)) % 60)),
        (seconds = Math.floor((t / 1000) % 60));
    }

    return {
      total: t,
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds,
    };
  }

  function getZero(num) {
    // добавляет ноль к числу, если оно меньше 10
    if (num >= 0 && num < 10) {
      return `0${num}`;
    } else {
      return num;
    }
  }

  function setClock(selector, endtime) {
    const timer = document.querySelector(selector),
      days = timer.querySelector("#days"),
      hours = timer.querySelector("#hours"),
      minutes = timer.querySelector("#minutes"),
      seconds = timer.querySelector("#seconds"),
      timeInterval = setInterval(updateClock, 1000); //запускается каждую секунду

    updateClock(); //запускается сразу, чтоб убрать мигание таймера(изначально там значения с вёрстки)

    function updateClock() {
      const t = getTimeRemaining(endtime);

      days.innerHTML = getZero(t.days);
      hours.innerHTML = getZero(t.hours);
      minutes.innerHTML = getZero(t.minutes);
      seconds.innerHTML = getZero(t.seconds);

      if (t.total <= 0) {
        clearInterval(timeInterval);
      }
    }
  }
  setClock(".timer", deadline);

  //​‌‌‍⁡⁢⁣⁢Modal window⁡​

  const modalTrigger = document.querySelectorAll("[data-modal]"),
    modal = document.querySelector(".modal");
  // modalCloseBtn = document.querySelector("[data-close]");

  function openModal() {
    modal.classList.add("show");
    modal.classList.remove("hide");
    // modal.classList.toggle('show'); можно использовать вместо двух верхних
    document.body.style.overflow = "hidden"; //при появлении окна убирает прокрутку страницы
  }

  modalTrigger.forEach((btn) => {
    btn.addEventListener("click", openModal);
  });

  function closeModal() {
    modal.classList.add("hide");
    modal.classList.remove("show");
    document.body.style.overflow = ""; // возврвщает прокрутку на странице
    clearInterval(modalTimerId);
  }

  // modalCloseBtn.addEventListener("click", closeModal);

  modal.addEventListener("click", (e) => {
    if (e.target === modal || e.target.getAttribute("data-close") == "") {
      // второй таргет добавился для того, чтоб можно было влиять на динамическое появление крестика(если он будет создаваться через js)
      closeModal();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.code === "Escape" && modal.classList.contains("show")) {
      // привязывает закрытие к Esc и будет работать только тогда, когда открыто модальное окно
      closeModal();
    }
  });

  const modalTimerId = setTimeout(openModal, 50000); //⁡⁢⁣⁢скрипт с модальным окном, в конце⁡ ⁡⁢⁣⁢нужно ​‌‌‍раскоментировать​⁡

  function showModalByScroll() {
    if (
      window.pageYOffset + document.documentElement.clientHeight >=
      document.documentElement.scrollHeight
    ) {
      //1 - прокрутка всего окна 2 - видимая часть у пользователя 3 - полная высота сайта
      openModal();
      window.removeEventListener("scroll", showModalByScroll); //после того, как сделает один раз - удалит обработчик событий(⁡⁢⁣⁢нужно укзывать событие и функцию!!!!!!!!⁡)
    }
  }

  window.addEventListener("scroll", showModalByScroll);

  // ​‌‌‍⁡⁢⁣⁢Используем классы для карточек⁡​

  class MenuCard {
    constructor(src, alt, title, descr, price, parentSelector, ...classes) {
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.descr = descr;
      this.price = price;
      this.classes = classes;
      this.parentSelector = document.querySelector(parentSelector);
      this.transfer = 36;
      this.changeToUAH();
    }

    changeToUAH() {
      this.price = this.price * this.transfer;
    }

    render() {
      const element = document.createElement("div");

      if (this.classes.length === 0) {
        //⁡⁢⁣⁢срабатывает ели не задан класс⁡
        this.element = "menu__item";
        element.classList.add(this.element);
      } else {
        this.classes.forEach((className) => element.classList.add(className));
      }

      element.innerHTML = `
        <img src=${this.src} alt=${this.alt}>
        <h3 class="menu__item-subtitle">${this.title}</h3>
        <div class="menu__item-descr">${this.descr}</div>
        <div class="menu__item-divider"></div>
        <div class="menu__item-price">
            <div class="menu__item-cost">Цена:</div>
            <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
        </div>
      `;
      this.parentSelector.append(element);
    }
  }

  const getResource = async (url) => {
    const res = await fetch(url);

    if(!res.ok) {
      throw new Error(`Could not fatcg ${url}, status: ${res.status}`);
    }

    return await res.json();
  };

  // getResource('http://localhost:3000/menu') //создание карточек через сервер
  //       .then(data => {
          // data.forEach(({img, altimg, title, descr, price}) => { //это деструктуризация( объекты в db.json)
          //   new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
          // });
  //       });

  axios.get('http://localhost:3000/menu')
    .then(data => {
      data.data.forEach(({img, altimg, title, descr, price}) => { // первая data - это переменная, а вторая - именно данные из того, что приходит от сервера
        new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
      });
    });

  // ⁡⁢⁣⁢​‌‌‌Forms​⁡

  const forms = document.querySelectorAll("form");

  const message = {
    loading: "img/form/spinner.svg",
    success: "Спасибо! Мы скоро перезвоним Вам",
    failur: "Что-то пошло не так",
  };

  forms.forEach((item) => {
    bindPostData(item);
  });

  const postData = async (url, data) => {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: data
    });

    return await res.json();
  };

  function bindPostData(form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const statusMessage = document.createElement("img");
      statusMessage.src = message.loading;
      statusMessage.style.cssText = `
          display: block;
          margin: 0 auto;
        `;

      form.insertAdjacentElement("afterend", statusMessage); //вместо append 1 - куда вставлять элемент 2 -что вставить

      const formData = new FormData(form);
      const json = JSON.stringify(Object.fromEntries(formData.entries()));

      postData("http://localhost:3000/requests", json)
      .then((data) => {
        console.log(data);
        showThanksModal(message.success);        
        statusMessage.remove();
      }).catch(() => {
        showThanksModal(message.failur);
      }).finally(() => {
        form.reset();
      });
    });
  }

  function showThanksModal(message) {
    const prevModalDialog = document.querySelector(".modal__dialog");

    prevModalDialog.classList.add("hide");
    openModal();

    const thanksModal = document.createElement("div");
    thanksModal.classList.add("modal__dialog");
    thanksModal.innerHTML = `
        <div class="modal__content">
          <div class="modal__close" data-close>×</div>
          <div class="modal__title">${message}</div>
        </div>
      `;

    document.querySelector(".modal").append(thanksModal);
    setTimeout(() => {
      thanksModal.remove();
      prevModalDialog.classList.add("show");
      prevModalDialog.classList.remove("hide");
      closeModal();
    }, 4000);
  }

  fetch('http://localhost:3000/menu') // в терминале(если установлен локально json-server) npx json-server --watch db.json
    .then(data => data.json())
    // .then(res => console.log(res));

// ⁡⁢⁣⁢​‌‌‌Slider​⁡

const slides = document.querySelectorAll('.offer__slide'),
      prev = document.querySelector('.offer__slider-prev'),
      next = document.querySelector('.offer__slider-next'),
      total = document.querySelector('#total'),
      current = document.querySelector('#current');
let slideIndex = 1;

showSlides(slideIndex);

if (slides.length < 10) {                    //Общее количество слайдов(отображается)
  total.textContent = `0${slides.length}`;
} else {
  total.textContent = slides.length;
}

function showSlides(n) {
  if (n > slides.length) {
    slideIndex = 1;
  }

  if (n < 1) {
    slideIndex = slides.length;
  }

  slides.forEach(item => item.style.display = 'none');

  slides[slideIndex - 1].style.display = 'block';

  if (slides.length < 10) {
    current.textContent = `0${slideIndex}`;
  } else {
    current.textContent = slideIndex;
  }
}

function plusSlides(n) {
  showSlides(slideIndex += n);
}

prev.addEventListener('click', () => {
  plusSlides(-1);
});

next.addEventListener('click', () => {
  plusSlides(1);
});

});

