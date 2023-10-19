'use client'
import React from 'react'
import { TextField, TextArea, Button } from "@radix-ui/themes"
import SimpleMDE from "react-simplemde-editor";
import { useForm, Controller } from "react-hook-form";
import axios from 'axios';
import "easymde/dist/easymde.min.css";
import { useRouter } from 'next/navigation';

interface NewIssue {
    title: string;
    description: string;
}

const NewIssuePage = () => {
    const router = useRouter()
    const { register, control, handleSubmit } = useForm<NewIssue>();
    return (
        <form onSubmit={handleSubmit(async (data) => {
            const res = await axios.post("/api/issues", data);
            router.push("/issues");
        })} className="max-w-xl space-y-5">
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
    )
}

export default NewIssuePage