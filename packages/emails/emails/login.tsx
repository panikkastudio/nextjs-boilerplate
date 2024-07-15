import { Body, Button, Container, Head, Heading, Hr, Html, Img, Preview, Section, Tailwind, Text } from "@react-email/components";

interface LoginEmailProps {
    loginLink: string;
}

const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "";

export const LoginEmail = ({ loginLink = "#" }: LoginEmailProps) => {
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
                            Your login link for Magicshorts
                        </Text>

                        <Section className="mt-[36px] mb-[28px]">
                            <Button className="bg-[#E96318] rounded-full text-white text-[12px] font-semibold no-underline text-center px-4 py-3" href={loginLink}>
                                Login to Magicshorts
                            </Button>
                        </Section>

                        <Text className="text-[#3c4149] text-[15px] leading-[24px]">
                            This link and code will only be valid for the next 5 minutes.
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

export default LoginEmail;
