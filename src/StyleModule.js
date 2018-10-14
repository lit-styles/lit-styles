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
      return flatPartsWhichContainOtherModules.indexOf(part) === index;
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
        array.push(string);
        array.push(this.__values[index]);
        if (this.__values[index] instanceof StyleModule) {
          this.__containsStyleModules = true;
        }
        return array;
      }, []);
    this.__parts.push(this.__strings[this.__lastIndex]);
  }
}
