import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Calculator, TrendingUp, IndianRupee, Target, Info } from 'lucide-react';
import CurrencySelector, { formatCurrency, getCurrencySymbol } from '../CurrencySelector';

const SIPCalculator = () => {
  const [monthlyInvestment, setMonthlyInvestment] = useState(5000);
  const [expectedReturn, setExpectedReturn] = useState(12);
  const [timePeriod, setTimePeriod] = useState(10);
  const [stepUp, setStepUp] = useState(0);
  const [selectedCurrency, setSelectedCurrency] = useState('INR');

  // Calculations
  const results = useMemo(() => {
    const monthlyRate = expectedReturn / 100 / 12;
    const totalMonths = timePeriod * 12;
    let totalInvested = 0;
    let futureValue = 0;
    let currentMonthlyAmount = monthlyInvestment;
    const yearlyData = [];

    for (let month = 1; month <= totalMonths; month++) {
      // Apply step-up annually
      if (month > 1 && (month - 1) % 12 === 0 && stepUp > 0) {
        currentMonthlyAmount = currentMonthlyAmount * (1 + stepUp / 100);
      }

      totalInvested += currentMonthlyAmount;
      futureValue = (futureValue + currentMonthlyAmount) * (1 + monthlyRate);

      // Store yearly data for chart
      if (month % 12 === 0) {
        yearlyData.push({
          year: month / 12,
          invested: Math.round(totalInvested),
          value: Math.round(futureValue),
          returns: Math.round(futureValue - totalInvested)
        });
      }
    }

    const totalReturns = futureValue - totalInvested;

    return {
      totalInvested: Math.round(totalInvested),
      futureValue: Math.round(futureValue),
      totalReturns: Math.round(totalReturns),
      yearlyData
    };
  }, [monthlyInvestment, expectedReturn, timePeriod, stepUp]);

  const pieData = [
    { name: 'Invested Amount', value: results.totalInvested, color: '#7A1616' },
    { name: 'Returns', value: results.totalReturns, color: '#C9A635' }
  ];



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
                <span>SIP Parameters</span>
              </h2>
            </div>
            <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
              {/* Monthly Investment */}
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                  Monthly Investment ({getCurrencySymbol(selectedCurrency)})
                </label>
                <input
                  type="number"
                  value={monthlyInvestment}
                  onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
                  className="w-full px-3 sm:px-4 py-2 text-base sm:text-lg font-semibold border-2 border-gray-200 rounded-lg focus:border-[#C9A635] focus:outline-none"
                  min="500"
                  step="500"
                />
                <input
                  type="range"
                  value={monthlyInvestment}
                  onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
                  min={500}
                  max={50000}
                  step={500}
                  className="w-full mt-3"
                />
              </div>

              {/* Expected Annual Return */}
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                  Expected Return (%)
                </label>
                <input
                  type="number"
                  value={expectedReturn}
                  onChange={(e) => setExpectedReturn(Number(e.target.value))}
                  className="w-full px-3 sm:px-4 py-2 text-base sm:text-lg font-semibold border-2 border-gray-200 rounded-lg focus:border-[#C9A635] focus:outline-none"
                  min="1"
                  max="30"
                  step="0.5"
                />
                <input
                  type="range"
                  value={expectedReturn}
                  onChange={(e) => setExpectedReturn(Number(e.target.value))}
                  min={1}
                  max={30}
                  step={0.5}
                  className="w-full mt-3"
                />
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
                  max="40"
                />
                <input
                  type="range"
                  value={timePeriod}
                  onChange={(e) => setTimePeriod(Number(e.target.value))}
                  min={1}
                  max={40}
                  step={1}
                  className="w-full mt-3"
                />
              </div>

              {/* Annual Step-up */}
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                  Annual Step-up (%)
                </label>
                <input
                  type="number"
                  value={stepUp}
                  onChange={(e) => setStepUp(Number(e.target.value))}
                  className="w-full px-3 sm:px-4 py-2 text-base sm:text-lg font-semibold border-2 border-gray-200 rounded-lg focus:border-[#C9A635] focus:outline-none"
                  min="0"
                  max="20"
                  step="1"
                />
                <input
                  type="range"
                  value={stepUp}
                  onChange={(e) => setStepUp(Number(e.target.value))}
                  min={0}
                  max={20}
                  step={1}
                  className="w-full mt-3"
                />
                <p className="text-xs text-gray-500 mt-2 hidden sm:block">
                  Optional: 0% - 20%
                </p>
              </div>

              {/* Currency Selector */}
              <CurrencySelector
                selectedCurrency={selectedCurrency}
                onCurrencyChange={setSelectedCurrency}
              />
            </div>
          </div>

          {/* Investment Tip - Hidden on mobile */}
          <div className="hidden lg:block bg-gradient-to-br from-[#C9A635]/10 to-[#7A1616]/5 rounded-2xl shadow-xl border-2 border-[#C9A635]/20 p-6">
            <div className="flex items-start space-x-3">
              <Info className="w-5 h-5 text-[#7A1616] mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-[#7A1616] mb-2">Pro Tip</h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Increase your SIP by 5-10% annually to counter inflation and boost returns.
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
          <div className="grid md:grid-cols-3 gap-4 sm:gap-6">
            <div className="bg-white rounded-xl shadow-xl border-2 border-gray-100 p-4 sm:p-6 text-center">
              <div className="bg-blue-100 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <IndianRupee className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
              </div>
              <h3 className="text-xs sm:text-sm font-medium text-gray-600 mb-2">Total Invested</h3>
              <p className="text-lg sm:text-2xl font-bold text-gray-900">{formatCurrency(results.totalInvested, selectedCurrency)}</p>
            </div>

            <div className="bg-white rounded-xl shadow-xl border-2 border-gray-100 p-4 sm:p-6 text-center">
              <div className="bg-green-100 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
              </div>
              <h3 className="text-xs sm:text-sm font-medium text-gray-600 mb-2">Returns</h3>
              <p className="text-lg sm:text-2xl font-bold text-green-600">{formatCurrency(results.totalReturns, selectedCurrency)}</p>
            </div>

            <div className="bg-gradient-to-br from-[#7A1616] to-[#8B1A1A] rounded-xl shadow-xl p-4 sm:p-6 text-center text-white">
              <div className="bg-white/20 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Target className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <h3 className="text-xs sm:text-sm font-medium text-white/90 mb-2">Future Value</h3>
              <p className="text-lg sm:text-2xl font-bold text-white">{formatCurrency(results.futureValue, selectedCurrency)}</p>
            </div>
          </div>

          {/* Charts - Hidden on mobile */}
          <div className="hidden md:grid md:grid-cols-2 gap-6">
            {/* Growth Chart */}
            <div className="bg-white rounded-2xl shadow-xl border-2 border-gray-100 overflow-hidden">
              <div className="border-b border-gray-100 p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                  Growth Over Time
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
                        tickFormatter={(value) => `${getCurrencySymbol(selectedCurrency)}${(value / 100000).toFixed(0)}L`}
                      />
                      <Tooltip
                        formatter={(value, name) => [formatCurrency(value, selectedCurrency), name]}
                        labelFormatter={(label) => `Year ${label}`}
                      />
                      <Line
                        type="monotone"
                        dataKey="invested"
                        stroke="#7A1616"
                        strokeWidth={2}
                        name="Invested"
                      />
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke="#C9A635"
                        strokeWidth={2}
                        name="Value"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Pie Chart */}
            <div className="bg-white rounded-2xl shadow-xl border-2 border-gray-100 overflow-hidden">
              <div className="border-b border-gray-100 p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                  Breakdown
                </h3>
              </div>
              <div className="p-4 sm:p-6">
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={70}
                        dataKey="value"
                        label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => formatCurrency(value, selectedCurrency)} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-[#7A1616] rounded-full"></div>
                      <span className="text-gray-600">Invested</span>
                    </div>
                    <span className="font-semibold text-gray-900">{formatCurrency(results.totalInvested, selectedCurrency)}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-[#C9A635] rounded-full"></div>
                      <span className="text-gray-600">Returns</span>
                    </div>
                    <span className="font-semibold text-green-600">{formatCurrency(results.totalReturns, selectedCurrency)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Breakdown Table */}
          <div className="bg-white rounded-2xl shadow-xl border-2 border-gray-100 overflow-hidden">
            <div className="border-b border-gray-100 p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                Year-wise Breakdown
              </h3>
            </div>
            <div className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-xs sm:text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-3 sm:px-6 py-2 sm:py-3 text-left font-medium text-gray-500">Year</th>
                      <th className="px-3 sm:px-6 py-2 sm:py-3 text-right font-medium text-gray-500">Invested</th>
                      <th className="px-3 sm:px-6 py-2 sm:py-3 text-right font-medium text-gray-500">Returns</th>
                      <th className="px-3 sm:px-6 py-2 sm:py-3 text-right font-medium text-gray-500">Value</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {results.yearlyData.slice(-5).map((data, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-3 sm:px-6 py-2 sm:py-4 font-medium text-gray-900">
                          Y{data.year}
                        </td>
                        <td className="px-3 sm:px-6 py-2 sm:py-4 text-right text-gray-900">
                          {formatCurrency(data.invested, selectedCurrency)}
                        </td>
                        <td className="px-3 sm:px-6 py-2 sm:py-4 text-right text-green-600">
                          {formatCurrency(data.returns, selectedCurrency)}
                        </td>
                        <td className="px-3 sm:px-6 py-2 sm:py-4 text-right font-semibold text-gray-900">
                          {formatCurrency(data.value, selectedCurrency)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SIPCalculator;
