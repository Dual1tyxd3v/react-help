/* eslint-disable quotes */
export const Vue = [
  [
    `Общее представление`,
    `Vue предлагает 2 варианта описания компонента<br>
    1. Options API<pre>
&lt;script&gt;    <sup>1</sup>
  export default {
    name: 'SomeComponent',
    components: {MyComponent},
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
  &lt;MyComponent /&gt;
&lt;/template&gt;
&lt;style scoped lang="sass"&gt;    <sup>3</sup>
.some-class {
  color: red;
}
&lt;/style&gt;</pre>
1. В верхней части находится логика компонента которая представлена в виде экспортируемого объекта. В этом объекте в определенных свойствах описываются методы/реактивные данные и прочее. В Options API в объекте также указывается имя компонента в свойстве name, а также если используются другие компоненты их необходимо указать в свойстве components передав объект с компонентами<br>
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
Для использования реактивных данных и различных методов представленных vue они сначала импортируются. В отличии от Options API в Composition блок с логикой отрабатывается при каждом ререндере<hr>
!!!Если в разметку будет передан массив то он будет отображен как массив - [1, 2, 3]<hr>
При компиляции Composition API в итоге превращается в <pre>
export default {
  setup() { ... }
}</pre>
Эта функция возвращает объект с данными(не реактивны). Может принимать props в виде аргумента но для этого они должны быть определены в свойстве props. Также функция может возвращать callback в которой происходит вызов функции h. Благодаря этой функции можно создавать разметку без template блока<pre>
export default {
  props: {
    msg: String
  },
  super(props) {
    return () => h('div', { color: 'red' }, someVariable);
  }
}</pre>
В данном примере будет возвращен блок div с задаными стилями внутри которого будет отображено содержимое переменной someVariable. Общая конструкция такова:<br>
<b>h('имя_элемента', { объект_со_стилями}, разметка || данные)</b>`,
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
    `Директива v-show`,
    `Используется также для условного рендера но только при false/true значениях. В случае falsy элементу будет присвоенно свойство display:none и сам элемент останется в разметке<br>
    <b>&lt;p v-show="isVisible"&gt;Some text&lt;/p&gt;</b>`,
  ],
  [
    `Директива :key`,
    `Предназначена для указания элементу уникального идентификатора чтобы VDOM корректно отображал изменения (например в циклическом рендере)`,
  ],
  [
    `slot`,
    `Компонент преодставленный Vue в качестве заглушки чтобы в дальнейшем заменить его на child компонент (props.children react). В описании компонента в разметке в нужном месте указывается компонент slot в котором может быть помещен некий placeholder. Как только этот компонент получить props children то он будет им замещен<br>
    MyComponent.vue<pre>
&lt;template&gt;
  &lt;slot&gt;Some placeholder&lt;/slot&gt;
&lt;/template&gt;</pre>
App.vue<pre>
&lt;template&gt;
  &lt;MyComponent&gt;
    &lt;h1&gt;Hello world&lt;/h1&gt;
  &lt;/MyComponent&gt;
&lt;/template&gt;</pre>
В данном примере slot будет замещен h1. slot замещается только если между тегами компонента передано значение не falsy<hr>
Именованные слоты позволяют задать в шаблоне несколько слотов и потом явно указать какие компоненты в какой слот должны быть помещены<br>
MyComponent.vue<pre>
&lt;template&gt;
  &lt;slot&gt;placeholder A&lt;/slot&gt;
  &lt;slot name="B"&gt;placeholder B&lt;/slot&gt;
  &lt;slot name="C"&gt;placeholder C&lt;/slot&gt;
&lt;/template&gt;</pre>
App.vue<pre>
&lt;template&gt;
  &lt;MyComponent&gt;
    &lt;template #default&gt;&lt;p&gt;Text A&lt;/p&gt;&lt;/template&gt;
    &lt;template #B&gt;&lt;p&gt;Text B&lt;/p&gt;&lt;/template&gt;
    &lt;template v-slot:C&gt;&lt;p&gt;Text C&lt;/p&gt;&lt;/template&gt;
  &lt;/MyComponent&gt;
&lt;/template&gt;</pre>
Чтобы указать слоту имя используется name. Слот без имени по умолчанию получает имя default. Чтобы определить куда какой элемент идет используется синтексис #имя_слота. Такой синтаксис работает только на template поэтому контент предварительно необходимо обернуть в него. Также более старая запись v-slot:имя_слот<hr>
Также можно передавать данные из slot наружу родителю. Для этого используется директива v-bind:имя_переменной_из_data="имя_обертки_переменной". Далее в родительском компоненте при указании имени слота идет присваивание куда записывается обертка переданной переменной или сразу деструктуризация<br>
MyComponent.vue<pre>
&lt;template&gt;
  &lt;slot name="someName" v-bind:someVariable="wrapper"&gt;Placeholder text&lt;/slot&gt;
&lt;template&gt;</pre>
App.vue<pre>
&lt;template&gt;
  &lt;MyComponent&gt;
    &lt;p #someName="wrapper"&gt;Text with {{ wrapper.someVariable }}&lt;/p&gt;
  &lt;/MyComponent&gt;
&lt;/template&gt;</pre>`,
  ],
  [
    `События`,
    `Обработчики событий в Composition API описываются в виде обычных ф-ций, а в Options API обычно в свойстве объекта methods:<pre>
    ...
    methods: {
      someHandler(e) {...}
    }
    </pre>
    В самой разметке чтобы указать обработчик события используется конструкция - @имя_события= и далее указывается обработчик, или же выражение(ранее использовалась директива v-on:имя_события)<br>
    <b>&lt;a @click="handler"&gt;</b> - использование обработчика. По умолчанию ф-ция получает в виде аргуемнта объект на котором произошло событие<br>
    <b>&lt;a @click="this.count++"&gt;</b> - можно напрямую указать выражение<br>
    <b>&lt;a @click.prevent="handler"&gt;</b> - также можно сразу указать модификаторы через @имя_события.модификатор. Например отменить стандартное поведение(preventDefault) или указать определенную клавишу при нажатии (@keyup.enter="...")<br>
    <b>&lt;a @click="handler('myArgument', $event)"&gt;</b> - в случае если необходимо передать свои аргументы то сначала передаются кастомные а в конце $event в виде объекта события`,
  ],
  [
    `Циклический рендеринг`,
    `Vue позволяет рендерить элементы на основе массивов а также объектов. Для этого используется директива v-for в которой указывается (имя_1_объекта, индекс)/(значение, ключ, индекс) in массив/объект<br>
    <b>&lt;li v-for="(item, i) in someArray" :key="\`li_\${item.id}\`"&gt;{{ item.name }}&lt;/li&gt;</b><br>
    Также можно производить рендер по числовому значению<br>
    <b>&lt;li v-for="n in 10" :key="n"&gt;{{n}}&lt;/li&gt;</b><br>
    !!! В случае рендера по пустому массиву в разметке все равно окажется 1 пустой элемент, чтобы избежать такого поведения следует на родительском контейнере сначала проверять наличие данных`,
  ],
  [
    `Реактивные данные`,
    `В Options API данные возвращаемые свойством data являются реактивными<pre>
export default {
  data: () => ({count: 0})
}</pre>
В Composition API реактивные данные создаются с помощью функций ref/reactive. ref используется в основном для примитивных значений, и чтобы получить доступ к ним из логики необходимо обратиться к свойству value. reactive используются для ссылочных типов данных и не могут принимать примитивы. Обе функции принимают начальное значение<pre>
&lt;script setup&gt;
import {ref, reactive} from 'vue';
const count = ref(0);
const colors = reactive(['red', 'green']);
function some() {
  console.log(count.value);
  console.log(colors);
}
&lt;/script&gt;</pre>
Также можно использовать shallowRef. Эта функция полезна если будет использоваться ссылочный тип который со времен будет изменяться полностью т.к. она отслеживает только поверхностные изменения`,
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
  data: () => ({
    count: 0,
    date: Date.now(),
    obj: {
      x: 5
    },
    msg: 'text'
  }),
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
    'obj.x'() {         <sup>3</sup>
      ...do something
    },
    msg: {      <sup>4</sup>
      handler: function() {
        ...do something
      },
      immediate: true,
      deep: true
    }
  }
}</pre>
1. В объекте watch можно либо указать ф-цию с именем идентичным имени отслеживаемой переменной которая по умолчанию принимает новое и старое значения в виде 1 и 2 аргумента<br>
2. Или в '' указать имя метода обработчика<br>
3. Если нужно отслеживать определенное свойство объекта можно в '' указать его<br>
4. Также можно указать объект с более детальными настройками<br>
-- handler функция обработчик<br>
-- immediate - указывает что обработчик необходимо выполнить при 1 рендере<hr>
В Composition API<pre>
&lt;script setup&gt;
const count = ref(0);
watch(count, (newV, oldV) => {
  ...do something...
}, {immediate: true});
&lt;/script&gt;</pre>
Просто вызывается как ф-ция где получает в виде 1 аргумента отслеживаемую переменную, а в виде 2 callback с необходимой логикой. 3 аргумент объект с настройками. Если необходимо отслеживать свойство объекта то тогда нужно указать callback который вернет это свойство<br>
<b>watch(() => obj.someProp, () => ...);</b>`,
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
  [
    `Динамические стили`,
    `Для использования вычисляемых стилей используется директива :style куда помещается объект. Свойства объекта это свойства стилей а значения - значение свойств<br>
    <b>&lt;div :style="{color: colorArray[0]}"&gt;</b>`,
  ],
  [
    `Передача данных из дочернего компонента родителю`,
    `Такая передача возможна благодаря кастомным событиям. Сначала на дочернем компоненте создается кастомное событие с помощью emit. Options API:<pre>
export default {
  data: () => ({count: 0}),
  emits: ['myEvent'],
  methods: {
    handler() {
      this.count++;
      this.$emit('myEvent', this.count);
    }
  }
}
&lt;template&gt;
  &lt;button @click="handler"&gt;Increase&lt;/button&gt;
&lt;/template&gt;</pre>
Сначала в свойстве emits в массиве регистрируем названия кастомных событий. После этого можем вызывать их используя $emit на объекте this передав 1 аргументом название и 2 если необходимо дополнительные данные<br>
Composition API<pre>
&lt;script setup&gt;
import {ref} from 'vue';
const emit = defineEmits(['myEvent']);
const count = ref(0);
function handler() {
  count.value++;
  emit('myEvent', count.value);
}
&lt;/script&gt;</pre>
Здесь также сначала регистрируем события с помощью defineEmits указав массив с именами. А затем с помощью полученной функции можем вызывать их<br>
Далее в родителе на дочернем элементе подписываемся на событие и описываем обработчик который по умолчанию получает payload если были переданы<br>
<b>&lt;MyComponent @myEvent="(v) => console.log(v)" /&gt;</b>`,
  ],
  [
    `Кастомные хуки`,
    `В Composition API можно создавать кастомные хуки как в react для определения переиспользуемой логики<br>
    useMy.js<pre>
export const useMy = () => {
  const collection = reactive([]);
  const addColl = (v) => collection.push(v);
  return {collection, addColl};
}</pre>
App.vue<pre>
...
const {collection, addColl} = useMy();</pre>`,
  ],
  [
    `Плагины`,
    `Плагины позволяют подключать сторонние библиотеки прямо в сущность приложения для того что минимизировать количество импортов в коде. При таком подключении библиотека становится доступна на объекте this<br>
    axiosPlug.js<pre>
import axios from 'axios';
export default {
  install(app) {
    app.config.globalProperties.$axios = axios;
  }
}</pre>
Сначала создаем что то вроде миксина где используем метод install указав на объекте this.$axios сущность axios<br>
main.js<pre>
import axiosPlug from ...;
const app = createApp(App);
app.use(axiosPlug);
app.mount('#root');
</pre>
В главном файле приложения с помощью Middleware подключаем плагин перед монтированием<br>
App.vue<pre>
export default {
  async mounted() {
    const resp = await this.$axios.get(...);
    ...
  }
}</pre>
Далее в компоненте просто обращаемся к ранее указанному свойству на объекте this`
  ],
  [
    `Миксины`,
    `Миксины по сути это те же кастомные хуки только для Options API. Сначала определяется объект с логикой, затем в компоненте в объекте в свойстве mixins указывается массив с используемыми миксинами. После чего добавленные данные доступны как обычные<br>
    myMixin.js<pre>
export default {
  data: () => ({ msg: 'text' })
}</pre>
App.vue<pre>
import myMixin from ...;
export default {
  mixins: [myMixin]
}</pre>
В случае конфликта имен приоритет будет сначала у компонента, тем самым миксин как бы будет значением по дефолту. Но в случае с методами жизненного цикла все по другому. Они будут вызваны все в той поочередности в которой были описаны. Сначала вызываются методы из миксина потом из компонента`,
  ],
  [
    `Директива v-model`,
    `Позволяет установить 2стороннюю привязку данных с элементом. Это значит что при изменении данных на 1 из сторон также отобразится и на другой. Это полезно при использовании различных инпутов. В директиву обычно указывают реактивную переменную или computed свойство, но тогда оно должно быть описано в виде объекта с геттером и сеттером. Но в случае с чекбоксами это может быть и массив. В таком случае данные из checkbox будут помещаться/удаляться из массива<pre>
&lt;script setup&gt;
import {ref} from 'vue';
const name = ref('');
const colors = ref([]);
&lt;/script&gt;
&lt;template&gt;
    &lt;input type="text" v-model="name" /&gt;
    &lt;input type="checkbox" name="color" value="red" v-model="colors" /&gt;
    &lt;input type="checkbox" name="color" value="green" v-model="colors" /&gt;
    &lt;input type="checkbox" name="color" value="blue" v-model="colors" /&gt;
&lt;/template&gt;</pre>
Также можно использовать модификатор с типом данных который будет автоматически преобразовывать полученные данные в этот тип<br>
<b>&lt;input type="text" v-model.Number="someInput" /&gt;</b>`,
  ],
  [
    `Взаимодействие с DOM напрямую`,
    `Чтобы получить доступ к элементу разметки напрямую из блока логики на элементе используют директиву ref куда указывают переменную в которой будет хранится ссылка на элемент<br>
    <b>&lt;p ref="myP"&gt;text&lt;/p&gt;</b><br>
    Далее в зависимости от API можно использовать элемент как в обычном JS. Options API<pre>
export default {
  methods: {
    someClicker() {
      console.log(this.$refs.myP);
    }
  }
}</pre>
В данном случае ссылки на ref элементы хранятся на объекте this в свойстве $refs<hr>
Composition API<pre>
&lt;script setup&gt;
import {ref} from 'vue';
const myP = ref(null);
function someClicker() {
  console.log(myP.value);
}
&lt;/script&gt;</pre>
В данном случае сначала регистрируется реактивная переменная с начальным значением null(потому что во время инициализации шаблон еще не готов). Затем чтобы получить доступ к элементу нужно как обычно обратится к value на указанной переменной`,
  ],
  [
    `Инициализация приложения`,
    `В главном файле сначала создается сущность приложения с помощью метода Vue createApp в который можно передать объект настроек. А затем на ней вызывается метод mount с передачей в него селектора с корневым элементом<pre>
const app = Vue.createApp({...});
app.mount('#root');</pre>`,
  ],
  [
    `Директива v-text`,
    `Позволяет указать переменную/метод с содержимым которое потом будет помещено в textContent элемента. Это полезно если сначала необходимо показать какой то placeholder перед тем как например загрузятся данные. Но такой подход не рекомендуется и лучше использовать условный рендеринг<br>
    <b>&lt;p v-text="someAsync"&gt;placeholder text&lt;/p&gt;</b> - устаревший подход<br>
    <b>&lt;p&gt;{{ someAsync || 'placeholder text' }}&lt;/p&gt;</b> - лучше заменить этим`,
  ],
  [
    `Директива v-once`,
    `Служит указателем компоненту что он должен рендерится только 1 раз и не реагировать на изменения`,
  ],
  [
    `Директива v-html`,
    `Позволяет вставить внутрь html разметку. Данный подход устарел и является не безопасным`,
  ],
  [
    `Жизненные циклы компонента`,
    `1. setup - событие до инициализации data и рендера<br>
    2. beforeCreate - после инициализации, но data все еще не доступна<br>
    3. created - data и методы уже доступны, но DOM пока еще нет. Хорошо подходит для загрузки каких то данных из сторонних источников<br>
    4. beforeMount - перед рендером. Практически не используется<br>
    5. mounted - когда компонент полностью готов и отрисован<br>
    6. beforeUpdate - после изменений но до ререндера<br>
    7. updated - после перерисовки<br>
    8. beforeUnMount - перед удалением элемента. Полезен для удаления различных событий<br>
    9. unmounted - после удаления элемента<br>
    В Options API эти методы просто описываются как функции на объекте<pre>
export default {
  mounted() {
    ... do something
  }
}</pre>
В Composition API сначала необходимо импортировать их а затем вызвать как функцию передав callback. Также стоит учесть что перед именем метода ставится on<pre>
&lt;script setup&gt;
import {onMounted} from 'vue';
onMounted(() => {
  ...do something
})
&lt;/script&gt;</pre>`,
  ],
  [
    `Использование переменных в блоке style`,
    `Чтобы использовать переменные из логики в блоке со стилями используется функция v-bind<pre>
&lt;script setup&gt;
const margin = 20;
const color = 'red';
&lt;/script&gt;
&lt;style&gt;
  p {
    color: v-bind(color);
    margin: v-bind('\`\${margin}px\`');
  }
&lt;/style&gt;</pre>
При использовании шаблонной строки внутри v-bind сначала необходимо обернуть все в ''`,
  ],
  [
    `Блок style в виде модуля`,
    `Чтобы использовать блок со стилями как модуль сначала необходимо указать ему module. Затем в разметке в :class передается объект $style содержащий все описанные классы в виде свойств объекта<pre>
&lt;template&gt;
&lt;input :class="$style.myClass" /&gt;
&lt;/template&gt;
&lt;style module&gt;
  .myClass {
    font-size: 20px;
  }
&lt;/style&gt;</pre>`,
  ],
];
