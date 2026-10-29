"use client";

import { useState } from 'react';
import Banner from '@/components/Banner/Banner';
import TransactionForm from '@/components/TransactionForm/TransactionForm';
import TableContainer from '@/components/TableContainer/TableContainer';
import Footer from '@/components/Footer/Footer';
import type { PeriodFilter } from '@/types/PeriodFilter';

export default function Home() {
  const [period, setPeriod] = useState<PeriodFilter>({
    type: 'all',
    from: '',
    to: '',
  });

  return (
    <main>
      <div className="w-full h-200px">
        <Banner period={period} />
        <TransactionForm />
        <TableContainer
          period={period}
          onPeriodChange={setPeriod}
        />
        <Footer />
      </div>
    </main>
  );
}