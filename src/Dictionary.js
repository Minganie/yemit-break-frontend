class Dictionary extends Object {
  constructor(array) {
    super();
    this.dic = {};
    for (const el of array) {
      this.dic[el._id] = el;
    }
  }
}

Dictionary.prototype.filter = function (fn) {
  return Object.values(this.dic).filter(fn);
};
Dictionary.prototype.map = function (fn) {
  return Object.values(this.dic).map(fn);
};
Dictionary.prototype.values = function () {
  return Object.values(this.dic);
};
Dictionary.prototype.find = function (fn) {
  return Object.values(this.dic).find(fn);
};
Dictionary.prototype.clone = function () {
  return new Dictionary(Object.values(this.dic));
};
Dictionary.prototype.upsert = function (el) {
  this.dic[el._id] = el;
};

export default Dictionary;
