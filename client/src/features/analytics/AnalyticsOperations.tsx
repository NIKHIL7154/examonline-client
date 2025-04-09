import Filter from "../../ui/Filter";

function AnalyticsOperations() {
    return (
        <div>
            <Filter
                filterField="proctured"
                options={[
                    { value: "false", label: "Basic" },
                    { value: "true", label: "Proctured" },
                ]}
            />
        </div>
    );
}

export default AnalyticsOperations;
