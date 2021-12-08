class Node {
  constructor(value) {
    this.value = value;
    this.prev = null;
    this.next = null;
  }
}
class DoublyLinkedList {
  constructor() {
    this.cabeza = null;
    this.cola = null;
    this.length = 0;
  }

  push(val) {
    const newNode = new Node(val);
    if (!this.cabeza) {
      this.cabeza = newNode;
      this.cola = newNode;
    } else {
      this.cola.next = newNode;
      newNode.prev = this.cola;
      this.cola = newNode;
    }
    this.length++;
    return this;
  }

  pop() {
    //En caso de lista vacia
    if (this.length === 0) {
      return false;
    }
    //Obtener nodo
    const popped = this.cola;
    //guardar newTail en una variable (podría ser nulo)
    const newTail = this.cola.prev;
    //Si newTail no es nulo
    if (newTail) {
      //cortar la conexión al nodo emergente
      newTail.next = null;
      //cortar la conexión del nodo emergente
      this.cola.prev = null;
      //en caso de 1 lista de longitud
    } else {
      //Asegúrese de editar la cabeza en caso de que newTail sea nulo
      this.cabeza = null;
    }
    //asignar nueva cola (podría ser nulo)
    this.cola = newTail;
    // restar longitud
    this.length--;

    return popped;
  }

  shift() {
    //en caso de que la lista esté vacía
    if (!this.cabeza) {
      return false;
    }
    //guardar el nodo desplazado a la variable
    const shiftedNode = this.cabeza;
    //hacer que la nueva cabeza sea la siguiente (podría ser nula)
    const newHead = this.cabeza.next; //Podría ser nula
    //si la lista es más de 1
    if (this.cabeza !== this.cola) {
      newHead.prev = null;
      shiftedNode.next = null;
    } else {
      this.cola = null;
    }
    this.cabeza = newHead;
    this.length--;
    return shiftedNode;
  }

  unshift(val) {
    const newNode = new Node(val);
    if (!this.cabeza) {
      this.cabeza = newNode;
      this.cola = newNode;
    } else {
      this.cabeza.prev = newNode;
      newNode.next = this.cabeza;
      this.cabeza = newNode;
    }
    this.length++;
    return this;
  }

  insertAtIndex(index, val) {
    //si el índice no existe
    if (index > this.length) {
      return false;
    }
    if (index === 0) {
      this.unshift(val);
    } else if (index === this.length) {
      this.push(val);
    } else {
      const newNode = new Node(val);
      const after = this.accessAtIndex(index);
      const before = after.prev;
      after.prev = newNode;
      before.next = newNode;
      newNode.next = after;
      newNode.prev = before;
      this.length++;
    }
    return this;
  }

  removeAtIndex(index) {
    let removedNode;
    if (index >= this.length) {
      return false;
    }
    if (index == 0) {
      removedNode = this.shift();
    } else if (index == this.length - 1) {
      removedNode = this.pop();
    } else {
      removedNode = this.getNodeAtIndex(index);
      const after = removedNode.next;
      const before = removedNode.prev;
      removedNode.next = null;
      removedNode.prev = null;
      before.next = after;
      after.prev = before;
      this.length--;
    }
    return removedNode;
  }

  getNodeAtIndex(index) {
    if (index >= this.length || index < 0) {
      return false;
    }
    let currentIndex = 0;
    let currentNode = this.cabeza;
    while (currentIndex !== index) {
      currentNode = currentNode.next;
      currentIndex++;
    }
    return currentNode;
  }

  setNodeAtIndex(index, val) {
    const foundNode = this.getNodeAtIndex(index)
    if(foundNode){
        foundNode.value = val
        return foundNode;
    }
    return null;
  }
  
  printList() {
    console.log(list)
    if(this.cabeza){
      let current = this.cabeza;
      while (current.next) {
        console.log(current);
        current = current.next;
      }
      console.log(current);
    } else {
      console.log("empty list")
    }
  }
}