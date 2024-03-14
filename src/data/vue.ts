/* eslint-disable quotes */
export const Vue = [
  [
    `Общее представление`,
    `Vue предлагает 2 варианта описания компонента<br>
    1. Options API<pre>
&lt;script&gt;    <sup>1</sup>
  export default {
    name: 'SomeComponent',
    data: () => ({ count: 0 }),
    methods: {
      increment() {
        this.count++;
      }
    }
  }
&lt;/script&gt;
&lt;template&gt;    <sup>2</sup>
  &lt;h1 class="some-class"&gt;{{ count }}&lt;/h1&gt;
  &lt;button @click="increment"&gt;Increment&lt;/button&gt;
&lt;/template&gt;
&lt;style scoped lang="sass"&gt;    <sup>3</sup>
.some-class {
  color: red;
}
&lt;/style&gt;</pre>
1. В верхней части находится логика компонента которая представлена в виде экспортируемого объекта. В этом объекте в определенных свойствах описываются методы/реактивные данные и прочее<br>
2. Далее идет шаблон HTML напоминающий JSX разметку. &lt;template&gt; - просто обертка для разметки которая никак не влияет на DOM. Чтобы вставлять что то из логики/выражения в разметку используются {{ x }}<br>
3. Далее идет блок со стилями. scoped - указывает что текущие стили ограничены областью видимости(def=global). Чтобы использовать препроцессор необходимо указать его явно в виде lang="scss/less"<hr>
2. Composition API практически идентичен 1 варианту с одним отличием. Блок логики представлен как обычный JS внутри ф-ции<pre>
&lt;script setup&gt;
import {ref} from 'vue';
const count = ref(0);
function increment() {
  count.value++;
}
&lt;/script&gt;</pre>
Для использования реактивных данных и различных методов представленных vue они сначала импортируются`,
  ],
  [
    `Использование пропсов`,
    `Пропсы передаются как и в реакте но с небольшим отличием. В случае если пропс является вычисляемым перед его именем указывается директива :<br>
    <b>&lt;MyComponent :myProp="count" &gt;</b><br>
    Чтобы использовать пропсы необходимо явно указать их. Options API:<pre>
export default {
  props: {    <sup>1</sup>
    count: Number
  }
  props: {      <sup>2</sup>
    count: {
      type: Number,
      default: 0,
      required: true,
      validator(v) {
        return v > 5
      }
    }
  }
}</pre>
В свойстве props указывается объект где свойства объекта - имена получаемых пропсов. Есть 2 варианта:<br>
1. просто указываем тип получаемого пропса<br>
2. указываем объект для более точных настроек. Можно указать тип, дефолтное значение (если передается ссылочный тип данных то default должен быть callback который вернет нужный объект - <b>default: () => ({})</b>). Также можно указать ф-цию валидатор которая по умолчанию принимает значение пропса в виде аргумента. В случае falsy результата будет выведено сообщение в консоль<br>
Composition API:<pre>
const props = defineProps({
  count: Number
})</pre>
Используется метод который доступен без импорта. В него передаем объект с настройками пропсов как в Options API. На выходе полуаем объект props который содержит все полученые пропсы`,
  ],
  [
    `Вычисляемые атрибуты элемента`,
    `Если необходимо элементу добавлять атрибут получаемый методом вычисления можно использовать следующую конструкцию:<br>
    <b>&lt;a :[arr[0].name]="arr[0].value"&gt;text&lt;/a&gt;</b><br>
    После : внутри [] указывается переменная содержащая имя атрибута`,
  ],
  [
    `Условный рендеринг`,
    `Для рендера элементов взависимости от условий используется директива v-if.Также в случае нескольких вариантов используются v-else для конечного и v-else-if для промежуточных условий. Директивы кроме v-else принимают выражение или переменную которые будут преобразованы в boolean. В случае falsy значения элемент будет полностью удален из разметки. Если используется несколько вариантов то блоки с директивами обязательно должны идти друг за другом. Поэтому если необходимо отрендерить несколько эл-ов взависимости от условия используется обертка &lt;template&gt; и на ней уже v-if<pre>
&lt;template v-if="counter === 0"&gt;
  ....
&lt;/template&gt;
&lt;template v-else-if="counter > 0"&gt;
  ....
&lt;template v-else&gt;
  ....
&lt;/template&gt;</pre>`,
  ],
  [
    `директива v-show`,
    `Используется также для условного рендера но только при false/true значениях. В случае falsy элементу будет присвоенно свойство display:none и сам элемент останется в разметке<br>
    <b>&lt;p v-show="isVisible"&gt;Some text&lt;/p&gt;</b>`,
  ],
  [
    `директива :key`,
    `Предназначена для указания элементу уникального идентификатора чтобы VDOM корректно отображал изменения (например в циклическом рендере)`,
  ],
  [
    `События`,
    `Обработчики событий в Composition API описываются в виде обычных ф-ций, а в Options API обычно в свойстве объекта methods:<pre>
    ...
    methods: {
      someHandler(e) {...}
    }
    </pre>
    В самой разметке чтобы указать обработчик события используется конструкция - @имя_события= и далее указывается обработчик, или же выражение<br>
    <b>&lt;a @click="handler"&gt;</b> - использование обработчика. По умолчанию ф-ция получает в виде аргуемнта объект на котором произошло событие<br>
    <b>&lt;a @click="this.count++"&gt;</b> - можно напрямую указать выражение<br>
    <b>&lt;a @click.prevent="handler"&gt;</b> - также можно сразу указать модификаторы через @имя_события.модификатор. Например отменить стандартное поведение(preventDefault) или указать определенную клавишу при нажатии (@keyup.enter="...")<br>
    <b>&lt;a @click="handler('myArgument', $event)"&gt;</b> - в случае если необходимо передать свои аргументы то сначала передаются кастомные а в конце $event в виде объекта события`,
  ],
  [
    `Циклический рендеринг`,
    `Vue позволяет рендерить элементы на основе массивов а также объектов. Для этого используется директива v-for в которой указывается (имя_1_объекта, индекс)/(значение, ключ, индекс) in массив/объект<br>
    <b>&lt;li v-for="(item, i) in someArray" :key="\`li_\${item.id}\`"&gt;{{ item.name }}&lt;/li&gt;</b>`,
  ],
  [
    `Computed properties`,
    `Практически тоже самое что и обычные methods только результат выполнения этих ф-ций хэшируется что позволяет улучшить производительность. В Options API:<pre>
export default {
  data: () => ({ name: 'Bob', age: 30 })
  computed: {
    fullName(v) {       <sup>1</sup>
      return \`\${v} \${this.name}\`
    },
    fullAge: {        <sup>2</sup>
      get() {
        return this.age;
      },
      set(v) {
        this.age = v;
      }
    }
  }
}</pre>
1. Можно описать в виде обычной ф-ции<br>
2. А можно в виде объекта при этом задав геттер и сеттер<hr>
В Composition API:<pre>
&lt;script setup&gt;
import {computed, ref} from 'vue';
const data = ref({name: 'Bob', age: 30});
const fullName = computed(() => data.value.name + 'Some');    <sup>1</sup>
const fullAge = computed({      <sup>2</sup>
  get() {
    return data.value.age;
  },
  set(v) {
    data.value.age = v;
  }
})
&lt;/script&gt;</pre>
1. По умолчанию если передать callback то computed служит только как геттер<br>
2. Чтобы иметь возможность передавать значения необходимо указать объект с сеттером и геттером`,
  ],
  [
    `Watch`,
    `Механизм служит для отслеживания изменений определенных данных с последующим выполнением процедур. В Options API:<pre>
export default {
  data: () => ({count: 0, date: Date.now()}),
  methods: {
    onClick(newValue, oldValue) {
      console.log(newValue - oldValue);
    }
  }
  watch: {
    count(newValue, oldValue) {       <sup>1</sup>
      ...do something
    },
    date: 'onClick'       <sup>2</sup>
  }
}</pre>
1. В объекте watch можно либо указать ф-цию с именем идентичным имени отслеживаемой переменной которая по умолчанию принимает новое и старое значения в виде 1 и 2 аргумента<br>
2. Или в '' указать имя метода обработчика<hr>
В Composition API<pre>
&lt;script setup&gt;
const count = ref(0);
watch(count, (newV, oldV) => {
  ...do something...
});
&lt;/script&gt;</pre>
Просто вызывается как ф-ция где получает в виде 1 аргумента отслеживаемую переменную, а в виде 2 callback с необходимой логикой`,
  ],
  [
    `Динамические классы`,
    `Чтобы использовать динамические классы используется директива :class:<pre>
&lt;script setup&gt;
import {computed, ref} from 'vue';
const class1 = 'active-class';
const class2 = 'error-class';
const isActive = ref(false);
const getClass = computed(() => ({
  class1: isActive.value,
  class2: !isActive.value
}));
&lt;/script&gt;
&lt;template&gt;
  &lt;p :class="class1"&gt;Text&lt;/p&gt;
  &lt;p :class="[class1, class2]"&gt;Text&lt;/p&gt;
  &lt;p :class="{ 'class1': isActive }"&gt;Text&lt;/p&gt;
  &lt;p :class="getClass"&gt;Text&lt;/p&gt;
&lt;/template&gt;</pre>
В директиву можно передать разные значения:<br>
1. напрямую указав переменную содержащую название класса<br>
2. указать массив с переменными если классов несколько<br>
3. если наличие класса зависит от какого то состояния можно передать объект где свойство - имя переменной с классом в '' а значение переменная с состоянием<br>
4. чтобы не засорять разметку 3 способ можно вынести отдельно в метод`,
  ],
];