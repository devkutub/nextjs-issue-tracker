import { Table } from "@radix-ui/themes";
// import Link from 'next/link'
import prisma from '@/prisma/client';
// import IssueStatusBadge from '../components/IssueStatusBadge'
// import delay from 'delay'
import IssueActions from './IssueActions';
// import Link from '../components/Link'
import { IssueStatusBadge, Link } from "@/app/components";

const page = async () => {
    const issues = await prisma.issue.findMany();
    // await delay(2000);
    return (
        <div>
            <IssueActions />
            <Table.Root variant="surface">
                <Table.Header>
                    <Table.Row>
                        <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell className='hidden md:table-cell'>Status</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell className='hidden md:table-cell'>Created</Table.ColumnHeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {issues.map((d) => (
                        <Table.Row key={d.id}>
                            <Table.RowHeaderCell>
                                <Link href={`/issues/${d.id}`}>{d.title}</Link>
                                <div className='block md:hidden'>
                                    <IssueStatusBadge status={d.status} />
                                </div>
                            </Table.RowHeaderCell>
                            <Table.Cell className='hidden md:table-cell'><IssueStatusBadge status={d.status} /></Table.Cell>
                            <Table.Cell className='hidden md:table-cell'>{d.createdAt.toDateString()}</Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table.Root>
        </div>
    )
}

export default page