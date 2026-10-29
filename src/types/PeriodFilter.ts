export interface PeriodFilter {
  type: 'all' | 'week' | 'month' | 'custom';
  from: string;
  to: string;
}
