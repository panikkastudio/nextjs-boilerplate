import { Button, Popover, TextArea } from "@radix-ui/themes";
import Notiflix from "notiflix";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Form, FormField } from "./ui/form";
import { StarRating } from "./star-rating";
import { CitrusIcon } from "lucide-react";

export function FeedbackButton() {
    const form = useForm({
        defaultValues: {
            feedback: "",
            rating: 0,
        },
    });

    const closeButton = useRef<HTMLButtonElement>(null);

    async function onSubmit(values: any) {
        try {
            Notiflix.Block.circle(".feedback_form");
            // await createFeedback.mutateAsync({
            //     feedback: values.feedback,
            //     rating: values.rating,
            //     metadata: {
            //         location: location.href,
            //     },
            // });

            closeButton.current?.click();
            toast.message("Thank you for your feedback!");
            form.reset();
            //
        } catch (e: any) {
            toast.error("Failed to save your feedback", {
                description: e?.message || e || "An unknown error occured",
            });
            //
        } finally {
            Notiflix.Block.remove(".feedback_form");
        }
    }

    return (
        <Popover.Root>
            <Popover.Trigger>
                <div className="self-stretch flex items-center">
                    <Button radius="large" variant="soft" size="2" color="orange">
                        <CitrusIcon className="p_icon" />
                        Feedback
                    </Button>
                </div>
            </Popover.Trigger>

            <Popover.Content className="feedback_form p-0 w-64" align="end">
                <div>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <div className="p-2">
                                <FormField
                                    name="feedback"
                                    control={form.control}
                                    render={({ field }) => (
                                        <TextArea {...field} className="resize-none" rows={3} placeholder="Tell us what you think" />
                                    )}
                                />
                            </div>

                            <div className="flex items-center justify-between p-2 bg-secondary border-t">
                                <FormField
                                    name="rating"
                                    control={form.control}
                                    render={({ field }) => <StarRating rate={field.value} onRated={(r) => field.onChange(r)} />}
                                />

                                <Button size="1" tabIndex={0}>
                                    Send
                                </Button>

                                <Popover.Close className="hidden" ref={closeButton}>
                                    <span>Close</span>
                                </Popover.Close>
                            </div>
                        </form>
                    </Form>
                </div>
            </Popover.Content>
        </Popover.Root>
    );
}
