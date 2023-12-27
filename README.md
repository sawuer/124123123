# api-docs

[[_TOC_]]

OpenApi документация проекта ВЦ ДИТ

# Требования к ведению документации
- Названия эндпоинда должно содержать название сущности и обработчик в качестве префикса.
- Название группы эндпоинтов пишется через тире и в единственном числе, сами эндпоинты описываются в camelCase стандарте, также в единственном числе.
  Так, например, при работе с сущностью enquiryFileAnalysis группа должна называться "enquiry-file-analysis". Эндпоинт для получения сущности "showEnquiryFileAnalysis", для получения списка сушностей "indexFileAnalysis" и т.д.
  Примеры стандартных префиксов:
  - index - получение списка сущностей
  - show - получение сущности
  - store - создание сущности
  - update - обновление сущности
  - delete - удаление сущности

- Там, где невозможно обойтись стандартными префиксами допускается использовать кастомные. Так, например, для получения списка непрочитанных уведомлений допускается использовать префикс "showUnread".

- Для каждого эндпоинта должен быть описан составной тип содержимого запроса: multipart/form-data, application/json и т.д.

- Каждый эндпоинт в описании (*description*) должен содержать полную информацию о функциональности эндпоинта. Например, для эндпоинта indexEnquiriesCodeAnalysis необходимо указать "Получение всех заявок на анализ исходного кода".

- Каждый эндпоинт должен содержать все коды ошибок, реализуемые в системе. Так, например, в случаи отсутствия необходимой авторизации пользователя по эндпоинту возвращается 401 ошибка с соответствующим сообщением. Ошибка и сообщение (общее сообщение) должны быть отражены в документации.

- Для эндпоинта должен быть установлен параметр обязательности отправки того или иного параметра.

- Для каждого параметра эндпоинта должно быть дано исчерпывающее описание с примером данных.

- Для каждой сущности необходимо реализовывать соответствующую модель.

- Параметры фильтрации и пагинации должны быть отражены в документации для каждого эндпоинта.

- **Не допускается одинаковое название эндпоинтов!**
# Требования к разработке

- [Общие требования](https://gitlab.innostage-group.ru/dit-msk/docs/dev-docs/-/blob/master/common.md)

# Инструкция по запуску разработки

Перед началом работы выполнить команды:

```bash
git config user.name "Фамилия Имя Отчество"
git config user.email "name.lastname@innostage-group.ru"
```

Можно выполнить команды с флагом `--global`, если вы работаете с рабочего компа/ноута

## Установка зависимостей

```bash
npm ci
```

## Старт работы

```bash
npm run dev
```

## Сборка

```bash
npm run build
```

## Предпросмотр

```bash
npm run preview
```

## Проверка хуков

```bash
# Проверка пре-комит хука
npm run preCommitHook
```

```bash
# Проверка комит линтера
npm run commitLintHook
```