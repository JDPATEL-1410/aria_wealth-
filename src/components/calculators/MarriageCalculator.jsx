import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell } from 'recharts';
import { Gem, TrendingUp, DollarSign, Target, Info, Calendar, Users, Gift } from 'lucide-react';

const MarriageCalculator = () => {
  const [targetYear, setTargetYear] = useState(3);
  const [venueAndDecor, setVenueAndDecor] = useState(500000);
  const [catering, setCatering] = useState(300000);
  const [photography, setPhotography] = useState(100000);
  const [jewelry, setJewelry] = useState(500000);
  const [clothing, setClothing] = useState(200000);
  const [otherExpenses, setOtherExpenses] = useState(200000);
  const [currentSavings, setCurrentSavings] = useState(200000);
  const [expectedReturn, setExpectedReturn] = useState(12);
  const [inflationRate, setInflationRate] = useState(6);

  const results = useMemo(() => {
    // Total current cost
    const totalCurrentCost = venueAndDecor + catering + photography + jewelry + clothing + otherExpenses;
    
    // Future cost with inflation
    const futureCost = totalCurrentCost * Math.pow(1 + inflationRate / 100, targetYear);
    
    // Individual category future costs
    const futureVenueAndDecor = venueAndDecor * Math.pow(1 + inflationRate / 100, targetYear);
    const futureCatering = catering * Math.pow(1 + inflationRate / 100, targetYear);
    const futurePhotography = photography * Math.pow(1 + inflationRate / 100, targetYear);
    const futureJewelry = jewelry * Math.pow(1 + inflationRate / 100, targetYear);
    const futureClothing = clothing * Math.pow(1 + inflationRate / 100, targetYear);
    const futureOtherExpenses = otherExpenses * Math.pow(1 + inflationRate / 100, targetYear);
    
    // Future value of current savings
    const futureValueSavings = currentSavings * Math.pow(1 + expectedReturn / 100, targetYear);
    
    // Additional corpus needed
    const additionalCorpusNeeded = Math.max(0, futureCost - futureValueSavings);
    
    // Required monthly SIP
    const monthlyReturnRate = expectedReturn / 100 / 12;
    const totalMonths = targetYear * 12;
    const requiredMonthlySIP = totalMonths > 0 && monthlyReturnRate > 0
      ? (additionalCorpusNeeded * monthlyReturnRate) / (Math.pow(1 + monthlyReturnRate, totalMonths) - 1)
      : additionalCorpusNeeded / totalMonths;
    
    // Year-wise projection
    const projectionData = [];
    let accumulatedValue = currentSavings;
    
    for (let year = 1; year <= targetYear; year++) {
      const annualSIP = requiredMonthlySIP * 12;
      accumulatedValue = (accumulatedValue + annualSIP) * (1 + expectedReturn / 100);
      const inflatedCost = totalCurrentCost * Math.pow(1 + inflationRate / 100, year);
      
      projectionData.push({
        year: year,
        savings: Math.round(accumulatedValue),
        target: Math.round(inflatedCost)
      });
    }
    
    // Expense breakdown for pie chart
    const expenseBreakdown = [
      { name: 'Venue & Decor', value: Math.round(futureVenueAndDecor), percentage: ((futureVenueAndDecor / futureCost) * 100).toFixed(1) },
      { name: 'Catering', value: Math.round(futureCatering), percentage: ((futureCatering / futureCost) * 100).toFixed(1) },
      { name: 'Photography', value: Math.round(futurePhotography), percentage: ((futurePhotography / futureCost) * 100).toFixed(1) },
      { name: 'Jewelry', value: Math.round(futureJewelry), percentage: ((futureJewelry / futureCost) * 100).toFixed(1) },
      { name: 'Clothing', value: Math.round(futureClothing), percentage: ((futureClothing / futureCost) * 100).toFixed(1) },
      { name: 'Other', value: Math.round(futureOtherExpenses), percentage: ((futureOtherExpenses / futureCost) * 100).toFixed(1) }
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
      totalReturns: Math.round(futureCost - currentSavings - (requiredMonthlySIP * totalMonths))
    };
  }, [targetYear, venueAndDecor, catering, photography, jewelry, clothing, otherExpenses, currentSavings, expectedReturn, inflationRate]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const COLORS = ['#7A1616', '#C9A635', '#A12424', '#E7C76A', '#8B1A1A', '#D4B547'];

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
                <Gem className="w-5 h-5 sm:w-6 sm:h-6" />
                <span>Marriage Planning</span>
              </h2>
            </div>
            <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
              {/* Years to Marriage */}
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                  Years to Marriage
                </label>
                <input
                  type="number"
                  value={targetYear}
                  onChange={(e) => setTargetYear(Number(e.target.value))}
                  className="w-full px-3 sm:px-4 py-2 text-base sm:text-lg font-semibold border-2 border-gray-200 rounded-lg focus:border-[#C9A635] focus:outline-none"
                  min="1"
                  max="10"
                />
                <input
                  type="range"
                  value={targetYear}
                  onChange={(e) => setTargetYear(Number(e.target.value))}
                  min="1"
                  max="10"
                  className="w-full mt-3"
                />
              </div>

              <div className="border-t-2 border-gray-200 pt-4">
                <h3 className="font-bold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2 text-sm sm:text-base">
                  <Gift className="w-4 h-4 sm:w-5 sm:h-5 text-[#C9A635]" />
                  Expenses (Current)
                </h3>
              </div>

              {/* Venue & Decor */}
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                  Venue & Decor (₹)
                </label>
                <input
                  type="number"
                  value={venueAndDecor}
                  onChange={(e) => setVenueAndDecor(Number(e.target.value))}
                  className="w-full px-3 sm:px-4 py-2 text-base sm:text-lg font-semibold border-2 border-gray-200 rounded-lg focus:border-[#C9A635] focus:outline-none"
                  min="100000"
                  step="50000"
                />
                <input
                  type="range"
                  value={venueAndDecor}
                  onChange={(e) => setVenueAndDecor(Number(e.target.value))}
                  min="100000"
                  max="2000000"
                  step="50000"
                  className="w-full mt-3"
                />
              </div>

              {/* Catering */}
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                  Catering & Food (₹)
                </label>
                <input
                  type="number"
                  value={catering}
                  onChange={(e) => setCatering(Number(e.target.value))}
                  className="w-full px-3 sm:px-4 py-2 text-base sm:text-lg font-semibold border-2 border-gray-200 rounded-lg focus:border-[#C9A635] focus:outline-none"
                  min="50000"
                  step="25000"
                />
                <input
                  type="range"
                  value={catering}
                  onChange={(e) => setCatering(Number(e.target.value))}
                  min="50000"
                  max="1500000"
                  step="25000"
                  className="w-full mt-3"
                />
              </div>

              {/* Photography */}
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                  Photography (₹)
                </label>
                <input
                  type="number"
                  value={photography}
                  onChange={(e) => setPhotography(Number(e.target.value))}
                  className="w-full px-3 sm:px-4 py-2 text-base sm:text-lg font-semibold border-2 border-gray-200 rounded-lg focus:border-[#C9A635] focus:outline-none"
                  min="20000"
                  step="10000"
                />
                <input
                  type="range"
                  value={photography}
                  onChange={(e) => setPhotography(Number(e.target.value))}
                  min="20000"
                  max="500000"
                  step="10000"
                  className="w-full mt-3"
                />
              </div>

              {/* Jewelry */}
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                  Jewelry & Gold (₹)
                </label>
                <input
                  type="number"
                  value={jewelry}
                  onChange={(e) => setJewelry(Number(e.target.value))}
                  className="w-full px-3 sm:px-4 py-2 text-base sm:text-lg font-semibold border-2 border-gray-200 rounded-lg focus:border-[#C9A635] focus:outline-none"
                  min="100000"
                  step="50000"
                />
                <input
                  type="range"
                  value={jewelry}
                  onChange={(e) => setJewelry(Number(e.target.value))}
                  min="100000"
                  max="2500000"
                  step="50000"
                  className="w-full mt-3"
                />
              </div>

              {/* Clothing */}
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                  Clothing (₹)
                </label>
                <input
                  type="number"
                  value={clothing}
                  onChange={(e) => setClothing(Number(e.target.value))}
                  className="w-full px-3 sm:px-4 py-2 text-base sm:text-lg font-semibold border-2 border-gray-200 rounded-lg focus:border-[#C9A635] focus:outline-none"
                  min="50000"
                  step="25000"
                />
                <input
                  type="range"
                  value={clothing}
                  onChange={(e) => setClothing(Number(e.target.value))}
                  min="50000"
                  max="1000000"
                  step="25000"
                  className="w-full mt-3"
                />
              </div>

              {/* Other Expenses */}
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                  Other Expenses (₹)
                </label>
                <input
                  type="number"
                  value={otherExpenses}
                  onChange={(e) => setOtherExpenses(Number(e.target.value))}
                  className="w-full px-3 sm:px-4 py-2 text-base sm:text-lg font-semibold border-2 border-gray-200 rounded-lg focus:border-[#C9A635] focus:outline-none"
                  min="50000"
                  step="25000"
                />
                <input
                  type="range"
                  value={otherExpenses}
                  onChange={(e) => setOtherExpenses(Number(e.target.value))}
                  min="50000"
                  max="1000000"
                  step="25000"
                  className="w-full mt-3"
                />
              </div>

              <div className="border-t-2 border-gray-200 pt-4">
                <h3 className="font-bold text-gray-900 mb-3 sm:mb-4 text-sm sm:text-base">Investment Details</h3>
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
                  max="2000000"
                  step="50000"
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
                  min="3"
                  max="10"
                  step="0.5"
                  className="w-full mt-3"
                />
              </div>
            </div>
          </div>

          {/* Marriage Planning Tip - Hidden on mobile */}
          <div className="hidden lg:block bg-gradient-to-br from-[#C9A635]/5 to-[#E7C76A]/10 rounded-2xl shadow-lg border-2 border-[#C9A635]/20 p-6">
            <div className="flex items-start space-x-3">
              <Info className="w-5 h-5 text-[#7A1616] mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-[#7A1616] mb-2">Marriage Planning Tip</h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Start early! Wedding costs rise 6-8% annually. Invest systematically.
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
                  <h3 className="text-xs sm:text-sm font-semibold text-gray-600">Time Left</h3>
                  <p className="text-xl sm:text-3xl font-extrabold text-gray-900">{targetYear}Y</p>
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
                  <p className="text-lg sm:text-2xl font-extrabold text-blue-600">{formatCurrency(results.totalCurrentCost)}</p>
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
                  <p className="text-lg sm:text-2xl font-extrabold text-white">{formatCurrency(results.futureCost)}</p>
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
                  <p className="text-lg sm:text-2xl font-extrabold text-[#C9A635]">{formatCurrency(results.requiredMonthlySIP)}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Expense Breakdown */}
          <div className="bg-white rounded-2xl shadow-xl border-2 border-gray-100 overflow-hidden">
            <div className="border-b border-gray-100 p-4 sm:p-6">
              <h3 className="text-base sm:text-xl font-bold text-gray-900">
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
                    />
                    <YAxis 
                      stroke="#666"
                      fontSize={12}
                      tickFormatter={(value) => `₹${(value / 100000).toFixed(0)}L`}
                    />
                    <Tooltip 
                      formatter={(value, name) => [formatCurrency(value), name === 'savings' ? 'Savings' : 'Target']}
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
                <h3 className="text-base sm:text-lg font-bold text-gray-900">Savings Summary</h3>
              </div>
              <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                <div className="flex justify-between items-center p-3 sm:p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border border-blue-200">
                  <span className="text-xs sm:text-sm font-semibold text-gray-700">Current</span>
                  <span className="text-sm sm:text-base font-extrabold text-gray-900">{formatCurrency(currentSavings)}</span>
                </div>
                
                <div className="flex justify-between items-center p-3 sm:p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-xl border border-green-200">
                  <span className="text-xs sm:text-sm font-semibold text-gray-700">Future Value</span>
                  <span className="text-sm sm:text-base font-extrabold text-green-600">{formatCurrency(results.futureValueSavings)}</span>
                </div>
                
                <div className="flex justify-between items-center p-3 sm:p-4 bg-gradient-to-r from-red-50 to-red-100 rounded-xl border border-red-200">
                  <span className="text-xs sm:text-sm font-semibold text-gray-700">Additional</span>
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
                      <span className="font-semibold">Returns:</span>
                      <span className="font-bold text-green-600">{formatCurrency(results.totalReturns)}</span>
                    </p>
                    <p className="flex justify-between">
                      <span className="font-semibold">Cost Rise:</span>
                      <span className="font-bold text-orange-600">{formatCurrency(results.futureCost - results.totalCurrentCost)}</span>
                    </p>
                  </div>
                </div>
                
                {results.requiredMonthlySIP > 0 && (
                  <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-300 rounded-xl p-3 sm:p-4">
                    <h4 className="font-bold text-orange-800 mb-2 flex items-center gap-2 text-sm sm:text-base">
                      <Users className="w-4 h-4" />
                      Action Plan
                    </h4>
                    <p className="text-orange-700 text-xs sm:text-sm leading-relaxed">
                      Save <strong>{formatCurrency(results.requiredMonthlySIP)}</strong> monthly!
                    </p>
                  </div>
                )}
                
                {results.additionalCorpusNeeded <= 0 && (
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300 rounded-xl p-3 sm:p-4">
                    <h4 className="font-bold text-green-800 mb-2 text-sm sm:text-base">Well Prepared!</h4>
                    <p className="text-green-700 text-xs sm:text-sm">
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

export default MarriageCalculator;
