import { Box, Card, Flex } from "@radix-ui/themes";
import { FunctionComponent } from "react";
import { Skeleton } from '@/app/components';

interface LoadingIssueDetailsPageProps {

}

const LoadingIssueDetailsPage: FunctionComponent<LoadingIssueDetailsPageProps> = () => {
    return (
        <Box className="max-w-xl">
            <Skeleton />
            <Flex gap="3" my="2">
                <Skeleton width="4rem" />
                <Skeleton width="9rem" />
            </Flex>
            <Card className="prose mt-5">
                <Skeleton count={3} />
            </Card>
        </Box>
    );
}

export default LoadingIssueDetailsPage;