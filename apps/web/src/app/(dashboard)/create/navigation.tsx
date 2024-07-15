import Link from "next/link";
import { Text, Box, Button, Container, Flex, IconButton } from "@radix-ui/themes";
import { ArrowRightIcon, CaretRightIcon, HomeIcon, MagicWandIcon } from "@radix-ui/react-icons";

export function Navigation({
    title,
    steps,
    current,
    onChange,
    onFinish,
}: {
    title: string;
    steps: { title: string }[];
    current: number;
    onChange: (index: number) => void;
    onFinish: () => void;
}) {
    return (
        <Box className="bg-[var(--color-panel)] bg-gray1 border-b p-2" mb="4">
            <Container>
                <Flex align="center" justify="between">
                    <Flex gap="4" align="center">
                        <IconButton size="2" variant="ghost" color="gray" asChild>
                            <Link href="/dashboard">
                                <HomeIcon />
                            </Link>
                        </IconButton>
                        <CaretRightIcon />
                        <Text>{title}</Text>
                    </Flex>

                    <Flex gap="4" align="center">
                        {steps.map((step, index) => (
                            <>
                                <Button
                                    size="2"
                                    variant="ghost"
                                    key={`${step.title}-${index}`}
                                    color={index === current ? "blue" : "gray"}
                                    onClick={() => onChange(index)}
                                >
                                    <div>{index + 1}.</div> {step.title}
                                </Button>
                                {index !== steps.length - 1 && <CaretRightIcon />}
                            </>
                        ))}
                    </Flex>

                    <Button
                        size="2"
                        color={current !== steps.length - 1 ? "blue" : "orange"}
                        onClick={() => (current === steps.length - 1 ? onFinish() : onChange(current + 1))}
                        className="w-32"
                    >
                        {current !== steps.length - 1 ? (
                            <>
                                Continue
                                <ArrowRightIcon />
                            </>
                        ) : (
                            <>
                                Generate
                                <MagicWandIcon />
                            </>
                        )}
                    </Button>
                </Flex>
            </Container>
        </Box>
    );
}
