import { Body, Button, Container, Head, Hr, Html, Img, Preview, Section, Tailwind, Text } from "@react-email/components";

interface VideoReadyEmailProps {
    downloadLink: string;
}

const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "";

export const VideoReadyEmail = ({ downloadLink = "#" }: VideoReadyEmailProps) => {
    const previewText = "Login using your magiclink";

    // prettier-ignore
    return (
        <Html>
            <Head />
            <Preview>{previewText}</Preview>
            <Tailwind>
                <Body className="bg-white my-auto mx-auto font-sans">
                    <Container className="rounded my-0 mx-auto p-[20px] w-[560px]">
                        <Img src={`${baseUrl}/static/logo.png`} width="42" height="42" alt="Magicshorts" />

                        <Text className="text-[#484848] text-[24px] font-normal my-[30px] mx-0">
                            Your video is ready
                        </Text>

                        <Section className="mt-[36px] mb-[28px]">
                            <Button className="bg-[#E96318] rounded-full text-white text-[12px] font-semibold no-underline text-center px-4 py-3" href={downloadLink}>
                                Click to Download
                            </Button>
                        </Section>

                        <Text className="text-[#3c4149] text-[15px] leading-[24px]">
                            Downloads will be available for the next 30 days.
                        </Text>

                        <Hr className="my-[26px] mx-0 w-full" />

                        <Text className="text-[#ababab] text-[12px] leading-[24px]">
                            Magicshorts
                        </Text>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
};

export default VideoReadyEmail;
