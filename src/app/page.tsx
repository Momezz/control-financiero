import Banner from '@/components/Banner/Banner';
import FinancialFilters from '@/components/FinancialFilters/FinancialFilters';
import TransactionForm from '@/components/TransactionForm/TransactionForm';
import TableContainer from '@/components/TableContainer/TableContainer';
import Footer from '@/components/Footer/Footer';

export default function Home() {

  return (
    <main>
      <div className='w-full h-200px'>
        <Banner />
        <FinancialFilters />
        <TransactionForm />
        <TableContainer />
        <Footer />
      </div>
    </main>
  );
}
