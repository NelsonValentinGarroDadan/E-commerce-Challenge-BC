import ChooseUs from "./components/chooseUs";
import FirstCategories from "./components/firstCategories";
import Highlighted from "./components/highlighted";
import Presentation from "./components/presentation";

export const metadata = {
    title: "Inicio"
}
export default function Home(){
    return(
        <>
            <Presentation />
            <Highlighted />
            <FirstCategories />
            <ChooseUs />
        </>
    );
}