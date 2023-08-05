/* eslint-disable quotes */
const Git = [
  [
    `Настройка`,
    `<b>git config --global user.name 'Name'</b><br>
    <b>git config --global user.email email</b> - глобальная настройка имени и email<br>
    <b>git config --list</b> - вывести все настройки<br>
    <b>git config --global color.ui true</b><br>
    <b>git config --global color.status auto</b><br>
    <b>git config --global color.branch auto</b> - глобальные настройки цветовой схемы отображения`
  ],
  [
    `Помощь`,
    `<b>git --help</b> - общая документация<br>
    <b>git x --help</b> - документация по конкретной команде х`
  ],
  [
    `Создание репозитория`,
    `<b>git init</b> - инициализация репозитория локально<br>
    <b>git status</b> - информация о текущем состоянии репозитория<br>
    <b>git add -A</b> - добавить все файлы в индексацию для отслеживания изменений<br>
    <b>git add file.ext</b> - добавить отдельно файл в индексацию<br>
    <b>git reset file.ext</b> - удалить файл из индексации<br>
    <b>git commit -m 'Message'</b> - зафиксировать изменения в индексации и оставить комментарий<br>
    <b>git commit -a -m 'Message'</b> - флаг -a добавляет все файлы в индексацию (git add -A) а затем фиксирует все изменения<br>
    <b>git log</b> - вывести все коммиты<br>
    <b>git show hash</b> - показать отдельный коммит где хэш - хэш коммита<br>
    <b>git commit --ammend -m 'New message'</b> - изменить последний коммит, в данном случае сообщение`
  ],
  [
    `Удаленный репозиторий`,
    `<b>git clone URL</b> - скопировать себе репозиторий по URL а также всю историю изменений<br>
    <b>git clone URL new-folder</b> - скопировать репозиторий в папку - new-folder<br>
    <b>git remote add origin url</b> - указать локальному репозиторию связь с удаленным, где<br>
    ---origin - название репозитория, т.к. в 1 проекте могут использоваться несколько репозиториев<br>
    ---url - адрес репозитория<br>
    <b>git push origin master</b> - залить изменения с локального репозитория в удаленный в конкретной ветке<br>
    <b>git pull origin master</b> - скачать изменения себе в локальный репозиторий`
  ],
  [
    `Ветки`,
    `<b>git branch new-feature</b> - создать новую ветку new-feature<br>
    <b>git branch</b> - вывести список всех веток<br>
    <b>git checkout new-feature</b> - переключиться на ветку new-feature<br>
    <b>git merge new-feature</b> - слить текущую ветку с new-feature<br>
    <b>git branch -d new-feature</b> - удалить ветку<br>
    <b>git ckecout -b name origin/name</b> - создать ветку и сразу же переключиться на нее. Полезно если необходимо скопировать в репозитории 1 ветку и сразу с ней работать`
  ],
  [
    `Дополнительные`,
    `<b>git diff hash</b> - показать разницу между текущим состоянием и коммитом по хэшу<br>
    <b>git difftool</b> - графическое представление разницы<br>
    <b>git checkout hash file.ext</b> - откат состояния файла в состояние из указанного коммита<br>
    <b>git revert x</b> - отменить коммит в случае если он уже отправлен на удаленку или если это не последний коммит, где х - <br>
    ---HEAD - последний коммит<br>
    ---hash - хэш нужного коммита<br>
    <b>git mergetool</b> - графический интерфейс для разрешения проблем<br>
    <b>git stash</b> - перенести изменения во временное хранилище<br>
    <b>git stash apply</b> - применить изменения из временного хранилища<br>
    <b>git reset --soft HEAD~1</b> - отменить последний коммит но оставить файлы в индексации<br>
    <b>git reset --hard HEAD~1</b> - полностью отменить последний коммит`
  ]
];
