/* eslint-disable quotes */
const Logic = [
  [
    `Различные задачи на логику`,
    `<pre>
a
+
+
b</pre><br>Компилятор JS попытается увеличить b т.к. посчитает a законченным выражением.<hr><b>[] + []</b> - выведет пустую строку, т.к. в первую очередь идет проверка на число а затем на строку и по скольку массив имеет метод toString() то они преобразуются в строку<hr><b>[] + {}</b> - [object Object] потому что объект не может быть представлен в виде строки поэтому вернется описание объекта + пустая строка<hr><b>{} + []</b> - 0 потому что сначала {} будет интерпритирован как пустой блок кода === ничему, а затем будет преобразование пустой строки в число(+n)<hr><b>{} + {}</b> - 2 варианта(все зависит от движка браузера):<br>1) "[object Object][object Object]" как если бы происходило сложение строк<br>2) NaN - потому что сначала идет пустой блок кода а затем унарное преобразование объекта в число<hr><b>Array(3).join('text' - 1);</b> => 'NaNNaN' - потому что сначала создается массив с 3 элементами и затем преобразуется в строку с помощью разделителя 'text' - 1, который не сможет произвести вычитание и вернет NaN<hr><b>'foo' + + 'foo'</b> => 'fooNaN' потому что идет сложение строки с преобразованием строки в число<hr><b>'5' + - '2'</b> => '5-2' потому что идет сложение строки с преобразованием строки в отрицательное число. Если операторов сложения и вычитание будет много то сначала интерпритатор читает запись справа налево пытаясь произвести операции с правой частью выражения<hr><pre>
const x = 3;
'5' + x - x</pre><br> - 50 т.к. сначала идет сложение строк а потом из полученной строки вычитают 3 тем самым преобразуя строку в число<hr><b>0 >= null</b> => true потому что хоть и нельзя сравнивать с null, но тут логика следующая - <br>!(0 < null) => !(false) => true<hr><b>'\\t \\n' - 2</b> => -2 потому что в преобразовании пробельные символы игнорируются и на выходе получается пустая строка которая затем преобразуется в 0<hr><b>'яб' > 'ан'</b> => true потому что строковое сравнение происходит по символьно и если код символа больше (он находится дальше) то он будет весомее<hr>[] + false - null + true => NaN потому что из строки 'false' нельзя вычесть null<hr><pre>
let y = 1;
let x = y = 2;
alert(x);</pre><br> => 2 потому что в последовательном присваивании читается справа налево<hr><b>console.log(2 && 1 && null && 0 && false);</b> => null потому что null будет являться 1 false<hr><b>!!(a && b) === (a && b)</b> => false потому что в левой части идет преобразование в bool а в правой вернется 1 из значений<hr><b>console.log(null || 2 && 3 || 4);</b> => 3 потому что сначала будет вычисленно выражение && потому что у него приоритет выше и в итоге мы получим - null || 3 || 4<hr><b>alert(alert(1) || 2 || alert(3));</b> => 1 потом 2 потому что сначала сработает алерт из условия но т.к. сам метод вернет undefined то 1 true в условии будет 2<hr>`
  ],
  [
    `Функция проверки палиндрома`,
    `Следующая функция проверяет является ли слово палиндромом(словом которое читается одинаково со всех сторон)<pre>
function check(str) {
return str === str.split('').reverse().join('');
}</pre>`
  ],
  [
    `Функция получения самого короткого слова в строке`,
    `Следующая функция находит самое короткое слово в строке<pre>
const check = (str) => str.split(' ').sort((a, b) => a.length - b.length)[0];</pre>`
  ],
  [
    `Функция создания инициалов из полученной строки`,
    `Следующая функция создает строку с инициалами из полученной строки<pre>
const initial = (str) => str.split(' ').map(word => word[0].toUpperCase() + '.').join('');</pre>`
  ],
  [
    `Функция суммирования всех цифр числа`,
    `Следующая функция возвращает сумму всех цифр переданного числа<pre>
const sum = (num) => Math.abs(num).toString().split('').reduce((s, n) => s += +n, 0);</pre>`
  ],
  [
    `Функция поиска min и max в массиве чисел`,
    `Следующая функция возвращает максимальное и минимальное число в массиве<pre>
const minMax = (ar) => [Math.min(...ar), Math.max(...ar)];</pre>`
  ],
  [
    `Функция удаления свойста из объекта`,
    `Следующая функция удаляет переданное свойство в 1 аргументе из объекта во 2 аргументе<pre>
const deleteValue = (val, obj) => {
const {[val]: del, ...result} = obj;
return result;
};</pre>`
  ],
  [
    `Функция фильтрации массива (filter)`,
    `Следующая функция возвращает новый массив на основе массива из 1 аргумента отфильтрованного по условию callback переданного во 2 аргументе<pre>
const myFilter = (ar, cb) => {
const result = [];
ar.forEach((it) => {
  if (it && cb(it)) result.push(it);
});
return result;
}</pre>`
  ],
  [
    `Функция преобразования элементов массива (map)`,
    `Следующая функция возвращает новый массив на основе массива из 1 аргумента при этом изменяя элементы массива на основе переданной callback из 2 аргумента<pre>
const myMap = (ar, cb) => {
const result = [];
ar.forEach(it => {
  result.push(cb(it));
});
return result;
}</pre>`
  ],
  [
    `Функция схлопывания элементов массива (reduce)`,
    `Следующая функция возвращает значение полученное из преобразования элементов массива переданного 1 аргументом на основе условия переданного в callback 2 аргументом а также принимает в качестве 3 аргумента начальное значение<pre>
const myReduce = (ar, cb, start = null) => {
let result = start;
  ar.forEach(it => {
    if (result) {
      result = cb(result, it)
    } else {
      result = it;
    }
})
return result;
}</pre>`
  ],
  [
    `Функция изменения имени свойста объекта`,
    `Следующая функция изменяет имя переданного свойства в 1 аргументе на имя переданное во 2 аргументе из объекта в 3 аргументе<pre>
const renameVal = (oldV, newV, obj) => {
const {[oldV]: del, ...result} = obj;
return {[newV]: del, ...result}
};</pre>`
  ],
  [
    `Функция добавления свойства в объект`,
    `Следующая функция добавляет переданное свойство в 1 аргументе из объекта во 2 аргументе<pre>
const addValue = ({...val}, obj) => {...obj, ...val}</pre>`
  ],
  [
    `Функция преобразования числа в строку`,
    `<pre>
const myToString = num => {
  const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  let result = [];
  const prefix = num > 0 ? '' : '-';
  while(num !== 0) {
    const lastNum = num % 10;
    result.unshift(lastNum);
    num = Math.trunc(num / 10);
  }
  result.unshift(prefix);
  return result.join('');
}</pre>`
  ],
  [
    `Функция фибоначчи`,
    `<pre>
function fibRecursive(n) {
if (n === 0) return 0;
if (n === 1) return 1;
return fibRecursive(n - 1) + fibRecursive(n - 2);
}

function fib(n) {
if (n === 0) return 0;
if (n === 1) return 1;
let result = 1;
let i = 2;
let prev = 0;
while (i <= n) {
  let temp = result;
  result += prev;
  prev = temp;
  i++;
}
return result;
}</pre>`
  ]
];