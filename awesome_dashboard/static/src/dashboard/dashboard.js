/** @odoo-module **/
import { Component, useState, onWillStart } from "@odoo/owl";
import { registry } from "@web/core/registry";
import { Layout } from "@web/search/layout";
import { _t } from "@web/core/l10n/translation";
import { useService } from "@web/core/utils/hooks";
import { DashboardItem } from "../DashboardItem/DashboardItem";
import { PieChart } from "../pieChart/pieChart";
import { dashboardItemRegistry } from "./item_registry";
import { DashboardSettingsDialog } from "./dashboard_settings_dialog";

class AwesomeDashboard extends Component {
  static template = "awesome_dashboard.ViewDashboard";
  static components = { Layout, DashboardItem, PieChart };
  setup() {
    this.display = { controlPanel: {} };
    this.action = useService("action");
    this.dialog = useService("dialog")

    const statistics = this.env.services["awesome_dashboard.statistics"];
    this.stats = useState(statistics.stats);
    console.log(this.stats)
    onWillStart(async () => {
      await statistics.loadStatistics();
    });

    this.allItems = dashboardItemRegistry.getAll()
    const removedItems = JSON.parse(localStorage.getItem("dashboard_removed" || []))
    this.items = this.allItems.filter((item)=> !removedItems.includes(item.id))
  }

  async getCustomers() {
    this.action.doAction("base.action_partner_form");
  }

  async getCrmLeads() {
    this.action.doAction({
      type: "ir.actions.act_window",
      name: _t("Leads"),
      target: "current",
      res_model: "crm.lead",
      views: [
        [false, "list"],
        [false, "form"],
      ],
    });
  }

  async openDialog() {
    await this.dialog.add(DashboardSettingsDialog, {
      items: this.allItems,
      filteredItems: this.items
    })
  }
}

registry
  .category("lazy_components")
  .add("ViewDashboard", AwesomeDashboard);