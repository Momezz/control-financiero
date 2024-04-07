import Banner from '@/components/Banner/Banner';
import TransactionForm from '@/components/TransactionForm/TransactionForm';
import ResultsTable from '@/components/ResultsTable/ResultsTable';

export default function Home() {
  const datosEconomicos = [
    { item: 'Producto A', value: 400, percentage: 5 },
    { item: 'Producto B', value: 200, percentage: 15 },
    { item: 'Producto C', value: 150, percentage: 12 },
  ];

  return (
    <main>
      <div className='w-full h-200px'>
        <Banner />
        <TransactionForm />
        <ResultsTable data={datosEconomicos} />
      </div>
    </main>
  );
}
