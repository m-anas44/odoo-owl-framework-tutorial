import { NumberCard } from "./NumberCard/NumberCard";
import { PieChartCard } from "./PieChartCard/PieChartCard";

export const items = [
  {
    id: "average_quantity",
    description: "Average amount of t-shirt",
    Component: NumberCard,
    size: 3,
    props: (data) => ({
      title: "Average amount of t-shirt by order this month",
      value: data.average_quantity,
    }),
  },
  {
    id: "total_amount",
    description: "Total amount of new orders this month",
    Component: NumberCard,
    props: (data) => ({
      title: "Total Sales",
      value: data.total_amount,
    }),
  },
  {
    id: "nb_new_orders",
    description: "Number of new orders this month",
    Component: NumberCard,
    size: 2,
    props: (data) => ({
      title: "New Orders",
      value: data.nb_new_orders,
    }),
  },
  {
    id: "orders_by_size",
    description: "Sales distribution by category",
    Component: PieChartCard,
    size: 2,
    props: (data) => ({
      title: "Sales Distribution",
      data: data.orders_by_size,
    }),
  },
];
