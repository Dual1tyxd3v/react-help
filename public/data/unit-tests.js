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
    `Общий принцип описания тестов`,
    `<pre>
describe('Function: add', () => {
  it('should return 4 when args = 2 and 2', () => {
    const a = 2;
    expect(add(2, 2)).toBe(4);
  });
});</pre>Сначала описывается общее описание в ф-ции describe. Далее внутри для каждой ситуации описывается метод it, где внутри сначала идет описание ф-ции а в теле callback описывается какая то логика. Метод expect принимает проверяемую ф-цию или данные а после вызывается 1 из методов для проверки результатов`
  ],
  [
    `Методы expect()`,
    `<b>.toBe(x)</b> - проверяет что полученный результат равен x<br>
    <b>.toEqual({some: 0, another: 'test'})</b> - сравнивает объекты<br>`
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
    expect(fakeHistory.location.pathname).toBe('/login);
    expect(store.getActions()).toEqual([redirectToRoute['/login']]);
  });
});
</pre>1)Создаем имитацию browserHistory который не может быть вызван в node.js. По сути просто объект с свойством и методом для его обновления<br>
2)Переключатель используется когда тестовая ф-ция обращается к какой то импортируемой сущности которая не может быть вызвана вместо нее будет вызвана имитация. В 1 аргументе принимает путь импортируемой сущности во 2 callback которая вернет имитацию<br>
3)Создаем моковый store в который передаем массив с middleware и далее создаем экземпляр этого store<br>
4)Ф-ция позволяет перед каждым вызовом it произвести какую то операцию. В нашем случае очистить историю<br>
В самом тесте мы сначала диспатчим action с редиректом передав путь а затем проверяем сначала на то изменилось ли поле нашего fakeHistory и был ли вызван dispatch вообще`
  ],
];
