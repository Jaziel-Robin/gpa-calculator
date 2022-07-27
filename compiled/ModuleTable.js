function ModuleRow(props) {
    // TODO delete button
    return React.createElement(
        'tr',
        null,
        React.createElement(
            'th',
            null,
            props.name
        ),
        React.createElement(
            'th',
            null,
            props.credit
        ),
        React.createElement(
            'th',
            null,
            props.grade
        ),
        React.createElement(
            'th',
            null,
            React.createElement(
                'button',
                { onClick: props.onDelete },
                'Delete'
            )
        )
    );
}

function ModuleTable(props) {
    return React.createElement(
        'table',
        null,
        React.createElement(
            'thead',
            null,
            React.createElement(
                'tr',
                null,
                React.createElement(
                    'th',
                    null,
                    'Name'
                ),
                React.createElement(
                    'th',
                    null,
                    'Credit'
                ),
                React.createElement(
                    'th',
                    null,
                    'Grade'
                ),
                React.createElement(
                    'th',
                    null,
                    'Delete'
                )
            )
        ),
        React.createElement(
            'tbody',
            null,
            props.rows.map(function (row, index) {
                return !row.isDeleted && React.createElement(ModuleRow, {
                    name: row.name,
                    credit: row.credit,
                    grade: row.grade,
                    onDelete: function onDelete() {
                        return props.onDeleteRow(index);
                    }
                });
            })
        )
    );
}

var addRow = void 0; // other script can access it.
var getRows = void 0;

window.addEventListener('DOMContentLoaded', function () {
    var rows = [];

    function deleteRow(index) {
        if (index >= rows.length) return;
        rows[index].isDeleted = true;
        renderModuleTable();
        updateResult();
    }

    var root = ReactDOM.createRoot(document.getElementById('table-root'));
    function renderModuleTable() {
        var element = React.createElement(ModuleTable, { rows: rows, onDeleteRow: deleteRow });
        root.render(element);
    }

    addRow = function addRow(name, credit, grade) {
        rows.push({ name: name, credit: credit, grade: grade });
        renderModuleTable();
    };
    getRows = function getRows() {
        return rows.filter(function (row) {
            return !row.isDeleted;
        });
    };

    renderModuleTable();
});