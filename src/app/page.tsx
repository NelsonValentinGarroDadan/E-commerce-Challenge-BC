import ChooseUs from "./components/chooseUs";
import FirstCategories from "./components/firstCategories";
import Highlighted from "./components/highlighted";
import Presentation from "./components/presentation";

export const metadata = {
    title: "Inicio"
}
export default function Home(){
    return(
        <main className="min-h-screen flex flex-col items-center justify-start">
            <Presentation />
            <Highlighted />
            <FirstCategories />
            <ChooseUs />
        </main>
    );
}