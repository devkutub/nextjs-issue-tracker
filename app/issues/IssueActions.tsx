import { Button } from "@radix-ui/themes";
import Link from "next/link";
import { FunctionComponent } from "react";

interface IssueActionsProps {

}

const IssueActions: FunctionComponent<IssueActionsProps> = () => {
    return (
        <div className='mb-5'>
            <Button>
                <Link href="/issues/new">New Issue</Link>
            </Button>
        </div>
    );
}

export default IssueActions;