export default class StyleModule {
  constructor(strings, values) {
    this.__lastIndex = strings.length - 1;
    this.__strings = strings;
    this.__values = values;
    this.__cachePartsInfo();
  }

  toString() {
    const flatPartsWhichContainOtherModules = this.__getFlatPartsWhichContainOtherModules();
    const dedupedParts = flatPartsWhichContainOtherModules.filter((part, index) => {
      if (part instanceof StyleModule) {
        return flatPartsWhichContainOtherModules.indexOf(part) === index;
      }
      return true;
    });
    const allParts = dedupedParts.reduce((array, part) => {
      if (part instanceof StyleModule) {
        return [...array, ...part.__parts];
      }
      return [...array, part];
    }, []);
    return allParts.join('');
  }

  __getFlatPartsWhichContainOtherModules() {
    return this.__parts.reduce((array, part) => {
      if (part instanceof StyleModule && part.__containsStyleModules) {
        return [...array, ...part.__getFlatPartsWhichContainOtherModules()];
      }
      return [...array, part];
    }, []);
  }

  __cachePartsInfo() {
    this.__parts = this.__strings
      .slice(0, this.__lastIndex)
      .reduce((array, string, index) => {
        const value = this.__values[index];
        if (value instanceof StyleModule) {
          this.__containsStyleModules = true;
        } else if (isNotAllowedType(value)) {
          throw TypeError(
            `Type of the embedded value "${stringifyValue(value)}" `
            + 'is not one of the allowed: "string", "number" or another lit-css.',
          );
        }
        array.push(string);
        array.push(value);
        return array;
      }, []);
    this.__parts.push(this.__strings[this.__lastIndex]);
  }
}

function isNotAllowedType(value) {
  return (
    (typeof value !== 'string' && typeof value !== 'number')
    || value !== value /* NaN check */ // eslint-disable-line no-self-compare
  );
}

function stringifyValue(value) {
  let str;
  try {
    str = `${value}`;
  } catch (error) {
    // thanks to Symbol not being able to simply work with `${Symbol()}`
    str = value.toString();
  }
  return str;
}
