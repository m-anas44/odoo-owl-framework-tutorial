/** @odoo-module **/

import { Component, useState, markup } from "@odoo/owl";
import { Counter } from "./counter/counter";
import { Card } from "./card/card";

export class Playground extends Component {
  static template = "awesome_owl.playground";
  static components = { Counter, Card };
  setup() {
    this.state = useState({ value: 1 });
    this.normalContent = "<b>This will not be bold</b>";
    this.markupContent = markup("<b>This WILL be bold</b>")
  }
  increment() {
    this.state.value++;
  }
}
