import Link from "next/link";
import { BotIcon, CheckCircleIcon, CoinsIcon, SquareMousePointerIcon, TvIcon, XCircleIcon } from "lucide-react";
import { Text, Button, Container, Flex, Heading, Grid, Box, Strong, Card } from "@radix-ui/themes";

import { ProjectPackagesEnum } from "@/base/constants";
import { Footer } from "@/components/layouts/flatpages-footer";
import { Navigation } from "@/components/layouts/flatpages-nagivation";
import { PricingCard } from "@/components/pricing-card";
import { Logo } from "@/components/logo";

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center p-4 pt-20 gap-4 relative">
            <Navigation />
            <Hero />
            <Steps />
            <Questions />

            <Footer />
        </main>
    );
}

function Hero() {
    return (
        <Container flexGrow="0" className="w-full" align="center">
            <Flex direction="column" align="center" gap="4" py="9">
                <Heading align="center" size="8" className="text-[42px]">
                    Earn money with Magicshorts. <Text className="text-[--orange-10]">Forever.</Text>
                </Heading>

                <Text size="4" align="center" color="gray" weight="medium">
                    Refer people to Magicshorts and earn 20% of monthly recurring revenue forever.
                    <br className="hidden sm:block" /> There's no limits to how much you can earn.
                </Text>

                <Button size="3" mt="5" className="font-bold" asChild>
                    <a href="https://affiliates.reflio.com/invite/magicshorts" target="_blank" className="hover:underline">
                        Become an affiliate
                    </a>
                </Button>
            </Flex>
        </Container>
    );
}

function Steps() {
    return (
        <Container className="w-full">
            <Grid mt="6" columns={{ initial: "1", md: "3" }} gap="6" className="whitespace-nowrap w-full">
                <Card variant="classic">
                    <Flex gap="2" direction="column" p="4">
                        <SquareMousePointerIcon className="w-7 h-7" />
                        <Heading size="5">Join the program</Heading>
                        <Text color="gray" className="block  whitespace-normal">
                            Create your affiliate account on our platform
                        </Text>
                    </Flex>
                </Card>

                <Card variant="classic">
                    <Flex gap="2" direction="column" p="4">
                        <TvIcon className="w-7 h-7" />
                        <Heading size="5">Share your link</Heading>
                        <Text color="gray" className="block  whitespace-normal">
                            Share your affiliate link with your friends, followers or customers
                        </Text>
                    </Flex>
                </Card>

                <Card variant="classic">
                    <Flex gap="2" direction="column" p="4">
                        <CoinsIcon className="w-7 h-7 text-[--orange-10]" />
                        <Heading size="5">Get paid forever</Heading>
                        <Text color="gray" className="block whitespace-normal">
                            You'll earn 20% recurring commission, forever
                        </Text>
                    </Flex>
                </Card>
            </Grid>
        </Container>
    );
}

function Questions() {
    return (
        <Container className="w-full" py="9">
            <Flex direction="column" align="center">
                <Text size="5" weight="bold" className="text-[var(--orange-10)]" mt="8" mb="8">
                    Frequently asked questions
                </Text>
            </Flex>

            <Grid columns={{ initial: "1", md: "2" }} gap="6">
                <Box className="space-y-6">
                    <Question
                        question="How often are payouts made?"
                        answer="You'll receive your payment automatically on the 7th of each month, exclusively through PayPal.
                        You need to earn a minimum of 50 USD in commissions to get paid, and the payment process may take a few days, so please allow 3-5 days for the funds to appear in your account."
                    />
                    <Question
                        question="Other questions?"
                        answer="Feel free to reach us out by email at osman@panikka.studio (we usually respond within 24 hours)."
                    />
                </Box>

                <Box className="space-y-6">
                    <Question
                        question="How to track referred sign up?"
                        answer="You can check your referrals by logging into your affiliate account. If you've correctly used your unique referral URL, the information on your dashboard will be accurate."
                    />
                    <Question
                        question="Can I advertise using my affiliate link?"
                        answer="Paid ads are not allowed. If you use paid advertising, your commissions will not be paid. We conduct regular checks and may ask you to provide proof of the methods you used to generate sales if there is any doubt."
                    />
                </Box>
            </Grid>
        </Container>
    );
}

function Question(props: { question: string; answer: string }) {
    return (
        <Box>
            <Heading mb="1">{props.question}</Heading>
            <Text>{props.answer}</Text>
        </Box>
    );
}
