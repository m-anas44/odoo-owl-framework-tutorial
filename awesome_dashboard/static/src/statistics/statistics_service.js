import { rpc } from "@web/core/network/rpc";
import { memoize } from "@web/core/utils/functions";
import { registry } from "@web/core/registry";

export const statisticsService = {
  dependencies: ["orm"],
  start(env, { orm }) {
    async function _loadStatistics() {
      return rpc("/awesome_dashboard/statistics", {});
    }
    return {
      loadStatistics: memoize(_loadStatistics),
    };
  },
};

registry
  .category("services")
  .add("awesome_dashboard.statistics", statisticsService);
