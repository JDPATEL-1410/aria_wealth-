import React from 'react';
import { IndianRupee, DollarSign, Euro } from 'lucide-react';

const currencies = [
    { code: 'INR', symbol: '₹', name: 'Indian Rupee', icon: IndianRupee },
    { code: 'USD', symbol: '$', name: 'US Dollar', icon: DollarSign },
    { code: 'EUR', symbol: '€', name: 'Euro', icon: Euro },
];

const CurrencySelector = ({ selectedCurrency, onCurrencyChange }) => {
    return (
        <div className="bg-white rounded-xl border-2 border-gray-200 p-4">
            <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-3">
                Select Currency
            </label>
            <div className="grid grid-cols-3 gap-2">
                {currencies.map((currency) => {
                    const Icon = currency.icon;
                    const isSelected = selectedCurrency === currency.code;
                    return (
                        <button
                            key={currency.code}
                            onClick={() => onCurrencyChange(currency.code)}
                            className={`flex flex-col items-center justify-center p-3 rounded-lg border-2 transition-all duration-200 ${isSelected
                                    ? 'border-[#7A1616] bg-[#7A1616]/5 text-[#7A1616]'
                                    : 'border-gray-200 hover:border-[#C9A635] hover:bg-[#C9A635]/5 text-gray-600'
                                }`}
                        >
                            <Icon className={`w-5 h-5 sm:w-6 sm:h-6 mb-1 ${isSelected ? 'text-[#7A1616]' : 'text-gray-500'}`} />
                            <span className="text-xs font-bold">{currency.code}</span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default CurrencySelector;

export const formatCurrency = (amount, currencyCode = 'INR') => {
    const currencyMap = {
        INR: { locale: 'en-IN', currency: 'INR' },
        USD: { locale: 'en-US', currency: 'USD' },
        EUR: { locale: 'de-DE', currency: 'EUR' },
    };

    const config = currencyMap[currencyCode] || currencyMap.INR;

    return new Intl.NumberFormat(config.locale, {
        style: 'currency',
        currency: config.currency,
        maximumFractionDigits: 0,
    }).format(amount);
};

export const getCurrencySymbol = (currencyCode = 'INR') => {
    const currency = currencies.find(c => c.code === currencyCode);
    return currency ? currency.symbol : '₹';
};
