import ActsList from "../components/ActsList";

interface ActsPageProps {
    params: Promise<{ actsId: string }>;
}
export default async function ActsPage({ params }: ActsPageProps) {
    const { actsId } = await params;
    console.log(actsId)
    return <ActsList id={actsId} />;
};
