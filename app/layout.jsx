import "./globals.css";

export const metadata = {
    title: "Shamsi Saim Weddings | Sufi-Inspired Traditional Wedding Photography",
    description: "Timeless wedding photography and cinematography with a Sufi soul. Warm vintage tones, heritage focus, and emotion-first storytelling for traditional weddings in Pakistan and destination weddings worldwide.",
    keywords: "wedding photography, wedding cinematography, traditional weddings, sufi weddings, vintage wedding photography, Pakistan weddings, destination weddings, desi weddings",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
