import Footer from '@/components/shop/Footer';
import Header from '@/components/shop/Header';
import React from 'react'

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <Header />
            {children}
            <Footer />
        </>
    );
}