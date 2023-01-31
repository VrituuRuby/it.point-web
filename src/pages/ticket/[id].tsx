import { useRouter } from "next/router";

export default function Ticket() {
    const router = useRouter();
    return <h1>TICKET {router.query.id}</h1>
}