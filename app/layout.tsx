import type {Metadata} from "next";
import {ReactNode} from "react";
import {Comfortaa, Poppins} from "next/font/google";

const comfortaa = Comfortaa({
    subsets: ['latin'],
    variable: '--font-comfortaa',
    weight: ['500', '600', '700'],
});

const poppins = Poppins({
    subsets: ['latin'],
    variable: '--font-poppins',
    weight: ['500', '600', '700'],
});

export const metadata: Metadata = {
    title: "StarRide | Главная",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode; }>) {
    return (
        <html lang="en">
        <body className={`${poppins.variable} ${comfortaa.variable}`}>
        {children}
        </body>
        </html>
    );
}
