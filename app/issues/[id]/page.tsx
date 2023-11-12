import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import { FunctionComponent } from "react";

interface IssueDetailsPageProps {
    params: { id: string }
}

const IssueDetailsPage: FunctionComponent<IssueDetailsPageProps> = async ({ params: { id } }) => {
    const issue = await prisma.issue.findUnique({
        where: { id: parseInt(id) }
    });

    if (!issue) notFound();

    return (
        <>
            <p>{issue?.title}</p>
            <p>{issue?.description}</p>
            <p>{issue?.status}</p>
            <p>{issue?.createdAt.toDateString()}</p>
        </>
    );
}

export default IssueDetailsPage;