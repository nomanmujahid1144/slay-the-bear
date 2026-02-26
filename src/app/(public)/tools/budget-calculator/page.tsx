// src/app/(public)/tools/budget-calculator/page.tsx

'use client'

import { useState } from 'react';
import InputField from '@/app/components/fields/Input';
import { Heading } from '@/app/components/heading/Heading';
import { CalculatorSidebar } from '@/app/components/calculator/CalculatorSidebar';
import { ToolDescription } from '../tool-description/ToolDescription';
import { CalcResultSkeleton } from '@/app/components/skeletons';
import { TgTable, type TgTableColumn } from '@/app/components/table/TgTable';
import { CalcResult, CalcResultGrid } from '@/app/components/calculator/result';
import { useCalculator } from '@/app/hooks/useCalculator';
import { calculatorService } from '@/services/calculator.service';
import type { BudgetResult, BudgetExpense } from '@/types/calculator';
import { CalcButtons } from '@/app/components/calculator/CalcButtons';

interface ExpenseForm {
    category: string;
    amount: string;
}

const INITIAL_EXPENSE: ExpenseForm = { category: '', amount: '' };

// ── Expense input table columns (editable list) ───────────────────────────────
const expenseColumns = (
    onRemove: (index: number) => void
): TgTableColumn<BudgetExpense & { index: number }>[] => [
        {
            key: 'category',
            label: 'Category',
            render: (row) => <span>{row.category}</span>,
        },
        {
            key: 'amount',
            label: 'Amount',
            align: 'right',
            render: (row) => (
                <span className="tg-cell-value">${row.amount.toFixed(2)}</span>
            ),
        },
        {
            key: 'action',
            label: '',
            align: 'right',
            render: (row) => (
                <button
                    type="button"
                    className="tg-table-delete-btn"
                    onClick={() => onRemove(row.index)}
                    title="Remove"
                >
                    ✕
                </button>
            ),
        },
    ];

// ── Result category breakdown columns ─────────────────────────────────────────
const categoryColumns: TgTableColumn<{ category: string; amount: number }>[] = [
    {
        key: 'category',
        label: 'Category',
        render: (row) => <span>{row.category}</span>,
    },
    {
        key: 'amount',
        label: 'Amount',
        align: 'right',
        render: (row) => (
            <span className="tg-cell-value">${row.amount.toLocaleString()}</span>
        ),
    },
];

export default function BudgetCalculator() {
    const [income, setIncome] = useState('');
    const [expenses, setExpenses] = useState<BudgetExpense[]>([]);
    const [newExpense, setNewExpense] = useState<ExpenseForm>(INITIAL_EXPENSE);
    const [expenseError, setExpenseError] = useState('');
    const { result, loading, calculate, reset } = useCalculator<BudgetResult>();

    const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
    const isFormValid = income !== '' && expenses.length > 0;

    const onExpenseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setExpenseError('');
        setNewExpense((prev) => ({ ...prev, [name]: value }));
    };

    const addExpense = (e: React.MouseEvent) => {
        e.preventDefault();
        const amt = parseFloat(newExpense.amount);
        if (!newExpense.category.trim() || isNaN(amt) || amt <= 0) {
            setExpenseError('Please enter a valid category and amount.');
            return;
        }
        setExpenses((prev) => [...prev, { category: newExpense.category.trim(), amount: amt }]);
        setNewExpense(INITIAL_EXPENSE);
        setExpenseError('');
    };

    const removeExpense = (index: number) => {
        setExpenses((prev) => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isFormValid) return;
        await calculate(async () => {
            const { data } = await calculatorService.budget({
                income: parseFloat(income),
                expenses,
            });
            return data.data!;
        });
    };

    const handleReset = () => {
        reset();
        setIncome('');
        setExpenses([]);
        setNewExpense(INITIAL_EXPENSE);
        setExpenseError('');
    };

    // Rows for expense input table (inject index for delete handler)
    const expenseRows = expenses.map((e, i) => ({ ...e, index: i }));

    // Rows for result category table
    const categoryRows = result
        ? Object.entries(result.breakdown.expensesByCategory).map(([category, amount]) => ({
            category,
            amount: amount as number,
        }))
        : [];

    const isPositive = result ? result.remainingBudget >= 0 : false;

    return (
        <section className="top-news-post-area pt-70 pb-70">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-xl-9">
                        <div className="sidebar-wrap">
                            <Heading textHeading="Budget Calculator" showBtn={false} />

                            <div className="contact-form pb-3">
                                <form onSubmit={handleSubmit}>

                                    {/* Income */}
                                    <div className="row">
                                        <div className="col-md-12">
                                            <InputField
                                                isFontAwsome fontAwsomeIcon="dollar-sign"
                                                label="Monthly Income" placeholder="e.g. 3000"
                                                required id="income" type="number" step="0.01" min="0"
                                                value={income}
                                                onChange={(e) => setIncome(e.target.value)}
                                                isVisible={false}
                                            />
                                        </div>
                                    </div>

                                    {/* Add expense row */}
                                    <div className="row align-items-end mb-2">
                                        <div className="col-md-5">
                                            <InputField
                                                isFontAwsome fontAwsomeIcon="tag"
                                                label="Expense Category" placeholder="e.g. Rent"
                                                id="category" name="category" type="text"
                                                value={newExpense.category}
                                                onChange={onExpenseChange}
                                                isVisible={false}
                                            />
                                        </div>
                                        <div className="col-md-5">
                                            <InputField
                                                isFontAwsome fontAwsomeIcon="dollar-sign"
                                                label="Amount" placeholder="e.g. 1200"
                                                id="amount" name="amount" type="number" step="0.01" min="0"
                                                value={newExpense.amount}
                                                onChange={onExpenseChange}
                                                isVisible={false}
                                            />
                                        </div>
                                        <div className="col-md-2 pb-3">
                                            <button
                                                onClick={addExpense}
                                                type="button"
                                                className="btn btn-two w-100"
                                            >
                                                Add
                                            </button>
                                        </div>
                                    </div>

                                    {/* Inline error */}
                                    {expenseError && (
                                        <p style={{ color: 'var(--tg-red)', fontSize: '13px', marginBottom: '12px' }}>
                                            {expenseError}
                                        </p>
                                    )}

                                    {/* Expense table */}
                                    <TgTable
                                        columns={expenseColumns(removeExpense)}
                                        rows={expenseRows}
                                        keyExtractor={(_, i) => i}
                                        emptyText="No expenses added yet. Add at least one to calculate."
                                        className="mb-4"
                                        footer={
                                            expenses.length > 0 ? (
                                                <tr>
                                                    <td>Total Expenses</td>
                                                    <td className="tg-cell-danger" style={{ textAlign: 'right' }}>
                                                        ${totalExpenses.toFixed(2)}
                                                    </td>
                                                    <td />
                                                </tr>
                                            ) : undefined
                                        }
                                    />
                                    <CalcButtons
                                        submitText="Calculate Budget"
                                        loading={loading}
                                        disabled={!isFormValid}
                                        onReset={handleReset}
                                    />
                                </form>

                                {/* Result */}
                                <div className="pt-4">
                                    {loading && (
                                        <CalcResultSkeleton gridCols={2} gridRows={2} inputCols={2} />
                                    )}

                                    {result && !loading && (
                                        <CalcResult message={result.message}>

                                            {/* Surplus / deficit primary card */}
                                            <div
                                                className="d-flex justify-content-between align-items-center p-3 mb-4"
                                                style={{
                                                    border: `1px solid ${isPositive ? '#28a745' : 'var(--tg-red)'}`,
                                                    borderRadius: '6px',
                                                    background: isPositive
                                                        ? 'rgba(40,167,69,0.06)'
                                                        : 'rgba(220,53,69,0.06)',
                                                }}
                                            >
                                                <span style={{ fontWeight: 600 }}>
                                                    {isPositive ? 'Remaining Budget' : 'Budget Deficit'}
                                                </span>
                                                <span style={{
                                                    fontSize: '1.5rem',
                                                    fontWeight: 700,
                                                    color: isPositive ? '#28a745' : 'var(--tg-red)',
                                                }}>
                                                    ${Math.abs(result.remainingBudget).toLocaleString()}
                                                </span>
                                            </div>

                                            {/* Summary grid */}
                                            <CalcResultGrid
                                                cols={2}
                                                items={[
                                                    {
                                                        label: 'Total Income',
                                                        value: `$${result.breakdown.totalIncome.toLocaleString()}`,
                                                        highlight: true,
                                                    },
                                                    {
                                                        label: 'Total Expenses',
                                                        value: `$${result.breakdown.totalExpenses.toLocaleString()}`,
                                                    },
                                                    {
                                                        label: 'Percentage Spent',
                                                        value: `${result.breakdown.percentageSpent}%`,
                                                    },
                                                    {
                                                        label: 'Percentage Remaining',
                                                        value: `${result.breakdown.percentageRemaining}%`,
                                                    },
                                                ]}
                                            />

                                            {/* Category breakdown table */}
                                            <p style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', opacity: 0.6, marginBottom: '8px', marginTop: '16px' }}>
                                                Expenses by Category
                                            </p>
                                            <TgTable
                                                columns={categoryColumns}
                                                rows={categoryRows}
                                                keyExtractor={(row) => row.category}
                                                footer={
                                                    <tr>
                                                        <td>Total</td>
                                                        <td className="tg-cell-danger" style={{ textAlign: 'right' }}>
                                                            ${result.breakdown.totalExpenses.toLocaleString()}
                                                        </td>
                                                    </tr>
                                                }
                                            />
                                        </CalcResult>
                                    )}
                                </div>
                            </div>

                            <ToolDescription
                                title="Summary"
                                details="Manages your monthly income and expenses by category, showing exactly how much you have left after all spending." />
                            <ToolDescription
                                title="Example"
                                details="With $3,000 income and $2,000 in expenses across rent, food, and transport, you have $1,000 remaining — 33.3% of your income." />
                            <ToolDescription
                                title="Explanation of Results"
                                details="Remaining Budget is what's left after all expenses — positive means surplus, negative means deficit. Percentage Spent shows how much of your income is consumed by expenses. The category breakdown table shows exactly where your money goes." />
                        </div>
                    </div>
                    <CalculatorSidebar />
                </div>
            </div>
        </section>
    );
}