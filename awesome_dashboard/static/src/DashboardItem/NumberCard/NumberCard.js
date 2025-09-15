import { Component, xml } from "@odoo/owl";

export class NumberCard extends Component {
  static template = xml`
    <div>
        <h5 t-esc="props.title"/>
        <p class="m-0" style="font-size: 40px; font-weight: bold;" t-esc="props.value"/>
    </div>
    `;

  static props = {
    title: { type: String },
    value: {
      type: [String, Number],
    },
  };
}
