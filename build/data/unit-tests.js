/* eslint-disable camelcase */
/* eslint-disable quotes */
const Unit_Tests = [
  [
    `Создание моковых данных`,
    `<pre>
const fakeSomeData = () => ({
name: name.title(),
age: number.random(),
keywords: Array.from(3).fill(null).map(item => {
  return words.word();
})
});</pre>Функция генератор моковых данных по аналогу каких то данных, возвращает объект. Для получения значений полей используется библиотека faker`
  ],
  [
    `Имитация fetch API`,
    `<pre>
jest.stubGlobal('fetch', (url, options) => new Promise((res, rej) => {
  res({
    ok: true,
    json() {
      return new Promise((r, _) => r(someObject));
    }
  });
}));</pre>Простая имитация функции fetch, где обязательно указываем статус в виде ok свойства а также заменяем метод json`
  ],
  [
    `Тестирование хука`,
    `<pre>
it('should return array with 2 elements', () => {
  const {result} = renderHook(() => useSomeHook(someData));     <sup>1</sup>
  const [data, setData] = result.current;         <sup>2</sup>
  expect(result.current).toBeLength(2);       <sup>3</sup>
  expect(data).toBeInstanceOf(Array);         <sup>4</sup>
  expect(setData).toBeInstanceOf(Function);
});</pre>
1) чтобы проверить хук его сначала нужно как бы отрендерить. Если хук принимает какие то данные то используем callback<br>
2) все что возвращает хук содержится в свойстве current объекта result<br>
3) проверяем что масси current содержит 2 элемента<br>
4) проверяем что переменные из хука являются нужными нам сущностями`
  ],
  [
    `Тестирование Private Route`,
    `<pre>
const mockStore = configureMockStore();
const history = createMemoryHistory();
it('should render public route when authStatus is not auth', () => {
  const store = mockStore({
    USER: { authStatus: 'unknown' }
  });
  history.push('/private');
  render(
    &lt;Provider store={store}&gt;
      &lt;HistoryRouter history={history}&gt;
        &lt;Routes&gt;          <sup>1</sup>
          &lt;Route path='/login' element={&lt;p&gt;public&lt;/p&gt;} /&gt;
          &lt;Route path='/private' element={
            &lt;PrivateRoute&gt;
              &lt;p&gt;private&lt;/p&gt;
            &lt;/PrivateRoute&gt;
          } /&gt;
        &lt;Routes /&gt;
      &lt;HistoryRouter /&gt;
    &lt;Provider /&gt;
  );
  expect(screen.getByText(/public/i)).toBeInTheDocument();
  expect(screen.queryByText(/private/i)).not.toBeInTheDocument();     <sup>2</sup>
});</pre>
Для проверки PrivateRoute стоит написать несколько тестов с разным значением authStatus в данном примере<br>
1) описываем каждый роут где в место целевого элемента достаточно указать моковые данные<br>
2) если необходимо проверить отсутствие какого то элемента то следует использовать метод queryBy... потому что в случае если элемент не будет найден он вернет null, а метод getBy... выбрасывает ошибку`
  ],
  [
    `Тестирование маршрутизации`,
    `<pre>
const mockStore = configureMockStore();
const store = mockStore({     <sup>1</sup>
  USER: { authStatus: 'auth' },
  DATA: { isDataLoaded: false }
});
const history = createMemoryHistory();
const fakeApp = (       <sup>2</sup>
  &lt;Provider store={store}&gt;
    &lt;HistoryRouter history={history}&gt;
      &lt;App /&gt;
    &lt;HistoryRouter /&gt;
  &lt;Provider /&gt;
);
it('should render main page when user navigate to "/"', () => {
  history.push('/');      <sup>3</sup>
  render(fakeApp);
  expect(screen.getByText(/Main page/i)).toBeInTheDocument();       <sup>4</sup>
});</pre>
1) конфигурируем моковый store указав необходимые начальные данные для компонента<br>
2) указываем начальную разметку в переменную чтобы легче было использовать в последующих тестах<br>
3) для каждого роута проверяем наличие конкретных элементов в результате рендера`
  ],
  [
    `Тестирование компонента`,
    `<pre>
it('should render correctly', () => {
  const history = createMemoryHistory();    <sup>1</sup>
  render(           <sup>2</sup>
    &lt;HistoryRouter history={history}&gt;
      &lt;NotFoundComponent /&gt;
    &lt;/HistoryRouter&gt;
  );
  const header = screen.getByText('404');     <sup>3</sup>
  expect(header).toBeInTheDocument();       <sup>4</sup>
});</pre>
1) создаем фейковый history если компонент взаимодействует с HistoryRouter(Link)<br>
2) фунция render отрисовывает переданную разметку<br>
3) объект screen позволяет взаимодействовать с результатом рендера как если бы это был экран приложения. Там мы ищем переданный текст и сохраняем в переменную<br>
4) проверяем находится ли сохраненный элемент в DOM<pre>
it('should render AuthScreen when user navigate to /login', async () => {
  const mockStore = configureMockStore();     <sup>1</sup>
  const history = createMemoryHistory();
  history.push('/login');         <sup>2</sup>
  render(
    &lt;Provider store={mockStore}&gt;
      &lt;HistoryRouter history={history}&gt;
        &lt;AuthScreen /&gt;
      &lt;HistoryRouter /&gt;
    &lt;/Provider&gt;
  );
  expect(screen.getByLabelText(/Логин/i)).toBeInTheDocument;      <sup>3</sup>
  await userEvent.type(screen.getByTestID('login'), 'test');      <sup>4</sup>
  expect(screen.getByDisplayValue(/test/i)).toBeInTheDocument;    <sup>5</sup>
});</pre>
1) если компонент использует глобальное состояние то делаем моковый store<br>
2) имитируем переход в history по другому адресу<br>
3) проверяем находится ли в DOM элемент с label текстом<br>
4) имитируем с помощью библиотеки userEvent ввод данных в поле где<br>
-- 1 аргумент элемент с которым взаимодействуем (поиск происходит по дата атрибуту - data-testid="login")<br>
-- 2 аргумент значение<br>
5) с помощью метода getByDisplayValue результата рендера проверяем были ли введены указаные данные`
  ],
  [
    `Тестирование функционала с DOM API`,
    `<pre>
const htmlPath = path.join(process.cwd(), 'index.html');      <sup>1</sup>
const htmlContent = fs.readFileSync(htmlPath).toString();     <sup>2</sup>
const window = new Window();          <sup>3</sup>
const document = window.document;         <sup>4</sup>
document.write(htmlContent);        <sup>5</sup>
jest.stubGlobal('document', document);      <sup>6</sup></pre>
1) создаем переменную которая содержит путь к нужному html файлу по которому будет строиться VDOM<br>
2) считываем контент<br>
3) создаем новый экземпляр Window предоставленный библиотекой тестирования<br>
4) создаем переменную которая будет ссылаться на фейковый экземпляр DOM<br>
5) заполняем контентом<br>
6) с помощью специального метода мокаем глобальный API
7) не забыть в настройке скриптов теста указать флаг --jsdom(jest)/--happy-dom(vitest)`
  ],
  [
    `Общий принцип описания тестов`,
    `<pre>
describe('Function: add', () => {
  it('should return 4 when args = 2 and 2', () => {
    const a = 2;
    const b = 3;

    const result = add(a, b);

    const expected = a + b;
    expect(result).toBe(expected);
  });
});</pre>Сначала описывается общее описание в ф-ции describe. Далее внутри для каждой ситуации описывается метод it, где внутри сначала идет описание ф-ции а в теле callback описывается какая то логика. Метод expect принимает проверяемую ф-цию или данные а после вызывается 1 из методов для проверки результатов<br>
Хорошим тоном является использование паттерна AAA. Где сначала (arrange) определяем начальные данные, затем (act) - получение результата проверяемой функции и после (assert) утверждение, где сначала определяем данные которые должны быть получены а затем в expect передаем данные из act и assert. Сама функция expect в случае если результат и ожидаемое значение не равны выбрасывает ошибку`
  ],
  [
    `Методы expect()`,
    `<b>.toBe(x)</b> - проверяет что полученный результат равен x<br>
    <b>.toEqual({some: 0, another: 'test'})</b> - сравнивает объекты<br>
    <b>.not.a</b> - not позволяет указать что ожидаемое значение не должно быть чем то что указано в а<br>
    <b>.toThrow(х)</b> - указывает что полученный результат должен быть ошибкой. Также можно указать регулярное выражение с текстом ошибки в качестве х аргумента<br>
    <b>.toBeDefined()</b> - указывает что полученное значение должно быть !== undefined<br>
    <b>.toHaveProperty(x)</b> - проверяет наличие свойства у проверяемого объекта где х - имя свойства<br>
    <b>.toBeCalled()</b> - проверяет была ли вызвана проверяемая функция<br>
    <b>.toBeCalledTimes(x)</b> - проверяет сколько раз была вызвана проверяемая функция где х количество<br>
    <b>.toBeCalledWith('test')</b> - проверяет с какими аргументами была вызвана функция<br>
    <b>.toBeInstanceOf(x)</b> - проверка прототипа<br>
    <b>.toBeInTheDocument()</b> - проверяет наличие какого то элемента в DOM<br>
    <b>.toBeLength(x)</b> - проверяет на количество элементов в массиве где х - число<br>
    <b>.toBeInstanceOf(x)</b> - сверяет тип проверяемой переменной с указаной сущностью`
  ],
  [
    `Тестирование reducer`,
    `<pre>
describe('someReducer', () => {
  it('should return init state', () => {
    const init = {count: 0};
    const result = someReducer.reducer(undefined, {type: 'incorrect_action'});
    expect(result).toEqual(init);
  });
  it('should reset state', () => {
    const init = {count: 4};
    const result = someReducer.reducer(init, reset());
    expect(result).toEqual({count: 0});
  });
  it('should change count value', () => {
    const init = {count: 0};
    const result = someReducer.reduce(init, change(4));
    expect(result).toEqual({count: 4});
  });
});</pre>Тестирование редюсера с обычными синхронными action<pre>
it('shoud return authStatus === 'auth', () => {
  const init = {authStatus: 'unknown'};
  const result = authReducer.reducer(init, loginAction.fullfilled);
  expect(result).toEqual({authStatus: 'auth'});
});</pre>Тестирование редюсера с асинхронным action. В данном случае проверяется если action прошел успешно<pre>
const api = createAPI();      <sup>1</sup>
const mockAPI = new MockAdapter(api);         <sup>2</sup>
const middlewares = [thunk.withExtraArguments(api)];        <sup>3</sup>
const mockStore = configureMockStore(middlewares);        <sup>4</sup>
it('should dispatch requiredAuth and redirectTo ', async () => {
  const fakeUser = {login: 'test@gmail.com', pass: '12345'};        <sup>5</sup>
  mockAPI.onPost('/login').reply(200, {token: 'secret'});         <sup>6</sup>
  const store = mockStore();                <sup>7</sup>
  Storage.prototype.setItem = jest.fn();              <sup>8</sup>
  await store.dispatch(loginAction(fakeUser));            <sup>9</sup>
  const actions = store.getActions().map(({type}) => type);         <sup>10</sup>
  expect(actions).toEqual([
    loginAction.pending.type, redirectToRoute.type, loginAction.fullfilled.type         <sup>11</sup>
  ]);
  expect(Storage.prototype.setItem).toBeCalledTimes(1);           <sup>12</sup>
  expect(Storage.prototype.setItem).toBeCalledWith('token_name', 'secret');         <sup>13</sup>
});</pre>
1) создаем экземпляр API<br>
2) создаем моковый адаптер для api для имитации запросов на сервер<br>
3) создаем массив с middleware где указываем thunk с нашим api<br>
4) конфигурируем моковый стор<br>
5) создаем фейковые данные для отправки на сервер<br>
6) ???<br>
7) создаем экземпляр store<br>
8) по скольку в обработчике action используется браузерный API для работы с localStorage а nodejs не знает что это такое, то мы просто заменяем нужный метод моковым пустым методом<br>
9) диспатчим action<br>
10) получаем массив всех выполненных action забирая только поле type<br>
11) проверяем полученный результат со своим, где порядок вызовов action важен<br>
12) проверяем был ли вызван метод взаимодействия с localStorage<br>
13) проверяем с какими аргументами был вызван метод`
  ],
  [
    `Тестирование асинхронных функций`,
    `<b>Обычный callback</b><pre>
it('...', (done) => {       <sup>1</sup>
  someFetch((err, data) => {
    if(err) {
      done(err);        <sup>2</sup>
      return;
    }
    try {
      expect(data).toBe('some');      <sup>3</sup>
      done();
    } catch(e) {
      done(e);          <sup>4</sup>
    }
  });
});</pre>
1) сначала передаем в callback теста функцию которая будет своего рода маркером когда тест считается завершенным. В противном случае асинхронная функция просто вызовется не дожидаясь результата и начнется следующий тест<br>
2) если в результате запроса произошла ошибка передаем ее в функцию маркер<br>
3) т.к. в случае если утверждение неверно expect выкидывает ошибку то оборачиваем assert в блок try/catch для нормального логирования ошибки<br>
4) в случае успешного утверждения вызываем ф-цию маркер без аргументов, в противном случае вызываем ее уже с аргументом в виде ошибки в блоке catch<br>
<b>Асинхронность с промисами</b><pre>
it('...', async () => {
  const data = await someFetch(x);    <sup>1</sup>
  expect(data).toBe('some');
  expect(someFetch(x)).resolves.toBe('some');       <sup>2</sup>
  expect(someFetch(y)).rejects.toMatch('error');
});</pre>
1) в случае с промисами можно использовать привычный async/await<br>
2) также есть 2 вариант использования передав вызов функции в expect и вызвав затем resolves/rejects а после определенный метод проверки полученных данных. Такая конструкция также позволит дождаться выполнения промиса`
  ],
  [
    `Проверка на исключение`,
    `<pre>
it('should throw an error', () => {
  const resultFn = () => someFunc();
  expect(resultFn).toThrow(х);
});</pre>Предположим что мы тестируем функцию в которую необходимо передать аргумент. В тесте мы ожидаем получить ошибку т.к. хотим вызвать ее без аргумента. Для этого необходимо как то записать результат в переменную, поэтому используем callback. В expect передаем ссылку на callback который будет запущен во время теста а в качестве ожидаемого значения указываем ошибку. Также можно передать необязательный аргумент х - который будет являться регулярным выражением с текстовым описанием ошибки`
  ],
  [
    `Хуки`,
    `Существует 4 хука которые помогают установить начальные данные до или после теста. <b>beforeAll/beforeEach/afterAll/afterEach</b> - функции которые принимают callback в теле которых описывается определенная логика которая применяется до или после теста<pre>
const someData = {};
beforeEach(() => {
  someData.test = '';
});</pre>Например здесь мы указываем что перед каждым тестом хотим очистить поле test объекта someData`
  ],
  [
    `Тестирование вложенных функций`,
    `Чтобы протестировать вложенные/переданные функции без стороннит эффектов можно заменить их специальными моковыми функциями (spy replace approach)<pre>
it('...', () => {
  const logger = jest.fn();     // vi.fn() - в случае с vitest
  someFn(logger);
  expect(logger).toBeCalled();
});</pre>В данном примере используется заглушка в виде пустой функции чтобы не создавать побочных эффектов. Также .fn() функция может принимать callback в котором можно описать определенную логику в случае необходимости<pre>
import someFn from 'somewhere';
it('..', () => {
  someFn.mockImplementation(() => 1);
  expect(someFn()).toBe(1);
});</pre>Есть 2 способ замены функции, применив на импортирумой функции метод mockImplementation где мы можем указать свою логику передав callback`
  ],
  [
    `Тесты с использованием сторонних библиотек`,
    `Чтобы провести тесты функций в которых используются сторонние или встроенные библиотеки без side эффектов можно замокать целую библиотеку<br>
    <b>jest.mock('fs', x);</b> - 1 аргументом передаем имя библиотеки, 2 аргумент не обязательный. По умполчанию заменяет все методы библиотеки на пустые функции. Но также можем изменить логику указав callback<pre>
    jest.mock('fs', () => ({
      default: {
        fileWrite: (...arr) => arr.at(-1)
      }
    })</pre>В данном примере создаем заглушку для библиотеки fs из node.js и переписываем логику метода fileWrite. Если модуль экспортируется по дефолту то в возвращаемом объекте callback указываем свойство default. Таким образом в файле где описана такая заглушка все тесты где в функциях используется fs модуль будет автоматически заменен на заглушку<hr>
    Также можно вынести логику заглушки в отдельную папку __mock__ на одном уровне в node_modules. Для этого нужно создать в этой папке файл с именем заменяемой библиотеки и поместить логику в него. После этого в тестах достаточно просто указать что мы хотим замокать определенную библиотеку и тестер сам определит каким образом это сделать`
  ],
  [
    `Параллельное выполнение тестов`,
    `По умолчанию описанные тесты с помощью describe/it выполняются поочередно. Но если сначала вызвать метод .concurrent на одном из них, это будет являться маркером что тест должен выполняться параллельно с другими<br>
    Например - <b>it.concurrent('...', () => {});</b>`
  ],
  [
    `Тест своих middleware`,
    `<pre>
const fakeHistory = {     <sup>1</sup>
  location: {pathname: ''},
  push(path) {
    this.location.pathname = path;
  }
};
_jest.mock('URL', () => fakeHistory);   <sup>2</sup>

const middlewares = [redirect];     <sup>3</sup>
const mockStore = configureMockStore(middlewares);
const store = mockStore();

describe('middleware - redirect', () => {
  beforeEach(() => {      <sup>4</sup>
    fakeHistory.push('');
  });
  it('should be redirect to /login', () => {
    store.dispatch(redirectToRoute('/login'));
    expect(fakeHistory.location.pathname).toBe('/login);    <sup>5</sup>
    expect(store.getActions()).toEqual([redirectToRoute['/login']]);    <sup>6</sup>
  });
});
</pre>1)Создаем имитацию browserHistory который не может быть вызван в node.js. По сути просто объект с свойством и методом для его обновления<br>
2)Переключатель используется когда тестовая ф-ция обращается к какой то импортируемой сущности которая не может быть вызвана вместо нее будет вызвана имитация. В 1 аргументе принимает путь импортируемой сущности во 2 callback которая вернет имитацию<br>
3)Создаем моковый store в который передаем массив с middleware и далее создаем экземпляр этого store<br>
4)Ф-ция позволяет перед каждым вызовом it произвести какую то операцию. В нашем случае очистить историю<br>
5)Проверяем изменился ли путь<br>
6)Проверяем какой action был вызван<br>
В самом тесте мы сначала диспатчим action с редиректом передав путь а затем проверяем сначала на то изменилось ли поле нашего fakeHistory и был ли вызван dispatch вообще`
  ],
];
