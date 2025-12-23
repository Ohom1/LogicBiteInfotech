import './globals.css'
import { Poppins } from 'next/font/google'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Chatbot from '@/components/Chatbot'
import { ThemeProvider } from '@/context/ThemeContext'

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['300', '400', '500', '600', '700', '800'],
    display: 'swap',
})

export const metadata = {
    title: 'LogicBite Infotech | World-Class IT Consulting',
    description: 'Premium IT consulting services, billing, and hiring solutions.',
}

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={poppins.className}>
                <ThemeProvider>
                    <Navbar />
                    {children}
                    <Footer />
                    <Chatbot />
                </ThemeProvider>
            </body>
        </html>
    )
}
