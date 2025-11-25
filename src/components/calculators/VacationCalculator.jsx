import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell } from 'recharts';
import { Plane, TrendingUp, DollarSign, Target, Info, Calendar, MapPin, Hotel } from 'lucide-react';

const VacationCalculator = () => {
  const [destination, setDestination] = useState('international');
  const [travelDate, setTravelDate] = useState(2);
  const [numberOfTravelers, setNumberOfTravelers] = useState(2);
  const [flights, setFlights] = useState(100000);
  const [accommodation, setAccommodation] = useState(80000);
  const [activities, setActivities] = useState(40000);
  const [food, setFood] = useState(30000);
  const [shopping, setShopping] = useState(25000);
  const [otherExpenses, setOtherExpenses] = useState(25000);
  const [currentSavings, setCurrentSavings] = useState(50000);
  const [expectedReturn, setExpectedReturn] = useState(12);
  const [inflationRate, setInflationRate] = useState(5);

  const results = useMemo(() => {
    const totalCurrentCostPerPerson = flights + accommodation + activities + food + shopping + otherExpenses;
    const totalCurrentCost = totalCurrentCostPerPerson * numberOfTravelers;
    
    const futureCostPerPerson = totalCurrentCostPerPerson * Math.pow(1 + inflationRate / 100, travelDate);
    const futureCost = futureCostPerPerson * numberOfTravelers;
    
    const futureFlights = flights * numberOfTravelers * Math.pow(1 + inflationRate / 100, travelDate);
    const futureAccommodation = accommodation * numberOfTravelers * Math.pow(1 + inflationRate / 100, travelDate);
    const futureActivities = activities * numberOfTravelers * Math.pow(1 + inflationRate / 100, travelDate);
    const futureFood = food * numberOfTravelers * Math.pow(1 + inflationRate / 100, travelDate);
    const futureShopping = shopping * numberOfTravelers * Math.pow(1 + inflationRate / 100, travelDate);
    const futureOtherExpenses = otherExpenses * numberOfTravelers * Math.pow(1 + inflationRate / 100, travelDate);
    
    const futureValueSavings = currentSavings * Math.pow(1 + expectedReturn / 100, travelDate);
    const additionalCorpusNeeded = Math.max(0, futureCost - futureValueSavings);
    
    const monthlyReturnRate = expectedReturn / 100 / 12;
    const totalMonths = travelDate * 12;
    const requiredMonthlySIP = totalMonths > 0 && monthlyReturnRate > 0
      ? (additionalCorpusNeeded * monthlyReturnRate) / (Math.pow(1 + monthlyReturnRate, totalMonths) - 1)
      : additionalCorpusNeeded / totalMonths;
    
    const projectionData = [];
    let accumulatedValue = currentSavings;
    
    for (let year = 1; year <= travelDate; year++) {
      const annualSIP = requiredMonthlySIP * 12;
      accumulatedValue = (accumulatedValue + annualSIP) * (1 + expectedReturn / 100);
      const inflatedCost = totalCurrentCost * Math.pow(1 + inflationRate / 100, year);
      
      projectionData.push({
        year: year,
        savings: Math.round(accumulatedValue),
        target: Math.round(inflatedCost)
      });
    }
    
    const expenseBreakdown = [
      { name: 'Flights', value: Math.round(futureFlights), percentage: ((futureFlights / futureCost) * 100).toFixed(1) },
      { name: 'Accommodation', value: Math.round(futureAccommodation), percentage: ((futureAccommodation / futureCost) * 100).toFixed(1) },
      { name: 'Activities', value: Math.round(futureActivities), percentage: ((futureActivities / futureCost) * 100).toFixed(1) },
      { name: 'Food', value: Math.round(futureFood), percentage: ((futureFood / futureCost) * 100).toFixed(1) },
      { name: 'Shopping', value: Math.round(futureShopping), percentage: ((futureShopping / futureCost) * 100).toFixed(1) },
      { name: 'Other', value: Math.round(futureOtherExpenses), percentage: ((futureOtherExpenses / futureCost) * 100).toFixed(1) }
    ];
    
    return {
      totalCurrentCost: Math.round(totalCurrentCost),
      totalCurrentCostPerPerson: Math.round(totalCurrentCostPerPerson),
      futureCost: Math.round(futureCost),
      futureCostPerPerson: Math.round(futureCostPerPerson),
      futureValueSavings: Math.round(futureValueSavings),
      additionalCorpusNeeded: Math.round(additionalCorpusNeeded),
      requiredMonthlySIP: Math.round(requiredMonthlySIP),
      projectionData,
      expenseBreakdown,
      totalInvestment: Math.round(currentSavings + (requiredMonthlySIP * totalMonths)),
      totalReturns: Math.round(futureCost - currentSavings - (requiredMonthlySIP * totalMonths))
    };
  }, [travelDate, numberOfTravelers, flights, accommodation, activities, food, shopping, otherExpenses, currentSavings, expectedReturn, inflationRate]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const COLORS = ['#7A1616', '#C9A635', '#A12424', '#E7C76A', '#8B1A1A', '#D4B547'];

  const destinationPresets = {
    domestic: { flights: 15000, accommodation: 20000, activities: 15000, food: 10000, shopping: 10000, other: 10000 },
    international: { flights: 100000, accommodation: 80000, activities: 40000, food: 30000, shopping: 25000, other: 25000 },
    luxury: { flights: 200000, accommodation: 150000, activities: 80000, food: 50000, shopping: 50000, other: 40000 }
  };

  const handleDestinationChange = (value) => {
    setDestination(value);
    const preset = destinationPresets[value];
    setFlights(preset.flights);
    setAccommodation(preset.accommodation);
    setActivities(preset.activities);
    setFood(preset.food);
    setShopping(preset.shopping);
    setOtherExpenses(preset.other);
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
            <div className="bg-gradient-to-r from-[#7A1616] to-[#A12424] text-white p-4 sm:p-6">
              <h2 className="flex items-center space-x-2 text-lg sm:text-xl font-bold">
                <Plane className="w-5 h-5 sm:w-6 sm:h-6" />
                <span>Vacation Planning</span>
              </h2>
            </div>
            <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
              {/* Destination Type */}
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2 sm:mb-3">
                  Destination Type
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['domestic', 'international', 'luxury'].map((type) => (
                    <button
                      key={type}
                      onClick={() => handleDestinationChange(type)}
                      className={`px-2 sm:px-3 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                        destination === type
                          ? 'bg-gradient-to-r from-[#7A1616] to-[#A12424] text-white'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Time to Travel */}
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                  Time to Travel (Years)
                </label>
                <input
                  type="number"
                  value={travelDate}
                  onChange={(e) => setTravelDate(Number(e.target.value))}
                  className="w-full px-3 sm:px-4 py-2 text-base sm:text-lg font-semibold border-2 border-gray-200 rounded-lg focus:border-[#C9A635] focus:outline-none"
                  min="0.5"
                  max="5"
                  step="0.5"
                />
                <input
                  type="range"
                  value={travelDate}
                  onChange={(e) => setTravelDate(Number(e.target.value))}
                  min="0.5"
                  max="5"
                  step="0.5"
                  className="w-full mt-3"
                />
              </div>

              {/* Number of Travelers */}
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                  Number of Travelers
                </label>
                <input
                  type="number"
                  value={numberOfTravelers}
                  onChange={(e) => setNumberOfTravelers(Number(e.target.value))}
                  className="w-full px-3 sm:px-4 py-2 text-base sm:text-lg font-semibold border-2 border-gray-200 rounded-lg focus:border-[#C9A635] focus:outline-none"
                  min="1"
                  max="10"
                />
                <input
                  type="range"
                  value={numberOfTravelers}
                  onChange={(e) => setNumberOfTravelers(Number(e.target.value))}
                  min="1"
                  max="10"
                  className="w-full mt-3"
                />
              </div>

              <div className="border-t-2 border-gray-200 pt-4">
                <h3 className="font-bold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2 text-sm sm:text-base">
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-[#C9A635]" />
                  Per Person Costs
                </h3>
              </div>

              {/* Collapsed expense inputs for mobile */}
              {[
                { label: 'Flights', value: flights, setter: setFlights, min: 5000, max: 300000, step: 5000 },
                { label: 'Accommodation', value: accommodation, setter: setAccommodation, min: 5000, max: 200000, step: 5000 },
                { label: 'Activities', value: activities, setter: setActivities, min: 5000, max: 100000, step: 2500 },
                { label: 'Food', value: food, setter: setFood, min: 3000, max: 80000, step: 2000 },
                { label: 'Shopping', value: shopping, setter: setShopping, min: 2000, max: 80000, step: 2000 },
                { label: 'Other', value: otherExpenses, setter: setOtherExpenses, min: 2000, max: 60000, step: 2000 }
              ].map((item, idx) => (
                <div key={idx}>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                    {item.label} (₹)
                  </label>
                  <input
                    type="number"
                    value={item.value}
                    onChange={(e) => item.setter(Number(e.target.value))}
                    className="w-full px-3 sm:px-4 py-2 text-base sm:text-lg font-semibold border-2 border-gray-200 rounded-lg focus:border-[#C9A635] focus:outline-none"
                    min={item.min}
                    step={item.step}
                  />
                  <input
                    type="range"
                    value={item.value}
                    onChange={(e) => item.setter(Number(e.target.value))}
                    min={item.min}
                    max={item.max}
                    step={item.step}
                    className="w-full mt-3"
                  />
                </div>
              ))}

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

          {/* Tip - Hidden on mobile */}
          <div className="hidden lg:block bg-gradient-to-br from-[#C9A635]/5 to-[#E7C76A]/10 rounded-2xl shadow-lg border-2 border-[#C9A635]/20 p-6">
            <div className="flex items-start space-x-3">
              <Info className="w-5 h-5 text-[#7A1616] mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-[#7A1616] mb-2">Vacation Tip</h3>
                <p className="text-gray-700 text-sm">
                  Book early for 30-40% savings!
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
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl border-2 border-gray-100 p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center sm:space-x-4">
                <div className="bg-purple-100 w-10 h-10 sm:w-14 sm:h-14 rounded-lg sm:rounded-xl flex items-center justify-center mb-2 sm:mb-0">
                  <Calendar className="w-5 h-5 sm:w-7 sm:h-7 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-semibold text-gray-600">Time</h3>
                  <p className="text-xl sm:text-3xl font-extrabold text-gray-900">{travelDate}Y</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl border-2 border-gray-100 p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center sm:space-x-4">
                <div className="bg-blue-100 w-10 h-10 sm:w-14 sm:h-14 rounded-lg sm:rounded-xl flex items-center justify-center mb-2 sm:mb-0">
                  <Hotel className="w-5 h-5 sm:w-7 sm:h-7 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-semibold text-gray-600">Travelers</h3>
                  <p className="text-xl sm:text-3xl font-extrabold text-blue-600">{numberOfTravelers}</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#7A1616] to-[#A12424] rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 text-white col-span-2">
              <div className="flex items-center space-x-3 sm:space-x-4">
                <div className="bg-white/20 w-10 h-10 sm:w-14 sm:h-14 rounded-lg sm:rounded-xl flex items-center justify-center backdrop-blur-sm">
                  <Target className="w-5 h-5 sm:w-7 sm:h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-semibold text-white/90">Total Cost</h3>
                  <p className="text-xl sm:text-2xl font-extrabold text-white">{formatCurrency(results.futureCost)}</p>
                  <p className="text-xs text-white/70">{formatCurrency(results.futureCostPerPerson)}/person</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl border-2 border-gray-100 p-4 sm:p-6 col-span-2">
              <div className="flex items-center space-x-3 sm:space-x-4">
                <div className="bg-[#C9A635]/20 w-10 h-10 sm:w-14 sm:h-14 rounded-lg sm:rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 sm:w-7 sm:h-7 text-[#C9A635]" />
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-semibold text-gray-600">Monthly SIP</h3>
                  <p className="text-xl sm:text-2xl font-extrabold text-[#C9A635]">{formatCurrency(results.requiredMonthlySIP)}</p>
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

          {/* Chart - Hidden on mobile */}
          <div className="hidden md:block bg-white rounded-2xl shadow-xl border-2 border-gray-100 overflow-hidden">
            <div className="border-b border-gray-100 p-6">
              <h3 className="text-xl font-bold text-gray-900">
                Fund Growth
              </h3>
            </div>
            <div className="p-6">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={results.projectionData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="year" stroke="#666" fontSize={12} />
                    <YAxis stroke="#666" fontSize={12} tickFormatter={(value) => `₹${(value / 100000).toFixed(0)}L`} />
                    <Tooltip formatter={(value) => formatCurrency(value)} />
                    <Area type="monotone" dataKey="savings" stroke="#C9A635" fill="#C9A635" fillOpacity={0.3} />
                    <Line type="monotone" dataKey="target" stroke="#7A1616" strokeWidth={3} strokeDasharray="5 5" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Breakdown Cards */}
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
            <div className="bg-white rounded-2xl shadow-xl border-2 border-gray-100 overflow-hidden">
              <div className="border-b border-gray-100 p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-bold text-gray-900">Savings</h3>
              </div>
              <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                <div className="flex justify-between items-center p-3 sm:p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border border-blue-200">
                  <span className="text-xs sm:text-sm font-semibold text-gray-700">Current</span>
                  <span className="text-sm sm:text-base font-extrabold text-gray-900">{formatCurrency(currentSavings)}</span>
                </div>
                
                <div className="flex justify-between items-center p-3 sm:p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-xl border border-green-200">
                  <span className="text-xs sm:text-sm font-semibold text-gray-700">Future</span>
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
                <h3 className="text-base sm:text-lg font-bold text-gray-900">Trip Insights</h3>
              </div>
              <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                <div className="text-center p-4 sm:p-5 bg-gradient-to-br from-[#7A1616]/10 to-[#C9A635]/10 rounded-xl border-2 border-[#C9A635]/20">
                  <div className="space-y-2 text-xs sm:text-sm">
                    <p className="flex justify-between">
                      <span className="font-semibold">Per Person:</span>
                      <span className="font-bold text-[#7A1616]">{formatCurrency(results.futureCostPerPerson)}</span>
                    </p>
                    <p className="flex justify-between">
                      <span className="font-semibold">Total:</span>
                      <span className="font-bold text-[#C9A635]">{formatCurrency(results.futureCost)}</span>
                    </p>
                  </div>
                </div>
                
                {results.requiredMonthlySIP > 0 && (
                  <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-300 rounded-xl p-3 sm:p-4">
                    <h4 className="font-bold text-orange-800 mb-2 flex items-center gap-2 text-sm sm:text-base">
                      <Plane className="w-4 h-4" />
                      Action Plan
                    </h4>
                    <p className="text-orange-700 text-xs sm:text-sm">
                      Save <strong>{formatCurrency(results.requiredMonthlySIP)}</strong> monthly!
                    </p>
                  </div>
                )}
                
                {results.additionalCorpusNeeded <= 0 && (
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300 rounded-xl p-3 sm:p-4">
                    <h4 className="font-bold text-green-800 mb-2 text-sm sm:text-base">Ready to Travel!</h4>
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

export default VacationCalculator;
