import { data as legislatives } from '@/app/utils/data';
interface Props {
    params: Promise<{ id: string }>;
}

export default async function CategoryPage({ params }: Props) {
    const { id } = await params;
    const item = legislatives.find((el) => el.id === id)

    if (!item) return <div>Nie znaleziono wpisu dla id: {id}</div>;
    return (
        <div>
            <h1>{item.title}</h1>
            <p>{item.content}</p>
        </div>
    );
}
