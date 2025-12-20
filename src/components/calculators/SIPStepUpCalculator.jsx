import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { TrendingUp, Target, Info, Percent, ArrowUp } from 'lucide-react';
import CurrencySelector, { formatCurrency, getCurrencySymbol } from '../CurrencySelector';

const SIPStepUpCalculator = () => {
  const [initialSIP, setInitialSIP] = useState(10000);
  const [investmentPeriod, setInvestmentPeriod] = useState(20);
  const [expectedReturn, setExpectedReturn] = useState(12);
  const [stepUpPercentage, setStepUpPercentage] = useState(10);
  const [selectedCurrency, setSelectedCurrency] = useState('INR');

  const results = useMemo(() => {
    const monthlyRate = expectedReturn / 100 / 12;

    // Scenario 1: Fixed SIP (no step-up)
    const monthsTotal = investmentPeriod * 12;
    const fixedFutureValue = monthsTotal > 0 && monthlyRate > 0
      ? initialSIP * ((Math.pow(1 + monthlyRate, monthsTotal) - 1) / monthlyRate) * (1 + monthlyRate)
      : initialSIP * monthsTotal;

    const fixedTotalInvested = initialSIP * monthsTotal;
    const fixedReturns = fixedFutureValue - fixedTotalInvested;

    // Scenario 2: Step-up SIP
    let stepUpFutureValue = 0;
    let stepUpTotalInvested = 0;
    let currentSIP = initialSIP;

    for (let year = 1; year <= investmentPeriod; year++) {
      const yearlyContribution = currentSIP * 12;
      const monthsRemaining = (investmentPeriod - year + 1) * 12;

      const yearFutureValue = monthsRemaining > 0 && monthlyRate > 0
        ? currentSIP * ((Math.pow(1 + monthlyRate, monthsRemaining) - 1) / monthlyRate) * (1 + monthlyRate)
        : currentSIP * monthsRemaining;

      stepUpFutureValue += yearFutureValue;
      stepUpTotalInvested += yearlyContribution;

      if (year < investmentPeriod) {
        currentSIP = currentSIP * (1 + stepUpPercentage / 100);
      }
    }

    const stepUpReturns = stepUpFutureValue - stepUpTotalInvested;

    // Benefits of step-up
    const additionalWealth = stepUpFutureValue - fixedFutureValue;
    const additionalInvestment = stepUpTotalInvested - fixedTotalInvested;
    const additionalReturns = stepUpReturns - fixedReturns;
    const wealthMultiplier = (stepUpFutureValue / fixedFutureValue).toFixed(2);

    // Year-wise comparison
    const comparisonData = [];
    let fixedAccumulated = 0;
    let stepUpAccumulated = 0;
    let fixedInvested = 0;
    let stepUpInvested = 0;
    let yearSIP = initialSIP;

    for (let year = 1; year <= investmentPeriod; year++) {
      const fixedYearlyContribution = initialSIP * 12;
      fixedInvested += fixedYearlyContribution;
      fixedAccumulated = fixedAccumulated * (1 + expectedReturn / 100) + fixedYearlyContribution;

      const stepUpYearlyContribution = yearSIP * 12;
      stepUpInvested += stepUpYearlyContribution;
      stepUpAccumulated = stepUpAccumulated * (1 + expectedReturn / 100) + stepUpYearlyContribution;

      comparisonData.push({
        year: year,
        fixedSIP: Math.round(fixedAccumulated),
        stepUpSIP: Math.round(stepUpAccumulated),
        monthlySIP: Math.round(yearSIP),
        benefit: Math.round(stepUpAccumulated - fixedAccumulated)
      });

      yearSIP = yearSIP * (1 + stepUpPercentage / 100);
    }

    const finalSIPAmount = initialSIP * Math.pow(1 + stepUpPercentage / 100, investmentPeriod - 1);

    // Annual step-up progression
    const sipProgressionData = [];
    let progressionSIP = initialSIP;
    for (let year = 1; year <= Math.min(investmentPeriod, 10); year++) {
      sipProgressionData.push({
        year: year,
        amount: Math.round(progressionSIP),
        annual: Math.round(progressionSIP * 12)
      });
      progressionSIP = progressionSIP * (1 + stepUpPercentage / 100);
    }

    return {
      fixedFutureValue: Math.round(fixedFutureValue),
      fixedTotalInvested: Math.round(fixedTotalInvested),
      fixedReturns: Math.round(fixedReturns),
      stepUpFutureValue: Math.round(stepUpFutureValue),
      stepUpTotalInvested: Math.round(stepUpTotalInvested),
      stepUpReturns: Math.round(stepUpReturns),
      additionalWealth: Math.round(additionalWealth),
      additionalInvestment: Math.round(additionalInvestment),
      additionalReturns: Math.round(additionalReturns),
      wealthMultiplier: wealthMultiplier,
      finalSIPAmount: Math.round(finalSIPAmount),
      comparisonData,
      sipProgressionData,
      wealthGainPercentage: ((additionalWealth / fixedFutureValue) * 100).toFixed(1)
    };
  }, [initialSIP, investmentPeriod, expectedReturn, stepUpPercentage]);



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
                <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                <span>SIP Step Up</span>
              </h2>
            </div>
            <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
              <CurrencySelector
                selectedCurrency={selectedCurrency}
                onCurrencyChange={setSelectedCurrency}
              />
              {/* Initial Monthly SIP */}
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                  Initial Monthly SIP (₹)
                </label>
                <input
                  type="number"
                  value={initialSIP}
                  onChange={(e) => setInitialSIP(Number(e.target.value))}
                  className="w-full px-3 sm:px-4 py-2 text-base sm:text-lg font-semibold border-2 border-gray-200 rounded-lg focus:border-[#C9A635] focus:outline-none"
                  min="500"
                  step="500"
                />
                <input
                  type="range"
                  value={initialSIP}
                  onChange={(e) => setInitialSIP(Number(e.target.value))}
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

              {/* Annual Step-Up Percentage */}
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                  Annual Step-Up (%)
                </label>
                <input
                  type="number"
                  value={stepUpPercentage}
                  onChange={(e) => setStepUpPercentage(Number(e.target.value))}
                  className="w-full px-3 sm:px-4 py-2 text-base sm:text-lg font-semibold border-2 border-gray-200 rounded-lg focus:border-[#C9A635] focus:outline-none"
                  min="5"
                  max="20"
                  step="1"
                />
                <input
                  type="range"
                  value={stepUpPercentage}
                  onChange={(e) => setStepUpPercentage(Number(e.target.value))}
                  min="5"
                  max="20"
                  step="1"
                  className="w-full mt-3"
                />
              </div>

              {/* Final SIP Display */}
              <div className="bg-gradient-to-br from-[#C9A635]/10 to-[#E7C76A]/20 rounded-xl p-3 sm:p-4 border-2 border-[#C9A635]/30">
                <p className="text-xs sm:text-sm text-gray-700 mb-1">Final Monthly SIP (Y{investmentPeriod})</p>
                <p className="text-xl sm:text-2xl font-extrabold text-[#7A1616]">{formatCurrency(results.finalSIPAmount, selectedCurrency)}</p>
              </div>
            </div>
          </div>

          {/* Step-Up Tip - Hidden on mobile */}
          <div className="hidden lg:block bg-gradient-to-br from-[#C9A635]/5 to-[#E7C76A]/10 rounded-2xl shadow-lg border-2 border-[#C9A635]/20 p-6">
            <div className="flex items-start space-x-3">
              <Info className="w-5 h-5 text-[#7A1616] mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-[#7A1616] mb-2">Step-Up Strategy</h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Increase 10-15% annually to accelerate wealth creation!
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
          {/* Comparison Summary Cards */}
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl sm:rounded-2xl shadow-xl border-2 border-gray-200 p-4 sm:p-6">
              <div className="flex items-center space-x-3 sm:space-x-4 mb-3 sm:mb-4">
                <div className="bg-gray-200 w-10 h-10 sm:w-14 sm:h-14 rounded-lg sm:rounded-xl flex items-center justify-center">
                  {getCurrencySymbol(selectedCurrency, "w-5 h-5 sm:w-7 sm:h-7 text-gray-600")}
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-semibold text-gray-700">Fixed SIP</h3>
                  <p className="text-xs text-gray-600">No increase</p>
                </div>
              </div>
              <p className="text-2xl sm:text-3xl font-extrabold text-gray-700 mb-2">{formatCurrency(results.fixedFutureValue, selectedCurrency)}</p>
              <div className="space-y-1 text-xs sm:text-sm">
                <p className="flex justify-between text-gray-600">
                  <span>Invested:</span>
                  <span className="font-semibold">{formatCurrency(results.fixedTotalInvested, selectedCurrency)}</span>
                </p>
                <p className="flex justify-between text-gray-700">
                  <span>Returns:</span>
                  <span className="font-bold">{formatCurrency(results.fixedReturns, selectedCurrency)}</span>
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl sm:rounded-2xl shadow-xl border-2 border-green-200 p-4 sm:p-6">
              <div className="flex items-center space-x-3 sm:space-x-4 mb-3 sm:mb-4">
                <div className="bg-green-100 w-10 h-10 sm:w-14 sm:h-14 rounded-lg sm:rounded-xl flex items-center justify-center">
                  <ArrowUp className="w-5 h-5 sm:w-7 sm:h-7 text-green-600" />
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-semibold text-green-700">Step-Up SIP</h3>
                  <p className="text-xs text-green-600">{stepUpPercentage}% increase</p>
                </div>
              </div>
              <p className="text-2xl sm:text-3xl font-extrabold text-green-600 mb-2">{formatCurrency(results.stepUpFutureValue, selectedCurrency)}</p>
              <div className="space-y-1 text-xs sm:text-sm">
                <p className="flex justify-between text-gray-700">
                  <span>Invested:</span>
                  <span className="font-semibold">{formatCurrency(results.stepUpTotalInvested, selectedCurrency)}</span>
                </p>
                <p className="flex justify-between text-green-700">
                  <span>Returns:</span>
                  <span className="font-bold">{formatCurrency(results.stepUpReturns, selectedCurrency)}</span>
                </p>
              </div>
            </div>
          </div>

          {/* Benefits Highlight */}
          <div className="bg-gradient-to-r from-[#7A1616] to-[#A12424] rounded-2xl shadow-2xl p-6 sm:p-8 text-white">
            <div className="flex flex-col sm:flex-row items-start sm:items-center sm:justify-between mb-4 sm:mb-6">
              <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-0">
                <div className="bg-white/20 w-12 h-12 sm:w-16 sm:h-16 rounded-lg sm:rounded-xl flex items-center justify-center backdrop-blur-sm">
                  <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-white">Step-Up Benefits</h3>
                  <p className="text-white/80 text-xs sm:text-sm">Extra wealth</p>
                </div>
              </div>
              <div className="text-left sm:text-right w-full sm:w-auto">
                <p className="text-3xl sm:text-4xl font-black">{formatCurrency(results.additionalWealth, selectedCurrency)}</p>
                <p className="text-white/90 text-base sm:text-lg mt-1">{results.wealthGainPercentage}% more</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 sm:gap-4 pt-4 sm:pt-6 border-t border-white/20">
              <div className="text-center">
                <p className="text-white/70 text-xs mb-1">Extra</p>
                <p className="text-base sm:text-xl font-bold">{formatCurrency(results.additionalInvestment, selectedCurrency)}</p>
              </div>
              <div className="text-center">
                <p className="text-white/70 text-xs mb-1">Returns</p>
                <p className="text-base sm:text-xl font-bold">{formatCurrency(results.additionalReturns, selectedCurrency)}</p>
              </div>
              <div className="text-center">
                <p className="text-white/70 text-xs mb-1">Multiplier</p>
                <p className="text-base sm:text-xl font-bold">{results.wealthMultiplier}x</p>
              </div>
            </div>
          </div>

          {/* Charts - Hidden on mobile */}
          <div className="hidden md:block bg-white rounded-2xl shadow-xl border-2 border-gray-100 overflow-hidden">
            <div className="border-b border-gray-100 p-6">
              <h3 className="text-xl font-bold text-gray-900">
                SIP Progression
              </h3>
            </div>
            <div className="p-6">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={results.sipProgressionData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="year" stroke="#666" fontSize={12} />
                    <YAxis stroke="#666" fontSize={12} tickFormatter={(value) => formatCurrency(value, selectedCurrency)} />
                    <Tooltip formatter={(value) => formatCurrency(value, selectedCurrency)} />
                    <Bar dataKey="amount" fill="#C9A635" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="hidden md:block bg-white rounded-2xl shadow-xl border-2 border-gray-100 overflow-hidden">
            <div className="border-b border-gray-100 p-6">
              <h3 className="text-xl font-bold text-gray-900">
                Wealth Comparison
              </h3>
            </div>
            <div className="p-6">
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={results.comparisonData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="year" stroke="#666" fontSize={12} />
                    <YAxis stroke="#666" fontSize={12} tickFormatter={(value) => formatCurrency(value, selectedCurrency)} />
                    <Tooltip formatter={(value) => formatCurrency(value, selectedCurrency)} />
                    <Area type="monotone" dataKey="fixedSIP" stroke="#9CA3AF" fill="#9CA3AF" fillOpacity={0.3} name="Fixed" />
                    <Area type="monotone" dataKey="stepUpSIP" stroke="#10b981" fill="#10b981" fillOpacity={0.3} name="Step-Up" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Key Insights */}
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
            <div className="bg-white rounded-2xl shadow-xl border-2 border-gray-100 overflow-hidden">
              <div className="border-b border-gray-100 p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-bold text-gray-900">Why Step-Up</h3>
              </div>
              <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                <div className="flex items-start gap-2 sm:gap-3">
                  <div className="bg-green-100 p-2 rounded-lg flex-shrink-0">
                    <Percent className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1 text-sm sm:text-base">Matches Income</h4>
                    <p className="text-xs sm:text-sm text-gray-600">Grows with salary</p>
                  </div>
                </div>

                <div className="flex items-start gap-2 sm:gap-3">
                  <div className="bg-blue-100 p-2 rounded-lg flex-shrink-0">
                    <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1 text-sm sm:text-base">More Compounding</h4>
                    <p className="text-xs sm:text-sm text-gray-600">Higher returns</p>
                  </div>
                </div>

                <div className="flex items-start gap-2 sm:gap-3">
                  <div className="bg-purple-100 p-2 rounded-lg flex-shrink-0">
                    <Target className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1 text-sm sm:text-base">Faster Goals</h4>
                    <p className="text-xs sm:text-sm text-gray-600">Reach milestones early</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl border-2 border-gray-100 overflow-hidden">
              <div className="border-b border-gray-100 p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-bold text-gray-900">Summary</h3>
              </div>
              <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                <div className="bg-gradient-to-br from-[#7A1616]/10 to-[#C9A635]/10 rounded-xl p-4 sm:p-5 border-2 border-[#C9A635]/20">
                  <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
                    <p className="flex justify-between">
                      <span className="font-semibold">Start:</span>
                      <span className="font-bold text-[#7A1616]">{formatCurrency(initialSIP, selectedCurrency)}</span>
                    </p>
                    <p className="flex justify-between">
                      <span className="font-semibold">Final:</span>
                      <span className="font-bold text-[#C9A635]">{formatCurrency(results.finalSIPAmount, selectedCurrency)}</span>
                    </p>
                    <p className="flex justify-between">
                      <span className="font-semibold">Increase:</span>
                      <span className="font-bold text-green-600">{stepUpPercentage}%</span>
                    </p>
                    <div className="pt-2 sm:pt-3 border-t border-[#C9A635]/30">
                      <p className="flex justify-between">
                        <span className="font-semibold">Extra:</span>
                        <span className="font-extrabold text-[#7A1616]">{formatCurrency(results.additionalWealth, selectedCurrency)}</span>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300 rounded-xl p-3 sm:p-4">
                  <h4 className="font-bold text-green-800 mb-2 flex items-center gap-2 text-sm sm:text-base">
                    <ArrowUp className="w-4 h-4" />
                    Recommended
                  </h4>
                  <p className="text-green-700 text-xs sm:text-sm">
                    Start <strong>{formatCurrency(initialSIP, selectedCurrency)}</strong> + {stepUpPercentage}% yearly!
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-gradient-to-br from-[#C9A635]/10 to-[#E7C76A]/20 rounded-2xl shadow-xl border-2 border-[#C9A635] p-6 sm:p-8 text-center">
            <TrendingUp className="w-12 h-12 sm:w-16 sm:h-16 text-[#7A1616] mx-auto mb-3 sm:mb-4" />
            <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-3 sm:mb-4">
              Supercharge Wealth
            </h3>
            <p className="text-sm sm:text-lg text-gray-700 mb-4 sm:mb-6">
              Create <strong>{results.wealthGainPercentage}% more wealth</strong>!
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <button className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-[#7A1616] to-[#A12424] text-white font-bold rounded-xl text-sm sm:text-base">
                Start Step-Up SIP
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

export default SIPStepUpCalculator;
