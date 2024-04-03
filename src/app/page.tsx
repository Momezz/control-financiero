import Image from "next/image";
import FinancialItem from '@/components/FinancialItem/FinancialItem';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <FinancialItem title="Ingresos" value={1000} />
        <FinancialItem title="Egresos" value={1000} />
      </div>
    </main>
  );
}
