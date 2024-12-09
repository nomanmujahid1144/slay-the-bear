const alpha = require('alphavantage')({ key: '7WF63JCXA8P71C8D' });
import { norm } from 'scipy.stats';
import { useState } from 'react';
const math = require('mathjs');

const get_stock_data = async (symbol) => {
    try {
        const data = await alpha.getMonthlyAdjusted(symbol);
        let stockData = data['5. adjusted close'];
        stockData = stockData.resample('MS').first();
        const startDate = new Date();
        startDate.setFullYear(startDate.getFullYear() - 5);
        stockData = stockData.loc[startDate];
        return [stockData, symbol];
    } catch (e) {
        console.error(`Error retrieving data for ${symbol}. Please check the symbol and try again.`);
        return [null, symbol];
    }
};

const portfolio_volatility = (weights, returns) => {
    return Math.sqrt(math.dot(weights.T, math.dot(returns.cov() * 12, weights)));
};

const portfolio_return = (weights, returns) => {
    return math.sum(returns.mean() * weights) * 12;
};

const calculate_var = (portfolioVolatility, confidenceLevel = 0.95, timePeriod = 1) => {
    let zScore = norm.ppf(1 - confidenceLevel);
    const vars = zScore * portfolioVolatility * Math.sqrt(timePeriod);
    return -vars;
};

const calculate_historical_performance = (weights, prices, initialAmount) => {
    const portfolioReturns = prices.pct_change().dropna();
    const weightedReturns = portfolioReturns.dot(weights);
    const cumulativeReturns = (1 + weightedReturns).cumprod();
    const totalReturn = cumulativeReturns.iloc[-1] - 1;
    const annualizedReturn = Math.pow(1 + totalReturn, 1 / 5) - 1;
    return [annualizedReturn * 100, cumulativeReturns * initialAmount];
};

const App = () => {
    const [symbols, setSymbols] = useState([]);
    const [riskFreeRate, setRiskFreeRate] = useState(0.03);
    const [targetReturn, setTargetReturn] = useState(0.12);
    const [investmentAmount, setInvestmentAmount] = useState(10000);
    const [symbolInput, setSymbolInput] = useState('');
    const [output, setOutput] = useState('');

    const updateSymbolDisplay = () => {
        return symbols.map((symbol, idx) => (
            <div key={idx}>
                <span>{symbol}</span>
                <button onClick={() => onRemoveSymbolClicked(symbol)}>Remove</button>
            </div>
        ));
    };

    const onAddSymbolClicked = async () => {
        const symbol = symbolInput.trim().toUpperCase();
        if (symbol && !symbols.includes(symbol)) {
            const [stockData] = await get_stock_data(symbol);
            if (stockData) {
                setSymbols([...symbols, symbol]);
            }
        }
        setSymbolInput('');
    };

    const onRemoveSymbolClicked = (symbol) => {
        setSymbols(symbols.filter(s => s !== symbol));
    };

    const onClearSymbolsClicked = () => {
        setSymbols([]);
    };

    const onCalculateClicked = async () => {
        if (symbols.length < 2) {
            console.log("Please add at least two symbols for diversification.");
            return;
        }

        const prices = {};
        for (const ticker of symbols) {
            const [stockData] = await get_stock_data(ticker);
            if (stockData) {
                prices[ticker] = stockData;
            }
        }

        const pricesDf = pd.DataFrame(prices).dropna();
        if (pricesDf.columns.length < 2) {
            console.log("Not enough valid symbols with data. Please check symbols.");
            return;
        }

        const returns = pricesDf.pct_change().dropna();
        const initialWeights = new Array(pricesDf.columns.length).fill(1 / pricesDf.columns.length);

        const bounds = pricesDf.columns.length === 2
            ? Array(pricesDf.columns.length).fill([0.01, 0.99])
            : Array(pricesDf.columns.length).fill([0.05, 0.50]);

        const constraints = [
            { type: 'eq', fun: (x) => math.sum(x) - 1 },
            { type: 'ineq', fun: (x) => portfolio_return(x, returns) - targetReturn }
        ];

        const optimalResults = minimize(portfolio_volatility, initialWeights, { args: [returns], method: 'SLSQP', bounds, constraints });

        if (!optimalResults.success) {
            console.log("Optimization did not succeed. Please check your inputs.");
            return;
        }

        const optimalWeights = optimalResults.x;
        const optPortReturn = portfolio_return(optimalWeights, returns);
        const optPortVolatility = portfolio_volatility(optimalWeights, returns);
        const var95 = calculate_var(optPortVolatility);
        const potentialLossDollars = investmentAmount * var95;

        const [annualizedReturn, cumulativeReturns] = calculate_historical_performance(optimalWeights, pricesDf, investmentAmount);
        const sharpeRatio = (optPortReturn - riskFreeRate) / optPortVolatility;

        let riskExplanation;
        if (optPortVolatility > optPortReturn) {
            riskExplanation = `Your portfolio's volatility (${(optPortVolatility * 100).toFixed(2)}%) is greater than the expected return (${(optPortReturn * 100).toFixed(2)}%).`;
        } else {
            riskExplanation = `Your portfolio's expected return (${(optPortReturn * 100).toFixed(2)}%) is higher than its volatility (${(optPortVolatility * 100).toFixed(2)}%).`;
        }

        setOutput(`
            Optimized Portfolio Allocation:
            ${JSON.stringify(optimalWeights.map((weight, i) => ({
                Symbol: pricesDf.columns[i],
                'Weights (%)': (weight * 100).toFixed(2),
                'Amounts ($)': (weight * investmentAmount).toFixed(2)
            })))}
            Expected Portfolio Return: ${(optPortReturn * 100).toFixed(2)}%
            Expected Portfolio Volatility: ${(optPortVolatility * 100).toFixed(2)}%
            Value at Risk (VaR 95%, 1-Month): ${(-var95 * 100).toFixed(2)}% potential loss
            Potential Loss in Dollar Terms: $${(-potentialLossDollars).toFixed(2)}
            Initial Investment: $${investmentAmount}
            Annualized Return over 5 years: ${annualizedReturn.toFixed(2)}%
            Total Value after 5 years: $${cumulativeReturns.iloc[-1].toFixed(2)}
            ${riskExplanation}
        `);
    };

    return (
        <div>
            <input type="text" value={symbolInput} onChange={(e) => setSymbolInput(e.target.value)} placeholder="Enter symbol (e.g., AAPL)" />
            <button onClick={onAddSymbolClicked}>Add Symbol</button>
            <button onClick={onClearSymbolsClicked}>Clear All Symbols</button>
            <button onClick={onCalculateClicked}>Calculate Portfolio</button>
            {updateSymbolDisplay()}
            <div>{output}</div>
        </div>
    );
};

export default App;