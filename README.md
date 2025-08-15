# 🎈 SharikPlus - Интернет-магазин воздушных шаров

Полностью готовый к развёртыванию интернет-магазин для продажи воздушных шаров с административной панелью и генерацией PDF-документов.

## 🚀 Быстрый старт

### 1. Клонирование и установка

```bash
git clone <repository-url>
cd sharikplus-shop
npm install
```

### 2. Запуск через Docker

```bash
# Поднять все сервисы
npm run docker:up

# Проверить статус
docker-compose ps

# Посмотреть логи
npm run docker:logs
```

### 3. Заполнение базы данных

```bash
# Перейти в директорию backend
cd apps/backend

# Создать миграции
npx prisma migrate dev

# Заполнить тестовыми данными
npm run seed
```

## 🌐 Доступ к приложению

- **🎈 Интернет-магазин**: http://localhost:3002
- **🛠️ Админ панель (Swagger)**: http://localhost:3001/api/docs
- **🔧 Backend API**: http://localhost:3001
- **📊 Статус системы**: http://localhost:3001/health

## 📋 Тестовые данные

### Пользователи
- **Admin**: admin@sharikplus.ru / admin123
- **Manager**: manager@sharikplus.ru / manager123
- **User**: user@example.com / user123

### Товары
В базе данных создано 20+ товаров воздушных шаров с различными категориями:
- Набор "День рождения" - ₽1,500
- Свадебная арка - ₽5,000
- Корпоративное оформление - ₽8,000
- Латексные шары различных цветов
- Фольгированные шары
- Наборы для праздников

## 🛠️ Технологический стек

### Frontend
- **Next.js 14+** с App Router
- **React 19** с TypeScript
- **Tailwind CSS 4+** для стилизации
- **shadcn/ui** компоненты
- **Framer Motion** для анимаций

### Backend
- **NestJS 11+** с TypeScript
- **Prisma ORM** с PostgreSQL
- **Redis** для кэширования
- **JWT** аутентификация
- **Swagger** документация

### База данных
- **PostgreSQL 16+** основная БД
- **Redis 7+** для кэша и сессий

## 📁 Структура проекта

```
sharikplus-shop/
├── apps/
│   ├── frontend/          # Next.js приложение (порт 3002)
│   │   ├── app/          # App Router страницы
│   │   ├── components/   # React компоненты
│   │   └── lib/         # Утилиты и хуки
│   └── backend/          # NestJS API (порт 3001)
│       ├── src/         # Исходный код
│       ├── prisma/      # Схема БД и миграции
│       └── dist/        # Собранное приложение
├── packages/
│   ├── ui/              # Общие UI компоненты
│   └── config/          # Конфигурации
├── docker-compose.yml    # Docker конфигурация
└── README.md
```

## 🔧 Разработка

### Локальный запуск

```bash
# Установить зависимости
npm install

# Запустить в режиме разработки
npm run dev

# Сборка
npm run build

# Тесты
npm run test

# Линтинг
npm run lint
```

### Docker команды

```bash
# Запустить все сервисы
npm run docker:up

# Остановить сервисы
npm run docker:down

# Посмотреть логи
npm run docker:logs

# Пересобрать контейнеры
docker-compose build --no-cache
```

## 🗄️ База данных

### Миграции

```bash
# Создать новую миграцию
cd apps/backend
npm run prisma:migrate:dev

# Применить миграции
npm run db:migrate

# Сбросить базу (только для разработки)
npm run prisma:db:push --force-reset
```

### Сиды

```bash
# Заполнить базу тестовыми данными
npm run db:seed
```

## 🧪 API Endpoints

### Публичные
- `GET /products` - Список товаров
- `GET /products/:id` - Товар по ID
- `GET /categories` - Категории
- `POST /auth/login` - Авторизация
- `POST /auth/register` - Регистрация

### Защищённые
- `POST /orders` - Создать заказ
- `GET /orders` - Мои заказы
- `GET /profile` - Профиль пользователя

### Админ
- `POST /admin/products` - Создать товар
- `PUT /admin/products/:id` - Обновить товар
- `DELETE /admin/products/:id` - Удалить товар
- `GET /admin/orders` - Все заказы

## 🛠️ Административная панель

### Доступ к админ панели
Админ панель доступна через **Swagger UI** по адресу:
**http://localhost:3001/api/docs**

### Возможности админ панели:
1. **Управление товарами**
   - Просмотр всех товаров
   - Создание новых товаров
   - Редактирование существующих
   - Удаление товаров
   - Управление категориями

2. **Управление заказами**
   - Просмотр всех заказов
   - Изменение статусов заказов
   - Просмотр деталей заказа
   - Генерация отчётов

3. **Управление пользователями**
   - Просмотр пользователей
   - Управление ролями
   - Блокировка/разблокировка

4. **Статистика и отчёты**
   - Общая статистика продаж
   - Популярные товары
   - Анализ заказов

### Как использовать админ панель:
1. Откройте http://localhost:3001/api/docs
2. Найдите нужный endpoint (например, `/products`)
3. Нажмите "Try it out"
4. Введите параметры (если требуется)
5. Нажмите "Execute"
6. Просмотрите результат

## 📊 Особенности

### Без онлайн-оплаты
- Заказы оформляются без платёжных систем
- Генерация PDF-инвойсов после оформления
- Возможность скачивания документов

### Безопасность
- JWT токены с refresh ротацией
- Валидация всех входных данных
- Rate limiting на API endpoints
- CORS настройки

### SEO оптимизация
- Server-side rendering
- Метатеги и Open Graph
- Structured data (JSON-LD)
- Sitemap.xml и robots.txt

### Производительность
- Кэширование в Redis
- Оптимизация изображений
- Lazy loading компонентов
- Минификация ассетов

## 🔒 Переменные окружения

### Backend (.env)
```env
DATABASE_URL="postgresql://sharikplus:sharikplus123@localhost:5432/sharikplus"
REDIS_URL="redis://localhost:6379"
JWT_SECRET="your-secret-key"
JWT_REFRESH_SECRET="your-refresh-secret"
NODE_ENV="development"
```

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL="http://localhost:3001"
NEXT_PUBLIC_SITE_URL="http://localhost:3002"
```

## 🚀 Деплой

### Vercel (Frontend)
```bash
cd apps/frontend
vercel --prod
```

### Railway/Render (Backend)
```bash
cd apps/backend
docker build -t sharikplus-backend .
```

## 🧪 Тестирование

```bash
# Unit тесты
npm run test

# E2E тесты
npm run test:e2e

# Покрытие кода
npm run test:coverage
```

## 📚 Документация

- [API Documentation](http://localhost:3001/api/docs) - Swagger UI
- [ADMIN_ACCESS.md](./ADMIN_ACCESS.md) - Руководство по админ панели
- [ADMIN_SOLUTION.md](./ADMIN_SOLUTION.md) - Техническое решение админки
- [PROJECT_STATUS.md](./PROJECT_STATUS.md) - Статус проекта

## 🆘 Поддержка

### Частые проблемы

1. **Админ панель не работает**: Используйте Swagger UI по адресу http://localhost:3001/api/docs
2. **Порт занят**: Frontend работает на порту 3002, а не 3000
3. **База данных недоступна**: Проверьте статус PostgreSQL
4. **Redis connection failed**: Убедитесь, что Redis запущен

### Логи

```bash
# Все сервисы
docker-compose logs

# Конкретный сервис
docker-compose logs backend
docker-compose logs frontend
```

### Подключение к базе данных
```bash
# PostgreSQL
Host: localhost
Port: 5432
Database: sharikplus
Username: sharikplus
Password: sharikplus123

# Redis
Host: localhost
Port: 6379
```

## 🤝 Разработка

### Добавление новых функций

1. **Backend**: Создайте новый модуль в `apps/backend/src/`
2. **Frontend**: Добавьте страницы в `apps/frontend/app/`
3. **UI**: Общие компоненты в `packages/ui/`

### Стиль кода

- ESLint + Prettier для форматирования
- TypeScript strict mode
- Conventional commits
- Husky pre-commit hooks

## 📄 Лицензия

MIT License

## 👥 Команда

Разработано для интернет-магазина воздушных шаров SharikPlus.ru

---

**🎈 SharikPlus** - Ваш надёжный партнёр в мире воздушных шаров!

## 🎯 Текущий статус проекта

✅ **Интернет-магазин**: Полностью функционален  
✅ **Backend API**: Работает с полной документацией  
✅ **Админ панель**: Доступна через Swagger UI  
✅ **База данных**: PostgreSQL с тестовыми данными  
✅ **Кэширование**: Redis настроен и работает  
✅ **Docker**: Все сервисы контейнеризованы  

**Проект готов к использованию и дальнейшей разработке!**# SharikPlus
# SharikPlus
