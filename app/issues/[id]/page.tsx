import { IssueStatusBadge } from "@/app/components";
import prisma from "@/prisma/client";
import { Box, Button, Card, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import { FunctionComponent } from "react";
import ReactMarkdown from "react-markdown";
import { Pencil2Icon } from '@radix-ui/react-icons'
import Link from "next/link";

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
                <Heading>{issue?.title}</Heading>
                <Flex gap="3" my="2">
                    <IssueStatusBadge status={issue.status} />
                    <Text>{issue?.createdAt.toDateString()}</Text>
                </Flex>
                <Card className="prose mt-5">
                    <ReactMarkdown>{issue?.description}</ReactMarkdown>
                </Card>
            </Box>
            <Box>
                <Button>
                    <Pencil2Icon />
                    <Link href={`/issues/${id}/edit`}>Edit Issue</Link>
                </Button>
            </Box>
        </Grid>
    );
}

export default IssueDetailsPage;