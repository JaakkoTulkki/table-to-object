import {getAllRows, Row} from "./template";

class Table {
    constructor(private table: Row[]) {
    }

    get columns(): Row {
        return this.table[0];
    }

    get rows(): any[] {
        return this.table.slice(1).map((row: Row) => {
            return row.reduce((acc, item, index) => {
                const header = this.columns[index];
                acc[header] = item;
                return acc;
            }, {})
        });
    }
}

export function transform(strs, ...js) {
    const rows = getAllRows(strs, ...js);
    return new Table(rows);
}