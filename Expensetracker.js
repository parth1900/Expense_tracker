import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Bar } from 'react-chartjs-2';
import { Chart, BarElement, CategoryScale, LinearScale } from 'chart.js';

Chart.register(BarElement, CategoryScale, LinearScale);

export default function ExpenseTracker() {
  const [expenses, setExpenses] = useState([]);
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');

  const addExpense = () => {
    if (title && amount) {
      setExpenses([...expenses, { title, amount: parseFloat(amount) }]);
      setTitle('');
      setAmount('');
    }
  };

  const data = {
    labels: expenses.map(exp => exp.title),
    datasets: [
      {
        label: 'Expenses',
        data: expenses.map(exp => exp.amount),
        backgroundColor: '#4f46e5',
        borderRadius: 8,
      },
    ],
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Expense Tracker</h1>
      <Card className="mb-4">
        <CardContent className="flex flex-col gap-2">
          <Input
            placeholder="Expense Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <Input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={e => setAmount(e.target.value)}
          />
          <Button onClick={addExpense}>Add Expense</Button>
        </CardContent>
      </Card>

      {expenses.length > 0 && (
        <Card>
          <CardContent>
            <Bar data={data} options={{ responsive: true, maintainAspectRatio: false }} height={300} />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
