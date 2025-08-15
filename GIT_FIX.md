# 🔧 Быстрое решение проблемы с Git

## 🚨 Проблема
```
remote: Permission to allspamsitesr-gif/SharikPlus.git denied to joseenriquef3.
fatal: unable to access 'https://github.com/allspamsitesr-gif/SharikPlus.git/': The requested URL returned error: 403
```

## ✅ Решение

### 1. Очистка кэша учетных данных
```bash
git config --global --unset credential.helper
git config --global credential.helper store
```

### 2. Создание Personal Access Token
1. Перейдите на https://github.com/settings/tokens
2. Нажмите "Generate new token (classic)"
3. Выберите scopes:
   - ✅ `repo` (Full control of private repositories)
   - ✅ `workflow` (Update GitHub Action workflows)
4. Скопируйте токен

### 3. Настройка аутентификации
```bash
# При следующем push введите:
# Username: allspamsitesr-gif
# Password: [ваш personal access token]
```

### 4. Альтернативный способ (если проблема остается)
```bash
# Измените remote URL с токеном
git remote set-url origin https://allspamsitesr-gif:[YOUR_TOKEN]@github.com/allspamsitesr-gif/SharikPlus.git
```

## 🔍 Проверка настроек
```bash
# Проверка пользователя
git config --global user.name
git config --global user.email

# Проверка remote
git remote -v
```

## 🚀 После настройки
```bash
git add .
git commit -m "feat: add project architecture documentation"
git push -u origin main
```

---
**Важно**: Никогда не коммитьте токены в код! Используйте переменные окружения или .gitignore
