import { Text, Card, Container, Heading, Flex, Grid, Box } from "@radix-ui/themes";
import { ProjectPackagesEnum } from "@/base/constants";
import { PricingCard } from "@/components/pricing-card";

export default function RewardsPage() {
    return (
        <Container>
            <PricingTable />
        </Container>
    );
}

function PricingTable() {
    return (
        <Box>
            <Flex direction="column" align="center">
                <Heading align="center" mt="6" mb="4" size="8">
                    Automated videos 10x faster than traditional editing
                </Heading>

                <Text size="4" mb="8" color="gray">
                    Publish 100% automated faceless videos for your channels without wasting time.
                </Text>
            </Flex>

            <Grid columns="3" gap="2">
                <PricingCard
                    price={13}
                    title="Hobby"
                    subtitle="Ideal if you are starting in content creation"
                    frequency="40 Export Minutes"
                    package={ProjectPackagesEnum.CONSISTENT}
                    features={[
                        { text: "20 AI Videos", check: true },
                        { text: "100 AI Images", check: true },
                        { text: "30 Minutes Voiceover", check: true },
                        { text: "Auto-post to TikTok", check: true },
                        { text: "Auto-post to Youtube", check: true },
                        { text: "HD Video Resolution", check: true },
                    ]}
                />
                <PricingCard
                    featured
                    price={27}
                    title="Consistent"
                    subtitle="Best option to grow your shorts & visibility"
                    frequency="80 Export Minutes"
                    package={ProjectPackagesEnum.DAILY}
                    features={[
                        { text: "60 AI Videos", check: true },
                        { text: "250 AI Images", check: true },
                        { text: "60 Minutes Voiceover", check: true },
                        { text: "Auto-post to TikTok", check: true },
                        { text: "Auto-post to Youtube", check: true },
                        { text: "HD Video Resolution", check: true },
                    ]}
                />
                <PricingCard
                    price={55}
                    title="Power"
                    subtitle="Perfect for growing your channel quickly"
                    frequency="180 Export Minutes"
                    package={ProjectPackagesEnum.POWER}
                    features={[
                        { text: "150 AI Videos", check: true },
                        { text: "500 AI Images", check: true },
                        { text: "120 Minutes Voiceover", check: true },
                        { text: "Auto-post to TikTok", check: true },
                        { text: "Auto-post to Youtube", check: true },
                        { text: "HD Video Resolution", check: true },
                    ]}
                />
            </Grid>

            <Card mt="2">
                <Flex direction="column" align="start" className="p-6">
                    <Heading>Trial</Heading>
                    <Text size="2" color="gray">
                        Start your journey with us today
                    </Text>
                </Flex>
            </Card>
        </Box>
    );
}
