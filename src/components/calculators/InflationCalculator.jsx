import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Calculator, TrendingDown, AlertTriangle, Info } from 'lucide-react';
import CurrencySelector, { formatCurrency, getCurrencySymbol } from '../CurrencySelector';

const InflationCalculator = () => {
  const [currentAmount, setCurrentAmount] = useState(100000);
  const [inflationRate, setInflationRate] = useState(6);
  const [timePeriod, setTimePeriod] = useState(10);
  const [targetAmount, setTargetAmount] = useState(200000);
  const [selectedCurrency, setSelectedCurrency] = useState('INR');

  // Calculations
  const results = useMemo(() => {
    // Future cost due to inflation
    const futureCost = currentAmount * Math.pow(1 + inflationRate / 100, timePeriod);

    // Purchasing power reduction
    const purchasingPowerLoss = futureCost - currentAmount;
    const purchasingPowerReduction = ((futureCost - currentAmount) / futureCost) * 100;

    // Required amount today to buy target amount in future
    const requiredTodayForTarget = targetAmount / Math.pow(1 + inflationRate / 100, timePeriod);

    // Year-wise inflation impact
    const yearlyData = [];
    for (let year = 1; year <= timePeriod; year++) {
      const inflatedCost = currentAmount * Math.pow(1 + inflationRate / 100, year);
      const purchasingPower = (currentAmount / inflatedCost) * 100;
      yearlyData.push({
        year,
        inflatedCost: Math.round(inflatedCost),
        purchasingPower: Math.round(purchasingPower),
        realValue: Math.round(currentAmount)
      });
    }

    // Different inflation scenarios
    const scenarios = [];
    const inflationRates = [3, 5, 6, 8, 10];
    inflationRates.forEach(rate => {
      const futureCostScenario = currentAmount * Math.pow(1 + rate / 100, timePeriod);
      scenarios.push({
        rate: `${rate}%`,
        futureCost: Math.round(futureCostScenario),
        difference: Math.round(futureCostScenario - currentAmount)
      });
    });

    // Common items inflation impact
    const commonItems = [
      { name: 'Petrol (per litre)', current: 100 },
      { name: 'Movie Ticket', current: 300 },
      { name: 'Restaurant Meal', current: 800 },
      { name: 'Monthly Grocery', current: 15000 },
      { name: 'School Fee (Annual)', current: 100000 }
    ];

    const itemsInflationData = commonItems.map(item => ({
      ...item,
      future: Math.round(item.current * Math.pow(1 + inflationRate / 100, timePeriod)),
      increase: Math.round((item.current * Math.pow(1 + inflationRate / 100, timePeriod)) - item.current)
    }));

    return {
      futureCost: Math.round(futureCost),
      purchasingPowerLoss: Math.round(purchasingPowerLoss),
      purchasingPowerReduction: purchasingPowerReduction.toFixed(1),
      requiredTodayForTarget: Math.round(requiredTodayForTarget),
      yearlyData,
      scenarios,
      itemsInflationData
    };
  }, [currentAmount, inflationRate, timePeriod, targetAmount]);



  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
        {/* Input Section */}
        <motion.div
          className="lg:col-span-1 space-y-6"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-white rounded-2xl shadow-xl border-2 border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-[#7A1616] to-[#8B1A1A] text-white p-4 sm:p-6">
              <h2 className="flex items-center space-x-2 text-lg sm:text-xl font-bold">
                <Calculator className="w-5 h-5 sm:w-6 sm:h-6" />
                <span>Inflation Analysis</span>
              </h2>
            </div>
            <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
              <CurrencySelector
                selectedCurrency={selectedCurrency}
                onCurrencyChange={setSelectedCurrency}
              />
              {/* Current Amount/Price */}
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                  Current Amount/Price (₹)
                </label>
                <input
                  type="number"
                  value={currentAmount}
                  onChange={(e) => setCurrentAmount(Number(e.target.value))}
                  className="w-full px-3 sm:px-4 py-2 text-base sm:text-lg font-semibold border-2 border-gray-200 rounded-lg focus:border-[#C9A635] focus:outline-none"
                  min="1000"
                  step="1000"
                />
                <input
                  type="range"
                  value={currentAmount}
                  onChange={(e) => setCurrentAmount(Number(e.target.value))}
                  min={1000}
                  max={1000000}
                  step={1000}
                  className="w-full mt-3"
                />
              </div>

              {/* Inflation Rate */}
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                  Inflation Rate (% per year)
                </label>
                <input
                  type="number"
                  value={inflationRate}
                  onChange={(e) => setInflationRate(Number(e.target.value))}
                  className="w-full px-3 sm:px-4 py-2 text-base sm:text-lg font-semibold border-2 border-gray-200 rounded-lg focus:border-[#C9A635] focus:outline-none"
                  min="1"
                  max="15"
                  step="0.5"
                />
                <input
                  type="range"
                  value={inflationRate}
                  onChange={(e) => setInflationRate(Number(e.target.value))}
                  min={1}
                  max={15}
                  step={0.5}
                  className="w-full mt-3"
                />
                <p className="text-xs text-gray-500 mt-2 hidden sm:block">
                  India's average: 4-8%
                </p>
              </div>

              {/* Time Period */}
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                  Time Period (Years)
                </label>
                <input
                  type="number"
                  value={timePeriod}
                  onChange={(e) => setTimePeriod(Number(e.target.value))}
                  className="w-full px-3 sm:px-4 py-2 text-base sm:text-lg font-semibold border-2 border-gray-200 rounded-lg focus:border-[#C9A635] focus:outline-none"
                  min="1"
                  max="30"
                />
                <input
                  type="range"
                  value={timePeriod}
                  onChange={(e) => setTimePeriod(Number(e.target.value))}
                  min={1}
                  max={30}
                  step={1}
                  className="w-full mt-3"
                />
              </div>

              {/* Target Amount */}
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                  Target Future Amount (₹)
                </label>
                <input
                  type="number"
                  value={targetAmount}
                  onChange={(e) => setTargetAmount(Number(e.target.value))}
                  className="w-full px-3 sm:px-4 py-2 text-base sm:text-lg font-semibold border-2 border-gray-200 rounded-lg focus:border-[#C9A635] focus:outline-none"
                  min="1000"
                  step="1000"
                />
                <input
                  type="range"
                  value={targetAmount}
                  onChange={(e) => setTargetAmount(Number(e.target.value))}
                  min={1000}
                  max={2000000}
                  step={1000}
                  className="w-full mt-3"
                />
              </div>
            </div>
          </div>

          {/* Inflation Alert - Hidden on mobile */}
          <div className="hidden lg:block bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl shadow-xl border-2 border-red-200 p-6">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-red-600 mb-2">Inflation Alert</h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  ₹{currentAmount.toLocaleString('en-IN')} today will cost ₹{results.futureCost.toLocaleString('en-IN')} in {timePeriod} years!
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Results Section */}
        <motion.div
          className="lg:col-span-2 space-y-6 lg:space-y-8"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Summary Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <div className="bg-white rounded-xl shadow-xl border-2 border-gray-100 p-3 sm:p-4 text-center">
              <div className="bg-blue-100 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3">
                {getCurrencySymbol(selectedCurrency, "w-4 h-4 sm:w-5 sm:h-5 text-blue-600")}
              </div>
              <h3 className="text-xs font-medium text-gray-600 mb-1">Current</h3>
              <p className="text-sm sm:text-lg font-bold text-gray-900">{formatCurrency(currentAmount, selectedCurrency)}</p>
            </div>

            <div className="bg-white rounded-xl shadow-xl border-2 border-gray-100 p-3 sm:p-4 text-center">
              <div className="bg-red-100 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3">
                <TrendingDown className="w-4 h-4 sm:w-5 sm:h-5 text-red-600" />
              </div>
              <h3 className="text-xs font-medium text-gray-600 mb-1">Future</h3>
              <p className="text-sm sm:text-lg font-bold text-red-600">{formatCurrency(results.futureCost, selectedCurrency)}</p>
            </div>

            <div className="bg-gradient-to-br from-[#7A1616] to-[#8B1A1A] rounded-xl shadow-xl p-3 sm:p-4 text-center text-white">
              <div className="bg-white/20 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3">
                <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <h3 className="text-xs font-medium text-white/90 mb-1">Loss</h3>
              <p className="text-sm sm:text-lg font-bold text-white">{results.purchasingPowerReduction}%</p>
            </div>

            <div className="bg-white rounded-xl shadow-xl border-2 border-gray-100 p-3 sm:p-4 text-center">
              <div className="bg-green-100 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3">
                {getCurrencySymbol(selectedCurrency, "w-4 h-4 sm:w-5 sm:h-5 text-green-600")}
              </div>
              <h3 className="text-xs font-medium text-gray-600 mb-1">Need Today</h3>
              <p className="text-sm sm:text-lg font-bold text-green-600">{formatCurrency(results.requiredTodayForTarget, selectedCurrency)}</p>
            </div>
          </div>

          {/* Charts - Hidden on mobile */}
          <div className="hidden md:grid md:grid-cols-2 gap-6">
            {/* Inflation Impact Over Time */}
            <div className="bg-white rounded-2xl shadow-xl border-2 border-gray-100 overflow-hidden">
              <div className="border-b border-gray-100 p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                  Impact Over Time
                </h3>
              </div>
              <div className="p-4 sm:p-6">
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={results.yearlyData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis
                        dataKey="year"
                        stroke="#666"
                        fontSize={12}
                      />
                      <YAxis
                        stroke="#666"
                        fontSize={12}
                        tickFormatter={(value) => formatCurrency(value, selectedCurrency)}
                      />
                      <Tooltip
                        formatter={(value, name) => {
                          if (name === 'Purchasing Power') {
                            return [`${value}%`, name];
                          }
                          return [formatCurrency(value, selectedCurrency), name];
                        }}
                        labelFormatter={(label) => `Year ${label}`}
                      />
                      <Line
                        type="monotone"
                        dataKey="realValue"
                        stroke="#10B981"
                        strokeWidth={2}
                        name="Today's Value"
                        strokeDasharray="5 5"
                      />
                      <Line
                        type="monotone"
                        dataKey="inflatedCost"
                        stroke="#EF4444"
                        strokeWidth={3}
                        name="Inflated Cost"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Different Inflation Scenarios */}
            <div className="bg-white rounded-2xl shadow-xl border-2 border-gray-100 overflow-hidden">
              <div className="border-b border-gray-100 p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                  Scenarios
                </h3>
              </div>
              <div className="p-4 sm:p-6">
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={results.scenarios}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis
                        dataKey="rate"
                        stroke="#666"
                        fontSize={12}
                      />
                      <YAxis
                        stroke="#666"
                        fontSize={12}
                        tickFormatter={(value) => formatCurrency(value, selectedCurrency)}
                      />
                      <Tooltip
                        formatter={(value, name) => [formatCurrency(value, selectedCurrency), name]}
                      />
                      <Bar
                        dataKey="futureCost"
                        fill="#C9A635"
                        name="Future Cost"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>

          {/* Common Items Inflation Impact */}
          <div className="bg-white rounded-2xl shadow-xl border-2 border-gray-100 overflow-hidden">
            <div className="border-b border-gray-100 p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                Real-World Impact ({timePeriod}Y)
              </h3>
            </div>
            <div className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-xs sm:text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-3 sm:px-6 py-2 sm:py-3 text-left font-medium text-gray-500">Item</th>
                      <th className="px-3 sm:px-6 py-2 sm:py-3 text-right font-medium text-gray-500">Now</th>
                      <th className="px-3 sm:px-6 py-2 sm:py-3 text-right font-medium text-gray-500">Future</th>
                      <th className="px-3 sm:px-6 py-2 sm:py-3 text-right font-medium text-gray-500 hidden sm:table-cell">+</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {results.itemsInflationData.map((item, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-3 sm:px-6 py-2 sm:py-4 font-medium text-gray-900">
                          {item.name}
                        </td>
                        <td className="px-3 sm:px-6 py-2 sm:py-4 text-right text-gray-900">
                          {formatCurrency(item.current, selectedCurrency)}
                        </td>
                        <td className="px-3 sm:px-6 py-2 sm:py-4 text-right text-red-600 font-semibold">
                          {formatCurrency(item.future, selectedCurrency)}
                        </td>
                        <td className="px-3 sm:px-6 py-2 sm:py-4 text-right text-orange-600 hidden sm:table-cell">
                          {formatCurrency(item.increase, selectedCurrency)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Investment Recommendations */}
          <div className="bg-gradient-to-br from-[#C9A635]/10 to-[#7A1616]/5 rounded-2xl shadow-xl border-2 border-[#C9A635]/20 p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-semibold text-[#7A1616] flex items-center space-x-2 mb-4">
              <Info className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Beat Inflation</span>
            </h3>
            <div className="grid md:grid-cols-3 gap-4 sm:gap-6">
              <div className="text-center bg-white/50 rounded-lg p-3 sm:p-4">
                <h4 className="font-semibold text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base">Equity Funds</h4>
                <p className="text-xs sm:text-sm text-gray-700 mb-1 sm:mb-2">12-15% Return</p>
                <p className="text-xs text-gray-600">Long-term (5+ years)</p>
              </div>

              <div className="text-center bg-white/50 rounded-lg p-3 sm:p-4">
                <h4 className="font-semibold text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base">Balanced Funds</h4>
                <p className="text-xs sm:text-sm text-gray-700 mb-1 sm:mb-2">10-12% Return</p>
                <p className="text-xs text-gray-600">Moderate risk</p>
              </div>

              <div className="text-center bg-white/50 rounded-lg p-3 sm:p-4">
                <h4 className="font-semibold text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base">Gold/REITs</h4>
                <p className="text-xs sm:text-sm text-gray-700 mb-1 sm:mb-2">8-10% Return</p>
                <p className="text-xs text-gray-600">Inflation hedge</p>
              </div>
            </div>

            <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-white/50 rounded-lg">
              <h4 className="font-semibold text-[#7A1616] mb-2 text-sm sm:text-base">Key Takeaway</h4>
              <p className="text-xs sm:text-sm text-gray-700">
                Aim for <strong>{inflationRate + 2}%+</strong> returns to beat inflation. Diversify with equity for long-term goals.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default InflationCalculator;
