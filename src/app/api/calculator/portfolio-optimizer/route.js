// import { NextResponse } from 'next/server';

// const alpha = require('alphavantage')({ key: '7WF63JCXA8P71C8D' });
// import { mean, covariance, multiply, sum, sqrt } from 'mathjs';

// // Calculate the inverse of the normal distribution for z-score
// function normInv(p, mu, sigma) {
//     return mu + sigma * Math.sqrt(2) * Math.erfInv(2 * p - 1);
// }

// // Fetch stock prices (monthly)
// async function fetchStockPrices(symbol) {
//     try {
//         const data = await alpha.data.monthly(symbol);
//         const prices = Object.entries(data['Monthly Time Series'])
//             .map(([date, values]) => ({
//                 date: new Date(date),
//                 price: parseFloat(values['4. close']),
//             }))
//             .sort((a, b) => a.date - b.date)
//             .slice(-60);

//         if (prices.length < 60) {
//             const padding = Array(60 - prices.length).fill(prices[0].price);
//             return [...padding, ...prices.map((entry) => entry.price)];
//         }

//         return prices.map((entry) => entry.price);
//     } catch (error) {
//         throw new Error(`Error fetching data for ${symbol}: ${error.message}`);
//     }
// }

// // Calculate covariance matrix from returns
// function calculateCovarianceMatrix(matrix) {
//     const rows = matrix.size()[0]; // Number of assets (stocks)
//     const cols = matrix.size()[1]; // Number of observations (returns)

//     // Mean of each asset (row-wise mean)
//     const meanVector = math.mean(matrix, 1);

//     // Calculate deviation from the mean for each asset
//     const deviationMatrix = math.map(
//         matrix,
//         (value, [row, col]) => value - meanVector.get([row])
//     );

//     // Covariance matrix: (deviationMatrix * deviationMatrix^T) / (n - 1)
//     return math.multiply(deviationMatrix, math.transpose(deviationMatrix)).map(
//         (x) => x / (cols - 1) // Divide by n - 1 for unbiased covariance
//     );
// }

// // Function to optimize the portfolio to achieve target return
// function optimizePortfolio(returns, covariance, targetReturn) {
//     const numAssets = returns.length;

//     // Constraints: Target return and weights sum to 1
//     const constraints = [];
//     const constraintsValues = [];

//     // Constraint for target return
//     constraints.push(returns);
//     constraintsValues.push(targetReturn);

//     // Constraint for weights sum to 1
//     const sumWeightsConstraint = Array(numAssets).fill(1);
//     constraints.push(sumWeightsConstraint);
//     constraintsValues.push(1);

//     // Bounds: Weights >= 0
//     const bounds = Array(numAssets).fill({ min: 0, max: 1 });

//     // Objective function: Minimize portfolio variance (risk)
//     const objective = covariance._data.flat(); // Flatten covariance matrix

//     console.log("Solver object:", solver);

//     const result = solver.maximize({
//         optimize: objective,
//         constraints: constraints,
//         bounds: bounds,
//         result: constraintsValues,
//     });

//     return result.solution;
// }

// // Main function to calculate portfolio metrics
// async function calculatePortfolio(symbols, investmentAmount, targetReturn, riskFreeRate) {
//     const priceData = [];
//     for (const symbol of symbols) {
//         const prices = await fetchStockPrices(symbol.symbol);
//         priceData.push(prices);
//     }

//     const priceMatrix = math.matrix(priceData);

//     // Calculate returns from price data
//     const returnsMatrix = math.map(
//         math.dotDivide(
//             math.subset(priceMatrix, math.index(math.range(0, priceMatrix.size()[0]), math.range(1, priceMatrix.size()[1]))),
//             math.subset(priceMatrix, math.index(math.range(0, priceMatrix.size()[0]), math.range(0, priceMatrix.size()[1] - 1)))
//         ),
//         (value) => math.log(value)
//     );

//     const meanReturns = math.mean(returnsMatrix, 1);
//     const covarianceMatrix = calculateCovarianceMatrix(returnsMatrix);

//     // Optimize portfolio weights
//     console.log("Covariance:", covarianceMatrix);
//     const optimalWeights = optimizePortfolio(meanReturns, covarianceMatrix, targetReturn);

//     const portfolioVolatility = math.sqrt(
//         math.dot(math.multiply(math.transpose(optimalWeights), covarianceMatrix), optimalWeights)
//     );

//     const portfolioReturn = math.dot(meanReturns, optimalWeights);
//     const annualizedReturn = portfolioReturn * 12;

//     const zScore = normInv(0.95, 0, 1); // 95% confidence
//     const portfolioVaR = zScore * portfolioVolatility * Math.sqrt(1 / 12);

//     const sharpeRatio = (annualizedReturn - riskFreeRate) / portfolioVolatility;

//     // Allocation in dollar terms
//     const allocation = optimalWeights.map((w) => w * investmentAmount);

//     return {
//         weights: optimalWeights,
//         portfolioReturn,
//         portfolioVolatility,
//         portfolioVaR,
//         sharpeRatio,
//         allocation,
//     };
// }

// // POST API function to handle requests
// export async function POST(request) {
//     try {
//         const payload = await request.json();
//         const { symbols, investmentAmount, targetReturn, riskFreeRate } = payload;

        
//         return NextResponse.json({

//         });
//     } catch (error) {
//         console.error('Error in portfolio API:', error);
//         return NextResponse.json({ error: error.message }, { status: 500 });
//     }
// }



// /api/portfolio.js
import { NextResponse } from 'next/server';
const alpha = require('alphavantage')({ key: '7WF63JCXA8P71C8D' });
import { mean, multiply, sum, sqrt, transpose } from 'mathjs';
import { dummy_minimize } from 'optimization-js';  // Import optimization-js

// Utility function to fetch stock data from Alpha Vantage
async function getStockData(symbol) {
    try {
        const data = await alpha.data.monthly(symbol);
        const prices = Object.entries(data['Monthly Time Series'])
            .map(([date, values]) => ({
                date: new Date(date),
                price: parseFloat(values['4. close']),
            }))
            .sort((a, b) => a.date - b.date)
            .filter((item) => item.date >= new Date(Date.now() - 5 * 365 * 24 * 60 * 60 * 1000)) // Last 5 years
            .map((entry) => entry.price);

        if (prices.length < 60) {
            // Pad the prices to ensure a minimum length of 60
            const padding = Array(60 - prices.length).fill(prices[0] || 0); // Avoid undefined if no data
            return [...padding, ...prices];
        }

        return prices.slice(-60); // Return the last 60 prices
    } catch (error) {
        throw new Error(`Error fetching data for ${symbol}: ${error.message}`);
    }
}

// Calculate portfolio return
function portfolioReturn(weights, returns) {
    return sum(multiply(mean(returns, 0), weights)) * 12; // Annualized return
}

// Calculate covariance matrix
function calculateCovarianceMatrix(returns) {
    const numAssets = returns.length;
    const means = returns.map((assetReturns) => mean(assetReturns));
    const covMatrix = Array(numAssets)
        .fill(0)
        .map(() => Array(numAssets).fill(0));

    for (let i = 0; i < numAssets; i++) {
        for (let j = 0; j < numAssets; j++) {
            let cov = 0;
            for (let k = 0; k < returns[i].length; k++) {
                cov +=
                    (returns[i][k] - means[i]) *
                    (returns[j][k] - means[j]);
            }
            covMatrix[i][j] = cov / (returns[i].length - 1);
        }
    }
    return covMatrix;
}

// Calculate portfolio volatility
function portfolioVolatility(weights, returns) {
    const covMatrix = calculateCovarianceMatrix(returns);
    return sqrt(multiply(weights, multiply(covMatrix, weights))) * sqrt(12); // Annualized volatility
}

// Calculate Value at Risk (VaR) at a 95% confidence level
function calculateVaR(volatility, timePeriod = 1) {
    const zScore = -1.645; // 95% confidence
    return zScore * volatility * sqrt(timePeriod);
}

// POST API handler
export async function POST(request) {
    try {
        const payload = await request.json();
        const { symbols, investmentAmount, targetReturn, riskFreeRate } = payload;

        console.log(payload, 'payload')

        if (!symbols || symbols.length < 2) {
            throw new Error('Please provide at least two symbols for portfolio diversification.');
        }

        const stockData = await Promise.all(
            symbols.map(async (symbol) => {
                const data = await getStockData(symbol.symbol);
                return { symbol, data };
            })
        );

        // Prepare price data
        const prices = stockData.map((item) => item.data);
        if (prices.some((priceArray) => priceArray.length !== prices[0].length)) {
            throw new Error('Mismatched data lengths for symbols. Please check the inputs.');
        }

        const returns = prices.map((priceArray) => {
            const percentageChanges = [];
            for (let i = 1; i < priceArray.length; i++) {
                percentageChanges.push((priceArray[i] - priceArray[i - 1]) / priceArray[i - 1]);
            }
            return percentageChanges;
        });

        // Portfolio Optimization
        const numAssets = symbols.length;
        const initialWeights = Array(numAssets).fill(1 / numAssets);

        // Constraints
        const constraints = [
            {
                type: 'eq',
                fun: (weights) => sum(weights) - 1, // Weights sum to 1
            },
            {
                type: 'ineq',
                fun: (weights) => portfolioReturn(weights, returns) - targetReturn, // Meets target return
            },
        ];

        // Objective function for optimization (portfolio volatility)
        const objectiveFunction = (weights) => portfolioVolatility(weights, returns);

        // Define bounds for each weight (between 0 and 1)
        const bounds = Array(numAssets).fill([0.01, 0.99]);

        // Optimization using random search (dummy_minimize)

        const result = dummy_minimize(
            (weights) => {
                const objectiveValue = objectiveFunction(weights);
                console.log(`Trying weights: ${weights}, objective value: ${objectiveValue}`);
                return objectiveValue;
            },
            initialWeights,
            constraints,
            bounds
        );
        
        console.log('Optimization result:', result);
        
        // if (!result.best_x || !result.best_y) {
        //     throw new Error('Portfolio optimization failed. Please check your inputs.');
        // }
        
        // Proceed if optimization succeeds
        const optimalWeights = result.best_x;
        const optReturn = portfolioReturn(optimalWeights, returns);
        const optVolatility = portfolioVolatility(optimalWeights, returns);
        const var95 = calculateVaR(optVolatility);
        const potentialLoss = investmentAmount * var95;
        
        return NextResponse.json({
            success: true,
            portfolio: symbols.map((symbol, index) => ({
                symbol,
                weight: optimalWeights[index],
                allocation: optimalWeights[index] * investmentAmount,
            })),
            metrics: {
                return: optReturn,
                volatility: optVolatility,
                sharpeRatio: (optReturn - riskFreeRate) / optVolatility,
                valueAtRisk: var95,
                potentialLoss,
            },
        });
        
    } catch (error) {
        console.error('Error in portfolio API:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
