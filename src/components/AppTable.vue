<template>
  <div class="table-wrapper">
    <div class="table-title">{{tableTitle}}</div>

    <table class="app-table">
      <thead>
      <tr>
        <th v-for="(header, index) in this.header ">{{header}}</th>
      </tr>
      </thead>

      <tbody>
        <tr v-for="(row, i) in this.rows "  v-on:click.stop="calculateRowAction(i)">
          <td v-for="(column, j) in this.header " :class="calculateClass(i, j)"
                v-on:click.stop="calculateCellAction(i, j)">
              {{this.rows[i][j]}}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
name: "AppTable",

created() {
  /*console.log("actions");
  console.log(this.rowActions[0][0]);

  console.log("headers");
  console.log(this.header[0][0]);*/
},

  data() {
    return {

    }
  },

  props:  {
    tableTitle: {
      type: String,
      default: ""
    },
    header: {
      type: Array,
      default: function () {
        return [];
      }
    },

    rows:  {
      type: Array,
      default: function () {
        return [];
      }
    },

  rowClasses:  {
    type: Array,
    default: function () {
      return [];
    }
  },

  cellActions:  {
    type: Array,
    default: function () {
      return [];
    }
  },

  rowActions:  {
    type: Array,
    default: function () {
      return [];
    }
  },

  headerActions:  {
    type: Array,
    default: function () {
      return [];
    }
  },
},



  methods:  {
    calculateClass(i, j)  {
      if (this.rowClasses === undefined || this.rowClasses === null)  {
        return "";
      }

      if (i >= 0 && i < this.rowClasses.length)  {
        if (j >= 0 && j < this.rowClasses[i].length)  {
          return this.rowClasses[i][j];
        }
      }

      return "";
    },

    calculateCellAction(i, j)  {
      console.log("calculateCellAction " + i + ", " + j);

      if (this.cellActions === undefined || this.cellActions === null)  {
        return "";
      }

      if (i >= 0 && i < this.cellActions.length) {
        if (j >= 0 && j < this.cellActions[i].length) {
          let f = this.cellActions[i][j];
          console.log(f);

          if (f === null || f === undefined)  {
            console.log(f);
            return "";
          }

          console.log("cellAction = " + f + ", i = " + i + ", j = " + j);
          f(i, j);
       }
      }

      return "";
    },

    calculateRowAction(i)  {
      if (this.rowActions === undefined || this.rowActions === null)  {
        return "";
      }

      if (i >= 0 && i < this.rowActions.length)  {
          let f = this.rowActions[i];
          console.log("rowAction = " + f + ", i = " + i);
          f(i);
      }

      return "";
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inconsolata:wght@300&family=Josefin+Sans:wght@400;500&family=Moon+Dance&family=Overpass&family=Roboto:wght@300&family=Rubik:wght@300&family=Signika&display=swap');

.table-wrapper  {
  background-color: var(--LIGHTER_GRAY);
  border-radius: 0.8em;
  padding: 2em;

  font-size: 1.2em;
}

.table-title  {
  margin-bottom: 2em;
}

.app-table  {

  border-top: 1px solid transparent;
  padding: 2em;

  border-collapse: collapse;
}

 .app-table thead  {
  border-radius: 2.8em !important;


}

.app-table tr:hover  {
  background-color: var(--LIGHTER_BLUE_GRAY);
}

.app-table th, td  {
  padding: 1em;

  vertical-align: center !important;
  horiz-align: left !important;

  text-align: left;
  color: var(--TAG_FONT_COLOR_SILVER);

  cursor: pointer;
}

.app-table th  {
  background-color: var(--TABLE_HEADER_BLUE);
  border-bottom: none !important;
  font-weight: normal;
  color: var(--TAG_FONT_COLOR_SILVER);
}

.app-table td  {
  border-bottom: 1px solid rgb(157, 177, 197, 0.2);

}

.app-table tr:last-child td {
  border-bottom: 0;
}

.app-table tr td:last-child {
  border-right: 0;
}
</style>