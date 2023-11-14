'use client'
import { Button, Callout, Text, TextField } from "@radix-ui/themes";
import React from 'react';
// import SimpleMDE from "react-simplemde-editor";
import { createIssueSchema } from '@/app/ValidationSchemas';
import { zodResolver } from "@hookform/resolvers/zod";
import axios from 'axios';
import "easymde/dist/easymde.min.css";
import { useRouter } from 'next/navigation';
import { Controller, useForm } from "react-hook-form";
import { AiFillWarning } from "react-icons/ai";
import { z } from "zod";
// import ErrorMessage from '@/app/components/ErrorMessage';
// import Spinner from '@/app/components/Spinner';
import { ErrorMessage, Spinner } from "@/app/components";
import dynamic from "next/dynamic";
import { Issue } from "@prisma/client";
const SimpleMDE = dynamic(
    () => import("react-simplemde-editor"),
    { ssr: false }
)

// interface IssueFormData {
//     title: string;
//     description: string;
// }

type IssueFormData = z.infer<typeof createIssueSchema>;

const IssueForm = ({ issue }: { issue?: Issue }) => {
    const [error, setError] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const router = useRouter()
    const { register, control, handleSubmit, formState: { errors } } = useForm<IssueFormData>({
        resolver: zodResolver(createIssueSchema)
    });

    const onSubmit = async (data: IssueFormData) => {
        try {
            setLoading(true);
            const res = await axios.post("/api/issues", data);
            router.push("/issues");
        } catch (error) {
            setLoading(false);
            setError('An unexpected error occurred!')
        }
    };

    return (
        <div className='max-w-xl'>
            {error && (
                <Callout.Root color='red' className='mb-4'>
                    <Callout.Icon>
                        <AiFillWarning />
                    </Callout.Icon>
                    <Callout.Text>
                        {error}
                    </Callout.Text>
                </Callout.Root>
            )}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <TextField.Root>
                    <TextField.Input placeholder='Title' {...register("title")} defaultValue={issue?.title} />
                </TextField.Root>
                {/* <ErrorMessage>{errors.title?.message}</ErrorMessage> */}
                {errors.title && <Text color='red' as="p">{errors.title.message}</Text>}
                <Controller
                    name='description'
                    control={control}
                    defaultValue={issue?.description}
                    render={({ field }) => <SimpleMDE placeholder='Description' {...field} />}
                />
                <ErrorMessage>{errors.description?.message}</ErrorMessage>
                {/* {errors.description && <Text color='red' as="p">{errors.description.message}</Text>} */}
                {/* <SimpleMDE placeholder='Description' /> */}
                {/* <TextArea placeholder='Description' /> */}
                <Button>
                    Submit New Issue {loading && <Spinner />}
                </Button>
            </form>
        </div>
    )
}

export default IssueForm