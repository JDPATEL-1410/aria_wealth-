import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Calculator, Target, DollarSign, Calendar, Info, Star } from 'lucide-react';

const DreamGoalCalculator = () => {
  const [goalType, setGoalType] = useState('home');
  const [targetAmount, setTargetAmount] = useState(5000000);
  const [timeHorizon, setTimeHorizon] = useState(10);
  const [currentSavings, setCurrentSavings] = useState(500000);
  const [expectedReturn, setExpectedReturn] = useState(12);
  const [inflationRate, setInflationRate] = useState(6);

  const goalPresets = {
    home: { name: 'Dream Home', amount: 5000000, icon: '🏠', timeframe: 10 },
    car: { name: 'Luxury Car', amount: 1500000, icon: '🚗', timeframe: 5 },
    vacation: { name: 'World Tour', amount: 1000000, icon: '✈️', timeframe: 3 },
    education: { name: 'Child Education', amount: 2500000, icon: '🎓', timeframe: 15 },
    business: { name: 'Start Business', amount: 3000000, icon: '💼', timeframe: 7 },
    wedding: { name: 'Dream Wedding', amount: 2000000, icon: '💒', timeframe: 4 },
    custom: { name: 'Custom Goal', amount: targetAmount, icon: '🎯', timeframe: timeHorizon }
  };

  // Calculations
  const results = useMemo(() => {
    // Adjust target for inflation
    const inflationAdjustedTarget = targetAmount * Math.pow(1 + inflationRate / 100, timeHorizon);
    
    // Future value of current savings
    const futureCurrentSavings = currentSavings * Math.pow(1 + expectedReturn / 100, timeHorizon);
    
    // Additional amount needed
    const additionalAmountNeeded = Math.max(0, inflationAdjustedTarget - futureCurrentSavings);
    
    // Required monthly SIP
    const monthlyRate = expectedReturn / 100 / 12;
    const totalMonths = timeHorizon * 12;
    const requiredMonthlySIP = totalMonths > 0 && monthlyRate > 0
      ? (additionalAmountNeeded * monthlyRate) / (Math.pow(1 + monthlyRate, totalMonths) - 1)
      : additionalAmountNeeded / totalMonths;
    
    // Alternative scenarios (different time horizons)
    const timeScenarios = [];
    [3, 5, 7, 10, 15].forEach(years => {
      if (years !== timeHorizon) {
        const adjustedTarget = targetAmount * Math.pow(1 + inflationRate / 100, years);
        const futureSavings = currentSavings * Math.pow(1 + expectedReturn / 100, years);
        const additional = Math.max(0, adjustedTarget - futureSavings);
        const months = years * 12;
        const monthlySIP = months > 0 && monthlyRate > 0
          ? (additional * monthlyRate) / (Math.pow(1 + monthlyRate, months) - 1)
          : additional / months;
        
        timeScenarios.push({
          years,
          targetAmount: Math.round(adjustedTarget),
          monthlySIP: Math.round(monthlySIP),
          totalSIP: Math.round(monthlySIP * months)
        });
      }
    });
    
    // Year-wise accumulation
    const yearlyData = [];
    let accumulatedValue = currentSavings;
    
    for (let year = 1; year <= timeHorizon; year++) {
      const annualSIP = requiredMonthlySIP * 12;
      accumulatedValue = (accumulatedValue + annualSIP) * (1 + expectedReturn / 100);
      
      yearlyData.push({
        year,
        accumulated: Math.round(accumulatedValue),
        target: Math.round(inflationAdjustedTarget),
        sipInvested: Math.round(requiredMonthlySIP * 12 * year),
        currentSavingsGrowth: Math.round(currentSavings * Math.pow(1 + expectedReturn / 100, year))
      });
    }
    
    // Investment breakdown
    const totalSIPInvestment = requiredMonthlySIP * totalMonths;
    const totalInvestment = currentSavings + totalSIPInvestment;
    const totalReturns = inflationAdjustedTarget - totalInvestment;
    
    return {
      inflationAdjustedTarget: Math.round(inflationAdjustedTarget),
      futureCurrentSavings: Math.round(futureCurrentSavings),
      additionalAmountNeeded: Math.round(additionalAmountNeeded),
      requiredMonthlySIP: Math.round(requiredMonthlySIP),
      totalSIPInvestment: Math.round(totalSIPInvestment),
      totalInvestment: Math.round(totalInvestment),
      totalReturns: Math.round(totalReturns),
      timeScenarios,
      yearlyData
    };
  }, [targetAmount, timeHorizon, currentSavings, expectedReturn, inflationRate]);

  const pieData = [
    { name: 'Current Savings', value: currentSavings, color: '#7A1616' },
    { name: 'SIP Investment', value: results.totalSIPInvestment, color: '#C9A635' },
    { name: 'Expected Returns', value: results.totalReturns, color: '#10B981' }
  ];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const handleGoalTypeChange = (value) => {
    setGoalType(value);
    if (value !== 'custom') {
      setTargetAmount(goalPresets[value].amount);
      setTimeHorizon(goalPresets[value].timeframe);
    }
  };

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
                <Star className="w-5 h-5 sm:w-6 sm:h-6" />
                <span>Dream Goal Details</span>
              </h2>
            </div>
            <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
              {/* Goal Type Selection */}
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                  Select Your Dream Goal
                </label>
                <select
                  value={goalType}
                  onChange={(e) => handleGoalTypeChange(e.target.value)}
                  className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border-2 border-gray-200 rounded-lg focus:border-[#C9A635] focus:outline-none font-medium"
                >
                  {Object.entries(goalPresets).map(([key, preset]) => (
                    <option key={key} value={key}>
                      {preset.icon} {preset.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Target Amount */}
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                  Target Amount (₹)
                </label>
                <input
                  type="number"
                  value={targetAmount}
                  onChange={(e) => setTargetAmount(Number(e.target.value))}
                  className="w-full px-3 sm:px-4 py-2 text-base sm:text-lg font-semibold border-2 border-gray-200 rounded-lg focus:border-[#C9A635] focus:outline-none"
                  min="100000"
                  step="50000"
                  disabled={goalType !== 'custom'}
                />
                {goalType === 'custom' && (
                  <>
                    <input
                      type="range"
                      value={targetAmount}
                      onChange={(e) => setTargetAmount(Number(e.target.value))}
                      min={100000}
                      max={20000000}
                      step={50000}
                      className="w-full mt-3"
                    />
                    <p className="text-xs text-gray-500 mt-1 hidden sm:block">
                      Range: ₹1L - ₹2Cr
                    </p>
                  </>
                )}
              </div>

              {/* Time Horizon */}
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                  Time Horizon (Years)
                </label>
                <input
                  type="number"
                  value={timeHorizon}
                  onChange={(e) => setTimeHorizon(Number(e.target.value))}
                  className="w-full px-3 sm:px-4 py-2 text-base sm:text-lg font-semibold border-2 border-gray-200 rounded-lg focus:border-[#C9A635] focus:outline-none"
                  min="1"
                  max="25"
                  disabled={goalType !== 'custom'}
                />
                {goalType === 'custom' && (
                  <input
                    type="range"
                    value={timeHorizon}
                    onChange={(e) => setTimeHorizon(Number(e.target.value))}
                    min={1}
                    max={25}
                    step={1}
                    className="w-full mt-3"
                  />
                )}
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
            </div>
          </div>

          {/* Goal Motivation - Hidden on mobile */}
          <div className="hidden lg:block bg-gradient-to-br from-[#C9A635]/10 to-[#7A1616]/5 rounded-2xl shadow-xl border-2 border-[#C9A635]/20 p-6">
            <div className="flex items-start space-x-3">
              <div className="text-2xl">{goalPresets[goalType].icon}</div>
              <div>
                <h3 className="font-semibold text-[#7A1616] mb-2">
                  {goalPresets[goalType].name} Strategy
                </h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Dreams become reality with disciplined planning. Start your SIP today and 
                  watch your goal become achievable through the magic of compound growth.
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
          {/* Goal Summary */}
          <div className="bg-gradient-to-r from-[#7A1616] to-[#8B1A1A] text-white rounded-2xl shadow-xl p-6 sm:p-8">
            <div className="text-center">
              <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">{goalPresets[goalType].icon}</div>
              <h2 className="text-xl sm:text-2xl font-bold mb-2">{goalPresets[goalType].name}</h2>
              <p className="text-white/90 mb-4 sm:mb-6 text-sm sm:text-base">
                Target: {formatCurrency(targetAmount)} | {timeHorizon} years
              </p>
              
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 sm:p-4">
                  <h3 className="text-xs sm:text-sm font-medium text-white/90 mb-1">Adjusted Goal</h3>
                  <p className="text-base sm:text-xl font-bold">{formatCurrency(results.inflationAdjustedTarget)}</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 sm:p-4">
                  <h3 className="text-xs sm:text-sm font-medium text-white/90 mb-1">Monthly SIP</h3>
                  <p className="text-base sm:text-xl font-bold text-[#C9A635]">{formatCurrency(results.requiredMonthlySIP)}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <div className="bg-white rounded-xl shadow-xl border-2 border-gray-100 p-3 sm:p-4 text-center">
              <div className="bg-blue-100 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3">
                <DollarSign className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
              </div>
              <h3 className="text-xs font-medium text-gray-600 mb-1">Savings</h3>
              <p className="text-sm sm:text-lg font-bold text-gray-900">{formatCurrency(currentSavings)}</p>
            </div>

            <div className="bg-white rounded-xl shadow-xl border-2 border-gray-100 p-3 sm:p-4 text-center">
              <div className="bg-green-100 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3">
                <Target className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
              </div>
              <h3 className="text-xs font-medium text-gray-600 mb-1">Total SIP</h3>
              <p className="text-sm sm:text-lg font-bold text-green-600">{formatCurrency(results.totalSIPInvestment)}</p>
            </div>

            <div className="bg-white rounded-xl shadow-xl border-2 border-gray-100 p-3 sm:p-4 text-center">
              <div className="bg-purple-100 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3">
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
              </div>
              <h3 className="text-xs font-medium text-gray-600 mb-1">Returns</h3>
              <p className="text-sm sm:text-lg font-bold text-purple-600">{formatCurrency(results.totalReturns)}</p>
            </div>

            <div className="bg-white rounded-xl shadow-xl border-2 border-gray-100 p-3 sm:p-4 text-center">
              <div className="bg-orange-100 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3">
                <Star className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600" />
              </div>
              <h3 className="text-xs font-medium text-gray-600 mb-1">Goal Value</h3>
              <p className="text-sm sm:text-lg font-bold text-orange-600">{formatCurrency(results.inflationAdjustedTarget)}</p>
            </div>
          </div>

          {/* Charts - Hidden on mobile */}
          <div className="hidden md:grid md:grid-cols-2 gap-6">
            {/* Goal Accumulation Chart */}
            <div className="bg-white rounded-2xl shadow-xl border-2 border-gray-100 overflow-hidden">
              <div className="border-b border-gray-100 p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                  Goal Progress
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
                        tickFormatter={(value) => `₹${(value / 100000).toFixed(0)}L`}
                      />
                      <Tooltip 
                        formatter={(value, name) => [formatCurrency(value), name]}
                        labelFormatter={(label) => `Year ${label}`}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="target" 
                        stroke="#7A1616" 
                        strokeWidth={2}
                        strokeDasharray="5 5"
                        name="Target"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="accumulated" 
                        stroke="#C9A635" 
                        strokeWidth={3}
                        name="Accumulated"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Investment Breakdown */}
            <div className="bg-white rounded-2xl shadow-xl border-2 border-gray-100 overflow-hidden">
              <div className="border-b border-gray-100 p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                  Investment Mix
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
                      <Tooltip formatter={(value) => formatCurrency(value)} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="mt-4 space-y-2">
                  {pieData.map((entry, index) => (
                    <div key={index} className="flex items-center justify-between text-xs sm:text-sm">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }}></div>
                        <span className="text-gray-600">{entry.name}</span>
                      </div>
                      <span className="font-semibold text-gray-900">{formatCurrency(entry.value)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Alternative Time Scenarios */}
          <div className="bg-white rounded-2xl shadow-xl border-2 border-gray-100 overflow-hidden">
            <div className="border-b border-gray-100 p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                Change Timeline?
              </h3>
            </div>
            <div className="p-4 sm:p-6">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                {results.timeScenarios.slice(0, 4).map((scenario, index) => (
                  <div key={index} className={`p-3 sm:p-4 rounded-lg border-2 ${
                    scenario.years < timeHorizon 
                      ? 'border-red-200 bg-red-50' 
                      : 'border-green-200 bg-green-50'
                  }`}>
                    <div className="text-center">
                      <h4 className="text-base sm:text-lg font-bold text-gray-900 mb-1">{scenario.years}Y</h4>
                      <div className="space-y-1 sm:space-y-2">
                        <div className="hidden sm:block">
                          <p className="text-xs text-gray-600">Target</p>
                          <p className="text-xs font-semibold">{formatCurrency(scenario.targetAmount)}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-600">Monthly SIP</p>
                          <p className={`text-sm sm:text-lg font-bold ${
                            scenario.years < timeHorizon ? 'text-red-600' : 'text-green-600'
                          }`}>
                            {formatCurrency(scenario.monthlySIP)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-gradient-to-r from-[#C9A635]/10 to-[#7A1616]/10 rounded-lg">
                <div className="flex items-start space-x-2 sm:space-x-3">
                  <Info className="w-4 h-4 sm:w-5 sm:h-5 text-[#7A1616] mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-[#7A1616] mb-1 sm:mb-2 text-sm sm:text-base">Timeline Impact</h4>
                    <p className="text-xs sm:text-sm text-gray-700">
                      More time = Lower monthly investment. Start early!
                    </p>
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

export default DreamGoalCalculator;
