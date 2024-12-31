import type {Metadata} from "next";
import {ReactNode} from "react";
import "@/shared/styles/main.css"
import {Manrope, Montserrat} from 'next/font/google';

const manrope = Manrope({
    subsets: ['cyrillic'],
    variable: '--font-manrope',
    weight: ['500', '600', '700'],
});

const montserrat = Montserrat({
    subsets: ['cyrillic'],
    variable: '--font-montserrat',
    weight: ['700'],
});

export const metadata: Metadata = {
    title: "StarRide | Главная",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode; }>) {
    return (
        <html lang="en">
        <body className={`${manrope.variable} ${montserrat.variable}`}>
        {children}
        </body>
        </html>
    );
}
