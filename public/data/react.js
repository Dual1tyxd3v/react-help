/* eslint-disable quotes */
const ReactData = [
  [
    'Быстрое создание проекта на React',
    `<b>npm i create-react-app x</b> - Быстрое создание макета для приложения где х необязательный параметр указывающий на имя папки с проектом<br><b>npx create-react-app x --template у</b> - Быстрое создание макета приложения по шаблону переданному в у(например redux)`
  ],
  [
    'Объект события в React',
    `При обработке события какого либо элемента также можно обращаться к объекту события (evt) как и в обычном JS. Но React использует обертку SyntheticEvent там есть все тоже что и в обычном nativeEvent. Если есть необходимость получить нативный объект можно обратиться к свойству - <b>evt.nativeEvent</b><hr>
    Чтобы поймать событие на стадии перехвата можно использовать props <eventName>Capture. Например - <b>&lt;button onClickCapture={someHandler} /&gt;</b><hr>
    При добавлении обработчика события React не добавляет его в DOM элемент а делегирует его на главный контейнер(div root) где там уже идет распределение`
  ],
  [
    'Error Boundary',
    `Библиотека позволяющая отлавливать ошибки отрисовки приложения и отображать фолбэк<br>
    <b>index.jsx</b><pre>
React.createRoot(document.getElementById('root')).render(
  &lt;ErrorBoundary         <sup>1</sup>
    FallbackComponent={ErrorFallback}       <sup>2</sup>
    onReset={() => window.location.replace('/')}      <sup>3</sup>
  &gt;
    &lt;App /&gt;
  &lt;/ErrorBoundary&gt;
);</pre><b>ErrorBoundary.jsx</b><pre>
function ErrorBoundary({error, resetErrorBoundary}) {       <sup>4</sup>
  return (
    &lt;div&gt;
      &lt;p&gt;{error.message}&lt;/p&gt;
      &lt;button onClick={resetErrorBoundary}&gt;Back to main&lt;/button&gt;
    &lt;/div&gt;
  );
}</pre>
1) сначала оборачиваем все приложение в специальный компонент<br>
2) в проп устанавливаем компонент который будет отображен в случае ошибки<br>
3) также можно установить callback который затем можно будет использовать в fallback компоненте<br>
4) сам fallback компонент принимает в пропсах объект ошибки и функцию описанную ранее`
  ],
  [
    'cloneElement(a, b)',
    `Функция react позволяющая создать копию компонента где:<br>
    a - компонент который необходимо скопировать<br>
    b - объект с пропсами если нужно передать<br>
    Такой подход позволяет передать какие то props в компонент если он получен как children например`
  ],
  [
    'createPortal(a, b)',
    `Функция react-dom позволяющая прикрепить разметку из любого компонента в определенную часть документа. При этом в react инспекторе дерево компонентов нарушенно не будет<br>
    a - JSX разметка<br>
    b - место в документе куда необходимо прикрепить разметку (document.body например)`
  ],
  [
    'render prop pattern',
    `<pre>
function Main() {
  const companies = useSelector(getCompanies);
  const products = useSelector(getProducts);

  return (
    &lt;main&gt;
      &lt;List render={(prod) => &lt;ProductItem key={prod.id} data={prod} /&gt; } data={products} /&gt;
      &lt;List render={(comp) => &lt;CompanyItem key={comp.id} data={comp} /&gt;} data={companies} /&gt;
    &lt;/main&gt;
  );
}
function List({render, data}) {
  return(
    {
      data.map(render)
    }
  );
}</pre>
Паттерн позволяет использовать один и тот же компонент для генерации разметки зависящей от разных данных. Такой подход был полезен до появления хуков`
  ],
  [
    'compound component pattern',
    `<b>AddSome.jsx</b><pre>
function AddSome() {
  return (
    &lt;Modal&gt;       <sup>1</sup>
      &lt;Modal.Open name='table'&gt;
        &lt;Button&gt;New some&lt;/Button&gt;
      &lt;/Modal.Open&gt;
      &lt;Modal.Window&gt;
        &lt;SomeTable /&gt;
      &lt;/Modal.Window&gt;
    &lt;/Modal&gt;
  );
}</pre><b>Modal.jsx</b><pre>
const ModalContext = createContext();     <sup>2</sup>
function Modal({children}) {
  const [showName, setShowName] = useState('');     <sup>3</sup>
  const open = setShowName;           <sup>4</sup>
  const close  () => setShowName('');
  return (          <sup>5</sup>
    &lt;ModalContext.Provider value={open, close, showName}&gt;
      {children}
    &lt;/ModalContext.Provider&gt;
  );
}
Modal.Open = function({children, name}) {     <sup>6</sup>
  const {open} = useContext(ModalContext);
  return cloneElement(children, {onClick: () => open(name)});     <sup>7</sup>
}
Modal.Window = function({children, name}) {
  const {close, showName} = useContext(ModalContext);
  if (name !== showName) return null;         <sup>8</sup>
  return (
    &lt;Overlay&gt;
      &lt;StyledModal&gt;
        &lt;Button onClick={close}&gt;
          X
        &lt;Button&gt;
        {cloneElement(children, {onCLose: close})}
      &lt;/StyledModal&gt;
    &lt;/Overlay&gt;
  );
}</pre>
Паттерн позволяет разбить компонент на независимые составные части для последующего переиспользования с разным наполнением при этом сами части не имеют смысла существовать сами по себе<br>
1) Компонент сам представляет из себя оболочку, которая содержит внутри себя различные составные компоненты<br>
2) в файле с компонентом создаем контекст для удобного доступа к глобальному состоянию из любого компонента<br>
3) в оболочке создаем какое то состояние. В данном случае отслеживать и устанавливать текущее активное окно<br>
4) для удобства создаются понятные функции для установки и сброса имени<br>
5) оболочка возвращает провайдер с контекстом куда помещается children<br>
6) по скольку сам по себе составной компонент не имеет смысла он записывается в виде свойства главного компонента<br>
7) чтобы children компонент мог взаимодействовать с модальным окном используем трюк с клонированием компонента и передачей ему пропсов<br>
8) в компоненте с самим модальным окном проверяем равны ли имена текущего активного окна и самого компонента, если нет то ничего не рендерим<br>
9) в случае если имена равны отображаем окно а также передаем функцию закрытия на управляющий элемент и в сам children<br>
Данный пример позволяет использовать несколько модальных окон в 1 компоненте, которые просто переключаются по имени`
  ],
  [
    'styled components',
    `Библиотека позволяющая создавать стилизованные компоненты на основе HTML элементов или реакт компонентов<br>
    <b>Header.js</b><pre>
const sizes = {     <sup>1</sup>
  small: css\`font-size: 20px;\`,
  big: css\`font-size: 40px;\`,
};
const Heading = styled.h1\`   <sup>2</sup>
  color: red;

  &:hover {       <sup>3</sup>
    color: green;
  }

  {props => sizes[props.size]}      <sup>4</sup>
\`;
Heading.defaultProps = 'small';     <sup>5</sup>
const StyledLink = styled(NavLink)\`      <sup>6</sup>
  text-decoration: none;
\`;
const FileInput = styled.input.attrs({type: 'file'})\`    <sup>10</sup>
  width: 500px;
\`;
function Header() {
  return (
    &lt;&gt;
      &lt;Heading as='h3' /&gt;     <sup>7</sup>
      &lt;FileInput />&gt;
      &lt;StyledLink to='/'&gt;Home&lt;/StyledLink&gt;
    &lt;/&gt;
  );
}</pre><b>GlobalStyles.js</b><pre>
const GlobalStyles = createGlobalStyles\`     <sup>8</sup>
  html {
    font-size: 62.5%;
  }
\`;</pre><b>App.js</b><pre>
fucntion App() {
  return (
    &lt;&gt;
      &lt;GlobalStyles /&gt;        <sup>9</sup>
      &lt; Main /&gt;
    &lt;/&gt;
  );
}</pre>
1) часть CSS кода можно хранить в переменных. Для этого в значении свойства вызываем функцию css из библиотеки styled-components в которой с помощью бэктиков уже описываем сам CSS<br>
2) обычное объявление стилизованного компонента<br>
3) чтобы описать состояние элемента достаточно использовать синтаксис SCSS<br>
4) для использования props достаточно описать callback который принимает props и возвращает какое то значение. Благодаря этому можно использовать ранее созданную переменную со стилями<br>
5) также можно по умолчанию задать значение props<br>
6) для стилизации нестандартных элементов/компонентов можно вызвать styled как функцию и передать в нее компонент как аргумент<br>
7) props as позволяет изменить тип ранее созданного компонента на тот что указан в props<br>
8) для создания глобальных стилей вызывается специальная функция вместо styled. Функция возвращает компонент<br>
9) для подключения глобальных стилей необходимо поместить компонент на самый верх всех компонентов<br>
10) метод attrs позволяет задать автоматически некоторые атрибуты для элемента (например тип input). Принимает либо объект либо callback`
  ],
  [
    'чистый Redux',
    `<b>customer-reducer.js</b><pre>
const initStore = {     <sup>1</sup>
  name: '',
  createdAt: ''
};
export const reducerCustomer = (state = initStore, action) => {
  switch(action.type) {       <sup>2</sup>
    case 'customer/create':
      return { ...state,
        name: action.payload.name,
        createdAt: action.payload.createdAt };
    case 'customer/delete':
      return { ...state, name: '', createdAt: '' };
    default:
      return state;       <sup>3</sup>
  }
};
export const createCustomer = (name) => ({    <sup>4</sup>
  type: 'customer/create',
  payload: { name, createdAt: new Date().toISOString() }
});
export const deleteCustomer = () => ( {type: 'customer/delete'});</pre><b>account-reducer.js</b><pre>
const initStore = {     <sup>5</sup>
  balance: 0,
  loan: 0
};
export const reducerAccount = (state = initStore, action) => {
  switch(action.type) {
    case 'account/deposit':
      return { ...state, balance: state.balance + action.payload };
    case 'account/withdraw':
      return { ...state, balance: state.balance - action.payload };
    default:
      return state;
  }
};
export const deposit = (amount, currency) => {    <sup>5.1</sup>
  if (currency === 'usd') {
    return {
      type: 'account/deposit',
      payload: amount
    };
  }
  return async function (dispatch, getState) {
    const resp = await fetch(url);
    const data = await.json();
    dispatch({
      type: 'account/deposit',
      payload: data.amount
    });
  }
};
export const withdraw = (amount) => ({
  type: 'account/withdraw',
  payload: amount
});</pre><b>store.js</b><pre>
const rootReducer = combineReducers({   <sup>6</sup>
  customer: reducerCustomer,
  account: reducerAccount
});
export const store = createStore(rootReducer);    <sup>7</sup>

export const store = createStore(
  rootReducer,
  composeWithDevTools(      <sup>7.1</sup>
    applyMiddleware(thunk)    <sup>7.2</sup>
  )
);

export const getBalance = (state) => state.account.balance;   <sup>7.3</sup></pre>
<b>index.js</b><pre>
...       <sup>8</sup>
&lt;Provider store={store}&gt;
  &lt;App /&gt;
&lt;/Provider&gt;</pre><b>component.js</b><pre>
function Component() {
  const name = useSelector((store) => store.customer.name);    <sup>9</sup>
  const balance = useSelector(getBalance);        <sup>9.1</sup>
  const dispatch = useDispatch();     <sup>10</sup>
  return (
    &lt;button onClick={() => dispatch(deleteCustomer())}&gt;    <sup>11</sup>
      {name}
    &lt;/button&gt;
  );
}</pre>
1) Сначала создаем нарезки состояния. Первым описываем начальное состояние<br>
2) Затем описываем редюсер, где в качестве дефолтного значения state указываем начальное состояние<br>
3) Если action имеет неизвестный тип возвращаем текущее состояние store. Это необходимо в случае склейки разных редюсеров потому что в случае при диспатче action из другого редюсера текущий не увидит его и вернет нужное состояние<br>
4) создание самописного action creator. Все побочные эффекты (напр. new Date()) лучше указывать напрямую в action т.к. редюсер по сути чистая функция<br>
5) создание другого слайса store<br>
5.1) комбинированный экш. Благодаря thunk если action вовзращает функцию вместо объекта то redux понимает что это thunk action. Также в этой функции есть доступ к dispatch и самому состоянию<br>
6) в общем store файле сначала склеиваем все редюсеры в один<br>
7) создаем глобальный store<br>
7.1) обертка позволяет использовать redux devtools (необходимо также установить redux-devtools-extension)<br>
7.2) подключение thunk в чистом redux<br>
7.3) безопаснее и правильнее сделать отдельные селекторы для каждого поля<br>
8) в главном файле оборачиваем все приложение в Provider и указываем store<br>
9) хук useSelector позволяет выбрать нужные свойства из store а также неявно подписывает компонент на изменения в состоянии<br>
9.1) по скольку хорошим тоном считается получение только необходимых данных из state то лучше использовать для каждого поля отдельный селектор. Также если необходимо провести какие то расчеты то лучше это делать в функции селектора напрямую<br>
10) хук useDispatch возвращает функцию которую потом можно использовать для диспатча экшенов<br>
11) использование dispatch функции и action`
  ],
  [
    'React.lazy()',
    `Метод React для разделения bundle. При конечной сборке приложения весь код собирается в 1 большой - bundle. Если приложение приложение большое это может вызвать проблемы в производительности. lazy() позволяет разбить 1 bundle на несколько файлов и подгружать их только когда в этом есть необходимость<br>
    <b>const Component = React.lazy(() => import('./components/Component'));</b> - метод принимает callback где динамически импортируется модуль. При таком подходе модуль должен экспортироваться по default. Данный split bundle используется вместе с &lt;Suspense&gt;`
  ],
  [
    '&lt;Suspense /&gt;',
    `React компонент который позволяет отложить отрисовку вложенных в него компонентов пока они не будут полностью загруженны а также отрендерить промежуточный компонент на время ожидания (fallback)<pre>
&lt;Suspense fallback={x}&gt;
&lt;DynamiImportComponent /&gt;
&lt;/Suspense&gt;</pre>
Все динамически импортируемые компоненты оборачиваются в Suspense компонент а в prop fallback передается либо JSX разметка либо другой компонент, который будет отрисован на время загрузки вложенных компонентов`
  ],
  [
    'CSS модули',
    `<pre>
some.module.css

.box {
  display: flex;
}
:global(.title) {
  color: red;
}

some.tsx

import styles from 'some.module.css';
function Some() {
  return (
    &lt;div className={styles.box}&gt;
      &lt;h3 className={styles.title}&gt;Hello&lt;/h3&gt;
    &lt;/div&gt;
  );
}</pre>Подход который позволяет импортировать css файлы как модули в объект, где свойствами буду служить названия классов. При импортировании классы хэшируются и благодаря этому в каждом таком модуле можно создавать одинаковые классы и они не будут конфликтовать. Если необходимо указать чтобы класс был глобальный и его можно было использовать в других модулях нужно обернуть его в :global(.class_name) {}`
  ],
  [
    'inline стили в React',
    `<b><Component style={{fontSize = '10px'}} /></b> - Передаются в виде объекта где имя стиля является свойством а значение - значением, поэтому нужно не забывать ставить {} для обозначения JS блока`
  ],
  [
    'react-query',
    `Библиотека позволяющая осуществлять запросы. Имеет ряд преимуществ:<br>
    1) Есть поддержка актуальности данныхв течении какого то времени и автоматическая перезагрузка данных<br>
    2) Данные хэшируются<br>
    3) Есть возможность использовать хэшированные данные в любом месте приложения<br>
    4) Есть статус запроса<br>
    <b>App.jsx</b><pre>
const queryClient = new QueryClient({      <sup>1</sup>
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000        <sup>2</sup>
    }
  }
});
function App() {
  return (
    &lt;QueryClientProvider client={queryClient}&gt;      <sup>3</sup>
      &lt;ReactQueryDevtools initialOpen={false}&gt;      <sup>4</sup>
        &lt;Header /&gt;
        &lt;Main /&gt;
      &lt;/ReactQueryDevtools&gt;
    &lt;/QueryClientProvider&gt;
  );
}</pre>
<b>SomeTable.jsx</b><pre>
function SomeTable() {
  const { data, isLoading } = useQuery({      <sup>5</sup>
    queryKey: ['users', _a?],          <sup>6</sup>
    queryFn: getUsers             <sup>7</sup>
  });
  if (isLoading) return &lt;Spinner /&gt;
  return (
    &lt;SomeDataList list={data} /&gt;
  );
}</pre><b>SomeDataItem.jsx</b><pre>
function SomeDataItem({user}) {
  const queryClient = useQueryClient();     <sup>8</sup>
  const { mutate, isLoading } = useMutation({     <sup>9</sup>
    mutationFn: deleteUser,           <sup>10</sup>
    onError: (e) => alert(e.message),       <sup>11</sup>
    onSuccess: () => {                <sup>12</sup>
      queryClient.invalidateQueries({       <sup>13</sup>
        queryKey: ['users']
      });
      alert('All done!');
    }
  });
  const { mutate: updateSome, isLoading: isUpdating } = useMutation({
    mutationFn: ({data, id}) => updateUser(data, id),           <sup>15</sup>
    onError: (e) => alert(e.message),
  });
  return (
    &lt;button onClick={() => mutate(user.id)}&gt;Delete User&lt;/button&gt;      <sup>14</sup>
    &lt;button onClick={() => updateSome({data: user, id: user.id}, {
      onSuccess: () => doSomething()        <sup>16</sup>
    })}&gt;Update User&lt;/button&gt;
  );
}</pre>
1) сначала создаем сам объект react query, где можно также указать какие то настройки<br>
2) указываем время в мс за которое данные становятся устаревшими. 0 - отключает проверку актуальности данных<br>
3) все приложение оборачиваем в специальный провайдер указав в нем ранее созданный query client<br>
4) у библиотеки также имеется свой devtools (необходимо установить отдельно), чтобы пользоваться им также оборачиваем приложение в специальный компонент<br>
5) в компоненте с помощью хука получаем объект data который будет содержать полученные данные в результате запроса и также можно получить различные состояния запроса<br>
6) в аргумент передаем объект настроек указав сначала ключ по которому будет хранится хэш данных<br>
6.1) также через запятую можно указать зависимости которые в случае изменения будут тригерить вызов указанной функции<br>
7) а также функцию которая должна быть вызвана. Как только компонент отрисуется будет произведена загрузка данных. В дальнейшем по происшествии времени жизни данных в некоторых ситуациях будет происходить обновление (напр. переключение вкладок браузера)<br>
8) для того чтобы иметь доступ к объекту query client получаем его через хук<br>
9) хук позволяет вносить изменения. Возвращает функцию которая будет тригерить необходимую функцию для отправки изменений а также можно получить различные состояния<br>
10) указываем функцию которая будет вызвана после вызова mutate<br>
11) в случае ошибки сработает этот callback<br>
12) callback на случай успеха<br>
13) специальный метод объекта query client который производит валидацию данных и в случае необходимости вовзращает новые данные<br>
14) использование функции mutate. Все переданные аргументы попадают в целевую функцию<br>
15) mutate функция может принимать только один аргумент. Поэтому чтобы передать несколько их необходимо завернуть либо в объект либо в массив а затем с помощью callback посредника передать в необходимый обработчик<br>
16) не всегда есть возможность описать какое то действие в случае успеха/ошибки в настройке хука, поэтому 2 аргументов mutate функция принимает объект с настройками, где можно указать все то же самое<br>
Дополнительные возможности:<pre>
...
queryClient.prefetchQuery({
  queryFn: someAPI,
  queryKey: ['name', someVar],      <sup>1</sup>
  retry: false,             <sup>2</sup>
  onSettled: () => doSomething(),         <sup>3</sup>
  onSuccess: (data) => queryClient.setQueryData(data.someValue),      <sup>4</sup>
  onError: () => queryClient.removeQueries()            <sup>5</sup>
});</pre>
1) в массив ключей также можно добавить некоторые переменные которые будут зависимостями и в случае их изменения запрос выполнится снова<br>
2) флаг указывает на то что в случае неудачи повторный запрос делать не надо<br>
3) описание функции которая выполнится в любом случае после запроса<br>
4) в success функции мы сразу можем получить доступ к данным возвращаемым из API функции, а метод объекта clientQuery позволяет установить новое значение по ключу<br>
5) метод объекта удаляет весь хэш`
  ],
  [
    'react-hot-toast',
    `Полезная библиотека для вывода уведомлений<br>
    <b>App.js</b><pre>
function App() {
  return (
    &lt;&gt;
      &lt;Header /&gt;
      &lt;Main /&gt;
      &lt;Toaster       <sup>1</sup>
        position='top-center'
        gutter={12}
        containerStyle={{ margin: '8px' }}
        toastOptions={{
          success: { duration: 3000 },    <sup>2</sup>
          error: { duration: 5000 },
          style: {                        <sup>3</sup>
            fontSize: '16px',
            color: 'var(--color-green-500)'
          }
        }}
      &gt;
    &lt;/&gt;
  );
}</pre><b>SomeComponent.jsx</b><pre>
function SomeComponent() {
  return (
    &lt;&gt;
      &lt;button onClick={() => toast.successs('Success message')}&gt;Success&lt;/button&gt;      <sup>4</sup>
      &lt;button onClick={() => toast.error('Error message')}&gt;Error&lt;/button&gt;         <sup>5</sup>
    &lt;/&gt;
  );
}</pre>
1) сначала в главном компоненте в самом низу подключаем компонент Toaster где указываем различные настройки для уведомлений<br>
2) задаем время отображения для окон с ошибкой и успехом<br>
3) задаем стили для уведомления. Разрешено использовать собственные переменные из глобальных стилей<br>
4) когда необходимо вызвать окно уведомления вызываем метод на объекте toast куда передаем текстовое сообщение<br>
5) разница между success и error только в стилистике. Также можно вызвать обычное уведомление напрямую вызвав функцию toast()`
  ],
  [
    'react-icon',
    `Полезная библиотека с готовыми иконками. Для вставки иконки в JSX:<br>
    1) импортировать нужную иконку<br>
    2) вставить в нужную часть разметки как компонент<pre>
function Some() {
  return (
    &lt;span&gt;
      &lt;SomeIconName /&gt;
      text
    &lt;/span&gt;
  );
}</pre>`
  ],
  [
    'Virtual DOM',
    `Паттерн позволяющий обновлять интерфейс более оптимальным способом. По сути это объект хранящийся в памяти, являющийся посредником между DOM и кодом. Сначала все изменения происходят на нем а затем переносятся на реальный DOM`
  ],
  [
    'Процесс рендеринга / ререндеринга',
    `Процесс делится на 4 части:<br>
    <img src="./img/react-rendering.jpg" style="width: 650px" />
    1) Какой то триггер - либо первая отрисовка приложения либо изменение какого то компонента<br>
    2) rendering phase - асинхронная фаза отрисовки нового VDOM а также сравнения старого и нового<br>
    --В случае первой загрузки создается VDOM а также Fiber tree и наступает 3 фаза<br>
    --В случае обновления создается новый VDOM и наступает фаза reconciliation(сверка), где пошагово сверяется каждый элемент в новом и старом дереве. Элемент проверяется на позицию, тип и атрибуты. Fiber tree это представление VDOM в виде связного списка и создается лишь раз при первой отрисовке, все последующие изменения просто мутируют дерево. Сам процесс сравнения зовется diffing и имеет несколько важных нюансов:<br>
    * в случае если позиция или тип элемента меняется то он удаляется вместе со всеми дочерними элементами и стейтом и заменяется новым (такое поведение можно избежать указаь key prop)<br>
    * в случае если меняется атрибут, то он просто меняется на новое значение без полной замены элемента<br>
    В результате сравнения мы получаем обновленное Fiber tree а также список DOM обновлений который будет передан в следующую фазу<br>
    3) commit phase - здесь все изменения из списка вступают в силу и DOM дерево обновляется, это все происходит синхронно и процесс прервать невозможно<br>
    4) браузер обновляет часть страницы`
  ],
  [
    'Component / Component Instance / React Element',
    `<b>Component</b> - это сам компонент который мы описываем в коде. Он может быть как классовый так и функциональный<br>
    <b>Component Instance</b> - это экземпляр компонента который мы уже используем где то в разметке<br>
    <b>React Element</b> - это результат выполнения экземпляра компонента при выполнении кода. Затем эти элементы помещаются в VDOM`
  ],
  [
    'react-hook-form',
    `Библиотека для обработки форм<br>
    <b>SomeForm.jsx</b><pre>
function SomeForm({user}) {
  const { register, handleSubmit, reset, formState, getValues } = useForm(     <sup>1</sup>
    user && defaultValues: user   <sup>5</sup>
  );
  const {errors} = formState;
  function onHandleSubmit(data) {     <sup>2</sup>
    console.log(data);
    reset();      <sup>6</sup>
  }
  return () {
    &lt;Form onSubmit={handleSubmit(onHandleSubmit)}&gt;    <sup>3</sup>
      &lt;Input name='phone' {...register('phone')} /&gt;
      &lt;Input name='additional_phone' {...register('additional_phone', {
        required: 'Some error message',     <sup>7</sup>
        minLength: {        <sup>8</sup>
          value: 10,
          message: 'Another error message'
        },
        validate: (value) => getValues().phone !== value || 'Third error message',   <sup>9</sup>
        pattern: {
          value: /.../,         <sup>11</sup>
          message: 'Incorrect phone'
        }
      })} /&gt;
      {errors['additiona_phone'] && &lt;p&gt;{errors['additiona_phone']}&lt;/&gt;}        <sup>10</sup>
      &lt;Textarea name='text' {...register('text')} /&gt;      <sup>4</sup>
    &lt;/Form&gt;
  }
}</pre>
1) с помощью хука получаем функцию для привязки полей, обработки отправки формы, функцию сброса формы, объект состояния формы и функцию для получения значений из полей формы<br>
2) функция для конечной обработки формы. В качестве аргумента получает объект с данными формы который был создан в handleSubmit<br>
3) в обработчик отправки помещается функция из хука которая в свою очередь принимает конечную функцию обработки<br>
4) к полям необходимым для отправки прикрепляется немного странная запись для корректной обработки внутри функции обработчика. Благодаря этому элементы формы становятся управляемыми без необходимости использования useState<br>
5) чтобы не писать каждому полю в ручную defaultValue можно в хук передать объект с настройкой куда можно передать объект где свойством будет имя зарегистрированного поля а значением дефолтное значение поля<br>
6) применение функции сброса значений формы<br>
7) при регистрации поля можно также указать 2 аргументом объект с настройками валидации. Тут указывается что поле должно быть заполненно а в качестве значения сообщение для ошибки<br>
8) также можно указать стандартные проверки валидации, которые принимают значение и сообщение для ошибки<br>
9) еще можно указать собственную валидацию, для этого достаточно описать callback который по умолчанию принимает текущее значение поля. CB должен возвращать или true или строку. В случае true валидация будет пройдена, в случае строки будет создана ошибка с сообщением. Чтобы сравнить текущее значение со значением другого поля можно воспользоваться функцией getValues() и затем в качестве свойства объекта указать имя интересующего поля<br>
10) если в результате отправки были ошибки (валидация и тд) то они будут отображены в formState в свойстве errors. В случае ошибки в errors создается свойство с именем поля и сообщением ошибки<br>
11) pattern позволяет установить регулярное выражение для проверки значения поля а также сообщение для ошибки`
  ],
  [
    'События в react',
    `Все события прикрепленные к элементам/компонентам в конечном счете будут прикреплены к корневому root элементу. При возникновении события благодаря всплытию на root элементе уже решается как и какой элемент должен реагировать<br>
    Объектом события является synthetic object, который по сути является оболочкой обычного объекта событий, с таким же интерфейсом но имеет ряд преимуществ:<br
    1) во всех браузерах события работают одинаково<br>
    2) многие события получили фазу всплытия (blur, change, focus)`
  ],
  [
    'update batching',
    `Это процесс объединения нескольких state за 1 раз. Если в функции указаны сразу несколько обновлений разных state то все они будут выполнены за 1 ререндер. Потому что сначала интерпритатор прочитает весь код в функции внеся апдейтеры в очередь и как только код будет прочитан начнется ререндер в котором обновления из очереди применятся. Поэтому этот процесс является асинхронным<br>
    В react версиях ниже 18 возможно только в функциях обработчиках, но если сделать тоже самое в таймерах, then, обработчиках addEventListener тогда на каждое обновление будет 1 ререндер`
  ],
  [
    'Основные правила компонентов',
    `1) компонент должен быть что то вроде чистой функции:<br>
    --возвращать один и тот же JSX с одним и тем же пропсом<br>
    --не иметь side эффектов в рендер логике - таймеры, запросы на сторонние ресурсы, изменение внешних данных, взаимодействе с DOM напрямую, обновление состояния<br>
    2) все side эффекты разрешены в функциях<br>
    * render logic - это обычно то что возвращает разметку или влияет на нее (также top level code)`
  ],
  [
    'key prop',
    `Пропс позволяющий указать компоненту что то вроде идентификатора. С помощью него можно менять поведение компонента на фазе reconciliation, либо установить статический key который будет указывать что компонент не нуждается в перерисовке либо наоборот указать динамический для сброса состояния компонента<br>
    В случае с динамически генерируемой разметкой (циклом) элементу стоит указывать уникальный key чтобы если в дальнейшем понадобиться добавить/удалить элемент списка остальные элементы не теряли свое состояние. По этой причине нельзя указывать в key индекс цикла, это приведет к тому что при изменении списка оставшиеся элементы будут терять или брать чужое состояние<br>
    Также если необходимо при каком то взаимодействии с другими элементами сбрасывать состояние какого то элемента (вкладки) можно указать динамический key`
  ],
  [
    'Проверка типа props',
    `<pre>
Component.propTypes = {
  name: PropTypes.string,
  age: PropTypes.number
}</pre>Без typescript можно указать тип получаемых пропсов в ручную`
  ],
  [
    'useParams()',
    `<pre>
const Component = () => {
const params = useParams();
...
render();
}</pre>Позволяет получить переданные параметры в адресную строку (ID и т.д.). Сам хук возвращает объект который имеет свойста названные так как было указано в маршрутизации (...url.../:id)`
  ],
  [
    'useReducer()',
    `<pre>
const initState = { count: 0 };
const reducer = (state, action) => {
  switch(action.type) {
    case 'inc':
      return { ...state, count: state.count + 1};
    default:
      return initState;
  }
}
function App() {
  const [state, dispatch] = useReducer(reducer, initState);
  return (
    &lt;p&gt;{state.count}&lt;/p&gt;
    &lt;button onClick={() => dispatch({type: 'inc'})}&gt;&lt;/button&gt;
  );
}</pre>Хук для работы с глобальным состоянием. За основу взят Redux так что они очень похожи`
  ],
  [
    'Различные фишки',
    `Если на 1 странице имеется скроллбар а на 2 нет, то при переходе контент будет прыгать в стороны. Чтобы избежать этого контейнеру можно задать свойство <b>margin-left: calc(100vw - 100%);</b>`
  ],
  [
    'useRef()',
    `<pre>
const SomeComp = () => {
const formRef = useRef(null);
return (
  &lt;Form ... ref={formRef}&gt;
    ...
  &lt;/Form&gt;
  {
    formRef.current && &lt;p&gt;Данные формы полученны&lt;/p&gt;
  }
);
}</pre>Хук useRef позволяет получить доступ к элементу на странице но только после отрисовки компонента. Необходим для работы с неконтролируемыми элементами а также сторонними ресурсами и просто чтобы получить доступ к DOM. Сам элемент хранится в свойстве current. Взаимодействие с этим хуком необходимо проводить в useEffect`
  ],
  [
    'useCallback()',
    `<pre>
const SomeComp = () {
const eventHandler = useCallback(() => {
  ...
}, []);
return (
  &lt;AnotherComp someProp={eventHandler} /&gt;
);
}</pre>По скольку чтобы изменить что то в родительском элементе из дочернего необходимо передать какойто callback, то для того чтобы избежать лишних перерисовок(мемоизация) используется хук useCallback, который мемоизирует переданную callback функцию. В качестве параметра принимает в себя необходимую ф-цию и возвращает уже обернутую ф-цию`
  ],
  [
    'Выпадающий список',
    `<pre>
const SomeComp = () => {
const [select, setSelect] = useState('a');
return (
  &lt;select value={select}&gt;
    &lt;option value='a' /&gt;
    &lt;option value='b' /&gt;
  &lt;/select&gt;
);
}</pre>Если в обычном HTML чтобы указать какой то элемент из выпадающего списка выбранным достаточно указать ему свойство selected, то в JSX разметке необходимо задать свойству value самого select значение необходимого элемента списка`
  ],
  [
    'Контролируемые формы',
    `<pre>
const SomeComp = () => {
const [formData, setFormData] = useState({name: '', age: ''});

const changeHandler = (e) => {
  const {name, value} = e.target;
  setFormData({...formData, [name]: value}));
}

return (
  &lt;input name='name' onChange={changeHandler} value={formData.name} /&gt;
);
}</pre>Создание контролируемой формы. Сначала создаем внутренне состояние с начальными значениями формы. Затем создаем обработчик события изменения поля формы где с начала получаем данные name и value а затем записываем их в состояние. После вешаем обработчик на поля формы. И обязательно задаем в свойство value значение из созданного состояния. Если этого не сделать то состояния начнут дублироваться`
  ],
  [
    'Сброс прокрутки страницы',
    `<pre>
function ScrollTop() {
const {pathname} = useParams();
useEffect(() => {
  window.scrollTo(0,0);
}, pathname);
return null;
}

function App() {
return (
  &lt;BrowserRouter&gt;
    &lt;ScrollTop&gt;
      &lt;Routes&gt;
        ...
      &lt;/ScrollTop&gt;
    &lt;/ScrollTop&gt;
  &lt;/BrowserRouter&gt;
);
}</pre>Компонент позволяющий сбросить прокрутку страницы в 0 т.к. при перерисовки компонентов скролл остается на прежнем месте. Такой компонент можно поместить в главный компонент(App). Для этого просто оборачиваем Routes в наш компонент. Внутри компонента используется хук useEffect подписанный на изменение адреса страницы и возвращает он null чтобы ничего не отрисовывать`
  ],
  [
    'NavLink',
    `Тоже самое что и компонент Link только + еще умеет отслеживать открыт ли сейчас URL на который указана ссылка<pre>
&ltNavLink to="some" className={({isActive}) => {
return isActive ? 'link--active' : 'linl';
}} /&gt;</pre>
    Также вместо строки с классами в пропс className он принимает cb ф-цию которая принимает bool флаг и взависимости от него возвращает строку с тем или иным классом. Также пропс style принимает cb ф-ци`
  ],
  [
    'Создание собственного хука',
    `Полезны если необходимо изолировать или вынести часть логики для переиспользования. При этом в кастомных хуках должен быть как минимум один встроенный react хук иначе это будет просто функция<pre>
const useFilm = (id) => {
const [film, setFilm] = useState({});
useEffect(() => {
  let update = true;
  fetch('some.json')
    .then(resp => resp.json())
    .then(resp => update && setFilm(resp));
}, [id]);
return film;
}
...
const SomeComp = (props) => {
const film = useFilm(props.id);
...
}</pre>Создание и использование своего хука который делает запрос и возвращает объект с данными. При использовании хука со стейтом как минимум необходимо вернуть его значение<pre>
const useKeydown = (key, callback) => {
  useEffect(() => {
    function keyPress(e) {
      if (e.code.toLowerCase() !== key.toLowerCase()) {
        return;
      }
      callback();
    }
    document.addEventListener('keydown', keyPress);

    return () => document.removeEventListener('keydown', keyPress);
  }, [key, callback]);
}</pre>В случае если используется только useEffect то достаточно вызвать такой хук как обычную функцию в компоненте<br>
Если в хуке некоторая часть логики должна срабатывать при определенных условиях то возможно эту часть стоит обернуть в отдельную функцию и возвращать как результат хука`
  ],
  [
    'Маршрутизация REACT компонентов',
    `<pre>
&lt;BrowserRouter&gt;
&lt;Routes&gt;
  &lt;Route path="/" element={&lt;Layout /&gt;}&gt;
    &lt;Route index element={&lt;Main /&gt;} /&gt;
    &lt;Route path="about" element={&lt;About /&gt;} /&gt;
  &lt;Route /&gt;
&lt;/Routes&gt;
&lt;/BrowserRouter&gt;</pre>Маршрутизация компонентов, где в данном примере компонент Layout остается неизменным независимо от маршрута, а меняется только часть его содержимого (в том месте где стоит компонент &lt;Outlet /&gt;). Index означает главную страницу.<pre>
&lt;Route path="*" element={&lt;NotFoundComponent /&gt;} /&gt;</pre>Маршрутизация для несуществующих страниц. Этот рут ставится в конце списка и означает что любой путь перенаправляет на компонент NotFoundComponent<pre>
&lt;Route path="/about/:id" element={&lt;SomeComp /&gt;} /&gt;

function SomeComp() {
const {id} = useParams();
...
}</pre>Передача параметров в путь и использование его в компоненте<pre>
&lt;Route path="/about" element={&lt;Some /&gt;} &gt;
&lt;Route path=":id" element={&lt;Some /&gt;} /&gt;
&lt;/Route&gt;

function Some() {
const params = useParams();
if (params.id) {
  ...
}
...
}
}</pre>Чтобы не потерять просто страницу about можно сделать ее вложенной тогда у нас будет отображаться и просто страница и страница с переданными параметрами<pre>
app.jsx

...
&lt;Route path="favorites" auth="no_auth" element={
&lt;PrivateRoute&gt;
  &lt;FavoriteScreen /&gt;
&lt;PrivateRoute /&gt;
} /&gt;

PrivateRoute.jsx

function PrivateRoute(props) {
return props.auth === "no_auth"
  ? &lt;Navigate to="/" /&gt;
  : props.children;
}</pre>Приватный путь. Если переданный props auth является no_auth то происходит переадесация на главную страницу. Или же возвращается дочерний элемент (children это служебное свойство props в котором хранится дочерний элемент)`
  ],
  [
    'Свой API в классовых компонентах',
    `<pre>
class MyApi {
constructor() {
  this.baseUrl = 'someUrl';
}
getData = async (url) => {
  const res = await fetch(this.baseUrl + url);
  if (!res.ok) {
    throw new Error('Something goes wrong');
  }
  const result = await res.json();
  return result;
}
}</pre>Создание своего API сервиса с помощью класса. В конструкторе указываем базовый URL. В метод getData передается часть URL где мы делаем асинхронный запрос. Если ответ приходит со статусом != 200 вернем ошибку, если же все хорошо обрабатываем ответ и возвращаем в виде JSON`
  ],
  [
    'Контекст',
    `Контекст предназначен для того чтобы передавать props на прямую от 1 компонента до другого игнорируя прописывание его во всей цепочке наследования<br><b>context.js</b><br><b>const MyContext = React.createContext();</b> - создаем экземпляр контекста<br><b>app.js</b><pre>
const App = () => {
return (
  &lt;MyContext.Provider ... value={{someValue: 'hello'}}&gt;
    &lt;SomeComp /&gt;
  &lt;/MyContext.Provide&gt;
)
}</pre>В самом главном компоненте оборачиваем все в MyContext.Provider и через атрибут value передаем необходимые props<br><b>somecomp.js - функциональный</b><pre>
const SomeComp = () => {
return (
  &lt;MyContext.Consumer&gt;
    {
      (value) => {
        return (
          &lt;p&gt;{value.someValue}&lt;/p&gt;
        )
      }
    }
  &lt;/MyContext.Consumer&gt;
)
}</pre>Использование контекста в функциональном компоненте, для этого сначала необходимо все обернуть в MyContext.Consumer<br><pre>
const SomeComp = () => {
  const {someValue} = useContext(MyContext);
  return &lt;p&gt;{someValue}&lt;/p&gt;;
}</pre>Также можно использовать хук useContext который принимает созданный раннее контекст и возвращает объект который содержит переданные свойства
<b>somecomp.js - классовый</b><pre>
class SomeComp extends Component {
...
render() {
  return (
    &lt;p&gt;{this.context.someValue}&lt;/p&gt;
  )
}
}
SameComp.contextType = MyContext;</pre>В классовом компоненте получаем доступ к контексту через this.context. Но для того чтобы использовать контекст в классовом компоненте необходимо в свойство этого компонента contextType передать ранее созданный контекст`
  ],
  [
    'Глобальное состояние в классовом компоненте',
    `<b>reducer.js</b><pre>
const initState = {
value: [],
trigger: false
}
const reducer = (state = initState, action) => {
switch(action.type) {
  case 'LOAD_VALUE':
    return {
      ...state, value: action.payload
    };
    break;
  default: return state;
}
}
export default reducer;</pre>Сначала описывается сам reducer. Это ф-ция которая в зависимости от полученного action производит какие то действия с глобальным хранилищем(store). 1 аргумент это сам store и сразу же присваеваем ему начальное состояние. 2 аргумент это объект action который содержит поле type в котором находится описание действия и поле payload которое содержит данные для обновления store. Далее в конструкции switch идет перебор действий где описывается логика изменения store<br><b>actions.js</b><pre>
const loadValue = (value) => ({type: 'LOAD_VALUE', payload: value});
export {loadValue};</pre>Здесь уже описываются сами действия. По сути это функция которая возвращает объект содержащий 2 или 1 поле в зависимости от переданного в нее аргумента. Поле type содержит описание действия для reducer а не обязятельное поле payload содержит какое то значение из переданного аргумента<br><b>index.js</b><pre>
...
&lt;Provider store={store}&gt;
&lt;App /&gt;
&lt;/Provider&gt;</pre>В главном файле глобальное состояние подключается через обертку Provider для того чтобы каждый компонент внутри видел это состояние<br><b>store.js</b><br><b>const store = createStore(reducer);</b> - с помощью библиотеки redux создаем глобальное хранилище передав в качестве аргумента созданный ранее reducer<br><b>someComp.js</b><pre>
class Somecomp extends Component {
...
render() {
  const {someValue, loadValue} = this.props;
  ...
}
}
const mapStateToProps = (state) => ({
someValue: state.value
})
const mapDispatchToProps = {
loadValue
}
export connect(mapStateToProps, mapDispatchToProps)(Somecomp);</pre>Внизу сначала мы создаем 2 ф-ции которые возвращают объект со значениями из store и объект с нашими actions, а затем через connect библиотеки react-redux привязывам эти ф-ции к компоненту чтобы взаимодействовать с состоянием в виде props, где:<br>1 аргумент объект со значениями<br>2 аргумент объект с actions<br>3 аргумент сам компонент<br>А в самом компоненте уже получаем это все через this.props(в функциональном компоненте эти props будут переданны как обычный аргумент в ф-ции)`
  ],
  [
    'Параметры в функциональных компонентах',
    `Компонент может принимать параметры для дальнейшего использования. Если меняются передаваемые параметры то компонент перерисовывается. Сам компонент принимает параметры через объект props, который можно либо деструктуризировать в блоке с логикой(пример 1) либо сразу при объявлении ф-ции(пример 2). А сами параметры передаются уже при использовании компонента в виде обычного атрибута(пример 3)<pre>
function Some(props) {
const {someProp} = props;
...
}
function Another({someProp}) {
...
}
...
root.render(&lt;Some someProp="something" /&gt;);
</pre>`
  ],
  [
    'Функциональный компонент',
    `<pre>
const Some = () => {
const text = () => {
  return 'text';
}
const style = {
  width: '300px'
}
return (
  &lt;p className="class" style={style}&gt;{text ? text : null}&lt;/p&gt;
)
}</pre>Создание функционального компонента, где сначала идет блок с какой то логикой а в конце возвращается разметка, в которой можно использовать различные переменные указав их в {} как для контента так и для атрибутов. Также можно использовать ТОЛЬКО тернарный оператор для различных условий`
  ],
  [
    'Передача props компоненту',
    `<pre>
const SomeComp = () => {
return (
  &lt;AnotherComp name="Bob" age={45} /&gt;
);
}</pre>Обычный способ передачи props<pre>
const SomeComp = () => {
const props = { name: 'Bob', age: 45 };
return (
  &lt;AnotherComp {...props} /&gt;
);
}</pre>Определение объекта пропсов в логике компонента и передача с помошью деструктуризации`
  ],
  [
    'Типизация props children',
    `<pre>
type AppProps = {
  someProp: number;
  children?: ReactNode;
}</pre>В данном псевдониме проп children отмечен как не обязательный и имеет тип ReactNode который в свою очередь является псевдонимом типов  ReactChild | ReactFragment | ReactPortal | boolean | null | undefined<pre>
type SomeProps = PropsWithChildren&lt;{
  someProp: number;
}&gt;;</pre>В React уже есть готовый шаблон если нам необходимо описать тип props в котором возможно есть children. Данный шаблон использует дженерик и выглядит следующим образом - <b>type PropsWithChildren&lt;T&gt; = T & { children?: ReactNode | undefined };</b><pre>
function SomeComp: React.FC&lt;SomeTypeProps&gt;(props) {
  ...
}</pre>Еще 1 подход типизации children. Здесь используется встроенный интерфейс FunctionComponent который также с помощью дженерика принимает другой псевдоним типа. Но такой подход не следует использовать т.к. он скрывает типизацию children`
  ],
  [
    'Когда и какое состояние использовать',
    `<img src="./img/state--when.jpg" style="width: 650px"><br>
    С помощью этой диаграммы легко понять когда необходимо использовать состояние<br>
    <img src="./img/state--which.jpg"><br>
    С помощью этой диаграммы можно выяснить какой тип состояния лучше использовать`
  ],
  [
    'JSX разметка',
    `1) вместо class используется className<br>
    2) вместо атрибута for пишется htmlFor<br>
    3) при использовании boolean параметра можно не указывать его значение если оно равно true, а всего лишь имя переменной<br>
    4) события в разметке указываются как атрибуты элементов <b>onX</b> где x имя события(click, submit) а в качестве значения принимает ф-цию которая описана в логике<br>
    5) вместо &lt;a href="#"&gt; используется <b>&lt;link to="#"&gt;</b> потому что при использовании обычной ссылки страница будет перезагружаться<br>
    <pre>
function SomeComp() {
return (
  &lt;h1 style={{
    color: 'red',
    fontSize: '500px',
  }}&gt;Hello&lt;/h1&gt;
);
}</pre>Описание стилей внутри элемента происходит следующим образом. Стили в JSX это объекты, поэтому сначала открываются фигурные скобки для вставки JS кода а затем вставляется сам объект где свойста стилей являются полями объекта описаные в camelCase<pre>
function Some() {
return '&lt;p&gt;Hello wolrd&lt;/p&gt;
}</pre>При попытке отрендерить строку с разметкой JSX автоматические экранирует такую строку и просто выведет весь код в строке<pre>
function App() {
return <div dangerouslySetInnerHTML={{ __html: Some()}}></div>
};</pre>Однако такое поведение можно исправить указав соответствующий атрибут передав в него объект с компонентом. Но это опасно<pre>
const MyComp = () => {
const variable = false;
return (
  &lt;div&gt;
    Моя переменная - {String(variable)}
  &lt;/div&gt;
);
}</pre>Чтобы отобразить ложное значение его сначала надо представить в виде строки как здесь например<hr>
JSX разметка по итогу интерпретируется в JS объект поэтому если в разметке имеются несколько элементов то у них должен быть какой то общий элемент или хотя бы обёртка иначе JS воспримет их как 2 несвязанных объекта и мы получим ошибку`
  ],
  [
    'Организация редиректа не из компонента',
    `<b>browser-history.js</b><pre>
const browserHistory = createBrowserHistory();</pre>Сначала просто создаем новый экземпляр browser history<br><b>history-route.js</b><pre>
function HistoryRouter({history, basename, children}) {
const [state, setState] = useState({
  action: history.action,
  location: history.location
});

useLayoutEffect(() => history.listen(setState), [history]);
return (
  &lt;Router
    basename={basename}
    location={state.location}
    navigationType={state.action}
    navigator={history}
  &gt;
    {children}
  &lt;/Router&gt;
);
}</pre>Описываем компонент обертку для Router<br><b>index.js</b><pre>
&lt;HistoryRouter history={browserHistory}&gt;
...
&lt;/HistoryRouter&gt;</pre>В точке входа приложения вместо BrowserRouters подставляем наш компонент<br><b>redirect.ts</b><pre>
const redirect = (store) => (next) => (action) => {
if (action.type === 'redirectToRoute') {
  browserHistory.push(action.payload);
}
return next(action);
}</pre>Создаем свой middleware для редиректа`
  ],
  [
    'Привязка контекста в классовом компоненте',
    `1) через bind в конструкторе => <b>this.changeState = this.changeState.bind(this)</b><br>2) записать стрелочную ф-цию в конструктор где контекстом автоматически станет родитель => <b>this.changeState = () => {}</b><br>3) Благодаря новому стандарту можно использовать стрелочную ф-цию вне конструктора => <b>changeState = () => {}</b>`
  ],
  [
    'HOC для классового компонента',
    `<pre>
const withData = (SomeComponent) => {
return class extends Component {
  state ...
  componentDid...
  render() {
    ...
    return &lt;SomeComponent {...this.props} data={data} /&gt;
  }
}
}</pre>Создание обертки для классового компонента с целью добавить какой то новый функционал. Эта обертка возвращает безымянный класс который содержит какую то логику и в конце рендерит переданный компонент. По скольку обертка также видит props то просто передаем их с помощью деструктуризации а также добавляем новый(data)<hr>HOC уместен когда:<br>1) поведение необходимо для нескольких элементов<br>2) поведение не требует большого кол-ва props`
  ],
  [
    'HOC для функционального компонента',
    `<pre>
const withFlag = (Component) => function(props) {
const [isOn, setIsOn] = useState(false);
return (
  &lt;Component {...props} isOn={isOn} onChange={() => setIsOn(!isOn)} /&gt;
);
}

const SomeComp = (props) => {
return(
  &ltbutton isOn={props.isOn} onClick={props.onChange} /&gt;
);
}
export default withFlag(SomeComp);</pre>Создание обертки для функционального компонента с целью добавить какой то новый функционал. Эта обертка возвращает анонимную ф-цию которая содержит какую то логику и в конце рендерит переданный компонент. По скольку обертка также видит props то просто передаем их с помощью деструктуризации а также добавляем новый<hr>HOC уместен когда:<br>1) поведение необходимо для нескольких элементов<br>2) поведение не требует большого кол-ва props`
  ],
  [
    'Жизненные циклы в классовом компоненте',
    `<b>componentDidMount() {}</b> - ф-ция которая сработает при 1 рендере компонента<br><b>componentDidUpdate(prevProps, prevState) {}</b> - ф-ция которая сработает при обновлении props или state, которая также принимает 2 аргумента в виде предыдущих значений props и state для проверки на изменения<br><b>componentDidCatch() {}</b> - ф-ция обработчик ошибок для того чтобы не рушилось все приложение<br><b>componentWillUnmount() {}</b> - ф-ция которая сработает как только компонент будет уничтожен`
  ],
  [
    'useMemo()',
    `<b>const memoFunc = useMemo(someFunc, []);</b> - хук который создает мемоизированную версию переданной в него ф-ции.`
  ],
  [
    'useLoaderData()',
    `Хук позволяет получить данные из функции loader (если таковой имеется). Сам хук при этом не вызывает loader а просто возвращает его результат`
  ],
  [
    'useFetcher()',
    `Хук позволяет вызвать loader из другого компонента или иммитировать срабатывание action без участия навигации`
  ],
  [
    'useRouteError()',
    `Хук который используется в компонентах отмеченных как errorElement (react router 6.4+). Хук возвращает объект ошибки или исключения которые могут появится в результате рендера или loader функции`
  ],
  [
    'useNavigation()',
    `Хук который содержит различную информацию о навигации по страницам<br>
    .state - текущее состояние навигации<br>
    --idle - полностью готов<br>
    --loading - идет какая то загрузка данных из loader<br>
    --submitting - идет отправка формы<br>
    .formData - содержит все данные формы которые были отправлены<br>
    .json - содержит json отправленный в форме (если такой был)<br>
    .text - содержит тело из формы в виде текста<br>
    .location - текущий адрес`
  ],
  [
    '&lt;Navigate /&gt;',
    `<b>&lt;Navigate to={x} replace /&gt;</b>Компонент позволяющий сделать редирект из JSX.<br>
    x - новый URL<br>
    replace - указывает что в истории браузера этот шаг отображать не нужно`
  ],
  [
    'useNavigate()',
    `Хук позволяющий сделать редирект напрямую в коде. Возвращает функцию котороая принимает либо новый URL либо отрицательное число указывающее на сколько шагов назад необходимо вернуться<pre>
function Some() {
  const navigate = useNavigate();
  return &lt;button onClick={() => navigate(-1)}&gt;Click&lt;/button&gt;
}</pre>`
  ],
  [
    'useSearchParams()',
    `Хук библиотеки react-router-dom позволяющий взаимодействовать со строкой URL а именно с поисковым запросом (?name=some&age=35). Хук возвращает массив где 1 элемент это объект хранящий данные а 2 функция сеттер для установки нового значения<pre>
const [query, setQuery] = useSearchParams();
const name = query.get('name');   <sup>1</sup>
setQuery('age', 1);   <sup>2</sup></pre>
1) Получение данных происходит через метод get объекта<br>
2) Установка нового значения через сеттер`
  ],
  [
    'Селекторы',
    `<b>const getData = (state) => state['DATA'].someData</b> - селектор для безопасной работы с глобальным состоянием<br>
    <b>const data = useSelector(getData);</b> - использование хука для работы с созданным селектором`
  ],
  [
    'React router в 6.4+',
    `<b>app.jsx</b><pre>
const router = createBrowserRouter([    <sup>1</sup>
  {
    element: &lt;Layout /&gt;, children: [    <sup>2</sup>
      { element: &lt;Main /&gt;, path: '/' },     <sup>3</sup>
      { element: &lt;Order /&gt;, path: '/order/:id' },   <sup>4</sup>
      { element: &lt;Menu /&gt;, path: '/menu/:id', loader: loader, errorElement: &lt;ErrorElement /&gt;},     <sup>5</sup>
      { element: &lt;CreateOrder /&gt;}, path: '/order/new', action: action }   <sup>11</sup>
    ]
  }
]);
function App() {
  return &lt;RouterProvider router={router}&gt;   <sup>6</sup>
}</pre><b>menu.jsx</b><pre>
function Menu() {
  const menu = useLoaderData();   <sup>7</sup>
  return &lt;p&gt;{menu.length}&lt;/p&gt;
}
export async function loader({params}) {      <sup>8</sup>
  const menu = await someAPILoading(params.id);
  return menu;
}</pre><b>errorElement.jsx</b><pre>
function ErrorElement() {
  const error = useRouteError();    <sup>9</sup>
  return &lt;p&gt;{error.message}&lt;/p&gt;
}</pre><b>layout.jsx</b><pre>
function Layout() {
  const nav = useNavigation();      <sup>10</sup>
  const isLoading = nav.state === 'loading';
  return (
    &lt;&gt;
    { isLoading ? &lt;Spinner /&gt; : &lt;Outlet /&gt;}
    &lt;/&gt;
  );
}</pre><b>createOrder.jsx</b><pre>
function CreateOrder() {
  const errors = useActionData();   <sup>12</sup>
  const nav = useNavigation();
  cosnt isSubmitting = nav.state === 'submitting';  <sup>13</sup>
  return (
    &lt;Form&gt;    <sup>14</sup>
      &lt;Input name="phone"&gt;    <sup>15</sup>
      {error?.phone && &lt;p&gt;{error.phone}&lt;/p&gt;}    <sup>16</sup>
      &lt;button disabled={isSubmitting}&gt;Submit&lt;/button&gt;
    &lt;/Form&gt;
  );
}
export async function action({request}) {   <sup>17</sup>
  const formData = await request.formData();    <sup>18</sup>
  const data = Object.fromEntries(formData);    <sup>19</sup>
  const order = {     <sup>20</sup>
    ...data,
    cart: JSON.parse(data.cart)
  };
  const error = {};     <sup>21</sup>
  if (!checkPhone(order.phone)) error.phone = 'Incorrect number';   <sup>22</sup>
  if (Object.keys(error).length) return error;    <sup>23</sup>
  const newOrder = await postData(order);   <sup>24</sup>
  return redirect('/order/' + newOrder.id);   <sup>25</sup>
}</pre><b>order.jsx</b><pre>
function Order() {
  const fetcher = useFetcher();     <sup>26</sup>
  useEffect(() => {
    if (!fetcher.data && fetcher.state === 'idle') {      <sup>27</sup>
      fetcher.load('/menu');      <sup>28</sup>
    }
  }, [fetcher]);
  const menuList = fetcher.data;
  return (
    &lt;p&gt;Доступно - {menuList.length ?? 0} видов&lt;/p&gt;    <sup>29</sup>
  );
}</pre><b>UpdateQuantity.jsx</b><pre>
function UpdateQuantity() {
  const fetcher = useFetcher();
  return (
    &lt;fetcher.Form method='PATCH'&gt;     <sup>30</sup>
      &lt;button&gt;Update priority&lt;/button&gt;
    &lt;/fetcher.Form&gt;
  );
}
export const async function loader({require, params}) {     <sup>31</sup>
  const id = params.id;
  const data = { priority: true };
  await someAPI(id, data);      <sup>32</sup>
  return null;
}</pre>
1) сначала создаем объект router где функция creator принимает массив с объектами в виде настроек для каждого роута<br>
2) опционально устанавливаем общий layout который будет виден на каждом роуте, либо можем просто через запятую указать необходимые роуты<br>
3) описание стандартного роута<br>
4) описание роута с динамической частью<br>
5) описание роута зависящего от загрузки данных с внешнего API<br>
-- errorElement - элемент который будет показан в случае неудачной загрузки<br>
-- loader - прикрепляем функцию загрузчик которая подгружает данные для компонента<br>
6) в главном компоненте просто подключаем RouterProvider в который указываем недавно созданный router<br>
7) с помощью хука получаем загруженные данные<br>
8) функция loader которая отвечает за загрузку данных. Она должна находится рядом с компонентом а также по соглашению иметь имя loader. Сами данные загружаются только когда роут меняется на целевой. В случае ререндера компонента данные не перезагружаются. Функция должна возвращать результат загрузки. Также эта функция может принимать необязательный пропс params для доступа к переданным данным через адресную строку (аналогия useParams)<br>
9) в компоненте который отмечен как errorElement, хук возвращает все ошибки и исключения в ходе рендера или лоадера<br>
10) чтобы на время загрузки компонента отображать какой то UI используется хук и проверяется его state<br>
11) В роуте CreateOrder используется экспортированный action который позволяет привязать компонент функции action<br>
12) Хук позволяет получить возвращаемые данные из функции action. В данном случае это объект ошибок если не пройдена валидация<br>
13) С помощью хука useNavigation определяем текущее состояние навигации для изменения UI во время отправки формы<br>
14) Form - компонент react router. Это контролируемый элемент form с рядом преимуществ. По умолчанию preventDefault, отправка может обрабатываться в специальной функции action<br>
15) По скольку используем управляемый Form то отслеживать состояние внутренних инпутов не нужно, за нас уже все сделано<br>
16) В случае если action вернет какую то ошибку мы можем отобразить ее данные<br>
17) Специальная функция action, аналог loader. Может принимать пропс request в котором например может находится данные из отправленной формы<br>
18) Получаем данные из формы для обработки<br>
19) Преобразуем данные в объект<br>
20) В случае если это сложный объект который содержит вложенные объекты/массивы то сначала преобразуем его<br>
21) Создаем пустой объект errors для фиксирования ошибок на стадии валидации полей<br>
22) Производим валидацию поля и если что то не так создаем новое свойство в объекте с сообщением<br>
23) Проверяем имеет ли объект errors свойства и если да просто возвращаем его для дальнейшей обработки в самом компоненте<br>
24) В случае если форма прошла валидацию производим уже отправку данных через какой то API<br>
25) Как только приходит ответ возвращаем redirec(). Эта функция react router которая позволяет делать перенаправление не из компонента<br>
26) Используем хук для загрузки данных из loader другого компонента<br>
27) проверяем если данные еще не загружены и состояние fetcher в покое<br>
28) тогда производим загрузку данных, которые потом будут помещены в свойство data объекта fetcher<br>
29) где потом и используем полученные данные<br>
30) в этом примере fetcher используется для обновления каких то данных и для этого он предоставляет почти такой же Form но который не трогает navigation<br>
31) при отправке формы сработает этот action. Естественно главное не забыть указать его в объекте router на родительском компоненте. Как и всегда в action есть возможность использовать полученные данные из формы а также взаимодействовать с параметрами адресной строки<br>
32) происходит отправка изменений. Как только отправка закончится компонент автоматически вызовет проверку новых данных и в случае необходимости отрисуется заново`
  ],
  [
    'Комбинирование/нарезка reducer',
    `<b>data-reducer.js</b><pre>
const dataReducer = createSlice({
name: 'DATA',
initialState: initState,
reducers: {},
extraReducers(builder) {
  builder
    .addcase(someAsyncAction.fullfiled, (state, action) => {
      state.prop = action.payload;
      state.isLoading = false;
    })
    .addcase(someAsyncAction.pending, (state) => {
      state.isLoading = true;
    })
    .addcase(someAsyncAction.rejected, (state) => {
      state.isError = true;
      state.isLoading = false;
    });
}
});</pre>Создаем 1 часть общего reducer которая будет отвечать за работу с данными. Создается с помощью ф-ци createSlice которая принимает объект со следующими полями:<br>
1)Имя reducer для дальнейшего обращения<br>
2)Начальное состояние<br>
3)Объект с методами для синхронных операций, в данном примере пуст<br>
4)Метод для работы с асинхронными операциями. В нем на переданном объекте по цепочке вызывается метод addCase чтобы добавить новые операции. Этот метод принимает асинхронный action с 1 из 3 свойств означающих статус обработки(fullfiled - успешно выполненый/pending - в процессе обработки/rejected - не выполнен). Для каждого из этих свойств по надобности создаются обработчики. В качестве 2 аргумента принимается callback содержащий state в виде 1 аргумента и action в виде необязательного 2 для того чтобы была возможность получить какие то полученные данные из action<br><b>user-reducer.js</b><pre>
const userReducer = createSlice({
  name: 'USER',
  initialState: initState,
  reducers: {
    clearData: (state) => {
      state.someData = null;
    },
    addData: {
      prepare(loan, purpose) {
        return {
          payload: {
            loan, purpose, lastUpdate: new Date().toString()
          }
        };
      },
      reducer(state, action) {
        const {loan, purpose, lastUpdate} = action.payload;
        state.loan = loan;
        state.purpose = purpose;
        state.lustUpdate = lastUpdate;
      }
    },
    decreaseData(state, action) {
      state.data -= state.action;
      if (state.data < 0) userReducer.caseReducers.clearData(state, action);
    }
  }
});
export const {clearData} = userReducer.actions;</pre>Создаем 2 часть reducer. Она отвечает за какое то пользовательское взаимодействие и тут мы уже описываем обычные обработчики action в виде методов. Функция prepare во 2 обработчике action отвечает за преобразования полученных данных через dispatch (dispatch(addData(14, 'because'))) в единый payload а также полезен при side эффектах (прим. указание даты изменения). Затем вызывается функция reducer которая уже принимает измененный action.payload и проводит дальнейшие операции с store. При использовании простых обработчиков action в конце нужно экспортировать их для дальнейшего использования<br>
caseReducers - свойство объекта созданного reducer который позволяет получить доступ ко всем action созданным в reducers. Это полезно если в описании одного из action необходимо задиспатчить другой action<br>
<b>root-reducer.js</b><pre>
const rootReducer = combineReducers({
['DATA']: dataReducer.Reducer,
['USER]: userReducer.Reducer
});</pre>Создание общего reducer из нарезок. После этого полученный reducer можно как обычно передать в store`
  ],
  [
    'Мемоизация компонента',
    `<pre>
const SomeComp = (props) => {
...
}
export default memo(SomeComp, (prev, curr) => {
return prev.count === curr.count;
});</pre>Мемоизация компонентов нужна чтобы избежать лишней перерисовки. В данном случае используется обертка(HOC) memo которая принимает в качестве 1 обязательного аргумента компонент и 2 необязательный - callback. Если передать один аргумент то HOC просто сравнивает props компонента поверхностно и если они изменились то перерисует компонент. Однако если в props есть callback ф-ции то перерисовка не избежна. Чтобы это избежать мы можем применить <b>КОСТЫЛЬ</b>, передать 2 аргумент ф-ции которая будет возвращать какой то результат сравнивания, например сравнивая отдельные props как в примере с count. И если ф-ция вернет false компонент перерисуется.`
  ],
  [
    'Axios',
    `Библиотека для отправки HTTP запросов в браузере. Преимущества:<br>
    1)отображение прогресса<br>
    2)автоматическая трансформация ответа в JSON<br>
    3)поддержка node.js<br>
    4)имеет интерфейс для написания сетевых запросов<br>
    5)моки для тестов из коробки<br>
    6)наличие перехватчиков ответов и запросов<pre>
const createAPI = (): AxiosInstance => {
const api = axios.create({  <sup>1</sup>
  baseURL: 'someUrl',
  timeout: 5000
});

api.interceptors.request.use((config: AxiosRequestConfig) => {  <sup>2</sup>
  const token = getToken();

  if (token) {
    config.headers['x-token'] = token;
  }

  return config;
});

api.interceptors.response.use((resp) => resp, (error: AxiosError) => {  <sup>3</sup>
  if (error.response) {
    someErrorHandler(error.response.data.error);
  }
  throw error;
});

return api;
}</pre>Создание REST API с помощью axios.<br>
1)создаем api с помощью конструктора передав в него объект с настройками - URL и время ожидания ответа<br>
2)добавляем перехватчик запроса. В нем мы получаем токен и если токен получен добавляем к конфигу его в виде заголовка и в конце возвращаем обновленный конфиг<br>
3)добавляем перехватчик ответа. В нем мы смотрим если с ответом все в порядке просто возвращаем его. Если же получаем ошибку то вызываем какой то обработчик ошибок а затем выбрасываем ошибку<br>В дальнейшем этот api уже можно использовать где то дальше, например в качестве переданного аргумента для middleware<pre>
const api = createAPI();
const store = configureStore({
reducer,
middleware: (getDefaultMiddleware) => {
  getDefaultMiddleware({
    thunk: {
      extraArgument: api
    }
  }),
}
});</pre>`
  ],
  [
    'Redux Thunk',
    `Middleware который позволяет производить любые действия в том числе асинхронные запросы до выполнения reducer. Также имеет доступ к глобальному состоянию и может его обновлять<pre>
const api = async (id) => {
const resp = await fetch('url/' + id);
const data = await resp.json();
return data.title;
}</pre>Опишем для примера какой то api получения данных <pre>
const setTitleAction = async (dispatch, store, api) => {
const id = store.getState().id;
const title = await api(id);
dispatch(SOME(title));
}</pre>Создание action для thunk. Сначала получаем данные из состояния, затем асинхронный запрос через полученный api и в конце вызываем dispatch с каким то action передав туда полученные данные<pre>
const checkAuthAction = createAsyncThunk&lt;void, undefined, {
dispatch: AppDispatch, state: State, extra: AxiosInstance
}&gt;(
'checkAuth',
async (_arg, {dispatch, extra: api}) => {
  await api.get('url');
}
);
</pre>Создание action с через RTK для Thunk. Конструктор принимает в качестве 1 аргумента строковое значение action, а во 2 callback где 1 аргумент в данном примере заглушка т.к. мы не передаем никаких данных, а 2 аргумент объект где указываем dispatch и api в поле extra. В теле ф-ции делаем запрос через наш api указав метод get. По скольку конструктор ничего не возвращает то в Typescript 1 тип void. По скольку мы ничего не передаем то 2 тип undefined. Далее указываем типизацию для переданного объекта<pre>
const postComment = createAsyncThunk&lt;Comments, PostComment, {
dispatch: AppDispatch, state: State, extra: AxiosInstance
}&gt;(
'postComment',
async ({comment, id}, {dispatch, extra: api}) => {
  const {data} = await api.post&lt;Comments&gt;('url/' + id, {comment});
  return data;
}
);</pre>Action для отправки данных на сервер. api.post возвращает нам объект поэтому мы сразу деструктуризируем его извлекая свойство из data и затем возвращаем полученный результат. В типизации сначала указываем Comments т.к. возвращаем результат в виде обновленного списка комментариев. Затем указываем PostComment это тип объекта для отправки данных.`
  ],
  [
    'MiddleWare',
    `Это ф-ция которая будет выполнена после dispatch() но до обработки reducer. Другими словами позволяет выполнить какую то логику после вызова action но до его выполнения<pre>
const some = (store) => (next) => (action) => {
console.log('action = ' + action.type);
console.log('Current state = ' + store.getState());
const result = next(action);
console.log('New state = ' + store.getState());
return result;
}
const some2 = (store) => (next) => (action) => {
...
next(action);
}</pre>2 вида собственных middleware. В 1 показано как можно взаимодействовать с измененным состоянием, главное в конце вернуть полученный result. Во 2 мы просто после необходимой нам логике вызываем диспатч с переданным action<pre>
const applyMiddleware = Redux.applyMiddleware;
const store = createStore(reducer, initState, applyMiddleware(some));</pre>Передача MW в store. Сначала инициализируем с помощью оболочки из Redux а затем передаем в качестве 3 параметра в конструктор где параметром оболочки будет наша созданная middleware<pre>
const store = configureStore({
reducer,
middleware: [some, some2]
});
const store2 = configureStore({
reducer,
middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    thunk: {
      extraArgument: 'some data or function'
    }
  }).concat(some),
});</pre>Передача MW в store через RTK. В 1 случае мы просто передаем все наши созданные MW в свойство middleware в виде массива. Во 2 случае мы сначала описываем callback для использования встроенных MW из Redux(в данном случае thunk) где свойство extraArguments получает какой то api или ц-цию.Сам callback вернет массив, а затем присоединяем к нему свои MW`
  ],
  [
    'Глобальное состояние (самописный для общего представления)',
    `<pre>
const createStore = (reducer, initState) => {
return {
  _state: initState,
  dispatch(action) {
    this._state = reducer(this._state, action);
  },
  getState() {
    return this._state;
  }
};
};</pre>Примерно так выглядит создание хранилища store. Вернет объект с установленным начальным значением, методом getState() который будет возвращать текущее значение и методом dispatch() который будет изменять текущее значение с помощью переданного в него action<pre>
const myReducer = (state, action) => {
switch(action.type) {
  case 'add':
    return state + 1;
  case 'dec':
    return state - 1;
  case 'some':
    return state + action.payload;
  default: return state;
}
}</pre>Так выглядит reducer. Он нужен чтобы изменять состояние. Основываясь на полученном action.type производит какие то действия. Также action может содержать свойство payload которое будет содержать переданные данные.<pre>
const add = () => {type: 'add'};
const dec = () => {type: 'dec'};
const some = (n) => {type: 'some', payload: n};</pre>Так выглядят action. По сути это ф-ции которые возвращают объект с обязательным полем type и дополнительным payload если передан какой то аргумент<pre>
const store = createStore(myReducer, 0);
btn1.addEventListener('click', () => {
store.dispatch(add);
});
btn2.addEventListener('click', () => {
store.dispatch(some(4));
});</pre>Инициализация store и использование метода dispatch()`
  ],
  [
    'Глобальное состояние (функциональный компонент)',
    `<b>index.js</b><pre>
&lt;Provider store={store}&gt;
&lt;App /&gt;
&lt;/Provider&gt;</pre>Чтобы использовать глобальное состояние во всем приложении делают обертку для главного компонента через Provider указывая ранее созданный store<br><b>action.js</b><pre>
const INC = () => {type: 'INC'};
const ADD_SOME = (value) => {type: 'ADD_SOME', payload: value};</pre>Создание action с помощью которых будем указывать reducer как изменять состояние<br><b>reducer.js</b><pre>
const reducer = (state, action) => {
switch(action.type) {
  case 'INC':
    return state + 1;
  case 'ADD_SOME':
    return state + action.payload;
  default: return state;
}
}</pre>Reducer нужен для того чтобы изменять состояние основываясь на полученных action.<br><b>store.js</b><pre>
const store = (initState, reducer) => ({
_state: initState,
getState() {
  return this._state;
},
dispatch(action) {
  this._state = reducer(this._state, action);
}
})</pre>Создание store. Принимает исходное состояние а также reducer который и будет изменять его<pre>
function SomeComp({propName, propNameForDispatch}) {
return (
  &lt;button type="button" onClick={propNameForDispatch}&gt;{propName}&lt;/button&gt;
);
}
const mapStateToProps = (state) => ({
propName: state.someValue;
});
const mapDispatchToProps = (dispatch) => ({
propNameForDispatch: () => dispatch(someAction())
});

export default connect(mapStateToProps, mapDispatchToProps)(SomeComp);</pre>Чтобы связать redux с компонентом сначала создаем ф-цию которая вернет объект, где именем поля будет пропс а значением любое значение из store. Затем создаем ф-цию которая вернет объект где также именем будет пропс а значением ф-ция dispatch с нужным action. После всего с помощью connect связываем эти ф-ции с нашим компонентом и в дальнейшем можем обращаться к данным store или диспатчить в него что то с помощью переданных в props свойств, благодаря этому в случае если store изменится компонент перерисуется т.к. значения из store передаются в props<pre>
function SomeComp() {
const dispatch = useDispatch();
const someValue = useSelector((state) => state.value);

return (
  &lt;button type="button" onClick={dispatch(someAction())}&gt;{someValue}&lt;/button&gt;
);
}</pre>В новых версиях достаточно использовать хуки. useSelector является аналогом mapStateToProps и позволяет получать любые данные из store, а также неявно подписывается на изменения состояния. useDispatch это аналог mapDispatchToProps`
  ],
  [
    'Глобальное состояние (RTK)',
    `<b>store.js</b><pre>
const store = configureStore({
  reducer,
  preloadedState: 0,
  devTools: true
});</pre>Создание store с помощью RTK. Принимает объект с настройками где сначала указывается reducer, затем исходное состояние. DevTools указывает можно ли приложению взаимодействовать с браузерным расширением(по умолчанию true)<br><b>action.js</b><pre>
const ACTION = {
INC: 'INC',
ADD_SOME: 'ADD_SOME'
};
const inc = createAction(ACTION.INC);
const addSome = createAction(ACTION.ADD_SOME, (value) => ({payload: value}));</pre>Описание action в RTK. Сначала создаем объект для удобства и чтобы избежать ошибок при передаче action(паттерн action creator). Затем создаем сами action передав строковое значение в 1 аргументе. Т.к. в RTK созданные action имеют перезаписанный метод toString() то они возвращают строку action.type. Чтобы передать дополнительные параметры в качестве 2 аргумента создаем callback который получает наш параметр и возвращает объект со свойством payload.<br><b>reducer.js</b><pre>
const reducer = createReducer(initState, (builder) => {
builder
  .addCase(ACTION.INC, (state) => {
    state = state + 1;
  })
  .addCase(ACTION.ADD_SOME, (state, action) => {
    state = state + action.payload;
  });
});</pre>Создаем reducer с помощью RTK. Получает начальное состояние через 1 аргумент. Чтобы добавить какое то действие достаточно дописать addCase(), в котором в 1 аргумент передается тип action а во 2 callback который получает обязательный state и action если были переданны какие то данные. Внутри callback описывается логика изменения состояния. Благодаря библиотеке immer мы можем сразу указывать какое свойство объекта(если state объект) необходимо изменить(например: state.id = action.payload). Сама библиотека позволяет подобныйм образом изменять иммутабельный объект<pre>
const initStore = {
count: 0,
someData: []
};
const reducer = createReducer(initStore, (builder) => {
builder
  .addCase(ACTION.INC, (state) => {
    state.count += 1;
  })
  .addCase(ACTION.ADD_DATA, (state, action) => {
    state.data.push(action.payload);
  });
});</pre>С помощью immer можно также спокойно добавлять что то в массив в объекте initStore и библиотека сама все правильно обработает`
  ],
  [
    'Жизненные циклы в функциональном компоненте',
    `<pre>
useEffect(() => {
...(1)...
return () => {
  ...(2)...
}
}, [x]);</pre>Аналог жизненного цикла componentDidUpdate в главном блоке кода и componentWillUnmount в виде блока кода в return, где :<br>1) какая то логика при изменении<br>2) какая то логика в return которая выполнится если компонент будет уничтожен<br>3) после callback ф-ции передается массив зависимостей в котором можно либо указать какие то переменные которые послужат триггером для запуска useEffect либо оставить массив пустым и тогда useEffect сработает 1 раз как componentDidMount но только после отрисовки компонента. Компонент может содержать несколько эффектов и они будут выполнены в том порядке в котором были записаны<pre>
useLayoutEffect(() => {
...
});</pre>Этот хук является аналогом componentDidMount и сработает до отрисовки компонента`
  ],
  [
    'useEffect()',
    `Хук который в первую очередь служит методом жизненных циклов компонента. Также служит для того чтобы изолировать побочные эффекты от логики компонента. Что входит в эти эффекты:<br>
    1) Получение данных<br>
    2) Работа с таймерами<br>
    3) Прямое изменение DOM<br>
    4) Изменение размеров элемента<br>
    5) Работа с локальных хранилищем<br>
    6) Подписка на услуги<br>
    7) Взаимодействие с файловой системой<br>
    8) Вывод какого то результата на экран<br>
    В общем это логика которую надо изолировать от рендеринга`
  ],
  [
    'flux архитектура',
    `Подход когда глобальное состояние выносится отдельно от логики компонентов`
  ],
  [
    'defaultProps',
    `<pre>
function SomeComp(props) {
return(
  &lt;div&gt;{ props.name }&lt;/div&gt;
);
}

SomeComp.defaultProps = {
name: 'Guest'
}</pre>Свойство позволяет задать пропсы по умолчанию`
  ],
  [
    'Хуки',
    `Это специальные функции которые позволяют использовать в функциональных компонентах жизненные циклы, состояние и т.д.<hr>
    Основные правила хуков:<br>
    1) Хуки не используются в циклах или условиях потому что React полагается на порядок вызова хуков и если порядок нарушить будут ошибки<br>
    2) Использовать хуки можно только в компонентах на высшем уровне а не внутри каких то побочных ф-ций по тем же причинам`
  ],[
    'Паттерны',
    `<pre>
function App() {
return (
  &lt;SomeComp&gt;
    &lt;h1&gt;Some child &lt;/h1&gt;
  &lt;/SomeComp&gt;
);
}

function SomeComp({render}) {
return (
  &lt;div&gt;
  { children }
  &lt;div&gt;
);
}</pre>Паттерн использования служебного пропса children<pre>
function App() {
return (
  &lt;SomeComp render={(trigger) => {
    return trigger
      ? &lt;p&gt;Hello&lt;/p&gt;
      : &lt;p&gt;Goodbye&lt;/p&gt;
  }} /&gt;
);
}

function SomeComp({children}) {
return (
  &lt;div&gt;
  { render(false) }
  &lt;div&gt;
);
}</pre>Паттерн render-props. Позволяет передать в пропс ф-цию для отрисовки каких то элементов<pre>
function SomeComp({someTrigger}) {
return (
  &lt;div&gt;
  { someTrigger && &lt;p&gt;Hello world&lt;/p&gt; }
  &lt;div&gt;
);
}</pre>Паттерн условный рендеринг позволяет использовать условие в более легкой форме <pre>
function Product({class, product}) {
return (
  &lt;article className={class}&gt;
    ...
  &lt;/article&gt;
);
}

function ProductNew({class = '', ...otherProps}) {
return (
  &lt;Product className={'product--new ' + class} {...otherProps} /&gt;
);
}

function ProductList({products}) {
function getType(type, product) {
  switch(type) {
    case 'new':
      return &lt;ProductNew product={product} /&gt;
    default:
      return &lt;Product product={product} /&gt;
  }
}

return (
  &lt;ul&gt;
    {
      products.map((prod) => (
        &lt;li key={prod.id}&gt;
          { getType(prod.type, product) }
        &lt;/li&gt;
      ))
    }
  &lt;ul&gt;
);
}</pre>Паттерн proxy-component. Принцип - сделать обертку для компонента добавив что то новое а потом в родительском компоненте применив паттерн container, основываясь на каком то выборе отрендерить 1 из компонентов. Т.к. в JSX нельзя использовать условия то можно вынести его в отдельную ф-цию а потом в разметке просто ее вызвать`
  ],
  [
    'Хуки Собственные',
    `Бывает случается так что в разных компонентах присутствует одинаковая логика. Это может быть взаимодействие с API или с другими хуками или что то подобное. Чтобы соблюдать принцип DRY эту логику было бы неплохо вынести отдельно. Можно сделать HOC и обернуть необходимые компоненты в него, а можно создать свой хук. По сути это просто ф-ция в которой может быть любая логика которая используется в нескольких компонентах. Внутри своего хука можно использовать уже встроенные хуки`
  ],
  [
    'default value',
    `<b>&lt;input type="text" defaultValue={props.some} /&gt;</b> - этот пропс позволяет передать значение по умолчанию тем самым не заблокировав элемент для ввода`
  ],
  [
    'Состояние компонента',
    `По сути это объект в котором хранятся какие то данные. Если данные изменяются то компонент перерисовывается. Сам объект иммутабельный поэтому для его изменения вызывается специальный метод.<pre>
class Some extends Component {
constructor(props) {
  super(props);
  this.state = {
    value: 4
  }
  changeState = (arg) => {
    this.setState((state, arg) => ({value: state.value + arg}));
  }
}
}</pre>Создание состояние в классовом компоненте а также создание ф-ции для изменения состояния(вместо return можно просто обернуть весь блок кода {} в ())<pre>
const FuncComponent = () => {
const [data, setData] = useState([{}]);
function changeState(prop) {
  setData((data, prop) => {
    return [...data, {prop}];
  });
}
}</pre>Создание состояни в функциональном компоненте с помощью хука useState. Сначала с помощью деструктуризации создается переменная data(где хранится состояние) а также ф-ция для изменения, а в сам хук передается исходное значение состояния([{}]). По скольку состояние иммутабельно в ф-ции изменения state передается новый объект в виде объединения старого state и нового свойства<hr>
Если так случилось что у нас есть компонент с локальным состоянием и нам надо как то синхронизировать его с другим компонентом, возможно лучшее решение будет вынести состояние наверх к родительскому компоненту, чтобы был однонаправленный поток данных<hr>
При обновлении state на основе предыдущего значения в большинстве случаев достаточно просто положить в сеттер новое значение (a + 1). Но если необходимо за 1 рендеринг обновить несколько раз то лучшим решением будет использовать функцию апдейтер (a => a + 1). Если просто положить новое значение то при ререндеринге а во всех множественных вызывах будет иметь всегда одно значение, однако при использовании апдейтера все функции попадут в очередь вызова и при ререндеринге будут вызваны по очереди. Благодаря этому поведению state корректно обновиться так как и ожидалось<hr>
<b>const [count, setCount] = useState(() => +localStorage.getItem('count') || 0);</b> - при передаче начального состояния в хук также можно указать callback который будет возвращать результат. Полезно если состояние зависит от условия или его необходимо загрузить`
  ],
  [
    'Классовый компонент',
    `<pre>
const Some extends Component {
constructor(props) {
  super(props);
}
render() {
  const {someProp} = this.props;
  return (
    &lt;p&gt;{someProp}&lt;/p&gt;
  )
}
}</pre>Создание классового компонента. Наследует Component от библиотеки React.`
  ],
  [
    'Создание начальной точки приложения',
    `<pre>
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);</pre>Сначала создается начальная точка приложения в блоке с ID root, а затем в ней отрисовывается главный компонент.`
  ]
];
