import {
  Component,
  onWillStart,
  onMounted,
  useRef,
  onWillUpdateProps,
} from "@odoo/owl";
import { loadJS } from "@web/core/assets";

export class PieChart extends Component {
  static template = "awesome_dashboard.piechart";

  setup() {
    this.canvasRef = useRef("canvas");
    this.chart = null;

    onWillStart(async () => await loadJS(["/web/static/lib/Chart/Chart.js"]));

    onMounted(() => {
      const ctx = this.canvasRef.el.getContext("2d");
      this.chart = new Chart(ctx, {
        type: "pie",
        data: this.buildData(this.props.data),
      });
    });

    onWillUpdateProps((newProps) => {
      if (this.chart) {
        this.chart.data = this.buildData(newProps.data);
        this.chart.update();
      }
    });
  }

  buildData(data) {
    return {
      labels: Object.keys(data || {}),
      datasets: [
        {
          data: Object.values(data || {}),
          backgroundColor: [
            "rgb(255, 99, 132)",
            "rgb(54, 162, 235)",
            "rgb(255, 205, 86)",
          ],
          hoverOffset: 4,
        },
      ],
    };
  }

  static props = {
    data: { type: Object, optional: true },
  };
}
