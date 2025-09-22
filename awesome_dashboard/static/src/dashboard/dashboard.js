/** @odoo-module **/
import { Component, useState, onWillStart } from "@odoo/owl";
import { registry } from "@web/core/registry";
import { Layout } from "@web/search/layout";
import { _t } from "@web/core/l10n/translation";
import { useService } from "@web/core/utils/hooks";
import { DashboardItem } from "../DashboardItem/DashboardItem";
import { PieChart } from "../pieChart/pieChart";
import { items } from "../DashboardItem/items";
import { dashboardItemRegistry } from "./item_registry";

class AwesomeDashboard extends Component {
  static template = "awesome_dashboard.ViewDashboard";
  static components = { Layout, DashboardItem, PieChart };
  setup() {
    this.display = { controlPanel: {} };
    this.action = useService("action");

    const statistics = this.env.services["awesome_dashboard.statistics"];
    this.stats = useState(statistics.stats);
    console.log(this.stats)
    onWillStart(async () => {
      await statistics.loadStatistics();
    });
    this.items = dashboardItemRegistry.getAll()
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
}

registry
  .category("lazy_components")
  .add("ViewDashboard", AwesomeDashboard);