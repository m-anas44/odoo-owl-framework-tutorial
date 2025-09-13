import { rpc } from "@web/core/network/rpc";
import { registry } from "@web/core/registry";
import { reactive } from "@odoo/owl";

export const statisticsService = {
  dependencies: ["orm"],
  start(env, { orm }) {
    const stats = reactive({});
    async function loadStatistics() {
      const result = await rpc("/awesome_dashboard/statistics", {});
      Object.assign(stats, result);
      return stats;
    }
    setInterval(loadStatistics, 600000);
    return {
      stats,
      loadStatistics,
    };
  },
};

registry
  .category("services")
  .add("awesome_dashboard.statistics", statisticsService);
