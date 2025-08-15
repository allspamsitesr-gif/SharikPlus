# 🛠️ Руководство по установке SharikPlus

Подробные инструкции по установке и настройке интернет-магазина воздушных шаров.

## 📋 Системные требования

- **Node.js**: 18.0.0 или выше
- **npm**: 9.0.0 или выше
- **Docker**: 20.0.0 или выше
- **Docker Compose**: 2.0.0 или выше
- **Git**: для клонирования репозитория

## 🚀 Быстрая установка

### 1. Клонирование репозитория

```bash
git clone <repository-url>
cd sharikplus-shop
```

### 2. Установка зависимостей

```bash
# Установить зависимости для всех пакетов
npm install
```

### 3. Запуск через Docker (Рекомендуется)

```bash
# Запустить все сервисы
npm run docker:up

# Проверить статус
docker-compose ps
```

### 4. Заполнение базы данных

```bash
# Заполнить тестовыми данными
npm run db:seed
```

### 5. Проверка работоспособности

Откройте в браузере:
- **Интернет-магазин**: http://localhost:3002
- **Админ панель**: http://localhost:3001/api/docs

## 🔧 Детальная установка

### Шаг 1: Подготовка окружения

#### Проверка версий
```bash
node --version  # должно быть >= 18.0.0
npm --version   # должно быть >= 9.0.0
docker --version
docker-compose --version
```

#### Клонирование проекта
```bash
git clone <repository-url>
cd sharikplus-shop
```

### Шаг 2: Конфигурация

#### Создание файлов окружения

**Backend (.env)**
```bash
cd apps/backend
cp .env.example .env
```

Содержимое `.env`:
```env
DATABASE_URL="postgresql://sharikplus:sharikplus123@localhost:5432/sharikplus"
REDIS_URL="redis://localhost:6379"
JWT_SECRET="your-super-secret-jwt-key-change-in-production"
JWT_REFRESH_SECRET="your-super-secret-refresh-key-change-in-production"
NODE_ENV="development"
```

**Frontend (.env.local)**
```bash
cd apps/frontend
cp .env.example .env.local
```

Содержимое `.env.local`:
```env
NEXT_PUBLIC_API_URL="http://localhost:3001"
NEXT_PUBLIC_SITE_URL="http://localhost:3002"
```

### Шаг 3: Установка зависимостей

```bash
# Вернуться в корневую директорию
cd ../..

# Установить зависимости для всех пакетов
npm install
```

### Шаг 4: Запуск сервисов

#### Вариант A: Docker (Рекомендуется)

```bash
# Запустить все сервисы
docker-compose up -d

# Проверить статус
docker-compose ps

# Посмотреть логи
docker-compose logs -f
```

#### Вариант B: Локальный запуск

**Запуск базы данных и Redis:**
```bash
# PostgreSQL
docker run -d \
  --name sharikplus-postgres \
  -e POSTGRES_DB=sharikplus \
  -e POSTGRES_USER=sharikplus \
  -e POSTGRES_PASSWORD=sharikplus123 \
  -p 5432:5432 \
  postgres:16-alpine

# Redis
docker run -d \
  --name sharikplus-redis \
  -p 6379:6379 \
  redis:7-alpine
```

**Запуск Backend:**
```bash
cd apps/backend
npm run prisma:generate
npm run db:migrate
npm run db:seed
npm run start:dev
```

**Запуск Frontend:**
```bash
cd apps/frontend
npm run dev
```

### Шаг 5: Инициализация базы данных

```bash
# Генерация Prisma клиента
npm run db:generate

# Применение миграций
npm run db:migrate

# Заполнение тестовыми данными
npm run db:seed
```

## 🌐 Проверка установки

### 1. Проверка сервисов

```bash
# Статус Docker контейнеров
docker-compose ps

# Должен показать:
# sharikplus-backend    Up    0.0.0.0:3001->3001/tcp
# sharikplus-frontend   Up    0.0.0.0:3002->3000/tcp
# sharikplus-postgres   Up    0.0.0.0:5432->5432/tcp
# sharikplus-redis      Up    0.0.0.0:6379->6379/tcp
```

### 2. Проверка API

```bash
# Проверка здоровья backend
curl http://localhost:3001/health

# Проверка товаров
curl http://localhost:3001/products

# Проверка frontend
curl -I http://localhost:3002
```

### 3. Проверка в браузере

Откройте следующие URL:

1. **Интернет-магазин**: http://localhost:3002
   - Должна отображаться главная страница с товарами

2. **Админ панель**: http://localhost:3001/api/docs
   - Должна открыться Swagger документация

3. **API статус**: http://localhost:3001/health
   - Должен вернуть `{"status":"ok"}`

## 🔧 Настройка для разработки

### Установка дополнительных инструментов

```bash
# Глобальные инструменты
npm install -g @nestjs/cli
npm install -g prisma
npm install -g vercel
```

### Настройка IDE

#### VS Code расширения
- TypeScript and JavaScript Language Features
- Prisma
- Tailwind CSS IntelliSense
- Docker
- GitLens

#### Настройки VS Code (.vscode/settings.json)
```json
{
  "typescript.preferences.importModuleSpecifier": "relative",
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "tailwindCSS.includeLanguages": {
    "typescript": "typescript",
    "typescriptreact": "typescriptreact"
  }
}
```

### Git hooks

```bash
# Установка Husky
npx husky install

# Добавление pre-commit hook
npx husky add .husky/pre-commit "npm run lint && npm run type-check"
```

## 🚀 Деплой

### Подготовка к продакшену

#### 1. Обновление переменных окружения

**Backend (.env.production)**
```env
DATABASE_URL="postgresql://user:password@host:5432/database"
REDIS_URL="redis://host:6379"
JWT_SECRET="strong-production-secret"
JWT_REFRESH_SECRET="strong-production-refresh-secret"
NODE_ENV="production"
```

**Frontend (.env.production)**
```env
NEXT_PUBLIC_API_URL="https://api.yourdomain.com"
NEXT_PUBLIC_SITE_URL="https://yourdomain.com"
```

#### 2. Сборка для продакшена

```bash
# Сборка всех пакетов
npm run build

# Проверка сборки
npm run start
```

### Деплой на Vercel (Frontend)

```bash
cd apps/frontend

# Установка Vercel CLI
npm i -g vercel

# Деплой
vercel --prod
```

### Деплой на Railway (Backend)

```bash
cd apps/backend

# Создание Dockerfile (уже есть)
# Пуш в Git репозиторий
# Подключение к Railway
```

### Деплой через Docker

```bash
# Сборка образов
docker-compose -f docker-compose.prod.yml build

# Запуск в продакшене
docker-compose -f docker-compose.prod.yml up -d
```

## 🆘 Устранение неполадок

### Частые проблемы

#### 1. Порт уже используется
```bash
# Найти процесс, использующий порт
lsof -i :3001
lsof -i :3002

# Остановить процесс
kill -9 <PID>
```

#### 2. Docker проблемы
```bash
# Очистка Docker
docker system prune -f

# Пересборка без кэша
docker-compose build --no-cache

# Удаление всех контейнеров
docker-compose down -v
```

#### 3. База данных недоступна
```bash
# Проверка статуса PostgreSQL
docker-compose logs postgres

# Пересоздание базы данных
docker-compose down
docker volume rm sharikplus-shop_postgres_data
docker-compose up -d postgres
npm run db:migrate
npm run db:seed
```

#### 4. Проблемы с зависимостями
```bash
# Очистка node_modules
rm -rf node_modules package-lock.json
rm -rf apps/*/node_modules
rm -rf packages/*/node_modules

# Переустановка
npm install
```

### Логи и отладка

```bash
# Просмотр логов всех сервисов
docker-compose logs

# Логи конкретного сервиса
docker-compose logs backend
docker-compose logs frontend

# Подключение к контейнеру
docker-compose exec backend sh
docker-compose exec frontend sh

# Просмотр логов в реальном времени
docker-compose logs -f backend
```

### Проверка состояния

```bash
# Статус всех сервисов
docker-compose ps

# Использование ресурсов
docker stats

# Проверка сети
docker network ls
docker network inspect sharikplus-shop_sharikplus-network
```

## 📞 Поддержка

### Контакты
- **Email**: support@sharikplus.ru
- **GitHub Issues**: [Создать issue](https://github.com/your-repo/issues)
- **Документация**: [Wiki](https://github.com/your-repo/wiki)

### Полезные ссылки
- [Next.js Documentation](https://nextjs.org/docs)
- [NestJS Documentation](https://docs.nestjs.com)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Docker Documentation](https://docs.docker.com)

---

**🎈 SharikPlus** - Готов к запуску за 5 минут!