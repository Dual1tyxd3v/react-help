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
    `Оценка сложности алгоритмов`,
    `Оценка всегда производится исходя из наихудшего варианта(О). При оценке необходимо придерживаться нескольких правил:<br>
    1) отбрасывание констант - когда например в алгоритме имеется несколько n циклов, тогда сложность по идее будет О(x*n), но в результате х как константу отбрасываем и получаем O(n)<br>
    2) drop non-dominant - когда из нескольих операций выбирается наиболее весомый. Например в алгоритме имеется обычный цикл и еще 1 цикл с вложенным. Вместо O(n + n*n) мы получим O(n*n) тем самым оставив наиболее тяжелый вариант<br>
    O(n) - прямолинейная сложность и зависит от n. Например проход по массиву зависит от длины массива(n)<br>
    O(n*n) - более сложный вариант когда используется вложенный цикл<br>
    O(1) - когда сложность не зависит не от чего и количество операций всегда постоянно<br>
    O(log n) - сложность приближенная к O(1). Подход разделяй и властвуй, например используется в поиске по массиву с использованием бинарной сортировки`
  ],
  [
    `Реализация связного списка (LL)`,
    `<pre>
class Node {      <sup>1</sup>
  constructor(v) {
    this.value = v;
    this.next = null;
  }
}

class LinkedList {
  constructor(v) {    <sup>2</sup>
    const node = new Node(v);
    this.head = node;
    this.tail = node;
    this.length = 1;
  }

  push(v) {           <sup>3</sup>
    const node = new Node(v);
    if (!this.length) {
      this.head = node;
    } else {
      this.tail.next = node;
    }
    this.tail = node;
    this.length++;
    return this;
  }

  pop() {         <sup>4</sup>
    if (!this.length) return undefined;
    let temp = this.head;
    let prev = this.head;
    while(temp.next) {
      temp = temp.next;
      prev = temp;
    }
    prev.next = null;
    this.tail = prev;
    this.length--;
    if (!this.length) {
      this.head = null;
      this.tail = null;
    }
    return temp;
  }

  unshift(v) {      <sup>5</sup>
    const node = new Node(v);
    if (!this.length) {
      this.head = node;
      this.tail = node;
    } else {
      node.next = this.head;
      this.head = node;
    }
    this.length++;
    return this;
  }

  shift() {     <sup>6</sup>
    if (!this.length) return undefined;
    const temp = this.head;
    this.head = temp.next;
    temp.next = null;
    this.length--;
    if (!this.length) this.tail = null;
    return temp;
  }

  get(i) {      <sup>7</sup>
    if (i >= this.length || i < 0) return undefined;
    let temp = this.head;
    for(let k = 0; k < i; k++) {
      temp = temp.next;
    }
    return temp;
  }

  set(i, v) {     <sup>8</sup>
    const node = this.get(i);
    if (!node) return false;
    node.value = v;
    return true;
  }

  insert(i, v) {      <sup>9</sup>
    if (i < 0 || i > this.length) return false;
    if (i === 0) return this.unshift(v);
    if (i === this.length) return this.push(v);
    const prev = this.get(i - 1);
    const node = new Node(v);
    node.next = prev.next;
    prev.next = node;
    this.length++;
    return true;
  }

  remove(i) {       <sup>10</sup>
    if (i < 0 || i >= this.length) return undefined;
    if (i === 0) return this.shift();
    if (i === this.length - 1) return this.pop();
    const prev = this.get(i - 1);
    const temp = prev.next;
    prev.next = temp.next;
    temp.next = null;
    this.length--;
    return temp;
  }

  reverse() {       <sup>11</sup>
    let temp = this.head;
    this.head = this.tail;
    this.tail = this.head;
    let prev = null;
    let next = temp;
    for (let i = 0; i < this.length; i++) {
      next = temp.next;
      temp.next = prev;
      prev = temp;
      temp = temp.next;
    }
    return this;
  }
}</pre>
1) сначала создаем отдельный класс для каждого элемента списка (нода/узел) в котором определяем переданое значение и свойство next указывающее на null. В итоге получаем структуру в виде объекта со свойстами value и next<br>
2) в конструкторе создаем новый нод и указываем что голова и хвост списка указывают на него. Также увеличиваем длину списка. Сам список будет выглядеть как объект в котором содержится нода, которая ссылается на следующую ноду и так далее<br>
3) при добавлении в конец списка создаем новую ноду. Затем проверяем если список пуст то указываем что голова ссылается на ноду, если же нет то указываем что next хвоста указывает на ноду. В конце сдвигаем хвост и увеличиваем длину списка<br>
4) для удаления последнего элемента сначала проверяем не пустой ли список. Если не пуст, то создаем 2 переменные и с помощью цикла доходим до последнего элемента в списке, где на каждой итерации фиксируем последний и предпоследний элементы в переменные. Затем удаляем связь между ними и сдвигаем хвост на предыдущий элемент и уменьшаем длину списка. Далее проверяем если после всех операций длина списка стала равно 0 присваиваем хвосту и голове null и в конце возвращаем удаленный нод<br>
5) для вставки в начало сначала создаем новый нод. Проверяем пустой ли список, если да то просто определяем голову и хвост как нод, если нет то присваиваем ноде ссылку на старую голову а затем сдвигаем ее и в конце увеличиваем длину списка<br>
6) при удалении первого элемента сначала проверяем не пустой ли список. Если нет то сохраняем удаляемый нод в переменную, сдвигаем голову, удаляем связь ноды со списком, уменьшаем длину списка и возвращаем удаленный нод<br>
7) чтобы получить нод по индексу сначала проверяем является ли индекс допустимым. После чего циклом проходим по списку до нужного индекса и возвращаем полученную ноду<br>
8) для установки нового значения какому то ноду используем предыдущий метод для получения искомой ноды. Если такой нет возвращаем false. Иначе просто меняем значение у найденного нода и возвращаем true<br>
9) для вставки ноды сначала проверяем является ли индекс допустимым. В случае успеха проверяем сам индекс, если он = 0 или длине списка то просто используем один из готовых методов для добавления элемента в начало или конец. Если нет то с помощью get метода получаем предыдущий от искомого элемент, создаем новый нод, связываем новый нод с тем что находится под искомым индексом, а предыдущий связываем с новым. В конце увеличиваем длину списка и возвращаем true<br>
10) для удаления элемента сначала проверяем индекс на допустимый диапазон. После чего проверяем является ли индекс начальной или конечной точкой списка и если да просто возвращаем результат одного из готового метода для удаления крайних элементов списка. Если нет то сначала находим предыдущий элемент, сохраняем в переменную искомый элемент, заменяем связь у предыдущего, удаляем связь со списком у искомого, уменьшаем длину списка и возвращаем искомый нод<br>
11) чтобы развернуть список сначала сохраняем голову в переменную. Затем меняем местами голову и хвост. После чего создаем переменные для хранения предыдущего и следующего элемента. Проходим циклом по всему списку и меняем связь элементов в обратном порядке<br>
В итоге такая структура имеет следующие сложности:<br>
Добавление в начало - O(1)<br>
Добавление в конец - O(1)<br>
Добавление не по краям - O(n)<br>
Выборка элемента - O(n)<br>
Удаление элемента в начале - O(1)<br>
Удаление элемента в конце - O(n)<br>
Удаление не по краям - O(n)<br>
Разворот - O(n)`
  ],
  [
    `Реализация стэка(stack)`,
    `<pre>
class Node {
  constructor(v) {      <sup>1</sup>
    this.value = v;
    this.next = null;
  }
}
class Stack {
  constructor(v) {        <sup>2</sup>
    const node = new Node(v);
    this.top = node;
    this.length = 1;
  }

  push(v) {         <sup>3</sup>
    const node = new Node(v);
    node.next = this.top;
    this.top = node;
    this.length++;
    return this;
  }

  pop() {       <sup>4</sup>
    if (!this.length) return undefined;
    const temp = this.top;
    this.top = temp.next;
    temp.next = null;
    this.length--;
    return temp;
  }
}</pre>
1) сначала создаем отдельный класс для элементов стэка. По сути это тот же связный список поэтому структура элементов не меняется<br>
2) конструктор самого стэка почти идентичен связному списку и имеет 1 отличие - вместо головы и хвоста имеется только свойство обозначающее вершину стэка<br>
3) чтобы добавить элемент сначала создаем новый нод, затем связываем его с вершиной стэка, сдвигаем вершину и увеличиваем длину стэка<br>
4) чтобы удалить элемент сначала проверяем не пустой ли стэк. Если нет, сохраняем в переменную искомый элемент, убираем между ним и стэком связи, уменьшаем длину стэка и возвращаем элмемент`
  ],
  [
    `Реализация очереди(queue)`,
    `<pre>
class Node {      <sup>1</sup>
  constructor(v) {
    this.value = v;
    this.next = null;
  }
}
class Queue {
  constructor(v) {        <sup>2</sup>
    const node = new Node(v);
    this.length = 1;
    this.first = node;
    this.last = node;
  }

  enqueue(v) {      <sup>3</sup>
    const node = new Node(v);
    if (!this.length) {
      this.first = node;
    } else {
      this.last.next = node;
    }
    this.last = node;
    this.length++;
    return this;
  }

  dequeue() {       <sup>4</sup>
    if (!this.length) return undefined;
    const temp = this.first;
    this.first = temp.next;
    temp.next = null;
    this.length--;
    if (!this.length) {
      this.last = null;
    }
    return temp;
  }
}</pre>
1) конструктор элементов очереди такой же как у связного списка<br>
2) конструктор самой очереди почти такой же как и у связного списка, только вместо головы и хвоста у нас теперь first и last свойства<br>
3) чтобы добавить элемент создаем ноду, проверяем не пустая ли очередь, если да то указываем first, если нет то просто добавляем последнему элементу ссылку на ноду, сдвигаем last и увеличиваем длину очереди<br>
4) чтобы убрать элемент сначала проверяем не пустая ли очередь. Далее сохраняем в переменную искомый элемент, сдвигаем first, убираем связь между элементом и очередью и уменьшаем длину очереди`
  ],
  [
    `Реализация бинарного дерева(BT)`,
    `<pre>
class Node {
  constructor(v) {        <sup>1</sup>
    this.value = v;
    this.left = null;
    this.right = null;
  }
}
class BinaryTree {
  constructor() {         <sup>2</sup>
    this.root = null;
  }

  insert(v) {       <sup>3</sup>
    const node = new Node(v);
    if (!this.root) {
      this.root = node;
      return this;
    }
    let temp = this.root;
    while(true) {
      if (node.value === temp.value) return undefined;
      if (node.value > temp.value) {
        if (!temp.right) {
          temp.right = node;
          return this;
        }
        temp = temp.right;
      } else {
        if (!temp.left) {
          temp.left = node;
          return this;
        }
        temp = temp.left;
      }
    }
  }

  contains(v) {       <sup>4</sup>
    if (!this.root) return false;
    let temp = this.root;
    while(temp) {
      if (v === temp.value) return true;
      if (v > temp.value) {
        temp = temp.right;
      } else {
        temp = temp.left;
      }
    }
    return false;
  }
}</pre>
В бинарном дереве каждый нод имеет только 1 родителя и 2 ребенка. Для удобства обычно помещают меньшие элементы слева а большие справа. В случае если добавляется элемент с уже существующим значением, тогда либо ничего не делают, либо добавляют счетчик(count) на элемент и увеличивают его. Полное дерево это когда у всех нод либо 2 либо 0 детей. Идеальное дерево это когда все ветки дерева имеют одинаковую длину<br>
1) конструкто ноды помимо поля со значением также имеет поля left и right<br>
2) конструктор самого дерева создает только пустой root<br>
3) метод для добавления элементов. Создаем ноду, проверяем пустое ли дерево. Если да то просто указываем в root ноду. Если нет сначала создаем временную переменную которая будет указывать на начальную позицию в дереве. Затем в бесконечном цикле сначала проверяем не являются ли переданое значение и значение из временой переменной равны. Если да то выходим из цикла без результата, если нет идем дальше и сравниваем значения после чего сдвигаем переменную ниже (left/right). Так происходит до того момента пока не найдем свободное место куда и присвоим новый нод<br>
4) чтобы проверить на наличие элемента в дереве сначала проверяем не пустое ли оно. Если нет с помощью цикла углубляемся внутрь дерева в зависимости от сравнения искомого значения и значения в переменной указателе. Так происходит до тех пор пока либо не будет найдено искомое либо пока не упремся в пустоту`
  ],
  [
    `Реализация хэш таблицы(hash table)`,
    `<pre>
class HashTable {
  constructor(size = 5) {       <sup>1</sup>
    this.data = new Array(size);
  }

  _hash(k) {        <sup>2</sup>
    let hash = 0;
    for (let i = 0; i < k.length; i++) {
      hash = (hash + k.charCodeAt(i) * 23) % this.data.length;
    }
    return hash;
  }

  set(k, v) {       <sup>3</sup>
    const i = this._hash(k);
    if (!this.data[i]) this.data[i] = [];
    this.data[i].push([k, v]);
    return this;
  }

  get(k) {        <sup>4</sup>
    const i = this._hash(k);
    if (this.data[i]) {
      for (let x = 0; x < this.data[i].length; x++) {
        const [key, val] = this.data[i];
        if (k === key) return val;
      }
    }
    return undefined;
  }

  keys() {        <sup>5</sup>
    const all = [];
    for (let i = 0; i < this.data.length; i++) {
      if (!this.data[i].length) continue;
      for (let k = 0; k < this.data[i].length; k++) {
        all.push(this.data[i][k][0]);
      }
    }
    return all;
  }
}</pre>
1) в конструкторе указываем количество индексов для таблицы<br>
2) вспомогательный метод для вычисления хэша. В данном примере берем каждый символ ключа, превращаем в числовое значение, плюсуем с hash и получаем остаток от деления на количество индексов. Таким образом всегда будем получать хэш от 0 до количества индексов - 1. 23 здесь просто обычное натуральное число<br>
3) для добавления элемента сначала получаем хэш. Затем смотрим есть ли под этим хэшем какие то данные. Если нет то создаем пустой массив. Если есть то просто добавляем в него новый массив с [ключ, значение]. По скольку при добавлении нового элемента может возникнуть коллизия, то есть 2 варианта решения. В нашем случае мы просто храним под хэшем массив в который добавляем все значения под этим хэшем. В другом случае можно сдвигать индекс на ближайший свободный и записывать туда напрямую значения. Может показаться что подход с массивом весьма затратный но на самом деле в реальной жизни hash функции намного сложнее и создают более уникальные ключи, что позволяет практически избежать коллизии<br>
4) чтобы получить данные по ключу сначала находим хэш. Проверяем есть ли у нас данные под этим хэшем. Если есть проходим по массиву и сравниваем ключи с искомым. Если найдено совпадение возвращаем значение<br>
5) для возврата списка всех ключей создаем контейнер(массив). Затем циклом проходим по всей таблице где внутри запускаем еще 1 цикл, в котором будем получать ключи и добавлять в контейнер. В конце возвращаем ранее созданый контейнер с ключами`
  ],
  [
    `Реализация графа`,
    `<pre>
class Graph {
  constructor() {       <sup>1</sup>
    this.data = {};
  }

  addVertex(v) {      <sup>2</sup>
    if (this.data[v]) return false;
    this.data[v] = [];
    return true;
  }

  addEdge(v1, v2) {       <sup>3</sup>
    if (!this.data[v1] || !this.data[v2]) return false;
    this.data[v1].push(v2);
    this.data[v2].push(v1);
    return true;
  }

  removeEdge(v1, v2) {      <sup>4</sup>
    if (!this.data[v1] || !this.data[v2]) return false;
    this.data[v1] = this.data[v1].filter(vertex => vertex !== v2);
    this.data[v2] = this.data[v2].filter(vertex => vertex !== v1);
    return true;
  }

  removeVertex(v) {       <sup>5</sup>
    if (!this.data[v]) return false;
    this.data[v].forEach(vertex => this.removeEdge(v, vertex));
    delete this.data[v];
    return true;
  }
}</pre>
Граф может быть представлен в виде смежной матрицы или смежного листа. Матрица своего рода таблица а лист грубо говоря объект где свойства - вершины а их значения массивы в которых содержаться вершины с которыми данная вершина имеет связи. В большинстве случаев лист намного эффективнее матрицы т.к. сложность работы с ним легче (O(n + e) vs. O(n*n)), а также матрица занимает больше места в памяти<br>
1) в конструкторе просто создаем пустой объект<br>
2) метод для добавления вершин. Сначала проверяем есть ли уже такая вершина, если нет то добавляем со значением в виде пустого массива(смежный лист)<br>
3) чтобы добавить связи между вершинами сначала проверяем на наличие самих вершин. Если они существуют то просто добавляем значения в массив<br>
4) чтобы удалить связи сначала проверяем на наличие указаных вершин а затем с помощью фильтрации отсеиваем вершины которые следует удалить<br>
5) для удаления вершины сначала проверяем на наличие. Если такая существует то с помощью цикла проходим по массиву связей и удаляем их. После чего удаляем саму вершину`
  ],
  [
    `Реализация двусвязного списка (DLL)`,
    `<pre>
class Node {      <sup>1</sup>
  constructor(v) {
    this.value = v;
    this.prev = null;
    this.next = null;
  }
}

class DoubleLinkedList {        <sup>2</sup>
  constructor(v) {
    class node = new Node(v);
    this.head = node;
    this.tail = node;
    this.length++;
  }

  pop() {       <sup>3</sup>
    if (!this.length) return undefined;
    const temp = this.tail;
    this.tail = temp.prev;
    this.tail.next = null;
    temp.prev = null;
    this.length--;
    if (!this.length) {
      this.head = null;
      this.tail = null;
    }
    return temp;
  }

  get(i) {      <sup>4</sup>
    if (i < 0 || i >= this.length) return undefined;
    let temp = this.head;
    if (i < this.length / 2) {
      for (let k = 0; k < i; i++) {
        temp = temp.next;
      }
    } else {
      temp = this.tail;
      for (let k = this.length - 1; k > i; k--) {
        temp = temp.prev;
      }
    }
    return temp;
  }
}</pre>
DLL немного чем отличается от LL. Однако есть ряд изменений:<br>
1) в конструкторе ноды добавляется новое свойство prev которое будет содержать ссылку на предыдущий элемент<br>
2) сам конструктор списка не меняется<br>
3) удаление последнего элемента теперь более эффективно. Сначала проверяем не пустой ли список. Если нет то сохраняем искомый элемент в переменную, смещаем хвост, удаляем у него связь с искомой нодой, удаляем связь у искомой ноды со списком, уменьшаем длину списка, проверяем если список стал пуст то обнуляем значение головы и хвоста и в конце возвращаем удаленный элемент<br>
4) поиск элемента по индексу стал тоже немного эффективнее. Благодаря двунаправленной связи мы можем начать поиск с конца или сначала списка`
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
