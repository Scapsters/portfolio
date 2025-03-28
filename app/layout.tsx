import type { Metadata } from 'next'
import './globals.css'
import { lexendExa } from './typescript/css_constants'

export const metadata: Metadata = {
    title: 'Happy Portfolio',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <body className={'overflow-hidden fixed l-0 w-1/1 h-1/1 antialiased'} style={lexendExa.style}>
                {children}
            </body>
        </html>
    )
}
