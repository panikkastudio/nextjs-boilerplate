import Script from "next/script";
import { Navigation } from "./navigation";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <div className="px-2 pt-24 pb-12">
            <Navigation />
            {children}
            <Script
                dangerouslySetInnerHTML={{
                    __html: `\
                    window.$crisp=[["do", "chat:hide"], ["on", "chat:closed", function() { $crisp.push(["do", "chat:hide"]) }]];
                    window.CRISP_WEBSITE_ID="5721a862-cee5-41d1-8ee6-e3c6b5e23610";
                    (function(){
                        d=document;
                        s=d.createElement("script");
                        s.src="https://client.crisp.chat/l.js";
                        s.async=1;d.getElementsByTagName("head")[0].appendChild(s);
                    })()`,
                }}
            />
        </div>
    );
}
