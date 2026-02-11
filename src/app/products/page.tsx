import Header from "../components/header";
import CardList from "../components/cardList";
import { getSession } from "@/lib/auth";

async function ProductPage(){
    const session = await getSession()

    const isLoggedIn = !!session
    return <>
        <Header isLoggedIn={isLoggedIn}></Header>
        <CardList></CardList>
    </>
}

export default ProductPage;