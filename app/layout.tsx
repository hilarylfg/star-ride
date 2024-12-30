import type {Metadata} from "next";
import {ReactNode} from "react";
import "@/shared/styles/main.css"

export const metadata: Metadata = {
    title: "StarRide | Главная",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode; }>) {
    return (
        <html lang="en">
        <body>
        {children}
        </body>
        </html>
    );
}
