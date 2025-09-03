import { Component, xml } from "@odoo/owl";

export class TodoItem extends Component {
  static template = xml`
        <div class="border p-2">
            <div class="border p-2 d-flex gap-2">
                <input 
                  type="checkbox" 
                  t-att-checked="props.todo.isCompleted" 
                  t-on-change="()=>props.toggleState(props.todo.id)"
                />
                <p class="m-0" t-att-class="props.todo.isCompleted ? 'text-decoration-line-through text-muted': ''">
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
    toggleState: Function
  };
}
