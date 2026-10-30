import { useMemo } from "react";
import type { HistoryPoint } from "../../types/currency";
import styles from "./RateChart.module.css";

interface RateChartProps {
  points: HistoryPoint[];
  loading: boolean;
  error: string;
}

const createChartPaths = (points: HistoryPoint[]) => {
  if (points.length === 0) {
    return { line: "", area: "" };
  }

  const width = 300;
  const height = 150;
  const padding = 10;

  const values = points.map((point) => point.rate);

  let min = Math.min(...values);
  let max = Math.max(...values);

  const range = max - min;
  const extra = range === 0 ? Math.abs(min) * 0.01 || 1 : range * 0.1;

  min -= extra;
  max += extra;

  const coordinates = points.map((point, index) => {
    const x =
      padding +
      (index / Math.max(points.length - 1, 1)) * (width - padding * 2);

    const y =
      height -
      padding -
      ((point.rate - min) / (max - min)) * (height - padding * 2);

    return { x, y };
  });

  if (coordinates.length === 1) {
    coordinates.push({
      x: width - padding,
      y: coordinates[0].y,
    });
  }

  const line = coordinates
    .map(
      (point, index) =>
        `${index === 0 ? "M" : "L"} ${point.x.toFixed(2)} ${point.y.toFixed(2)}`,
    )
    .join(" ");

  const lastPoint = coordinates[coordinates.length - 1];

  const area = [
    line,
    `L ${lastPoint.x} ${height - padding}`,
    `L ${coordinates[0].x} ${height - padding}`,
    "Z",
  ].join(" ");

  return { line, area };
};

const RateChart = ({ points, loading, error }: RateChartProps) => {
  const paths = useMemo(() => createChartPaths(points), [points]);

  if (loading) {
    return (
      <div className={styles.chartContainer}>
        <p className={styles.message}>Loading chart...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.chartContainer}>
        <p className={styles.error}>{error}</p>
      </div>
    );
  }

  if (points.length === 0) {
    return (
      <div className={styles.chartContainer}>
        <p className={styles.message}>No historical data available.</p>
      </div>
    );
  }

  return (
    <div className={styles.chartContainer}>
      <svg
        className={styles.chart}
        viewBox="0 0 300 150"
        preserveAspectRatio="none"
        role="img"
        aria-label="Historical exchange rate chart"
      >
        <path d={paths.area} fill="#dff5e5" />

        <path
          d={paths.line}
          fill="none"
          stroke="#12b76a"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
};

export default RateChart;
