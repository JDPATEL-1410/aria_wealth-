import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell } from 'recharts';
import { Baby, TrendingUp, DollarSign, Target, Info, Calendar, Heart, ShoppingBag } from 'lucide-react';

const ChildBirthCalculator = () => {
  const [monthsToPregnancy, setMonthsToPregnancy] = useState(12);
  const [deliveryCost, setDeliveryCost] = useState(150000);
  const [babyEssentials, setBabyEssentials] = useState(100000);
  const [firstYearExpenses, setFirstYearExpenses] = useState(200000);
  const [vaccinationCost, setVaccinationCost] = useState(50000);
  const [emergencyFund, setEmergencyFund] = useState(100000);
  const [currentSavings, setCurrentSavings] = useState(50000);
  const [expectedReturn, setExpectedReturn] = useState(10);
  const [inflationRate, setInflationRate] = useState(6);

  const results = useMemo(() => {
    const yearsToPregnancy = monthsToPregnancy / 12;
    
    // Total current cost
    const totalCurrentCost = deliveryCost + babyEssentials + firstYearExpenses + vaccinationCost + emergencyFund;
    
    // Future cost with inflation
    const futureCost = totalCurrentCost * Math.pow(1 + inflationRate / 100, yearsToPregnancy);
    
    // Individual category future costs
    const futureDeliveryCost = deliveryCost * Math.pow(1 + inflationRate / 100, yearsToPregnancy);
    const futureBabyEssentials = babyEssentials * Math.pow(1 + inflationRate / 100, yearsToPregnancy);
    const futureFirstYearExpenses = firstYearExpenses * Math.pow(1 + inflationRate / 100, yearsToPregnancy);
    const futureVaccinationCost = vaccinationCost * Math.pow(1 + inflationRate / 100, yearsToPregnancy);
    const futureEmergencyFund = emergencyFund * Math.pow(1 + inflationRate / 100, yearsToPregnancy);
    
    // Future value of current savings
    const futureValueSavings = currentSavings * Math.pow(1 + expectedReturn / 100, yearsToPregnancy);
    
    // Additional corpus needed
    const additionalCorpusNeeded = Math.max(0, futureCost - futureValueSavings);
    
    // Required monthly SIP
    const monthlyReturnRate = expectedReturn / 100 / 12;
    const totalMonths = monthsToPregnancy;
    const requiredMonthlySIP = totalMonths > 0 && monthlyReturnRate > 0
      ? (additionalCorpusNeeded * monthlyReturnRate) / (Math.pow(1 + monthlyReturnRate, totalMonths) - 1)
      : additionalCorpusNeeded / totalMonths;
    
    // Month-wise projection
    const projectionData = [];
    let accumulatedValue = currentSavings;
    
    for (let month = 1; month <= monthsToPregnancy; month++) {
      accumulatedValue = (accumulatedValue + requiredMonthlySIP) * (1 + monthlyReturnRate);
      const inflatedCost = totalCurrentCost * Math.pow(1 + inflationRate / 100, month / 12);
      
      if (month % 3 === 0) { // Show quarterly data
        projectionData.push({
          month: month,
          savings: Math.round(accumulatedValue),
          target: Math.round(inflatedCost)
        });
      }
    }
    
    // Expense breakdown for pie chart
    const expenseBreakdown = [
      { name: 'Delivery & Hospital', value: Math.round(futureDeliveryCost), percentage: ((futureDeliveryCost / futureCost) * 100).toFixed(1) },
      { name: 'Baby Essentials', value: Math.round(futureBabyEssentials), percentage: ((futureBabyEssentials / futureCost) * 100).toFixed(1) },
      { name: 'First Year Care', value: Math.round(futureFirstYearExpenses), percentage: ((futureFirstYearExpenses / futureCost) * 100).toFixed(1) },
      { name: 'Vaccination', value: Math.round(futureVaccinationCost), percentage: ((futureVaccinationCost / futureCost) * 100).toFixed(1) },
      { name: 'Emergency Fund', value: Math.round(futureEmergencyFund), percentage: ((futureEmergencyFund / futureCost) * 100).toFixed(1) }
    ];
    
    return {
      totalCurrentCost: Math.round(totalCurrentCost),
      futureCost: Math.round(futureCost),
      futureValueSavings: Math.round(futureValueSavings),
      additionalCorpusNeeded: Math.round(additionalCorpusNeeded),
      requiredMonthlySIP: Math.round(requiredMonthlySIP),
      projectionData,
      expenseBreakdown,
      totalInvestment: Math.round(currentSavings + (requiredMonthlySIP * totalMonths)),
      totalReturns: Math.round(futureCost - currentSavings - (requiredMonthlySIP * totalMonths)),
      monthsRemaining: monthsToPregnancy,
      yearsRemaining: yearsToPregnancy.toFixed(1)
    };
  }, [monthsToPregnancy, deliveryCost, babyEssentials, firstYearExpenses, vaccinationCost, emergencyFund, currentSavings, expectedReturn, inflationRate]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const COLORS = ['#7A1616', '#C9A635', '#A12424', '#E7C76A', '#8B1A1A'];

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
                <Baby className="w-5 h-5 sm:w-6 sm:h-6" />
                <span>Child Birth Planning</span>
              </h2>
            </div>
            <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
              {/* Time to Pregnancy */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Time to Pregnancy (Months)
                </label>
                <input
                  type="number"
                  value={monthsToPregnancy}
                  onChange={(e) => setMonthsToPregnancy(Number(e.target.value))}
                  className="w-full px-4 py-2 text-lg font-semibold border-2 border-gray-200 rounded-lg focus:border-[#C9A635] focus:outline-none"
                  min="6"
                  max="60"
                />
                <input
                  type="range"
                  value={monthsToPregnancy}
                  onChange={(e) => setMonthsToPregnancy(Number(e.target.value))}
                  min="6"
                  max="60"
                  className="w-full mt-3"
                />
                <p className="text-xs text-gray-500 mt-2">
                  {results.yearsRemaining} years to prepare
                </p>
              </div>

              <div className="border-t-2 border-gray-200 pt-4">
                <h3 className="font-bold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2 text-sm sm:text-base">
                  <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-[#C9A635]" />
                  Expected Expenses (Current Cost)
                </h3>
              </div>

              {/* Delivery & Hospital Cost */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Delivery & Hospital Cost (₹)
                </label>
                <input
                  type="number"
                  value={deliveryCost}
                  onChange={(e) => setDeliveryCost(Number(e.target.value))}
                  className="w-full px-4 py-2 text-lg font-semibold border-2 border-gray-200 rounded-lg focus:border-[#C9A635] focus:outline-none"
                  min="50000"
                  step="10000"
                />
                <input
                  type="range"
                  value={deliveryCost}
                  onChange={(e) => setDeliveryCost(Number(e.target.value))}
                  min="50000"
                  max="500000"
                  step="10000"
                  className="w-full mt-3"
                />
                <p className="text-xs text-gray-500 mt-2">
                  Normal: ₹75K-150K, C-section: ₹150K-300K
                </p>
              </div>

              {/* Baby Essentials */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Baby Essentials (₹)
                </label>
                <input
                  type="number"
                  value={babyEssentials}
                  onChange={(e) => setBabyEssentials(Number(e.target.value))}
                  className="w-full px-4 py-2 text-lg font-semibold border-2 border-gray-200 rounded-lg focus:border-[#C9A635] focus:outline-none"
                  min="30000"
                  step="10000"
                />
                <input
                  type="range"
                  value={babyEssentials}
                  onChange={(e) => setBabyEssentials(Number(e.target.value))}
                  min="30000"
                  max="300000"
                  step="10000"
                  className="w-full mt-3"
                />
                <p className="text-xs text-gray-500 mt-2 hidden sm:block">
                  Crib, stroller, clothes, diapers, bottles, etc.
                </p>
              </div>

              {/* First Year Expenses */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  First Year Expenses (₹)
                </label>
                <input
                  type="number"
                  value={firstYearExpenses}
                  onChange={(e) => setFirstYearExpenses(Number(e.target.value))}
                  className="w-full px-4 py-2 text-lg font-semibold border-2 border-gray-200 rounded-lg focus:border-[#C9A635] focus:outline-none"
                  min="50000"
                  step="10000"
                />
                <input
                  type="range"
                  value={firstYearExpenses}
                  onChange={(e) => setFirstYearExpenses(Number(e.target.value))}
                  min="50000"
                  max="500000"
                  step="10000"
                  className="w-full mt-3"
                />
                <p className="text-xs text-gray-500 mt-2 hidden sm:block">
                  Monthly diapers, formula, doctor visits, medicines
                </p>
              </div>

              {/* Vaccination Cost */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Vaccination Cost (₹)
                </label>
                <input
                  type="number"
                  value={vaccinationCost}
                  onChange={(e) => setVaccinationCost(Number(e.target.value))}
                  className="w-full px-4 py-2 text-lg font-semibold border-2 border-gray-200 rounded-lg focus:border-[#C9A635] focus:outline-none"
                  min="20000"
                  step="5000"
                />
                <input
                  type="range"
                  value={vaccinationCost}
                  onChange={(e) => setVaccinationCost(Number(e.target.value))}
                  min="20000"
                  max="150000"
                  step="5000"
                  className="w-full mt-3"
                />
              </div>

              {/* Emergency Fund */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Emergency Fund (₹)
                </label>
                <input
                  type="number"
                  value={emergencyFund}
                  onChange={(e) => setEmergencyFund(Number(e.target.value))}
                  className="w-full px-4 py-2 text-lg font-semibold border-2 border-gray-200 rounded-lg focus:border-[#C9A635] focus:outline-none"
                  min="50000"
                  step="10000"
                />
                <input
                  type="range"
                  value={emergencyFund}
                  onChange={(e) => setEmergencyFund(Number(e.target.value))}
                  min="50000"
                  max="300000"
                  step="10000"
                  className="w-full mt-3"
                />
              </div>

              <div className="border-t-2 border-gray-200 pt-4">
                <h3 className="font-bold text-gray-900 mb-3 sm:mb-4 text-sm sm:text-base">Investment Details</h3>
              </div>

              {/* Current Savings */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Current Savings (₹)
                </label>
                <input
                  type="number"
                  value={currentSavings}
                  onChange={(e) => setCurrentSavings(Number(e.target.value))}
                  className="w-full px-4 py-2 text-lg font-semibold border-2 border-gray-200 rounded-lg focus:border-[#C9A635] focus:outline-none"
                  min="0"
                  step="10000"
                />
                <input
                  type="range"
                  value={currentSavings}
                  onChange={(e) => setCurrentSavings(Number(e.target.value))}
                  min="0"
                  max="500000"
                  step="10000"
                  className="w-full mt-3"
                />
              </div>

              {/* Expected Return */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Expected Return (%)
                </label>
                <input
                  type="number"
                  value={expectedReturn}
                  onChange={(e) => setExpectedReturn(Number(e.target.value))}
                  className="w-full px-4 py-2 text-lg font-semibold border-2 border-gray-200 rounded-lg focus:border-[#C9A635] focus:outline-none"
                  min="6"
                  max="15"
                  step="0.5"
                />
                <input
                  type="range"
                  value={expectedReturn}
                  onChange={(e) => setExpectedReturn(Number(e.target.value))}
                  min="6"
                  max="15"
                  step="0.5"
                  className="w-full mt-3"
                />
              </div>

              {/* Medical Inflation Rate */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Medical Inflation Rate (%)
                </label>
                <input
                  type="number"
                  value={inflationRate}
                  onChange={(e) => setInflationRate(Number(e.target.value))}
                  className="w-full px-4 py-2 text-lg font-semibold border-2 border-gray-200 rounded-lg focus:border-[#C9A635] focus:outline-none"
                  min="4"
                  max="12"
                  step="0.5"
                />
                <input
                  type="range"
                  value={inflationRate}
                  onChange={(e) => setInflationRate(Number(e.target.value))}
                  min="4"
                  max="12"
                  step="0.5"
                  className="w-full mt-3"
                />
                <p className="text-xs text-gray-500 mt-2 hidden sm:block">
                  Medical costs typically rise 8-12% annually
                </p>
              </div>
            </div>
          </div>

          {/* Planning Tip - Hidden on mobile */}
          <div className="hidden lg:block bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl shadow-lg border-2 border-pink-200 p-6">
            <div className="flex items-start space-x-3">
              <Info className="w-5 h-5 text-pink-600 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-pink-800 mb-2">Parenthood Planning Tip</h3>
                <p className="text-pink-700 text-sm leading-relaxed">
                  Start saving early! Healthcare costs rise 8-12% annually. Having a dedicated fund ensures 
                  you can provide the best care without financial stress during this special time.
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
                <div className="bg-pink-100 w-10 h-10 sm:w-14 sm:h-14 rounded-lg sm:rounded-xl flex items-center justify-center mb-2 sm:mb-0">
                  <Calendar className="w-5 h-5 sm:w-7 sm:h-7 text-pink-600" />
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-semibold text-gray-600">Time to Prepare</h3>
                  <p className="text-xl sm:text-3xl font-extrabold text-gray-900">{results.monthsRemaining}M</p>
                  <p className="text-xs text-gray-500 hidden sm:block">{results.yearsRemaining} years</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl border-2 border-gray-100 p-4 sm:p-6 hover:shadow-2xl transition-shadow duration-300">
              <div className="flex flex-col sm:flex-row items-start sm:items-center sm:space-x-4">
                <div className="bg-blue-100 w-10 h-10 sm:w-14 sm:h-14 rounded-lg sm:rounded-xl flex items-center justify-center mb-2 sm:mb-0">
                  <DollarSign className="w-5 h-5 sm:w-7 sm:h-7 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-semibold text-gray-600">Current Cost</h3>
                  <p className="text-lg sm:text-2xl font-extrabold text-blue-600">
                    {formatCurrency(results.totalCurrentCost)}
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
                  <h3 className="text-xs sm:text-sm font-semibold text-white/90">Future Cost</h3>
                  <p className="text-lg sm:text-2xl font-extrabold text-white">
                    {formatCurrency(results.futureCost)}
                  </p>
                  <p className="text-xs text-white/70 mt-1">{inflationRate}% inflation</p>
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
                    {formatCurrency(results.requiredMonthlySIP)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Expense Breakdown Pie Chart */}
          <div className="bg-white rounded-2xl shadow-xl border-2 border-gray-100 overflow-hidden">
            <div className="border-b border-gray-100 p-4 sm:p-6">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900">
                Expense Breakdown
              </h3>
            </div>
            <div className="p-4 sm:p-6">
              <div className="grid md:grid-cols-2 gap-4 sm:gap-6 items-center">
                {/* Pie Chart - Smaller on mobile */}
                <div className="h-64 sm:h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={results.expenseBreakdown}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ percentage }) => `${percentage}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {results.expenseBreakdown.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => formatCurrency(value)} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-2 sm:space-y-3">
                  {results.expenseBreakdown.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-2 sm:p-3 bg-gray-50 rounded-lg sm:rounded-xl border border-gray-200">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div 
                          className="w-3 h-3 sm:w-4 sm:h-4 rounded-full flex-shrink-0" 
                          style={{ backgroundColor: COLORS[index % COLORS.length] }}
                        />
                        <span className="text-xs sm:text-sm font-semibold text-gray-700">{item.name}</span>
                      </div>
                      <div className="text-right">
                        <p className="text-xs sm:text-sm font-bold text-gray-900">{formatCurrency(item.value)}</p>
                        <p className="text-xs text-gray-500">{item.percentage}%</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Progress Chart - Hidden on mobile */}
          <div className="hidden md:block bg-white rounded-2xl shadow-xl border-2 border-gray-100 overflow-hidden">
            <div className="border-b border-gray-100 p-6">
              <h3 className="text-xl font-bold text-gray-900">
                Savings Accumulation Progress
              </h3>
            </div>
            <div className="p-6">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={results.projectionData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis 
                      dataKey="month" 
                      stroke="#666"
                      fontSize={12}
                      label={{ value: 'Months', position: 'insideBottom', offset: -5 }}
                      tickFormatter={(value) => `M${value}`}
                    />
                    <YAxis 
                      stroke="#666"
                      fontSize={12}
                      tickFormatter={(value) => `₹${(value / 100000).toFixed(0)}L`}
                    />
                    <Tooltip 
                      formatter={(value, name) => [formatCurrency(value), name === 'savings' ? 'Your Savings' : 'Target Cost']}
                      labelFormatter={(label) => `Month ${label}`}
                      contentStyle={{
                        backgroundColor: '#fff',
                        border: '2px solid #e5e7eb',
                        borderRadius: '12px',
                        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                      }}
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
                <h3 className="text-base sm:text-lg font-bold text-gray-900">Savings Summary</h3>
              </div>
              <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                <div className="flex justify-between items-center p-3 sm:p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border border-blue-200">
                  <span className="text-xs sm:text-sm font-semibold text-gray-700">Current Savings</span>
                  <span className="text-sm sm:text-base font-extrabold text-gray-900">{formatCurrency(currentSavings)}</span>
                </div>
                
                <div className="flex justify-between items-center p-3 sm:p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-xl border border-green-200">
                  <span className="text-xs sm:text-sm font-semibold text-gray-700">Future Value</span>
                  <span className="text-sm sm:text-base font-extrabold text-green-600">{formatCurrency(results.futureValueSavings)}</span>
                </div>
                
                <div className="flex justify-between items-center p-3 sm:p-4 bg-gradient-to-r from-red-50 to-red-100 rounded-xl border border-red-200">
                  <span className="text-xs sm:text-sm font-semibold text-gray-700">Additional Needed</span>
                  <span className="text-sm sm:text-base font-extrabold text-red-600">{formatCurrency(results.additionalCorpusNeeded)}</span>
                </div>
                
                <div className="flex justify-between items-center p-3 sm:p-4 bg-gradient-to-r from-[#C9A635]/20 to-[#E7C76A]/20 rounded-xl border-2 border-[#C9A635]/30">
                  <span className="text-xs sm:text-sm font-semibold text-gray-700">Monthly SIP</span>
                  <span className="text-sm sm:text-base font-extrabold text-[#7A1616]">{formatCurrency(results.requiredMonthlySIP)}</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl border-2 border-gray-100 overflow-hidden">
              <div className="border-b border-gray-100 p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-bold text-gray-900">Planning Insights</h3>
              </div>
              <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                <div className="text-center p-4 sm:p-5 bg-gradient-to-br from-[#7A1616]/10 to-[#C9A635]/10 rounded-xl border-2 border-[#C9A635]/20">
                  <div className="space-y-2 text-xs sm:text-sm">
                    <p className="flex justify-between">
                      <span className="font-semibold">Total Investment:</span>
                      <span className="font-bold text-[#7A1616]">{formatCurrency(results.totalInvestment)}</span>
                    </p>
                    <p className="flex justify-between">
                      <span className="font-semibold">Expected Returns:</span>
                      <span className="font-bold text-green-600">{formatCurrency(results.totalReturns)}</span>
                    </p>
                    <p className="flex justify-between">
                      <span className="font-semibold">Time to Prepare:</span>
                      <span className="font-bold text-[#C9A635]">{results.monthsRemaining} months</span>
                    </p>
                  </div>
                </div>
                
                {results.requiredMonthlySIP > 0 && (
                  <div className="bg-gradient-to-r from-pink-50 to-rose-50 border-2 border-pink-300 rounded-xl p-3 sm:p-4">
                    <h4 className="font-bold text-pink-800 mb-2 flex items-center gap-2 text-sm sm:text-base">
                      <Baby className="w-4 h-4" />
                      Action Plan
                    </h4>
                    <p className="text-pink-700 text-xs sm:text-sm leading-relaxed">
                      Save <strong className="text-[#7A1616]">{formatCurrency(results.requiredMonthlySIP)}</strong> monthly!
                    </p>
                  </div>
                )}
                
                {results.additionalCorpusNeeded <= 0 && (
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300 rounded-xl p-3 sm:p-4">
                    <h4 className="font-bold text-green-800 mb-2 text-sm sm:text-base">Well Prepared!</h4>
                    <p className="text-green-700 text-xs sm:text-sm leading-relaxed">
                      Your savings are sufficient!
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl shadow-xl border-2 border-pink-200 p-6 sm:p-8 text-center">
            <Heart className="w-12 h-12 sm:w-16 sm:h-16 text-[#7A1616] mx-auto mb-4" />
            <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-3 sm:mb-4">
              Prepare for Your Bundle of Joy
            </h3>
            <p className="text-sm sm:text-lg text-gray-700 mb-4 sm:mb-6 max-w-2xl mx-auto">
              Plan ahead for <strong className="text-[#7A1616]">stress-free parenthood</strong>!
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <button className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-[#7A1616] to-[#A12424] text-white font-bold text-sm sm:text-base rounded-xl hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                Start Planning Now
              </button>
              <button className="px-6 sm:px-8 py-3 sm:py-4 bg-white border-2 border-[#7A1616] text-[#7A1616] font-bold text-sm sm:text-base rounded-xl hover:bg-gray-50 transition-all duration-300">
                Get Expert Advice
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ChildBirthCalculator;
