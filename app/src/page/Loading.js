import { OrbitProgress } from "react-loading-indicators";

const Loading = () => {
    return (
        <div className="loading-container">
            <OrbitProgress color="#32cd32" size="medium" text="" textColor="" />
        </div>
    );
}

export default Loading;