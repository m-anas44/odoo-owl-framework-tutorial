import { Component, xml, useState } from "@odoo/owl";
export class Card extends Component {
  static template = xml`
    <div class="card d-inline-block m-2" style="width: 18rem;">
        <div class="card-body">
            <h5 class="card-title d-flex justify-content-between align-items-center">
              <t t-esc="props.title" />
              <button class="btn btn-sm btn-outline-primary"
                      t-on-click="toggleOpen">
                <t t-esc="state.open ? 'Hide' : 'Show'"/>
              </button>
            </h5>
            <div t-if="state.open" class="card-text">
              <t t-slot="default"/>
            </div>
        </div>
    </div>
    `;
  static props = {
    title: { type: String },
    slots: { type: Object, optional: true },
  };
  setup() {
    this.state = useState({ open: true });
  }
  toggleOpen() {
    this.state.open = !this.state.open;
  }
}
