function modal() {
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
}

module.exports = modal;