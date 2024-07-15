import { Resend } from "resend";
const resend = new Resend(process.env.RESEND_KEY);

import LoginEmail from "../emails/login";
import VideoReadyEmail from "../emails/video-ready";

export async function getDomainsList() {
    const domains = await resend.domains.list();
    return domains.data?.data.map((domain) => domain.name);
}

export async function sendLoginEmail(from: string, to: string, link: string) {
    const result = await resend.emails.send({
        react: <LoginEmail loginLink={link} />,
        subject: "Your Magiclink",
        from,
        to,
    });
}

export async function sendVideoReadyEmail(from: string, to: string, link: string) {
    const result = await resend.emails.send({
        react: <VideoReadyEmail downloadLink={link} />,
        subject: "Your Video is Ready",
        from,
        to,
    });
}
