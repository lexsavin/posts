export const EMAIL_REGEXP =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const PASSWORD_REGEXP = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

export const VALIDATE_CONFIG = {
  requiredMessage: "Обязательное поле",
  emailMessage: "Email не соотвествует формату электронной почты",
  passwordMesssage:
    "Пароль должен содержать минимум восемь символов, одну букву латинского алфавита и одну цифру",
};

export const BASE_URL = "https://api.react-learning.ru";

export const NO_IMAGE_URL =
  "https://b-n-c.ru/local/templates/.default/img/no-img.jpg";

export const COUNT_POSTS_PER_PAGE = 12;
