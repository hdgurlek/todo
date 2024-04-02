import useTodo from "../hooks/useTodo";

export default function Filter() {
    const { filterModes } = useTodo();
    return (
        <div className="filter-container">
            <FilterButton label="Show All" id={filterModes[0]}></FilterButton>
            <FilterButton label="Show Completed" id={filterModes[1]}></FilterButton>
            <FilterButton label="Show Uncompleted" id={filterModes[2]}></FilterButton>
        </div>);
}

function FilterButton({ label, id }) {
    const { onFilterChange } = useTodo();

    const { filterMode } = useTodo();
    let classSuffix = id === filterMode ? "highlighted" : "";

    let className = `filter-button ${classSuffix}`

    return (
        <button
            className={className}
            id={id}
            onClick={() => {
                onFilterChange(id);
            }}
        >
            {label}
        </button>
    );
}