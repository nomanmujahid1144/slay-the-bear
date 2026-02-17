'use client'

import InputField from "@/app/components/fields/Input";
import { Heading } from "@/app/components/heading/Heading";
import { calculatorService } from "@/services/calculator.service";
import { CalculatorSidebar } from "@/app/components/calculator/CalculatorSidebar";
import { useState } from "react";
import { ToolDescription } from "../tool-description/ToolDescription";
import { LoaderCircleIcon } from "@/app/components/Loader/LoadingCircle";

export default function BudgetCalculator() {

    const [income, setIncome] = useState('');
    const [expenses, setExpenses] = useState([]);
    const [newExpense, setNewExpense] = useState({ category: '', amount: '' });
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleExpenseChange = (e) => {
        const { name, value } = e.target;
        setNewExpense((prev) => ({ ...prev, [name]: value }));
    };

    const addExpense = (e) => {
        e.preventDefault();
        if (newExpense.category && !isNaN(newExpense.amount) && newExpense.amount > 0) {
            setExpenses((prev) => [...prev, newExpense]);
            setNewExpense({ category: '', amount: '' });
        } else {
            alert('Please enter a valid category and amount.');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!income || expenses.length === 0) {
            alert('Please enter income and add at least one expense.');
            return;
        }

        setLoading(true);

        try {
            const formattedExpenses = expenses.map(exp => ({
                category: exp.category,
                amount: parseFloat(exp.amount)
            }));

            const { data } = await calculatorService.budget({
                income: parseFloat(income),
                expenses: formattedExpenses,
            });

            setResult(data.data);
        } catch (error) {
            // Error handled by errorHandler
        } finally {
            setLoading(false);
        }
    };

    const handleReset = () => {
        setIncome('');
        setExpenses([]);
        setNewExpense({ category: '', amount: '' });
        setResult(null);
    };

    const totalExpenses = expenses.reduce((sum, exp) => sum + parseFloat(exp.amount), 0);

    return (
        <section className="top-news-post-area pt-70 pb-70">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-xl-9">
                        <div className="sidebar-wrap">
                            <Heading
                                textHeading="Budget Calculator"
                                showBtn={false}
                            />
                            <div className="contact-form pb-3">
                                <form onSubmit={handleSubmit}>
                                    <div className="row">
                                        <div className="col-md-4">
                                            <InputField
                                                isFontAwsome={true}
                                                fontAwsomeIcon="fa-dollar-sign"
                                                label="Monthly Income ($):"
                                                placeholder="Enter Your Income"
                                                required={true}
                                                id="income"
                                                type="number"
                                                step="0.01"
                                                value={income}
                                                onChange={(e) => setIncome(e.target.value)}
                                            />
                                        </div>
                                        <div className="col-md-4">
                                            <InputField
                                                isFontAwsome={true}
                                                fontAwsomeIcon="fa-tag"
                                                label="Expense Category:"
                                                placeholder="Enter Expense Category"
                                                id="category"
                                                type="text"
                                                name="category"
                                                value={newExpense.category}
                                                onChange={handleExpenseChange}
                                            />
                                        </div>
                                        <div className="col-md-4">
                                            <InputField
                                                isFontAwsome={true}
                                                fontAwsomeIcon="fa-dollar-sign"
                                                label="Expense Amount ($):"
                                                placeholder="Enter Expense Amount"
                                                id="amount"
                                                type="number"
                                                step="0.01"
                                                name="amount"
                                                value={newExpense.amount}
                                                onChange={handleExpenseChange}
                                            />
                                        </div>
                                        <div className="flex justify-center pt-4">
                                            <button onClick={addExpense} type="button" className="btn btn-two">
                                                Add Expense
                                            </button>
                                        </div>
                                    </div>

                                    {expenses.length > 0 && (
                                        <div className="pt-4">
                                            <h3 className="text-lg font-semibold mb-2">Current Expenses:</h3>
                                            <div className="bg-gray-50 dark:bg-gray-800 rounded p-4">
                                                <ul className="space-y-2">
                                                    {expenses.map((expense, index) => (
                                                        <li key={index} className="flex justify-between">
                                                            <span>{expense.category}:</span>
                                                            <span className="font-semibold">${parseFloat(expense.amount).toFixed(2)}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                                <div className="border-t border-gray-300 dark:border-gray-600 mt-3 pt-3">
                                                    <div className="flex justify-between font-bold">
                                                        <span>Total Expenses:</span>
                                                        <span className="text-red-600">${totalExpenses.toFixed(2)}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    <div className="flex justify-center gap-4 pt-4">
                                        <button onClick={handleReset} type="button" className="btn btn-two">
                                            Reset
                                        </button>
                                        <button type="submit" disabled={loading} className="btn btn-two">
                                            {loading ? 'Calculating...' : 'Calculate Budget'}
                                        </button>
                                    </div>
                                </form>

                                <div className="pt-10">
                                    {loading && <LoaderCircleIcon />}

                                    {result && !loading && (
                                        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 space-y-4">
                                            <h3 className="text-2xl font-bold text-primary">
                                                {result.message}
                                            </h3>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                                <div className="p-4 bg-white dark:bg-gray-700 rounded">
                                                    <p className="text-sm text-gray-600 dark:text-gray-400">Total Income</p>
                                                    <p className="text-lg font-semibold">${result.breakdown.totalIncome}</p>
                                                </div>
                                                <div className="p-4 bg-white dark:bg-gray-700 rounded">
                                                    <p className="text-sm text-gray-600 dark:text-gray-400">Total Expenses</p>
                                                    <p className="text-lg font-semibold text-red-600">${result.breakdown.totalExpenses}</p>
                                                </div>
                                                <div className="p-4 bg-white dark:bg-gray-700 rounded">
                                                    <p className="text-sm text-gray-600 dark:text-gray-400">Remaining Budget</p>
                                                    <p className="text-lg font-semibold text-green-600">${result.remainingBudget}</p>
                                                </div>
                                                <div className="p-4 bg-white dark:bg-gray-700 rounded">
                                                    <p className="text-sm text-gray-600 dark:text-gray-400">Percentage Spent</p>
                                                    <p className="text-lg font-semibold">{result.breakdown.percentageSpent}%</p>
                                                </div>
                                            </div>

                                            <div className="mt-4 p-4 bg-white dark:bg-gray-700 rounded">
                                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Expenses by Category</p>
                                                <div className="space-y-2">
                                                    {Object.entries(result.breakdown.expensesByCategory).map(([category, amount]) => (
                                                        <div key={category} className="flex justify-between">
                                                            <span>{category}:</span>
                                                            <span className="font-semibold">${amount}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <ToolDescription
                                title={'Summary'}
                                details={"Helps manage income and expenses by creating a monthly or yearly budget."}
                            />
                            <ToolDescription
                                title={'Example'}
                                details={'$3,000 income and $2,000 expenses leave you $1,000 for savings.'}
                            />
                            <ToolDescription
                                title={'Explanation of Results'}
                                details={'The results break down your expenses by category, showing where you may be overspending and how much is left for savings or other financial goals. This helps you plan a more effective budget.'}
                            />
                        </div>
                    </div>

                    <CalculatorSidebar />
                </div>
            </div>
        </section>
    );
}