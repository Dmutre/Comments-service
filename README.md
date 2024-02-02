Цей проект був розроблений за допомогою Nest.js, prisma ORM, postgreSQL та інших утиліт, вказаних у файлі ./package.json. 

Щоб запустити цей проект, потрібно скачати його з гітхабу, розпакувати та створити у головній директорії файл .env, у якому вказано свої змінні середовище по прикладу нище:

```bash

DATABASE_URL="postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${DB_HOST}:${DB_PORT}/${POSTGRES_DB}?schema=public"
SECRET=sercer
DB_PORT=5432
PORT=5000
POSTGRES_DB=dzenCode
POSTGRES_PASSWORD=postgres
POSTGRES_USER=postgres
DB_HOST=localhost
FRONTEND_URL=http://example.com
JWT_REFRESH_TOKEN_TTL=172800s

```

Замість цих змінних підставити свої. Також у вас має бути створена відповідна база даних, параметри якої ви маєте вказати у .env файлі. Після створення бази даних, внесення змінних у .env файл потрібно прописати команду

```bash

npm install

```

Для того, щоб встановити усі залежності, що потрібні серверу. Після встановлення потрібно внести у базу даних файли міграцій, які вже були сконфігуровані. Для цього ми встановлювали пакет prisma. Потрібно прописати

```bash

npx prisma migrate deploy

npx prisma generate

```

Це внесе усі файли міграції у вашу бд і згенерує типи для неї.

Тепер все готово до запуску серверу. Залишилося прописати
```bash

npm start

```

Далі всю інформацію, яка описує роботу серверу я виклав у файлі Usage.md