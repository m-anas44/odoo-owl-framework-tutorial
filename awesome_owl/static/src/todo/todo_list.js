import { Component, xml, useState } from "@odoo/owl";
import { TodoItem } from "./todo_item";

export class TodoList extends Component {
  static template = xml`
        <div class="bg-light mx-2">
            <t t-foreach="todos" t-as="todo" t-key="todo.id">
                <TodoItem todo="todo"/>
            </t>
        </div>
    `;
  static components = { TodoItem };
  setup() {
    this.todos = useState([
      { id: 1, description: "buy milk", isCompleted: false },
      { id: 2, description: "learn Owl", isCompleted: true },
      { id: 3, description: "write code", isCompleted: false },
    ]);
  }
}
