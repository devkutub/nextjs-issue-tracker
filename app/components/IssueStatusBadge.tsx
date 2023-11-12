import { Status } from "@prisma/client";
import { Badge } from "@radix-ui/themes";
import { FunctionComponent } from "react";

const statsMap: Record<
    Status,
    {
        label: string,
        color: 'red' | 'violet' | 'green'
    }
> = {
    OPEN: { label: 'Open', color: 'red' },
    IN_PROGRESS: { label: 'In Progress', color: 'violet' },
    CLOSED: { label: 'Closed', color: 'green' },
};

interface IssueStatusBadgeProps {
    status: Status;
}

const IssueStatusBadge: FunctionComponent<IssueStatusBadgeProps> = ({ status }) => {
    return (
        <Badge color={statsMap[status].color}>
            {statsMap[status].label}
        </Badge>
    );
}

export default IssueStatusBadge;