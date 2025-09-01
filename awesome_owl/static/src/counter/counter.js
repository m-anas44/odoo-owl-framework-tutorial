import { Component, xml } from "@odoo/owl";

export class Counter extends Component {
  static template = xml`
        <p class="d-flex gap-2 align-items-center border p-2 m-0">
                <span class="p-1">
                    Counter:
                    <t t-esc="props.value"/>
                </span>
            <button class="btn btn-primary bg-secondary text-white" t-on-click="increment">Increment</button>
        </p>
    `;
  static props = {
    value: { type: Number },
    onChange: { type: Function, optional: true },
  };

  increment() {
    if (this.props.onChange) {
      this.props.onChange(this.props.value);
    }
  }
}
