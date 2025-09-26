import { Component, useState } from "@odoo/owl";
import { Dialog } from "@web/core/dialog/dialog";
import { useService } from "@web/core/utils/hooks";
import { _t } from "@web/core/l10n/translation";

export class DashboardSettingsDialog extends Component {
  static template = "awesome_dashboard.DashboardSettingsDialog";
  setup() {
    this.state = useState({
      selected: new Set(this.props.filteredItems.map((item) => item.id)),
    });
    this.notification = useService("notification");
  }

  toggle(id) {
    if (this.state.selected.has(id)) {
      this.state.selected.delete(id);
    } else {
      this.state.selected.add(id);
    }
  }

  apply() {
    try {
      const allIds = this.props.items.map((i) => i.id);
      const removed = allIds.filter((id) => !this.state.selected.has(id));
      localStorage.setItem("dashboard_removed", JSON.stringify(removed));
      this.notification.add(_t("Dashboard Setting Updated!"), {
        type: "success",
      });
      location.reload(); // simplest way: reload dashboard to reapply
    } catch (error) {
      this.notification.add(_t("Couldn't make changes."), {
        type: "danger",
      });
    }
  }

  static components = { Dialog };
}
