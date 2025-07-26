$table = nuGetProperty('nu_inspect_record_table');
$record_id = nuGetProperty('nu_inspect_record_record_id');

$style = "<style>
.responsive-table {
  overflow-x: auto;
}

.styled-table {
  width: 100%;
  border-collapse: collapse;
  font-family: Arial, sans-serif;
  margin-top: 1em;
}

.styled-table thead {
  background-color: #f2f2f2;
  cursor: pointer;
}

.styled-table th, .styled-table td {
  border: 1px solid #ddd;
  padding: 8px 12px;
  user-select: text;
}

.styled-table tbody tr:nth-child(odd) {
  background-color: #fafafa;
}

.styled-table tbody tr:nth-child(even) {
  background-color: #f5f5f5;
}

.styled-table thead th {
  position: sticky;
  top: 0;
  background-color: #f2f2f2;
  z-index: 2;
  user-select: all;
}

code {
  font-family: monospace;
  padding: 2px 4px;
  border-radius: 3px;
}

.filter-controls label {
  user-select: none;
}

.filter-controls select {
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
}

.filter-controls select {
  padding: 4px 8px;
  font-size: 14px;
}

.sort-icon {
  margin-left: 5px;
  opacity: 0.6;
}

.copy-icon {
  margin-left: 8px;
  cursor: pointer;
  color: #5a5a5a;
}
</style>";

$link = '<link rel="stylesheet" href="../third_party/fontawesome/css/all.min.css">';

$script = <<<JS
<script>
function filterRows() {
	const select = document.getElementById('columnFilter');
	const rows = document.querySelectorAll('.styled-table tbody tr');
	const mode = select.value;

	rows.forEach(row => {
		const valueCell = row.querySelector('td:nth-child(3)');
		const text = valueCell.textContent.trim();
		const isEmpty = text === '' || text === 'NULL';
		const isNonEmpty = !isEmpty;

		if (mode === 'all') {
			row.style.display = '';
		} else if (mode === 'nonempty' && isNonEmpty) {
			row.style.display = '';
		} else if (mode === 'empty' && isEmpty) {
			row.style.display = '';
		} else {
			row.style.display = 'none';
		}
	});
}

let currentSort = { column: -1, direction: '' };
function sortTable(columnIndex) {
	const table = document.querySelector('.styled-table tbody');
	const rows = Array.from(table.rows);
	const headers = document.querySelectorAll('.styled-table thead th');

	headers.forEach((th, i) => {
		const icon = th.querySelector('.sort-icon');
		if (icon) icon.className = 'fa-solid sort-icon';
	});

	let direction = 'asc';
	if (currentSort.column === columnIndex && currentSort.direction === 'asc') direction = 'desc';

	rows.sort((a, b) => {
		let aText = a.cells[columnIndex].innerText.trim().toLowerCase();
		let bText = b.cells[columnIndex].innerText.trim().toLowerCase();
		return (direction === 'asc') ? aText.localeCompare(bText) : bText.localeCompare(aText);
	});

	rows.forEach(row => table.appendChild(row));

	const icon = headers[columnIndex].querySelector('.sort-icon');
	if (icon) icon.classList.add(direction === 'asc' ? 'fa-caret-up' : 'fa-caret-down');

	currentSort = { column: columnIndex, direction };
}

function copyToClipboard(icon) {
	const value = icon.getAttribute('data-value');
	navigator.clipboard.writeText(value);

	icon.classList.remove("fa-copy");
	icon.classList.add("fa-solid","fa-check");

	setTimeout(() => {
		icon.classList.remove("fa-solid","fa-check");
		icon.classList.add("fa-copy");
	}, 550);
}

</script>
JS;

$columns_query = "
	SELECT COLUMN_NAME, COLUMN_TYPE, COLUMN_KEY, COLUMN_COMMENT
	FROM INFORMATION_SCHEMA.COLUMNS
	WHERE TABLE_SCHEMA = DATABASE()
	  AND TABLE_NAME = '$table'
	ORDER BY ORDINAL_POSITION
";

$columns_result = nuRunQuery($columns_query);

$fieldInfo = db_field_info($table);
$primaryKeys = $fieldInfo[2] ?? [];
$firstPrimaryKey = $primaryKeys[0] ?? null;

$data_query = "SELECT * FROM `$table` WHERE `$firstPrimaryKey` = '$record_id' LIMIT 1";
$data_result = nuRunQuery($data_query);
$data_row = db_fetch_array($data_result);

echo '<div class="responsive-table">';
echo $style . $link . $script;

echo '<div class="filter-controls">';
echo '<label for="columnFilter"><strong>Show:</strong> </label>';
echo '<select id="columnFilter" onchange="filterRows()">';
echo '<option value="all">All Columns</option>';
echo '<option value="nonempty">Only Columns With a Value</option>';
echo '<option value="empty">Only Empty/Null Columns</option>';
echo '</select>';
echo '</div>';

echo '<table class="styled-table">';
echo '<thead><tr>';
echo '<th onclick="sortTable(0)">Field <i class="fa-solid sort-icon"></i></th>';
echo '<th onclick="sortTable(1)">Type <i class="fa-solid sort-icon"></i></th>';
echo '<th onclick="sortTable(2)">Value <i class="fa-solid sort-icon"></i></th>';
echo '</tr></thead>';
echo '<tbody>';

while ($col = db_fetch_array($columns_result)) {
	$name = $col['COLUMN_NAME'];
	$type = $col['COLUMN_TYPE'];
	$key = $col['COLUMN_KEY'];
	$comment = $col['COLUMN_COMMENT'];

	$raw_value = $data_row[$name] ?? null;
	$value = is_null($raw_value) ? '<em>NULL</em>' : htmlspecialchars($raw_value);

	$icon = '';
	$bg = '';
	if ($key == 'PRI') {
		$icon = ' <i class="fa-solid fa-key" style="color:goldenrod;" title="Primary Key"></i>';
		$bg = ' style="background-color:#fff8dc;"';
	} elseif ($key == 'MUL') {
		$icon = ' <i class="fa-solid fa-key" style="color:grey;" title="Foreign Key"></i>';
		$bg = ' style="background-color:#f5f5f5;"';
	}

	$raw_length = mb_strlen($raw_value ?? '');

	if ($raw_value === null || $raw_length <= 200) {
		$display_value = $value;
		$tooltip = '';
	} else {
		$display_value = htmlspecialchars(mb_substr($raw_value, 0, 200)) . '…';

		$tooltip_content = mb_substr($raw_value, 0, 2000);
		if ($raw_length > 2000) {
			$tooltip_content .= '…';
		}

		$tooltip = ' title="' . htmlspecialchars($tooltip_content) . '"';
	}

	$escaped_value = htmlspecialchars($raw_value ?? '', ENT_QUOTES);

	if (is_null($raw_value) || $raw_value === '') {
		$copy_icon = '';
	} else {
		$copy_icon = "<i class='fa-regular fa-copy copy-icon' title='Copy' data-value='$escaped_value' onclick='copyToClipboard(this)'></i>";
	}

	$field_title = $comment ? ' title="' . htmlspecialchars($comment) . '"' : '';

	echo "<tr>";
	echo "<td$bg><strong$field_title>$name</strong>$icon</td>";
	echo "<td$bg><code>$type</code></td>";
	echo "<td$bg><code$tooltip>$display_value</code>$copy_icon</td>";
	echo "</tr>";
}

echo '</tbody></table></div>';