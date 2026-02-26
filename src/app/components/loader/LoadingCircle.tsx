import { LoaderCircle } from "lucide-react";

export const LoaderCircleIcon = () => {
    return (
        <div className="flex justify-center items-center w-full">
            <LoaderCircle className="!text-primary animate-spin text-muted-foreground" />
        </div>
    );
};