import {transform} from "./table-to-object";

describe('tableToObject', function () {
    describe('with valid table', function () {
        let rows;
        let rowsNoSeparator;
        function randomFunction () {

        }

        beforeEach(() => {
            rows = transform`
    | name  | ${'value'}   | wow | hi    |
    |-----------------------------------------|
    | hello | ${4}         |     | there |
    | e     |              |     | there |
    | f     |              |     | ${randomFunction} |
    `;

            rowsNoSeparator = transform`
    | name  | ${'value'}   | wow | hi    |
    | hello | ${4}         |     | there |
    | e     |              |     | there |
    | f     |              |     | ${randomFunction} |
    `;
        });

        it('should return an object with columns', function () {
            const expected = ['name', 'value', 'wow', 'hi'];
            expect(rows.columns).toEqual(expected);
            expect(rowsNoSeparator.columns).toEqual(expected);
        });

        it('should return an object with rows', function () {
            const expected = [
                {name: 'hello', value: 4, wow: undefined, hi: 'there'},
                {name: 'e', value: undefined, wow: undefined, hi: 'there'},
                {name: 'f', value: undefined, wow: undefined, hi: randomFunction,},
            ];
            expect(rows.rows).toEqual(expected);
            expect(rowsNoSeparator.rows).toEqual(expected);
        });
    });

    describe('with invalid table', function () {
        it('should throw an error', function () {
            const createRows = () => transform`not proper table|woww|
             what|
            `;
            expect(createRows).toThrow('Not correctly formatted table');
        });
    });
});