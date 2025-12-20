import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Home, TrendingUp, Target, Info, Calendar } from 'lucide-react';
import CurrencySelector, { formatCurrency, getCurrencySymbol } from '../CurrencySelector';

const HomePurchaseCalculator = () => {
  const [targetPrice, setTargetPrice] = useState(5000000);
  const [downPayment, setDownPayment] = useState(20);
  const [currentSavings, setCurrentSavings] = useState(500000);
  const [yearsToGoal, setYearsToGoal] = useState(5);
  const [expectedReturn, setExpectedReturn] = useState(12);
  const [priceAppreciation, setPriceAppreciation] = useState(8);
  const [selectedCurrency, setSelectedCurrency] = useState('INR');

  const results = useMemo(() => {
    // Future home price with appreciation
    const futureHomePrice = targetPrice * Math.pow(1 + priceAppreciation / 100, yearsToGoal);

    // Required down payment amount
    const requiredDownPayment = (futureHomePrice * downPayment) / 100;

    // Future value of current savings
    const futureValueSavings = currentSavings * Math.pow(1 + expectedReturn / 100, yearsToGoal);

    // Additional corpus needed
    const additionalCorpusNeeded = Math.max(0, requiredDownPayment - futureValueSavings);

    // Required monthly SIP
    const monthlyReturnRate = expectedReturn / 100 / 12;
    const totalMonths = yearsToGoal * 12;
    const requiredMonthlySIP = totalMonths > 0 && monthlyReturnRate > 0
      ? (additionalCorpusNeeded * monthlyReturnRate) / (Math.pow(1 + monthlyReturnRate, totalMonths) - 1)
      : additionalCorpusNeeded / totalMonths;

    // Loan details
    const loanAmount = futureHomePrice - requiredDownPayment;
    const loanPercentage = 100 - downPayment;

    // EMI calculation (assuming 8.5% interest for 20 years)
    const loanInterestRate = 8.5 / 100 / 12;
    const loanTenureMonths = 20 * 12;
    const emi = loanAmount > 0
      ? (loanAmount * loanInterestRate * Math.pow(1 + loanInterestRate, loanTenureMonths)) /
      (Math.pow(1 + loanInterestRate, loanTenureMonths) - 1)
      : 0;

    // Year-wise projection
    const projectionData = [];
    let accumulatedValue = currentSavings;

    for (let year = 1; year <= yearsToGoal; year++) {
      const annualSIP = requiredMonthlySIP * 12;
      accumulatedValue = (accumulatedValue + annualSIP) * (1 + expectedReturn / 100);
      const appreciatedPrice = targetPrice * Math.pow(1 + priceAppreciation / 100, year);
      const targetDownPayment = (appreciatedPrice * downPayment) / 100;

      projectionData.push({
        year: year,
        savings: Math.round(accumulatedValue),
        target: Math.round(targetDownPayment),
        homePrice: Math.round(appreciatedPrice)
      });
    }

    return {
      futureHomePrice: Math.round(futureHomePrice),
      requiredDownPayment: Math.round(requiredDownPayment),
      futureValueSavings: Math.round(futureValueSavings),
      additionalCorpusNeeded: Math.round(additionalCorpusNeeded),
      requiredMonthlySIP: Math.round(requiredMonthlySIP),
      loanAmount: Math.round(loanAmount),
      loanPercentage: loanPercentage,
      emi: Math.round(emi),
      projectionData,
      totalInvestment: Math.round(currentSavings + (requiredMonthlySIP * totalMonths)),
      totalReturns: Math.round(requiredDownPayment - currentSavings - (requiredMonthlySIP * totalMonths))
    };
  }, [targetPrice, downPayment, currentSavings, yearsToGoal, expectedReturn, priceAppreciation]);



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
            <div className="bg-gradient-to-r from-[#7A1616] to-[#A12424] text-white p-4 sm:p-6">
              <h2 className="flex items-center space-x-2 text-lg sm:text-xl font-bold">
                <Home className="w-5 h-5 sm:w-6 sm:h-6" />
                <span>Home Purchase Plan</span>
              </h2>
            </div>
            <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
              <CurrencySelector
                selectedCurrency={selectedCurrency}
                onCurrencyChange={setSelectedCurrency}
              />
              {/* Target Home Price */}
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                  Target Home Price Today (₹)
                </label>
                <input
                  type="number"
                  value={targetPrice}
                  onChange={(e) => setTargetPrice(Number(e.target.value))}
                  className="w-full px-3 sm:px-4 py-2 text-base sm:text-lg font-semibold border-2 border-gray-200 rounded-lg focus:border-[#C9A635] focus:outline-none"
                  min="1000000"
                  step="100000"
                />
                <input
                  type="range"
                  value={targetPrice}
                  onChange={(e) => setTargetPrice(Number(e.target.value))}
                  min="1000000"
                  max="20000000"
                  step="100000"
                  className="w-full mt-3"
                />
                <p className="text-xs text-gray-500 mt-2 hidden sm:block">
                  Metro ₹50L-2Cr, Tier-2 ₹30-80L
                </p>
              </div>

              {/* Down Payment Percentage */}
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                  Down Payment (%)
                </label>
                <input
                  type="number"
                  value={downPayment}
                  onChange={(e) => setDownPayment(Number(e.target.value))}
                  className="w-full px-3 sm:px-4 py-2 text-base sm:text-lg font-semibold border-2 border-gray-200 rounded-lg focus:border-[#C9A635] focus:outline-none"
                  min="10"
                  max="80"
                  step="5"
                />
                <input
                  type="range"
                  value={downPayment}
                  onChange={(e) => setDownPayment(Number(e.target.value))}
                  min="10"
                  max="80"
                  step="5"
                  className="w-full mt-3"
                />
                <p className="text-xs text-gray-500 mt-2 hidden sm:block">
                  20% minimum recommended
                </p>
              </div>

              {/* Current Savings */}
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                  Current Savings (₹)
                </label>
                <input
                  type="number"
                  value={currentSavings}
                  onChange={(e) => setCurrentSavings(Number(e.target.value))}
                  className="w-full px-3 sm:px-4 py-2 text-base sm:text-lg font-semibold border-2 border-gray-200 rounded-lg focus:border-[#C9A635] focus:outline-none"
                  min="0"
                  step="50000"
                />
                <input
                  type="range"
                  value={currentSavings}
                  onChange={(e) => setCurrentSavings(Number(e.target.value))}
                  min="0"
                  max="5000000"
                  step="50000"
                  className="w-full mt-3"
                />
              </div>

              {/* Years to Goal */}
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                  Time to Purchase (Years)
                </label>
                <input
                  type="number"
                  value={yearsToGoal}
                  onChange={(e) => setYearsToGoal(Number(e.target.value))}
                  className="w-full px-3 sm:px-4 py-2 text-base sm:text-lg font-semibold border-2 border-gray-200 rounded-lg focus:border-[#C9A635] focus:outline-none"
                  min="1"
                  max="20"
                />
                <input
                  type="range"
                  value={yearsToGoal}
                  onChange={(e) => setYearsToGoal(Number(e.target.value))}
                  min="1"
                  max="20"
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
                  min="6"
                  max="18"
                  step="0.5"
                />
                <input
                  type="range"
                  value={expectedReturn}
                  onChange={(e) => setExpectedReturn(Number(e.target.value))}
                  min="6"
                  max="18"
                  step="0.5"
                  className="w-full mt-3"
                />
              </div>

              {/* Property Appreciation */}
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                  Property Appreciation (%)
                </label>
                <input
                  type="number"
                  value={priceAppreciation}
                  onChange={(e) => setPriceAppreciation(Number(e.target.value))}
                  className="w-full px-3 sm:px-4 py-2 text-base sm:text-lg font-semibold border-2 border-gray-200 rounded-lg focus:border-[#C9A635] focus:outline-none"
                  min="3"
                  max="12"
                  step="0.5"
                />
                <input
                  type="range"
                  value={priceAppreciation}
                  onChange={(e) => setPriceAppreciation(Number(e.target.value))}
                  min="3"
                  max="12"
                  step="0.5"
                  className="w-full mt-3"
                />
                <p className="text-xs text-gray-500 mt-2 hidden sm:block">
                  Average: 6-10% in major cities
                </p>
              </div>
            </div>
          </div>

          {/* Home Buying Tip - Hidden on mobile */}
          <div className="hidden lg:block bg-gradient-to-br from-[#C9A635]/5 to-[#E7C76A]/10 rounded-2xl shadow-lg border-2 border-[#C9A635]/20 p-6">
            <div className="flex items-start space-x-3">
              <Info className="w-5 h-5 text-[#7A1616] mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-[#7A1616] mb-2">Home Buying Tip</h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Aim for 20% down payment to avoid PMI. Factor in registration (5-7%), stamp duty, and interiors (10-15%).
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
          <div className="grid grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6">
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl border-2 border-gray-100 p-4 sm:p-6 hover:shadow-2xl transition-shadow duration-300">
              <div className="flex flex-col sm:flex-row items-start sm:items-center sm:space-x-4">
                <div className="bg-blue-100 w-10 h-10 sm:w-14 sm:h-14 rounded-lg sm:rounded-xl flex items-center justify-center mb-2 sm:mb-0">
                  <Calendar className="w-5 h-5 sm:w-7 sm:h-7 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-semibold text-gray-600">Time to Goal</h3>
                  <p className="text-xl sm:text-3xl font-extrabold text-gray-900">{yearsToGoal}Y</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl border-2 border-gray-100 p-4 sm:p-6 hover:shadow-2xl transition-shadow duration-300">
              <div className="flex flex-col sm:flex-row items-start sm:items-center sm:space-x-4">
                <div className="bg-green-100 w-10 h-10 sm:w-14 sm:h-14 rounded-lg sm:rounded-xl flex items-center justify-center mb-2 sm:mb-0">
                  <Home className="w-5 h-5 sm:w-7 sm:h-7 text-green-600" />
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-semibold text-gray-600">Future Price</h3>
                  <p className="text-lg sm:text-2xl font-extrabold text-green-600">
                    {formatCurrency(results.futureHomePrice, selectedCurrency)}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#7A1616] to-[#A12424] rounded-xl sm:rounded-2xl shadow-xl border-2 border-[#7A1616]/20 p-4 sm:p-6 text-white hover:shadow-2xl transition-all duration-300">
              <div className="flex flex-col sm:flex-row items-start sm:items-center sm:space-x-4">
                <div className="bg-white/20 w-10 h-10 sm:w-14 sm:h-14 rounded-lg sm:rounded-xl flex items-center justify-center backdrop-blur-sm mb-2 sm:mb-0">
                  <Target className="w-5 h-5 sm:w-7 sm:h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-semibold text-white/90">Down Payment</h3>
                  <p className="text-lg sm:text-2xl font-extrabold text-white">
                    {formatCurrency(results.requiredDownPayment, selectedCurrency)}
                  </p>
                  <p className="text-xs text-white/70 mt-1">{downPayment}% needed</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl border-2 border-gray-100 p-4 sm:p-6 hover:shadow-2xl transition-shadow duration-300">
              <div className="flex flex-col sm:flex-row items-start sm:items-center sm:space-x-4">
                <div className="bg-[#C9A635]/20 w-10 h-10 sm:w-14 sm:h-14 rounded-lg sm:rounded-xl flex items-center justify-center mb-2 sm:mb-0">
                  <TrendingUp className="w-5 h-5 sm:w-7 sm:h-7 text-[#C9A635]" />
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-semibold text-gray-600">Monthly SIP</h3>
                  <p className="text-lg sm:text-2xl font-extrabold text-[#C9A635]">
                    {formatCurrency(results.requiredMonthlySIP, selectedCurrency)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Loan Details Card */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-xl border-2 border-blue-200 p-4 sm:p-6">
            <h3 className="text-base sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2">
              {getCurrencySymbol(selectedCurrency, "w-5 h-5 sm:w-6 sm:h-6 text-blue-600")}
              Loan Details
            </h3>
            <div className="grid md:grid-cols-3 gap-3 sm:gap-4">
              <div className="bg-white rounded-xl p-3 sm:p-4 border border-blue-200">
                <p className="text-xs sm:text-sm text-gray-600 mb-1">Loan Amount</p>
                <p className="text-base sm:text-xl font-extrabold text-blue-600">{formatCurrency(results.loanAmount, selectedCurrency)}</p>
                <p className="text-xs text-gray-500 mt-1">{results.loanPercentage}%</p>
              </div>
              <div className="bg-white rounded-xl p-3 sm:p-4 border border-blue-200">
                <p className="text-xs sm:text-sm text-gray-600 mb-1">EMI</p>
                <p className="text-base sm:text-xl font-extrabold text-orange-600">{formatCurrency(results.emi, selectedCurrency)}</p>
                <p className="text-xs text-gray-500 mt-1">@ 8.5%</p>
              </div>
              <div className="bg-white rounded-xl p-3 sm:p-4 border border-blue-200">
                <p className="text-xs sm:text-sm text-gray-600 mb-1">Your Part</p>
                <p className="text-base sm:text-xl font-extrabold text-green-600">{formatCurrency(results.requiredDownPayment, selectedCurrency)}</p>
              </div>
            </div>
          </div>

          {/* Progress Chart - Hidden on mobile */}
          <div className="hidden md:block bg-white rounded-2xl shadow-xl border-2 border-gray-100 overflow-hidden">
            <div className="border-b border-gray-100 p-6">
              <h3 className="text-xl font-bold text-gray-900">
                Savings Progress
              </h3>
            </div>
            <div className="p-6">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={results.projectionData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis
                      dataKey="year"
                      stroke="#666"
                      fontSize={12}
                      label={{ value: 'Year', position: 'insideBottom', offset: -5 }}
                    />
                    <YAxis
                      stroke="#666"
                      fontSize={12}
                      tickFormatter={(value) => `₹${(value / 100000).toFixed(0)}L`}
                    />
                    <Tooltip
                      formatter={(value, name) => {
                        const labels = {
                          savings: 'Your Savings',
                          target: 'Down Payment',
                          homePrice: 'Home Price'
                        };
                        return [formatCurrency(value, selectedCurrency), labels[name] || name];
                      }}
                      labelFormatter={(label) => `Year ${label}`}
                    />
                    <Area
                      type="monotone"
                      dataKey="savings"
                      stackId="1"
                      stroke="#C9A635"
                      fill="#C9A635"
                      fillOpacity={0.3}
                      strokeWidth={2}
                    />
                    <Line
                      type="monotone"
                      dataKey="target"
                      stroke="#7A1616"
                      strokeWidth={3}
                      strokeDasharray="5 5"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Detailed Breakdown */}
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
            <div className="bg-white rounded-2xl shadow-xl border-2 border-gray-100 overflow-hidden">
              <div className="border-b border-gray-100 p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-bold text-gray-900">Savings Breakdown</h3>
              </div>
              <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                <div className="flex justify-between items-center p-3 sm:p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border border-blue-200">
                  <span className="text-xs sm:text-sm font-semibold text-gray-700">Current Savings</span>
                  <span className="text-sm sm:text-base font-extrabold text-gray-900">{formatCurrency(currentSavings, selectedCurrency)}</span>
                </div>

                <div className="flex justify-between items-center p-3 sm:p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-xl border border-green-200">
                  <span className="text-xs sm:text-sm font-semibold text-gray-700">Future Value</span>
                  <span className="text-sm sm:text-base font-extrabold text-green-600">{formatCurrency(results.futureValueSavings, selectedCurrency)}</span>
                </div>

                <div className="flex justify-between items-center p-3 sm:p-4 bg-gradient-to-r from-red-50 to-red-100 rounded-xl border border-red-200">
                  <span className="text-xs sm:text-sm font-semibold text-gray-700">Additional Needed</span>
                  <span className="text-sm sm:text-base font-extrabold text-red-600">{formatCurrency(results.additionalCorpusNeeded, selectedCurrency)}</span>
                </div>

                <div className="flex justify-between items-center p-3 sm:p-4 bg-gradient-to-r from-[#C9A635]/20 to-[#E7C76A]/20 rounded-xl border-2 border-[#C9A635]/30">
                  <span className="text-xs sm:text-sm font-semibold text-gray-700">Monthly SIP</span>
                  <span className="text-sm sm:text-base font-extrabold text-[#7A1616]">{formatCurrency(results.requiredMonthlySIP, selectedCurrency)}</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl border-2 border-gray-100 overflow-hidden">
              <div className="border-b border-gray-100 p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-bold text-gray-900">Key Insights</h3>
              </div>
              <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                <div className="text-center p-4 sm:p-5 bg-gradient-to-br from-[#7A1616]/10 to-[#C9A635]/10 rounded-xl border-2 border-[#C9A635]/20">
                  <div className="space-y-2 text-xs sm:text-sm">
                    <p className="flex justify-between">
                      <span className="font-semibold">Total Investment:</span>
                      <span className="font-bold text-[#7A1616]">{formatCurrency(results.totalInvestment, selectedCurrency)}</span>
                    </p>
                    <p className="flex justify-between">
                      <span className="font-semibold">Returns:</span>
                      <span className="font-bold text-green-600">{formatCurrency(results.totalReturns, selectedCurrency)}</span>
                    </p>
                    <p className="flex justify-between">
                      <span className="font-semibold">Appreciation:</span>
                      <span className="font-bold text-[#C9A635]">{priceAppreciation}% p.a.</span>
                    </p>
                  </div>
                </div>

                {results.requiredMonthlySIP > 0 && (
                  <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-300 rounded-xl p-3 sm:p-4">
                    <h4 className="font-bold text-orange-800 mb-2 flex items-center gap-2 text-sm sm:text-base">
                      <Target className="w-4 h-4" />
                      Action Plan
                    </h4>
                    <p className="text-orange-700 text-xs sm:text-sm leading-relaxed">
                      Save <strong className="text-[#7A1616]">{formatCurrency(results.requiredMonthlySIP, selectedCurrency)}</strong> monthly!
                    </p>
                  </div>
                )}

                {results.additionalCorpusNeeded <= 0 && (
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300 rounded-xl p-3 sm:p-4">
                    <h4 className="font-bold text-green-800 mb-2 text-sm sm:text-base">Ready to Buy!</h4>
                    <p className="text-green-700 text-xs sm:text-sm leading-relaxed">
                      Your savings are sufficient!
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HomePurchaseCalculator;
