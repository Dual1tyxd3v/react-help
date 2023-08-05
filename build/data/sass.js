/* eslint-disable quotes */
const Sass = [
  [
    `вложенность тегов`,
    `обычная вложенность
    <pre>
div
p</pre>
    <hr>
    использование контекста в вложенности. Контекст позволяет не писать заного название класса (.some_class-modify).
    <pre>
.some_class
color: red
&-modify
  color: black
    </pre>`
  ],
  [
    `$variable: *`,
    `создание переменной. Позволяет поместить в нее какое то значение для дальнейшего использования.`
  ],
  [
    `@import *`,
    `импортирование в sass, где * имя файла ("test.scss")`
  ],
  [
    `@mixin`,
    `позволяет создать набор свойств для последующего применения
    <pre>
@mixin block
color: red
padding: 0
.some-class
@include block</pre>
Также можно передавать переменные как в ф-иях<pre>
@mixin some($col) {
  padding: 10px;
  color: $col;
}
p {
  @include some(#fff);
}</pre>А еще можно комбинировать используя дескрипто @if и @content<pre>
@mixin respond($breakpoint) {
  @if $breakpoint == tab-land {
    @media (max-width: 75em) {
      @content;
    }
  }
  @if $breakpoing == phone {
    @media (max-width: 37.em) {
      @content;
    }
  }
}</pre>В данном примере миксин получает в качестве аргумента строку с типом устройства и с помощью условия if сравнивает со значениями. Если значение подошло то возвращается медиазапрос где @content это стили описанные в данном миксине`
  ]
];
