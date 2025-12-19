import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend } from 'recharts';
import { Clock, TrendingUp, AlertTriangle, Info, Calendar, TrendingDown } from 'lucide-react';
import CurrencySelector, { formatCurrency, getCurrencySymbol } from '../CurrencySelector';

const SIPDelayCalculator = () => {
  const [monthlySIP, setMonthlySIP] = useState(10000);
  const [investmentPeriod, setInvestmentPeriod] = useState(20);
  const [expectedReturn, setExpectedReturn] = useState(12);
  const [delayYears, setDelayYears] = useState(5);
  const [selectedCurrency, setSelectedCurrency] = useState('INR');

  const results = useMemo(() => {
    const monthlyRate = expectedReturn / 100 / 12;

    // Scenario 1: Start today
    const monthsNow = investmentPeriod * 12;
    const futureValueNow = monthsNow > 0 && monthlyRate > 0
      ? monthlySIP * ((Math.pow(1 + monthlyRate, monthsNow) - 1) / monthlyRate) * (1 + monthlyRate)
      : monthlySIP * monthsNow;

    const totalInvestedNow = monthlySIP * monthsNow;
    const returnsNow = futureValueNow - totalInvestedNow;

    // Scenario 2: Start after delay
    const monthsDelayed = (investmentPeriod - delayYears) * 12;
    const futureValueDelayed = monthsDelayed > 0 && monthlyRate > 0
      ? monthlySIP * ((Math.pow(1 + monthlyRate, monthsDelayed) - 1) / monthlyRate) * (1 + monthlyRate)
      : monthlySIP * monthsDelayed;

    const totalInvestedDelayed = monthlySIP * monthsDelayed;
    const returnsDelayed = futureValueDelayed - totalInvestedDelayed;

    // Loss calculations
    const opportunityCost = futureValueNow - futureValueDelayed;
    const lostReturns = returnsNow - returnsDelayed;
    const lostInvestment = totalInvestedNow - totalInvestedDelayed;

    // Required higher SIP to match original target
    const requiredSIPDelayed = monthsDelayed > 0 && monthlyRate > 0
      ? (futureValueNow * monthlyRate) / ((Math.pow(1 + monthlyRate, monthsDelayed) - 1) * (1 + monthlyRate))
      : futureValueNow / monthsDelayed;

    const additionalSIPRequired = requiredSIPDelayed - monthlySIP;

    // Year-wise comparison
    const comparisonData = [];
    for (let year = 1; year <= investmentPeriod; year++) {
      const monthsElapsed = year * 12;

      const valueNow = monthsElapsed > 0 && monthlyRate > 0
        ? monthlySIP * ((Math.pow(1 + monthlyRate, monthsElapsed) - 1) / monthlyRate) * (1 + monthlyRate)
        : monthlySIP * monthsElapsed;

      let valueDelayed = 0;
      if (year > delayYears) {
        const monthsInvested = (year - delayYears) * 12;
        valueDelayed = monthsInvested > 0 && monthlyRate > 0
          ? monthlySIP * ((Math.pow(1 + monthlyRate, monthsInvested) - 1) / monthlyRate) * (1 + monthlyRate)
          : monthlySIP * monthsInvested;
      }

      comparisonData.push({
        year: year,
        startNow: Math.round(valueNow),
        startDelayed: Math.round(valueDelayed),
        gap: Math.round(valueNow - valueDelayed)
      });
    }

    return {
      futureValueNow: Math.round(futureValueNow),
      totalInvestedNow: Math.round(totalInvestedNow),
      returnsNow: Math.round(returnsNow),
      futureValueDelayed: Math.round(futureValueDelayed),
      totalInvestedDelayed: Math.round(totalInvestedDelayed),
      returnsDelayed: Math.round(returnsDelayed),
      opportunityCost: Math.round(opportunityCost),
      lostReturns: Math.round(lostReturns),
      lostInvestment: Math.round(lostInvestment),
      requiredSIPDelayed: Math.round(requiredSIPDelayed),
      additionalSIPRequired: Math.round(additionalSIPRequired),
      comparisonData,
      lossPercentage: ((opportunityCost / futureValueNow) * 100).toFixed(1)
    };
  }, [monthlySIP, investmentPeriod, expectedReturn, delayYears]);



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
                <Clock className="w-5 h-5 sm:w-6 sm:h-6" />
                <span>SIP Delay Cost</span>
              </h2>
            </div>
            <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
              <CurrencySelector
                selectedCurrency={selectedCurrency}
                onCurrencyChange={setSelectedCurrency}
              />
              {/* Monthly SIP Amount */}
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                  Monthly SIP (₹)
                </label>
                <input
                  type="number"
                  value={monthlySIP}
                  onChange={(e) => setMonthlySIP(Number(e.target.value))}
                  className="w-full px-3 sm:px-4 py-2 text-base sm:text-lg font-semibold border-2 border-gray-200 rounded-lg focus:border-[#C9A635] focus:outline-none"
                  min="500"
                  step="500"
                />
                <input
                  type="range"
                  value={monthlySIP}
                  onChange={(e) => setMonthlySIP(Number(e.target.value))}
                  min="500"
                  max="100000"
                  step="500"
                  className="w-full mt-3"
                />
              </div>

              {/* Investment Period */}
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                  Investment Period (Years)
                </label>
                <input
                  type="number"
                  value={investmentPeriod}
                  onChange={(e) => setInvestmentPeriod(Number(e.target.value))}
                  className="w-full px-3 sm:px-4 py-2 text-base sm:text-lg font-semibold border-2 border-gray-200 rounded-lg focus:border-[#C9A635] focus:outline-none"
                  min="5"
                  max="40"
                />
                <input
                  type="range"
                  value={investmentPeriod}
                  onChange={(e) => setInvestmentPeriod(Number(e.target.value))}
                  min="5"
                  max="40"
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
                  min="8"
                  max="18"
                  step="0.5"
                />
                <input
                  type="range"
                  value={expectedReturn}
                  onChange={(e) => setExpectedReturn(Number(e.target.value))}
                  min="8"
                  max="18"
                  step="0.5"
                  className="w-full mt-3"
                />
              </div>

              {/* Delay in Years */}
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                  Delay Period (Years)
                </label>
                <input
                  type="number"
                  value={delayYears}
                  onChange={(e) => setDelayYears(Number(e.target.value))}
                  className="w-full px-3 sm:px-4 py-2 text-base sm:text-lg font-semibold border-2 border-gray-200 rounded-lg focus:border-[#C9A635] focus:outline-none"
                  min="1"
                  max={investmentPeriod - 1}
                />
                <input
                  type="range"
                  value={delayYears}
                  onChange={(e) => setDelayYears(Number(e.target.value))}
                  min="1"
                  max={investmentPeriod - 1}
                  className="w-full mt-3"
                />
              </div>
            </div>
          </div>

          {/* Warning Tip - Hidden on mobile */}
          <div className="hidden lg:block bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl shadow-lg border-2 border-red-200 p-6">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-red-800 mb-2">Time is Money!</h3>
                <p className="text-red-700 text-sm leading-relaxed">
                  Every year costs significantly due to lost compounding.
                </p>
              </div>
            </div>
          </div>

          {/* Additional Info - Hidden on mobile */}
          <div className="hidden lg:block bg-gradient-to-br from-[#C9A635]/5 to-[#E7C76A]/10 rounded-2xl shadow-lg border-2 border-[#C9A635]/20 p-6">
            <div className="flex items-start space-x-3">
              <Info className="w-5 h-5 text-[#7A1616] mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-[#7A1616] mb-2">Power of Compounding</h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Starting early maximizes compound growth.
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
          {/* Impact Summary Cards */}
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl sm:rounded-2xl shadow-xl border-2 border-green-200 p-4 sm:p-6">
              <div className="flex items-center space-x-3 sm:space-x-4 mb-3 sm:mb-4">
                <div className="bg-green-100 w-10 h-10 sm:w-14 sm:h-14 rounded-lg sm:rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 sm:w-7 sm:h-7 text-green-600" />
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-semibold text-green-700">Start Today</h3>
                  <p className="text-xs text-green-600">Best Strategy</p>
                </div>
              </div>
              <p className="text-2xl sm:text-3xl font-extrabold text-green-600 mb-2">{formatCurrency(results.futureValueNow, selectedCurrency)}</p>
              <div className="space-y-1 text-xs sm:text-sm">
                <p className="flex justify-between text-gray-700">
                  <span>Invested:</span>
                  <span className="font-semibold">{formatCurrency(results.totalInvestedNow, selectedCurrency)}</span>
                </p>
                <p className="flex justify-between text-green-700">
                  <span>Returns:</span>
                  <span className="font-bold">{formatCurrency(results.returnsNow, selectedCurrency)}</span>
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl sm:rounded-2xl shadow-xl border-2 border-red-200 p-4 sm:p-6">
              <div className="flex items-center space-x-3 sm:space-x-4 mb-3 sm:mb-4">
                <div className="bg-red-100 w-10 h-10 sm:w-14 sm:h-14 rounded-lg sm:rounded-xl flex items-center justify-center">
                  <TrendingDown className="w-5 h-5 sm:w-7 sm:h-7 text-red-600" />
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-semibold text-red-700">{delayYears}Y Delay</h3>
                  <p className="text-xs text-red-600">Lost Opportunity</p>
                </div>
              </div>
              <p className="text-2xl sm:text-3xl font-extrabold text-red-600 mb-2">{formatCurrency(results.futureValueDelayed, selectedCurrency)}</p>
              <div className="space-y-1 text-xs sm:text-sm">
                <p className="flex justify-between text-gray-700">
                  <span>Invested:</span>
                  <span className="font-semibold">{formatCurrency(results.totalInvestedDelayed, selectedCurrency)}</span>
                </p>
                <p className="flex justify-between text-red-700">
                  <span>Returns:</span>
                  <span className="font-bold">{formatCurrency(results.returnsDelayed, selectedCurrency)}</span>
                </p>
              </div>
            </div>
          </div>

          {/* Opportunity Cost Alert */}
          <div className="bg-gradient-to-r from-[#7A1616] to-[#A12424] rounded-2xl shadow-2xl p-6 sm:p-8 text-white">
            <div className="flex flex-col sm:flex-row items-start sm:items-center sm:justify-between mb-4 sm:mb-6">
              <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-0">
                <div className="bg-white/20 w-12 h-12 sm:w-16 sm:h-16 rounded-lg sm:rounded-xl flex items-center justify-center backdrop-blur-sm">
                  <AlertTriangle className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-extrabold">Opportunity Cost</h3>
                  <p className="text-white/80 text-xs sm:text-sm">Wealth lost by delaying</p>
                </div>
              </div>
              <div className="text-left sm:text-right w-full sm:w-auto">
                <p className="text-3xl sm:text-4xl font-black">{formatCurrency(results.opportunityCost, selectedCurrency)}</p>
                <p className="text-white/90 text-base sm:text-lg mt-1">{results.lossPercentage}% loss</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 sm:gap-4 pt-4 sm:pt-6 border-t border-white/20">
              <div className="text-center">
                <p className="text-white/70 text-xs mb-1">Lost Returns</p>
                <p className="text-base sm:text-xl font-bold">{formatCurrency(results.lostReturns, selectedCurrency)}</p>
              </div>
              <div className="text-center">
                <p className="text-white/70 text-xs mb-1">Lost Amount</p>
                <p className="text-base sm:text-xl font-bold">{formatCurrency(results.lostInvestment, selectedCurrency)}</p>
              </div>
              <div className="text-center">
                <p className="text-white/70 text-xs mb-1">Delay</p>
                <p className="text-base sm:text-xl font-bold">{delayYears}Y</p>
              </div>
            </div>
          </div>

          {/* Comparison Chart - Hidden on mobile */}
          <div className="hidden md:block bg-white rounded-2xl shadow-xl border-2 border-gray-100 overflow-hidden">
            <div className="border-b border-gray-100 p-6">
              <h3 className="text-xl font-bold text-gray-900">
                Wealth Comparison
              </h3>
            </div>
            <div className="p-6">
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={results.comparisonData}>
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
                      formatter={(value) => formatCurrency(value, selectedCurrency)}
                      labelFormatter={(label) => `Year ${label}`}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="startNow"
                      stroke="#10b981"
                      strokeWidth={3}
                      name="Start Today"
                    />
                    <Line
                      type="monotone"
                      dataKey="startDelayed"
                      stroke="#ef4444"
                      strokeWidth={3}
                      strokeDasharray="5 5"
                      name={`${delayYears}Y Delay`}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Solution Cards */}
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
            <div className="bg-white rounded-2xl shadow-xl border-2 border-gray-100 overflow-hidden">
              <div className="border-b border-gray-100 p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-bold text-gray-900">Match Target</h3>
              </div>
              <div className="p-4 sm:p-6">
                <div className="text-center p-4 sm:p-5 bg-gradient-to-br from-orange-50 to-red-50 rounded-xl border-2 border-orange-200">
                  <p className="text-xs sm:text-sm text-gray-700 mb-2">Required SIP After Delay</p>
                  <p className="text-2xl sm:text-3xl font-extrabold text-orange-600">{formatCurrency(results.requiredSIPDelayed, selectedCurrency)}</p>
                  <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-orange-200">
                    <p className="text-xs sm:text-sm text-gray-700 mb-1">Extra Needed</p>
                    <p className="text-xl sm:text-2xl font-bold text-red-600">{formatCurrency(results.additionalSIPRequired, selectedCurrency)}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl border-2 border-gray-100 overflow-hidden">
              <div className="border-b border-gray-100 p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-bold text-gray-900">Key Insights</h3>
              </div>
              <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-3 sm:p-4">
                  <h4 className="font-bold text-green-800 mb-2 flex items-center gap-2 text-sm sm:text-base">
                    <TrendingUp className="w-4 h-4" />
                    Start Now
                  </h4>
                  <p className="text-green-700 text-xs sm:text-sm">
                    Just <strong>{formatCurrency(monthlySIP, selectedCurrency)}</strong> monthly!
                  </p>
                </div>

                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-300 rounded-xl p-3 sm:p-4">
                  <h4 className="font-bold text-orange-800 mb-2 flex items-center gap-2 text-sm sm:text-base">
                    <Clock className="w-4 h-4" />
                    Cost of Waiting
                  </h4>
                  <p className="text-orange-700 text-xs sm:text-sm">
                    {results.lossPercentage}% less wealth!
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-gradient-to-br from-[#C9A635]/10 to-[#E7C76A]/20 rounded-2xl shadow-xl border-2 border-[#C9A635] p-6 sm:p-8 text-center">
            <Calendar className="w-12 h-12 sm:w-16 sm:h-16 text-[#7A1616] mx-auto mb-3 sm:mb-4" />
            <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-3 sm:mb-4">
              Don't Wait, Start Today!
            </h3>
            <p className="text-sm sm:text-lg text-gray-700 mb-4 sm:mb-6">
              The best time is <strong className="text-[#7A1616]">right now</strong>.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <button className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-[#7A1616] to-[#A12424] text-white font-bold rounded-xl text-sm sm:text-base">
                Start SIP Now
              </button>
              <button className="px-6 sm:px-8 py-3 sm:py-4 bg-white border-2 border-[#7A1616] text-[#7A1616] font-bold rounded-xl text-sm sm:text-base">
                Speak to Advisor
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SIPDelayCalculator;
