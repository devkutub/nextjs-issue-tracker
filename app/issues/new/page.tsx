import { FunctionComponent } from "react";
import IssueForm from "../components/IssueForm";

interface NewIssuePageProps {

}

const NewIssuePage: FunctionComponent<NewIssuePageProps> = () => {
    return (
        <IssueForm />
    );
}

export default NewIssuePage;