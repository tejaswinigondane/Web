function generateTables() {
    var input1 = document.getElementById("input1").value;
    var input2 = document.getElementById("input2").value;

    var table1Size = input1.split("#").map(Number);
    var table2Size = input2.split("#").map(Number);

    var table1 = createTable(table1Size[0], table1Size[1], table1Size[2], "table1");
    var table2 = createTable(table2Size[0], table2Size[1], table2Size[2], "table2");

    var output = document.getElementById("output");
    output.innerHTML = "";
    output.appendChild(table1);
    output.appendChild(table2);

    if (table1Size[0] === table2Size[0] && table1Size[1] === table2Size[1]) {
      var lastValue = Math.max(table1Size[2], table2Size[2]);
      var table3 = createTable(table1Size[0],table1Size[1],lastValue,"table3",true);
      output.appendChild(table3);
    }
  }

  function createTable(rows, columns, startingValue, id, checkDuplicates = false) {
    var table = document.createElement("table");
    table.id = id;

    for (var i = 0; i < rows; i++) {
      var row = document.createElement("tr");

      for (var j = 0; j < columns; j++) {
        var cell = document.createElement("td");
        var value = (startingValue + j)* (i +1);

        if (checkDuplicates && value !== startingValue) {
          var duplicate = checkDuplicate(value);
          if (duplicate) {
            cell.style.backgroundColor = duplicate.style.backgroundColor;
          } else {
            cell.style.backgroundColor = generateRandomColor();
          }
        }

        if (id === "table3") {
          var firstCellValueTable1 = document.getElementById("table1").rows[i].cells[j].innerText;
          var firstCellValueTable2 = document.getElementById("table2").rows[i].cells[j].innerText;

          if (firstCellValueTable1 === firstCellValueTable2) {
            cell.innerText = firstCellValueTable1;
          } else {
            cell.innerText = firstCellValueTable1 * firstCellValueTable2;
          }
        } else {
          cell.innerText = value;
        }

        row.appendChild(cell);
      }

      table.appendChild(row);
    }

    return table;
  }

  function checkDuplicate(value) {
    var table3 = document.getElementById("table3");
    if (!table3) return null;

    var cells = table3.getElementsByTagName("td");
    for (var i = 0; i < cells.length; i++) {
      if (cells[i].innerText === String(value)) {
        return cells[i];
      }
    }
    return null;
  }

  function generateRandomColor() {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }