// src/app/(public)/tools/currency-converter/page.tsx

'use client'

import { useState } from 'react';
import InputField from '@/app/components/fields/Input';
import SelectionBox from '@/app/components/fields/Select';
import { Heading } from '@/app/components/heading/Heading';
import { CalculatorSidebar } from '@/app/components/calculator/CalculatorSidebar';
import { ToolDescription } from '../tool-description/ToolDescription';
import { CalcResultSkeleton } from '@/app/components/skeletons';
import { CalcResult, CalcResultGrid } from '@/app/components/calculator/result';
import { useCalculator } from '@/app/hooks/useCalculator';
import { calculatorService } from '@/services/calculator.service';
import type { CurrencyConverterResult } from '@/types/calculator';
import { CalcButtons } from '@/app/components/calculator/CalcButtons';

const CURRENCIES = [
    { label: "Afghan Afghani (AFN)", value: "AFN" },
    { label: "Albanian Lek (ALL)", value: "ALL" },
    { label: "Algerian Dinar (DZD)", value: "DZD" },
    { label: "Angolan Kwanza (AOA)", value: "AOA" },
    { label: "Argentine Peso (ARS)", value: "ARS" },
    { label: "Armenian Dram (AMD)", value: "AMD" },
    { label: "Australian Dollar (AUD)", value: "AUD" },
    { label: "Azerbaijani Manat (AZN)", value: "AZN" },
    { label: "Bahraini Dinar (BHD)", value: "BHD" },
    { label: "Bangladeshi Taka (BDT)", value: "BDT" },
    { label: "Barbadian Dollar (BBD)", value: "BBD" },
    { label: "Belarusian Ruble (BYN)", value: "BYN" },
    { label: "Belize Dollar (BZD)", value: "BZD" },
    { label: "Bermudian Dollar (BMD)", value: "BMD" },
    { label: "Bhutanese Ngultrum (BTN)", value: "BTN" },
    { label: "Bolivian Boliviano (BOB)", value: "BOB" },
    { label: "Bosnia-Herzegovina Mark (BAM)", value: "BAM" },
    { label: "Botswana Pula (BWP)", value: "BWP" },
    { label: "Brazilian Real (BRL)", value: "BRL" },
    { label: "British Pound Sterling (GBP)", value: "GBP" },
    { label: "Brunei Dollar (BND)", value: "BND" },
    { label: "Bulgarian Lev (BGN)", value: "BGN" },
    { label: "Burundian Franc (BIF)", value: "BIF" },
    { label: "Cambodian Riel (KHR)", value: "KHR" },
    { label: "Canadian Dollar (CAD)", value: "CAD" },
    { label: "Cape Verdean Escudo (CVE)", value: "CVE" },
    { label: "Cayman Islands Dollar (KYD)", value: "KYD" },
    { label: "Chilean Peso (CLP)", value: "CLP" },
    { label: "Chinese Yuan (CNY)", value: "CNY" },
    { label: "Colombian Peso (COP)", value: "COP" },
    { label: "Comorian Franc (KMF)", value: "KMF" },
    { label: "Congolese Franc (CDF)", value: "CDF" },
    { label: "Costa Rican Colón (CRC)", value: "CRC" },
    { label: "Croatian Kuna (HRK)", value: "HRK" },
    { label: "Czech Republic Koruna (CZK)", value: "CZK" },
    { label: "Danish Krone (DKK)", value: "DKK" },
    { label: "Djiboutian Franc (DJF)", value: "DJF" },
    { label: "Dominican Peso (DOP)", value: "DOP" },
    { label: "East Caribbean Dollar (XCD)", value: "XCD" },
    { label: "Egyptian Pound (EGP)", value: "EGP" },
    { label: "Ethiopian Birr (ETB)", value: "ETB" },
    { label: "Euro (EUR)", value: "EUR" },
    { label: "Fijian Dollar (FJD)", value: "FJD" },
    { label: "Gambian Dalasi (GMD)", value: "GMD" },
    { label: "Georgian Lari (GEL)", value: "GEL" },
    { label: "Ghanaian Cedi (GHS)", value: "GHS" },
    { label: "Guatemalan Quetzal (GTQ)", value: "GTQ" },
    { label: "Guinean Franc (GNF)", value: "GNF" },
    { label: "Guyanaese Dollar (GYD)", value: "GYD" },
    { label: "Haitian Gourde (HTG)", value: "HTG" },
    { label: "Honduran Lempira (HNL)", value: "HNL" },
    { label: "Hong Kong Dollar (HKD)", value: "HKD" },
    { label: "Hungarian Forint (HUF)", value: "HUF" },
    { label: "Icelandic Króna (ISK)", value: "ISK" },
    { label: "Indian Rupee (INR)", value: "INR" },
    { label: "Indonesian Rupiah (IDR)", value: "IDR" },
    { label: "Iranian Rial (IRR)", value: "IRR" },
    { label: "Iraqi Dinar (IQD)", value: "IQD" },
    { label: "Israeli New Sheqel (ILS)", value: "ILS" },
    { label: "Jamaican Dollar (JMD)", value: "JMD" },
    { label: "Japanese Yen (JPY)", value: "JPY" },
    { label: "Jordanian Dinar (JOD)", value: "JOD" },
    { label: "Kazakhstani Tenge (KZT)", value: "KZT" },
    { label: "Kenyan Shilling (KES)", value: "KES" },
    { label: "Kuwaiti Dinar (KWD)", value: "KWD" },
    { label: "Kyrgystani Som (KGS)", value: "KGS" },
    { label: "Laotian Kip (LAK)", value: "LAK" },
    { label: "Lebanese Pound (LBP)", value: "LBP" },
    { label: "Lesotho Loti (LSL)", value: "LSL" },
    { label: "Liberian Dollar (LRD)", value: "LRD" },
    { label: "Libyan Dinar (LYD)", value: "LYD" },
    { label: "Macanese Pataca (MOP)", value: "MOP" },
    { label: "Macedonian Denar (MKD)", value: "MKD" },
    { label: "Malagasy Ariary (MGA)", value: "MGA" },
    { label: "Malawian Kwacha (MWK)", value: "MWK" },
    { label: "Malaysian Ringgit (MYR)", value: "MYR" },
    { label: "Maldivian Rufiyaa (MVR)", value: "MVR" },
    { label: "Mauritanian Ouguiya (MRU)", value: "MRU" },
    { label: "Mauritian Rupee (MUR)", value: "MUR" },
    { label: "Mexican Peso (MXN)", value: "MXN" },
    { label: "Moldovan Leu (MDL)", value: "MDL" },
    { label: "Mongolian Tugrik (MNT)", value: "MNT" },
    { label: "Moroccan Dirham (MAD)", value: "MAD" },
    { label: "Mozambican Metical (MZN)", value: "MZN" },
    { label: "Myanmar Kyat (MMK)", value: "MMK" },
    { label: "Namibian Dollar (NAD)", value: "NAD" },
    { label: "Nepalese Rupee (NPR)", value: "NPR" },
    { label: "New Taiwan Dollar (TWD)", value: "TWD" },
    { label: "New Zealand Dollar (NZD)", value: "NZD" },
    { label: "Nicaraguan Córdoba (NIO)", value: "NIO" },
    { label: "Nigerian Naira (NGN)", value: "NGN" },
    { label: "Norwegian Krone (NOK)", value: "NOK" },
    { label: "Omani Rial (OMR)", value: "OMR" },
    { label: "Pakistani Rupee (PKR)", value: "PKR" },
    { label: "Panamanian Balboa (PAB)", value: "PAB" },
    { label: "Papua New Guinean Kina (PGK)", value: "PGK" },
    { label: "Paraguayan Guarani (PYG)", value: "PYG" },
    { label: "Peruvian Nuevo Sol (PEN)", value: "PEN" },
    { label: "Philippine Peso (PHP)", value: "PHP" },
    { label: "Polish Zloty (PLN)", value: "PLN" },
    { label: "Qatari Rial (QAR)", value: "QAR" },
    { label: "Romanian Leu (RON)", value: "RON" },
    { label: "Russian Ruble (RUB)", value: "RUB" },
    { label: "Rwandan Franc (RWF)", value: "RWF" },
    { label: "Saudi Riyal (SAR)", value: "SAR" },
    { label: "Serbian Dinar (RSD)", value: "RSD" },
    { label: "Seychellois Rupee (SCR)", value: "SCR" },
    { label: "Singapore Dollar (SGD)", value: "SGD" },
    { label: "South African Rand (ZAR)", value: "ZAR" },
    { label: "South Korean Won (KRW)", value: "KRW" },
    { label: "South Sudanese Pound (SSP)", value: "SSP" },
    { label: "Sri Lankan Rupee (LKR)", value: "LKR" },
    { label: "Sudanese Pound (SDG)", value: "SDG" },
    { label: "Surinamese Dollar (SRD)", value: "SRD" },
    { label: "Swedish Krona (SEK)", value: "SEK" },
    { label: "Swiss Franc (CHF)", value: "CHF" },
    { label: "Syrian Pound (SYP)", value: "SYP" },
    { label: "Tajikistani Somoni (TJS)", value: "TJS" },
    { label: "Tanzanian Shilling (TZS)", value: "TZS" },
    { label: "Thai Baht (THB)", value: "THB" },
    { label: "Tongan Paʻanga (TOP)", value: "TOP" },
    { label: "Trinidad and Tobago Dollar (TTD)", value: "TTD" },
    { label: "Tunisian Dinar (TND)", value: "TND" },
    { label: "Turkish Lira (TRY)", value: "TRY" },
    { label: "Turkmenistani Manat (TMT)", value: "TMT" },
    { label: "Ugandan Shilling (UGX)", value: "UGX" },
    { label: "Ukrainian Hryvnia (UAH)", value: "UAH" },
    { label: "UAE Dirham (AED)", value: "AED" },
    { label: "Uruguayan Peso (UYU)", value: "UYU" },
    { label: "US Dollar (USD)", value: "USD" },
    { label: "Uzbekistan Som (UZS)", value: "UZS" },
    { label: "Vanuatu Vatu (VUV)", value: "VUV" },
    { label: "Vietnamese Dong (VND)", value: "VND" },
    { label: "Yemeni Rial (YER)", value: "YER" },
    { label: "Zambian Kwacha (ZMW)", value: "ZMW" },
    { label: "Zimbabwean Dollar (ZWL)", value: "ZWL" },
];

interface CurrencyForm {
    amount: string;
    fromCurrency: string;
    toCurrency: string;
}

const INITIAL_FORM: CurrencyForm = {
    amount: '',
    fromCurrency: 'USD',
    toCurrency: 'EUR',
};

export default function CurrencyConverterCalculator() {
    const [form, setForm] = useState<CurrencyForm>(INITIAL_FORM);
    const { result, loading, calculate, reset } = useCalculator<CurrencyConverterResult>();

    const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        setForm((prev) => ({ ...prev, [id]: value }));
    };

    const isFormValid = form.amount !== '' && form.fromCurrency !== form.toCurrency;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await calculate(async () => {
            const { data } = await calculatorService.currencyConverter({
                amount: parseFloat(form.amount),
                fromCurrency: form.fromCurrency,
                toCurrency: form.toCurrency,
            });
            return data.data!;
        });
    };

    const handleReset = () => reset(() => setForm(INITIAL_FORM));

    // Find currency label from value for display
    const getCurrencyLabel = (value: string) =>
        CURRENCIES.find((c) => c.value === value)?.label ?? value;

    return (
        <section className="top-news-post-area pt-70 pb-70">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-xl-9">
                        <div className="sidebar-wrap">
                            <Heading textHeading="Currency Converter" showBtn={false} />

                            <div className="contact-form pb-3">
                                <form onSubmit={handleSubmit}>
                                    <div className="row">
                                        <div className="col-md-4">
                                            <InputField
                                                isFontAwsome fontAwsomeIcon="dollar-sign"
                                                label="Amount" placeholder="e.g. 1000"
                                                required id="amount" type="number" step="0.01" min="0"
                                                value={form.amount} onChange={onChange} isVisible={false}
                                            />
                                        </div>
                                        <div className="col-md-4">
                                            <SelectionBox
                                                label="From Currency"
                                                required id="fromCurrency"
                                                value={form.fromCurrency}
                                                onChange={onChange}
                                                options={CURRENCIES}
                                            />
                                        </div>
                                        <div className="col-md-4">
                                            <SelectionBox
                                                label="To Currency"
                                                required id="toCurrency"
                                                value={form.toCurrency}
                                                onChange={onChange}
                                                options={CURRENCIES}
                                            />
                                        </div>
                                    </div>

                                    {/* Same currency warning */}
                                    {form.fromCurrency === form.toCurrency && form.fromCurrency !== '' && (
                                        <p style={{ color: 'var(--tg-red)', fontSize: '13px', marginBottom: '12px' }}>
                                            From and To currencies must be different.
                                        </p>
                                    )}
                                    <CalcButtons
                                        submitText="Convert"
                                        loading={loading}
                                        disabled={!isFormValid}
                                        onReset={handleReset}
                                    />
                                </form>

                                <div className="pt-4">
                                    {loading && (
                                        <CalcResultSkeleton
                                            gridCols={3}
                                            gridRows={1}
                                            inputCols={3}
                                        />
                                    )}

                                    {result && !loading && (
                                        <CalcResult message={result.message}>
                                            {/* Primary — converted amount with currency code */}
                                            <div
                                                className="d-flex justify-content-between align-items-center p-3 mb-4"
                                                style={{
                                                    border: '1px solid var(--tg-primary-color)',
                                                    borderRadius: '6px',
                                                    background: 'rgba(41, 191, 240, 0.06)',
                                                }}
                                            >
                                                <span style={{ fontWeight: 600 }}>
                                                    {result.breakdown.originalAmount.toLocaleString()} {result.breakdown.fromCurrency}
                                                    <span style={{ opacity: 0.5, margin: '0 8px' }}>→</span>
                                                    {result.breakdown.toCurrency}
                                                </span>
                                                <span style={{
                                                    fontSize: '1.5rem',
                                                    fontWeight: 700,
                                                    color: 'var(--tg-primary-color)',
                                                }}>
                                                    {result.convertedAmount.toLocaleString()}
                                                </span>
                                            </div>

                                            <CalcResultGrid
                                                cols={3}
                                                items={[
                                                    {
                                                        label: 'Original Amount',
                                                        value: `${result.breakdown.originalAmount.toLocaleString()} ${result.breakdown.fromCurrency}`,
                                                    },
                                                    {
                                                        label: 'Exchange Rate',
                                                        value: `${result.exchangeRate}`,
                                                    },
                                                    {
                                                        label: 'Converted Amount',
                                                        value: `${result.convertedAmount.toLocaleString()} ${result.breakdown.toCurrency}`,
                                                        highlight: true,
                                                    },
                                                ]}
                                            />

                                            {/* Inputs */}
                                            <details className="mt-2">
                                                <summary style={{ fontSize: '0.8rem', opacity: 0.6, cursor: 'pointer', userSelect: 'none' }}>
                                                    View inputs used
                                                </summary>
                                                <div className="row g-2 mt-2">
                                                    {[
                                                        { label: 'Amount', value: `${result.inputs.amount}` },
                                                        { label: 'From', value: getCurrencyLabel(result.inputs.fromCurrency) },
                                                        { label: 'To', value: getCurrencyLabel(result.inputs.toCurrency) },
                                                    ].map((item) => (
                                                        <div key={item.label} className="col-6 col-md-4">
                                                            <div className="contact-info-item flex-column gap-1">
                                                                <span style={{ fontSize: '0.75rem', opacity: 0.6 }}>{item.label}</span>
                                                                <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>{item.value}</span>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </details>
                                        </CalcResult>
                                    )}
                                </div>
                            </div>

                            <ToolDescription
                                title="Summary"
                                details="Converts any amount between world currencies using live exchange rates fetched from Alpha Vantage." />
                            <ToolDescription
                                title="Example"
                                details="$1,000 USD converted at a rate of 0.85 equals €850 EUR." />
                            <ToolDescription
                                title="Explanation of Results"
                                details="Original Amount is what you entered in the source currency. Exchange Rate is the current market rate between the two currencies at time of conversion. Converted Amount is the equivalent value in the destination currency." />
                        </div>
                    </div>
                    <CalculatorSidebar />
                </div>
            </div>
        </section>
    );
}