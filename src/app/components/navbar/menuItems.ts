export interface SubSubMenuItem {
    navbarName: string;
    navLink: string;
}

export interface SubMenuItem {
    navbarName: string;
    navLink: string;
    subMenu?: SubSubMenuItem[];
}

export interface MenuItem {
    navbarName: string;
    navLink: string;
    subMenu: SubMenuItem[];
}

export const menuItems: MenuItem[] = [
    {
        navbarName: 'Home',
        navLink: '/',
        subMenu: [],
    },
    {
        navbarName: 'Markets',
        navLink: '/markets',
        subMenu: [
            { navbarName: 'Stocks',        navLink: '/markets/stocks' },
            { navbarName: 'Cryptocurrency', navLink: '/markets/cryptocurrency' },
            { navbarName: 'Forex',         navLink: '/markets/forex' },
            { navbarName: 'ETFs',          navLink: '/markets/etfs' },
            { navbarName: 'Mutual Funds',  navLink: '/markets/mutual-funds' },
        ],
    },
    {
        navbarName: 'Tool Section',
        navLink: '/tools',
        subMenu: [
            {
                navbarName: 'Free Tools',
                navLink: '/tools',
                subMenu: [
                    { navbarName: 'Loan Amortization Calculator',   navLink: '/tools/loan-amortization' },
                    { navbarName: 'Mortgage Calculator',            navLink: '/tools/mortgage-calculator' },
                    { navbarName: 'Retirement Calculator',          navLink: '/tools/retirement-calculator' },
                    { navbarName: 'Investment Return Calculator',   navLink: '/tools/investment-return-calculator' },
                    { navbarName: 'Compound Interest Calculator',   navLink: '/tools/compound-interest-calculator' },
                    { navbarName: 'More In Calculators',            navLink: '/tools' },
                ],
            },
            {
                navbarName: 'Premium Tools',
                navLink: '/premium-tools',
            },
        ],
    },
    {
        navbarName: 'News Page',
        navLink: '/news',
        subMenu: [],
    },
    {
        navbarName: 'Subscriptions',
        navLink: '/pricing',
        subMenu: [],
    },
];