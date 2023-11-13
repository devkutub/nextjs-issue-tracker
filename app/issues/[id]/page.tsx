import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import prisma from "@/prisma/client";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
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
        <div>
            <Heading>{issue?.title}</Heading>
            <Flex gap="3" my="2">
                <IssueStatusBadge status={issue.status} />
                <p>{issue?.createdAt.toDateString()}</p>
            </Flex>
            <Card>
                <Text>{issue?.description}</Text>
            </Card>
        </div>
    );
}

export default IssueDetailsPage;