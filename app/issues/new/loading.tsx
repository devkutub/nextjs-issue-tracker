import { Box } from "@radix-ui/themes";
import { FunctionComponent } from "react";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';

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