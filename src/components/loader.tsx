import { Loader } from "lucide-react";

export default function LoaderSpin(){
    return(
        <div className="flex items-center justify-center py-10">
            <Loader className="h-8 w-8 text-primary animate-slow-spin" />
        </div>

    );
}