'use client'
import React from 'react'
import { TextField, TextArea, Button, Callout } from "@radix-ui/themes"
import SimpleMDE from "react-simplemde-editor";
import { useForm, Controller } from "react-hook-form";
import axios from 'axios';
import "easymde/dist/easymde.min.css";
import { useRouter } from 'next/navigation';
import { AiFillWarning } from "react-icons/ai"

interface NewIssue {
    title: string;
    description: string;
}

const NewIssuePage = () => {
    const [error, setError] = React.useState('');
    const router = useRouter()
    const { register, control, handleSubmit } = useForm<NewIssue>();

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
            <form onSubmit={handleSubmit(async (data) => {
                try {
                    const res = await axios.post("/api/issues", data);
                    router.push("/issues");
                } catch (error) {
                    setError('An unexpected error occurred!')
                }
            })} className="space-y-5">
                <TextField.Root>
                    <TextField.Input placeholder='Title' {...register("title")} />
                </TextField.Root>
                <Controller
                    name='description'
                    control={control}
                    render={({ field }) => <SimpleMDE placeholder='Description' {...field} />}
                />
                {/* <SimpleMDE placeholder='Description' /> */}
                {/* <TextArea placeholder='Description' /> */}
                <Button>Submit New Issue</Button>
            </form>
        </div>
    )
}

export default NewIssuePage