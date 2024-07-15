import Script from "next/script";

export function GoogleAnalytics() {
    return (
        <>
            <Script async src="https://www.googletagmanager.com/gtag/js?id=G-EJ79QQ3WEG" />
            <Script
                id="gtag-init"
                dangerouslySetInnerHTML={{
                    __html: `\
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){ dataLayer.push(arguments); }

                        gtag('js', new Date());
                        gtag('config', 'G-EJ79QQ3WEG');
                   `,
                }}
            />
        </>
    );
}
