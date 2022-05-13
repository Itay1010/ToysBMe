import { ToyPreview } from "./toy-preview.jsx"

export function ToyList({ toys, deleteToy }) {
    console.log('ToyList - toys', toys)
    return <section className="toy-list">
        {toys.map((toy) => <ToyPreview key={toy._id} toy={toy} deleteToy={deleteToy} />)}
    </section>
}