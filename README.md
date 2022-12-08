# Установка

1. Для начала склонируйте репозиторий:
```
git clone https://github.com/madzhar-code/polls-app
```

2. Создайте виртуальное окружение:
```
py -m venv venv
```

3. Далее перейдите в папку backend и установите все зависимости для серверной части:
```
pip install -r requirements.txt
```

4. Потом проведите миграции для приложений accounts и polls
```
py manage.py makemigrations accounts
py manage.py makemigrations polls
```

5. А теперь:
```
py manage.py migrate
```

6. Чтобы использовать админ-панель, необходимо создать суперпользователя посредством
команды ```py manage.py createsuperuser```. Будьте внимательны, залогинивание пользователей
происходит по почте. Валидация паролей отключена.

7. Далее мы запускаем сервер:
```
py manage.py runserver
```

8. Для внешнего интерфейса нужно запустить следующие команды из папки frontend
```
npm install
npm run start
```

9. Нужно перейти по адресу в браузере /login и залогиниться на сайте
