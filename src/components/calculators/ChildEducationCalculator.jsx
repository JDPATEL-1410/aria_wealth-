import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { GraduationCap, TrendingUp, Target, Info, Calendar } from 'lucide-react';
import CurrencySelector, { formatCurrency, getCurrencySymbol } from '../CurrencySelector';

const ChildEducationCalculator = () => {
  const [childAge, setChildAge] = useState(5);
  const [educationAge, setEducationAge] = useState(18);
  const [currentCost, setCurrentCost] = useState(1000000);
  const [currentSavings, setCurrentSavings] = useState(100000);
  const [expectedReturn, setExpectedReturn] = useState(12);
  const [inflationRate, setInflationRate] = useState(8);
  const [selectedCurrency, setSelectedCurrency] = useState('INR');

  const results = useMemo(() => {
    const yearsToEducation = educationAge - childAge;

    // Future cost of education (inflation adjusted)
    const futureCost = currentCost * Math.pow(1 + inflationRate / 100, yearsToEducation);

    // Future value of current savings
    const futureValueSavings = currentSavings * Math.pow(1 + expectedReturn / 100, yearsToEducation);

    // Additional corpus needed
    const additionalCorpusNeeded = Math.max(0, futureCost - futureValueSavings);

    // Required monthly SIP
    const monthlyReturnRate = expectedReturn / 100 / 12;
    const totalMonths = yearsToEducation * 12;
    const requiredMonthlySIP = totalMonths > 0 && monthlyReturnRate > 0
      ? (additionalCorpusNeeded * monthlyReturnRate) / (Math.pow(1 + monthlyReturnRate, totalMonths) - 1)
      : additionalCorpusNeeded / totalMonths;

    // Year-wise projection
    const projectionData = [];
    let accumulatedValue = currentSavings;

    for (let year = 1; year <= yearsToEducation; year++) {
      const annualSIP = requiredMonthlySIP * 12;
      accumulatedValue = (accumulatedValue + annualSIP) * (1 + expectedReturn / 100);
      const inflatedCost = currentCost * Math.pow(1 + inflationRate / 100, year);

      projectionData.push({
        year: childAge + year,
        value: Math.round(accumulatedValue),
        target: Math.round(inflatedCost)
      });
    }

    return {
      yearsToEducation,
      futureCost: Math.round(futureCost),
      futureValueSavings: Math.round(futureValueSavings),
      additionalCorpusNeeded: Math.round(additionalCorpusNeeded),
      requiredMonthlySIP: Math.round(requiredMonthlySIP),
      projectionData,
      totalInvestment: Math.round(currentSavings + (requiredMonthlySIP * totalMonths)),
      totalReturns: Math.round(futureCost - currentSavings - (requiredMonthlySIP * totalMonths))
    };
  }, [childAge, educationAge, currentCost, currentSavings, expectedReturn, inflationRate]);



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
              <h2 className="flex items-center space-x-2 text-lg sm:text-xl font-bold text-white">
                <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                <span text-white>Education Planning</span>
              </h2>
            </div>
            <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
              <CurrencySelector
                selectedCurrency={selectedCurrency}
                onCurrencyChange={setSelectedCurrency}
              />
              {/* Child's Age */}
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                    Current Age
                  </label>
                  <input
                    type="number"
                    value={childAge}
                    onChange={(e) => setChildAge(Number(e.target.value))}
                    className="w-full px-3 sm:px-4 py-2 text-base sm:text-lg font-semibold border-2 border-gray-200 rounded-lg focus:border-[#C9A635] focus:outline-none"
                    min="0"
                    max="18"
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                    Education Age
                  </label>
                  <input
                    type="number"
                    value={educationAge}
                    onChange={(e) => setEducationAge(Number(e.target.value))}
                    className="w-full px-3 sm:px-4 py-2 text-base sm:text-lg font-semibold border-2 border-gray-200 rounded-lg focus:border-[#C9A635] focus:outline-none"
                    min={childAge + 1}
                    max="25"
                  />
                </div>
              </div>

              {/* Current Cost */}
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                  Current Education Cost (₹)
                </label>
                <input
                  type="number"
                  value={currentCost}
                  onChange={(e) => setCurrentCost(Number(e.target.value))}
                  className="w-full px-3 sm:px-4 py-2 text-base sm:text-lg font-semibold border-2 border-gray-200 rounded-lg focus:border-[#C9A635] focus:outline-none"
                  min="100000"
                  step="100000"
                />
                <input
                  type="range"
                  value={currentCost}
                  onChange={(e) => setCurrentCost(Number(e.target.value))}
                  min={100000}
                  max={10000000}
                  step={100000}
                  className="w-full mt-3"
                />
                <p className="text-xs text-gray-500 mt-2 hidden sm:block">
                  IIT/NIT ₹10-15L, MBBS ₹20-50L, Abroad ₹50L+
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
                  max={2000000}
                  step={10000}
                  className="w-full mt-3"
                />
              </div>

              {/* Expected Return */}
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                  Expected Annual Return (%)
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
                  min={6}
                  max={18}
                  step={0.5}
                  className="w-full mt-3"
                />
              </div>

              {/* Education Inflation */}
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                  Education Inflation Rate (%)
                </label>
                <input
                  type="number"
                  value={inflationRate}
                  onChange={(e) => setInflationRate(Number(e.target.value))}
                  className="w-full px-3 sm:px-4 py-2 text-base sm:text-lg font-semibold border-2 border-gray-200 rounded-lg focus:border-[#C9A635] focus:outline-none"
                  min="5"
                  max="12"
                  step="0.5"
                />
                <input
                  type="range"
                  value={inflationRate}
                  onChange={(e) => setInflationRate(Number(e.target.value))}
                  min={5}
                  max={12}
                  step={0.5}
                  className="w-full mt-3"
                />
                <p className="text-xs text-gray-500 mt-2 hidden sm:block">
                  Education inflation typically 8-10% annually
                </p>
              </div>
            </div>
          </div>

          {/* Education Tip - Hidden on mobile */}
          <div className="hidden lg:block bg-gradient-to-br from-[#C9A635]/5 to-[#E7C76A]/10 rounded-2xl shadow-xl border-2 border-[#C9A635]/20 p-6">
            <div className="flex items-start space-x-3">
              <Info className="w-5 h-5 text-[#7A1616] mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-[#7A1616] mb-2">Education Planning Tip</h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Education costs rise faster than general inflation. Start investing early
                  to build a sufficient corpus. Consider equity mutual funds for long-term goals.
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
                  <h3 className="text-xs sm:text-sm font-semibold text-gray-600">Years Left</h3>
                  <p className="text-xl sm:text-3xl font-extrabold text-gray-900">{results.yearsToEducation}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl border-2 border-gray-100 p-4 sm:p-6 hover:shadow-2xl transition-shadow duration-300">
              <div className="flex flex-col sm:flex-row items-start sm:items-center sm:space-x-4">
                <div className="bg-green-100 w-10 h-10 sm:w-14 sm:h-14 rounded-lg sm:rounded-xl flex items-center justify-center mb-2 sm:mb-0">
                  <Target className="w-5 h-5 sm:w-7 sm:h-7 text-green-600" />
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-semibold text-gray-600">Future Cost</h3>
                  <p className="text-lg sm:text-2xl font-extrabold text-green-600">
                    {formatCurrency(results.futureCost, selectedCurrency)}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#7A1616] to-[#A12424] rounded-xl sm:rounded-2xl shadow-xl border-2 border-[#7A1616]/20 p-4 sm:p-6 text-white hover:shadow-2xl transition-all duration-300">
              <div className="flex flex-col sm:flex-row items-start sm:items-center sm:space-x-4">
                <div className="bg-white/20 w-10 h-10 sm:w-14 sm:h-14 rounded-lg sm:rounded-xl flex items-center justify-center backdrop-blur-sm mb-2 sm:mb-0">
                  {getCurrencySymbol(selectedCurrency, "w-5 h-5 sm:w-7 sm:h-7 text-white")}
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-semibold text-white/90">Corpus Needed</h3>
                  <p className="text-lg sm:text-2xl font-extrabold text-white">
                    {formatCurrency(results.futureCost, selectedCurrency)}
                  </p>
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

          {/* Progress Chart - Hidden on mobile */}
          <div className="hidden md:block bg-white rounded-2xl shadow-xl border-2 border-gray-100 overflow-hidden">
            <div className="border-b border-gray-100 p-6">
              <h3 className="text-xl font-bold text-gray-900">
                Education Corpus Growth Projection
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
                      label={{ value: 'Age', position: 'insideBottom', offset: -5 }}
                    />
                    <YAxis
                      stroke="#666"
                      fontSize={12}
                      tickFormatter={(value) => formatCurrency(value, selectedCurrency)}
                    />
                    <Tooltip
                      formatter={(value, name) => [formatCurrency(value, selectedCurrency), name === 'value' ? 'Accumulated' : 'Target Cost']}
                      labelFormatter={(label) => `Child's Age: ${label}`}
                      contentStyle={{
                        backgroundColor: '#fff',
                        border: '2px solid #e5e7eb',
                        borderRadius: '12px',
                        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="value"
                      stackId="1"
                      stroke="#C9A635"
                      fill="#C9A635"
                      fillOpacity={0.3}
                      name="Accumulated Value"
                      strokeWidth={2}
                    />
                    <Line
                      type="monotone"
                      dataKey="target"
                      stroke="#7A1616"
                      strokeWidth={3}
                      strokeDasharray="5 5"
                      name="Target Cost"
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
                <h3 className="text-base sm:text-lg font-bold text-gray-900">
                  Investment Breakdown
                </h3>
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
                <h3 className="text-base sm:text-lg font-bold text-gray-900">
                  Planning Summary
                </h3>
              </div>
              <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                <div className="text-center p-4 sm:p-5 bg-gradient-to-br from-[#7A1616]/10 to-[#C9A635]/10 rounded-xl border-2 border-[#C9A635]/20">
                  <h3 className="font-bold text-[#7A1616] mb-3 text-base sm:text-lg">Key Insights</h3>
                  <div className="space-y-2 text-xs sm:text-sm">
                    <p className="flex justify-between">
                      <span className="font-semibold">Total Investment:</span>
                      <span className="font-bold text-[#7A1616]">{formatCurrency(results.totalInvestment, selectedCurrency)}</span>
                    </p>
                    <p className="flex justify-between">
                      <span className="font-semibold">Expected Returns:</span>
                      <span className="font-bold text-green-600">{formatCurrency(results.totalReturns, selectedCurrency)}</span>
                    </p>
                    <p className="flex justify-between">
                      <span className="font-semibold">Return Rate:</span>
                      <span className="font-bold text-[#C9A635]">{expectedReturn}% p.a.</span>
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
                      Start <strong className="text-[#7A1616]">{formatCurrency(results.requiredMonthlySIP, selectedCurrency)}</strong> monthly SIP now!
                    </p>
                  </div>
                )}

                {results.additionalCorpusNeeded <= 0 && (
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300 rounded-xl p-3 sm:p-4">
                    <h4 className="font-bold text-green-800 mb-2 text-sm sm:text-base">Excellent Planning!</h4>
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

export default ChildEducationCalculator;
