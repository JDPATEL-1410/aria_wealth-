import React from "react";
import { Info, ShieldCheck } from "lucide-react";

const COMMISSION_ROWS = [
  { scheme: "Arbitrage Funds", firstYear: "0.05% to 0.60%", onwards: "0.05% to 0.60%" },
  { scheme: "ELSS Funds", firstYear: "0.50% to 1.25%", onwards: "0.50% to 1.25%" },
  { scheme: "Equity Oriented Funds", firstYear: "0.50% to 1.25%", onwards: "0.50% to 1.25%" },
  { scheme: "Aggressive Hybrid Equity Funds", firstYear: "0.50% to 1.25%", onwards: "0.50% to 1.25%" },
  { scheme: "Fixed Maturity Plans", firstYear: "0.05% to 0.50%", onwards: "0.05% to 0.50%" },
  { scheme: "Fund of Funds", firstYear: "0.25% to 1%", onwards: "0.25% to 1%" },
  { scheme: "Gilt Funds", firstYear: "0.25% to 1%", onwards: "0.05% to 0.65%" },
  { scheme: "Hybrid Debt Funds", firstYear: "0.05% to 0.75%", onwards: "0.05% to 0.75%" },
  { scheme: "Income Funds", firstYear: "0.05% to 1%", onwards: "0.05% to 1%" },
  { scheme: "Index Funds", firstYear: "0.01% to 0.75%", onwards: "0.01% to 0.75%" },
  { scheme: "Liquid / Ultra Short-Term Funds", firstYear: "0.05% to 0.50%", onwards: "0.05% to 0.50%" },
  { scheme: "Short-Term Income Funds", firstYear: "0.05% to 0.65%", onwards: "0.05% to 0.65%" },
  { scheme: "Thematic / Sector Funds", firstYear: "0.50% to 1.25%", onwards: "0.50% to 1.25%" },
];

const CommissionDisclosure = () => {
  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-white via-gray-50 to-[#C9A635]/10">
      {/* Hero / Heading */}
      <section className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-16">
          {/* Decorative blobs */}
          <div className="pointer-events-none absolute -top-10 -left-10 w-40 h-40 bg-[#7A1616]/10 blur-3xl rounded-full" />
          <div className="pointer-events-none absolute top-0 right-0 w-56 h-56 bg-[#C9A635]/20 blur-3xl rounded-full" />

          <div className="relative z-10">
            <div className="inline-flex items-center space-x-2 rounded-full bg-white/90 border border-gray-200 px-4 py-2 shadow-sm mb-5">
              <ShieldCheck className="w-4 h-4 text-[#7A1616]" />
              <span className="text-xs sm:text-sm font-semibold text-gray-700">
                Transparency & Regulatory Disclosures
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-3">
              Commission{" "}
              <span className="bg-gradient-to-r from-[#7A1616] via-[#A12424] to-[#8B1A1A] bg-clip-text text-transparent">
                Disclosure
              </span>
            </h1>

            <p className="text-sm sm:text-base md:text-lg text-gray-700 max-w-3xl">
              Under SEBI Circular{" "}
              <span className="font-semibold text-[#7A1616]">
                SEBI/IMD/CIR No.4 /168230/09
              </span>
              , we disclose the range of trail commissions that may be received
              from various Asset Management Companies (AMCs) for different
              categories of mutual fund schemes.
            </p>
          </div>
        </div>
      </section>

      {/* Table Section */}
      <section className="pb-10 sm:pb-14 lg:pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="border-b border-gray-100 px-4 sm:px-6 py-4 flex items-center gap-3 bg-gradient-to-r from-[#F9F3E3] to-[#FFFDF6]">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#7A1616] to-[#A12424] shadow-lg">
                <Info className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-base sm:text-lg md:text-xl font-bold text-gray-900">
                  Indicative Trail Commission Range (p.a.)
                </h2>
                <p className="text-xs sm:text-sm text-gray-600">
                  Actual commission may vary across AMCs, schemes, ticket sizes,
                  and investor category.
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 text-sm">
                <thead className="bg-gradient-to-r from-[#7A1616] via-[#8B1A1A] to-[#A12424]">
                  <tr>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold tracking-wider text-white uppercase">
                      Scheme Type
                    </th>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold tracking-wider text-white uppercase">
                      Trail – 1st Year
                    </th>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold tracking-wider text-white uppercase">
                      Trail – 2nd Year Onwards
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {COMMISSION_ROWS.map((row) => (
                    <tr key={row.scheme} className="hover:bg-[#FFF9EC] transition-colors">
                      <td className="px-4 sm:px-6 py-3 text-gray-900 font-medium">
                        {row.scheme}
                      </td>
                      <td className="px-4 sm:px-6 py-3 text-gray-800">
                        {row.firstYear}
                      </td>
                      <td className="px-4 sm:px-6 py-3 text-gray-800">
                        {row.onwards}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Note under table */}
            <div className="px-4 sm:px-6 py-4 bg-[#FFF9EC] border-t border-[#F2E3B5] text-xs sm:text-sm text-gray-700">
              *The above ranges are indicative and on a best-effort basis. Actual
              commission structures are as communicated by respective AMCs and
              are subject to change without prior notice.
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimers Section */}
      <section className="pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid gap-6 lg:grid-cols-2">
          {/* Left card */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8 space-y-4">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
              Risk & Product Disclaimer
            </h3>
            <p className="text-sm sm:text-base text-gray-700">
              Investments in mutual funds are subject to market risk. Customers
              should read the scheme-related documents / key information
              documents of the mutual fund products carefully before investing.
              This disclosure is on a best-effort basis and commission rates are
              updated as and when actual details are received from AMCs.
            </p>
            <p className="text-sm sm:text-base text-gray-700">
              This information is for reference only and does not represent any
              financial advice. Prices and NAVs of mutual fund schemes are
              subject to market fluctuations. Past performance does not indicate
              or guarantee future results.
            </p>
          </div>

          {/* Right card */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8 space-y-4">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
              Advisory & Liability Disclaimer
            </h3>
            <p className="text-sm sm:text-base text-gray-700">
              This disclosure is an integral part of proposals we prepare for
              clients and is provided purely on a non-binding, informational
              basis. Clients are free to accept or reject proposals and are
              encouraged to seek independent legal, investment, and taxation
              advice before making decisions.
            </p>
            <p className="text-sm sm:text-base text-gray-700">
              We shall not be held responsible for any direct or indirect loss
              arising from reliance on this information. Our recommendations, if
              any, are made on a best-effort and good faith basis, keeping the
              client’s interest and risk profile in mind.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CommissionDisclosure;
