'use client'
import React from 'react'
import { TextField, TextArea, Button, Callout, Text } from "@radix-ui/themes"
// import SimpleMDE from "react-simplemde-editor";
import { useForm, Controller } from "react-hook-form";
import axios from 'axios';
import "easymde/dist/easymde.min.css";
import { useRouter } from 'next/navigation';
import { AiFillWarning } from "react-icons/ai"
import { zodResolver } from "@hookform/resolvers/zod";
import { createIssueSchema } from '@/app/ValidationSchemas';
import { z } from "zod";
import ErrorMessage from '@/app/components/ErrorMessage';
import Spinner from '@/app/components/Spinner';
import dynamic from "next/dynamic";
const SimpleMDE = dynamic(
    () => import("react-simplemde-editor"),
    { ssr: false }
)

// interface NewIssue {
//     title: string;
//     description: string;
// }

type NewIssue = z.infer<typeof createIssueSchema>;

const NewIssuePage = () => {
    const [error, setError] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const router = useRouter()
    const { register, control, handleSubmit, formState: { errors } } = useForm<NewIssue>({
        resolver: zodResolver(createIssueSchema)
    });

    const onSubmit = async (data: NewIssue) => {
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
                    <TextField.Input placeholder='Title' {...register("title")} />
                </TextField.Root>
                {/* <ErrorMessage>{errors.title?.message}</ErrorMessage> */}
                {errors.title && <Text color='red' as="p">{errors.title.message}</Text>}
                <Controller
                    name='description'
                    control={control}
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

export default NewIssuePage