let startRegex = /^( +)?\n( +)?/;
let columnSeparatorRegex = /( +)?\|-+\|/;

type funk = (...args: any[]) => void;

type Value = string | number | funk | any;
export type Row = Value[]

export function getAllRows(strs, ...js): Row[] {
  let strings: string[] = [...strs];
  strings[0] = strs[0].replace(startRegex, '');
  strings = strings.map(str => str.replace(columnSeparatorRegex, ''));

  let mappedStringsAndJs = strings
    .reduce((acc, s, i) => {
      if (i < js.length) {
        return acc.concat([s, js[i]]);
      }
      return acc.concat(s);
    }, [])
    .reduce((acc, s) => {
      if (typeof s === 'string') {
        return acc.concat(s.split('\n'));
      }
      return acc.concat(s);
    }, [])
    .map(e => typeof e === "string" ? e.trim() : e)
    .filter(e => e);

  const tableColumnLength = strings.join('').split('\n')[0].split('|').slice(1, -1).length;

  let collector = [];
  let cache = [];

  for (let i = 0; i < mappedStringsAndJs.length; i++) {
    let item = mappedStringsAndJs[i];

    if (typeof item === "string") {
      let split = item.trim().split('|').filter(e => e);
      let nColumns = split.length;
      if (nColumns === tableColumnLength) {
        collector.push(split);
      } else {
        cache = cache.concat(split);
        if (cache.length === tableColumnLength) {
          collector.push(cache);
          cache = [];
        }
      }
    } else {
      cache = cache.concat(item);
    }
  }

  const finalTable = collector.map(row => {
    return row.map(item => {
      if (typeof item === 'string') {
        let s = item.trim();
        return s ? s : undefined;
      }
      return item;
    })
  });
  if(finalTable.length < 2) {
    throw new Error('Not correctly formatted table.');
  }
  return finalTable;
}
