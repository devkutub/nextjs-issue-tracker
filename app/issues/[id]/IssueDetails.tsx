import { IssueStatusBadge } from "@/app/components";
import { Issue } from "@prisma/client";
import { Heading, Flex, Card, Text } from "@radix-ui/themes";
import { FunctionComponent } from "react";
import ReactMarkdown from "react-markdown";

interface IssueDetailsProps {
    issue: Issue;
}

const IssueDetails: FunctionComponent<IssueDetailsProps> = ({ issue }) => {
    return (
        <>
            <Heading>{issue?.title}</Heading>
            <Flex gap="3" my="2">
                <IssueStatusBadge status={issue.status} />
                <Text>{issue?.createdAt.toDateString()}</Text>
            </Flex>
            <Card className="prose mt-5">
                <ReactMarkdown>{issue?.description}</ReactMarkdown>
            </Card>
        </>
    );
}

export default IssueDetails;