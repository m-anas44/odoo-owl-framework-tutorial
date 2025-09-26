import { Component, useState } from "@odoo/owl";
import { Dialog } from "@web/core/dialog/dialog";

export class DashboardSettingsDialog extends Component {
  static template = "awesome_dashboard.DashboardSettingsDialog";
  setup() {
    this.state = useState({
      selected: new Set(this.props.filteredItems.map((item) => item.id)),
    });
  }

  toggle(id) {
    if (this.state.selected.has(id)) {
      this.state.selected.delete(id);
    } else {
      this.state.selected.add(id);
    }
  }

  apply() {
    const allIds = this.props.items.map((i) => i.id);
    const removed = allIds.filter((id) => !this.state.selected.has(id));
    localStorage.setItem("dashboard_removed", JSON.stringify(removed));
    location.reload(); // simplest way: reload dashboard to reapply
  }

  static components = { Dialog };
}
