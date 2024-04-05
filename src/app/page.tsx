import Banner from '@/components/Banner/Banner';
import TransactionForm from '@/components/TransactionForm/TransactionForm';

export default function Home() {
  return (
    <main>
      <div className='w-full h-200px'>
        <Banner />
        <TransactionForm />
      </div>
    </main>
  );
}
