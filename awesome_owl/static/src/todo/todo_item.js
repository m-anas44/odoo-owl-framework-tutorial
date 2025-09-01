import { Component, xml } from "@odoo/owl";

export class TodoItem extends Component {
  static template = xml`
        <div class="border p-2">
            <div class="border p-2">
                <p t-att-class="props.todo.isCompleted ? 'text-decoration-line-through text-muted': ''">
                    <t t-esc="props.todo.id"/>. <t t-esc="props.todo.description"/>
                </p>
            </div>
        </div>
    `;
  static props = {
    todo: {
      type: Object,
      shape: { id: Number, description: String, isCompleted: Boolean },
    },
  };
}
