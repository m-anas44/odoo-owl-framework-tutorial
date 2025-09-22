import { Component, xml, onWillStart, onMounted, useRef } from "@odoo/owl";
import { loadJS } from "@web/core/assets";

export class PieChartCard extends Component {
  static template = xml`
    <div>
      <h5 t-esc="props.title"/>
      <div class="d-flex justify-items-center">
        <canvas t-ref="canvas" width="200"/>
      </div>
    </div>
    `;
  setup() {
    this.canvasRef = useRef("canvas");

    onWillStart(async () => await loadJS(["/web/static/lib/Chart/Chart.js"]));

    onMounted(() => {
      const ctx = this.canvasRef.el.getContext("2d");
      new Chart(ctx, {
        type: "pie",
        data: {
          labels: Object.keys(this.props.data || {}),
          datasets: [
            {
              data: Object.values(this.props.data || {}),
              backgroundColor: [
                "rgb(255, 99, 132)",
                "rgb(54, 162, 235)",
                "rgb(255, 205, 86)",
              ],
              hoverOffset: 4,
            },
          ],
        },
      });
    });
  }

  static props = {
    data: { type: Object, optional: true },
  };
}
