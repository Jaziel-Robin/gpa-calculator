function ModuleRow(props) {
    // TODO delete button
    return (
        <tr>
            <th>{props.name}</th>
            <th>{props.credit}</th>
            <th>{props.grade}</th>
            <th>
                <button onClick={props.onDelete}>Delete</button>
            </th>
        </tr>
    );
}

function ModuleTable(props) {
    return (
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Credit</th>
                    <th>Grade</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {props.rows.map((row, index) => (
                !row.isDeleted && <ModuleRow
                    name={row.name}
                    credit={row.credit}
                    grade={row.grade}
                    onDelete={() => props.onDeleteRow(index)}
                    />
                ))}
            </tbody>
        </table>
    );
}

let addRow; // other script can access it.
let getRows;

window.addEventListener('DOMContentLoaded', function () {
    const rows = [];

    function deleteRow(index) {
        if (index >= rows.length) return;
        rows[index].isDeleted = true;
        renderModuleTable();
        updateResult();
    }

    const root = ReactDOM.createRoot(document.getElementById('table-root'));
    function renderModuleTable() {
        const element = <ModuleTable rows={rows} onDeleteRow={deleteRow} />;
        root.render(element);
    }

    addRow = function (name, credit, grade) {
        rows.push({ name, credit, grade });
        renderModuleTable();
    };
    getRows = function() {
        return rows.filter((row) => !row.isDeleted);
    };

    renderModuleTable();
});