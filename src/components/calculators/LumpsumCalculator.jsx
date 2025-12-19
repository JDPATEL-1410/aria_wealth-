import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Calculator, TrendingUp, Target, Info } from 'lucide-react';
import CurrencySelector, { formatCurrency, getCurrencySymbol } from '../CurrencySelector';

const LumpsumCalculator = () => {
  const [investment, setInvestment] = useState(100000);
  const [expectedReturn, setExpectedReturn] = useState(12);
  const [timePeriod, setTimePeriod] = useState(10);
  const [selectedCurrency, setSelectedCurrency] = useState('INR');

  // Calculations
  const results = useMemo(() => {
    const annualRate = expectedReturn / 100;
    const futureValue = investment * Math.pow(1 + annualRate, timePeriod);
    const totalReturns = futureValue - investment;

    // Year-wise data
    const yearlyData = [];
    for (let year = 1; year <= timePeriod; year++) {
      const value = investment * Math.pow(1 + annualRate, year);
      yearlyData.push({
        year,
        value: Math.round(value),
        returns: Math.round(value - investment)
      });
    }

    // Compound interest breakdown
    const compoundData = [];
    for (let year = 1; year <= Math.min(timePeriod, 10); year++) {
      const principal = investment;
      const interest = investment * Math.pow(1 + annualRate, year) - investment;
      compoundData.push({
        year: `Year ${year}`,
        principal: Math.round(principal),
        interest: Math.round(interest)
      });
    }

    return {
      investment,
      futureValue: Math.round(futureValue),
      totalReturns: Math.round(totalReturns),
      yearlyData,
      compoundData,
      annualizedReturn: ((Math.pow(futureValue / investment, 1 / timePeriod) - 1) * 100).toFixed(2)
    };
  }, [investment, expectedReturn, timePeriod]);



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
                <span>Investment Details</span>
              </h2>
            </div>
            <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
              {/* Currency Selector */}
              <CurrencySelector
                selectedCurrency={selectedCurrency}
                onCurrencyChange={setSelectedCurrency}
              />
              {/* Investment Amount */}
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                  Investment Amount (₹)
                </label>
                <input
                  type="number"
                  value={investment}
                  onChange={(e) => setInvestment(Number(e.target.value))}
                  className="w-full px-3 sm:px-4 py-2 text-base sm:text-lg font-semibold border-2 border-gray-200 rounded-lg focus:border-[#C9A635] focus:outline-none"
                  min="5000"
                  step="5000"
                />
                <input
                  type="range"
                  value={investment}
                  onChange={(e) => setInvestment(Number(e.target.value))}
                  min={5000}
                  max={5000000}
                  step={5000}
                  className="w-full mt-3"
                />
              </div>

              {/* Expected Return */}
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
                  Investment Period (Years)
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
            </div>
          </div>

          {/* Investment Strategy - Hidden on mobile */}
          <div className="hidden lg:block bg-gradient-to-br from-[#C9A635]/10 to-[#7A1616]/5 rounded-2xl shadow-xl border-2 border-[#C9A635]/20 p-6">
            <div className="flex items-start space-x-3">
              <Info className="w-5 h-5 text-[#7A1616] mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-[#7A1616] mb-2">Lumpsum Strategy</h3>
                <p className="text-gray-700 text-sm leading-relaxed mb-3">
                  Lumpsum works best at lower market levels. Consider timing and risk tolerance.
                </p>
                <div className="text-xs text-gray-600">
                  <div className="mb-1"><strong>Best for:</strong> Market corrections</div>
                  <div><strong>Risk:</strong> Market timing</div>
                </div>
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
              <h3 className="text-xs font-medium text-gray-600 mb-1">Investment</h3>
              <p className="text-sm sm:text-lg font-bold text-gray-900">{formatCurrency(results.investment, selectedCurrency)}</p>
            </div>

            <div className="bg-white rounded-xl shadow-xl border-2 border-gray-100 p-3 sm:p-4 text-center">
              <div className="bg-green-100 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3">
                <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
              </div>
              <h3 className="text-xs font-medium text-gray-600 mb-1">Returns</h3>
              <p className="text-sm sm:text-lg font-bold text-green-600">{formatCurrency(results.totalReturns, selectedCurrency)}</p>
            </div>

            <div className="bg-gradient-to-br from-[#7A1616] to-[#8B1A1A] rounded-xl shadow-xl p-3 sm:p-4 text-center text-white">
              <div className="bg-white/20 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3">
                <Target className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <h3 className="text-xs font-medium text-white/90 mb-1">Future Value</h3>
              <p className="text-sm sm:text-lg font-bold text-white">{formatCurrency(results.futureValue, selectedCurrency)}</p>
            </div>

            <div className="bg-white rounded-xl shadow-xl border-2 border-gray-100 p-3 sm:p-4 text-center">
              <div className="bg-purple-100 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3">
                <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
              </div>
              <h3 className="text-xs font-medium text-gray-600 mb-1">CAGR</h3>
              <p className="text-sm sm:text-lg font-bold text-purple-600">{results.annualizedReturn}%</p>
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
                        tickFormatter={(value) => formatCurrency(value, selectedCurrency)}
                      />
                      <Tooltip
                        formatter={(value, name) => [formatCurrency(value, selectedCurrency), name]}
                        labelFormatter={(label) => `Year ${label}`}
                      />
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke="#C9A635"
                        strokeWidth={3}
                        name="Investment Value"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Compound Interest Breakdown */}
            <div className="bg-white rounded-2xl shadow-xl border-2 border-gray-100 overflow-hidden">
              <div className="border-b border-gray-100 p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                  Compound Growth
                </h3>
              </div>
              <div className="p-4 sm:p-6">
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={results.compoundData.slice(-8)}>
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
                        formatter={(value, name) => [formatCurrency(value, selectedCurrency), name]}
                      />
                      <Bar
                        dataKey="principal"
                        stackId="a"
                        fill="#7A1616"
                        name="Principal"
                      />
                      <Bar
                        dataKey="interest"
                        stackId="a"
                        fill="#C9A635"
                        name="Interest"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>

          {/* Comparison with Different Returns */}
          <div className="bg-white rounded-2xl shadow-xl border-2 border-gray-100 overflow-hidden">
            <div className="border-b border-gray-100 p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                Different Return Rates
              </h3>
            </div>
            <div className="p-4 sm:p-6">
              <div className="grid md:grid-cols-3 gap-3 sm:gap-4">
                {[8, 12, 15].map((rate) => {
                  const futureValue = investment * Math.pow(1 + rate / 100, timePeriod);
                  const returns = futureValue - investment;
                  return (
                    <div key={rate} className={`p-3 sm:p-4 rounded-lg border-2 ${rate === expectedReturn
                        ? 'border-[#7A1616] bg-[#7A1616]/5'
                        : 'border-gray-200 bg-gray-50'
                      }`}>
                      <div className="text-center">
                        <h4 className="text-base sm:text-lg font-bold text-gray-900 mb-2">{rate}%</h4>
                        <div className="space-y-1">
                          <p className="text-xs sm:text-sm text-gray-600">Future Value</p>
                          <p className="text-base sm:text-xl font-bold text-[#7A1616]">{formatCurrency(futureValue, selectedCurrency)}</p>
                          <p className="text-xs sm:text-sm text-gray-600 hidden sm:block">Returns</p>
                          <p className="text-sm sm:text-lg font-semibold text-green-600">{formatCurrency(returns, selectedCurrency)}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Investment Scenarios */}
          <div className="bg-white rounded-2xl shadow-xl border-2 border-gray-100 overflow-hidden">
            <div className="border-b border-gray-100 p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                Investment Scenarios
              </h3>
            </div>
            <div className="p-4 sm:p-6">
              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-3 sm:space-y-4">
                  <h4 className="font-semibold text-gray-900 text-sm sm:text-base">Conservative (8%)</h4>
                  <div className="bg-blue-50 p-3 sm:p-4 rounded-lg">
                    <div className="text-xs sm:text-sm text-gray-600 mb-2">Investment: {formatCurrency(investment, selectedCurrency)}</div>
                    <div className="text-base sm:text-lg font-bold text-blue-600">
                      {formatCurrency(investment * Math.pow(1.08, timePeriod), selectedCurrency)}
                    </div>
                    <div className="text-xs sm:text-sm text-gray-600">
                      Returns: {formatCurrency(investment * Math.pow(1.08, timePeriod) - investment, selectedCurrency)}
                    </div>
                  </div>
                </div>

                <div className="space-y-3 sm:space-y-4">
                  <h4 className="font-semibold text-gray-900 text-sm sm:text-base">Aggressive (15%)</h4>
                  <div className="bg-green-50 p-3 sm:p-4 rounded-lg">
                    <div className="text-xs sm:text-sm text-gray-600 mb-2">Investment: {formatCurrency(investment, selectedCurrency)}</div>
                    <div className="text-base sm:text-lg font-bold text-green-600">
                      {formatCurrency(investment * Math.pow(1.15, timePeriod), selectedCurrency)}
                    </div>
                    <div className="text-xs sm:text-sm text-gray-600">
                      Returns: {formatCurrency(investment * Math.pow(1.15, timePeriod) - investment, selectedCurrency)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LumpsumCalculator;
