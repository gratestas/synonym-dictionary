class Graph {
  constructor() {
    this.vertices = new Set();
    this.adjacentList = new Map();

    this.SYNONYMS = Object.freeze({ true: "synonyms", false: "different" });
    this.STATUS = Object.freeze({
      VISITED: "visited",
      CURRENT: "current",
      UNVISITED: "unvisited",
    });
  }

  addVertex(vertex) {
    if (!this.vertices.has(vertex) && vertex !== null && vertex !== undefined) {
      this.vertices.add(vertex);
      this.adjacentList.set(vertex, new Set());
    }
  }

  addEdge(vertex1, vertex2) {
    if (
      vertex1 !== null &&
      vertex2 !== null &&
      vertex1.toLowerCase() !== vertex2.toLowerCase()
    ) {
      vertex1 = vertex1.toLowerCase();
      vertex2 = vertex2.toLowerCase();
      this.addVertex(vertex1);
      this.addVertex(vertex2);

      this.adjacentList.get(vertex1).add(vertex2);
      this.adjacentList.get(vertex2).add(vertex1);
    }
  }

  _getVertices() {
    return Array.from(this.vertices);
  }

  _getAdjacentList() {
    const list = {};
    this.adjacentList.forEach((value, key) => {
      list[key] = Array.from(value);
    });
    return list;
  }
}

module.exports = { Graph };
