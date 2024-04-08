import Banner from '@/components/Banner/Banner';
import TransactionForm from '@/components/TransactionForm/TransactionForm';
import TableContainer from '@/components/TableContainer/TableContainer';

export default function Home() {

  return (
    <main>
      <div className='w-full h-200px'>
        <Banner />
        <TransactionForm />
        <TableContainer />
      </div>
    </main>
  );
}
