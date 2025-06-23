"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
import { subjects } from "@/constants";
import { Textarea } from "./ui/textarea";
import { redirect } from "next/navigation";
import { createCompanion } from "@/lib/actions/companion.action";

const formSchema = z.object({
    name: z.string().min(1, { message: "Companion is required" }),
    subject: z.string().min(1, { message: "Subject is required" }),
    topic: z.string().min(1, { message: "Topic is required" }),
    voice: z.string().min(1, { message: "Voice is required" }),
    style: z.string().min(1, { message: "Style is required" }),
    duration: z.number().min(1, { message: "Duration is required" }),
});

const CompanionForm = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            subject: "",
            topic: "",
            voice: "",
            style: "",
            duration: 15,
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        const companion = await createCompanion(values)
        console.log(companion);
        
        if(companion){
            redirect(`/companions/${companion.id}`)
        }
        else{
            console.log("something went wrong while creating companion")
            redirect("/")
        }
    };

    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Companion Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter the companion name" className="input" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="subject"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Subject</FormLabel>
                                <FormControl>
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <SelectTrigger className="input capitalize">
                                            <SelectValue placeholder="Select the subject" />
                                        </SelectTrigger>
                                        <SelectContent className="capitalize">
                                            {subjects.map((subject, index) => (
                                                <SelectItem key={index} value={subject}>
                                                    {subject}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="topic"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>What should this companion teach?</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="Ex. Derivatives & Integrals" className="input" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="voice"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Voice</FormLabel>
                                <FormControl>
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <SelectTrigger className="input capitalize">
                                            <SelectValue placeholder="Select the voice" />
                                        </SelectTrigger>
                                        <SelectContent className="capitalize">
                                            <SelectItem value="male">Male</SelectItem>
                                            <SelectItem value="female">Female</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="style"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Speaking Style</FormLabel>
                                <FormControl>
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <SelectTrigger className="input capitalize">
                                            <SelectValue placeholder="Style" />
                                        </SelectTrigger>
                                        <SelectContent className="capitalize">
                                            <SelectItem value="formal">Formal</SelectItem>
                                            <SelectItem value="casual">Casual</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="duration"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Estimated session duration (in minutes)</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        placeholder="15"
                                        className="input"
                                        value={field.value}
                                        onChange={(e) => field.onChange(Number(e.target.value))}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit" className="w-full cursor-pointer bg-[#FE5933]">
                        Submit
                    </Button>
                </form>
            </Form>
        </div>
    );
};

export default CompanionForm;
