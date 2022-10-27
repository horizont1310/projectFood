function openModal(modalSelector, modalTimerId) {
  const modal = document.querySelector(modalSelector);

  modal.classList.add("show");
  modal.classList.remove("hide");
  // modal.classList.toggle('show'); можно использовать вместо двух верхних
  document.body.style.overflow = "hidden"; //при появлении окна убирает прокрутку страницы

  if (modalTimerId) {
    clearInterval(modalTimerId);
  }
}
function closeModal(modalSelector, modalTimerId) {
  const modal = document.querySelector(modalSelector);

  modal.classList.add("hide");
  modal.classList.remove("show");
  document.body.style.overflow = ""; // возврвщает прокрутку на странице

}

function modal(triggerSelector, modalSelector, modalTimerId) {
  //​‌‌‍⁡⁢⁣⁢Modal window⁡​

  const modalTrigger = document.querySelectorAll(triggerSelector),
    modal = document.querySelector(modalSelector);
  // modalCloseBtn = document.querySelector("[data-close]");

  modalTrigger.forEach((btn) => {
    btn.addEventListener("click", () => openModal(modalSelector, modalTimerId)); //создаётся дополнительно стрелочная функция, чтоб она не вызывалась сразу, а выполнялась после клика
  });

  // modalCloseBtn.addEventListener("click", closeModal);

  modal.addEventListener("click", (e) => {
    if (e.target === modal || e.target.getAttribute("data-close") == "") {
      // второй таргет добавился для того, чтоб можно было влиять на динамическое появление крестика(если он будет создаваться через js)
      closeModal(modalSelector);
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.code === "Escape" && modal.classList.contains("show")) {
      // привязывает закрытие к Esc и будет работать только тогда, когда открыто модальное окно
      closeModal(modalSelector);
    }
  });

  function showModalByScroll() {
    if (
      window.pageYOffset + document.documentElement.clientHeight >=
      document.documentElement.scrollHeight
    ) {
      //1 - прокрутка всего окна 2 - видимая часть у пользователя 3 - полная высота сайта
      openModal(modalSelector, modalTimerId);
      window.removeEventListener("scroll", showModalByScroll); //после того, как сделает один раз - удалит обработчик событий(⁡⁢⁣⁢нужно укзывать событие и функцию!!!!!!!!⁡)
    }
  }

  window.addEventListener("scroll", showModalByScroll);
}

export default modal;
export { openModal };
export { closeModal };
