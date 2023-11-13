import { Box } from "@radix-ui/themes";
import { FunctionComponent } from "react";
import { Skeleton } from "@/app/components";

interface LoadingNewIssuePageProps {

}

const LoadingNewIssuePage: FunctionComponent<LoadingNewIssuePageProps> = () => {
    return (
        <Box className="max-w-xl">
            <Skeleton />
            <Skeleton height="20rem" />
        </Box>
    );
}

export default LoadingNewIssuePage;