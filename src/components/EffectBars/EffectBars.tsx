"use client"

import styles from './effect-bars.module.css';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

let beneficios = [0, 56, 21, 36, 81, 40, 31, -20, 25, 30, 13, 60];
let meses = ["Ene", "Feb", "Mar", "abr", "May", "Jun", "Jul", "ago", "Sep", "Oct", "Nov", "Dic"];

let miData = {
  labels: meses,
  datasets: [ {
    label: 'Beneficios',
    data: beneficios,
    tension: 0.5,
    fill: true,
    borderColor: 'rgb(255, 99, 132)',
    backgroundColor: 'rgba(255, 99, 132, 0.5)',
    pointRadius: 5,
    pointBorderColor:'rgba(255, 99, 132)',
    pointBackgroundColor: 'rgb(255, 99, 132),'
  }]
}

let misOptions = {

}

const EffectBars = () => {
  return (
    <article className={styles.effect_bars__container}>
      <Line data={miData} options={misOptions} />
    </article>
  )
}

export default EffectBars;
