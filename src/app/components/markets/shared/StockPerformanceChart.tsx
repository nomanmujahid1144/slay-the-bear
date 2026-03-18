// src/app/components/markets/shared/StockPerformanceChart.tsx

'use client';

import { useMemo } from 'react';
import { LineChart, Line, ResponsiveContainer, XAxis } from 'recharts';

interface StockPerformanceChartProps {
    symbol: string;
    currentPrice: number;
    change: number;
    changePercent: number;
    timerange: string;
}

interface ChartDataPoint {
    timestamp: string;
    value: number;
}

/**
 * Generate stock performance chart data
 * Shows how THIS stock has performed over the selected timerange
 */
const generateStockChartData = (
    currentPrice: number, 
    changePercent: number, 
    timerange: string
): ChartDataPoint[] => {
    // Number of data points based on timerange
    const pointsMap: Record<string, number> = {
        '1D': 48,   // Every 30 minutes
        '1M': 30,   // Daily
        '3M': 90,   // Daily
        '1Y': 52,   // Weekly
        '5Y': 60,   // Monthly
        'All': 120  // Monthly
    };

    const points = pointsMap[timerange] || 48;
    const data: ChartDataPoint[] = [];
    
    // Calculate starting price based on change percentage
    const startPrice = currentPrice / (1 + changePercent / 100);
    
    // Generate price progression over time
    for (let i = 0; i < points; i++) {
        const progress = i / (points - 1); // 0 to 1
        
        // Calculate timestamp label
        const now = new Date();
        let timestamp: string = '';
        
        switch (timerange) {
            case '1D':
                const hoursAgo = 24 - (i * 24 / points);
                const time = new Date(now.getTime() - hoursAgo * 60 * 60 * 1000);
                timestamp = time.toLocaleTimeString('en-US', { 
                    hour: '2-digit', 
                    minute: '2-digit',
                    hour12: false 
                });
                break;
                
            case '1M':
                const daysAgo = 30 - i;
                const date1M = new Date(now.getTime() - daysAgo * 24 * 60 * 60 * 1000);
                timestamp = date1M.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                break;
                
            case '3M':
                const daysAgo3M = 90 - i;
                const date3M = new Date(now.getTime() - daysAgo3M * 24 * 60 * 60 * 1000);
                timestamp = i % 15 === 0 ? date3M.toLocaleDateString('en-US', { month: 'short' }) : '';
                break;
                
            case '1Y':
                const monthsAgo = 12 - (i * 12 / points);
                const date1Y = new Date(now.getTime() - monthsAgo * 30 * 24 * 60 * 60 * 1000);
                timestamp = date1Y.toLocaleDateString('en-US', { month: 'short' });
                break;
                
            case '5Y':
                const monthsAgo5Y = 60 - i;
                const date5Y = new Date(now.getTime() - monthsAgo5Y * 30 * 24 * 60 * 60 * 1000);
                timestamp = i % 12 === 0 ? date5Y.getFullYear().toString() : '';
                break;
                
            default: // 'All'
                const monthsAgoAll = 120 - i;
                const dateAll = new Date(now.getTime() - monthsAgoAll * 30 * 24 * 60 * 60 * 1000);
                timestamp = i % 24 === 0 ? dateAll.getFullYear().toString() : '';
        }
        
        // Calculate price progression from start to current
        const trendValue = startPrice + ((currentPrice - startPrice) * progress);
        
        // Add realistic variance (smaller for actual stock data)
        const variance = (Math.random() - 0.5) * Math.abs(currentPrice * 0.02);
        const value = trendValue + variance;
        
        data.push({
            timestamp,
            value: parseFloat(value.toFixed(2))
        });
    }
    
    return data;
};

export const StockPerformanceChart = ({ 
    symbol,
    currentPrice,
    change,
    changePercent,
    timerange
}: StockPerformanceChartProps) => {
    
    // Generate chart data for this specific stock
    const chartData = useMemo(() => {
        return generateStockChartData(currentPrice, changePercent, timerange);
    }, [currentPrice, changePercent, timerange]);

    // Chart color based on performance
    const chartColor = changePercent >= 0 ? '#3b82f6' : '#ef4444';

    if (chartData.length === 0) {
        return null;
    }

    return (
        <div className="stock-performance-chart">
            <ResponsiveContainer width="100%" height={180}>
                <LineChart 
                    data={chartData}
                    margin={{ top: 10, right: 10, left: -20, bottom: 5 }}
                >
                    {/* X-Axis */}
                    <XAxis 
                        dataKey="timestamp"
                        axisLine={false}
                        tickLine={false}
                        tick={{ 
                            fill: '#6b7280', 
                            fontSize: 11,
                            fontWeight: 500
                        }}
                        interval="preserveStartEnd"
                    />
                    
                    {/* Stock price line */}
                    <Line
                        type="monotone"
                        dataKey="value"
                        stroke={chartColor}
                        strokeWidth={2.5}
                        dot={false}
                        isAnimationActive={true}
                        animationDuration={500}
                        animationEasing="ease-in-out"
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};