/** @odoo-module **/

import { Component, useState, markup } from "@odoo/owl";
import { Counter } from "./counter/counter";
import { Card } from "./card/card";
import { TodoList } from "./todo/todo_list";

export class Playground extends Component {
  static template = "awesome_owl.playground";
  static components = { Counter, Card, TodoList };
  setup() {
    this.state = useState({ sum: 2 });
    this.normalContent = "<b>This will not be bold</b>";
    this.markupContent = markup("<b>This WILL be bold</b>");
    this.incrementSum = this.incrementSum.bind(this)
  }
  incrementSum(newValue) {
    this.state.sum += newValue;
  }
}