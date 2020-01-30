import {getAllRows} from './template';

describe('TableTransformer', function () {
    it('should returns rows if properly formatted with line breaks', function () {
        function someFunction() {

        }

        const value = 'value';
        const rows = getAllRows`
    | name  | ${value} | wow |
    | hello | ${4} | wott |
    | c | 9 | right |
    | ${3} | ${someFunction} | kana |
  `;
        expect(rows).toEqual([
            ['name', 'value', 'wow'],
            ['hello', 4, 'wott'],
            ['c', '9', 'right'],
            [3, someFunction, 'kana'],
        ])
    });

    it('should work with --- separated columns', function () {
        const value = 'hi';
        const someFunction = () => 8;
        const rows = getAllRows`
    | name  | ${value} | wow |
    |------------------------|
    | hello | ${4} | wott |
    | c | 9 | right |
    | ${3} | ${someFunction} | kana |
  `;

        expect(rows).toEqual([
            ['name', value, 'wow'],
            ['hello', 4, 'wott'],
            ['c', '9', 'right'],
            [3, someFunction, 'kana'],
        ])
    });


    it('should return rows if properly formatted with ends without line breaks', function () {
        function someFunction() {

        }

        const value = 'value';
        const rows = getAllRows`| name  | ${value} | wow |
    | hello | ${4} | wott |
    | c | 9 | right |
    | ${3} | ${someFunction} | kana |`;

        expect(rows).toEqual([
            ['name', 'value', 'wow'],
            ['hello', 4, 'wott'],
            ['c', '9', 'right'],
            [3, someFunction, 'kana'],
        ])
    });

    it('should return rows if properly formatted with ends without line breaks and bizarre row separator', function () {
        function someFunction() {

        }

        const value = 'value';
        const rows = getAllRows`| name  | ${value} | wow | |------|
    | hello | ${4} | wott |
    | c | 9 | right |
    | ${3} | ${someFunction} | kana |`;

        expect(rows).toEqual([
            ['name', 'value', 'wow'],
            ['hello', 4, 'wott'],
            ['c', '9', 'right'],
            [3, someFunction, 'kana'],
        ])
    });

    it('should return rows with column values set to empty values', function () {
        let rows = getAllRows`
    | name  | value | type |
    | a     | world |      |
    | b     | ${2}  |      |
    | c     | ${3}  |      |
    `;
        expect(rows).toEqual([
            ['name', 'value', 'type'],
            ['a', 'world', undefined],
            ['b', 2, undefined],
            ['c', 3, undefined],
        ]);

        rows = getAllRows`
    | name  | ${'value'}   | wow | hi    |
    |-----------------------------------------|
    | hello | ${4}         |     | there |
    | e     |              |     | there |
    `;


        expect(rows).toEqual([
            ['name', 'value', 'wow', 'hi'],
            ['hello', 4, undefined, 'there'],
            ['e', undefined, undefined, 'there'],
        ]);
    });

    it('should throw an Error if the table is not correctly formatted', function () {
        const make = () => getAllRows`|blaa|`;
        expect(make).toThrow('Not correctly formatted table.');
    });

    it('should throw an error if columns and row lengths don\'t mactch', function () {
        const make = () => getAllRows`
        |one|two|
        | 1 `;
        expect(make).toThrow('Not correctly formatted table.');
    });
});