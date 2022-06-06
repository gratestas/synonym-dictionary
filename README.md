# Synonym Dictionary
This dictionary validates whether two given queries are synonyms either by symmetric or transitive relations by implementing the *graph data structure* and *BFS algorithm.*

## Rules
Given queries are synonyms if
#### 1. Direct Eqaulity
pair of words passed as agruments are the same
```
a === b
```
#### 2. Symmetric relation
```
if a = b => b = a
```
#### 3. Transitive relation
```
if a = b && b = c  => a = c
```
#### 4. Case insensitive

## Graph
The graph structure is implemented using `adjacencyList` and `hash tables` to establish and track down complex relationships between different words.

* `vertices` represent an unordered key-based collection of nodes to be used for efficient comparison and check operations.
* `adjacencyList` contains a list of nodes that point to a separate list of nodes to which each one is connected. Used for quick lookup access.

## Dictionary
Dıctıonary inherits the `Graph` class. 
* Each word in the dictionary is a simple vertex (or node) that contains the word as its value. 
* Each added pair of words are connected by an edge in the graph.
* the bread-first search is implemented in `traverse` function.

A special `STATUS` enum property is used to keep track of wether a word in a list of neighbor words connected to the pointer word is visited or not. 
```javascript
STATUS = Object.freeze({
      VISITED: "visited",
      CURRENT: "current",
      UNVISITED: "unvisited",
      });
```       
During traversing the graph from left to right in each adjacency list,
* `unvisited`: all nodes are marked as *unvisited* by default
* `current`: each node is added to a queue and marked as *current*
* `visitied`: a node is marked as *visited* when all nodes in the adjacency list it references to are stored in the queue.

This prevents from visiting a node more than once.

## Output

## Test
