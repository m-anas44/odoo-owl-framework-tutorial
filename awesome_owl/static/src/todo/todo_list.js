import { Component, xml, useState, useRef, onMounted } from "@odoo/owl";
import { TodoItem } from "./todo_item";
import { useAutofocus } from "../utils";

export class TodoList extends Component {
  static template = xml`
        <div class="bg-light mx-2">
            <div class="py-2">
                <input 
                  t-ref="todoInput"
                  t-on-keyup="addTodo"
                  placeholder="Enter a new task." 
                  class="form-control d-inline w-75"
                />
            </div>
            <t t-foreach="todos" t-as="todo" t-key="todo.id">
                <TodoItem todo="todo" toggleState="toggleState"/>
            </t>
        </div>
    `;
  static components = { TodoItem };
  setup() {
    this.todos = useState([]);
    this.toggleState = this.toggleState.bind(this)
    this.nextId = 1;
    this.refFocusInput = useAutofocus("todoInput");
  }

  addTodo(ev) {
    if (ev.keyCode === 13) {
      const inputEl = ev.target;
      const value = inputEl.value.trim();

      if (value) {
        this.todos.push({
          id: this.nextId++,
          description: value,
          isCompleted: false,
        });
        inputEl.value = "";
      }
    }
  }

  toggleState(id) {
    const todo = this.todos.find((t) => t.id === id);
    if (todo) {
      todo.isCompleted = !todo.isCompleted;
    }
  }
}
