import { CircularProgress } from "@nextui-org/progress";

export default function loading(){
  return (
    <div className="min-h-screen flex items-center justify-center">
       <CircularProgress size="lg" color="default" aria-label="Loading..."/>
    </div>
  );
};