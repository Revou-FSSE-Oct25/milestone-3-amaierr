import Header from "../../components/header";
import CardList from "../../components/cardList";
import { getSession } from "@/lib/auth";

async function ProductPage(){
    const session = await getSession()
    const isAdmin = (session && session.role === 'admin') || false
    return <>
        <Header></Header>
        <CardList isAdmin = {isAdmin} ></CardList>
    </>
}

export default ProductPage;