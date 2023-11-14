import { IssueStatusBadge } from "@/app/components";
import prisma from "@/prisma/client";
import { Box, Button, Card, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import { FunctionComponent } from "react";
import ReactMarkdown from "react-markdown";
import { Pencil2Icon } from '@radix-ui/react-icons'
import Link from "next/link";
import IssueDetails from "./IssueDetails";
import IssueEditButton from "./IssueEditButton";

interface IssueDetailsPageProps {
    params: { id: string }
}

const IssueDetailsPage: FunctionComponent<IssueDetailsPageProps> = async ({ params: { id } }) => {
    const issue = await prisma.issue.findUnique({
        where: { id: parseInt(id) }
    });

    if (!issue) notFound();

    return (
        <Grid columns={{ initial: "1", md: "2" }} gap="5">
            <Box>
                <IssueDetails issue={issue} />
            </Box>
            <Box>
                <IssueEditButton issueId={issue.id} />
            </Box>
        </Grid>
    );
}

export default IssueDetailsPage;