const { Graph } = require("./Graph");

class Dictionary extends Graph {
  constructor() {
    super();
    this.SYNONYMS = Object.freeze({ true: "synonyms", false: "different" });
    this.STATUS = Object.freeze({
      VISITED: "visited",
      CURRENT: "current",
      UNVISITED: "unvisited",
    });
  }

  addPair(word1, word2) {
    word1 = word1.toLowerCase();
    word2 = word2.toLowerCase();
    if (word1 !== word2) this.addEdge(word1, word2);
  }

  areSynonyms(query1, query2) {
    query1 = query1.toLowerCase();
    query2 = query2.toLowerCase();

    if (query1 === query2) return this.SYNONYMS.true;
    if (this._doesRelationExist(query1, query2)) return this.SYNONYMS.false;
    if (this._areSymmetric(query1, query2)) return this.SYNONYMS.true;
    if (this._areTransitive(query1, query2)) return this.SYNONYMS.true;

    return this.SYNONYMS.false;
  }

  _doesRelationExist(query1, query2) {
    return !this.adjacentList.has(query1) || !this.adjacentList.has(query2);
  }
  _areSymmetric(query1, query2) {
    return (
      this.adjacentList.get(query1)?.has(query2) ||
      this.adjacentList.get(query2)?.has(query1)
    );
  }

  _areTransitive(query1, query2) {
    let status = this._getVertices().reduce(
      (_status, _word) => ({ ..._status, [_word]: this.STATUS.UNVISITED }),
      {}
    );

    status = this._traverse(status, query1);

    return (
      status[query1] === this.STATUS.VISITED &&
      status[query2] === this.STATUS.VISITED
    );
  }

  _traverse(statusMap, from) {
    let queue = [];
    queue.push(from);

    while (queue.length) {
      const currentWord = queue.shift();
      const linkedWords = this._getAdjacentList();
      statusMap[currentWord] = this.STATUS.CURRENT;

      for (let word of linkedWords[currentWord]) {
        if (statusMap[word] === this.STATUS.UNVISITED) {
          statusMap[currentWord] = this.STATUS.CURRENT;
          queue.push(word);
        }
      }

      statusMap[currentWord] = this.STATUS.VISITED;
    }
    return statusMap;
  }
}

module.exports = { Dictionary };
