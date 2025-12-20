import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Calculator, TrendingUp, Target, Info, Calendar } from 'lucide-react';
import CurrencySelector, { formatCurrency, getCurrencySymbol } from '../CurrencySelector';

const RetirementCalculator = () => {
  const [currentAge, setCurrentAge] = useState(30);
  const [retirementAge, setRetirementAge] = useState(60);
  const [currentIncome, setCurrentIncome] = useState(100000);
  const [incomeReplacement, setIncomeReplacement] = useState(70);
  const [currentSavings, setCurrentSavings] = useState(500000);
  const [expectedReturn, setExpectedReturn] = useState(12);
  const [inflationRate, setInflationRate] = useState(6);
  const [lifeExpectancy, setLifeExpectancy] = useState(85);
  const [selectedCurrency, setSelectedCurrency] = useState('INR');

  // Calculations
  const results = useMemo(() => {
    const yearsToRetirement = retirementAge - currentAge;
    const yearsInRetirement = lifeExpectancy - retirementAge;
    const realReturnRate = ((1 + expectedReturn / 100) / (1 + inflationRate / 100) - 1) * 100;

    // Required monthly income at retirement (inflation adjusted)
    const requiredMonthlyIncome = (currentIncome * incomeReplacement / 100) * Math.pow(1 + inflationRate / 100, yearsToRetirement);

    // Required corpus at retirement
    const monthlyReturnRate = realReturnRate / 100 / 12;
    const totalRetirementMonths = yearsInRetirement * 12;
    const requiredCorpus = monthlyReturnRate > 0
      ? (requiredMonthlyIncome * (1 - Math.pow(1 + monthlyReturnRate, -totalRetirementMonths))) / monthlyReturnRate
      : requiredMonthlyIncome * totalRetirementMonths;

    // Future value of current savings
    const futureValueCurrentSavings = currentSavings * Math.pow(1 + expectedReturn / 100, yearsToRetirement);

    // Additional corpus needed
    const additionalCorpusNeeded = Math.max(0, requiredCorpus - futureValueCurrentSavings);

    // Required monthly SIP
    const monthlyReturnRateNominal = expectedReturn / 100 / 12;
    const totalMonths = yearsToRetirement * 12;
    const requiredMonthlySIP = totalMonths > 0 && monthlyReturnRateNominal > 0
      ? (additionalCorpusNeeded * monthlyReturnRateNominal) / (Math.pow(1 + monthlyReturnRateNominal, totalMonths) - 1)
      : additionalCorpusNeeded / totalMonths;

    // Year-wise projection
    const projectionData = [];
    let accumulatedValue = currentSavings;

    for (let year = 1; year <= yearsToRetirement; year++) {
      const annualSIP = requiredMonthlySIP * 12;
      accumulatedValue = (accumulatedValue + annualSIP) * (1 + expectedReturn / 100);

      projectionData.push({
        year: currentAge + year,
        value: Math.round(accumulatedValue),
        target: Math.round(requiredCorpus),
        shortfall: Math.max(0, Math.round(requiredCorpus - accumulatedValue))
      });
    }

    return {
      yearsToRetirement,
      yearsInRetirement,
      requiredMonthlyIncome: Math.round(requiredMonthlyIncome),
      requiredCorpus: Math.round(requiredCorpus),
      futureValueCurrentSavings: Math.round(futureValueCurrentSavings),
      additionalCorpusNeeded: Math.round(additionalCorpusNeeded),
      requiredMonthlySIP: Math.round(requiredMonthlySIP),
      projectionData,
      realReturnRate: realReturnRate.toFixed(2)
    };
  }, [currentAge, retirementAge, currentIncome, incomeReplacement, currentSavings, expectedReturn, inflationRate, lifeExpectancy]);



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
              <h2 className="flex items-center space-x-2 text-lg sm:text-xl font-bold text-white">
                <Calculator className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                <span text-white>Retirement Planning</span>
              </h2>
            </div>
            <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
              <CurrencySelector
                selectedCurrency={selectedCurrency}
                onCurrencyChange={setSelectedCurrency}
              />
              {/* Age Details */}
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                    Current Age
                  </label>
                  <input
                    type="number"
                    value={currentAge}
                    onChange={(e) => setCurrentAge(Number(e.target.value))}
                    className="w-full px-3 py-2 text-base font-semibold border-2 border-gray-200 rounded-lg focus:border-[#C9A635] focus:outline-none"
                    min="18"
                    max="65"
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                    Retirement Age
                  </label>
                  <input
                    type="number"
                    value={retirementAge}
                    onChange={(e) => setRetirementAge(Number(e.target.value))}
                    className="w-full px-3 py-2 text-base font-semibold border-2 border-gray-200 rounded-lg focus:border-[#C9A635] focus:outline-none"
                    min={currentAge + 1}
                    max="75"
                  />
                </div>
              </div>

              {/* Current Monthly Income */}
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                  Monthly Income (₹)
                </label>
                <input
                  type="number"
                  value={currentIncome}
                  onChange={(e) => setCurrentIncome(Number(e.target.value))}
                  className="w-full px-3 sm:px-4 py-2 text-base sm:text-lg font-semibold border-2 border-gray-200 rounded-lg focus:border-[#C9A635] focus:outline-none"
                  min="10000"
                  step="5000"
                />
                <input
                  type="range"
                  value={currentIncome}
                  onChange={(e) => setCurrentIncome(Number(e.target.value))}
                  min={10000}
                  max={500000}
                  step={5000}
                  className="w-full mt-3"
                />
              </div>

              {/* Income Replacement */}
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                  Income Replacement (%)
                </label>
                <input
                  type="number"
                  value={incomeReplacement}
                  onChange={(e) => setIncomeReplacement(Number(e.target.value))}
                  className="w-full px-3 sm:px-4 py-2 text-base sm:text-lg font-semibold border-2 border-gray-200 rounded-lg focus:border-[#C9A635] focus:outline-none"
                  min="30"
                  max="100"
                />
                <input
                  type="range"
                  value={incomeReplacement}
                  onChange={(e) => setIncomeReplacement(Number(e.target.value))}
                  min={30}
                  max={100}
                  step={5}
                  className="w-full mt-3"
                />
                <p className="text-xs text-gray-500 mt-2 hidden sm:block">
                  Typically 60-80%
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
                  step="10000"
                />
                <input
                  type="range"
                  value={currentSavings}
                  onChange={(e) => setCurrentSavings(Number(e.target.value))}
                  min={0}
                  max={5000000}
                  step={10000}
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
                  max="20"
                  step="0.5"
                />
                <input
                  type="range"
                  value={expectedReturn}
                  onChange={(e) => setExpectedReturn(Number(e.target.value))}
                  min={6}
                  max={20}
                  step={0.5}
                  className="w-full mt-3"
                />
              </div>

              {/* Inflation Rate */}
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                  Inflation Rate (%)
                </label>
                <input
                  type="number"
                  value={inflationRate}
                  onChange={(e) => setInflationRate(Number(e.target.value))}
                  className="w-full px-3 sm:px-4 py-2 text-base sm:text-lg font-semibold border-2 border-gray-200 rounded-lg focus:border-[#C9A635] focus:outline-none"
                  min="3"
                  max="10"
                  step="0.5"
                />
                <input
                  type="range"
                  value={inflationRate}
                  onChange={(e) => setInflationRate(Number(e.target.value))}
                  min={3}
                  max={10}
                  step={0.5}
                  className="w-full mt-3"
                />
              </div>

              {/* Life Expectancy */}
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                  Life Expectancy
                </label>
                <input
                  type="number"
                  value={lifeExpectancy}
                  onChange={(e) => setLifeExpectancy(Number(e.target.value))}
                  className="w-full px-3 sm:px-4 py-2 text-base sm:text-lg font-semibold border-2 border-gray-200 rounded-lg focus:border-[#C9A635] focus:outline-none"
                  min={retirementAge + 5}
                  max="95"
                />
                <p className="text-xs text-gray-500 mt-2 hidden sm:block">
                  Average: 70-75 years
                </p>
              </div>
            </div>
          </div>

          {/* Retirement Tip - Hidden on mobile */}
          <div className="hidden lg:block bg-gradient-to-br from-[#C9A635]/10 to-[#7A1616]/5 rounded-2xl shadow-xl border-2 border-[#C9A635]/20 p-6">
            <div className="flex items-start space-x-3">
              <Info className="w-5 h-5 text-[#7A1616] mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-[#7A1616] mb-2">Retirement Tip</h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Start early! Compounding works best over time.
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
            <div className="bg-white rounded-xl shadow-xl border-2 border-gray-100 p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center sm:space-x-4">
                <div className="bg-blue-100 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center mb-2 sm:mb-0">
                  <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-medium text-gray-600">Years Left</h3>
                  <p className="text-lg sm:text-2xl font-bold text-gray-900">{results.yearsToRetirement}Y</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-xl border-2 border-gray-100 p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center sm:space-x-4">
                <div className="bg-green-100 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center mb-2 sm:mb-0">
                  {getCurrencySymbol(selectedCurrency, "w-5 h-5 sm:w-6 sm:h-6 text-green-600")}
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-medium text-gray-600">Monthly Need</h3>
                  <p className="text-base sm:text-2xl font-bold text-green-600">{formatCurrency(results.requiredMonthlyIncome, selectedCurrency)}</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#7A1616] to-[#8B1A1A] rounded-xl shadow-xl p-4 sm:p-6 text-white">
              <div className="flex flex-col sm:flex-row items-start sm:items-center sm:space-x-4">
                <div className="bg-white/20 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center mb-2 sm:mb-0">
                  <Target className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-medium text-white/90">Corpus Needed</h3>
                  <p className="text-base sm:text-2xl font-bold text-white">{formatCurrency(results.requiredCorpus, selectedCurrency)}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-xl border-2 border-gray-100 p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center sm:space-x-4">
                <div className="bg-purple-100 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center mb-2 sm:mb-0">
                  <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-medium text-gray-600">Monthly SIP</h3>
                  <p className="text-base sm:text-2xl font-bold text-purple-600">{formatCurrency(results.requiredMonthlySIP, selectedCurrency)}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Progress Chart - Hidden on mobile */}
          <div className="hidden md:block bg-white rounded-2xl shadow-xl border-2 border-gray-100 overflow-hidden">
            <div className="border-b border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900">
                Corpus Accumulation
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
                    />
                    <YAxis
                      stroke="#666"
                      fontSize={12}
                      tickFormatter={(value) => formatCurrency(value, selectedCurrency)}
                    />
                    <Tooltip
                      formatter={(value, name) => [formatCurrency(value, selectedCurrency), name]}
                      labelFormatter={(label) => `Age ${label}`}
                    />
                    <Area
                      type="monotone"
                      dataKey="value"
                      stackId="1"
                      stroke="#C9A635"
                      fill="#C9A635"
                      fillOpacity={0.3}
                      name="Accumulated"
                    />
                    <Line
                      type="monotone"
                      dataKey="target"
                      stroke="#7A1616"
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      name="Target"
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
                <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                  Current vs Required
                </h3>
              </div>
              <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                  <span className="text-xs sm:text-sm font-medium text-gray-700">Current</span>
                  <span className="text-sm sm:text-base font-bold text-gray-900">{formatCurrency(currentSavings, selectedCurrency)}</span>
                </div>

                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                  <span className="text-xs sm:text-sm font-medium text-gray-700">Future Value</span>
                  <span className="text-sm sm:text-base font-bold text-green-600">{formatCurrency(results.futureValueCurrentSavings, selectedCurrency)}</span>
                </div>

                <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                  <span className="text-xs sm:text-sm font-medium text-gray-700">Additional</span>
                  <span className="text-sm sm:text-base font-bold text-red-600">{formatCurrency(results.additionalCorpusNeeded, selectedCurrency)}</span>
                </div>

                <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                  <span className="text-xs sm:text-sm font-medium text-gray-700">Monthly SIP</span>
                  <span className="text-sm sm:text-base font-bold text-purple-600">{formatCurrency(results.requiredMonthlySIP, selectedCurrency)}</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl border-2 border-gray-100 overflow-hidden">
              <div className="border-b border-gray-100 p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                  Planning Summary
                </h3>
              </div>
              <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                <div className="text-center p-3 sm:p-4 bg-gradient-to-r from-[#7A1616]/10 to-[#C9A635]/10 rounded-lg">
                  <h3 className="font-semibold text-[#7A1616] mb-2 text-sm sm:text-base">Key Insights</h3>
                  <div className="space-y-2 text-xs sm:text-sm">
                    <p><strong>Real Return:</strong> {results.realReturnRate}%</p>
                    <p><strong>Years in Retirement:</strong> {results.yearsInRetirement}Y</p>
                    <p><strong>Replacement:</strong> {incomeReplacement}%</p>
                  </div>
                </div>

                {results.requiredMonthlySIP > 0 && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 sm:p-4">
                    <h4 className="font-semibold text-yellow-800 mb-2 text-sm sm:text-base">Action Required</h4>
                    <p className="text-yellow-700 text-xs sm:text-sm">
                      Invest <strong>{formatCurrency(results.requiredMonthlySIP, selectedCurrency)}</strong> monthly!
                    </p>
                  </div>
                )}

                {results.additionalCorpusNeeded <= 0 && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3 sm:p-4">
                    <h4 className="font-semibold text-green-800 mb-2 text-sm sm:text-base">On Track!</h4>
                    <p className="text-green-700 text-xs sm:text-sm">
                      Your savings meet retirement goals!
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

export default RetirementCalculator;
