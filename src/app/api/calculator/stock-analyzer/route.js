import axiosInstance from '@/app/utils/axiosInstance';
import { NextResponse } from 'next/server';

// Function to safely convert a string to a float
function safeFloat(value) {
    const num = parseFloat(value);
    return isNaN(num) ? 0.0 : num;
}

// Function to calculate RSI
function calculateRSI(prices) {
    const gains = [];
    const losses = [];

    for (let i = 1; i < prices.length; i++) {
        const change = prices[i] - prices[i - 1];
        if (change > 0) {
            gains.push(change);
        } else {
            losses.push(Math.abs(change));
        }
    }

    const avgGain = gains.reduce((a, b) => a + b, 0) / 14;
    const avgLoss = losses.reduce((a, b) => a + b, 0) / 14;
    const rs = avgGain / avgLoss;
    return 100 - (100 / (1 + rs));
}

// Function to analyze stock based on term (short or long term)
async function analyzeStock(stockSymbol, term) {
    stockSymbol = stockSymbol.toUpperCase();
    const apiKey = '7WF63JCXA8P71C8D';

    try {
        // Fetch company overview
        const overviewResponse = await axiosInstance.get(`https://www.alphavantage.co/query?function=OVERVIEW&symbol=${stockSymbol}&apikey=${apiKey}`);
        const dataCompany = overviewResponse.data;

        const companyName = dataCompany.Name || 'N/A';
        const peRatio = safeFloat(dataCompany.PERatio);
        const pbRatio = safeFloat(dataCompany.PriceToBookRatio);
        const epsGrowth = safeFloat(dataCompany.EPS);

        // Fetch weekly prices
        const weeklyPricesResponse = await axiosInstance.get(`https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY_ADJUSTED&symbol=${stockSymbol}&apikey=${apiKey}&outputsize=full`);
        const weeklyData = weeklyPricesResponse.data['Weekly Adjusted Time Series'];

        // Extract weekly closing prices and calculate intrinsic value
        const weeklyPrices = Object.values(weeklyData).map(day => parseFloat(day['4. close']));
        const intrinsicValue = weeklyPrices.reduce((a, b) => a + b, 0) / weeklyPrices.length;

        // Fetch current stock price
        const currentPriceResponse = await axiosInstance.get(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stockSymbol}&apikey=${apiKey}`);
        const currentPrice = safeFloat(currentPriceResponse.data['Global Quote']['05. price']);

        // Recommendation logic
        let recommendation, explanation;
        if (term === 'Long Term') {
            if (intrinsicValue > currentPrice) {
                recommendation = 'Strong Buy';
                explanation = `The stock is undervalued for the long term, meaning it is priced lower than its actual worth. This suggests it could be a good investment for future growth.`;
                // explanation = `The stock is **undervalued** for the long term. Intrinsic Value: $${intrinsicValue.toFixed(2)}, Current Price: $${currentPrice.toFixed(2)}. Suggests future growth.`;
            } else {
                recommendation = 'Sell';
                explanation = `The stock is overvalued for the long term, meaning it is priced higher than what it's worth. This suggests it might not grow much and could be a good time to sell.`;
                // explanation = `The stock is **overvalued** for the long term. Intrinsic Value: $${intrinsicValue.toFixed(2)}, Current Price: $${currentPrice.toFixed(2)}. Suggests limited growth.`;
            }
        } else {
            if (peRatio < 15 && pbRatio < 1.5) {
                recommendation = 'Buy';
                explanation = `The stock is undervalued for the short term, meaning it's cheap compared to what the company earns and owns. This could make it a good buy right now.`;
                // explanation = `The stock is **undervalued** for the short term with a P/E ratio of ${peRatio} and a P/B ratio of ${pbRatio}. Suggests it's a potential buy.`;
            } else if (peRatio > 25 || pbRatio > 3.0) {
                recommendation = 'Sell';
                explanation = `The stock is overvalued for the short term, meaning it's expensive compared to what the company earns and owns. This could be a good time to sell before the price drops.`;
                // explanation = `The stock is **overvalued** for the short term with a P/E ratio of ${peRatio} and a P/B ratio of ${pbRatio}. Suggests a potential sell.`;
            } else {
                recommendation = 'Hold';
                explanation = `The stock is fairly priced for the short term, meaning it's neither too cheap nor too expensive. It might be best to wait and see how it performs before buying or selling.`;
                // explanation = `The stock is **fairly priced** for the short term with a P/E ratio of ${peRatio} and a P/B ratio of ${pbRatio}. Suggests waiting for further developments.`;
            }
        }

        // Calculate RSI and determine stock trend
        const rsi = calculateRSI(weeklyPrices.slice(0, 14));
        let trend;
        if (rsi <= 30) {
            trend = 'Bearish';
        } else if (rsi >= 70) {
            trend = 'Bullish';
        } else if (rsi < 50) {
            trend = 'Downtrend';
        } else {
            trend = 'Uptrend';
        }

        // Display results
        console.log(`\nCompany Name: ${companyName} (${stockSymbol})`);
        console.log(`Intrinsic Stock Value: $${intrinsicValue.toFixed(2)}`);
        console.log(`Current Stock Price: $${currentPrice.toFixed(2)}`);
        console.log(`Stock Trend: ${trend}`);
        console.log(`\nValuation Status: ${recommendation}`);
        console.log(`Explanation: ${explanation}`);
        console.log("\nDisclaimer: This analysis is for educational purposes only and does not constitute financial advice. Please consult a financial professional before making any investment decisions.");

        return {
            companyName: companyName,
            symbol: stockSymbol,
            intrinsicStockValue: `$${intrinsicValue.toFixed(2)}`,
            currentStockPrice: `$${currentPrice.toFixed(2)}`,
            stockTrend: trend,
            valuationStatus: recommendation,
            explanation: explanation,
        };

    } catch (error) {
        console.error("Error fetching data:", error.message);
    }
}

export async function POST(request, response) {

    const payload = await request.json();

    const { symbol, term } = payload;

    const res = await analyzeStock(symbol, term);
    console.log(res)
    return NextResponse.json({
        companyName: res.companyName,
        symbol: res.symbol,
        intrinsicStockValue: res.intrinsicStockValue,
        currentStockPrice: res.currentStockPrice,
        stockTrend: res.stockTrend,
        valuationStatus: res.valuationStatus,
        explanation: res.explanation,
    })
}

// // Prompt user for input
// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout
// });

// rl.question("Enter stock symbol: ", stockSymbol => {
//   rl.question("Enter term (Short Term or Long Term): ", term => {
//     analyzeStock(stockSymbol, term);
//     rl.close();
//   });
// });
