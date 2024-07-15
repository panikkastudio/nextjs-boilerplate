import Link from "next/link";
import { BotIcon, CheckCircleIcon, SquareMousePointerIcon, TvIcon, XCircleIcon } from "lucide-react";
import { Text, Button, Container, Flex, Heading, Grid, Box, Strong, Card } from "@radix-ui/themes";

import { Examples } from "./examples";
import { Logo } from "@/components/logo";
import { ProjectPackagesEnum } from "@/base/constants";
import { PricingCard } from "@/components/pricing-card";
import { Footer } from "@/components/layouts/flatpages-footer";
import { Navigation } from "@/components/layouts/flatpages-nagivation";

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center p-4 pt-20 gap-4 relative">
            <Navigation />
            <Hero />

            <Examples />
            <Steps />

            <Compare />
            <HowItWorks />
            <PricingTable />
            <Footer />
        </main>
    );
}

function Hero() {
    return (
        <Container flexGrow="0" className="w-full" align="center">
            <Flex direction="column" align="center" gap="4" py="9">
                <Heading align="center" size="8" className="text-[42px]">
                    Automate your short videos <Text className="text-[--orange-10]">with AI</Text>
                </Heading>

                <Text size="4" align="center" color="gray" weight="medium">
                    Fully automate a faceless channel in any niche you want. Setup once and let Magicshorts do the rest.
                </Text>

                <Button size="3" mt="5" className="font-bold" asChild>
                    <Link href="/login">Create a free video</Link>
                </Button>

                <Text mt="-2" size="2">
                    Takes 60 seconds. No credit card needed.
                </Text>
            </Flex>
        </Container>
    );
}

function Compare() {
    return (
        <Container mt="8" flexGrow="0" className="w-full" align="center">
            <Flex direction="column" align="center" gap="2" pt="9" pb="8">
                <Heading align="center" size="7">
                    Manually managing faceless channels is time-consuming
                </Heading>

                <Text size="3" align="center" color="gray">
                    AI changes the idea that managing multiple faceless channels is time-consuming. It's now quick and easy.
                </Text>
            </Flex>

            <Grid columns={{ initial: "1", sm: "2" }} gap="6">
                <Box className="rounded-xl bg-[--red-3] h-96 space-y-2" p="6">
                    <Heading size="5" weight="bold" color="red" className="block">
                        Manually creating videos
                    </Heading>

                    <Text size="3" className="block">
                        You need to come up with a script, find the materials, and edit the video. It's time-consuming and requires at least some
                        video editing skills.
                    </Text>

                    <ul className="pt-3 space-y-1.5">
                        {[
                            ["Time required", "2 hours"],
                            ["Workflow complexity", "High"],
                            ["Scalability", "Low"],
                        ].map((item) => (
                            <li key={`bad_item_${item[0]}`}>
                                <Flex align="center" gap="2">
                                    <XCircleIcon className="w-4 h-4 text-[var(--tomato-10)]" /> <Strong>{item[0]}</Strong> {item[1]}
                                </Flex>
                            </li>
                        ))}
                    </ul>
                </Box>

                <Box className="rounded-xl bg-[--grass-3] h-96 space-y-2" p="6">
                    <Flex align="center" gap="2">
                        <Logo size={32} />
                        <Heading size="5" weight="regular">
                            <Strong className="mr-2">Magicshorts</Strong> AI Shorts Platform
                        </Heading>
                    </Flex>

                    <Text size="3" className="block">
                        You pick a niche, connect your channel, and let the AI do the work. It's quick, easy, and requires no video editing skills. It
                        can automate dozens of accounts.
                    </Text>

                    <ul className="pt-3 space-y-1.5">
                        {[
                            ["Time required", "2 minutes"],
                            ["Workflow complexity", "Very low"],
                            ["Scalability", "Infinite"],
                        ].map((item) => (
                            <li key={`good_item_${item[0]}`}>
                                <Flex align="center" gap="2">
                                    <CheckCircleIcon className="w-4 h-4 text-[var(--grass-10)]" /> <Strong>{item[0]}</Strong> {item[1]}
                                </Flex>
                            </li>
                        ))}
                    </ul>
                </Box>
            </Grid>
        </Container>
    );
}

function Steps() {
    return (
        <Grid mt="6" columns={{ initial: "1", md: "3" }} gap="8" className="whitespace-nowrap">
            <Flex gap="2" align="center">
                <Flex align="center" justify="center" className="bg-white w-14 h-14 rounded border border-dashed">
                    <SquareMousePointerIcon className="w-7 h-7" />
                </Flex>
                <Flex direction="column">
                    <Text weight="bold">Step 1.</Text>
                    <Text color="gray">Select a niche</Text>
                </Flex>
            </Flex>

            <Flex gap="2" align="center">
                <Flex align="center" justify="center" className="bg-white w-14 h-14 rounded border border-dashed">
                    <TvIcon className="w-7 h-7" />
                </Flex>
                <Flex direction="column">
                    <Text weight="bold">Step 2.</Text>
                    <Text color="gray">Connect channel</Text>
                </Flex>
            </Flex>

            <Flex gap="2" align="center">
                <Flex align="center" justify="center" className="bg-white w-14 h-14 rounded border border-dashed">
                    <BotIcon className="w-7 h-7" />
                </Flex>
                <Flex direction="column">
                    <Text weight="bold">Step 3.</Text>
                    <Text color="gray">Sit back and relax</Text>
                </Flex>
            </Flex>
        </Grid>
    );
}

function HowItWorks() {
    return (
        <Container pt="9" className="w-full">
            <Flex direction="column" align="center">
                <Text size="5" weight="bold" className="text-[var(--orange-10)]" mt="8" mb="8">
                    Here's how it works
                </Text>
            </Flex>

            <Flex direction="column" align="center" gap="6">
                <StepIndicator step={1} direction={["bottom"]} />
                <Heading align="center" wrap="balance">
                    Choose a niche or add yours
                </Heading>

                <StepIndicator step={2} direction={["top", "bottom"]} />
                <Heading align="center" wrap="balance">
                    Connect your Youtube or Tiktok
                </Heading>

                <StepIndicator step={3} direction={["top", "bottom"]} />
                <Heading align="center" wrap="balance">
                    AI does the work
                </Heading>

                <StepIndicator step={4} direction={["top"]} />
                <Heading align="center" wrap="balance">
                    You account grows automatically
                </Heading>
            </Flex>
        </Container>
    );
}

function StepIndicator(props: { step: number; direction: ("top" | "bottom")[] }) {
    return (
        <Flex direction="column" align="center">
            {props.direction.includes("top") && <div className="w-1.5 h-16 bg-gradient-to-b to-[var(--orange-10)] from-transparent -mb-[2px]"></div>}

            <div className="w-10 h-10 bg-[var(--orange-10)] flex items-center justify-center rounded-full">
                <Text size="5" className="text-[var(--gray-1)]" weight="bold">
                    {props.step}
                </Text>
            </div>

            {props.direction.includes("bottom") && (
                <div className="w-1.5 h-16 bg-gradient-to-b from-[var(--orange-10)] to-transparent -mt-[2px]"></div>
            )}
        </Flex>
    );
}

function PricingTable() {
    return (
        <Container pt="9" className="w-full" id="pricing">
            <Flex direction="column" align="center">
                <Text size="5" weight="bold" className="text-[var(--orange-10)]" mt="6" mb="3">
                    Pricing
                </Text>

                <Heading align="center" mb="3" size="8">
                    Automated videos 100x faster than traditional editing
                </Heading>

                <Text size="4" mb="9" color="gray">
                    Publish 100% automated faceless videos for your channels without time-consuming workflows.
                </Text>
            </Flex>

            <Grid columns={{ initial: "1", md: "3" }} gap="2">
                <PricingCard
                    plain
                    price={17}
                    title="Consistent"
                    subtitle="Ideal if you are starting in content creation"
                    frequency="Post 3 Times a Week"
                    package={ProjectPackagesEnum.CONSISTENT}
                    features={[
                        { text: "No watermark", check: true },
                        { text: "Auto-post to TikTok", check: true },
                        { text: "Auto-post to Youtube", check: true },
                        { text: "HD Video Resolution", check: true },
                    ]}
                />
                <PricingCard
                    plain
                    featured
                    price={37}
                    title="Daily"
                    subtitle="Best option to grow your shorts & visibility"
                    frequency="Post Once a Day"
                    package={ProjectPackagesEnum.DAILY}
                    features={[
                        { text: "No watermark", check: true },
                        { text: "Auto-post to TikTok", check: true },
                        { text: "Auto-post to Youtube", check: true },
                        { text: "HD Video Resolution", check: true },
                    ]}
                />
                <PricingCard
                    plain
                    price={57}
                    title="Power"
                    subtitle="Perfect for growing your channel quickly"
                    frequency="Post Twice a Day"
                    package={ProjectPackagesEnum.POWER}
                    features={[
                        { text: "No watermark", check: true },
                        { text: "Auto-post to TikTok", check: true },
                        { text: "Auto-post to Youtube", check: true },
                        { text: "HD Video Resolution", check: true },
                    ]}
                />
            </Grid>

            <Card mt="2">
                <Flex p="5" justify="between" align="center" className="w-full">
                    <Flex direction="column" align="start">
                        <Heading>Trial</Heading>
                        <Text size="2" color="gray">
                            Start your journey with us today
                        </Text>
                    </Flex>

                    <Button size="3" asChild className="font-bold">
                        <Link href="/login">Try for free</Link>
                    </Button>
                </Flex>
            </Card>
        </Container>
    );
}
